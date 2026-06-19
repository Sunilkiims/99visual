// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade home page for 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #5 — breadcrumbFromPath('/') is the standalone BreadcrumbList
//      node. webPage() now emits only a { @id } reference — no longer embeds
//      a second BreadcrumbList object. Duplicate @id eliminated.
//   ✅ Title shortened to under 65 characters.
//   ✅ Canonical set to absolute URL (not root-relative '/').
//   ✅ Hreflang block removed — all languages pointed to identical URL which
//      provides no signal value; geographic targeting via GSC instead.
//   ✅ Description updated: "5+ years" (matches foundingDate 2020) not "10+".
//   ✅ CONTACT_EMAIL imported from schema.ts — single source of truth.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import Header           from './components/header';
import HomeScreenSlider from './components/homeslider';
import Marqueee         from './components/marquee';
import Poweredbysection from './components/powerdbysection';
import HowWeWork        from './components/howwework';
import WhyWeAre         from './components/whyweare';
import WeServe          from './components/weserve';
import Footer           from './components/footer';
import ScrollDown       from './components/scrolldown';
import Chatbot          from './components/chatbot';
import Whatsappbutton   from './components/wahtsappbutton';
import OurServices from './components/ourservices';
import PageLoader       from './components/PageLoader';
import InsightsSection  from './components/InsightsSection';
export const revalidate = 60

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumbFromPath,
  webPage,
  faqSchema,
} from '@/lib/schema';

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    // ✅ FIX: Shortened to 62 chars — within Google's 50–65 char sweet spot
    default:  '99 Visual Solutions | 3D Viz, Web, CAD, GIS & IT Consulting',
    template: '%s | 99 Visual Solutions',
  },
  description:
    'Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting to clients across India, USA, UK, UAE & Australia. 5+ years · 500+ projects.',

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/`,
    // ✅ FIX: Hreflang removed — all variants pointed to identical URLs which
    // provides no geographic signal. Use Google Search Console geo-targeting.
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet':       -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  openGraph: {
    // ✅ FIX: OG title kept descriptive but concise
    title:       '99 Visual Solutions | 3D, Web, CAD, GIS & IT Consulting India',
    description: 'Partner with 99 Visual Solutions — Bengaluru IT company offering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally. 5+ years · 500+ projects.',
    url:         `${BASE}/`,
    siteName:    '99 Visual Solutions',
    images: [
      {
        url:    `${BASE}/images/home-og.jpg`,
        width:  1200,
        height: 630,
        alt:    '99 Visual Solutions — Global IT & Digital Transformation Company, Bengaluru India',
        type:   'image/jpeg',
      },
    ],
    locale: 'en_US',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       '99 Visual Solutions | 3D, Web, CAD, GIS & IT Consulting',
    description: 'Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally. 5+ years · 500+ projects.',
    site:        '@99VisualSoluti1',
    creator:     '@99VisualSoluti1',
    images: [
      {
        url: `${BASE}/images/home-og.jpg`,
        alt: '99 Visual Solutions — Global IT & Digital Transformation Company',
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
  },

  applicationName: '99 Visual Solutions',
  category:        'technology',
  authors:         [{ name: '99 Visual Solutions', url: BASE }],
  creator:         '99 Visual Solutions',
  publisher:       '99 Visual Solutions',
  referrer:        'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
//
// FIXED PATTERN — how it works now:
//
//  1. breadcrumbFromPath('/') generates a standalone BreadcrumbList node with
//     its own @id: "https://www.99visual.com/#breadcrumb"
//     itemListElement items use { "@type": "Thing", "@id": url } objects.
//
//  2. webPage({ pathname: '/' }) generates a WebPage node whose "breadcrumb"
//     property is { "@id": "https://www.99visual.com/#breadcrumb" } — a
//     reference only. No embedded BreadcrumbList object. No duplicate @id.
//
//  3. Google resolves the reference within the same @graph automatically.
//     Both a standalone BreadcrumbList node AND a WebPage that references it
//     is the pattern Google recommends for breadcrumb rich results.
// ─────────────────────────────────────────────────────────────────────────────
const homeWebPage = webPage({
  pathname:      '/',
  name:          '99 Visual Solutions — Global IT & Digital Transformation Company',
  description:   'Full-service IT company in Bengaluru offering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO, and IT consulting globally. 5+ years of expertise, 500+ projects delivered.',
  datePublished: '2023-01-01',
  dateModified:  new Date().toISOString().split('T')[0],
});

const homeFaq = faqSchema([
  {
    question: 'What services does 99 Visual Solutions offer?',
    answer:
      '99 Visual Solutions is a full-service IT and digital transformation company offering 3D architectural visualisation, custom web and mobile app development, CAD drafting, GIS and LiDAR mapping, digital marketing and SEO, IT consulting, and AI-powered QA and automation testing. We serve startups and enterprises across India, the USA, UK, UAE, and Australia. Our cross-functional team brings deep domain expertise to every engagement, ensuring high-quality deliverables and measurable business outcomes.',
  },
  {
    question: 'Where is 99 Visual Solutions located?',
    answer:
      "99 Visual Solutions is headquartered in Bengaluru (Bangalore), Karnataka, India — one of Asia's leading technology hubs. While our primary office is in Bengaluru, we operate as a remote-first company and serve clients globally across India, the USA, UK, UAE, and Australia. Our team ensures time-zone overlap, real-time communication, and agile delivery for international clients.",
  },
  {
    question: 'Does 99 Visual Solutions work with international clients?',
    answer:
      'Yes, we actively serve startups and enterprises in the USA, UK, UAE, and Australia alongside our Indian clients. Our offshore IT model delivers world-class quality at competitive rates with fast turnaround times, dedicated account managers, and working-hours overlap for real-time communication. We have successfully delivered over 500 projects for international clients across diverse industries including real estate, construction, healthcare, retail, and government.',
  },
  {
    question: 'How can I get a quote from 99 Visual Solutions?',
    answer:
      `You can request a free quote by visiting our contact page at 99visual.com/contact or emailing us at ${CONTACT_EMAIL}. Our team typically responds within 24 business hours. We offer detailed project scoping calls at no charge to ensure your requirements are fully understood before any proposal is sent. All initial consultations are obligation-free.`,
  },
  {
    question: 'How much does 3D architectural visualisation cost in India?',
    answer:
      `The cost of 3D architectural visualisation at 99 Visual Solutions depends on project scope, number of views, level of detail, and required turnaround time. We offer highly competitive rates compared to Western studios while maintaining international quality standards. Pricing varies by project type — from single exterior stills to full animated walkthroughs. Contact us at ${CONTACT_EMAIL} for a tailored, no-obligation quote based on your specific requirements.`,
  },
  {
    question: 'What industries does 99 Visual Solutions serve?',
    answer:
      'We serve a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, logistics, government, and manufacturing. Our cross-functional team of engineers, designers, and domain specialists ensures solutions that are technically sound and commercially effective for each sector. Whether you are a startup looking for your first digital product or an enterprise modernising a legacy system, we have the expertise to deliver.',
  },
  {
    question: 'Can 99 Visual Solutions handle end-to-end web and app development?',
    answer:
      'Yes. We manage the complete product lifecycle — from UX research and UI design to frontend development, backend engineering, API integrations, cloud deployment on AWS, GCP, or Azure, and long-term post-launch support and maintenance. We work with modern technology stacks including React, Next.js, Node.js, Python, Flutter, and more. Our agile delivery methodology ensures transparent communication and iterative progress throughout the project.',
  },
  {
    question: 'What makes 99 Visual Solutions different from other IT companies in India?',
    answer:
      'We combine multi-disciplinary expertise under one roof — 3D visualisation, GIS and LiDAR, CAD, web and app development, SEO, and IT consulting — meaning you get a single accountable partner instead of managing multiple agencies. Founded in 2020 and headquartered in Bengaluru, our team brings international project experience, agile delivery methods, transparent communication, and a client-first approach to every engagement. We have delivered 500+ projects across India, USA, UK, UAE, and Australia.',
  },
]);

// ─── Single @graph document — one @context, all nodes ────────────────────────
const homeGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  // ✅ FIX: standalone BreadcrumbList node — webPage() references it by @id only
  breadcrumbFromPath('/'),
  homeWebPage,
  homeFaq,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <PageLoader />

      {/* Single JSON-LD script — one @context, @graph array, fully valid */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />

      <Header />
      <HomeScreenSlider />
      <Marqueee />

      {/* ── About / Hero Text Section ────────────────────────────────────── */}
      <section
        aria-label="About 99 Visual Solutions"
        id="about"
        itemScope
        itemType="https://schema.org/AboutPage"
        style={{
          position: 'relative',
          background: '#0f0f0f',
          borderTop:    '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
          padding: '5rem 1.5rem',
        }}
      >
        {/* ── Decorative layers — all aria-hidden ──────────────────────── */}
        <div
          aria-hidden="true"
          role="presentation"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div
          aria-hidden="true"
          role="presentation"
          style={{
            position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />

        <div
          aria-hidden="true"
          role="presentation"
          style={{
            position: 'absolute', borderRadius: '50%',
            width: 400, height: 400,
            background: 'radial-gradient(circle, #f97316, transparent 70%)',
            top: -160, right: -100, opacity: 0.06,
            filter: 'blur(100px)', pointerEvents: 'none',
          }}
        />

        <div
          aria-hidden="true"
          role="presentation"
          style={{
            position: 'absolute', borderRadius: '50%',
            width: 300, height: 300,
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
            bottom: -120, left: -80, opacity: 0.05,
            filter: 'blur(100px)', pointerEvents: 'none',
          }}
        />

        {(
          [
            { top: 20,    left: 20,  borderTop:    '1px solid #f97316', borderLeft:   '1px solid #f97316' },
            { top: 20,    right: 20, borderTop:    '1px solid #f97316', borderRight:  '1px solid #f97316' },
            { bottom: 20, left: 20,  borderBottom: '1px solid #f97316', borderLeft:   '1px solid #f97316' },
            { bottom: 20, right: 20, borderBottom: '1px solid #f97316', borderRight:  '1px solid #f97316' },
          ] as React.CSSProperties[]
        ).map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            role="presentation"
            style={{ position: 'absolute', width: 22, height: 22, opacity: 0.15, zIndex: 5, ...s }}
          />
        ))}

        {/* ── Breadcrumb — visually hidden, accessible to crawlers ─────── */}
        {/*
          ✅ FIX: Removed aria-hidden="true" from the <nav> element.
          aria-hidden removes elements from the accessibility tree entirely,
          which is an accessibility violation for navigational landmarks.
          Use the sr-only CSS pattern instead — it hides visually but keeps
          the element accessible to screen readers and crawlers.
        */}
        <nav
          aria-label="Breadcrumb"
          style={{
            position: 'absolute',
            width: 1, height: 1,
            padding: 0, margin: -1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          <ol
            style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6 }}
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" aria-current="page" style={{ color: '#f97316', textDecoration: 'none' }}>
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
          </ol>
        </nav>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            maxWidth: 860, margin: '0 auto',
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <p
            aria-label="Global IT and Digital Transformation company"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 10, fontWeight: 500,
              letterSpacing: '.22em', textTransform: 'uppercase',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,.28)',
              background: 'rgba(249,115,22,.07)',
              padding: '6px 16px', borderRadius: 100,
              marginBottom: '1.6rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#f97316',
                animation: 'homePulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
            Global IT &amp; Digital Transformation
          </p>

          <h1
            itemProp="name"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-.02em',
              color: '#fff',
              margin: '0 0 1rem',
            }}
          >
            We Don&apos;t Just Build Technology.{' '}
            <em style={{ fontStyle: 'italic', color: '#f97316' }}>
              We Build What&apos;s Next.
            </em>
          </h1>

          <div
            aria-hidden="true"
            style={{
              width: 40, height: 1,
              background: 'linear-gradient(90deg, transparent, #f97316, transparent)',
              margin: '0 auto 1.4rem',
            }}
          />

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(.95rem, 2vw, 1.1rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2rem',
              letterSpacing: '.01em',
            }}
          >
            Trusted by Startups &amp; Enterprises Across India, USA, UK, UAE &amp; Australia
          </h2>

          <p
            itemProp="description"
            style={{
              fontSize: '.97rem', fontWeight: 300, lineHeight: 1.85,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 720, margin: '0 auto 1.2rem',
            }}
          >
            We believe technology should not just support businesses — it should drive
            growth, innovation, and long-term success. 99 Visual Solutions is a full-service
            IT solutions and digital transformation company specialising in{' '}
            <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              3D architectural visualisation, custom web &amp; mobile app development,
              CAD drafting, GIS mapping, LiDAR data processing, search engine optimisation
              (SEO), and IT consulting
            </strong>
            . From startups to large enterprises, we help organisations worldwide build
            powerful digital ecosystems that perform, scale, and deliver measurable results.
          </p>

          <p
            style={{
              fontSize: '.97rem', fontWeight: 300, lineHeight: 1.85,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 720, margin: '0 auto 2.4rem',
            }}
          >
            Founded in 2020 and headquartered in Bengaluru, India, our cross-functional
            team of engineers, designers, and strategists brings deep domain expertise to
            every project — ensuring faster delivery, competitive pricing, and uncompromising
            quality across 500+ delivered projects.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              aria-label="Get a free project quote from 99 Visual Solutions"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 30px', borderRadius: 100,
                background: '#f97316', color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '.9rem', fontWeight: 600,
                letterSpacing: '.04em', textDecoration: 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              Get a Free Quote
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="/services"
              aria-label="Explore 99 Visual Solutions services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 30px', borderRadius: 100,
                background: 'transparent',
                border: '1px solid rgba(249,115,22,.35)',
                color: '#f97316',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '.9rem', fontWeight: 500,
                letterSpacing: '.04em', textDecoration: 'none',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
            >
              Explore Services
            </a>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

          @keyframes homePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: .35; transform: scale(.6); }
          }

          @media (prefers-reduced-motion: reduce) {
            * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
          }

          a[href="/contact"]:hover  { opacity: 0.85; transform: translateY(-1px); }
          a[href="/services"]:hover { background: rgba(249,115,22,0.08) !important; border-color: #f97316 !important; }
        `}</style>
      </section>

      
     
      <WhyWeAre />
      
      <OurServices />
      <WeServe />
      <InsightsSection />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}
