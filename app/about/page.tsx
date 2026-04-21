import type { Metadata } from "next";
import Script from "next/script";
import Header from "../components/header";
import Footer from "../components/footer";
import TabAbout from "../components/tabstory";
import WhyChooseUs from "../components/whychooseus";
import DataPrivacy from "../components/dataprivacy";

export const metadata: Metadata = {
  title: "About 99 Visual | IT, Web & 3D Visualization Company in Bangalore, India",
  description:
    "99 Visual is a Bangalore-based IT solutions company specializing in web development, SEO, digital marketing, 3D visualization, CAD/GIS, and QA testing.",
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/about" },
};

// ✅ Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.99visual.com/#organization",
  name: "99Visual",
  alternateName: "99 Visual Solutions",
  url: "https://www.99visual.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.99visual.com/images/logo.png",
  },
  foundingDate: "2015",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/99visual",
    "https://www.linkedin.com/company/99visual",
    "https://www.instagram.com/99visual",
  ],
};

// ✅ Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.99visual.com/#website",
  url: "https://www.99visual.com",
  name: "99Visual",
  publisher: {
    "@id": "https://www.99visual.com/#organization",
  },
};

// ✅ WebPage Schema
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.99visual.com/about#webpage",
  url: "https://www.99visual.com/about",
  name: "About 99Visual",
  isPartOf: {
    "@id": "https://www.99visual.com/#website",
  },
  about: {
    "@id": "https://www.99visual.com/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.99visual.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.99visual.com/about",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ✅ JSON-LD */}
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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

      <Footer />
    </>
  );
}