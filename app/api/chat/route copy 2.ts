import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import nodemailer from "nodemailer";

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

/** Structured lead state tracked entirely in server-side code */
type LeadState = {
  email: string;
  name: string;
  phone: string;
  requirement: string;
  capturedFields: Set<"email" | "name" | "phone" | "requirement">;
  emitted: boolean;
};

/**
 * Intent score:
 *  0–2  = browsing / curious
 *  3–5  = interested
 *  6–8  = warm lead
 *  9–10 = hot — ready to buy
 */
type IntentScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type IntentLevel = "browsing" | "interested" | "warm" | "hot";

type ConversationState = {
  lead: LeadState;
  intentScore: IntentScore;
  intentLevel: IntentLevel;
  detectedLanguage: string; // BCP-47 tag e.g. "en", "hi", "ar", "fr"
  messageCount: number;
};

// ═══════════════════════════════════════════════════════════════════════════════
// NODEMAILER
// ═══════════════════════════════════════════════════════════════════════════════

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

function intentBadge(level: IntentLevel): string {
  return (
    { browsing: "🔵 Browsing", interested: "🟡 Interested", warm: "🟠 Warm Lead", hot: "🔴 HOT — Act Now" }[level]
  );
}

async function sendLeadEmail(lead: Lead, state: ConversationState): Promise<void> {
  const badge = intentBadge(state.intentLevel);
  await transporter.sendMail({
    from: `"99 Visual AI — Vera" <${process.env.SMTP_USER}>`,
    to: process.env.LEAD_EMAIL,
    subject: `${state.intentLevel === "hot" ? "🔴 HOT" : "🔥"} Lead [Score ${state.intentScore}/10]: ${lead.name} — ${lead.query ?? "Enquiry"}`,
    html: `
<div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 36px;">
    <table style="width:100%"><tr>
      <td>
        <div style="background:#f97316;border-radius:10px;display:inline-block;padding:8px 12px;font-size:20px;">🎯</div>
        <h2 style="color:#fff;margin:8px 0 2px;font-size:20px;font-weight:700;">New Lead — Vera AI Assistant</h2>
        <p style="color:#94a3b8;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">99 Visual Solutions</p>
      </td>
      <td style="text-align:right;vertical-align:top;">
        <div style="background:${state.intentLevel === "hot" ? "#dc2626" : state.intentLevel === "warm" ? "#ea580c" : state.intentLevel === "interested" ? "#ca8a04" : "#2563eb"};color:#fff;border-radius:20px;padding:6px 16px;font-size:13px;font-weight:700;display:inline-block;">${badge}</div>
        <div style="color:#64748b;font-size:12px;margin-top:6px;">Intent Score: <strong style="color:#f97316;">${state.intentScore}/10</strong></div>
      </td>
    </tr></table>
  </div>

  <!-- Lead Details -->
  <div style="padding:32px 36px;background:#fff;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;color:#64748b;font-weight:600;width:150px;border-radius:6px 0 0 6px;">👤 Name</td>
        <td style="padding:12px 16px;color:#0f172a;font-weight:700;font-size:16px;">${lead.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#64748b;font-weight:600;">📧 Email</td>
        <td style="padding:12px 16px;"><a href="mailto:${lead.email}" style="color:#f97316;font-weight:700;text-decoration:none;">${lead.email}</a></td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;color:#64748b;font-weight:600;">📱 Phone</td>
        <td style="padding:12px 16px;color:#0f172a;">${lead.phone || "Not provided"}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💼 Requirement</td>
        <td style="padding:12px 16px;color:#0f172a;">${lead.requirement || "Not specified"}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;color:#64748b;font-weight:600;vertical-align:top;">💬 Original Query</td>
        <td style="padding:12px 16px;color:#475569;font-style:italic;">"${lead.query || "—"}"</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#64748b;font-weight:600;">🌐 Language</td>
        <td style="padding:12px 16px;color:#0f172a;">${state.detectedLanguage.toUpperCase()}</td>
      </tr>
    </table>

    <!-- Intent Analysis -->
    <div style="margin-top:24px;padding:18px 20px;background:#f0fdf4;border:1px solid #86efac;border-radius:10px;">
      <p style="margin:0 0 8px;font-size:13px;color:#166534;font-weight:700;">📊 Intent Analysis</p>
      <div style="background:#dcfce7;border-radius:6px;height:10px;overflow:hidden;">
        <div style="background:${state.intentLevel === "hot" ? "#dc2626" : state.intentLevel === "warm" ? "#ea580c" : state.intentLevel === "interested" ? "#ca8a04" : "#2563eb"};height:100%;width:${state.intentScore * 10}%;transition:width .3s;"></div>
      </div>
      <p style="margin:8px 0 0;font-size:12px;color:#166534;">${state.intentScore}/10 — ${intentBadge(state.intentLevel)} · ${state.messageCount} messages exchanged</p>
    </div>

    <!-- Action CTA -->
    <div style="margin-top:16px;padding:16px 20px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;">
      <p style="margin:0;font-size:13px;color:#c2410c;font-weight:700;">⚡ Follow-up Priority: ${state.intentLevel === "hot" ? "IMMEDIATE" : state.intentLevel === "warm" ? "Within 4 hours" : "Within 24 hours"}</p>
      <p style="margin:6px 0 0;font-size:13px;color:#9a3412;">Reply to this email or call/WhatsApp the number above to close this lead.</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f1f5f9;padding:14px 36px;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">🕐 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST · Vera AI · 99visual.com</p>
  </div>
</div>`,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTENT SCORING ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

/** Keywords mapped to score weights */
const INTENT_SIGNALS: { pattern: RegExp; weight: number }[] = [
  // High-intent — ready to buy
  { pattern: /\b(hire|hire you|let's start|start (the )?project|ready to (start|go|begin)|how (do i|can i) (pay|get started)|sign(ing)? up|onboard|contract|proposal|get (a )?quote)\b/i, weight: 4 },
  // Pricing curiosity
  { pattern: /\b(price|pricing|cost|how much|budget|rate|package|plan|affordable|cheap|expensive|quote)\b/i, weight: 3 },
  // Project interest
  { pattern: /\b(build|develop|create|design|need (a|an)|want (a|an)|looking for|interested in|considering|thinking about)\b/i, weight: 2 },
  // Service research
  { pattern: /\b(website|web app|seo|marketing|3d|cad|gis|lidar|consulting|automation|testing|render|dashboard|portal)\b/i, weight: 1 },
  // Timeline urgency
  { pattern: /\b(urgent|asap|immediately|this week|this month|deadline|launch|soon|quickly)\b/i, weight: 2 },
  // Contact / demo
  { pattern: /\b(demo|call|meeting|schedule|book|discuss|talk to (someone|team)|contact)\b/i, weight: 2 },
  // Comparison shopping
  { pattern: /\b(compare|vs|alternative|better than|competitor|other (companies|agencies))\b/i, weight: 1 },
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

  // Clamp to 0–10
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

/**
 * Lightweight script-based language detector.
 * Falls back to OpenAI for ambiguous cases via a cheap single-token call.
 */
function detectLanguageHeuristic(text: string): string | null {
  if (/[\u0900-\u097F]/.test(text)) return "hi";     // Devanagari (Hindi)
  if (/[\u0600-\u06FF]/.test(text)) return "ar";     // Arabic
  if (/[\u0400-\u04FF]/.test(text)) return "ru";     // Cyrillic
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";     // Chinese
  if (/[\u3040-\u30FF]/.test(text)) return "ja";     // Japanese
  if (/[\uAC00-\uD7AF]/.test(text)) return "ko";     // Korean
  if (/[\u0E00-\u0E7F]/.test(text)) return "th";     // Thai
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";     // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";     // Telugu
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu";     // Gujarati

  // Latin-script language hints (simple keyword approach)
  const lower = text.toLowerCase();
  if (/\b(bonjour|merci|comment|je suis|nous|votre|vous)\b/.test(lower)) return "fr";
  if (/\b(hola|gracias|cómo|necesito|quiero|tengo|español)\b/.test(lower)) return "es";
  if (/\b(hallo|danke|ich|wir|bitte|möchte|können)\b/.test(lower)) return "de";
  if (/\b(ciao|grazie|come|voglio|sono|italiano)\b/.test(lower)) return "it";
  if (/\b(olá|obrigado|como|quero|preciso|português)\b/.test(lower)) return "pt";
  if (/\b(مرحبا|شكرا|كيف|أريد|نعم)\b/.test(lower)) return "ar";

  return null; // Unknown — will fall back to "en"
}

async function resolveLanguage(
  currentMessage: string,
  history: HistoryMessage[],
  previouslyDetected: string
): Promise<string> {
  // If we already detected a non-English language, keep it
  if (previouslyDetected && previouslyDetected !== "en") return previouslyDetected;

  const heuristic = detectLanguageHeuristic(currentMessage);
  if (heuristic) return heuristic;

  // All user messages combined for better signal
  const allUser = history
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ") + " " + currentMessage;

  // Only run the cheap API call if text is non-trivially long
  if (allUser.trim().length < 12) return "en";

  try {
    const langCheck = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'Detect the language of the text and reply with ONLY the BCP-47 language tag (e.g. "en", "hi", "ar", "fr", "es"). Nothing else.',
        },
        { role: "user", content: allUser.slice(0, 400) },
      ],
      max_tokens: 5,
      temperature: 0,
    });
    return langCheck.choices[0].message.content?.trim().toLowerCase() ?? "en";
  } catch {
    return "en";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEAD STATE MANAGER (server-side, no LLM dependency)
// ═══════════════════════════════════════════════════════════════════════════════

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/;

function buildLeadState(history: HistoryMessage[]): LeadState {
  const state: LeadState = {
    email: "",
    name: "",
    phone: "",
    requirement: "",
    capturedFields: new Set(),
    emitted: false,
  };

  // Check if lead was already emitted
  for (const m of history) {
    if (m.role === "assistant" && /<!--LEAD:[\s\S]*?-->/.test(m.content)) {
      const match = m.content.match(/<!--LEAD:([\s\S]*?)-->/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]) as Lead;
          state.email       = parsed.email       || "";
          state.name        = parsed.name        || "";
          state.phone       = parsed.phone       || "";
          state.requirement = parsed.requirement || "";
          if (state.email) state.capturedFields.add("email");
          if (state.name)  state.capturedFields.add("name");
          if (state.phone) state.capturedFields.add("phone");
          if (state.requirement) state.capturedFields.add("requirement");
          state.emitted = true;
        } catch { /* ignore */ }
      }
    }
  }

  if (state.emitted) return state;

  // Scan history: when assistant asked for a field, capture next user reply
  for (let i = 0; i < history.length - 1; i++) {
    const asst = history[i];
    const user = history[i + 1];
    if (asst.role !== "assistant" || user?.role !== "user") continue;

    const aLower = asst.content.toLowerCase();
    const uText  = user.content.trim();

    // Email — validate with regex
    if (!state.email && aLower.includes("email")) {
      const match = uText.match(EMAIL_RE);
      if (match) {
        state.email = match[0];
        state.capturedFields.add("email");
      }
    }

    // Name — only after email is captured, and message looks like a name
    if (!state.name && state.email && aLower.includes("name")) {
      const looksLikeName =
        uText.length < 60 &&
        !EMAIL_RE.test(uText) &&
        !PHONE_RE.test(uText) &&
        /^[a-zA-Z\s''\-\.À-ÖØ-öø-ÿ\u0900-\u097F]+$/.test(uText);
      if (looksLikeName) {
        state.name = uText;
        state.capturedFields.add("name");
      }
    }

    // Phone
    if (!state.phone && aLower.includes("phone")) {
      const match = uText.match(PHONE_RE);
      if (match) {
        state.phone = match[0];
        state.capturedFields.add("phone");
      } else if (/skip|no|later|don'?t|not (now|yet)/i.test(uText)) {
        state.capturedFields.add("phone"); // skipped
      }
    }

    // Requirement — free text after phone step
    if (
      !state.requirement &&
      state.capturedFields.has("phone") &&
      (aLower.includes("require") || aLower.includes("project") || aLower.includes("describe") || aLower.includes("briefly"))
    ) {
      if (uText.length > 5) {
        state.requirement = uText;
        state.capturedFields.add("requirement");
      }
    }
  }

  return state;
}

/** Returns the next field to ask for, or null if all captured */
function nextFieldToCapture(
  lead: LeadState
): "email" | "name" | "phone" | "requirement" | null {
  if (!lead.capturedFields.has("email"))       return "email";
  if (!lead.capturedFields.has("name"))        return "name";
  if (!lead.capturedFields.has("phone"))       return "phone";
  if (!lead.capturedFields.has("requirement")) return "requirement";
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

const SERVICE_ROUTES = [
  { keywords: ["website", "web dev", "landing page", "wordpress", "web design"],     label: "Website Development",    url: "https://99visual.com/services/web-development"  },
  { keywords: ["web app", "application", "portal", "dashboard", "saas", "software"], label: "Web Applications",       url: "https://99visual.com/services/web-applications" },
  { keywords: ["seo", "digital marketing", "google ranking", "ads", "ppc"],          label: "Digital Marketing & SEO",url: "https://99visual.com/services/seo"              },
  { keywords: ["3d", "visualization", "render", "architectural", "animation"],        label: "3D Visualization",       url: "https://99visual.com/services/3d-visualization" },
  { keywords: ["cad", "gis", "lidar", "photogrammetry", "mapping", "drafting"],      label: "CAD / GIS / LiDAR",      url: "https://99visual.com/services/cad-gis-lidar"    },
  { keywords: ["consulting", "it strategy", "advisory", "digital transformation"],   label: "IT Consulting",          url: "https://99visual.com/services/it-consulting"    },
  { keywords: ["automation", "testing", "qa", "quality assurance", "rpa"],           label: "Automation & Testing",   url: "https://99visual.com/services/automation"       },
] as const;

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

  // ── 1. Run all intelligence layers in parallel ─────────────────────────────
  const [detectedLanguage, intentScore] = await Promise.all([
    resolveLanguage(message, history, prevLang),
    Promise.resolve(scoreIntent(history, message)),
  ]);

  const intentLevel    = getIntentLevel(intentScore);
  const leadState      = buildLeadState(history);
  const isFirstMessage = history.length === 0;
  const nextField      = leadState.emitted ? null : nextFieldToCapture(leadState);
  const shouldCapture  = intentLevel !== "browsing" || nextField !== null;

  console.log("[99Visual] Lang:", detectedLanguage, "| Intent:", intentScore, intentLevel, "| Next field:", nextField);

  // ── 2. Build system prompt ──────────────────────────────────────────────────
  const systemPrompt = `
You are Vera — the intelligent AI business assistant for 99 Visual Solutions, a globally trusted IT and digital transformation company headquartered in India serving clients worldwide.

Your mission: understand every visitor deeply, provide genuine expert value, and convert interested visitors into qualified leads.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Detected visitor language: ${detectedLanguage}
ALWAYS reply in the same language as the visitor. If they write in Hindi, reply in Hindi. Arabic → Arabic. French → French. English → English. NEVER switch language unless the visitor does first.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VISITOR INTENT (computed server-side)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Intent score: ${intentScore}/10 — Level: ${intentLevel.toUpperCase()}
${intentLevel === "hot"        ? "🔴 HOT visitor — they are ready to commit. Move decisively to lead capture. Be confident and direct." : ""}
${intentLevel === "warm"       ? "🟠 WARM visitor — strong interest. Gently nudge toward next step and lead capture." : ""}
${intentLevel === "interested" ? "🟡 INTERESTED visitor — provide value first, then naturally transition to lead capture." : ""}
${intentLevel === "browsing"   ? "🔵 BROWSING visitor — focus on education and building trust. Don't push for details yet." : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 LEAD STATE (tracked server-side — trust this exactly)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${leadState.emitted
  ? "✅ LEAD FULLY CAPTURED AND SUBMITTED. Do NOT ask for any contact details again. Be helpful and answer follow-up questions."
  : `
Email:       ${leadState.email       || "❌ Not captured"}
Name:        ${leadState.name        || "❌ Not captured"}
Phone:       ${leadState.phone       || "❌ Not captured"}
Requirement: ${leadState.requirement || "❌ Not captured"}

NEXT FIELD TO COLLECT: ${nextField ?? "ALL DONE — emit lead block"}
${nextField === "email"       ? '→ Ask ONLY for their email address. Example: "Could I get your email so our team can follow up with you?"'                          : ""}
${nextField === "name"        ? '→ Ask ONLY for their full name. Example: "And your name, please?"'                                                                    : ""}
${nextField === "phone"       ? '→ Ask ONLY for phone (optional). Example: "A phone number? Feel free to skip if you prefer."'                                         : ""}
${nextField === "requirement" ? '→ Ask ONLY for their requirement. Example: "Could you briefly describe what you\'re looking to build or achieve?"'                     : ""}
${nextField === null          ? "→ All fields collected. Confirm details warmly and emit the <!--LEAD:--> block at the END of your reply."                              : ""}
`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 COMPANY KNOWLEDGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${isFirstMessage
  ? 'FIRST MESSAGE: Greet as Vera warmly. Ask what brings them here. No contact details yet. Example: "Hi there! 👋 I\'m Vera, 99 Visual\'s AI assistant. Whether you need a website, SEO, 3D renders, or tech consulting — I\'m here. What can I help you with today?"'
  : "CONTINUING: Do NOT re-greet. Continue naturally."
}

Services (always link when relevant):
▸ Website Development      → https://www.99visual.com/services/website-development
▸ Web Applications         → https://www.99visual.com/services/website-development
▸ Digital Marketing & SEO  → https://www.99visual.com/services/digital-marketing-seo
▸ 3D Visualization         → https://www.99visual.com/services/visualization
▸ CAD / GIS / LiDAR        → https://www.99visual.com/services/cad-gis-photogrammetry
▸ IT Consulting            → https://99visual.com/services/it-consulting
▸ Automation & Testing     → https://www.99visual.com/services/it-consulting
▸ Portfolio                → https://www.99visual.com/about
▸ Contact / Quote          → https://www.99visual.com/contact

Key differentiators: full-service team, global clients, competitive pricing, fast delivery, transparent communication.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 INTENT-BASED RESPONSE STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- PRICING → Never give fixed numbers. Explain custom scoping. Bridge to lead capture.
- PROJECT/HIRE → Validate enthusiasm, describe service, capture lead.
- TIMELINE → Simple sites: 1–3 wks, complex apps: 4–12+ wks. Always qualify with discovery call.
- TECH QUESTIONS → Answer confidently (React, Next.js, WordPress, Python, AWS etc). Position as experts.
- PORTFOLIO → https://99visual.com/portfolio — mention cross-industry experience.
- SUPPORT → Empathise, direct to https://99visual.com/contact.
- UNCLEAR → ONE smart clarifying question only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LEAD BLOCK FORMAT (emit ONCE when name + email both known)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After your human reply, on its own line:
<!--LEAD:{"name":"FULL_NAME","email":"EMAIL","phone":"PHONE_OR_EMPTY","requirement":"REQUIREMENT_OR_EMPTY","query":"ONE_SENTENCE_SUMMARY"}-->

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TONE & RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Warm, expert, human — never robotic
- Max 3–4 short paragraphs
- ONE question per message max
- 1–2 emojis max
- End with a clear next step
- NEVER fabricate prices or timelines
- NEVER say "I don't know" — bridge to https://99visual.com/contact
- Make every visitor feel heard, valued, and excited to work with 99 Visual
`;

  // ── 3. Call OpenAI ──────────────────────────────────────────────────────────
  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user" as const, content: message },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: intentLevel === "hot" ? 0.45 : 0.65, // more decisive for hot leads
    max_tokens: 700,
  });

  const raw = completion.choices[0].message.content ?? "";

  // ── 4. Parse lead block ─────────────────────────────────────────────────────
  const leadMatch = raw.match(/<!--LEAD:([\s\S]*?)-->/);
  let lead: Lead | null = null;

  if (leadMatch && !leadState.emitted) {
    try {
      const parsed = JSON.parse(leadMatch[1]) as Lead;
      if (parsed.email && parsed.name) {
        lead = parsed;
        const convState: ConversationState = {
          lead: leadState,
          intentScore,
          intentLevel,
          detectedLanguage,
          messageCount: history.length + 1,
        };
        sendLeadEmail(lead, convState).catch((err) =>
          console.error("[99Visual] Lead email failed:", err)
        );
      }
    } catch {
      console.error("[99Visual] Malformed LEAD JSON:", leadMatch[1]);
    }
  }

  // Strip hidden block from visible reply
  const reply = raw.replace(/<!--LEAD:[\s\S]*?-->/g, "").trim();

  // ── 5. Service route suggestion ─────────────────────────────────────────────
  const lowerMsg = message.toLowerCase();
  const suggestedRoute =
    SERVICE_ROUTES.find(({ keywords }) =>
      keywords.some((kw) => lowerMsg.includes(kw))
    ) ?? null;

  // ── 6. Response ─────────────────────────────────────────────────────────────
  return NextResponse.json({
    reply,
    lead,
    intentScore,
    intentLevel,
    detectedLanguage,
    suggestedRoute: suggestedRoute
      ? { label: suggestedRoute.label, url: suggestedRoute.url }
      : null,
  });
}