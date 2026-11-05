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
    const description = v.optionalString(body.description, 'description', 1000)
    const color = v.optionalString(body.color, 'color', 32)
    v.throwIfAny()

    const existing = await prisma.category.findUnique({ where: { slug } })
    if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })

    const category = await prisma.category.create({
      data: { name, slug, description, color },
    })

    return NextResponse.json({ success: true, category }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Create category error:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
