import { NextRequest, NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { requireRole, canSetStatus, forbidden } from '@/lib/admin-access'
import { insightUrl } from '@/lib/seo'
import { revalidateInsightListings } from '@/lib/revalidate-insights'
import { submitToIndexNow } from '@/lib/indexnow'
import { BASE } from '@/lib/schema'
import { readJson, ValidationError } from '@/lib/validation'
import { sanitizeArticleHtml } from '@/lib/sanitize-html'
import { parsePostInput, calculateReadingTime, resolvePublishedAt } from '@/lib/post-input'

export async function POST(request: NextRequest) {
  const access = await requireRole('EDITOR')
  if (!access.ok) return access.response

  try {
    const body = await readJson(request)
    if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

    const input = parsePostInput(body)
    const {
      title, slug, excerpt,
      categoryId, authorId, tags,
      status, featured, featuredImageId, seo,
    } = input
    // Stored clean, and cleaned again when rendered (insights/[slug]).
    const content = sanitizeArticleHtml(input.content)

    if (!canSetStatus(access.user.role, status)) {
      return forbidden('Only admins can publish. Save it as a draft and an admin will publish it.')
    }

    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        categoryId,
        authorId,
        status: status ?? 'DRAFT',
        featured: featured || false,
        featuredImageId: featuredImageId || null,
        readingTime: calculateReadingTime(content),
        publishedAt: resolvePublishedAt(input, null),
        tags: {
          create: tags?.map((tagId: string) => ({ tagId })) || [],
        },
        seo: seo ? {
          create: {
            metaTitle: seo.metaTitle || title,
            metaDescription: seo.metaDescription || excerpt,
            // Always the production URL of this article. (This previously
            // hard-coded https://99visualsolutions.com — a different domain.)
            canonicalUrl: insightUrl(slug),
            robots: 'index, follow',
          },
        } : undefined,
      },
    })

    revalidateInsightListings()
    // Tell Bing about the article right away (after the response is sent).
    // The listing page changes too whenever an article is published.
    if (post.status === 'PUBLISHED') {
      after(() => submitToIndexNow([insightUrl(post.slug), `${BASE}/insights`]))
    }
    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ posts })
}