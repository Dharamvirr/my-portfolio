import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'
import { education, stats, personalInfo } from '../data/resumeData'
import { FiMapPin, FiCalendar, FiExternalLink } from 'react-icons/fi'
import SpotlightCard from './SpotlightCard'
import AnimatedHeading from './AnimatedHeading'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="section-container">
      <motion.div ref={ref}>
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-blue-400 text-sm mb-3 tracking-widest"
          >
            // WHO I AM
          </motion.p>
          <AnimatedHeading tag="h2" className="section-heading" delay={0.1}>
            About <span className="gradient-text">Me</span>
          </AnimatedHeading>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ originX: 0.5 }}
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="space-y-5"
          >
            <SpotlightCard className="glass-card p-8 card-hover">
              <h3 className="text-xl font-bold text-white mb-5">
                Hi, I&apos;m <span className="gradient-text">Dharamvir</span> 👋
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                A passionate{' '}
                <span className="text-blue-400 font-semibold">B.Tech (ECE)</span> student at{' '}
                <span className="text-purple-400 font-semibold">MNNIT Allahabad</span>{' '}
                (CPI: <span className="text-white font-bold">8/10</span>), building scalable
                backend systems and data engineering solutions.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Recently interned at{' '}
                <span className="text-blue-400 font-semibold">DealShare</span> where I optimized
                BigQuery workloads — reducing scan costs by{' '}
                <span className="text-green-400 font-bold">57%</span> and improving cost efficiency
                by <span className="text-green-400 font-bold">50%</span> across 150+ production
                pipelines.
              </p>
              <p className="text-gray-400 leading-relaxed">
                A competitive programmer at heart —{' '}
                <span className="text-yellow-400 font-semibold">LeetCode Knight</span>{' '}
                (Rating: <span className="text-white font-bold">1925</span>, Top{' '}
                <span className="text-yellow-400 font-bold">3.82%</span> globally) and{' '}
                <span className="text-blue-400 font-semibold">Codeforces Expert</span>{' '}
                (Rating: <span className="text-white font-bold">1600</span>) with{' '}
                <span className="text-green-400 font-bold">2000+</span> problems solved.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-blue-400" size={13} /> {personalInfo.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-purple-400" size={13} /> Graduating Aug 2026
                </span>
              </div>
            </SpotlightCard>

            {/* Education cards */}
            <div className="space-y-3">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.12 }}
                >
                  <SpotlightCard className="glass-card p-5 flex gap-4 items-start card-hover group">
                    <span className="text-3xl mt-0.5 flex-shrink-0" role="img" aria-label="school">{edu.logo}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-blue-400 transition-colors">
                        {edu.shortName}
                      </h4>
                      <p className="text-gray-400 text-xs mb-1">{edu.degree}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`text-xs font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                          {edu.score}
                        </span>
                        <span className="text-gray-600 text-xs">{edu.duration}</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats + GitHub */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="space-y-5"
          >
            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease: 'backOut' }}
                >
                  <SpotlightCard className="glass-card p-5 text-center card-hover group h-full">
                    <div className="text-2xl mb-2" role="img" aria-label={stat.label}>{stat.icon}</div>
                    <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1 group-hover:scale-110 transition-transform`}>
                      {isInView ? (
                        <CountUp
                          end={stat.value}
                          duration={2.5}
                          decimals={stat.decimals || 0}
                          suffix={stat.suffix}
                          useEasing
                        />
                      ) : '0'}
                    </div>
                    <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* GitHub stats embed with skeleton */}
            <SpotlightCard className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm font-mono">// github/{personalInfo.githubUsername}</p>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
                >
                  View <FiExternalLink size={11} />
                </a>
              </div>
              <div className="space-y-3">
                {[
                  `https://github-readme-stats.vercel.app/api?username=${personalInfo.githubUsername}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d0d0d&title_color=60a5fa&icon_color=a855f7&text_color=9ca3af&rank_icon=github`,
                  `https://github-readme-streak-stats.herokuapp.com/?user=${personalInfo.githubUsername}&theme=tokyonight&hide_border=true&background=0d0d0d&ring=3b82f6&fire=a855f7&currStreakLabel=60a5fa`,
                ].map((src, i) => (
                  <div key={i} className="relative">
                    <div className="img-skeleton w-full rounded-xl absolute inset-0" id={`gh-sk-${i}`} />
                    <img
                      src={src}
                      alt={i === 0 ? 'GitHub contribution stats' : 'GitHub streak stats'}
                      className="w-full rounded-xl relative z-10"
                      loading="lazy"
                      onLoad={() => { const el = document.getElementById(`gh-sk-${i}`); if (el) el.style.display = 'none' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        const el = document.getElementById(`gh-sk-${i}`)
                        if (el) el.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
