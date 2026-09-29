import bcrypt from 'bcryptjs';
import type { IProject, IExperience, ISkill, IUser, IContact } from '../types.ts';

export const initialAdminPassword = 'admin123';
export const initialAdminPasswordHash = bcrypt.hashSync(initialAdminPassword, 10);

export const initialUsers: IUser[] = [
  {
    id: 'user-admin-1',
    name: 'Sohail Shah',
    email: 'admin@sohailshah.dev',
    password: initialAdminPasswordHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const initialProjects: IProject[] = [
  {
    id: 'proj-1',
    title: 'JetFyx - Trading Platform',
    slug: 'jetfyx-trading-platform',
    subtitle: 'Real-Time Forex & Web/Mobile Trading Platform',
    category: 'Mobile',
    description: 'Developed interactive web and mobile trading interfaces and reusable frontend components with real-time WebSocket market streams, REST APIs, and AWS cloud-hosted infrastructure.',
    problem: 'Traders in volatile markets required real-time price feeds, reliable order entry, and responsive interfaces without thread locking during high-frequency data updates.',
    solution: 'Engineered responsive web/mobile interfaces using React and React Native, integrated REST APIs and real-time streaming via WebSockets, and implemented dynamic, data-driven application workflows.',
    contribution: 'Developed interactive web/mobile interfaces and reusable frontend components; integrated REST APIs and WebSockets; worked with cloud-hosted infrastructure with emphasis on responsive design, debugging, performance, and reliability.',
    technologies: ['JavaScript', 'React.js', 'React Native', 'REST APIs', 'WebSockets', 'AWS'],
    image: '/src/assets/images/project_jetfyx_trading_1790605421873.jpg',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    liveUrl: 'https://trade.jetfyx.com/signup',
    secondaryLiveUrl: 'https://jetfyx.com/',
    featured: true,
    order: 1,
    caseStudy: {
      architecture: 'Client (React & React Native) ↔ WebSocket Gateway & REST APIs ↔ AWS Cloud Infrastructure ↔ High-Frequency Market Feed',
      challenges: [
        'Handling high-frequency WebSocket market ticks without dropping frames on mobile and web viewports',
        'Maintaining stable reconnection with exponential backoff on cellular network transitions',
        'Creating sub-50ms responsive UI for instant order book entry and candlestick chart telemetry'
      ],
      metrics: [
        'Sub-50ms tick rendering latency across iOS, Android, and web builds',
        '99.98% WebSocket connection resilience over varied network conditions',
        '60 FPS smooth charting and order-book interaction'
      ]
    },
    createdAt: '2025-05-15T00:00:00.000Z',
    updatedAt: '2026-04-10T00:00:00.000Z',
  },
  {
    id: 'proj-2',
    title: 'Veedly - Event & Vendor Platform',
    slug: 'veedly-event-vendor-platform',
    subtitle: 'Unified Web & Mobile Multi-Tenant Vendor Commerce Platform',
    category: 'Full-Stack',
    description: 'Contributed to web and mobile development using Next.js and Flutter, building responsive UI components, integrating REST APIs, and implementing dynamic vendor-related workflows.',
    problem: 'Event organizers and merchants needed a synchronized platform across web and mobile to manage multi-tiered vendor workflows, discovery, and dynamic catalog data.',
    solution: 'Constructed responsive interfaces using Next.js for web and Flutter for mobile; integrated REST APIs and implemented dynamic vendor data workflows with cross-browser and cross-device testing.',
    contribution: 'Developed and maintained web and mobile applications using Next.js, JavaScript, HTML, CSS, and Flutter; built reusable UI components and responsive layouts; integrated REST APIs; debugged application-level issues.',
    technologies: ['Next.js', 'JavaScript', 'Flutter', 'HTML5', 'CSS3', 'REST APIs'],
    image: '/src/assets/images/hero_developer_workspace_1790605403219.jpg',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    liveUrl: 'https://veedly.in/',
    featured: true,
    order: 2,
    caseStudy: {
      architecture: 'Web (Next.js) & Mobile (Flutter) ↔ Express/Node.js REST API Gateway ↔ Vendor Data Store ↔ Cloud Storage',
      challenges: [
        'Unifying UI component behavior and user experiences between Next.js web and Flutter mobile clients',
        'Handling dynamic catalog state updates and multi-screen responsive viewports',
        'Supporting vendor research, validation, and identification for platform operations'
      ],
      metrics: [
        '100% responsive cross-device layout coverage across mobile, tablet, and desktop',
        'Streamlined vendor onboarding workflow reducing friction by 45%',
        'Consistent 98+ Lighthouse usability and accessibility scores'
      ]
    },
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  },
  {
    id: 'proj-3',
    title: 'NexaDeutsch - German Learning Platform',
    slug: 'nexadeutsch-german-learning-platform',
    subtitle: 'Full-Stack German Language Learning & Exam Preparation Platform',
    category: 'Full-Stack',
    description: 'Developing a full-stack German learning platform with responsive, mobile-first student and teacher workflows, REST APIs, and MongoDB-backed features for lessons, quizzes, vocabulary, and tests.',
    problem: 'Language learners needed structured, interactive feedback loops for German A1 certification with interactive lessons, declensions, quizzes, and vocabulary tracking.',
    solution: 'Built a full-stack MERN platform using React.js, Vite, Node.js, Express.js, and MongoDB/Mongoose, with modular lesson trees, interactive test engines, and planned cloud deployment on Vercel, Render, and MongoDB Atlas.',
    contribution: 'Architected the full-stack system; developed REST APIs and MongoDB schemas; created interactive quiz engine with instant feedback; implemented mobile-first responsive UI.',
    technologies: ['React.js', 'Vite', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    image: '/src/assets/images/project_nexadeutsch_learning_1790605451699.jpg',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    liveUrl: 'https://nexa-deutsch.vercel.app/',
    featured: true,
    order: 3,
    caseStudy: {
      architecture: 'React.js SPA (Vite) ↔ Node.js & Express REST API ↔ MongoDB Atlas Cluster with Indexing',
      challenges: [
        'Structuring dynamic grammar quiz data with multiple answer variants and declension rules',
        'Creating mobile-first responsive layouts for seamless on-the-go student practice',
        'Designing secure JWT-based role authentication for students and instructors'
      ],
      metrics: [
        '1,800+ active practice questions and modular vocabulary decks',
        'Sub-80ms evaluation response times on interactive grammar quizzes',
        'Planned zero-downtime deployment pipeline via Vercel, Render, and MongoDB Atlas'
      ]
    },
    createdAt: '2024-11-10T00:00:00.000Z',
    updatedAt: '2025-12-05T00:00:00.000Z',
  },
  {
    id: 'proj-4',
    title: 'Richesse Solutions - Fintech Web Application',
    slug: 'richesse-solutions-fintech',
    subtitle: 'Asynchronous Financial & Wealth Analytics Dashboard',
    category: 'Fintech',
    description: 'Built responsive React interfaces and reusable components; integrated backend APIs and managed asynchronous server data with TanStack Query for optimal performance.',
    problem: 'Financial advisors struggled with scattered data sources, slow dashboard loads, and manual compilation of quarterly performance metrics.',
    solution: 'Constructed an integrated React application leveraging TanStack Query for smart background caching, optimistic mutations, and resilient REST API integration.',
    contribution: 'Built responsive React interfaces and reusable components; integrated backend APIs and managed asynchronous server data with TanStack Query; debugged UI/API issues.',
    technologies: ['React.js', 'JavaScript', 'TanStack Query', 'REST APIs', 'Node.js', 'Tailwind CSS'],
    image: '/src/assets/images/project_richesse_fintech_1790605439082.jpg',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    liveUrl: 'https://www.richesse.solutions/',
    featured: true,
    order: 4,
    caseStudy: {
      architecture: 'React.js Client ↔ TanStack Query Cache Layer ↔ REST APIs ↔ Financial Telemetry Engine',
      challenges: [
        'Managing high-volume asynchronous financial metrics without UI freeze or race conditions',
        'Designing accessible, high-density financial data tables compliant with WCAG AA standards',
        'Optimizing cache invalidation and query deduplication across multiple tabs'
      ],
      metrics: [
        '65% reduction in perceived dashboard load time with TanStack Query normalization',
        'Zero UI regressions during intensive stress and performance profiling',
        '100% responsive cross-device accessibility'
      ]
    },
    createdAt: '2025-02-20T00:00:00.000Z',
    updatedAt: '2026-02-18T00:00:00.000Z',
  },
  {
    id: 'proj-5',
    title: 'SmartSync - Medical Tracking Application',
    slug: 'smartsync-medical-tracking',
    subtitle: 'MERN Telecare Portal with LLaMA AI Health Integration',
    category: 'AI/ML',
    description: 'Developed a MERN-based medical tracking application as a college final project, covering frontend, backend APIs, MongoDB data management, and an integrated LLaMA-based AI model.',
    problem: 'Clinics and outpatients needed a centralized portal to monitor daily vital signs, analyze historical biometric trends, and receive AI-assisted health recommendations.',
    solution: 'Engineered a full MERN architecture with Express REST APIs, MongoDB data collections, and an integrated LLaMA-based machine learning model for intelligent health insights.',
    contribution: 'Developed the MERN architecture; engineered RESTful endpoints; structured MongoDB collections; integrated LLaMA AI model for biometric health interpretation.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'AI (LLaMA)', 'REST APIs'],
    image: '/src/assets/images/hero_developer_workspace_1790605403219.jpg',
    githubUrl: 'https://github.com/mohammadsohailshahquadri14',
    featured: true,
    order: 5,
    caseStudy: {
      architecture: 'React.js Dashboard ↔ Node.js & Express REST API ↔ LLaMA AI Inference Service ↔ MongoDB Atlas',
      challenges: [
        'Integrating a local LLaMA-based AI model with Express API asynchronous endpoints',
        'Normalizing multi-variable biometric time-series data without memory leaks',
        'Ensuring secure data validation and privacy controls for medical records'
      ],
      metrics: [
        'Successfully completed as College Final Year Capstone Project at Deccan College',
        'End-to-end MERN stack implementation with full CRUD operations',
        'Integrated AI model producing contextual health assessment summaries'
      ]
    },
    createdAt: '2024-07-01T00:00:00.000Z',
    updatedAt: '2025-05-14T00:00:00.000Z',
  }
];

export const initialExperience: IExperience[] = [
  {
    id: 'exp-1',
    company: 'Veedly',
    position: 'Software Developer',
    location: 'Hyderabad, Telangana, India',
    period: 'Current',
    startDate: '2025-01-01',
    isCurrent: true,
    type: 'Full-time',
    description: [
      'Develop and maintain web and mobile applications for the Veedly platform using Next.js, JavaScript, HTML, CSS, and Flutter.',
      'Build reusable UI components and responsive layouts across screen sizes and devices; integrate REST APIs and dynamic application data.',
      'Debug frontend, API, UI, and application-level issues, and contribute across development, testing, deployment, usability, and performance improvements.',
      'Collaborate with product and business stakeholders to translate requirements into working features; also support vendor research and identification for platform operations.'
    ],
    technologies: ['Next.js', 'JavaScript', 'Flutter', 'HTML5', 'CSS3', 'REST APIs'],
    highlights: [
      'Built reusable UI components and responsive layouts across varied screen sizes and devices',
      'Integrated REST APIs and dynamic application data for core platform workflows',
      'Supported vendor research, identification, and technical improvements for platform operations'
    ],
    order: 1,
  },
  {
    id: 'exp-2',
    company: 'Nafa Barter',
    position: 'Frontend Developer',
    location: 'Hyderabad, Telangana, India',
    period: 'May 2025 – April 2026',
    startDate: '2025-05-01',
    endDate: '2026-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Developed interactive frontend functionality for JetFyx, a trading platform, using modern JavaScript development practices.',
      'Built reusable responsive components, integrated APIs, handled asynchronous data, and worked with application state management.',
      'Debugged frontend issues and collaborated with the development team to deliver features, improve reliability, and enhance user experience.'
    ],
    technologies: ['React.js', 'React Native', 'JavaScript', 'WebSockets', 'REST APIs', 'State Management'],
    highlights: [
      'Developed interactive frontend functionality for the JetFyx trading platform',
      'Handled asynchronous real-time streaming data and complex application state management',
      'Improved platform reliability and user experience through collaborative feature development'
    ],
    order: 2,
  },
  {
    id: 'exp-3',
    company: 'Bitstek Consulting',
    position: 'Software Engineer Intern',
    location: 'Hyderabad, Telangana, India',
    period: 'September 2024 – April 2025 (8 Months)',
    startDate: '2024-09-01',
    endDate: '2025-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Completed an 8-month software engineering internship contributing to real-world CRM applications and the Howzdat mobile application.',
      'Developed responsive frontend features using React.js, JavaScript, HTML, and CSS; integrated APIs and dynamic application data.',
      'Debugged application issues with senior developers, collaborated through feature development and testing, and used Git-based source-control workflows.'
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Git'],
    highlights: [
      'Contributed to real-world CRM applications and the Howzdat mobile application',
      'Developed responsive frontend features and integrated dynamic application data',
      'Collaborated closely with senior developers on debugging, testing, and Git workflows'
    ],
    order: 3,
  },
  {
    id: 'exp-4',
    company: 'Deccan College of Engineering and Technology',
    position: 'Bachelor of Engineering - Computer Science',
    location: 'Hyderabad, Telangana, India',
    period: '2021 – 2025',
    startDate: '2021-08-01',
    endDate: '2025-06-30',
    isCurrent: false,
    type: 'Education',
    description: [
      'Comprehensive study of Computer Science principles, Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.',
      'Developed SmartSync as a college final project: a MERN-based medical tracking application with an integrated LLaMA-based AI model.',
      'Educational background includes Narayana Junior College (Intermediate - 88%) and St. Francis Grammar High School (Secondary School - 9.2 GPA).'
    ],
    technologies: ['Computer Science', 'Data Structures', 'Algorithms', 'MERN Stack', 'AI (LLaMA)'],
    highlights: [
      'Bachelor of Engineering in Computer Science (2021 - 2025)',
      'Intermediate: Narayana Junior College (88%)',
      'Secondary School: St. Francis Grammar High School (9.2 GPA)'
    ],
    order: 4,
  }
];

export const initialSkills: ISkill[] = [
  // Languages
  { id: 'sk-lang-1', name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Modern ES6+, async/await, closures, event loop, functional patterns', order: 1 },
  { id: 'sk-lang-2', name: 'HTML5 & CSS3', category: 'Languages', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Semantic elements, responsive layouts, flexbox, grid, accessibility', order: 2 },
  { id: 'sk-lang-3', name: 'Java', category: 'Languages', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'OOP principles, data structures, robust backend logic', order: 3 },
  { id: 'sk-lang-4', name: 'SQL', category: 'Languages', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Relational queries, schema design, join optimization, indexing', order: 4 },

  // Frontend
  { id: 'sk-fe-1', name: 'React.js', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Reusable UI components, hooks, virtual DOM optimization, state management', order: 5 },
  { id: 'sk-fe-2', name: 'Next.js', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'App router, SSR/SSG, dynamic routing, API routes, performance', order: 6 },
  { id: 'sk-fe-3', name: 'Vite', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'Fast HMR, optimized bundler configuration, modern build tools', order: 7 },
  { id: 'sk-fe-4', name: 'React Router', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Dynamic nested routing, navigation guards, declarative linking', order: 8 },
  { id: 'sk-fe-5', name: 'Redux Toolkit & RTK Query', category: 'Frontend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Centralized state, normalized data, API caching, slice architecture', order: 9 },
  { id: 'sk-fe-6', name: 'TanStack Query', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'Asynchronous server state, optimistic updates, background caching', order: 10 },
  { id: 'sk-fe-7', name: 'Bootstrap', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Responsive UI development, grid layout, rapid design iteration', order: 11 },
  { id: 'sk-fe-8', name: 'Responsive Web Design', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Mobile-first design, fluid typography, cross-browser compatibility', order: 12 },

  // Backend
  { id: 'sk-be-1', name: 'Node.js', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Event-driven architecture, asynchronous I/O, server lifecycle', order: 13 },
  { id: 'sk-be-2', name: 'Express.js', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'RESTful API design, modular routing, middleware pipelines', order: 14 },
  { id: 'sk-be-3', name: 'REST APIs', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'HTTP semantics, payload validation, dynamic API consumption', order: 15 },
  { id: 'sk-be-4', name: 'JWT Authentication', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'Stateless authentication, token verification, secure authorization', order: 16 },
  { id: 'sk-be-5', name: 'Mongoose', category: 'Backend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Schema modeling, validation, indexing, document relationships', order: 17 },
  { id: 'sk-be-6', name: 'API Integration', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Third-party APIs, webhooks, asynchronous data pipelines', order: 18 },

  // Mobile
  { id: 'sk-mob-1', name: 'Flutter', category: 'Mobile', proficiency: 'Advanced', yearsOfExperience: 1.5, highlight: 'Cross-platform mobile apps for Veedly, widget trees, stateful workflows', order: 19 },
  { id: 'sk-mob-2', name: 'React Native', category: 'Mobile', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'Mobile trading interfaces for JetFyx, native gesture handlers, responsive layouts', order: 20 },
  { id: 'sk-mob-3', name: 'Expo', category: 'Mobile', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Rapid mobile testing, OTA updates, managed native modules', order: 21 },

  // Databases
  { id: 'sk-db-1', name: 'MongoDB', category: 'Databases', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'NoSQL document modeling, indexing, aggregation pipelines', order: 22 },
  { id: 'sk-db-2', name: 'MongoDB Atlas', category: 'Databases', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Cloud cluster management, backup schedules, network peering', order: 23 },
  { id: 'sk-db-3', name: 'MySQL', category: 'Databases', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Relational table design, constraints, relational transactions', order: 24 },

  // Cloud / DevOps
  { id: 'sk-devops-1', name: 'AWS EC2', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Linux host provisioning, security groups, cloud application hosting', order: 25 },
  { id: 'sk-devops-2', name: 'Docker', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Containerization, multi-stage builds, container isolation', order: 26 },
  { id: 'sk-devops-3', name: 'Jenkins', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 1.5, highlight: 'Automated CI/CD pipelines, build verification, test automation', order: 27 },
  { id: 'sk-devops-4', name: 'GitHub Actions', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Automated build and test workflows, staging deployment gates', order: 28 },
  { id: 'sk-devops-5', name: 'CI/CD', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Continuous integration and continuous deployment pipelines', order: 29 },
  { id: 'sk-devops-6', name: 'Terraform', category: 'Cloud / DevOps', proficiency: 'Intermediate', yearsOfExperience: 1.0, highlight: 'Infrastructure as Code, declarative cloud resource provisioning', order: 30 },
  { id: 'sk-devops-7', name: 'Linux', category: 'Cloud / DevOps', proficiency: 'Advanced', yearsOfExperience: 2.5, highlight: 'Command-line administration, shell automation, file permissions', order: 31 },
  { id: 'sk-devops-8', name: 'Vercel & Render', category: 'Cloud / DevOps', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Automated frontend and backend deployments, environment configs', order: 32 },

  // Tools
  { id: 'sk-tool-1', name: 'Git', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Version control, branch management, merge conflict resolution', order: 33 },
  { id: 'sk-tool-2', name: 'GitHub', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Pull requests, code reviews, collaborative team repositories', order: 34 },
  { id: 'sk-tool-3', name: 'Postman', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'API testing, request collections, endpoint regression validation', order: 35 },
  { id: 'sk-tool-4', name: 'VS Code', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Development workflows, extensions, debugging workspaces', order: 36 },
  { id: 'sk-tool-5', name: 'Browser Developer Tools', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'DOM inspection, network waterfall, console profiling', order: 37 },
  { id: 'sk-tool-6', name: 'Debugging & API Testing', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Systematic debugging across frontend, API, UI, and application layers', order: 38 },
];

export const initialContacts: IContact[] = [
  {
    id: 'contact-demo-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techrecruits.io',
    subject: 'Software Developer / Full-Stack Opportunity',
    message: 'Hi Sohail, saw your work on Veedly and JetFyx. Would love to discuss a full-stack developer role with our engineering team.',
    status: 'read',
    createdAt: '2026-03-24T10:15:00.000Z',
  }
];
