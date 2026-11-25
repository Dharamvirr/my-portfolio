import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiMenu, FiX, FiDownload, FiArrowUpRight, FiSearch, FiZap } from 'react-icons/fi'
import { navLinks, personalInfo } from '../data/resumeData'

const Navbar = ({ onOpenPalette, onReplaySwarm }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = navLinks.map((l) => l.to)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 140) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#08090C]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Monogram Brand */}
        <Link
          to="hero"
          smooth
          duration={500}
          className="group flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 group-hover:border-sky-500/40 flex items-center justify-center transition-colors">
            <span className="font-mono text-xs font-bold text-white tracking-tight">DS</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-white tracking-tight leading-none group-hover:text-sky-400 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5">
              SDE · Data &amp; AI Systems
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/[0.09] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden md:flex items-center gap-2">
          {/* Replay Swarm Button */}
          <button
            onClick={onReplaySwarm}
            title="Replay Multiplayer Swarm Build"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-white/[0.03] hover:bg-sky-500/10 text-slate-300 hover:text-sky-300 border border-white/[0.08] hover:border-sky-500/30 transition-all cursor-pointer"
          >
            <FiZap size={12} className="text-sky-400" />
            <span>Swarm</span>
          </button>

          {/* Cmd+K Command Palette Trigger */}
          <button
            onClick={onOpenPalette}
            aria-label="Open Command Palette"
            className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-slate-400 hover:text-white border border-white/[0.08] transition-all cursor-pointer"
          >
            <FiSearch size={12} />
            <span className="hidden xl:inline text-[11px]">Quick Jump</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded text-slate-300">
              ⌘K
            </kbd>
          </button>

          <a
            href="/Dharamvir_Resume.pdf"
            download="Dharamvir_Singh_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/10 transition-all duration-150"
          >
            <FiDownload size={13} />
            <span>Resume</span>
          </a>

          <Link
            to="contact"
            smooth
            duration={500}
            offset={-70}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer"
          >
            <span>Hire / Refer</span>
            <FiArrowUpRight size={13} />
          </Link>
        </div>

        {/* Mobile Actions + Menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenPalette}
            aria-label="Quick Jump Command Palette"
            className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
          >
            <FiSearch size={16} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0F1118] border-b border-white/10 px-4 py-5 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onReplaySwarm?.()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500/10 border border-sky-500/25 text-xs font-mono text-sky-300"
                >
                  <FiZap size={14} /> Replay Swarm Build
                </button>
                <a
                  href="/Dharamvir_Resume.pdf"
                  download="Dharamvir_Singh_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-medium text-slate-200"
                >
                  <FiDownload size={14} /> Download Resume
                </a>
                <Link
                  to="contact"
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-semibold"
                >
                  Contact Dharamvir <FiArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
