// Unit tests for the consent record logic. Run with `npm test`.
// Uses Node's built-in test runner (no extra test dependency).

import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  allActiveConsent,
  buildClearConsentCookie,
  buildConsentCookie,
  createConsent,
  hasConsent,
  isConsentCurrent,
  noOptionalConsent,
  parseConsent,
  readCookieValue,
  serializeConsent,
} from '../../lib/cookies/consent-manager'
import {
  CATEGORY_INFO,
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_POLICY_VERSION,
  CONSENT_SCHEMA_VERSION,
  COOKIE_INVENTORY,
} from '../../lib/cookies/cookie-config'
import { OPTIONAL_CATEGORIES } from '../../lib/cookies/consent-types'

const NOW = new Date('2026-11-07T10:00:00.000Z')
const DAY = 24 * 60 * 60 * 1000

test('no optional category is on before consent', () => {
  const c = noOptionalConsent()
  for (const cat of OPTIONAL_CATEGORIES) assert.equal(c[cat], false)
  assert.equal(hasConsent(null, 'analytics'), false)
  assert.equal(hasConsent(null, 'marketing'), false)
})

test('strictly necessary is always allowed, even with no decision', () => {
  assert.equal(hasConsent(null, 'necessary'), true)
  const rejected = createConsent('reject_optional', {}, NOW, 'x')
  assert.equal(hasConsent(rejected, 'necessary'), true)
})

test('accept all turns on every category the site uses, and only those', () => {
  const r = createConsent('accept_all', {}, NOW, 'id-1')
  for (const cat of OPTIONAL_CATEGORIES) {
    assert.equal(r.c[cat], CATEGORY_INFO[cat].active, `${cat}`)
  }
  assert.deepEqual(r.c, allActiveConsent())
  assert.equal(r.m, 'accept_all')
})

test('reject optional turns every optional category off', () => {
  const r = createConsent('reject_optional', { analytics: true }, NOW, 'id-2')
  for (const cat of OPTIONAL_CATEGORIES) assert.equal(r.c[cat], false)
})

test('custom choices are kept per category, unused categories forced off', () => {
  const r = createConsent('custom', { analytics: true, marketing: true }, NOW, 'id-3')
  assert.equal(r.c.analytics, CATEGORY_INFO.analytics.active)
  assert.equal(r.c.marketing, CATEGORY_INFO.marketing.active && true)
  assert.equal(r.c.functional, false)
  const off = createConsent('custom', { analytics: false }, NOW, 'id-4')
  assert.equal(off.c.analytics, false)
})

test('record stores schema version, policy version, timestamp, method and id', () => {
  const r = createConsent('custom', { analytics: true }, NOW, 'abc')
  assert.equal(r.v, CONSENT_SCHEMA_VERSION)
  assert.equal(r.p, CONSENT_POLICY_VERSION)
  assert.equal(r.ts, NOW.toISOString())
  assert.equal(r.m, 'custom')
  assert.equal(r.id, 'abc')
})

test('serialize → parse round-trips', () => {
  const r = createConsent('custom', { analytics: true }, NOW, 'round')
  assert.deepEqual(parseConsent(serializeConsent(r)), r)
})

test('malformed or tampered values are treated as no decision', () => {
  assert.equal(parseConsent(null), null)
  assert.equal(parseConsent(''), null)
  assert.equal(parseConsent('not-json'), null)
  assert.equal(parseConsent(encodeURIComponent('[]')), null)
  assert.equal(parseConsent(encodeURIComponent(JSON.stringify({ v: 1 }))), null)
  const bad = { ...createConsent('accept_all', {}, NOW, 'z'), m: 'sure' }
  assert.equal(parseConsent(encodeURIComponent(JSON.stringify(bad))), null)
})

test('non-boolean category values never count as consent', () => {
  const r = createConsent('custom', {}, NOW, 'q') as unknown as Record<string, unknown>
  r.c = { analytics: 'true', marketing: 1 }
  const parsed = parseConsent(encodeURIComponent(JSON.stringify(r)))
  assert.ok(parsed)
  assert.equal(parsed.c.analytics, false)
  assert.equal(parsed.c.marketing, false)
})

test('a decision for an older policy version requires asking again', () => {
  const r = { ...createConsent('accept_all', {}, NOW, 'old'), p: '2000-01-01' }
  assert.equal(isConsentCurrent(r, NOW), false)
  assert.equal(hasConsent(r, 'analytics'), false)
})

test('a decision for an older schema version requires asking again', () => {
  const r = { ...createConsent('accept_all', {}, NOW, 'old'), v: CONSENT_SCHEMA_VERSION - 1 }
  assert.equal(isConsentCurrent(r, NOW), false)
})

test('a decision expires after the renewal period', () => {
  const r = createConsent('accept_all', {}, NOW, 'exp')
  assert.equal(isConsentCurrent(r, new Date(NOW.getTime() + (CONSENT_MAX_AGE_DAYS - 1) * DAY)), true)
  assert.equal(isConsentCurrent(r, new Date(NOW.getTime() + (CONSENT_MAX_AGE_DAYS + 1) * DAY)), false)
})

test('reads the consent cookie out of a document.cookie string', () => {
  const r = createConsent('custom', { analytics: true }, NOW, 'cookie')
  const jar = `_ga=GA1.1.1; ${CONSENT_COOKIE_NAME}=${serializeConsent(r)}; other=1`
  assert.deepEqual(parseConsent(readCookieValue(jar, CONSENT_COOKIE_NAME)), r)
  assert.equal(readCookieValue('a=1; b=2', CONSENT_COOKIE_NAME), null)
})

test('consent cookie uses Path=/, SameSite=Lax, 12-month Max-Age, Secure on HTTPS, never HttpOnly', () => {
  const r = createConsent('reject_optional', {}, NOW, 'attrs')
  const secure = buildConsentCookie(r, true)
  assert.match(secure, /; Path=\//)
  assert.match(secure, /; SameSite=Lax/)
  assert.match(secure, new RegExp(`; Max-Age=${CONSENT_MAX_AGE_DAYS * 86400}`))
  assert.match(secure, /; Secure$/)
  assert.doesNotMatch(secure, /HttpOnly/i)
  assert.doesNotMatch(buildConsentCookie(r, false), /Secure/)
  assert.match(buildClearConsentCookie(true), /Max-Age=0/)
})

test('consent record holds no personal data fields', () => {
  const r = createConsent('accept_all', {}, NOW, 'pii')
  assert.deepEqual(Object.keys(r).sort(), ['c', 'id', 'm', 'p', 'ts', 'v'])
  assert.ok(serializeConsent(r).length < 400, 'cookie stays small')
})

test('cookie inventory only lists categories the site uses', () => {
  for (const item of COOKIE_INVENTORY) {
    assert.equal(CATEGORY_INFO[item.category].active, true, item.name)
  }
})
