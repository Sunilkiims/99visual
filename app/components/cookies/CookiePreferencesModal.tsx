'use client'

// app/components/cookies/CookiePreferencesModal.tsx
// The "Customize cookies" dialog. Every optional category starts OFF unless
// the visitor already switched it on; nothing is saved until they press one
// of the three buttons. Closing the dialog (×, Esc, backdrop) saves nothing.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ACTIVE_CATEGORIES, COOKIE_INVENTORY } from '@/lib/cookies/cookie-config'
import type { CategoryChoices, OptionalCategory } from '@/lib/cookies/consent-types'
import CookieCategoryToggle from './CookieCategoryToggle'

interface Props {
  initialChoices: CategoryChoices
  hasStoredDecision: boolean
  onSave: (choices: CategoryChoices) => void
  onAcceptAll: () => void
  onRejectOptional: () => void
  onReset: () => void
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'

export default function CookiePreferencesModal({
  initialChoices,
  hasStoredDecision,
  onSave,
  onAcceptAll,
  onRejectOptional,
  onReset,
  onClose,
}: Props) {
  const [choices, setChoices] = useState<CategoryChoices>(initialChoices)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus management, Esc to close, focus trap and background scroll lock.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  const setCategory = (cat: OptionalCategory, value: boolean) =>
    setChoices((prev) => ({ ...prev, [cat]: value }))

  return (
    <div className="fixed inset-0 z-[10001] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        aria-describedby="cookie-prefs-intro"
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white text-neutral-900 shadow-2xl sm:rounded-2xl"
        style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B91C1C]">
              99 Visual Solutions
            </p>
            <h2 id="cookie-prefs-title" className="mt-1 text-lg font-bold sm:text-xl">
              Cookie preferences
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="-mr-1 rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">
          <p id="cookie-prefs-intro" className="text-sm leading-relaxed text-neutral-600">
            Choose which cookies we may use. Strictly necessary cookies keep the site working and are always on.
            Everything else stays off unless you switch it on, and you can change your mind at any time from the{' '}
            <strong className="font-semibold text-neutral-800">Cookie Settings</strong> link in the footer. Read our{' '}
            <Link href="/cookie-policy" className="font-semibold text-[#B91C1C] underline underline-offset-2" onClick={onClose}>
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="font-semibold text-[#B91C1C] underline underline-offset-2" onClick={onClose}>
              Privacy Policy
            </Link>
            .
          </p>

          {ACTIVE_CATEGORIES.map((cat) => {
            const cookies = COOKIE_INVENTORY.filter((c) => c.category === cat.id)
            if (cat.id === 'necessary') {
              return <CookieCategoryToggle key={cat.id} category={cat} cookies={cookies} checked alwaysActive />
            }
            const id = cat.id
            return (
              <CookieCategoryToggle
                key={id}
                category={cat}
                cookies={cookies}
                checked={choices[id]}
                onChange={(v) => setCategory(id, v)}
              />
            )
          })}

          {hasStoredDecision && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-neutral-500 underline underline-offset-2 hover:text-neutral-900"
            >
              Reset cookie preferences
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 border-t border-neutral-200 bg-neutral-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button type="button" onClick={onRejectOptional} className="cc-btn cc-btn--solid">
            Reject optional cookies
          </button>
          <button type="button" onClick={() => onSave(choices)} className="cc-btn cc-btn--outline">
            Save my preferences
          </button>
          <button type="button" onClick={onAcceptAll} className="cc-btn cc-btn--solid">
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
