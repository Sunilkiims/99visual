// lib/cookies/consent-types.ts
// ─────────────────────────────────────────────────────────────────────────────
// Shared types for the cookie consent system. Kept free of any browser or
// React imports so they can be used by server components, client components
// and the unit tests alike.
// ─────────────────────────────────────────────────────────────────────────────

/** Every category the consent schema knows about. */
export const CONSENT_CATEGORIES = [
  'necessary',
  'functional',
  'analytics',
  'marketing',
  'personalization',
] as const

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number]

/** Categories a visitor can switch on or off. */
export type OptionalCategory = Exclude<ConsentCategory, 'necessary'>

export const OPTIONAL_CATEGORIES: readonly OptionalCategory[] = CONSENT_CATEGORIES.filter(
  (c): c is OptionalCategory => c !== 'necessary',
)

/** A choice for every optional category. `true` means consent given. */
export type CategoryChoices = Record<OptionalCategory, boolean>

/** How the visitor reached their decision; kept for the consent record. */
export type ConsentMethod = 'accept_all' | 'reject_optional' | 'custom'

/**
 * The consent record stored in the first-party `99v_consent` cookie.
 *
 * Schema version 1. Short keys keep the cookie small; it is sent with every
 * request to the site. It never holds names, emails, IP addresses, session
 * tokens or anything else that identifies a person.
 */
export interface ConsentRecord {
  /** Schema version of this record (see CONSENT_SCHEMA_VERSION). */
  v: number
  /** Cookie policy version the visitor consented to (see CONSENT_POLICY_VERSION). */
  p: string
  /** When the decision was made, ISO 8601 (UTC). */
  ts: string
  /** How the decision was made. */
  m: ConsentMethod
  /** Random, non-identifying ID so a decision can be referred to later. */
  id: string
  /** Choice for each optional category. Necessary cookies are always on. */
  c: CategoryChoices
}
