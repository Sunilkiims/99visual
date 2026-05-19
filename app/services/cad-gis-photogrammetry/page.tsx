// app/services/cad-gis-photogrammetry/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// CAD, GIS & Photogrammetry — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ IMPROVEMENT #8 — Title shortened from 101 chars to 63 chars.
//   ✅ CRITICAL #2 — breadcrumbFromItems() with correct @id item objects.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed.
//   ✅ aria-hidden removed from breadcrumb <nav> — cg-sr-only used.
//   ✅ CONTACT_EMAIL imported — single source of truth.
//   ✅ FAQ answers verified 40+ words.
//   ✅ All CSS classes retain "cg-" prefix (already correct from prior fix).
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
  FaDraftingCompass, FaMapMarkedAlt, FaCubes,
  FaSatellite, FaLayerGroup, FaProjectDiagram,
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
  // ✅ FIX: Was 101 chars — now 63 chars, within the 50–65 sweet spot
  title: "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual",

  description:
    "99 Visual Solutions delivers precision CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure and urban planning worldwide.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/services/cad-gis-photogrammetry`,
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
      "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions",
    description:
      "From CAD drafting and GIS mapping to LiDAR processing, photogrammetry, spatial analysis, and 3D modeling — 99 Visual Solutions delivers precision geospatial services worldwide.",
    url: `${BASE}/services/cad-gis-photogrammetry`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/services/cad-gis-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "CAD, GIS & Photogrammetry | LiDAR, 3D Mapping — 99 Visual Solutions",
    description: "CAD drafting, GIS mapping, LiDAR processing, photogrammetry, spatial analysis & 3D modeling — precision geospatial solutions by 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/services/cad-gis-og.jpg`,
        alt: "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
  },

  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
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
// FAQ — single source of truth. ✅ All answers 40+ words.
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What CAD drafting services does 99 Visual Solutions provide?",
    answer:
      `We offer 2D CAD drafting, 3D CAD modelling, engineering design support, and architectural CAD services for infrastructure, construction, and industrial projects. Our CAD team works with AutoCAD, Revit, SolidWorks, and other industry-standard tools to deliver precise, project-ready drawings. Contact us at ${CONTACT_EMAIL} for a free consultation and quote.`,
  },
  {
    question: "What GIS services does 99 Visual Solutions offer?",
    answer:
      "Our GIS services include geospatial data management, spatial analysis, urban planning mapping, asset management GIS, and custom GIS solutions for infrastructure and environmental projects. We work with ArcGIS, QGIS, and other geospatial platforms to transform raw geographic data into actionable insights that support smarter planning, decision-making, and resource management.",
  },
  {
    question: "Does 99 Visual Solutions process LiDAR data?",
    answer:
      "Yes, we specialise in LiDAR point cloud processing, digital terrain model (DTM) generation, digital surface model (DSM) creation, and 3D mapping from airborne and terrestrial LiDAR data. Our team uses industry-leading tools including LAStools, CloudCompare, and ENVI to deliver accurate, high-resolution outputs for infrastructure, engineering, construction, and environmental monitoring projects.",
  },
  {
    question: "What photogrammetry services are available?",
    answer:
      `We provide drone and aerial photogrammetry, orthomosaic mapping, 3D photogrammetric modelling, and survey-grade mapping for construction, engineering, and environmental monitoring. Our photogrammetry outputs include georeferenced orthomosaics, point clouds, digital elevation models (DEMs), and 3D textured meshes. Email us at ${CONTACT_EMAIL} to discuss your specific project requirements.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

// ✅ FIX: breadcrumbFromItems() with correct @id item objects
const cgBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                      url: "/" },
  { name: "Services",                  url: "/services" },
  { name: "CAD, GIS & Photogrammetry", url: "/services/cad-gis-photogrammetry" },
]);

const cgFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${BASE}/services/cad-gis-photogrammetry#faq`,
  mainEntityOfPage: { "@id": `${BASE}/services/cad-gis-photogrammetry#webpage` },
};

const cgServiceNode = {
  "@type":     "Service",
  "@id":       `${BASE}/services/cad-gis-photogrammetry#service`,
  name:        "CAD, GIS & Photogrammetry Services",
  description: "Precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure, engineering, and government projects.",
  provider:    { "@id": `${BASE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         `${BASE}/services/cad-gis-photogrammetry`,
  serviceType: "Geospatial Services",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "CAD, GIS & Photogrammetry Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD Drafting & 3D Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GIS Mapping & Spatial Analysis" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone & Aerial Photogrammetry" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LiDAR Point Cloud Processing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Terrain & Surface Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Engineering Mapping & Geospatial Solutions" } },
    ],
  },
};

const cgPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/services/cad-gis-photogrammetry#webpage`,
  url:           `${BASE}/services/cad-gis-photogrammetry`,
  name:          "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual Solutions",
  description:   "Precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure, engineering, construction, and government projects.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/services/cad-gis-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".cg-hero__h1", ".cg-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/services/cad-gis-photogrammetry#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/services/cad-gis-photogrammetry`] },
};

const cgGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  cgPageNode,
  cgBreadcrumbNode,
  cgServiceNode,
  cgFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaDraftingCompass />, title: "Accurate CAD Drafting",       description: "We provide precise CAD drawings and drafting services for engineering, architecture, and infrastructure projects, ensuring every deliverable meets professional standards." },
  { icon: <FaMapMarkedAlt />,    title: "Comprehensive GIS Solutions", description: "Our GIS services transform raw geospatial data into actionable insights for urban planning, resource management, and infrastructure development projects." },
  { icon: <FaSatellite />,       title: "Advanced Photogrammetry",     description: "We deliver accurate 3D models and orthomosaics using drone and satellite imagery for surveying, construction monitoring, and environmental analysis." },
  { icon: <FaCubes />,           title: "LiDAR Data Processing",       description: "We process LiDAR point cloud data to generate precise digital terrain models, digital surface models, and 3D mapping outputs for infrastructure projects." },
  { icon: <FaLayerGroup />,      title: "Multi-Layer Mapping",         description: "Our layered mapping solutions allow integration of CAD, GIS, and photogrammetry data for holistic, multi-dimensional project insights and decision support." },
  { icon: <FaProjectDiagram />,  title: "Project-Ready Deliverables",  description: "We deliver data in client-specified formats, ensuring compatibility and immediate readiness for project implementation, analysis, and reporting workflows." },
];

const services = [
  {
    id: "advanced-cad-gis",
    title: "Advanced CAD, GIS & Geospatial Services",
    image: "/images/advanced-cad-gis.png",
    imageAlt: "Advanced CAD, GIS & Geospatial services illustration",
    description: "Transform complex spatial data into actionable insights with our advanced CAD, GIS, and geospatial solutions. We help businesses, infrastructure projects, and government organisations visualise, analyse, and manage geographic and engineering data with precision.",
    highlight: "By combining cutting-edge tools, accurate data processing, and domain expertise, we deliver high-quality mapping, modelling, and analysis that supports smarter planning and decision-making at every scale.",
    bullets: ["CAD drafting, 2D/3D modelling & engineering design support", "GIS mapping, spatial analysis & geospatial data management", "LiDAR, photogrammetry & high-precision data processing"],
    imageLeft: false,
  },
  {
    id: "end-to-end-mapping",
    title: "End-to-End CAD, GIS & Mapping Solutions",
    image: "/images/GIS-Mapping.png",
    imageAlt: "End-to-end GIS mapping solutions illustration",
    description: "From data capture to final visualisation, we deliver comprehensive CAD, GIS, and mapping solutions tailored to your project needs. Our end-to-end approach ensures seamless integration of geospatial data, engineering design, and advanced mapping technologies.",
    highlight: "Whether it's infrastructure development, urban planning, or asset management, we provide scalable and precise solutions that streamline workflows, reduce errors, and enhance decision-making at every stage of the project.",
    bullets: ["Complete workflow from data collection to final map delivery", "Integrated CAD, GIS & mapping for accurate planning & execution", "Scalable solutions for infrastructure, utilities & land management"],
    imageLeft: true,
  },
  {
    id: "lidar-services",
    title: "Precision CAD, GIS & LiDAR Services",
    image: "/images/Precision-CAD-GIS.png",
    imageAlt: "Precision CAD, GIS & LiDAR services illustration",
    description: "Achieve unmatched accuracy and detail with our precision-driven CAD, GIS, and LiDAR services. We specialise in transforming complex spatial and survey data into highly accurate models, maps, and actionable insights for critical project decisions.",
    highlight: "By leveraging advanced LiDAR technology alongside expert CAD drafting and GIS analysis, we deliver reliable outputs that support critical decision-making across infrastructure, engineering, and environmental projects worldwide.",
    bullets: ["High-precision LiDAR data processing & 3D modelling", "Accurate CAD drafting & GIS-based spatial analysis", "Reliable data outputs for infrastructure, planning & surveying projects"],
    imageLeft: false,
  },
  {
    id: "gis-data-management",
    title: "GIS Data Management & Spatial Analysis",
    image: "/images/GIS-Data-Management.png",
    imageAlt: "GIS Data Management & Spatial Analysis illustration",
    description: "Turn complex geographic data into meaningful insights with our advanced GIS data management and spatial analysis services. We help organisations collect, organise, and analyse spatial data to support smarter planning, decision-making, and resource management.",
    highlight: "By leveraging powerful GIS tools and analytical techniques, we uncover patterns, trends, and relationships within your spatial data that drive operational efficiency and inform strategic growth decisions.",
    bullets: ["Geospatial data collection, cleaning & database management", "Spatial pattern analysis, trend identification & reporting", "Data-driven decision support for planning & operations"],
    imageLeft: true,
  },
  {
    id: "engineering-mapping",
    title: "Engineering, Mapping & Geospatial Solutions",
    image: "/images/Engineering-Mapping.png",
    imageAlt: "Engineering, Mapping & Geospatial solutions illustration",
    description: "Bridge the gap between engineering precision and geospatial intelligence with our integrated solutions. We deliver comprehensive engineering, mapping, and geospatial services that support accurate planning, design, and execution across infrastructure and development projects.",
    highlight: "By combining advanced technologies with deep domain expertise, we transform complex data into clear, actionable insights — helping you improve efficiency, reduce risks, and make informed decisions at every stage of your project.",
    bullets: ["Integrated engineering design, mapping & geospatial analysis", "High-accuracy data processing for infrastructure & development", "Scalable solutions for planning, execution & asset management"],
    imageLeft: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CADGISPhotogrammetry() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-cadgis-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cgGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ✅ FIX: cg-sr-only — accessible but visually hidden */
        .cg-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .cg-hero{position:relative;min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#080808;overflow:hidden;padding:8rem 1.5rem 6rem;text-align:center;}
        .cg-hero__orb{position:absolute;border-radius:50%;filter:blur(100px);animation:cgOrbDrift 16s ease-in-out infinite alternate;pointer-events:none;}
        .cg-hero__orb--1{width:540px;height:540px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-160px;left:-100px;opacity:.13;}
        .cg-hero__orb--2{width:460px;height:460px;background:radial-gradient(circle,#f97316,#ea580c);bottom:-130px;right:-80px;opacity:.12;animation-delay:-8s;}
        .cg-hero__orb--3{width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;right:15%;opacity:.07;animation-delay:-4s;}
        @keyframes cgOrbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(32px,24px) scale(1.06)}}
        .cg-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:60px 60px;}
        .cg-hero__grain{position:absolute;inset:0;opacity:.03;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .cg-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .cg-corner--tl{top:24px;left:24px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .cg-corner--tr{top:24px;right:24px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        .cg-corner--bl{bottom:64px;left:24px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        .cg-corner--br{bottom:64px;right:24px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}
        .cg-hero__content{position:relative;z-index:10;max-width:860px;margin:0 auto;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        @keyframes cgFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        .cg-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .cg-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:cgPulse 2s ease-in-out infinite;}
        @keyframes cgPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .cg-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;}
        .cg-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.2px #f97316;}
        .cg-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        .cg-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,2vw,1.1rem);font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto 2.6rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;}
        .cg-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .cg-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}
        .cg-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .cg-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .cg-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .cg-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .cg-intro__h2 em{font-style:italic;color:#f97316;}
        .cg-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .cg-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .cg-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}
        .cg-services{background:#080808;}
        .cg-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .cg-svc:nth-child(odd){background:#0f0f0f;}
        .cg-svc:nth-child(even){background:#080808;}
        .cg-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .cg-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){.cg-svc__inner--img-left,.cg-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}.cg-svc__img-wrap{order:2!important;}.cg-svc__body{order:1!important;}}
        .cg-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .cg-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .cg-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .cg-svc__img-wrap:hover img{transform:scale(1.03);}
        .cg-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .cg-svc__body{position:relative;}
        .cg-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .cg-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .cg-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .cg-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .cg-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .cg-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .cg-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .cg-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}
        .cg-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .cg-benefits__inner{max-width:1200px;margin:0 auto;}
        .cg-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .cg-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .cg-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .cg-benefits__h2 em{font-style:italic;color:#f97316;}
        .cg-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .cg-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .cg-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.cg-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.cg-benefits__grid{grid-template-columns:1fr;}}
        .cg-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .cg-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .cg-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .cg-benefit-card:hover::before{opacity:1;}
        .cg-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .cg-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .cg-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}
        .cg-faq{background:#080808;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .cg-faq__inner{max-width:800px;margin:0 auto;}
        .cg-faq__header{text-align:center;margin-bottom:3.5rem;}
        .cg-faq__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .cg-faq__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .cg-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;}
        .cg-faq__item{border-bottom:1px solid rgba(255,255,255,0.07);background:#0f0f0f;transition:background .2s ease;}
        .cg-faq__item:last-child{border-bottom:none;}
        .cg-faq__item[open]{background:#141414;}
        .cg-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .cg-faq__q::-webkit-details-marker{display:none;}.cg-faq__q::marker{display:none;}
        .cg-faq__q-text{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:rgba(255,255,255,.85);line-height:1.35;flex:1;transition:color .2s ease;}
        .cg-faq__item[open] .cg-faq__q-text,.cg-faq__q:hover .cg-faq__q-text{color:#fff;}
        .cg-faq__chevron{flex-shrink:0;color:#f97316;opacity:.7;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .cg-faq__item[open] .cg-faq__chevron{transform:rotate(180deg);opacity:1;}
        .cg-faq__a{padding:0 1.75rem 1.5rem;animation:cgFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes cgFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .cg-faq__a p{font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin:0;}
        .cg-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .cg-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .cg-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .cg-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .cg-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .cg-cta__h2 em{font-style:italic;color:#f97316;}
        .cg-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .cg-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .cg-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .cg-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}
        @media(max-width:600px){.cg-faq__q{padding:1.25rem;}.cg-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="cg-hero" aria-labelledby="cg-hero-heading">
        <div aria-hidden="true">
          <div className="cg-hero__orb cg-hero__orb--1" />
          <div className="cg-hero__orb cg-hero__orb--2" />
          <div className="cg-hero__orb cg-hero__orb--3" />
          <div className="cg-hero__grid" />
          <div className="cg-hero__grain" />
        </div>
        <div className="cg-corner cg-corner--tl" aria-hidden="true" />
        <div className="cg-corner cg-corner--tr" aria-hidden="true" />
        <div className="cg-corner cg-corner--bl" aria-hidden="true" />
        <div className="cg-corner cg-corner--br" aria-hidden="true" />

        {/* ✅ FIX: aria-hidden removed — cg-sr-only used */}
        <nav className="cg-sr-only" aria-label="Breadcrumb">
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
              <a href="/services/cad-gis-photogrammetry" itemProp="item" aria-current="page">
                <span itemProp="name">CAD, GIS &amp; Photogrammetry</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="cg-hero__content">
          <div className="cg-hero__eyebrow" aria-hidden="true">
            <span className="cg-hero__dot" />
            Services · CAD, GIS &amp; Photogrammetry
          </div>
          <h1 className="cg-hero__h1" id="cg-hero-heading">
            Precision mapping for<br />a smarter <em>world</em>
          </h1>
          <div className="cg-hero__rule" aria-hidden="true" />
          <p className="cg-hero__sub">
            From CAD drafting and GIS mapping to LiDAR processing, photogrammetry, and spatial
            analysis — we deliver precision-driven geospatial solutions for infrastructure,
            engineering, and urban planning worldwide.
          </p>
          <a href="#cg-services" className="cg-hero__cta" aria-label="Explore CAD, GIS and photogrammetry services">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ══ INTRO ════════════════════════════════════════════════════════ */}
      <section className="cg-intro" aria-labelledby="cg-intro-heading">
        <div className="cg-intro__inner">
          <span className="cg-intro__label">Our Expertise</span>
          <h2 className="cg-intro__h2" id="cg-intro-heading">
            Precision, innovation &amp; data-driven<br />geospatial <em>intelligence</em>
          </h2>
          <div className="cg-intro__rule" aria-hidden="true" />
          <p className="cg-intro__p">
            At <strong>99 Visual Solutions</strong>, we specialise in <strong>Computer-Aided Design (CAD)</strong>,{" "}
            <strong>Geographic Information Systems (GIS)</strong>, and <strong>Photogrammetry</strong>, delivering
            data-rich and high-accuracy solutions that empower businesses, government agencies, and planners to
            make informed decisions based on precise spatial intelligence.
          </p>
          <p className="cg-intro__p">
            Whether it&apos;s <strong>surveying, infrastructure planning, urban development, or environmental analysis</strong>,
            our advanced tools and deep domain expertise provide actionable insights that drive efficiency, precision,
            and project success.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ═════════════════════════════════════════════ */}
      <div id="cg-services" className="cg-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="cg-svc" aria-labelledby={`cg-svc-heading-${svc.id}`}>
            <div className={`cg-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="cg-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image src={svc.image} alt={svc.imageAlt} width={600} height={460} style={{ width:"100%",height:"auto" }} />
              </div>
              <div className="cg-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="cg-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="cg-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="cg-svc__heading" id={`cg-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="cg-svc__rule" aria-hidden="true" />
                <p className="cg-svc__p">{svc.description}</p>
                <p className="cg-svc__highlight">{svc.highlight}</p>
                <ul className="cg-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ════════════════════════════════════════════════════ */}
      <section className="cg-benefits" aria-labelledby="cg-benefits-heading">
        <div className="cg-benefits__inner">
          <div className="cg-benefits__head">
            <span className="cg-benefits__label">Why Choose Us?</span>
            <h2 className="cg-benefits__h2" id="cg-benefits-heading">
              Benefits of partnering with<br /><em>99 Visual</em> CAD, GIS &amp; Photogrammetry
            </h2>
            <div className="cg-benefits__rule" aria-hidden="true" />
            <p className="cg-benefits__sub">
              With 99 Visual Solutions, precision and innovation go hand in hand. Our services
              are designed to provide reliable, scalable, and accurate geospatial insights.
            </p>
          </div>
          <div className="cg-benefits__grid">
            {benefits.map((b, i) => (
              <div className="cg-benefit-card" key={i}>
                <div className="cg-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <div className="cg-benefit-card__title">{b.title}</div>
                <p className="cg-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════ */}
      <section id="cg-faq" className="cg-faq" aria-labelledby="cg-faq-heading"
        itemScope itemType="https://schema.org/FAQPage">
        <div className="cg-faq__inner">
          <div className="cg-faq__header">
            <span className="cg-faq__label">Got Questions?</span>
            <h2 className="cg-faq__h2" id="cg-faq-heading">Frequently Asked Questions</h2>
          </div>
          <dl className="cg-faq__list">
            {FAQ_ITEMS.map(({ question, answer }, i) => (
              <details key={i} className="cg-faq__item"
                itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="cg-faq__q" itemProp="name">
                  <span className="cg-faq__q-text">{question}</span>
                  <span className="cg-faq__chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="cg-faq__a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">{answer}</p>
                </div>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ CTA STRIP ═══════════════════════════════════════════════════ */}
      <section className="cg-cta" aria-labelledby="cg-cta-heading">
        <div className="cg-cta__orb" aria-hidden="true" />
        <div className="cg-cta__inner">
          <span className="cg-cta__eyebrow">Start a Project</span>
          <h2 className="cg-cta__h2" id="cg-cta-heading">
            Ready to map your next big <em>project</em>?
          </h2>
          <div className="cg-cta__rule" aria-hidden="true" />
          <p className="cg-cta__sub">
            Get in touch with our team for a free consultation. We&apos;ll help you design
            the right CAD, GIS, or geospatial strategy to meet your project goals.
          </p>
          <Link href="/contact" className="cg-cta__btn" aria-label="Get a free CAD, GIS and geospatial consultation from 99 Visual Solutions">
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