import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getRelatedService } from '../../app/components/insights/categoryIcon'

const href = (...l: string[]) => getRelatedService(...l)?.href ?? null

test('specific services win over broad web/3D terms', () => {
  assert.equal(href('Testing a Next.js app with Playwright'), '/services/automation-testing')
  assert.equal(href('QA checklist for website launches'), '/services/automation-testing')
  assert.equal(href('Turning a LiDAR point cloud into a 3D model'), '/services/cad-gis-photogrammetry')
  assert.equal(href('SEO for React websites'), '/services/digital-marketing-seo')
})

test('marketing automation is not QA', () => {
  assert.equal(href('Marketing automation tools for small businesses'), '/services/digital-marketing-seo')
})

test('existing mappings still hold', () => {
  assert.equal(href('Next.js SEO best practices'), '/services/digital-marketing-seo')
  assert.equal(href('Photorealistic 3D rendering for real estate'), '/services/visualization')
  assert.equal(href('Building fast websites with Next.js'), '/services/website-development')
  assert.equal(href('Cloud migration checklist'), '/services/it-consulting')
  assert.equal(href('Web Development', 'web-development'), '/services/website-development')
  assert.equal(href('GIS mapping for utilities'), '/services/cad-gis-photogrammetry')
})

test('unclear titles return null instead of forcing a link', () => {
  assert.equal(href('Our year in review'), null)
})
