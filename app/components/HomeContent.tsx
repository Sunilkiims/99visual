// app/components/HomeContent.tsx
'use client';

import { useState } from 'react';
import PageLoader        from './PageLoader';
import Header           from './header';
import HomeScreenSlider from './homeslider';
import WhyWeAre         from './whyweare';
import Story            from './Story';
import Marqueee         from './marquee';
import OurServices      from './ourservices';
import WeServe          from './weserve';
import Footer           from './footer';
import ScrollDown       from './scrolldown';
import Chatbot          from './chatbot';
import Whatsappbutton   from './wahtsappbutton';

interface HomeContentProps {
  insights: React.ReactNode;
}

export default function HomeContent({ insights }: HomeContentProps) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <PageLoader onComplete={() => setReady(true)} />}

      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
        aria-hidden={!ready}
      >
        {/* 1. Navigation */}
        <Header />

        {/* 2. Hero slider */}
        <HomeScreenSlider />

        {/* 3. Why We Are + Industries We Serve */}
        <WhyWeAre />

        {/* 4. Brand story strip */}
        <Story />

        {/* 5. Marquee — animated keyword/trust strip */}
        <Marqueee />

        {/* 6. About — dark full-width section */}
        <section
          aria-label="About 99 Visual Solutions"
          id="about"
          itemScope
          itemType="https://schema.org/AboutPage"
          style={{
            position: 'relative',
            background: '#000',
            borderTop:    '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
            padding: '6rem 1.5rem',
          }}
        >
          {/* Decorative grid */}
          <div aria-hidden="true" role="presentation" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          {/* Grain texture */}
          <div aria-hidden="true" role="presentation" style={{ position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />

          {/* Orange orb */}
          <div aria-hidden="true" role="presentation" style={{ position: 'absolute', borderRadius: '50%', width: 420, height: 420, background: 'radial-gradient(circle, #f97316, transparent 70%)', top: -160, right: -100, opacity: 0.08, filter: 'blur(120px)', pointerEvents: 'none' }} />

          {/* Indigo orb */}
          <div aria-hidden="true" role="presentation" style={{ position: 'absolute', borderRadius: '50%', width: 300, height: 300, background: 'radial-gradient(circle, #6366f1, transparent 70%)', bottom: -120, left: -80, opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />

          {/* Corner accents */}
          {([
            { top: 20,    left: 20,  borderTop:    '1px solid #f97316', borderLeft:   '1px solid #f97316' },
            { top: 20,    right: 20, borderTop:    '1px solid #f97316', borderRight:  '1px solid #f97316' },
            { bottom: 20, left: 20,  borderBottom: '1px solid #f97316', borderLeft:   '1px solid #f97316' },
            { bottom: 20, right: 20, borderBottom: '1px solid #f97316', borderRight:  '1px solid #f97316' },
          ] as React.CSSProperties[]).map((s, i) => (
            <div key={i} aria-hidden="true" role="presentation" style={{ position: 'absolute', width: 22, height: 22, opacity: 0.15, zIndex: 5, ...s }} />
          ))}

          {/* Visually-hidden breadcrumb for crawlers */}
          <nav aria-label="Breadcrumb" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6 }} itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" aria-current="page" style={{ color: '#f97316', textDecoration: 'none' }}>
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
            </ol>
          </nav>

          {/* Main copy — typography aligned with the Who We Are section */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>

            <p aria-label="Global IT and Digital Transformation company" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: '#f97316', border: '1px solid rgba(249,115,22,.25)', background: 'rgba(249,115,22,.07)', padding: '5px 14px', borderRadius: 100, marginBottom: '1.4rem' }}>
              <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', animation: 'homePulse 2s ease-in-out infinite', display: 'inline-block' }} />
              Global IT &amp; Digital Transformation
            </p>

            <h1 itemProp="name" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.1rem, 4.2vw, 3.1rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-.02em', color: '#fff', margin: '0 0 .7rem' }}>
              We Don&apos;t Just Build Technology.{' '}
              <em style={{ fontStyle: 'italic', color: '#f97316' }}>We Build What&apos;s Next.</em>
            </h1>

            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.02rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', margin: '0 0 1.6rem', letterSpacing: '-.01em' }}>
              Trusted by Startups &amp; Enterprises Across India, USA, UK, UAE &amp; Australia
            </h2>

            <div aria-hidden="true" style={{ width: 44, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #f97316, #fbbf24)', margin: '0 auto 1.6rem' }} />

            <p itemProp="description" style={{ fontSize: '.98rem', fontWeight: 400, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', maxWidth: 620, margin: '0 auto 1.1rem' }}>
              We believe technology should not just support businesses — it should drive growth, innovation, and long-term success. <strong style={{ color: '#fff', fontWeight: 600 }}>99 Visual Solutions</strong> is a full-service IT solutions and digital transformation company specialising in 3D architectural visualisation, custom web &amp; mobile app development, CAD drafting, GIS mapping, LiDAR data processing, search engine optimisation (SEO), and IT consulting. From startups to large enterprises, we help organisations worldwide build powerful digital ecosystems that perform, scale, and deliver measurable results.
            </p>

            <p style={{ fontSize: '.98rem', fontWeight: 400, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', maxWidth: 620, margin: '0 auto 1.8rem' }}>
              Founded in 2020 and headquartered in Bengaluru, India, our cross-functional team of engineers, designers, and strategists brings deep domain expertise to every project — ensuring faster delivery, competitive pricing, and uncompromising quality across 500+ delivered projects.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" aria-label="Get a free project quote from 99 Visual Solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', borderRadius: 100, background: '#f97316', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', fontWeight: 600, letterSpacing: '.04em', textDecoration: 'none', transition: 'opacity 0.2s ease, transform 0.2s ease' }}>
                Get a Free Quote <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
            @keyframes homePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.6); } }
            @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; } }
            a[href="/contact"]:hover  { opacity: 0.85; transform: translateY(-1px); }
            a[href="/services"]:hover { background: rgba(249,115,22,0.08) !important; border-color: #f97316 !important; }
          `}</style>
        </section>

        {/* 7. Our Services — six service cards */}
        <OurServices />

        {/* 8. WeServe — additional sector/offering strip */}
        <WeServe />

        {/* 9. Insights / Blog — server-rendered, passed as prop */}
        {insights}

        {/* 10. Footer */}
        <Footer />
      </div>

      {/*
        Fixed-position elements OUTSIDE the transformed wrapper.
        Any ancestor with transform !== none becomes the containing block
        for position:fixed children, breaking viewport anchoring.
        Siblings of the wrapper preserve true fixed positioning.
      */}
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}