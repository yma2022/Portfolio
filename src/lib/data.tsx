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
    title: 'Agentic Doc Retrieval',
    description:
      'A document search project leveraging agentic LLMs for efficient recall retrieval. It quickly identifies FDA-regulated product recalls since 2009 using natural language queries.',
    technologies: ['Python', 'LangChain', 'LangGraph', 'OpenAI'],
    links: {
      preview:
        'https://github.com/yma2022/SearchFDARecalls/blob/main/README.md',
      github: 'https://github.com/yma2022/SearchFDARecalls',
      githubApi: 'https://api.github.com/repos/yma2022/SearchFDARecalls',
    },
  },
  {
    image: '/projects/nextstarter.svg',
    title: 'Ask Eddie',
    description:
      'Contributed to its end-to-end system design—integrating AI language models, data-driven insights, and scalable backend services to deliver expert-level counseling at a fraction of traditional costs.',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'NativeWind'],
    links: {
      preview: 'https://apps.apple.com/us/app/ask-eddie/id6738869004',
      github: 'https://github.com/yma2022/',
      githubApi: 'https://api.github.com/repos/yma2022/',
    },
  },
  {
    image: '/projects/audiophile.svg',
    title: 'AI Techniques for Robotics',
    description:
      'Developed and implemented advanced robotics algorithms, including Kalman filters for object tracking, particle filters for satellite localization, PID control for drone stability, search algorithms for warehouse navigation, and GraphSLAM for autonomous exploration. Demonstrated real-time decision-making and adaptability through interactive simulations.',
    technologies: [
      'Python',
      'Numpy',
      'Matplotlib',
      'SLAM',
      'Dynamic Programming',
      'Dijkstra',
    ],
    links: {
      preview: 'https://github.com/yma2022/AI_for_Robotics/blob/main/README.md',
      github: 'https://github.com/yma2022/AI_for_Robotics',
      githubApi: 'https://api.github.com/repos/yma2022/AI_for_Robotics',
    },
  },
] as const;

export const experiencesData = [
  {
    title: 'EduPolaris AI, Tech Lead & Software Engineer',
    location: 'Remote',
    description:
      'Led the development of an AI-driven education platform using Go, PostgreSQL, and gRPC. Delivered system architecture improvements for high performance and scalability, advancing product capabilities and user engagement.',
    date: '2024 - present',
  },
  {
    title: 'Internship at Amazon',
    location: 'Detroit, MI',
    description:
      'Developed scalable applications on the Datalake platform using AWS and distributed systems. Improved system performance, optimized data processing workflows, and contributed to higher service reliability.',
    date: '2024',
  },
  {
    title: 'MS in Computer Science at GaTech',
    location: 'Atlanta, GA',
    description:
      'Strengthened expertise in advanced algorithms, software engineering, and machine learning. Delivered projects with real-world applications, emphasizing scalable software and data-driven solutions.',
    date: '2023',
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
