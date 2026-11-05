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

    const current = await prisma.author.findUnique({ where: { id }, select: { slug: true } })
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const v = new Validator()
    const name = v.requiredString(body.name, 'name', 100)
    const email = body.email ? v.email(body.email) : null
    const bio = v.optionalString(body.bio, 'bio', 2000)
    // An unchanged slug is accepted as stored, so older records stay editable.
    const slug = body.slug === current.slug ? current.slug : v.slug(body.slug)
    v.throwIfAny()

    if (slug !== current.slug) {
      const clash = await prisma.author.findUnique({ where: { slug }, select: { id: true } })
      if (clash) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const author = await prisma.author.update({
      where: { id },
      data: { name, email, bio, slug },
    })

    return NextResponse.json({ success: true, author })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Update author error:', error)
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await requireRole('ADMIN')
  if (!access.ok) return access.response

  const { id } = await params

  const inUse = await prisma.post.count({ where: { authorId: id } })
  if (inUse > 0) {
    return NextResponse.json(
      { error: `This author is used by ${inUse} post(s). Reassign them first.` },
      { status: 409 }
    )
  }

  try {
    await prisma.author.delete({ where: { id } })
  } catch (error) {
    console.error('Delete author error:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
