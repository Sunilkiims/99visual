import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Paths that only existed on the old WordPress site. They answer 410 Gone
// (not 404) so search engines drop them quickly, and bots probing for
// WordPress logins stop getting the full 404 page.
const WORDPRESS_PATHS = /^\/(wp-admin|wp-content|wp-includes|wp-json|wp-login\.php|xmlrpc\.php)(\/|$)/

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (WORDPRESS_PATHS.test(pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    })
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
  ],
}