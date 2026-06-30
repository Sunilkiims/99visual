// components/ourservices.tsx

import Link from 'next/link';

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
      that engage users and drive measurable growth.`,
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
      actionable insights.`,
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
      coverage while reducing manual effort.`,
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
      infrastructure that scales cost-effectively.`,
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
      hospitality, retail, and infrastructure projects — delivering stills, 360°
      panoramas, and cinematic animations that accelerate project approvals,
      pre-sales, and investor presentations.`,
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
      surveys, and as-built documentation — producing survey-grade deliverables:
      topographic maps, terrain models, utility corridor plans, and facility
      management layers.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
] as const;

export default function OurServices() {
  return (
    <section
      aria-labelledby="services-heading"
      id="services"
      itemScope
      itemType="https://schema.org/Service"
      style={{
        position: 'relative',
        background: '#f8fafc',
        border: '0 !important',
        overflow: 'hidden',
        padding: '0 24px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .vs-card {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 16px;
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .vs-card:hover {
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.08);
        }

        .vs-number {
          position: absolute;
          top: 16px;
          right: 20px;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(249, 115, 22, 0.06);
          line-height: 1;
          user-select: none;
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
          border-bottom: 1px solid rgba(249, 115, 22, 0.3);
          padding-bottom: 2px;
          transition: border-color 0.2s ease, gap 0.2s ease;
        }
        .vs-link:hover {
          border-color: #f97316;
          gap: 10px;
        }

        @property --vs-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes vs-border-spin {
          to { --vs-angle: 360deg; }
        }

        .vs-cta-wrap {
          position: relative;
          display: inline-flex;
          border-radius: 100px;
          padding: 3px;
        }
        .vs-cta-wrap::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 100px;
          background: conic-gradient(
            from var(--vs-angle),
            transparent 0%,
            transparent 60%,
            #f97316 75%,
            #fb923c 85%,
            #f97316 95%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .vs-cta-wrap:hover::before {
          opacity: 1;
          animation: vs-border-spin 2s linear infinite;
        }
        .vs-cta-wrap::after {
          content: '';
          position: absolute;
          inset: 0px;
          border-radius: 100px;
          background: #fff;
          z-index: 1;
          transition: background 0.3s ease;
        }
        .vs-cta-wrap:hover::after {
          background: #fff;
        }
        .vs-cta {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: 100px;
          background: #f97316;
          color: #fff;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .05em;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .vs-cta-wrap:hover .vs-cta {
          background: #000;
          color: #f97316;
          transform: translateY(-1px);
        }

        .vs-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.18);
          color: #f97316;
          margin-bottom: 1.2rem;
        }

        .vs-footer {
          margin-top: 3.5rem;
          text-align: center;
          padding: 2.4rem 2rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .vs-card, .vs-link, .vs-cta { transition: none !important; }
          .vs-cta-wrap::before { animation: none !important; }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 60% 50% at 10% 0%, rgba(249,115,22,0.04) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 40% at 90% 100%, rgba(249,115,22,0.03) 0%, transparent 70%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <header style={{ textAlign: 'center', marginBottom: '3.5rem', paddingTop: '96px' }}>
          <p
            aria-hidden="true"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 10, fontWeight: 500,
              letterSpacing: '.18em', textTransform: 'uppercase',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.2)',
              background: 'rgba(249,115,22,0.08)',
              padding: '5px 14px', borderRadius: 100,
              marginBottom: '1.2rem',
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
            What We Do
          </p>

          <h2
            id="services-heading"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              color: '#0f172a',
              margin: '0 0 8px',
            }}
          >
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Services
            </span>
          </h2>

          <div style={{
            width: 48, height: 3, borderRadius: 2,
            background: 'linear-gradient(to right, #f97316, #fbbf24)',
            margin: '16px auto 20px',
          }} />

          <p style={{
            fontSize: '.97rem', fontWeight: 400, lineHeight: 1.8,
            color: '#475569',
            maxWidth: 600, margin: '0 auto',
          }}>
            Six specialised disciplines. One accountable partner. Delivered from
            Bengaluru to clients across India, the USA, UK, UAE, and Australia.
          </p>
        </header>

        {/* Service cards grid */}
        <div
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '20px',
          }}
        >
          {SERVICES.map((svc) => (
            <article
              key={svc.href}
              role="listitem"
              className="vs-card"
              itemScope
              itemType="https://schema.org/Service"
              style={{ position: 'relative', padding: '2.2rem 2rem 2rem' }}
            >
              <span aria-hidden="true" className="vs-number">{svc.number}</span>
              <div className="vs-icon-wrap">{svc.icon}</div>
              <h3
                itemProp="name"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 .9rem',
                  letterSpacing: '-.01em',
                  lineHeight: 1.25,
                }}
              >
                {svc.heading}
              </h3>
              <p
                itemProp="description"
                style={{
                  fontSize: '.88rem',
                  fontWeight: 400,
                  lineHeight: 1.82,
                  color: '#475569',
                  margin: '0 0 1.6rem',
                }}
              >
                {svc.body}
              </p>
              <Link href={svc.href} itemProp="url" aria-label={svc.anchor} className="vs-link">
                {svc.anchor}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Closing CTA */}
        <footer className="vs-footer">
          <p style={{
            fontSize: '.97rem', fontWeight: 400, lineHeight: 1.85,
            color: '#475569',
            maxWidth: 640, margin: '0 auto 1.6rem',
          }}>
            Whether you need a single service or an integrated programme spanning
            multiple disciplines, 99 Visual Solutions brings every capability
            in-house — eliminating handoff friction and giving you a single
            accountable partner from strategy through delivery.
          </p>
          <div className="vs-cta-wrap">
            <Link href="/services" aria-label="View all services offered by 99 Visual Solutions" className="vs-cta">
              View All Services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </footer>

      </div>
    </section>
  );
}