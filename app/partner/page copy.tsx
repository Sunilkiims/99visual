// app/partner/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Partner page — 99 Visual Solutions
//
// FIXES APPLIED:
//   ✅ Removed inline schemaGraph with its own "@context" — same invalid-
//      multiple-@context pattern as home/about pages. Now uses buildGraph().
//   ✅ Removed duplicate Organization, LocalBusiness, WebSite node definitions
//      that diverged from lib/schema.ts (foundingDate "2015" vs "2020",
//      different logo refs, different descriptions). Single source of truth.
//   ✅ Page-specific nodes (WebPage, BreadcrumbList, FAQPage) kept inline —
//      correct pattern since they are unique to this route.
//   ✅ All other SEO, a11y, FAQ HTML, and structured data intact.
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
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumb,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Partner With 99 Visual | White-Label & Agency Collaboration India",
  description:
    "Partner with 99 Visual Solutions — white-label web development, 3D visualisation, SEO & digital marketing collaborations. Scale globally with India's trusted IT partner.",
  metadataBase: new URL(BASE),
  alternates: {
    canonical: "/partner",
    languages: {
      "en-IN":     `${BASE}/partner`,
      "en-US":     `${BASE}/partner`,
      "en-GB":     `${BASE}/partner`,
      "en-AE":     `${BASE}/partner`,
      "en-AU":     `${BASE}/partner`,
      "x-default": `${BASE}/partner`,
    },
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
    title: "Partner With 99 Visual | White-Label & Agency Collaboration",
    description:
      "Join 99 Visual's partner ecosystem — white-label web development, 3D visualisation, SEO & digital marketing. Build strategic collaborations and scale globally.",
    url: `${BASE}/partner`,
    siteName: "99 Visual Solutions",
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
    description: "India's trusted IT partner for white-label web development, 3D visualisation, SEO & digital marketing collaborations.",
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
// FAQ DATA — single source of truth for both schema and visible HTML
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What types of partnerships does 99 Visual Solutions offer?",
    answer:
      "99 Visual Solutions offers four partnership models: Business Partnerships for enterprises seeking tailored IT and visualisation solutions; Global Partnerships for international digital collaboration; Technology Partnerships for innovators building next-gen transformation solutions; and Creative Partnerships for agencies and designers creating digital experiences. Each model is structured to meet you where you are and scale as you grow.",
  },
  {
    question: "Does 99 Visual offer white-label web development services?",
    answer:
      "Yes. We provide fully white-label web development, SEO, digital marketing, and 3D visualisation services so agencies can resell our expertise under their own brand. Our white-label model includes full NDA protection, dedicated project managers, and delivery that matches your brand standards — your clients never know we're involved.",
  },
  {
    question: "Can international agencies partner with 99 Visual?",
    answer:
      "Absolutely. We work with partners across India, the USA, UK, UAE, and Australia, providing offshore IT collaboration with competitive pricing and fast turnaround. Our team ensures time-zone overlap, real-time communication via Slack or Teams, and agile delivery cycles that work for international partners.",
  },
  {
    question: "How many global partners does 99 Visual Solutions currently work with?",
    answer:
      "99 Visual Solutions has an active network of over 30 global partners across various industries and regions, including agencies, startups, and enterprises in the USA, UK, UAE, and Australia. Our partner relationships are long-term and built on shared success metrics.",
  },
  {
    question: "How do I start a partnership with 99 Visual Solutions?",
    answer:
      "You can initiate a partnership by visiting our contact page at 99visual.com/contact or emailing us at contact@99visual.com. Our partnerships team typically responds within 24 business hours. We begin with a no-obligation discovery call to understand your needs, followed by a tailored partnership proposal.",
  },
  {
    question: "What industries do 99 Visual's partners typically come from?",
    answer:
      "Our partners come from a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, and logistics. We work with digital agencies, IT consultancies, design studios, and enterprise businesses — any organisation that needs to scale their digital delivery capabilities.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — page-specific nodes only
// Organization, LocalBusiness, WebSite come from lib/schema.ts (single source
// of truth). Only WebPage, BreadcrumbList, and FAQPage are defined here since
// they are unique to this route.
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

const partnerBreadcrumbNode = {
  ...breadcrumb([
    { name: "Home",    url: "/" },
    { name: "Partner", url: "/partner" },
  ]),
  "@id": `${BASE}/partner#breadcrumb`,
};

const partnerFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${BASE}/partner#faq`,
  mainEntityOfPage: { "@id": `${BASE}/partner#webpage` },
};

const partnerPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/partner#webpage`,
  url:           `${BASE}/partner`,
  name:          "Partner With 99 Visual | White-Label & Agency Collaboration India",
  description:   "Join 99 Visual's partner ecosystem for white-label web development, 3D visualisation, SEO, and digital marketing. Build strategic collaborations and scale your business globally.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/og/partner-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Partner With 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".p-hero__h1", ".p-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/partner#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/partner`] },
};

// Single @graph — one @context, zero duplicated node definitions.
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
  {
    icon: FaHandshake,
    accent: "#f97316",
    label: "Business Partners",
    desc:  "Collaborate with enterprises to deliver tailored IT and visualization solutions at scale.",
  },
  {
    icon: FaGlobe,
    accent: "#22d3ee",
    label: "Global Partners",
    desc:  "Expand your reach with international collaborations and worldwide digital impact.",
  },
  {
    icon: FaUsers,
    accent: "#a78bfa",
    label: "Technology Partners",
    desc:  "Work with innovators to build next-gen digital transformation solutions.",
  },
  {
    icon: FaLightbulb,
    accent: "#fbbf24",
    label: "Creative Partners",
    desc:  "Partner with agencies and designers to create unforgettable digital experiences.",
  },
];

const whyItems = [
  {
    num:   "01",
    title: "Trusted Expertise",
    desc:  "Proven depth in web development, IT consulting, 3D visualization, and performance marketing.",
  },
  {
    num:   "02",
    title: "Global Network",
    desc:  "Strong collaborations with clients and partners across industries on every continent.",
  },
  {
    num:   "03",
    title: "Innovation Driven",
    desc:  "Constantly evolving with cutting-edge technologies and data-backed growth strategies.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT — Server Component, no "use client"
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  return (
    <>
      <PageLoader />

      {/* Single JSON-LD script — one @context via buildGraph */}
      <script
        id="schema-partner-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerGraph) }}
      />

      {/* ── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        .sr-only {
          position: absolute !important;
          width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* ── Hero ────────────────────────────────────────────────────────── */
        .p-hero {
          position: relative; min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg); overflow: hidden;
          padding: 8rem 1.5rem 6rem; text-align: center;
        }
        .p-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: pOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .p-hero__orb--1 { width:560px;height:560px;background:radial-gradient(circle,#f97316,#ea580c);top:-180px;left:-120px;opacity:.16; }
        .p-hero__orb--2 { width:420px;height:420px;background:radial-gradient(circle,#fb923c,#f97316);bottom:-120px;right:-80px;opacity:.12;animation-delay:-8s; }
        @keyframes pOrbDrift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(36px,28px) scale(1.07)} }

        .p-hero__grid {
          position:absolute;inset:0;pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .p-hero__grain {
          position:absolute;inset:0;opacity:.03;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px 180px;
        }

        .p-hero__content {
          position:relative;z-index:10;max-width:760px;margin:0 auto;
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes pFadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }

        .p-hero__eyebrow {
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);
          border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);
          padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;
          backdrop-filter:blur(8px);
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .p-hero__dot { width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:pPulse 2s ease-in-out infinite; }
        @keyframes pPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .p-hero__h1 {
          font-family:var(--ff-serif);
          font-size:clamp(2rem,5vw,3.6rem);
          font-weight:700;line-height:1.1;letter-spacing:-.02em;
          color:#fff;margin:0 0 1rem;
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .p-hero__h1 em { font-style:italic;color:transparent;-webkit-text-stroke:0.2px var(--c-orange); }

        .p-hero__rule {
          width:48px;height:1px;
          background:linear-gradient(90deg,transparent,var(--c-orange),transparent);
          margin:0 auto 1.5rem;
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .p-hero__sub {
          font-family:var(--ff-sans);font-size:clamp(.95rem,2vw,1.12rem);
          font-weight:300;line-height:1.75;color:var(--c-muted);
          max-width:520px;margin:0 auto 2.6rem;
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .p-hero__cta-group {
          display:flex;gap:12px;justify-content:center;flex-wrap:wrap;
          animation:pFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .p-hero__cta-primary {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;color:#080808;
          background:linear-gradient(135deg,#fb923c,#f97316);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          box-shadow:0 8px 32px rgba(249,115,22,.35);
          transition:transform .2s ease,box-shadow .2s ease;
        }
        .p-hero__cta-primary:hover { transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5); }
        .p-hero__cta-secondary {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:var(--c-orange);
          border:1px solid rgba(249,115,22,.35);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          transition:background .2s ease,border-color .2s ease;
        }
        .p-hero__cta-secondary:hover { background:rgba(249,115,22,.08);border-color:var(--c-orange); }

        .p-hero__scroll {
          position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
          z-index:20;display:flex;flex-direction:column;align-items:center;gap:6px;
          text-decoration:none;animation:pFadeUp .9s ease .8s both;
        }
        .p-hero__scroll-line {
          width:1px;height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:pScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes pScrollLine {
          0%  {transform:scaleY(0);transform-origin:top;opacity:1}
          50% {transform:scaleY(1);transform-origin:top;opacity:1}
          100%{transform:scaleY(1);transform-origin:bottom;opacity:0}
        }
        .p-hero__scroll-lbl {
          font-family:var(--ff-sans);font-size:9px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.22);
        }

        .p-corner { position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none; }
        .p-corner--tl{top:24px;left:24px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .p-corner--tr{top:24px;right:24px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .p-corner--bl{bottom:64px;left:24px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .p-corner--br{bottom:64px;right:24px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ── Partner Types ────────────────────────────────────────────────── */
        .p-types { background:var(--c-surface);padding:6rem 1.5rem; }
        .p-section-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:.8rem;
        }
        .p-section-h2 {
          font-family:var(--ff-serif);font-size:clamp(2rem,4vw,3.2rem);
          font-weight:700;line-height:1.1;letter-spacing:-.015em;color:#fff;margin-bottom:1rem;
        }
        .p-section-sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);max-width:480px;
        }
        .p-types__header { text-align:center;margin:0 auto 4rem; }
        .p-types__grid {
          display:grid;gap:1.5px;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          max-width:1100px;margin:0 auto;
          border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;
        }
        .p-type-card {
          position:relative;background:var(--c-bg);
          padding:2.4rem 2rem;
          transition:background .25s ease;
        }
        .p-type-card:hover { background:#111; }
        .p-type-card__icon-wrap {
          width:48px;height:48px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:1.4rem;font-size:1.2rem;
          background:rgba(255,255,255,.04);border:1px solid var(--c-border);
          transition:transform .2s ease;
        }
        .p-type-card:hover .p-type-card__icon-wrap { transform:scale(1.1); }
        .p-type-card__title {
          font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;
          color:#fff;margin-bottom:.6rem;letter-spacing:-.01em;
        }
        .p-type-card__desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .p-type-card__line {
          position:absolute;bottom:0;left:0;right:0;height:2px;
          opacity:0;transition:opacity .25s ease;
        }
        .p-type-card:hover .p-type-card__line { opacity:1; }

        /* ── Why Partner ──────────────────────────────────────────────────── */
        .p-why { background:var(--c-bg);padding:6rem 1.5rem; }
        .p-why__inner { max-width:1100px;margin:0 auto; }
        .p-why__layout {
          display:grid;gap:4rem;grid-template-columns:1fr 1fr;align-items:start;
        }
        @media(max-width:768px) { .p-why__layout{grid-template-columns:1fr;} }
        .p-why__items { display:flex;flex-direction:column;gap:0; }
        .p-why__item {
          padding:2rem 0;border-bottom:1px solid var(--c-border);
          display:flex;gap:1.5rem;align-items:flex-start;
        }
        .p-why__item:first-child { border-top:1px solid var(--c-border); }
        .p-why__num {
          font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;
          color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;
        }
        .p-why__item-title {
          font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;
          color:#fff;margin-bottom:.4rem;
        }
        .p-why__item-desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .p-why__visual {
          position:relative;
          background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));
          border:1px solid rgba(249,115,22,.15);border-radius:20px;
          padding:2.5rem;display:flex;flex-direction:column;gap:1.2rem;
        }
        .p-why__stats { list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.2rem; }
        .p-why__stat { display:flex;flex-direction:column; }
        .p-why__stat-num {
          font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);
          font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;
          display:block;
        }
        .p-why__stat-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);
          display:block;
        }
        .p-why__divider { height:1px;background:var(--c-border); }

        /* ── FAQ Section ──────────────────────────────────────────────────── */
        .p-faq { background:var(--c-surface);padding:6rem 1.5rem; }
        .p-faq__inner { max-width:800px;margin:0 auto; }
        .p-faq__header { text-align:center;margin-bottom:3.5rem; }
        .p-faq__list {
          display:flex;flex-direction:column;gap:0;
          border:1px solid var(--c-border);border-radius:16px;overflow:hidden;
        }
        .p-faq__item {
          border-bottom:1px solid var(--c-border);
          background:var(--c-bg);
          transition:background .2s ease;
        }
        .p-faq__item:last-child { border-bottom:none; }
        .p-faq__item[open] { background:#0d0d0d; }
        .p-faq__q {
          list-style:none;
          display:flex;align-items:center;justify-content:space-between;gap:1rem;
          padding:1.5rem 1.75rem;
          cursor:pointer;user-select:none;
        }
        .p-faq__q::-webkit-details-marker { display:none; }
        .p-faq__q::marker { display:none; }
        .p-faq__q-text {
          font-family:var(--ff-serif);font-size:1.15rem;font-weight:600;
          color:rgba(255,255,255,.85);line-height:1.35;flex:1;
          transition:color .2s ease;
        }
        .p-faq__item[open] .p-faq__q-text { color:#fff; }
        .p-faq__q:hover .p-faq__q-text { color:#fff; }
        .p-faq__chevron {
          flex-shrink:0;color:var(--c-orange);opacity:.7;
          transition:transform .3s cubic-bezier(.22,1,.36,1), opacity .2s ease;
        }
        .p-faq__item[open] .p-faq__chevron { transform:rotate(180deg);opacity:1; }
        .p-faq__a {
          padding:0 1.75rem 1.5rem;
          animation:pFaqOpen .3s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes pFaqOpen {
          from { opacity:0;transform:translateY(-6px); }
          to   { opacity:1;transform:translateY(0); }
        }
        .p-faq__a p {
          font-family:var(--ff-sans);font-size:.92rem;font-weight:300;
          line-height:1.8;color:var(--c-muted);margin:0;
        }

        /* ── CTA Section ──────────────────────────────────────────────────── */
        .p-cta {
          position:relative;background:var(--c-bg);
          padding:7rem 1.5rem;text-align:center;overflow:hidden;
        }
        .p-cta__orb {
          position:absolute;width:600px;height:600px;border-radius:50%;
          filter:blur(110px);opacity:.12;
          background:radial-gradient(circle,#f97316,transparent);
          top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
        }
        .p-cta__content { position:relative;z-index:10;max-width:640px;margin:0 auto; }
        .p-cta__h2 {
          font-family:var(--ff-serif);font-size:clamp(2.2rem,5vw,4rem);
          font-weight:700;line-height:1.05;letter-spacing:-.02em;
          color:#fff;margin-bottom:1.2rem;
        }
        .p-cta__h2 em { font-style:italic;color:var(--c-orange); }
        .p-cta__sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);margin-bottom:2.4rem;
        }
        .p-cta__btn {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;color:#fff;
          border:1px solid rgba(249,115,22,.4);background:rgba(249,115,22,.1);
          backdrop-filter:blur(12px);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          transition:all .2s ease;
        }
        .p-cta__btn:hover {
          background:var(--c-orange);color:#080808;border-color:var(--c-orange);
          transform:translateY(-2px);box-shadow:0 12px 36px rgba(249,115,22,.4);
        }

        /* ── Responsive ───────────────────────────────────────────────────── */
        @media (max-width:600px) {
          .p-hero__cta-group { flex-direction:column;align-items:center; }
          .p-faq__q { padding:1.25rem; }
          .p-faq__a { padding:0 1.25rem 1.25rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Header />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="p-hero"
        aria-label="Partner With 99 Visual Solutions"
        id="partner-hero"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div aria-hidden="true">
          <div className="p-hero__orb p-hero__orb--1" />
          <div className="p-hero__orb p-hero__orb--2" />
          <div className="p-hero__grid" />
          <div className="p-hero__grain" />
        </div>

        <div className="p-corner p-corner--tl" aria-hidden="true" />
        <div className="p-corner p-corner--tr" aria-hidden="true" />
        <div className="p-corner p-corner--bl" aria-hidden="true" />
        <div className="p-corner p-corner--br" aria-hidden="true" />

        {/* Breadcrumb — sr-only, crawlable by Googlebot */}
        <nav className="sr-only" aria-label="Breadcrumb" aria-hidden="true">
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/partner" itemProp="item" aria-current="page">
                <span itemProp="name">Partner</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <div className="p-hero__content">
          <p className="p-hero__eyebrow" aria-hidden="true">
            <span className="p-hero__dot" />
            Strategic Collaboration · India &amp; Global
          </p>

          <h1 className="p-hero__h1" itemProp="name">
            Grow <em>together</em><br />with us
          </h1>

          <div className="p-hero__rule" aria-hidden="true" />

          <p className="p-hero__sub" itemProp="description">
            We collaborate with agencies, startups, and enterprises to deliver scalable,
            future-ready digital solutions — built on trust and shared ambition.
          </p>

          <div className="p-hero__cta-group">
            <a
              href="#partner-types"
              className="p-hero__cta-primary"
              aria-label="Explore partnership types with 99 Visual Solutions"
            >
              Become a Partner
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="p-hero__cta-secondary"
              aria-label="Contact 99 Visual Solutions to start a partnership"
            >
              Talk to Us
            </Link>
          </div>
        </div>

        <a href="#partner-types" className="p-hero__scroll" aria-label="Scroll to partner types">
          <div className="p-hero__scroll-line" aria-hidden="true" />
          <span className="p-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ PARTNER TYPES ═══════════════════════════════════════════════════ */}
      <section id="partner-types" className="p-types" aria-labelledby="p-types-heading">
        <div className="p-types__header">
          <p className="p-section-label">What we offer</p>
          <h2 className="p-section-h2" id="p-types-heading">Types of Partnerships</h2>
          <p className="p-section-sub" style={{ margin: "0 auto" }}>
            Four distinct models — each designed to meet you where you are
            and grow where you&apos;re going.
          </p>
        </div>

        <div className="p-types__grid" role="list">
          {partnerTypes.map(({ icon: Icon, accent, label, desc }) => (
            <article className="p-type-card" key={label} role="listitem" aria-label={label}>
              <div className="p-type-card__icon-wrap" style={{ color: accent }} aria-hidden="true">
                <Icon />
              </div>
              <h3 className="p-type-card__title">{label}</h3>
              <p className="p-type-card__desc">{desc}</p>
              <div
                className="p-type-card__line"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                aria-hidden="true"
              />
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
              <h2 className="p-section-h2" id="p-why-heading" style={{ marginBottom: "2.5rem" }}>
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
                <div className="p-why__stat">
                  <dt className="p-why__stat-label">Years of Expertise</dt>
                  <dd className="p-why__stat-num">5+</dd>
                </div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat">
                  <dt className="p-why__stat-label">Projects Delivered</dt>
                  <dd className="p-why__stat-num">500+</dd>
                </div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat">
                  <dt className="p-why__stat-label">Global Partners</dt>
                  <dd className="p-why__stat-num">30+</dd>
                </div>
                <div className="p-why__divider" aria-hidden="true" />
                <div className="p-why__stat">
                  <dt className="p-why__stat-label">Core Service Domains</dt>
                  <dd className="p-why__stat-num">6</dd>
                </div>
              </dl>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════
        Visible FAQ section — id="faq" matches @id="${BASE}/partner#faq" in JSON-LD.
        <details>/<summary> = pure HTML accordion, no JS, no "use client".
        itemScope/itemProp microdata doubles the structured data signal.
        Google explicitly permits collapsed <details> for FAQ rich results.
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="faq"
        className="p-faq"
        aria-labelledby="p-faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="p-faq__inner">
          <div className="p-faq__header">
            <p className="p-section-label">Got questions?</p>
            <h2 className="p-section-h2" id="p-faq-heading">
              Frequently Asked Questions
            </h2>
            <p className="p-section-sub" style={{ margin: "0 auto" }}>
              Everything you need to know about partnering with 99 Visual Solutions.
            </p>
          </div>

          <dl className="p-faq__list">
            {FAQ_ITEMS.map(({ question, answer }, i) => (
              <details
                key={i}
                className="p-faq__item"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="p-faq__q" itemProp="name">
                  <span className="p-faq__q-text">{question}</span>
                  <span className="p-faq__chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div
                  className="p-faq__a"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{answer}</p>
                </div>
              </details>
            ))}
          </dl>
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
          <Link
            href="/contact"
            className="p-cta__btn"
            aria-label="Start a partnership with 99 Visual Solutions"
          >
            Partner With Us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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