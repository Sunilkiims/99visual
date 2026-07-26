// app/services/it-consulting/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// IT Consulting — 99 Visual Solutions
//
// PRODUCTION-READY INDEXING FIXES (unchanged from prior revision):
//   ✅ FIX 1 — PAGE_CANONICAL: single absolute URL constant reused across
//      metadata.alternates.canonical, OG url, and ALL JSON-LD nodes.
//   ✅ FIX 2 — metadataBase added (BASE_SAFE).
//   ✅ FIX 3 — robots: unchanged.
//   ✅ FIX 4 — DATE_MODIFIED: hardcoded instead of new Date().
//   ✅ FIX 5 — schema nodes: unchanged, still built inline.
//   ✅ FIX 6 — buildGraph() imports: unchanged.
//
// THIS REVISION — HERO REDESIGN:
//   Swapped the full-bleed photo-banner hero for the same hero *system* now
//   used on /services/website-development: a light "analytics" surface with
//   a dark scrim band behind the fixed/transparent header, a two-column
//   layout (copy + inline SVG stat card), a feature-badge row, and a dual
//   CTA (primary + ghost). No external hero photo asset required anymore.
//
//   The SVG card is page-specific, not a copy-paste of the web-dev gauge:
//   it's an "Infrastructure Health" gauge (uptime/monitoring flavored,
//   matching this page's cybersecurity/infrastructure copy) instead of a
//   Core Web Vitals performance score. Accent color stays this page's
//   existing orange (#f97316) rather than web-dev's blue, so the hero still
//   reads as part of this page rather than a copy of another one — the
//   dark sections immediately below (intro, services, benefits, CTA) are
//   unchanged, so the hero's dark scrim + a bottom fade keep the handoff
//   smooth instead of cutting hard from light to dark.
//
//   Everything else — copy, schema, metadata, services/benefits data,
//   section order below the hero — is untouched.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";

import type { Metadata } from "next";
import {
  FaCogs, FaShieldAlt, FaProjectDiagram,
  FaNetworkWired, FaHandsHelping, FaCloud,
  FaServer, FaClock,
} from "react-icons/fa";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX 1 & 2 — BASE_SAFE + PAGE_CANONICAL.
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE      = BASE.replace(/\/$/, "");
const PAGE_CANONICAL = `${BASE_SAFE}/services/it-consulting`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "IT Consulting Services | Cloud, Cybersecurity & IoT — 99 Visual",

  description:
    "99 Visual Solutions provides end-to-end IT consulting: infrastructure planning, cloud migration (AWS, Azure, GCP), cybersecurity, IoT integration, software consulting, and IT project management worldwide.",

  metadataBase: new URL(BASE_SAFE),

  alternates: {
    canonical: PAGE_CANONICAL,
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT",
    description: "From cloud migration and cybersecurity to IT infrastructure, software consulting, IoT integration, and project management — 99 Visual Solutions delivers strategic IT consulting worldwide.",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "IT Consulting Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "IT Consulting | Cloud, Cybersecurity & IoT — 99 Visual Solutions",
    description: "Cloud migration, cybersecurity, IT infrastructure, IoT integration & software consulting — strategic IT solutions by 99 Visual Solutions for businesses worldwide.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
        alt: "IT Consulting Services by 99 Visual Solutions",
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

// ─────────────────────────────────────────────────────────────────────────────
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = "2025-06-01"; // ← Update this when content changes

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const itcBreadcrumbNode = {
  "@type": "BreadcrumbList",
  "@id":   `${PAGE_CANONICAL}#breadcrumb`,
  "itemListElement": [
    {
      "@type":    "ListItem",
      "position": 1,
      "name":     "Home",
      "item": { "@type": "Thing", "@id": `${BASE_SAFE}/` },
    },
    {
      "@type":    "ListItem",
      "position": 2,
      "name":     "Services",
      "item": { "@type": "Thing", "@id": `${BASE_SAFE}/services` },
    },
    {
      "@type":    "ListItem",
      "position": 3,
      "name":     "IT Consulting",
      "item": { "@type": "Thing", "@id": PAGE_CANONICAL },
    },
  ],
};

const itcServiceNode = {
  "@type":       "Service",
  "@id":         `${PAGE_CANONICAL}#service`,
  "name":        "IT Consulting Services",
  "description": "End-to-end IT consulting including infrastructure planning, cloud migration, cybersecurity, IoT integration, software consulting, and IT project management.",
  "url":         PAGE_CANONICAL,
  "image":       `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
  "serviceType": "IT Consulting",
  "provider":    { "@id": `${BASE_SAFE}/#organization` },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Australia" },
  ],
  "offers": {
    "@type":        "Offer",
    "availability": "https://schema.org/InStock",
    "url":          `${BASE_SAFE}/contact`,
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name":  "IT Consulting Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Installation & System Migration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Infrastructure Planning & Optimization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cybersecurity & Risk Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Migration & Digital Transformation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Project Management & Support" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software & Application Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IoT & Smart Device Integration" } },
    ],
  },
};

const itcFaqNode = {
  "@type": "FAQPage",
  "@id":   `${PAGE_CANONICAL}#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name":  "What IT consulting services does 99 Visual Solutions provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          `We offer IT infrastructure planning and optimisation, cloud migration and digital transformation (AWS, Azure, GCP), cybersecurity and risk management, software and application consulting, IoT and smart device integration, IT project management, and installation and system migration services. Contact us at ${CONTACT_EMAIL} for a free IT consulting consultation tailored to your organisation's needs.`,
      },
    },
    {
      "@type": "Question",
      "name":  "Which cloud platforms do you support for migration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "We support migrations to and on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), including hybrid and multi-cloud strategies. Our cloud migration team handles everything from initial assessment and architecture planning to data migration, application refactoring, and post-migration support and optimisation to ensure a smooth, disruption-free transition.",
      },
    },
    {
      "@type": "Question",
      "name":  "Do you provide ongoing IT support after the project is complete?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Yes. Our consultants provide continuous guidance, monitoring, and support to ensure your IT ecosystem evolves alongside your business needs. Post-project support includes system health monitoring, performance optimisation, security patching, and strategic technology reviews to keep your infrastructure aligned with your long-term business objectives.",
      },
    },
    {
      "@type": "Question",
      "name":  "Can you help us with cybersecurity compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          `Absolutely. We provide risk assessments, vulnerability management, and compliance support aligned with industry standards including ISO 27001, SOC 2, and GDPR. Our cybersecurity practice includes threat monitoring, incident response planning, penetration testing, and remediation roadmaps. Email us at ${CONTACT_EMAIL} to discuss your specific compliance requirements.`,
      },
    },
  ],
  "mainEntityOfPage": { "@id": `${PAGE_CANONICAL}#webpage` },
};

const itcPageNode = {
  "@type":         "WebPage",
  "@id":           `${PAGE_CANONICAL}#webpage`,
  "url":           PAGE_CANONICAL,
  "name":          "IT Consulting Services | Cloud, Cybersecurity & IoT — 99 Visual Solutions",
  "description":   "End-to-end IT consulting: infrastructure planning, cloud migration, cybersecurity, IoT integration, software consulting, and IT project management by 99 Visual Solutions.",
  "inLanguage":    "en",
  "datePublished": DATE_PUBLISHED,
  "dateModified":  DATE_MODIFIED,
  "isPartOf":      { "@id": `${BASE_SAFE}/#website` },
  "about":         { "@id": `${BASE_SAFE}/#organization` },
  "publisher":     { "@id": `${BASE_SAFE}/#organization` },
  "primaryImageOfPage": {
    "@type":   "ImageObject",
    "url":     `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
    "width":   1200,
    "height":  630,
    "caption": "IT Consulting Services by 99 Visual Solutions",
  },
  "speakable": {
    "@type":       "SpeakableSpecification",
    "cssSelector": [".itc-hero__h1", ".itc-hero__sub"],
  },
  "breadcrumb":      { "@id": `${PAGE_CANONICAL}#breadcrumb` },
  "potentialAction": {
    "@type":  "ReadAction",
    "target": [PAGE_CANONICAL],
  },
};

const itcGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  itcPageNode,
  itcBreadcrumbNode,
  itcServiceNode,
  itcFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaCogs />,           title: "Tailored IT Strategies",       description: "We align IT strategies with your business goals, ensuring technology drives growth, efficiency, and innovation across every department and process." },
  { icon: <FaShieldAlt />,      title: "Robust Cybersecurity",         description: "Protect your business from threats with proactive monitoring, security audits, penetration testing, and compliance-driven solutions tailored to your industry." },
  { icon: <FaNetworkWired />,   title: "Infrastructure Modernisation", description: "Upgrade outdated systems with scalable, future-ready IT infrastructure designed for seamless performance, high availability, and cost efficiency." },
  { icon: <FaCloud />,          title: "Cloud Enablement",             description: "We help you migrate to the cloud securely and efficiently on AWS, Azure, or GCP — optimising costs, improving scalability, and enabling digital transformation." },
  { icon: <FaProjectDiagram />, title: "Expert IT Project Management", description: "From planning to execution, we ensure IT projects are delivered on time, within scope, and aligned with ROI goals through structured agile delivery." },
  { icon: <FaHandsHelping />,   title: "Ongoing IT Support",           description: "Our consultants provide continuous guidance and post-project support, ensuring your IT ecosystem evolves with your changing business needs over time." },
];

const services = [
  {
    id: "installation-migration",
    title: "Installation & System Migration Services",
    image: "/images/Installation-services.png",
    imageAlt: "Installation & System Migration Services illustration",
    description: "Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure.",
    highlight: "From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity, data integrity, and system performance throughout the transition.",
    bullets: ["Installation of servers, routers, systems & peripherals", "Data migration & system upgrades with minimal downtime", "Seamless integration with existing infrastructure and workflows"],
    imageLeft: true,
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure Planning & Optimisation",
    image: "/images/it-infrastructure.png",
    imageAlt: "IT Infrastructure Planning & Optimisation illustration",
    description: "A strong digital foundation is critical for business growth and operational efficiency. We design and optimise IT infrastructures that are reliable, scalable, and aligned with your business goals, from network architecture to cloud environments.",
    highlight: "From network architecture to hybrid cloud environments, we ensure your systems are built for performance, security, and future expansion — enabling your business to scale with confidence.",
    bullets: ["Infrastructure design, assessment & capacity planning", "Cloud strategy, migration & resource optimisation", "Cost optimisation, system upgrades & performance tuning"],
    imageLeft: false,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Risk Management",
    image: "/images/cybersecurity.png",
    imageAlt: "Cybersecurity & Risk Management illustration",
    description: "In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and operational continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems.",
    highlight: "By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets industry compliance standards and protects against modern threats.",
    bullets: ["Risk assessment, vulnerability management & compliance support", "Threat monitoring, incident response & security audits", "Endpoint, network & application security implementation"],
    imageLeft: true,
  },
  {
    id: "cloud-transformation",
    title: "Cloud Migration & Digital Transformation",
    image: "/images/cloud-migration.png",
    imageAlt: "Cloud Migration & Digital Transformation illustration",
    description: "Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and operational performance.",
    highlight: "Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape while reducing infrastructure costs.",
    bullets: ["Cloud strategy, migration & modernisation (AWS, Azure, GCP)", "Legacy system transformation & process automation", "Scalable, secure & cost-efficient cloud architecture design"],
    imageLeft: false,
  },
  {
    id: "project-management",
    title: "IT Project Management & Support",
    image: "/images/it-project.png",
    imageAlt: "IT Project Management & Support illustration",
    description: "Successful digital initiatives require more than just great ideas — they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management to ensure your projects are delivered on time, within budget, and aligned with your business goals.",
    highlight: "From planning and resource allocation to deployment and post-launch support, we manage every phase with precision — using agile methodologies, transparent reporting, and dedicated project ownership.",
    bullets: ["Agile project planning, execution & delivery management", "Resource management, risk mitigation & quality assurance", "Ongoing technical support, maintenance & performance monitoring"],
    imageLeft: true,
  },
  {
    id: "software-consulting",
    title: "Software & Application Consulting",
    image: "/images/software-application.png",
    imageAlt: "Software & Application Consulting illustration",
    description: "Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities — providing strategic guidance on the right technologies and development approaches.",
    highlight: "Whether you're building from scratch, upgrading existing systems, or optimising performance, our consulting ensures your applications are efficient, secure, future-ready, and aligned with your business strategy.",
    bullets: ["Technology selection & solution architecture planning", "Application audit, optimisation & modernisation strategy", "Scalable, secure & performance-driven development guidance"],
    imageLeft: false,
  },
  {
    id: "iot",
    title: "IoT & Smart Device Integration",
    image: "/images/iot-smart-devices.png",
    imageAlt: "IoT & Smart Device Integration illustration",
    description: "Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven operational environments for businesses of all sizes.",
    highlight: "From sensors and automation systems to advanced analytics dashboards, our solutions help you monitor, control, and optimise operations in real time — reducing costs and improving decision-making across your organisation.",
    bullets: ["IoT device connectivity & architecture design", "Smart automation & sensor integration", "Real-time data monitoring, analytics & reporting dashboards"],
    imageLeft: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO STAT CARD — page-specific inline SVG, in the spirit of the web-dev
// page's PerformanceGauge but built around this page's own subject matter:
// infrastructure health / uptime, not Core Web Vitals. Pure SVG, no external
// image asset, draws in on load, respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────
function InfrastructureGauge() {
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const arcFraction = 270 / 360;
  const arcLength = circumference * arcFraction;
  const scoreFraction = 0.999; // 99.9% uptime

  return (
    <div className="itc-gaugecard" role="img" aria-label="Illustrative infrastructure uptime score of 99.9 percent">
      <div className="itc-gaugecard__top">
        <span className="itc-gaugecard__badge">Infrastructure Monitor</span>
      </div>
      <svg className="itc-gaugecard__svg" viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(110,100) rotate(135)">
          <circle
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="14"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            className="itc-gaugecard__arc"
            r={r}
            fill="none"
            stroke="#f97316"
            strokeWidth="14"
            strokeDasharray={`${arcLength * scoreFraction} ${circumference}`}
            strokeLinecap="round"
          />
        </g>
        <text x="110" y="96" textAnchor="middle" className="itc-gaugecard__num">99.9%</text>
        <text x="110" y="122" textAnchor="middle" className="itc-gaugecard__lbl">Uptime</text>
      </svg>
      <div className="itc-gaugecard__vitals">
        <span><b>Threats blocked</b> 24/7 <i>✓</i></span>
        <span><b>Patch cycle</b> Weekly <i>✓</i></span>
        <span><b>Monitoring</b> Real-time <i>✓</i></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ITConsulting() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .itc-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        /* ══ HERO — website-development-style system: dark scrim band
           behind the fixed/transparent header, two-column layout (copy +
           inline SVG stat card), feature-badge row, dual CTA. Kept on this
           page's own dark base + orange accent (rather than web-dev's light
           theme + blue) so it still reads as part of THIS page and hands
           off cleanly into the dark sections immediately below it. ══ */
        .itc-hero{
          position:relative;padding:9.5rem 1.5rem 6rem;overflow:hidden;
          background:
            linear-gradient(180deg, #050505 0px, #050505 64px, rgba(5,5,5,.9) 110px, rgba(5,5,5,.55) 220px, #080808 100%),
            radial-gradient(1100px 480px at 88% -10%, rgba(249,115,22,.10), transparent 60%),
            #080808;
        }
        @supports (padding-top: env(safe-area-inset-top)) {
          .itc-hero { padding-top: calc(9.5rem + env(safe-area-inset-top)); }
        }
        @media(max-width:960px){
          .itc-hero{padding:8rem 1.25rem 4.5rem;
            background:
              linear-gradient(180deg, #050505 0px, #050505 56px, rgba(5,5,5,.9) 92px, rgba(5,5,5,.55) 190px, #080808 100%),
              radial-gradient(1100px 480px at 88% -10%, rgba(249,115,22,.10), transparent 60%),
              #080808;}
        }
        @media(max-width:640px){ .itc-hero{padding:7.5rem 1rem 4rem;} }

        .itc-hero__grain{position:absolute;inset:0;opacity:.02;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}

        .itc-hero__inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:3.5rem;align-items:center;}
        @media(max-width:960px){.itc-hero__inner{grid-template-columns:1fr;gap:2.5rem;}}

        .itc-hero__content{animation:itcFadeUp .8s cubic-bezier(.22,1,.36,1) both;}
        @keyframes itcFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.itc-hero__content{text-align:center;}}

        .itc-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:#f97316;border:1px solid rgba(249,115,22,.26);background:rgba(249,115,22,.07);padding:6px 14px;border-radius:100px;margin-bottom:1.6rem;}
        .itc-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:itcPulse 2s ease-in-out infinite;}
        @keyframes itcPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}

        .itc-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.3rem);font-weight:700;line-height:1.14;letter-spacing:-.015em;color:#fff;margin:0 0 1.1rem;}
        .itc-hero__h1 em{font-style:normal;color:#f97316;}

        .itc-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.94rem,1.2vw,1.02rem);font-weight:300;line-height:1.75;color:rgba(255,255,255,0.62);max-width:520px;margin:0 0 2rem;}
        @media(max-width:960px){.itc-hero__sub{margin:0 auto 2rem;}}

        .itc-hero__actions{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:2rem;}
        @media(max-width:960px){.itc-hero__actions{justify-content:center;}}
        .itc-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;letter-spacing:.02em;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:13px 28px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.32);transition:transform .2s ease,box-shadow .2s ease;}
        .itc-hero__cta:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 14px 40px rgba(249,115,22,.46);}
        .itc-hero__cta--ghost{color:#fff;background:transparent;border:1px solid rgba(255,255,255,.16);box-shadow:none;}
        .itc-hero__cta--ghost:hover{border-color:#f97316;color:#f97316;transform:translateY(-2px) scale(1.02);box-shadow:none;}

        .itc-hero__badges{display:flex;flex-wrap:wrap;gap:1.5rem;}
        @media(max-width:960px){.itc-hero__badges{justify-content:center;}}
        .itc-hero__badge{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:rgba(255,255,255,.5);}
        .itc-hero__badge svg{color:#f97316;flex-shrink:0;}

        /* Stat card — mirrors web-dev's gauge-card structure/proportions,
           re-skinned in dark glass to match this page's palette. */
        .itc-gaugecard{background:rgba(20,20,20,.72);border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:1.75rem 1.75rem 1.5rem;backdrop-filter:blur(14px);box-shadow:0 24px 60px -20px rgba(0,0,0,.5);animation:itcFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;}
        .itc-gaugecard__top{display:flex;justify-content:center;margin-bottom:.5rem;}
        .itc-gaugecard__badge{font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:5px 12px;border-radius:8px;}
        .itc-gaugecard__svg{width:100%;height:auto;display:block;}
        .itc-gaugecard__arc{stroke-dasharray:0 999;animation:itcArcDraw 1.4s ease-out .3s forwards;}
        @keyframes itcArcDraw{from{stroke-dasharray:0 999;}to{stroke-dasharray:216 999;}}
        .itc-gaugecard__num{font-family:'Space Grotesk',sans-serif;font-size:2.15rem;font-weight:700;fill:#fff;}
        .itc-gaugecard__lbl{font-family:'IBM Plex Mono',monospace;font-size:.78rem;fill:rgba(255,255,255,.5);}
        .itc-gaugecard__vitals{display:flex;justify-content:space-between;gap:.5rem;padding-top:.5rem;border-top:1px solid rgba(255,255,255,.09);flex-wrap:wrap;}
        .itc-gaugecard__vitals span{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:rgba(255,255,255,.5);}
        .itc-gaugecard__vitals b{color:#fff;font-weight:500;}
        .itc-gaugecard__vitals i{font-style:normal;color:#f97316;}

        .itc-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .itc-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .itc-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .itc-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .itc-intro__h2 em{font-style:italic;color:#f97316;}
        .itc-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .itc-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .itc-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}

        .itc-services{background:#080808;}
        .itc-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .itc-svc:nth-child(odd){background:#0f0f0f;}
        .itc-svc:nth-child(even){background:#080808;}
        .itc-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .itc-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){.itc-svc__inner--img-left,.itc-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}.itc-svc__img-wrap{order:2!important;}.itc-svc__body{order:1!important;}}
        .itc-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .itc-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .itc-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .itc-svc__img-wrap:hover img{transform:scale(1.03);}
        .itc-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .itc-svc__body{position:relative;}
        .itc-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .itc-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .itc-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .itc-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .itc-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .itc-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .itc-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .itc-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}

        .itc-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .itc-benefits__inner{max-width:1200px;margin:0 auto;}
        .itc-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .itc-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .itc-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .itc-benefits__h2 em{font-style:italic;color:#f97316;}
        .itc-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .itc-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .itc-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.itc-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.itc-benefits__grid{grid-template-columns:1fr;}}
        .itc-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .itc-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .itc-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .itc-benefit-card:hover::before{opacity:1;}
        .itc-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .itc-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .itc-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}

        .itc-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .itc-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .itc-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .itc-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .itc-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .itc-cta__h2 em{font-style:italic;color:#f97316;}
        .itc-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .itc-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .itc-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .itc-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        @media(prefers-reduced-motion:reduce){
          *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
          .itc-gaugecard__arc{stroke-dasharray:216 999!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-itc-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itcGraph) }}
      />

      {/* ══ HERO — website-development hero system, IT-consulting-skinned ══ */}
      <section className="itc-hero" aria-labelledby="itc-hero-heading">
        <div aria-hidden="true">
          <div className="itc-hero__grain" />
        </div>

        <nav className="itc-sr-only" aria-label="Breadcrumb">
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
              <a href="/services/it-consulting" itemProp="item" aria-current="page">
                <span itemProp="name">IT Consulting</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="itc-hero__inner">
          <div className="itc-hero__content">
            <div className="itc-hero__eyebrow" aria-hidden="true">
              <span className="itc-hero__dot" />
              Services · IT Consulting
            </div>
            <h1 className="itc-hero__h1" id="itc-hero-heading">
              Strategic technology<br />that drives <em>growth</em>
            </h1>
            <p className="itc-hero__sub">
              From cloud migration and cybersecurity to infrastructure planning,
              IoT integration, and IT project management — we deliver end-to-end
              consulting that prepares your business for the digital future.
            </p>

            <div className="itc-hero__actions">
              <Link href="/contact" className="itc-hero__cta" aria-label="Get a free IT consulting consultation from 99 Visual Solutions">
                Get a Free Consultation
              </Link>
              <a href="#services" className="itc-hero__cta itc-hero__cta--ghost" aria-label="Explore IT consulting services from 99 Visual Solutions">
                Explore Services
              </a>
            </div>

            <div className="itc-hero__badges" aria-hidden="true">
              <span className="itc-hero__badge"><FaShieldAlt /> Compliance-ready security</span>
              <span className="itc-hero__badge"><FaServer /> 24/7 infrastructure monitoring</span>
              <span className="itc-hero__badge"><FaClock /> No-cost first consultation</span>
            </div>
          </div>
          <InfrastructureGauge />
        </div>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
      <section className="itc-intro" aria-labelledby="itc-intro-heading">
        <div className="itc-intro__inner">
          <span className="itc-intro__label">Our Philosophy</span>
          <h2 className="itc-intro__h2" id="itc-intro-heading">
            Strategic IT consulting for smarter,<br />secure &amp; <em>scalable</em> businesses
          </h2>
          <div className="itc-intro__rule" aria-hidden="true" />
          <p className="itc-intro__p">
            At <strong>99 Visual Solutions</strong>, we don't just solve IT challenges — we help you harness
            technology as a powerful growth driver. Our <strong>IT consulting services</strong> deliver
            strategic guidance, robust security, and scalable infrastructure designed to prepare your business
            for the digital future with confidence.
          </p>
          <p className="itc-intro__p">
            Whether you're modernising legacy systems, migrating to the cloud, or strengthening cybersecurity,
            our experts partner with you to deliver{" "}
            <strong>sustainable, cost-effective, and future-ready IT solutions</strong> tailored precisely to
            your business goals and industry requirements.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS — unchanged ═════════════════════════════════ */}
      <div id="services" className="itc-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="itc-svc" aria-labelledby={`itc-svc-heading-${svc.id}`}>
            <div className={`itc-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="itc-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  width={600}
                  height={460}
                  style={{ width:"100%", height:"auto" }}
                />
              </div>
              <div className="itc-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="itc-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="itc-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="itc-svc__heading" id={`itc-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="itc-svc__rule" aria-hidden="true" />
                <p className="itc-svc__p">{svc.description}</p>
                <p className="itc-svc__highlight">{svc.highlight}</p>
                <ul className="itc-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS — unchanged ═════════════════════════════════════════ */}
      <section className="itc-benefits" aria-labelledby="itc-benefits-heading">
        <div className="itc-benefits__inner">
          <div className="itc-benefits__head">
            <span className="itc-benefits__label">Why Choose Us?</span>
            <h2 className="itc-benefits__h2" id="itc-benefits-heading">
              Partnering with<br /><em>99 Visual</em> IT Consulting
            </h2>
            <div className="itc-benefits__rule" aria-hidden="true" />
            <p className="itc-benefits__sub">
              IT isn't just a support function — it becomes a competitive advantage. Here's how
              we empower businesses with strategic technology.
            </p>
          </div>
          <div className="itc-benefits__grid">
            {benefits.map((b, i) => (
              <div className="itc-benefit-card" key={i}>
                <div className="itc-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <div className="itc-benefit-card__title">{b.title}</div>
                <p className="itc-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP — unchanged ════════════════════════════════════════ */}
      <section className="itc-cta" aria-labelledby="itc-cta-heading">
        <div className="itc-cta__orb" aria-hidden="true" />
        <div className="itc-cta__inner">
          <span className="itc-cta__eyebrow">Start a Project</span>
          <h2 className="itc-cta__h2" id="itc-cta-heading">
            Ready to transform your <em>IT infrastructure</em>?
          </h2>
          <div className="itc-cta__rule" aria-hidden="true" />
          <p className="itc-cta__sub">
            Get in touch with our team for a free consultation. We&apos;ll help you
            map out the right IT strategy to achieve your goals and future-proof your business.
          </p>
          <Link href="/contact" className="itc-cta__btn" aria-label="Get a free IT consulting consultation from 99 Visual Solutions">
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