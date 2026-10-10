import type { MetadataRoute } from 'next'
import { BASE } from '@/lib/schema'

// ─────────────────────────────────────────────────────────────────────────────
// robots.txt
//
// • Private areas (/api, /admin, /login) are disallowed for every crawler
//   group. A crawler that matches a named group ignores the "*" group
//   entirely, so the private paths are repeated in each allowed group — the
//   previous file only listed them under "*", which left them open to every
//   named AI crawler.
// • Query-parameter rules (utm_*, gclid, fbclid, ref, …) were removed. Blocking
//   those URLs stops Google from fetching them, so it can never see their
//   canonical tag; links carrying tracking parameters then can't consolidate
//   onto the clean URL and may surface as "Indexed, though blocked by
//   robots.txt". Every page already declares a canonical without parameters,
//   which is the correct way to handle them.
// • "/_next/" is no longer disallowed: the JS, CSS and images Google needs to
//   render pages live under it.
// • robots.txt controls crawling, not indexing — pages that must stay out of
//   the index use a noindex robots meta tag / X-Robots-Tag instead.
// ─────────────────────────────────────────────────────────────────────────────
const PRIVATE_PATHS = ['/api/', '/admin', '/login']

const ALLOWED_AI_AGENTS = [
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'GoogleOther',
  'Google-Extended',
  'PerplexityBot',
]

// Intentional business decision preserved from the previous file: SEO-tool
// and bulk-scraping crawlers are refused site-wide.
const BLOCKED_AGENTS = [
  'AhrefsBot',
  'SemrushBot',
  'DotBot',                     // Moz
  'MJ12bot',                    // Majestic
  'BLEXBot',                    // SEO PowerSuite / WebMeUp
  'Screaming Frog SEO Spider',
  'SEOkicks',
  'rogerbot',                   // Moz Pro
  'CCBot',
  'omgili',
  'omgilibot',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: ALLOWED_AI_AGENTS, allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: BLOCKED_AGENTS, disallow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
