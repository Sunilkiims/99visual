'use client';

// Scroll-triggered fade-up for below-the-fold content.
// - Renders immediately visible for users who prefer reduced motion.
// - The text is always in the server HTML (only opacity/transform animate),
//   so crawlers and no-JS readers get the full content.
// - Never use it on above-the-fold / LCP content.
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? motion.li : as === 'article' ? motion.article : motion.div;
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}
