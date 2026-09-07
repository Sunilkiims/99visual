import type { MetadataRoute } from 'next'
import { BASE } from '@/lib/schema'
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
          '/*?sessionid=',
          '/*?sort=',
          '/*?filter=',
        ],
      },
     
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },      
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' }, // Moz
      { userAgent: 'MJ12bot', disallow: '/' }, // Majestic
      { userAgent: 'BLEXBot', disallow: '/' }, // SEO PowerSuite / WebMeUp
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'SEOkicks', disallow: '/' },
      { userAgent: 'rogerbot', disallow: '/' }, // Moz Pro
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'omgili', disallow: '/' },
      { userAgent: 'omgilibot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}