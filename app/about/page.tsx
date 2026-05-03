import type { Metadata } from "next";
import Script from "next/script";
import Header from "../components/header";
import Footer from "../components/footer";
import TabAbout from "../components/tabstory";
import WhyChooseUs from "../components/whychooseus";
import DataPrivacy from "../components/dataprivacy";
import ContactCTA from "@/app/components/Contactcta";

import { BASE, breadcrumb, webPage, faqSchema } from "@/lib/schema";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About 99 Visual | IT, Web & 3D Visualization Company in Bangalore, India",
  description:
    "99 Visual is a Bangalore-based IT solutions company specializing in web development, SEO, digital marketing, 3D visualization, CAD/GIS, and QA testing. 10+ years, 500+ projects.",
  metadataBase: new URL(BASE),
  alternates: { canonical: "/about" },
  keywords: [
    "About 99 Visual Solutions",
    "IT Company Bangalore",
    "Web Development Company Bangalore",
    "3D Visualisation Company Bangalore",
    "Digital Transformation Company India",
    "Software Company Bangalore",
    "IT Consulting Firm India",
  ],
  openGraph: {
    title: "About 99 Visual | IT, Web & 3D Visualization Company in Bangalore, India",
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About 99 Visual | IT & Digital Transformation Company in Bangalore",
    description:
      "10+ years, 500+ projects, 6 specialisations. Based in Bengaluru, serving clients globally.",
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
      datePublished: "2023-01-01",
      dateModified: "2025-07-01",
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
      {/* ✅ Single unified JSON-LD @graph block */}
      <Script
        id="schema-about-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <Header />

      {/* ✅ Hero Section */}
      <section className="about-hero">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

          .about-hero {
            position: relative;
            min-height: 88vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #080808;
            text-align: center;
            padding: 7rem 1.5rem 6rem;
          }

          /* ── Animated mesh background ── */
          .about-hero__bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
          }
          .about-hero__orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            opacity: 0.18;
            animation: orbDrift 14s ease-in-out infinite alternate;
          }
          .about-hero__orb--1 {
            width: 600px; height: 600px;
            background: radial-gradient(circle, #f97316, #ea580c);
            top: -180px; left: -120px;
            animation-delay: 0s;
          }
          .about-hero__orb--2 {
            width: 500px; height: 500px;
            background: radial-gradient(circle, #fb923c, #f97316);
            bottom: -140px; right: -100px;
            animation-delay: -7s;
          }
          .about-hero__orb--3 {
            width: 320px; height: 320px;
            background: radial-gradient(circle, #fbbf24, #f97316);
            top: 30%; left: 55%;
            opacity: 0.09;
            animation-delay: -3.5s;
          }
          @keyframes orbDrift {
            0%   { transform: translate(0, 0) scale(1); }
            100% { transform: translate(40px, 30px) scale(1.08); }
          }

          /* Fine grid overlay */
          .about-hero__grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
            background-size: 60px 60px;
          }

          /* Grain texture */
          .about-hero__grain {
            position: absolute;
            inset: 0;
            opacity: 0.035;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 180px 180px;
          }

          /* ── Content ── */
          .about-hero__content {
            position: relative;
            z-index: 10;
            max-width: 780px;
            margin: 0 auto;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* Eyebrow pill */
          .about-hero__eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #fb923c;
            border: 1px solid rgba(251,146,60,0.3);
            background: rgba(251,146,60,0.07);
            padding: 6px 16px;
            border-radius: 100px;
            margin-bottom: 2rem;
            backdrop-filter: blur(8px);
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
          }
          .about-hero__eyebrow-dot {
            width: 5px; height: 5px;
            border-radius: 50%;
            background: #fb923c;
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.4; transform: scale(0.7); }
          }

          /* Main heading */
          .about-hero__heading {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(3rem, 8vw, 6.5rem);
            font-weight: 700;
            line-height: 1.0;
            letter-spacing: -0.02em;
            color: #fff;
            margin: 0 0 1.2rem;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
          }
          .about-hero__heading em {
            font-style: italic;
            color: transparent;
            -webkit-text-stroke: 1.5px #fb923c;
          }

          /* Thin rule */
          .about-hero__rule {
            width: 48px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #fb923c, transparent);
            margin: 0 auto 1.6rem;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
          }

          /* Subheading */
          .about-hero__sub {
            font-family: 'DM Sans', sans-serif;
            font-size: clamp(0.95rem, 2vw, 1.15rem);
            font-weight: 300;
            line-height: 1.75;
            color: rgba(255,255,255,0.55);
            max-width: 560px;
            margin: 0 auto 2.8rem;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
          }

          /* Stats row */
          .about-hero__stats {
            display: flex;
            justify-content: center;
            gap: 0;
            margin-bottom: 3.2rem;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
          }
          .about-hero__stat {
            padding: 0 2.5rem;
            border-right: 1px solid rgba(255,255,255,0.1);
          }
          .about-hero__stat:last-child { border-right: none; }
          .about-hero__stat-num {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.8rem, 4vw, 2.6rem);
            font-weight: 600;
            color: #fb923c;
            line-height: 1;
            margin-bottom: 4px;
          }
          .about-hero__stat-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.35);
          }

          /* CTA */
          .about-hero__cta {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #080808;
            background: linear-gradient(135deg, #fb923c, #f97316);
            padding: 14px 32px;
            border-radius: 100px;
            text-decoration: none;
            box-shadow: 0 8px 32px rgba(249,115,22,0.35);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
          }
          .about-hero__cta:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 14px 40px rgba(249,115,22,0.5);
          }
          .about-hero__cta svg {
            transition: transform 0.2s ease;
          }
          .about-hero__cta:hover svg {
            transform: translateY(4px);
          }

          /* Scroll arrow */
          .about-hero__scroll {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            animation: heroFadeUp 1s ease 0.9s both;
          }
          .about-hero__scroll-line {
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
            animation: scrollLine 1.8s ease-in-out infinite;
          }
          @keyframes scrollLine {
            0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
            50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
            100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
          }
          .about-hero__scroll-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.25);
          }

          /* Decorative corner marks */
          .about-hero__corner {
            position: absolute;
            width: 32px;
            height: 32px;
            z-index: 5;
            opacity: 0.25;
          }
          .about-hero__corner--tl { top: 24px; left: 24px; border-top: 1px solid #fb923c; border-left: 1px solid #fb923c; }
          .about-hero__corner--tr { top: 24px; right: 24px; border-top: 1px solid #fb923c; border-right: 1px solid #fb923c; }
          .about-hero__corner--bl { bottom: 70px; left: 24px; border-bottom: 1px solid #fb923c; border-left: 1px solid #fb923c; }
          .about-hero__corner--br { bottom: 70px; right: 24px; border-bottom: 1px solid #fb923c; border-right: 1px solid #fb923c; }

          /* Responsive */
          @media (max-width: 600px) {
            .about-hero__stats { gap: 0; }
            .about-hero__stat { padding: 0 1.2rem; }
            .about-hero__heading em { -webkit-text-stroke-width: 1px; }
          }
        `}</style>

        {/* Background layers */}
        <div className="about-hero__bg">
          <div className="about-hero__orb about-hero__orb--1" />
          <div className="about-hero__orb about-hero__orb--2" />
          <div className="about-hero__orb about-hero__orb--3" />
          <div className="about-hero__grid" />
          <div className="about-hero__grain" />
        </div>

        {/* Corner decorations */}
        <div className="about-hero__corner about-hero__corner--tl" />
        <div className="about-hero__corner about-hero__corner--tr" />
        <div className="about-hero__corner about-hero__corner--bl" />
        <div className="about-hero__corner about-hero__corner--br" />

        {/* Main content */}
        <div className="about-hero__content">
          <div className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-dot" />
            Est. 2015 · Bangalore, India
          </div>

          <h1 className="about-hero__heading">
            We build what<br />
            <em>matters</em>
          </h1>

          <div className="about-hero__rule" />

          <p className="about-hero__sub">
            From bold web experiences to precise spatial data — 99 Visual turns complex ideas into digital realities that drive real growth.
          </p>

          {/* Stats */}
          <div className="about-hero__stats">
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#about-content" className="about-hero__scroll" aria-label="Scroll down">
          <div className="about-hero__scroll-line" />
          <span className="about-hero__scroll-label">Scroll</span>
        </a>
      </section>

      <div id="about-content">
        <TabAbout />
        <WhyChooseUs />
        <DataPrivacy />
      </div>
      <ContactCTA />
      <Footer />
    </>
  );
}