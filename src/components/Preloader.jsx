// src/components/Preloader.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0=loading, 1=reveal, 2=done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800)
    const t2 = setTimeout(() => { setPhase(2); onComplete?.() }, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0b',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Logo text reveal */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700,
                color: '#f0ede8',
                letterSpacing: '0.1em',
              }}
            >
              MALL OF <span style={{ color: '#c9a84c' }}>AMERICA</span>
            </motion.div>
          </div>

          {/* Subtitle reveal */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#8a8680',
              }}
            >
              Partner Sales Deck
            </motion.div>
          </div>

          {/* Loading bar */}
          <motion.div
            style={{
              width: '120px', height: '1px',
              background: 'rgba(201,168,76,0.2)',
              marginTop: '32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                background: '#c9a84c',
                transformOrigin: 'left',
              }}
            />
          </motion.div>

          {/* Wipe curtains */}
          {phase >= 1 && (
            <>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '50%', background: '#0a0a0b', transformOrigin: 'top',
                  zIndex: 10,
                }}
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '50%', background: '#0a0a0b', transformOrigin: 'bottom',
                  zIndex: 10,
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
