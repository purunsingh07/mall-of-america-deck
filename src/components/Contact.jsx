// src/components/Contact.jsx
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

const paths = [
  {
    code: '01',
    title: 'Retail Leasing',
    desc: 'Flagship, mid-tier, luxury, or pop-up. Tell us your format and timeline and we\'ll match you with the right space.',
    cta: 'Start Leasing Inquiry',
  },
  {
    code: '02',
    title: 'Sponsorship & Brand Partnership',
    desc: 'Activate inside the property. Digital placements, naming rights, experiential campaigns, or year-round presence.',
    cta: 'Explore Sponsorship',
  },
  {
    code: '03',
    title: 'Event & Venue Booking',
    desc: 'Concerts, conventions, product launches, brand activations. Our events team handles logistics end to end.',
    cta: 'Book a Venue',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })

  const handleSubmit = () => {
    if (form.name && form.email) setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} style={{
      background: '#111114',
      padding: '140px 0 0',
      position: 'relative', overflow: 'hidden',
    }}>

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
          }}>Get Started</div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Your Brand Belongs Here.
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '16px',
            color: '#8a8680', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto',
          }}>
            40 million visitors are waiting. Choose your path and let's talk.
          </p>
        </div>

        {/* Path selector */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px',
          background: 'rgba(201,168,76,0.1)', marginBottom: '64px',
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.2s',
        }}>
          {paths.map((p, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
              background: selected === i ? 'rgba(201,168,76,0.08)' : '#111114',
              padding: '40px 32px', cursor: 'pointer',
              borderBottom: selected === i ? '2px solid #c9a84c' : '2px solid transparent',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { if (selected !== i) e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
              onMouseLeave={e => { if (selected !== i) e.currentTarget.style.background = '#111114' }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: '#c9a84c', letterSpacing: '0.2em', marginBottom: '16px',
              }}>{p.code}</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '24px',
                fontWeight: 700, color: '#f0ede8', marginBottom: '14px',
              }}>{p.title}</h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                color: '#8a8680', lineHeight: 1.7, marginBottom: '24px',
              }}>{p.desc}</p>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.15em', color: selected === i ? '#c9a84c' : '#8a8680',
                textTransform: 'uppercase', transition: 'color 0.3s',
              }}>
                {selected === i ? '✓ Selected' : `→ ${p.cta}`}
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        {!submitted ? (
          <div style={{
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '56px',
            opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.3em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '36px',
            }}>
              {selected !== null ? `Inquiring: ${paths[selected].title}` : 'Send Us a Message'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Jane Smith' },
                { key: 'company', label: 'Company / Brand', placeholder: 'Acme Corp' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                    letterSpacing: '0.25em', color: '#8a8680', textTransform: 'uppercase',
                    display: 'block', marginBottom: '10px',
                  }}>{f.label}</label>
                  <input
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      color: '#f0ede8', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                      outline: 'none', transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#c9a84c'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                letterSpacing: '0.25em', color: '#8a8680', textTransform: 'uppercase',
                display: 'block', marginBottom: '10px',
              }}>Email Address</label>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com" type="email"
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#f0ede8', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                  outline: 'none', transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = '#c9a84c'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                letterSpacing: '0.25em', color: '#8a8680', textTransform: 'uppercase',
                display: 'block', marginBottom: '10px',
              }}>Message (Optional)</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your brand, timeline, and what you're looking for..."
                rows={4}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#f0ede8', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                  outline: 'none', resize: 'vertical', transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = '#c9a84c'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
              />
            </div>

            <button onClick={handleSubmit} style={{
              padding: '18px 48px', background: '#c9a84c', border: 'none',
              color: '#0a0a0b', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', fontWeight: 500, transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.target.style.background = '#e8c547'}
              onMouseLeave={e => e.target.style.background = '#c9a84c'}
            >
              Submit Inquiry →
            </button>
          </div>
        ) : (
          <div style={{
            border: '1px solid rgba(201,168,76,0.3)',
            padding: '80px 56px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontSize: '48px',
              color: '#c9a84c', marginBottom: '16px',
            }}>✓</div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif', fontSize: '32px',
              color: '#f0ede8', marginBottom: '12px',
            }}>We'll Be in Touch.</h3>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              color: '#8a8680', lineHeight: 1.7,
            }}>
              Your inquiry has been received. A member of our partnerships team
              will reach out within one business day.
            </p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        marginTop: '120px',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: '20px',
            fontWeight: 700, color: '#f0ede8',
          }}>
            MALL OF <span style={{ color: '#c9a84c' }}>AMERICA</span>
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
            letterSpacing: '0.3em', color: '#8a8680', marginTop: '4px',
          }}>
            60 E BROADWAY · BLOOMINGTON, MN 55425
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Leasing', 'Sponsorship', 'Events', 'Media'].map(l => (
            <button key={l} style={{
              background: 'none', border: 'none',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.15em', color: '#8a8680', cursor: 'pointer',
              textTransform: 'uppercase', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = '#8a8680'}
            >{l}</button>
          ))}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
          color: '#8a8680', letterSpacing: '0.1em',
        }}>
          © 2025 Mall of America. All rights reserved.
        </div>
      </div>
    </section>
  )
}