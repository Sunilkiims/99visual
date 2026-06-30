'use client'

// components/PostViewer.tsx
// Drop-in replacement for the dangerouslySetInnerHTML <div> in InsightPostPage.
// Intercepts clicks on editor-inserted CTAs only (contact-cta-btn or data-contact-popup).
// Preserves all original article-content styles from the page.

import { useEffect, useRef, useState } from 'react'
import ContactPopup from '@/app/components/ContactPopup'

interface Props {
  html: string
  postTitle?: string
  postUrl?: string
}

export default function PostViewer({ html, postTitle, postUrl }: Props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      // Only intercept editor-inserted CTAs — all other links work normally
      const isCTAButton = anchor.classList.contains('contact-cta-btn')
      const isCTALink   = anchor.getAttribute('data-contact-popup') === 'true'

      if (isCTAButton || isCTALink) {
        e.preventDefault()
        e.stopPropagation()
        setPopupOpen(true)
      }
    }

    // Capture phase — fires before Next.js router intercepts the <a> click
    container.addEventListener('click', handleClick, true)
    return () => container.removeEventListener('click', handleClick, true)
  }, [html])

  return (
    <>
      {/* Exact same className and styles as the original article-content div */}
      <div
        ref={contentRef}
        className="article-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* All original article-content styles — unchanged from your page */}
      <style>{`
        .article-content { color: #d1d5db; font-size: 1.05rem; line-height: 1.85; }
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4 { color: #ffffff; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; }
        .article-content h2 { font-size: 1.5rem; }
        .article-content h3 { font-size: 1.25rem; }
        .article-content p  { margin-bottom: 1.25rem; color: #d1d5db; }
        .article-content a  { color: #f97316; text-decoration: none; }
        .article-content a:hover { color: #fb923c; }
        .article-content strong { color: #ffffff; font-weight: 600; }
        .article-content ul,
        .article-content ol  { color: #d1d5db; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .article-content li  { margin-bottom: 0.5rem; }
        .article-content blockquote { border-left: 3px solid #f97316; padding-left: 1rem; color: #9ca3af; margin: 1.5rem 0; }
        .article-content code { color: #fb923c; background: #1f2937; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .article-content pre { background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 1rem; overflow-x: auto; margin-bottom: 1.25rem; }
        .article-content img { border-radius: 12px; max-width: 100%; }

        /* ── Editor-inserted CTA text link ─────────────────────────────── */
        .article-content a[data-contact-popup="true"] {
          color: #f97316;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          font-weight: 500;
        }
        .article-content a[data-contact-popup="true"]:hover { color: #fb923c; }

        /* ── Editor-inserted CTA button ────────────────────────────────── */
        .article-content a.contact-cta-btn {
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          padding: 12px 28px !important;
          background: #f97316 !important;
          color: #fff !important;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none !important;
          line-height: 1;
          transition: background 0.15s, transform 0.12s;
        }
        .article-content a.contact-cta-btn:hover {
          background: #ea6c00 !important;
          color: #fff !important;
          transform: translateY(-1px);
        }
        .article-content a.contact-cta-btn:active { transform: translateY(0); }
      `}</style>

      <ContactPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        postTitle={postTitle}
        postUrl={postUrl}
      />
    </>
  )
}