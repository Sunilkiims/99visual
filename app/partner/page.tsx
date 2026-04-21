import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaHandshake, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Partner With 99  Visual | Agency, Technology & Business Collaboration India",
  description:
    "Partner with 99 Visual — a trusted digital agency in India offering white-label web development, 3D visualization, SEO, and digital marketing partnerships. Scale globally with expert collaboration.",
  keywords: [
    "Partner with 99 Visual", "Business Partnership India", "Digital Agency Partnership India",
    "White Label Web Development India", "Outsource Web Development India", "White Label SEO Services India",
    "White Label Digital Marketing", "Technology Partnership Agency", "Creative Agency Collaboration",
    "B2B Partnership Agency India", "IT Consulting Partnership", "Startup Collaboration India",
    "3D Visualization Partnership", "Web Development Collaboration", "SEO Agency Partnership",
    "Digital Marketing Collaboration", "Global Digital Agency Partner", "Strategic Business Partnerships",
    "Agency Collaboration Services", "99 Visual Partners", "99 Visual Collaboration",
  ],
  openGraph: {
    title: "Partner With 99 Visual | White-Label & Business Collaboration - India",
    description: "Join 99 Visual's partner ecosystem for white-label web development, 3D visualization, SEO, and digital marketing. Build strategic collaborations and scale your business globally.",
    url: "https://www.99visual.com/partner",
    siteName: "99 Visual Solutions",
    images: [{ url: "https://www.99visual.com/images/og/partner-og.jpg", width: 1200, height: 630, alt: "Partner With 99Visual - Business Collaboration & Growth Opportunities" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With 99 Visual | Agency & Business Collaboration India",
    description: "Looking for a reliable digital partner in India? Join 99 Visual for white-label web development, 3D visualization, SEO & digital marketing collaborations.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/partner-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/partner" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  authors: [{ name: "99 Visual Solutions", url: "https://www.99visual.com" }],
  category: "Technology",
};

const partnerTypes = [
  { icon: FaHandshake, accent: "#f97316", label: "Business Partners", desc: "Collaborate with enterprises to deliver tailored IT and visualization solutions at scale." },
  { icon: FaGlobe,     accent: "#22d3ee", label: "Global Partners",   desc: "Expand your reach with international collaborations and worldwide digital impact." },
  { icon: FaUsers,     accent: "#a78bfa", label: "Technology Partners", desc: "Work with innovators to build next-gen digital transformation solutions." },
  { icon: FaLightbulb, accent: "#fbbf24", label: "Creative Partners", desc: "Partner with agencies and designers to create unforgettable digital experiences." },
];

const whyItems = [
  { num: "01", title: "Trusted Expertise", desc: "Proven depth in web development, IT consulting, 3D visualization, and performance marketing." },
  { num: "02", title: "Global Network",    desc: "Strong collaborations with clients and partners across industries on every continent." },
  { num: "03", title: "Innovation Driven", desc: "Constantly evolving with cutting-edge technologies and data-backed growth strategies." },
];

export default function PartnersPage() {
  return (
    <>
      <Header />

      {/* ── JSON-LD blocks (unchanged) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Organization","@id":"https://www.99visual.com/#organization",
        "name":"99 Visual Solutions","url":"https://www.99visual.com",
        "logo":{"@type":"ImageObject","url":"https://www.99visual.com/images/logo.png","width":200,"height":60},
        "description":"99 Visual Solutions is a digital agency in India offering partnership opportunities in web development, 3D visualization, SEO, and digital marketing.",
        "foundingLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressCountry":"IN"}},
        "areaServed":"Worldwide",
        "sameAs":["https://twitter.com/99visual","https://www.linkedin.com/company/99visual"],
        "contactPoint":{"@type":"ContactPoint","contactType":"Partnership Enquiry","url":"https://www.99visual.com/contact","areaServed":"Worldwide","availableLanguage":"English"},
      })}} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Shared tokens ─── */
        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ─── HERO ─── */
        .p-hero {
          position: relative;
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }
        .p-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .p-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: pOrbDrift 16s ease-in-out infinite alternate;
        }
        .p-hero__orb--1 { width:560px;height:560px; background:radial-gradient(circle,#f97316,#ea580c); top:-180px;left:-120px; opacity:.16; }
        .p-hero__orb--2 { width:420px;height:420px; background:radial-gradient(circle,#fb923c,#f97316); bottom:-120px;right:-80px; opacity:.12; animation-delay:-8s; }
        @keyframes pOrbDrift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(36px,28px) scale(1.07)} }

        .p-hero__grid {
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .p-hero__grain {
          position:absolute;inset:0;opacity:.03;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px 180px;
        }

        .p-hero__content {
          position:relative;z-index:10;max-width:760px;margin:0 auto;
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes pFadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }

        .p-hero__eyebrow {
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;
          color:var(--c-orange);
          border:1px solid rgba(249,115,22,.28);
          background:rgba(249,115,22,.07);
          padding:6px 16px;border-radius:100px;
          margin-bottom:1.8rem;backdrop-filter:blur(8px);
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .p-hero__dot { width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:pPulse 2s ease-in-out infinite; }
        @keyframes pPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .p-hero__h1 {
          font-family:var(--ff-serif);
          font-size:clamp(3rem,8.5vw,6.8rem);
          font-weight:700;line-height:1.0;letter-spacing:-.02em;
          color:#fff;margin:0 0 1.1rem;
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .p-hero__h1 em { font-style:italic;color:transparent;-webkit-text-stroke:1.5px var(--c-orange); }

        .p-hero__rule {
          width:48px;height:1px;
          background:linear-gradient(90deg,transparent,var(--c-orange),transparent);
          margin:0 auto 1.5rem;
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .p-hero__sub {
          font-family:var(--ff-sans);font-size:clamp(.95rem,2vw,1.12rem);
          font-weight:300;line-height:1.75;color:var(--c-muted);
          max-width:520px;margin:0 auto 2.6rem;
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .p-hero__cta {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          color:#080808;
          background:linear-gradient(135deg,#fb923c,#f97316);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          box-shadow:0 8px 32px rgba(249,115,22,.35);
          transition:transform .2s ease,box-shadow .2s ease;
          animation: pFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .p-hero__cta:hover { transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5); }

        .p-hero__scroll {
          position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
          z-index:20;display:flex;flex-direction:column;align-items:center;gap:6px;
          text-decoration:none;animation: pFadeUp .9s ease .8s both;
        }
        .p-hero__scroll-line {
          width:1px;height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:pScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes pScrollLine {
          0%  {transform:scaleY(0);transform-origin:top;opacity:1}
          50% {transform:scaleY(1);transform-origin:top;opacity:1}
          100%{transform:scaleY(1);transform-origin:bottom;opacity:0}
        }
        .p-hero__scroll-lbl {
          font-family:var(--ff-sans);font-size:9px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.22);
        }

        /* corner marks */
        .p-corner {
          position:absolute;width:28px;height:28px;z-index:5;opacity:.2;
        }
        .p-corner--tl{top:24px;left:24px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .p-corner--tr{top:24px;right:24px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .p-corner--bl{bottom:64px;left:24px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .p-corner--br{bottom:64px;right:24px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ─── PARTNER TYPES ─── */
        .p-types {
          background:var(--c-surface);
          padding:6rem 1.5rem;
        }
        .p-section-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;
          color:var(--c-orange);margin-bottom:.8rem;
        }
        .p-section-h2 {
          font-family:var(--ff-serif);
          font-size:clamp(2rem,4vw,3.2rem);
          font-weight:700;line-height:1.1;letter-spacing:-.015em;
          color:#fff;margin-bottom:1rem;
        }
        .p-section-sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);max-width:480px;
        }
        .p-types__header { text-align:center;margin:0 auto 4rem; }
        .p-types__grid {
          display:grid;gap:1.5px;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          max-width:1100px;margin:0 auto;
          border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;
        }
        .p-type-card {
          position:relative;
          background:var(--c-bg);
          padding:2.4rem 2rem;
          transition:background .25s ease;
          cursor:default;
        }
        .p-type-card:hover { background:#111; }
        .p-type-card__icon-wrap {
          width:48px;height:48px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:1.4rem;font-size:1.2rem;
          background:rgba(255,255,255,.04);
          border:1px solid var(--c-border);
          transition:transform .2s ease;
        }
        .p-type-card:hover .p-type-card__icon-wrap { transform:scale(1.1); }
        .p-type-card__title {
          font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;
          color:#fff;margin-bottom:.6rem;letter-spacing:-.01em;
        }
        .p-type-card__desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .p-type-card__line {
          position:absolute;bottom:0;left:0;right:0;height:2px;
          opacity:0;transition:opacity .25s ease;
        }
        .p-type-card:hover .p-type-card__line { opacity:1; }

        /* ─── WHY PARTNER ─── */
        .p-why {
          background:var(--c-bg);
          padding:6rem 1.5rem;
        }
        .p-why__inner { max-width:1100px;margin:0 auto; }
        .p-why__layout {
          display:grid;gap:4rem;
          grid-template-columns:1fr 1fr;
          align-items:start;
        }
        @media(max-width:768px){ .p-why__layout{grid-template-columns:1fr;} }
        .p-why__items { display:flex;flex-direction:column;gap:0; }
        .p-why__item {
          padding:2rem 0;
          border-bottom:1px solid var(--c-border);
          display:flex;gap:1.5rem;align-items:flex-start;
        }
        .p-why__item:first-child { border-top:1px solid var(--c-border); }
        .p-why__num {
          font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;
          color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;
        }
        .p-why__item-title {
          font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;
          color:#fff;margin-bottom:.4rem;
        }
        .p-why__item-desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .p-why__visual {
          position:relative;
          background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));
          border:1px solid rgba(249,115,22,.15);
          border-radius:20px;padding:2.5rem;
          display:flex;flex-direction:column;gap:1.2rem;
        }
        .p-why__stat {
          display:flex;flex-direction:column;
        }
        .p-why__stat-num {
          font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);
          font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;
        }
        .p-why__stat-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);
        }
        .p-why__divider { height:1px;background:var(--c-border); }

        /* ─── CTA ─── */
        .p-cta {
          position:relative;
          background:var(--c-surface);
          padding:7rem 1.5rem;
          text-align:center;overflow:hidden;
        }
        .p-cta__orb {
          position:absolute;width:600px;height:600px;
          border-radius:50%;filter:blur(110px);opacity:.12;
          background:radial-gradient(circle,#f97316,transparent);
          top:50%;left:50%;transform:translate(-50%,-50%);
          pointer-events:none;
        }
        .p-cta__content { position:relative;z-index:10;max-width:640px;margin:0 auto; }
        .p-cta__h2 {
          font-family:var(--ff-serif);
          font-size:clamp(2.2rem,5vw,4rem);
          font-weight:700;line-height:1.05;letter-spacing:-.02em;
          color:#fff;margin-bottom:1.2rem;
        }
        .p-cta__h2 em { font-style:italic;color:var(--c-orange); }
        .p-cta__sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);margin-bottom:2.4rem;
        }
        .p-cta__btn {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          color:#fff;
          border:1px solid rgba(249,115,22,.4);
          background:rgba(249,115,22,.1);
          backdrop-filter:blur(12px);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          transition:all .2s ease;
        }
        .p-cta__btn:hover {
          background:var(--c-orange);color:#080808;border-color:var(--c-orange);
          transform:translateY(-2px);box-shadow:0 12px 36px rgba(249,115,22,.4);
        }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="p-hero">
        <div className="p-hero__bg">
          <div className="p-hero__orb p-hero__orb--1" />
          <div className="p-hero__orb p-hero__orb--2" />
          <div className="p-hero__grid" />
          <div className="p-hero__grain" />
        </div>

        <div className="p-corner p-corner--tl" />
        <div className="p-corner p-corner--tr" />
        <div className="p-corner p-corner--bl" />
        <div className="p-corner p-corner--br" />

        <div className="p-hero__content">
          <div className="p-hero__eyebrow">
            <span className="p-hero__dot" />
            Strategic Collaboration · India & Global
          </div>

          <h1 className="p-hero__h1">
            Grow <em>together</em><br />with us
          </h1>

          <div className="p-hero__rule" />

          <p className="p-hero__sub">
            We collaborate with agencies, startups, and enterprises to deliver scalable, future-ready digital solutions — built on trust and shared ambition.
          </p>

          <Link href="#services" className="p-hero__cta">
            Become a Partner
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <a href="#services" className="p-hero__scroll" aria-label="Scroll down">
          <div className="p-hero__scroll-line" />
          <span className="p-hero__scroll-lbl">Scroll</span>
        </a>
      </section>

      {/* ══════════════════════════════
          PARTNER TYPES
      ══════════════════════════════ */}
      <section id="services" className="p-types">
        <div className="p-types__header">
          <p className="p-section-label">What we offer</p>
          <h2 className="p-section-h2">Types of Partnerships</h2>
          <p className="p-section-sub" style={{ margin: "0 auto" }}>
            Four distinct models — each designed to meet you where you are and grow where you're going.
          </p>
        </div>

        <div className="p-types__grid">
          {partnerTypes.map(({ icon: Icon, accent, label, desc }) => (
            <div className="p-type-card" key={label}>
              <div className="p-type-card__icon-wrap" style={{ color: accent }}>
                <Icon />
              </div>
              <div className="p-type-card__title">{label}</div>
              <div className="p-type-card__desc">{desc}</div>
              <div className="p-type-card__line" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          WHY PARTNER
      ══════════════════════════════ */}
      <section className="p-why">
        <div className="p-why__inner">
          <div className="p-why__layout">

            {/* Left: numbered items */}
            <div>
              <p className="p-section-label">Why us</p>
              <h2 className="p-section-h2" style={{ marginBottom: "2.5rem" }}>
                Why partner<br />with 99 Visual?
              </h2>
              <div className="p-why__items">
                {whyItems.map(({ num, title, desc }) => (
                  <div className="p-why__item" key={num}>
                    <span className="p-why__num">{num}</span>
                    <div>
                      <div className="p-why__item-title">{title}</div>
                      <div className="p-why__item-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stats card */}
            <div className="p-why__visual">
              <div className="p-why__stat">
                <div className="p-why__stat-num">10+</div>
                <div className="p-why__stat-label">Years of expertise</div>
              </div>
              <div className="p-why__divider" />
              <div className="p-why__stat">
                <div className="p-why__stat-num">500+</div>
                <div className="p-why__stat-label">Projects delivered</div>
              </div>
              <div className="p-why__divider" />
              <div className="p-why__stat">
                <div className="p-why__stat-num">30+</div>
                <div className="p-why__stat-label">Global partners</div>
              </div>
              <div className="p-why__divider" />
              <div className="p-why__stat">
                <div className="p-why__stat-num">6</div>
                <div className="p-why__stat-label">Core service domains</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="p-cta">
        <div className="p-cta__orb" />
        <div className="p-cta__content">
          <h2 className="p-cta__h2">
            Let's build the<br /><em>future</em> together
          </h2>
          <p className="p-cta__sub">
            Join our ecosystem and grow your business through strategic, long-term collaboration with a team that's invested in your success.
          </p>
          <Link href="/contact" className="p-cta__btn">
            Partner With Us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}