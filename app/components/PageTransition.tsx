'use client';

// app/components/PageTransition.tsx
//
// Site-wide "page transition" — a subtle fade used to soften every route
// change instead of the default instant swap. Mounted from app/template.tsx,
// a special Next.js file that (unlike layout.tsx) creates a fresh component
// instance on every navigation, so this motion.div's initial → animate
// transition replays automatically on every route change with no
// AnimatePresence/usePathname-key plumbing needed.
//
// Uses framer-motion, which is already a project dependency and already
// used in app/components/header.tsx, homeslider.tsx, tabstory.tsx,
// contactform.tsx and insights/Reveal.tsx — no new animation library
// introduced for this.
//
// IMPORTANT — opacity only, never transform:
// Header/Footer/ScrollDown/Chatbot/WhatsApp button/sticky mobile CTAs/the
// contact modal are all `position: fixed`, and on this site they're
// rendered per-page (inside each page's own component tree) rather than
// once in the root layout — HomeContent.tsx even has an explicit comment
// about keeping fixed elements "OUTSIDE the wrapper" for exactly this
// reason. A CSS `transform` (translate/scale/etc.) on *any* ancestor
// creates a new containing block for `position: fixed` descendants, which
// would silently break every one of those fixed elements the moment this
// wrapper is animating (they'd start tracking this div instead of the
// viewport). `opacity` does not have that side effect, so this wrapper only
// ever animates opacity — a plain crossfade — regardless of what any given
// page happens to render inside it.
//
// Skipped entirely (children render with no wrapper/animation) for:
//   - /admin/* — the CMS dashboard is a data/utility tool, not a marketing
//     page; motion around tables and forms reads as noise, not polish.
//   - /login — a single-purpose auth screen, same reasoning.
//   - prefers-reduced-motion — respects the OS accessibility setting, same
//     pattern already used in app/components/insights/Reveal.tsx.

import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const NO_TRANSITION_PREFIXES = ['/admin', '/login'];

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const skip =
    shouldReduceMotion ||
    NO_TRANSITION_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (skip) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
}
