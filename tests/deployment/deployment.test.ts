// Unit tests for the "is this the live site?" check. Run with `npm test`.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isProductionDeployment } from '../../lib/deployment'

test('Vercel production counts as production', () => {
  assert.equal(isProductionDeployment({ VERCEL_ENV: 'production' }), true)
})

test('Vercel previews and local dev do not', () => {
  assert.equal(isProductionDeployment({ VERCEL_ENV: 'preview' }), false)
  assert.equal(isProductionDeployment({}), false)
})

test('our own server: APP_ENV=production', () => {
  assert.equal(isProductionDeployment({ APP_ENV: 'production' }), true)
})

test('APP_ENV wins when both are set (e.g. a staging copy on a server)', () => {
  assert.equal(isProductionDeployment({ APP_ENV: 'staging', VERCEL_ENV: 'production' }), false)
  assert.equal(isProductionDeployment({ APP_ENV: '', VERCEL_ENV: 'production' }), true)
})
