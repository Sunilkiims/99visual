// lib/leads.ts
// ─────────────────────────────────────────────────────────────────────────────
// Stores every enquiry (contact form, chatbot) in the existing `contact_leads`
// table, so a lead is never lost when an email fails and so enquiries can be
// counted and attributed later (Search Console / analytics phases).
//
// Saving is best-effort: a database error is logged and swallowed, so a lead
// is still emailed even if the database is unavailable. It never throws.
// No schema change — `ContactLead` already exists (init migration).
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './prisma'

export type LeadInput = {
  name: string
  email: string
  message: string
  phone?: string | null
  company?: string | null
  service?: string | null
  /** Where the lead came from, e.g. "contact-form" or "chatbot". */
  channel: 'contact-form' | 'chatbot'
  /** Optional attribution: landing page, UTM values, blog post, referrer. */
  attribution?: Record<string, string | null | undefined>
}

// Column limits are not enforced by the database (TEXT), so cap here to keep
// one abusive submission from storing megabytes.
const MAX = { name: 200, email: 254, message: 10_000, short: 200, source: 2_000 }

function clip(value: string | null | undefined, max: number): string | null {
  if (value === null || value === undefined) return null
  const v = String(value).trim()
  return v ? v.slice(0, max) : null
}

/** Compact, readable "source" string: `contact-form | landing=/services | utm_source=google`. */
function buildSource(channel: string, attribution?: LeadInput['attribution']): string {
  const parts = [channel]
  for (const [key, value] of Object.entries(attribution ?? {})) {
    const v = clip(value, 300)
    if (v) parts.push(`${key}=${v}`)
  }
  return parts.join(' | ').slice(0, MAX.source)
}

export async function saveLead(input: LeadInput): Promise<void> {
  try {
    await prisma.contactLead.create({
      data: {
        name: clip(input.name, MAX.name) ?? 'Not provided',
        email: clip(input.email, MAX.email) ?? '',
        message: clip(input.message, MAX.message) ?? '',
        phone: clip(input.phone, MAX.short),
        company: clip(input.company, MAX.short),
        service: clip(input.service, MAX.short),
        source: buildSource(input.channel, input.attribution),
      },
    })
  } catch (error) {
    console.error('[leads] Failed to save lead to database:', error)
  }
}
