import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
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
    const v = new Validator()
    const metaTitle = v.optionalString(body.metaTitle, 'meta title', 200)
    const metaDescription = v.optionalString(body.metaDescription, 'meta description', 500)
    const robots = v.robots(body.robots)
    v.throwIfAny()

    const pageSEO = await prisma.pageSEO.update({
      where: { id },
      data: { metaTitle, metaDescription, robots },
    })

    return NextResponse.json({ success: true, pageSEO })
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('Update page SEO error:', error)
    return NextResponse.json({ error: 'Failed to update page SEO' }, { status: 500 })
  }
}
