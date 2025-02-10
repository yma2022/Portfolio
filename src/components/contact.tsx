'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/button';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const Contact = () => {
  const { ref } = useSectionInView('Contact');

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading
        heading="Get In Touch"
        content={
          <>
            Please contact me directly at{' '}
            <Button
              variant="link"
              className="text-muted-foreground p-0 font-medium"
            >
              <a
                className="underline-offset-4 hover:underline"
                href="mailto:youlong.ma@gmail.com"
              >
                youlong.ma@gmail.com.
              </a>
            </Button>{' '}
          </>
        }
      />
    </motion.section>
  );
};
