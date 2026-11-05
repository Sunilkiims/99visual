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

    const current = await prisma.tag.findUnique({ where: { id }, select: { slug: true } })
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const v = new Validator()
    const name = v.requiredString(body.name, 'name', 100)
    // An unchanged slug is accepted as stored, so older records stay editable.
    const slug = body.slug === current.slug ? current.slug : v.slug(body.slug)
    v.throwIfAny()

    if (slug !== current.slug) {
      const clash = await prisma.tag.findUnique({ where: { slug }, select: { id: true } })
      if (clash) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: { name, slug },
    })

    return NextResponse.json({ success: true, tag })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Update tag error:', error)
    return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await requireRole('ADMIN')
  if (!access.ok) return access.response

  const { id } = await params

  try {
    await prisma.tag.delete({ where: { id } })
  } catch (error) {
    console.error('Delete tag error:', error)
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
