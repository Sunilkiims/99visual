// app/services/page.tsx
//
// THIS REVISION:
//   1. Recolored from the dark near-black + orange + serif system (which
//      the standalone /services/visualization page intentionally keeps)
//      to the light "analytics" system shared by /services/website-development,
//      /services/it-consulting, /services/digital-marketing-seo,
//      /services/cad-gis-photogrammetry, and /services/automation-testing:
//      cool paper background, ink text, Space Grotesk / Inter / IBM Plex
//      Mono typefaces, one blue signal accent. The per-service card accent
//      colors (indigo, orange, green, cyan, purple, amber) are unchanged —
//      those were never tied to the old orange theme and still work here.
//   2. Added the "docked ticker" mechanism now used on all five of those
//      pages: an illustrative service-catalog ticker sits as a flex child
//      pinned to the bottom edge of the hero itself, one line per service
//      discipline. The hero switched from min-height:100vh to a fixed
//      height:100vh (with dvh/svh refinements) so it can never grow taller
//      than one screen and push that ticker below the fold.
//   3. Added a sticky mobile CTA bar, matching the other redesigned pages.
//
//   The full-bleed photo banner, gradient overlay, grain texture, corner
//   brackets, and single left-aligned hero column (all added in the prior
//   revision) are unchanged. No copy, schema, or metadata changes.
//   Save your banner image to: /public/images/services/services-hub-hero-banner.jpg
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";



import {
  FaCode, FaBullhorn, FaBug, FaLaptopCode,
  FaCubes, FaDraftingCompass, FaCloud, FaCheckCircle,
} from "react-icons/fa";

import type { Metadata } from "next";
import {
  BASE,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// BASE SAFE — strips trailing slash to prevent double-slash canonicals
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE = BASE.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Our Services | Web, 3D Viz, AI QA, SEO & IT Consulting",

  description:
    "Explore 99 Visual Solutions' full range of services: custom web development, AI-powered QA & automation testing, digital marketing & SEO, IT consulting, 3D visualization, and CAD/GIS. Trusted worldwide.",

  // ✅ REMOVED — already set in root layout.tsx, no need to repeat per page
  // metadataBase: new URL(BASE_SAFE),

  alternates: {
    // ✅ FIXED — clean absolute canonical using BASE_SAFE
    canonical: `${BASE_SAFE}/services`,
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
    title:       "Our Services | Web, 3D Viz, AI QA, SEO & IT Consulting — 99 Visual",
    description: "Full-spectrum technology and creative services: web development, AI-powered QA testing, digital marketing & SEO, IT consulting, 3D visualization, and CAD/GIS — all under one roof.",
    url:         `${BASE_SAFE}/services`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/services-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Our Services | 99 Visual Solutions",
    description: "Web development, AI QA testing, digital marketing, IT consulting, 3D visualization, and CAD/GIS — explore all services by 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/services-og.jpg`,
        alt: "Services by 99 Visual Solutions",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  // ✅ FIXED — BASE_SAFE used for authors url
  authors:         [{ name: "99 Visual Solutions", url: BASE_SAFE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATES
// ✅ FIX — DATE_MODIFIED is now hardcoded, NOT `new Date()`.
// The previous version stamped this page as "modified today" on every single
// build/deploy, even when nothing on the page changed. This is a false
// freshness signal to Google and contradicts the real dateModified used on
// sibling pages like /services/visualization. Update this string manually
// only when the page's actual content changes.
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = "2025-06-01"; // ← Update this when content changes

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
const svBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",     url: "/" },
  { name: "Services", url: "/services" },
]);

const svServiceCollectionNode = {
  "@type":       "ItemList",
  "@id":         `${BASE_SAFE}/services#list`,
  name:          "99 Visual Solutions Service Catalogue",
  description:   "All services offered by 99 Visual Solutions",
  url:           `${BASE_SAFE}/services`,
  numberOfItems: 6,
  itemListElement: [
    { "@type": "ListItem", position: 1, url: `${BASE_SAFE}/services/website-development`,     name: "Website & Web App Development" },
    { "@type": "ListItem", position: 2, url: `${BASE_SAFE}/services/digital-marketing-seo`,   name: "Digital Marketing & SEO" },
    { "@type": "ListItem", position: 3, url: `${BASE_SAFE}/services/automation-testing`,      name: "AI-Powered QA & Automation Testing" },
    { "@type": "ListItem", position: 4, url: `${BASE_SAFE}/services/it-consulting`,           name: "IT Consulting" },
    { "@type": "ListItem", position: 5, url: `${BASE_SAFE}/services/visualization`,           name: "3D Visualization & Architectural Rendering" },
    { "@type": "ListItem", position: 6, url: `${BASE_SAFE}/services/cad-gis-photogrammetry`, name: "CAD, GIS & Photogrammetry" },
  ],
};

const svPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE_SAFE}/services#webpage`,
  url:           `${BASE_SAFE}/services`,
  name:          "Our Services | Web, 3D Viz, AI QA, SEO & IT Consulting — 99 Visual",
  description:   "Full-spectrum technology and creative services: web development, AI QA testing, digital marketing & SEO, IT consulting, 3D visualization, and CAD/GIS/photogrammetry.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".sv-hero__h1", ".sv-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE_SAFE}/services#breadcrumb` },
  mainEntity:      { "@id": `${BASE_SAFE}/services#list` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE_SAFE}/services`] },
};

const svGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  svPageNode,
  svBreadcrumbNode,
  svServiceCollectionNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  {
    id:          "website-development",
    href:        "/services/website-development",
    num:         "01",
    icon:        <FaCode />,
    tag:         "Development",
    title:       "Website & Web App Development",
    description: "Custom web applications, front-end & back-end engineering, UX design, e-commerce, CMS, SEO optimization, API integrations, and security — built to perform at every scale.",
    bullets:     ["React / Next.js / Vue.js", "E-Commerce & CMS Platforms", "API Integrations & Web Security"],
    accent:      "#6366f1",
  },
  {
    id:          "digital-marketing-seo",
    href:        "/services/digital-marketing-seo",
    num:         "02",
    icon:        <FaBullhorn />,
    tag:         "Marketing",
    title:       "Digital Marketing & SEO",
    description: "Full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content marketing, email automation, local SEO, link building, and promotional video — engineered for ROI.",
    bullets:     ["Search Engine Optimization", "PPC & Meta Ads Management", "Content & Email Marketing"],
    accent:      "#f97316",
  },
  {
    id:          "automation-testing",
    href:        "/services/automation-testing",
    num:         "03",
    icon:        <FaBug />,
    tag:         "QA & Testing",
    title:       "AI-Powered QA & Automation Testing",
    description: "Next-generation quality assurance powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance, security, and CI/CD integration.",
    bullets:     ["Agentic AI Test Automation", "Self-Healing Test Scripts", "Performance & Security Testing"],
    accent:      "#10b981",
  },
  {
    id:          "it-consulting",
    href:        "/services/it-consulting",
    num:         "04",
    icon:        <FaCloud />,
    tag:         "Consulting",
    title:       "IT Consulting",
    description: "End-to-end IT consulting: infrastructure planning, cloud migration (AWS, Azure, GCP), cybersecurity, IoT integration, software consulting, and IT project management.",
    bullets:     ["Cloud Migration & DevOps", "Cybersecurity & Risk Management", "IoT & Smart Device Integration"],
    accent:      "#06b6d4",
  },
  {
    id:          "visualization",
    href:        "/services/visualization",
    num:         "05",
    icon:        <FaCubes />,
    tag:         "3D & Rendering",
    title:       "3D Visualization & Rendering",
    description: "Photorealistic architectural renders, immersive 3D walkthroughs, product visualization, precision CAD modeling, BIM, and LiDAR data processing.",
    bullets:     ["Architectural Exterior & Interior Renders", "3D Walkthrough Animations", "Product & BIM Visualization"],
    accent:      "#a855f7",
  },
  {
    id:          "cad-gis-photogrammetry",
    href:        "/services/cad-gis-photogrammetry",
    num:         "06",
    icon:        <FaDraftingCompass />,
    tag:         "Geospatial",
    title:       "CAD, GIS & Photogrammetry",
    description: "Precision-driven CAD drafting, GIS mapping, drone & aerial photogrammetry, LiDAR processing, spatial analysis, and 3D modeling for infrastructure and urban planning worldwide.",
    bullets:     ["LiDAR Point Cloud Processing", "Drone & Aerial Photogrammetry", "GIS Mapping & Spatial Analysis"],
    accent:      "#f59e0b",
  },
];

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+",  label: "Global Clients" },
  { value: "6",    label: "Core Services" },
  { value: "5+",   label: "Years of Excellence" },
];

const whyUs = [
  "End-to-end delivery — strategy through execution",
  "AI-native workflows for faster, smarter outcomes",
  "Domain specialists, not generalists",
  "Transparent pricing, no scope surprises",
  "Continuous support post-launch",
  "Proven results across 4 continents",
];

// Illustrative one-line-per-discipline ticker, tying back to the six
// service cards below. Docked to the bottom edge of the hero, same
// mechanism as the tickers on the individual service pages.
const pipeline = [
  { cmd: "web_development",  out: "shipped on time" },
  { cmd: "seo_campaign",     out: "organic traffic up" },
  { cmd: "qa_suite",         out: "94% test coverage" },
  { cmd: "cloud_migration",  out: "zero downtime" },
  { cmd: "render_export",    out: "photoreal delivery" },
  { cmd: "lidar_scan",       out: "±2cm accuracy" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .sv-page{
          --sv-ink:#12141A; --sv-muted:#5B6172; --sv-paper:#F5F6F8; --sv-surface:#FFFFFF;
          --sv-line:#E4E6EC; --sv-blue:#2E5CFF; --sv-green:#37D67A;
          background:var(--sv-paper);
        }
        .sv-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ── HERO — full-bleed photo banner, same treatment as the
           individual service pages: photo as CSS background with a dark
           gradient overlay so the text column stays legible, restyled to
           the shared blue accent instead of orange. Fixed (not min-)
           height + flex column, so the section can never grow taller than
           one screen and push the ticker bar (docked at the bottom, see
           .sv-hero__ticker-bar) below the fold. ──────────────────────── */
        .sv-hero {
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/services-hub-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        /* dvh/svh account for mobile browser chrome so the banner never
           shows a gap or clips; falls back to 100vh. */
        @supports (height: 100svh) { .sv-hero { height: 100svh; } }
        @supports (height: 100dvh) { .sv-hero { height: 100dvh; } }
        @media(max-width:960px){
          .sv-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/services-hub-hero-banner.jpg') center center / cover no-repeat;
          }
        }
        .sv-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .sv-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .sv-corner--tl{top:28px;left:28px;border-top:1px solid var(--sv-blue);border-left:1px solid var(--sv-blue);}
        .sv-corner--tr{top:28px;right:28px;border-top:1px solid var(--sv-blue);border-right:1px solid var(--sv-blue);}
        /* nudged up from the standard bottom offset to clear a bottom-left chatbot launcher icon */
        .sv-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--sv-blue);border-left:1px solid var(--sv-blue);}
        @media(max-width:480px){ .sv-corner--bl{ left:28px; } }
        .sv-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--sv-blue);border-right:1px solid var(--sv-blue);}

        /* Main hero content: fills the remaining space above the ticker
           and centers vertically within it. Header clearance and the
           left/right gutters live here (not on the fixed-height section)
           so the ticker's own height is never squeezed out. */
        .sv-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .sv-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .sv-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .sv-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        /* Short screens (landscape phones, small laptop windows with
           browser chrome): trim vertical rhythm so everything still fits
           above the ticker without scrolling. */
        @media(max-height:520px){
          .sv-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .sv-hero__eyebrow{ margin-bottom:1.1rem; }
          .sv-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .sv-hero__rule{ margin-bottom:.8rem; }
          .sv-hero__sub{ margin-bottom:1.2rem; }
        }

        /* Single-column content — sits on top of the photo banner
           background, left-aligned and capped to a comfortable reading
           width, matching the individual service-page heroes. */
        .sv-hero__content{animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes svFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.sv-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .sv-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--sv-blue);border:1px solid rgba(46,92,255,.28);background:rgba(46,92,255,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .sv-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--sv-blue);animation:svPulse 2s ease-in-out infinite;}
        @keyframes svPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .sv-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4.4vw,3.6rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .sv-hero__h1 em{font-style:normal;color:var(--sv-blue);}
        .sv-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--sv-blue),transparent);margin:0 0 1.4rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.sv-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--sv-blue),transparent);}}
        .sv-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.sv-hero__sub{margin:0 auto 2.6rem;}}
        .sv-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.sv-hero__actions{justify-content:center;}}
        .sv-hero__btn--primary{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--sv-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .sv-hero__btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .sv-hero__btn--ghost{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;border-radius:10px;text-decoration:none;transition:background .2s ease,border-color .2s ease;}
        .sv-hero__btn--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        /* ══ TICKER — docked as a normal flex child at the bottom of the
           fixed-height hero (not position:absolute), so it can never end
           up below the fold regardless of how tall the content above it
           is — it always renders inside the first screen. Same mechanism
           as the tickers on the individual service pages. ══════════════ */
        .sv-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .sv-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .sv-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:svScroll 34s linear infinite;}
        .sv-hero__ticker-bar:hover .sv-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .sv-ticker__track{ animation-duration:22s; } }
        @keyframes svScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .sv-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .sv-ticker__item b{color:rgba(255,255,255,.45);}
        .sv-ticker__pass{color:var(--sv-green);}
        .sv-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:clamp(.6rem,1.5vw,.66rem);color:rgba(255,255,255,.4);margin:0;padding:.3rem 1rem 0;}
        @media(max-height:520px){
          .sv-hero__ticker-bar{ padding-top:.75rem; }
          .sv-ticker__caption{ display:none; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .sv-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--sv-line);}
        @media(max-width:760px){.sv-sticky-cta{display:flex;justify-content:center;}}
        .sv-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--sv-ink);padding:13px 20px;border-radius:10px;text-decoration:none;}

        /* ── STATS STRIP ───────────────────────────────────────────────── */
        .sv-stats{background:var(--sv-surface);border-top:1px solid var(--sv-line);border-bottom:1px solid var(--sv-line);padding:2.8rem 1.5rem;}
        .sv-stats__inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:640px){.sv-stats__inner{grid-template-columns:repeat(2,1fr);}}
        .sv-stat__val{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.9rem,3.4vw,2.4rem);font-weight:700;line-height:1;color:var(--sv-ink);margin-bottom:.3rem;}
        .sv-stat__val span{color:var(--sv-blue);}
        .sv-stat__lbl{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:400;color:var(--sv-muted);}

        /* ── INTRO ─────────────────────────────────────────────────────── */
        .sv-intro{background:var(--sv-paper);border-bottom:1px solid var(--sv-line);padding:5.5rem 1.5rem;}
        .sv-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .sv-intro__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--sv-blue);margin-bottom:1.2rem;display:block;}
        .sv-intro__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4vw,2.7rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--sv-ink);margin:0 0 1.5rem;}
        .sv-intro__h2 em{font-style:normal;color:var(--sv-blue);}
        .sv-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--sv-muted);max-width:660px;margin:0 auto .9rem;}
        .sv-intro__p strong{color:var(--sv-ink);font-weight:500;}

        /* ── SERVICES GRID ─────────────────────────────────────────────── */
        .sv-services{background:var(--sv-surface);padding:6rem 1.5rem;border-bottom:1px solid var(--sv-line);}
        .sv-services__inner{max-width:1240px;margin:0 auto;}
        .sv-services__head{text-align:center;margin-bottom:4rem;}
        .sv-services__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--sv-blue);margin-bottom:1rem;display:block;}
        .sv-services__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,4vw,2.5rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--sv-ink);margin:0 0 1rem;}
        .sv-services__h2 em{font-style:normal;color:var(--sv-blue);}
        .sv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1100px){.sv-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:680px){.sv-grid{grid-template-columns:1fr;}}
        .sv-card{background:var(--sv-paper);border:1px solid var(--sv-line);border-radius:20px;padding:2.4rem 2rem 2rem;text-decoration:none;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;}
        .sv-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--sv-accent,#2E5CFF);opacity:0;transition:opacity .3s ease;}
        .sv-card::after{content:attr(data-num);font-family:'Space Grotesk',sans-serif;font-size:6rem;font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(18,20,26,.05);position:absolute;bottom:-1.2rem;right:1.2rem;pointer-events:none;user-select:none;transition:-webkit-text-stroke .3s ease;}
        .sv-card:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--sv-accent,#2E5CFF) 40%,transparent);box-shadow:0 24px 48px -20px rgba(18,20,26,.2);}
        .sv-card:hover::before{opacity:1;}
        .sv-card:hover::after{-webkit-text-stroke:1px color-mix(in srgb,var(--sv-accent,#2E5CFF) 16%,transparent);}
        .sv-card__top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.6rem;}
        .sv-card__icon-wrap{width:48px;height:48px;border-radius:12px;flex-shrink:0;background:color-mix(in srgb,var(--sv-accent,#2E5CFF) 12%,transparent);border:1px solid color-mix(in srgb,var(--sv-accent,#2E5CFF) 25%,transparent);display:flex;align-items:center;justify-content:center;color:var(--sv-accent,#2E5CFF);font-size:1.15rem;transition:background .3s ease;}
        .sv-card:hover .sv-card__icon-wrap{background:color-mix(in srgb,var(--sv-accent,#2E5CFF) 22%,transparent);}
        .sv-card__tag{font-family:'IBM Plex Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--sv-accent,#2E5CFF);border:1px solid color-mix(in srgb,var(--sv-accent,#2E5CFF) 30%,transparent);background:color-mix(in srgb,var(--sv-accent,#2E5CFF) 8%,transparent);padding:4px 10px;border-radius:100px;}
        .sv-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.12rem;font-weight:600;line-height:1.3;letter-spacing:-.01em;color:var(--sv-ink);margin:0 0 .8rem;transition:color .2s ease;}
        .sv-card__rule{width:28px;height:1px;background:linear-gradient(90deg,var(--sv-accent,#2E5CFF),transparent);margin-bottom:1rem;transition:width .3s ease;}
        .sv-card:hover .sv-card__rule{width:48px;}
        .sv-card__desc{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--sv-muted);margin-bottom:1.4rem;flex:1;}
        .sv-card__bullets{list-style:none;padding:0;margin:0 0 1.6rem;display:flex;flex-direction:column;gap:.4rem;}
        .sv-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;font-weight:400;color:var(--sv-ink);display:flex;align-items:center;gap:.5rem;}
        .sv-card__bullets li::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--sv-accent,#2E5CFF);flex-shrink:0;}
        .sv-card__link{display:inline-flex;align-items:center;gap:7px;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:var(--sv-accent,#2E5CFF);transition:gap .2s ease;margin-top:auto;}
        .sv-card:hover .sv-card__link{gap:11px;}
        .sv-card__link svg{transition:transform .2s ease;}
        .sv-card:hover .sv-card__link svg{transform:translateX(3px);}

        /* ── WHY US ─────────────────────────────────────────────────────── */
        .sv-why{background:var(--sv-paper);border-top:1px solid var(--sv-line);padding:6rem 1.5rem;}
        .sv-why__inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        @media(max-width:860px){.sv-why__inner{grid-template-columns:1fr;gap:3rem;}}
        .sv-why__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--sv-blue);margin-bottom:1rem;display:block;}
        .sv-why__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,3.5vw,2.4rem);font-weight:700;line-height:1.22;letter-spacing:-.015em;color:var(--sv-ink);margin:0 0 1.2rem;}
        .sv-why__h2 em{font-style:normal;color:var(--sv-blue);}
        .sv-why__p{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:var(--sv-muted);margin-bottom:2rem;}
        .sv-why__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:var(--sv-ink);padding:13px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .sv-why__cta:hover{background:var(--sv-blue);transform:translateY(-2px);}
        .sv-why__list{display:flex;flex-direction:column;gap:.9rem;}
        .sv-why__item{display:flex;align-items:flex-start;gap:.9rem;padding:1.1rem 1.3rem;background:var(--sv-surface);border:1px solid var(--sv-line);border-radius:12px;transition:border-color .2s ease,transform .2s ease;}
        .sv-why__item:hover{border-color:rgba(46,92,255,.3);transform:translateX(4px);}
        .sv-why__item-icon{color:var(--sv-blue);font-size:1rem;flex-shrink:0;margin-top:.15rem;}
        .sv-why__item-text{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:400;line-height:1.6;color:var(--sv-ink);}

        /* ── CTA STRIP ─────────────────────────────────────────────────── */
        .sv-cta{background:var(--sv-surface);border-top:1px solid var(--sv-line);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .sv-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,var(--sv-blue),transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .sv-cta__inner{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .sv-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--sv-blue);margin-bottom:1.2rem;display:block;}
        .sv-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--sv-ink);margin:0 0 1rem;}
        .sv-cta__h2 em{font-style:normal;color:var(--sv-blue);}
        .sv-cta__sub{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:var(--sv-muted);margin-bottom:2.6rem;}
        .sv-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--sv-ink);padding:14px 32px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .sv-cta__btn:hover{background:var(--sv-blue);transform:translateY(-2px);}

        @media(max-width:480px){.sv-hero__actions{flex-direction:column;align-items:stretch;}.sv-hero__btn--primary,.sv-hero__btn--ghost{justify-content:center;}}
        @media(prefers-reduced-motion:reduce){
          .sv-page *,.sv-page *::before,.sv-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-services-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svGraph) }}
      />

      <div className="sv-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="sv-hero" aria-labelledby="sv-hero-heading">
          <div aria-hidden="true">
            <div className="sv-hero__grain" />
          </div>
          <div className="sv-corner sv-corner--tl" aria-hidden="true" />
          <div className="sv-corner sv-corner--tr" aria-hidden="true" />
          <div className="sv-corner sv-corner--bl" aria-hidden="true" />
          <div className="sv-corner sv-corner--br" aria-hidden="true" />

          <nav className="sv-sr-only" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{ listStyle:"none",margin:0,padding:0 }}>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/services" itemProp="item" aria-current="page"><span itemProp="name">Services</span></a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/*
            Hero content sits on top of the full-bleed photo banner (set as
            the section's CSS background — see .sv-hero in <style> above).
            A dark gradient overlay keeps the white/blue text legible over
            the photo.
          */}
          <div className="sv-hero__inner">
            <div className="sv-hero__content">
              <div className="sv-hero__eyebrow" aria-hidden="true">
                <span className="sv-hero__dot" />
                What We Do
              </div>
              <h1 className="sv-hero__h1" id="sv-hero-heading">
                End-to-end solutions<br />built for the <em>intelligent era</em>
              </h1>
              <div className="sv-hero__rule" aria-hidden="true" />
              <p className="sv-hero__sub">
                From pixel-perfect web experiences and AI-powered QA to data-driven
                marketing, geospatial intelligence, and strategic IT consulting — 99 Visual
                Solutions is your single partner for the full technology stack.
              </p>
              <div className="sv-hero__actions">
                <a href="#sv-grid" className="sv-hero__btn--primary" aria-label="Browse all 99 Visual Solutions services">
                  Browse Services
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link href="/contact" className="sv-hero__btn--ghost" aria-label="Contact 99 Visual Solutions">
                  Get a Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/*
            Ticker docks to the bottom edge of the hero itself (not a
            separate section below it), so the scrolling service-catalog
            line and the photo banner render together as a single
            full-screen unit on every screen size — same mechanism used on
            the individual service pages.
          */}
          <div className="sv-hero__ticker-bar" aria-hidden="true">
            <div className="sv-ticker">
              <div className="sv-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="sv-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="sv-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
            <p className="sv-ticker__caption">Illustrative service-catalog output</p>
          </div>
        </section>

        {/* ══ STATS STRIP ═════════════════════════════════════════════════ */}
        <div className="sv-stats" aria-label="Company statistics">
          <div className="sv-stats__inner">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="sv-stat__val">
                  {s.value.includes("+")
                    ? <>{s.value.replace("+", "")}<span>+</span></>
                    : s.value}
                </div>
                <div className="sv-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ INTRO ════════════════════════════════════════════════════════ */}
        <section className="sv-intro" aria-labelledby="sv-intro-heading">
          <div className="sv-intro__inner">
            <span className="sv-intro__label">Our Approach</span>
            <h2 className="sv-intro__h2" id="sv-intro-heading">
              One partner.<br />The <em>full spectrum</em> of modern technology.
            </h2>
            <p className="sv-intro__p">
              At <strong>99 Visual Solutions</strong>, we believe great technology is indistinguishable
              from great design. Our multidisciplinary teams combine <strong>creative excellence,
              engineering rigour, and AI-native thinking</strong> to deliver outcomes that move
              the needle — not just deliverables.
            </p>
            <p className="sv-intro__p">
              Whether you are a startup launching your first product or an enterprise modernising
              a legacy stack, we scale with your ambition and operate as a{" "}
              <strong>true extension of your team</strong>.
            </p>
          </div>
        </section>

        {/* ══ SERVICES GRID ════════════════════════════════════════════════ */}
        <section id="sv-grid" className="sv-services" aria-labelledby="sv-services-heading">
          <div className="sv-services__inner">
            <div className="sv-services__head">
              <span className="sv-services__label">Our Services</span>
              <h2 className="sv-services__h2" id="sv-services-heading">
                Everything you need to build,<br />grow &amp; <em>dominate</em>
              </h2>
            </div>
            <div className="sv-grid">
              {services.map((svc) => (
                <Link
                  key={svc.id}
                  href={svc.href}
                  className="sv-card"
                  data-num={svc.num}
                  style={{ "--sv-accent": svc.accent } as React.CSSProperties}
                  aria-label={`Learn more about ${svc.title}`}
                >
                  <div className="sv-card__top">
                    <div className="sv-card__icon-wrap" aria-hidden="true">{svc.icon}</div>
                    <span className="sv-card__tag">{svc.tag}</span>
                  </div>
                  <h3 className="sv-card__title">{svc.title}</h3>
                  <div className="sv-card__rule" aria-hidden="true" />
                  <p className="sv-card__desc">{svc.description}</p>
                  <ul className="sv-card__bullets" aria-label={`Key capabilities for ${svc.title}`}>
                    {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <span className="sv-card__link" aria-hidden="true">
                    Explore Service
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ═══════════════════════════════════════════════════════ */}
        <section className="sv-why" aria-labelledby="sv-why-heading">
          <div className="sv-why__inner">
            <div>
              <span className="sv-why__label">Why 99 Visual?</span>
              <h2 className="sv-why__h2" id="sv-why-heading">
                We don't just deliver<br />projects — we deliver <em>outcomes</em>
              </h2>
              <p className="sv-why__p">
                Partnering with 99 Visual Solutions means you get a team that is as invested
                in your success as you are. We combine deep domain expertise with agile
                execution to turn complex requirements into elegant, high-performing solutions
                — on time and within budget.
              </p>
              <Link href="/contact" className="sv-why__cta" aria-label="Start a project with 99 Visual Solutions">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <ul className="sv-why__list" aria-label="Reasons to choose 99 Visual Solutions">
              {whyUs.map((item) => (
                <li key={item} className="sv-why__item">
                  <FaCheckCircle className="sv-why__item-icon" aria-hidden="true" />
                  <span className="sv-why__item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ CTA STRIP ════════════════════════════════════════════════════ */}
        <section className="sv-cta" aria-labelledby="sv-cta-heading">
          <div className="sv-cta__orb" aria-hidden="true" />
          <div className="sv-cta__inner">
            <span className="sv-cta__eyebrow">Let's Build Together</span>
            <h2 className="sv-cta__h2" id="sv-cta-heading">
              Ready to start your next<br /><em>big project?</em>
            </h2>
            <p className="sv-cta__sub">
              Talk to our team for a free, no-obligation strategy consultation. We'll
              help you choose the right services, scope your project, and map a clear
              path to launch.
            </p>
            <Link href="/contact" className="sv-cta__btn" aria-label="Get a free consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="sv-sticky-cta">
          <Link href="/contact" className="sv-sticky-cta__btn">Get a Free Quote</Link>
        </div>
      </div>

      <Footer />
      <ScrollDown />
      
    </>
  );
}
