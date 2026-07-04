import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE = 'https://www.99visual.com'

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX — each static route now carries its own explicit lastModified date,
// matching the hardcoded DATE_MODIFIED used in that page's own JSON-LD
// (e.g. app/services/visualization/page.tsx, app/services/page.tsx).
//
// The previous version stamped every static route with `new Date()` at
// build time, meaning every deploy told Google "this page changed today"
// even when nothing on the page actually changed. That's a false freshness
// signal, and it also silently contradicted the real dateModified values
// declared in each page's structured data. Google can notice this mismatch
// between sitemap lastmod and on-page schema, which undercuts trust in both.
//
// Update the lastModified string below ONLY when that page's real content
// changes — keep it in sync with the page's own DATE_MODIFIED constant.
// ─────────────────────────────────────────────────────────────────────────────
const staticRoutes: {
  url: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  lastModified: string
}[] = [
  // Core pages
  { url: `${BASE}`,                                 priority: 1.0, changeFrequency: 'weekly',  lastModified: '2025-06-01' },
  { url: `${BASE}/about`,                           priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services`,                        priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/partner`,                         priority: 0.6, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/careers`,                         priority: 0.6, changeFrequency: 'weekly',  lastModified: '2025-06-01' },
  { url: `${BASE}/contact`,                         priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/insights`,                        priority: 0.8, changeFrequency: 'daily',   lastModified: '2025-06-01' },
  // Service pages
  { url: `${BASE}/services/website-development`,           priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services/digital-marketing-seo`,         priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services/automation-testing`,            priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services/it-consulting`,                 priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services/visualization`,                 priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  { url: `${BASE}/services/cad-gis-photogrammetry`,        priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-06-01' },
  // Legal pages
  { url: `${BASE}/privacy-policy`,                  priority: 0.3, changeFrequency: 'yearly',  lastModified: '2025-06-01' },
  { url: `${BASE}/terms`,                           priority: 0.3, changeFrequency: 'yearly',  lastModified: '2025-06-01' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — lastModified now comes from the explicit date above,
  // not from `new Date()` at build time.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ url, priority, changeFrequency, lastModified }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
    })
  )

  // Dynamic insight posts — auto-added when published.
  // These correctly use each post's real updatedAt from the database,
  // so no change needed here — this was already accurate, not synthetic.
  let insightEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    })
    insightEntries = posts.map((post) => ({
      url: `${BASE}/insights/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch insight posts', e)
  }

  return [...staticEntries, ...insightEntries]
}
