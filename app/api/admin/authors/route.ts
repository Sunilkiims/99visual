import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, slug, email, bio } = await request.json()
  if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })

  const author = await prisma.author.create({
    data: { name, slug, email, bio },
  })

  return NextResponse.json({ success: true, author }, { status: 201 })
}