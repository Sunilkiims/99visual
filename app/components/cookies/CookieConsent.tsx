'use client'

// app/components/cookies/CookieConsent.tsx
// ─────────────────────────────────────────────────────────────────────────────
// The one consent controller for the whole site, rendered once from
// app/layout.tsx (so it covers every public page, /admin and any future
// dashboard without being repeated per page).
//
// It owns:
//   • the banner (first visit, expired decision, or policy version change),
//   • the preferences dialog (opened by "Customize" or any Cookie Settings
//     link via openCookiePreferences()),
//   • consent-gated loading of optional scripts (Google Analytics 4),
//   • withdrawal: switching Analytics off updates Google Consent Mode, stops
//     GA sending, and deletes GA cookies and attribution storage.
//
// Nothing renders on the server or before hydration, because the decision
// lives in a browser cookie. The banner is position:fixed, so appearing after
// hydration causes no layout shift.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import {
  clearConsent,
  createConsent,
  getConsent,
  getServerConsent,
  hasConsent,
  noOptionalConsent,
  parseConsent,
  readCookieValue,
  saveConsent,
  subscribeToConsent,
} from '@/lib/cookies/consent-manager'
import { CONSENT_COOKIE_NAME, OPEN_PREFERENCES_EVENT } from '@/lib/cookies/cookie-config'
import type { CategoryChoices, ConsentRecord } from '@/lib/cookies/consent-types'
import { clearAnalyticsStorage, updateAnalyticsConsent } from '@/lib/cookies/script-manager'
import GoogleAnalytics from '@/app/components/GoogleAnalytics'
import CookieConsentBanner from './CookieConsentBanner'
import CookiePreferencesModal from './CookiePreferencesModal'

const noopSubscribe = () => () => {}

export default function CookieConsent({ gaId }: { gaId?: string }) {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  const openModal = useCallback(() => {
    setModalKey((k) => k + 1)
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  // Any "Cookie Settings" link on the site opens the dialog.
  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, openModal)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openModal)
  }, [openModal])

  // A stored decision that has expired or predates the current policy no
  // longer counts. Clean up anything it allowed until the visitor decides
  // again.
  useEffect(() => {
    const raw = readCookieValue(document.cookie, CONSENT_COOKIE_NAME)
    if (raw && !getConsent() && parseConsent(raw)?.c.analytics) {
      updateAnalyticsConsent(false, gaId)
      clearAnalyticsStorage()
    }
  }, [gaId])

  const apply = useCallback(
    (next: ConsentRecord) => {
      const hadAnalytics = hasConsent(getConsent(), 'analytics')
      saveConsent(next)
      const wantsAnalytics = hasConsent(next, 'analytics')
      if (hadAnalytics && !wantsAnalytics) {
        updateAnalyticsConsent(false, gaId)
        clearAnalyticsStorage()
      } else if (wantsAnalytics) {
        // Re-enables a GA instance still in memory from earlier in the visit.
        updateAnalyticsConsent(true, gaId)
      }
      setModalOpen(false)
    },
    [gaId],
  )

  const acceptAll = useCallback(() => apply(createConsent('accept_all')), [apply])
  const rejectOptional = useCallback(() => apply(createConsent('reject_optional')), [apply])
  const saveChoices = useCallback((c: CategoryChoices) => apply(createConsent('custom', c)), [apply])

  const reset = useCallback(() => {
    updateAnalyticsConsent(false, gaId)
    clearAnalyticsStorage()
    clearConsent()
    setModalOpen(false)
  }, [gaId])

  if (!hydrated) return null

  const analyticsAllowed = hasConsent(consent, 'analytics')

  return (
    <>
      {gaId && analyticsAllowed && <GoogleAnalytics gaId={gaId} />}

      {!consent && !modalOpen && (
        <CookieConsentBanner onCustomize={openModal} onRejectOptional={rejectOptional} onAcceptAll={acceptAll} />
      )}

      {modalOpen && (
        <CookiePreferencesModal
          key={modalKey}
          initialChoices={consent?.c ?? noOptionalConsent()}
          hasStoredDecision={!!consent}
          onSave={saveChoices}
          onAcceptAll={acceptAll}
          onRejectOptional={rejectOptional}
          onReset={reset}
          onClose={closeModal}
        />
      )}
    </>
  )
}
