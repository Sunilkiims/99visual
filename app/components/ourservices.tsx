// components/ourservices.tsx
// ─────────────────────────────────────────────────────────────────────────────
// "Our Services" homepage section — Server Component (no 'use client')
//
// FIX: All onMouseEnter / onMouseLeave handlers removed.
//      Hover interactivity replaced with injected CSS class rules so the
//      component remains a pure React Server Component compatible with
//      Next.js App Router.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    number:  '01',
    href:    '/services/website-development',
    heading: 'Website & App Development',
    anchor:  'Explore our web & app development services',
    body: `In an era where your digital presence is your first handshake, a slow or
      generic website is a liability. Our full-stack engineering team architects
      responsive, performance-optimised websites and cross-platform mobile
      applications built on modern stacks — React, Next.js, Node.js, Python, and
      Flutter. Every product we ship is engineered for Core Web Vitals excellence,
      ADA accessibility compliance, and seamless third-party integrations. From
      conversion-focused landing pages to complex SaaS platforms and enterprise
      portals, we translate business requirements into scalable digital products
      that engage users and drive measurable growth. We own the full lifecycle:
      discovery, UX research, UI design, development, QA, cloud deployment, and
      ongoing maintenance — so you never juggle multiple vendors.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <line x1="13" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    number:  '02',
    href:    '/services/digital-marketing-seo',
    heading: 'Digital Marketing & SEO',
    anchor:  'Discover our digital marketing and SEO solutions',
    body: `Visibility without intent is noise. We build data-driven digital marketing
      strategies that connect your brand to high-intent audiences across search,
      social, and content channels. Our SEO practice covers comprehensive technical
      audits, structured-data implementation, Core Web Vitals optimisation,
      authoritative link acquisition, and entity-based content strategies designed
      to earn and sustain top-three rankings in competitive SERPs. Beyond organic
      search, we orchestrate paid media campaigns on Google Ads and Meta, conversion
      rate optimisation (CRO) programmes, and analytics pipelines that surface
      actionable insights. Every engagement begins with a clear KPI framework —
      because traffic that does not convert is a vanity metric. We serve B2B and
      B2C brands across India, the USA, UK, UAE, and Australia.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    number:  '03',
    href:    '/services/automation-testing',
    heading: 'QA & Automation Testing',
    anchor:  'Learn about our QA and automation testing capabilities',
    body: `Software defects discovered post-release cost exponentially more than those
      caught during development. Our QA and automation engineers integrate quality
      assurance into every sprint — not as a gate at the end, but as a continuous
      discipline. We design and execute end-to-end test frameworks using Selenium,
      Cypress, Playwright, and Appium, covering functional, regression, performance,
      API, and accessibility testing. Our AI-assisted test generation accelerates
      coverage while reducing manual effort. For enterprises migrating legacy systems
      or shipping high-frequency releases, our shift-left testing methodology
      dramatically reduces time-to-market and production incident rates. We also
      offer independent quality assurance for third-party codebases — giving you an
      impartial technical review before any critical launch or deployment.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <path d="M9 3H5a2 2 0 0 0-2 2v4" />
        <path d="M15 3h4a2 2 0 0 1 2 2v4" />
        <path d="M3 15v4a2 2 0 0 0 2 2h4" />
        <path d="M21 15v4a2 2 0 0 1-2 2h-4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9v-2M12 17v-2M9 12H7M17 12h-2" />
      </svg>
    ),
  },
  {
    number:  '04',
    href:    '/services/it-consulting',
    heading: 'IT Consulting & Strategy',
    anchor:  'See how our IT consulting practice can serve your business',
    body: `Technology investment decisions carry long-term consequences that generic
      playbooks cannot address. Our IT consulting practice provides senior-level
      advisory across cloud architecture, digital transformation roadmaps, technology
      stack selection, cybersecurity posture assessments, and vendor evaluation.
      We work embedded with your leadership team to align IT strategy with commercial
      objectives — identifying inefficiencies, reducing technical debt, and designing
      infrastructure that scales cost-effectively. Whether you are a startup choosing
      your first cloud provider, a mid-market firm modernising a monolithic system,
      or an enterprise planning a multi-year transformation programme, our consultants
      bring cross-industry experience and vendor-neutral recommendations that protect
      your interests. Engagements are structured as fixed-scope advisory, fractional
      CTO support, or long-term retainer partnerships.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    number:  '05',
    href:    '/services/visualization',
    heading: '3D Architectural Visualisation',
    anchor:  'View our 3D visualisation and rendering services',
    body: `Before a single foundation is laid, stakeholders need to believe in what
      they cannot yet see. Our 3D architectural visualisation studio produces
      photorealistic renders, immersive walkthroughs, and virtual staging assets
      that transform technical drawings into compelling narratives. We specialise
      in exterior and interior rendering for residential and commercial real estate,
      hospitality, retail, and infrastructure projects. Our artists work from CAD
      files, SketchUp models, Revit BIM data, or hand-drawn schematics — delivering
      stills, 360° panoramas, and cinematic animations that accelerate project
      approvals, pre-sales, and investor presentations. With competitive offshore
      pricing and international studio quality, clients across the UK, USA, UAE, and
      Australia consistently choose us over local alternatives for complex, high-stakes
      visualisation mandates.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number:  '06',
    href:    '/services/cad-gis-photogrammetry',
    heading: 'CAD, GIS & Photogrammetry',
    anchor:  'Explore our CAD drafting, GIS mapping, and photogrammetry services',
    body: `Precision spatial data is the foundation of informed decision-making in
      construction, infrastructure, urban planning, agriculture, and environmental
      management. Our geospatial team delivers end-to-end CAD drafting and detailing,
      2D and 3D GIS mapping, LiDAR point-cloud processing, drone photogrammetry
      surveys, and as-built documentation. We work with industry-standard platforms
      including AutoCAD, ArcGIS, QGIS, Civil 3D, and Agisoft Metashape to produce
      survey-grade deliverables: topographic maps, terrain models, utility corridor
      plans, and facility management layers. Our photogrammetry workflows generate
      dense mesh models and orthomosaic outputs suitable for engineering design,
      heritage documentation, and insurance assessment. Clients include government
      agencies, engineering consultancies, real estate developers, and mining
      operators across India and internationally.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function OurServices() {
  return (
    <section
      aria-labelledby="services-heading"
      id="services"
      itemScope
      itemType="https://schema.org/Service"
      style={{
        position: 'relative',
        background: '#0a0a0a',
        borderTop:    '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        padding: '6rem 1.5rem 5rem',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── CSS: hover states, fonts, animations — no JS handlers needed ─ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .vs-card {
          background: rgba(255,255,255,0.024);
          border: 1px solid rgba(255,255,255,0.07);
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .vs-card:hover {
          background: rgba(249,115,22,0.05);
          border-color: rgba(249,115,22,0.28);
        }

        .vs-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #f97316;
          text-decoration: none;
          border-bottom: 1px solid rgba(249,115,22,0.35);
          padding-bottom: 2px;
          transition: border-color 0.2s ease, gap 0.2s ease;
        }
        .vs-link:hover {
          border-color: #f97316;
          gap: 10px;
        }

        .vs-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: 100px;
          background: #f97316;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .05em;
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .vs-cta:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          .vs-card, .vs-link, .vs-cta { transition: none !important; }
        }
      `}</style>

      {/* ── Background grid texture ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient glow — top-right ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', borderRadius: '50%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, #f97316, transparent 68%)',
          top: -260, right: -200, opacity: 0.045,
          filter: 'blur(120px)', pointerEvents: 'none',
        }}
      />

      {/* ── Ambient glow — bottom-left ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', borderRadius: '50%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, #6366f1, transparent 68%)',
          bottom: -200, left: -150, opacity: 0.04,
          filter: 'blur(120px)', pointerEvents: 'none',
        }}
      />

      {/* ── Corner brackets ─────────────────────────────────────────────── */}
      {(
        [
          { top: 20,    left: 20,  borderTop:    '1px solid #f97316', borderLeft:   '1px solid #f97316' },
          { top: 20,    right: 20, borderTop:    '1px solid #f97316', borderRight:  '1px solid #f97316' },
          { bottom: 20, left: 20,  borderBottom: '1px solid #f97316', borderLeft:   '1px solid #f97316' },
          { bottom: 20, right: 20, borderBottom: '1px solid #f97316', borderRight:  '1px solid #f97316' },
        ] as React.CSSProperties[]
      ).map((s, i) => (
        <div key={i} aria-hidden="true" style={{ position: 'absolute', width: 22, height: 22, opacity: 0.13, zIndex: 5, ...s }} />
      ))}

      {/* ── Inner wrapper ───────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section header ──────────────────────────────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p
            aria-hidden="true"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 10, fontWeight: 500,
              letterSpacing: '.22em', textTransform: 'uppercase',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,.28)',
              background: 'rgba(249,115,22,.07)',
              padding: '6px 16px', borderRadius: 100,
              marginBottom: '1.4rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#f97316', display: 'inline-block',
              }}
            />
            What We Do
          </p>

          <h2
            id="services-heading"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-.02em',
              color: '#fff',
              margin: '0 0 1rem',
            }}
          >
            Our Services
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: 40, height: 1,
              background: 'linear-gradient(90deg, transparent, #f97316, transparent)',
              margin: '0 auto 1.2rem',
            }}
          />

          <p style={{
            fontSize: '.97rem', fontWeight: 300, lineHeight: 1.8,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: 640, margin: '0 auto',
          }}>
            Six specialised disciplines. One accountable partner. Delivered from
            Bengaluru to clients across India, the USA, UK, UAE, and Australia.
          </p>
        </header>

        {/* ── Service cards grid ──────────────────────────────────────── */}
        <div
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5px',
          }}
        >
          {SERVICES.map((svc) => (
            <article
              key={svc.href}
              role="listitem"
              className="vs-card"
              itemScope
              itemType="https://schema.org/Service"
              style={{
                position: 'relative',
                padding: '2.2rem 2rem 2rem',
              }}
            >
              {/* Service number watermark */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 16, right: 20,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3rem', fontWeight: 700,
                  color: 'rgba(249,115,22,0.07)',
                  lineHeight: 1, userSelect: 'none',
                }}
              >
                {svc.number}
              </span>

              {/* Icon */}
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 48, height: 48, borderRadius: 10,
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.22)',
                  color: '#f97316',
                  marginBottom: '1.2rem',
                }}
              >
                {svc.icon}
              </div>

              {/* Heading */}
              <h3
                itemProp="name"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 .9rem',
                  letterSpacing: '-.01em',
                  lineHeight: 1.25,
                }}
              >
                {svc.heading}
              </h3>

              {/* Body copy */}
              <p
                itemProp="description"
                style={{
                  fontSize: '.88rem',
                  fontWeight: 300,
                  lineHeight: 1.82,
                  color: 'rgba(255,255,255,0.44)',
                  margin: '0 0 1.6rem',
                }}
              >
                {svc.body}
              </p>

              {/* CTA link — descriptive anchor text for SEO */}
              <Link
                href={svc.href}
                itemProp="url"
                aria-label={svc.anchor}
                className="vs-link"
              >
                {svc.anchor}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 12, height: 12, flexShrink: 0 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* ── Closing CTA paragraph ────────────────────────────────────── */}
        <footer
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            padding: '2.4rem 2rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p style={{
            fontSize: '.97rem', fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 680, margin: '0 auto 1.6rem',
          }}>
            Whether you need a single service or an integrated programme spanning
            multiple disciplines, 99 Visual Solutions brings every capability
            in-house — eliminating handoff friction and giving you a single
            accountable partner from strategy through delivery.
          </p>

          <Link
            href="/services"
            aria-label="View all services offered by 99 Visual Solutions"
            className="vs-cta"
          >
            View All Services
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}