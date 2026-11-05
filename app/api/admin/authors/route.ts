import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { readJson, Validator, ValidationError } from '@/lib/validation'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await readJson(request)
    if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    const v = new Validator()
    const name = v.requiredString(body.name, 'name', 100)
    const slug = v.slug(body.slug)
    const email = body.email ? v.email(body.email) : null
    const bio = v.optionalString(body.bio, 'bio', 2000)
    v.throwIfAny()

    const existing = await prisma.author.findUnique({ where: { slug } })
    if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })

    const author = await prisma.author.create({
      data: { name, slug, email, bio },
    })

    return NextResponse.json({ success: true, author }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Create author error:', error)
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
}
