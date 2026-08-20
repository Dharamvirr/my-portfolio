// ============================================================
//  resumeData.js — All resume data for Dharamvir Singh
//  Source: Dharamvir_Resume.pdf
// ============================================================

export const personalInfo = {
  name: 'Dharamvir Singh',
  firstName: 'Dharamvir',
  lastName: 'Singh',
  initials: 'DS',
  email: 'dharamvir78914@gmail.com',
  phone: '+91-6350113604',
  linkedin: 'https://linkedin.com/in/dharamvir-singh-aa908b2a1',
  github: 'https://github.com/Dharamvirr',
  leetcode: 'https://leetcode.com/u/dharamvir78914/',   // ✅ verified from resume email
  codeforces: 'https://codeforces.com/profile/Dharamvirr', // update if username differs
  githubUsername: 'Dharamvirr',
  role: 'Software Development Engineer',
  tagline: 'Building scalable systems, one commit at a time',
  location: 'Prayagraj, India',
  openToWork: true,
  availableFor: ['Full-time SDE Roles', 'Internships', 'Freelance Projects'],
}

export const education = [
  {
    institution: 'Motilal Nehru National Institute of Technology (MNNIT), Allahabad',
    shortName: 'MNNIT Allahabad',
    degree: 'B.Tech, Electronics and Communication Engineering',
    score: 'CPI: 8/10',
    duration: 'Nov 2022 – Aug 2026',
    location: 'Prayagraj, India',
    logo: '🎓',
    color: 'from-blue-500 to-purple-500',
  },
  {
    institution: "Archana Children's Academy, Jaipur",
    shortName: "Archana Children's Academy",
    degree: 'Higher Secondary — RBSE',
    score: '96.80% (XII) · 94.14% (X)',
    duration: '2018 – 2021',
    location: 'Jaipur, India',
    logo: '🏫',
    color: 'from-green-500 to-teal-500',
  },
]

export const experience = [
  {
    company: 'DealShare (Merabo Labs Private Limited)',
    role: 'Software Development Engineer Intern',
    department: 'Data Engineering',
    duration: 'Jan 2026 – June 2026',
    location: 'Bengaluru, India',
    type: 'Internship',
    color: 'from-blue-500 to-cyan-400',
    logo: '🏢',
    bullets: [
      {
        text: 'Developed a scalable BigQuery monitoring pipeline in Databricks using Python and Pandas, automating telemetry collection and reporting across',
        highlights: [
          { text: '150+ production pipelines', color: 'text-blue-400' },
          { text: '80+ Tableau data sources', color: 'text-blue-400' },
        ],
      },
      {
        text: 'Implemented automated anomaly detection, alerting, and service-health monitoring to identify abnormal BigQuery cost spikes, improving operational reliability, incident response, and platform stability.',
        highlights: [],
      },
      {
        text: 'Optimized large-scale BigQuery SQL workloads through partition pruning, join optimization, and query refactoring — reducing scan costs by',
        highlights: [
          { text: '57% ↓', color: 'text-green-400' },
          { text: 'query runtime by 20% ↓', color: 'text-green-400' },
          { text: 'slot utilization by 19.7% ↓', color: 'text-green-400' },
        ],
      },
      {
        text: 'Engineered reusable BigQuery tables, materialized views, and automated data services to replace custom SQL models, improving performance, scalability, and cost efficiency by',
        highlights: [
          { text: '50% ↑', color: 'text-green-400' },
        ],
      },
    ],
    rawBullets: [
      'Developed a scalable BigQuery monitoring pipeline in Databricks using Python and Pandas, automating telemetry collection and reporting across <b class="text-blue-400">150+ production pipelines</b> and <b class="text-blue-400">80+ Tableau data sources</b>.',
      'Implemented automated anomaly detection, alerting, and service-health monitoring to identify abnormal BigQuery cost spikes, improving operational reliability, incident response, and platform stability.',
      'Optimized large-scale BigQuery SQL workloads through partition pruning, join optimization, and query refactoring — reducing scan costs by <b class="text-green-400">57%</b>, query runtime by <b class="text-green-400">20%</b>, and slot utilization by <b class="text-green-400">19.7%</b>.',
      'Engineered reusable BigQuery tables, materialized views, and automated data services to replace custom SQL models, improving performance, scalability, and cost efficiency by <b class="text-green-400">50%</b>.',
    ],
    techStack: ['Python', 'Pandas', 'BigQuery', 'Databricks', 'ETL', 'SQL', 'Tableau', 'Data Pipelines'],
    metrics: [
      { label: 'Scan Cost Reduction', value: '57%', icon: '📉' },
      { label: 'Runtime Improvement', value: '20%', icon: '⚡' },
      { label: 'Cost Efficiency', value: '50%', icon: '💰' },
      { label: 'Pipelines Monitored', value: '150+', icon: '🔧' },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Food Delivery Platform',
    subtitle: 'Full-Stack MERN Application',
    description:
      'A scalable Full-Stack Food Delivery Platform using the MERN Stack with 20+ modular RESTful APIs, optimized MongoDB indexing, order tracking, and inventory management. Integrated Stripe Payment Gateway and real-time chat via Socket.io.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io', 'Stripe', 'JWT', 'Redis', 'RBAC'],
    github: 'https://github.com/Dharamvirr',
    demo: null,
    date: 'May 2025',
    highlights: ['20+ RESTful APIs', 'Stripe Payment Gateway', 'Real-time chat (Socket.io)', 'JWT + RBAC Auth', 'bcrypt + CORS Security'],
    category: 'Full Stack',
    color: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/20',
    featured: true,
    icon: '🍕',
  },
  {
    id: 2,
    title: 'URL Shortener Service',
    subtitle: 'Microservice with Redis & Docker',
    description:
      'A URL shortening service using Node.js, Express.js, and MongoDB with custom URL support, fast redirection, and detailed click analytics. Implemented Redis for caching and rate limiting; containerized with Docker.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'REST APIs'],
    github: 'https://github.com/Dharamvirr',
    demo: null,
    date: 'June 2026',
    highlights: ['Redis caching & rate limiting', 'Docker containerized', 'Click analytics', 'Custom URL support'],
    category: 'Backend',
    color: 'from-green-500 to-teal-400',
    border: 'border-green-500/20',
    featured: false,
    icon: '🔗',
  },
  {
    id: 3,
    title: 'Thread-Safe API Rate Limiter',
    subtitle: 'Concurrent Java System',
    description:
      'A highly concurrent rate limiter using the Fixed Window Counter algorithm and object-level locking via Java\'s synchronized mechanism. Validated strict thread safety by simulating 100+ simultaneous threads using ExecutorService and CountDownLatch.',
    techStack: ['Java', 'Multithreading', 'Concurrency', 'ExecutorService', 'CountDownLatch', 'Synchronized'],
    github: 'https://github.com/Dharamvirr',
    demo: null,
    date: 'July 2026',
    highlights: ['100+ simultaneous threads', 'Zero race conditions', 'Fixed Window Counter', 'Object-level locking'],
    category: 'Backend',
    color: 'from-yellow-500 to-orange-400',
    border: 'border-yellow-500/20',
    featured: false,
    icon: '⚡',
  },
  {
    id: 4,
    title: 'Automated HR Outreach Pipeline',
    subtitle: 'Python Automation & Web Scraping',
    description:
      'A web scraping pipeline using Python and Selenium to systematically extract HR contact information from Instahyre. Developed an automated email outreach system leveraging Mailmeteor to dispatch personalized, targeted campaigns at scale.',
    techStack: ['Python', 'Selenium', 'Mailmeteor', 'Web Scraping', 'Automation', 'CSV'],
    github: 'https://github.com/Dharamvirr',
    demo: null,
    date: 'Aug 2026',
    highlights: ['Automated lead generation', 'Personalized campaigns at scale', 'Eliminated manual effort', 'Instahyre scraping'],
    category: 'Automation',
    color: 'from-orange-500 to-red-400',
    border: 'border-orange-500/20',
    featured: false,
    icon: '🤖',
  },
]

export const skills = {
  'Programming Languages': {
    icon: '💻',
    color: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    items: ['C++', 'Python', 'Java', 'JavaScript'],
  },
  'Data Engineering': {
    icon: '📊',
    color: 'from-cyan-400 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-400',
    items: ['BigQuery', 'Databricks', 'ETL/ELT', 'Data Pipelines', 'Web Scraping', 'MySQL', 'Automation', 'Pandas'],
  },
  'Backend Development': {
    icon: '⚙️',
    color: 'from-green-400 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Multithreading', 'Concurrency', 'Selenium', 'Socket.io'],
  },
  'DevOps & Tools': {
    icon: '🛠️',
    color: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Redis', 'Mailmeteor', 'Debugging', 'Testing'],
  },
  'Core CS': {
    icon: '🧠',
    color: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
    items: ['OOP', 'Operating Systems', 'DBMS', 'Computer Networks', 'Distributed Systems', 'System Design'],
  },
}

export const achievements = [
  {
    icon: '⚡',
    title: 'LeetCode Knight',
    metric: '1925',
    label: 'Max Rating',
    sub: 'Top 3.82% Globally',
    color: 'from-yellow-400 to-orange-500',
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/10',
    link: 'https://leetcode.com/u/dharamvir78914/',
    platform: 'LeetCode',
  },
  {
    icon: '🔵',
    title: 'Codeforces Expert',
    metric: '1600',
    label: 'Max Rating',
    sub: 'Blue Rated Badge',
    color: 'from-blue-400 to-blue-600',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/10',
    link: 'https://codeforces.com/profile/dharamvir',
    platform: 'Codeforces',
  },
  {
    icon: '🧩',
    title: 'DSA Problems',
    metric: '2000+',
    label: 'Problems Solved',
    sub: '100+ Rated Contests',
    color: 'from-green-400 to-emerald-500',
    border: 'border-green-500/30',
    glow: 'shadow-green-500/10',
    platform: 'Multiple',
  },
  {
    icon: '🏆',
    title: 'Softathlon @ MNNIT',
    metric: 'Rank 4',
    label: 'Competition Rank',
    sub: '1000+ Participants',
    color: 'from-purple-400 to-pink-500',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/10',
    platform: 'MNNIT Allahabad',
  },
  {
    icon: '🎯',
    title: 'Math Rush',
    metric: 'Finalist',
    label: 'Competition',
    sub: 'Advanced Analytical Skills',
    color: 'from-red-400 to-rose-500',
    border: 'border-red-500/30',
    glow: 'shadow-red-500/10',
    platform: 'National',
  },
]

export const stats = [
  { label: 'DSA Problems', value: 2000, suffix: '+', color: 'text-green-400', icon: '🧩' },
  { label: 'LeetCode Rating', value: 1925, suffix: '', color: 'text-yellow-400', icon: '⚡' },
  { label: 'Codeforces Rating', value: 1600, suffix: '', color: 'text-blue-400', icon: '🔵' },
  { label: 'CPI at MNNIT', value: 8.0, suffix: '/10', decimals: 1, color: 'text-purple-400', icon: '🎓' },
]

export const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Contact', to: 'contact' },
]

// ─── "Currently Exploring" — signals growth mindset to HRs ───────────────
export const currentlyLearning = [
  { label: 'System Design', icon: '🏗️', color: 'text-blue-400', border: 'border-blue-500/25', bg: 'bg-blue-500/8' },
  { label: 'Kubernetes', icon: '☸️', color: 'text-cyan-400', border: 'border-cyan-500/25', bg: 'bg-cyan-500/8' },
  { label: 'Apache Kafka', icon: '⚡', color: 'text-orange-400', border: 'border-orange-500/25', bg: 'bg-orange-500/8' },
  { label: 'AWS Cloud', icon: '☁️', color: 'text-yellow-400', border: 'border-yellow-500/25', bg: 'bg-yellow-500/8' },
  { label: 'Go (Golang)', icon: '🔵', color: 'text-teal-400', border: 'border-teal-500/25', bg: 'bg-teal-500/8' },
]
