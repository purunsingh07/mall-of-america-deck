// src/components/Dining.jsx
import { useRef, useState, useEffect } from 'react'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return inView
}

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
    desc: 'Sit-down dining from national chains to local icons. Twin Cities\' most trafficked restaurant corridor — dinner reservations fill weeks out.',
    stat: '50+',
    statLabel: 'Restaurants',
  },
  {
    name: 'Culinary Studio',
    tag: 'Premium & Private',
    desc: 'Private dining, chef\'s table experiences, and brand activation space. The venue brands book for VIP dinners, launches, and media events.',
    stat: '200',
    statLabel: 'Seat Capacity',
  },
]

const diningBrands = [
  'The Cheesecake Factory', 'Yard House', 'California Pizza Kitchen',
  'Twin City Grill', 'Hooters', 'Bubba Gump', 'Benihana', 'Granite City',
]

export default function Dining() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="dining" ref={ref} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Decorative large text */}
      <div style={{
        position: 'absolute', left: '-20px', bottom: '60px',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(160px, 20vw, 280px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.025)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>DINE</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
          }}>Dining & Lifestyle</div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 4.5vw, 58px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Food Is the<br /><em style={{ color: '#c9a84c' }}>New Anchor Tenant.</em>
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
            color: '#8a8680', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto',
          }}>
            Dining drives dwell time. Dwell time drives conversion.
            With 50+ restaurants across every format, guests spend 40% longer
            at MoA than any comparable retail destination.
          </p>
        </div>

        {/* Dining zones */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: 'rgba(201,168,76,0.1)', marginBottom: '64px',
        }}>
          {diningZones.map((z, i) => (
            <div key={i} style={{
              background: '#0a0a0b', padding: '48px 36px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.7s ease ${0.1 + i * 0.12}s`,
              borderBottom: '2px solid transparent',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.borderBottom = '2px solid #c9a84c'}
              onMouseLeave={e => e.currentTarget.style.borderBottom = '2px solid transparent'}
            >
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
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '40px',
                  fontWeight: 700, color: '#c9a84c',
                }}>{z.stat}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                  letterSpacing: '0.2em', color: '#8a8680', textTransform: 'uppercase', marginTop: '4px',
                }}>{z.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand ticker */}
        <div style={{
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.5s',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
            letterSpacing: '0.3em', color: '#8a8680', textTransform: 'uppercase',
            marginBottom: '20px', textAlign: 'center',
          }}>Featured Dining Partners</div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center',
          }}>
            {diningBrands.map((b, i) => (
              <span key={i} style={{
                padding: '10px 20px',
                border: '1px solid rgba(201,168,76,0.15)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                color: '#8a8680', letterSpacing: '0.05em',
                transition: 'all 0.3s', cursor: 'default',
              }}
                onMouseEnter={e => { e.target.style.borderColor = '#c9a84c'; e.target.style.color = '#f0ede8' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.color = '#8a8680' }}
              >{b}</span>
            ))}
          </div>
        </div>

      </div>
      {/* Dining image strip */}
<div style={{
  marginTop: '80px',
  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
  gap: '2px', height: '220px', overflow: 'hidden',
  maxWidth: '1200px', margin: '80px auto 0',
  padding: '0 48px',
}}>
  {[
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  ].map((src, i) => (
    <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
      <img
        src={src} alt="Dining"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.5,
          transition: 'transform 0.6s ease, opacity 0.3s',
        }}
        onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.opacity = '0.7' }}
        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.opacity = '0.5' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid rgba(201,168,76,0.1)',
      }} />
    </div>
  ))}
</div>
    </section>
  )
}