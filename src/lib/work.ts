import { projectsData } from '@/lib/data';

// Editorial detail uses existing portfolio facts, without inferred dates or metrics.
export const work = [
  {
    ...projectsData[2],
    slug: 'eduagent',
    number: '01',
    art: 'learning',
    thesis: 'A conversation that becomes a learning path.',
    summary:
      'Three agents. One considered path from a learning goal to an interactive lesson.',
    role: 'Project development',
    context:
      'A learning goal is a starting point, not a syllabus. EduAgent explores how multiple agents can work together to turn that goal into a structured learning experience.',
    approach:
      'An Analyst and a Planner debate a personalized path before producing a syllabus. An Instructor then teaches each section interactively. Planning and instruction are distinct parts of the same experience.',
    detailTitle: 'A path with memory',
    detail:
      'Progress is persisted to SQLite, connecting the learning plan to an ongoing record of study. Pydantic and Pytest sit alongside LangGraph and LangChain in the project’s Python stack.',
    outcome:
      'The project combines collaborative planning, a structured syllabus, interactive instruction, and persisted progress. Its documented test suite contains 99 automated tests.',
    flow: ['Learning goal', 'Analyst ↔ Planner', 'Syllabus', 'Instructor'],
    flowNote:
      'Progress is persisted to SQLite. A conceptual reading of the project, not a complete deployment diagram.',
    artCaption:
      'Two paths negotiate a shared direction, then unfold into a sequence of lessons.',
  },
  {
    ...projectsData[1],
    slug: 'agentic-doc-retrieval',
    number: '02',
    art: 'retrieval',
    thesis: 'Finding the right signal in a public archive.',
    summary:
      'Natural-language retrieval across FDA product recalls dating back to 2009.',
    role: 'Project development',
    context:
      'An archive is useful when people can find the documents that matter to their question. This project focuses on FDA product recalls, making that collection searchable in natural language.',
    approach:
      'The system combines retrieval-augmented generation with LangChain agents. Vector embeddings provide the retrieval foundation, with LangGraph and OpenAI in the Python toolchain.',
    detailTitle: 'From question to relevant documents',
    detail:
      'The engineering focus is the connection between an unstructured question and a relevant set of recall documents. Retrieval gives the agent a document-grounded starting point for its response.',
    outcome:
      'The existing project description reports sub-second response times across recall data dating back to 2009. The source repository provides the implementation and project documentation.',
    flow: [
      'Question',
      'Vector retrieval',
      'Recall documents',
      'Agent response',
    ],
    flowNote:
      'A conceptual retrieval flow. The source repository is the reference for implementation details.',
    artCaption:
      'An offset archive resolves into a highlighted document and its connected evidence.',
  },
  {
    ...projectsData[0],
    slug: 'ai-stock-agent',
    number: '03',
    art: 'signals',
    thesis: 'Many sources. A clearer research picture.',
    summary:
      'An AI research tool connecting live prices, news, and company financials.',
    role: 'Project development',
    context:
      'Researching a publicly traded company means moving between different kinds of information. AI Stock Agent brings stock prices, news, and financial metrics into one research workflow.',
    approach:
      'A LangChain agent connects the research process to external financial data. A Flask interface makes the resulting analysis accessible through the browser.',
    detailTitle: 'Connecting data to an interface',
    detail:
      'The stack combines Python, LangChain, OpenAI, and Polygon.io, with Flask and Bootstrap providing the web interface. The emphasis is on bringing separate sources into an experience that can be explored.',
    outcome:
      'The result is an AI-assisted company research tool with a web interface. Source and setup details are available in the repository.',
    flow: [
      'Prices, news, metrics',
      'LangChain agent',
      'Company research',
      'Flask interface',
    ],
    flowNote:
      'A conceptual view of the research workflow. The artwork represents signals, not actual market prices or investment results.',
    artCaption:
      'Independent traces converge into an ordered field: different sources, one research surface.',
  },
  {
    ...projectsData[3],
    slug: 'ask-eddie',
    number: '04',
    art: 'conversation',
    thesis: 'An intelligent conversation, built end to end.',
    summary:
      'System design contributions to an AI-powered counseling application.',
    role: 'System design contributor',
    context:
      'Ask Eddie brings AI language models and data-driven insights into a mobile counseling experience. My contribution focused on its end-to-end system design.',
    approach:
      'The work connects a React Native mobile application with backend services and language-model capabilities. The project stack includes Node.js, PostgreSQL, NativeWind, and OpenAI.',
    detailTitle: 'The interface and the systems behind it',
    detail:
      'My contribution covered the integration of language models, data-driven insights, and scalable backend services. This work is a contribution to the product, rather than sole authorship.',
    outcome:
      'The application is available through its App Store listing. This note focuses on my system design contribution.',
    flow: [
      'Mobile experience',
      'Backend services',
      'Language models',
      'Response',
    ],
    flowNote:
      'A conceptual product flow, not a disclosure of the application’s internal architecture.',
    artCaption:
      'Paired conversation paths pass through a shared structure and return to the person.',
  },
] as const;

export type Work = (typeof work)[number];
export type ArtworkKind = Work['art'];
