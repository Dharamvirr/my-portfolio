import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories, aiPipelineStages, personalInfo } from '../data/resumeData'
import {
  FiCode,
  FiDatabase,
  FiServer,
  FiTerminal,
  FiExternalLink,
  FiActivity,
  FiCpu,
  FiLayers,
  FiShield,
  FiCheck,
  FiArrowRight,
} from 'react-icons/fi'
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiGooglecloud,
  SiDatabricks,
  SiPandas,
  SiMysql,
  SiPostgresql,
  SiNodedotjs,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiYoutube,
  SiPostman,
  SiVite,
  SiLangchain,
  SiLanggraph,
  SiQdrant,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'

const skillIconMap = {
  'C++': SiCplusplus,
  JavaScript: SiJavascript,
  SQL: FiDatabase,
  Python: SiPython,
  Java: FaJava,
  'Node.js & Express.js': SiNodedotjs,
  'React.js': FiCode,
  'Socket.io': FiActivity,
  'LangChain & LangGraph': SiLanggraph,
  'RAG & Vector DB': SiQdrant,
  'PostgreSQL & MySQL': SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  'Qdrant (Vector DB)': SiQdrant,
  'Google BigQuery': SiGooglecloud,
  Databricks: SiDatabricks,
  'GCP Cloud Functions': SiGooglecloud,
  'ETL/ELT & Data Pipelines': FiServer,
  Pandas: SiPandas,
  Docker: SiDocker,
  'Git & GitHub': SiGit,
  Postman: SiPostman,
  Vite: SiVite,
}

const categoryIcons = {
  languages: FiCode,
  'backend-frontend-ai': FiCpu,
  'databases-caching': FiDatabase,
  'data-cloud': FiServer,
  'devops-tools': FiTerminal,
  'core-cs': FiLayers,
}

const stageIcons = {
  ingest: FiDatabase,
  memory: FiLayers,
  agent: FiCpu,
  hitl: FiShield,
}

const Skills = () => {
  const [activeStageId, setActiveStageId] = useState(aiPipelineStages[0].id)
  const activeStage = aiPipelineStages.find((s) => s.id === activeStageId) || aiPipelineStages[0]

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-container border-t border-white/[0.06]">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
          Systems, Data &amp; AI Architecture
        </p>
        <h2 id="skills-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Technical Arsenal &amp; GenAI Stack
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Production backend &amp; data optimization paired with LangChain, LangGraph, RAG, Memory &amp; Human-in-the-Loop systems.
        </p>
      </div>

      {/* Interactive GenAI / Agentic Pipeline Explorer */}
      <div className="craft-card p-6 sm:p-8 border border-indigo-500/25 bg-[#0A0D16]/90 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08] mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">
              <FiCpu size={14} />
              <span>Interactive Blueprint · LangChain &amp; LangGraph</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Agentic LLM Pipeline: RAG + Stateful Memory + Human-in-the-Loop
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 self-start sm:self-auto">
            Click stages to inspect
          </span>
        </div>

        {/* 4 Interactive Stage Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {aiPipelineStages.map((stage, index) => {
            const Icon = stageIcons[stage.id] || FiCpu
            const isSelected = stage.id === activeStageId
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`relative p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-500/15 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-indigo-400">
                    STAGE {stage.step}
                  </span>
                  <Icon
                    size={15}
                    className={isSelected ? 'text-indigo-300' : 'text-slate-400'}
                  />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {stage.title}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {stage.tag}
                </div>
                {index < aiPipelineStages.length - 1 && (
                  <FiArrowRight
                    size={12}
                    className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-600 z-10"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Active Stage Inspector Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="p-5 rounded-xl bg-[#07090F] border border-white/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-indigo-300 mb-1">
                {activeStage.step} · {activeStage.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.summary}
              </p>
            </div>
            <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
              {activeStage.specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-200"
                >
                  <FiCheck size={11} className="text-emerald-400" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4 Architectural Domains */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {skillCategories.map((cat) => {
          const CategoryIcon = categoryIcons[cat.id] || FiCode
          return (
            <div
              key={cat.id}
              className="craft-card p-6 sm:p-7 border border-white/[0.08] hover:border-white/15 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <CategoryIcon size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 mt-5">
                {cat.skills.map((skill) => {
                  const SkillIcon = skillIconMap[skill.name]
                  return (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-white/[0.025] border border-white/[0.05] hover:border-sky-500/20 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {SkillIcon && <SkillIcon size={13} className="text-sky-400 flex-shrink-0" />}
                          <span className="text-xs font-semibold text-slate-200 truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400 flex-shrink-0">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        {skill.note}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Competitive Programming Telemetry Cards */}
      <div className="craft-card p-6 sm:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-sky-400">
              <FiActivity size={14} />
              <span>Verified Competitive Coder Telemetry</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Algorithmic Problem Solving &amp; Rating Verification
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
            100+ Rated Live Contests
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LeetCode */}
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Dharamvir's LeetCode Profile"
            className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <SiLeetcode className="text-amber-400" size={24} />
              <FiExternalLink className="text-slate-400 group-hover:text-white transition-colors" size={13} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              LeetCode Knight
            </div>
            <div className="text-3xl font-mono font-bold text-amber-400 mb-0.5">
              1925
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Top 3.82% Globally
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-2">
              handle: @{personalInfo.leetcodeUsername}
            </p>
          </a>

          {/* Codeforces */}
          <a
            href={personalInfo.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Dharamvir's Codeforces Profile"
            className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-500/30 hover:bg-sky-500/[0.03] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <SiCodeforces className="text-sky-400" size={24} />
              <FiExternalLink className="text-slate-400 group-hover:text-white transition-colors" size={13} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Codeforces Expert
            </div>
            <div className="text-3xl font-mono font-bold text-sky-400 mb-0.5">
              1600
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Official Blue-Rated Badge
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-2">
              handle: @{personalInfo.codeforcesUsername}
            </p>
          </a>

          {/* CodeChef */}
          <a
            href={personalInfo.codechef}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Dharamvir's CodeChef Profile"
            className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-600/30 hover:bg-amber-600/[0.03] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <SiCodechef className="text-amber-500" size={24} />
              <FiExternalLink className="text-slate-400 group-hover:text-white transition-colors" size={13} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              CodeChef Coder
            </div>
            <div className="text-3xl font-mono font-bold text-amber-500 mb-0.5">
              {personalInfo.codechefUsername}
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Rated Algorithmic Contests
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-2">
              handle: @{personalInfo.codechefUsername}
            </p>
          </a>

          {/* YouTube DSA Educator */}
          <a
            href={personalInfo.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Dharamvir's YouTube Channel"
            className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/30 hover:bg-rose-500/[0.03] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <SiYoutube className="text-rose-500" size={24} />
              <FiExternalLink className="text-slate-400 group-hover:text-white transition-colors" size={13} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              DSA Educator
            </div>
            <div className="text-2xl font-mono font-bold text-rose-400 mb-0.5">
              YouTube
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Tutorials &amp; Contest Solutions
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-2">
              channel: {personalInfo.youtubeHandle}
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Skills
