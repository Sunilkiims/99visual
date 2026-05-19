'use client';

// app/components/footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Footer — 99 Visual Solutions
//
// DESIGN SYSTEM: Matches the dark editorial aesthetic across all service pages.
//   • Fonts  : Cormorant Garamond (display) + DM Sans (body) — same as pages
//   • Accent : #f97316 orange — single source of truth
//   • Base   : #080808 background, #0f0f0f surface, rgba(255,255,255,0.07) borders
//   • Motion : CSS-only — orb drift, fade-up on mount, hover micro-interactions
//
// CHANGES (v2):
//   ✅ Removed UI/UX Design from Services
//   ✅ Added Contact to Company nav
//   ✅ Removed Blog from Company nav
//   ✅ Renamed "Digital Marketing" → "Digital Marketing & SEO"
//   ✅ Updated Digital Marketing URL → /services/digital-marketing-seo
//   ✅ Renamed "3D Visualisation" → "Visualization"
//   ✅ Updated Visualization URL → /services/visualization
// ─────────────────────────────────────────────────────────────────────────────

import React, { FormEvent, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_COMPANY = [
  { label: 'About',   href: '/about'   },
  { label: 'Careers', href: '/careers' },
  { label: 'Partner', href: '/partner' },
  { label: 'Contact', href: '/contact' }, // ✅ Added; Blog removed
];

const NAV_SERVICES = [
  { label: 'Web Development',          href: '/services/web-development'        },
  // UI/UX Design removed ✅
  { label: 'Visualization',            href: '/services/visualization'          }, // ✅ Renamed + new URL
  { label: 'Digital Marketing & SEO',  href: '/services/digital-marketing-seo'  }, // ✅ Renamed + new URL
  { label: 'QA & Automation',          href: '/services/automation-testing'     },
  { label: 'CAD & GIS',                href: '/services/cad-gis-photogrammetry' },
];

const NAV_SUPPORT = [
  { label: 'Contact',        href: '/contact'        },
  { label: 'Help Centre',    href: '/help-center'    },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use',   href: '/terms'          },
];

const SOCIALS = [
  {
    label:    'Facebook',
    href:     'https://www.facebook.com/profile.php?id=100093639888151',
    icon:     FaFacebookF,
    hoverBg:  '#1877f2',
  },
  {
    label:    'X (Twitter)',
    href:     'https://x.com/99VisualSoluti1',
    icon:     FaXTwitter,
    hoverBg:  '#e7e7e7',
    hoverColor: '#000',
  },
  {
    label:    'Instagram',
    href:     'https://www.instagram.com/99visualsolutions/',
    icon:     FaInstagram,
    hoverBg:  'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
  },
  {
    label:    'LinkedIn',
    href:     'https://www.linkedin.com/company/99-visual-solutions/',
    icon:     FaLinkedinIn,
    hoverBg:  '#0a66c2',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [visible,   setVisible]   = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Staggered entrance animation
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    try {
      const res    = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const result = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Tokens ──────────────────────────────────────────────────── */
        .ft {
          --ft-bg:      #080808;
          --ft-surface: #0d0d0d;
          --ft-border:  rgba(255,255,255,0.07);
          --ft-orange:  #f97316;
          --ft-muted:   rgba(255,255,255,0.38);
          --ft-mid:     rgba(255,255,255,0.6);
          --ff-serif:   'Cormorant Garamond', serif;
          --ff-sans:    'DM Sans', sans-serif;
        }

        /* ── Shell ───────────────────────────────────────────────────── */
        .ft {
          position: relative;
          background: var(--ft-bg);
          border-top: 1px solid var(--ft-border);
          overflow: hidden;
        }

        /* Background orbs — identical technique to page heroes */
        .ft__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          animation: ftOrbDrift 20s ease-in-out infinite alternate;
        }
        .ft__orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -180px; left: -100px; opacity: .06;
        }
        .ft__orb--2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -140px; right: -80px; opacity: .07;
          animation-delay: -10s;
        }
        @keyframes ftOrbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(28px, 20px) scale(1.05); }
        }

        /* Dot grid */
        .ft__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,.6) 30%, rgba(0,0,0,.6) 70%, transparent);
        }

        /* ── Main body ───────────────────────────────────────────────── */
        .ft__body {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 5rem 2rem 0;
        }

        /* Top row: brand col + nav cols */
        .ft__grid-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 1024px) {
          .ft__grid-top { grid-template-columns: 1fr 1fr; gap: 2.5rem 3rem; }
        }
        @media (max-width: 560px) {
          .ft__grid-top { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* ── Entrance animation ─────────────────────────────────────── */
        .ft__col {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
        }
        .ft--visible .ft__col { opacity: 1; transform: translateY(0); }
        .ft__col:nth-child(1) { transition-delay: 0s;    }
        .ft__col:nth-child(2) { transition-delay: .08s;  }
        .ft__col:nth-child(3) { transition-delay: .14s;  }
        .ft__col:nth-child(4) { transition-delay: .20s;  }

        /* ── Brand column ────────────────────────────────────────────── */
        .ft__logo-img {
          display: block;
          width: auto;
          height: 56px;
          max-width: 200px;
          object-fit: contain;
          margin: 0 0 .75rem;
          /* Lighten the dark background of the PNG so it blends on --ft-bg */
          filter: brightness(1.08) drop-shadow(0 2px 12px rgba(99,102,241,.18));
          transition: filter .25s ease, transform .25s ease;
        }
        .ft__logo-img:hover {
          filter: brightness(1.15) drop-shadow(0 4px 20px rgba(249,115,22,.25));
          transform: translateY(-1px);
        }
        .ft__tagline {
          font-family: var(--ff-sans);
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(255,255,255,.45);
          margin: 0 0 1.6rem;
          display: flex;
          align-items: center;
          gap: 10px;
          /* Subtle shimmer sweep across the text */
          background: linear-gradient(
            90deg,
            rgba(255,255,255,.35) 0%,
            rgba(249,115,22,.9)   40%,
            rgba(255,255,255,.35) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ftTaglineShimmer 4s linear infinite;
        }
        @keyframes ftTaglineShimmer {
          0%   { background-position: 200% center; }
          100% { background-position:   0% center; }
        }

        /* Premium heartbeat dot */
        .ft__tagline-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ft-orange);
          flex-shrink: 0;
          position: relative;
          animation: ftPulse 2s cubic-bezier(.4,0,.6,1) infinite;
          box-shadow:
            0 0 0   0   rgba(249,115,22,.9),
            0 0 4px 1px rgba(249,115,22,.3);
        }
        /* Ripple ring */
        .ft__tagline-dot::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 1px solid rgba(249,115,22,.4);
          animation: ftRipple 2s cubic-bezier(.4,0,.6,1) infinite;
          opacity: 0;
        }
        .ft__tagline-dot:last-of-type {
          animation-delay: 1s;
        }
        .ft__tagline-dot:last-of-type::after {
          animation-delay: 1s;
        }
        @keyframes ftPulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(249,115,22,.8), 0 0 4px 1px rgba(249,115,22,.3); }
          50%       { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(249,115,22,0),   0 0 5px 1px rgba(249,115,22,.15); }
        }
        @keyframes ftRipple {
          0%   { transform: scale(1);   opacity: .5; }
          100% { transform: scale(2.2); opacity: 0;  }
        }
        .ft__desc {
          font-family: var(--ff-sans);
          font-size: .88rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--ft-muted);
          margin: 0 0 2rem;
          max-width: 280px;
        }

        /* Social icons */
        .ft__socials {
          display: flex;
          gap: .6rem;
          list-style: none;
          padding: 0; margin: 0;
        }
        .ft__social-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid var(--ft-border);
          background: rgba(255,255,255,.04);
          color: var(--ft-mid);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem;
          text-decoration: none;
          transition: transform .2s ease, background .2s ease,
                      color .2s ease, border-color .2s ease,
                      box-shadow .2s ease;
        }
        .ft__social-btn:hover {
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(0,0,0,.4);
        }
        .ft__social-btn--fb:hover  { background: #1877f2; color: #fff; }
        .ft__social-btn--tw:hover  { background: #e7e7e7; color: #000; }
        .ft__social-btn--ig:hover  { background: linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: #fff; }
        .ft__social-btn--li:hover  { background: #0a66c2; color: #fff; }

        /* ── Nav columns ────────────────────────────────────────────── */
        .ft__nav-heading {
          font-family: var(--ff-sans);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--ft-orange);
          margin: 0 0 1.4rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ft__nav-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(249,115,22,.3), transparent);
        }
        .ft__nav-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: .55rem;
        }
        .ft__nav-link {
          font-family: var(--ff-sans);
          font-size: .88rem;
          font-weight: 300;
          color: var(--ft-muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color .2s ease, gap .2s ease;
          position: relative;
        }
        .ft__nav-link::before {
          content: '';
          width: 0;
          height: 1px;
          background: var(--ft-orange);
          transition: width .25s cubic-bezier(.22,1,.36,1);
          display: inline-block;
          flex-shrink: 0;
        }
        .ft__nav-link:hover {
          color: #fff;
          gap: 10px;
        }
        .ft__nav-link:hover::before { width: 12px; }

        /* ── Newsletter column ─────────────────────────────────────── */
        .ft__nl-desc {
          font-family: var(--ff-sans);
          font-size: .88rem;
          font-weight: 300;
          line-height: 1.75;
          color: var(--ft-muted);
          margin: 0 0 1.4rem;
        }
        .ft__nl-form {
          display: flex;
          flex-direction: column;
          gap: .6rem;
        }
        .ft__nl-input-wrap {
          position: relative;
        }
        .ft__nl-input {
          width: 100%;
          background: rgba(255,255,255,.05);
          border: 1px solid var(--ft-border);
          border-radius: 10px;
          padding: 11px 44px 11px 14px;
          font-family: var(--ff-sans);
          font-size: .88rem;
          font-weight: 300;
          color: #fff;
          outline: none;
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
          box-sizing: border-box;
        }
        .ft__nl-input::placeholder { color: rgba(255,255,255,.25); }
        .ft__nl-input:focus {
          border-color: rgba(249,115,22,.5);
          background: rgba(249,115,22,.04);
          box-shadow: 0 0 0 3px rgba(249,115,22,.1);
        }
        .ft__nl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--ff-sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
          box-shadow: 0 6px 24px rgba(249,115,22,.3);
        }
        .ft__nl-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(249,115,22,.5);
        }
        .ft__nl-btn:disabled { opacity: .6; cursor: not-allowed; }
        .ft__nl-status {
          font-family: var(--ff-sans);
          font-size: .8rem;
          font-weight: 400;
          margin: .2rem 0 0;
          line-height: 1.5;
          animation: ftStatusIn .3s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes ftStatusIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ft__nl-status--ok    { color: #4ade80; }
        .ft__nl-status--error { color: #f87171; }

        /* Spinner */
        .ft__spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(0,0,0,.25);
          border-top-color: #000;
          border-radius: 50%;
          animation: ftSpin .6s linear infinite;
          flex-shrink: 0;
        }
        @keyframes ftSpin { to { transform: rotate(360deg); } }

        /* ── Divider ────────────────────────────────────────────────── */
        .ft__divider {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 4rem auto 0;
          padding: 0 2rem;
        }
        .ft__divider-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--ft-border) 20%,
            rgba(249,115,22,.2) 50%,
            var(--ft-border) 80%,
            transparent
          );
        }

        /* ── Bottom bar ─────────────────────────────────────────────── */
        .ft__bottom {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 1.6rem 2rem 2.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .ft__copy {
          font-family: var(--ff-sans);
          font-size: .78rem;
          font-weight: 300;
          color: rgba(255,255,255,.25);
          line-height: 1.5;
        }
        .ft__copy strong {
          color: rgba(255,255,255,.45);
          font-weight: 500;
        }
        .ft__legal {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-right: 4.5rem;
        }
        .ft__legal-link {
          font-family: var(--ff-sans);
          font-size: .78rem;
          font-weight: 300;
          color: rgba(255,255,255,.25);
          text-decoration: none;
          transition: color .2s ease;
        }
        .ft__legal-link:hover { color: rgba(255,255,255,.65); }

        /* ── Reduced motion ─────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <footer
        ref={footerRef}
        className={`ft${visible ? ' ft--visible' : ''}`}
        role="contentinfo"
        aria-label="Site footer"
      >
        {/* Background */}
        <div className="ft__orb ft__orb--1" aria-hidden="true" />
        <div className="ft__orb ft__orb--2" aria-hidden="true" />
        <div className="ft__grid"           aria-hidden="true" />

        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="ft__body">
          <div className="ft__grid-top">

            {/* ── Brand ─────────────────────────────────────────── */}
            <div className="ft__col">
              <Link href="/" aria-label="99 Visual Solutions — home">
                <img
                  src="/logo.png"
                  alt="99 Visual Solutions"
                  className="ft__logo-img"
                  width={200}
                  height={56}
                />
              </Link>
              <span className="ft__tagline">
                Digital
                <span className="ft__tagline-dot" aria-hidden="true" />
                Design
                <span className="ft__tagline-dot" aria-hidden="true" />
                Innovation
              </span>
              <p className="ft__desc">
                Empowering digital journeys through next-generation technology,
                intelligent automation, and exceptional creative design.
              </p>

              <ul className="ft__socials" aria-label="Social media links">
                {[
                  { label: 'Facebook',    href: 'https://www.facebook.com/profile.php?id=100093639888151', Icon: FaFacebookF,  cls: 'fb' },
                  { label: 'X (Twitter)', href: 'https://x.com/99VisualSoluti1',                           Icon: FaXTwitter,   cls: 'tw' },
                  { label: 'Instagram',   href: 'https://www.instagram.com/99visualsolutions/',             Icon: FaInstagram,  cls: 'ig' },
                  { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/99-visual-solutions/',    Icon: FaLinkedinIn, cls: 'li' },
                ].map(({ label, href, Icon, cls }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ft__social-btn ft__social-btn--${cls}`}
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Company nav ───────────────────────────────────── */}
            <nav className="ft__col" aria-label="Company links">
              <h3 className="ft__nav-heading">Company</h3>
              <ul className="ft__nav-list">
                {NAV_COMPANY.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="ft__nav-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Services nav ──────────────────────────────────── */}
            <nav className="ft__col" aria-label="Services links">
              <h3 className="ft__nav-heading">Services</h3>
              <ul className="ft__nav-list">
                {NAV_SERVICES.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="ft__nav-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Newsletter ────────────────────────────────────── */}
            <div className="ft__col">
              <h3 className="ft__nav-heading">Newsletter</h3>
              <p className="ft__nl-desc">
                Insights that drive innovation and technology.
              </p>

              <form
                onSubmit={handleSubmit}
                className="ft__nl-form"
                aria-label="Newsletter subscription form"
                noValidate
              >
                <div className="ft__nl-input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="ft__nl-input"
                    aria-label="Email address for newsletter"
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="ft__nl-btn"
                  disabled={loading || submitted}
                  aria-label={loading ? 'Subscribing…' : 'Subscribe to newsletter'}
                >
                  {loading ? (
                    <>
                      <span className="ft__spinner" aria-hidden="true" />
                      Subscribing…
                    </>
                  ) : submitted ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2 6.5L5.2 9.5L11 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                {submitted && !loading && (
                  <p className="ft__nl-status ft__nl-status--ok" role="status" aria-live="polite">
                    You&apos;re on the list — welcome aboard.
                  </p>
                )}
                {error && (
                  <p className="ft__nl-status ft__nl-status--error" role="alert" aria-live="assertive">
                    {error}
                  </p>
                )}
              </form>
            </div>

          </div>{/* /.ft__grid-top */}
        </div>{/* /.ft__body */}

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div className="ft__divider" aria-hidden="true">
          <div className="ft__divider-line" />
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="ft__bottom">
          <p className="ft__copy">
            &copy; {new Date().getFullYear()} <strong>99 Visual Solutions</strong>.
            {' '}All rights reserved.
          </p>
          <nav className="ft__legal" aria-label="Legal links">
            <Link href="/privacy-policy" className="ft__legal-link">Privacy Policy</Link>
            <Link href="/terms"          className="ft__legal-link">Terms of Use</Link>
          </nav>
        </div>

      </footer>
    </>
  );
};

export default Footer;