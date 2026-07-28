import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_ATTEMPTS = 5;

async function addToMailingList(email: string) {
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || typeof email !== 'string' || !otp || typeof otp !== 'string') {
      return NextResponse.json({ message: 'Missing email or code.' }, { status: 400 });
    }

    const key = email.trim().toLowerCase();
    const record = await prisma.otpCode.findUnique({ where: { email: key } });

    if (!record) {
      return NextResponse.json(
        { message: 'No verification code found for this email. Please request a new one.' },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt.getTime()) {
      await prisma.otpCode.delete({ where: { email: key } });
      return NextResponse.json(
        { message: 'This code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      await prisma.otpCode.delete({ where: { email: key } });
      return NextResponse.json(
        { message: 'Too many incorrect attempts. Please request a new code.' },
        { status: 429 }
      );
    }

    if (record.code !== otp.trim()) {
      await prisma.otpCode.update({
        where: { email: key },
        data: { attempts: { increment: 1 } },
      });
      return NextResponse.json({ message: 'That code is incorrect. Please try again.' }, { status: 400 });
    }

    // Success
    await prisma.otpCode.delete({ where: { email: key } });
    await addToMailingList(key);

    return NextResponse.json({ message: 'Subscribed successfully.' }, { status: 200 });
  } catch (err) {
    console.error('verify-otp error:', err);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}