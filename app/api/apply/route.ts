// app/api/apply/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Receives multipart/form-data from JobApplicationModal and emails it (with
// the resume attached) to your inbox via Nodemailer, using the same Gmail
// account/credentials as the contact route.
//
// Required env vars (same as contact route):
//   EMAIL_USER=you@gmail.com
//   EMAIL_PASS=your-gmail-app-password
//   APPLY_TO_EMAIL=hiring@yourdomain.com   // optional, defaults to EMAIL_USER
//   CAPTCHA_SECRET=...                     // same secret contact route uses
//
// Install dependency:
//   npm install nodemailer ua-parser-js
//   npm install -D @types/nodemailer
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { UAParser } from "ua-parser-js";

export const runtime = "nodejs"; // nodemailer needs the Node runtime, not edge

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Captcha verification (same scheme as the contact route) ─────────────
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

// ─── IP + Geolocation helpers (same as contact route) ────────────────────
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

// ─── Device / Browser parsing (server-side, from request headers) ────────
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
    : "Desktop";

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

interface TrackingPayload {
  landingPage: string;
  currentPage: string;
  pageTitle: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  screenResolution: string;
  userLanguage: string;
  userTimeZone: string;
  submittedAt: string;
}

function formatTrackingSectionHtml(tracking?: TrackingPayload): string {
  if (!tracking) return "";

  const row = (label: string, value?: string) => `
          <tr>
            <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:12px;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(label)}</strong></td>
            <td style="padding:4px 0;color:#111827;font-size:12px;word-break:break-all;">${escapeHtml(value || "—")}</td>
          </tr>`;

  return `
        <hr style="margin:20px 0;" />
        <h3 style="color:#333;font-size:14px;margin:0 0 10px;">Lead Source Information</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
          ${row("Landing Page", tracking.landingPage)}
          ${row("Current Page", tracking.currentPage)}
          ${row("Page Title", tracking.pageTitle)}
          ${row("Referrer", tracking.referrer)}
          ${row("UTM Source", tracking.utmSource)}
          ${row("UTM Medium", tracking.utmMedium)}
          ${row("UTM Campaign", tracking.utmCampaign)}
          ${row("UTM Content", tracking.utmContent)}
          ${row("UTM Term", tracking.utmTerm)}
          ${row("Browser", tracking.browser)}
          ${row("Operating System", tracking.operatingSystem)}
          ${row("Device", tracking.deviceType)}
          ${row("Screen Resolution", tracking.screenResolution)}
          ${row("Language", tracking.userLanguage)}
          ${row("Time Zone", tracking.userTimeZone)}
          ${row("Submitted At", tracking.submittedAt)}
        </table>`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const jobTitle = String(formData.get("jobTitle") || "").trim();
    const name      = String(formData.get("name") || "").trim();
    const email     = String(formData.get("email") || "").trim();
    const phone     = String(formData.get("phone") || "").trim();
    const message   = String(formData.get("message") || "").trim();
    const resume    = formData.get("resume");

    const captcha       = String(formData.get("captcha") || "");
    const captchaToken  = String(formData.get("captchaToken") || "");
    const honeypot      = String(formData.get("honeypot") || "");

    let tracking: TrackingPayload | undefined;
    const trackingRaw = formData.get("tracking");
    if (typeof trackingRaw === "string" && trackingRaw) {
      try {
        tracking = JSON.parse(trackingRaw);
      } catch {
        tracking = undefined;
      }
    }

    if (!jobTitle || !name || !email) {
      return NextResponse.json(
        { error: "Job title, name, and email are required." },
        { status: 400 }
      );
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!(resume instanceof File)) {
      return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume file is too large. Max size is 5MB." }, { status: 400 });
    }
    if (!ACCEPTED_TYPES.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." },
        { status: 400 }
      );
    }

    if (honeypot) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }
    if (!verifyCaptcha(captcha, captchaToken)) {
      return NextResponse.json({ error: "Invalid or expired captcha" }, { status: 400 });
    }

    // ── CHANGED: same credentials/transport as the contact route ──────────
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const toEmail = process.env.APPLY_TO_EMAIL || process.env.EMAIL_USER;

    const ip = getClientIp(req);
    const geo = await getGeoFromIp(ip);
    const device = getDeviceInfo(req);
    const leadSourceHtml = formatTrackingSectionHtml(tracking);

    const html = `
      <div style="font-family:sans-serif;font-size:14px;color:#111;line-height:1.6;">
        <h2 style="margin:0 0 12px;">New job application: ${escapeHtml(jobTitle)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
        <hr style="margin:20px 0;" />
        <p style="font-size:12px;color:gray;">
          <strong>IP Address:</strong> ${escapeHtml(ip)}<br/>
          <strong>Location:</strong> ${escapeHtml(geo.city)}, ${escapeHtml(geo.region)}, ${escapeHtml(geo.country)}<br/>
          <strong>Device:</strong> ${escapeHtml(device.deviceType)} (${escapeHtml(device.deviceLabel)})<br/>
          <strong>OS:</strong> ${escapeHtml(device.os)}<br/>
          <strong>Browser:</strong> ${escapeHtml(device.browser)}
        </p>
        ${leadSourceHtml}
        <p style="color:#888;font-size:12px;margin-top:20px;">Submitted via 99 Visual Solutions careers page.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"99 Visual Solutions Careers" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Application: ${jobTitle} — ${name}`,
      html,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
          contentType: resume.type,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Job application submission failed:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong sending your application. Please try again." },
      { status: 500 }
    );
  }
}