import { Icons } from '@/components/icons';

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#bio',
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
    name: 'Skills',
    hash: '#about',
  },
] as const;

export const projectsData = [
  {
    image: '/projects/socialhub.svg',
    title: 'AI Stock Agent',
    description:
      'A web-based stock analysis tool that fetches real-time price data, news, and financial metrics for any publicly traded company, then uses an AI agent to generate comprehensive investment insights via a Flask web interface.',
    technologies: [
      'Python',
      'Flask',
      'LangChain',
      'OpenAI',
      'Polygon.io',
      'Bootstrap',
    ],
    links: {
      preview: 'https://github.com/yma2022/stockAI/blob/main/README.md',
      github: 'https://github.com/yma2022/stockAI',
      githubApi: 'https://api.github.com/repos/yma2022/stockAI',
    },
  },
  {
    image: '/projects/socialhub.svg',
    title: 'Agentic Doc Retrieval',
    description:
      'An agentic LLM-powered search tool that finds FDA-regulated product recalls since 2009 from natural language queries. Processes recall documents with sub-second response time using RAG and LangChain agent tooling.',
    technologies: [
      'Python',
      'LangChain',
      'LangGraph',
      'OpenAI',
      'RAG',
      'Vector Embeddings',
    ],
    links: {
      preview:
        'https://github.com/yma2022/SearchFDARecalls/blob/main/README.md',
      github: 'https://github.com/yma2022/SearchFDARecalls',
      githubApi: 'https://api.github.com/repos/yma2022/SearchFDARecalls',
    },
  },
  {
    image: '/projects/nextstarter.svg',
    title: 'EduAgent',
    description:
      'A multi-agent education system where an Analyst and Planner agent debate a personalized learning path, generate a structured syllabus, and an Instructor agent teaches each section interactively—with progress persisted to SQLite and covered by 99 automated tests.',
    technologies: [
      'Python',
      'LangGraph',
      'LangChain',
      'OpenAI',
      'SQLite',
      'Pydantic',
      'Pytest',
    ],
    links: {
      preview: 'https://github.com/yma2022/EduAgent/blob/main/README.md',
      github: 'https://github.com/yma2022/EduAgent',
      githubApi: 'https://api.github.com/repos/yma2022/EduAgent',
    },
  },
  {
    image: '/projects/audiophile.svg',
    title: 'Ask Eddie',
    description:
      'Contributed to its end-to-end system design—integrating AI language models, data-driven insights, and scalable backend services to deliver expert-level counseling at a fraction of traditional costs.',
    technologies: [
      'React Native',
      'Node.js',
      'PostgreSQL',
      'NativeWind',
      'OpenAI',
    ],
    links: {
      preview: 'https://apps.apple.com/us/app/ask-eddie/id6738869004',
      github: 'https://github.com/yma2022/',
      githubApi: 'https://api.github.com/repos/yma2022/',
    },
  },
] as const;

export const experiencesData = [
  {
    title: 'Numo, Software Engineer',
    location: 'Pittsburgh, PA',
    description:
      'Building and scaling financial technology products as a software engineer, contributing to backend systems and platform reliability.',
    date: '2025 - present',
  },
  {
    title: 'EduPolaris AI, Tech Lead &Software Engineer',
    location: 'Remote',
    description:
      'Led the development of an AI-driven education platform using Go, PostgreSQL, and gRPC. Delivered system architecture improvements for high performance and scalability, advancing product capabilities and user engagement.',
    date: '2024 - 2025',
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
  { icon: <Icons.html className="size-12" />, name: 'HTML' },
  { icon: <Icons.css className="size-12" />, name: 'CSS' },
  { icon: <Icons.tailwind className="size-12" />, name: 'Tailwind' },
  { icon: <Icons.javascript className="size-12" />, name: 'JavaScript' },
  { icon: <Icons.typescript className="size-12" />, name: 'TypeScript' },
  { icon: <Icons.react className="size-12" />, name: 'React' },
  { icon: <Icons.nextjs className="size-12" />, name: 'Next.js' },
  { icon: <Icons.docker className="size-12" />, name: 'Docker' },
  { icon: <Icons.java className="size-12" />, name: 'Java' },
  { icon: <Icons.nodejs className="size-12" />, name: 'Node.js' },
  { icon: <Icons.d3js className="size-12" />, name: 'D3.js' },
  { icon: <Icons.python className="size-12" />, name: 'Python' },
  { icon: <Icons.mysql className="size-12" />, name: 'MySQL' },
  { icon: <Icons.postgresql className="size-12" />, name: 'PostgreSQL' },
  { icon: <Icons.aws className="size-12" />, name: 'AWS' },
  { icon: <Icons.cpp className="size-12" />, name: 'C++' },
  { icon: <Icons.git className="size-12" />, name: 'Git' },
  { icon: <Icons.k8s className="size-12" />, name: 'Kubernetes' },
] as const;
