import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  })

  return NextResponse.json({ tags })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, slug } = await request.json()

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    const existing = await prisma.tag.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Tag with this slug already exists' }, { status: 400 })
    }

    const tag = await prisma.tag.create({
      data: { name, slug },
    })

    return NextResponse.json({ success: true, tag }, { status: 201 })
  } catch (error) {
    console.error('Create tag error:', error)
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}