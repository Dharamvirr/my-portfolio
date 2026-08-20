import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi'
import { SiLeetcode, SiCodeforces } from 'react-icons/si'
import Particles from './Particles'
import MagneticButton from './MagneticButton'
import { personalInfo } from '../data/resumeData'

const socialLinks = [
  { icon: FiGithub,    href: personalInfo.github,              label: 'GitHub',     color: 'hover:text-white' },
  { icon: FiLinkedin,  href: personalInfo.linkedin,            label: 'LinkedIn',   color: 'hover:text-blue-400' },
  { icon: FiMail,      href: `mailto:${personalInfo.email}`,   label: 'Email',      color: 'hover:text-red-400' },
  { icon: SiLeetcode,  href: personalInfo.leetcode,            label: 'LeetCode',   color: 'hover:text-yellow-400' },
  { icon: SiCodeforces,href: personalInfo.codeforces,          label: 'Codeforces', color: 'hover:text-cyan-400' },
]

const heroStats = [
  { label: '2000+', sub: 'DSA Problems',       color: 'text-green-400'  },
  { label: '1925',  sub: 'LeetCode Rating',    color: 'text-yellow-400' },
  { label: '1600',  sub: 'Codeforces Rating',  color: 'text-blue-400'   },
  { label: '8/10',  sub: 'MNNIT CPI',          color: 'text-purple-400' },
]

// Stagger each word in the name
const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const wordVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
}

const Hero = () => {
  const { scrollY } = useScroll()
  const shouldReduce = useReducedMotion()

  // Parallax transforms — blobs move at different speeds
  const blob1Y  = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -90])
  const blob2Y  = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -50])
  const blob3Y  = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -120])
  const contentY = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : 50])
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Animated morphing background blobs ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: blob1Y }}
          className="absolute top-[15%] left-[10%] w-[550px] h-[550px] blob-shape"
          animate={shouldReduce ? {} : {
            scale:  [1, 1.08, 0.95, 1.05, 1],
            rotate: [0, 15, -10, 5, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-blue-600/[0.07] blur-[130px] rounded-full" />
        </motion.div>

        <motion.div
          style={{ y: blob2Y }}
          className="absolute bottom-[15%] right-[10%] w-[440px] h-[440px]"
          animate={shouldReduce ? {} : {
            scale:  [1, 0.92, 1.1, 0.97, 1],
            rotate: [0, -12, 18, -5, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <div className="w-full h-full bg-purple-600/[0.07] blur-[110px] rounded-full" />
        </motion.div>

        <motion.div
          style={{ y: blob3Y }}
          className="absolute top-[55%] left-[50%] -translate-x-1/2 w-[320px] h-[320px]"
          animate={shouldReduce ? {} : {
            scale: [1, 1.15, 0.9, 1],
            x: [-30, 30, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        >
          <div className="w-full h-full bg-pink-600/[0.05] blur-[90px] rounded-full" />
        </motion.div>

        <Particles />
      </div>

      {/* Grid dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ─── Content with parallax ──────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20"
      >
        {/* Open-to-work badge */}
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                     border border-green-500/30 bg-green-500/[0.08] text-green-400
                     text-sm font-medium mb-10 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Open to Work — Available for SDE Roles
        </motion.div>

        {/* Name — word by word mask reveal */}
        <div className="mb-6">
          <motion.div
            variants={shouldReduce ? {} : nameVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center gap-0">
              {/* "Dharamvir" */}
              <div className="overflow-hidden">
                <motion.h1
                  variants={shouldReduce ? {} : wordVariant}
                  className="text-6xl sm:text-7xl md:text-[100px] font-black
                             leading-none tracking-tighter gradient-text select-none"
                >
                  Dharamvir
                </motion.h1>
              </div>
              {/* "Singh" */}
              <div className="overflow-hidden">
                <motion.span
                  variants={shouldReduce ? {} : wordVariant}
                  className="text-6xl sm:text-7xl md:text-[100px] font-black
                             leading-none tracking-tighter text-white select-none block"
                >
                  Singh
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg sm:text-2xl font-mono mb-5 h-10 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'SDE Intern @ DealShare', 2500,
              'Data Engineering Enthusiast', 2000,
              'LeetCode Knight — Rating 1925', 2500,
              'Codeforces Expert — Rating 1600', 2500,
              'MNNIT Allahabad | B.Tech ECE', 2000,
              '2000+ DSA Problems Solved', 2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="text-blue-400"
          />
        </motion.div>

        {/* Code-style tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="font-mono text-sm text-gray-600 mb-10 select-none"
        >
          <span className="text-blue-500">const</span>{' '}
          <span className="text-purple-400">mission</span>{' '}
          <span className="text-gray-500">=</span>{' '}
          <span className="text-green-400">&quot;{personalInfo.tagline}&quot;</span>
          <span className="text-gray-500">;</span>
        </motion.p>

        {/* CTA buttons — with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-12"
        >
          <MagneticButton strength={0.25}>
            <Link to="projects" smooth duration={600} offset={-80}>
              <button className="btn-primary flex items-center gap-2 text-base px-9 py-3.5">
                View My Work 🚀
              </button>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href="/Dharamvir_Resume.pdf"
              download="Dharamvir_Singh_Resume.pdf"
              className="btn-outline flex items-center gap-2 text-base px-9 py-3.5"
            >
              <FiDownload size={16} /> Resume
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-7 mb-16"
        >
          {socialLinks.map(({ icon: Icon, href, label, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.07 }}
              whileHover={{ scale: 1.3, y: -4 }}
              className={`text-gray-500 ${color} transition-colors duration-200`}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45 }}
          className="flex flex-wrap justify-center gap-10 mb-16"
        >
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <div className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.label}</div>
              <div className="text-xs text-gray-600 mt-0.5 tracking-wide">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-1 text-gray-700"
        >
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs font-mono tracking-widest">scroll down</span>
            <FiArrowDown size={13} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
