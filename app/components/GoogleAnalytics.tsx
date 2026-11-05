'use client'

// GA4 loader + site-wide contact-click tracking.
//
// Rendered from app/layout.tsx only on the production deployment and only
// when NEXT_PUBLIC_GA_ID is set, so previews and local development never
// send data. gtag.js loads after the page is interactive and does not
// block rendering (no effect on LCP).
//
// One delegated click listener records clicks on phone, email and WhatsApp
// links anywhere on the site, so the individual buttons don't each need
// their own tracking code.

import Script from 'next/script'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

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
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  )
}
