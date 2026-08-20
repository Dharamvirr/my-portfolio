import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi'
import { navLinks, personalInfo } from '../data/resumeData'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Active section detection
      const sections = navLinks.map((l) => l.to)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black gradient-text select-none"
          >
            &lt;DS/&gt;
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-80}
              className={`relative text-sm font-medium cursor-pointer transition-colors duration-200 group ${
                activeSection === link.to ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                  activeSection === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}

          {/* Social icons */}
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" title="GitHub"
            className="text-gray-400 hover:text-white transition-colors">
            <FiGithub size={19} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"
            className="text-gray-400 hover:text-blue-400 transition-colors">
            <FiLinkedin size={19} />
          </a>

          {/* Resume download */}
          <motion.a
            href="/Dharamvir_Resume.pdf"
            download="Dharamvir_Singh_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm py-2 px-5"
          >
            Resume ↓
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden text-white p-2 rounded-lg border border-white/10 bg-white/5"
          onClick={() => setMenuOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0d0d0d]/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                    activeSection === link.to
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">
                  GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2 text-sm text-gray-400 hover:text-blue-400 border border-white/10 rounded-xl transition-colors">
                  LinkedIn
                </a>
              </div>
              <a
                href="/Dharamvir_Resume.pdf"
                download="Dharamvir_Singh_Resume.pdf"
                className="btn-primary text-center mt-2 text-sm"
              >
                Download Resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
