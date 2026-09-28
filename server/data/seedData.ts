import bcrypt from 'bcryptjs';
import { IProject, IExperience, ISkill, IUser, IContact } from '../types.js';

export const initialAdminPassword = 'admin123';
export const initialAdminPasswordHash = bcrypt.hashSync(initialAdminPassword, 10);

export const initialUsers: IUser[] = [
  {
    id: 'user-admin-1',
    name: 'Sohail Shah Quadri',
    email: 'admin@sohailshah.dev',
    password: initialAdminPasswordHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const initialProjects: IProject[] = [
  {
    id: 'proj-1',
    title: 'JetFyx',
    slug: 'jetfyx-forex-trading-platform',
    subtitle: 'High-Frequency Forex & Crypto Trading Platform',
    category: 'Mobile',
    description: 'A low-latency mobile and web trading client engineered with React Native and WebSockets for real-time order books, sub-second tick execution, and charting.',
    problem: 'Traders in volatile markets suffered from stale price quotes and UI thread blocking on mobile devices when handling hundreds of WebSocket ticks per second.',
    solution: 'Designed an off-thread streaming state pipeline using custom binary protocol decoders, web worker thread offloading, and optimized React Native rendering primitives.',
    contribution: 'Architected real-time WebSocket state management, built responsive candlestick charting views, integrated authentication flows, and configured containerized AWS deployment.',
    technologies: ['React Native', 'WebSockets', 'AWS EC2', 'Node.js', 'Redux Toolkit', 'TypeScript'],
    image: '/src/assets/images/project_jetfyx_trading_1790605421873.jpg',
    githubUrl: 'https://github.com/sohailshah/jetfyx-trading-client',
    liveUrl: 'https://jetfyx.io',
    featured: true,
    order: 1,
    caseStudy: {
      architecture: 'Client (React Native) ↔ WebSocket Gateway (AWS ALB / Node.js Cluster) ↔ Redis Pub/Sub Market Feed ↔ Order Matching Engine',
      challenges: [
        'Handling burst market updates (1,200 events/sec) without dropping frames on mid-tier Android devices',
        'Maintaining persistent WebSocket reconnection with jitter backoff across unstable cellular networks',
        'Ensuring sub-100ms UI responsiveness for instant one-click order execution'
      ],
      metrics: [
        '45ms average tick-to-render latency',
        '99.98% WebSocket connection resilience over 4G/5G networks',
        '60 FPS smooth charting performance across Android and iOS devices'
      ]
    },
    createdAt: '2025-05-15T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z',
  },
  {
    id: 'proj-2',
    title: 'Richesse Solutions',
    slug: 'richesse-solutions-fintech',
    subtitle: 'Institutional Wealth & Portfolio Analytics Suite',
    category: 'Fintech',
    description: 'A comprehensive wealth management web application delivering portfolio analytics, tax-harvesting telemetry, and automated financial performance reporting.',
    problem: 'Financial advisors struggled with scattered data sources, slow dashboard loads, and manual compilation of quarterly performance metrics.',
    solution: 'Constructed an integrated React application leveraging TanStack Query for smart background caching, optimistic mutations, and resilient REST API integration.',
    contribution: 'Led the frontend architecture, designed customizable asset breakdown tables, integrated interactive telemetry charts, and reduced API latency by 65% through client-side cache normalization.',
    technologies: ['React', 'TanStack Query', 'Tailwind CSS', 'REST APIs', 'Node.js', 'Chart.js'],
    image: '/src/assets/images/project_richesse_fintech_1790605439082.jpg',
    githubUrl: 'https://github.com/sohailshah/richesse-fintech-web',
    liveUrl: 'https://richesse-solutions.com',
    featured: true,
    order: 2,
    caseStudy: {
      architecture: 'SPA (React / Vite) ↔ Microservices API Gateway ↔ Node.js Aggregation Service ↔ Financial Clearing House Feed',
      challenges: [
        'Displaying multi-asset portfolios with complex compounding yields without perceptible latency',
        'Designing an accessible, high-density financial interface compliant with WCAG AA standards',
        'Ensuring synchronized state across multiple concurrent browser tabs for institutional operators'
      ],
      metrics: [
        '65% reduction in perceived dashboard load time',
        '300k+ portfolio transactions processed per month',
        '100% test coverage on critical calculation modules'
      ]
    },
    createdAt: '2025-02-20T00:00:00.000Z',
    updatedAt: '2026-02-18T00:00:00.000Z',
  },
  {
    id: 'proj-3',
    title: 'NexaDeutsch',
    slug: 'nexadeutsch-german-learning',
    subtitle: 'Interactive A1 German Language Preparation Platform',
    category: 'Full-Stack',
    description: 'An end-to-end full-stack platform helping non-native speakers master German A1 certification through interactive grammatical trees, spaced repetition, and mock exam simulators.',
    problem: 'Traditional language textbooks lack structured feedback loops for German grammar complexities (cases, genders, verb conjugations).',
    solution: 'Built a full-stack Next.js and Node.js platform with modular lesson trees, audio-synchronized pronunciation exercises, and role-based student and teacher administration.',
    contribution: 'Engineered the MERN architecture, implemented student progress algorithms, created interactive quiz engine with immediate grammar explanations, and set up MongoDB indexing.',
    technologies: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS'],
    image: '/src/assets/images/project_nexadeutsch_learning_1790605451699.jpg',
    githubUrl: 'https://github.com/sohailshah/nexadeutsch-platform',
    liveUrl: 'https://nexadeutsch.com',
    featured: true,
    order: 3,
    caseStudy: {
      architecture: 'Next.js App ↔ Express REST API ↔ MongoDB Atlas Cluster with Full-Text Grammar Indexing',
      challenges: [
        'Structuring dynamic grammar quiz data with multiple correct answer permutations and declension rules',
        'Implementing spaced repetition scheduling algorithms with minimal background job overhead',
        'Creating a frictionless administrative CMS for instructors to author interactive audio modules'
      ],
      metrics: [
        '1,800+ active learners preparing for Goethe-Institut A1 exams',
        '88% first-attempt exam pass rate reported by active cohort users',
        'Sub-80ms response time on quiz evaluation endpoints'
      ]
    },
    createdAt: '2024-11-10T00:00:00.000Z',
    updatedAt: '2025-12-05T00:00:00.000Z',
  },
  {
    id: 'proj-4',
    title: 'SmartSync',
    slug: 'smartsync-medical-tracking',
    subtitle: 'Intelligent Clinical Health & Patient Vitals Tracking',
    category: 'AI/ML',
    description: 'A MERN-stack medical telecare portal designed for clinics to monitor outpatient vitals, forecast anomaly spikes with AI models, and automate triage alerts.',
    problem: 'Healthcare providers faced manual delays in identifying escalating patient vital trends between in-person appointments.',
    solution: 'Engineered an asynchronous ingestion pipeline that collects patient readings, normalizes medical ranges, and alerts attending physicians on anomalous biometric deviations.',
    contribution: 'Implemented secure HIPAA-conscious JWT sessions, built real-time vitals dashboard, integrated predictive trend models, and structured MongoDB audit trail logs.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Python AI Service', 'Docker', 'AWS'],
    image: '/src/assets/images/hero_developer_workspace_1790605403219.jpg',
    githubUrl: 'https://github.com/sohailshah/smartsync-medical',
    featured: true,
    order: 4,
    caseStudy: {
      architecture: 'React Dashboard ↔ Express API ↔ Medical Trend Engine ↔ Encrypted MongoDB Database',
      challenges: [
        'Ensuring zero patient data leakage through strict role-based access control and token invalidation',
        'Visualizing multi-variable physiological time-series without client-side memory leakage',
        'Handling asynchronous webhook alerts from wearable telemetry devices'
      ],
      metrics: [
        '40% faster clinician triage time on urgent health indicators',
        'Zero security incidents reported across production pilot run',
        'End-to-end encryption for all stored biometrics'
      ]
    },
    createdAt: '2024-07-01T00:00:00.000Z',
    updatedAt: '2025-08-14T00:00:00.000Z',
  },
  {
    id: 'proj-5',
    title: 'Prodify',
    slug: 'prodify-productivity-platform',
    subtitle: 'Algorithmic Workload Orchestrator & Task Intelligence',
    category: 'Full-Stack',
    description: 'A developer-first engineering productivity hub merging sprint velocity tracking, automated workload balancing, and FastAPI machine-learning task estimation.',
    problem: 'Engineering teams often underestimate sprint task complexity due to subjective scoring and fragmented tools.',
    solution: 'Constructed a unified hub combining MERN front-facing collaboration with an intelligent estimation service that correlates historical pull requests with completion times.',
    contribution: 'Developed real-time task boards, integrated FastAPI predictive service via microservice proxies, and implemented team analytics dashboards.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'FastAPI', 'Machine Learning', 'Docker'],
    image: '/src/assets/images/project_richesse_fintech_1790605439082.jpg',
    githubUrl: 'https://github.com/sohailshah/prodify-platform',
    featured: false,
    order: 5,
    caseStudy: {
      architecture: 'React Client ↔ Express Microservice ↔ FastAPI ML Inference Service ↔ MongoDB Atlas',
      challenges: [
        'Coordinating cross-service communication between Node.js and FastAPI without bottlenecking the main event loop',
        'Building responsive drag-and-drop task boards supporting 500+ cards simultaneously',
        'Generating explainable velocity forecasts for engineering managers'
      ],
      metrics: [
        '28% improvement in sprint estimation accuracy',
        'Adopted across 12 distributed developer teams',
        'Docker containerized deployment with one-command launch'
      ]
    },
    createdAt: '2024-03-12T00:00:00.000Z',
    updatedAt: '2024-10-20T00:00:00.000Z',
  }
];

export const initialExperience: IExperience[] = [
  {
    id: 'exp-1',
    company: 'Metagen Technologies',
    position: 'Software Developer',
    location: 'Hyderabad, India',
    period: 'Sep 2025 – Present',
    startDate: '2025-09-01',
    isCurrent: true,
    type: 'Full-time',
    description: [
      'Spearheading frontend and web application architecture for enterprise-grade digital platforms including JetFyx web platforms.',
      'Implementing high-performance React architectures with state-machine patterns, optimizing render cycles, and driving engineering consistency.',
      'Collaborating directly with product designers and backend engineers to deploy robust, production-hardened client solutions.'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Docker'],
    highlights: [
      'Production application development for institutional users',
      'Engineered scalable frontend architecture reducing tech debt by 40%',
      'Accelerated deployment cadence via streamlined Docker workflows'
    ],
    order: 1,
  },
  {
    id: 'exp-2',
    company: 'Nafa Barter / JetFyx',
    position: 'Frontend / React Native Developer',
    location: 'Hyderabad, India',
    period: 'May 2025 – Apr 2026',
    startDate: '2025-05-01',
    endDate: '2026-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Engineered cross-platform mobile trading platform using React Native for high-frequency forex operations.',
      'Integrated real-time WebSockets delivering uninterrupted market data feeds with custom throttling to prevent mobile UI stutter.',
      'Constructed order book visualizations, candlestick chart panels, and biometric authentication security gates.',
      'Deployed microservices to AWS EC2 instances and configured continuous integration pipelines.'
    ],
    technologies: ['React Native', 'WebSockets', 'AWS EC2', 'Node.js', 'Redux', 'Mobile UI/UX'],
    highlights: [
      'Maintained sub-50ms tick rendering latency across iOS and Android builds',
      'Architected end-to-end WebSocket connection resilience protocol',
      'Configured containerized AWS staging and production environments'
    ],
    order: 2,
  },
  {
    id: 'exp-3',
    company: 'Bitstek Consultancy',
    position: 'Web / Application Developer',
    location: 'Hyderabad, India',
    period: 'Sep 2024 – Apr 2025',
    startDate: '2024-09-01',
    endDate: '2025-04-30',
    isCurrent: false,
    type: 'Full-time',
    description: [
      'Engineered bespoke web applications and responsive user interfaces for varied international and domestic clientele.',
      'Transformed complex design system mockups into clean, semantic, accessible React components.',
      'Integrated diverse third-party REST APIs, payment gateways, and authentication providers.',
      'Conducted code reviews, maintained unit tests, and improved Core Web Vitals performance.'
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Node.js', 'REST APIs', 'Tailwind CSS', 'Git'],
    highlights: [
      'Delivered 6 client projects on schedule with zero critical production bugs',
      'Refactored legacy DOM manipulation code into modern React component hierarchies',
      'Improved mobile accessibility scores across client portals to 98+ on Lighthouse'
    ],
    order: 3,
  },
  {
    id: 'exp-4',
    company: 'Veedly',
    position: 'Software Developer',
    location: 'Hyderabad, India',
    period: '2024',
    startDate: '2024-01-01',
    endDate: '2024-08-31',
    isCurrent: false,
    type: 'Contract',
    description: [
      'Contributed to the multi-platform vendor commerce platform across web and mobile surfaces.',
      'Built interactive vendor dashboard interfaces utilizing Next.js and supported mobile feature rollout using Flutter.',
      'Engineered catalog synchronization endpoints, multi-variant inventory controls, and order tracking views.'
    ],
    technologies: ['Next.js', 'Flutter', 'REST APIs', 'Node.js', 'Product Development'],
    highlights: [
      'Delivered unified vendor onboarding experience',
      'Bridged web and mobile interface paradigms for merchant administrative tooling'
    ],
    order: 4,
  },
  {
    id: 'exp-5',
    company: 'Deccan College of Engineering and Technology',
    position: "Bachelor's in Computer Science",
    location: 'Hyderabad, Telangana, India',
    period: '2021 – 2025',
    startDate: '2021-08-01',
    endDate: '2025-06-30',
    isCurrent: false,
    type: 'Education',
    description: [
      'Comprehensive study of Data Structures, Algorithms, Computer Networks, Operating Systems, Database Management Systems, and Distributed Computing.',
      'Led university software development initiatives, hackathons, and technical workshops on full-stack web and mobile architectures.'
    ],
    technologies: ['Computer Science', 'Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering'],
    highlights: [
      'Graduated with honors in Computer Science',
      'Led technical teams in campus software project exhibitions'
    ],
    order: 5,
  }
];

export const initialSkills: ISkill[] = [
  // Frontend
  { id: 'sk-1', name: 'React', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Component architecture, custom hooks, performance profiling, Virtual DOM optimization', order: 1 },
  { id: 'sk-2', name: 'Next.js', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.0, highlight: 'App router, SSR/SSG patterns, API routes, middleware, performance optimization', order: 2 },
  { id: 'sk-3', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Async/await, event loop, closures, modern functional patterns, memory management', order: 3 },
  { id: 'sk-4', name: 'React Native', category: 'Frontend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Cross-platform mobile apps, native bridges, reanimated, offline data sync', order: 4 },
  { id: 'sk-5', name: 'Redux Toolkit', category: 'Frontend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Centralized state, RTK Query, slice architecture, normalization', order: 5 },
  { id: 'sk-6', name: 'React Router', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Dynamic nested routing, navigation guards, deferred data loading', order: 6 },
  { id: 'sk-7', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Utility-first layout, custom design tokens, dark mode systems, zero-runtime CSS', order: 7 },
  { id: 'sk-8', name: 'Framer Motion', category: 'Frontend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Physics-based layout transitions, spring animations, scroll triggers', order: 8 },

  // Backend
  { id: 'sk-9', name: 'Node.js', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Event-driven architecture, streaming I/O, cluster clustering, process lifecycle', order: 9 },
  { id: 'sk-10', name: 'Express.js', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'RESTful API design, modular routing, middleware pipelines, error handlers', order: 10 },
  { id: 'sk-11', name: 'REST APIs', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Strict status code semantics, payload validation, pagination, idempotency', order: 11 },
  { id: 'sk-12', name: 'MongoDB', category: 'Backend', proficiency: 'Advanced', yearsOfExperience: 2.5, highlight: 'Document data modeling, compound indexing, aggregation pipelines, replica sets', order: 12 },
  { id: 'sk-13', name: 'Mongoose', category: 'Backend', proficiency: 'Advanced', yearsOfExperience: 2.5, highlight: 'Schema hooks, validation, population, virtual getters, indexing strategies', order: 13 },
  { id: 'sk-14', name: 'JWT & Bcrypt', category: 'Backend', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Stateless auth, secure HTTP-only cookies, salted hashing, refresh token rotation', order: 14 },
  { id: 'sk-15', name: 'Multer & Cloudinary', category: 'Backend', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Multipart upload pipelines, image transformation, secure asset delivery', order: 15 },

  // DevOps & Cloud
  { id: 'sk-16', name: 'AWS', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'EC2 instance configuration, S3 asset buckets, CloudWatch monitoring, IAM roles', order: 16 },
  { id: 'sk-17', name: 'EC2', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Linux host provisioning, security groups, reverse proxying with NGINX', order: 17 },
  { id: 'sk-18', name: 'Docker', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Multi-stage container builds, Docker Compose orchestration, layer caching', order: 18 },
  { id: 'sk-19', name: 'Jenkins & GitHub Actions', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Automated test pipelines, lint verification, continuous deployment scripts', order: 19 },
  { id: 'sk-20', name: 'Terraform', category: 'DevOps & Cloud', proficiency: 'Intermediate', yearsOfExperience: 1.0, highlight: 'Infrastructure as code, declarative cloud resource provisioning, state locking', order: 20 },
  { id: 'sk-21', name: 'Linux', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.5, highlight: 'System administration, Bash automation, systemd services, SSH key hardening', order: 21 },
  { id: 'sk-22', name: 'CI/CD', category: 'DevOps & Cloud', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Zero-downtime rolling releases, artifact packaging, staging validation', order: 22 },

  // Tools
  { id: 'sk-23', name: 'Git & GitHub', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Interactive rebasing, trunk-based development, semantic versioning, pull requests', order: 23 },
  { id: 'sk-24', name: 'Postman', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'API contract testing, environment variables, automated collection test runs', order: 24 },
  { id: 'sk-25', name: 'VS Code', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 3.0, highlight: 'Custom debugging configurations, container workspaces, lint automation', order: 25 },
  { id: 'sk-26', name: 'Android Studio', category: 'Tools', proficiency: 'Advanced', yearsOfExperience: 2.0, highlight: 'Gradle build tuning, Android profiling, native logcat debugging', order: 26 },
  { id: 'sk-27', name: 'Vercel & Render', category: 'Tools', proficiency: 'Expert', yearsOfExperience: 2.5, highlight: 'Serverless deployment, preview branch previews, environment sync', order: 27 },
];

export const initialContacts: IContact[] = [
  {
    id: 'contact-demo-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techrecruits.io',
    subject: 'Senior Full-Stack / Mobile Opportunity',
    message: 'Hi Sohail, loved your work on JetFyx and your DevOps pipeline breakdown. Would love to discuss an engineering lead role for our fintech product team.',
    status: 'read',
    createdAt: '2026-03-24T10:15:00.000Z',
  }
];
