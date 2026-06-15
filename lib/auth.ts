import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = 'admin_token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET)
}

export interface AdminPayload {
  id: string
  email: string
  role: string
}

// Sign a JWT token
export async function signToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

// Get current session from cookies
export async function getSession(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null
    return await verifyToken(token)
  } catch {
    return null
  }
}

// Set session cookie
export async function setSessionCookie(
  response: NextResponse,
  payload: AdminPayload
): Promise<NextResponse> {
  const token = await signToken(payload)
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return response
}

// Clear session cookie
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}

// Get token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value ?? null
}

// Verify request is authenticated
export async function verifyRequest(
  request: NextRequest
): Promise<AdminPayload | null> {
  const token = getTokenFromRequest(request)
  if (!token) return null
  return await verifyToken(token)
}

// Check if user is admin
export function isAdmin(payload: AdminPayload | null): boolean {
  return payload?.role === 'ADMIN'
}