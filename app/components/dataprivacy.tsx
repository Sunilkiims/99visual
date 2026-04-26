'use client';

import { ShieldCheck, Eye, LockKeyhole, Server, AlertTriangle, FileCheck2 } from 'lucide-react';

const points = [
  {
    icon: <ShieldCheck size={18} />,
    title: 'Enterprise-Grade Protection',
    text: 'We implement advanced encryption, secure cloud infrastructure, and strict access control to keep your data safe at every level.',
  },
  {
    icon: <FileCheck2 size={18} />,
    title: 'Global Compliance',
    text: 'Your privacy is our priority. We follow globally recognized data protection practices that give you full control and visibility into how your information is managed — securely and ethically.',
  },
  {
    icon: <Eye size={18} />,
    title: 'Transparency & Trust',
    text: "We're honest about how data is collected, used, and stored — because your trust means everything to us.",
  },
  {
    icon: <LockKeyhole size={18} />,
    title: 'Access Control & Employee Training',
    text: 'All 99Visual employees are trained on privacy best practices. Access is strictly role-based and monitored.',
  },
  {
    icon: <Server size={18} />,
    title: 'Secure Infrastructure',
    text: 'We operate on a security-first cloud infrastructure featuring continuous vulnerability scanning, auto-patching, and robust firewall protection.',
  },
  {
    icon: <AlertTriangle size={18} />,
    title: 'Real-Time Monitoring',
    text: '24/7 threat detection tools identify suspicious activity before it becomes a risk — ensuring proactive protection at all times.',
  },
];

export default function DataPrivacy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:         #080808;
          --c-surface:    #0f0f0f;
          --c-surface2:   #141414;
          --c-border:     rgba(255,255,255,0.07);
          --c-orange:     #f97316;
          --c-orange-dim: rgba(249,115,22,0.12);
          --c-muted:      rgba(255,255,255,0.45);
          --c-muted2:     rgba(255,255,255,0.65);
          --ff-serif:     'Cormorant Garamond', serif;
          --ff-sans:      'DM Sans', sans-serif;
        }

        /* ── SECTION ── */
        .dp-section {
          position: relative;
          background: var(--c-surface);
          overflow: hidden;
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
        }

        .dp-section__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .dp-section__grain {
          position: absolute; inset: 0; opacity: .025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .dp-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .dp-orb--1 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -160px; right: -120px; opacity: .06;
        }
        .dp-orb--2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -120px; left: -80px; opacity: .05;
        }

        .dp-corner {
          position: absolute; width: 22px; height: 22px; z-index: 5; opacity: .15;
        }
        .dp-corner--tl { top: 20px; left: 20px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .dp-corner--tr { top: 20px; right: 20px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .dp-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .dp-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        .dp-inner {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
        }

        /* ── HEADER ── */
        .dp-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .dp-header__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.6rem;
          backdrop-filter: blur(8px);
        }
        .dp-header__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: dpPulse 2s ease-in-out infinite;
        }
        @keyframes dpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }
        .dp-header__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
        }
        .dp-header__h2 em {
          font-style: italic; color: var(--c-orange);
        }
        .dp-header__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.4rem;
        }
        .dp-header__sub {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: var(--c-muted);
          max-width: 560px; margin: 0 auto;
        }

        /* ── CARDS GRID ── */
        .dp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) { .dp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .dp-grid { grid-template-columns: 1fr; } }

        .dp-card {
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 16px;
          padding: 2rem 1.75rem;
          position: relative; overflow: hidden;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .dp-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,.5), transparent);
          opacity: 0; transition: opacity .25s ease;
        }
        .dp-card:hover {
          border-color: rgba(249,115,22,.25);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,.4);
        }
        .dp-card:hover::before { opacity: 1; }

        .dp-card__icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--c-orange-dim);
          border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-orange);
          margin-bottom: 1.2rem; flex-shrink: 0;
        }
        .dp-card__title {
          font-family: var(--ff-sans); font-size: .95rem; font-weight: 600;
          color: #fff; margin-bottom: .5rem;
        }
        .dp-card__rule {
          width: 24px; height: 1px;
          background: linear-gradient(90deg, var(--c-orange), transparent);
          margin-bottom: 1rem;
        }
        .dp-card__text {
          font-family: var(--ff-sans); font-size: .85rem;
          font-weight: 300; line-height: 1.78; color: var(--c-muted);
        }

        /* ── CTA ── */
        .dp-cta {
          text-align: center;
          margin-top: 4rem;
        }
        .dp-cta__note {
          font-family: var(--ff-sans); font-size: .85rem;
          font-style: italic; color: var(--c-muted);
          margin-bottom: 1.2rem;
        }
        .dp-cta__btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .dp-cta__btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }
      `}</style>

      <section className="dp-section">
        {/* BG */}
        <div className="dp-section__grid" />
        <div className="dp-section__grain" />
        <div className="dp-orb dp-orb--1" />
        <div className="dp-orb dp-orb--2" />

        {/* Corners */}
        <div className="dp-corner dp-corner--tl" />
        <div className="dp-corner dp-corner--tr" />
        <div className="dp-corner dp-corner--bl" />
        <div className="dp-corner dp-corner--br" />

        <div className="dp-inner">

          {/* Header */}
          <div className="dp-header">
            <div className="dp-header__eyebrow">
              <span className="dp-header__dot" />
              Security & Privacy
            </div>
            <h2 className="dp-header__h2">
              Data Privacy &amp; <em>Security Measures</em>
            </h2>
            <div className="dp-header__rule" />
            <p className="dp-header__sub">
              At 99 Visual, your data is not just protected — it is prioritized. Discover how we keep your information private and secure.
            </p>
          </div>

          {/* Cards */}
          <div className="dp-grid">
            {points.map((item, i) => (
              <div key={i} className="dp-card">
                <div className="dp-card__icon">{item.icon}</div>
                <div className="dp-card__title">{item.title}</div>
                <div className="dp-card__rule" />
                <p className="dp-card__text">{item.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="dp-cta">
            <p className="dp-cta__note">Your privacy is our promise. Want more details?</p>
            <a href="mailto:contact@99visual.com" className="dp-cta__btn">
              Contact Our Security Team
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}