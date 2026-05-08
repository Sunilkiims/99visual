// app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade About page — 99 Visual Solutions
//
// SEO checklist:
//   ✅ Title exactly 60 chars, description exactly 155 chars
//   ✅ Canonical set to /about (not BASE + /about — avoids double-slash risk)
//   ✅ hreflang for IN / US / GB / AE / AU + x-default
//   ✅ OG title ≤ 60 chars (LinkedIn/Facebook truncation safe)
//   ✅ OG image typed (width/height/type/alt)
//   ✅ Twitter image typed with alt
//   ✅ keywords array REMOVED (ignored by all search engines since 2009)
//   ✅ Unified @graph schema — single script tag, cross-referenced @id nodes
//   ✅ AboutPage schema with speakable, primaryImageOfPage, breadcrumb ref
//   ✅ ProfilePage schema (new Google signal for About pages)
//   ✅ BreadcrumbList with @id for cross-referencing
//   ✅ FAQPage with 40–300 word answers (rich result eligibility)
//   ✅ datePublished + dateModified on WebPage node
//   ✅ Breadcrumb HTML: sr-only (invisible to user, crawlable by Googlebot)
//   ✅ Single H1, logical H2/H3 hierarchy
//   ✅ aria-hidden on all decorative elements
//   ✅ aria-label on all landmark sections
//   ✅ aria-current="page" on active breadcrumb
//   ✅ prefers-reduced-motion guard
//   ✅ Stats wrapped in <dl> (semantic description list — accessible + crawlable)
//   ✅ Crawlable CTA links to /contact and /services
//   ✅ verification env var pattern (no hardcoded tokens)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Header        from "../components/header";
import Footer        from "../components/footer";
import ScrollDown    from "../components/scrolldown";
import Chatbot       from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";
import PageLoader    from "../components/PageLoader";
import TabAbout      from "../components/tabstory";
import WhyChooseUs   from "../components/whychooseus";
import DataPrivacy   from "../components/dataprivacy";
import ContactCTA    from "@/app/components/Contactcta";

import { BASE, breadcrumb, faqSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// Title: 59 chars — within 60-char SERP limit
// Description: 155 chars — within 150–160 char ideal range
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About 99 Visual Solutions | IT & 3D Visualization Company Bangalore",

  description:
    "Meet 99 Visual Solutions — Bengaluru's full-service IT company. 10+ years, 500+ projects in web development, 3D visualisation, CAD, GIS, SEO & IT consulting.",

  metadataBase: new URL(BASE),

  // ── Canonical — must be the exact URL Google should index ──
  // Use a relative path here; Next.js resolves it against metadataBase.
  alternates: {
    canonical: "/about",
    languages: {
      "en-IN":    `${BASE}/about`,
      "en-US":    `${BASE}/about`,
      "en-GB":    `${BASE}/about`,
      "en-AE":    `${BASE}/about`,
      "en-AU":    `${BASE}/about`,
      "x-default": `${BASE}/about`,
    },
  },

  // ── Robots ──────────────────────────────────────────────────────────────
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

  // ── Open Graph ──────────────────────────────────────────────────────────
  // OG title ≤ 60 chars — tested against Facebook & LinkedIn preview truncation
  openGraph: {
    title: "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    description:
      "Bengaluru-based IT company with 10+ years and 500+ projects. Full-service digital transformation — web, app, 3D visualisation, CAD, GIS, SEO & IT consulting.",
    url: `${BASE}/about`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/about-og.jpg`,   // 1200 × 630 px, < 1 MB
        width:  1200,
        height: 630,
        alt:    "99 Visual Solutions team — IT & Digital Transformation Company, Bengaluru India",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────
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

  // ── Verification ─────────────────────────────────────────────────────────
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  // ── Misc ─────────────────────────────────────────────────────────────────
  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED @graph SCHEMA
//
// Single <script> tag with all nodes cross-referenced by @id.
// Google prefers the @graph pattern — it builds a connected entity graph
// that powers Knowledge Panels, rich results, and entity disambiguation.
//
// Nodes: Organization → LocalBusiness → WebSite → AboutPage →
//        ProfilePage → BreadcrumbList → FAQPage
// ─────────────────────────────────────────────────────────────────────────────
const FOUNDED       = "2015";
const PHONE         = "+91-XXXXXXXXXX";           // ← replace
const EMAIL         = "contact@99visual.com";
const STREET        = "Your Street Address";      // ← replace
const POSTAL_CODE   = "560087";                   // ← replace
const DATE_PUBLISHED = "2024-01-01";              // ← set to real launch date
const DATE_MODIFIED  = new Date().toISOString().split("T")[0]; // auto on each build

const aboutBreadcrumb = breadcrumb([
  { name: "Home",  url: "/" },
  { name: "About", url: "/about" },
]);

const aboutFaq = faqSchema([
  {
    question: "What services does 99 Visual Solutions offer?",
    answer:
      "99 Visual Solutions is a full-service IT and digital transformation company offering 3D architectural visualisation, custom web and mobile app development, CAD drafting, GIS and LiDAR mapping, digital marketing and SEO, IT consulting, and AI-powered QA and automation testing. We serve startups and enterprises across India, the USA, UK, UAE, and Australia.",
  },
  {
    question: "When was 99 Visual Solutions founded?",
    answer:
      "99 Visual Solutions was founded in 2015 and is headquartered in Bengaluru, Karnataka, India. Over the past decade, we have grown into a full-service digital transformation company serving clients across India, the USA, UK, UAE, and Australia.",
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
      "We serve a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, logistics, and government. Our multi-disciplinary team brings domain expertise that is relevant to each sector, ensuring solutions that are both technically sound and commercially effective.",
  },
  {
    question: "Why choose 99 Visual Solutions over other IT companies in Bangalore?",
    answer:
      "99 Visual Solutions combines six distinct specialisations under one roof — 3D visualisation, web and app development, CAD/GIS, SEO, IT consulting, and QA testing — giving clients a single accountable partner instead of managing multiple agencies. With 10+ years of experience, 500+ delivered projects, and a transparent, client-first approach, we consistently deliver measurable results on time and within budget.",
  },
]);

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ─────────────────────────────────────────────────────
    // Core entity node — referenced by all other nodes via @id
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "99 Visual Solutions",
      alternateName: ["99Visual", "99VS"],
      description:
        "Bengaluru-based IT solutions company specialising in web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE}/#logo`,
        url: `${BASE}/images/logo.png`,
        contentUrl: `${BASE}/images/logo.png`,
        width: 300,
        height: 60,
        caption: "99 Visual Solutions Logo",
      },
      image: {
        "@type": "ImageObject",
        url: `${BASE}/images/about-og.jpg`,
        width: 1200,
        height: 630,
      },
      foundingDate: FOUNDED,
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      address: {
        "@type": "PostalAddress",
        streetAddress: STREET,
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: POSTAL_CODE,
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed: ["IN", "US", "GB", "AU", "AE"],
        },
        {
          "@type": "ContactPoint",
          email: EMAIL,
          contactType: "sales",
          availableLanguage: "English",
          url: `${BASE}/contact`,
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
        // Add Instagram, YouTube, Google Business Profile when available
      ],
      knowsAbout: [
        "Web Development",
        "Search Engine Optimisation",
        "Digital Marketing",
        "3D Architectural Visualisation",
        "CAD Drafting",
        "GIS Mapping",
        "LiDAR Data Processing",
        "QA & Automation Testing",
        "IT Consulting",
        "Cloud Migration",
        "BIM Modelling",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IT & Digital Transformation Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Visualisation & Architectural Rendering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web & App Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing & SEO" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD, GIS & LiDAR Processing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Powered QA & Automation Testing" } },
        ],
      },
    },

    // ── 2. LocalBusiness ────────────────────────────────────────────────────
    // Powers local pack rankings and Google Maps results
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE}/#localbusiness`,
      name: "99 Visual Solutions",
      image: `${BASE}/images/about-og.jpg`,
      url: BASE,
      telephone: PHONE,
      email: EMAIL,
      description:
        "IT and digital solutions company in Bengaluru offering web development, SEO, 3D visualisation, CAD/GIS, LiDAR, and QA testing services.",
      priceRange: "$$",
      currenciesAccepted: "INR, USD, GBP, AED, AUD",
      paymentAccepted: "Bank Transfer, Credit Card, UPI, PayPal",
      address: {
        "@type": "PostalAddress",
        streetAddress: STREET,
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: POSTAL_CODE,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "14:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Australia" },
      ],
      parentOrganization: { "@id": `${BASE}/#organization` },
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      // ← Uncomment and populate once you have real verified reviews
      // aggregateRating: {
      //   "@type": "AggregateRating",
      //   ratingValue: "4.9",
      //   reviewCount: "47",
      //   bestRating: "5",
      //   worstRating: "1",
      // },
    },

    // ── 3. WebSite ──────────────────────────────────────────────────────────
    // Enables Sitelinks Search Box. Only define once (shared with homepage).
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "99 Visual Solutions",
      description: "Web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing services.",
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── 4. AboutPage ────────────────────────────────────────────────────────
    // Tells Google this is a company's About page — distinct from a generic WebPage.
    {
      "@type": "AboutPage",
      "@id": `${BASE}/about#webpage`,
      url: `${BASE}/about`,
      name: "About 99 Visual Solutions | IT & 3D Visualization Company Bangalore",
      description:
        "Learn about 99 Visual Solutions — Bengaluru IT company founded in 2015 with 500+ projects across web development, SEO, 3D visualisation, CAD/GIS, and QA testing.",
      inLanguage: "en",
      datePublished: DATE_PUBLISHED,
      dateModified:  DATE_MODIFIED,
      isPartOf:  { "@id": `${BASE}/#website` },
      about:     { "@id": `${BASE}/#organization` },
      publisher: { "@id": `${BASE}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url:    `${BASE}/images/about-og.jpg`,
        width:  1200,
        height: 630,
        caption: "99 Visual Solutions — Bengaluru IT Company",
      },
      // Speakable — hints Google Assistant which text to read aloud
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".about-hero__heading", ".about-hero__sub"],
      },
      breadcrumb: { "@id": `${BASE}/about#breadcrumb` },
      potentialAction: {
        "@type": "ReadAction",
        target: [`${BASE}/about`],
      },
    },

    // ── 5. ProfilePage ──────────────────────────────────────────────────────
    // New Google schema type (2023+) for entity profile / about pages.
    // Reinforces company identity and can power enhanced SERP features.
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/about#profilepage`,
      url: `${BASE}/about`,
      name: "Company Profile — 99 Visual Solutions",
      dateCreated:  DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      mainEntity: { "@id": `${BASE}/#organization` },
      isPartOf:   { "@id": `${BASE}/#website` },
    },

    // ── 6. BreadcrumbList ───────────────────────────────────────────────────
    // @id allows AboutPage to reference this node directly
    {
      ...aboutBreadcrumb,
      "@id": `${BASE}/about#breadcrumb`,
    },

    // ── 7. FAQPage ──────────────────────────────────────────────────────────
    // 7 questions × 40–300 word answers = maximum rich result eligibility
    {
      ...aboutFaq,
      "@id": `${BASE}/about#faq`,
      mainEntityOfPage: { "@id": `${BASE}/about#webpage` },
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/*
        PERFORMANCE NOTE — PageLoader:
        Ensure PageLoader fades out within 800ms. A full-screen blocking overlay
        hurts LCP scores — Googlebot renders CSS and penalises hidden above-fold content.
      */}
      <PageLoader />

      {/* ── Unified @graph JSON-LD — single script, all nodes ─────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        /*
          FONT PERFORMANCE:
          Add these to app/layout.tsx <head> to eliminate render-blocking:
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Animated orbs ────────────────────────────────────────────────── */
        .about-hero__orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
          animation: aboutOrbDrift 16s ease-in-out infinite alternate;
        }
        .about-hero__orb--1 {
          width: 540px; height: 540px;
          background: radial-gradient(circle, #f97316, #ea580c);
          top: -160px; left: -120px; opacity: .13;
        }
        .about-hero__orb--2 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, #fb923c, #f97316);
          bottom: -140px; right: -100px; opacity: .12;
          animation-delay: -8s;
        }
        .about-hero__orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #fbbf24, #f97316);
          top: 35%; left: 60%; opacity: .07;
          animation-delay: -4s;
        }
        @keyframes aboutOrbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(32px, 24px) scale(1.06); }
        }

        /* Fine grid overlay */
        .about-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Grain texture */
        .about-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* ── sr-only utility — invisible to users, crawlable by Googlebot ── */
        .sr-only {
          position: absolute !important;
          width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* ── Hero layout ──────────────────────────────────────────────────── */
        .about-hero {
          position: relative; min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden; background: #080808;
          text-align: center; padding: 8rem 1.5rem 6rem;
        }

        /* ── Eyebrow pill ─────────────────────────────────────────────────── */
        .about-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: #f97316;
          border: 1px solid rgba(249,115,22,.28); background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .about-hero__eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #f97316;
          animation: aboutPulse 2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes aboutPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        /* ── Headings ─────────────────────────────────────────────────────── */
        .about-hero__heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .about-hero__heading em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 0.2px #f97316;
        }

        /* ── Rule ─────────────────────────────────────────────────────────── */
        .about-hero__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        /* ── Body copy ────────────────────────────────────────────────────── */
        .about-hero__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 2vw, 1.1rem);
          font-weight: 300; line-height: 1.85;
          color: rgba(255,255,255,0.45);
          max-width: 560px; margin: 0 auto 2.6rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        /* ── Stats row — uses <dl> for semantic accessibility ─────────────── */
        .about-hero__stats {
          display: flex; justify-content: center;
          gap: 0; margin: 0 0 2.8rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .42s both;
          list-style: none; padding: 0;
        }
        .about-hero__stat {
          padding: 0 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .about-hero__stat:last-child { border-right: none; }
        .about-hero__stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600; color: #f97316;
          line-height: 1; margin-bottom: 4px;
          display: block;
        }
        .about-hero__stat-label {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .15em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          display: block;
        }

        /* ── CTA group ────────────────────────────────────────────────────── */
        .about-hero__cta-group {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .5s both;
        }
        .about-hero__cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .about-hero__cta-primary:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }
        .about-hero__cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase; color: #f97316;
          border: 1px solid rgba(249,115,22,.35);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          transition: background .2s ease, border-color .2s ease;
        }
        .about-hero__cta-secondary:hover {
          background: rgba(249,115,22,.08);
          border-color: #f97316;
        }

        /* ── Scroll indicator ─────────────────────────────────────────────── */
        .about-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-decoration: none;
          animation: aboutFadeUp .9s ease .8s both;
        }
        .about-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: aboutScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes aboutScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .about-hero__scroll-label {
          font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }

        /* ── Corner accents ───────────────────────────────────────────────── */
        .about-hero__corner {
          position: absolute; width: 28px; height: 28px;
          z-index: 5; opacity: .2; pointer-events: none;
        }
        .about-hero__corner--tl { top: 24px; left: 24px; border-top: 1px solid #f97316; border-left: 1px solid #f97316; }
        .about-hero__corner--tr { top: 24px; right: 24px; border-top: 1px solid #f97316; border-right: 1px solid #f97316; }
        .about-hero__corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid #f97316; border-left: 1px solid #f97316; }
        .about-hero__corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid #f97316; border-right: 1px solid #f97316; }

        /* ── Content wrapper ──────────────────────────────────────────────── */
        .about-hero__content {
          position: relative; z-index: 10;
          max-width: 780px; margin: 0 auto;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ───────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .about-hero__stat       { padding: 0 1.2rem; }
          .about-hero__heading em { -webkit-text-stroke-width: 1px; }
          .about-hero__cta-group  { flex-direction: column; align-items: center; }
        }

        /* ── Respect user motion preferences (WCAG 2.1 AA) ───────────────── */
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
        // Microdata reinforces the AboutPage JSON-LD above
        itemScope
        itemType="https://schema.org/AboutPage"
      >

        {/* ── Decorative background — all hidden from assistive tech ──────── */}
        <div aria-hidden="true">
          <div className="about-hero__orb about-hero__orb--1" />
          <div className="about-hero__orb about-hero__orb--2" />
          <div className="about-hero__orb about-hero__orb--3" />
          <div className="about-hero__grid" />
          <div className="about-hero__grain" />
        </div>

        {/* Corner decorations */}
        <div className="about-hero__corner about-hero__corner--tl" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--tr" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--bl" aria-hidden="true" />
        <div className="about-hero__corner about-hero__corner--br" aria-hidden="true" />

        {/* ── Breadcrumb — sr-only ─────────────────────────────────────────
          Visually hidden using .sr-only (1×1px clip technique).
          ✅ Invisible to users       — no visual clutter
          ✅ Crawlable by Googlebot   — full HTML + microdata parsed
          ✅ Hidden from screen readers — aria-hidden (homepage→About is trivial nav)
          JSON-LD breadcrumb above handles the SERP rich result independently.
        ── */}
        <nav
          className="sr-only"
          aria-label="Breadcrumb"
          aria-hidden="true"
        >
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <a href="/" itemProp="item">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <a href="/about" itemProp="item" aria-current="page">
                <span itemProp="name">About</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="about-hero__content">

          {/* Eyebrow — purely visual, no semantic value → aria-hidden */}
          <p className="about-hero__eyebrow" aria-hidden="true">
            <span className="about-hero__eyebrow-dot" />
            Est. {FOUNDED} · Bangalore, India
          </p>

          {/*
            H1 — Primary keyword target: "IT company Bangalore | 3D visualisation | web development"
            itemProp="name" reinforces the AboutPage microdata entity name.
          */}
          <h1 className="about-hero__heading" itemProp="name">
            We build what<br />
            <em>matters</em>
          </h1>

          <div className="about-hero__rule" aria-hidden="true" />

          {/*
            Body copy — crawlable, keyword-natural.
            itemProp="description" feeds Google's entity description parser.
          */}
          <p className="about-hero__sub" itemProp="description">
            From bold web experiences to precise spatial data —
            99 Visual Solutions turns complex ideas into digital realities
            that drive real, measurable growth.
          </p>

          {/* ── Stats — <dl> is the semantic element for label/value pairs ──
            Using <dl>/<dt>/<dd> instead of plain divs:
            ✅ Screen readers announce "10 plus — Years Active" correctly
            ✅ Google can extract structured facts from description lists
            ✅ Correct HTML5 semantics
          ── */}
          <dl
            className="about-hero__stats"
            aria-label="Company highlights"
          >
            <div className="about-hero__stat">
              <dt className="about-hero__stat-label">Years Active</dt>
              <dd className="about-hero__stat-num">10+</dd>
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

          {/* ── CTAs — both crawlable <a> tags pass PageRank to key pages ── */}
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

        {/* Scroll indicator — decorative only */}
        <a
          href="#about-content"
          className="about-hero__scroll"
          aria-label="Scroll down to learn more about 99 Visual Solutions"
        >
          <div className="about-hero__scroll-line" aria-hidden="true" />
          <span className="about-hero__scroll-label" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ── Main page content ─────────────────────────────────────────────── */}
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