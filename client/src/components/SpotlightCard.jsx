import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * SpotlightCard — wraps any card content with:
 *   • Radial cursor-following glow overlay
 *   • Animated border highlight at cursor position
 *
 * Usage:
 *   <SpotlightCard className="glass-card p-6">...</SpotlightCard>
 */
const SpotlightCard = ({ children, className = '', glowColor = '59,130,246' }) => {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  const handleMove = (e) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => !shouldReduce && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mouse.x}px ${mouse.y}px,
            rgba(${glowColor},0.10) 0%,
            rgba(${glowColor},0.04) 40%,
            transparent 70%
          )`,
        }}
      />
      {/* Border spotlight — brighter where cursor is closest */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px,
            rgba(${glowColor},0.3),
            transparent 70%
          )`,
          WebkitMaskImage: 'linear-gradient(#0a0a0a,#0a0a0a) content-box, linear-gradient(#0a0a0a,#0a0a0a)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {children}
    </div>
  )
}

export default SpotlightCard
