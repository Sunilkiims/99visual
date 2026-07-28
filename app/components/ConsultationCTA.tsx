'use client'

// components/ConsultationCTA.tsx
//
// Drop-in replacement for `<Link href="/contact">...</Link>` CTA buttons.
// Renders as a real <button> (same className/children you already pass)
// and opens the ContactPopup modal on click instead of navigating away.
// Kept as its own tiny client component so pages like app/services/page.tsx
// can stay Server Components (required for the `metadata` export) while
// still getting popup behavior on individual buttons.

import { useState } from 'react'
import ContactPopup from '@/app/components/ContactPopup'

interface ConsultationCTAProps {
  className?: string
  ariaLabel?: string
  children: React.ReactNode
  postTitle?: string
  postUrl?: string
}

export default function ConsultationCTA({
  className,
  ariaLabel,
  children,
  postTitle = 'Services Page',
  postUrl = '/services',
}: ConsultationCTAProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </button>
      <ContactPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        postTitle={postTitle}
        postUrl={postUrl}
      />
    </>
  )
}