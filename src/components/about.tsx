'use client';

import { motion } from 'framer-motion';

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
      <Skills />
      <TechSkillsTree />
    </motion.section>
  );
};
