// lib/cookies/consent-manager.ts
// ─────────────────────────────────────────────────────────────────────────────
// Reads, validates, stores and broadcasts the visitor's cookie decision.
//
// Storage choice: one first-party cookie (`99v_consent`), not localStorage.
//   • It is the standard place for a consent record and is visible to the
//     server, so server code can respect the decision in future if needed.
//   • It is deliberately NOT HttpOnly: the browser code that decides whether
//     to load Google Analytics must be able to read it. It holds no secrets
//     or personal data, only category choices, a timestamp, the policy
//     version and a random ID.
//   • SameSite=Lax, Path=/, Secure on HTTPS, Max-Age = 12 months.
//
// The pure functions at the top have no browser dependency and are covered
// by tests/cookies/consent-manager.test.ts. The browser helpers below them
// are the only code that touches document.cookie.
// ─────────────────────────────────────────────────────────────────────────────

import {
  OPTIONAL_CATEGORIES,
  type CategoryChoices,
  type ConsentCategory,
  type ConsentMethod,
  type ConsentRecord,
} from './consent-types'
import {
  CATEGORY_INFO,
  CONSENT_CHANGED_EVENT,
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_POLICY_VERSION,
  CONSENT_SCHEMA_VERSION,
  OPEN_PREFERENCES_EVENT,
} from './cookie-config'

const DAY_MS = 24 * 60 * 60 * 1000

// ── Pure helpers ─────────────────────────────────────────────────────────────

/** Every optional category off: the state before any consent is given. */
export function noOptionalConsent(): CategoryChoices {
  return Object.fromEntries(OPTIONAL_CATEGORIES.map((c) => [c, false])) as CategoryChoices
}

/** Every optional category the site actually uses switched on. */
export function allActiveConsent(): CategoryChoices {
  return Object.fromEntries(
    OPTIONAL_CATEGORIES.map((c) => [c, CATEGORY_INFO[c].active]),
  ) as CategoryChoices
}

function randomId(): string {
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') return c.randomUUID()
  // Fallback for very old browsers; uniqueness is all that matters here.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/**
 * Builds a new consent record. Choices for categories the site does not use
 * are always stored as `false`, whatever was passed in.
 */
export function createConsent(
  method: ConsentMethod,
  choices: Partial<CategoryChoices> = {},
  now: Date = new Date(),
  id: string = randomId(),
): ConsentRecord {
  const base =
    method === 'accept_all'
      ? allActiveConsent()
      : method === 'reject_optional'
        ? noOptionalConsent()
        : { ...noOptionalConsent(), ...choices }

  const c = Object.fromEntries(
    OPTIONAL_CATEGORIES.map((cat) => [cat, CATEGORY_INFO[cat].active && base[cat] === true]),
  ) as CategoryChoices

  return {
    v: CONSENT_SCHEMA_VERSION,
    p: CONSENT_POLICY_VERSION,
    ts: now.toISOString(),
    m: method,
    id,
    c,
  }
}

export function serializeConsent(record: ConsentRecord): string {
  return encodeURIComponent(JSON.stringify(record))
}

/**
 * Parses a stored value. Returns null for anything missing, malformed or
 * tampered with, so a broken cookie is treated as "no decision yet" (which
 * keeps every optional category off).
 */
export function parseConsent(raw: string | null | undefined): ConsentRecord | null {
  if (!raw) return null
  let data: unknown
  try {
    data = JSON.parse(decodeURIComponent(raw))
  } catch {
    return null
  }
  if (!data || typeof data !== 'object') return null
  const r = data as Record<string, unknown>

  if (typeof r.v !== 'number' || typeof r.p !== 'string' || typeof r.ts !== 'string') return null
  if (typeof r.id !== 'string' || r.id.length > 64) return null
  if (r.m !== 'accept_all' && r.m !== 'reject_optional' && r.m !== 'custom') return null
  if (Number.isNaN(Date.parse(r.ts))) return null
  if (!r.c || typeof r.c !== 'object') return null

  const stored = r.c as Record<string, unknown>
  const c = Object.fromEntries(
    OPTIONAL_CATEGORIES.map((cat) => [cat, stored[cat] === true]),
  ) as CategoryChoices

  return { v: r.v, p: r.p, ts: r.ts, m: r.m, id: r.id, c }
}

/**
 * Whether a stored decision still applies: same schema and policy version,
 * and younger than CONSENT_MAX_AGE_DAYS. Anything else means "ask again".
 */
export function isConsentCurrent(record: ConsentRecord | null, now: Date = new Date()): record is ConsentRecord {
  if (!record) return false
  if (record.v !== CONSENT_SCHEMA_VERSION) return false
  if (record.p !== CONSENT_POLICY_VERSION) return false
  const age = now.getTime() - Date.parse(record.ts)
  if (age < 0 - DAY_MS) return false // clock far in the future: don't trust it
  return age <= CONSENT_MAX_AGE_DAYS * DAY_MS
}

/** Necessary cookies are always allowed; everything else needs a current decision. */
export function hasConsent(record: ConsentRecord | null, category: ConsentCategory): boolean {
  if (category === 'necessary') return true
  if (!isConsentCurrent(record)) return false
  return record.c[category] === true
}

/** Finds one cookie's raw value in a `document.cookie`-style string. */
export function readCookieValue(cookieString: string, name: string): string | null {
  for (const part of cookieString.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim()
  }
  return null
}

/** The full Set-Cookie style string used to store a decision. */
export function buildConsentCookie(record: ConsentRecord, secure: boolean): string {
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  return [
    `${CONSENT_COOKIE_NAME}=${serializeConsent(record)}`,
    'Path=/',
    `Max-Age=${maxAge}`,
    'SameSite=Lax',
    ...(secure ? ['Secure'] : []),
  ].join('; ')
}

export function buildClearConsentCookie(secure: boolean): string {
  return [
    `${CONSENT_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'SameSite=Lax',
    ...(secure ? ['Secure'] : []),
  ].join('; ')
}

// ── Browser store ────────────────────────────────────────────────────────────
// A tiny external store so React components can subscribe with
// useSyncExternalStore and every part of the page sees the same decision.

let cachedRaw: string | null | undefined
let cachedRecord: ConsentRecord | null = null

/** The current, still-valid decision, or null when the visitor must be asked. */
export function getConsent(): ConsentRecord | null {
  if (typeof document === 'undefined') return null
  const raw = readCookieValue(document.cookie, CONSENT_COOKIE_NAME)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    const parsed = parseConsent(raw)
    cachedRecord = isConsentCurrent(parsed) ? parsed : null
  }
  return cachedRecord
}

/** Server snapshot: no decision is known while rendering on the server. */
export function getServerConsent(): ConsentRecord | null {
  return null
}

function isSecureContextForCookie(): boolean {
  return typeof location !== 'undefined' && location.protocol === 'https:'
}

function broadcast(): void {
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT))
}

export function saveConsent(record: ConsentRecord): void {
  if (typeof document === 'undefined') return
  document.cookie = buildConsentCookie(record, isSecureContextForCookie())
  broadcast()
}

/** Forgets the decision entirely, so the banner shows again. */
export function clearConsent(): void {
  if (typeof document === 'undefined') return
  document.cookie = buildClearConsentCookie(isSecureContextForCookie())
  broadcast()
}

export function subscribeToConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback)
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, callback)
}

/** Opens the cookie preferences dialog from anywhere on the site. */
export function openCookiePreferences(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT))
}
