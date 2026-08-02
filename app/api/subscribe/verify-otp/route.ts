import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const MAX_ATTEMPTS = 5;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function addToMailingList(email: string) {
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  });
}

async function sendConfirmationEmail(email: string) {
  if (!resend) {
    console.error('[Newsletter] Skipping confirmation email — RESEND_API_KEY not configured.');
    return;
  }

  const fromAddress = process.env.RESEND_FROM;
  if (!fromAddress) {
    console.error('[Newsletter] Skipping confirmation email — set RESEND_FROM in Vercel.');
    return;
  }

  const html = `
<div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 36px;">
    <h2 style="color:#fff;margin:0 0 4px;font-size:20px;font-weight:700;">Thank you for subscribing!</h2>
    <p style="color:#94a3b8;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">99 Visual Solutions</p>
  </div>
  <div style="padding:28px 36px;background:#fff;">
    <p style="color:#0f172a;font-size:14px;line-height:1.6;margin:0 0 20px;">
      You're on the list. We'll send you updates, insights, and news from our team — no spam, unsubscribe anytime.
    </p>
    <p style="color:#0f172a;font-size:14px;line-height:1.6;margin:0 0 16px;">
      While you're here, check out our Welcome Kit — a curated set of insights to help you get started.
    </p>
    <a href="https://www.99visual.com/insights" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#4F46E5;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:8px;">
      Explore the Welcome Kit
    </a>
  </div>
  <div style="background:#f1f5f9;padding:14px 36px;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">99 Visual Solutions · Bengaluru, India · 99visual.com</p>
  </div>
</div>`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: 'Thank you for subscribing — 99 Visual Solutions',
    html,
  });

  if (error) {
    console.error('[Newsletter] Confirmation email failed:', error);
  }
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

    // Fire the subscriber-facing confirmation email. Awaited (not fire-and-forget) —
    // on serverless platforms the function can be frozen the instant the response is
    // sent, so an un-awaited send risks never completing. Failure here is logged but
    // does not fail the subscription itself, since the person is already subscribed.
    await sendConfirmationEmail(key).catch((err) =>
      console.error('[Newsletter] Confirmation email failed:', err)
    );

    return NextResponse.json({ message: 'Subscribed successfully.' }, { status: 200 });
  } catch (err) {
    console.error('verify-otp error:', err);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}