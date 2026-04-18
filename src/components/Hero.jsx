// src/components/Hero.jsx
import { useEffect, useState } from 'react'

const stats = [
  { value: '5.6M', label: 'Square Feet' },
  { value: '40M+', label: 'Annual Visitors' },
  { value: '500+', label: 'Stores & Restaurants' },
  { value: '$2B+', label: 'Annual Sales' },  // ← move $ before 2
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const increment = numeric / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numeric) { setCount(numeric); clearInterval(timer) }
      else setCount(current)
    }, 16)
    return () => clearInterval(timer)
  }, [start, target, duration])

  const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
  const prefix = target.startsWith('$') ? '$' : ''           // ← add this
  const suffix = target.replace(/[$0-9.]/g, '')              // ← strip $ from suffix
  return prefix + Math.min(count, numeric).toFixed(numeric % 1 !== 0 ? 1 : 0) + suffix
}

function StatItem({ value, label, animate }) {
  const display = useCountUp(value, 2000, animate)
  return (
    <div style={{ textAlign: 'center', padding: '0 32px', borderRight: '1px solid rgba(201,168,76,0.2)' }}
      className="last:border-none">
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(28px, 3vw, 42px)',
        fontWeight: 700,
        color: '#c9a84c',
        lineHeight: 1,
      }}>
        {display}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#8a8680',
        marginTop: '8px',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    const statsTimer = setTimeout(() => setStatsVisible(true), 1400)
    return () => { clearTimeout(timer); clearTimeout(statsTimer) }
  }, [])

  const scrollToNext = () => {
    document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        {/* Hero background image — loads from Unsplash */}
<img
  src="https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=1920&q=80"
  alt=""
  style={{
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    opacity: 0.25,
    zIndex: 0,
  }}
/>

      {/* Animated gradient fallback (shows when no video) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 30%, rgba(201,168,76,0.04) 0%, transparent 60%),
          linear-gradient(180deg, #0a0a0b 0%, #111114 50%, #0a0a0b 100%)
        `,
      }} />

      {/* YouTube background video */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <iframe
          src="https://www.youtube.com/embed/olZJiEYqMsc?autoplay=1&mute=1&loop=1&playlist=olZJiEYqMsc&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&start=5"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh',
            minWidth: '100%',
            height: '56.25vw',
            minHeight: '100%',
            border: 'none',
            opacity: 0.35,
            pointerEvents: 'none',
          }}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* Gold top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px', zIndex: 2,
        background: 'linear-gradient(90deg, transparent, #c9a84c 30%, #e8c547 50%, #c9a84c 70%, transparent)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 0.5s',
      }} />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '900px' }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          marginBottom: '28px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.3s',
        }}>
          Bloomington, Minnesota · Est. 1992
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          lineHeight: 1.05,
          color: '#f0ede8',
          marginBottom: '12px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s ease 0.5s',
        }}>
          Not Just A Mall.
        </h1>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: '#c9a84c',
          marginBottom: '36px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s ease 0.7s',
        }}>
          A Destination.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          fontWeight: 300,
          color: '#8a8680',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 48px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          America's most visited retail destination. 40 million visitors.
          500+ brands. One address that changes everything.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 1.1s',
        }}>
          <button
            onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px',
              background: '#c9a84c',
              border: 'none',
              color: '#0a0a0b',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.background = '#e8c547'}
            onMouseLeave={e => e.target.style.background = '#c9a84c'}
          >
            Explore the Property
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#f0ede8',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#c9a84c'; e.target.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(201,168,76,0.4)'; e.target.style.color = '#f0ede8' }}
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 2,
        borderTop: '1px solid rgba(201,168,76,0.15)',
        background: 'rgba(10,10,11,0.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '28px 0',
        opacity: statsVisible ? 1 : 0,
        transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
      }}>
        {stats.map((s, i) => (
          <StatItem key={i} value={s.value} label={s.label} animate={statsVisible} />
        ))}
      </div>

      {/* Scroll indicator */}
      <button onClick={scrollToNext} style={{
        position: 'absolute', bottom: '110px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: loaded ? 0.5 : 0, transition: 'opacity 0.8s ease 1.5s',
        zIndex: 3,
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
          letterSpacing: '0.3em', color: '#8a8680', textTransform: 'uppercase',
        }}>Scroll</div>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, #c9a84c, transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  )
}