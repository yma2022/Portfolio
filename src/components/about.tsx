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
          I am Youlong Ma, a full-stack developer with a robust background in
          software engineering. Over the course of my career, I have tackled
          complex challenges and delivered innovative solutions—from building
          scalable applications to designing efficient system architectures. My
          expertise spans React Native, TypeScript, and AWS for frontend and
          cloud services, complemented by Go, PostgreSQL, and gRPC on the
          backend. I excel at optimizing performance in distributed systems and
          thrive on solving intricate technical problems.
        </p>
        <p className="mb-4">
          My experience includes contributions to AI-driven education platforms
          and compiler development, where I combined deep technical knowledge
          with tangible real-world impact. I am perpetually eager to explore
          emerging technologies, refine my skills, and share best practices.
        </p>
        <p>
          I am currently open to opportunities that allow me to contribute,
          learn, and grow. If you have a role that aligns with my expertise, I
          would be delighted to connect.
        </p>
      </div>
      <Skills />
      <TechSkillsTree />
    </motion.section>
  );
};
