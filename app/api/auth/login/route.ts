import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSessionCookie, AdminPayload } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { clearHits, clientIp, isRateLimited, recordHit } from '@/lib/rate-limit'
import { readJson } from '@/lib/validation'

// Failed sign-ins allowed per IP in one window before further attempts are
// refused. Successful sign-ins clear the counter. See lib/rate-limit.ts for
// the limits of an in-memory limiter on serverless.
const MAX_FAILED_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000

// Compared against when the email is unknown, so a missing account takes as
// long as a wrong password and the response time doesn't reveal which
// emails exist. (bcrypt hash of a random string; matches nothing.)
const DUMMY_HASH = '$2b$10$OUZrTn7eE2O.zBdlaJw8tOn.9t7qnv4rKeY0lbXZ440BzMZH.rKCq'

export async function POST(request: NextRequest) {
  const limitKey = `login:${clientIp(request)}`
  if (isRateLimited(limitKey, MAX_FAILED_ATTEMPTS)) {
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Please try again in 15 minutes.' },
      { status: 429 }
    )
  }

  try {
    const body = await readJson(request)
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!email || !password || email.length > 254 || password.length > 1024) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    const isValid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)

    if (!user || !isValid) {
      const retryAfter = recordHit(limitKey, WINDOW_MS)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    clearHits(limitKey)

    const payload: AdminPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const response = NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    )

    return await setSessionCookie(response, payload)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
