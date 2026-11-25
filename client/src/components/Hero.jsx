import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-scroll'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiCommand,
} from 'react-icons/fi'
import { SiLeetcode, SiCodeforces, SiCodechef, SiYoutube } from 'react-icons/si'
import toast from 'react-hot-toast'
import { personalInfo, heroMetrics } from '../data/resumeData'

const socialLinks = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: SiLeetcode, href: personalInfo.leetcode, label: 'LeetCode' },
  { icon: SiCodeforces, href: personalInfo.codeforces, label: 'Codeforces' },
  { icon: SiCodechef, href: personalInfo.codechef, label: 'CodeChef' },
  { icon: SiYoutube, href: personalInfo.youtube, label: 'YouTube' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const Hero = ({ onOpenPalette }) => {
  const shouldReduce = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[94vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Precision Architectural Matrix */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 25%, black 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 25%, black 15%, transparent 75%)',
        }}
      />

      {/* Overhead Atmospheric Beam */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[820px] h-[380px] bg-gradient-to-b from-sky-500/15 via-blue-600/5 to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* Top Status */}
        <motion.div
          data-swarm="box"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-7"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-65" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open to SDE Roles (2026 Batch) · MNNIT Allahabad</span>
          </div>
        </motion.div>

        {/* Main Hero Typography */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 data-swarm="text" className="text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white mb-5 leading-[1.05]">
            Dharamvir Singh
          </h1>

          <p data-swarm="text" className="text-lg sm:text-2xl font-medium text-slate-300 mb-5 leading-relaxed">
            Software Engineer building{' '}
            <span className="text-white font-semibold">scalable backend systems</span>,{' '}
            <span className="text-sky-400 font-semibold">high-efficiency data pipelines</span> &amp;{' '}
            <span className="text-indigo-300 font-semibold">agentic AI workflows</span>.
          </p>

          <p data-swarm="text" className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Ex-SDE Intern at <strong className="text-slate-200 font-semibold">DealShare</strong>{' '}
            (slashed BigQuery scan costs by <strong className="text-emerald-400 font-semibold">57%</strong>).{' '}
            <strong className="text-amber-400 font-semibold">LeetCode Knight (1925)</strong> &amp;{' '}
            <strong className="text-sky-400 font-semibold">Codeforces Expert (1600)</strong> with 2,000+ algorithmic solves. Building GenAI workflows with <strong className="text-indigo-300 font-semibold">LangChain, LangGraph</strong>, RAG, Agent Memory &amp; Human-in-the-Loop.
          </p>
        </motion.div>

        {/* Primary Action Cluster */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <Link
            data-swarm="box"
            to="experience"
            smooth
            duration={500}
            offset={-70}
            className="btn-primary cursor-pointer"
          >
            <span>Explore Interactive Work</span>
            <FiArrowRight size={15} />
          </Link>

          <a
            data-swarm="box"
            href="/Dharamvir_Resume.pdf"
            download="Dharamvir_Singh_Resume.pdf"
            className="btn-secondary"
          >
            <FiDownload size={15} />
            <span>Download Resume</span>
          </a>

          <button
            data-swarm="box"
            onClick={handleCopyEmail}
            className="btn-secondary group font-mono text-xs"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <FiCheck className="text-emerald-400" size={14} />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="text-slate-400 group-hover:text-white transition-colors" size={14} />
                <span>{personalInfo.email}</span>
              </>
            )}
          </button>

          <button
            data-swarm="box"
            onClick={onOpenPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[10px] bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            <FiCommand size={13} className="text-sky-400" />
            <span>K</span>
          </button>
        </motion.div>

        {/* Social Bar */}
        <motion.div
          data-swarm="box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="flex items-center justify-center gap-5 mb-12 text-slate-400"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-150"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Bento Proof-of-Work Grid */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          {heroMetrics.map((item) => (
            <div
              key={item.label}
              data-swarm="box"
              className={`craft-card group relative overflow-hidden p-5 text-left border border-white/[0.08] ${item.border} transition-all duration-200`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${item.accent}`}>
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {item.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
