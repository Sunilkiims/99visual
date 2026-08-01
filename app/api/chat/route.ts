import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { retrieveContextString } from "@/lib/retrieve"; // ← RAG retrieval

// ═══════════════════════════════════════════════════════════════════════════════
// ENV VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════
// Runs once at module load (cold start). Logs exactly what's missing instead
// of failing silently mid-request — the biggest source of "why isn't this
// working in production" bugs is a missing env var nobody noticed. This does
// NOT throw, so the route still boots and answers chat messages even if mail
// is misconfigured — only the mail-dependent paths degrade, and they log
// clearly when they do.

type EnvCheck = { name: string; required: boolean; present: boolean };

function checkEnv(): EnvCheck[] {
  const vars: Array<{ name: string; required: boolean }> = [
    { name: "OPENAI_API_KEY", required: true }, // consumed by lib/openai, checked here for visibility
    { name: "EMAIL_USER", required: false },
    { name: "EMAIL_PASS", required: false },
    { name: "LEAD_EMAIL", required: false },
    { name: "RESEND_API_KEY", required: false },
    { name: "RESEND_FROM", required: false },
  ];
  return vars.map((v) => ({ ...v, present: !!process.env[v.name] }));
}

const ENV_STATUS = checkEnv();

for (const v of ENV_STATUS) {
  if (v.required && !v.present) {
    console.error(`[99Visual] REQUIRED env var missing: ${v.name}. Chat completions will fail.`);
  } else if (!v.required && !v.present) {
    console.warn(`[99Visual] Optional env var not set: ${v.name}. Related feature will be skipped.`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type Role = "user" | "assistant";

type HistoryMessage = {
  role: Role;
  content: string;
};

type Lead = {
  name: string;
  email: string;
  phone?: string;
  requirement?: string;
  query?: string;
};

type LeadState = {
  email: string;
  name: string;
  phone: string;
  requirement: string;
  capturedFields: Set<"email" | "name" | "phone" | "requirement">;
  phoneDeclined: boolean;
  emitted: boolean;
};

type IntentScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type IntentLevel = "browsing" | "interested" | "warm" | "hot";

type ConversationState = {
  lead: LeadState;
  intentScore: IntentScore;
  intentLevel: IntentLevel;
  detectedLanguage: string;
  messageCount: number;
};

// Best-effort visitor geolocation, resolved from the request IP purely for
// the internal lead-notification email — never shown to the visitor, and
// never blocks or fails the chat response if it can't be resolved.
type LocationInfo = {
  ip: string;
  city: string;
  region: string;
  country: string;
};

// Shape of an incoming request body, validated at runtime below (no schema
// library added — the checks are simple enough to do by hand and avoid a
// new dependency for a single endpoint).
type ChatRequestBody = {
  message: string;
  history: HistoryMessage[];
  detectedLanguage?: string;
};

type ChatSuccessResponse = {
  reply: string;
  lead: Lead | null;
  intentScore: IntentScore;
  intentLevel: IntentLevel;
  detectedLanguage: string;
  navLinks: NavLink[];
  breadcrumb: NavLink[] | null;
  suggestedRoute: { label: string; url: string } | null;
};

type ChatErrorResponse = {
  error: string;
};

// ═══════════════════════════════════════════════════════════════════════════════
// REQUEST VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════
// Hand-rolled runtime validation for type safety at the request boundary.
// `as` casts on parsed JSON give compile-time safety only — this is what
// actually protects the route from malformed/malicious bodies at runtime.

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 40;

function validateChatRequest(body: unknown): { ok: true; data: ChatRequestBody } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.message !== "string" || b.message.trim().length === 0) {
    return { ok: false, error: "'message' is required and must be a non-empty string." };
  }
  if (b.message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `'message' exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.` };
  }

  let history: HistoryMessage[] = [];
  if (b.history !== undefined) {
    if (!Array.isArray(b.history)) {
      return { ok: false, error: "'history' must be an array." };
    }
    if (b.history.length > MAX_HISTORY_MESSAGES) {
      return { ok: false, error: `'history' exceeds maximum of ${MAX_HISTORY_MESSAGES} messages.` };
    }
    for (const item of b.history) {
      if (
        typeof item !== "object" ||
        item === null ||
        (item as { role?: unknown }).role === undefined ||
        !["user", "assistant"].includes((item as { role: string }).role) ||
        typeof (item as { content?: unknown }).content !== "string"
      ) {
        return { ok: false, error: "Each 'history' entry must have role ('user'|'assistant') and string content." };
      }
    }
    history = b.history as HistoryMessage[];
  }

  const detectedLanguage = typeof b.detectedLanguage === "string" ? b.detectedLanguage : undefined;

  return { ok: true, data: { message: b.message, history, detectedLanguage } };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIL PROVIDERS — split by purpose
// ═══════════════════════════════════════════════════════════════════════════════
// Internal lead notification (→ your team's inbox) goes through Gmail via
// nodemailer, so leads land directly in your existing Gmail.
//
// Visitor-facing confirmation email goes through Resend, since cold outbound
// mail from a personal Gmail account risks spam-folder placement.
//
// Required env vars (Vercel → Settings → Environment Variables):
//   EMAIL_USER, EMAIL_PASS  — Gmail address + App Password (internal notification)
//   LEAD_EMAIL              — inbox that receives lead notifications (usually = EMAIL_USER)
//   RESEND_API_KEY          — from resend.com dashboard
//   RESEND_FROM             — verified sender, e.g. "Nova @ 99 Visual <nova@99visual.com>"

const gmailTransporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ═══════════════════════════════════════════════════════════════════════════════
// VISITOR LOCATION (best-effort, internal email only)
// ═══════════════════════════════════════════════════════════════════════════════
// Same ip-api.com geolocation approach already used on /api/contact — kept
// consistent so lead emails from chat and from the contact form show
// location the same way. This is fire-and-forget-safe: a lookup failure
// (private/dev IP, ip-api.com down, timeout) just omits location from the
// email rather than failing the request or blocking the chat reply.

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return null;
}

const PRIVATE_IP_RE = /^(127\.|10\.|192\.168\.|::1$|localhost$)/i;

async function resolveLocation(ip: string | null): Promise<LocationInfo | null> {
  if (!ip || PRIVATE_IP_RE.test(ip)) {
    return null; // local/dev traffic — nothing meaningful to resolve
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,regionName,city,query`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("[99Visual] Geolocation lookup failed with status:", res.status);
      return null;
    }

    const data = (await res.json()) as {
      status: string;
      message?: string;
      country?: string;
      regionName?: string;
      city?: string;
      query?: string;
    };

    if (data.status !== "success") {
      console.warn("[99Visual] Geolocation lookup returned no result:", data.message ?? "unknown reason");
      return null;
    }

    return {
      ip: data.query || ip,
      city: data.city || "",
      region: data.regionName || "",
      country: data.country || "",
    };
  } catch (err) {
    console.error("[99Visual] Geolocation lookup errored, continuing without it:", err);
    return null;
  }
}

function intentBadge(level: IntentLevel): string {
  return {
    browsing: "🔵 Browsing",
    interested: "🟡 Interested",
    warm: "🟠 Warm Lead",
    hot: "🔴 HOT — Act Now",
  }[level];
}

async function sendLeadEmail(lead: Lead, state: ConversationState, location: LocationInfo | null): Promise<void> {
  if (!gmailTransporter) {
    console.error("[99Visual] Skipping lead email — EMAIL_USER/EMAIL_PASS not configured.");
    return;
  }

  const fromAddress = process.env.EMAIL_USER;
  const toAddress = process.env.LEAD_EMAIL || process.env.EMAIL_USER;

  if (!toAddress) {
    console.error("[99Visual] Skipping lead email — no destination address. Set LEAD_EMAIL in Vercel.");
    return;
  }

  const badge = intentBadge(state.intentLevel);
  const accentColor =
    state.intentLevel === "hot" ? "#dc2626" :
    state.intentLevel === "warm" ? "#ea580c" :
    state.intentLevel === "interested" ? "#ca8a04" :
    "#2563eb";

  const html = `
<div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 36px;">
    <table style="width:100%"><tr>
      <td>
        <div style="background:#f97316;border-radius:10px;display:inline-block;padding:8px 12px;font-size:20px;">🎯</div>
        <h2 style="color:#fff;margin:8px 0 2px;font-size:20px;font-weight:700;">New Lead — Nova AI Assistant</h2>
        <p style="color:#94a3b8;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">99 Visual Solutions</p>
      </td>
      <td style="text-align:right;vertical-align:top;">
        <div style="background:${accentColor};color:#fff;border-radius:20px;padding:6px 16px;font-size:13px;font-weight:700;display:inline-block;">${badge}</div>
        <div style="color:#64748b;font-size:12px;margin-top:6px;">Intent Score: <strong style="color:#f97316;">${state.intentScore}/10</strong></div>
      </td>
    </tr></table>
  </div>
  <div style="padding:32px 36px;background:#fff;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr style="background:#f8fafc;"><td style="padding:12px 16px;color:#64748b;font-weight:600;width:150px;">👤 Name</td><td style="padding:12px 16px;color:#0f172a;font-weight:700;font-size:16px;">${lead.name}</td></tr>
      <tr><td style="padding:12px 16px;color:#64748b;font-weight:600;">📧 Email</td><td style="padding:12px 16px;"><a href="mailto:${lead.email}" style="color:#f97316;font-weight:700;text-decoration:none;">${lead.email}</a></td></tr>
      <tr style="background:#f8fafc;"><td style="padding:12px 16px;color:#64748b;font-weight:600;">📱 Phone</td><td style="padding:12px 16px;color:#0f172a;">${lead.phone || "Not provided"}</td></tr>
      <tr><td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">📍 Location</td><td style="padding:12px 16px;color:#0f172a;">${
        location
          ? `${[location.city, location.region, location.country].filter(Boolean).join(", ") || "Unknown"} <span style="color:#94a3b8;font-size:12px;">(IP: ${location.ip})</span>`
          : '<span style="color:#94a3b8;">Not available</span>'
      }</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💼 Requirement</td><td style="padding:12px 16px;color:#0f172a;">${lead.requirement || "Not specified"}</td></tr>
      <tr><td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💬 Original Query</td><td style="padding:12px 16px;color:#475569;font-style:italic;">"${lead.query || "—"}"</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:12px 16px;color:#64748b;font-weight:600;">🌐 Language</td><td style="padding:12px 16px;color:#0f172a;">${state.detectedLanguage.toUpperCase()}</td></tr>
    </table>
    <div style="margin-top:24px;padding:18px 20px;background:#f0fdf4;border:1px solid #86efac;border-radius:10px;">
      <p style="margin:0 0 8px;font-size:13px;color:#166534;font-weight:700;">📊 Intent Analysis</p>
      <div style="background:#dcfce7;border-radius:6px;height:10px;overflow:hidden;">
        <div style="background:${accentColor};height:100%;width:${state.intentScore * 10}%;"></div>
      </div>
      <p style="margin:8px 0 0;font-size:12px;color:#166534;">${state.intentScore}/10 — ${badge} · ${state.messageCount} messages exchanged</p>
    </div>
    <div style="margin-top:16px;padding:16px 20px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;">
      <p style="margin:0;font-size:13px;color:#c2410c;font-weight:700;">⚡ Follow-up Priority: ${state.intentLevel === "hot" ? "IMMEDIATE" : state.intentLevel === "warm" ? "Within 4 hours" : "Within 24 hours"}</p>
      <p style="margin:6px 0 0;font-size:13px;color:#9a3412;">Reply to this email or call/WhatsApp the number above to close this lead.</p>
    </div>
  </div>
  <div style="background:#f1f5f9;padding:14px 36px;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">🕐 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST · Nova AI · 99visual.com</p>
  </div>
</div>`;

  const payload = {
    from: `"99 Visual AI — Nova" <${fromAddress}>`,
    to: toAddress,
    replyTo: lead.email,
    subject: `${state.intentLevel === "hot" ? "🔴 HOT" : "🔥"} Lead [Score ${state.intentScore}/10]: ${lead.name} — ${lead.query ?? "Enquiry"}`,
    html,
  };

  try {
    await gmailTransporter.sendMail(payload);
  } catch (err) {
    console.error("[99Visual] First email attempt failed, retrying in 3s:", err);
    await new Promise((r) => setTimeout(r, 3000));
    try {
      await gmailTransporter.sendMail(payload);
    } catch (retryErr) {
      console.error("[99Visual] Lead email failed after retry:", retryErr);
    }
  }
}

async function sendConfirmationEmail(lead: Lead): Promise<void> {
  if (!resend) {
    console.error("[99Visual] Skipping visitor confirmation — RESEND_API_KEY not configured.");
    return;
  }

  const fromAddress = process.env.RESEND_FROM;
  if (!fromAddress) {
    console.error("[99Visual] Skipping visitor confirmation — set RESEND_FROM in Vercel.");
    return;
  }

  const firstName = lead.name && lead.name !== "Not provided" ? lead.name.split(/\s+/)[0] : "there";

  const html = `
<div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 36px;">
    <div style="background:#f97316;border-radius:10px;display:inline-block;padding:8px 12px;font-size:20px;">✅</div>
    <h2 style="color:#fff;margin:8px 0 2px;font-size:20px;font-weight:700;">Thanks for reaching out, ${firstName}!</h2>
    <p style="color:#94a3b8;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">99 Visual Solutions</p>
  </div>
  <div style="padding:32px 36px;background:#fff;">
    <p style="color:#0f172a;font-size:14px;line-height:1.6;margin:0 0 16px;">
      We've received your message${lead.requirement ? ` about <strong>${lead.requirement}</strong>` : ""} and our team is reviewing it now.
      Someone will personally follow up with you shortly${lead.phone ? " by email or phone" : " by email"}.
    </p>
    <div style="padding:16px 20px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;margin-bottom:16px;">
      <p style="margin:0;font-size:13px;color:#c2410c;font-weight:700;">⏱️ What happens next</p>
      <p style="margin:6px 0 0;font-size:13px;color:#9a3412;">A member of our team will get back to you within 24 hours with next steps.</p>
    </div>
    <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">
      In the meantime, feel free to browse our
      <a href="https://www.99visual.com/services" style="color:#f97316;font-weight:600;text-decoration:none;">Services</a>
      or reply directly to this email if you'd like to add anything.
    </p>
  </div>
  <div style="background:#f1f5f9;padding:14px 36px;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">99 Visual Solutions · Bengaluru, India · 99visual.com</p>
  </div>
</div>`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: lead.email,
    subject: `We've received your enquiry — 99 Visual Solutions`,
    html,
  });

  if (error) {
    console.error("[99Visual] Visitor confirmation email failed:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTENT SCORING ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

const INTENT_SIGNALS: { pattern: RegExp; weight: number }[] = [
  { pattern: /\b(hire you|let'?s start|ready to (start|go|begin)|how (do i|can i) (pay|get started)|sign(ing)? up|onboard|send (me a )?contract|send (me a )?proposal|get (a )?quote)\b/i, weight: 4 },
  { pattern: /\b(how much (does it|will it|would it) cost|what('?s| is) (the |your )?(price|pricing|rate|cost)|pricing (for|of)|budget (for my|for a|for the))\b/i, weight: 3 },
  { pattern: /\b(my (website|app|project|portal|dashboard|system)|our (website|app|project)|need (you to|someone to|a team to))\b/i, weight: 2 },
  { pattern: /\b(seo|digital marketing|3d (render|visualization)|cad|gis|lidar|qa testing|automation testing|it consulting)\b/i, weight: 1 },
  { pattern: /\b(urgent|asap|immediately|this week|this month|hard deadline|launch date|go live)\b/i, weight: 2 },
  { pattern: /\b(book (a )?call|schedule (a )?(meeting|demo|call)|talk to (someone|your team|a human)|request (a )?demo)\b/i, weight: 2 },
  { pattern: /\b(compare|vs\.?|alternative to|better than|other (agencies|companies|vendors))\b/i, weight: 1 },
];

function scoreIntent(history: HistoryMessage[], currentMessage: string): IntentScore {
  const allUserText = [
    ...history.filter((m) => m.role === "user").map((m) => m.content),
    currentMessage,
  ].join(" ");

  let raw = 0;
  for (const { pattern, weight } of INTENT_SIGNALS) {
    if (pattern.test(allUserText)) raw += weight;
  }

  return Math.min(10, raw) as IntentScore;
}

function getIntentLevel(score: IntentScore): IntentLevel {
  if (score >= 9) return "hot";
  if (score >= 6) return "warm";
  if (score >= 3) return "interested";
  return "browsing";
}

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGE DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

function detectLanguageHeuristic(text: string): string | null {
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/[\u3040-\u30FF]/.test(text)) return "ja";
  if (/[\uAC00-\uD7AF]/.test(text)) return "ko";
  if (/[\u0E00-\u0E7F]/.test(text)) return "th";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu";

  const lower = text.toLowerCase();
  if (/\b(bonjour|merci|comment|je suis|nous|votre|vous)\b/.test(lower)) return "fr";
  if (/\b(hola|gracias|cómo|necesito|quiero|tengo)\b/.test(lower)) return "es";
  if (/\b(hallo|danke|ich|wir|bitte|möchte|können)\b/.test(lower)) return "de";
  if (/\b(ciao|grazie|come|voglio|sono)\b/.test(lower)) return "it";
  if (/\b(olá|obrigado|como|quero|preciso)\b/.test(lower)) return "pt";

  return null;
}

async function resolveLanguage(
  currentMessage: string,
  history: HistoryMessage[],
  previouslyDetected: string
): Promise<string> {
  if (previouslyDetected && previouslyDetected !== "en") return previouslyDetected;

  const heuristic = detectLanguageHeuristic(currentMessage);
  if (heuristic) return heuristic;

  const allUser = history
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ") + " " + currentMessage;

  if (allUser.trim().length < 15) return "en";

  try {
    const langCheck = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: 'Detect the language of the text. Reply ONLY with the BCP-47 tag (e.g. "en", "hi", "ar"). Nothing else.',
        },
        { role: "user", content: allUser.slice(0, 300) },
      ],
      max_tokens: 4,
      temperature: 0,
    });
    return langCheck.choices[0].message.content?.trim().toLowerCase() ?? "en";
  } catch (err) {
    console.error("[99Visual] Language detection failed, defaulting to 'en':", err);
    return "en";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEAD STATE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════
// Order of collection now follows the intended conversational flow:
//   greeting → understand requirement → NAME → EMAIL → optional PHONE
// Detection is "smart": a name, email, or phone volunteered inline by the
// visitor (e.g. "I'm John", "my email is john@x.com") is captured the moment
// it appears, regardless of whether the assistant explicitly asked for it —
// this is what stops the bot from re-asking for something already given.

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/;

// Direct "stated name" extraction — catches volunteered names like
// "I'm John", "My name is John Smith", "This is John", "Call me John" —
// independent of whatever the assistant last asked.
const NAME_STATEMENT_RE =
  /\b(?:i'?m|i am|my name'?s|my name is|this is|call me|it'?s)\s+([A-Za-zÀ-ÖØ-öø-ÿ\u0900-\u097F\u0600-\u06FF'’\-]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ\u0900-\u097F\u0600-\u06FF'’\-]{2,}){0,2})\b/i;

const PHONE_DECLINE_RE = /\b(skip|no thanks?|no|later|don'?t|not now|not yet|prefer not|rather not|prefer email|email is (fine|enough)|that'?s (fine|ok|okay))\b/i;

const REQUIREMENT_TRIGGERS = [
  "require", "project", "describe", "briefly", "looking to build",
  "achieve", "working on", "tell me more", "what do you need",
  "what are you", "goal", "help you with",
];

function extractStatedName(text: string): string | null {
  const match = text.match(NAME_STATEMENT_RE);
  if (!match) return null;
  const candidate = match[1].trim();
  // Guard against false positives like "I'm looking for..." or "I'm not sure"
  const STOPWORDS = /^(looking|not|just|trying|still|really|very|also|interested|curious|planning|hoping|wondering|going|here|new|good|fine|sure|okay|ok)\b/i;
  if (STOPWORDS.test(candidate)) return null;
  if (EMAIL_RE.test(candidate) || PHONE_RE.test(candidate)) return null;
  return candidate;
}

function buildLeadState(history: HistoryMessage[]): LeadState {
  const state: LeadState = {
    email: "",
    name: "",
    phone: "",
    requirement: "",
    capturedFields: new Set(),
    phoneDeclined: false,
    emitted: false,
  };

  for (const m of history) {
    if (m.role === "assistant" && /<!--LEAD:[\s\S]*?-->/.test(m.content)) {
      const match = m.content.match(/<!--LEAD:([\s\S]*?)-->/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]) as Lead;
          state.email = parsed.email || "";
          state.name = parsed.name || "";
          state.phone = parsed.phone || "";
          state.requirement = parsed.requirement || "";
          if (state.email) state.capturedFields.add("email");
          if (state.name) state.capturedFields.add("name");
          if (state.phone) state.capturedFields.add("phone");
          if (state.requirement) state.capturedFields.add("requirement");
          state.emitted = true;
        } catch {
          console.error("[99Visual] Failed to parse stored LEAD block from history — ignoring.");
        }
      }
    }
  }

  if (state.emitted) return state;

  for (let i = 0; i < history.length; i++) {
    const user = history[i];
    if (user.role !== "user") continue;

    const uText = user.content.trim();
    const asst = i > 0 ? history[i - 1] : null;
    const aLower = asst?.role === "assistant" ? asst.content.toLowerCase() : "";

    // ── Name: volunteered anywhere, or a short bare answer right after we asked ──
    if (!state.name) {
      const stated = extractStatedName(uText);
      if (stated) {
        state.name = stated;
        state.capturedFields.add("name");
      } else if (aLower.includes("name") || (state.capturedFields.has("email") && !aLower)) {
        const wordCount = uText.split(/\s+/).length;
        const looksLikeName =
          uText.length < 60 &&
          wordCount <= 4 &&
          !EMAIL_RE.test(uText) &&
          !PHONE_RE.test(uText) &&
          /^[a-zA-Z\s''\-\.À-ÖØ-öø-ÿ\u0900-\u097F\u0600-\u06FF]+$/.test(uText);
        if (looksLikeName) {
          state.name = uText;
          state.capturedFields.add("name");
        }
      }
    }

    // ── Email: volunteered anywhere ──
    if (!state.email) {
      const match = uText.match(EMAIL_RE);
      if (match) {
        state.email = match[0];
        state.capturedFields.add("email");
      }
    }

    // ── Phone: volunteered, or answered/declined right after we asked ──
    if (!state.phone && !state.phoneDeclined) {
      const match = uText.match(PHONE_RE);
      if (match) {
        state.phone = match[0];
        state.capturedFields.add("phone");
      } else if (aLower.includes("phone") || aLower.includes("contact number")) {
        if (PHONE_DECLINE_RE.test(uText)) {
          state.phoneDeclined = true;
          state.capturedFields.add("phone");
        }
      }
    }

    // ── Requirement: captured once email context makes the "what do you need" question relevant ──
    if (
      !state.requirement &&
      REQUIREMENT_TRIGGERS.some((t) => aLower.includes(t))
    ) {
      if (uText.length > 5 && !EMAIL_RE.test(uText) && !PHONE_RE.test(uText)) {
        state.requirement = uText;
        state.capturedFields.add("requirement");
      }
    }
  }

  return state;
}

// Collection order per the intended flow: NAME → EMAIL → optional PHONE.
// Requirement is understood conversationally and isn't a blocking field.
function nextFieldToCapture(
  lead: LeadState
): "name" | "email" | "phone" | "requirement" | null {
  if (!lead.capturedFields.has("name")) return "name";
  if (!lead.capturedFields.has("email")) return "email";
  if (!lead.capturedFields.has("phone")) return "phone";
  if (!lead.capturedFields.has("requirement")) return "requirement";
  return null;
}

// Minimum needed to treat a lead as capturable/emittable: name + email.
function hasMinimumLeadInfo(lead: LeadState): boolean {
  return lead.capturedFields.has("name") && lead.capturedFields.has("email");
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

const SERVICE_ROUTES = [
  { keywords: ["website", "web dev", "landing page", "wordpress", "web design"], label: "Website Development", url: "https://www.99visual.com/services/website-development" },
  { keywords: ["web app", "application", "portal", "dashboard", "saas", "software"], label: "Web Applications", url: "https://www.99visual.com/services/website-development" },
  { keywords: ["seo", "digital marketing", "google ranking", "ads", "ppc"], label: "Digital Marketing & SEO", url: "https://www.99visual.com/services/digital-marketing-seo" },
  { keywords: ["3d", "visualization", "render", "architectural", "animation"], label: "3D Visualization", url: "https://www.99visual.com/services/visualization" },
  { keywords: ["cad", "gis", "lidar", "photogrammetry", "mapping", "drafting"], label: "CAD / GIS / LiDAR", url: "https://www.99visual.com/services/cad-gis-photogrammetry" },
  { keywords: ["consulting", "it strategy", "advisory", "digital transformation"], label: "IT Consulting", url: "https://www.99visual.com/services/it-consulting" },
  { keywords: ["automation", "testing", "qa", "quality assurance", "rpa"], label: "Automation & Testing", url: "https://www.99visual.com/services/it-consulting" },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION LINK SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

export type NavLink = {
  label: string;
  url: string;
  category: "service" | "internal" | "breadcrumb";
  icon?: string;
  description?: string;
};

const SITE_MAP: Array<{ keywords: string[]; link: NavLink }> = [
  { keywords: ["website", "web design", "landing page", "wordpress", "web development", "web dev", "redesign"], link: { label: "Website Development", url: "https://www.99visual.com/services/website-development", category: "service", icon: "🌐", description: "Custom sites & landing pages" } },
  { keywords: ["web app", "application", "portal", "dashboard", "saas", "software", "platform", "crm", "erp"], link: { label: "Web Applications", url: "https://www.99visual.com/services/website-development", category: "service", icon: "⚙️", description: "Portals, SaaS & dashboards" } },
  { keywords: ["seo", "search engine", "google ranking", "digital marketing", "ads", "ppc", "social media", "content marketing", "email marketing"], link: { label: "Digital Marketing & SEO", url: "https://www.99visual.com/services/digital-marketing-seo", category: "service", icon: "📈", description: "Rank higher, reach further" } },
  { keywords: ["3d", "visualization", "render", "rendering", "architectural", "animation", "walkthrough", "interior", "exterior", "product render"], link: { label: "3D Visualization", url: "https://www.99visual.com/services/visualization", category: "service", icon: "🎨", description: "Renders, walkthroughs & animation" } },
  { keywords: ["cad", "gis", "lidar", "photogrammetry", "mapping", "drafting", "autocad", "survey", "spatial", "geospatial", "point cloud"], link: { label: "CAD / GIS / LiDAR", url: "https://www.99visual.com/services/cad-gis-photogrammetry", category: "service", icon: "🗺️", description: "Spatial data & precision drafting" } },
  { keywords: ["consulting", "it strategy", "advisory", "digital transformation", "cloud", "migration", "infrastructure", "audit"], link: { label: "IT Consulting", url: "https://www.99visual.com/services/it-consulting", category: "service", icon: "💡", description: "Strategy, cloud & transformation" } },
  { keywords: ["automation", "testing", "qa", "quality assurance", "rpa", "selenium", "playwright", "cypress", "test automation", "bug"], link: { label: "Automation & QA Testing", url: "https://www.99visual.com/services/it-consulting", category: "service", icon: "🤖", description: "AI-powered QA & automation" } },
  { keywords: ["about", "company", "who are you", "team", "founded", "history", "story", "background", "experience"], link: { label: "About Us", url: "https://www.99visual.com/about", category: "internal", icon: "🏢", description: "Our story, team & values" } },
  { keywords: ["contact", "reach", "get in touch", "talk", "email", "call", "whatsapp", "enquiry", "inquiry", "support", "help"], link: { label: "Contact Us", url: "https://www.99visual.com/contact", category: "internal", icon: "📬", description: "Get in touch with our team" } },
  { keywords: ["price", "pricing", "cost", "how much", "quote", "estimate", "budget", "package", "plan", "rate"], link: { label: "Get a Quote", url: "https://www.99visual.com/contact", category: "internal", icon: "💰", description: "Request a custom quote" } },
  { keywords: ["blog", "article", "read", "news", "update", "insight", "tips", "guide", "resource"], link: { label: "Blog & Insights", url: "https://www.99visual.com/blog", category: "internal", icon: "📰", description: "Tips, guides & industry news" } },
  { keywords: ["service", "services", "what do you do", "what do you offer", "offerings", "solutions", "capabilities"], link: { label: "All Services", url: "https://www.99visual.com/services", category: "internal", icon: "🛠️", description: "Browse all our services" } },
];

const BREADCRUMB_TRAILS: Array<{ keywords: string[]; trail: NavLink[] }> = [
  { keywords: ["website", "web design", "landing page", "web development", "web dev", "wordpress"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "Website Development", url: "https://www.99visual.com/services/website-development", category: "breadcrumb" }] },
  { keywords: ["seo", "digital marketing", "google ranking", "ads", "ppc"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "Digital Marketing & SEO", url: "https://www.99visual.com/services/digital-marketing-seo", category: "breadcrumb" }] },
  { keywords: ["3d", "visualization", "render", "architectural", "walkthrough"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "3D Visualization", url: "https://www.99visual.com/services/visualization", category: "breadcrumb" }] },
  { keywords: ["cad", "gis", "lidar", "photogrammetry", "mapping", "drafting"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "CAD / GIS / LiDAR", url: "https://www.99visual.com/services/cad-gis-photogrammetry", category: "breadcrumb" }] },
  { keywords: ["consulting", "it strategy", "cloud", "digital transformation"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "IT Consulting", url: "https://www.99visual.com/services/it-consulting", category: "breadcrumb" }] },
  { keywords: ["automation", "qa", "testing", "quality assurance"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Services", url: "https://www.99visual.com/services", category: "breadcrumb" }, { label: "Automation & Testing", url: "https://www.99visual.com/services/it-consulting", category: "breadcrumb" }] },
  { keywords: ["about", "company", "team", "founded", "story"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "About Us", url: "https://www.99visual.com/about", category: "breadcrumb" }] },
  { keywords: ["contact", "get in touch", "enquiry", "quote", "price", "pricing", "cost", "how much"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Contact Us", url: "https://www.99visual.com/contact", category: "breadcrumb" }] },
];

const MAX_NAV_LINKS = 4;

function resolveNavigation(
  history: HistoryMessage[],
  currentMessage: string
): { navLinks: NavLink[]; breadcrumb: NavLink[] | null } {
  const corpus = [
    ...history.filter((m) => m.role === "user").map((m) => m.content),
    currentMessage,
  ].join(" ").toLowerCase();

  const scored = SITE_MAP.map((entry) => {
    const hits = entry.keywords.filter((kw) => corpus.includes(kw.toLowerCase())).length;
    return { hits, link: entry.link };
  }).filter((e) => e.hits > 0);

  const seen = new Set<string>();
  const navLinks: NavLink[] = [];

  for (const { link } of scored.sort((a, b) => b.hits - a.hits)) {
    if (!seen.has(link.url)) {
      seen.add(link.url);
      navLinks.push(link);
    }
    if (navLinks.length >= MAX_NAV_LINKS) break;
  }

  const contactUrl = "https://www.99visual.com/contact";
  if (navLinks.length < MAX_NAV_LINKS && !seen.has(contactUrl)) {
    navLinks.push({
      label: "Contact Us",
      url: contactUrl,
      category: "internal",
      icon: "📬",
      description: "Get in touch with our team",
    });
  }

  let breadcrumb: NavLink[] | null = null;
  let bestBreadcrumbHits = 0;

  for (const trail of BREADCRUMB_TRAILS) {
    const hits = trail.keywords.filter((kw) => corpus.includes(kw.toLowerCase())).length;
    if (hits > bestBreadcrumbHits) {
      bestBreadcrumbHits = hits;
      breadcrumb = trail.trail;
    }
  }

  return { navLinks, breadcrumb };
}

// ═══════════════════════════════════════════════════════════════════════════════
// IDENTITY / INTRODUCTION DETECTION
// ═══════════════════════════════════════════════════════════════════════════════
// Detects whether the visitor is directly asking who they're talking to, so
// the system prompt can answer that ONE question plainly without re-running
// the full introduction or repeating it unprompted elsewhere.

const IDENTITY_QUESTION_RE =
  /\b(what'?s your name|what is your name|who are you|who am i (talking|speaking|chatting) (to|with)|your name\??$|do you have a name)\b/i;

function isIdentityQuestion(text: string): boolean {
  return IDENTITY_QUESTION_RE.test(text.trim());
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM PROMPT CONFIG — edit here to retune tone/length without touching logic
// ═══════════════════════════════════════════════════════════════════════════════
// Pulling these into a config object means the "personality" of Nova can be
// tuned (word limits, off-topic message, CTA style) without hunting through
// the template string logic below.

const PROMPT_CONFIG = {
  assistantName: "Nova",
  maxSentences: 4,
  targetWordLimit: 80,
  introLine:
    "Hi! I'm Nova, the AI Assistant for 99 Visual Solutions. I'm here to help you with our services, pricing, projects, or anything else you need.",
  identityAnswer: "I'm Nova, the AI Assistant for 99 Visual Solutions.",
  offTopicMessage:
    "I'm Nova, 99 Visual's assistant — I can only help with questions about our services like web development, digital marketing, or 3D visualization. Want help with one of those?",
  ctaExamples: [
    "Want a free consultation or a custom quote?",
    "Should I get you a quote for that?",
    "Want to book a quick call with our team?",
  ],
} as const;

function buildSystemPrompt(params: {
  detectedLanguage: string;
  leadState: LeadState;
  intentScore: IntentScore;
  intentLevel: IntentLevel;
  shouldCaptureLead: boolean;
  nextField: "name" | "email" | "phone" | "requirement" | null;
  isFirstMessage: boolean;
  isIdentityQuestion: boolean;
  retrievedContext: string;
}): string {
  const {
    detectedLanguage,
    leadState,
    intentScore,
    intentLevel,
    shouldCaptureLead,
    nextField,
    isFirstMessage,
    isIdentityQuestion,
    retrievedContext,
  } = params;

  return `
You are ${PROMPT_CONFIG.assistantName} — the AI business assistant for 99 Visual Solutions, a full-service IT and digital transformation company in Bengaluru, India serving global clients.

Your single goal: give a short, confident, accurate answer, then move the visitor one step closer to becoming a client. You are a sales-savvy expert, not a documentation bot.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👋 INTRODUCTION — ONCE ONLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${
  isFirstMessage
    ? `This is the FIRST message of the conversation. Open with exactly this line (translated into the visitor's language if needed), then briefly ask what brings them here — nothing else, no contact details yet:\n"${PROMPT_CONFIG.introLine}"`
    : `The introduction has ALREADY been given earlier in this conversation. Do NOT repeat your name or reintroduce yourself. Do not say "I'm ${PROMPT_CONFIG.assistantName}" again unless the rule below applies.`
}
${
  isIdentityQuestion
    ? `\nThe visitor is directly asking who you are / your name. Answer with ONLY: "${PROMPT_CONFIG.identityAnswer}" then continue helping naturally. Do not repeat the full introduction line — just this short identity answer.`
    : `\nThe visitor is NOT asking about your identity right now — do not volunteer your name or restate who you are.`
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✂️ RESPONSE LENGTH — NON-NEGOTIABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Maximum ${PROMPT_CONFIG.maxSentences} sentences per reply.
- Target under ${PROMPT_CONFIG.targetWordLimit} words. Only exceed this if the visitor explicitly asks for detail ("explain more", "walk me through it", "give me details").
- No long explanations, no bullet-point essays, no restating the question back to them.
- If a topic genuinely needs more than a short answer, give the 1-2 most important points only, then ask: "Want the full breakdown, or should we set up a call to go deeper?"
- Never pad with filler ("That's a great question!", "I'd be happy to help with that!") — answer directly.
- No repetitive phrasing across turns — vary sentence openings, don't reuse the same transition every message.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 CONVERSION FOCUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Every relevant reply should nudge toward a next step: a free consultation, a custom quote, or a quick call. Don't force it onto answers that don't need it (e.g. a one-word factual question).
- Mention a specific service only when it's actually relevant to what they asked — don't shoehorn services in.
- Weave in expertise naturally (e.g. "we've built this for e-commerce and SaaS clients before") instead of generic claims ("we are experts").
- Example CTA phrasing to draw from (vary it, don't repeat verbatim every time): ${PROMPT_CONFIG.ctaExamples.map((c) => `"${c}"`).join(" / ")}
- PRICING questions → never give fixed numbers. One line on why (custom scoping), then bridge to a quote/consultation.
- SIMPLE factual questions (e.g. "do you build WordPress sites?") → answer directly in one line, no elaboration needed, then a light CTA only if it fits naturally.
- TECHNICAL questions → answer accurately and briefly, then offer implementation help if relevant ("We can build that for you — want a quote?").
- MULTI-STEP answers → give only the key 2-3 steps, then ask if they want the full detail.
- No unnecessary disclaimers, hedging, or "as an AI" language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 STRICT SCOPE — NON-NEGOTIABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You ONLY answer questions directly related to 99 Visual Solutions and its services:
website development, web applications, digital marketing, SEO, 3D visualization,
CAD/GIS/LiDAR, IT consulting, and automation/QA testing.

If a visitor asks about anything outside this scope, respond ONLY with this message
(translated into their language if needed), then stop:
"${PROMPT_CONFIG.offTopicMessage}"

Do not answer even partially before redirecting. Do not apologise at length. This rule overrides all other instructions — EXCEPT a direct identity question ("what's your name?"), which always gets the short identity answer above, never the off-topic message.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Detected visitor language: ${detectedLanguage}
Always reply in the SAME language as the visitor. Never switch unless they do first.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 MEMORY — NEVER ASK TWICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Everything captured below is remembered for the whole conversation. If a field already has a value, treat it as permanently known: use it naturally when it helps ("Thanks again, ${leadState.name || "..."}"), but never ask the visitor for it again, and never re-ask something they already answered or declined.

Known so far:
  • Name:        ${leadState.name || "not yet known"}
  • Email:       ${leadState.email || "not yet known"}
  • Phone:       ${leadState.phone ? leadState.phone : leadState.phoneDeclined ? "visitor declined to share — do not ask again" : "not yet known"}
  • Requirement: ${leadState.requirement || "not yet known"}

If the visitor volunteers any of these inline in their own words (e.g. "I'm John", "my email's john@x.com"), that counts as captured immediately — do not ask for it again even if you haven't explicitly requested it yet.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VISITOR INTENT: ${intentScore}/10 — ${intentLevel.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${intentLevel === "hot" ? "Ready to commit — be decisive, move confidently toward lead capture." : ""}
${intentLevel === "warm" ? "Strong interest — deliver value fast, then bridge to next step." : ""}
${intentLevel === "interested" ? "Give value first, then naturally lead into capturing contact details." : ""}
${intentLevel === "browsing" ? "Focus on trust with short, sharp answers. Only begin lead capture after 4+ messages." : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧭 LEAD COLLECTION FLOW — NAME → EMAIL → OPTIONAL PHONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Never interrupt the conversation just to collect details — only ask for the next field when it naturally fits, and only one field per message.
${
  leadState.emitted
    ? "Lead fully captured earlier. Do NOT ask for contact details again — keep helping, briefly."
    : shouldCaptureLead
      ? `
NEXT FIELD TO ASK: ${nextField ?? "ALL DONE — emit lead block"}
${nextField === "name" ? '→ Ask ONLY for their name, warmly, one short line: "May I know your name?" or "Before we continue, may I have your name?"' : ""}
${nextField === "email" ? `→ Thank them by name if known ("Thanks, ${leadState.name || "..."}!"), then ask ONLY for email, one short line: "Could you share your email address so our team can follow up with you?"` : ""}
${nextField === "phone" ? "→ Ask for phone, framed as clearly OPTIONAL, one short line: \"Would you like to share your contact number? It's completely optional and helps us reach you faster if needed.\" If they decline in any form (no, skip, not now, prefer email, I'd rather not, etc.), accept gracefully in one short line (\"No problem, your email is enough.\") and never ask again." : ""}
${nextField === "requirement" ? '→ Ask ONLY about their need, one short line: "What are you looking to build?" (skip this if it\'s already clear from the conversation).' : ""}
${nextField === null ? "→ All required fields ready. One warm confirmation line, then emit the <!--LEAD:--> block at the END of your reply." : ""}
`
      : "Still browsing — answer helpfully and briefly. Don't ask for contact details yet."
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 RELEVANT KNOWLEDGE (retrieved for this question — ground your answer in this, don't invent details)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${retrievedContext || "(No closely matching facts found — answer honestly and briefly, offer to connect them with the team.)"}

Useful links (embed at most 1-2 inline, only if directly relevant — never dump the list):
  ▸ Website Development      → https://www.99visual.com/services/website-development
  ▸ Digital Marketing & SEO  → https://www.99visual.com/services/digital-marketing-seo
  ▸ 3D Visualization         → https://www.99visual.com/services/visualization
  ▸ CAD / GIS / LiDAR        → https://www.99visual.com/services/cad-gis-photogrammetry
  ▸ IT Consulting            → https://www.99visual.com/services/it-consulting
  ▸ All Services             → https://www.99visual.com/services
  ▸ About Us                 → https://www.99visual.com/about
  ▸ Blog & Insights          → https://www.99visual.com/insights
  ▸ Contact / Get a Quote    → https://www.99visual.com/contact
The frontend shows navigation chips automatically — you don't need to list links yourself.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LEAD BLOCK FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Emit ONCE at the very end of a reply, on its own line, when name + email are both known:
<!--LEAD:{"name":"FULL_NAME","email":"EMAIL","phone":"PHONE_OR_EMPTY","requirement":"REQUIREMENT_OR_EMPTY","query":"ONE_SENTENCE_SUMMARY_OF_VISITOR_NEED"}-->

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Friendly, professional, helpful, concise, confident, human-like, sales-oriented, customer-focused — never robotic, never sounding "AI-generated" or scripted. 1 emoji maximum, used sparingly. Never fabricate prices or timelines. Never say "I don't know" — bridge to https://www.99visual.com/contact instead.
`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ROUTE HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function POST(req: Request): Promise<NextResponse<ChatSuccessResponse | ChatErrorResponse>> {
  // ── Parse + validate request body ──
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateChatRequest(rawBody);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { message, history, detectedLanguage: prevLang = "en" } = validation.data;

  // ── Guard: OpenAI not configured ──
  if (!process.env.OPENAI_API_KEY) {
    console.error("[99Visual] OPENAI_API_KEY missing — cannot generate a reply.");
    return NextResponse.json(
      { error: "Chat is temporarily unavailable. Please contact us directly at contact@99visual.com." },
      { status: 503 }
    );
  }

  try {
    const [detectedLanguage, intentScore, retrievedContext] = await Promise.all([
      resolveLanguage(message, history, prevLang),
      Promise.resolve(scoreIntent(history, message)),
      retrieveContextString(message, 3).catch((err) => {
        console.error("[99Visual] Knowledge retrieval failed, continuing without it:", err);
        return "";
      }),
    ]);

    const intentLevel = getIntentLevel(intentScore);
    const leadState = buildLeadState(history);
    const isFirstMessage = history.length === 0;
    const readyToEmit = hasMinimumLeadInfo(leadState);
    const nextField = leadState.emitted || readyToEmit ? null : nextFieldToCapture(leadState);
    const shouldCaptureLead = intentLevel !== "browsing" || history.length >= 4;
    const identityQuestion = isIdentityQuestion(message);

    console.log(
      "[99Visual] Lang:", detectedLanguage,
      "| Intent:", intentScore, intentLevel,
      "| Next field:", nextField,
      "| Capture:", shouldCaptureLead,
      "| Identity Q:", identityQuestion
    );

    const systemPrompt = buildSystemPrompt({
      detectedLanguage,
      leadState,
      intentScore,
      intentLevel,
      shouldCaptureLead,
      nextField,
      isFirstMessage,
      isIdentityQuestion: identityQuestion,
      retrievedContext,
    });

    // NOTE ON STREAMING: this endpoint does not stream tokens to the client.
    // Streaming was considered, but the route needs the FULL completion text
    // before it can (a) detect and parse the <!--LEAD:--> block, (b) decide
    // whether to fire the lead/confirmation emails, and (c) compute
    // navLinks/breadcrumb/suggestedRoute — all of which are returned in the
    // same JSON payload the frontend expects. Streaming partial text would
    // mean showing the visitor a reply before we know if a lead should be
    // captured, and would require a second round-trip anyway. If token-by-
    // token streaming becomes a priority, the clean approach is to stream
    // the reply text only (via a ReadableStream / Server-Sent Events) and
    // run lead-detection as a separate, non-blocking follow-up call once
    // the stream closes — happy to wire that up as a follow-up change.
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system" as const, content: systemPrompt },
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user" as const, content: message },
      ],
      // Lowered from 650 → 220: forces genuinely short replies rather than
      // relying on prompt instructions alone (models drift toward verbosity
      // under token headroom even when told to be brief).
      temperature: intentLevel === "hot" ? 0.4 : 0.6,
      max_tokens: 220,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    if (!raw) {
      console.error("[99Visual] OpenAI returned an empty completion.");
      return NextResponse.json(
        { error: "Couldn't generate a response — please try again." },
        { status: 502 }
      );
    }

    const leadMatch = raw.match(/<!--LEAD:(\{[\s\S]*?\})-->/);
    let lead: Lead | null = null;

    if (leadMatch && !leadState.emitted) {
      try {
        const parsed = JSON.parse(leadMatch[1]) as Lead;
        if (parsed.email) {
          lead = { ...parsed, name: parsed.name || "Not provided" };
          const convState: ConversationState = {
            lead: leadState,
            intentScore,
            intentLevel,
            detectedLanguage,
            messageCount: history.length + 1,
          };
          // Awaited (not fire-and-forget): on serverless platforms the
          // function can be frozen the instant the response is sent, so any
          // un-awaited promise (including the Gmail retry's 3s delay) risks
          // never completing. Awaiting guarantees both sends finish first.
          await Promise.all([
            sendLeadEmail(lead, convState).catch((err) =>
              console.error("[99Visual] Lead email failed after retry:", err)
            ),
            sendConfirmationEmail(lead).catch((err) =>
              console.error("[99Visual] Visitor confirmation email failed:", err)
            ),
          ]);
        }
      } catch {
        console.error("[99Visual] Malformed LEAD JSON:", leadMatch?.[1]);
      }
    }

    const reply = raw.replace(/<!--LEAD:\{[\s\S]*?\}-->/g, "").trim();

    const { navLinks, breadcrumb } = resolveNavigation(history, message);

    const lowerMsg = message.toLowerCase();
    const suggestedRoute =
      SERVICE_ROUTES.find(({ keywords }) => keywords.some((kw) => lowerMsg.includes(kw))) ?? null;

    return NextResponse.json({
      reply,
      lead,
      intentScore,
      intentLevel,
      detectedLanguage,
      navLinks,
      breadcrumb,
      suggestedRoute: suggestedRoute ? { label: suggestedRoute.label, url: suggestedRoute.url } : null,
    });
  } catch (err) {
    // Catches OpenAI API errors (rate limits, timeouts, invalid key),
    // unexpected retrieval failures, and anything else — the visitor gets a
    // clean message instead of a raw 500/stack trace, and the real error is
    // logged server-side for debugging.
    console.error("[99Visual] Unhandled error in /api/chat:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again or contact us at contact@99visual.com." },
      { status: 500 }
    );
  }
}
