// src/components/ScrambleText.jsx
// Cyber/Hacker text shuffle effect on hover
import { useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function ScrambleText({ text, speed = 40, style, className }) {
  const [output, setOutput] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)
    
    let iteration = 0
    const maxIterations = 15 // total steps

    const interval = setInterval(() => {
      setOutput(
        text
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
        setOutput(text)
      }
      
      iteration += text.length / maxIterations
    }, speed)
  }

  return (
    <motion.span 
      onMouseEnter={scramble}
      style={{ ...style, display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
      className={className}
    >
      {output}
    </motion.span>
  )
}
