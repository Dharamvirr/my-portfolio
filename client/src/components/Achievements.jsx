import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '../data/resumeData'
import { FiExternalLink } from 'react-icons/fi'

const Achievements = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="section-container section-alt">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Heading */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className="text-center mb-16"
        >
          <p className="font-mono text-blue-400 text-sm mb-3 tracking-widest">// HALL OF FAME</p>
          <h2 className="section-heading">
            <span className="gradient-text">Achievements</span> & Awards
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`glass-card p-6 border ${a.border} hover:shadow-lg ${a.glow} transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

              {/* Icon */}
              <div className="text-4xl mb-4">{a.icon}</div>

              {/* Title */}
              <h3 className="font-bold text-white mb-3 text-lg">{a.title}</h3>

              {/* Big metric */}
              <div className={`text-5xl font-black mb-1 bg-gradient-to-r ${a.color} bg-clip-text text-transparent`}>
                {a.metric}
              </div>
              <p className="text-gray-500 text-sm mb-1">{a.label}</p>
              <p className="text-gray-400 text-xs font-medium">{a.sub}</p>

              {/* Platform badge */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-600 font-mono">{a.platform}</span>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Profile <FiExternalLink size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitive programming summary bar */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className="glass-card p-8"
        >
          <p className="text-gray-500 font-mono text-sm text-center mb-8">// competitive programming journey</p>

          <div className="grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {[
              {
                platform: '⚡ LeetCode',
                title: 'Knight Badge',
                rating: '1925',
                detail: 'Top 3.82% Globally',
                sub: '100+ rated contests',
                color: 'text-yellow-400',
                bar: 'from-yellow-400 to-orange-500',
                pct: '96',
              },
              {
                platform: '🔵 Codeforces',
                title: 'Expert Rank',
                rating: '1600',
                detail: 'Blue Rating',
                sub: 'Global competitive ranking',
                color: 'text-blue-400',
                bar: 'from-blue-400 to-cyan-500',
                pct: '80',
              },
              {
                platform: '🧩 Problems',
                title: 'DSA Mastery',
                rating: '2000+',
                detail: 'Problems Solved',
                sub: 'Across LeetCode, CF & more',
                color: 'text-green-400',
                bar: 'from-green-400 to-emerald-500',
                pct: '100',
              },
            ].map((cp) => (
              <div key={cp.platform} className="text-center pt-6 sm:pt-0 sm:px-6">
                <p className="text-gray-500 text-sm mb-1">{cp.platform}</p>
                <p className={`text-3xl font-black ${cp.color} mb-1`}>{cp.rating}</p>
                <p className="text-white font-semibold text-sm mb-0.5">{cp.title}</p>
                <p className="text-gray-400 text-xs mb-1">{cp.detail}</p>
                <p className="text-gray-600 text-xs mb-3">{cp.sub}</p>
                {/* Skill bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${cp.bar} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${cp.pct}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Achievements
