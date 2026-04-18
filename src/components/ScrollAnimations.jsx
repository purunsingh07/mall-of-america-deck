// src/components/ScrollAnimations.jsx
// Shared Framer Motion animation variants & utilities for professional scroll effects

// ─── VARIANTS ─────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay }
  })
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const slideLeft = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const slideRight = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

export const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay }
  })
}
