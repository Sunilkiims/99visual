// app/services/automation-testing/page.tsx
//
// THIS REVISION: Hero fully aligned to the /services (hub) page hero, which
//   is now the shared master template across all service pages — same
//   layout, spacing, typography (Space Grotesk / Inter / IBM Plex Mono
//   scales and clamp() values), corner bracket positions, eyebrow/rule/sub
//   treatment, button styling, ticker mechanics, and responsive breakpoints
//   (desktop/tablet/mobile/small-mobile/short-screen). Only the hero
//   heading, description, artwork (banner image), and ticker content stay
//   page-specific — everything else (CSS values, structure, animations)
//   now matches the hub page exactly. The previous badge row has been
//   removed since the hub template's hero has no equivalent row.
//
//   All hero-area and page-wide "contact us" CTAs (hero primary, CTA
//   strip, sticky mobile CTA) now open the ContactPopup modal via the
//   shared ConsultationCTA client wrapper instead of navigating to
//   /contact, matching the hub page's CTA implementation.
//
//   LATEST TWEAK: Hero eyebrow badge (label pill + pulsing dot) recolored
//   from blue to orange via a new --qa-orange CSS var. Everything else in
//   the hero (h1, rule, sub, CTAs, ticker, corner brackets) stays blue.
//
// Unchanged: metadata, all schema nodes (org/local business/website/page/
// breadcrumb/service/FAQ), FAQ_ITEMS copy, benefits copy, services copy
// (title/description/highlight/bullets), canonical/robots/OG/Twitter tags,
// H1/H2 hierarchy and text, the FAQ's native <details>/<summary> markup
// (no JS involved, so nothing to break), Header component.
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";


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

const CLEAN_BASE = BASE.replace(/\/+$/, "");
const PAGE_PATH  = "/services/automation-testing";
const PAGE_URL   = `${CLEAN_BASE}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "AI-Powered QA & Automation Testing | Agentic AI — 99 Visual",

  description:
    "99 Visual Solutions delivers next-generation QA powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance & security testing, and CI/CD integration.",

  metadataBase: new URL(CLEAN_BASE),

  alternates: {
    canonical: PAGE_PATH,
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
    url: PAGE_URL,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${CLEAN_BASE}/images/services/testing-og.jpg`,
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
        url: `${CLEAN_BASE}/images/services/testing-og.jpg`,
        alt: "AI-Powered QA & Automation Testing Services by 99 Visual Solutions",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  authors:         [{ name: "99 Visual Solutions", url: CLEAN_BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

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

const qaBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: "/" },
  { name: "Services",                url: "/services" },
  { name: "QA & Automation Testing", url: PAGE_PATH },
]);

const qaFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${PAGE_URL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_URL}#webpage` },
};

const qaServiceNode = {
  "@type":     "Service",
  "@id":       `${PAGE_URL}#service`,
  name:        "AI-Powered QA & Automation Testing",
  description: "Next-generation QA powered by Agentic AI: autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance testing, security testing, and CI/CD pipeline integration.",
  provider:    { "@id": `${CLEAN_BASE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         PAGE_URL,
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
  "@id":         `${PAGE_URL}#webpage`,
  url:           PAGE_URL,
  name:          "AI-Powered QA & Automation Testing | Agentic AI — 99 Visual Solutions",
  description:   "Next-generation software QA and automation testing powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance testing, security testing, and CI/CD integration.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${CLEAN_BASE}/#website` },
  about:         { "@id": `${CLEAN_BASE}/#organization` },
  publisher:     { "@id": `${CLEAN_BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${CLEAN_BASE}/images/services/testing-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "AI-Powered QA & Automation Testing Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".qa-hero__h1", ".qa-hero__sub"],
  },
  breadcrumb:      { "@id": `${PAGE_URL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_URL] },
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
    description: "Combine the irreplaceable intuition of expert human testers with the analytical power of AI assistants. Our QA engineers are equipped with LLM-driven test case generators, context-aware checklists, and real-time anomaly suggestion tools — elevating manual testing from a checklist exercise to a high-signal quality intelligence process.",
    highlight: "Our testers don't just follow scripts — they think like users, reason like engineers, and leverage AI to surface the insights that define truly exceptional software. The result: fewer escaped defects, richer coverage, and faster feedback cycles.",
    bullets: ["AI-assisted exploratory testing with LLM-generated scenario suggestions", "Functional, regression, usability & accessibility validation", "Structured defect reporting enriched with root cause context"],
    icon: <FaBug />,
  },
  {
    id: "automation",
    title: "Agentic AI Test Automation",
    description: "Move beyond traditional script-based automation with autonomous AI agents that plan, generate, execute, and self-heal test suites with minimal human intervention. Powered by Playwright, Cypress, and Selenium — orchestrated by intelligent agents — our automation frameworks adapt to your evolving product in real time.",
    highlight: "Agentic AI doesn't just run tests; it reasons about your application's behaviour, identifies untested paths, and autonomously expands coverage as your codebase grows. Integrate with LangChain, AutoGen, or custom agent architectures for truly autonomous QA pipelines.",
    bullets: ["Autonomous test generation, execution & self-healing via AI agents", "Playwright, Cypress & Selenium with AI-driven orchestration", "LLM-powered test plan creation, RPA integration & intelligent regression selection"],
    icon: <FaCogs />,
  },
  {
    id: "performance-testing",
    title: "Intelligent Performance & Load Testing",
    description: "Go beyond pass/fail load benchmarks with ML-assisted performance engineering. We simulate millions of concurrent users across geographies, analyse system telemetry with predictive models, and deliver actionable optimisation recommendations — not just numbers on a dashboard.",
    highlight: "Our AI-driven performance analysis correlates infrastructure metrics, application traces, and user behaviour patterns to pinpoint the exact bottlenecks costing you speed and stability — before they ever impact your customers.",
    bullets: ["AI-guided load, stress, spike & endurance testing at scale", "Predictive bottleneck detection & ML-assisted root cause analysis", "Observability integration with Datadog, Grafana & custom APM tooling"],
    icon: <FaChartLine />,
  },
  {
    id: "scale-readiness",
    title: "AI-Optimized Scale Readiness",
    description: "Prepare your architecture for exponential growth with AI-guided capacity planning and scale validation. We stress-test your systems across distributed cloud environments, model traffic surge scenarios with precision, and validate auto-scaling configurations to ensure zero-downtime performance under any load.",
    highlight: "By combining chaos engineering principles with AI-generated failure scenario modelling, we harden your infrastructure against real-world turbulence — so when traffic spikes, your systems scale gracefully, not catastrophically.",
    bullets: ["AI-modelled traffic surge simulation & chaos engineering integration", "Cloud-native scalability validation across AWS, GCP & Azure", "Auto-scaling configuration testing & resource efficiency benchmarking"],
    icon: <FaRocket />,
  },
  {
    id: "continuous-qa",
    title: "Continuous AI-Driven QA & Support",
    description: "Quality is not a phase — it's a continuous signal. We embed intelligent QA agents directly into your CI/CD pipelines, enabling autonomous test execution, real-time quality gates, and proactive defect prediction at every stage of your delivery workflow.",
    highlight: "Our AI-driven QA agents learn from your codebase history and defect patterns to predict where failures are most likely to emerge next — shifting quality left and dramatically reducing the cost of late-stage bug discovery.",
    bullets: ["Autonomous CI/CD-integrated quality gates with AI decision logic", "Predictive defect detection using historical code & test pattern analysis", "Continuous monitoring, alerting & intelligent regression triage"],
    icon: <FaTools />,
  },
  {
    id: "security-testing",
    title: "LLM-Assisted Security Testing",
    description: "Security in the age of AI demands AI-native testing strategies. Our security testing practice combines OWASP-aligned penetration testing, automated vulnerability scanning, and LLM-assisted threat modelling to identify risks that static analysers and legacy tools routinely miss.",
    highlight: "We test not only your application's traditional attack surface but also the emerging risks unique to AI-integrated systems — including prompt injection, model data poisoning, and adversarial input vulnerabilities — ensuring your product is secure in the era of intelligent software.",
    bullets: ["LLM-assisted threat modelling, OWASP testing & penetration assessment", "AI-specific security testing: prompt injection, adversarial inputs & model safety", "Compliance validation, risk scoring & remediation roadmap delivery"],
    icon: <FaShieldAlt />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

const clusters = [
  {
    id: "human-ai-testing",
    eyebrow: "Human + AI Testing",
    heading: <>Intuition and automation, <em>working together</em></>,
    intro: "Expert manual testers paired with autonomous AI agents — depth of judgment plus speed of coverage.",
    cols: 2,
    ids: ["manual-testing", "automation"],
  },
  {
    id: "performance-scale",
    eyebrow: "Performance & Scale",
    heading: <>Know your breaking point <em>before your users do</em></>,
    intro: "ML-assisted load testing and AI-guided scale validation, so growth doesn't become an outage.",
    cols: 2,
    ids: ["performance-testing", "scale-readiness"],
  },
  {
    id: "continuous-security",
    eyebrow: "Continuous Quality & Security",
    heading: <>Quality gates that never <em>sleep</em></>,
    intro: "AI-driven CI/CD quality gates and LLM-assisted security testing, running continuously rather than as a pre-release scramble.",
    cols: 2,
    ids: ["continuous-qa", "security-testing"],
  },
];

// Illustrative test-run log lines for the signature ticker band.
const pipeline = [
  { cmd: "playwright_run",  out: "1,842 passed, 0 failed" },
  { cmd: "self_heal",       out: "12 selectors adapted" },
  { cmd: "load_test",       out: "50k VUs, p95 210ms" },
  { cmd: "security_scan",   out: "0 critical CVEs" },
  { cmd: "ci_gate",         out: "quality gate passed" },
  { cmd: "regression_suite",out: "3.2min runtime" },
];

export default function AutomationTestingPage() {
  return (
    <>
      <script
        id="schema-qa-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .qa-page{
          --qa-ink:#12141A; --qa-muted:#5B6172; --qa-paper:#F5F6F8; --qa-surface:#FFFFFF;
          --qa-line:#E4E6EC; --qa-blue:#2E5CFF; --qa-green:#37D67A; --qa-orange:#F97316;
          background:var(--qa-paper);
        }
        .qa-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .qa-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--qa-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .qa-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--qa-ink);margin:0 0 1rem;text-align:center;}
        .qa-h2 em{font-style:normal;color:var(--qa-blue);}

        /* ══ HERO — matched exactly to the /services hub page hero.
           Save your banner image to:
           /public/images/services/automation-testing-hero-banner.jpg ── */
        .qa-hero{
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/automation-testing-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .qa-hero { height: 100svh; } }
        @supports (height: 100dvh) { .qa-hero { height: 100dvh; } }
        @media(max-width:960px){
          .qa-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/automation-testing-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        .qa-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .qa-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .qa-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .qa-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .qa-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .qa-hero__eyebrow{ margin-bottom:1.1rem; }
          .qa-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .qa-hero__rule{ margin-bottom:.8rem; }
          .qa-hero__sub{ margin-bottom:1.2rem; }
        }

        .qa-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .qa-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .qa-corner--tl{top:28px;left:28px;border-top:1px solid var(--qa-blue);border-left:1px solid var(--qa-blue);}
        .qa-corner--tr{top:28px;right:28px;border-top:1px solid var(--qa-blue);border-right:1px solid var(--qa-blue);}
        .qa-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--qa-blue);border-left:1px solid var(--qa-blue);}
        @media(max-width:480px){ .qa-corner--bl{ left:28px; } }
        .qa-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--qa-blue);border-right:1px solid var(--qa-blue);}

        .qa-hero__content{animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes qaFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.qa-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .qa-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--qa-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .qa-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--qa-orange);animation:qaPulse 2s ease-in-out infinite;}
        @keyframes qaPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .qa-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .qa-hero__h1 em{font-style:normal;color:var(--qa-blue);}
        .qa-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--qa-blue),transparent);margin:0 0 1.4rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.qa-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--qa-blue),transparent);}}
        .qa-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.qa-hero__sub{margin:0 auto 2.6rem;}}

        .qa-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.qa-hero__actions{justify-content:center;}}
        .qa-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--qa-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;border:none;}
        .qa-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .qa-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;box-shadow:none;gap:8px;}
        .qa-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);box-shadow:none;transform:none;}

        .qa-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .qa-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .qa-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:qaScroll 34s linear infinite;}
        .qa-hero__ticker-bar:hover .qa-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .qa-ticker__track{ animation-duration:22s; } }
        @keyframes qaScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .qa-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .qa-ticker__item b{color:rgba(255,255,255,.45);}
        .qa-ticker__pass{color:var(--qa-green);}
        @media(max-height:520px){
          .qa-hero__ticker-bar{ padding-top:.75rem; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .qa-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--qa-line);}
        @media(max-width:760px){.qa-sticky-cta{display:flex;justify-content:center;}}
        .qa-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--qa-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ INTRO — unchanged copy ═══════════════════════════════════════ */
        .qa-intro{background:var(--qa-surface);border-bottom:1px solid var(--qa-line);padding:5.5rem 1.5rem;}
        .qa-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .qa-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--qa-muted);max-width:700px;margin:0 auto .9rem;}
        .qa-intro__p strong{color:var(--qa-ink);font-weight:500;}

        /* ══ SERVICE CLUSTERS (replaces 6 alternating rows) ══════════════ */
        .qa-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-cluster:nth-child(even){background:var(--qa-surface);}
        .qa-cluster__inner{max-width:1180px;margin:0 auto;}
        .qa-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .qa-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .qa-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--qa-ink);margin:0 0 .6rem;}
        .qa-cluster__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--qa-muted);margin:0;}
        .qa-cluster__grid{display:grid;gap:1.25rem;}
        .qa-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        @media(max-width:860px){.qa-cluster__grid--2{grid-template-columns:1fr;}}

        .qa-card{background:var(--qa-surface);border:1px solid var(--qa-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .qa-cluster:nth-child(even) .qa-card{background:var(--qa-paper);}
        .qa-card:hover{border-color:var(--qa-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .qa-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .qa-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--qa-ink);margin:0 0 .7rem;}
        .qa-card__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--qa-muted);margin:0 0 .8rem;}
        .qa-card__highlight{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:400;line-height:1.7;color:var(--qa-ink);border-left:2px solid var(--qa-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .qa-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .qa-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;color:var(--qa-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .qa-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--qa-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */
        .qa-benefits{background:var(--qa-paper);padding:5.5rem 1.5rem;}
        .qa-benefits__inner{max-width:1200px;margin:0 auto;}
        .qa-benefits__head{max-width:560px;margin:0 auto 3rem;text-align:center;}
        .qa-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .qa-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--qa-ink);margin:0 0 .8rem;}
        .qa-benefits__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--qa-muted);max-width:520px;margin:0 auto;}
        .qa-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.qa-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.qa-benefits__grid{grid-template-columns:1fr;}}
        .qa-benefit-card{background:var(--qa-surface);border:1px solid var(--qa-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .qa-benefit-card:hover{border-color:var(--qa-blue);transform:translateY(-3px);}
        .qa-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .qa-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--qa-ink);margin-bottom:.5rem;}
        .qa-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--qa-muted);}

        /* ══ FAQ — native details/summary, unchanged markup ═══════════════ */
        .qa-faq{background:var(--qa-paper);padding:5.5rem 1.5rem;border-top:1px solid var(--qa-line);}
        .qa-faq__inner{max-width:800px;margin:0 auto;}
        .qa-faq__header{text-align:center;margin-bottom:3rem;}
        .qa-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--qa-line);border-radius:16px;overflow:hidden;}
        .qa-faq__item{border-bottom:1px solid var(--qa-line);background:var(--qa-surface);transition:background .2s ease;}
        .qa-faq__item:last-child{border-bottom:none;}
        .qa-faq__item[open]{background:#fff;}
        .qa-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .qa-faq__q::-webkit-details-marker{display:none;}.qa-faq__q::marker{display:none;}
        .qa-faq__q-text{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--qa-ink);line-height:1.35;flex:1;transition:color .2s ease;}
        .qa-faq__item[open] .qa-faq__q-text,.qa-faq__q:hover .qa-faq__q-text{color:var(--qa-blue);}
        .qa-faq__chevron{flex-shrink:0;color:var(--qa-blue);opacity:.8;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .qa-faq__item[open] .qa-faq__chevron{transform:rotate(180deg);opacity:1;}
        .qa-faq__a{padding:0 1.75rem 1.5rem;animation:qaFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes qaFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .qa-faq__a p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;line-height:1.8;color:var(--qa-muted);margin:0;}

        /* ══ CTA ═══════════════════════════════════════════════════════════ */
        .qa-cta{background:var(--qa-surface);border-top:1px solid var(--qa-line);padding:5.5rem 1.5rem;text-align:center;}
        .qa-cta__inner{max-width:560px;margin:0 auto;}
        .qa-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .qa-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--qa-ink);margin:0 0 1rem;}
        .qa-cta__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--qa-muted);margin-bottom:2.2rem;}
        .qa-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--qa-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .qa-cta__btn:hover{background:var(--qa-blue);transform:translateY(-2px);}

        @media(max-width:600px){.qa-faq__q{padding:1.25rem;}.qa-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){
          .qa-page *,.qa-page *::before,.qa-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <div className="qa-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="qa-hero" aria-labelledby="qa-hero-heading">
          <div aria-hidden="true">
            <div className="qa-hero__grain" />
          </div>
          <div className="qa-corner qa-corner--tl" aria-hidden="true" />
          <div className="qa-corner qa-corner--tr" aria-hidden="true" />
          <div className="qa-corner qa-corner--bl" aria-hidden="true" />
          <div className="qa-corner qa-corner--br" aria-hidden="true" />

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
                <a href={PAGE_PATH} itemProp="item" aria-current="page">
                  <span itemProp="name">QA &amp; Automation Testing</span>
                </a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="qa-hero__inner">
            <div className="qa-hero__content">
              <div className="qa-hero__eyebrow">
                <span className="qa-hero__dot" />
                Services · Agentic AI QA &amp; Automation Testing
              </div>
              <h1 className="qa-hero__h1" id="qa-hero-heading">
                Quality engineering measured<br />in <em>coverage</em>, not vibes
              </h1>
              <div className="qa-hero__rule" aria-hidden="true" />
              <p className="qa-hero__sub">
                AI-augmented manual testing, autonomous agent-driven automation,
                LLM-assisted security testing, and predictive performance
                engineering — QA built to help you ship with confidence.
              </p>

              <div className="qa-hero__actions">
                <ConsultationCTA className="qa-hero__cta" ariaLabel="Get a free AI-powered QA quote from 99 Visual Solutions">
                  Get a Free Quote
                </ConsultationCTA>
                <a href="#qa-services" className="qa-hero__cta qa-hero__cta--ghost" aria-label="Explore AI-powered QA and automation testing services">
                  Explore Services
                </a>
              </div>
            </div>
          </div>

          <div className="qa-hero__ticker-bar" aria-hidden="true">
            <div className="qa-ticker">
              <div className="qa-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="qa-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="qa-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTRO — unchanged copy ═══════════════════════════════════════ */}
        <section className="qa-intro" aria-labelledby="qa-intro-heading">
          <div className="qa-intro__inner">
            <span className="qa-label">Our Approach</span>
            <h2 className="qa-h2" id="qa-intro-heading">
              Agentic AI quality intelligence embedded at<br />
              every stage of your <em>development lifecycle</em>
            </h2>
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

        {/* ══ SERVICE CLUSTERS — 100% unchanged copy, grouped & iconified ═══ */}
        <div id="qa-services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="qa-cluster" aria-labelledby={`qa-cluster-h-${cluster.id}`}>
              <div className="qa-cluster__inner">
                <div className="qa-cluster__head">
                  <span className="qa-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="qa-cluster__h2" id={`qa-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="qa-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`qa-cluster__grid qa-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="qa-card" id={svc.id} key={svc.id} aria-labelledby={`qa-svc-heading-${svc.id}`}>
                        <div className="qa-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="qa-card__title" id={`qa-svc-heading-${svc.id}`}>{svc.title}</h3>
                        <p className="qa-card__desc">{svc.description}</p>
                        <p className="qa-card__highlight">{svc.highlight}</p>
                        <ul className="qa-card__bullets">
                          {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */}
        <section className="qa-benefits" aria-labelledby="qa-benefits-heading">
          <div className="qa-benefits__inner">
            <div className="qa-benefits__head">
              <span className="qa-benefits__label">Why Choose Us?</span>
              <h2 className="qa-benefits__h2" id="qa-benefits-heading">
                The competitive advantage of <em>AI-native</em> quality engineering
              </h2>
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

        {/* FAQPage structured data is handled exclusively via JSON-LD in the
            <script> tag above (qaFaqNode); no microdata attributes here. */}
        <section id="qa-faq" className="qa-faq" aria-labelledby="qa-faq-heading">
          <div className="qa-faq__inner">
            <div className="qa-faq__header">
              <span className="qa-label">Got Questions?</span>
              <h2 className="qa-h2" id="qa-faq-heading">Frequently Asked Questions</h2>
            </div>
            <dl className="qa-faq__list">
              {FAQ_ITEMS.map(({ question, answer }, i) => (
                <details key={i} className="qa-faq__item">
                  <summary className="qa-faq__q">
                    <span className="qa-faq__q-text">{question}</span>
                    <span className="qa-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="qa-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="qa-cta" aria-labelledby="qa-cta-heading">
          <div className="qa-cta__inner">
            <span className="qa-cta__eyebrow">Start a Project</span>
            <h2 className="qa-cta__h2" id="qa-cta-heading">
              Ready to ship software with <em>AI-powered</em> confidence?
            </h2>
            <p className="qa-cta__sub">
              Talk to our Agentic AI QA specialists for a free strategy consultation. We&apos;ll
              design an intelligent testing architecture tailored to your stack, team, and release velocity.
            </p>
            <ConsultationCTA className="qa-cta__btn" ariaLabel="Get a free AI-powered QA consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="qa-sticky-cta">
          <ConsultationCTA className="qa-sticky-cta__btn">Get a Free Quote</ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />

    </>
  );
}