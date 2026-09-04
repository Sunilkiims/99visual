import type { MetadataRoute } from 'next'
import { BASE } from '@/lib/schema'

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic robots.txt via the Next.js Metadata API (replaces the previous
// static public/robots.txt). Using app/robots.ts keeps the crawl rules,
// sitemap reference, and BASE domain in one TypeScript source of truth
// alongside app/sitemap.ts, instead of a hand-maintained static file that
// can silently drift out of sync with the real domain or route structure.
//
// Rules preserved from the previous robots.txt, plus:
//   • /login is now explicitly disallowed — it's a functional auth screen
//     with no unique indexable content (same treatment as /admin).
// ─────────────────────────────────────────────────────────────────────────────
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: [
          '/_next/',
          '/api/',
          '/admin/',
          '/dashboard/',
          '/login',
          '/*?utm_source=',
          '/*?utm_medium=',
          '/*?utm_campaign=',
          '/*?ref=',
          '/*?fbclid=',
          '/*?gclid=',
        ],
      },
      // AI / assistant crawlers explicitly allowed to browse public content.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      // Low-value bulk scrapers blocked entirely.
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'omgili', disallow: '/' },
      { userAgent: 'omgilibot', disallow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
