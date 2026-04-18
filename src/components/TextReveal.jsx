// src/components/TextReveal.jsx
// Character-by-character text reveal animation — signature of premium web design
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({ 
  text, 
  as = 'div', 
  style = {}, 
  delay = 0, 
  staggerSpeed = 0.03,
  once = true 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const Tag = as

  // Split text into words, then each word into characters
  const words = text.split(' ')

  let charIndex = 0

  return (
    <Tag ref={ref} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: 'inline-flex', overflow: 'hidden' }}>
          {word.split('').map((char) => {
            const currentIndex = charIndex++
            return (
              <motion.span
                key={currentIndex}
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: delay + currentIndex * staggerSpeed,
                }}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
