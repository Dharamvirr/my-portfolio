import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode, SiCodeforces, SiCodechef, SiYoutube } from 'react-icons/si'
import { personalInfo, navLinks } from '../data/resumeData'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] bg-[#06070A] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white">
              DS
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {personalInfo.name}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {personalInfo.role} · MNNIT Allahabad
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SiLeetcode size={16} />
            </a>
            <a
              href={personalInfo.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codeforces Profile"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SiCodeforces size={16} />
            </a>
            <a
              href={personalInfo.codechef}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeChef Profile"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SiCodechef size={16} />
            </a>
            <a
              href={personalInfo.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SiYoutube size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email Dharamvir"
              className="p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[12px] font-mono text-slate-400">
          <p>
            &copy; {currentYear} Dharamvir Singh. Designed with craft &amp; conviction.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
