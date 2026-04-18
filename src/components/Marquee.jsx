// src/components/Marquee.jsx
// Infinite scrolling ticker — a signature of premium web design
import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'

export default function Marquee({ items, speed = 30, separator = '·', reverse = false }) {
  const content = items.join(` ${separator} `) + ` ${separator} `
  // Duplicate for seamless loop
  const doubled = content + content

  // Scroll velocity skew calculation
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  
  // Transform scroll velocity into degrees of skew
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-3, 3])

  return (
    <div style={{
      overflow: 'hidden',
      padding: '28px 0',
      background: 'rgba(201,168,76,0.03)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to right, #0a0a0b, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to left, #0a0a0b, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Skew wrapper */}
      <motion.div style={{ skewX: skewVelocity, display: 'flex' }}>
        <motion.div
          animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
          transition={{
            x: { repeat: Infinity, repeatType: 'loop', duration: speed, ease: 'linear' },
          }}
          style={{
            display: 'flex', whiteSpace: 'nowrap', gap: '0',
          }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8a8680',
            paddingRight: '0',
          }}>
            {doubled}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
