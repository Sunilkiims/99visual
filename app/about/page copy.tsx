// app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade About page — 99 Visual Solutions
//
// FIXES APPLIED:
//   ✅ Removed inline @graph object with its own "@context" — was duplicating
//      the same invalid-@context pattern from the home page. Now uses
//      buildGraph() from lib/schema so @context lives in one place only.
//   ✅ Removed duplicate Organization + LocalBusiness + WebSite node definitions
//      that diverged from lib/schema.ts (different foundingDate, different logo
//      dimensions, different sameAs URLs). Single source of truth in schema.ts.
//   ✅ aboutBreadcrumb spread with custom @id now handled cleanly via buildGraph.
//   ✅ aboutFaq spread with custom @id retained — valid pattern inside @graph.
//   ✅ All other SEO, a11y, and structured data intact from original.
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
  title: "About 99 Visual Solutions | IT & 3D Visualization Company Bangalore",

  description:
    "Meet 99 Visual Solutions — Bengaluru's full-service IT company. 10+ years, 500+ projects in web development, 3D visualisation, CAD, GIS, SEO & IT consulting.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: "/about",
    languages: {
      "en-IN":     `${BASE}/about`,
      "en-US":     `${BASE}/about`,
      "en-GB":     `${BASE}/about`,
      "en-AE":     `${BASE}/about`,
      "en-AU":     `${BASE}/about`,
      "x-default": `${BASE}/about`,
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
    title:       "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    description: "Bengaluru-based IT company with 10+ years and 500+ projects. Full-service digital transformation — web, app, 3D visualisation, CAD, GIS, SEO & IT consulting.",
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
    description: "10+ years · 500+ projects · 6 specialisations. Bengaluru IT company serving India, USA, UK, UAE & Australia.",
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
const DATE_PUBLISHED = "2023-01-01"; // ← set to real website launch date
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES — page-specific only
//
// Organization, LocalBusiness, and WebSite are imported from lib/schema.ts
// (single source of truth). Defining them again here would create divergence
// and duplicate nodes in the @graph, both of which confuse Google's parser.
//
// Page-specific nodes: AboutPage, ProfilePage, BreadcrumbList, FAQPage.
// ─────────────────────────────────────────────────────────────────────────────
const aboutBreadcrumbNode = {
  ...breadcrumb([
    { name: "Home",  url: "/" },
    { name: "About", url: "/about" },
  ]),
  "@id": `${BASE}/about#breadcrumb`,
};

const aboutFaqNode = {
  ...faqSchema([
    {
      question: "What services does 99 Visual Solutions offer?",
      answer:
        "99 Visual Solutions is a full-service IT and digital transformation company offering 3D architectural visualisation, custom web and mobile app development, CAD drafting, GIS and LiDAR mapping, digital marketing and SEO, IT consulting, and AI-powered QA and automation testing. We serve startups and enterprises across India, the USA, UK, UAE, and Australia.",
    },
    {
      question: "When was 99 Visual Solutions founded?",
      answer:
        "99 Visual Solutions was founded in 2020 and is headquartered in Bengaluru, Karnataka, India. Over the years, we have grown into a full-service digital transformation company serving clients across India, the USA, UK, UAE, and Australia.",
    },
    {
      question: "How many projects has 99 Visual Solutions completed?",
      answer:
        "99 Visual Solutions has successfully delivered over 500 projects across IT, web development, 3D architectural visualisation, CAD drafting, GIS/LiDAR mapping, and digital marketing domains. Our clients range from early-stage startups to established enterprises across multiple industries.",
    },
    {
      question: "Does 99 Visual Solutions work with international clients?",
      answer:
        "Yes. We actively serve startups and enterprises in the USA, UK, UAE, and Australia alongside our Indian clients. Our offshore IT model delivers world-class quality at competitive rates, with dedicated account managers, agile delivery, and time-zone overlap for seamless communication.",
    },
    {
      question: "How can I contact 99 Visual Solutions?",
      answer:
        "You can reach us via our contact page at 99visual.com/contact or email us directly at contact@99visual.com. We typically respond within 24 business hours. We also offer a free discovery call to understand your project requirements before any proposal.",
    },
    {
      question: "What industries does 99 Visual Solutions serve?",
      answer:
        "We serve a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, logistics, and government. Our multi-disciplinary team brings domain expertise relevant to each sector, ensuring solutions that are both technically sound and commercially effective.",
    },
    {
      question: "Why choose 99 Visual Solutions over other IT companies in Bangalore?",
      answer:
        "99 Visual Solutions combines six distinct specialisations under one roof — 3D visualisation, web and app development, CAD/GIS, SEO, IT consulting, and QA testing — giving clients a single accountable partner instead of managing multiple agencies. With 500+ delivered projects and a transparent, client-first approach, we consistently deliver measurable results on time and within budget.",
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
  description:   "Learn about 99 Visual Solutions — Bengaluru IT company with 500+ projects across web development, SEO, 3D visualisation, CAD/GIS, and QA testing.",
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
    cssSelector: [".about-hero__heading", ".about-hero__sub"],
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

// Single @graph — one @context, all nodes, zero duplication.
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
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <PageLoader />

      {/* Single JSON-LD script — one @context via buildGraph */}
      <script
        id="schema-about-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-hero__orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
          animation: aboutOrbDrift 16s ease-in-out infinite alternate;
        }
        .about-hero__orb--1 { width:540px;height:540px;background:radial-gradient(circle,#f97316,#ea580c);top:-160px;left:-120px;opacity:.13; }
        .about-hero__orb--2 { width:460px;height:460px;background:radial-gradient(circle,#fb923c,#f97316);bottom:-140px;right:-100px;opacity:.12;animation-delay:-8s; }
        .about-hero__orb--3 { width:300px;height:300px;background:radial-gradient(circle,#fbbf24,#f97316);top:35%;left:60%;opacity:.07;animation-delay:-4s; }
        @keyframes aboutOrbDrift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(32px,24px) scale(1.06)} }

        .about-hero__grid {
          position:absolute;inset:0;pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .about-hero__grain {
          position:absolute;inset:0;opacity:.03;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px 180px;
        }

        .sr-only {
          position:absolute !important; width:1px !important; height:1px !important;
          padding:0 !important; margin:-1px !important; overflow:hidden !important;
          clip:rect(0,0,0,0) !important; white-space:nowrap !important; border:0 !important;
        }

        .about-hero {
          position:relative; min-height:90vh;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          overflow:hidden; background:#080808;
          text-align:center; padding:8rem 1.5rem 6rem;
        }

        .about-hero__eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
          letter-spacing:.22em; text-transform:uppercase; color:#f97316;
          border:1px solid rgba(249,115,22,.28); background:rgba(249,115,22,.07);
          padding:6px 16px; border-radius:100px;
          margin-bottom:1.8rem; backdrop-filter:blur(8px);
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .about-hero__eyebrow-dot {
          width:5px; height:5px; border-radius:50%; background:#f97316;
          animation:aboutPulse 2s ease-in-out infinite; flex-shrink:0;
        }
        @keyframes aboutPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .about-hero__heading {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2rem,5vw,3.6rem);
          font-weight:700; line-height:1.1; letter-spacing:-.02em;
          color:#fff; margin:0 0 1rem;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .about-hero__heading em { font-style:italic; color:transparent; -webkit-text-stroke:0.2px #f97316; }

        .about-hero__rule {
          width:40px; height:1px;
          background:linear-gradient(90deg,transparent,#f97316,transparent);
          margin:0 auto 1.4rem;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .about-hero__sub {
          font-family:'DM Sans',sans-serif;
          font-size:clamp(.95rem,2vw,1.1rem);
          font-weight:300; line-height:1.85; color:rgba(255,255,255,0.45);
          max-width:560px; margin:0 auto 2.6rem;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .about-hero__stats {
          display:flex; justify-content:center; gap:0;
          margin:0 0 2.8rem; list-style:none; padding:0;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .42s both;
        }
        .about-hero__stat { padding:0 2.5rem; border-right:1px solid rgba(255,255,255,0.1); }
        .about-hero__stat:last-child { border-right:none; }
        .about-hero__stat-num {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1.8rem,4vw,2.6rem);
          font-weight:600; color:#f97316; line-height:1; margin-bottom:4px; display:block;
        }
        .about-hero__stat-label {
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
          letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,0.35); display:block;
        }

        .about-hero__cta-group {
          display:flex; gap:12px; justify-content:center; flex-wrap:wrap;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .5s both;
        }
        .about-hero__cta-primary {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600;
          letter-spacing:.12em; text-transform:uppercase; color:#080808;
          background:linear-gradient(135deg,#fb923c,#f97316);
          padding:14px 34px; border-radius:100px; text-decoration:none;
          box-shadow:0 8px 32px rgba(249,115,22,.35);
          transition:transform .2s ease,box-shadow .2s ease;
        }
        .about-hero__cta-primary:hover { transform:translateY(-2px) scale(1.04); box-shadow:0 14px 40px rgba(249,115,22,.5); }
        .about-hero__cta-secondary {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500;
          letter-spacing:.12em; text-transform:uppercase; color:#f97316;
          border:1px solid rgba(249,115,22,.35);
          padding:14px 34px; border-radius:100px; text-decoration:none;
          transition:background .2s ease,border-color .2s ease;
        }
        .about-hero__cta-secondary:hover { background:rgba(249,115,22,.08); border-color:#f97316; }

        .about-hero__scroll {
          position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
          z-index:20; display:flex; flex-direction:column;
          align-items:center; gap:6px; text-decoration:none;
          animation:aboutFadeUp .9s ease .8s both;
        }
        .about-hero__scroll-line {
          width:1px; height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:aboutScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes aboutScrollLine {
          0%  {transform:scaleY(0);transform-origin:top;opacity:1}
          50% {transform:scaleY(1);transform-origin:top;opacity:1}
          100%{transform:scaleY(1);transform-origin:bottom;opacity:0}
        }
        .about-hero__scroll-label {
          font-family:'DM Sans',sans-serif; font-size:9px; font-weight:500;
          letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.22);
        }

        .about-hero__corner { position:absolute; width:28px; height:28px; z-index:5; opacity:.2; pointer-events:none; }
        .about-hero__corner--tl { top:24px; left:24px; border-top:1px solid #f97316; border-left:1px solid #f97316; }
        .about-hero__corner--tr { top:24px; right:24px; border-top:1px solid #f97316; border-right:1px solid #f97316; }
        .about-hero__corner--bl { bottom:64px; left:24px; border-bottom:1px solid #f97316; border-left:1px solid #f97316; }
        .about-hero__corner--br { bottom:64px; right:24px; border-bottom:1px solid #f97316; border-right:1px solid #f97316; }

        .about-hero__content {
          position:relative; z-index:10;
          max-width:780px; margin:0 auto;
          animation:aboutFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes aboutFadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width:600px) {
          .about-hero__stat      { padding:0 1.2rem; }
          .about-hero__cta-group { flex-direction:column; align-items:center; }
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
        className="about-hero"
        aria-label="About 99 Visual Solutions"
        id="about-hero"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div aria-hidden="true">
          <div className="about-hero__orb about-hero__orb--1" />
          <div className="about-hero__orb about-hero__orb--2" />
          <div className="about-hero__orb about-hero__orb--3" />
          <div className="about-hero__grid" />
          <div className="about-hero__grain" />
        </div>

        <div className="about-hero__corner about-hero__corner--tl" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--tr" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--bl" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--br" aria-hidden="true" />

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
              <a href="/about" itemProp="item" aria-current="page">
                <span itemProp="name">About</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <div className="about-hero__content">

          <p className="about-hero__eyebrow" aria-hidden="true">
            <span className="about-hero__eyebrow-dot" />
            Est. 2020 · Bangalore, India
          </p>

          <h1 className="about-hero__heading" itemProp="name">
            We build what<br />
            <em>matters</em>
          </h1>

          <div className="about-hero__rule" aria-hidden="true" />

          <p className="about-hero__sub" itemProp="description">
            From bold web experiences to precise spatial data —
            99 Visual Solutions turns complex ideas into digital realities
            that drive real, measurable growth.
          </p>

          <dl className="about-hero__stats" aria-label="Company highlights">
            <div className="about-hero__stat">
              <dt className="about-hero__stat-label">Years Active</dt>
              <dd className="about-hero__stat-num">5+</dd>
            </div>
            <div className="about-hero__stat">
              <dt className="about-hero__stat-label">Projects Done</dt>
              <dd className="about-hero__stat-num">500+</dd>
            </div>
            <div className="about-hero__stat">
              <dt className="about-hero__stat-label">Specializations</dt>
              <dd className="about-hero__stat-num">6</dd>
            </div>
          </dl>

          <div className="about-hero__cta-group">
            <a
              href="/contact"
              className="about-hero__cta-primary"
              aria-label="Get a free project quote from 99 Visual Solutions"
            >
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/services"
              className="about-hero__cta-secondary"
              aria-label="Explore all services offered by 99 Visual Solutions"
            >
              Our Services
            </a>
          </div>
        </div>

        <a
          href="#about-content"
          className="about-hero__scroll"
          aria-label="Scroll down to learn more about 99 Visual Solutions"
        >
          <div className="about-hero__scroll-line" aria-hidden="true" />
          <span className="about-hero__scroll-label" aria-hidden="true">Scroll</span>
        </a>
      </section>

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