'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';

const EmailReveal = () => {
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
    <div ref={containerRef} className="relative">
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
        <Icons.mail className="size-6 hover:animate-bounce" />
      </Button>

      {/* Fancy Animated Email Popup */}
      <AnimatePresence>
        {showEmail && (
          <motion.div
            id={popupId}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-0 top-12 z-10 w-max rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-800 shadow-lg sm:left-auto sm:right-0"
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
