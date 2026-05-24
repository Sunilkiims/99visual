// app/partner/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Partner page — 99 Visual Solutions
//
// AUDIT FIXES APPLIED (v2):
//   ✅ All prior fixes retained from v1.
//   ✅ FIX: <dl> wrapping <details> replaced with <div> — <dl> requires
//      <dt>/<dd> children; using it as a container for <details> is invalid
//      HTML and breaks accessibility tree parsing.
//   ✅ FIX: breadcrumbFromItems() produces @id = "${BASE}/partner#breadcrumb"
//      (last item URL + "#breadcrumb") which matches partnerPageNode's
//      breadcrumb: { "@id": "${BASE}/partner#breadcrumb" } — confirmed correct.
//   ✅ FIX: primaryImageOfPage given "@id" for graph node coherence.
//   ✅ NOTE: dateModified is build-time static (module scope) — safe for SSG/ISR.
//      If this page is SSR, pin to a hardcoded last-edit date instead.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader     from "@/app/components/PageLoader";
import { FaHandshake, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

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
  title: "Partner With 99 Visual | White-Label & Agency Collaboration",

  description:
    "Partner with 99 Visual Solutions — white-label web development, 3D visualisation, SEO & digital marketing. Scale globally with India's trusted IT partner. 30+ global partners.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/partner`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "Partner With 99 Visual | White-Label & Agency Collaboration",
    description: "Join 99 Visual's partner ecosystem — white-label web development, 3D visualisation, SEO & digital marketing. Build strategic collaborations and scale globally. 30+ active partners.",
    url:         `${BASE}/partner`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/partner-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Partner With 99 Visual Solutions — Business Collaboration & Growth Opportunities India",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Partner With 99 Visual | White-Label & Agency Collaboration",
    description: "India's trusted IT partner for white-label web development, 3D visualisation, SEO & digital marketing. 30+ global partners.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/partner-og.jpg`,
        alt: "Partner With 99 Visual Solutions — Business Collaboration India",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — single source of truth for schema AND visible HTML
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What types of partnerships does 99 Visual Solutions offer?",
    answer:
      "99 Visual Solutions offers four partnership models: Business Partnerships for enterprises seeking tailored IT and visualisation solutions; Global Partnerships for international digital collaboration; Technology Partnerships for innovators building next-generation transformation solutions; and Creative Partnerships for agencies and designers creating digital experiences. Each model is structured to meet you where you are and scale as your business grows.",
  },
  {
    question: "Does 99 Visual offer white-label web development services?",
    answer:
      `Yes, we provide fully white-label web development, SEO, digital marketing, and 3D visualisation services so agencies can resell our expertise under their own brand. Our white-label model includes full NDA protection, dedicated project managers, and delivery that matches your brand standards — your clients never know we're involved. Contact us at ${CONTACT_EMAIL} to discuss white-label arrangements.`,
  },
  {
    question: "Can international agencies partner with 99 Visual?",
    answer:
      "Absolutely. We work with partners across India, the USA, UK, UAE, and Australia, providing offshore IT collaboration with competitive pricing and fast turnaround. Our team ensures time-zone overlap, real-time communication via Slack or Teams, and agile delivery cycles that work for international partners. We have successfully managed long-term white-label relationships with agencies across multiple continents.",
  },
  {
    question: "How many global partners does 99 Visual Solutions currently work with?",
    answer:
      "99 Visual Solutions has an active network of over 30 global partners across various industries and regions, including agencies, startups, and enterprises in the USA, UK, UAE, and Australia. Our partner relationships are built on long-term mutual success, transparent communication, and consistent delivery quality. We prioritise depth of partnership over volume.",
  },
  {
    question: "How do I start a partnership with 99 Visual Solutions?",
    answer:
      `You can initiate a partnership by visiting our contact page at 99visual.com/contact or emailing us at ${CONTACT_EMAIL}. Our partnerships team typically responds within 24 business hours. We begin with a no-obligation discovery call to understand your needs, followed by a tailored partnership proposal with clear terms, timelines, and deliverables.`,
  },
  {
    question: "What industries do 99 Visual's partners typically come from?",
    answer:
      "Our partners come from a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, and logistics. We work with digital agencies, IT consultancies, design studios, and enterprise businesses — any organisation that needs to scale their digital delivery capabilities without expanding their in-house team.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01T00:00:00+05:30";
const DATE_MODIFIED  = new Date().toISOString();

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

// breadcrumbFromItems() produces:
//   { "@type": "BreadcrumbList", "@id": "https://www.99visual.com/partner#breadcrumb", ... }
// The last item URL is "/partner" → abs("/partner") = BASE + "/partner"
// → "@id" = "${BASE}/partner#breadcrumb" ✅ matches partnerPageNode.breadcrumb below.
const partnerBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Partner", url: "/partner" },
]);

// faqSchema() returns { "@type": "FAQPage", mainEntity: [...] } with no "@id".
// Destructuring "@type" and "@id" before spreading prevents duplicate field errors.
const { "@type": _faqType, "@id": _faqId, ...faqBase } = faqSchema(FAQ_ITEMS) as Record<string, unknown>;

const partnerFaqNode = {
  "@type":          "FAQPage",
  "@id":            `${BASE}/partner#faq`,
  ...faqBase,
  mainEntityOfPage: { "@id": `${BASE}/partner#webpage` },
};

const partnerPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/partner#webpage`,
  url:           `${BASE}/partner`,
  name:          "Partner With 99 Visual | White-Label & Agency Collaboration",
  description:   "Join 99 Visual's partner ecosystem for white-label web development, 3D visualisation, SEO, and digital marketing. Build strategic collaborations and scale globally.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  // ✅ FIX: "@id" added for graph node coherence
  primaryImageOfPage: {
    "@type":   "ImageObject",
    "@id":     `${BASE}/partner#primaryimage`,
    url:       `${BASE}/images/og/partner-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Partner With 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".pt-hero__h1", ".pt-hero__sub"],
  },
  // ✅ Matches "@id" produced by breadcrumbFromItems() above
  breadcrumb:      { "@id": `${BASE}/partner#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/partner`] },
};

const partnerGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  partnerPageNode,
  partnerBreadcrumbNode,
  partnerFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const partnerTypes = [
  { icon: FaHandshake, accent: "#f97316", label: "Business Partners",   desc: "Collaborate with enterprises to deliver tailored IT and visualization solutions at scale." },
  { icon: FaGlobe,     accent: "#22d3ee", label: "Global Partners",     desc: "Expand your reach with international collaborations and worldwide digital impact." },
  { icon: FaUsers,     accent: "#a78bfa", label: "Technology Partners", desc: "Work with innovators to build next-gen digital transformation solutions." },
  { icon: FaLightbulb, accent: "#fbbf24", label: "Creative Partners",   desc: "Partner with agencies and designers to create unforgettable digital experiences." },
];

const whyItems = [
  { num: "01", title: "Trusted Expertise",  desc: "Proven depth in web development, IT consulting, 3D visualization, and performance marketing." },
  { num: "02", title: "Global Network",     desc: "Strong collaborations with clients and partners across industries on every continent." },
  { num: "03", title: "Innovation Driven",  desc: "Constantly evolving with cutting-edge technologies and data-backed growth strategies." },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-partner-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:#080808;--c-surface:#0f0f0f;--c-border:rgba(255,255,255,0.07);
          --c-orange:#f97316;--c-muted:rgba(255,255,255,0.45);
          --ff-serif:'Cormorant Garamond',serif;--ff-sans:'DM Sans',sans-serif;
        }

        .sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO ═══════════════════════════════════════════════════════════ */
        .pt-hero{position:relative;min-height:92vh;display:flex;flex-direction:row;align-items:center;background:var(--c-bg);overflow:hidden;}
        .pt-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:52px 52px;}
        .pt-hero__left{position:relative;z-index:10;flex:1 1 340px;padding:6rem 3rem 6rem 6rem;display:flex;flex-direction:column;align-items:flex-start;}
        .pt-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        .pt-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:ptPulse 2s ease-in-out infinite;}
        @keyframes ptPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .pt-hero__h1{font-family:var(--ff-serif);font-size:clamp(2rem,4.5vw,3.8rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;}
        .pt-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:.2px var(--c-orange);}
        .pt-hero__rule{width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 0 1.4rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both;}
        .pt-hero__sub{font-family:var(--ff-sans);font-size:clamp(.95rem,1.8vw,1.1rem);font-weight:300;line-height:1.78;color:var(--c-muted);max-width:420px;margin:0 0 2rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .32s both;}
        .pt-hero__stats{display:flex;gap:0;list-style:none;padding:0;margin:0 0 2.4rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .38s both;}
        .pt-hero__stat{padding:0 2rem 0 0;margin-right:2rem;border-right:1px solid rgba(255,255,255,.1);}
        .pt-hero__stat:last-child{border-right:none;margin-right:0;padding-right:0;}
        .pt-hero__stat-num{font-family:var(--ff-serif);font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:600;color:var(--c-orange);line-height:1;margin-bottom:4px;display:block;}
        .pt-hero__stat-label{font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.35);display:block;}
        .pt-hero__cta-group{display:flex;gap:12px;flex-wrap:wrap;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .pt-hero__cta-primary{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-sans);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .22s ease,box-shadow .22s ease;}
        .pt-hero__cta-primary:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.52);}
        .pt-hero__cta-secondary{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-sans);font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--c-orange);border:1px solid rgba(249,115,22,.35);padding:14px 34px;border-radius:100px;text-decoration:none;transition:background .22s ease,border-color .22s ease;}
        .pt-hero__cta-secondary:hover{background:rgba(249,115,22,.08);border-color:var(--c-orange);}
        @keyframes ptFadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}

        .pt-hero__right{flex:0 0 460px;height:92vh;min-height:560px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .pt-anim{position:relative;width:340px;height:400px;pointer-events:none;}
        .pt-globe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;border:1.5px solid rgba(249,115,22,.35);background:radial-gradient(circle at 38% 38%,rgba(249,115,22,.18) 0%,rgba(249,115,22,.06) 50%,rgba(99,102,241,.08) 100%);box-shadow:0 0 40px rgba(249,115,22,.15),0 0 80px rgba(249,115,22,.06),inset 0 1px 0 rgba(255,255,255,.07);animation:ptGlobePulse 4s ease-in-out infinite;z-index:10;display:flex;align-items:center;justify-content:center;}
        @keyframes ptGlobePulse{0%,100%{box-shadow:0 0 40px rgba(249,115,22,.15),0 0 80px rgba(249,115,22,.06),inset 0 1px 0 rgba(255,255,255,.07)}50%{box-shadow:0 0 64px rgba(249,115,22,.28),0 0 120px rgba(249,115,22,.10),inset 0 1px 0 rgba(255,255,255,.07)}}
        .pt-globe__svg{width:80px;height:80px;opacity:.55;}
        .pt-orbit{position:absolute;top:50%;left:50%;border-radius:50%;border:1px solid rgba(249,115,22,.14);transform:translate(-50%,-50%);}
        .pt-orbit--1{width:180px;height:180px;animation:ptOrbit1 14s linear infinite;}
        .pt-orbit--2{width:260px;height:260px;border-color:rgba(34,211,238,.10);animation:ptOrbit2 22s linear infinite reverse;}
        .pt-orbit--3{width:330px;height:330px;border-color:rgba(167,139,250,.08);border-style:dashed;animation:ptOrbit3 30s linear infinite;}
        @keyframes ptOrbit1{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes ptOrbit2{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes ptOrbit3{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        .pt-node{position:absolute;top:50%;left:50%;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:.85rem;transform-origin:center;}
        .pt-node--o1a{width:36px;height:36px;background:rgba(249,115,22,.18);border:1px solid rgba(249,115,22,.4);color:#f97316;margin:-18px 0 0 72px;animation:ptNodeO1a 14s linear infinite;box-shadow:0 0 12px rgba(249,115,22,.25);}
        .pt-node--o1b{width:32px;height:32px;background:rgba(34,211,238,.14);border:1px solid rgba(34,211,238,.35);color:#22d3ee;margin:56px 0 0 -76px;animation:ptNodeO1b 14s linear infinite;box-shadow:0 0 12px rgba(34,211,238,.2);}
        @keyframes ptNodeO1a{from{transform:rotate(0deg) translateX(90px) rotate(0deg)}to{transform:rotate(360deg) translateX(90px) rotate(-360deg)}}
        @keyframes ptNodeO1b{from{transform:rotate(180deg) translateX(90px) rotate(-180deg)}to{transform:rotate(540deg) translateX(90px) rotate(-540deg)}}
        .pt-node--o2a{width:40px;height:40px;background:rgba(167,139,250,.14);border:1px solid rgba(167,139,250,.35);color:#a78bfa;animation:ptNodeO2a 22s linear infinite reverse;box-shadow:0 0 14px rgba(167,139,250,.2);}
        .pt-node--o2b{width:34px;height:34px;background:rgba(251,191,36,.14);border:1px solid rgba(251,191,36,.35);color:#fbbf24;animation:ptNodeO2b 22s linear infinite reverse;box-shadow:0 0 12px rgba(251,191,36,.2);}
        @keyframes ptNodeO2a{from{transform:rotate(60deg) translateX(130px) rotate(-60deg)}to{transform:rotate(420deg) translateX(130px) rotate(-420deg)}}
        @keyframes ptNodeO2b{from{transform:rotate(240deg) translateX(130px) rotate(-240deg)}to{transform:rotate(600deg) translateX(130px) rotate(-600deg)}}
        .pt-pill{position:absolute;display:inline-flex;align-items:center;gap:8px;background:rgba(15,15,15,.92);border:1px solid var(--c-border);border-radius:100px;padding:8px 14px;backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(0,0,0,.4);white-space:nowrap;}
        .pt-pill__dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
        .pt-pill__text{font-family:var(--ff-sans);font-size:.72rem;font-weight:500;color:rgba(255,255,255,.8);}
        .pt-pill__num{font-family:var(--ff-serif);font-size:1rem;font-weight:600;color:var(--c-orange);line-height:1;}
        .pt-pill--1{top:12%;left:-4%;animation:ptPillFloat1 5.5s ease-in-out infinite;}
        .pt-pill--2{top:20%;right:-2%;animation:ptPillFloat2 6.5s ease-in-out infinite;}
        .pt-pill--3{bottom:20%;left:-6%;animation:ptPillFloat3 7s ease-in-out infinite;}
        .pt-pill--4{bottom:10%;right:-4%;animation:ptPillFloat4 5s ease-in-out infinite;}
        @keyframes ptPillFloat1{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-10px) rotate(.5deg)}}
        @keyframes ptPillFloat2{0%,100%{transform:translateY(0) rotate(.5deg)}50%{transform:translateY(-14px) rotate(-.5deg)}}
        @keyframes ptPillFloat3{0%,100%{transform:translateY(0) rotate(.3deg)}50%{transform:translateY(-8px) rotate(-.3deg)}}
        @keyframes ptPillFloat4{0%,100%{transform:translateY(0) rotate(-.3deg)}50%{transform:translateY(-12px) rotate(.3deg)}}
        .pt-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.18;pointer-events:none;}
        .pt-corner--tl{top:22px;left:22px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .pt-corner--tr{top:22px;right:22px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .pt-corner--bl{bottom:22px;left:22px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .pt-corner--br{bottom:22px;right:22px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ══ SECTIONS ════════════════════════════════════════════════════ */
        .p-types{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-section-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:.8rem;display:block;}
        .p-section-h2{font-family:var(--ff-serif);font-size:clamp(2rem,4vw,3.2rem);font-weight:700;line-height:1.1;letter-spacing:-.015em;color:#fff;margin-bottom:1rem;}
        .p-section-sub{font-family:var(--ff-sans);font-size:.95rem;font-weight:300;line-height:1.7;color:var(--c-muted);max-width:480px;}
        .p-types__header{text-align:center;margin:0 auto 4rem;}
        .p-types__grid{display:grid;gap:1.5px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));max-width:1100px;margin:0 auto;border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;}
        .p-type-card{position:relative;background:var(--c-bg);padding:2.4rem 2rem;transition:background .25s ease;}
        .p-type-card:hover{background:#111;}
        .p-type-card__icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem;font-size:1.2rem;background:rgba(255,255,255,.04);border:1px solid var(--c-border);transition:transform .2s ease;}
        .p-type-card:hover .p-type-card__icon-wrap{transform:scale(1.1);}
        .p-type-card__title{font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;color:#fff;margin-bottom:.6rem;letter-spacing:-.01em;}
        .p-type-card__desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .p-type-card__line{position:absolute;bottom:0;left:0;right:0;height:2px;opacity:0;transition:opacity .25s ease;}
        .p-type-card:hover .p-type-card__line{opacity:1;}

        .p-why{background:var(--c-bg);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-why__inner{max-width:1100px;margin:0 auto;}
        .p-why__layout{display:grid;gap:4rem;grid-template-columns:1fr 1fr;align-items:start;}
        @media(max-width:768px){.p-why__layout{grid-template-columns:1fr;}}
        .p-why__items{display:flex;flex-direction:column;gap:0;}
        .p-why__item{padding:2rem 0;border-bottom:1px solid var(--c-border);display:flex;gap:1.5rem;align-items:flex-start;}
        .p-why__item:first-child{border-top:1px solid var(--c-border);}
        .p-why__num{font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;}
        .p-why__item-title{font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;color:#fff;margin-bottom:.4rem;}
        .p-why__item-desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .p-why__visual{position:relative;background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));border:1px solid rgba(249,115,22,.15);border-radius:20px;padding:2.5rem;display:flex;flex-direction:column;gap:1.2rem;}
        .p-why__stats{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.2rem;}
        .p-why__stat{display:flex;flex-direction:column;}
        .p-why__stat-num{font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;display:block;}
        .p-why__stat-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);display:block;}
        .p-why__divider{height:1px;background:var(--c-border);}

        /* ══ FAQ — JSON-LD only, no microdata ═══════════════════════════ */
        .p-faq{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-faq__inner{max-width:800px;margin:0 auto;}
        .p-faq__header{text-align:center;margin-bottom:3.5rem;}
        .p-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--c-border);border-radius:16px;overflow:hidden;}
        .p-faq__item{border-bottom:1px solid var(--c-border);background:var(--c-bg);transition:background .2s ease;}
        .p-faq__item:last-child{border-bottom:none;}
        .p-faq__item[open]{background:#0d0d0d;}
        .p-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .p-faq__q::-webkit-details-marker{display:none;}.p-faq__q::marker{display:none;}
        .p-faq__q-text{font-family:var(--ff-serif);font-size:1.15rem;font-weight:600;color:rgba(255,255,255,.85);line-height:1.35;flex:1;transition:color .2s ease;}
        .p-faq__item[open] .p-faq__q-text,.p-faq__q:hover .p-faq__q-text{color:#fff;}
        .p-faq__chevron{flex-shrink:0;color:var(--c-orange);opacity:.7;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .p-faq__item[open] .p-faq__chevron{transform:rotate(180deg);opacity:1;}
        .p-faq__a{padding:0 1.75rem 1.5rem;animation:ptFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes ptFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .p-faq__a p{font-family:var(--ff-sans);font-size:.92rem;font-weight:300;line-height:1.8;color:var(--c-muted);margin:0;}

        .p-cta{position:relative;background:var(--c-bg);padding:7rem 1.5rem;text-align:center;overflow:hidden;border-top:1px solid var(--c-border);}
        .p-cta__orb{position:absolute;width:600px;height:600px;border-radius:50%;filter:blur(110px);opacity:.12;background:radial-gradient(circle,#f97316,transparent);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .p-cta__content{position:relative;z-index:10;max-width:640px;margin:0 auto;}
        .p-cta__h2{font-family:var(--ff-serif);font-size:clamp(2.2rem,5vw,4rem);font-weight:700;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-bottom:1.2rem;}
        .p-cta__h2 em{font-style:italic;color:var(--c-orange);}
        .p-cta__sub{font-family:var(--ff-sans);font-size:.95rem;font-weight:300;line-height:1.7;color:var(--c-muted);margin-bottom:2.4rem;}
        .p-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-sans);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#fff;border:1px solid rgba(249,115,22,.4);background:rgba(249,115,22,.1);backdrop-filter:blur(12px);padding:14px 34px;border-radius:100px;text-decoration:none;transition:all .2s ease;}
        .p-cta__btn:hover{background:var(--c-orange);color:#080808;border-color:var(--c-orange);transform:translateY(-2px);box-shadow:0 12px 36px rgba(249,115,22,.4);}

        /* ══ RESPONSIVE ══════════════════════════════════════════════════ */
        @media(max-width:900px){.pt-hero__left{padding:5rem 2.5rem 5rem 3rem;}.pt-hero__right{flex:0 0 340px;}.pt-anim{width:260px;height:320px;}}
        @media(max-width:768px){
          .pt-hero{flex-direction:column;min-height:auto;}
          .pt-hero__left{order:2;flex:none;width:100%;padding:2rem 1.5rem 3rem;align-items:center;text-align:center;}
          .pt-hero__sub{max-width:100%;}.pt-hero__stats{justify-content:center;}.pt-hero__cta-group{justify-content:center;}
          .pt-hero__right{order:1;flex:none;width:100%;height:300px;min-height:300px;overflow:visible;padding:0 24px;}
          .pt-anim{width:240px;height:220px;}
          .pt-orbit--1{width:130px;height:130px;}.pt-orbit--2{width:190px;height:190px;}.pt-orbit--3{width:230px;height:230px;}
          .pt-globe{width:80px;height:80px;}.pt-globe__svg{width:52px;height:52px;}
          .pt-pill--1{top:-20px;left:-68px;}.pt-pill--2{top:-20px;right:-68px;}.pt-pill--3{bottom:6px;left:-64px;}.pt-pill--4{bottom:6px;right:-64px;}
          .pt-pill{padding:6px 11px;gap:6px;}.pt-pill__text{font-size:.65rem;}.pt-pill__num{font-size:.9rem;}.pt-pill__dot{width:5px;height:5px;}
        }
        @media(max-width:480px){
          .pt-hero__right{height:280px;min-height:280px;}
          .pt-pill--1{top:-18px;left:-56px;}.pt-pill--2{top:-18px;right:-56px;}.pt-pill--3{bottom:4px;left:-52px;}.pt-pill--4{bottom:4px;right:-52px;}
          .pt-hero__cta-group{flex-direction:column;align-items:center;}
          .pt-hero__cta-primary,.pt-hero__cta-secondary{width:100%;max-width:280px;justify-content:center;}
          .pt-hero__stat{padding:0 1.2rem 0 0;margin-right:1.2rem;}
        }
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="pt-hero" aria-labelledby="pt-hero-heading" id="partner-hero">
        <div className="pt-hero__grid" aria-hidden="true" />
        <div className="pt-corner pt-corner--tl" aria-hidden="true" />
        <div className="pt-corner pt-corner--tr" aria-hidden="true" />
        <div className="pt-corner pt-corner--bl" aria-hidden="true" />
        <div className="pt-corner pt-corner--br" aria-hidden="true" />

        <div className="pt-hero__left">
          {/*
            ✅ Plain semantic nav — no microdata attributes.
            JSON-LD partnerBreadcrumbNode is the sole BreadcrumbList source.
          */}
          <nav className="sr-only" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/partner" aria-current="page">Partner</a></li>
            </ol>
          </nav>

          <p className="pt-hero__eyebrow" aria-hidden="true">
            <span className="pt-hero__dot" />
            Strategic Collaboration · India &amp; Global
          </p>

          <h1 className="pt-hero__h1" id="pt-hero-heading">
            Grow <em>together</em><br />with us
          </h1>

          <div className="pt-hero__rule" aria-hidden="true" />

          <p className="pt-hero__sub">
            We collaborate with agencies, startups, and enterprises to deliver
            scalable, future-ready digital solutions — built on trust and shared ambition.
          </p>

          <dl className="pt-hero__stats" aria-label="Partnership highlights">
            <div className="pt-hero__stat">
              <dt className="pt-hero__stat-label">Global Partners</dt>
              <dd className="pt-hero__stat-num">30+</dd>
            </div>
            <div className="pt-hero__stat">
              <dt className="pt-hero__stat-label">Projects Done</dt>
              <dd className="pt-hero__stat-num">500+</dd>
            </div>
            <div className="pt-hero__stat">
              <dt className="pt-hero__stat-label">Years Active</dt>
              <dd className="pt-hero__stat-num">5+</dd>
            </div>
          </dl>

          <div className="pt-hero__cta-group">
            <a href="#partner-types" className="pt-hero__cta-primary" aria-label="Explore partnership types with 99 Visual Solutions">
              Become a Partner
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link href="/contact" className="pt-hero__cta-secondary" aria-label="Contact 99 Visual Solutions to start a partnership">
              Talk to Us
            </Link>
          </div>
        </div>

        <div className="pt-hero__right" aria-hidden="true">
          <div className="pt-anim">
            <div className="pt-orbit pt-orbit--1" />
            <div className="pt-orbit pt-orbit--2" />
            <div className="pt-orbit pt-orbit--3" />
            <div className="pt-globe">
              <svg className="pt-globe__svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" stroke="#f97316" strokeWidth="1.2" opacity=".7"/>
                <ellipse cx="40" cy="40" rx="36" ry="14" stroke="#f97316" strokeWidth=".8" opacity=".4"/>
                <ellipse cx="40" cy="40" rx="36" ry="26" stroke="#f97316" strokeWidth=".6" opacity=".25"/>
                <line x1="40" y1="4" x2="40" y2="76" stroke="#f97316" strokeWidth=".8" opacity=".4"/>
                <line x1="19" y1="8" x2="19" y2="72" stroke="#f97316" strokeWidth=".6" opacity=".25"/>
                <line x1="61" y1="8" x2="61" y2="72" stroke="#f97316" strokeWidth=".6" opacity=".25"/>
                <path d="M28 30 Q34 26 38 32 Q42 36 36 40 Q30 38 28 30Z" fill="#f97316" opacity=".18"/>
                <path d="M44 34 Q50 30 54 36 Q56 42 50 44 Q44 42 44 34Z" fill="#f97316" opacity=".14"/>
                <path d="M30 46 Q36 44 38 50 Q36 56 30 54 Q26 50 30 46Z" fill="#f97316" opacity=".12"/>
              </svg>
            </div>
            <div className="pt-node pt-node--o1a"><FaHandshake /></div>
            <div className="pt-node pt-node--o1b"><FaGlobe /></div>
            <div className="pt-node pt-node--o2a"><FaUsers /></div>
            <div className="pt-node pt-node--o2b"><FaLightbulb /></div>
            <div className="pt-pill pt-pill--1">
              <span className="pt-pill__dot" style={{ background:"#f97316" }} />
              <span className="pt-pill__text">Global Partners</span>
              <span className="pt-pill__num">30+</span>
            </div>
            <div className="pt-pill pt-pill--2">
              <span className="pt-pill__dot" style={{ background:"#22d3ee" }} />
              <span className="pt-pill__text">Projects Done</span>
              <span className="pt-pill__num">500+</span>
            </div>
            <div className="pt-pill pt-pill--3">
              <span className="pt-pill__dot" style={{ background:"#a78bfa" }} />
              <span className="pt-pill__text">White-Label</span>
              <span className="pt-pill__num">NDA</span>
            </div>
            <div className="pt-pill pt-pill--4">
              <span className="pt-pill__dot" style={{ background:"#fbbf24" }} />
              <span className="pt-pill__text">Response Time</span>
              <span className="pt-pill__num">24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTNER TYPES ═══════════════════════════════════════════════════ */}
      <section id="partner-types" className="p-types" aria-labelledby="p-types-heading">
        <div className="p-types__header">
          <p className="p-section-label">What we offer</p>
          <h2 className="p-section-h2" id="p-types-heading">Types of Partnerships</h2>
          <p className="p-section-sub" style={{ margin:"0 auto" }}>
            Four distinct models — each designed to meet you where you are
            and grow where you&apos;re going.
          </p>
        </div>
        <div className="p-types__grid" role="list">
          {partnerTypes.map(({ icon: Icon, accent, label, desc }) => (
            <article className="p-type-card" key={label} role="listitem" aria-label={label}>
              <div className="p-type-card__icon-wrap" style={{ color: accent }} aria-hidden="true"><Icon /></div>
              <h3 className="p-type-card__title">{label}</h3>
              <p className="p-type-card__desc">{desc}</p>
              <div className="p-type-card__line" style={{ background:`linear-gradient(90deg, ${accent}, transparent)` }} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ══ WHY PARTNER ═════════════════════════════════════════════════════ */}
      <section className="p-why" aria-labelledby="p-why-heading">
        <div className="p-why__inner">
          <div className="p-why__layout">
            <div>
              <p className="p-section-label">Why us</p>
              <h2 className="p-section-h2" id="p-why-heading" style={{ marginBottom:"2.5rem" }}>
                Why partner<br />with 99 Visual?
              </h2>
              <div className="p-why__items">
                {whyItems.map(({ num, title, desc }) => (
                  <div className="p-why__item" key={num}>
                    <span className="p-why__num" aria-hidden="true">{num}</span>
                    <div>
                      <h3 className="p-why__item-title">{title}</h3>
                      <p className="p-why__item-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-why__visual" aria-label="Partnership statistics">
              <dl className="p-why__stats">
                <div className="p-why__stat"><dt className="p-why__stat-label">Years of Expertise</dt><dd className="p-why__stat-num">5+</dd></div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat"><dt className="p-why__stat-label">Projects Delivered</dt><dd className="p-why__stat-num">500+</dd></div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat"><dt className="p-why__stat-label">Global Partners</dt><dd className="p-why__stat-num">30+</dd></div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat"><dt className="p-why__stat-label">Core Service Domains</dt><dd className="p-why__stat-num">6</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════
        ✅ JSON-LD ONLY — zero microdata on this section or any child element.
        partnerFaqNode in the <script> above is the SOLE FAQPage source.
        ✅ Container changed from <dl> to <div> — <dl> requires dt/dd children,
        not <details> elements. Invalid HTML suppressed.
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="p-faq" aria-labelledby="p-faq-heading">
        <div className="p-faq__inner">
          <div className="p-faq__header">
            <p className="p-section-label">Got questions?</p>
            <h2 className="p-section-h2" id="p-faq-heading">Frequently Asked Questions</h2>
            <p className="p-section-sub" style={{ margin:"0 auto" }}>
              Everything you need to know about partnering with 99 Visual Solutions.
            </p>
          </div>

          {/* ✅ FIX: <div> replaces <dl> — valid HTML container for <details> children */}
          <div className="p-faq__list">
            {FAQ_ITEMS.map(({ question, answer }, i) => (
              <details key={i} className="p-faq__item">
                <summary className="p-faq__q">
                  <span className="p-faq__q-text">{question}</span>
                  <span className="p-faq__chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="p-faq__a">
                  <p>{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="p-cta" aria-labelledby="p-cta-heading">
        <div className="p-cta__orb" aria-hidden="true" />
        <div className="p-cta__content">
          <h2 className="p-cta__h2" id="p-cta-heading">
            Let&apos;s build the<br /><em>future</em> together
          </h2>
          <p className="p-cta__sub">
            Join our ecosystem and grow your business through strategic,
            long-term collaboration with a team that&apos;s invested in your success.
          </p>
          <Link href="/contact" className="p-cta__btn" aria-label="Start a partnership with 99 Visual Solutions">
            Partner With Us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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