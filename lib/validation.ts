// lib/validation.ts
// ─────────────────────────────────────────────────────────────────────────────
// Small, dependency-free input checks for route handlers. Each helper returns
// either the cleaned value or an error string, so handlers can collect errors
// and answer 400 with a clear message instead of passing raw request bodies
// straight to Prisma.
// ─────────────────────────────────────────────────────────────────────────────

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const POST_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const
export type PostStatusValue = (typeof POST_STATUSES)[number]

export class ValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super(errors.join('; '))
  }
}

/** Collects errors across several checks; call `.throwIfAny()` at the end. */
export class Validator {
  private errors: string[] = []

  /** Records a custom error. */
  fail(message: string): void {
    this.errors.push(message)
  }

  /** Required non-empty string, trimmed, at most `max` characters. */
  requiredString(value: unknown, field: string, max = 500): string {
    if (typeof value !== 'string' || !value.trim()) {
      this.errors.push(`${field} is required`)
      return ''
    }
    const v = value.trim()
    if (v.length > max) this.errors.push(`${field} must be at most ${max} characters`)
    return v
  }

  /** Optional string; `undefined` stays `undefined` (field not sent), "" becomes null. */
  optionalString(value: unknown, field: string, max = 500): string | null | undefined {
    if (value === undefined) return undefined
    if (value === null || value === '') return null
    if (typeof value !== 'string') {
      this.errors.push(`${field} must be text`)
      return undefined
    }
    const v = value.trim()
    if (v.length > max) this.errors.push(`${field} must be at most ${max} characters`)
    return v || null
  }

  slug(value: unknown, field = 'slug'): string {
    const v = this.requiredString(value, field, 200)
    if (v && !SLUG_PATTERN.test(v)) {
      this.errors.push(`${field} may only contain lowercase letters, numbers and single hyphens`)
    }
    return v
  }

  email(value: unknown, field = 'email'): string {
    const v = this.requiredString(value, field, 254)
    if (v && !EMAIL_PATTERN.test(v)) this.errors.push(`${field} is not a valid email address`)
    return v
  }

  optionalBoolean(value: unknown, field: string): boolean | undefined {
    if (value === undefined || value === null) return undefined
    if (typeof value !== 'boolean') {
      this.errors.push(`${field} must be true or false`)
      return undefined
    }
    return value
  }

  status(value: unknown): PostStatusValue | undefined {
    if (value === undefined || value === null || value === '') return undefined
    if (!POST_STATUSES.includes(value as PostStatusValue)) {
      this.errors.push(`status must be one of ${POST_STATUSES.join(', ')}`)
      return undefined
    }
    return value as PostStatusValue
  }

  /** Optional ISO date string → Date; "" or null → null. */
  optionalDate(value: unknown, field: string): Date | null | undefined {
    if (value === undefined) return undefined
    if (value === null || value === '') return null
    const d = new Date(String(value))
    if (Number.isNaN(d.getTime())) {
      this.errors.push(`${field} is not a valid date`)
      return undefined
    }
    return d
  }

  /** Optional array of id strings (e.g. tag ids). */
  idList(value: unknown, field: string, maxItems = 50): string[] | undefined {
    if (value === undefined || value === null) return undefined
    if (!Array.isArray(value) || value.some((v) => typeof v !== 'string' || !v || v.length > 64)) {
      this.errors.push(`${field} must be a list of ids`)
      return undefined
    }
    if (value.length > maxItems) this.errors.push(`${field} may contain at most ${maxItems} items`)
    return [...new Set(value as string[])]
  }

  /** Robots directive as stored in the CMS ("index, follow", "noindex, follow", …). */
  robots(value: unknown): string | undefined {
    if (value === undefined || value === null || value === '') return undefined
    const allowed = /^(no)?index\s*,\s*(no)?follow$/i
    if (typeof value !== 'string' || !allowed.test(value.trim())) {
      this.errors.push('robots must look like "index, follow" or "noindex, follow"')
      return undefined
    }
    return value.trim().toLowerCase().replace(/\s*,\s*/, ', ')
  }

  throwIfAny(): void {
    if (this.errors.length) throw new ValidationError(this.errors)
  }
}

/** Parses a JSON body; returns `null` for a missing or malformed body. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

/** Escapes text for safe interpolation into an HTML email body. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
