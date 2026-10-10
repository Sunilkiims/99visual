import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { BASE } from '@/lib/schema'
import { videos } from '@/lib/videos'
import { PAGE_LAST_MODIFIED, type StaticPagePath } from '@/lib/page-dates'
import { insightUrl, isProductionUrl, parseRobots } from '@/lib/seo'

// ─────────────────────────────────────────────────────────────────────────────
// Regenerate at most hourly. Without this the sitemap was prerendered once at
// build time (it showed as "○ Static" in the build output), so an article
// published from the admin panel never appeared in sitemap.xml until the
// next deploy.
// ─────────────────────────────────────────────────────────────────────────────
export const revalidate = 3600

// Next.js's built-in sitemap writer interpolates video:* text fields into
// the XML without entity-escaping, so free text must be escaped here (an "&"
// in a video title previously broke the whole document).
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// ─────────────────────────────────────────────────────────────────────────────
// Static, indexable, canonical routes. lastModified comes from
// lib/page-dates.ts — the same values each page uses for its JSON-LD
// dateModified — so sitemap and structured data always agree.
// Redirect sources, /admin, /login, /api, query-string views and the 404 page
// are deliberately absent.
// ─────────────────────────────────────────────────────────────────────────────
const staticRoutes: {
  path: StaticPagePath
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}[] = [
  // Core pages
  { path: '/',                                 priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services',                         priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about',                            priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact',                          priority: 0.7, changeFrequency: 'monthly' },
  { path: '/partner',                          priority: 0.6, changeFrequency: 'monthly' },
  { path: '/careers',                          priority: 0.6, changeFrequency: 'monthly' },
  { path: '/videos',                           priority: 0.6, changeFrequency: 'monthly' },
  { path: '/press',                            priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help-center',                      priority: 0.4, changeFrequency: 'monthly' },
  // Service pages
  { path: '/services/website-development',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/digital-marketing-seo',   priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/automation-testing',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/it-consulting',           priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/visualization',           priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/cad-gis-photogrammetry',  priority: 0.8, changeFrequency: 'monthly' },
  // Legal pages
  { path: '/privacy-policy',                   priority: 0.2, changeFrequency: 'yearly'  },
  { path: '/terms',                            priority: 0.2, changeFrequency: 'yearly'  },
]

type PostRow = {
  slug: string
  updatedAt: Date
  seo: { robots: string | null; canonicalUrl: string | null } | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      // Written exactly as each page's rendered canonical tag (Next.js
      // renders the homepage canonical as the bare origin).
      url: path === '/' ? BASE : `${BASE}${path}`,
      lastModified: PAGE_LAST_MODIFIED[path],
      changeFrequency,
      priority,
    })
  )

  // ── Insights ────────────────────────────────────────────────────────────
  // Only published articles that are indexable and canonical to themselves.
  // A post the editor marked noindex, or whose stored canonical points at a
  // different production URL, is not a canonical page and must not be
  // listed. (Stored canonicals on other hosts are ignored by the article
  // page itself, so those posts still count as self-canonical.)
  let insightEntries: MetadataRoute.Sitemap = []
  let insightsIndexLastModified: Date | undefined
  try {
    const posts: PostRow[] = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        slug: true,
        updatedAt: true,
        seo: { select: { robots: true, canonicalUrl: true } },
      },
      orderBy: { publishedAt: 'desc' },
    })
    const eligible = posts.filter((post) => {
      if (!parseRobots(post.seo?.robots).index) return false
      const stored = post.seo?.canonicalUrl
      return !isProductionUrl(stored) || stored === insightUrl(post.slug)
    })
    insightEntries = eligible.map((post) => ({
      url: insightUrl(post.slug),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
    insightsIndexLastModified = eligible.reduce<Date | undefined>(
      (latest, p) => (!latest || p.updatedAt > latest ? p.updatedAt : latest),
      undefined
    )
  } catch (e) {
    console.error('Sitemap: failed to fetch insight posts', e)
  }

  const insightsIndex: MetadataRoute.Sitemap[number] = {
    url: `${BASE}/insights`,
    // The listing changes when its newest article changes.
    ...(insightsIndexLastModified && { lastModified: insightsIndexLastModified }),
    changeFrequency: 'weekly',
    priority: 0.8,
  }

  // ── Video watch pages ───────────────────────────────────────────────────
  // Sourced from lib/videos.ts — the same registry that renders the pages
  // and their VideoObject JSON-LD.
  const videoEntries: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${BASE}/videos/${video.slug}`,
    lastModified: video.uploadDate,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
    videos: [
      {
        title: escapeXml(video.title),
        thumbnail_loc: escapeXml(`${BASE}${video.thumbnail}`),
        description: escapeXml(video.description),
        content_loc: escapeXml(`${BASE}${video.videoSrc}`),
        duration: video.durationSeconds,
        publication_date: video.uploadDate,
        family_friendly: 'yes' as const,
      },
    ],
  }))

  return [...staticEntries, insightsIndex, ...insightEntries, ...videoEntries]
}
