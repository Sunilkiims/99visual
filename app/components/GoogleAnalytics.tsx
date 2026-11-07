'use client'

// GA4 loader + site-wide contact-click tracking.
//
// Rendered only by app/components/cookies/CookieConsent.tsx, and only after
// the visitor has allowed Analytics cookies. CookieConsent receives the ID
// from app/layout.tsx only on the production deployment with a valid
// NEXT_PUBLIC_GA_ID, so previews and local development never send data.
// gtag.js loads after the page is interactive and does not block rendering
// (no effect on LCP). The inline bootstrap (lib/cookies/script-manager.ts)
// declares Google Consent Mode v2 state before GA is configured.
//
// One delegated click listener records clicks on phone, email and WhatsApp
// links anywhere on the site, so the individual buttons don't each need
// their own tracking code.

import Script from 'next/script'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { buildGaBootstrap } from '@/lib/cookies/script-manager'

function contactKind(href: string): 'phone' | 'email' | 'whatsapp' | null {
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  if (/^https?:\/\/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) return 'whatsapp'
  return null
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const kind = contactKind(link.getAttribute('href') || '')
      if (kind) {
        trackEvent('contact_click', { method: kind, page_path: window.location.pathname })
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {buildGaBootstrap(gaId)}
      </Script>
    </>
  )
}
