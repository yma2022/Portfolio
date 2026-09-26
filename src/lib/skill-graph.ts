// Original skill connections, shared by the diagram and its text alternative.
export const skillGraph = {
  nodes: [
    { id: 'yma2022', group: 0 },
    { id: 'Web', group: 1 },
    { id: 'CSS', group: 2 },
    { id: 'Bootstrap', group: 3 },
    { id: 'TailwindCSS', group: 3 },
    { id: 'HTML', group: 2 },
    { id: 'JavaScript', group: 2 },
    { id: 'TypeScript', group: 3 },
    { id: 'Node.js', group: 3 },
    { id: 'Next.js', group: 3 },
    { id: 'D3.js', group: 3 },
    { id: 'Three.js', group: 3 },
    { id: 'TopoJSON', group: 3 },
    { id: 'React', group: 3 },
    { id: 'React Native', group: 3 },
    { id: 'NPM', group: 3 },
    { id: 'Yarn', group: 3 },

    // Databases
    { id: 'Databases', group: 1 },
    { id: 'SQL', group: 2 },
    { id: 'PostgreSQL', group: 3 },
    { id: 'MySQL', group: 3 },
    { id: 'NoSQL', group: 2 },
    { id: 'MongoDB', group: 3 },
    { id: 'Firebase', group: 3 },

    // DevOps & Tools
    { id: 'Tools', group: 1 },
    { id: 'Docker', group: 2 },
    { id: 'Kubernetes', group: 2 },
    { id: 'AWS', group: 2 },
    { id: 'CI/CD', group: 2 },
    { id: 'Unix/Linux', group: 2 },
    { id: 'Git', group: 2 },

    // DevOps
    { id: 'DevOps', group: 1 },
    { id: 'Prometheus', group: 2 },
    { id: 'Metricbeat', group: 2 },
    { id: 'Elasticsearch', group: 2 },
    { id: 'Fluentd', group: 2 },
    { id: 'Kibana', group: 2 },

    // Data Analysis
    { id: 'Data Analysis', group: 1 },
    { id: 'NumPy', group: 2 },
    { id: 'Pandas', group: 2 },
    { id: 'SciPy', group: 2 },
    { id: 'Scikit-learn', group: 2 },

    // AI
    { id: 'AI', group: 1 },
    { id: 'PyTorch', group: 2 },
    { id: 'Tiktoken', group: 2 },
    { id: 'OpenAI', group: 2 },
    { id: 'LangChain', group: 2 },
    { id: 'LangGraph', group: 2 },
    { id: 'LangChain4j', group: 2 },
  ],

  links: [
    // Web Technologies
    { source: 'yma2022', target: 'Web' },
    { source: 'Web', target: 'CSS' },
    { source: 'CSS', target: 'Bootstrap' },
    { source: 'CSS', target: 'TailwindCSS' },
    { source: 'Web', target: 'HTML' },
    { source: 'Web', target: 'JavaScript' },
    { source: 'JavaScript', target: 'TypeScript' },
    { source: 'JavaScript', target: 'Node.js' },
    { source: 'JavaScript', target: 'Next.js' },
    { source: 'JavaScript', target: 'D3.js' },
    { source: 'JavaScript', target: 'Three.js' },
    { source: 'JavaScript', target: 'TopoJSON' },
    { source: 'JavaScript', target: 'React' },
    { source: 'JavaScript', target: 'React Native' },
    { source: 'JavaScript', target: 'NPM' },
    { source: 'JavaScript', target: 'Yarn' },

    // Databases
    { source: 'yma2022', target: 'Databases' },
    { source: 'Databases', target: 'SQL' },
    { source: 'SQL', target: 'PostgreSQL' },
    { source: 'SQL', target: 'MySQL' },
    { source: 'Databases', target: 'NoSQL' },
    { source: 'NoSQL', target: 'MongoDB' },
    { source: 'NoSQL', target: 'Firebase' },

    // DevOps & Tools
    { source: 'yma2022', target: 'Tools' },
    { source: 'Tools', target: 'Docker' },
    { source: 'Tools', target: 'Kubernetes' },
    { source: 'Tools', target: 'AWS' },
    { source: 'Tools', target: 'CI/CD' },
    { source: 'Tools', target: 'Unix/Linux' },
    { source: 'Tools', target: 'Git' },

    // Monitoring & Observability
    { source: 'yma2022', target: 'DevOps' },
    { source: 'DevOps', target: 'Prometheus' },
    { source: 'DevOps', target: 'Metricbeat' },
    { source: 'DevOps', target: 'Elasticsearch' },
    { source: 'DevOps', target: 'Fluentd' },
    { source: 'DevOps', target: 'Kibana' },

    // Data Analysis
    { source: 'yma2022', target: 'Data Analysis' },
    { source: 'Data Analysis', target: 'NumPy' },
    { source: 'Data Analysis', target: 'Pandas' },
    { source: 'Data Analysis', target: 'SciPy' },
    { source: 'Data Analysis', target: 'Scikit-learn' },

    // AI
    { source: 'yma2022', target: 'AI' },
    { source: 'AI', target: 'PyTorch' },
    { source: 'AI', target: 'Tiktoken' },
    { source: 'AI', target: 'OpenAI' },
    { source: 'AI', target: 'LangChain' },
    { source: 'AI', target: 'LangGraph' },
    { source: 'AI', target: 'LangChain4j' },
  ],
};
