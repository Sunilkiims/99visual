// app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade About page — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #2 — Replaced deprecated breadcrumb() with breadcrumbFromItems()
//      which now emits item as { "@type": "Thing", "@id": url } objects.
//      Google Rich Results eligibility restored.
//   ✅ E-E-A-T fix — "10+ years" corrected to "5+ years" (founded 2020).
//   ✅ CONTACT_EMAIL imported from schema.ts — single source of truth.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed — all variants pointed to identical URLs.
//   ✅ aria-hidden removed from breadcrumb <nav> — use sr-only pattern instead.
//   ✅ aboutBreadcrumbNode simplified — no more fragile spread + @id override.
//   ✅ datePublished aligned to "2023-01-01" site-wide standard.
//   ✅ FAQ answers expanded to 40+ words for rich result eligibility.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Header         from "../components/header";
import Footer         from "../components/footer";
import ScrollDown     from "../components/scrolldown";
import Chatbot        from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";
import PageLoader     from "../components/PageLoader";
import TabAbout       from "../components/tabstory";
import WhyChooseUs    from "../components/whychooseus";
import DataPrivacy    from "../components/dataprivacy";
import ContactCTA     from "@/app/components/Contactcta";
import { FaCode, FaCubes, FaSearchLocation, FaLaptopCode } from "react-icons/fa";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  // ✅ FIX: use breadcrumbFromItems() directly — not deprecated breadcrumb()
  breadcrumbFromItems,
  webPage,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ FIX: Shortened to 66 chars — within acceptable range
  title: "About 99 Visual Solutions | IT & 3D Visualization Bangalore",

  // ✅ FIX: "5+ years" (founded 2020, not 10+ years)
  description:
    "Meet 99 Visual Solutions — Bengaluru's full-service IT company. Founded in 2020, 500+ projects across web development, 3D visualisation, CAD, GIS, SEO & IT consulting.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/about`,
    // ✅ FIX: Hreflang removed — all variants pointed to identical URLs.
    // Use Google Search Console geo-targeting instead.
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
    title:       "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    description: "Bengaluru IT company founded in 2020 with 500+ projects. Full-service digital transformation — web, app, 3D visualisation, CAD, GIS, SEO & IT consulting.",
    url:         `${BASE}/about`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/about-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "99 Visual Solutions team — IT & Digital Transformation Company, Bengaluru India",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    // ✅ FIX: "5+ years" consistent with foundingDate 2020
    description: "Founded 2020 · 500+ projects · 6 specialisations. Bengaluru IT company serving India, USA, UK, UAE & Australia.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/about-og.jpg`,
        alt: "99 Visual Solutions — Global IT & Digital Transformation Company, Bengaluru",
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
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES
// ─────────────────────────────────────────────────────────────────────────────

// ✅ FIX: breadcrumbFromItems() now emits item as { "@type": "Thing", "@id": url }
// No more fragile spread + @id override pattern.
const aboutBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",  url: "/" },
  { name: "About", url: "/about" },
]);

// ✅ FIX: FAQ answers expanded to 40+ words for rich result eligibility.
// ✅ FIX: Email uses CONTACT_EMAIL constant — single source of truth.
const aboutFaqNode = {
  ...faqSchema([
    {
      question: "What services does 99 Visual Solutions offer?",
      answer:
        "99 Visual Solutions is a full-service IT and digital transformation company offering 3D architectural visualisation, custom web and mobile app development, CAD drafting, GIS and LiDAR mapping, digital marketing and SEO, IT consulting, and AI-powered QA and automation testing. We serve startups and enterprises across India, the USA, UK, UAE, and Australia, delivering measurable outcomes on every engagement.",
    },
    {
      question: "When was 99 Visual Solutions founded?",
      answer:
        "99 Visual Solutions was founded in 2020 and is headquartered in Bengaluru (Bangalore), Karnataka, India. Since our founding, we have grown into a full-service digital transformation company with over 500 projects delivered for clients across India, the USA, UK, UAE, and Australia. We combine deep technical expertise with a client-first approach on every project.",
    },
    {
      question: "How many projects has 99 Visual Solutions completed?",
      answer:
        "99 Visual Solutions has successfully delivered over 500 projects across IT, web development, 3D architectural visualisation, CAD drafting, GIS and LiDAR mapping, and digital marketing domains. Our clients range from early-stage startups to established enterprises across multiple industries including real estate, architecture, construction, healthcare, retail, and government sectors worldwide.",
    },
    {
      question: "Does 99 Visual Solutions work with international clients?",
      answer:
        "Yes, we actively serve startups and enterprises in the USA, UK, UAE, and Australia alongside our Indian clients. Our offshore IT model delivers world-class quality at competitive rates, with dedicated account managers, agile delivery, and time-zone overlap for seamless real-time communication. We have strong experience managing international projects with transparent reporting and milestone-based delivery.",
    },
    {
      question: "How can I contact 99 Visual Solutions?",
      answer:
        `You can reach us via our contact page at 99visual.com/contact or email us directly at ${CONTACT_EMAIL}. We typically respond to all enquiries within 24 business hours. We also offer a free discovery call to fully understand your project requirements before sending any proposal. All initial consultations are obligation-free and tailored to your specific business needs.`,
    },
    {
      question: "What industries does 99 Visual Solutions serve?",
      answer:
        "We serve a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, logistics, and government. Our multi-disciplinary team brings domain expertise relevant to each sector, ensuring solutions that are both technically sound and commercially effective. Whether you need 3D visualisation for a real estate developer or a custom web application for a healthcare provider, we have you covered.",
    },
    {
      question: "Why choose 99 Visual Solutions over other IT companies in Bangalore?",
      answer:
        "99 Visual Solutions combines six distinct specialisations under one roof — 3D visualisation, web and app development, CAD and GIS, SEO, IT consulting, and QA testing — giving clients a single accountable partner instead of managing multiple agencies. Founded in 2020 with over 500 delivered projects, we bring a transparent, client-first approach to every engagement, consistently delivering measurable results on time and within budget.",
    },
  ]),
  "@id":            `${BASE}/about#faq`,
  mainEntityOfPage: { "@id": `${BASE}/about#webpage` },
};

const aboutPageNode = {
  "@type":       "AboutPage",
  "@id":         `${BASE}/about#webpage`,
  url:           `${BASE}/about`,
  // ✅ FIX: Title shortened, "5+ years" removed (described in description instead)
  name:          "About 99 Visual Solutions | IT & 3D Visualization Company Bangalore",
  description:   "Learn about 99 Visual Solutions — Bengaluru IT company founded in 2020 with 500+ projects across web development, SEO, 3D visualisation, CAD/GIS, and QA testing.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/about-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "99 Visual Solutions — Bengaluru IT Company",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".ab-hero__h1", ".ab-hero__sub"],
  },
  // ✅ FIX: breadcrumb is a reference — matches @id from breadcrumbFromItems above
  breadcrumb:      { "@id": `${BASE}/about#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/about`] },
};

const profilePageNode = {
  "@type":      "ProfilePage",
  "@id":        `${BASE}/about#profilepage`,
  url:          `${BASE}/about`,
  name:         "Company Profile — 99 Visual Solutions",
  dateCreated:  DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntity:   { "@id": `${BASE}/#organization` },
  isPartOf:     { "@id": `${BASE}/#website` },
};

const aboutGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  aboutPageNode,
  profilePageNode,
  // ✅ FIX: standalone BreadcrumbList node with correct @id item objects
  aboutBreadcrumbNode,
  aboutFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-about-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Design tokens ───────────────────────────────────────────────── */
        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ✅ FIX: sr-only — visually hidden but accessible to screen readers
           and crawlers. Use this instead of aria-hidden on navigational elements. */
        .sr-only {
          position:    absolute !important;
          width:       1px      !important;
          height:      1px      !important;
          padding:     0        !important;
          margin:      -1px     !important;
          overflow:    hidden   !important;
          clip:        rect(0,0,0,0) !important;
          white-space: nowrap   !important;
          border:      0        !important;
        }

        /* ══ HERO SHELL ══════════════════════════════════════════════════ */
        .ab-hero {
          position:       relative;
          min-height:     92vh;
          display:        flex;
          flex-direction: row;
          align-items:    center;
          background:     var(--c-bg);
          overflow:       hidden;
        }

        .ab-hero__grid {
          position:         absolute;
          inset:            0;
          pointer-events:   none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* ── Left column ─────────────────────────────────────────────────── */
        .ab-hero__left {
          position:       relative;
          z-index:        10;
          flex:           1 1 340px;
          padding:        6rem 3rem 6rem 6rem;
          display:        flex;
          flex-direction: column;
          align-items:    flex-start;
        }

        .ab-hero__eyebrow {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          font-family:     var(--ff-sans);
          font-size:       10px;
          font-weight:     500;
          letter-spacing:  .22em;
          text-transform:  uppercase;
          color:           var(--c-orange);
          border:          1px solid rgba(249,115,22,.28);
          background:      rgba(249,115,22,.07);
          padding:         6px 16px;
          border-radius:   100px;
          margin-bottom:   1.8rem;
          backdrop-filter: blur(8px);
          animation:       abFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .ab-hero__dot {
          width:         5px;
          height:        5px;
          border-radius: 50%;
          background:    var(--c-orange);
          animation:     abPulse 2s ease-in-out infinite;
        }
        @keyframes abPulse {
          0%,100% { opacity:1;  transform:scale(1); }
          50%     { opacity:.35; transform:scale(.65); }
        }

        .ab-hero__h1 {
          font-family:    var(--ff-serif);
          font-size:      clamp(2rem, 4.5vw, 3.8rem);
          font-weight:    700;
          line-height:    1.1;
          letter-spacing: -.02em;
          color:          #fff;
          margin:         0 0 1rem;
          animation:      abFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;
        }
        .ab-hero__h1 em {
          font-style:          italic;
          color:               transparent;
          -webkit-text-stroke: .2px var(--c-orange);
        }

        .ab-hero__rule {
          width:      48px;
          height:     1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin:     0 0 1.4rem;
          animation:  abFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both;
        }

        .ab-hero__sub {
          font-family: var(--ff-sans);
          font-size:   clamp(.95rem, 1.8vw, 1.1rem);
          font-weight: 300;
          line-height: 1.78;
          color:       var(--c-muted);
          max-width:   420px;
          margin:      0 0 2rem;
          animation:   abFadeUp .9s cubic-bezier(.22,1,.36,1) .32s both;
        }

        /* ── Stats row ────────────────────────────────────────────────────── */
        .ab-hero__stats {
          display:   flex;
          gap:       0;
          list-style: none;
          padding:   0;
          margin:    0 0 2.4rem;
          animation: abFadeUp .9s cubic-bezier(.22,1,.36,1) .38s both;
        }
        .ab-hero__stat {
          padding:      0 2rem 0 0;
          margin-right: 2rem;
          border-right: 1px solid rgba(255,255,255,.1);
        }
        .ab-hero__stat:last-child {
          border-right: none;
          margin-right: 0;
          padding-right: 0;
        }
        .ab-hero__stat-num {
          font-family:   var(--ff-serif);
          font-size:     clamp(1.6rem,3.5vw,2.2rem);
          font-weight:   600;
          color:         var(--c-orange);
          line-height:   1;
          margin-bottom: 4px;
          display:       block;
        }
        .ab-hero__stat-label {
          font-family:    var(--ff-sans);
          font-size:      9px;
          font-weight:    500;
          letter-spacing: .15em;
          text-transform: uppercase;
          color:          rgba(255,255,255,.35);
          display:        block;
        }

        /* ── CTA group ────────────────────────────────────────────────────── */
        .ab-hero__cta-group {
          display:   flex;
          gap:       12px;
          flex-wrap: wrap;
          animation: abFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .ab-hero__cta-primary {
          display:         inline-flex;
          align-items:     center;
          gap:             10px;
          font-family:     var(--ff-sans);
          font-size:       11px;
          font-weight:     600;
          letter-spacing:  .12em;
          text-transform:  uppercase;
          color:           #080808;
          background:      linear-gradient(135deg,#fb923c,#f97316);
          padding:         14px 34px;
          border-radius:   100px;
          text-decoration: none;
          box-shadow:      0 8px 32px rgba(249,115,22,.35);
          transition:      transform .22s ease, box-shadow .22s ease;
        }
        .ab-hero__cta-primary:hover {
          transform:  translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.52);
        }
        .ab-hero__cta-secondary {
          display:         inline-flex;
          align-items:     center;
          gap:             10px;
          font-family:     var(--ff-sans);
          font-size:       11px;
          font-weight:     500;
          letter-spacing:  .12em;
          text-transform:  uppercase;
          color:           var(--c-orange);
          border:          1px solid rgba(249,115,22,.35);
          padding:         14px 34px;
          border-radius:   100px;
          text-decoration: none;
          transition:      background .22s ease, border-color .22s ease;
        }
        .ab-hero__cta-secondary:hover {
          background:   rgba(249,115,22,.08);
          border-color: var(--c-orange);
        }

        @keyframes abFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── Right column ────────────────────────────────────────────────── */
        .ab-hero__right {
          flex:            0 0 460px;
          height:          92vh;
          min-height:      560px;
          position:        relative;
          display:         flex;
          align-items:     center;
          justify-content: center;
          overflow:        hidden;
        }

        /* ── Animation stage ──────────────────────────────────────────────── */
        .ab-anim {
          position:       relative;
          width:          340px;
          height:         420px;
          pointer-events: none;
        }

        /* Central badge */
        .ab-anim__badge {
          position:        absolute;
          top:             50%;
          left:            50%;
          transform:       translate(-50%, -50%);
          width:           110px;
          height:          110px;
          border-radius:   50%;
          background:      linear-gradient(135deg, rgba(249,115,22,.18), rgba(99,102,241,.18));
          border:          1.5px solid rgba(249,115,22,.4);
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             4px;
          box-shadow:
            0 0 40px rgba(249,115,22,.15),
            0 0 80px rgba(99,102,241,.08),
            inset 0 1px 0 rgba(255,255,255,.06);
          animation:       abBadgePulse 3s ease-in-out infinite;
          z-index:         10;
        }
        @keyframes abBadgePulse {
          0%,100% { box-shadow: 0 0 40px rgba(249,115,22,.15), 0 0 80px rgba(99,102,241,.08), inset 0 1px 0 rgba(255,255,255,.06); }
          50%     { box-shadow: 0 0 60px rgba(249,115,22,.30), 0 0 100px rgba(99,102,241,.15), inset 0 1px 0 rgba(255,255,255,.06); }
        }
        .ab-anim__badge-label {
          font-family:    var(--ff-sans);
          font-size:      8px;
          font-weight:    600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color:          var(--c-orange);
        }
        .ab-anim__badge-num {
          font-family: var(--ff-serif);
          font-size:   2rem;
          font-weight: 700;
          color:       #fff;
          line-height: 1;
        }
        .ab-anim__badge-sub {
          font-family:    var(--ff-sans);
          font-size:      7px;
          font-weight:    400;
          letter-spacing: .1em;
          text-transform: uppercase;
          color:          var(--c-muted);
        }

        /* Orbit rings */
        .ab-anim__ring {
          position:      absolute;
          top:           50%;
          left:          50%;
          transform:     translate(-50%, -50%);
          width:         200px;
          height:        200px;
          border-radius: 50%;
          border:        1px dashed rgba(249,115,22,.18);
          animation:     abRingSpin 18s linear infinite;
        }
        .ab-anim__ring--2 {
          width:        280px;
          height:       280px;
          border-color: rgba(99,102,241,.12);
          border-style: solid;
          border-width: 1px;
          animation:    abRingSpin 28s linear infinite reverse;
        }
        @keyframes abRingSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Floating cards */
        .ab-card {
          position:        absolute;
          display:         flex;
          align-items:     center;
          gap:             10px;
          background:      rgba(15,15,15,.9);
          border:          1px solid var(--c-border);
          border-radius:   12px;
          padding:         10px 14px;
          backdrop-filter: blur(12px);
          box-shadow:      0 8px 32px rgba(0,0,0,.4);
          white-space:     nowrap;
        }
        .ab-card__icon {
          width:           32px;
          height:          32px;
          border-radius:   8px;
          display:         flex;
          align-items:     center;
          justify-content: center;
          font-size:       .85rem;
          flex-shrink:     0;
        }
        .ab-card__title {
          font-family: var(--ff-sans);
          font-size:   .72rem;
          font-weight: 500;
          color:       #fff;
          line-height: 1.3;
        }
        .ab-card__tag {
          font-family:    var(--ff-sans);
          font-size:      8px;
          font-weight:    500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color:          var(--c-orange);
          opacity:        .75;
        }

        .ab-card--1 { top: 8%;    left: -8%;  animation: abFloat1 6s ease-in-out infinite; }
        .ab-card--2 { top: 14%;   right: -4%; animation: abFloat2 7s ease-in-out infinite; }
        .ab-card--3 { bottom: 28%; left: -10%; animation: abFloat3 5.5s ease-in-out infinite; }
        .ab-card--4 { bottom: 10%; right: -6%; animation: abFloat4 6.5s ease-in-out infinite; }

        @keyframes abFloat1 { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes abFloat2 { 0%,100%{transform:translateY(0px) rotate(1deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
        @keyframes abFloat3 { 0%,100%{transform:translateY(0px) rotate(.5deg)} 50%{transform:translateY(-8px) rotate(-1.5deg)} }
        @keyframes abFloat4 { 0%,100%{transform:translateY(0px) rotate(-1.5deg)} 50%{transform:translateY(-12px) rotate(1deg)} }

        /* ── Corner brackets ──────────────────────────────────────────────── */
        .ab-corner { position:absolute;width:28px;height:28px;z-index:5;opacity:.18;pointer-events:none; }
        .ab-corner--tl{top:22px;left:22px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .ab-corner--tr{top:22px;right:22px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .ab-corner--bl{bottom:22px;left:22px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .ab-corner--br{bottom:22px;right:22px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ══ RESPONSIVE ═══════════════════════════════════════════════════ */
        @media (max-width: 900px) {
          .ab-hero__left  { padding: 5rem 2.5rem 5rem 3rem; }
          .ab-hero__right { flex: 0 0 340px; }
          .ab-anim        { width: 260px; height: 340px; }
        }

        @media (max-width: 768px) {
          .ab-hero { flex-direction: column; min-height: auto; }
          .ab-hero__left { order:2;flex:none;width:100%;padding:2rem 1.5rem 3rem;align-items:center;text-align:center; }
          .ab-hero__sub { max-width: 100%; }
          .ab-hero__stats { justify-content: center; }
          .ab-hero__cta-group { justify-content: center; }
          .ab-hero__right { order:1;flex:none;width:100%;height:300px;min-height:300px;overflow:visible;padding:0 24px; }
          .ab-anim { width: 240px; height: 220px; }
          .ab-anim__ring   { width: 150px; height: 150px; }
          .ab-anim__ring--2 { width: 210px; height: 210px; }
          .ab-anim__badge { width:86px;height:86px; }
          .ab-anim__badge-num { font-size: 1.55rem; }
          .ab-anim__badge-label { font-size: 7px; }
          .ab-anim__badge-sub { font-size: 6px; }
          .ab-card--1 { top:-20px;left:-70px; }
          .ab-card--2 { top:-20px;right:-70px; }
          .ab-card--3 { bottom:8px;left:-66px; }
          .ab-card--4 { bottom:8px;right:-66px; }
          .ab-card { padding:8px 12px;border-radius:10px;gap:8px; }
          .ab-card__icon  { width:28px;height:28px;font-size:.78rem; }
          .ab-card__title { font-size:.68rem; }
          .ab-card__tag   { font-size:7px; }
        }

        @media (max-width: 480px) {
          .ab-hero__right { height:280px;min-height:280px; }
          .ab-card--1 { top:-18px;left:-58px; }
          .ab-card--2 { top:-18px;right:-58px; }
          .ab-card--3 { bottom:6px;left:-54px; }
          .ab-card--4 { bottom:6px;right:-54px; }
          .ab-hero__cta-group { flex-direction:column;align-items:center; }
          .ab-hero__cta-primary, .ab-hero__cta-secondary { width:100%;max-width:280px;justify-content:center; }
          .ab-hero__stat { padding:0 1.2rem 0 0;margin-right:1.2rem; }
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
        className="ab-hero"
        aria-labelledby="ab-hero-heading"
        id="about-hero"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="ab-hero__grid" aria-hidden="true" />

        <div className="ab-corner ab-corner--tl" aria-hidden="true" />
        <div className="ab-corner ab-corner--tr" aria-hidden="true" />
        <div className="ab-corner ab-corner--bl" aria-hidden="true" />
        <div className="ab-corner ab-corner--br" aria-hidden="true" />

        {/* ── LEFT: hero copy ─────────────────────────────────────────────── */}
        <div className="ab-hero__left">

          {/*
            ✅ FIX: Removed aria-hidden="true" from <nav>.
            aria-hidden removes the element from the accessibility tree entirely,
            which is an WCAG violation for a navigational landmark.
            sr-only CSS hides it visually but keeps it accessible.
          */}
          <nav className="sr-only" aria-label="Breadcrumb">
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
                <a href="/about" itemProp="item" aria-current="page">
                  <span itemProp="name">About</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <p className="ab-hero__eyebrow" aria-hidden="true">
            <span className="ab-hero__dot" />
            {/* ✅ FIX: "Est. 2020" is accurate; removed misleading "10+ years" */}
            Est. 2020 · Bangalore, India
          </p>

          <h1 className="ab-hero__h1" id="ab-hero-heading" itemProp="name">
            We build what<br /><em>matters</em>
          </h1>

          <div className="ab-hero__rule" aria-hidden="true" />

          <p className="ab-hero__sub" itemProp="description">
            From bold web experiences to precise spatial data —
            99 Visual Solutions turns complex ideas into digital realities
            that drive real, measurable growth.
          </p>

          {/* Stats row — ✅ FIX: "5+" years consistent with foundingDate 2020 */}
          <dl className="ab-hero__stats" aria-label="Company highlights">
            <div className="ab-hero__stat">
              <dt className="ab-hero__stat-label">Years Active</dt>
              <dd className="ab-hero__stat-num">5+</dd>
            </div>
            <div className="ab-hero__stat">
              <dt className="ab-hero__stat-label">Projects Done</dt>
              <dd className="ab-hero__stat-num">500+</dd>
            </div>
            <div className="ab-hero__stat">
              <dt className="ab-hero__stat-label">Specializations</dt>
              <dd className="ab-hero__stat-num">6</dd>
            </div>
          </dl>

          {/* CTA group */}
          <div className="ab-hero__cta-group">
            <a
              href="/contact"
              className="ab-hero__cta-primary"
              aria-label="Get a free project quote from 99 Visual Solutions"
            >
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/services"
              className="ab-hero__cta-secondary"
              aria-label="Explore all services offered by 99 Visual Solutions"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* ── RIGHT: floating service cards ───────────────────────────────── */}
        <div className="ab-hero__right" aria-hidden="true">
          <div className="ab-anim">
            <div className="ab-anim__ring" />
            <div className="ab-anim__ring ab-anim__ring--2" />

            <div className="ab-anim__badge">
              <span className="ab-anim__badge-label">Since</span>
              <span className="ab-anim__badge-num">2020</span>
              <span className="ab-anim__badge-sub">Bangalore</span>
            </div>

            <div className="ab-card ab-card--1">
              <div className="ab-card__icon" style={{ background: "rgba(99,102,241,.15)", color: "#6366f1" }}>
                <FaLaptopCode />
              </div>
              <div>
                <div className="ab-card__title">Web Development</div>
                <div className="ab-card__tag">React · Next.js · Node</div>
              </div>
            </div>

            <div className="ab-card ab-card--2">
              <div className="ab-card__icon" style={{ background: "rgba(249,115,22,.15)", color: "#f97316" }}>
                <FaCubes />
              </div>
              <div>
                <div className="ab-card__title">3D Visualisation</div>
                <div className="ab-card__tag">Arch · Product · GIS</div>
              </div>
            </div>

            <div className="ab-card ab-card--3">
              <div className="ab-card__icon" style={{ background: "rgba(34,211,238,.12)", color: "#22d3ee" }}>
                <FaSearchLocation />
              </div>
              <div>
                <div className="ab-card__title">SEO & Marketing</div>
                <div className="ab-card__tag">Google · Meta · Content</div>
              </div>
            </div>

            <div className="ab-card ab-card--4">
              <div className="ab-card__icon" style={{ background: "rgba(251,191,36,.12)", color: "#fbbf24" }}>
                <FaCode />
              </div>
              <div>
                <div className="ab-card__title">IT Consulting & QA</div>
                <div className="ab-card__tag">CAD · GIS · Automation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════════ */}
      <main id="about-content" aria-label="About page content">
        <TabAbout />
        <WhyChooseUs />
        <DataPrivacy />
      </main>

      <ContactCTA />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}