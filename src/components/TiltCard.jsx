// src/components/TiltCard.jsx
// 3D Tilt effect tracking cursor position over the card
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, style, className }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring to make the tilt feel natural and smooth
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  // Transform coordinates into degrees of rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  // Transform for inner light/glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Normalize values between -0.5 and 0.5
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        ...style
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {children}
        
        {/* Interactive Glare Layer */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 60%)',
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            width: '200%', height: '200%'
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
