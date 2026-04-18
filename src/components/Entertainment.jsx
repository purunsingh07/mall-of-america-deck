// src/components/Entertainment.jsx
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, staggerChild, fadeUp, lineReveal } from './ScrollAnimations'

const attractions = [
  {
    number: '01',
    name: 'Nickelodeon Universe',
    subtitle: 'Theme Park · 7 Acres',
    desc: 'The largest indoor theme park in North America. 27 rides and attractions, multiple roller coasters, and SpongeBob\'s iconic presence — all inside the mall.',
    highlight: '27 Rides & Attractions',
  },
  {
    number: '02',
    name: 'SEA LIFE Minnesota',
    subtitle: 'Aquarium · 300+ Species',
    desc: 'A 1.2 million gallon ocean tank, walk-through glass tunnels, and over 300 sea species. One of the top-visited aquariums in the Midwest.',
    highlight: '300+ Species',
  },
  {
    number: '03',
    name: 'FlyOver America',
    subtitle: 'Immersive Ride Experience',
    desc: 'A breathtaking flight simulation experience soaring over America\'s most iconic landscapes. 4D sensory immersion unlike anything in traditional retail.',
    highlight: '4D Immersive Experience',
  },
  {
    number: '04',
    name: 'The Crayola Experience',
    subtitle: 'Family · Interactive',
    desc: '25 hands-on activities, custom crayon making, and immersive color worlds. Drives significant family dwell time and repeat visits.',
    highlight: '25 Interactive Activities',
  },
  {
    number: '05',
    name: 'Mini Golf & Bowling',
    subtitle: 'Leisure Entertainment',
    desc: 'Multiple entertainment venues for groups, families, and corporate events. Built-in reasons to extend every visit well beyond shopping.',
    highlight: 'Group & Corporate Ready',
  },
  {
    number: '06',
    name: 'Live Event Stages',
    subtitle: 'Entertainment Platform',
    desc: 'Rotating stages, pop-up performance spaces, and brand activation zones across all four wings. 365 days of programming opportunity.',
    highlight: '365 Days of Programming',
  },
]

export default function Entertainment() {
  const sectionRef = useRef(null)
  const bannerRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const bannerInView = useInView(bannerRef, { once: true, amount: 0.3 })
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  // Parallax for the banner
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const accentLineX = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])

  return (
    <section id="entertainment" ref={sectionRef} style={{
      background: '#111114',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Full-width cinematic banner with parallax */}
      <motion.div
        ref={bannerRef}
        initial={{ opacity: 0 }}
        animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          width: '100%', height: '380px',
          overflow: 'hidden', position: 'relative',
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=1920&q=80"
          alt="Entertainment"
          style={{
            width: '100%', height: '140%',
            objectFit: 'cover', opacity: 0.25,
            position: 'absolute', top: 0, left: 0,
            y: bannerY,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #111114 0%, transparent 25%, transparent 75%, #111114 100%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.4em', color: '#c9a84c', textTransform: 'uppercase',
          }}>America's Largest Indoor Theme Park</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={bannerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 900, color: '#f0ede8', textAlign: 'center',
            }}
          >Nickelodeon Universe</motion.div>
        </motion.div>
      </motion.div>

      {/* BG accent right — animated */}
      <motion.div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '3px',
        background: 'linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)',
        opacity: 0.3, x: accentLineX,
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
            }}>Attractions & Entertainment</motion.div>
            <motion.h2 variants={staggerChild} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              Beyond Retail.<br /><em style={{ color: '#c9a84c' }}>A Universe.</em>
            </motion.h2>
            <motion.div variants={lineReveal} custom={0.3}
              style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px', transformOrigin: 'left' }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.2}
          >
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.8, marginBottom: '24px',
            }}>
              Entertainment is what separates MoA from every other mall in the country.
              Guests don't come just to shop — they come for a full-day experience.
              That means longer dwell time, higher spend, and stronger brand recall.
            </p>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
              color: '#c9a84c', letterSpacing: '0.1em',
            }}>
              Avg visit length: <strong>3.4 hours</strong> — 2× national average
            </div>
          </motion.div>
        </motion.div>

        {/* Attraction grid */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'rgba(201,168,76,0.1)',
          }}
        >
          {attractions.map((a, i) => (
            <motion.div key={i}
              variants={staggerChild}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{
                backgroundColor: 'rgba(201,168,76,0.05)',
                y: -4,
              }}
              style={{
                background: '#111114',
                padding: '40px 32px',
                cursor: 'default',
              }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  color: '#c9a84c', letterSpacing: '0.2em',
                }}>{a.number}</div>
                <motion.div
                  animate={{ borderColor: hovered === i ? 'rgba(201,168,76,0.3)' : '#3a3a3f', color: hovered === i ? '#c9a84c' : '#3a3a3f' }}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '4px 10px', border: '1px solid #3a3a3f',
                  }}
                >{a.highlight}</motion.div>
              </div>

              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '20px',
                fontWeight: 700, color: '#f0ede8', marginBottom: '6px',
              }}>{a.name}</h3>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '16px',
              }}>{a.subtitle}</div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                color: '#8a8680', lineHeight: 1.75,
              }}>{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}