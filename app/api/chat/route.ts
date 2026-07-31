import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { retrieveContextString } from "@/lib/retrieve"; // ← NEW: RAG retrieval

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

// ═══════════════════════════════════════════════════════════════════════════════
// MAIL PROVIDERS — split by purpose
// ═══════════════════════════════════════════════════════════════════════════════
// Internal lead notification (→ your team's inbox) goes through Gmail via
// nodemailer, so leads land directly in your existing Gmail — searchable,
// familiar, no extra dashboard to check.
//
// Visitor-facing confirmation email goes through Resend instead, because
// sending cold outbound mail to addresses you've never emailed before from
// a personal Gmail account risks spam-folder placement / rate limits.
// Resend is built for exactly this and keeps your Gmail account's sending
// reputation clean.
//
// Required env vars (Vercel → Settings → Environment Variables):
//   EMAIL_USER, EMAIL_PASS  — Gmail address + App Password (internal notification)
//   LEAD_EMAIL              — inbox that receives lead notifications (usually = EMAIL_USER)
//   RESEND_API_KEY          — from resend.com dashboard
//   RESEND_FROM             — verified sender, e.g. "Vera @ 99 Visual <vera@99visual.com>"

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

if (!gmailTransporter) {
  console.error(
    "[99Visual] EMAIL_USER/EMAIL_PASS not set — internal lead notifications will be skipped."
  );
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

if (!resend) {
  console.error(
    "[99Visual] RESEND_API_KEY not set — visitor confirmation emails will be skipped."
  );
}

function intentBadge(level: IntentLevel): string {
  return {
    browsing: "🔵 Browsing",
    interested: "🟡 Interested",
    warm: "🟠 Warm Lead",
    hot: "🔴 HOT — Act Now",
  }[level];
}

async function sendLeadEmail(lead: Lead, state: ConversationState): Promise<void> {
  if (!gmailTransporter) {
    console.error("[99Visual] Skipping lead email — EMAIL_USER/EMAIL_PASS not configured.");
    return;
  }

  const fromAddress = process.env.EMAIL_USER;
  const toAddress = process.env.LEAD_EMAIL || process.env.EMAIL_USER;

  if (!toAddress) {
    console.error(
      "[99Visual] Skipping lead email — no destination address. Set LEAD_EMAIL in Vercel."
    );
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
        <h2 style="color:#fff;margin:8px 0 2px;font-size:20px;font-weight:700;">New Lead — Vera AI Assistant</h2>
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
      <tr><td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💼 Requirement</td><td style="padding:12px 16px;color:#0f172a;">${lead.requirement || "Not specified"}</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💬 Original Query</td><td style="padding:12px 16px;color:#475569;font-style:italic;">"${lead.query || "—"}"</td></tr>
      <tr><td style="padding:12px 16px;color:#64748b;font-weight:600;">🌐 Language</td><td style="padding:12px 16px;color:#0f172a;">${state.detectedLanguage.toUpperCase()}</td></tr>
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
    <p style="color:#94a3b8;font-size:12px;margin:0;">🕐 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST · Vera AI · 99visual.com</p>
  </div>
</div>`;

  const payload = {
    from: `"99 Visual AI — Vera" <${fromAddress}>`,
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

// NEW: confirmation email sent TO THE VISITOR the moment their email is
// captured, separate from the internal notification sent to the team
// (sendLeadEmail above, which goes to LEAD_EMAIL). Uses the same
// transporter/fromAddress. Failure here is logged but never blocks or
// retries as aggressively — a missed confirmation is much lower stakes
// than a missed internal lead notification.
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
      <a href="https://www.99visual.com/portfolio" style="color:#f97316;font-weight:600;text-decoration:none;">portfolio</a>
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
  } catch {
    return "en";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEAD STATE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/;

const REQUIREMENT_TRIGGERS = [
  "require", "project", "describe", "briefly", "looking to build",
  "achieve", "working on", "tell me more", "what do you need",
  "what are you", "goal", "help you with",
];

function buildLeadState(history: HistoryMessage[]): LeadState {
  const state: LeadState = {
    email: "",
    name: "",
    phone: "",
    requirement: "",
    capturedFields: new Set(),
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
        } catch { /* ignore */ }
      }
    }
  }

  if (state.emitted) return state;

  for (let i = 0; i < history.length - 1; i++) {
    const asst = history[i];
    const user = history[i + 1];
    if (asst.role !== "assistant" || user?.role !== "user") continue;

    const aLower = asst.content.toLowerCase();
    const uText = user.content.trim();

    if (!state.email && aLower.includes("email")) {
      const match = uText.match(EMAIL_RE);
      if (match) { state.email = match[0]; state.capturedFields.add("email"); }
    }
    if (!state.email) {
      const match = uText.match(EMAIL_RE);
      if (match) { state.email = match[0]; state.capturedFields.add("email"); }
    }
    if (!state.name && state.email) {
      const wordCount = uText.trim().split(/\s+/).length;
      const looksLikeName =
        uText.length < 60 &&
        wordCount <= 4 &&
        !EMAIL_RE.test(uText) &&
        !PHONE_RE.test(uText) &&
        /^[a-zA-Z\s''\-\.À-ÖØ-öø-ÿ\u0900-\u097F\u0600-\u06FF]+$/.test(uText);
      if (looksLikeName) { state.name = uText; state.capturedFields.add("name"); }
    }
    if (!state.phone && aLower.includes("phone")) {
      const match = uText.match(PHONE_RE);
      if (match) {
        state.phone = match[0];
        state.capturedFields.add("phone");
      } else if (/skip|no|later|don'?t|not (now|yet)|prefer not/i.test(uText)) {
        state.phone = "";
        state.capturedFields.add("phone");
      }
    }
    if (
      !state.requirement &&
      state.capturedFields.has("email") &&
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

function nextFieldToCapture(
  lead: LeadState
): "email" | "name" | "phone" | "requirement" | null {
  // Only email + name are REQUIRED to consider the lead "ready" — this matches
  // the actual condition sendLeadEmail() checks. Phone and requirement are
  // nice-to-have and asked opportunistically, but must never block sending.
  if (!lead.capturedFields.has("email")) return "email";
  if (!lead.capturedFields.has("name")) return "name";
  if (!lead.capturedFields.has("phone")) return "phone";
  if (!lead.capturedFields.has("requirement")) return "requirement";
  return null;
}

// Returns true once the ONE truly essential field (email) is captured.
// Name/phone/requirement are valuable but must never block sending a notification —
// an email alone is enough for you to follow up.
function hasMinimumLeadInfo(lead: LeadState): boolean {
  return lead.capturedFields.has("email");
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
  { keywords: ["portfolio", "work", "projects", "case study", "examples", "clients", "past work", "sample"], link: { label: "Portfolio", url: "https://www.99visual.com/portfolio", category: "internal", icon: "🖼️", description: "See our past projects" } },
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
  { keywords: ["portfolio", "work", "projects", "case study", "examples"], trail: [{ label: "Home", url: "https://www.99visual.com/", category: "breadcrumb" }, { label: "Portfolio", url: "https://www.99visual.com/portfolio", category: "breadcrumb" }] },
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
// MAIN ROUTE HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function POST(req: Request) {
  const {
    message,
    history = [],
    detectedLanguage: prevLang = "en",
  }: { message: string; history: HistoryMessage[]; detectedLanguage?: string } =
    await req.json();

  // ── NEW: retrieve relevant knowledge chunks for this specific message ──
  // Runs in parallel with language/intent detection to avoid adding latency.
  const [detectedLanguage, intentScore, retrievedContext] = await Promise.all([
    resolveLanguage(message, history, prevLang),
    Promise.resolve(scoreIntent(history, message)),
    retrieveContextString(message, 3),
  ]);

  const intentLevel = getIntentLevel(intentScore);
  const leadState = buildLeadState(history);
  const isFirstMessage = history.length === 0;
  const readyToEmit = hasMinimumLeadInfo(leadState);
  const nextField = leadState.emitted || readyToEmit ? null : nextFieldToCapture(leadState);
  const shouldCaptureLead = intentLevel !== "browsing" || history.length >= 4;

  console.log(
    "[99Visual] Lang:", detectedLanguage,
    "| Intent:", intentScore, intentLevel,
    "| Next field:", nextField,
    "| Capture:", shouldCaptureLead,
    "| Retrieved chunks:\n", retrievedContext
  );

  const visitorFirstName = leadState.name ? leadState.name.split(/\s+/)[0] : null;
  const nameUsageCount = history.filter(
    (m) => m.role === "assistant" && visitorFirstName && m.content.includes(visitorFirstName)
  ).length;

  const systemPrompt = `
You are Vera — the intelligent AI business assistant for 99 Visual Solutions, a full-service IT and digital transformation company in Bengaluru, India serving global clients.

Your goal: provide genuine expert value and, when appropriate, convert interested visitors into qualified leads by collecting their contact details naturally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 STRICT SCOPE — NON-NEGOTIABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You ONLY answer questions directly related to 99 Visual Solutions and its services:
website development, web applications, digital marketing, SEO, 3D visualization,
CAD/GIS/LiDAR, IT consulting, and automation/QA testing.

If a visitor asks about ANYTHING outside this scope — including but not limited to:
restaurants, food, pizza, travel, places, weather, sports, news, general knowledge,
jokes, math, other companies, personal advice, coding tutorials unrelated to our
services, or ANY topic not directly about 99 Visual Solutions — you MUST respond
ONLY with this exact message (translated into their language if needed):

"I'm Vera, 99 Visual's assistant — I'm only able to help with questions about our
services like web development, digital marketing, 3D visualization, and more.
Is there something I can help you with on that front? 😊"

CRITICAL RULES:
- Do NOT attempt to be helpful on off-topic questions under any circumstances.
- Do NOT answer even partially before redirecting.
- Do NOT suggest other resources or places to find the answer.
- Do NOT apologise at length — just redirect warmly and immediately.
- This rule overrides all other instructions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Detected visitor language: ${detectedLanguage}
Always reply in the SAME language as the visitor. Never switch unless they do first.
When redirecting off-topic questions, translate the redirect message into their language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 CRITICAL: HOW TO USE THE VISITOR'S NAME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${leadState.name
  ? `The visitor's name is known (for internal use only): ${leadState.name}

STRICT RULES — violations make the conversation feel robotic and pushy:
1. Do NOT address the visitor by name in your reply.
2. Do NOT use their name to open or close a sentence.
3. Do NOT say things like "Great, ${leadState.name}!" or "Thanks, ${leadState.name}!".
4. Their name has already been used ${nameUsageCount} time(s) in this conversation. Use it AT MOST once more across the ENTIRE conversation, and only if it flows completely naturally. If in doubt, omit it entirely.
5. The name exists so the team knows who they're talking to. It is NOT a conversational tool.`
  : "The visitor's name is not yet known. Do not reference it."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VISITOR INTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Intent score: ${intentScore}/10 — Level: ${intentLevel.toUpperCase()}
${intentLevel === "hot" ? "🔴 HOT: Visitor is ready to commit. Be decisive, move to lead capture confidently." : ""}
${intentLevel === "warm" ? "🟠 WARM: Strong interest. Provide value and gently bridge to next step." : ""}
${intentLevel === "interested" ? "🟡 INTERESTED: Provide value first, then naturally lead into capturing contact details." : ""}
${intentLevel === "browsing" ? "🔵 BROWSING: Focus on education and trust. Only begin lead capture after 4+ messages." : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 LEAD STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${leadState.emitted
  ? "✅ LEAD FULLY CAPTURED. Do NOT ask for any contact details again. Continue helping naturally."
  : shouldCaptureLead
    ? `
Fields collected so far:
  Email:       ${leadState.email || "Not yet"}
  Name:        ${leadState.name || "Not yet"}
  Phone:       ${leadState.phone || "Not yet"}
  Requirement: ${leadState.requirement || "Not yet"}

NEXT FIELD TO COLLECT: ${nextField ?? "ALL DONE — emit lead block"}
${nextField === "email" ? '→ Ask ONLY for their email. Keep it casual: "What\'s the best email to send details to?"' : ""}
${nextField === "name" ? '→ Ask ONLY for their name. Keep it short: "And who am I speaking with?"' : ""}
${nextField === "phone" ? '→ Ask for phone (optional): "A phone number? No worries if you\'d rather skip it."' : ""}
${nextField === "requirement" ? '→ Ask for their requirement: "What are you looking to build or achieve? Just a quick overview is fine."' : ""}
${nextField === null ? "→ All fields ready. Confirm warmly (without using their name unnecessarily) and emit the <!--LEAD:--> block at the END of your reply." : ""}
`
    : "⏳ Visitor is still browsing — answer their question helpfully. Do not ask for contact details yet."
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 RELEVANT COMPANY KNOWLEDGE (retrieved for this specific question)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${isFirstMessage
  ? "FIRST MESSAGE: Greet warmly as Vera. Ask what brings them here. Do NOT ask for contact details yet."
  : "CONTINUING CONVERSATION: Do NOT re-greet. Pick up naturally where the conversation left off."
}

The following facts were retrieved from 99 Visual's knowledge base as the most
relevant to what the visitor just asked. Base your answer on these facts —
do not invent details that aren't here:

${retrievedContext || "(No closely matching facts were found — answer generally and honestly, and offer to connect them with the team for specifics.)"}

Useful links to embed inline when relevant (never dump all at once):
  ▸ Website Development      → https://www.99visual.com/services/website-development
  ▸ Digital Marketing & SEO  → https://www.99visual.com/services/digital-marketing-seo
  ▸ 3D Visualization         → https://www.99visual.com/services/visualization
  ▸ CAD / GIS / LiDAR        → https://www.99visual.com/services/cad-gis-photogrammetry
  ▸ IT Consulting            → https://www.99visual.com/services/it-consulting
  ▸ All Services             → https://www.99visual.com/services
  ▸ Portfolio / Case Studies → https://www.99visual.com/portfolio
  ▸ About Us                 → https://www.99visual.com/about
  ▸ Blog & Insights          → https://www.99visual.com/blog
  ▸ Contact / Get a Quote    → https://www.99visual.com/contact

LINK RULES:
- Only link pages directly relevant to what the visitor just asked about.
- Never list more than 2 links in a single reply — quality over quantity.
- The frontend will automatically show page navigation chips below your reply; you do not need to list all links yourself.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 RESPONSE GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- PRICING → Never give fixed numbers. Explain custom scoping. Naturally bridge to lead capture.
- PROJECT/HIRE → Validate enthusiasm, describe relevant service, capture lead.
- TIMELINE → Use the retrieved timeline facts above. Always qualify with a discovery call.
- TECH QUESTIONS → Answer confidently (React, Next.js, WordPress, Python, AWS, etc). Position as experts.
- PORTFOLIO → https://www.99visual.com/portfolio — mention cross-industry experience.
- SUPPORT → Empathise, direct to https://www.99visual.com/contact.
- UNCLEAR → Ask ONE smart clarifying question only.
- If the retrieved knowledge above doesn't cover the question, say so honestly rather than guessing — offer to connect them with the team.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LEAD BLOCK FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Emit ONCE at the very end of a reply, on its own line, when name + email are both known:
<!--LEAD:{"name":"FULL_NAME","email":"EMAIL","phone":"PHONE_OR_EMPTY","requirement":"REQUIREMENT_OR_EMPTY","query":"ONE_SENTENCE_SUMMARY_OF_VISITOR_NEED"}-->

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TONE & STYLE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Warm, expert, human — never robotic or sales-y
- Max 3–4 short paragraphs per reply
- ONE question per message maximum
- 1–2 emojis maximum
- End with a clear, low-friction next step
- NEVER fabricate prices or timelines
- NEVER say "I don't know" — bridge to https://www.99visual.com/contact
- Make every visitor feel heard and valued
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system" as const, content: systemPrompt },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: "user" as const, content: message },
    ],
    temperature: intentLevel === "hot" ? 0.4 : 0.6,
    max_tokens: 650,
  });

  const raw = completion.choices[0].message.content ?? "";

  const leadMatch = raw.match(/<!--LEAD:(\{[\s\S]*?\})-->/);
  let lead: Lead | null = null;

  // ── TEMPORARY DEBUG LOGGING — remove once issue is resolved ──
  console.log("[99Visual DEBUG] leadState.capturedFields:", Array.from(leadState.capturedFields));
  console.log("[99Visual DEBUG] leadState.emitted:", leadState.emitted);
  console.log("[99Visual DEBUG] nextField:", nextField);
  console.log("[99Visual DEBUG] Did AI emit a LEAD block?", !!leadMatch);
  console.log("[99Visual DEBUG] Raw AI reply (last 200 chars):", raw.slice(-200));

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
        sendLeadEmail(lead, convState).catch((err) =>
          console.error("[99Visual] Lead email failed after retry:", err)
        );
        sendConfirmationEmail(lead).catch((err) =>
          console.error("[99Visual] Visitor confirmation email failed:", err)
        );
      }
    } catch {
      console.error("[99Visual] Malformed LEAD JSON:", leadMatch?.[1]);
    }
  }

  const reply = raw.replace(/<!--LEAD:\{[\s\S]*?\}-->/g, "").trim();

  const { navLinks, breadcrumb } = resolveNavigation(history, message);

  const lowerMsg = message.toLowerCase();
  const suggestedRoute =
    SERVICE_ROUTES.find(({ keywords }) =>
      keywords.some((kw) => lowerMsg.includes(kw))
    ) ?? null;

  return NextResponse.json({
    reply,
    lead,
    intentScore,
    intentLevel,
    detectedLanguage,
    navLinks,
    breadcrumb,
    suggestedRoute: suggestedRoute
      ? { label: suggestedRoute.label, url: suggestedRoute.url }
      : null,
  });
}