import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { skills, personalInfo, currentlyLearning } from '../data/resumeData'

// ─── Skeleton for external embed images ──────────────────────────────────────
const EmbedSkeleton = ({ height = 160 }) => (
  <div className="img-skeleton w-full rounded-2xl" style={{ minHeight: height }} />
)

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="section-container section-alt">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* Heading */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 }, visible: { opacity: 1, y: 0 } }}
          className="text-center mb-16"
        >
          <p className="font-mono text-blue-400 text-sm mb-3 tracking-widest">// TECH ARSENAL</p>
          <h2 className="section-heading">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, data], catIndex) => (
            <motion.div
              key={category}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: catIndex * 0.08 } },
              }}
              className="glass-card p-6 card-hover group"
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" role="img" aria-label={category}>{data.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">{category}</h3>
                  <div
                    className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${data.color} mt-1.5 group-hover:w-full transition-all duration-500 ease-out`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2" role="list" aria-label={`${category} skills`}>
                {data.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={
                      shouldReduceMotion
                        ? {}
                        : { delay: catIndex * 0.1 + i * 0.04, type: 'spring', stiffness: 300 }
                    }
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -1 }}
                    className={`tech-badge border cursor-default ${data.bgColor} ${data.textColor} ${data.borderColor}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Currently Learning ─────────────────────────────────────────── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-10 glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="font-bold text-white text-sm">Currently Exploring</h3>
              <p className="text-gray-500 text-xs mt-0.5">Always learning, always growing</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Active
            </span>
          </div>
          <div className="flex flex-wrap gap-2" role="list" aria-label="Currently learning">
            {currentlyLearning.map((item, i) => (
              <motion.span
                key={item.label}
                role="listitem"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={shouldReduceMotion ? {} : { delay: 0.4 + i * 0.08 }}
                className={`tech-badge border ${item.bg} ${item.color} ${item.border} flex items-center gap-1.5`}
              >
                <span role="img" aria-hidden="true">{item.icon}</span>
                {item.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ─── Coding Profiles ────────────────────────────────────────────── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } } }}
          className="mt-10"
        >
          <p className="text-gray-600 font-mono text-sm text-center mb-6">// coding profiles</p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {[
              {
                name: 'LeetCode',
                handle: 'Knight',
                rating: '1925',
                badge: 'Top 3.82%',
                color: 'from-yellow-500 to-orange-500',
                border: 'border-yellow-500/20',
                bg: 'bg-yellow-500/5',
                icon: '⚡',
                link: personalInfo.leetcode,
              },
              {
                name: 'Codeforces',
                handle: 'Expert',
                rating: '1600',
                badge: 'Blue Rated',
                color: 'from-blue-500 to-cyan-500',
                border: 'border-blue-500/20',
                bg: 'bg-blue-500/5',
                icon: '🔵',
                link: personalInfo.codeforces,
              },
              {
                name: 'GitHub',
                handle: personalInfo.githubUsername,
                rating: 'Active',
                badge: '100+ Contests',
                color: 'from-gray-400 to-gray-600',
                border: 'border-gray-500/20',
                bg: 'bg-gray-500/5',
                icon: '🐙',
                link: personalInfo.github,
              },
            ].map((profile) => (
              <a
                key={profile.name}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name} profile — ${profile.handle}, Rating ${profile.rating}`}
                className={`glass-card p-5 text-center border ${profile.border} ${profile.bg} hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl`}
              >
                <div className="text-3xl mb-2" role="img" aria-hidden="true">{profile.icon}</div>
                <p className="text-gray-500 text-xs mb-1">{profile.name}</p>
                <p className={`text-xl font-black bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                  {profile.handle}
                </p>
                <p className="text-white font-bold text-lg">{profile.rating}</p>
                <p className="text-gray-500 text-xs mt-1">{profile.badge}</p>
              </a>
            ))}
          </div>

          {/* LeetCode stats embed with skeleton fallback */}
          <div className="flex justify-center relative">
            <div className="img-skeleton absolute inset-0 rounded-2xl" id="lc-skeleton" />
            <img
              src="https://leetcard.jacoblin.cool/dharamvir78914?theme=dark&font=baloo_2&ext=activity&border=0"
              alt="LeetCode activity stats for Dharamvir Singh"
              className="rounded-2xl max-w-full relative z-10"
              loading="lazy"
              onLoad={(e) => {
                const sk = document.getElementById('lc-skeleton')
                if (sk) sk.style.display = 'none'
              }}
              onError={(e) => {
                e.target.style.display = 'none'
                const sk = document.getElementById('lc-skeleton')
                if (sk) sk.style.display = 'none'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
