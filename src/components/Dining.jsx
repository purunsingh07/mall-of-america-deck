// src/components/Dining.jsx
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, staggerChild } from './ScrollAnimations'
import GlowCard from './GlowCard'

const diningZones = [
  {
    name: 'The Food Court',
    tag: 'Quick Service · Level 1',
    desc: 'Reimagined fast-casual dining across 25,000 sq ft. International flavors, local favorites, and daily volume that rivals major airport food halls.',
    stat: '20K+',
    statLabel: 'Daily Covers',
  },
  {
    name: 'Restaurant Row',
    tag: 'Full Service · Level 3',
    desc: "Sit-down dining from national chains to local icons. Twin Cities' most trafficked restaurant corridor — dinner reservations fill weeks out.",
    stat: '50+',
    statLabel: 'Restaurants',
  },
  {
    name: 'Culinary Studio',
    tag: 'Premium & Private',
    desc: "Private dining, chef's table experiences, and brand activation space. The venue brands book for VIP dinners, launches, and media events.",
    stat: '200',
    statLabel: 'Seat Capacity',
  },
]

const diningBrands = [
  'The Cheesecake Factory', 'Yard House', 'California Pizza Kitchen',
  'Twin City Grill', 'Hooters', 'Bubba Gump', 'Benihana', 'Granite City',
]

export default function Dining() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const zonesRef = useRef(null)
  const brandsRef = useRef(null)
  const imagesRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const zonesInView = useInView(zonesRef, { once: true, amount: 0.15 })
  const brandsInView = useInView(brandsRef, { once: true, amount: 0.3 })
  const imagesInView = useInView(imagesRef, { once: true, amount: 0.2 })

  // Parallax for the decorative text
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['-50px', '50px'])

  return (
    <section id="dining" ref={sectionRef} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Decorative large text — with parallax */}
      <motion.div style={{
        position: 'absolute', left: '-20px', bottom: '60px',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(160px, 20vw, 280px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.025)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        x: watermarkX,
      }}>DINE</motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.div variants={staggerChild} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
          }}>Dining & Lifestyle</motion.div>
          <motion.h2 variants={staggerChild} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 4.5vw, 58px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Food Is the<br /><em style={{ color: '#c9a84c' }}>New Anchor Tenant.</em>
          </motion.h2>
          <motion.p variants={staggerChild} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
            color: '#8a8680', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto',
          }}>
            Dining drives dwell time. Dwell time drives conversion.
            With 50+ restaurants across every format, guests spend 40% longer
            at MoA than any comparable retail destination.
          </motion.p>
        </motion.div>

        {/* Dining zones */}
        <motion.div
          ref={zonesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={zonesInView ? "visible" : "hidden"}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'rgba(201,168,76,0.1)', marginBottom: '64px',
          }}
        >
          {diningZones.map((z, i) => (
            <motion.div key={i} variants={staggerChild}>
              <GlowCard>
                <div style={{ padding: '48px 36px' }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                    letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '16px',
                  }}>{z.tag}</div>
                  <h3 style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '26px',
                    fontWeight: 700, color: '#f0ede8', marginBottom: '16px',
                  }}>{z.name}</h3>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                    color: '#8a8680', lineHeight: 1.75, marginBottom: '32px',
                  }}>{z.desc}</p>
                  <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '24px' }}>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      style={{
                        fontFamily: 'Playfair Display, serif', fontSize: '40px',
                        fontWeight: 700, color: '#c9a84c',
                      }}
                    >{z.stat}</motion.div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                      letterSpacing: '0.2em', color: '#8a8680', textTransform: 'uppercase', marginTop: '4px',
                    }}>{z.statLabel}</div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand ticker */}
        <motion.div
          ref={brandsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={brandsInView ? "visible" : "hidden"}
        >
          <motion.div variants={staggerChild} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
            letterSpacing: '0.3em', color: '#8a8680', textTransform: 'uppercase',
            marginBottom: '20px', textAlign: 'center',
          }}>Featured Dining Partners</motion.div>
          <motion.div variants={staggerChild} style={{
            display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center',
          }}>
            {diningBrands.map((b, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={brandsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                whileHover={{ borderColor: '#c9a84c', color: '#f0ede8', y: -3 }}
                style={{
                  padding: '10px 20px',
                  border: '1px solid rgba(201,168,76,0.15)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  color: '#8a8680', letterSpacing: '0.05em', cursor: 'default',
                }}
              >{b}</motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* Dining image strip with scroll-triggered reveal */}
      <motion.div
        ref={imagesRef}
        style={{
          marginTop: '80px',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2px', height: '220px', overflow: 'hidden',
          maxWidth: '1200px', margin: '80px auto 0',
          padding: '0 48px',
        }}
      >
        {[
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
        ].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(10% 10% 10% 10%)' }}
            animate={imagesInView ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden', position: 'relative' }}
          >
            <motion.img
              src={src} alt="Dining"
              whileHover={{ scale: 1.08, opacity: 0.7 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', opacity: 0.5,
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              border: '1px solid rgba(201,168,76,0.1)',
            }} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}