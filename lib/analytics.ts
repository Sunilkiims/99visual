// lib/analytics.ts
// ─────────────────────────────────────────────────────────────────────────────
// Thin wrapper around GA4's gtag() for conversion events. Safe to call
// anywhere on the client: when GA is not loaded (no NEXT_PUBLIC_GA_ID,
// preview deployments, blocked by an ad-blocker) it does nothing.
//
// Never pass personal data (names, emails, phone numbers, message text) —
// GA's terms forbid it. Send only what kind of action happened and where.
// ─────────────────────────────────────────────────────────────────────────────

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: GtagParams) => void
  }
}

/** GA4 measurement IDs look like "G-ABC123XYZ". */
export function isValidGaId(id: string | undefined): id is string {
  return !!id && /^G-[A-Z0-9]{4,20}$/.test(id)
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * A qualified enquiry. Uses GA4's recommended `generate_lead` event, so it can
 * be marked as a key event (conversion) in GA4 with one click.
 */
export function trackLead(method: 'contact_form' | 'contact_popup' | 'chatbot'): void {
  trackEvent('generate_lead', { method, page_path: window.location.pathname })
}
