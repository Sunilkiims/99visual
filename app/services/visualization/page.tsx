import Header from "@/app/components/header";
import Seriously from "@/app/components/seriously";
import Footer from "@/app/components/footer";
import Services from "@/app/components/services";
import ContactCTA from "@/app/components/Contactcta";
import ScrollDown from "@/app/components/scrolldown";
import Chatbot from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader from "@/app/components/PageLoader";
import type { Metadata } from "next";

import { BASE, breadcrumb, webPage, faqSchema } from "@/lib/schema";

/* =====================================================
   SEO METADATA
===================================================== */

export const metadata: Metadata = {
  title: "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
  description:
    "Expert 3D visualization, architectural rendering, CAD modeling, and walkthrough animations. Helping architects, developers & designers make confident decisions with stunning visuals.",
  alternates: {
    canonical: `${BASE}/services/visualization`,
  },
  metadataBase: new URL(BASE),
  keywords: [
    "3D visualization services",
    "architectural rendering services",
    "CAD modeling services",
    "3D walkthrough animation",
    "photorealistic rendering",
    "product visualization",
    "exterior architectural rendering",
    "interior architectural rendering",
    "real estate 3D visualization",
    "building rendering services",
    "construction visualization",
    "architectural visualization studio",
    "3D CAD design services",
    "product design rendering",
    "industrial 3D rendering",
    "mechanical CAD modeling",
    "3D rendering for architects",
    "3D rendering for real estate developers",
    "3D rendering for product designers",
    "99 Visual Solutions",
    "99 Visual",
  ],
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
    type: "website",
    url: `${BASE}/services/visualization`,
    siteName: "99 Visual Solutions",
    locale: "en_US",
    title:
      "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
    description:
      "From photorealistic architectural renders and 3D walkthroughs to precision CAD modeling and product visualization — 99 Visual Solutions turns your concepts into stunning visual realities.",
    images: [
      {
        url: `${BASE}/images/services/visualization-og.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Aligned with the handle used across the rest of the site
    site: "@99VisualSoluti1",
    creator: "@99VisualSoluti1",
    title:
      "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
    description:
      "Photorealistic architectural renders, CAD modeling, product visualization & 3D walkthroughs — crafted for architects, developers & designers worldwide.",
    images: {
      url: `${BASE}/images/services/visualization-og.jpg`,
      alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
    },
  },
};

/* =====================================================
   JSON-LD SCHEMA DATA
===================================================== */

const vizBreadcrumb = breadcrumb([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "3D Visualization", url: "/services/visualization" },
]);

const vizWebPage = webPage({
  url: "/services/visualization",
  name: "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
  description:
    "Expert 3D visualization, architectural rendering, CAD modeling, and walkthrough animations by 99 Visual Solutions.",
});

const vizFaq = faqSchema([
  {
    question: "What types of 3D visualization services do you offer?",
    answer:
      "We offer photorealistic exterior and interior architectural renders, 3D walkthrough animations, product visualization, CAD drafting, BIM modeling, and LiDAR data processing.",
  },
  {
    question: "How long does a typical 3D rendering project take?",
    answer:
      "Turnaround depends on complexity. Single still renders are usually delivered within 3–5 business days; full walkthrough animations typically take 2–4 weeks.",
  },
  {
    question: "Can you work from hand sketches or rough floor plans?",
    answer:
      "Yes. We work from architectural drawings, CAD files, PDF plans, sketches, or even reference photos to produce high-quality renders.",
  },
  {
    question: "Do you serve international clients?",
    answer:
      "Absolutely. We serve architects, real estate developers, and product designers across India, USA, UK, UAE, and Australia.",
  },
]);

/* =====================================================
   HERO SECTION
===================================================== */

function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Hero layout ── */
        .viz-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #080808;
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }

        /* ── Background layers ── */
        .viz-hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: vizOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .viz-hero__orb--1 {
          width: 540px; height: 540px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -160px; left: -100px; opacity: .13;
        }
        .viz-hero__orb--2 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -130px; right: -80px; opacity: .12;
          animation-delay: -8s;
        }
        .viz-hero__orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #06b6d4, #0891b2);
          top: 40%; right: 15%; opacity: .07;
          animation-delay: -4s;
        }
        @keyframes vizOrbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(32px, 24px) scale(1.06); }
        }

        .viz-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .viz-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* ── Corner marks ── */
        .viz-corner {
          position: absolute; width: 28px; height: 28px;
          z-index: 5; opacity: .2; pointer-events: none;
        }
        .viz-corner--tl { top: 24px; left: 24px; border-top: 1px solid #f97316; border-left: 1px solid #f97316; }
        .viz-corner--tr { top: 24px; right: 24px; border-top: 1px solid #f97316; border-right: 1px solid #f97316; }
        .viz-corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid #f97316; border-left: 1px solid #f97316; }
        .viz-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid #f97316; border-right: 1px solid #f97316; }

        /* ── Content ── */
        .viz-hero__content {
          position: relative; z-index: 10;
          max-width: 860px; margin: 0 auto;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes vizFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Breadcrumb */
        .viz-hero__breadcrumb {
          display: flex; align-items: center; gap: 6px;
          justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: .75rem;
          color: rgba(255,255,255,0.3); letter-spacing: .04em;
          margin-bottom: 2rem;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .05s both;
        }
        .viz-hero__breadcrumb a {
          color: #f97316; text-decoration: none; font-weight: 500;
        }
        .viz-hero__breadcrumb a:hover { text-decoration: underline; }
        .viz-hero__breadcrumb span { opacity: .4; }

        /* Eyebrow */
        .viz-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316;
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .viz-hero__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #f97316;
          animation: vizPulse 2s ease-in-out infinite;
        }
        @keyframes vizPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        /* Heading — matches homepage clamp range */
        .viz-hero__h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .viz-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 0.2px #f97316;
        }

        .viz-hero__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .viz-hero__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 2vw, 1.1rem);
          font-weight: 300; line-height: 1.85;
          color: rgba(255,255,255,0.45);
          max-width: 680px; margin: 0 auto 2.6rem;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .viz-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: vizFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .viz-hero__cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }

        /* Scroll indicator */
        .viz-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-decoration: none;
          animation: vizFadeUp .9s ease .8s both;
        }
        .viz-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: vizScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes vizScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .viz-hero__scroll-lbl {
          font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }
      `}</style>

      <section className="viz-hero" aria-label="3D Visualization Services Hero">
        {/* Background — decorative, hidden from AT */}
        <div aria-hidden="true">
          <div className="viz-hero__orb viz-hero__orb--1" />
          <div className="viz-hero__orb viz-hero__orb--2" />
          <div className="viz-hero__orb viz-hero__orb--3" />
          <div className="viz-hero__grid" />
          <div className="viz-hero__grain" />
        </div>

        {/* Corner marks */}
        <div className="viz-corner viz-corner--tl" aria-hidden="true" />
        <div className="viz-corner viz-corner--tr" aria-hidden="true" />
        <div className="viz-corner viz-corner--bl" aria-hidden="true" />
        <div className="viz-corner viz-corner--br" aria-hidden="true" />

        {/* Main content */}
        <div className="viz-hero__content">
          {/* Breadcrumb — visible + semantic */}
          <nav
  className="viz-hero__breadcrumb"
  aria-label="Breadcrumb"
  style={{ display: "none" }}
>
  <a href="/">Home</a>
  <span aria-hidden="true">›</span>
  <a href="/services">Services</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page" style={{ color: "rgba(255,255,255,0.5)" }}>
    3D Visualization
  </span>
</nav>

          <div className="viz-hero__eyebrow" aria-hidden="true">
            <span className="viz-hero__dot" />
            Services · Visualization
          </div>

          <h1 className="viz-hero__h1">
            Transforming concepts<br />
            into visuals that <em>inspire</em>
          </h1>

          <div className="viz-hero__rule" aria-hidden="true" />

          <p className="viz-hero__sub">
            From photorealistic architectural renders and immersive 3D walkthroughs
            to precision CAD modeling — we turn your ideas into stunning visual
            experiences that drive clarity and confidence.
          </p>

          <a href="/contact" className="viz-hero__cta">
            Get a Free Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 2v10M3 8l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Scroll indicator — points to the Services section rendered below */}
        <a
          href="#services"
          className="viz-hero__scroll"
          aria-label="Scroll to services"
        >
          <div className="viz-hero__scroll-line" aria-hidden="true" />
          <span className="viz-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>
    </>
  );
}

/* =====================================================
   PAGE COMPONENT
===================================================== */

export default function VisualizationPage() {
  return (
    <>
      <PageLoader />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vizBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vizWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vizFaq) }}
      />

      <Header />
      <HeroSection />

      {/* id used by hero scroll-indicator and Services component anchor */}
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