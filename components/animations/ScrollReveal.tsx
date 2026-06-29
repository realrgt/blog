'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  className?: string
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.35,
  className,
}: ScrollRevealProps) {
  const variants = directionVariants[direction]

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
