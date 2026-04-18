// src/components/GsapPinnedStats.jsx
// GSAP ScrollTrigger pinned section with scrubbed reveals
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statItems = [
  { display: '5.6M', label: 'Square Feet', unit: 'sq ft' },
  { display: '40M+', label: 'Annual Visitors', unit: 'million' },
  { display: '520+', label: 'Retail & Dining', unit: 'brands' },
  { display: '$2.1B', label: 'Annual Revenue', unit: 'USD' },
  { display: '96%', label: 'Occupancy Rate', unit: 'percent' },
  { display: '12K+', label: 'Daily Employees', unit: 'people' },
]

export default function GsapPinnedStats() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',   // shorter pin duration
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          pinSpacing: true, // explicitly create spacing
        }
      })

      // Title clip reveal
      tl.fromTo('.gsap-stats-title',
        { y: 50, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3 }
      )

      tl.fromTo('.gsap-stats-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2 },
        '-=0.1'
      )

      // Stagger stat cards
      tl.fromTo('.gsap-stat-card',
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.06 },
        '-=0.05'
      )

      // Accent line
      tl.fromTo('.gsap-stats-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.2 },
        '-=0.2'
      )

      // Progress bar runs the whole duration
      tl.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1 },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      height: '100vh',
      background: '#08080a',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,  // low z-index so Retail scrolls over it properly
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 48px',
        height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="gsap-stats-title" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 5vw, 68px)',
            fontWeight: 900, color: '#f0ede8',
            lineHeight: 1.05, marginBottom: '12px',
          }}>
            The Numbers<br />
            <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Don't Lie.</span>
          </div>
          <div className="gsap-stats-subtitle" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px', letterSpacing: '0.4em',
            color: '#8a8680', textTransform: 'uppercase',
          }}>
            Real-time Property Metrics · Updated Q4 2024
          </div>
          <div className="gsap-stats-line" style={{
            width: '56px', height: '2px',
            background: 'linear-gradient(90deg, #c9a84c, transparent)',
            marginTop: '20px', transformOrigin: 'left',
          }} />
        </div>

        {/* Stats grid — 3x2 compact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(201,168,76,0.08)',
        }}>
          {statItems.map((stat, i) => (
            <div
              key={i}
              className="gsap-stat-card"
              style={{
                background: '#08080a',
                padding: '28px 24px',
                position: 'relative',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px', letterSpacing: '0.3em',
                color: '#c9a84c', textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                {stat.unit}
              </div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 900, color: '#f0ede8', marginBottom: '6px',
              }}>
                {stat.display}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px', color: '#8a8680',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            flex: 1, height: '1px',
            background: 'rgba(201,168,76,0.1)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                position: 'absolute', inset: 0,
                background: '#c9a84c', transformOrigin: 'left',
              }}
            />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px', letterSpacing: '0.2em',
            color: '#8a8680', textTransform: 'uppercase',
          }}>
            Scroll Driven
          </div>
        </div>
      </div>
    </section>
  )
}
