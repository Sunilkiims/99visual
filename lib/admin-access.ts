// lib/admin-access.ts
// ─────────────────────────────────────────────────────────────────────────────
// Role checks for admin route handlers.
//
// Rule (agreed Nov 2026): only ADMIN users may publish, unpublish, change
// already-published content, or delete anything. EDITOR users can write and
// save drafts, upload media and manage categories/tags/authors.
//
// The role is read fresh from the database on each check, not from the
// session cookie: the cookie lasts 7 days, so a demoted user would otherwise
// keep their old rights until it expired.
//
// Kept separate from lib/auth.ts because proxy.ts imports that file, and the
// proxy must not pull in the database client.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server'
import { getSession, type AdminPayload } from './auth'
import { prisma } from './prisma'

export type AdminRole = 'ADMIN' | 'EDITOR'

export type AccessResult =
  | { ok: true; user: AdminPayload & { role: AdminRole } }
  | { ok: false; response: NextResponse }

/**
 * Returns the signed-in user with their current role, or a ready-made
 * 401/403 response. Usage:
 *   const access = await requireRole('ADMIN')
 *   if (!access.ok) return access.response
 */
export async function requireRole(minimum: AdminRole = 'EDITOR'): Promise<AccessResult> {
  const session = await getSession()
  if (!session) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, role: true },
  })
  if (!user) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  if (minimum === 'ADMIN' && user.role !== 'ADMIN') {
    return { ok: false, response: forbidden('Only admins can do this.') }
  }
  return { ok: true, user: { id: user.id, email: user.email, role: user.role as AdminRole } }
}

export function forbidden(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 403 })
}

/** Post statuses an EDITOR may save. Anything else needs an ADMIN. */
export const EDITOR_STATUSES = ['DRAFT'] as const

export function canSetStatus(role: AdminRole, status: string | undefined): boolean {
  if (role === 'ADMIN') return true
  return status === undefined || (EDITOR_STATUSES as readonly string[]).includes(status)
}
