// src/components/Events.jsx
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerChild, lineReveal } from './ScrollAnimations'
import ScrambleText from './ScrambleText'

const eventTypes = [
  {
    code: 'EVT-01',
    name: 'Concerts & Live Music',
    cap: '5,000 Cap.',
    desc: 'The rotunda stage and main court transform into a world-class concert venue. National touring acts, album release events, and exclusive performances.',
    tags: ['National Acts', 'Album Drops', 'Residencies'],
  },
  {
    code: 'EVT-02',
    name: 'Brand Activations',
    cap: 'Custom Footprint',
    desc: 'Pop-up experiences, product launches, and immersive brand worlds. 40M annual visitors means your activation reaches more people in a weekend than most media buys.',
    tags: ['Product Launches', 'Pop-Ups', 'Immersive Worlds'],
  },
  {
    code: 'EVT-03',
    name: 'Corporate & Convention',
    cap: '10,000+ Delegates',
    desc: 'The Expo Center hosts trade shows, corporate summits, award galas, and multi-day conventions — with unmatched amenities steps from 500+ retail and dining options.',
    tags: ['Trade Shows', 'Summits', 'Award Galas'],
  },
  {
    code: 'EVT-04',
    name: 'Performing Arts',
    cap: '2,500 Seat Theatre',
    desc: 'Broadway touring productions, stand-up specials, orchestral performances, and cultural events in a purpose-built, acoustically designed performing arts venue.',
    tags: ['Broadway', 'Stand-Up', 'Orchestra'],
  },
]

const pastEvents = [
  { name: 'Taylor Swift Fan Event', year: '2023', type: 'Brand Activation' },
  { name: 'NBA All-Star Weekend', year: '2022', type: 'Corporate' },
  { name: 'Comic-Con Minnesota', year: '2023', type: 'Convention' },
  { name: 'Nickelodeon SlimeFest', year: '2022', type: 'Live Event' },
  { name: 'Target Holiday Campaign', year: '2023', type: 'Brand Activation' },
  { name: 'Minnesota Twins Fan Fest', year: '2024', type: 'Live Event' },
]

const venueStats = [
  { value: '400+', label: 'Events Per Year' },
  { value: '10K+', label: 'Max Venue Capacity' },
  { value: '8', label: 'Dedicated Event Spaces' },
  { value: '365', label: 'Days Available' },
]

export default function Events() {
  const sectionRef = useRef(null)
  const bannerRef = useRef(null)
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const statsRef = useRef(null)
  const [activeEvent, setActiveEvent] = useState(0)

  const bannerInView = useInView(bannerRef, { once: true, amount: 0.3 })
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  // Parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="events" ref={sectionRef} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Events cinematic banner with parallax */}
      <motion.div
        ref={bannerRef}
        initial={{ opacity: 0 }}
        animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          width: '100%', height: '340px',
          overflow: 'hidden', position: 'relative',
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80"
          alt="Live event crowd"
          style={{
            width: '100%', height: '140%',
            objectFit: 'cover', opacity: 0.2,
            position: 'absolute', top: 0, left: 0,
            y: bannerY,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #0a0a0b 0%, transparent 25%, transparent 75%, #0a0a0b 100%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={bannerInView ? { opacity: 1, y: 0 } : {}}
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
          }}>400+ Events Per Year</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={bannerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              fontWeight: 900, color: '#f0ede8', textAlign: 'center',
            }}
          >The Biggest Stage<br /><em style={{ color: '#c9a84c' }}>In Retail.</em></motion.div>
        </motion.div>
      </motion.div>

      {/* Large watermark — parallax */}
      <motion.div style={{
        position: 'absolute', right: '-60px', top: '0',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(180px, 22vw, 320px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.025)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        writingMode: 'vertical-rl', y: watermarkY,
      }}>LIVE</motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          style={{ marginBottom: '80px' }}
        >
          <motion.div variants={staggerChild} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
          }}>Events & Platform</motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
            <motion.h2 variants={staggerChild} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              The Stage is Set.<br /><em style={{ color: '#c9a84c' }}>The Audience is Here.</em>
            </motion.h2>
            <motion.p variants={staggerChild} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.8,
            }}>
              400+ events per year. Concerts, brand activations, conventions, award shows.
              MoA isn't just a backdrop — it's an amplifier. Your event reaches an audience
              that's already there, already engaged, already spending.
            </motion.p>
          </div>
          <motion.div variants={lineReveal} custom={0.3}
            style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '32px', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Event type selector */}
        <motion.div
          ref={tabsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tabsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px',
            background: 'rgba(201,168,76,0.1)', marginBottom: '1px',
          }}
        >
          {eventTypes.map((e, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveEvent(i)}
              whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: activeEvent === i ? 'rgba(201,168,76,0.08)' : '#0a0a0b',
                border: 'none',
                borderBottom: activeEvent === i ? '2px solid #c9a84c' : '2px solid transparent',
                padding: '24px 20px', cursor: 'pointer', textAlign: 'left',
                transition: 'border-color 0.3s',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                color: '#c9a84c', letterSpacing: '0.2em', marginBottom: '10px',
              }}>
                <ScrambleText text={e.code} />
              </div>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '16px',
                fontWeight: 700, color: activeEvent === i ? '#f0ede8' : '#8a8680',
                transition: 'color 0.3s',
              }}>{e.name}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active event detail with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              border: '1px solid rgba(201,168,76,0.1)', borderTop: 'none',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              marginBottom: '80px',
            }}
          >
            <div style={{ padding: '48px', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '52px',
                  fontWeight: 900, color: '#c9a84c', lineHeight: 1, marginBottom: '8px',
                }}
              >
                {eventTypes[activeEvent].cap}
              </motion.div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', color: '#8a8680', textTransform: 'uppercase', marginBottom: '24px',
              }}>Venue Scale</div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
                color: '#8a8680', lineHeight: 1.8,
              }}>{eventTypes[activeEvent].desc}</p>
            </div>
            <div style={{ padding: '48px' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '24px',
              }}>Event Categories</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                {eventTypes[activeEvent].tags.map((tag, t) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + t * 0.08 }}
                    whileHover={{ borderColor: '#c9a84c', y: -2 }}
                    style={{
                      padding: '10px 20px',
                      border: '1px solid rgba(201,168,76,0.3)',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#f0ede8',
                    }}
                  >{tag}</motion.span>
                ))}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '16px',
              }}>Past Event Highlights</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {pastEvents.slice(0, 3).map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(201,168,76,0.03)' }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 8px',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                    }}
                  >
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#f0ede8' }}>{p.name}</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                        color: '#c9a84c', letterSpacing: '0.15em',
                      }}>{p.type}</span>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#8a8680',
                      }}>{p.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Venue stats */}
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {venueStats.map((s, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)', y: -3 }}
              style={{
                padding: '36px 24px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                background: i % 2 === 0 ? '#0a0a0b' : '#0d0d10',
              }}
            >
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '40px',
                fontWeight: 700, color: '#c9a84c', marginBottom: '8px',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8a8680',
              }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}