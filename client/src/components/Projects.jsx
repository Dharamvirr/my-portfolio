import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { projects } from '../data/resumeData'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import SpotlightCard from './SpotlightCard'
import TiltCard from './TiltCard'
import AnimatedHeading from './AnimatedHeading'
import MagneticButton from './MagneticButton'

const categoryStyle = {
  'Full Stack': 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  Backend:      'bg-green-500/10  text-green-400  border-green-500/25',
  Automation:   'bg-orange-500/10 text-orange-400 border-orange-500/25',
}

// Slide in from different directions for variety
const cardVariants = (index) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -40 : 40,
    y: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 },
  },
})

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Heading — mask reveal */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-blue-400 text-sm mb-3 tracking-widest"
          >
            // WHAT I&apos;VE BUILT
          </motion.p>
          <AnimatedHeading tag="h2" className="section-heading" delay={0.1}>
            Featured <span className="gradient-text">Projects</span>
          </AnimatedHeading>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={shouldReduce ? {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } },
              } : cardVariants(index)}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              {/* 3D Tilt wrapper */}
              <TiltCard maxTilt={6} className="h-full">
                {/* Spotlight glow wrapper */}
                <SpotlightCard
                  className="glass-card flex flex-col h-full group overflow-hidden"
                  glowColor={
                    project.featured ? '59,130,246' :
                    index % 2 === 0 ? '168,85,247' : '34,197,94'
                  }
                >
                  {/* Gradient top accent bar — animated width on hover */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${project.color} origin-left`} />

                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.span
                          whileHover={shouldReduce ? {} : { rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
                          transition={{ duration: 0.4 }}
                          className="text-3xl inline-block"
                          role="img"
                          aria-label={project.title}
                        >
                          {project.icon}
                        </motion.span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.featured && (
                            <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                              <FiStar size={11} /> Featured
                            </span>
                          )}
                          <span
                            className={`tech-badge border text-xs ${
                              categoryStyle[project.category] || 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                            }`}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-600 text-xs font-mono">{project.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium mb-3">{project.subtitle}</p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                      {project.highlights.map((h, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-1.5 text-xs text-gray-500"
                        >
                          <span className="text-blue-400 flex-shrink-0 font-bold">✓</span>
                          {h}
                        </motion.span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          whileHover={shouldReduce ? {} : { y: -2, scale: 1.05 }}
                          className="tech-badge bg-white/5 text-gray-300 border-white/10
                                     hover:bg-white/10 hover:text-white hover:border-white/20
                                     transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-5 pt-4 border-t border-white/5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white
                                   text-sm transition-colors group/lk"
                      >
                        <FiGithub size={15} />
                        <span className="group-hover/lk:underline underline-offset-2">View Code</span>
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-blue-400
                                     text-sm transition-colors group/lk"
                        >
                          <FiExternalLink size={15} />
                          <span className="group-hover/lk:underline underline-offset-2">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <MagneticButton strength={0.2}>
            <a href="https://github.com/Dharamvirr" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline flex items-center gap-2">
                <FiGithub /> View All on GitHub
              </button>
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
