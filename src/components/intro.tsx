'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { TypingText } from '@/hooks/typing-text';
import { useSectionInView } from '@/hooks/use-section-in-view';

const EarthScene = dynamic(() => import('../components/EarthScene'), {
  ssr: false,
});

export const Intro = () => {
  const { ref } = useSectionInView('Home');

  function HoverableParagraph({ text }: { text: string }) {
    // Split the text into words by space
    const words = text.split(' ');

    return (
      <p className="mb-4">
        {words.map((word, index) => (
          <span
            key={index}
            className="transition-colors hover:text-gray-300"
            style={{ display: 'inline-block', marginRight: '4px' }}
          >
            {word}
          </span>
        ))}
      </p>
    );
  }

  return (
    <section
      ref={ref}
      id="home"
      className="my-10 flex h-screen w-full scroll-mt-96 flex-col items-center gap-4 text-center sm:mt-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl"
      >
        <TypingText text="Youlong Ma" />
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-row gap-2"
      >
        <Button
          variant="secondary"
          size="lg"
          className="hidden sm:flex"
          asChild
        >
          <a href="/yma2022.pdf" download>
            Download CV <Icons.download className="ml-2 size-4" />
          </a>
        </Button>
        <Button variant="secondary" size="icon" asChild>
          <a href="mailto:youlong.ma@gmail.com" aria-label="Mail" download>
            <Icons.mail className="size-6" />
          </a>
        </Button>
        <Button variant="secondary" size="icon" asChild>
          <a
            href="https://www.linkedin.com/in/youlong-ma/"
            aria-label="Linkedin"
            download
          >
            <Icons.linkedin className="size-6" />
          </a>
        </Button>
        <Button variant="secondary" size="icon" asChild>
          <a href="https://github.com/yma2022" aria-label="Github">
            <Icons.github className="size-6" />
          </a>
        </Button>
      </motion.div>
      <div className="mt-[150]  max-w-2xl text-center leading-7">
        <HoverableParagraph text="I’m Youlong Ma, a self-driven full-stack developer eager for new opportunities to grow and make a meaningful impact. I thrive on tackling challenging problems and building robust solutions." />

        <HoverableParagraph text="Over the years, I’ve worked with Java, Python, Go, React Native, TypeScript, AWS, PostgreSQL, and gRPC—delivering scalable software for AI-driven education platforms, compiler development, and various system architectures." />

        <HoverableParagraph text="I’m always exploring emerging technologies, sharing best practices, and pushing myself to excel. If you’re looking for a motivated engineer who loves solving complex issues, let’s connect!" />
      </div>
      <EarthScene />
    </section>
  );
};
