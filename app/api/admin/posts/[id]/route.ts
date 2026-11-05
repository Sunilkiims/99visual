import { NextRequest, NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { insightUrl } from '@/lib/seo'
import { revalidateInsightListings } from '@/lib/revalidate-insights'
import { submitToIndexNow } from '@/lib/indexnow'
import { BASE } from '@/lib/schema'
import { readJson, ValidationError } from '@/lib/validation'
import { parsePostInput, calculateReadingTime, resolvePublishedAt } from '@/lib/post-input'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await readJson(request)
    if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

    const current = await prisma.post.findUnique({
      where: { id },
      select: { slug: true, status: true, publishedAt: true },
    })
    if (!current) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const input = parsePostInput(body, current.slug)
    const {
      title, slug, excerpt, content,
      categoryId, authorId, tags,
      status, featured, featuredImageId, seo,
    } = input

    if (slug !== current.slug) {
      const clash = await prisma.post.findUnique({ where: { slug }, select: { id: true } })
      if (clash) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Tag replacement and the post update run in one transaction. Before,
    // the tags were deleted first on their own, so a failed update left the
    // post with no tags.
    const [, post] = await prisma.$transaction([
      prisma.postTag.deleteMany({ where: { postId: id } }),
      prisma.post.update({
        where: { id },
        data: {
          title,
          slug,
          excerpt,
          content,
          categoryId,
          authorId,
          status,
          featured,
          featuredImageId: featuredImageId || null,
          readingTime: calculateReadingTime(content),
          // Keeps the original publish date on re-save (see resolvePublishedAt).
          publishedAt: resolvePublishedAt(input, current),
          tags: {
            create: tags?.map((tagId: string) => ({ tagId })) || [],
          },
          seo: seo ? {
            upsert: {
              create: {
                metaTitle: seo.metaTitle || title,
                metaDescription: seo.metaDescription || excerpt,
                // Always the production URL of this article. (This previously
                // hard-coded https://99visualsolutions.com — a different domain.)
                canonicalUrl: insightUrl(slug),
                robots: 'index, follow',
              },
              update: {
                metaTitle: seo.metaTitle || title,
                metaDescription: seo.metaDescription || excerpt,
                canonicalUrl: insightUrl(slug),
                // The editor has no fields for these, so they can only ever be
                // stale copies from an earlier title. Clearing them lets the
                // article page derive social text from the current post.
                ogTitle: null,
                ogDescription: null,
                twitterTitle: null,
                twitterDescription: null,
              },
            },
          } : undefined,
        },
      }),
    ])

    if (slug !== current.slug && current.status === 'PUBLISHED') {
      // The old article URL now 404s. Logged so it can be redirected in
      // next.config.ts; a stored redirect table is planned for a later phase.
      console.warn(`[posts] Published slug changed: /insights/${current.slug} -> /insights/${slug}`)
    }

    revalidateInsightListings()
    // Tell Bing about the article right away (after the response is sent).
    // The listing page changes too whenever an article is published.
    if (post.status === 'PUBLISHED') {
      after(() => submitToIndexNow([insightUrl(post.slug), `${BASE}/insights`]))
    }
    return NextResponse.json({ success: true, post })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Update post error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    await prisma.post.delete({ where: { id } })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
  revalidateInsightListings()

  return NextResponse.json({ success: true })
}