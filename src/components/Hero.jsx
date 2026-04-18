// src/components/Hero.jsx
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useSpring } from 'framer-motion'
import TextReveal from './TextReveal'
import ParticleField from './ParticleField'

const stats = [
  { value: '5.6', suffix: 'M', label: 'Square Feet' },
  { value: '40', suffix: 'M+', label: 'Annual Visitors' },
  { value: '500', suffix: '+', label: 'Stores & Restaurants' },
  { prefix: '$', value: '2', suffix: 'B+', label: 'Annual Sales' },
]

function StatItem({ item, inView }) {
  const nodeRef = useRef(null)
  
  useEffect(() => {
    if (inView) {
      const numericValue = parseFloat(item.value)
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            const isInteger = numericValue % 1 === 0
            nodeRef.current.textContent = (item.prefix || '') + value.toFixed(isInteger ? 0 : 1) + (item.suffix || '')
          }
        }
      })
      return () => controls.stop()
    }
  }, [item.value, item.prefix, item.suffix, inView])

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
        <span ref={nodeRef}>{(item.prefix || '') + '0' + (item.suffix || '')}</span>
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#8a8680',
        marginTop: '8px',
      }}>
        {item.label}
      </div>
    </div>
  )
}

export default function Hero() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  // Parallax and scroll effects
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  // Mouse-following spotlight
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 150 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 150 })

  // Spotlight gradient — must be declared at top level, not inline
  const spotlightBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(201,168,76,0.06) 0%, transparent 60%)`
  )

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const scrollToNext = () => {
    document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.5
      } 
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  }

  return (
    <section id="hero" ref={targetRef} onMouseMove={handleMouseMove} style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Mouse-following spotlight */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: spotlightBg,
      }} />

      {/* Three.js WebGL Particle Constellation */}
      <ParticleField />

      {/* Abstract Background Base (Dark Gradient) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 30%, rgba(201,168,76,0.04) 0%, transparent 60%),
          linear-gradient(180deg, #0a0a0b 0%, #111114 60%, rgba(10,10,11,0.9) 100%)
        `,
      }} />

      {/* Background Video container with Parallax */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        scale: videoScale,
        opacity: videoOpacity, // Scroll opacity logic
        transformOrigin: "center top",
        overflow: 'hidden', pointerEvents: 'none'
      }}>
        {/* Official Mall of America YouTube Video */}
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
            opacity: 0.45,
            mixBlendMode: 'lighten'
          }}
          allow="autoplay; encrypted-media"
        />
      </motion.div>

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* Gold top line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px', zIndex: 2, transformOrigin: 'center',
          background: 'linear-gradient(90deg, transparent, #c9a84c 30%, #e8c547 50%, #c9a84c 70%, transparent)',
        }} 
      />

      {/* Main Content with Parallax & Entry Animation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '900px',
          y: contentY,
          opacity: contentOpacity
        }}
      >
        {/* Eyebrow */}
        <motion.div variants={childVariants} style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
          letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c',
          marginBottom: '28px'
        }}>
          Bloomington, Minnesota · Est. 1992
        </motion.div>

        {/* Main headline — character by character reveal */}
        <motion.div variants={childVariants}>
          <TextReveal
            text="Not Just A Mall."
            as="h1"
            delay={0.3}
            staggerSpeed={0.04}
            style={{
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 900, lineHeight: 1.05, color: '#f0ede8', marginBottom: '12px',
              justifyContent: 'center',
            }}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <TextReveal
            text="A Destination."
            as="h1"
            delay={0.7}
            staggerSpeed={0.05}
            style={{
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 900, fontStyle: 'italic', lineHeight: 1.05, color: '#c9a84c',
              marginBottom: '36px',
              justifyContent: 'center',
            }}
          />
        </motion.div>

        {/* Subheadline */}
        <motion.p variants={childVariants} style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(15px, 1.5vw, 18px)',
          fontWeight: 300, color: '#8a8680', lineHeight: 1.7, maxWidth: '560px',
          margin: '0 auto 48px'
        }}>
          America's most visited retail destination. 40 million visitors.
          500+ brands. One address that changes everything.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={childVariants} style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'
        }}>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#e8c547' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px', background: '#c9a84c', border: 'none',
              color: '#0a0a0b', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500,
            }}
          >
            Explore the Property
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, borderColor: '#c9a84c', color: '#c9a84c', backgroundColor: 'rgba(201,168,76,0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)',
              color: '#f0ede8', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            Partner With Us
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
          borderTop: '1px solid rgba(201,168,76,0.15)',
          background: 'rgba(10,10,11,0.8)', backdropFilter: 'blur(12px)',
          display: 'flex', justifyContent: 'center', alignItems: 'stretch',
          padding: '28px 0',
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={i} item={s} inView={isStatsInView} />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        whileHover={{ opacity: 1 }}
        onClick={scrollToNext} 
        style={{
          position: 'absolute', bottom: '110px', left: '50%', x: '-50%',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 3,
        }}
      >
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
          letterSpacing: '0.3em', color: '#8a8680', textTransform: 'uppercase',
        }}>
          Scroll
        </div>
        <motion.div
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, #c9a84c, transparent)',
            transformOrigin: "top"
          }} 
        />
      </motion.div>
    </section>
  )
}