// app/services/page.tsx
//
// THIS REVISION: Hero background updated to a full-bleed photo banner with a
//   dark gradient overlay so text stays readable — same treatment as the
//   individual service pages (visualization, website-development,
//   it-consulting, digital-marketing-seo, cad-gis-photogrammetry,
//   automation-testing). The hero was previously centered/single-column;
//   it's now left-aligned to match. No copy, schema, or metadata changes.
//   Save your banner image to: /public/images/services/services-hub-hero-banner.jpg
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";


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

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sv-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ── HERO — full-bleed photo banner, same treatment as the
           individual service pages: photo as CSS background with a dark
           gradient overlay so the text column stays legible. Previously
           centered/single-column; now left-aligned to match. ──────────── */
        .sv-hero {
          position:relative;min-height:92vh;display:flex;align-items:center;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/services-hub-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;
          overflow:hidden;padding:9rem 1.5rem 7rem;
        }
        /* Modern browsers: use dynamic viewport height so mobile browser
           chrome (address bar show/hide) doesn't cause the hero to jump
           or leave a gap. Falls back silently on older browsers. */
        @supports (min-height: 100svh) {
          .sv-hero { min-height: 92svh; }
        }
        /* Tablet & mobile: the two-way horizontal gradient above is tuned
           for a wide viewport with left-aligned text over a visible right
           side of the photo. Below 960px the text column centers and can
           span the full width, so swap to a more uniform top-to-bottom
           overlay that keeps the whole banner legible behind centered
           text at any crop position. */
        @media(max-width:960px){
          .sv-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/services-hub-hero-banner.jpg') center center / cover no-repeat;
            min-height:auto;
            padding:7rem 1.25rem 4.5rem;
          }
        }
        @media(max-width:640px){
          .sv-hero { padding:6.5rem 1rem 4rem; }
        }
        @media(max-width:960px) and (orientation:landscape){
          .sv-hero { min-height:100vh;padding-top:5.5rem;padding-bottom:3rem; }
        }
        .sv-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .sv-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.18;pointer-events:none;}
        .sv-corner--tl{top:28px;left:28px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .sv-corner--tr{top:28px;right:28px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        /* nudged up from the standard bottom offset to clear a bottom-left chatbot launcher icon */
        .sv-corner--bl{bottom:120px;left:264px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        @media(max-width:480px){ .sv-corner--bl{ left:28px; } }
        .sv-corner--br{bottom:72px;right:28px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}

        /* Single-column content — sits on top of the photo banner
           background, left-aligned and capped to a comfortable reading
           width, matching the individual service-page heroes. */
        .sv-hero__inner{
          position:relative;z-index:10;max-width:1280px;margin:0 auto;width:100%;
          display:grid;grid-template-columns:1fr;
        }

        .sv-hero__content{animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes svFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.sv-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .sv-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .sv-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:svPulse 2s ease-in-out infinite;}
        @keyframes svPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .sv-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4.4vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .sv-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.5px #f97316;}
        .sv-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.sv-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,#f97316,transparent);}}
        .sv-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.sv-hero__sub{margin:0 auto 2.6rem;}}
        .sv-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:svFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.sv-hero__actions{justify-content:center;}}
        .sv-hero__btn--primary{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 36px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .sv-hero__btn--primary:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 16px 40px rgba(249,115,22,.5);}
        .sv-hero__btn--ghost{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.15);backdrop-filter:blur(6px);padding:13px 32px;border-radius:100px;text-decoration:none;transition:color .2s ease,border-color .2s ease;}
        .sv-hero__btn--ghost:hover{color:#fff;border-color:rgba(255,255,255,.45);}

        /* ── STATS STRIP ───────────────────────────────────────────────── */
        .sv-stats{background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);padding:2.8rem 1.5rem;}
        .sv-stats__inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:640px){.sv-stats__inner{grid-template-columns:repeat(2,1fr);}}
        .sv-stat__val{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4vw,3rem);font-weight:700;line-height:1;color:#fff;margin-bottom:.3rem;}
        .sv-stat__val span{color:#f97316;}
        .sv-stat__lbl{font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:400;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);}

        /* ── INTRO ─────────────────────────────────────────────────────── */
        .sv-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5.5rem 1.5rem;}
        .sv-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .sv-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .sv-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3.1rem);font-weight:700;line-height:1.15;letter-spacing:-.018em;color:#fff;margin:0 0 1.5rem;}
        .sv-intro__h2 em{font-style:italic;color:#f97316;}
        .sv-intro__rule{width:44px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .sv-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.42);max-width:660px;margin:0 auto .9rem;}
        .sv-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}

        /* ── SERVICES GRID ─────────────────────────────────────────────── */
        .sv-services{background:#080808;padding:6rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
        .sv-services__inner{max-width:1240px;margin:0 auto;}
        .sv-services__head{text-align:center;margin-bottom:4rem;}
        .sv-services__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .sv-services__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.12;letter-spacing:-.018em;color:#fff;margin:0 0 1rem;}
        .sv-services__h2 em{font-style:italic;color:#f97316;}
        .sv-services__rule{width:44px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto;}
        .sv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1100px){.sv-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:680px){.sv-grid{grid-template-columns:1fr;}}
        .sv-card{background:#111111;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:2.4rem 2rem 2rem;text-decoration:none;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;}
        .sv-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--sv-accent,#f97316);opacity:0;transition:opacity .3s ease;}
        .sv-card::after{content:attr(data-num);font-family:'Cormorant Garamond',serif;font-size:6rem;font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.04);position:absolute;bottom:-1.2rem;right:1.2rem;pointer-events:none;user-select:none;transition:-webkit-text-stroke .3s ease;}
        .sv-card:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--sv-accent,#f97316) 35%,transparent);box-shadow:0 24px 48px rgba(0,0,0,.5);}
        .sv-card:hover::before{opacity:1;}
        .sv-card:hover::after{-webkit-text-stroke:1px color-mix(in srgb,var(--sv-accent,#f97316) 14%,transparent);}
        .sv-card__top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.6rem;}
        .sv-card__icon-wrap{width:48px;height:48px;border-radius:12px;flex-shrink:0;background:color-mix(in srgb,var(--sv-accent,#f97316) 12%,transparent);border:1px solid color-mix(in srgb,var(--sv-accent,#f97316) 25%,transparent);display:flex;align-items:center;justify-content:center;color:var(--sv-accent,#f97316);font-size:1.15rem;transition:background .3s ease;}
        .sv-card:hover .sv-card__icon-wrap{background:color-mix(in srgb,var(--sv-accent,#f97316) 20%,transparent);}
        .sv-card__tag{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--sv-accent,#f97316);border:1px solid color-mix(in srgb,var(--sv-accent,#f97316) 30%,transparent);background:color-mix(in srgb,var(--sv-accent,#f97316) 7%,transparent);padding:4px 10px;border-radius:100px;}
        .sv-card__title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,2.2vw,1.6rem);font-weight:700;line-height:1.2;letter-spacing:-.012em;color:#fff;margin:0 0 .8rem;transition:color .2s ease;}
        .sv-card__rule{width:28px;height:1px;background:linear-gradient(90deg,var(--sv-accent,#f97316),transparent);margin-bottom:1rem;transition:width .3s ease;}
        .sv-card:hover .sv-card__rule{width:48px;}
        .sv-card__desc{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.42);margin-bottom:1.4rem;flex:1;}
        .sv-card__bullets{list-style:none;padding:0;margin:0 0 1.6rem;display:flex;flex-direction:column;gap:.38rem;}
        .sv-card__bullets li{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:400;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:.5rem;}
        .sv-card__bullets li::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--sv-accent,#f97316);flex-shrink:0;}
        .sv-card__link{display:inline-flex;align-items:center;gap:7px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--sv-accent,#f97316);transition:gap .2s ease;margin-top:auto;}
        .sv-card:hover .sv-card__link{gap:11px;}
        .sv-card__link svg{transition:transform .2s ease;}
        .sv-card:hover .sv-card__link svg{transform:translateX(3px);}

        /* ── WHY US ─────────────────────────────────────────────────────── */
        .sv-why{background:#0f0f0f;border-top:1px solid rgba(255,255,255,0.07);padding:6rem 1.5rem;}
        .sv-why__inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        @media(max-width:860px){.sv-why__inner{grid-template-columns:1fr;gap:3rem;}}
        .sv-why__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .sv-why__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,2.9rem);font-weight:700;line-height:1.15;letter-spacing:-.018em;color:#fff;margin:0 0 1.2rem;}
        .sv-why__h2 em{font-style:italic;color:#f97316;}
        .sv-why__rule{width:40px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin-bottom:1.5rem;}
        .sv-why__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.42);margin-bottom:2rem;}
        .sv-why__cta{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:13px 32px;border-radius:100px;text-decoration:none;box-shadow:0 8px 28px rgba(249,115,22,.3);transition:transform .2s ease,box-shadow .2s ease;}
        .sv-why__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}
        .sv-why__list{display:flex;flex-direction:column;gap:.9rem;}
        .sv-why__item{display:flex;align-items:flex-start;gap:.9rem;padding:1.1rem 1.3rem;background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:12px;transition:border-color .2s ease,transform .2s ease;}
        .sv-why__item:hover{border-color:rgba(249,115,22,.22);transform:translateX(4px);}
        .sv-why__item-icon{color:#f97316;font-size:1rem;flex-shrink:0;margin-top:.15rem;}
        .sv-why__item-text{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;line-height:1.6;color:rgba(255,255,255,0.65);}

        /* ── CTA STRIP ─────────────────────────────────────────────────── */
        .sv-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .sv-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.045;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .sv-cta__inner{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .sv-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .sv-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4.5vw,3.4rem);font-weight:700;line-height:1.12;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;}
        .sv-cta__h2 em{font-style:italic;color:#f97316;}
        .sv-cta__rule{width:44px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .sv-cta__sub{font-family:'DM Sans',sans-serif;font-size:.97rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.42);margin-bottom:2.6rem;}
        .sv-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:15px 38px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .sv-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 16px 44px rgba(249,115,22,.55);}

        @media(max-width:480px){.sv-hero__actions{flex-direction:column;align-items:stretch;}.sv-hero__btn--primary,.sv-hero__btn--ghost{justify-content:center;}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      <script
        id="schema-services-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svGraph) }}
      />

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
          Hero content now sits on top of a full-bleed photo banner (set as
          the section's CSS background — see .sv-hero in <style> above)
          instead of the previous centered layout with abstract orb/grid
          background. A dark gradient overlay keeps the white/orange text
          legible over the photo.
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
          <div className="sv-intro__rule" aria-hidden="true" />
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
            <div className="sv-services__rule" aria-hidden="true" />
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
            <div className="sv-why__rule" aria-hidden="true" />
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
          <div className="sv-cta__rule" aria-hidden="true" />
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

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}