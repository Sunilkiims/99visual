import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      message,
      captcha,
      expected,
      honeypot,
    } = await req.json();

    // ❌ Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ❌ Honeypot check (bot detection)
    if (honeypot) {
      return NextResponse.json(
        { message: "Bot detected" },
        { status: 400 }
      );
    }

    // ❌ CAPTCHA validation
    if (captcha !== expected) {
      return NextResponse.json(
        { message: "Invalid captcha" },
        { status: 400 }
      );
    }

    // ❌ Check ENV variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Verify connection (helps debug)
    await transporter.verify();

    // ✅ Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // your inbox
      replyTo: email,
      subject: `📩 New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#333;">New Contact Form Submission</h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>
          <div style="background:#f5f5f5;padding:10px;border-radius:8px;">
            ${message}
          </div>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:gray;">
            Sent from 99Visual Contact Form
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Email sent successfully!",
    });

  } catch (error: any) {
    console.error("❌ Email send error:", error);

    return NextResponse.json(
      {
        message: "Failed to send email",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}