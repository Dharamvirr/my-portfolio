import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Disable on mobile/touch devices
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)

    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY })

    const handleOver = (e) => {
      const el = e.target
      const isInteractive =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.style.cursor === 'pointer'
      setIsHovering(!!isInteractive)
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    if (!isMobile) {
      document.body.style.cursor = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.body.style.cursor = 'auto'
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.3 }}
      />
      {/* Ring cursor */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border transition-colors duration-150 ${
          isHovering
            ? 'border-blue-400 bg-blue-400/10'
            : 'border-white/40'
        }`}
        animate={{
          x: pos.x - (isHovering ? 20 : 16),
          y: pos.y - (isHovering ? 20 : 16),
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  )
}

export default CustomCursor
