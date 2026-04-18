// src/components/CustomCursor.jsx
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorSize = useMotionValue(12)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)
  const smoothSize = useSpring(cursorSize, { damping: 20, stiffness: 250 })

  // Outer ring uses slower spring — must be declared at top level, NOT inline
  const ringX = useSpring(cursorX, { damping: 15, stiffness: 150 })
  const ringY = useSpring(cursorY, { damping: 15, stiffness: 150 })

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style?.cursor === 'pointer' ||
        target.closest('[data-hover]')
      ) {
        cursorSize.set(48)
      }
    }

    const handleMouseOut = () => {
      cursorSize.set(12)
    }

    const handleMouseDown = () => cursorSize.set(8)
    const handleMouseUp = () => cursorSize.set(12)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, cursorSize])

  return (
    <>
      {/* Main dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: smoothX,
          top: smoothY,
          width: smoothSize,
          height: smoothSize,
          borderRadius: '50%',
          background: 'rgba(201,168,76,0.5)',
          pointerEvents: 'none',
          zIndex: 10000,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring — trails behind (using pre-declared springs) */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.2)',
          pointerEvents: 'none',
          zIndex: 10000,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring { display: none; }
        }
      `}</style>
    </>
  )
}
