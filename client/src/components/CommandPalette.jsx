import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scroller } from 'react-scroll'
import toast from 'react-hot-toast'
import {
  FiSearch,
  FiDownload,
  FiCopy,
  FiZap,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiCpu,
  FiBriefcase,
  FiUser,
  FiAward,
  FiMail,
} from 'react-icons/fi'
import { SiLeetcode, SiCodeforces } from 'react-icons/si'
import { personalInfo } from '../data/resumeData'

const CommandPalette = ({ open, onClose, onReplaySwarm }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = useMemo(
    () => [
      {
        id: 'swarm',
        group: 'Interactive Modes',
        label: 'Replay Swarm Multiplayer Build',
        shortcut: 'S',
        icon: FiZap,
        action: () => {
          onClose()
          onReplaySwarm?.()
        },
      },
      {
        id: 'resume',
        group: 'Quick Actions',
        label: 'Download Resume (PDF)',
        shortcut: 'R',
        icon: FiDownload,
        action: () => {
          const link = document.createElement('a')
          link.href = '/Dharamvir_Resume.pdf'
          link.download = 'Dharamvir_Singh_Resume.pdf'
          link.click()
          toast.success('Downloading Dharamvir_Singh_Resume.pdf')
          onClose()
        },
      },
      {
        id: 'email',
        group: 'Quick Actions',
        label: `Copy Email (${personalInfo.email})`,
        shortcut: 'E',
        icon: FiCopy,
        action: () => {
          navigator.clipboard.writeText(personalInfo.email)
          toast.success('Email copied to clipboard')
          onClose()
        },
      },
      {
        id: 'nav-experience',
        group: 'Navigate',
        label: 'DealShare Production Impact & BigQuery Optimizer',
        icon: FiBriefcase,
        action: () => {
          onClose()
          scroller.scrollTo('experience', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'nav-projects',
        group: 'Navigate',
        label: 'Engineering Projects & Java Rate Limiter Simulator',
        icon: FiCode,
        action: () => {
          onClose()
          scroller.scrollTo('projects', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'nav-ai',
        group: 'Navigate',
        label: 'LangChain, LangGraph, RAG, Memory & HITL Stack',
        icon: FiCpu,
        action: () => {
          onClose()
          scroller.scrollTo('skills', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'nav-about',
        group: 'Navigate',
        label: 'Background & MNNIT Education',
        icon: FiUser,
        action: () => {
          onClose()
          scroller.scrollTo('about', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'nav-achievements',
        group: 'Navigate',
        label: 'Competitive Coding Ranks & Awards',
        icon: FiAward,
        action: () => {
          onClose()
          scroller.scrollTo('achievements', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'nav-contact',
        group: 'Navigate',
        label: 'Contact & Direct Message',
        icon: FiMail,
        action: () => {
          onClose()
          scroller.scrollTo('contact', { smooth: true, duration: 500, offset: -70 })
        },
      },
      {
        id: 'ext-leetcode',
        group: 'Verified Profiles',
        label: 'LeetCode Knight (1925 Rating · Top 3.82%)',
        icon: SiLeetcode,
        action: () => {
          window.open(personalInfo.leetcode, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'ext-codeforces',
        group: 'Verified Profiles',
        label: 'Codeforces Expert (1600 Rating)',
        icon: SiCodeforces,
        action: () => {
          window.open(personalInfo.codeforces, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'ext-github',
        group: 'Verified Profiles',
        label: 'GitHub (@Dharamvirr)',
        icon: FiGithub,
        action: () => {
          window.open(personalInfo.github, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'ext-linkedin',
        group: 'Verified Profiles',
        label: 'LinkedIn (/in/coderdharamvir)',
        icon: FiLinkedin,
        action: () => {
          window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ],
    [onClose, onReplaySwarm]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    )
  }, [commands, query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query, open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        )
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault()
        filtered[selectedIndex].action()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, filtered, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[14vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-2xl bg-[#0D1017] border border-white/[0.12] shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <FiSearch className="text-slate-400 flex-shrink-0" size={16} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search (e.g. Resume, BigQuery, GenAI, Swarm)..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-slate-500">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon
                  const active = idx === selectedIndex
                  return (
                    <button
                      key={cmd.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={cmd.action}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-sky-500/15 text-white border border-sky-500/25'
                          : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={15}
                          className={active ? 'text-sky-400 flex-shrink-0' : 'text-slate-400 flex-shrink-0'}
                        />
                        <div className="truncate">
                          <span className="text-xs sm:text-sm font-medium block truncate">
                            {cmd.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {cmd.group}
                          </span>
                        </div>
                      </div>
                      <FiArrowRight
                        size={13}
                        className={active ? 'text-sky-400 flex-shrink-0' : 'text-slate-600 flex-shrink-0'}
                      />
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Navigate with ↑↓ · Enter to run</span>
              <span>Dharamvir OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
