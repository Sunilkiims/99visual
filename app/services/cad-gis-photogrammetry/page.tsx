// app/services/cad-gis-photogrammetry/page.tsx
//
// VISUAL REDESIGN (this revision) — migrates this page onto the same design
// system used for /services/digital-marketing-seo and
// /services/website-development, for site-wide consistency.
//
// Unchanged: metadata, all schema nodes (org/local business/website/page/
// breadcrumb/service/FAQ), FAQ_ITEMS copy, benefits copy, services copy
// (title/description/highlight/bullets), canonical/robots/OG/Twitter tags,
// H1/H2 hierarchy and text, the FAQ's native <details>/<summary> markup
// (no JS involved, so nothing to break).
//
// What changed is purely presentational:
//   - Dropped the dark near-black + orange system (shared with 3 other
//     service pages) for the light "analytics" system: cool paper
//     background, ink text, one blue signal accent, green reserved for
//     "pass/positive" indicators.
//   - Replaced the stock hero photo banner with an inline SVG "geospatial
//     scan" card — a topographic contour visual with a point-cloud grid
//     and a moving scan line, plus accuracy/density/coverage chips — a
//     signature visual specific to CAD/GIS/LiDAR/photogrammetry instead
//     of decoration with no connection to the content.
//   - Added a "processing log" ticker band (illustrative), this page's
//     geospatial counterpart to the ranking/build tickers on the other
//     two redesigned pages — same mechanism, page-specific content, used
//     once.
//   - The 5 alternating image/text service rows (each needing its own
//     illustration, each with a decorative 01/02/03 stroke numeral
//     implying a sequence that isn't real) became a single icon-based
//     card grid — no images required, same full copy per service.
//   - Header component is unmodified. It's fixed + transparent + white
//     text/logo until scrolled past 10px, so the hero keeps the same
//     dark scrim band behind the header's own height used on the other
//     redesigned pages, even though the rest of the hero is light.
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";

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

const BASE_SAFE = BASE.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual",
  description:
    "99 Visual Solutions delivers precision CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure and urban planning worldwide.",
  metadataBase: new URL(BASE_SAFE),
  alternates: {
    canonical: "/services/cad-gis-photogrammetry",
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      "max-image-preview":  "large",
      "max-snippet":        -1,
      "max-video-preview":  -1,
    },
  },
  openGraph: {
    title:       "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions",
    description: "From CAD drafting and GIS mapping to LiDAR processing, photogrammetry, spatial analysis, and 3D modeling — 99 Visual Solutions delivers precision geospatial services worldwide.",
    url:         `${BASE_SAFE}/services/cad-gis-photogrammetry`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
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
        url: `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
        alt: "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
  },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
  authors:         [{ name: "99 Visual Solutions", url: BASE_SAFE }],
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

const cgBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                      url: "/" },
  { name: "Services",                  url: "/services" },
  { name: "CAD, GIS & Photogrammetry", url: "/services/cad-gis-photogrammetry" },
]);

const cgFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${BASE_SAFE}/services/cad-gis-photogrammetry#faq`,
  mainEntityOfPage: { "@id": `${BASE_SAFE}/services/cad-gis-photogrammetry#webpage` },
};

const cgServiceNode = {
  "@type":     "Service",
  "@id":       `${BASE_SAFE}/services/cad-gis-photogrammetry#service`,
  name:        "CAD, GIS & Photogrammetry Services",
  description: "Precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure, engineering, and government projects.",
  provider:    { "@id": `${BASE_SAFE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         `${BASE_SAFE}/services/cad-gis-photogrammetry`,
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
  "@id":         `${BASE_SAFE}/services/cad-gis-photogrammetry#webpage`,
  url:           `${BASE_SAFE}/services/cad-gis-photogrammetry`,
  name:          "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual Solutions",
  description:   "Precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure, engineering, construction, and government projects.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".cg-hero__h1", ".cg-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE_SAFE}/services/cad-gis-photogrammetry#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE_SAFE}/services/cad-gis-photogrammetry`] },
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

const benefits = [
  { icon: <FaDraftingCompass />, title: "Accurate CAD Drafting",       description: "We provide precise CAD drawings and drafting services for engineering, architecture, and infrastructure projects, ensuring every deliverable meets professional standards." },
  { icon: <FaMapMarkedAlt />,    title: "Comprehensive GIS Solutions", description: "Our GIS services transform raw geospatial data into actionable insights for urban planning, resource management, and infrastructure development projects." },
  { icon: <FaSatellite />,       title: "Advanced Photogrammetry",     description: "We deliver accurate 3D models and orthomosaics using drone and satellite imagery for surveying, construction monitoring, and environmental analysis." },
  { icon: <FaCubes />,           title: "LiDAR Data Processing",       description: "We process LiDAR point cloud data to generate precise digital terrain models, digital surface models, and 3D mapping outputs for infrastructure projects." },
  { icon: <FaLayerGroup />,      title: "Multi-Layer Mapping",         description: "Our layered mapping solutions allow integration of CAD, GIS, and photogrammetry data for holistic, multi-dimensional project insights and decision support." },
  { icon: <FaProjectDiagram />,  title: "Project-Ready Deliverables",  description: "We deliver data in client-specified formats, ensuring compatibility and immediate readiness for project implementation, analysis, and reporting workflows." },
];

// Service copy (title/description/highlight/bullets) is unchanged from the
// previous revision. image/imageAlt/imageLeft fields were dropped since the
// redesign uses an icon-based card grid instead of five matching
// illustrations; an `icon` field was added instead.
const services = [
  {
    id: "advanced-cad-gis",
    title: "Advanced CAD, GIS & Geospatial Services",
    description: "Transform complex spatial data into actionable insights with our advanced CAD, GIS, and geospatial solutions. We help businesses, infrastructure projects, and government organisations visualise, analyse, and manage geographic and engineering data with precision.",
    highlight: "By combining cutting-edge tools, accurate data processing, and domain expertise, we deliver high-quality mapping, modelling, and analysis that supports smarter planning and decision-making at every scale.",
    bullets: ["CAD drafting, 2D/3D modelling & engineering design support", "GIS mapping, spatial analysis & geospatial data management", "LiDAR, photogrammetry & high-precision data processing"],
    icon: <FaDraftingCompass />,
  },
  {
    id: "end-to-end-mapping",
    title: "End-to-End CAD, GIS & Mapping Solutions",
    description: "From data capture to final visualisation, we deliver comprehensive CAD, GIS, and mapping solutions tailored to your project needs. Our end-to-end approach ensures seamless integration of geospatial data, engineering design, and advanced mapping technologies.",
    highlight: "Whether it's infrastructure development, urban planning, or asset management, we provide scalable and precise solutions that streamline workflows, reduce errors, and enhance decision-making at every stage of the project.",
    bullets: ["Complete workflow from data collection to final map delivery", "Integrated CAD, GIS & mapping for accurate planning & execution", "Scalable solutions for infrastructure, utilities & land management"],
    icon: <FaMapMarkedAlt />,
  },
  {
    id: "lidar-services",
    title: "Precision CAD, GIS & LiDAR Services",
    description: "Achieve unmatched accuracy and detail with our precision-driven CAD, GIS, and LiDAR services. We specialise in transforming complex spatial and survey data into highly accurate models, maps, and actionable insights for critical project decisions.",
    highlight: "By leveraging advanced LiDAR technology alongside expert CAD drafting and GIS analysis, we deliver reliable outputs that support critical decision-making across infrastructure, engineering, and environmental projects worldwide.",
    bullets: ["High-precision LiDAR data processing & 3D modelling", "Accurate CAD drafting & GIS-based spatial analysis", "Reliable data outputs for infrastructure, planning & surveying projects"],
    icon: <FaCubes />,
  },
  {
    id: "gis-data-management",
    title: "GIS Data Management & Spatial Analysis",
    description: "Turn complex geographic data into meaningful insights with our advanced GIS data management and spatial analysis services. We help organisations collect, organise, and analyse spatial data to support smarter planning, decision-making, and resource management.",
    highlight: "By leveraging powerful GIS tools and analytical techniques, we uncover patterns, trends, and relationships within your spatial data that drive operational efficiency and inform strategic growth decisions.",
    bullets: ["Geospatial data collection, cleaning & database management", "Spatial pattern analysis, trend identification & reporting", "Data-driven decision support for planning & operations"],
    icon: <FaLayerGroup />,
  },
  {
    id: "engineering-mapping",
    title: "Engineering, Mapping & Geospatial Solutions",
    description: "Bridge the gap between engineering precision and geospatial intelligence with our integrated solutions. We deliver comprehensive engineering, mapping, and geospatial services that support accurate planning, design, and execution across infrastructure and development projects.",
    highlight: "By combining advanced technologies with deep domain expertise, we transform complex data into clear, actionable insights — helping you improve efficiency, reduce risks, and make informed decisions at every stage of your project.",
    bullets: ["Integrated engineering design, mapping & geospatial analysis", "High-accuracy data processing for infrastructure & development", "Scalable solutions for planning, execution & asset management"],
    icon: <FaProjectDiagram />,
  },
];

// Illustrative processing-log lines for the signature ticker band — this
// page's geospatial counterpart to the ranking/build tickers on the other
// two redesigned service pages.
const pipeline = [
  { cmd: "lidar_classify",     out: "2.4M points classified" },
  { cmd: "orthomosaic_build",  out: "GSD 2.1cm/px" },
  { cmd: "dtm_generate",       out: "RMSE 0.03m" },
  { cmd: "cad_export",         out: "DWG R2018 ready" },
  { cmd: "gis_overlay",        out: "12 layers merged" },
  { cmd: "survey_qc",          out: "0 flagged points" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero geospatial scan card — the page's signature visual. Pure inline SVG,
// no external image asset. A moving scan line sweeps a contour/point-cloud
// grid; respects prefers-reduced-motion via the stylesheet below.
// ─────────────────────────────────────────────────────────────────────────────
function GeoScanCard() {
  const dots: { x: number; y: number }[] = [];
  for (let x = 14; x <= 206; x += 24) {
    for (let y = 20; y <= 150; y += 24) {
      dots.push({ x: x + ((y / 24) % 2 === 0 ? 0 : 12), y });
    }
  }
  return (
    <div className="cg-scancard" role="img" aria-label="Illustrative LiDAR point cloud scan with elevation contours and a survey accuracy readout">
      <div className="cg-scancard__top">
        <span className="cg-scancard__badge">LiDAR Scan · Tile 0042</span>
      </div>
      <svg className="cg-scancard__svg" viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0,140 C40,120 60,150 100,130 C140,110 160,140 220,120" fill="none" stroke="#E4E6EC" strokeWidth="1.4" />
        <path d="M0,110 C40,90 60,120 100,100 C140,80 160,110 220,90" fill="none" stroke="#E4E6EC" strokeWidth="1.4" />
        <path d="M0,80 C40,60 60,90 100,70 C140,50 160,80 220,60" fill="none" stroke="#E4E6EC" strokeWidth="1.4" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="#2E5CFF" opacity="0.55" />
        ))}
        <circle cx="150" cy="72" r="4.5" fill="none" stroke="#37D67A" strokeWidth="1.6" />
        <line x1="143" y1="72" x2="157" y2="72" stroke="#37D67A" strokeWidth="1.2" />
        <line x1="150" y1="65" x2="150" y2="79" stroke="#37D67A" strokeWidth="1.2" />
        <rect className="cg-scancard__scanline" x="0" y="0" width="220" height="3" fill="#2E5CFF" opacity="0.5" />
      </svg>
      <div className="cg-scancard__stats">
        <span><b>Accuracy</b> ±2cm</span>
        <span><b>Density</b> 850 pts/m²</span>
        <span><b>Coverage</b> 100%</span>
      </div>
    </div>
  );
}

export default function CADGISPhotogrammetry() {
  return (
    <>
      <script
        id="schema-cadgis-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cgGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .cg-page{
          --cg-ink:#12141A; --cg-muted:#5B6172; --cg-paper:#F5F6F8; --cg-surface:#FFFFFF;
          --cg-line:#E4E6EC; --cg-blue:#2E5CFF; --cg-green:#37D67A;
          background:var(--cg-paper);
        }
        .cg-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .cg-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--cg-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .cg-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--cg-ink);margin:0 0 1rem;text-align:center;}
        .cg-h2 em{font-style:normal;color:var(--cg-blue);}

        /* ══ HERO ══════════════════════════════════════════════════════════
           Header is fixed + transparent + white text/logo until scrolled
           past 10px (built to sit on a dark hero). This hero is light, so a
           dark scrim band sits behind the header's own height, fading into
           the paper background just below it. */
        .cg-hero{position:relative;padding:9rem 1.5rem 5rem;overflow:hidden;background:
          linear-gradient(180deg, var(--cg-ink) 0px, var(--cg-ink) 64px, rgba(18,20,26,.82) 100px, rgba(18,20,26,0) 200px),
          radial-gradient(1200px 500px at 88% -10%, rgba(46,92,255,.07), transparent 60%),
          var(--cg-paper);}
        @media(max-width:768px){
          .cg-hero{background:
            linear-gradient(180deg, var(--cg-ink) 0px, var(--cg-ink) 56px, rgba(18,20,26,.82) 84px, rgba(18,20,26,0) 170px),
            radial-gradient(1200px 500px at 88% -10%, rgba(46,92,255,.07), transparent 60%),
            var(--cg-paper);}
        }
        .cg-hero__inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:3.5rem;align-items:center;}
        @media(max-width:960px){.cg-hero__inner{grid-template-columns:1fr;gap:2.5rem;}}
        .cg-hero__content{animation:cgFadeUp .8s cubic-bezier(.22,1,.36,1) both;}
        @keyframes cgFadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

        .cg-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--cg-blue);border:1px solid rgba(46,92,255,.22);background:rgba(46,92,255,.06);padding:6px 14px;border-radius:100px;margin-bottom:1.6rem;}
        .cg-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--cg-blue);animation:cgPulse 2s ease-in-out infinite;}
        @keyframes cgPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .cg-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.4rem);font-weight:700;line-height:1.12;letter-spacing:-.015em;color:var(--cg-ink);margin:0 0 1.1rem;}
        .cg-hero__h1 em{font-style:normal;color:var(--cg-blue);}
        .cg-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.98rem,1.3vw,1.08rem);font-weight:300;line-height:1.7;color:var(--cg-muted);max-width:520px;margin:0 0 2.2rem;}
        .cg-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:var(--cg-ink);padding:13px 28px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .cg-hero__cta:hover{background:var(--cg-blue);transform:translateY(-2px);}

        .cg-scancard{background:var(--cg-surface);border:1px solid var(--cg-line);border-radius:20px;padding:1.75rem 1.75rem 1.5rem;box-shadow:0 24px 60px -20px rgba(18,20,26,.14);animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;overflow:hidden;}
        .cg-scancard__top{display:flex;justify-content:center;margin-bottom:.75rem;}
        .cg-scancard__badge{font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:var(--cg-ink);background:var(--cg-paper);border:1px solid var(--cg-line);padding:5px 12px;border-radius:8px;}
        .cg-scancard__svg{width:100%;height:auto;display:block;position:relative;}
        .cg-scancard__scanline{animation:cgScan 3s ease-in-out infinite;}
        @keyframes cgScan{0%{transform:translateY(0);opacity:0;}10%{opacity:.6;}90%{opacity:.6;}100%{transform:translateY(167px);opacity:0;}}
        .cg-scancard__stats{display:flex;justify-content:space-between;gap:.5rem;padding-top:.75rem;margin-top:.5rem;border-top:1px solid var(--cg-line);}
        .cg-scancard__stats span{font-family:'IBM Plex Mono',monospace;font-size:.74rem;color:var(--cg-muted);}
        .cg-scancard__stats b{color:var(--cg-ink);font-weight:500;}

        /* ══ TICKER — signature motif, used once ══════════════════════════ */
        .cg-ticker{background:var(--cg-ink);overflow:hidden;padding:.9rem 0;}
        .cg-ticker__track{display:flex;gap:2.5rem;width:max-content;animation:cgScroll 34s linear infinite;}
        .cg-ticker:hover .cg-ticker__track{animation-play-state:paused;}
        @keyframes cgScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .cg-ticker__item{display:flex;align-items:center;gap:.5rem;font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:rgba(255,255,255,.55);white-space:nowrap;}
        .cg-ticker__item b{color:rgba(255,255,255,.4);}
        .cg-ticker__pass{color:var(--cg-green);}
        .cg-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:.68rem;color:var(--cg-muted);padding:.6rem 1.5rem 0;background:var(--cg-paper);}

        /* ══ INTRO — unchanged copy ═══════════════════════════════════════ */
        .cg-intro{background:var(--cg-surface);border-bottom:1px solid var(--cg-line);padding:5.5rem 1.5rem;}
        .cg-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .cg-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--cg-muted);max-width:700px;margin:0 auto .9rem;}
        .cg-intro__p strong{color:var(--cg-ink);font-weight:500;}

        /* ══ SERVICES — icon-based card grid (replaces 5 alternating rows) ══ */
        .cg-services{background:var(--cg-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-services__inner{max-width:1180px;margin:0 auto;}
        .cg-services__head{max-width:640px;margin:0 auto 3rem;}
        .cg-svc-grid{display:flex;flex-wrap:wrap;gap:1.25rem;justify-content:center;}
        .cg-svc-card{flex:1 1 320px;max-width:380px;background:var(--cg-surface);border:1px solid var(--cg-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .cg-svc-card:hover{border-color:var(--cg-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .cg-svc-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .cg-svc-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.08rem;font-weight:600;color:var(--cg-ink);margin:0 0 .7rem;}
        .cg-svc-card__desc{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--cg-muted);margin:0 0 .8rem;}
        .cg-svc-card__highlight{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:400;line-height:1.7;color:var(--cg-ink);border-left:2px solid var(--cg-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .cg-svc-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .cg-svc-card__bullets li{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--cg-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .cg-svc-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--cg-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */
        .cg-benefits{background:var(--cg-surface);padding:5.5rem 1.5rem;}
        .cg-benefits__inner{max-width:1200px;margin:0 auto;}
        .cg-benefits__head{max-width:560px;margin:0 auto 3rem;text-align:center;}
        .cg-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--cg-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .cg-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--cg-ink);margin:0 0 .8rem;}
        .cg-benefits__h2 em{font-style:normal;color:var(--cg-blue);}
        .cg-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--cg-muted);max-width:520px;margin:0 auto;}
        .cg-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.cg-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.cg-benefits__grid{grid-template-columns:1fr;}}
        .cg-benefit-card{background:var(--cg-paper);border:1px solid var(--cg-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .cg-benefit-card:hover{border-color:var(--cg-blue);transform:translateY(-3px);}
        .cg-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .cg-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--cg-ink);margin-bottom:.5rem;}
        .cg-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--cg-muted);}

        /* ══ FAQ — native details/summary, unchanged markup ═══════════════ */
        .cg-faq{background:var(--cg-paper);padding:5.5rem 1.5rem;border-top:1px solid var(--cg-line);}
        .cg-faq__inner{max-width:800px;margin:0 auto;}
        .cg-faq__header{text-align:center;margin-bottom:3rem;}
        .cg-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--cg-line);border-radius:16px;overflow:hidden;}
        .cg-faq__item{border-bottom:1px solid var(--cg-line);background:var(--cg-surface);transition:background .2s ease;}
        .cg-faq__item:last-child{border-bottom:none;}
        .cg-faq__item[open]{background:#fff;}
        .cg-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .cg-faq__q::-webkit-details-marker{display:none;}.cg-faq__q::marker{display:none;}
        .cg-faq__q-text{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--cg-ink);line-height:1.35;flex:1;transition:color .2s ease;}
        .cg-faq__item[open] .cg-faq__q-text,.cg-faq__q:hover .cg-faq__q-text{color:var(--cg-blue);}
        .cg-faq__chevron{flex-shrink:0;color:var(--cg-blue);opacity:.8;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .cg-faq__item[open] .cg-faq__chevron{transform:rotate(180deg);opacity:1;}
        .cg-faq__a{padding:0 1.75rem 1.5rem;animation:cgFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes cgFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .cg-faq__a p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;line-height:1.8;color:var(--cg-muted);margin:0;}

        /* ══ CTA ═══════════════════════════════════════════════════════════ */
        .cg-cta{background:var(--cg-surface);border-top:1px solid var(--cg-line);padding:5.5rem 1.5rem;text-align:center;}
        .cg-cta__inner{max-width:560px;margin:0 auto;}
        .cg-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--cg-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .cg-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--cg-ink);margin:0 0 1rem;}
        .cg-cta__h2 em{font-style:normal;color:var(--cg-blue);}
        .cg-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--cg-muted);margin-bottom:2.2rem;}
        .cg-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--cg-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .cg-cta__btn:hover{background:var(--cg-blue);transform:translateY(-2px);}

        @media(max-width:600px){.cg-faq__q{padding:1.25rem;}.cg-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){
          .cg-page *,.cg-page *::before,.cg-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
          .cg-scancard__scanline{opacity:0!important;}
        }
      `}</style>

      <Header />

      <div className="cg-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="cg-hero" aria-labelledby="cg-hero-heading">
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

          <div className="cg-hero__inner">
            <div className="cg-hero__content">
              <div className="cg-hero__eyebrow">
                <span className="cg-hero__dot" />
                Services · CAD, GIS &amp; Photogrammetry
              </div>
              <h1 className="cg-hero__h1" id="cg-hero-heading">
                Precision mapping,<br />measured in <em>millimeters</em>
              </h1>
              <p className="cg-hero__sub">
                CAD drafting, GIS mapping, LiDAR processing, photogrammetry, and
                spatial analysis — precision-driven geospatial solutions for
                infrastructure, engineering, and urban planning worldwide.
              </p>
              <a href="#cg-services" className="cg-hero__cta" aria-label="Explore CAD, GIS and photogrammetry services">
                Explore Services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <GeoScanCard />
          </div>
        </section>

        {/* ══ TICKER — signature motif ══════════════════════════════════════ */}
        <div className="cg-ticker" aria-hidden="true">
          <div className="cg-ticker__track">
            {[...pipeline, ...pipeline].map((p, i) => (
              <span className="cg-ticker__item" key={i}>
                <b>$</b> {p.cmd} <span className="cg-ticker__pass">→ {p.out} ✓</span>
              </span>
            ))}
          </div>
        </div>
        <p className="cg-ticker__caption">Illustrative processing-log output</p>

        {/* ══ INTRO — unchanged copy ═══════════════════════════════════════ */}
        <section className="cg-intro" aria-labelledby="cg-intro-heading">
          <div className="cg-intro__inner">
            <span className="cg-label">Our Expertise</span>
            <h2 className="cg-h2" id="cg-intro-heading">
              Precision, innovation &amp; data-driven<br />geospatial <em>intelligence</em>
            </h2>
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

        {/* ══ SERVICES — 100% unchanged copy, icon-based grid ═══════════════ */}
        <section id="cg-services" className="cg-services" aria-labelledby="cg-services-heading">
          <div className="cg-services__inner">
            <div className="cg-services__head">
              <span className="cg-label">What We Deliver</span>
              <h2 className="cg-h2" id="cg-services-heading">Five ways we bring <em>precision</em> to your data</h2>
            </div>
            <div className="cg-svc-grid">
              {services.map((svc) => (
                <article className="cg-svc-card" id={svc.id} key={svc.id} aria-labelledby={`cg-svc-heading-${svc.id}`}>
                  <div className="cg-svc-card__icon" aria-hidden="true">{svc.icon}</div>
                  <h3 className="cg-svc-card__title" id={`cg-svc-heading-${svc.id}`}>{svc.title}</h3>
                  <p className="cg-svc-card__desc">{svc.description}</p>
                  <p className="cg-svc-card__highlight">{svc.highlight}</p>
                  <ul className="cg-svc-card__bullets">
                    {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */}
        <section className="cg-benefits" aria-labelledby="cg-benefits-heading">
          <div className="cg-benefits__inner">
            <div className="cg-benefits__head">
              <span className="cg-benefits__label">Why Choose Us?</span>
              <h2 className="cg-benefits__h2" id="cg-benefits-heading">
                Benefits of partnering with <em>99 Visual</em>
              </h2>
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

        {/* FAQPage structured data is handled exclusively via JSON-LD in the
            <script> tag above (cgFaqNode); no microdata attributes here. */}
        <section id="cg-faq" className="cg-faq" aria-labelledby="cg-faq-heading">
          <div className="cg-faq__inner">
            <div className="cg-faq__header">
              <span className="cg-label">Got Questions?</span>
              <h2 className="cg-h2" id="cg-faq-heading">Frequently Asked Questions</h2>
            </div>
            <dl className="cg-faq__list">
              {FAQ_ITEMS.map(({ question, answer }, i) => (
                <details key={i} className="cg-faq__item">
                  <summary className="cg-faq__q">
                    <span className="cg-faq__q-text">{question}</span>
                    <span className="cg-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="cg-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="cg-cta" aria-labelledby="cg-cta-heading">
          <div className="cg-cta__inner">
            <span className="cg-cta__eyebrow">Start a Project</span>
            <h2 className="cg-cta__h2" id="cg-cta-heading">
              Ready to map your next big <em>project</em>?
            </h2>
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
      </div>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}
