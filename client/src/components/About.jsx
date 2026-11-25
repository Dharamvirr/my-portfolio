import { motion, useReducedMotion } from 'framer-motion'
import { education, personalInfo } from '../data/resumeData'
import { FiMapPin, FiCalendar, FiBookOpen, FiAward, FiCheckCircle } from 'react-icons/fi'

const About = () => {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" aria-labelledby="about-heading" className="section-container border-t border-white/[0.06]">
      {/* Clean, editorial section header */}
      <div className="mb-14">
        <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
          Engineering Profile
        </p>
        <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Background &amp; Philosophy
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Combining rigorous competitive algorithmic problem-solving with real-world production data engineering.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative & Quick Stats */}
        <div className="lg:col-span-7 space-y-6">
          <div className="craft-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">
              Building at the intersection of scale and algorithms.
            </h3>

            <div className="space-y-4 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              <p>
                I am a final-year engineering student at{' '}
                <strong className="text-white font-semibold">MNNIT Allahabad</strong> (Electronics &amp; Communication Engineering, CPI: 7.69/10). My engineering passion lies in backend systems, distributed architectures, and large-scale data workload optimization.
              </p>
              <p>
                During my software development internship at{' '}
                <strong className="text-sky-300 font-semibold">DealShare</strong>, I diagnosed and restructured high-cost BigQuery query workloads across 150+ production pipelines—cutting scan expenditures by{' '}
                <strong className="text-emerald-400 font-semibold">57%</strong> and query execution time by{' '}
                <strong className="text-emerald-400 font-semibold">20%</strong>.
              </p>
              <p>
                As a competitive programmer, I hold the rank of{' '}
                <strong className="text-amber-400 font-semibold">LeetCode Knight (Rating 1925, Top 3.82%)</strong> and{' '}
                <strong className="text-sky-400 font-semibold">Codeforces Expert (Rating 1600)</strong>, having solved over 2,000 algorithmic challenges. This training instills a deep instinct for space/time complexity in every system I architect.
              </p>
            </div>

            {/* Quick Meta Grid */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block mb-1">Location</span>
                <span className="text-slate-200 flex items-center gap-1.5 font-sans font-medium">
                  <FiMapPin className="text-sky-400" size={13} /> {personalInfo.location}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Graduation</span>
                <span className="text-slate-200 flex items-center gap-1.5 font-sans font-medium">
                  <FiCalendar className="text-emerald-400" size={13} /> August 2026
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block mb-1">Primary Focus</span>
                <span className="text-slate-200 font-sans font-medium">
                  Backend &amp; Data Systems
                </span>
              </div>
            </div>
          </div>

          {/* Core Engineering Disciplines */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: 'Data-Driven Tuning',
                desc: 'Profilers and query execution plans before code changes.',
              },
              {
                title: 'Concurrency Safety',
                desc: 'Race-condition prevention verified with thread benchmarks.',
              },
              {
                title: 'Production Guardrails',
                desc: 'Proactive health checks, error boundaries, and telemetry.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="craft-card p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-white">
                  <FiCheckCircle className="text-sky-400" size={13} />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-[12px] text-slate-400 leading-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Track Record */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
            <FiBookOpen className="text-sky-400" />
            <span>Academic Institutions</span>
          </div>

          {education.map((edu) => (
            <div
              key={edu.institution}
              className="craft-card p-5 sm:p-6 border border-white/[0.07] hover:border-white/15 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {edu.shortName}
                  </h4>
                  <p className="text-xs text-sky-400 font-medium mt-0.5">
                    {edu.degree}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300 whitespace-nowrap">
                  {edu.score}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-3">
                <span>{edu.duration}</span>
                <span>•</span>
                <span>{edu.location}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {edu.details}
              </p>
            </div>
          ))}

          {/* Academic Distinction Callout */}
          <div className="craft-card p-5 border border-amber-500/20 bg-amber-500/[0.03]">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1.5">
              <FiAward size={14} />
              <span>Rigorous Analytical Foundation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scored <strong className="text-white">96.80% in Senior Secondary (RBSE)</strong> and selected into Motilal Nehru National Institute of Technology (MNNIT) Allahabad through JEE Mains.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
