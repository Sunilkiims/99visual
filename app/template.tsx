import PageTransition from '@/app/components/PageTransition';

// app/template.tsx
//
// Next.js file convention: unlike layout.tsx (which persists across
// navigations within the same segment), template.tsx creates a brand-new
// component instance on every navigation. That's exactly the behaviour a
// page-transition wrapper needs — PageTransition's fade-in animation is
// guaranteed to (re)play on every route change, with no manual key/
// AnimatePresence bookkeeping required.
//
// Stays a Server Component itself (no 'use client' here) — the actual
// animation logic lives in the client component it renders, matching the
// pattern already used elsewhere in this repo (e.g. app/page.tsx staying a
// Server Component and delegating to the client HomeContent.tsx).
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
