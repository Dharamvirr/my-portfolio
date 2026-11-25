import { motion, useReducedMotion } from 'framer-motion'
import { achievements } from '../data/resumeData'
import { FiAward, FiExternalLink, FiCheckCircle } from 'react-icons/fi'
import { SiLeetcode, SiCodeforces, SiYoutube } from 'react-icons/si'

const achievementIcons = {
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  'problems-solved': FiCheckCircle,
  'youtube-educator': SiYoutube,
  softathlon: FiAward,
  'math-rush': FiAward,
}

const Achievements = () => {
  const shouldReduce = useReducedMotion()

  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="section-container border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-14">
        <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
          Competitive Honors
        </p>
        <h2 id="achievements-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Achievements &amp; Recognitions
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
          National hackathon placements, competitive programming ranks, and algorithmic milestones.
        </p>
      </div>

      {/* Honors Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((item) => {
          const Icon = achievementIcons[item.id] || FiAward
          return (
            <div
              key={item.id}
              className="craft-card p-6 flex flex-col justify-between border border-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300">
                    {item.platform}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {item.score}
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-sky-400 font-mono mb-3">
                  {item.rank}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.link && (
                <div className="mt-5 pt-3 border-t border-white/[0.06]">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Verify Public Profile</span>
                    <FiExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Achievements
