// src/components/Entertainment.jsx
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
  const ref = useRef(null)
  const inView = useInView(ref)
  const [hovered, setHovered] = useState(null)

  return (
    <section id="entertainment" ref={ref} style={{
      background: '#111114',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>
        {/* Full-width cinematic banner */}
<div style={{
  width: '100%', height: '380px',
  overflow: 'hidden', position: 'relative',
}}>
  <img
    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
    alt="Entertainment"
    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
  />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, #111114 0%, transparent 25%, transparent 75%, #111114 100%)',
  }} />
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '12px',
  }}>
    <div style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
      letterSpacing: '0.4em', color: '#c9a84c', textTransform: 'uppercase',
    }}>America's Largest Indoor Theme Park</div>
    <div style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 'clamp(36px, 5vw, 72px)',
      fontWeight: 900, color: '#f0ede8', textAlign: 'center',
    }}>Nickelodeon Universe</div>
  </div>
</div>

      {/* BG accent right */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '3px',
        background: 'linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)',
        opacity: 0.3,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
          alignItems: 'end', marginBottom: '80px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
            }}>Attractions & Entertainment</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              Beyond Retail.<br /><em style={{ color: '#c9a84c' }}>A Universe.</em>
            </h2>
            <div style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px' }} />
          </div>
          <div>
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
          </div>
        </div>

        {/* Attraction grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: 'rgba(201,168,76,0.1)',
        }}>
          {attractions.map((a, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'rgba(201,168,76,0.05)' : '#111114',
                padding: '40px 32px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${0.05 * i}s, transform 0.7s ease ${0.05 * i}s, background 0.3s`,
                cursor: 'default',
              }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  color: '#c9a84c', letterSpacing: '0.2em',
                }}>{a.number}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                  color: hovered === i ? '#c9a84c' : '#3a3a3f',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '4px 10px', border: '1px solid',
                  borderColor: hovered === i ? 'rgba(201,168,76,0.3)' : '#3a3a3f',
                  transition: 'all 0.3s',
                }}>{a.highlight}</div>
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
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}