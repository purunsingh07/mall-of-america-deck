// src/components/Nav.jsx
import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import Magnetic from './Magnetic'

const navItems = [
  { id: 'why', label: 'The Property' },
  { id: 'retail', label: 'Retail' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    // Scroll spy — highlights nav based on which section is visible
    const sections = ['hero', ...navItems.map(n => n.id), 'contact']
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o?.disconnect())
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar at very top */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '2px', zIndex: 200, transformOrigin: '0%',
          background: 'linear-gradient(90deg, #c9a84c, #e8c547)',
        }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 2, left: 0, right: 0, zIndex: 100,
          padding: '20px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,11,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: '18px',
            fontWeight: 700, color: '#f0ede8', letterSpacing: '0.05em',
          }}>
            MALL OF <span style={{ color: '#c9a84c' }}>AMERICA</span>
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
            letterSpacing: '0.3em', color: '#8a8680', marginTop: '2px',
          }}>
            PARTNER SALES DECK
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {navItems.map((item, i) => (
            <Magnetic key={item.id}>
              <motion.button 
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -2, color: '#f0ede8' }}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: active === item.id ? '#c9a84c' : '#8a8680',
                  cursor: 'pointer',
                  padding: '4px 0',
                  borderBottom: active === item.id ? '1px solid #c9a84c' : '1px solid transparent',
                }}
              >
                {item.label}
              </motion.button>
            </Magnetic>
          ))}

          {/* CTA */}
          <Magnetic>
            <motion.button
              onClick={() => scrollTo('contact')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: '#c9a84c', color: '#0a0a0b' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '10px 24px', background: 'transparent',
                border: '1px solid #c9a84c', color: '#c9a84c',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Get Started
            </motion.button>
          </Magnetic>
        </div>
      </motion.nav>
    </>
  )
}