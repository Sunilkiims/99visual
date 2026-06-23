import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE = 'https://www.99visual.com'

const staticRoutes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  // Core pages
  { url: `${BASE}`,                                        priority: 1.0, changeFrequency: 'weekly'  },
  { url: `${BASE}/about`,                                  priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/services`,                               priority: 0.9, changeFrequency: 'monthly' },
  { url: `${BASE}/partner`,                                priority: 0.6, changeFrequency: 'monthly' },
  { url: `${BASE}/careers`,                                priority: 0.6, changeFrequency: 'weekly'  },
  { url: `${BASE}/contact`,                                priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/insights`,                               priority: 0.8, changeFrequency: 'daily'   },

  // Service pages
  { url: `${BASE}/services/website-development`,           priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/services/digital-marketing-seo`,         priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/services/automation-testing`,            priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/services/it-consulting`,                 priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/services/visualization`,                 priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/services/cad-gis-photogrammetry`,        priority: 0.8, changeFrequency: 'monthly' },

  // Legal pages
  { url: `${BASE}/privacy-policy`,                         priority: 0.3, changeFrequency: 'yearly'  },
  { url: `${BASE}/terms`,                                  priority: 0.3, changeFrequency: 'yearly'  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  // Dynamic insight posts — auto-added when published
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