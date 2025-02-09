'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import TechSkillsTree from '@/components/SkillTree';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          I&apos;m Youlong Ma, a full-stack developer with a strong background
          in software engineering. I have experience working on innovative
          projects, from developing scalable applications to implementing
          efficient system architectures. My expertise spans React Native,
          TypeScript, and AWS for frontend and cloud services, while I leverage
          Go, PostgreSQL, and gRPC for backend development. I thrive on solving
          complex problems and optimizing performance, especially in distributed
          systems.
        </p>
        <p>
          I&apos;ve contributed to projects in AI-driven education platforms and
          compiler development, combining technical depth with real-world
          impact. I’m always eager to explore new technologies and refine my
          skills.
        </p>
        <p>
          I&apos;m open to job opportunities where I can contribute, learn, and
          grow. If you have an opportunity that aligns with my expertise, feel
          free to reach out!
        </p>
      </div>
      <Skills />
      <TechSkillsTree />
    </motion.section>
  );
};
