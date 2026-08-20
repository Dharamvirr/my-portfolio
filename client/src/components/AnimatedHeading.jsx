import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * AnimatedHeading — Reveals text by sliding up from behind an overflow:hidden
 * mask, creating a cinematic "unmasking" reveal effect.
 *
 * Usage:
 *   <AnimatedHeading tag="h2" delay={0.1}>
 *     Section <span className="gradient-text">Title</span>
 *   </AnimatedHeading>
 */
const AnimatedHeading = ({
  tag: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  margin = '-80px',
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin })
  const shouldReduce = useReducedMotion()

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: shouldReduce ? 0 : '105%', opacity: shouldReduce ? 1 : 0.3 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: shouldReduce ? 0.01 : 0.8,
          delay: shouldReduce ? 0 : delay,
          ease: [0.76, 0, 0.24, 1], // custom cubic-bezier: fast then ease
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}

export default AnimatedHeading
