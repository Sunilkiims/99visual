'use client';

import { useEffect, useState } from 'react';

const highlights = [
  'Cutting-edge Visualization',
  'Streamlined IT Systems',
  'Expert Consulting Team',
  'Custom Web & App Solutions',
  'Result-Driven Strategies',
  'Trusted by Enterprises',
];

export default function WhyWeAre() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

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

        .wwa-section {
          position: relative;
          background: var(--c-bg);
          overflow: hidden;
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1);
        }
        .wwa-section--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* bg layers */
        .wwa-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .wwa-grain {
          position: absolute; inset: 0; opacity: .025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .wwa-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .wwa-orb--1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -150px; left: -100px; opacity: .06;
        }
        .wwa-orb--2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -120px; right: -80px; opacity: .05;
        }

        /* corners */
        .wwa-corner {
          position: absolute; width: 22px; height: 22px; z-index: 5; opacity: .15;
        }
        .wwa-corner--tl { top: 20px; left: 20px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wwa-corner--tr { top: 20px; right: 20px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .wwa-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wwa-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        .wwa-inner {
          position: relative; z-index: 10;
          max-width: 1000px; margin: 0 auto;
        }

        /* header */
        .wwa-header { text-align: center; margin-bottom: 3.5rem; }

        .wwa-eyebrow {
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
        .wwa-eyebrow__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: wwaPulse 2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes wwaPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }

        .wwa-h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
        }
        .wwa-h2 em { font-style: italic; color: var(--c-orange); }

        .wwa-rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.8rem;
        }

        .wwa-p {
          font-family: var(--ff-sans); font-size: .97rem;
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          max-width: 720px; margin: 0 auto .9rem;
        }
        .wwa-p strong { color: var(--c-orange); font-weight: 600; }

        /* highlights grid */
        .wwa-grid-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 3rem;
        }
        @media (max-width: 768px) { .wwa-grid-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .wwa-grid-cards { grid-template-columns: 1fr; } }

        .wwa-chip {
          display: flex; align-items: center; gap: 10px;
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 10px;
          padding: .85rem 1.1rem;
          font-family: var(--ff-sans); font-size: .85rem;
          font-weight: 400; color: var(--c-muted2);
          transition: border-color .25s ease, transform .25s ease, color .25s ease;
          cursor: default;
        }
        .wwa-chip:hover {
          border-color: rgba(249,115,22,.3);
          transform: translateY(-2px);
          color: #fff;
        }
        .wwa-chip__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-orange); flex-shrink: 0;
        }
      `}</style>

      <section className={`wwa-section${isVisible ? ' wwa-section--visible' : ''}`}>
        {/* BG */}
        <div className="wwa-grid" aria-hidden />
        <div className="wwa-grain" aria-hidden />
        <div className="wwa-orb wwa-orb--1" aria-hidden />
        <div className="wwa-orb wwa-orb--2" aria-hidden />

        {/* Corners */}
        <div className="wwa-corner wwa-corner--tl" aria-hidden />
        <div className="wwa-corner wwa-corner--tr" aria-hidden />
        <div className="wwa-corner wwa-corner--bl" aria-hidden />
        <div className="wwa-corner wwa-corner--br" aria-hidden />

        <div className="wwa-inner">

          {/* Header */}
          <div className="wwa-header">
            <div className="wwa-eyebrow">
              <span className="wwa-eyebrow__dot" />
              Our Purpose
            </div>
            <h2 className="wwa-h2">
              Why We <em>Are</em>
            </h2>
            <div className="wwa-rule" />

            <p className="wwa-p">
              In the ever-evolving landscape of information technology, businesses require innovative
              and visually compelling solutions to stay competitive.{' '}
              <strong>99 Visual Solutions</strong> is a leading IT consulting firm dedicated to
              revolutionizing the industry by providing cutting-edge visual solutions.
            </p>
            <p className="wwa-p">
              From enhancing user experiences to streamlining complex processes, our team of experts
              leverages the power of visualization to bring remarkable transformations to your IT
              systems.
            </p>
            <p className="wwa-p">
              Explore our comprehensive range of solutions that will take your business to new
              heights.
            </p>
          </div>

          {/* Highlight chips */}
          <div className="wwa-grid-cards">
            {highlights.map((item, idx) => (
              <div key={idx} className="wwa-chip">
                <span className="wwa-chip__dot" />
                {item}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}