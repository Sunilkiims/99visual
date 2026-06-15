import { NextRequest, NextResponse } from 'next/server'
import { verifyRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const payload = await verifyRequest(request)

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ user: payload }, { status: 200 })
}