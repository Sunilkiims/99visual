// app/page.tsx

import Header from './components/header';
import HomeScreenSlider from './components/homeslider';
import Marqueee from './components/marquee';
import Poweredbysection from './components/powerdbysection';
import HowWeWork from './components/howwework';
import WhyWeAre from './components/whyweare';
import WeServe from './components/weserve';
import Footer from './components/footer';
import ScrollDown from './components/scrolldown';
import Chatbot from './components/chatbot';
import Whatsappbutton from './components/wahtsappbutton';
import PageLoader from './components/PageLoader';
import type { Metadata } from 'next';

import {
  BASE,
  orgSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumb,
  webPage,
  faqSchema,
} from '@/lib/schema';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: '99 Visual Solutions | 3D Visualisation, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting',
    template: '%s | 99 Visual Solutions',
  },
  description:
    'India-based global IT company delivering 3D visualisation, custom web & app development, CAD drafting, GIS & LiDAR mapping, SEO, and IT consulting to businesses across India, USA, UK, UAE & Australia.',
  keywords: [
    '99 Visual Solutions', '3D Visualisation Company India', 'Architectural 3D Rendering Services',
    'Custom Web Development Company India', 'Mobile App Development India', 'CAD Drafting Services',
    'GIS Mapping Services India', 'LiDAR Data Processing', 'SEO Services India',
    'IT Consulting Company India', 'Digital Transformation India', 'BIM Modelling Services',
    'Offshore IT Services India', 'IT Company Bengaluru', 'Web Development Company USA',
  ],
  metadataBase: new URL(BASE),
  alternates: { canonical: '/' },
  category: 'technology',
  authors: [{ name: '99 Visual Solutions', url: BASE }],
  creator: '99 Visual Solutions',
  publisher: '99 Visual Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: '99 Visual Solutions | 3D Visualisation, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting',
    description:
      'Partner with 99 Visual Solutions for world-class 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting. Trusted by businesses across India, USA, UK, UAE & Australia.',
    url: `${BASE}/`,
    siteName: '99 Visual Solutions',
    images: [{ url: `${BASE}/images/about-og.jpg`, width: 1200, height: 630, alt: '99 Visual Solutions — Global IT & Digital Transformation Company' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '99 Visual Solutions | 3D Visualisation, Web & App Dev, CAD, GIS & IT Consulting',
    description: 'India-headquartered IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally.',
    site: '@99VisualSoluti1',
    creator: '@99VisualSoluti1',
    images: [`${BASE}/images/about-og.jpg`],
  },
};

// ─── Schema data ──────────────────────────────────────────────────────────────
const homeBreadcrumb = breadcrumb([{ name: 'Home', url: '/' }]);

const homeWebPage = webPage({
  url: '/',
  name: '99 Visual Solutions — Global IT & Digital Transformation Company',
  description:
    'Full-service IT company in Bengaluru, India offering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO, and IT consulting globally.',
});

const homeFaq = faqSchema([
  {
    question: 'What services does 99 Visual Solutions offer?',
    answer:
      '99 Visual Solutions offers 3D architectural visualisation, custom web & mobile app development, CAD drafting, GIS & LiDAR mapping, digital marketing & SEO, IT consulting, and AI-powered QA & automation testing.',
  },
  {
    question: 'Where is 99 Visual Solutions based?',
    answer:
      '99 Visual Solutions is headquartered in Bengaluru, Karnataka, India, and serves clients across India, USA, UK, UAE, and Australia.',
  },
  {
    question: 'Does 99 Visual Solutions work with international clients?',
    answer:
      'Yes. We serve startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times.',
  },
  {
    question: 'How can I get a quote from 99 Visual Solutions?',
    answer:
      'You can contact us at 99visual.com/contact or email contact@99visual.com. We typically reply within 24 hours.',
  },
]);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <PageLoader />

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaq) }} />

      <Header />
      <HomeScreenSlider />
      <Marqueee />

      <section
        aria-label="About 99 Visual Solutions"
        style={{
          position: 'relative',
          background: '#0f0f0f',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
          padding: '5rem 1.5rem',
        }}
      >
        {/* Grid overlay */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Grain */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
        {/* Orbs */}
        <div aria-hidden style={{ position: 'absolute', borderRadius: '50%', width: 400, height: 400, background: 'radial-gradient(circle, #f97316, transparent 70%)', top: -160, right: -100, opacity: 0.06, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', borderRadius: '50%', width: 300, height: 300, background: 'radial-gradient(circle, #6366f1, transparent 70%)', bottom: -120, left: -80, opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />
        {/* Corner accents */}
        {[
          { top: 20, left: 20, borderTop: '1px solid #f97316', borderLeft: '1px solid #f97316' },
          { top: 20, right: 20, borderTop: '1px solid #f97316', borderRight: '1px solid #f97316' },
          { bottom: 20, left: 20, borderBottom: '1px solid #f97316', borderLeft: '1px solid #f97316' },
          { bottom: 20, right: 20, borderBottom: '1px solid #f97316', borderRight: '1px solid #f97316' },
        ].map((s, i) => (
          <div key={i} aria-hidden style={{ position: 'absolute', width: 22, height: 22, opacity: 0.15, zIndex: 5, ...s }} />
        ))}

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{ position: 'relative', zIndex: 10, maxWidth: 860, margin: '0 auto 2rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '.04em' }}
        >
          <a href="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 500 }}>Home</a>
        </nav>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 860, margin: '0 auto', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: '#f97316', border: '1px solid rgba(249,115,22,.28)', background: 'rgba(249,115,22,.07)', padding: '6px 16px', borderRadius: 100, marginBottom: '1.6rem', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', animation: 'homePulse 2s ease-in-out infinite', display: 'inline-block' }} />
            Global IT &amp; Digital Transformation
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.6rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#fff', margin: '0 0 1rem' }}>
            We Don&apos;t Just Build Technology.{' '}
            <em style={{ fontStyle: 'italic', color: '#f97316' }}>We Build What&apos;s Next.</em>
          </h1>

          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #f97316, transparent)', margin: '0 auto 1.4rem' }} />

          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(.95rem, 2vw, 1.1rem)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', letterSpacing: '.01em' }}>
            Trusted by Startups &amp; Enterprises Across India, USA, UK, UAE &amp; Australia
          </h2>

          <p style={{ fontSize: '.97rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', maxWidth: 720, margin: '0 auto 1.2rem' }}>
            We believe technology should not just support businesses — it should drive growth, innovation, and long-term success. We are a full-service IT solutions and digital transformation company specialising in{' '}
            <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              3D architectural visualisation, custom web &amp; mobile app development, CAD drafting, GIS mapping, LiDAR data processing, search engine optimisation (SEO), and IT consulting
            </span>
            . From startups to large enterprises, we help organisations worldwide build powerful digital ecosystems that perform, scale, and deliver measurable results.
          </p>

          <p style={{ fontSize: '.97rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', maxWidth: 720, margin: '0 auto' }}>
            Headquartered in India and serving clients globally, our cross-functional team of engineers, designers, and strategists brings deep domain expertise to every project — ensuring faster delivery, competitive pricing, and uncompromising quality.
          </p>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes homePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.6)} }
        `}</style>
      </section>

      <Poweredbysection />
      <HowWeWork />
      <WhyWeAre />
      <WeServe />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}