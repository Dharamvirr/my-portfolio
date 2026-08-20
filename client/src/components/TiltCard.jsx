import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * TiltCard — 3D perspective tilt that follows the cursor.
 * Wraps any content. On mouse-leave, springs back to flat.
 *
 * Usage:
 *   <TiltCard className="..." maxTilt={10}>...</TiltCard>
 */
const TiltCard = ({ children, className = '', maxTilt = 10 }) => {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`])

  const handleMouseMove = (e) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default TiltCard
