import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

function calculateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

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
    const body = await request.json()
    const {
      title, slug, excerpt, content,
      categoryId, authorId, tags,
      status, featured, featuredImageId, seo,
    } = body

    await prisma.postTag.deleteMany({ where: { postId: id } })

    const post = await prisma.post.update({
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
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        tags: {
          create: tags?.map((tagId: string) => ({ tagId })) || [],
        },
        seo: seo ? {
          upsert: {
            create: {
              metaTitle: seo.metaTitle || title,
              metaDescription: seo.metaDescription || excerpt,
              canonicalUrl: 'https://99visualsolutions.com/insights/' + slug,
              robots: 'index, follow',
            },
            update: {
              metaTitle: seo.metaTitle || title,
              metaDescription: seo.metaDescription || excerpt,
              canonicalUrl: 'https://99visualsolutions.com/insights/' + slug,
            },
          },
        } : undefined,
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
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
  await prisma.post.delete({ where: { id } })

  return NextResponse.json({ success: true })
}