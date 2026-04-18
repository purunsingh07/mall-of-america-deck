// src/components/Events.jsx
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
  const ref = useRef(null)
  const inView = useInView(ref)
  const [activeEvent, setActiveEvent] = useState(0)

  return (
    <section id="events" ref={ref} style={{
      background: '#0a0a0b',
      padding: '140px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Events cinematic banner */}
<div style={{
  width: '100%', height: '340px',
  overflow: 'hidden', position: 'relative',
}}>
  <img
    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80"
    alt="Live event crowd"
    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
  />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, #0a0a0b 0%, transparent 25%, transparent 75%, #0a0a0b 100%)',
  }} />
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '12px',
  }}>
    <div style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
      letterSpacing: '0.4em', color: '#c9a84c', textTransform: 'uppercase',
    }}>400+ Events Per Year</div>
    <div style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 'clamp(32px, 4.5vw, 64px)',
      fontWeight: 900, color: '#f0ede8', textAlign: 'center',
    }}>The Biggest Stage<br /><em style={{ color: '#c9a84c' }}>In Retail.</em></div>
  </div>
</div>

      {/* Large watermark */}
      <div style={{
        position: 'absolute', right: '-60px', top: '0',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(180px, 22vw, 320px)',
        fontWeight: 900, color: 'rgba(201,168,76,0.025)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        writingMode: 'vertical-rl',
      }}>LIVE</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          marginBottom: '80px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
          }}>Events & Platform</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              The Stage is Set.<br /><em style={{ color: '#c9a84c' }}>The Audience is Here.</em>
            </h2>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.8,
            }}>
              400+ events per year. Concerts, brand activations, conventions, award shows.
              MoA isn't just a backdrop — it's an amplifier. Your event reaches an audience
              that's already there, already engaged, already spending.
            </p>
          </div>
          <div style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '32px' }} />
        </div>

        {/* Event type selector */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px',
          background: 'rgba(201,168,76,0.1)', marginBottom: '1px',
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.2s',
        }}>
          {eventTypes.map((e, i) => (
            <button key={i} onClick={() => setActiveEvent(i)} style={{
              background: activeEvent === i ? 'rgba(201,168,76,0.08)' : '#0a0a0b',
              border: 'none',
              borderBottom: activeEvent === i ? '2px solid #c9a84c' : '2px solid transparent',
              padding: '24px 20px', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.3s',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                color: '#c9a84c', letterSpacing: '0.2em', marginBottom: '10px',
              }}>{e.code}</div>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '16px',
                fontWeight: 700, color: activeEvent === i ? '#f0ede8' : '#8a8680',
                transition: 'color 0.3s',
              }}>{e.name}</div>
            </button>
          ))}
        </div>

        {/* Active event detail */}
        <div style={{
          border: '1px solid rgba(201,168,76,0.1)', borderTop: 'none',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          marginBottom: '80px',
          opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.3s',
        }}>
          <div style={{ padding: '48px', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontSize: '52px',
              fontWeight: 900, color: '#c9a84c', lineHeight: 1, marginBottom: '8px',
            }}>
              {eventTypes[activeEvent].cap}
            </div>
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
                <span key={t} style={{
                  padding: '10px 20px',
                  border: '1px solid rgba(201,168,76,0.3)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#f0ede8',
                }}>{tag}</span>
              ))}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '16px',
            }}>Past Event Highlights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {pastEvents.slice(0, 3).map((p, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                }}>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Venue stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          border: '1px solid rgba(201,168,76,0.1)',
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.5s',
        }}>
          {venueStats.map((s, i) => (
            <div key={i} style={{
              padding: '36px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
              background: i % 2 === 0 ? '#0a0a0b' : '#0d0d10',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '40px',
                fontWeight: 700, color: '#c9a84c', marginBottom: '8px',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8a8680',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}