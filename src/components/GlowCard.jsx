// src/components/GlowCard.jsx
// Glassmorphism card with animated border gradient that follows the cursor
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function GlowCard({ children, style }) {
  const cardRef = useRef(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlowPosition({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      style={{
        position: 'relative',
        padding: '1px',
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)`,
        overflow: 'hidden',
        transition: 'background 0.15s ease',
        ...style,
      }}
    >
      {/* Inner card */}
      <div style={{
        background: 'rgba(10,10,11,0.95)',
        backdropFilter: 'blur(12px)',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Inner glow */}
        <div style={{
          position: 'absolute',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          left: `${glowPosition.x}%`,
          top: `${glowPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'left 0.15s ease, top 0.15s ease',
        }} />
        
        {children}
      </div>
    </motion.div>
  )
}
