import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

function calculateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title, slug, excerpt, content,
      categoryId, authorId, tags,
      status, featured, featuredImageId, publishedAt, seo,
    } = body

    if (!title || !slug || !content || !categoryId || !authorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
        status,
        featured: featured || false,
        featuredImageId: featuredImageId || null,
        readingTime: calculateReadingTime(content),
        publishedAt: publishedAt ? new Date(publishedAt) : status === 'PUBLISHED' ? new Date() : null,
        tags: {
          create: tags?.map((tagId: string) => ({ tagId })) || [],
        },
        seo: seo ? {
          create: {
            metaTitle: seo.metaTitle || title,
            metaDescription: seo.metaDescription || excerpt,
            canonicalUrl: 'https://99visualsolutions.com/insights/' + slug,
            robots: 'index, follow',
          },
        } : undefined,
      },
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
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