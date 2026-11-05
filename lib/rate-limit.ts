// lib/rate-limit.ts
// ─────────────────────────────────────────────────────────────────────────────
// Minimal fixed-window rate limiter held in memory.
//
// Limits: on Vercel each warm serverless instance keeps its own counters and
// a cold start resets them, so this slows down password guessing and
// scripted abuse but is not a hard guarantee. A shared, database-backed
// limiter is planned with the marketing-workflow migration (Phase 5), and
// will replace this behind the same function signature.
// ─────────────────────────────────────────────────────────────────────────────

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()
const MAX_KEYS = 10_000

function sweep(now: number) {
  if (buckets.size < MAX_KEYS) return
  for (const [key, b] of buckets) if (b.resetAt <= now) buckets.delete(key)
  // Still full (an attack spread over many keys): drop the oldest entries.
  while (buckets.size >= MAX_KEYS) {
    const first = buckets.keys().next().value
    if (first === undefined) break
    buckets.delete(first)
  }
}

/** True if `key` has already used `limit` hits in the current window. */
export function isRateLimited(key: string, limit: number): boolean {
  const b = buckets.get(key)
  return !!b && b.resetAt > Date.now() && b.count >= limit
}

/** Records one hit for `key`; returns seconds until the window resets. */
export function recordHit(key: string, windowMs: number): number {
  const now = Date.now()
  sweep(now)
  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return Math.ceil(windowMs / 1000)
  }
  b.count++
  return Math.ceil((b.resetAt - now) / 1000)
}

export function clearHits(key: string): void {
  buckets.delete(key)
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}
