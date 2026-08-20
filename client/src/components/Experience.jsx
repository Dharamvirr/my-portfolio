import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { experience } from '../data/resumeData'
import { FiMapPin, FiCalendar } from 'react-icons/fi'

// ─── Safe highlighted text renderer (replaces dangerouslySetInnerHTML) ────────
const HighlightText = ({ html }) => {
  const parts = html.split(/(<b class="[^"]*">.*?<\/b>)/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/<b class="([^"]*)">(.*?)<\/b>/)
        if (match) {
          return (
            <b key={i} className={match[1]}>
              {match[2]}
            </b>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.1 : 0.6 } },
  }

  return (
    <section id="experience" className="section-container bg-[#0c0c18]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-3 tracking-widest">// WHERE I'VE WORKED</p>
          <h2 className="section-heading">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent md:-translate-x-1/2" />

          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={fadeUp}
              className="relative flex gap-6 md:gap-0 mb-16 last:mb-0"
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-[#0c0c18] z-10 md:-translate-x-1/2 mt-6 shadow-lg shadow-blue-500/30" />

              <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <motion.div
                  className="glass-card p-6 md:p-7 card-hover group"
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl" role="img" aria-label="company">{exp.logo}</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mt-1">
                        {exp.company}
                      </h3>
                      <p className={`font-medium bg-gradient-to-r ${exp.color} bg-clip-text text-transparent text-sm mt-0.5`}>
                        {exp.role} · {exp.department}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-5 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-blue-400" size={12} aria-hidden="true" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-purple-400" size={12} aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-4 bg-white/3 rounded-xl border border-white/5">
                    {exp.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-base" role="img" aria-label={m.label}>{m.icon}</div>
                        <div className="text-green-400 font-black text-lg leading-tight">{m.value}</div>
                        <div className="text-gray-600 text-[10px] leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets — safe rendering without dangerouslySetInnerHTML */}
                  <ul className="space-y-3 mb-5" aria-label="Key achievements">
                    {exp.rawBullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="text-blue-500 mt-1 flex-shrink-0 text-base" aria-hidden="true">▸</span>
                        <span>
                          <HighlightText html={bullet} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5" role="list" aria-label="Technologies used">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        role="listitem"
                        className="tech-badge bg-blue-500/8 text-blue-300 border-blue-500/20 hover:bg-blue-500/15 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <p className="text-gray-600 text-sm font-mono">
            More on{' '}
            <a
              href="https://linkedin.com/in/dharamvir-singh-aa908b2a1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              LinkedIn →
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience
