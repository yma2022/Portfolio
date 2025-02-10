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
    title: 'Personal Portfolio',
    description:
      'My personal portfolio landing page. Built with Next.js and Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'Three.js', 'd3.js', 'Tailwind'],
    links: {
      preview: 'portfolio-yma2022s-projects.vercel.app',
      github: 'https://github.com/yma2022/Portfolio',
      githubApi: 'https://api.github.com/repos/yma2022/Portfolio',
    },
  },
  {
    image: '/projects/nextstarter.svg',
    title: 'Ask Eddie',
    description:
      'A genAI assisted counseling platform for high school students.',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'NativeWind'],
    links: {
      preview: 'https://www.example.com',
      github: 'https://github.com/yma2022/',
      githubApi: 'https://api.github.com/repos/yma2022/',
    },
  },
  {
    image: '/projects/audiophile.svg',
    title: 'Machine Learning',
    description: 'Implementation of machine learning algorithms from scratch.',
    technologies: [
      'Python',
      'Scikit-learn',
      'Numpy',
      'Pandas',
      'Matplotlib',
      'OpenAI Gym',
    ],
    links: {
      preview: 'https://www.example.com',
      github: 'https://github.com/yma2022/CS7641_Machine_Learning',
      githubApi: 'https://api.github.com/repos/yma2022/CS7641_Machine_Learning',
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
  { icon: <Icons.tailwind className="size-12" /> },
  { icon: <Icons.javascript className="size-12" /> },
  { icon: <Icons.typescript className="size-12" /> },
  { icon: <Icons.react className="size-12" /> },
  { icon: <Icons.nextjs className="size-12" /> },
  { icon: <Icons.docker className="size-12" /> },
  { icon: <Icons.java className="size-12" /> },
  { icon: <Icons.nodejs className="size-12" /> },
  { icon: <Icons.d3js className="size-12" /> },
  { icon: <Icons.python className="size-12" /> },
  { icon: <Icons.mysql className="size-12" /> },
  { icon: <Icons.postgresql className="size-12" /> },
  { icon: <Icons.aws className="size-12" /> },
  { icon: <Icons.cpp className="size-12" /> },
  { icon: <Icons.git className="size-12" /> },
  { icon: <Icons.k8s className="size-12" /> },
] as const;
