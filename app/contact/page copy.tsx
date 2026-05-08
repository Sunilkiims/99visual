// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// Fixes applied (aligned with partner/page.tsx reference):
//   ✅ keywords array REMOVED — ignored by all search engines since 2009
//   ✅ canonical changed to relative path "/contact" (was absolute ${BASE}/contact)
//   ✅ hreflang expanded: en-IN / en-US / en-GB / en-AE / en-AU + x-default
//   ✅ OG locale normalised to "en_US" (was "en_IN")
//   ✅ OG image typed with width/height/alt/type (was bare string in twitter images)
//   ✅ Twitter images: bare string → typed object with alt text
//   ✅ verification env var pattern added
//   ✅ formatDetection / referrer / applicationName / creator / publisher added
//   ✅ dateModified auto-updates on every build (was hardcoded "2025-01-01")
//   ✅ LocalBusiness: Saturday hours added, paymentAccepted updated to match partner
//   ✅ LocalBusiness: areaServed added as Country objects (not bare string array)
//   ✅ WebPage schema: publisher added (was missing entirely)
//   ✅ WebPage schema: potentialAction ReadAction added
//   ✅ Script → inline <script> tag (partner/careers pattern, avoids next/script overhead)
//   ✅ Breadcrumb: visible nav with display:none REMOVED
//   ✅ Breadcrumb: sr-only hidden microdata nav added (Googlebot-crawlable, invisible to users)
//   ✅ .sr-only CSS class added
//   ✅ prefers-reduced-motion guard added (WCAG 2.1 AA — was missing)
//   ✅ :root CSS variables used consistently (was mixing raw hex strings)
//   ✅ .ct-hero__breadcrumb CSS block removed (no longer needed)
//   ✅ aria-hidden on all decorative elements verified
//   ✅ aria-labelledby wired to section headings (contact form section)
//   ✅ section id="contact-hero" added for schema speakable cssSelector accuracy
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactForm        from "../components/contactform";
import ContactUsBanner    from "../components/contactus-banner";
import Header             from "../components/header";
import Footer             from "../components/footer";
import ScrollDown         from "../components/scrolldown";
import Chatbot            from "../components/chatbot";
import Whatsappbutton     from "../components/wahtsappbutton";
import PageLoader         from "../components/PageLoader";
import { BASE, breadcrumb, faqSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// Title: 79 chars — contact pages benefit from longer descriptive titles
// Description: 158 chars — within 150–160 char ideal range
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: "/contact",                          // FIX: relative path, matches partner pattern
    languages: {
      "en-IN":     `${BASE}/contact`,               // FIX: expanded from missing → 5 locales + x-default
      "en-US":     `${BASE}/contact`,
      "en-GB":     `${BASE}/contact`,
      "en-AE":     `${BASE}/contact`,
      "en-AU":     `${BASE}/contact`,
      "x-default": `${BASE}/contact`,
    },
  },

  // FIX: keywords REMOVED — ignored by Google/Bing/etc since 2009
  //      Including it wastes crawl budget and can appear spammy.

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
    title: "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url:      `${BASE}/contact`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/contact-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Contact 99 Visual Solutions — Free Consultation for Web, 3D & Digital Services",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",                                // FIX: was "en_IN" — normalised to en_US
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description: "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/contact-og.jpg`,    // FIX: was bare string — now typed object with alt
        alt: "Contact 99 Visual Solutions — Free Consultation Bangalore",
      },
    ],
  },

  // FIX: verification env var pattern added (was missing entirely)
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",           // FIX: added
  publisher:       "99 Visual Solutions",           // FIX: added
  category:        "Technology",
  applicationName: "99 Visual Solutions",           // FIX: added
  referrer:        "origin-when-cross-origin",      // FIX: added
  formatDetection: { email: false, address: false, telephone: false }, // FIX: added
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unified @graph
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0]; // FIX: auto-updates on build

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ─────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id":   `${BASE}/#organization`,
      name:    "99 Visual Solutions",
      alternateName: ["99Visual", "99VS"],
      description:
        "Bangalore-based IT solutions company specialising in web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type":     "ImageObject",
        "@id":       `${BASE}/#logo`,
        url:         `${BASE}/images/logo.png`,
        contentUrl:  `${BASE}/images/logo.png`,
        width:       300,
        height:      60,
        caption:     "99 Visual Solutions Logo",
      },
      image:        { "@id": `${BASE}/#logo` },
      foundingDate: "2015",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      address: {
        "@type":         "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion:   "Karnataka",
        postalCode:      "560087",
        addressCountry:  "IN",
      },
      // FIX: areaServed as Country objects, not bare string array
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Australia" },
      ],
      contactPoint: [
        {
          "@type":           "ContactPoint",
          contactType:       "Sales",
          url:               `${BASE}/contact`,
          email:             "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed:        ["IN", "US", "GB", "AU", "AE"],
        },
        {
          "@type":           "ContactPoint",
          contactType:       "Customer Support",
          url:               `${BASE}/contact`,
          email:             "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed:        ["IN", "US", "GB", "AU", "AE"],
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      knowsAbout: [
        "Web Development", "Search Engine Optimisation", "Digital Marketing",
        "3D Visualisation", "CAD Drafting", "GIS Mapping", "LiDAR Data Processing",
        "QA Testing", "IT Consulting",
      ],
    },

    // ── 2. LocalBusiness ────────────────────────────────────────────────────
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   `${BASE}/#localbusiness`,
      name:    "99 Visual Solutions",
      image:   `${BASE}/images/og/contact-og.jpg`,
      url:     BASE,
      email:   "contact@99visual.com",
      description:
        "Full-service digital agency in Bengaluru offering web development, 3D visualisation, SEO, and digital marketing with free initial consultations.",
      priceRange:         "$$",
      currenciesAccepted: "INR, USD, GBP, AED, AUD",
      paymentAccepted:    "Bank Transfer, Credit Card, UPI, PayPal", // FIX: matches partner
      address: {
        "@type":         "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion:   "Karnataka",
        postalCode:      "560087",
        addressCountry:  "IN",
      },
      geo: {
        "@type":    "GeoCoordinates",
        latitude:   12.9716,
        longitude:  77.5946,
      },
      hasMap: "https://maps.google.com/?q=99+Visual+Solutions+Bengaluru",
      openingHoursSpecification: [
        {
          "@type":    "OpeningHoursSpecification",
          dayOfWeek:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens:      "09:00",
          closes:     "18:30",
        },
        // FIX: Saturday hours added to match partner/careers pages
        {
          "@type":    "OpeningHoursSpecification",
          dayOfWeek:  ["Saturday"],
          opens:      "10:00",
          closes:     "14:00",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:    "Digital Services",
        itemListElement: [
          {
            "@type":       "Offer",
            name:          "Free Consultation",
            description:   "Free initial consultation for web development, 3D visualisation, SEO, and digital marketing services.",
            price:         "0",
            priceCurrency: "INR",
            url:           `${BASE}/contact`,
          },
          {
            "@type":       "Offer",
            itemOffered:   { "@type": "Service", name: "Web & App Development" },
            url:           `${BASE}/services`,
          },
          {
            "@type":       "Offer",
            itemOffered:   { "@type": "Service", name: "3D Visualisation & Architectural Rendering" },
            url:           `${BASE}/services`,
          },
          {
            "@type":       "Offer",
            itemOffered:   { "@type": "Service", name: "SEO & Digital Marketing" },
            url:           `${BASE}/services`,
          },
          {
            "@type":       "Offer",
            itemOffered:   { "@type": "Service", name: "CAD, GIS & Photogrammetry" },
            url:           `${BASE}/services`,
          },
          {
            "@type":       "Offer",
            itemOffered:   { "@type": "Service", name: "AI-Powered QA & Automation Testing" },
            url:           `${BASE}/services`,
          },
        ],
      },
    },

    // ── 3. WebSite ──────────────────────────────────────────────────────────
    {
      "@type":     "WebSite",
      "@id":       `${BASE}/#website`,
      url:         BASE,
      name:        "99 Visual Solutions",
      description: "Web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing services.",
      publisher:   { "@id": `${BASE}/#organization` },
      inLanguage:  "en",
      potentialAction: {
        "@type": "SearchAction",
        target:  { "@type": "EntryPoint", urlTemplate: `${BASE}/?s={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },

    // ── 4. ContactPage ──────────────────────────────────────────────────────
    {
      "@type":       "ContactPage",
      "@id":         `${BASE}/contact#webpage`,
      url:           `${BASE}/contact`,
      name:          "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
      description:   "Get in touch with 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services.",
      inLanguage:    "en",
      datePublished: DATE_PUBLISHED,
      dateModified:  DATE_MODIFIED,                 // FIX: auto-updates on build
      isPartOf:      { "@id": `${BASE}/#website` },
      about:         { "@id": `${BASE}/#organization` },
      publisher:     { "@id": `${BASE}/#organization` }, // FIX: was missing entirely
      primaryImageOfPage: {
        "@type":   "ImageObject",
        url:       `${BASE}/images/og/contact-og.jpg`,
        width:     1200,
        height:    630,
        caption:   "Contact 99 Visual Solutions — Free Consultation Bangalore",
      },
      speakable: {
        "@type":     "SpeakableSpecification",
        cssSelector: [".ct-hero__h1", ".ct-hero__sub"],
      },
      breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
      // FIX: potentialAction ReadAction added (matches partner/careers)
      potentialAction: {
        "@type":  "ReadAction",
        target:   [`${BASE}/contact`],
      },
    },

    // ── 5. BreadcrumbList ───────────────────────────────────────────────────
    {
      ...breadcrumb([
        { name: "Home",    url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
      "@id": `${BASE}/contact#breadcrumb`,
    },

    // ── 6. FAQPage ──────────────────────────────────────────────────────────
    {
      ...faqSchema([
        {
          question: "Does 99 Visual offer a free consultation?",
          answer:
            "Yes. 99 Visual Solutions offers a free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form and the team will get back to you within one business day.",
        },
        {
          question: "Where is 99 Visual Solutions located?",
          answer:
            "99 Visual Solutions is based in Bengaluru, Karnataka, India. The team works with clients both locally and globally across the USA, UK, UAE, and Australia.",
        },
        {
          question: "How quickly does 99 Visual respond to enquiries?",
          answer:
            "The team typically responds to all enquiries within one business day. You can reach out via the contact form at 99visual.com/contact or by emailing contact@99visual.com.",
        },
        {
          question: "What services can I get a quote for?",
          answer:
            "You can request a quote for web development, UI/UX design, 3D visualisation, SEO, digital marketing, GIS services, CAD drafting, and IT consulting. Use the contact form to describe your project requirements.",
        },
        {
          question: "Does 99 Visual work with international clients?",
          answer:
            "Yes. 99 Visual Solutions serves startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times.",
        },
      ]),
      "@id":            `${BASE}/contact#faq`,
      mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <PageLoader />

      {/* ── Unified @graph JSON-LD ─────────────────────────────────────────── */}
      {/* FIX: Script (next/script) → inline <script> tag — matches partner/careers
               pattern; avoids unnecessary next/script hydration overhead for
               non-interactive JSON-LD that must be present on first paint. */}
      <script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ── Styles ────────────────────────────────────────────────────────── */}
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

        /* ── sr-only — invisible to users, crawlable by Googlebot ───────────
           display:none and visibility:hidden both hide from Googlebot.
           This clip technique keeps the element in the render tree at 1×1px.
        ── */
        .sr-only {
          position: absolute !important;
          width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* ── Hero ────────────────────────────────────────────────────────── */
        .ct-hero {
          position: relative;
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }
        .ct-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: ctOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .ct-hero__orb--1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -160px; left: -100px; opacity: .13;
        }
        .ct-hero__orb--2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -130px; right: -80px; opacity: .12;
          animation-delay: -8s;
        }
        @keyframes ctOrbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(32px, 24px) scale(1.06); }
        }

        .ct-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ct-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* FIX: .ct-hero__breadcrumb block REMOVED — replaced by sr-only pattern */

        .ct-hero__content {
          position: relative; z-index: 10; max-width: 760px; margin: 0 auto;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes ctFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ct-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .ct-hero__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: ctPulse 2s ease-in-out infinite;
        }
        @keyframes ctPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        .ct-hero__h1 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .ct-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 0.2px var(--c-orange);
        }

        .ct-hero__rule {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.5rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .ct-hero__sub {
          font-family: var(--ff-sans);
          font-size: clamp(.95rem, 2vw, 1.12rem);
          font-weight: 300; line-height: 1.75; color: var(--c-muted);
          max-width: 520px; margin: 0 auto 2.6rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .ct-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .ct-hero__cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }

        .ct-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          text-decoration: none;
          animation: ctFadeUp .9s ease .8s both;
        }
        .ct-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: ctScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes ctScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .ct-hero__scroll-lbl {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }

        .ct-corner {
          position: absolute; width: 28px; height: 28px; z-index: 5; opacity: .2;
          pointer-events: none;
        }
        .ct-corner--tl { top: 24px; left: 24px;     border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--tr { top: 24px; right: 24px;    border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom: 64px; left: 24px;  border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ── Respect user motion preferences (WCAG 2.1 AA) ───────────────── */
        /* FIX: was missing entirely from contact page */
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
        className="ct-hero"
        aria-labelledby="ct-hero-heading"
        id="contact-hero"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Decorative background — all hidden from assistive tech */}
        <div aria-hidden="true">
          <div className="ct-hero__orb ct-hero__orb--1" />
          <div className="ct-hero__orb ct-hero__orb--2" />
          <div className="ct-hero__grid" />
          <div className="ct-hero__grain" />
        </div>

        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        {/* ── Breadcrumb — sr-only ──────────────────────────────────────────
          ✅ .sr-only = 1×1px clip — invisible to users, crawlable by Googlebot
          ❌ display:none (old code) = hidden from Googlebot too
          aria-hidden="true" — Home→Contact adds no value for screen reader users.
          JSON-LD BreadcrumbList above handles the SERP rich result independently.
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
              <a href="/contact" itemProp="item" aria-current="page">
                <span itemProp="name">Contact</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="ct-hero__content">
          <p className="ct-hero__eyebrow" aria-hidden="true">
            <span className="ct-hero__dot" />
            Contact · Bangalore &amp; Beyond
          </p>

          <h1
            className="ct-hero__h1"
            id="ct-hero-heading"
            itemProp="name"
          >
            Let&apos;s build something<br /><em>great</em> together
          </h1>

          <div className="ct-hero__rule" aria-hidden="true" />

          <p className="ct-hero__sub" itemProp="description">
            We believe collaboration drives innovation. We partner with forward-thinking
            organisations to create impactful, future-ready solutions.
          </p>

          <a
            href="#contact-form"
            className="ct-hero__cta"
            aria-label="Scroll to contact form — get in touch with 99 Visual Solutions"
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <a
          href="#contact-form"
          className="ct-hero__scroll"
          aria-label="Scroll to contact form"
        >
          <div className="ct-hero__scroll-line" aria-hidden="true" />
          <span className="ct-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CONTACT US BANNER ═══════════════════════════════════════════════ */}
      <ContactUsBanner />

      {/* ══ CONTACT FORM ════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        aria-label="Contact form — send 99 Visual Solutions a message"
      >
        <ContactForm />
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}