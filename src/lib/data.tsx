export const projectsData = [
  {
    focus: 'AI + financial data',
    title: 'AI Stock Agent',
    description:
      'An AI agent that brings together live stock prices, news, and financial metrics to analyze publicly traded companies. Built with LangChain and a Flask interface to make the research easy to explore.',
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
    },
  },
  {
    focus: 'Search + retrieval',
    title: 'Agentic Doc Retrieval',
    description:
      'Natural-language search across FDA product recalls dating back to 2009. Combines retrieval-augmented generation with LangChain agents to find relevant recall documents with sub-second response times.',
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
    },
  },
  {
    focus: 'Agents + education',
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
    },
  },
  {
    focus: 'Mobile + system design',
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
      github: null,
    },
  },
] as const;
