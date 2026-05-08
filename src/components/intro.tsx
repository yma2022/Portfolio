'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { LoadingScreen } from './loading';

import { Button } from '@/components/button';
import EmailReveal from '@/components/email';
import { Icons } from '@/components/icons';
import { NextPage } from '@/components/nextpage';
import { useSectionInView } from '@/hooks/use-section-in-view';

const EarthScene = dynamic(() => import('../components/EarthScene'), {
  ssr: false,
});

export const Intro = () => {
  const { ref } = useSectionInView('Home');
  const [isLoaded, setIsLoaded] = useState(true);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="flex h-screen w-full scroll-mt-96 flex-col items-center justify-center gap-6 text-center"
      >
        {!isLoaded ? (
          <LoadingScreen onComplete={() => setIsLoaded(true)} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="border-brand/40 ring-brand/10 relative size-28 overflow-hidden rounded-full border-2 ring-4"
            >
              {!avatarError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/avatar.jpg"
                  alt="Youlong Ma"
                  className="size-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="bg-brand/20 text-brand flex size-full items-center justify-center text-2xl font-bold">
                  YM
                </div>
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-wrap justify-center text-4xl font-bold leading-tight tracking-tighter sm:text-6xl"
            >
              {'Youlong Ma'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    color: 'hsl(0 0% 98%)',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-x-[0.05em] text-sm font-medium uppercase tracking-widest"
            >
              {'Full-Stack Engineer & AI Developer'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.4, color: 'hsl(var(--brand))' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    color: 'hsl(var(--brand))',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="flex flex-row flex-wrap justify-center gap-3"
            >
              <Button
                variant="default"
                size="lg"
                className="bg-brand hover:bg-brand/90 hidden text-white sm:flex"
                asChild
              >
                <a href="/yma2022.pdf" download>
                  Download CV <Icons.download className="ml-2 size-4" />
                </a>
              </Button>
              <EmailReveal />
              <Button variant="secondary" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/youlong-ma/"
                  aria-label="Linkedin"
                >
                  <Icons.linkedin className="size-6 hover:animate-bounce" />
                </a>
              </Button>
              <Button variant="secondary" size="icon" asChild>
                <a href="https://github.com/yma2022" aria-label="Github">
                  <Icons.github className="size-6 hover:animate-spin" />
                </a>
              </Button>
            </motion.div>
            <NextPage page="#bio" />
          </>
        )}
        <EarthScene />
      </section>
    </>
  );
};
