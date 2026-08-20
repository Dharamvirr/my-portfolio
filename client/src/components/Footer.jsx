import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { personalInfo, navLinks } from '../data/resumeData'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <Link to="hero" smooth duration={600} className="cursor-pointer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-black gradient-text inline-block"
              >
                &lt;DS/&gt;
              </motion.span>
            </Link>
            <p className="text-gray-600 text-xs mt-1 font-mono">{personalInfo.tagline}</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                className="hover:text-blue-400 capitalize cursor-pointer transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-500 hover:text-white transition-colors"
              title="GitHub"
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-500 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <FiLinkedin size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-500 hover:text-red-400 transition-colors"
              title="Email"
            >
              <FiMail size={18} />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <FiHeart className="text-red-500" size={11} />{' '}
            by <span className="text-gray-400 font-medium ml-0.5">Dharamvir Singh</span>
          </p>
          <p className="font-mono">
            React · Tailwind · Framer Motion · Node.js · MongoDB
          </p>
          <p>&copy; {year} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
