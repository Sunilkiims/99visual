// Unit tests for consent-aware script control. Run with `npm test`.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import {
  analyticsCookieNames,
  buildGaBootstrap,
  cookieDomainsFor,
} from '../../lib/cookies/script-manager'

test('GA bootstrap declares Consent Mode v2 before configuring GA', () => {
  const js = buildGaBootstrap('G-ABC123XYZ')
  const consentAt = js.indexOf("gtag('consent', 'default'")
  const configAt = js.indexOf("gtag('config', 'G-ABC123XYZ')")
  assert.ok(consentAt > -1 && configAt > consentAt, 'consent default comes first')
  assert.match(js, /analytics_storage: 'granted'/)
  assert.match(js, /ad_storage: 'denied'/)
  assert.match(js, /ad_user_data: 'denied'/)
  assert.match(js, /ad_personalization: 'denied'/)
})

test('GA bootstrap runs and pushes consent before config into dataLayer', () => {
  const sandbox: Record<string, unknown> = {}
  sandbox.window = sandbox
  vm.createContext(sandbox)
  vm.runInContext(buildGaBootstrap('G-ABC123XYZ'), sandbox)
  const layer = (sandbox.dataLayer as IArguments[]).map((args) => Array.from(args))
  assert.equal(layer[0][0], 'consent')
  assert.equal(layer[0][1], 'default')
  assert.equal(layer[2][0], 'config')
  assert.equal(sandbox['ga-disable-G-ABC123XYZ'], false)
})

test('GA bootstrap refuses an invalid measurement ID (no script injection)', () => {
  assert.throws(() => buildGaBootstrap("G-1'); alert(1); ('"))
  assert.throws(() => buildGaBootstrap(''))
})

test('finds Google Analytics cookies and nothing else', () => {
  const jar = '_ga=GA1.1.5; _ga_ABC123=GS1.1; 99v_consent=x; admin_token=y; _gid=1; _gaz=keep'
  assert.deepEqual(analyticsCookieNames(jar).sort(), ['_ga', '_ga_ABC123', '_gid'])
})

test('cookie deletion targets the host and its parent domains', () => {
  assert.deepEqual(cookieDomainsFor('www.99visual.com'), ['www.99visual.com', '99visual.com'])
  assert.deepEqual(cookieDomainsFor('localhost'), ['localhost'])
  assert.deepEqual(cookieDomainsFor('127.0.0.1'), ['127.0.0.1'])
})
