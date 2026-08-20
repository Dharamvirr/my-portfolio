import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { personalInfo } from '../data/resumeData'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ─── Web3Forms — Free, no backend needed ──────────────────────────────────
// Get your free access key at: https://web3forms.com (enter your email)
// Key is in .env file (VITE_WEB3FORMS_KEY) — never hardcode in source code!
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact — ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Message sent! I'll get back to you within 24 hours 🚀")
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Failed')
      }
    } catch {
      toast.error('Failed to send. Please email me directly at ' + personalInfo.email)
    } finally {
      setLoading(false)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    toast.success('Email copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const contactItems = [
    {
      icon: FiMail,
      label: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    {
      icon: FiPhone,
      label: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      icon: FiLinkedin,
      label: 'linkedin.com/in/dharamvir-singh-aa908b2a1',
      href: personalInfo.linkedin,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: FiGithub,
      label: 'github.com/Dharamvirr',
      href: personalInfo.github,
      color: 'text-white',
      bg: 'bg-white/5',
      border: 'border-white/10',
    },
  ]

  return (
    <section id="contact" className="section-container section-alt">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-3 tracking-widest">// GET IN TOUCH</p>
          <h2 className="section-heading">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            I&apos;m actively looking for <span className="text-blue-400 font-semibold">SDE opportunities</span>.
            Whether you have a role, a project, or just want to say hi — I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-5">Reach Me At</h3>

            {contactItems.map(({ icon: Icon, label, href, color, bg, border }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl border ${border} ${bg} hover:border-blue-500/30 transition-all group`}
                whileHover={shouldReduce ? {} : { x: 4 }}
              >
                <div className={`p-2 rounded-lg ${bg} border ${border}`}>
                  <Icon className={`${color} text-lg`} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm truncate flex-1">
                  {label}
                </span>
                <FiExternalLink className="text-gray-600 group-hover:text-gray-400 flex-shrink-0" size={13} />
              </motion.a>
            ))}

            {/* Copy email */}
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/15 rounded-xl text-gray-500 hover:text-blue-400 hover:border-blue-500/30 transition-all text-sm cursor-pointer"
            >
              {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
              {copied ? 'Email copied!' : 'Copy email address'}
            </motion.button>

            {/* Availability */}
            <div className="glass-card p-5 mt-4">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-green-400 font-semibold text-sm">Available for Work</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Open to full-time SDE roles, internships, and freelance projects.
                Typical response time: <span className="text-white">within 24 hours</span>.
              </p>
            </div>
          </motion.div>

          {/* Contact form — powered by Web3Forms */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Send a Message</h3>
              <span className="text-[10px] text-gray-600 font-mono">powered by Web3Forms</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="HR Manager"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600
                               focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hr@company.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600
                               focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="I'd love to discuss an opportunity with you..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600
                             focus:outline-none focus:border-blue-500/50 transition-all resize-none text-sm"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
