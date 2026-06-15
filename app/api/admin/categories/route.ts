import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, slug, description, color } = await request.json()
  if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })

  const existing = await prisma.category.findUnique({ where: { slug } })
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })

  const category = await prisma.category.create({
    data: { name, slug, description, color },
  })

  return NextResponse.json({ success: true, category }, { status: 201 })
}