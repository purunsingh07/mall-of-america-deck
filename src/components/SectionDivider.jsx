// src/components/SectionDivider.jsx
// Animated section divider with gold gradient line & floating particles
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function SectionDivider({ label }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const labelY = useTransform(scrollYProgress, [0.1, 0.4], [15, 0])

  return (
    <div ref={ref} style={{
      padding: '48px 0',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '16px',
      position: 'relative', overflow: 'hidden',
      zIndex: 2, background: '#0a0a0b',
    }}>
      {/* Animated gold line */}
      <motion.div style={{
        height: '1px',
        width: lineWidth,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 20%, #c9a84c 50%, rgba(201,168,76,0.4) 80%, transparent)',
        maxWidth: '600px',
      }} />

      {/* Optional label */}
      {label && (
        <motion.div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '9px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#8a8680',
          opacity: labelOpacity,
          y: labelY,
        }}>
          {label}
        </motion.div>
      )}

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + i * 0.8,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '3px', height: '3px',
            borderRadius: '50%',
            background: '#c9a84c',
            left: `${30 + i * 20}%`,
            top: '40%',
          }}
        />
      ))}
    </div>
  )
}
