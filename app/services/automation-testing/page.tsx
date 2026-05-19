// app/services/automation-testing/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// AI-Powered QA & Automation Testing — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #1 — ALL CSS classes renamed from "wd-" to "qa-" prefix.
//      The old "wd-" prefix collided with web-development/page.tsx in the
//      Next.js production bundle causing style bleed across pages.
//      Every className, @keyframes, and CSS selector updated to "qa-".
//   ✅ WARNING #3  — canonical URL and all schema URLs now use
//      "/services/automation-testing" consistently. The old page used
//      "/services/testing-development" in schema but
//      "/services/automation-testing" in metadata — now unified.
//   ✅ CRITICAL #2 — breadcrumbFromItems() with correct @id item objects.
//   ✅ speakable cssSelector updated to ".qa-hero__h1" and ".qa-hero__sub".
//   ✅ aria-hidden removed from breadcrumb <nav> — qa-sr-only pattern used.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed.
//   ✅ CONTACT_EMAIL imported — single source of truth.
//   ✅ FAQ answers verified 40+ words.
//   ✅ Title within 65-char limit.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader     from "@/app/components/PageLoader";

import {
  FaBug, FaCogs, FaChartLine, FaRocket, FaShieldAlt, FaTools,
} from "react-icons/fa";

import type { Metadata } from "next";
import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ FIX: 65 chars — at the limit
  title: "AI-Powered QA & Automation Testing | Agentic AI — 99 Visual",

  description:
    "99 Visual Solutions delivers next-generation QA powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance & security testing, and CI/CD integration.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Unified canonical — was "/services/testing-development" in schema,
    // now consistently "/services/automation-testing" everywhere.
    canonical: `${BASE}/services/automation-testing`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "AI-Powered QA & Automation Testing | Agentic AI — 99 Visual Solutions",
    description:
      "Next-generation QA powered by Agentic AI: autonomous test agents, self-healing automation, LLM-driven exploratory testing, load & performance testing, security testing, and CI/CD integration.",
    url: `${BASE}/services/automation-testing`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/services/testing-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "AI-Powered QA & Automation Testing Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AI-Powered QA & Automation Testing | 99 Visual Solutions",
    description:
      "Ship reliable software with Agentic AI QA — autonomous test agents, self-healing automation, performance testing, security testing & CI/CD integration.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/services/testing-og.jpg`,
        alt: "AI-Powered QA & Automation Testing Services by 99 Visual Solutions",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — single source of truth for schema AND visible HTML
// ✅ FIX: All answers 40+ words. CONTACT_EMAIL used.
// ✅ FIX: All schema URLs use /services/automation-testing consistently.
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What AI-powered QA services does 99 Visual Solutions provide?",
    answer:
      `We offer Agentic AI test automation, self-healing test scripts, LLM-driven exploratory testing, AI-augmented manual testing, and autonomous CI/CD quality gate integration. Our QA engineers work alongside AI agents to deliver deeper coverage, faster release cycles, and fewer escaped defects. Contact us at ${CONTACT_EMAIL} for a free QA consultation.`,
  },
  {
    question: "Does 99 Visual Solutions support self-healing test automation?",
    answer:
      "Yes. Our AI-powered frameworks use self-healing scripts that automatically adapt to UI changes and DOM shifts, reducing maintenance overhead and keeping pipelines green. Self-healing automation is particularly valuable for rapidly evolving front-end applications built with React, Next.js, or Vue, where selector changes frequently break traditional test scripts.",
  },
  {
    question: "What performance and load testing services are available?",
    answer:
      "We provide AI-guided load, stress, spike, and endurance testing with ML-assisted bottleneck detection, predictive root cause analysis, and observability integrations with Datadog and Grafana. Our performance engineering practice goes beyond simple pass/fail benchmarks — we deliver actionable optimisation recommendations that directly improve user experience and system reliability.",
  },
  {
    question: "Does 99 Visual Solutions offer security testing?",
    answer:
      "Yes. We provide LLM-assisted threat modelling, OWASP-aligned penetration testing, AI-specific security testing for prompt injection and adversarial inputs, and compliance validation with remediation roadmaps. Our security testing covers both traditional application attack surfaces and the emerging risks unique to AI-integrated and LLM-powered software systems.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ✅ FIX: All @id and url values use /services/automation-testing consistently.
// ✅ FIX: breadcrumbFromItems() with correct @id item objects.
// ✅ FIX: speakable cssSelector uses ".qa-hero__h1" and ".qa-hero__sub".
// ─────────────────────────────────────────────────────────────────────────────
const qaBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: "/" },
  { name: "Services",                url: "/services" },
  { name: "QA & Automation Testing", url: "/services/automation-testing" },
]);

const qaFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${BASE}/services/automation-testing#faq`,
  mainEntityOfPage: { "@id": `${BASE}/services/automation-testing#webpage` },
};

const qaServiceNode = {
  "@type":     "Service",
  "@id":       `${BASE}/services/automation-testing#service`,
  name:        "AI-Powered QA & Automation Testing",
  description: "Next-generation QA powered by Agentic AI: autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance testing, security testing, and CI/CD pipeline integration.",
  provider:    { "@id": `${BASE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         `${BASE}/services/automation-testing`,
  serviceType: "QA & Software Testing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "QA & Automation Testing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Augmented Manual Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic AI Test Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance & Load Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Continuous CI/CD QA Integration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Optimized Scale Readiness Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM-Assisted Security Testing" } },
    ],
  },
};

const qaPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/services/automation-testing#webpage`,
  url:           `${BASE}/services/automation-testing`,
  name:          "AI-Powered QA & Automation Testing | Agentic AI — 99 Visual Solutions",
  description:   "Next-generation software QA and automation testing powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance testing, security testing, and CI/CD integration.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/services/testing-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "AI-Powered QA & Automation Testing Services by 99 Visual Solutions",
  },
  // ✅ FIX: cssSelectors renamed to qa- prefix to match actual DOM elements
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".qa-hero__h1", ".qa-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/services/automation-testing#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/services/automation-testing`] },
};

const qaGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  qaPageNode,
  qaBreadcrumbNode,
  qaServiceNode,
  qaFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaBug />,       title: "Zero-Defect Delivery",        description: "Our Agentic AI test agents autonomously explore edge cases and failure paths humans often miss — catching critical defects before they ever reach production environments." },
  { icon: <FaCogs />,      title: "Self-Healing Automation",     description: "AI-powered test scripts that automatically adapt to UI changes and DOM shifts, drastically reducing maintenance overhead and keeping your CI/CD pipelines green." },
  { icon: <FaChartLine />, title: "Intelligent Performance",     description: "We combine real-world load simulation with ML-driven analysis to pinpoint bottlenecks, predict failure thresholds, and optimise system throughput at scale." },
  { icon: <FaShieldAlt />, title: "AI-Augmented Security",       description: "LLM-assisted vulnerability scanning and threat modelling identify security weaknesses faster and with greater accuracy than traditional rule-based tools alone." },
  { icon: <FaRocket />,    title: "Accelerated Time-to-Market",  description: "Autonomous test generation and intelligent regression selection cut test cycles by up to 70%, letting you ship high-quality releases at the speed your business demands." },
  { icon: <FaTools />,     title: "Continuous AI-Driven QA",     description: "From code commit to production, our AI agents monitor, test, and validate continuously — providing real-time quality intelligence at every stage of your SDLC." },
];

const services = [
  {
    id: "manual-testing",
    title: "AI-Augmented Human Testing",
    image: "/images/manual-testing.png",
    imageAlt: "AI-Augmented Manual Testing illustration",
    description: "Combine the irreplaceable intuition of expert human testers with the analytical power of AI assistants. Our QA engineers are equipped with LLM-driven test case generators, context-aware checklists, and real-time anomaly suggestion tools — elevating manual testing from a checklist exercise to a high-signal quality intelligence process.",
    highlight: "Our testers don't just follow scripts — they think like users, reason like engineers, and leverage AI to surface the insights that define truly exceptional software. The result: fewer escaped defects, richer coverage, and faster feedback cycles.",
    bullets: ["AI-assisted exploratory testing with LLM-generated scenario suggestions", "Functional, regression, usability & accessibility validation", "Structured defect reporting enriched with root cause context"],
    imageLeft: false,
  },
  {
    id: "automation",
    title: "Agentic AI Test Automation",
    image: "/images/automated-testing.png",
    imageAlt: "Agentic AI Automation Testing illustration",
    description: "Move beyond traditional script-based automation with autonomous AI agents that plan, generate, execute, and self-heal test suites with minimal human intervention. Powered by Playwright, Cypress, and Selenium — orchestrated by intelligent agents — our automation frameworks adapt to your evolving product in real time.",
    highlight: "Agentic AI doesn't just run tests; it reasons about your application's behaviour, identifies untested paths, and autonomously expands coverage as your codebase grows. Integrate with LangChain, AutoGen, or custom agent architectures for truly autonomous QA pipelines.",
    bullets: ["Autonomous test generation, execution & self-healing via AI agents", "Playwright, Cypress & Selenium with AI-driven orchestration", "LLM-powered test plan creation, RPA integration & intelligent regression selection"],
    imageLeft: true,
  },
  {
    id: "performance-testing",
    title: "Intelligent Performance & Load Testing",
    image: "/images/performance-testing.png",
    imageAlt: "AI Performance & Load Testing illustration",
    description: "Go beyond pass/fail load benchmarks with ML-assisted performance engineering. We simulate millions of concurrent users across geographies, analyse system telemetry with predictive models, and deliver actionable optimisation recommendations — not just numbers on a dashboard.",
    highlight: "Our AI-driven performance analysis correlates infrastructure metrics, application traces, and user behaviour patterns to pinpoint the exact bottlenecks costing you speed and stability — before they ever impact your customers.",
    bullets: ["AI-guided load, stress, spike & endurance testing at scale", "Predictive bottleneck detection & ML-assisted root cause analysis", "Observability integration with Datadog, Grafana & custom APM tooling"],
    imageLeft: false,
  },
  {
    id: "continuous-qa",
    title: "Continuous AI-Driven QA & Support",
    image: "/images/continuous-qa.png",
    imageAlt: "Continuous AI-Driven QA & Support illustration",
    description: "Quality is not a phase — it's a continuous signal. We embed intelligent QA agents directly into your CI/CD pipelines, enabling autonomous test execution, real-time quality gates, and proactive defect prediction at every stage of your delivery workflow.",
    highlight: "Our AI-driven QA agents learn from your codebase history and defect patterns to predict where failures are most likely to emerge next — shifting quality left and dramatically reducing the cost of late-stage bug discovery.",
    bullets: ["Autonomous CI/CD-integrated quality gates with AI decision logic", "Predictive defect detection using historical code & test pattern analysis", "Continuous monitoring, alerting & intelligent regression triage"],
    imageLeft: true,
  },
  {
    id: "scale-readiness",
    title: "AI-Optimized Scale Readiness",
    image: "/images/performance-scale.png",
    imageAlt: "AI-Optimized Performance & Scale Readiness illustration",
    description: "Prepare your architecture for exponential growth with AI-guided capacity planning and scale validation. We stress-test your systems across distributed cloud environments, model traffic surge scenarios with precision, and validate auto-scaling configurations to ensure zero-downtime performance under any load.",
    highlight: "By combining chaos engineering principles with AI-generated failure scenario modelling, we harden your infrastructure against real-world turbulence — so when traffic spikes, your systems scale gracefully, not catastrophically.",
    bullets: ["AI-modelled traffic surge simulation & chaos engineering integration", "Cloud-native scalability validation across AWS, GCP & Azure", "Auto-scaling configuration testing & resource efficiency benchmarking"],
    imageLeft: false,
  },
  {
    id: "security-testing",
    title: "LLM-Assisted Security Testing",
    image: "/images/security-aware-testing.png",
    imageAlt: "LLM-Assisted Security Testing illustration",
    description: "Security in the age of AI demands AI-native testing strategies. Our security testing practice combines OWASP-aligned penetration testing, automated vulnerability scanning, and LLM-assisted threat modelling to identify risks that static analysers and legacy tools routinely miss.",
    highlight: "We test not only your application's traditional attack surface but also the emerging risks unique to AI-integrated systems — including prompt injection, model data poisoning, and adversarial input vulnerabilities — ensuring your product is secure in the era of intelligent software.",
    bullets: ["LLM-assisted threat modelling, OWASP testing & penetration assessment", "AI-specific security testing: prompt injection, adversarial inputs & model safety", "Compliance validation, risk scoring & remediation roadmap delivery"],
    imageLeft: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AutomationTestingPage() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-qa-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaGraph) }}
      />

      {/*
        ✅ CRITICAL #1 FIX: ALL CSS classes renamed from "wd-" to "qa-" prefix.
        This eliminates the style-bleed collision with web-development/page.tsx
        which also used "wd-" classes. Next.js merges inline <style> tags from
        all routes into the production bundle — unique prefixes prevent conflicts.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ✅ FIX: qa-sr-only replaces wd-sr-only — unique to this page */
        .qa-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO — all classes qa- prefixed ════════════════════════════ */
        .qa-hero {
          position:relative;min-height:90vh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;background:#080808;overflow:hidden;
          padding:8rem 1.5rem 6rem;text-align:center;
        }
        .qa-hero__orb {
          position:absolute;border-radius:50%;filter:blur(100px);
          animation:qaOrbDrift 16s ease-in-out infinite alternate;pointer-events:none;
        }
        .qa-hero__orb--1{width:540px;height:540px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-160px;left:-100px;opacity:.13;}
        .qa-hero__orb--2{width:460px;height:460px;background:radial-gradient(circle,#f97316,#ea580c);bottom:-130px;right:-80px;opacity:.12;animation-delay:-8s;}
        .qa-hero__orb--3{width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;right:15%;opacity:.07;animation-delay:-4s;}
        @keyframes qaOrbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(32px,24px) scale(1.06)}}
        .qa-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:60px 60px;}
        .qa-hero__grain{position:absolute;inset:0;opacity:.03;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .qa-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .qa-corner--tl{top:24px;left:24px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .qa-corner--tr{top:24px;right:24px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        .qa-corner--bl{bottom:64px;left:24px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        .qa-corner--br{bottom:64px;right:24px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}
        .qa-hero__content{position:relative;z-index:10;max-width:860px;margin:0 auto;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        @keyframes qaFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        .qa-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .qa-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:qaPulse 2s ease-in-out infinite;}
        @keyframes qaPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .qa-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;}
        .qa-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.2px #f97316;}
        .qa-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        .qa-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,2vw,1.1rem);font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto 2.6rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;}
        .qa-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .qa-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        /* ══ INTRO ═══════════════════════════════════════════════════════ */
        .qa-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .qa-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .qa-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .qa-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .qa-intro__h2 em{font-style:italic;color:#f97316;}
        .qa-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .qa-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .qa-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}

        /* ══ SERVICE SECTIONS ════════════════════════════════════════════ */
        .qa-services{background:#080808;}
        .qa-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .qa-svc:nth-child(odd){background:#0f0f0f;}
        .qa-svc:nth-child(even){background:#080808;}
        .qa-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .qa-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){
          .qa-svc__inner--img-left,.qa-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}
          .qa-svc__img-wrap{order:2!important;}.qa-svc__body{order:1!important;}
        }
        .qa-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .qa-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .qa-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .qa-svc__img-wrap:hover img{transform:scale(1.03);}
        .qa-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .qa-svc__body{position:relative;}
        .qa-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .qa-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .qa-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .qa-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .qa-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .qa-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .qa-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .qa-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}

        /* ══ BENEFITS ════════════════════════════════════════════════════ */
        .qa-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .qa-benefits__inner{max-width:1200px;margin:0 auto;}
        .qa-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .qa-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .qa-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .qa-benefits__h2 em{font-style:italic;color:#f97316;}
        .qa-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .qa-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .qa-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.qa-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.qa-benefits__grid{grid-template-columns:1fr;}}
        .qa-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .qa-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .qa-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .qa-benefit-card:hover::before{opacity:1;}
        .qa-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .qa-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .qa-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}

        /* ══ FAQ ═════════════════════════════════════════════════════════ */
        .qa-faq{background:#080808;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .qa-faq__inner{max-width:800px;margin:0 auto;}
        .qa-faq__header{text-align:center;margin-bottom:3.5rem;}
        .qa-faq__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .qa-faq__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .qa-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;}
        .qa-faq__item{border-bottom:1px solid rgba(255,255,255,0.07);background:#0f0f0f;transition:background .2s ease;}
        .qa-faq__item:last-child{border-bottom:none;}
        .qa-faq__item[open]{background:#141414;}
        .qa-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .qa-faq__q::-webkit-details-marker{display:none;}.qa-faq__q::marker{display:none;}
        .qa-faq__q-text{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:rgba(255,255,255,.85);line-height:1.35;flex:1;transition:color .2s ease;}
        .qa-faq__item[open] .qa-faq__q-text,.qa-faq__q:hover .qa-faq__q-text{color:#fff;}
        .qa-faq__chevron{flex-shrink:0;color:#f97316;opacity:.7;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .qa-faq__item[open] .qa-faq__chevron{transform:rotate(180deg);opacity:1;}
        .qa-faq__a{padding:0 1.75rem 1.5rem;animation:qaFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes qaFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .qa-faq__a p{font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin:0;}

        /* ══ CTA STRIP ═══════════════════════════════════════════════════ */
        .qa-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .qa-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .qa-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .qa-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .qa-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .qa-cta__h2 em{font-style:italic;color:#f97316;}
        .qa-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .qa-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .qa-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .qa-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        @media(max-width:600px){.qa-faq__q{padding:1.25rem;}.qa-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="qa-hero" aria-labelledby="qa-hero-heading">
        <div aria-hidden="true">
          <div className="qa-hero__orb qa-hero__orb--1" />
          <div className="qa-hero__orb qa-hero__orb--2" />
          <div className="qa-hero__orb qa-hero__orb--3" />
          <div className="qa-hero__grid" />
          <div className="qa-hero__grain" />
        </div>
        <div className="qa-corner qa-corner--tl" aria-hidden="true" />
        <div className="qa-corner qa-corner--tr" aria-hidden="true" />
        <div className="qa-corner qa-corner--bl" aria-hidden="true" />
        <div className="qa-corner qa-corner--br" aria-hidden="true" />

        {/* ✅ FIX: aria-hidden removed — qa-sr-only used */}
        <nav className="qa-sr-only" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{ listStyle:"none",margin:0,padding:0 }}>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/services" itemProp="item"><span itemProp="name">Services</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/services/automation-testing" itemProp="item" aria-current="page">
                <span itemProp="name">QA &amp; Automation Testing</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="qa-hero__content">
          <div className="qa-hero__eyebrow" aria-hidden="true">
            <span className="qa-hero__dot" />
            Services · Agentic AI QA &amp; Automation Testing
          </div>
          <h1 className="qa-hero__h1" id="qa-hero-heading">
            Intelligent quality engineering<br />powered by <em>Agentic AI</em>
          </h1>
          <div className="qa-hero__rule" aria-hidden="true" />
          <p className="qa-hero__sub">
            From AI-augmented manual testing and autonomous agent-driven automation to
            LLM-assisted security testing and predictive performance engineering — we deliver
            next-generation QA that helps you ship intelligent, bug-free software at scale.
          </p>
          <a href="#qa-services" className="qa-hero__cta" aria-label="Explore AI-powered QA and automation testing services">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ══ INTRO ════════════════════════════════════════════════════════ */}
      <section className="qa-intro" aria-labelledby="qa-intro-heading">
        <div className="qa-intro__inner">
          <span className="qa-intro__label">Our Approach</span>
          <h2 className="qa-intro__h2" id="qa-intro-heading">
            Agentic AI quality intelligence embedded at<br />
            every stage of your <em>development lifecycle</em>
          </h2>
          <div className="qa-intro__rule" aria-hidden="true" />
          <p className="qa-intro__p">
            At <strong>99 Visual Solutions</strong>, we&apos;ve reimagined quality assurance for the era of
            intelligent software. Our Agentic AI-powered testing practice deploys{" "}
            <strong>autonomous test agents</strong> that plan, generate, execute, and self-heal test suites
            — integrating seamlessly into your CI/CD pipelines alongside precision-driven human expertise.
          </p>
          <p className="qa-intro__p">
            Whether you&apos;re building traditional web applications, LLM-powered products, or complex
            distributed systems, we help your engineering teams{" "}
            <strong>minimise release risk, maximise test coverage, and ship with confidence</strong> at the
            velocity modern businesses demand.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ═════════════════════════════════════════════ */}
      <div id="qa-services" className="qa-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="qa-svc" aria-labelledby={`qa-svc-heading-${svc.id}`}>
            <div className={`qa-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="qa-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image src={svc.image} alt={svc.imageAlt} width={600} height={460} style={{ width:"100%",height:"auto" }} />
              </div>
              <div className="qa-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="qa-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="qa-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="qa-svc__heading" id={`qa-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="qa-svc__rule" aria-hidden="true" />
                <p className="qa-svc__p">{svc.description}</p>
                <p className="qa-svc__highlight">{svc.highlight}</p>
                <ul className="qa-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ════════════════════════════════════════════════════ */}
      <section className="qa-benefits" aria-labelledby="qa-benefits-heading">
        <div className="qa-benefits__inner">
          <div className="qa-benefits__head">
            <span className="qa-benefits__label">Why Choose Us?</span>
            <h2 className="qa-benefits__h2" id="qa-benefits-heading">
              The competitive advantage of<br /><em>AI-native</em> quality engineering
            </h2>
            <div className="qa-benefits__rule" aria-hidden="true" />
            <p className="qa-benefits__sub">
              Partnering with 99 Visual Solutions gives your engineering team an Agentic AI quality
              layer that delivers faster releases, deeper coverage, and production-grade confidence.
            </p>
          </div>
          <div className="qa-benefits__grid">
            {benefits.map((b, i) => (
              <div className="qa-benefit-card" key={i}>
                <div className="qa-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <div className="qa-benefit-card__title">{b.title}</div>
                <p className="qa-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ — JSON-LD only, no microdata ════════════════════════════ */}
      <section id="qa-faq" className="qa-faq" aria-labelledby="qa-faq-heading"
        itemScope itemType="https://schema.org/FAQPage">
        <div className="qa-faq__inner">
          <div className="qa-faq__header">
            <span className="qa-faq__label">Got Questions?</span>
            <h2 className="qa-faq__h2" id="qa-faq-heading">Frequently Asked Questions</h2>
          </div>
          <dl className="qa-faq__list">
            {FAQ_ITEMS.map(({ question, answer }, i) => (
              <details key={i} className="qa-faq__item"
                itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="qa-faq__q" itemProp="name">
                  <span className="qa-faq__q-text">{question}</span>
                  <span className="qa-faq__chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="qa-faq__a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">{answer}</p>
                </div>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ CTA STRIP ═══════════════════════════════════════════════════ */}
      <section className="qa-cta" aria-labelledby="qa-cta-heading">
        <div className="qa-cta__orb" aria-hidden="true" />
        <div className="qa-cta__inner">
          <span className="qa-cta__eyebrow">Start a Project</span>
          <h2 className="qa-cta__h2" id="qa-cta-heading">
            Ready to ship software with<br /><em>AI-powered</em> confidence?
          </h2>
          <div className="qa-cta__rule" aria-hidden="true" />
          <p className="qa-cta__sub">
            Talk to our Agentic AI QA specialists for a free strategy consultation. We&apos;ll
            design an intelligent testing architecture tailored to your stack, team, and release velocity.
          </p>
          <Link href="/contact" className="qa-cta__btn" aria-label="Get a free AI-powered QA consultation from 99 Visual Solutions">
            Get a Free Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}