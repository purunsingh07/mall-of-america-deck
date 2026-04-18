// src/components/WhyMoA.jsx
import { useEffect, useRef, useState } from 'react'

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

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return inView
}

export default function WhyMoA() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="why" ref={ref} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background number watermark */}
      <div style={{
        position: 'absolute', right: '-40px', top: '50px',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(200px, 25vw, 340px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.03)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>
        MoA
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
          marginBottom: '80px',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c',
            marginBottom: '20px',
          }}>
            Why Mall of America
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            maxWidth: '600px',
          }}>
            The Numbers Speak.<br />
            <em style={{ color: '#c9a84c' }}>The Experience Sells.</em>
          </h2>
          <div style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px' }} />
        </div>

        {/* Pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.1)',
          marginBottom: '80px',
        }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: '#0a0a0b',
              padding: '40px 32px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.7s ease ${0.1 + i * 0.12}s`,
              cursor: 'default',
              borderBottom: '2px solid transparent',
              transition2: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderBottom = '2px solid #c9a84c'}
              onMouseLeave={e => e.currentTarget.style.borderBottom = '2px solid transparent'}
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
            </div>
          ))}
        </div>

        {/* Location + Access */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
          alignItems: 'center',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.5s',
        }}>

          {/* Left: text */}
          <div>
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
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px', background: 'transparent',
                border: '1px solid #c9a84c', color: '#c9a84c',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.target.style.background = '#c9a84c'; e.target.style.color = '#0a0a0b' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a84c' }}
            >
              Request Demographics Package
            </button>
          </div>

          {/* Right: fact grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}>
            {locationFacts.map((f, i) => (
              <div key={i} style={{
                background: '#111114', padding: '24px 20px',
              }}>
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
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* Cinematic full-width image strip */}
<div style={{
  marginTop: '100px',
  width: '100%', height: '300px',
  overflow: 'hidden', position: 'relative',
}}>
  <img
    src="https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=1920&q=80"
    alt="Mall interior"
    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
  />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to right, #0a0a0b 0%, transparent 40%, transparent 60%, #0a0a0b 100%)',
  }} />
  <div style={{
    position: 'absolute', inset: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 'clamp(32px, 4vw, 56px)',
      fontWeight: 900, color: '#f0ede8', textAlign: 'center',
      textShadow: '0 2px 40px rgba(0,0,0,0.8)',
    }}>
      5.6 Million Square Feet.<br />
      <em style={{ color: '#c9a84c' }}>One Destination.</em>
    </div>
  </div>
</div>
    </section>
  )
}