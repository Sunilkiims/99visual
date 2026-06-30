'use client';

import { useEffect, useRef, useState } from 'react';

export default function WhoWeAre() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .wwa-section {
          position: relative;
          overflow: hidden;
          padding: 6rem 1.5rem 0;
          background: #f8fafc;
        }

        .wwa-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(15,23,42,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%);
        }

        .wwa-orb {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none;
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -160px; left: -120px; opacity: .08;
        }

        .wwa-inner {
          position: relative; z-index: 10;
          max-width: 760px; margin: 0 auto;
          text-align: center;
        }

        /* ---- Left column: copy ---- */
        .wwa-copy {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wwa-animate {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
        }
        .wwa-section--visible .wwa-animate { opacity: 1; transform: translateY(0); }

        .wwa-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316;
          border: 1px solid rgba(249,115,22,.25);
          background: rgba(249,115,22,.07);
          padding: 5px 14px; border-radius: 100px;
          margin-bottom: 1.4rem;
        }
        .wwa-eyebrow__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #f97316; display: inline-block;
          animation: wwaPulse 2s ease-in-out infinite;
        }
        @keyframes wwaPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }

        .wwa-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.1rem, 4.2vw, 3.1rem);
          font-weight: 700; line-height: 1.12; letter-spacing: -.02em;
          color: #0f172a;
          margin: 0 0 .7rem;
        }
        .wwa-h2 em { font-style: italic; color: #f97316; }

        .wwa-subhead {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.02rem; font-weight: 500;
          color: #475569;
          margin: 0 0 1.6rem;
          letter-spacing: -.01em;
        }

        .wwa-rule {
          width: 44px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          margin: 0 auto 1.6rem;
        }

        .wwa-p {
          font-family: 'DM Sans', sans-serif;
          font-size: .98rem; font-weight: 400; line-height: 1.9;
          max-width: 620px; margin: 0 auto 1.1rem;
          color: #475569;
        }
        .wwa-p:last-of-type { margin-bottom: 1.8rem; }
        .wwa-p strong { color: #0f172a; font-weight: 600; }

        .wwa-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem; font-weight: 600;
          letter-spacing: .01em;
          color: #0f172a;
          padding-top: .4rem;
          border-top: 1px solid rgba(15,23,42,.08);
          display: inline-block;
        }
        .wwa-tagline span { color: #f97316; }

        @media (prefers-reduced-motion: reduce) {
          .wwa-animate { transition: none !important; opacity: 1 !important; transform: none !important; }
          .wwa-eyebrow__dot { animation: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`wwa-section${isVisible ? ' wwa-section--visible' : ''}`}
        aria-labelledby="who-we-are-heading"
      >
        <div className="wwa-grid" aria-hidden="true" />
        <div className="wwa-orb" aria-hidden="true" />

        <div className="wwa-inner">

          <div className="wwa-copy">
            <div className="wwa-eyebrow">
              <span className="wwa-eyebrow__dot" />
              About 99 Visual Solutions
            </div>

            <h2 id="who-we-are-heading" className="wwa-h2">
              Who We <em>Are</em>
            </h2>

            <p className="wwa-subhead">
              Where creativity, technology, and engineering converge.
            </p>

            <div className="wwa-rule" />

            <p className="wwa-p">
              <strong>99 Visual Solutions</strong> is a multidisciplinary technology
              and creative studio built on one belief: exceptional digital products
              demand both imagination and engineering precision. We bring 3D
              Visualisation, Web &amp; App Development, Digital Marketing &amp; SEO,
              IT Consulting, CAD, GIS &amp; LiDAR, QA &amp; Automation, and
              AI-powered solutions together under one team, one process, and one
              point of accountability.
            </p>
            <p className="wwa-p">
              Every engagement begins with a clear understanding of your business
              objectives and ends with measurable, scalable outcomes. We design,
              build, and optimise with the same discipline — prioritising
              innovation, quality, and collaboration at every stage, from early
              concept to enterprise deployment.
            </p>

            <p className="wwa-tagline">
              One Partner. <span>Endless Possibilities.</span>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}