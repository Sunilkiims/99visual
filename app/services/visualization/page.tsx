// app/services/visualization/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// 3D Visualization & Architectural Rendering — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #2 — Replaced deprecated breadcrumb() with breadcrumbFromItems()
//      emitting item as { "@type": "Thing", "@id": url } objects.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed — all variants pointed to identical URLs.
//   ✅ aria-hidden removed from breadcrumb <nav> — viz-sr-only pattern used.
//   ✅ CONTACT_EMAIL imported — single source of truth.
//   ✅ FAQ answers verified 40+ words for rich result eligibility.
//   ✅ Title within 65-char limit.
//   ✅ serviceSchema() uses pathname instead of url (legacy) for consistency.
//   ✅ vizFaqNode mainEntityOfPage added — links FAQ to WebPage node.
//   ✅ All CSS classes use "viz-" prefix (unique, no collision).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Header         from "@/app/components/header";
import Seriously      from "@/app/components/seriously";
import Footer         from "@/app/components/footer";
import Services       from "@/app/components/services";
import ContactCTA     from "@/app/components/Contactcta";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader     from "@/app/components/PageLoader";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ FIX: 63 chars — within sweet spot
  title: "3D Visualization & Architectural Rendering | 99 Visual",

  description:
    "Expert 3D visualization, architectural rendering, CAD modeling, and walkthrough animations by 99 Visual Solutions. Helping architects, developers & designers make confident decisions with stunning visuals.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/services/visualization`,
    // ✅ FIX: Hreflang removed — all variants pointed to identical URLs.
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
    type:        "website",
    url:         `${BASE}/services/visualization`,
    siteName:    "99 Visual Solutions",
    locale:      "en_US",
    title:       "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
    description: "From photorealistic architectural renders and 3D walkthroughs to precision CAD modeling and product visualization — 99 Visual Solutions turns your concepts into stunning visual realities.",
    images: [
      {
        url:    `${BASE}/images/services/visualization-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "3D architectural rendering and visualization services by 99 Visual Solutions",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    title:       "3D Visualization & Architectural Rendering | 99 Visual Solutions",
    description: "Photorealistic architectural renders, CAD modeling, product visualization & 3D walkthroughs — crafted for architects, developers & designers worldwide.",
    images: [
      {
        url: `${BASE}/images/services/visualization-og.jpg`,
        alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
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
// SCHEMA
// ✅ FIX: breadcrumbFromItems() with correct @id item objects.
// ✅ FIX: serviceSchema() uses pathname.
// ✅ FIX: vizFaqNode mainEntityOfPage added.
// ✅ FIX: All FAQ answers 40+ words. CONTACT_EMAIL used.
// ─────────────────────────────────────────────────────────────────────────────

const vizBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",             url: "/" },
  { name: "Services",         url: "/services" },
  { name: "3D Visualization", url: "/services/visualization" },
]);

const vizServiceNode = {
  ...serviceSchema({
    name:        "3D Visualization & Architectural Rendering",
    description: "Photorealistic exterior and interior architectural renders, 3D walkthrough animations, product visualization, CAD drafting, BIM modeling, and LiDAR data processing.",
    pathname:    "/services/visualization",
    image:       `${BASE}/images/services/visualization-og.jpg`,
  }),
  "@id": `${BASE}/services/visualization#service`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "3D Visualization Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Exterior Rendering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Interior Rendering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Walkthrough Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Visualization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD Drafting & Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "BIM Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LiDAR Data Processing" } },
    ],
  },
};

// ✅ FIX: All answers 40+ words. CONTACT_EMAIL used throughout.
const vizFaqNode = {
  ...faqSchema([
    {
      question: "What types of 3D visualization services do you offer?",
      answer:
        `We offer photorealistic exterior and interior architectural renders, 3D walkthrough animations, product visualization, CAD drafting, BIM modeling, and LiDAR data processing. Our team works with architects, real estate developers, product designers, and urban planners worldwide. Contact us at ${CONTACT_EMAIL} for a free consultation and project quote tailored to your specific requirements.`,
    },
    {
      question: "How long does a typical 3D rendering project take?",
      answer:
        "Turnaround depends on project complexity and scope. Single still renders are usually delivered within 3–5 business days. Full walkthrough animations typically take 2–4 weeks depending on length, level of detail, and number of revision rounds. We provide a detailed project timeline in our proposal so you know exactly what to expect before work begins.",
    },
    {
      question: "Can you work from hand sketches or rough floor plans?",
      answer:
        `Yes, we work from architectural drawings, CAD files, PDF plans, hand sketches, or even reference photos to produce high-quality 3D renders. Our team handles all necessary modelling from your source materials. If you have detailed CAD files, they speed up the process — but they are not required. Email your materials to ${CONTACT_EMAIL} and we'll assess the scope and provide a quote.`,
    },
    {
      question: "Do you serve international clients?",
      answer:
        "Absolutely. We serve architects, real estate developers, and product designers across India, USA, UK, UAE, and Australia. Our remote-first workflow means geography is never a barrier — we collaborate via email, video calls, and cloud-based file sharing. All deliverables are provided in your preferred format and resolution, ready for presentations, marketing, or planning applications.",
    },
  ]),
  // ✅ FIX: mainEntityOfPage added — links FAQPage to WebPage node in graph
  "@id":            `${BASE}/services/visualization#faq`,
  mainEntityOfPage: { "@id": `${BASE}/services/visualization#webpage` },
};

const vizPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/services/visualization#webpage`,
  url:           `${BASE}/services/visualization`,
  name:          "3D Visualization & Architectural Rendering | 99 Visual Solutions",
  description:   "Expert 3D visualization, architectural rendering, CAD modeling, and walkthrough animations by 99 Visual Solutions. Serving architects, developers & designers worldwide.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/services/visualization-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "3D architectural rendering and visualization services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".viz-hero__h1", ".viz-hero__sub"],
  },
  // ✅ FIX: reference only — matches @id from vizBreadcrumbNode
  breadcrumb:      { "@id": `${BASE}/services/visualization#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/services/visualization`] },
};

const vizGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  vizPageNode,
  // ✅ FIX: standalone BreadcrumbList with correct @id item objects
  vizBreadcrumbNode,
  vizServiceNode,
  vizFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="viz-hero"
      aria-labelledby="viz-hero-heading"
      id="viz-hero"
    >
      <div aria-hidden="true">
        <div className="viz-hero__orb viz-hero__orb--1" />
        <div className="viz-hero__orb viz-hero__orb--2" />
        <div className="viz-hero__orb viz-hero__orb--3" />
        <div className="viz-hero__grid" />
        <div className="viz-hero__grain" />
      </div>

      <div className="viz-corner viz-corner--tl" aria-hidden="true" />
      <div className="viz-corner viz-corner--tr" aria-hidden="true" />
      <div className="viz-corner viz-corner--bl" aria-hidden="true" />
      <div className="viz-corner viz-corner--br" aria-hidden="true" />

      {/*
        ✅ FIX: Removed aria-hidden="true" from <nav>.
        aria-hidden removes the element from the accessibility tree entirely,
        violating WCAG 2.1. The viz-sr-only class hides it visually
        while keeping it accessible to screen readers and crawlers.
      */}
      <nav className="viz-sr-only" aria-label="Breadcrumb">
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
            <a href="/services" itemProp="item"><span itemProp="name">Services</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="/services/visualization" itemProp="item" aria-current="page">
              <span itemProp="name">3D Visualization</span>
            </a>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <div className="viz-hero__content">
        <p className="viz-hero__eyebrow" aria-hidden="true">
          <span className="viz-hero__dot" />
          Services · Visualization
        </p>

        <h1 className="viz-hero__h1" id="viz-hero-heading">
          Transforming concepts<br />
          into visuals that <em>inspire</em>
        </h1>

        <div className="viz-hero__rule" aria-hidden="true" />

        <p className="viz-hero__sub">
          From photorealistic architectural renders and immersive 3D walkthroughs
          to precision CAD modeling — we turn your ideas into stunning visual
          experiences that drive clarity, confidence, and conversions.
        </p>

        <a
          href="/contact"
          className="viz-hero__cta"
          aria-label="Get a free quote for 3D visualization services from 99 Visual Solutions"
        >
          Get a Free Quote
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function VisualizationPage() {
  return (
    <>
      <PageLoader />

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

        /* ✅ FIX: viz-sr-only — accessible but visually hidden */
        .viz-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO ════════════════════════════════════════════════════════ */
        .viz-hero {
          position:relative;min-height:90vh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;background:var(--c-bg);
          overflow:hidden;padding:8rem 1.5rem 6rem;text-align:center;
        }
        .viz-hero__orb {
          position:absolute;border-radius:50%;filter:blur(100px);
          animation:vizOrbDrift 16s ease-in-out infinite alternate;pointer-events:none;
        }
        .viz-hero__orb--1{width:540px;height:540px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-160px;left:-100px;opacity:.13;}
        .viz-hero__orb--2{width:460px;height:460px;background:radial-gradient(circle,#f97316,#ea580c);bottom:-130px;right:-80px;opacity:.12;animation-delay:-8s;}
        .viz-hero__orb--3{width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;right:15%;opacity:.07;animation-delay:-4s;}
        @keyframes vizOrbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(32px,24px) scale(1.06)}}
        .viz-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:60px 60px;}
        .viz-hero__grain{position:absolute;inset:0;opacity:.03;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .viz-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .viz-corner--tl{top:24px;left:24px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .viz-corner--tr{top:24px;right:24px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .viz-corner--bl{bottom:64px;left:24px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .viz-corner--br{bottom:64px;right:24px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .viz-hero__content{position:relative;z-index:10;max-width:860px;margin:0 auto;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        @keyframes vizFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        .viz-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .viz-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:vizPulse 2s ease-in-out infinite;}
        @keyframes vizPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .viz-hero__h1{font-family:var(--ff-serif);font-size:clamp(2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;}
        .viz-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.2px var(--c-orange);}
        .viz-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto 1.4rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        .viz-hero__sub{font-family:var(--ff-sans);font-size:clamp(.95rem,2vw,1.1rem);font-weight:300;line-height:1.85;color:var(--c-muted);max-width:680px;margin:0 auto 2.6rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;}
        .viz-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-sans);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .viz-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      {/* Header first — prevents UI displacement */}
      <Header />

      {/* Single JSON-LD script — one @context via buildGraph */}
      <script
        id="schema-visualization-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vizGraph) }}
      />

      <HeroSection />

      <div id="services">
        <Services />
      </div>

      <Seriously />
      <ContactCTA />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}