import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiMessageSquare,
} from 'react-icons/fi'
import { SiCodechef, SiLeetcode, SiCodeforces, SiYoutube } from 'react-icons/si'
import toast from 'react-hot-toast'
import { personalInfo } from '../data/resumeData'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const Contact = () => {
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
          access_key: WEB3FORMS_KEY || 'default_key',
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success("Message dispatched! I'll reply promptly.")
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch {
      toast.error('Could not send automatically. Please email dharamvir78914@gmail.com directly!')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-container border-t border-white/[0.06]">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
          Start a Conversation
        </p>
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
          Interested in full-time Software Engineer opportunities, backend architecture discussions, or collaboration.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels & Fast Copy */}
        <div className="lg:col-span-5 space-y-4">
          <div className="craft-card p-6 sm:p-7 border border-white/[0.08]">
            <h3 className="text-base font-bold text-white mb-2">
              Direct Contact
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Based in India, open to relocation for high-impact software engineering roles.
            </p>

            <div className="space-y-3">
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                    <FiMail size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Email Address</span>
                    <span className="text-xs font-mono text-slate-200">{personalInfo.email}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 group-hover:text-white flex items-center gap-1">
                  {copied ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <FiCheck size={12} /> Copied
                    </span>
                  ) : (
                    <>
                      <FiCopy size={12} /> Copy
                    </>
                  )}
                </div>
              </button>

              {/* Phone Link */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <FiPhone size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Phone</span>
                    <span className="text-xs font-mono text-slate-200">{personalInfo.phone}</span>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={14} />
              </a>

              {/* LinkedIn Link */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <FiLinkedin size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">LinkedIn</span>
                    <span className="text-xs font-mono text-slate-200">in/{personalInfo.linkedinUsername}</span>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={14} />
              </a>

              {/* GitHub Link */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-slate-300">
                    <FiGithub size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">GitHub</span>
                    <span className="text-xs font-mono text-slate-200">@{personalInfo.githubUsername}</span>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={14} />
              </a>

              {/* YouTube Link */}
              <a
                href={personalInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <SiYoutube size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">YouTube (DSA)</span>
                    <span className="text-xs font-mono text-slate-200">{personalInfo.youtubeHandle}</span>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Functional Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="craft-card p-6 sm:p-8 border border-white/[0.08] space-y-4"
          >
            <h3 className="text-base font-bold text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Feel free to send a note regarding openings, systems engineering, or technical inquiries.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:bg-white/[0.05] focus:outline-none transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:bg-white/[0.05] focus:outline-none transition-colors font-sans"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Dharamvir, we have an SDE opening on our backend team and would like to connect..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:bg-white/[0.05] focus:outline-none transition-colors resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:w-auto"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FiSend size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
