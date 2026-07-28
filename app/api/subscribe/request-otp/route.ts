import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const OTP_TTL_MS    = 10 * 60 * 1000;
const RATE_LIMIT_MS = 30 * 1000;

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email: string, code: string) {
  await resend.emails.send({
    from: 'newsletter@99visual.com', // use your verified sending address
    to: email,
    subject: 'Your verification code',
    html: `<p>Your code is <strong>${code}</strong>. It expires in 10 minutes.</p>`,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const key = email.trim().toLowerCase();
    const existing = await prisma.otpCode.findUnique({ where: { email: key } });

    if (existing && Date.now() - existing.lastSentAt.getTime() < RATE_LIMIT_MS) {
      return NextResponse.json(
        { message: 'Please wait a few seconds before requesting another code.' },
        { status: 429 }
      );
    }

    const code = generateCode();
    const now = new Date();

    await prisma.otpCode.upsert({
      where: { email: key },
      update: {
        code,
        attempts: 0,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        lastSentAt: now,
      },
      create: {
        email: key,
        code,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        lastSentAt: now,
      },
    });

    await sendOtpEmail(key, code);

    return NextResponse.json({ message: 'Verification code sent.' }, { status: 200 });
  } catch (err) {
    console.error('request-otp error:', err);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}