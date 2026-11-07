// lib/cookies/cookie-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the cookie consent system: versions, the consent
// cookie itself, the cookie categories shown to visitors, and the inventory
// of every cookie / storage item the site actually sets.
//
// The cookie banner, the preferences modal and the /cookie-policy page all
// read from this file, so the policy can never drift from what the UI offers.
//
// ── When you add a new tracker (Meta Pixel, LinkedIn Insight Tag, …) ─────────
//   1. Set `active: true` on its category below (e.g. `marketing`).
//   2. Add each cookie it sets to COOKIE_INVENTORY (from the vendor's docs).
//   3. Gate its loader on `hasConsent(consent, '<category>')`, the same way
//      app/components/cookies/ConsentScripts.tsx gates Google Analytics.
//   4. Bump CONSENT_POLICY_VERSION so every visitor is asked again.
// ─────────────────────────────────────────────────────────────────────────────

import type { ConsentCategory } from './consent-types'

/**
 * Version of the stored record's *shape*. Bump only when ConsentRecord's
 * fields change, and teach `parseConsent` to read or migrate older shapes.
 */
export const CONSENT_SCHEMA_VERSION = 1

/**
 * Version of the cookie policy and category set the visitor agreed to.
 * Bump this on a MATERIAL change (a new tracker, a new purpose, a new
 * category switched on). Every stored decision with a different version is
 * treated as missing, so all visitors see the banner again.
 */
export const CONSENT_POLICY_VERSION = '2026-11-07'

/** Date shown as "Last updated" on /cookie-policy. */
export const COOKIE_POLICY_LAST_UPDATED = '7 November 2026'

/** Name of the first-party cookie that stores the visitor's decision. */
export const CONSENT_COOKIE_NAME = '99v_consent'

/**
 * How long a decision is kept before the visitor is asked again: 12 months.
 * Several EU regulators treat 6–13 months as the reasonable range.
 */
export const CONSENT_MAX_AGE_DAYS = 365

/** Browser event the "Cookie Settings" links fire to open the preferences. */
export const OPEN_PREFERENCES_EVENT = '99v:open-cookie-settings'

/** Browser event fired whenever the stored decision changes. */
export const CONSENT_CHANGED_EVENT = '99v:consent-changed'

export interface CategoryInfo {
  id: ConsentCategory
  title: string
  description: string
  /**
   * Whether the site currently uses anything in this category. Inactive
   * categories stay in the schema (so adding a tracker later needs no data
   * migration) but are hidden from visitors, because asking for consent to
   * something the site does not do would be misleading.
   */
  active: boolean
}

export const CATEGORY_INFO: Record<ConsentCategory, CategoryInfo> = {
  necessary: {
    id: 'necessary',
    title: 'Strictly necessary',
    description:
      'Needed for the website to work and to keep it secure: remembering your cookie choices and keeping administrators signed in. These cannot be switched off.',
    active: true,
  },
  functional: {
    id: 'functional',
    title: 'Functional',
    description:
      'Remember preferences such as language or layout so the site works the way you set it up.',
    active: false,
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics',
    description:
      'Help us understand how visitors use the site, using Google Analytics 4: pages viewed, how people arrive, and which enquiries come from where. Reports are aggregated; we do not send names, emails or phone numbers to Google.',
    active: true,
  },
  marketing: {
    id: 'marketing',
    title: 'Marketing',
    description:
      'Measure advertising campaigns and show relevant ads on other websites.',
    active: false,
  },
  personalization: {
    id: 'personalization',
    title: 'Personalization',
    description: 'Tailor content and recommendations on this site to your interests.',
    active: false,
  },
}

/** Categories currently shown to visitors, in display order. */
export const ACTIVE_CATEGORIES: CategoryInfo[] = Object.values(CATEGORY_INFO).filter((c) => c.active)

export type StorageKind = 'Cookie' | 'Local storage'

export interface CookieInventoryItem {
  name: string
  provider: string
  purpose: string
  category: ConsentCategory
  expiration: string
  kind: StorageKind
}

/**
 * Every cookie and storage item the site sets, found by auditing the code.
 * Third-party lifetimes come from the vendor's own documentation.
 */
export const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    name: CONSENT_COOKIE_NAME,
    provider: '99 Visual Solutions (first party)',
    purpose:
      'Stores your cookie choices, when you made them and which policy version they apply to, so we do not ask again on every page.',
    category: 'necessary',
    expiration: '12 months',
    kind: 'Cookie',
  },
  {
    name: 'admin_token',
    provider: '99 Visual Solutions (first party)',
    purpose:
      'Keeps a site administrator signed in to the admin area. Set only after an administrator signs in; never set for ordinary visitors. HttpOnly and Secure.',
    category: 'necessary',
    expiration: '7 days',
    kind: 'Cookie',
  },
  {
    name: '_ga',
    provider: 'Google Analytics (Google LLC)',
    purpose: 'Distinguishes one visitor from another so visits can be counted.',
    category: 'analytics',
    expiration: '2 years',
    kind: 'Cookie',
  },
  {
    name: '_ga_<container-id>',
    provider: 'Google Analytics (Google LLC)',
    purpose: 'Keeps track of the current visit (session) for Google Analytics 4.',
    category: 'analytics',
    expiration: '2 years',
    kind: 'Cookie',
  },
  {
    name: '99v_landing_page',
    provider: '99 Visual Solutions (first party)',
    purpose:
      'Remembers the first page you landed on, so an enquiry you send later can be attributed to the right page.',
    category: 'analytics',
    expiration: 'Until you clear site data or withdraw analytics consent',
    kind: 'Local storage',
  },
  {
    name: '99v_landing_referrer',
    provider: '99 Visual Solutions (first party)',
    purpose:
      'Remembers the website that referred you on your first visit (for example a search engine), for the same enquiry attribution.',
    category: 'analytics',
    expiration: 'Until you clear site data or withdraw analytics consent',
    kind: 'Local storage',
  },
]
