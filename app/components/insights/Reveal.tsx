'use client'

// Reveal.tsx
//
// Tiny reusable scroll-reveal wrapper. Same initial/whileInView pattern
// already used elsewhere in the codebase (e.g. app/components/howwework.tsx),
// pulled out here so the Insights page doesn't repeat the same motion.div
// boilerplate for every section/card. Kept as its own client component so
// app/insights/page.tsx can stay an async Server Component (it needs to be,
// for the Prisma queries + generateMetadata) while individual pieces still
// get a subtle entrance animation.
//
// Respects prefers-reduced-motion via framer-motion's useReducedMotion hook —
// when a user has that OS setting on, this renders content in place with no
// motion at all instead of just a shorter/faster animation.

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export default function Reveal({ children, className, delay = 0, y = 20, once = true }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
