import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  matcher: ['/admin/:path*', '/login'],
}