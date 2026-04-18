// src/components/Retail.jsx
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

const categories = [
  {
    tier: 'Luxury & Premium',
    count: '80+',
    desc: 'Coach, Tiffany & Co., Nordstrom, Louis Vuitton. Elevated brands anchoring the north wing.',
    tags: ['Coach', 'Tiffany & Co.', 'Nordstrom', 'Louis Vuitton', 'Rolex'],
    accent: '#c9a84c',
  },
  {
    tier: 'Flagship & Lifestyle',
    count: '200+',
    desc: 'Nike, Apple, Lego, Tesla. Category-defining flagships with experiential formats.',
    tags: ['Nike', 'Apple', 'Lego', 'Tesla', 'Zara'],
    accent: '#e8c547',
  },
  {
    tier: 'Pop-Up & Emerging',
    count: '50+',
    desc: 'Short-term activations, DTC brands going physical, and exclusive limited drops.',
    tags: ['Flexible Leases', 'DTC Ready', 'Drop Events', 'Brand Labs'],
    accent: '#a07830',
  },
]

const leasingStats = [
  { value: '96%', label: 'Average Occupancy Rate' },
  { value: '14hr', label: 'Daily Dwell Time Peak' },
  { value: '3.2x', label: 'Sales/sqft vs Avg Mall' },
  { value: '12M', label: 'Monthly Foot Traffic' },
]

export default function Retail() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="retail" ref={ref} style={{
      background: '#111114',
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* BG accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: 'linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)',
        opacity: 0.4,
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
            }}>Retail</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              fontWeight: 700, color: '#f0ede8', lineHeight: 1.1,
            }}>
              500+ Brands.<br /><em style={{ color: '#c9a84c' }}>One Address.</em>
            </h2>
            <div style={{ width: '48px', height: '1px', background: '#c9a84c', marginTop: '24px' }} />
          </div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
            color: '#8a8680', lineHeight: 1.8, fontWeight: 300,
          }}>
            From global luxury houses to DTC pioneers going physical for the first time —
            Mall of America offers every format, every footprint, and every customer profile
            under one roof. With a 96% average occupancy rate, demand speaks for itself.
          </p>
                 <img
  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
  alt="Luxury retail"
  style={{
    width: '100%', height: '180px',
    objectFit: 'cover', marginTop: '28px',
    opacity: 0.55,
    border: '1px solid rgba(201,168,76,0.15)',
  }}
/>
   
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', gap: '0', marginBottom: '0',
          border: '1px solid rgba(201,168,76,0.15)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}>
          {categories.map((c, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              flex: 1, padding: '18px 24px', background: activeTab === i ? 'rgba(201,168,76,0.08)' : 'transparent',
              border: 'none', borderBottom: activeTab === i ? `2px solid ${c.accent}` : '2px solid transparent',
              color: activeTab === i ? '#f0ede8' : '#8a8680',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {c.tier}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        {categories.map((c, i) => (
          <div key={i} style={{
            display: activeTab === i ? 'grid' : 'none',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            border: '1px solid rgba(201,168,76,0.15)',
            borderTop: 'none',
            marginBottom: '64px',
          }}>
            <div style={{ padding: '48px', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '64px',
                fontWeight: 900, color: c.accent, lineHeight: 1, marginBottom: '16px',
              }}>{c.count}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8680', marginBottom: '20px',
              }}>{c.tier} Stores</div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
                color: '#8a8680', lineHeight: 1.8, fontWeight: 300,
              }}>{c.desc}</p>
            </div>
            <div style={{ padding: '48px' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '24px',
              }}>Notable Tenants</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                {c.tags.map((tag, t) => (
                  <span key={t} style={{
                    padding: '8px 16px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                    color: '#f0ede8', letterSpacing: '0.05em',
                  }}>{tag}</span>
                ))}
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 28px', background: '#c9a84c', border: 'none',
                  color: '#0a0a0b', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.target.style.background = '#e8c547'}
                onMouseLeave={e => e.target.style.background = '#c9a84c'}
              >
                Inquire About Leasing →
              </button>
            </div>
          </div>
        ))}

        {/* Leasing stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid rgba(201,168,76,0.1)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          {leasingStats.map((s, i) => (
            <div key={i} style={{
              padding: '32px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
              background: i % 2 === 0 ? '#111114' : '#0f0f12',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '36px',
                fontWeight: 700, color: '#c9a84c', marginBottom: '8px',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                color: '#8a8680', lineHeight: 1.4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}