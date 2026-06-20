// app/components/HomeContent.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client-side wrapper that gates the home page body behind PageLoader.
//
// WHY THIS EXISTS:
//   Previously <PageLoader /> was rendered as a sibling of the rest of the
//   page content inside the (server) Home component. PageLoader is a fixed,
//   full-screen overlay with its own internal timer, so visually it looked
//   like "loader, then page" — but underneath it, the entire page (slider,
//   images, sections) was already mounted and painting the whole time. The
//   loader was only ever masking that work, not gating it, and there was no
//   real handoff between "loader finished" and "page revealed".
//
//   This component fixes that: the page body does not render at all until
//   PageLoader reports completion via onComplete, then it fades/slides in.
//   Result: an actual two-phase reveal instead of two overlapping trees.
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import PageLoader        from './PageLoader';
import Header           from './header';
import HomeScreenSlider from './homeslider';
import Marqueee         from './marquee';
import WhyWeAre         from './whyweare';
import OurServices      from './ourservices';
import WeServe          from './weserve';
import Footer           from './footer';
import ScrollDown       from './scrolldown';
import Chatbot          from './chatbot';
import Whatsappbutton   from './wahtsappbutton';

interface HomeContentProps {
  /**
   * InsightsSection is an async Server Component that queries the database
   * directly via Prisma (lib/prisma.ts → the `pg` driver). It cannot be
   * imported into this file: this file is a Client Component ('use client'
   * below), and importing a module that pulls in `pg` causes Next.js to try
   * bundling the Postgres driver for the browser, which fails the build
   * ("Module not found" on node_modules/pg/...).
   *
   * Instead, page.tsx (a Server Component) renders <InsightsSection />
   * itself and passes the already-rendered element down here as a prop.
   * This is the standard Next.js pattern for embedding a Server Component
   * inside a Client Component's render tree.
   */
  insights: React.ReactNode;
}

export default function HomeContent({ insights }: HomeContentProps) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <PageLoader onComplete={() => setReady(true)} />}

      {/*
        Content is always in the DOM once `ready` is true — we don't
        unmount/remount it, we just reveal it. Kept simple (no animation
        library) and respects prefers-reduced-motion via the global rule
        already defined inside the hero section's own <style> block.

        NOTE: deliberately NO background color on this div anymore.
        A background was previously set here (#080810, matching
        PageLoader's color) to prevent a white flash during the loader→
        content crossfade. But this div wraps the ENTIRE page including
        <Footer>, so that background was visible as a colored strip
        below the footer wherever Footer's own box doesn't fully cover
        it edge-to-edge — exactly the "extra height area below footer"
        artifact being seen. A wrapper spanning the whole page should
        not carry its own backdrop color; each section (header, hero,
        footer, etc.) already owns its own background per your design.
        If a brief flash during the loader handoff still shows, the
        correct fix is a background-color on <html>/<body> in global
        CSS (covers the real viewport edges only, never leaks past any
        single section), not on this in-flow wrapper.

        NOTE: also deliberately NO overflow / minHeight properties — see
        prior history: those caused a horizontal-scrollbar flicker and a
        double/nested scrollbar respectively. This div only ever handles
        opacity + transform for the reveal animation now.
      */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
        aria-hidden={!ready}
      >
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
        {insights}
        <Footer />
        <ScrollDown />
        <Chatbot />
        <Whatsappbutton />
      </div>
    </>
  );
}
