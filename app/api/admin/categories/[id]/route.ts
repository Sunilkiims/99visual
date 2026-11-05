import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { requireRole } from '@/lib/admin-access'
import { readJson, Validator, ValidationError } from '@/lib/validation'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const body = await readJson(request)
    if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

    const current = await prisma.category.findUnique({ where: { id }, select: { slug: true } })
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const v = new Validator()
    const name = v.requiredString(body.name, 'name', 100)
    const description = v.optionalString(body.description, 'description', 1000)
    const color = v.optionalString(body.color, 'color', 32)
    // An unchanged slug is accepted as stored, so older records stay editable.
    const slug = body.slug === current.slug ? current.slug : v.slug(body.slug)
    v.throwIfAny()

    if (slug !== current.slug) {
      const clash = await prisma.category.findUnique({ where: { slug }, select: { id: true } })
      if (clash) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, description, color, slug },
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Update category error:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await requireRole('ADMIN')
  if (!access.ok) return access.response

  const { id } = await params

  const inUse = await prisma.post.count({ where: { categoryId: id } })
  if (inUse > 0) {
    return NextResponse.json(
      { error: `This category is used by ${inUse} post(s). Reassign them first.` },
      { status: 409 }
    )
  }

  try {
    await prisma.category.delete({ where: { id } })
  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
