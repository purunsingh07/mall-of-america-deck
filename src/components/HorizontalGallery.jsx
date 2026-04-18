// src/components/HorizontalGallery.jsx
// Horizontal scroll section — scrolls sideways while user scrolls vertically
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&q=80',
    title: 'Nickelodeon Universe',
    subtitle: 'The largest indoor theme park in America — 27 rides across 7 acres',
  },
  {
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    title: 'SEA LIFE Aquarium',
    subtitle: '1.2 million gallon ocean experience with 300+ species',
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    title: '500+ Retail Stores',
    subtitle: 'From luxury to flagship to pop-up — every format under one roof',
  },
  {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    title: 'World-Class Dining',
    subtitle: '50+ restaurants across every format and cuisine',
  },
  {
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
    title: '400+ Annual Events',
    subtitle: 'Concerts, brand activations, conventions, and more',
  },
]

export default function HorizontalGallery() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-65%'])

  return (
    <section ref={containerRef} style={{
      height: '300vh',
      position: 'relative',
      background: '#08080a',
    }}>
      {/* Sticky container */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c',
            padding: '0 48px', marginBottom: '24px',
          }}
        >
          Experience Gallery — Scroll to Explore
        </motion.div>

        {/* Horizontal track */}
        <motion.div style={{
          display: 'flex', gap: '32px',
          x,
          padding: '0 48px',
        }}>
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                minWidth: '420px', height: '55vh',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(201,168,76,0.15)',
                flexShrink: 0,
                background: '#111114',
              }}
            >
              {/* Image — directly rendered, no clipPath */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                  transition: 'opacity 0.5s ease, transform 0.6s ease',
                }}
                onMouseEnter={e => { e.target.style.opacity = '0.7'; e.target.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.target.style.opacity = '0.5'; e.target.style.transform = 'scale(1)' }}
              />

              {/* Gold top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #c9a84c, transparent)',
                zIndex: 2,
              }} />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.4) 40%, transparent 100%)',
                zIndex: 1,
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute', bottom: '32px', left: '28px', right: '28px',
                zIndex: 3,
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                  letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '24px',
                  fontWeight: 700, color: '#f0ede8', marginBottom: '8px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  color: '#8a8680', lineHeight: 1.5,
                }}>
                  {item.subtitle}
                </p>
              </div>

              {/* Hover glow */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                background: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
                className="hover-glow"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div style={{
          padding: '0 48px', marginTop: '24px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <div style={{
            flex: 1, height: '1px',
            background: 'rgba(201,168,76,0.1)',
            position: 'relative', overflow: 'hidden',
          }}>
            <motion.div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: '100%',
              background: '#c9a84c',
              scaleX: scrollYProgress,
              transformOrigin: 'left',
            }} />
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
            letterSpacing: '0.2em', color: '#8a8680',
          }}>
            KEEP SCROLLING
          </div>
        </div>
      </div>
    </section>
  )
}
