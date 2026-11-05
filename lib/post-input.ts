// lib/post-input.ts
// ─────────────────────────────────────────────────────────────────────────────
// Validates the JSON body sent by the post editor (NewPostClient /
// EditPostClient) before it reaches Prisma. Shared by POST /api/admin/posts
// and PATCH /api/admin/posts/[id] so both apply the same rules.
// ─────────────────────────────────────────────────────────────────────────────
import { Validator, type PostStatusValue } from './validation'

export type PostInput = {
  title: string
  slug: string
  excerpt: string | null | undefined
  content: string
  categoryId: string
  authorId: string
  tags: string[] | undefined
  status: PostStatusValue | undefined
  featured: boolean | undefined
  featuredImageId: string | null | undefined
  publishedAt: Date | null | undefined
  seo: { metaTitle: string | null | undefined; metaDescription: string | null | undefined } | undefined
}

// Article bodies are HTML from the Tiptap editor; 1 MB is far above any real
// article and only guards against accidental or abusive payloads.
const MAX_CONTENT = 1_000_000

/**
 * @param currentSlug when editing, the post's slug as stored today. An
 *   unchanged slug is accepted as-is even if it predates the slug rules, so
 *   existing posts can always be re-saved without changing their URL.
 */
export function parsePostInput(body: Record<string, unknown>, currentSlug?: string): PostInput {
  const v = new Validator()

  const title = v.requiredString(body.title, 'title', 300)
  const rawSlug = typeof body.slug === 'string' ? body.slug.trim() : body.slug
  const slug =
    currentSlug !== undefined && rawSlug === currentSlug ? currentSlug : v.slug(rawSlug)
  const content = v.requiredString(body.content, 'content', MAX_CONTENT)
  const categoryId = v.requiredString(body.categoryId, 'category', 64)
  const authorId = v.requiredString(body.authorId, 'author', 64)
  const excerpt = v.optionalString(body.excerpt, 'excerpt', 1000)
  const tags = v.idList(body.tags, 'tags')
  const status = v.status(body.status)
  const featured = v.optionalBoolean(body.featured, 'featured')
  const featuredImageId = v.optionalString(body.featuredImageId, 'featured image', 64)
  const publishedAt = v.optionalDate(body.publishedAt, 'publish date')

  let seo: PostInput['seo']
  if (body.seo !== undefined && body.seo !== null) {
    if (typeof body.seo !== 'object' || Array.isArray(body.seo)) {
      v.fail('seo must be an object')
    } else {
      const s = body.seo as Record<string, unknown>
      seo = {
        metaTitle: v.optionalString(s.metaTitle, 'meta title', 200),
        metaDescription: v.optionalString(s.metaDescription, 'meta description', 500),
      }
    }
  }

  v.throwIfAny()
  return {
    title, slug, excerpt, content, categoryId, authorId, tags,
    status, featured, featuredImageId, publishedAt, seo,
  }
}

export function calculateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/**
 * The publish date to store. An explicit date from the editor wins.
 * Otherwise a post that is (or becomes) published keeps its original
 * publish date, and gets "now" only the first time it is published —
 * re-saving an article must not make it look newly published to readers,
 * the sitemap or Article schema.
 */
export function resolvePublishedAt(
  input: Pick<PostInput, 'publishedAt' | 'status'>,
  existing: { publishedAt: Date | null; status: string } | null
): Date | null {
  if (input.publishedAt) return input.publishedAt
  const status = input.status ?? existing?.status
  if (status !== 'PUBLISHED') return existing?.publishedAt ?? null
  return existing?.publishedAt ?? new Date()
}
