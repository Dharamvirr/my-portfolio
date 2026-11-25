// ============================================================
//  resumeData.js — Structured Engineering Portfolio Data
//  Candidate: Dharamvir Singh (SDE · Data Systems · GenAI)
//  Institute: MNNIT Allahabad (2022 - 2026)
// ============================================================

export const personalInfo = {
  name: 'Dharamvir Singh',
  firstName: 'Dharamvir',
  lastName: 'Singh',
  initials: 'DS',
  email: 'dharamvir78914@gmail.com',
  phone: '+91-6350113604',
  linkedin: 'https://www.linkedin.com/in/coderdharamvir/',
  github: 'https://github.com/Dharamvirr',
  leetcode: 'https://leetcode.com/u/coderdharamvir/',
  codeforces: 'https://codeforces.com/profile/coderdharamvir',
  codechef: 'https://www.codechef.com/users/dharamvir9',
  youtube: 'https://www.youtube.com/@RealGuideBhai',
  githubUsername: 'Dharamvirr',
  leetcodeUsername: 'coderdharamvir',
  codeforcesUsername: 'coderdharamvir',
  codechefUsername: 'dharamvir9',
  youtubeHandle: '@RealGuideBhai',
  linkedinUsername: 'coderdharamvir',
  website: 'https://dharamvir-singh.vercel.app',
  role: 'Software Development Engineer',
  specialization: 'Backend Systems, Data Engineering & Agentic AI',
  tagline: 'Building resilient backend systems, high-throughput data pipelines, and reliable AI agents.',
  summary:
    'Ex-SDE Intern at DealShare (cut BigQuery scan costs by 57% & runtime by 20%). LeetCode Knight (1925) and Codeforces Expert (1600) with 2,000+ algorithmic solves. Building production GenAI systems with LangChain, LangGraph, RAG, Agent Memory, and Human-in-the-Loop workflows.',
  location: 'Prayagraj, India',
  openToWork: true,
  status: 'Open to Full-time SDE Roles (2026 Batch) · MNNIT Allahabad',
}

export const heroMetrics = [
  {
    value: '1925',
    label: 'LeetCode Knight',
    detail: 'Top 3.82% Globally',
    accent: 'text-amber-400',
    border: 'hover:border-amber-500/40',
  },
  {
    value: '1600',
    label: 'Codeforces Expert',
    detail: 'Blue-Rated Competitor',
    accent: 'text-sky-400',
    border: 'hover:border-sky-500/40',
  },
  {
    value: '2000+',
    label: 'Algorithmic Solves',
    detail: '100+ Live Rated Contests',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
  },
  {
    value: '-57%',
    label: 'BigQuery Scan Cost',
    detail: 'Production Impact @ DealShare',
    accent: 'text-indigo-400',
    border: 'hover:border-indigo-500/40',
  },
]

export const education = [
  {
    institution: 'Motilal Nehru National Institute of Technology (MNNIT) Allahabad',
    shortName: 'MNNIT Allahabad',
    degree: 'B.Tech in Electronics and Communication Engineering',
    score: 'CPI: 7.69 / 10',
    duration: 'Nov 2022 – Aug 2026',
    location: 'Prayagraj, Uttar Pradesh',
    details: 'Core coursework in Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS, and Distributed Computing.',
    badge: 'Institute of National Importance',
  },
  {
    institution: "Archana Children's Academy",
    shortName: "Archana Children's Academy",
    degree: 'Higher Secondary Education (RBSE XII & X)',
    score: '96.80% (Class XII) · 94.14% (Class X)',
    duration: '2018 – 2021',
    location: 'Jaipur, Rajasthan',
    details: 'Science & Mathematics stream with top state-level merit distinction.',
    badge: 'Academic Distinction',
  },
]

export const experience = [
  {
    company: 'DealShare (Merabo Labs Private Limited)',
    shortCompany: 'DealShare',
    role: 'Software Engineer Intern',
    team: 'Data Engineering',
    duration: 'Jan 2026 – Jul 2026',
    location: 'Bengaluru, India',
    type: 'Engineering Internship',
    summary:
      'Engineered BigQuery telemetry pipelines in Databricks and implemented automated auto-cancellation via GCP Cloud Functions to prevent slot contention, while refactoring large-scale production SQL workloads.',
    metrics: [
      { label: 'Scan Cost Reduction', value: '57% ↓', note: 'Partition pruning & join refactoring' },
      { label: 'Query Runtime', value: '20% ↓', note: 'Execution plan optimization' },
      { label: 'Slot Utilization', value: '19.7% ↓', note: 'Cluster compute efficiency' },
      { label: 'Pipelines Monitored', value: '150+', note: 'Databricks & INFORMATION_SCHEMA' },
    ],
    achievements: [
      {
        title: 'BigQuery Monitoring Pipeline in Databricks',
        description:
          'Developed a BigQuery monitoring pipeline in Databricks (Python) to extract telemetry and byte-scan metadata from INFORMATION_SCHEMA across 150+ pipelines and 80+ Tableau sources.',
      },
      {
        title: 'Automated Slack Alerting & Cloud Functions Auto-Cancel',
        description:
          'Implemented automated Slack alerting and GCP Cloud Functions (Python) to auto-cancel runaway BigQuery jobs exceeding 12 min & 3+ slot-hours or 15 min runtime, preventing slot contention.',
      },
      {
        title: 'Large-Scale BigQuery SQL Optimization',
        description:
          'Optimized large-scale BigQuery SQL workloads via partition pruning, clustering, and join refactoring, reducing scan costs by 57%, query runtime by 20%, and slot utilization by 19.7%.',
      },
      {
        title: 'Incremental Upserts & Materialized Views Migration',
        description:
          'Migrated backend-to-BigQuery ingestion from daily full-table reloads to incremental upserts and reusable materialized views, cutting redundant data scans and speeding up downstream reporting.',
      },
    ],
    techStack: ['BigQuery', 'Databricks', 'Python', 'GCP Cloud Functions', 'SQL', 'ETL/ELT', 'Data Pipelines', 'Pandas', 'Tableau'],
  },
]

export const projects = [
  {
    id: 'food-delivery',
    title: 'Food Delivery Platform',
    subtitle: 'Full-Stack Food Delivery with GenAI Concierge & RAG Search',
    category: 'Full Stack & AI',
    featured: true,
    hasSimulator: false,
    description:
      'Engineered an enterprise-grade food delivery application featuring 20+ RESTful APIs, JWT/RBAC security, Stripe checkout, Socket.io live tracking, coupled with a RAG vector search and an autonomous LangGraph Culinary Concierge.',
    highlights: [
      'Engineered core backend using Node.js, Express.js, and MongoDB with 20+ RESTful APIs, JWT/RBAC auth, Stripe payments, and Socket.io real-time order tracking',
      'Implemented RAG retrieval pipeline using Qdrant Vector DB (3072-dim embeddings) for semantic dish search, dietary filtering, and grounded menu recommendations',
      'Architected autonomous GenAI Culinary Concierge with LangGraph, combining dynamic tool-calling and Human-in-the-Loop (HITL) interrupts for safe cart checkout and meal guidance',
      'Built React.js frontend and optimized asset delivery via Rollup code-splitting, achieving >65% bundle reduction for faster initial page loads',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'LangGraph', 'Qdrant', 'REST APIs', 'Socket.io', 'JWT', 'Stripe'],
    liveDemo: 'https://food-delivery-web-app-tau.vercel.app/',
    github: 'https://github.com/Dharamvirr',
    date: 'May 2025',
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener Service',
    subtitle: 'Containerized High-Traffic Redirection & Rate-Limited API',
    category: 'Backend & Systems',
    featured: true,
    hasSimulator: false,
    description:
      'High-performance URL shortening service supporting custom short URLs, fast redirection, and detailed click analytics with Redis caching and Docker containerization.',
    highlights: [
      'Developed URL shortening service using Node.js, Express.js, and MongoDB, supporting custom short URLs, fast redirection, and detailed click analytics',
      'Implemented Redis for low-latency lookup caching and API rate limiting to protect endpoints under high traffic and minimize repetitive database reads',
      'Containerized backend service using Docker to ensure reproducible environments, consistent configuration, and reliable deployment',
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'REST APIs'],
    liveDemo: null,
    github: 'https://github.com/Dharamvirr',
    date: 'June 2026',
  },
]

export const aiPipelineStages = [
  {
    id: 'ingest',
    step: '01',
    title: 'Context & RAG Retrieval',
    tag: 'LangChain · RAG',
    summary: 'Semantic chunking, dense vector embeddings, and LangChain hybrid retrievers (BM25 + vector reranking) to ground LLM responses in verified data without hallucinations.',
    specs: ['LangChain Retrievers', 'Vector Indexing', 'Hybrid Search & Rerank'],
  },
  {
    id: 'memory',
    step: '02',
    title: 'Short & Long-Term Memory',
    tag: 'LangGraph Checkpointers',
    summary: 'Dual-layer memory architecture using LangGraph thread-level checkpointers for short-term context combined with persistent cross-session episodic vector stores.',
    specs: ['LangGraph Checkpointer', 'Thread State Buffer', 'Long-Term Vector Store'],
  },
  {
    id: 'agent',
    step: '03',
    title: 'Cyclic Agent Orchestration',
    tag: 'LangGraph · AI Agents',
    summary: 'Stateful cyclic workflows in LangGraph with conditional edges, structured tool-calling via LangChain, and deterministic error-recovery loops.',
    specs: ['LangGraph StateGraph', 'Conditional Edges', 'Structured Tool Calling'],
  },
  {
    id: 'hitl',
    step: '04',
    title: 'Human-in-the-Loop (HITL)',
    tag: 'Safety Interrupts',
    summary: 'Explicit LangGraph interrupt() breakpoints before high-stakes actions—pausing graph execution for human approval, state inspection, and safe resume.',
    specs: ['LangGraph interrupt()', 'Approval Checkpoints', 'Audit Trail Logging'],
  },
]

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages for competitive programming and production services',
    skills: [
      { name: 'C++', level: 'Advanced', note: 'DSA & Competitive Programming' },
      { name: 'JavaScript', level: 'Proficient', note: 'Full-Stack & Node.js Services' },
      { name: 'SQL', level: 'Production', note: 'Relational Modeling & Query Tuning' },
      { name: 'Python', level: 'Advanced', note: 'Data Pipelines, GenAI & Automation' },
      { name: 'Java', level: 'Proficient', note: 'OOP & Multithreading' },
    ],
  },
  {
    id: 'backend-frontend-ai',
    title: 'Backend, Frontend & AI',
    description: 'Modern full-stack architectures, vector search, and agentic workflows',
    skills: [
      { name: 'Node.js & Express.js', level: 'Production', note: 'RESTful APIs, JWT, RBAC' },
      { name: 'React.js', level: 'Production', note: 'Frontend UI, Rollup Splitting' },
      { name: 'Socket.io', level: 'Production', note: 'Real-time Bidirectional Events' },
      { name: 'LangChain & LangGraph', level: 'Applied', note: 'Stateful Graphs, Cyclic Agents & HITL' },
      { name: 'RAG & Vector DB', level: 'Applied', note: 'Qdrant (3072-dim), Embeddings & Search' },
    ],
  },
  {
    id: 'databases-caching',
    title: 'Databases & Caching',
    description: 'Relational, document, key-value, and vector storage engines',
    skills: [
      { name: 'PostgreSQL & MySQL', level: 'Proficient', note: 'Relational DBs, Schemas & Indexes' },
      { name: 'MongoDB', level: 'Production', note: 'NoSQL Schemas & Compound Indexing' },
      { name: 'Redis', level: 'Production', note: 'Low-latency Caching & Rate Limiting' },
      { name: 'Qdrant (Vector DB)', level: 'Applied', note: 'High-dim Embeddings & Semantic Search' },
    ],
  },
  {
    id: 'data-cloud',
    title: 'Data Engineering & Cloud',
    description: 'Warehouse query optimization, cloud functions, and telemetry pipelines',
    skills: [
      { name: 'Google BigQuery', level: 'Production', note: 'Partition Pruning, Clustering & Views' },
      { name: 'Databricks', level: 'Production', note: '150+ Pipeline Telemetry (Python)' },
      { name: 'GCP Cloud Functions', level: 'Production', note: 'Auto-cancel Runaway Jobs' },
      { name: 'ETL/ELT & Data Pipelines', level: 'Production', note: 'Incremental Upserts & Data Scans' },
      { name: 'Pandas', level: 'Production', note: 'Data Wrangling & Pipeline Analytics' },
    ],
  },
  {
    id: 'devops-tools',
    title: 'DevOps & Tools',
    description: 'Containerization, version control, build tools, and API testing',
    skills: [
      { name: 'Docker', level: 'Production', note: 'Containerization & Reproducible Environments' },
      { name: 'Git & GitHub', level: 'Proficient', note: 'Version Control & Workflows' },
      { name: 'Postman', level: 'Proficient', note: 'API Testing & Documentation' },
      { name: 'Vite', level: 'Proficient', note: 'Frontend Tooling & Bundling' },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    description: 'Fundamental engineering principles and systems knowledge',
    skills: [
      { name: 'Object-Oriented Programming', level: 'Core', note: 'Design Principles & Patterns' },
      { name: 'Operating Systems', level: 'Core', note: 'Threads, Process Scheduling, Memory' },
      { name: 'Database Management Systems', level: 'Core', note: 'ACID, Indexing, Transactions' },
      { name: 'Computer Networks', level: 'Core', note: 'TCP/IP, HTTP, WebSockets' },
      { name: 'System Design', level: 'Core', note: 'Scalability, Caching, Concurrency' },
    ],
  },
]

export const achievements = [
  {
    id: 'problems-solved',
    title: '2,000+ Algorithmic Solves',
    score: '2000+',
    rank: '100+ Rated Contests',
    platform: 'Contests & Platforms',
    link: 'https://leetcode.com/u/coderdharamvir/',
    description: 'Solved 2000+ Data Structures and Algorithms problems across 100+ rated contests. Achieved Codeforces Expert (max rating 1600) and LeetCode Knight (max rating 1925, Top 3.82% globally).',
  },
  {
    id: 'leetcode',
    title: 'LeetCode Knight',
    score: '1925',
    rank: 'Top 3.82% Worldwide',
    platform: 'LeetCode',
    link: 'https://leetcode.com/u/coderdharamvir/',
    description: 'Consistently ranked in the top 3.82% globally with a max rating of 1925 across weekly and biweekly algorithmic contests.',
  },
  {
    id: 'codeforces',
    title: 'Codeforces Expert',
    score: '1600',
    rank: 'Blue-Rated Specialist',
    platform: 'Codeforces',
    link: 'https://codeforces.com/profile/coderdharamvir',
    description: 'Earned the official Expert title (max rating 1600) by solving complex algorithmic, dynamic programming, and graph problems.',
  },
  {
    id: 'youtube-educator',
    title: 'DSA Educator (YouTube)',
    score: 'Creator',
    rank: '@RealGuideBhai',
    platform: 'YouTube',
    link: 'https://www.youtube.com/@RealGuideBhai',
    description: 'Create and publish video tutorials explaining algorithmic approaches and contest solutions for problems across LeetCode, CodeChef, and Codeforces.',
  },
  {
    id: 'softathlon',
    title: 'Softathlon @ MNNIT',
    score: 'Rank 4',
    rank: '1,000+ Competitors',
    platform: 'MNNIT Allahabad',
    link: null,
    description: 'Secured Rank 4 out of 1,000+ participants in the Softathlon competition at MNNIT Allahabad, demonstrating software engineering proficiency.',
  },
  {
    id: 'math-rush',
    title: 'Math Rush Contest',
    score: 'Finalist',
    rank: 'Finalist Position',
    platform: 'MNNIT Allahabad',
    link: null,
    description: 'Achieved a Finalist position in the Math Rush competition, recognized for advanced mathematical and analytical problem-solving.',
  },
]

export const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'AI & Skills', to: 'skills' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Contact', to: 'contact' },
]
