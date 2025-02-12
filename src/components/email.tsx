'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';

const EmailReveal = () => {
  const [showEmail, setShowEmail] = useState(false);
  useEffect(() => {
    if (showEmail) {
      const timer = setTimeout(() => setShowEmail(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showEmail]);

  return (
    <div className="relative">
      {/* Email Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setShowEmail((prev) => !prev)}
        aria-label="Reveal Email"
      >
        <Icons.mail className="size-6" />
      </Button>

      {/* Fancy Animated Email Popup */}
      {showEmail && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute left-1/2 top-12 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-800 shadow-lg"
        >
          youlong.ma@gmail.com
        </motion.div>
      )}
    </div>
  );
};

export default EmailReveal;
