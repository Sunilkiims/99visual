import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { UAParser } from "ua-parser-js";

// ─── Captcha verification ────────────────────────────────────────────────
function sign(value: string) {
  return crypto
    .createHmac("sha256", process.env.CAPTCHA_SECRET!)
    .update(value)
    .digest("hex");
}

function verifyCaptcha(userAnswer: string, token: string): boolean {
  if (!userAnswer || !token) return false;

  const [timestamp, signature] = token.split(":");
  if (!timestamp || !signature) return false;

  const age = Date.now() - Number(timestamp);
  if (age > 10 * 60 * 1000) return false;

  const expectedSignature = sign(`${userAnswer}:${timestamp}`);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// ─── IP + Geolocation helpers ────────────────────────────────────────────
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

async function getGeoFromIp(ip: string) {
  if (ip === "unknown" || ip.startsWith("127.") || ip.startsWith("::1") || ip.startsWith("192.168.")) {
    return { city: "Unknown", region: "Unknown", country: "Unknown" };
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,city,regionName,country,query`
    );
    const data = await res.json();
    if (data.status === "success") {
      return { city: data.city, region: data.regionName, country: data.country };
    }
  } catch {}
  return { city: "Unknown", region: "Unknown", country: "Unknown" };
}

// ─── Device / Browser parsing ─────────────────────────────────────────────
function getDeviceInfo(req: NextRequest) {
  const uaString = req.headers.get("user-agent") || "";
  const parser = new UAParser(uaString);
  const result = parser.getResult();

  const browser = result.browser.name
    ? `${result.browser.name} ${result.browser.version || ""}`.trim()
    : "Unknown";

  const os = result.os.name
    ? `${result.os.name} ${result.os.version || ""}`.trim()
    : "Unknown";

  const deviceType = result.device.type
    ? result.device.type.charAt(0).toUpperCase() + result.device.type.slice(1)
    : "Desktop"; // ua-parser leaves this undefined for regular desktops

  const deviceModel = result.device.model || "";
  const deviceVendor = result.device.vendor || "";

  return {
    browser,
    os,
    deviceType,
    deviceLabel: [deviceVendor, deviceModel].filter(Boolean).join(" ") || deviceType,
    raw: uaString,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, captcha, captchaToken, honeypot } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (honeypot) {
      return NextResponse.json({ message: "Bot detected" }, { status: 400 });
    }

    if (!verifyCaptcha(captcha, captchaToken)) {
      return NextResponse.json({ message: "Invalid or expired captcha" }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const ip = getClientIp(req);
    const geo = await getGeoFromIp(ip);
    const device = getDeviceInfo(req);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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
            <strong>IP Address:</strong> ${ip}<br/>
            <strong>Location:</strong> ${geo.city}, ${geo.region}, ${geo.country}<br/>
            <strong>Device:</strong> ${device.deviceType} (${device.deviceLabel})<br/>
            <strong>OS:</strong> ${device.os}<br/>
            <strong>Browser:</strong> ${device.browser}
          </p>
          <p style="font-size:12px;color:gray;">Sent from 99Visual Contact Form</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}