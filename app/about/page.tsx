// app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// About page — 99 Visual Solutions
//
// THIS REVISION — brings Hero + CTA in line with the Services page design
// system (app/services/page.tsx), per the site-wide design-system rollout:
//   1. Hero rebuilt on the same mechanism as Services: full-bleed photo
//      banner background, fixed 100vh/100dvh/100svh (never pushes content
//      below the fold), single left-aligned column, corner brackets, grain
//      texture, and a docked "ticker" bar pinned to the hero's bottom edge.
//   2. Recolored from the page-local dark/orange/Cormorant system to the
//      shared Space Grotesk / Inter / IBM Plex Mono type system with the
//      one blue signal accent (--ab-blue). The orange "eyebrow" badge is
//      kept, matching the Services page's own eyebrow treatment.
//   3. CTA section rebuilt to match Services' .sv-cta exactly (light
//      surface, radial orb glow, same heading/button treatment). The old
//      <ContactCTA /> (Contactcta.tsx, navigates to /contact) is replaced
//      with <ConsultationCTA /> (opens the ContactPopup modal) — same
//      component the Services page now uses — plus a sticky mobile CTA bar.
//   4. Content sections (TabAbout, WhyChooseUs, DataPrivacy), all metadata,
//      and all JSON-LD schema are UNCHANGED. Class names on the H1/sub
//      (.ab-hero__h1 / .ab-hero__sub) are preserved so the existing
//      `speakable.cssSelector` entries in aboutPageNode keep working.
//
//   Save your banner image to: /public/images/about/about-hero-banner.jpg
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Header           from "../components/header";
import Footer           from "../components/footer";
import ScrollDown       from "../components/scrolldown";


import TabAbout         from "../components/tabstory";
import WhyChooseUs      from "../components/Story";
import DataPrivacy      from "../components/dataprivacy";
import ConsultationCTA  from "@/app/components/ConsultationCTA";

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
// METADATA — unchanged from prior revision
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About 99 Visual Solutions | IT & 3D Visualization Bangalore",

  description:
    "Meet 99 Visual Solutions — Bengaluru's full-service IT company. Founded in 2020, 500+ projects across web development, 3D visualisation, CAD, GIS, SEO & IT consulting.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/about`,
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
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01T00:00:00+05:30";
const DATE_MODIFIED  = new Date().toISOString();

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES — unchanged from prior revision
// ─────────────────────────────────────────────────────────────────────────────
const aboutBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",  url: "/" },
  { name: "About", url: "/about" },
]);

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
  aboutBreadcrumbNode,
  aboutFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — hero ticker + stats strip (content-only, no copy changes to
// existing sections below)
// ─────────────────────────────────────────────────────────────────────────────
const pipeline = [
  { cmd: "founded_2020",     out: "bengaluru, india" },
  { cmd: "projects_shipped", out: "500+ delivered" },
  { cmd: "specializations",  out: "6 core domains" },
  { cmd: "global_reach",     out: "india · usa · uk · uae · au" },
  { cmd: "response_time",    out: "< 24h" },
  { cmd: "client_model",     out: "true team extension" },
];

const stats = [
  { value: "5+",   label: "Years Active" },
  { value: "500+", label: "Projects Delivered" },
  { value: "6",    label: "Specializations" },
  { value: "5",    label: "Countries Served" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <script
        id="schema-about-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .ab-page{
          --ab-ink:#12141A; --ab-muted:#5B6172; --ab-paper:#F5F6F8; --ab-surface:#FFFFFF;
          --ab-line:#E4E6EC; --ab-blue:#2E5CFF; --ab-green:#37D67A; --ab-orange:#F97316;
        }
        .ab-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO — same mechanism as Services: full-bleed banner, fixed
           viewport height, docked ticker bar ═══════════════════════════ */
        .ab-hero {
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/about/about-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .ab-hero { height: 100svh; } }
        @supports (height: 100dvh) { .ab-hero { height: 100dvh; } }
        @media(max-width:960px){
          .ab-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/about/about-hero-banner.jpg') center center / cover no-repeat;
          }
        }
        .ab-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .ab-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .ab-corner--tl{top:28px;left:28px;border-top:1px solid var(--ab-blue);border-left:1px solid var(--ab-blue);}
        .ab-corner--tr{top:28px;right:28px;border-top:1px solid var(--ab-blue);border-right:1px solid var(--ab-blue);}
        .ab-corner--bl{bottom:120px;left:28px;border-bottom:1px solid var(--ab-blue);border-left:1px solid var(--ab-blue);}
        .ab-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--ab-blue);border-right:1px solid var(--ab-blue);}

        .ab-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .ab-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .ab-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .ab-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .ab-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .ab-hero__eyebrow{ margin-bottom:1.1rem; }
          .ab-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .ab-hero__rule{ margin-bottom:.8rem; }
          .ab-hero__sub{ margin-bottom:1.2rem; }
        }

        .ab-hero__content{animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes abFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.ab-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .ab-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--ab-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .ab-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--ab-orange);animation:abPulse 2s ease-in-out infinite;}
        @keyframes abPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .ab-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .ab-hero__h1 em{font-style:normal;color:var(--ab-blue);}
        .ab-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--ab-blue),transparent);margin:0 0 1.4rem;animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.ab-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--ab-blue),transparent);}}
        .ab-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.ab-hero__sub{margin:0 auto 2.6rem;}}
        .ab-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:abFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.ab-hero__actions{justify-content:center;}}
        .ab-hero__btn--primary{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--ab-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;border:none;cursor:pointer;}
        .ab-hero__btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .ab-hero__btn--ghost{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;border-radius:10px;text-decoration:none;transition:background .2s ease,border-color .2s ease;}
        .ab-hero__btn--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .ab-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .ab-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .ab-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:abScroll 34s linear infinite;}
        .ab-hero__ticker-bar:hover .ab-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .ab-ticker__track{ animation-duration:22s; } }
        @keyframes abScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .ab-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .ab-ticker__item b{color:rgba(255,255,255,.45);}
        .ab-ticker__pass{color:var(--ab-green);}
        .ab-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:clamp(.6rem,1.5vw,.66rem);color:rgba(255,255,255,.4);margin:0;padding:.3rem 1rem 0;}
        @media(max-height:520px){
          .ab-hero__ticker-bar{ padding-top:.75rem; }
          .ab-ticker__caption{ display:none; }
        }

        /* ══ STATS STRIP ═════════════════════════════════════════════════ */
        .ab-stats{background:var(--ab-surface);border-top:1px solid var(--ab-line);border-bottom:1px solid var(--ab-line);padding:2.8rem 1.5rem;}
        .ab-stats__inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:640px){.ab-stats__inner{grid-template-columns:repeat(2,1fr);}}
        .ab-stat__val{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.9rem,3.4vw,2.4rem);font-weight:700;line-height:1;color:var(--ab-ink);margin-bottom:.3rem;}
        .ab-stat__val span{color:var(--ab-blue);}
        .ab-stat__lbl{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:400;color:var(--ab-muted);}

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .ab-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--ab-line);}
        @media(max-width:760px){.ab-sticky-cta{display:flex;justify-content:center;}}
        .ab-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--ab-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ CTA STRIP — matches Services .sv-cta exactly ══════════════ */
        .ab-cta{background:var(--ab-surface);border-top:1px solid var(--ab-line);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .ab-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,var(--ab-blue),transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .ab-cta__inner{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .ab-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--ab-blue);margin-bottom:1.2rem;display:block;}
        .ab-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--ab-ink);margin:0 0 1rem;}
        .ab-cta__h2 em{font-style:normal;color:var(--ab-blue);}
        .ab-cta__sub{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:var(--ab-muted);margin-bottom:2.6rem;}
        .ab-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--ab-ink);padding:14px 32px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .ab-cta__btn:hover{background:var(--ab-blue);transform:translateY(-2px);}

        @media(max-width:480px){.ab-hero__actions{flex-direction:column;align-items:stretch;}.ab-hero__btn--primary,.ab-hero__btn--ghost{justify-content:center;}}
        @media(prefers-reduced-motion:reduce){
          .ab-page *,.ab-page *::before,.ab-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <div className="ab-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section
          className="ab-hero"
          aria-labelledby="ab-hero-heading"
          id="about-hero"
          itemScope
          itemType="https://schema.org/AboutPage"
        >
          <div aria-hidden="true">
            <div className="ab-hero__grain" />
          </div>
          <div className="ab-corner ab-corner--tl" aria-hidden="true" />
          <div className="ab-corner ab-corner--tr" aria-hidden="true" />
          <div className="ab-corner ab-corner--bl" aria-hidden="true" />
          <div className="ab-corner ab-corner--br" aria-hidden="true" />

          <nav className="ab-sr-only" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{ listStyle:"none",margin:0,padding:0 }}>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/about" itemProp="item" aria-current="page"><span itemProp="name">About</span></a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <div className="ab-hero__inner">
            <div className="ab-hero__content">
              <div className="ab-hero__eyebrow" aria-hidden="true">
                <span className="ab-hero__dot" />
                Est. 2020 · Bangalore, India
              </div>
              <h1 className="ab-hero__h1" id="ab-hero-heading" itemProp="name">
                We build what<br /><em>matters</em>
              </h1>
              <div className="ab-hero__rule" aria-hidden="true" />
              <p className="ab-hero__sub" itemProp="description">
                From bold web experiences to precise spatial data — 99 Visual
                Solutions turns complex ideas into digital realities that
                drive real, measurable growth.
              </p>
              <div className="ab-hero__actions">
                <ConsultationCTA className="ab-hero__btn--primary" ariaLabel="Get a free project quote from 99 Visual Solutions">
                  Get a Free Quote
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ConsultationCTA>
                <a href="/services" className="ab-hero__btn--ghost" aria-label="Explore all services offered by 99 Visual Solutions">
                  Our Services
                </a>
              </div>
            </div>
          </div>

          <div className="ab-hero__ticker-bar" aria-hidden="true">
            <div className="ab-ticker">
              <div className="ab-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="ab-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="ab-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS STRIP ═════════════════════════════════════════════════ */}
        <div className="ab-stats" aria-label="Company statistics">
          <div className="ab-stats__inner">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="ab-stat__val">
                  {s.value.includes("+")
                    ? <>{s.value.replace("+", "")}<span>+</span></>
                    : s.value}
                </div>
                <div className="ab-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ MAIN CONTENT — unchanged ══════════════════════════════════════ */}
        <main id="about-content" aria-label="About page content">
          <TabAbout />
          <WhyChooseUs />
          <DataPrivacy />
        </main>

        {/* ══ CTA STRIP ════════════════════════════════════════════════════ */}
        <section className="ab-cta" aria-labelledby="ab-cta-heading">
          <div className="ab-cta__orb" aria-hidden="true" />
          <div className="ab-cta__inner">
            <span className="ab-cta__eyebrow">Let's Build Together</span>
            <h2 className="ab-cta__h2" id="ab-cta-heading">
              Ready to bring your<br /><em>vision to life?</em>
            </h2>
            <p className="ab-cta__sub">
              Talk to our team for a free, no-obligation strategy consultation.
              We'll help you scope your project and map a clear path to launch.
            </p>
            <ConsultationCTA className="ab-cta__btn" ariaLabel="Get a free consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═══════════════════════════════════════════ */}
        <div className="ab-sticky-cta">
          <ConsultationCTA className="ab-sticky-cta__btn">Get a Free Quote</ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />
     
    </>
  );
}