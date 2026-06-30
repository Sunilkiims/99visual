'use client';

import { useEffect, useRef, useState } from 'react';

interface ContactCTAProps {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
  contactPath?: string;
}

/**
 * ContactCTA — Updated Premium Black Theme
 * No router dependency. Works with Next.js, React Router, or plain React.
 *
 * Props:
 *   headline    — override the main heading
 *   subtext     — override the supporting line
 *   buttonLabel — override the CTA button text
 *   contactPath — href to navigate to (default: "/contact")
 */
export default function ContactCTA({
  headline = "Let's build something remarkable.",
  subtext = "Whether you have a brief or just an idea — we turn ambition into results that last.",
  buttonLabel = "Start a conversation",
  contactPath = "/contact",
}: ContactCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');

        .xcta-wrap {
          background: #080808;
          width: 100%;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Outfit', sans-serif;
          position: relative;
        }

        .xcta-topbar {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #1a1a1a 0%, #c2540f 40%, #f97316 55%, #c2540f 70%, #1a1a1a 100%);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .xcta-wrap.xcta-in .xcta-topbar {
          transform: scaleX(1);
        }

        @keyframes xctaRise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes xctaPop {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .xcta-anim {
          opacity: 0;
        }
        .xcta-wrap.xcta-in .xcta-anim {
          animation: xctaRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .xcta-wrap.xcta-in .xcta-anim--pop {
          animation-name: xctaPop;
        }

        .xcta-d1 { animation-delay: 0.05s; }
        .xcta-d2 { animation-delay: 0.15s; }
        .xcta-d3 { animation-delay: 0.25s; }
        .xcta-d4 { animation-delay: 0.35s; }
        .xcta-d5 { animation-delay: 0.45s; }
        .xcta-d6 { animation-delay: 0.55s; }
        .xcta-d7 { animation-delay: 0.65s; }

        @media (prefers-reduced-motion: reduce) {
          .xcta-anim, .xcta-topbar {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        .xcta-body {
          padding: 4.5rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .xcta-left {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .xcta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          width: fit-content;
        }
        .xcta-badge-line {
          width: 32px;
          height: 1px;
          background: #f97316;
        }
        .xcta-badge-text {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #f97316;
          font-weight: 400;
        }

        .xcta-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4.5vw, 52px);
          font-weight: 700;
          color: #f0ebe0;
          margin: 0 0 6px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .xcta-headline em {
          font-style: italic;
          font-weight: 400;
          color: #f97316;
        }

        .xcta-sub {
          font-size: 15px;
          color: #555;
          margin: 18px 0 0;
          line-height: 1.7;
          max-width: 460px;
          font-weight: 300;
        }

        .xcta-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          flex-shrink: 0;
          min-width: 240px;
        }

        .xcta-stats {
          display: flex;
          gap: 28px;
          margin-bottom: 4px;
        }
        .xcta-stat {
          text-align: center;
        }
        .xcta-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #f97316;
          line-height: 1;
          display: block;
        }
        .xcta-stat-label {
          font-size: 10px;
          color: #3a3a3a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: block;
          margin-top: 4px;
        }
        .xcta-stat-divider {
          width: 1px;
          background: #1e1e1e;
          align-self: stretch;
        }

        .xcta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #f97316;
          color: #080808;
          border: none;
          padding: 15px 34px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          justify-content: center;
          transition: background 0.2s, letter-spacing 0.2s;
          position: relative;
          overflow: hidden;
        }
        .xcta-btn-primary::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: #fdba74;
          transform: scaleX(0);
          transition: transform 0.25s;
        }
        .xcta-btn-primary:hover {
          background: #fb923c;
          letter-spacing: 0.14em;
        }
        .xcta-btn-primary:hover::after {
          transform: scaleX(1);
        }

        .xcta-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #3a3a3a;
          border: 1px solid #1e1e1e;
          padding: 14px 28px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          transition: color 0.2s, border-color 0.2s;
        }
        .xcta-btn-ghost:hover {
          color: #f97316;
          border-color: #f97316;
        }

        .xcta-reassure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
        }
        .xcta-reassure-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #f97316;
          opacity: 0.6;
        }
        .xcta-reassure-text {
          font-size: 11px;
          color: #2e2e2e;
          letter-spacing: 0.06em;
        }

        .xcta-bottombar {
          width: 100%;
          height: 1px;
          background: #111;
        }

        @media (max-width: 700px) {
          .xcta-body {
            grid-template-columns: 1fr;
            padding: 3rem 1.5rem;
            gap: 2rem;
          }
          .xcta-right {
            align-items: stretch;
            min-width: unset;
          }
          .xcta-stats {
            justify-content: flex-start;
          }
        }
      `}</style>

      <section ref={sectionRef} className={`xcta-wrap ${isVisible ? 'xcta-in' : ''}`}>
        <div className="xcta-topbar" />

        <div className="xcta-body">
          <div className="xcta-left">
            <div className="xcta-badge xcta-anim xcta-d1">
              <span className="xcta-badge-line" />
              <span className="xcta-badge-text">Work with us</span>
            </div>
            <h2 className="xcta-headline xcta-anim xcta-d2">
              Let's build something <em>remarkable.</em>
            </h2>
            <p className="xcta-sub xcta-anim xcta-d3">{subtext}</p>
          </div>

          <div className="xcta-right">
            <div className="xcta-stats xcta-anim xcta-d3">
              <div className="xcta-stat">
                <span className="xcta-stat-num">500+</span>
                <span className="xcta-stat-label">Clients</span>
              </div>
              <div className="xcta-stat-divider" />
              <div className="xcta-stat">
                <span className="xcta-stat-num">98%</span>
                <span className="xcta-stat-label">Satisfied</span>
              </div>
              <div className="xcta-stat-divider" />
              <div className="xcta-stat">
                <span className="xcta-stat-num">24h</span>
                <span className="xcta-stat-label">Reply</span>
              </div>
            </div>

            <a href={contactPath} className="xcta-btn-primary xcta-anim xcta-anim--pop xcta-d4">
              {buttonLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href={contactPath} className="xcta-btn-ghost xcta-anim xcta-anim--pop xcta-d5">
              Schedule a free call
            </a>

            <div className="xcta-reassure xcta-anim xcta-d6">
              <span className="xcta-reassure-dot" />
              <span className="xcta-reassure-text">No obligation · Confidential</span>
              <span className="xcta-reassure-dot" />
            </div>
          </div>
        </div>

        <div className="xcta-bottombar" />
      </section>
    </>
  );
}

/*
  ─── Usage ───────────────────────────────────────────────────────────────────

  import ContactCTA from "./ContactCTA";

  // Default — drop anywhere:
  <ContactCTA />

  // Custom per service page:
  <ContactCTA
    headline="Let's build your brand identity."
    subtext="Premium design that commands attention and converts visitors into clients."
    buttonLabel="Start a project"
    contactPath="/contact"
  />

  // Next.js soft navigation (optional):
  // Replace <a href={contactPath}> with <Link href={contactPath}> from "next/link"
*/