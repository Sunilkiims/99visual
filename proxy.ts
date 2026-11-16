import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Paths that only existed on the old WordPress site. They answer 410 Gone
// (not 404) so search engines drop them quickly, and bots probing for
// WordPress logins stop getting the full 404 page.
const WORDPRESS_PATHS = /^\/(wp-admin|wp-content|wp-includes|wp-json|wp-login\.php|xmlrpc\.php)(\/|$)/

// `?s=` is WordPress's site-search parameter. This app has no site search and
// never reads `s`, but Next.js ignores unknown query parameters, so
// /?s=<anything> (on any path) used to render the full page as a 200 — an
// indexable duplicate. Google discovered the literal
// /?s={search_term_string} from a SearchAction urlTemplate that shipped in
// JSON-LD between May and Sep 2026 (since removed from lib/schema.ts) and
// kept recrawling it as a homepage duplicate in Search Console. 410 tells
// crawlers the search endpoint is gone without touching the homepage's own
// canonical/robots signals. robots.txt must NOT disallow ?s= — Google has to
// be able to fetch these URLs to see the 410.
const WORDPRESS_SEARCH_PARAM = 's'

function gone() {
  return new NextResponse('Gone', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  })
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (WORDPRESS_PATHS.test(pathname) || searchParams.has(WORDPRESS_SEARCH_PARAM)) {
    return gone()
  }

  if (pathname === '/login') {
    const token = getTokenFromRequest(request)
    const payload = token ? await verifyToken(token) : null
    if (payload) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const token = getTokenFromRequest(request)
    const payload = token ? await verifyToken(token) : null
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/wp-admin/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
    '/wp-json/:path*',
    '/wp-login.php',
    '/xmlrpc.php',
    // Any path carrying the WordPress search parameter (see above). The
    // `has` condition keeps the proxy off every other request, so normal
    // pages and query strings (utm_*, ?page=, ?tag=, ?search=) are untouched.
    // Must be a literal: Next.js reads `config` statically at build time.
    { source: '/:path*', has: [{ type: 'query', key: 's' }] },
  ],
}