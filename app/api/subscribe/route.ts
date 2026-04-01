// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Newsletter Subscriber',
            html: `<p><strong>Email:</strong> ${email}</p>`,
        });

        return NextResponse.json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
