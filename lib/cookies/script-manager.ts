// lib/cookies/script-manager.ts
// ─────────────────────────────────────────────────────────────────────────────
// Consent-aware control of the site's optional tracking.
//
// The only optional tracker on the site today is Google Analytics 4 (gtag.js),
// plus the first-party lead-attribution values in localStorage
// (lib/leadTracking.ts). Neither runs until the visitor allows Analytics.
//
// Google Consent Mode v2: gtag.js is never downloaded before consent (no
// "advanced mode" cookieless pings). When it does load, the consent state is
// declared BEFORE `config`, with every advertising signal denied because the
// site runs no advertising tags:
//     analytics_storage   granted (the visitor allowed Analytics)
//     ad_storage          denied
//     ad_user_data        denied
//     ad_personalization  denied
// If consent is later withdrawn, analytics_storage is updated to denied, GA's
// own kill switch (`window['ga-disable-<ID>']`) is set, and GA's cookies are
// deleted, so nothing more is sent even though the script stays in memory
// until the next full page load.
// ─────────────────────────────────────────────────────────────────────────────

import { isValidGaId } from '@/lib/analytics'

/** localStorage keys written by lib/leadTracking.ts (analytics category). */
export const ATTRIBUTION_STORAGE_KEYS = ['99v_landing_page', '99v_landing_referrer'] as const

/**
 * The inline bootstrap that runs right before gtag.js. Declares Consent Mode
 * v2 defaults, then configures GA4. Throws on an invalid ID so a bad value
 * can never be interpolated into a script.
 */
export function buildGaBootstrap(gaId: string): string {
  if (!isValidGaId(gaId)) throw new Error('Invalid GA4 measurement ID')
  return [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    'window.gtag = gtag;',
    `window['ga-disable-${gaId}'] = false;`,
    "gtag('consent', 'default', {",
    "  analytics_storage: 'granted',",
    "  ad_storage: 'denied',",
    "  ad_user_data: 'denied',",
    "  ad_personalization: 'denied'",
    '});',
    "gtag('js', new Date());",
    `gtag('config', '${gaId}');`,
  ].join('\n')
}

type LooseGtag = (...args: unknown[]) => void

/**
 * Tells an already-loaded gtag.js about a change of mind. Safe to call when
 * GA never loaded (it does nothing then).
 */
export function updateAnalyticsConsent(granted: boolean, gaId: string | undefined): void {
  if (typeof window === 'undefined') return
  if (gaId && isValidGaId(gaId)) {
    ;(window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = !granted
  }
  const gtag = (window as unknown as { gtag?: LooseGtag }).gtag
  if (typeof gtag === 'function') {
    try {
      gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
    } catch {
      // Analytics must never break the page.
    }
  }
}

/** The host and each parent domain, e.g. www.99visual.com → [www.99visual.com, 99visual.com]. */
export function cookieDomainsFor(hostname: string): string[] {
  const parts = hostname.split('.')
  if (parts.length < 2 || /^\d+(\.\d+){3}$/.test(hostname)) return [hostname]
  const out: string[] = []
  for (let i = 0; i <= parts.length - 2; i++) out.push(parts.slice(i).join('.'))
  return out
}

/** Names of cookies in a document.cookie string that belong to Google Analytics. */
export function analyticsCookieNames(cookieString: string): string[] {
  return cookieString
    .split(';')
    .map((p) => p.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat')
}

/**
 * Removes everything stored under the Analytics category: GA cookies on the
 * host and parent domains, and the lead-attribution localStorage keys.
 */
export function clearAnalyticsStorage(): void {
  if (typeof document === 'undefined') return
  const domains = cookieDomainsFor(location.hostname)
  for (const name of analyticsCookieNames(document.cookie)) {
    document.cookie = `${name}=; Path=/; Max-Age=0`
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0; Domain=.${domain}`
    }
  }
  try {
    for (const key of ATTRIBUTION_STORAGE_KEYS) window.localStorage.removeItem(key)
  } catch {
    // Storage may be blocked (private mode); nothing to remove then.
  }
}
