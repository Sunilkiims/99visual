import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSessionCookie, AdminPayload } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const payload: AdminPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const response = NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    )

    return await setSessionCookie(response, payload)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}