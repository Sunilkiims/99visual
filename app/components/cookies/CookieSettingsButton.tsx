'use client'

// app/components/cookies/CookieSettingsButton.tsx
// Reopens the cookie preferences dialog from anywhere (footer, policy pages).
// Works without any shared React context: it fires a browser event that the
// single <CookieConsent /> in app/layout.tsx listens for.

import type { ReactNode } from 'react'
import { openCookiePreferences } from '@/lib/cookies/consent-manager'

export default function CookieSettingsButton({
  className,
  children = 'Cookie Settings',
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className} aria-haspopup="dialog">
      {children}
    </button>
  )
}
