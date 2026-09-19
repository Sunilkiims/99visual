'use client'

// TableOfContents.tsx
//
// Two presentations of the same heading data, rendered from two separate
// call sites in the page (desktop needs it physically inside the sidebar
// column to be sticky in the right rail; mobile needs it inline near the
// top of the article, since the sidebar column stacks *below* the article
// on narrow screens — by the time a reader scrolls there they've already
// read the piece). A `variant` prop picks which one a given call renders,
// so mounting both call sites never produces two copies of the same
// interactive element / id in the DOM.
//
// Smooth scrolling for the `#id` anchors is already global (see
// app/global.css, `html { scroll-behavior: smooth }`) — this component only
// adds the active-section highlight on top of behavior the browser already
// gives us for free.

import { useEffect, useState } from 'react'
import { List, ChevronDown } from 'lucide-react'
import type { ArticleHeading } from './extractHeadings'

interface Props {
  headings: ArticleHeading[]
  accent: string
  variant: 'desktop' | 'mobile'
}

function useActiveHeading(headings: ArticleHeading[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length < 2) return

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length > 0) {
          const top = intersecting.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActiveId(top.target.id)
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: [0, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  return activeId
}

export default function TableOfContents({ headings, accent, variant }: Props) {
  const activeId = useActiveHeading(headings)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (headings.length < 2) return null

  const linkClasses = (id: string, level: 2 | 3) =>
    `block py-1.5 border-l text-sm leading-snug transition-colors ${
      level === 3 ? 'pl-7' : 'pl-4'
    } ${activeId === id ? 'font-medium' : 'border-transparent text-gray-500 hover:text-gray-300'}`

  if (variant === 'desktop') {
    return (
      <nav
        aria-label="Table of contents"
        className="hidden lg:block bg-gray-900/60 border border-gray-800 rounded-3xl p-6"
      >
        <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
          <List className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
          On This Page
        </h3>
        <ul className="space-y-0.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={activeId === h.id ? 'location' : undefined}
                className={linkClasses(h.id, h.level)}
                style={activeId === h.id ? { color: accent, borderColor: accent } : undefined}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <div className="lg:hidden mb-8">
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-toc-list"
        className="w-full flex items-center justify-between gap-2 bg-gray-900/60 border border-gray-800 rounded-2xl px-5 py-3.5 text-sm font-medium text-white transition-colors hover:border-gray-700"
      >
        <span className="flex items-center gap-2">
          <List className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          On This Page
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {mobileOpen && (
        <ul id="mobile-toc-list" className="mt-2 bg-gray-900/40 border border-gray-800 rounded-2xl px-5 py-3 space-y-0.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={() => setMobileOpen(false)}
                className={`block py-1.5 text-sm text-gray-400 hover:text-white transition-colors ${h.level === 3 ? 'pl-4' : ''}`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
