import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '../data/resumeData'
import {
  FiGithub,
  FiExternalLink,
  FiCheckCircle,
  FiPlay,
  FiRotateCcw,
  FiActivity,
} from 'react-icons/fi'
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiPython,
  SiLangchain,
  SiLanggraph,
  SiQdrant,
} from 'react-icons/si'

const projectTechIcons = {
  React: SiReact,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Python: SiPython,
  LangGraph: SiLanggraph,
  Qdrant: SiQdrant,
}

const categories = ['All Projects', 'Full Stack & AI', 'Backend & Systems']

const RateLimiterSimulator = () => {
  const MAX_LIMIT = 8
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState([])
  const [running, setRunning] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  const resetWindow = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setCount(0)
    setLogs([])
    setRunning(false)
  }

  const triggerBurst = () => {
    resetWindow()
    setRunning(true)
    const total = 12
    for (let i = 1; i <= total; i++) {
      const t = setTimeout(() => {
        setCount((prev) => {
          const allowed = prev < MAX_LIMIT
          const threadId = `Thread-${String((i % 4) + 1).padStart(2, '0')}`
          setLogs((old) => [
            ...old,
            {
              id: i,
              thread: threadId,
              status: allowed ? 200 : 429,
              text: allowed ? '200 OK' : '429 BLOCKED',
            },
          ])
          return allowed ? prev + 1 : prev
        })
        if (i === total) setRunning(false)
      }, i * 65)
      timersRef.current.push(t)
    }
  }

  return (
    <div className="my-5 p-4 rounded-xl bg-[#090B10] border border-white/[0.08]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400 uppercase tracking-wider">
            <FiActivity size={12} />
            <span>Interactive Concurrency Sandbox · Fixed Window (Limit: {MAX_LIMIT})</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
            Window Usage: <strong className="text-white">{count}/{MAX_LIMIT}</strong> · Synchronized Object Lock
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerBurst}
            disabled={running}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-mono text-[11px] font-bold transition-colors cursor-pointer"
          >
            <FiPlay size={11} />
            <span>{running ? 'Bursting...' : 'Burst 12 Threads'}</span>
          </button>
          <button
            onClick={resetWindow}
            aria-label="Reset Rate Limiter Window"
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 transition-colors cursor-pointer"
            title="Reset Window"
          >
            <FiRotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Live Output Stream */}
      {logs.length === 0 ? (
        <div className="py-3 text-center text-[11px] font-mono text-slate-500">
          Click &ldquo;Burst 12 Threads&rdquo; to simulate concurrent requests hitting the Java rate limiter.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`px-2 py-1.5 rounded-md border font-mono text-[10px] flex items-center justify-between ${
                log.status === 200
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/25 text-rose-300'
              }`}
            >
              <span className="text-slate-400">#{log.id}</span>
              <span className="font-bold">{log.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const shouldReduce = useReducedMotion()

  const filteredProjects =
    activeCategory === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-container border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
            Selected Systems &amp; Software
          </p>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Thread-safe concurrent services, full-stack distributed applications, and automated data pipelines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.97 }}
              transition={{ duration: 0.25 }}
              className={`craft-card flex flex-col justify-between p-6 sm:p-7 border border-white/[0.08] hover:border-sky-500/35 transition-all duration-200 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          Featured System
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-400 font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Source Code"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live demo of ${project.title}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold transition-colors"
                        title="Live Demo"
                      >
                        <span>Live Demo</span>
                        <FiExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed my-4">
                  {project.description}
                </p>

                {/* Embedded Interactive Rate Limiter Simulator */}
                {project.hasSimulator && <RateLimiterSimulator />}

                {/* Architectural Highlights */}
                <div className="my-5 pt-4 border-t border-white/[0.06]">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Engineering Highlights
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" size={12} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stack footer */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                {project.techStack.map((tech) => {
                  const Icon = projectTechIcons[tech]
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-slate-300"
                    >
                      {Icon && <Icon size={12} className="text-sky-400" />}
                      <span>{tech}</span>
                    </span>
                  )
                })}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
