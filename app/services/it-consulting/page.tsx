// app/services/it-consulting/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// IT Consulting — 99 Visual Solutions
//
// VISUAL REDESIGN (this revision) — migrates this page onto the same design
// system used for /services/digital-marketing-seo, /services/website-development,
// and /services/cad-gis-photogrammetry, for site-wide consistency.
//
// THIS REVISION: hero further updated to match the full-bleed photo banner
//   treatment now used on /services/website-development, /services/visualization,
//   and /services (the hub page) — photo as CSS background with a dark
//   gradient overlay, grain texture, and corner brackets, single
//   left-aligned text column. Replaces the previous two-column hero (text +
//   inline SVG "Systems Status" gauge card). The gauge component has been
//   removed since it's no longer rendered anywhere on the page. The
//   standalone "ops log" ticker band that used to sit in its own strip below
//   the hero now docks to the bottom edge of the hero itself, same mechanism
//   as the ticker on the website-development page.
//   Save your banner image to:
//   /public/images/services/it-consulting-hero-banner.jpg
//
// Unchanged: metadata, all schema nodes (org/local business/website/page/
// breadcrumb/service/FAQ), PAGE_CANONICAL handling, DATE_MODIFIED hardcoding,
// `benefits` and `services` copy (title/description/highlight/bullets),
// canonical/robots/OG/Twitter tags, H1/H2 hierarchy and text. The FAQ schema
// (itcFaqNode) was JSON-LD-only in the previous revision with no visible
// on-page section — that's preserved as-is, no new section added.
//
// What changed is purely presentational:
//   - Dropped the dark near-black + orange system (shared with 3 other
//     service pages) for the light "analytics" system: cool paper
//     background, ink text, one blue signal accent, green reserved for
//     "healthy/pass" status indicators.
//   - Replaced the inline SVG "systems status" card hero with a full-bleed
//     photo banner hero (matching website-development), with badges
//     reflecting the same network/security/cloud themes the card used to
//     show.
//   - Ops log ticker band (illustrative) now docked to the bottom edge of
//     the hero, this page's IT-ops counterpart to the ticker on the
//     website-development page — same mechanism, page-specific content.
//   - The 7 alternating image/text service rows (each with a decorative
//     01/02/03 stroke numeral implying a sequence that isn't real) became
//     three labeled clusters in a bento card grid, using an icon per
//     service instead of a matching illustration — same full copy per
//     service, much shorter page.
//   - Added a sticky mobile CTA bar, matching website-development.
//   - Header component is unmodified.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";


import type { Metadata } from "next";
import {
  FaCogs, FaShieldAlt, FaProjectDiagram,
  FaNetworkWired, FaHandsHelping, FaCloud,
  FaLaptopCode, FaMicrochip,
} from "react-icons/fa";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";

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
// PAGE DATA — `benefits` and `services` copy unchanged word-for-word.
// image/imageAlt/imageLeft fields dropped; an `icon` field added per
// service instead, since the redesign uses an icon-based card grid.
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
    description: "Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure.",
    highlight: "From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity, data integrity, and system performance throughout the transition.",
    bullets: ["Installation of servers, routers, systems & peripherals", "Data migration & system upgrades with minimal downtime", "Seamless integration with existing infrastructure and workflows"],
    icon: <FaCogs />,
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure Planning & Optimisation",
    description: "A strong digital foundation is critical for business growth and operational efficiency. We design and optimise IT infrastructures that are reliable, scalable, and aligned with your business goals, from network architecture to cloud environments.",
    highlight: "From network architecture to hybrid cloud environments, we ensure your systems are built for performance, security, and future expansion — enabling your business to scale with confidence.",
    bullets: ["Infrastructure design, assessment & capacity planning", "Cloud strategy, migration & resource optimisation", "Cost optimisation, system upgrades & performance tuning"],
    icon: <FaNetworkWired />,
  },
  {
    id: "cloud-transformation",
    title: "Cloud Migration & Digital Transformation",
    description: "Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and operational performance.",
    highlight: "Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape while reducing infrastructure costs.",
    bullets: ["Cloud strategy, migration & modernisation (AWS, Azure, GCP)", "Legacy system transformation & process automation", "Scalable, secure & cost-efficient cloud architecture design"],
    icon: <FaCloud />,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Risk Management",
    description: "In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and operational continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems.",
    highlight: "By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets industry compliance standards and protects against modern threats.",
    bullets: ["Risk assessment, vulnerability management & compliance support", "Threat monitoring, incident response & security audits", "Endpoint, network & application security implementation"],
    icon: <FaShieldAlt />,
  },
  {
    id: "project-management",
    title: "IT Project Management & Support",
    description: "Successful digital initiatives require more than just great ideas — they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management to ensure your projects are delivered on time, within budget, and aligned with your business goals.",
    highlight: "From planning and resource allocation to deployment and post-launch support, we manage every phase with precision — using agile methodologies, transparent reporting, and dedicated project ownership.",
    bullets: ["Agile project planning, execution & delivery management", "Resource management, risk mitigation & quality assurance", "Ongoing technical support, maintenance & performance monitoring"],
    icon: <FaProjectDiagram />,
  },
  {
    id: "software-consulting",
    title: "Software & Application Consulting",
    description: "Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities — providing strategic guidance on the right technologies and development approaches.",
    highlight: "Whether you're building from scratch, upgrading existing systems, or optimising performance, our consulting ensures your applications are efficient, secure, future-ready, and aligned with your business strategy.",
    bullets: ["Technology selection & solution architecture planning", "Application audit, optimisation & modernisation strategy", "Scalable, secure & performance-driven development guidance"],
    icon: <FaLaptopCode />,
  },
  {
    id: "iot",
    title: "IoT & Smart Device Integration",
    description: "Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven operational environments for businesses of all sizes.",
    highlight: "From sensors and automation systems to advanced analytics dashboards, our solutions help you monitor, control, and optimise operations in real time — reducing costs and improving decision-making across your organisation.",
    bullets: ["IoT device connectivity & architecture design", "Smart automation & sensor integration", "Real-time data monitoring, analytics & reporting dashboards"],
    icon: <FaMicrochip />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

// New — groups the 7 services above into three labeled clusters for the
// bento grid. Purely a presentation grouping; referenced ids/copy above
// are untouched.
const clusters = [
  {
    id: "infra-migration",
    eyebrow: "Infrastructure & Migration",
    heading: <>Build the <em>foundation</em> right, the first time</>,
    intro: "Installation, infrastructure planning, and cloud transformation — the groundwork everything else runs on.",
    cols: 3,
    ids: ["installation-migration", "it-infrastructure", "cloud-transformation"],
  },
  {
    id: "security-operations",
    eyebrow: "Security & Operations",
    heading: <>Stay protected, stay <em>on schedule</em></>,
    intro: "Cybersecurity and structured project delivery, so growth doesn't come at the cost of risk or missed timelines.",
    cols: 2,
    ids: ["cybersecurity", "project-management"],
  },
  {
    id: "software-connected",
    eyebrow: "Software & Connected Systems",
    heading: <>From applications to <em>connected devices</em></>,
    intro: "Software strategy and IoT integration for businesses building beyond a standard website or internal tool.",
    cols: 2,
    ids: ["software-consulting", "iot"],
  },
];

// Illustrative IT-ops log lines for the signature ticker band — this page's
// operations counterpart to the ticker on the website-development page.
// Now docked to the bottom edge of the hero itself, same mechanism as
// website-development's build/QA ticker.
const pipeline = [
  { cmd: "patch_deploy",   out: "42 systems updated" },
  { cmd: "vuln_scan",      out: "0 critical findings" },
  { cmd: "cloud_sync",     out: "AWS ⇄ Azure synced" },
  { cmd: "backup_verify",  out: "128 snapshots verified" },
  { cmd: "uptime_check",   out: "99.98% (30d)" },
  { cmd: "iot_heartbeat",  out: "1,204 devices online" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ITConsulting() {
  return (
    <>
      <script
        id="schema-itc-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itcGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .itc-page{
          --itc-ink:#12141A; --itc-muted:#5B6172; --itc-paper:#F5F6F8; --itc-surface:#FFFFFF;
          --itc-line:#E4E6EC; --itc-blue:#2E5CFF; --itc-green:#37D67A;
          background:var(--itc-paper);
        }
        .itc-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .itc-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--itc-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .itc-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--itc-ink);margin:0 0 1rem;text-align:center;}
        .itc-h2 em{font-style:normal;color:var(--itc-blue);}

        /* ══ HERO — full-bleed photo banner, same treatment as the
           website-development page: photo as CSS background with a dark
           gradient overlay so the text column stays legible.
           Save your banner image to:
           /public/images/services/it-consulting-hero-banner.jpg ── */
        .itc-hero{
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/it-consulting-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        /* Fixed (not min-) height, so the section can never grow taller
           than one screen and push the ticker bar below the fold. dvh/svh
           account for mobile browser chrome so the banner never shows a
           gap or clips; falls back to 100vh. */
        @supports (height: 100svh) { .itc-hero { height: 100svh; } }
        @supports (height: 100dvh) { .itc-hero { height: 100dvh; } }
        @media(max-width:960px){
          .itc-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/it-consulting-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        /* Main hero content: fills the remaining space above the ticker
           and centers vertically within it. Header clearance and the
           left/right gutters live here (not on the fixed-height section)
           so the ticker's own height is never squeezed out. */
        .itc-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:8rem 1.5rem 1.5rem;
          padding-top:max(8rem, calc(env(safe-area-inset-top) + 6rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .itc-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .itc-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .itc-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        /* Short screens (landscape phones, small laptop windows with
           browser chrome): trim vertical rhythm and drop the badge row
           so everything still fits above the ticker without scrolling. */
        @media(max-height:520px){
          .itc-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .itc-hero__eyebrow{ margin-bottom:.7rem; }
          .itc-hero__h1{ margin-bottom:.6rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .itc-hero__sub{ margin-bottom:.9rem; }
          .itc-hero__actions{ margin-bottom:0; }
          .itc-hero__badges{ display:none; }
        }

        .itc-hero__grain{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .itc-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .itc-corner--tl{top:24px;left:24px;border-top:1px solid var(--itc-blue);border-left:1px solid var(--itc-blue);}
        .itc-corner--tr{top:24px;right:24px;border-top:1px solid var(--itc-blue);border-right:1px solid var(--itc-blue);}
        .itc-corner--bl{bottom:24px;left:24px;border-bottom:1px solid var(--itc-blue);border-left:1px solid var(--itc-blue);}
        .itc-corner--br{bottom:24px;right:24px;border-bottom:1px solid var(--itc-blue);border-right:1px solid var(--itc-blue);}

        .itc-hero__content{animation:itcFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;max-width:640px;}
        @keyframes itcFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.itc-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .itc-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--itc-blue);border:1px solid rgba(46,92,255,.28);background:rgba(46,92,255,.08);padding:6px 16px;border-radius:100px;margin-bottom:1.6rem;backdrop-filter:blur(8px);}
        .itc-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--itc-blue);animation:itcPulse 2s ease-in-out infinite;}
        @keyframes itcPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .itc-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.4rem);font-weight:700;line-height:1.12;letter-spacing:-.015em;color:#fff;margin:0 0 1.1rem;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .itc-hero__h1 em{font-style:normal;color:var(--itc-blue);}
        .itc-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.98rem,1.3vw,1.08rem);font-weight:300;line-height:1.7;color:rgba(255,255,255,0.78);max-width:520px;margin:0 0 2rem;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.itc-hero__sub{margin:0 auto 2rem;}}

        .itc-hero__actions{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:2rem;}
        @media(max-width:960px){.itc-hero__actions{justify-content:center;}}
        .itc-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--itc-blue));padding:13px 28px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .itc-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .itc-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);}
        .itc-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .itc-hero__badges{display:flex;flex-wrap:wrap;gap:1.5rem;}
        @media(max-width:960px){.itc-hero__badges{justify-content:center;}}
        .itc-hero__badge{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:rgba(255,255,255,0.65);}
        .itc-hero__badge svg{color:var(--itc-blue);flex-shrink:0;}

        /* ══ TICKER — docked as a normal flex child at the bottom of the
           fixed-height hero (not position:absolute), so it can never end
           up below the fold regardless of how tall the content above it
           is — it always renders inside the first screen. ═══════════════ */
        .itc-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .itc-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .itc-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:itcScroll 34s linear infinite;}
        .itc-hero__ticker-bar:hover .itc-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .itc-ticker__track{ animation-duration:22s; } }
        @keyframes itcScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .itc-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .itc-ticker__item b{color:rgba(255,255,255,.45);}
        .itc-ticker__pass{color:var(--itc-green);}
        .itc-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:clamp(.6rem,1.5vw,.66rem);color:rgba(255,255,255,.4);margin:0;padding:.3rem 1rem 0;}
        @media(max-height:520px){
          .itc-hero__ticker-bar{ padding-top:.75rem; }
          .itc-ticker__caption{ display:none; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .itc-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--itc-line);}
        @media(max-width:760px){.itc-sticky-cta{display:flex;justify-content:center;}}
        .itc-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--itc-ink);padding:13px 20px;border-radius:10px;text-decoration:none;}

        /* ══ INTRO — unchanged copy ═══════════════════════════════════════ */
        .itc-intro{background:var(--itc-surface);border-bottom:1px solid var(--itc-line);padding:5.5rem 1.5rem;}
        .itc-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .itc-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--itc-muted);max-width:700px;margin:0 auto .9rem;}
        .itc-intro__p strong{color:var(--itc-ink);font-weight:500;}

        /* ══ SERVICE CLUSTERS (replaces 7 alternating rows) ══════════════ */
        .itc-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--itc-line);}
        .itc-cluster:nth-child(even){background:var(--itc-surface);}
        .itc-cluster__inner{max-width:1180px;margin:0 auto;}
        .itc-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .itc-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--itc-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .itc-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--itc-ink);margin:0 0 .6rem;}
        .itc-cluster__h2 em{font-style:normal;color:var(--itc-blue);}
        .itc-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--itc-muted);margin:0;}
        .itc-cluster__grid{display:grid;gap:1.25rem;}
        .itc-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        .itc-cluster__grid--3{grid-template-columns:repeat(3,1fr);}
        @media(max-width:860px){.itc-cluster__grid--2,.itc-cluster__grid--3{grid-template-columns:1fr;}}

        .itc-card{background:var(--itc-surface);border:1px solid var(--itc-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .itc-cluster:nth-child(even) .itc-card{background:var(--itc-paper);}
        .itc-card:hover{border-color:var(--itc-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .itc-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--itc-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .itc-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--itc-ink);margin:0 0 .7rem;}
        .itc-card__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--itc-muted);margin:0 0 .8rem;}
        .itc-card__highlight{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:400;line-height:1.7;color:var(--itc-ink);border-left:2px solid var(--itc-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .itc-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .itc-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;color:var(--itc-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .itc-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--itc-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */
        .itc-benefits{background:var(--itc-paper);padding:5.5rem 1.5rem;}
        .itc-benefits__inner{max-width:1200px;margin:0 auto;}
        .itc-benefits__head{max-width:560px;margin:0 auto 3rem;text-align:center;}
        .itc-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--itc-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .itc-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--itc-ink);margin:0 0 .8rem;}
        .itc-benefits__h2 em{font-style:normal;color:var(--itc-blue);}
        .itc-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--itc-muted);max-width:520px;margin:0 auto;}
        .itc-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.itc-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.itc-benefits__grid{grid-template-columns:1fr;}}
        .itc-benefit-card{background:var(--itc-surface);border:1px solid var(--itc-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .itc-benefit-card:hover{border-color:var(--itc-blue);transform:translateY(-3px);}
        .itc-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--itc-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .itc-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--itc-ink);margin-bottom:.5rem;}
        .itc-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--itc-muted);}

        /* ══ CTA ═══════════════════════════════════════════════════════════ */
        .itc-cta{background:var(--itc-surface);border-top:1px solid var(--itc-line);padding:5.5rem 1.5rem;text-align:center;}
        .itc-cta__inner{max-width:560px;margin:0 auto;}
        .itc-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--itc-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .itc-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--itc-ink);margin:0 0 1rem;}
        .itc-cta__h2 em{font-style:normal;color:var(--itc-blue);}
        .itc-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--itc-muted);margin-bottom:2.2rem;}
        .itc-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--itc-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .itc-cta__btn:hover{background:var(--itc-blue);transform:translateY(-2px);}

        @media(prefers-reduced-motion:reduce){
          .itc-page *,.itc-page *::before,.itc-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <div className="itc-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════
            Full-bleed photo banner (set as the section's CSS background —
            see .itc-hero in <style> above), same treatment as the
            website-development page, replacing the previous two-column
            layout with the inline SVG "Systems Status" gauge card. A dark
            gradient overlay keeps the white/blue text legible over the photo. */}
        <section className="itc-hero" aria-labelledby="itc-hero-heading">
          <div aria-hidden="true">
            <div className="itc-hero__grain" />
          </div>
          <div className="itc-corner itc-corner--tl" aria-hidden="true" />
          <div className="itc-corner itc-corner--tr" aria-hidden="true" />
          <div className="itc-corner itc-corner--bl" aria-hidden="true" />
          <div className="itc-corner itc-corner--br" aria-hidden="true" />

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
              <div className="itc-hero__eyebrow">
                <span className="itc-hero__dot" />
                Services · IT Consulting
              </div>
              <h1 className="itc-hero__h1" id="itc-hero-heading">
                Technology strategy measured<br />in <em>uptime</em>, not slides
              </h1>
              <p className="itc-hero__sub">
                Cloud migration, cybersecurity, infrastructure planning, IoT
                integration, and IT project management — end-to-end consulting
                that prepares your business for the digital future.
              </p>

              <div className="itc-hero__actions">
                <Link href="/contact" className="itc-hero__cta" aria-label="Get a free IT consulting quote from 99 Visual Solutions">
                  Get a Free Quote
                </Link>
                <a href="#services" className="itc-hero__cta itc-hero__cta--ghost" aria-label="Explore IT consulting services from 99 Visual Solutions">
                  Explore Services
                </a>
              </div>

              <div className="itc-hero__badges" aria-hidden="true">
                <span className="itc-hero__badge"><FaNetworkWired /> Network monitored, always on</span>
                <span className="itc-hero__badge"><FaShieldAlt /> Security-first infrastructure</span>
                <span className="itc-hero__badge"><FaCloud /> Multi-cloud, AWS · Azure · GCP</span>
              </div>
            </div>
          </div>

          {/*
            Ticker docks to the bottom edge of the hero itself (not a
            separate section below it), so the scrolling ops-log line and
            the photo banner render together as a single full-screen unit
            on every screen size. A soft gradient behind it keeps the text
            legible over the photo without a hard color break.
          */}
          <div className="itc-hero__ticker-bar" aria-hidden="true">
            <div className="itc-ticker">
              <div className="itc-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="itc-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="itc-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
            <p className="itc-ticker__caption">Illustrative systems &amp; ops log output</p>
          </div>
        </section>

        {/* ══ INTRO — unchanged copy ═══════════════════════════════════════ */}
        <section className="itc-intro" aria-labelledby="itc-intro-heading">
          <div className="itc-intro__inner">
            <span className="itc-label">Our Philosophy</span>
            <h2 className="itc-h2" id="itc-intro-heading">
              Strategic IT consulting for smarter,<br />secure &amp; <em>scalable</em> businesses
            </h2>
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

        {/* ══ SERVICE CLUSTERS — 100% unchanged copy, grouped & iconified ═══ */}
        <div id="services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="itc-cluster" aria-labelledby={`itc-cluster-h-${cluster.id}`}>
              <div className="itc-cluster__inner">
                <div className="itc-cluster__head">
                  <span className="itc-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="itc-cluster__h2" id={`itc-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="itc-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`itc-cluster__grid itc-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="itc-card" id={svc.id} key={svc.id} aria-labelledby={`itc-svc-heading-${svc.id}`}>
                        <div className="itc-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="itc-card__title" id={`itc-svc-heading-${svc.id}`}>{svc.title}</h3>
                        <p className="itc-card__desc">{svc.description}</p>
                        <p className="itc-card__highlight">{svc.highlight}</p>
                        <ul className="itc-card__bullets">
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
        <section className="itc-benefits" aria-labelledby="itc-benefits-heading">
          <div className="itc-benefits__inner">
            <div className="itc-benefits__head">
              <span className="itc-benefits__label">Why Choose Us?</span>
              <h2 className="itc-benefits__h2" id="itc-benefits-heading">
                Partnering with <em>99 Visual</em> IT Consulting
              </h2>
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

        {/* ══ CTA STRIP ═════════════════════════════════════════════════════ */}
        <section className="itc-cta" aria-labelledby="itc-cta-heading">
          <div className="itc-cta__inner">
            <span className="itc-cta__eyebrow">Start a Project</span>
            <h2 className="itc-cta__h2" id="itc-cta-heading">
              Ready to transform your <em>IT infrastructure</em>?
            </h2>
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

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="itc-sticky-cta">
          <Link href="/contact" className="itc-sticky-cta__btn">Get a Free Quote</Link>
        </div>
      </div>

      <Footer />
      <ScrollDown />
     
    </>
  );
}
