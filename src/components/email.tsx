'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const EmailReveal = () => {
  const reducedMotion = useReducedMotion();
  const [showEmail, setShowEmail] = useState(false);
  const popupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!showEmail) return;
    const dismiss = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setShowEmail(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowEmail(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showEmail]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setShowEmail(false);
      }}
    >
      {/* Email Button */}
      <Button
        ref={buttonRef}
        variant="secondary"
        size="icon"
        onClick={() => setShowEmail((prev) => !prev)}
        aria-label="Reveal Email"
        aria-expanded={showEmail}
        aria-controls={showEmail ? popupId : undefined}
      >
        <Icons.mail aria-hidden="true" className="size-6" />
      </Button>

      {/* Fancy Animated Email Popup */}
      <AnimatePresence>
        {showEmail && (
          <motion.div
            id={popupId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-14 z-10 w-max rounded border bg-secondary p-4 text-sm font-medium text-foreground shadow-lg sm:left-auto sm:right-0"
          >
            <a
              href="mailto:youlong.ma@gmail.com"
              className="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
            >
              youlong.ma@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailReveal;
