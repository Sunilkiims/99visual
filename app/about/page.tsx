import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollDown from "../components/scrolldown";
import Chatbot from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";
import PageLoader from "../components/PageLoader";
import TabAbout from "../components/tabstory";
import WhyChooseUs from "../components/whychooseus";
import DataPrivacy from "../components/dataprivacy";
import ContactCTA from "@/app/components/Contactcta";

import { BASE, breadcrumb, webPage, faqSchema } from "@/lib/schema";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About 99 Visual Solutions | IT, Web & 3D Visualization Company in Bangalore, India",
  description:
    "99 Visual Solutions is a Bangalore-based IT solutions company specializing in web development, SEO, digital marketing, 3D visualization, CAD/GIS, and QA testing. 10+ years, 500+ projects.",
  metadataBase: new URL(BASE),
  alternates: { canonical: `${BASE}/about` },
  keywords: [
    "About 99 Visual Solutions",
    "IT Company Bangalore",
    "Web Development Company Bangalore",
    "3D Visualisation Company Bangalore",
    "Digital Transformation Company India",
    "Software Company Bangalore",
    "IT Consulting Firm India",
  ],
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
  authors: [{ name: "99 Visual Solutions", url: BASE }],
  category: "technology",
  openGraph: {
    title: "About 99 Visual Solutions | IT, Web & 3D Visualization Company in Bangalore, India",
    description:
      "10+ years, 500+ projects. 99 Visual Solutions is a full-service IT and digital transformation company based in Bengaluru, India.",
    url: `${BASE}/about`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url: `${BASE}/images/about-og.jpg`,
        width: 1200,
        height: 630,
        alt: "About 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About 99 Visual Solutions | IT & Digital Transformation Company in Bangalore",
    description:
      "10+ years, 500+ projects, 6 specialisations. Based in Bengaluru, serving clients globally.",
    site: "@99VisualSoluti1",
    creator: "@99VisualSoluti1",
    images: [`${BASE}/images/about-og.jpg`],
  },
};

// ─── Unified @graph schema ────────────────────────────────────────────────────
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // 1. Organization
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "99 Visual Solutions",
      alternateName: "99Visual",
      description:
        "Bangalore-based IT solutions company specialising in web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE}/#logo`,
        url: `${BASE}/logo.png`,
        contentUrl: `${BASE}/logo.png`,
        width: 300,
        height: 60,
        caption: "99 Visual Solutions Logo",
      },
      image: { "@id": `${BASE}/#logo` },
      foundingDate: "2015",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560087",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          url: `${BASE}/contact`,
          email: "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed: ["IN", "US", "GB", "AU", "AE"],
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      knowsAbout: [
        "Web Development",
        "Search Engine Optimisation",
        "Digital Marketing",
        "3D Visualisation",
        "CAD Drafting",
        "GIS Mapping",
        "LiDAR Data Processing",
        "QA Testing",
        "IT Consulting",
        "Cloud Migration",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IT & Digital Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Visualisation & Architectural Rendering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & App Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing & SEO" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD, GIS & Photogrammetry" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Powered QA & Automation Testing" } },
        ],
      },
    },

    // 2. LocalBusiness (Bangalore local SEO)
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE}/#localbusiness`,
      name: "99 Visual Solutions",
      image: `${BASE}/images/about-og.jpg`,
      url: BASE,
      email: "contact@99visual.com",
      description:
        "IT and digital solutions company in Bengaluru offering web development, SEO, 3D visualisation, CAD/GIS, and QA testing services.",
      priceRange: "$$",
      currenciesAccepted: "INR, USD, GBP, AED, AUD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560087",
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
          closes: "18:00",
        },
      ],
      parentOrganization: { "@id": `${BASE}/#organization` },
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
    },

    // 3. WebSite (Sitelinks Search Box)
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "99 Visual Solutions",
      description:
        "Web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing services.",
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 4. AboutPage
    {
      "@type": "AboutPage",
      "@id": `${BASE}/about#webpage`,
      url: `${BASE}/about`,
      name: "About 99 Visual Solutions | IT, Web & 3D Visualisation Company in Bangalore",
      description:
        "Learn about 99 Visual Solutions — a Bengaluru IT company founded in 2015 with 500+ projects across web development, SEO, 3D visualisation, CAD/GIS, and QA testing.",
      inLanguage: "en-IN",
      datePublished: "2026-01-01",
      dateModified: "2026-01-01",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE}/images/about-og.jpg`,
        width: 1200,
        height: 630,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".about-hero__sub", ".about-hero__heading"],
      },
      breadcrumb: { "@id": `${BASE}/about#breadcrumb` },
    },

    // 5. BreadcrumbList
    {
      ...breadcrumb([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]),
      "@id": `${BASE}/about#breadcrumb`,
    },

    // 6. FAQPage
    {
      ...faqSchema([
        {
          question: "What services does 99 Visual Solutions offer?",
          answer:
            "99 Visual Solutions offers web development, SEO, digital marketing, 3D visualisation, CAD drafting, GIS mapping, LiDAR data processing, and QA testing services from Bengaluru, India.",
        },
        {
          question: "When was 99 Visual Solutions founded?",
          answer:
            "99 Visual Solutions was founded in 2015 and is headquartered in Bengaluru, Karnataka, India.",
        },
        {
          question: "How many projects has 99 Visual Solutions completed?",
          answer:
            "99 Visual Solutions has successfully delivered over 500 projects across IT, web development, 3D visualisation, and spatial data domains.",
        },
        {
          question: "Does 99 Visual Solutions work with international clients?",
          answer:
            "Yes. We serve startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times.",
        },
        {
          question: "How can I contact 99 Visual Solutions?",
          answer:
            "You can reach us via our contact page at 99visual.com/contact or email us at contact@99visual.com. We typically reply within 24 hours.",
        },
      ]),
      "@id": `${BASE}/about#faq`,
    },

  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <PageLoader />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ─── Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .about-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #080808;
          text-align: center;
          padding: 8rem 1.5rem 6rem;
        }

        /* ── Animated orbs ── */
        .about-hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: aboutOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
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

        /* Breadcrumb */
        .about-hero__breadcrumb {
          position: relative; z-index: 10;
          display: flex; align-items: center; gap: 6px; justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: .75rem;
          color: rgba(255,255,255,0.3); letter-spacing: .04em;
          margin-bottom: 2rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .05s both;
        }
        .about-hero__breadcrumb a {
          color: #f97316; text-decoration: none; font-weight: 500;
        }
        .about-hero__breadcrumb a:hover { text-decoration: underline; }
        .about-hero__breadcrumb span { opacity: .4; }

        /* Content */
        .about-hero__content {
          position: relative; z-index: 10;
          max-width: 780px; margin: 0 auto;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Eyebrow pill */
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
          animation: aboutPulse 2s ease-in-out infinite;
        }
        @keyframes aboutPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        /* Main heading */
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

        /* Thin rule */
        .about-hero__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        /* Sub */
        .about-hero__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 2vw, 1.1rem);
          font-weight: 300; line-height: 1.85;
          color: rgba(255,255,255,0.45);
          max-width: 560px; margin: 0 auto 2.6rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        /* Stats row */
        .about-hero__stats {
          display: flex; justify-content: center;
          gap: 0; margin-bottom: 2.8rem;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .42s both;
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
        }
        .about-hero__stat-label {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .15em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* CTA */
        .about-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: aboutFadeUp .9s cubic-bezier(.22,1,.36,1) .5s both;
        }
        .about-hero__cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }

        /* Scroll indicator */
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

        /* Corner marks */
        .about-hero__corner {
          position: absolute; width: 28px; height: 28px;
          z-index: 5; opacity: .2; pointer-events: none;
        }
        .about-hero__corner--tl { top: 24px; left: 24px; border-top: 1px solid #f97316; border-left: 1px solid #f97316; }
        .about-hero__corner--tr { top: 24px; right: 24px; border-top: 1px solid #f97316; border-right: 1px solid #f97316; }
        .about-hero__corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid #f97316; border-left: 1px solid #f97316; }
        .about-hero__corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid #f97316; border-right: 1px solid #f97316; }

        /* Responsive */
        @media (max-width: 600px) {
          .about-hero__stat { padding: 0 1.2rem; }
          .about-hero__heading em { -webkit-text-stroke-width: 1px; }
        }
      `}</style>

      <Header />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="about-hero" aria-label="About 99 Visual Solutions">

        {/* Decorative background — hidden from AT */}
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

        {/* Breadcrumb */}
       <nav
  className="about-hero__breadcrumb"
  aria-label="Breadcrumb"
  style={{ display: "none" }}
>
  <a href="/">Home</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page" style={{ color: "rgba(255,255,255,0.5)" }}>
    About
  </span>
</nav>

        {/* Main content */}
        <div className="about-hero__content">
          <div className="about-hero__eyebrow" aria-hidden="true">
            <span className="about-hero__eyebrow-dot" />
            Est. 2015 · Bangalore, India
          </div>

          <h1 className="about-hero__heading">
            We build what<br />
            <em>matters</em>
          </h1>

          <div className="about-hero__rule" aria-hidden="true" />

          <p className="about-hero__sub">
            From bold web experiences to precise spatial data — 99 Visual Solutions turns complex
            ideas into digital realities that drive real growth.
          </p>

          {/* Stats */}
          <div className="about-hero__stats" aria-label="Company highlights">
            <div className="about-hero__stat">
              <div className="about-hero__stat-num">10+</div>
              <div className="about-hero__stat-label">Years Active</div>
            </div>
            <div className="about-hero__stat">
              <div className="about-hero__stat-num">500+</div>
              <div className="about-hero__stat-label">Projects Done</div>
            </div>
            <div className="about-hero__stat">
              <div className="about-hero__stat-num">6</div>
              <div className="about-hero__stat-label">Specializations</div>
            </div>
          </div>

          <a href="#about-content" className="about-hero__cta">
            Discover Our Story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#about-content" className="about-hero__scroll" aria-label="Scroll to content">
          <div className="about-hero__scroll-line" aria-hidden="true" />
          <span className="about-hero__scroll-label" aria-hidden="true">Scroll</span>
        </a>
      </section>

      <div id="about-content">
        <TabAbout />
        <WhyChooseUs />
        <DataPrivacy />
      </div>

      <ContactCTA />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}