import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../data/resumeData'
import {
  FiCalendar,
  FiMapPin,
  FiTrendingDown,
  FiCheck,
  FiDatabase,
  FiServer,
  FiSliders,
} from 'react-icons/fi'
import { SiPython, SiPandas, SiDatabricks, SiGooglecloud } from 'react-icons/si'

const techIcons = {
  Python: SiPython,
  Pandas: SiPandas,
  'Google BigQuery': SiGooglecloud,
  Databricks: SiDatabricks,
  SQL: FiDatabase,
  'ETL/ELT': FiServer,
}

const Experience = () => {
  const shouldReduce = useReducedMotion()
  const [optimized, setOptimized] = useState(true)

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-container border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-14">
        <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
          Production Track Record
        </p>
        <h2 id="experience-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Work Experience
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Engineering scalable telemetry pipelines and refactoring multi-terabyte BigQuery workloads in production.
        </p>
      </div>

      <div className="space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className="craft-card p-6 sm:p-9 border border-white/[0.09] hover:border-sky-500/30 transition-all duration-300"
          >
            {/* Top Bar: Company, Role & Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.company}
                  </h3>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {exp.type}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-sky-400">
                  {exp.role} <span className="text-slate-400 font-normal">· {exp.team}</span>
                </p>
              </div>

              <div className="flex flex-wrap md:flex-col md:items-end gap-3 md:gap-1 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-sky-400" size={13} />
                  {exp.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-slate-400" size={13} />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Interactive BigQuery Workload Optimizer Widget */}
            <div className="my-7 p-5 rounded-2xl bg-[#0A0C12] border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1">
                    <FiSliders size={13} />
                    <span>Interactive Case Study · BigQuery Cost Tuning</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Toggle between legacy full-table scans and refactored partition-pruned execution.
                  </p>
                </div>

                {/* Toggle Pill */}
                <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setOptimized(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      !optimized
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    Legacy Scan
                  </button>
                  <button
                    onClick={() => setOptimized(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      optimized
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    After Refactor (-57%)
                  </button>
                </div>
              </div>

              {/* Animated Visual Bars */}
              <div className="grid md:grid-cols-2 gap-5 items-center">
                <div className="space-y-4">
                  {/* Scan Bytes Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Bytes Scanned / Run</span>
                      <span className={optimized ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {optimized ? '1.80 TB (-57%)' : '4.20 TB (Full Scan)'}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        animate={{ width: optimized ? '43%' : '100%' }}
                        transition={{ duration: shouldReduce ? 0 : 0.45, ease: 'easeOut' }}
                        className={`h-full rounded-full ${optimized ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      />
                    </div>
                  </div>

                  {/* Runtime Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Avg Query Runtime</span>
                      <span className={optimized ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {optimized ? '113s (-20%)' : '142s'}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        animate={{ width: optimized ? '79%' : '98%' }}
                        transition={{ duration: shouldReduce ? 0 : 0.45, ease: 'easeOut' }}
                        className={`h-full rounded-full ${optimized ? 'bg-sky-400' : 'bg-amber-500'}`}
                      />
                    </div>
                  </div>

                  {/* Slot Utilization Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Slot Utilization Load</span>
                      <span className={optimized ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {optimized ? '76.3% (-19.7%)' : '95.0%'}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        animate={{ width: optimized ? '76%' : '95%' }}
                        transition={{ duration: shouldReduce ? 0 : 0.45, ease: 'easeOut' }}
                        className={`h-full rounded-full ${optimized ? 'bg-indigo-400' : 'bg-orange-500'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Live SQL Diff Preview */}
                <div className="p-4 rounded-xl bg-[#07080C] border border-white/[0.07] font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 pb-1.5 border-b border-white/[0.06]">
                    <span>{optimized ? 'optimized_warehouse_model.sql' : 'legacy_adhoc_query.sql'}</span>
                    <span className={optimized ? 'text-emerald-400' : 'text-rose-400'}>
                      {optimized ? 'Materialized + Pruned' : 'Unpartitioned Join'}
                    </span>
                  </div>
                  {optimized ? (
                    <pre className="text-slate-300">
{`SELECT order_date, region_id, SUM(gmv)
FROM \`dealshare.mv_daily_orders\`
WHERE order_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  AND cluster_key IS NOT NULL -- Partition Pruned
GROUP BY 1, 2;`}
                    </pre>
                  ) : (
                    <pre className="text-slate-400">
{`SELECT *
FROM \`dealshare.raw_orders_events\` a
JOIN \`dealshare.all_products\` b
  ON CAST(a.pid AS STRING) = b.sku_id -- Full Scan
WHERE FORMAT_DATE('%Y-%m', a.ts) >= '2025-01';`}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Production Impact Telemetry Grid */}
            <div className="my-7">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <FiTrendingDown className="text-emerald-400" />
                <span>Verified Production Telemetry Summary</span>
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {exp.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/10 transition-colors"
                  >
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 mb-0.5">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mb-1">
                      {m.label}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {m.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Accomplishments */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Architectural Deliverables &amp; Contributions
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {exp.achievements.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors"
                  >
                    <h5 className="text-sm font-semibold text-white mb-2 flex items-start gap-2">
                      <FiCheck className="text-sky-400 mt-0.5 flex-shrink-0" size={14} />
                      <span>{item.title}</span>
                    </h5>
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pl-5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Badges */}
            <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">Technologies:</span>
              {exp.techStack.map((tech) => {
                const IconComponent = techIcons[tech]
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                  >
                    {IconComponent && <IconComponent size={12} className="text-sky-400" />}
                    <span>{tech}</span>
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
