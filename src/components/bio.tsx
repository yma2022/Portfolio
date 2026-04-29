'use client';

import { motion } from 'framer-motion';

import { NextPage } from '@/components/nextpage';
import { useSectionInView } from '@/hooks/use-section-in-view';

const bioLines = [
  "I'm Youlong Ma, a self-driven full-stack developer eager for new opportunities to grow and make a meaningful impact. I thrive on tackling challenging problems and building robust solutions.",
  "Over the years, I've worked with Java, Python, Go, React Native, TypeScript, AWS, PostgreSQL, and gRPC—delivering scalable software for AI-driven education platforms, compiler development, and various system architectures.",
  "I'm always exploring emerging technologies, sharing best practices, and pushing myself to excel. If you're looking for a motivated engineer who loves solving complex issues, let's connect!",
];

export const Bio = () => {
  const { ref } = useSectionInView('About');

  return (
    <section
      ref={ref}
      id="bio"
      className="flex min-h-screen w-full scroll-mt-28 flex-col items-center justify-center gap-8 px-4 text-center"
    >
      <div className="max-w-2xl space-y-6 leading-7">
        {bioLines.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
            className="text-foreground/80 text-base"
          >
            {text}
          </motion.p>
        ))}
      </div>
      <NextPage page="#projects" />
    </section>
  );
};
