'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { projectsData } from '@/lib/data';

type TProject = (typeof projectsData)[number];

type TProps = {
  project: TProject;
  index: number;
  starsCount: number[];
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export const Project = ({ project, index, starsCount }: TProps) => {
  const { title, description, technologies, links } = project;

  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={index}
      className="bg-secondary flex flex-col items-center rounded p-5 text-center"
    >
      <h3 className="my-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="my-3 flex flex-wrap justify-center gap-2">
        {technologies.map((tech) => (
          <span className="bg-muted rounded-full px-3 py-1 text-sm" key={tech}>
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-2 pt-2">
        <Button variant="outline" size="sm" asChild className="gap-1.5">
          <a
            href={links.preview}
            aria-label={`${title}: ${links.preview.includes('github.com') ? 'Project details' : 'View app'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.preview className="size-4" />
            {links.preview.includes('github.com') ? 'Details' : 'View app'}
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="gap-1.5">
          <a
            href={links.github}
            aria-label={`${title}: ${links.githubApi ? 'Source code' : 'Developer profile'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.githubOutline className="size-4" />
            {links.githubApi ? 'Code' : 'Profile'}
          </a>
        </Button>
        {starsCount[index] > 100 && (
          <Button size="sm" asChild className="gap-1.5">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github stars"
            >
              <Icons.star className="size-4" />
              <span className="font-bold">{starsCount[index]}</span>
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
