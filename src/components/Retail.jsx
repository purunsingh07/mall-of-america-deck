// src/components/Retail.jsx
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerChild, fadeUp, lineReveal } from './ScrollAnimations'

const categories = [
  {
    tier: 'Luxury & Premium',
    count: '80+',
    desc: 'Coach, Tiffany & Co., Nordstrom, Louis Vuitton. Elevated brands anchoring the north wing.',
    tags: ['Coach', 'Tiffany & Co.', 'Nordstrom', 'Louis Vuitton', 'Rolex'],
    accent: '#c9a84c',
  },
  {
    tier: 'Flagship & Lifestyle',
    count: '200+',
    desc: 'Nike, Apple, Lego, Tesla. Category-defining flagships with experiential formats.',
    tags: ['Nike', 'Apple', 'Lego', 'Tesla', 'Zara'],
    accent: '#e8c547',
  },
  {
    tier: 'Pop-Up & Emerging',
    count: '50+',
    desc: 'Short-term activations, DTC brands going physical, and exclusive limited drops.',
    tags: ['Flexible Leases', 'DTC Ready', 'Drop Events', 'Brand Labs'],
    accent: '#a07830',
  },
]

const leasingStats = [
  { value: '96%', label: 'Average Occupancy Rate' },
  { value: '14hr', label: 'Daily Dwell Time Peak' },
  { value: '3.2x', label: 'Sales/sqft vs Avg Mall' },
  { value: '12M', label: 'Monthly Foot Traffic' },
]

export default function Retail() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const statsRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  const [activeTab, setActiveTab] = useState(0)

  // Parallax for accent line
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const accentHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="retail" ref={sectionRef} style={{
      background: '#111114',
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2,
    }}>

      {/* BG accent — animated growth */}
      <motion.div style={{
        position: 'absolute', left: 0, top: 0, width: '3px',
        background: 'linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)',
        opacity: 0.4, height: accentHeight,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
            alignItems: 'end', marginBottom: '80px',
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <motion.div variants={staggerChild} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
            }}>Retail</motion.div>
            <motion.h2 variants={staggerChild} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              500+ Brands.<br /><em style={{ color: '#c9a84c' }}>One Address.</em>
            </motion.h2>
            <motion.div variants={lineReveal} custom={0.3}
              style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px', transformOrigin: 'left' }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.3}
          >
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.8, fontWeight: 300,
            }}>
              From global luxury houses to DTC pioneers going physical for the first time —
              Mall of America offers every format, every footprint, and every customer profile
              under one roof. With a 96% average occupancy rate, demand speaks for itself.
            </p>
            <motion.img
              whileHover={{ scale: 1.03, opacity: 0.65 }}
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
              alt="Luxury retail"
              style={{
                width: '100%', height: '180px',
                objectFit: 'cover', marginTop: '28px',
                opacity: 0.55,
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          ref={tabsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', gap: '0', marginBottom: '0',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          {categories.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveTab(i)}
              whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1, padding: '18px 24px', background: activeTab === i ? 'rgba(201,168,76,0.08)' : 'transparent',
                border: 'none', borderBottom: activeTab === i ? `2px solid ${c.accent}` : '2px solid transparent',
                color: activeTab === i ? '#f0ede8' : '#8a8680',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'border-color 0.3s, color 0.3s',
              }}
            >
              {c.tier}
            </motion.button>
          ))}
        </motion.div>

        {/* Active tab content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {categories.map((c, i) => (
            activeTab === i && (
              <motion.div
                key={c.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr', gap: '0',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderTop: 'none', marginBottom: '64px',
                }}
              >
                <div style={{ padding: '48px', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                      fontFamily: 'Playfair Display, serif', fontSize: '64px',
                      fontWeight: 900, color: c.accent, lineHeight: 1, marginBottom: '16px',
                    }}
                  >{c.count}</motion.div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8680', marginBottom: '20px',
                  }}>{c.tier} Stores</div>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
                    color: '#8a8680', lineHeight: 1.8, fontWeight: 300,
                  }}>{c.desc}</p>
                </div>
                <div style={{ padding: '48px' }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                    letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '24px',
                  }}>Notable Tenants</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                    {c.tags.map((tag, t) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + t * 0.06 }}
                        whileHover={{ borderColor: '#c9a84c', y: -2 }}
                        style={{
                          padding: '8px 16px',
                          border: '1px solid rgba(201,168,76,0.2)',
                          fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                          color: '#f0ede8', letterSpacing: '0.05em',
                        }}
                      >{tag}</motion.span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: '#e8c547' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{
                      padding: '14px 28px', background: '#c9a84c', border: 'none',
                      color: '#0a0a0b', fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Inquire About Leasing →
                  </motion.button>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Leasing stats row */}
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {leasingStats.map((s, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)' }}
              style={{
                padding: '32px 24px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                background: i % 2 === 0 ? '#111114' : '#0f0f12',
              }}
            >
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '36px',
                fontWeight: 700, color: '#c9a84c', marginBottom: '8px',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                color: '#8a8680', lineHeight: 1.4,
              }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}