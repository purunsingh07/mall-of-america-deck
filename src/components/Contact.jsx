// src/components/Contact.jsx
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerChild } from './ScrollAnimations'
import Magnetic from './Magnetic'

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
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const pathsRef = useRef(null)
  const formRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const pathsInView = useInView(pathsRef, { once: true, amount: 0.2 })
  const formInView = useInView(formRef, { once: true, amount: 0.2 })

  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })

  const handleSubmit = () => {
    if (form.name && form.email) setSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} style={{
      background: '#111114',
      padding: '140px 0 0',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.div variants={staggerChild} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px',
          }}>Get Started</motion.div>
          <motion.h2 variants={staggerChild} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 700, color: '#f0ede8', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Your Brand Belongs Here.
          </motion.h2>
          <motion.p variants={staggerChild} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '16px',
            color: '#8a8680', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto',
          }}>
            40 million visitors are waiting. Choose your path and let's talk.
          </motion.p>
        </motion.div>

        {/* Path selector */}
        <motion.div
          ref={pathsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={pathsInView ? "visible" : "hidden"}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px',
            background: 'rgba(201,168,76,0.1)', marginBottom: '64px',
          }}
        >
          {paths.map((p, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              onClick={() => setSelected(selected === i ? null : i)}
              whileHover={{
                backgroundColor: selected === i ? 'rgba(201,168,76,0.08)' : 'rgba(201,168,76,0.04)',
                y: -3,
              }}
              whileTap={{ scale: 0.99 }}
              style={{
                background: selected === i ? 'rgba(201,168,76,0.08)' : '#111114',
                padding: '40px 32px', cursor: 'pointer',
                borderBottom: selected === i ? '2px solid #c9a84c' : '2px solid transparent',
              }}
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
              <motion.div
                animate={{ color: selected === i ? '#c9a84c' : '#8a8680' }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}
              >
                {selected === i ? '✓ Selected' : `→ ${p.cta}`}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact form */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              style={{
                border: '1px solid rgba(201,168,76,0.15)',
                padding: '56px',
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={formInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  height: '1px', background: 'rgba(201,168,76,0.3)',
                  marginBottom: '36px', transformOrigin: 'left',
                }}
              />
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
                  <motion.div
                    key={f.key}
                    initial={{ opacity: 0, y: 15 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: f.key === 'name' ? 0.3 : 0.4 }}
                  >
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
                        outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#c9a84c'; e.target.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.15)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none' }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                style={{ marginBottom: '20px' }}
              >
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
                    outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#c9a84c'; e.target.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                style={{ marginBottom: '32px' }}
              >
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
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#c9a84c'; e.target.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </motion.div>

              <Magnetic>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.03, backgroundColor: '#e8c547' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '18px 48px', background: '#c9a84c', border: 'none',
                    color: '#0a0a0b', fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer', fontWeight: 500,
                  }}
                >
                  Submit Inquiry →
                </motion.button>
              </Magnetic>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                border: '1px solid rgba(201,168,76,0.3)',
                padding: '80px 56px', textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '48px',
                  color: '#c9a84c', marginBottom: '16px',
                }}
              >✓</motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '32px',
                  color: '#f0ede8', marginBottom: '12px',
                }}
              >We'll Be in Touch.</motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
                  color: '#8a8680', lineHeight: 1.7,
                }}
              >
                Your inquiry has been received. A member of our partnerships team
                will reach out within one business day.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          marginTop: '120px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          padding: '48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
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
          {['Leasing', 'Sponsorship', 'Events', 'Media'].map((l) => (
            <motion.button
              key={l}
              whileHover={{ color: '#c9a84c', y: -2 }}
              style={{
                background: 'none', border: 'none',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.15em', color: '#8a8680', cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >{l}</motion.button>
          ))}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
          color: '#8a8680', letterSpacing: '0.1em',
        }}>
          © 2025 Mall of America. All rights reserved.
        </div>
      </motion.div>
    </section>
  )
}