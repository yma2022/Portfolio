'use client';

import { motion } from 'framer-motion';

import { skillsData } from '@/lib/data';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Skills = () => {
  return (
    <div className="mt-10 flex w-full flex-wrap justify-center gap-6 px-5 sm:px-0">
      {skillsData.map(({ icon, name }, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          custom={index}
          className="flex flex-col items-center gap-2"
        >
          {icon}
          <span className="text-muted-foreground text-xs font-medium">
            {name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
