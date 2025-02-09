import { Icons } from '@/components/icons';

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const projectsData = [
  {
    image: '/projects/socialhub.svg',
    title: 'SocialHub',
    description:
      'Next-generation social media app, built with its own backend.',
    technologies: ['Next.js', 'TypeScript', ' Nest.js', 'Tailwind', 'Prisma'],
    links: {
      preview: 'https://socialhub-ms.vercel.app/',
      github: 'https://github.com/yma2022/SocialHub',
      githubApi: 'https://api.github.com/repos/yma2022/SocialHub',
    },
  },
  {
    image: '/projects/nextstarter.svg',
    title: 'Next-starter',
    description: 'Next.js starter template, packed with useful features.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Shadcn/ui',
      'Next-auth',
      'Prisma',
    ],
    links: {
      preview: 'https://next-starter-yma2022.vercel.app',
      github: 'https://github.com/yma2022/next-starter',
      githubApi: 'https://api.github.com/repos/yma2022/next-starter',
    },
  },
  {
    image: '/projects/audiophile.svg',
    title: 'Audiophile',
    description: 'Online store specializing in headphones and speakers.',
    technologies: [
      'React',
      'Styled-components',
      'TypeScript',
      'Stripe',
      'Firebase',
    ],
    links: {
      preview: 'https://audiophile-ms.netlify.app/',
      github: 'https://github.com/yma2022/Audiophile',
      githubApi: 'https://api.github.com/repos/yma2022/Audiophile',
    },
  },
] as const;

export const experiencesData = [
  {
    title: 'MS in Computer Science at GaTech',
    location: 'Atlanta, GA',
    description:
      'I was pursuing a Master of Science in Computer Science at Georgia Tech, focusing on software development and machine learning. I have completed courses in advanced algorithms, software engineering, and machine learning.',
    date: '2023',
  },
  {
    title: 'Internship at Amazon',
    location: 'Detroit, MI',
    description:
      'I interned at Amazon as a software development engineer, where I worked on the Datalake platform. I developed scalable applications and optimized system performance, gaining hands-on experience with AWS services and distributed systems.',
    date: '2024',
  },
  {
    title: 'EduPolaris AI, Tech Lead & Software Engineer',
    location: 'Remote',
    description:
      'I led the development of an AI-driven education platform, overseeing the implementation of system architecture and backend services. I collaborated with a team of engineers to optimize performance and ensure scalability, leveraging Go, PostgreSQL, and gRPC.',
    date: '2024 - present',
  },
] as const;

export const skillsData = [
  { icon: <Icons.html className="size-12" /> },
  { icon: <Icons.css className="size-12" /> },
  { icon: <Icons.sass className="size-12" /> },
  { icon: <Icons.tailwind className="size-12" /> },
  { icon: <Icons.javascript className="size-12" /> },
  { icon: <Icons.typescript className="size-12" /> },
  { icon: <Icons.react className="size-12" /> },
  { icon: <Icons.redux className="size-12" /> },
  { icon: <Icons.nextjs className="size-12" /> },
  { icon: <Icons.nestjs className="size-12" /> },
  { icon: <Icons.prisma className="size-12" /> },
  { icon: <Icons.docker className="size-12" /> },
] as const;
