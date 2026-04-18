// src/components/Nav.jsx
import { useState, useEffect } from 'react'

const navItems = [
  { id: 'why', label: 'The Property' },
  { id: 'retail', label: 'Retail' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,11,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#f0ede8',
            letterSpacing: '0.05em',
          }}>
            MALL OF <span style={{ color: '#c9a84c' }}>AMERICA</span>
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#8a8680',
            marginTop: '2px',
          }}>
            PARTNER SALES DECK
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
              background: 'none',
              border: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: active === item.id ? '#c9a84c' : '#8a8680',
              cursor: 'pointer',
              transition: 'color 0.2s',
              padding: '4px 0',
              borderBottom: active === item.id ? '1px solid #c9a84c' : '1px solid transparent',
            }}
              onMouseEnter={e => e.target.style.color = '#f0ede8'}
              onMouseLeave={e => e.target.style.color = active === item.id ? '#c9a84c' : '#8a8680'}
            >
              {item.label}
            </button>
          ))}

          {/* CTA */}
          <button onClick={() => scrollTo('contact')} style={{
            padding: '10px 24px',
            background: 'transparent',
            border: '1px solid #c9a84c',
            color: '#c9a84c',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.target.style.background = '#c9a84c'; e.target.style.color = '#0a0a0b' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a84c' }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </>
  )
}