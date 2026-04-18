// src/components/WhyMoA.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { staggerContainer, staggerChild, slideRight, slideLeft, lineReveal } from './ScrollAnimations'
import TiltCard from './TiltCard'

const pillars = [
  {
    number: '01',
    title: 'Unrivaled Scale',
    body: '5.6 million square feet. The largest mall in the United States — a city unto itself with its own zip code, security force, and fire station.',
  },
  {
    number: '02',
    title: 'Captive Audience',
    body: '40 million annual visitors. More than Disney World. More than the Grand Canyon. Guests travel from every state and 85+ countries specifically to be here.',
  },
  {
    number: '03',
    title: 'Year-Round Traffic',
    body: 'No slow season. Indoor climate control, a theme park, an aquarium, and a packed events calendar guarantee consistent foot traffic 365 days a year.',
  },
  {
    number: '04',
    title: 'Premium Demographics',
    body: 'Median household income of $82K+. 67% of visitors are between 18–49. High purchase intent, high dwell time, high return frequency.',
  },
]

const locationFacts = [
  { label: 'Distance from MSP Airport', value: '7 min' },
  { label: 'Regional Population (50-mile radius)', value: '3.8M' },
  { label: 'Hotel Rooms On-Site', value: '5,000+' },
  { label: 'Direct Highway Access', value: 'I-494 & Hwy 77' },
  { label: 'Annual Tourism Spend', value: '$1.3B' },
  { label: 'States in Visitor Origin', value: '50' },
]

export default function WhyMoA() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const pillarsRef = useRef(null)
  const locationRef = useRef(null)
  const imageRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.15 })
  const locationInView = useInView(locationRef, { once: true, amount: 0.2 })
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 })

  // Parallax for the watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="why" ref={sectionRef} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background number watermark — with parallax */}
      <motion.div style={{
        position: 'absolute', right: '-40px', top: '50px',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(200px, 25vw, 340px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.03)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        zIndex: 0, y: watermarkY,
      }}>
        MoA
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          style={{ marginBottom: '80px' }}
        >
          <motion.div variants={staggerChild} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c',
            marginBottom: '20px',
          }}>
            Why Mall of America
          </motion.div>
          <motion.h2 variants={staggerChild} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            maxWidth: '600px',
          }}>
            The Numbers Speak.<br />
            <em style={{ color: '#c9a84c' }}>The Experience Sells.</em>
          </motion.h2>
          <motion.div
            variants={lineReveal}
            custom={0.3}
            style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          ref={pillarsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={pillarsInView ? "visible" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.1)',
            marginBottom: '80px',
          }}
        >
          {pillars.map((p, i) => (
            <motion.div key={i} variants={staggerChild} style={{ display: 'flex' }}>
              <TiltCard
                style={{
                  background: '#0a0a0b',
                  padding: '40px 32px',
                  cursor: 'default',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.3s',
                  flex: 1,
                }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  color: '#c9a84c', letterSpacing: '0.2em', marginBottom: '20px',
                }}>
                  {p.number}
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '22px',
                  fontWeight: 700, color: '#f0ede8', marginBottom: '14px',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                  color: '#8a8680', lineHeight: 1.75, fontWeight: 300,
                }}>
                  {p.body}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Location + Access */}
        <div
          ref={locationRef}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: text — slides in from left */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={locationInView ? "visible" : "hidden"}
            custom={0.1}
          >
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c',
              marginBottom: '16px',
            }}>
              Location & Access
            </div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.2, marginBottom: '20px',
            }}>
              At the Crossroads of America
            </h3>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px',
            }}>
              Strategically positioned in the Twin Cities metro — one of the wealthiest and
              most educated markets in the country. Minutes from MSP International Airport
              with direct transit access and 20,000 free parking spaces on-site.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#c9a84c', color: '#0a0a0b' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px', background: 'transparent',
                border: '1px solid #c9a84c', color: '#c9a84c',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Request Demographics Package
            </motion.button>
          </motion.div>

          {/* Right: fact grid — slides in from right */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={locationInView ? "visible" : "hidden"}
            custom={0.2}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            {locationFacts.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)' }}
                style={{ background: '#111114', padding: '24px 20px' }}
              >
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '22px',
                  fontWeight: 700, color: '#c9a84c', marginBottom: '6px',
                }}>
                  {f.value}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                  color: '#8a8680', lineHeight: 1.4,
                }}>
                  {f.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Cinematic full-width image strip with parallax */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          marginTop: '100px',
          width: '100%', height: '300px',
          overflow: 'hidden', position: 'relative',
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=1920&q=80"
          alt="Mall interior"
          style={{
            width: '100%', height: '130%',
            objectFit: 'cover', opacity: 0.4,
            objectPosition: 'center',
            y: imageParallax
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #0a0a0b 0%, transparent 40%, transparent 60%, #0a0a0b 100%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 900, color: '#f0ede8', textAlign: 'center',
            textShadow: '0 2px 40px rgba(0,0,0,0.8)',
          }}>
            5.6 Million Square Feet.<br />
            <em style={{ color: '#c9a84c' }}>One Destination.</em>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}