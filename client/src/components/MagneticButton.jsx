import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * MagneticButton — button that slightly follows the cursor (magnetic effect).
 * Renders any element as the trigger. Snaps back on mouse-leave.
 *
 * Usage:
 *   <MagneticButton strength={0.3}>
 *     <button className="btn-primary">Click me</button>
 *   </MagneticButton>
 */
const MagneticButton = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 250, damping: 18 })
  const ySpring = useSpring(y, { stiffness: 250, damping: 18 })

  const handleMouseMove = (e) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
