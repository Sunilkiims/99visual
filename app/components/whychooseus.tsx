'use client';

import Image from 'next/image';
import { FaUserTie, FaGraduationCap, FaArrowsAlt, FaShieldAlt } from 'react-icons/fa';

const infoCards = [
  {
    title: 'Strong Leaders',
    icon: <FaUserTie size={18} />,
    text: `At the heart of 99 Visual Solutions is a team of visionary leaders who drive our mission to deliver innovative, reliable, and cutting-edge digital solutions. Our leadership team brings a wealth of experience, expertise, and a relentless passion for excellence, setting the standard for everything we do.`,
  },
  {
    title: 'Education',
    icon: <FaGraduationCap size={18} />,
    text: `We believe that continuous learning and professional development are the cornerstones of innovation and excellence. Our leadership team and experts come from diverse educational backgrounds, bringing together a wealth of knowledge that drives our success.`,
  },
  {
    title: 'Flexibility',
    icon: <FaArrowsAlt size={18} />,
    text: `In today's rapidly evolving digital landscape, flexibility is key to staying ahead. At 99 Visual Solutions, we pride ourselves on our ability to adapt and respond to the unique needs of our clients — tailoring solutions to fit your specific requirements, timelines, and budgets.`,
  },
  {
    title: 'Integrity',
    icon: <FaShieldAlt size={18} />,
    text: `At 99 Visual Solutions, integrity is the cornerstone of everything we do. We believe that trust is earned through transparency, honesty, and a steadfast commitment to doing what's right — ensuring every interaction is handled with mutual respect and ethical practices.`,
  },
];

export default function WhyChooseUs() {
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
        .wcu-section {
          position: relative;
          background: var(--c-bg);
          overflow: hidden;
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
        }

        /* bg layers */
        .wcu-section__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .wcu-section__grain {
          position: absolute; inset: 0; opacity: .025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .wcu-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .wcu-orb--1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -160px; right: -100px; opacity: .06;
        }
        .wcu-orb--2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -120px; left: -80px; opacity: .05;
        }

        /* corner marks */
        .wcu-corner {
          position: absolute; width: 22px; height: 22px; z-index: 5; opacity: .15;
        }
        .wcu-corner--tl { top: 20px; left: 20px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wcu-corner--tr { top: 20px; right: 20px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .wcu-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wcu-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        .wcu-inner {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
        }

        /* ── HEADER ── */
        .wcu-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .wcu-header__eyebrow {
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
        .wcu-header__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: wcuPulse 2s ease-in-out infinite;
        }
        @keyframes wcuPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }
        .wcu-header__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
        }
        .wcu-header__h2 em {
          font-style: italic; color: var(--c-orange);
        }
        .wcu-header__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.2rem;
        }
        .wcu-header__sub {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: var(--c-muted);
        }

        /* ── GRID ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) {
          .wcu-grid { grid-template-columns: repeat(2, 1fr); }
          .wcu-img-wrap { display: none; }
        }
        @media (max-width: 640px) {
          .wcu-grid { grid-template-columns: 1fr; }
        }

        /* ── IMAGE CELLS ── */
        .wcu-img-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--c-border);
          min-height: 300px;
        }
        .wcu-img-wrap::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, transparent 50%, rgba(8,8,8,.7) 100%);
          border-radius: 16px; pointer-events: none;
        }
        .wcu-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .5s ease;
        }
        .wcu-img-wrap:hover img { transform: scale(1.04); }

        /* ── INFO CARDS ── */
        .wcu-card {
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 16px;
          padding: 2rem 1.75rem;
          position: relative; overflow: hidden;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .wcu-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,.5), transparent);
          opacity: 0; transition: opacity .25s ease;
        }
        .wcu-card:hover {
          border-color: rgba(249,115,22,.25);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,.4);
        }
        .wcu-card:hover::before { opacity: 1; }

        .wcu-card__icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--c-orange-dim);
          border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-orange);
          margin-bottom: 1.2rem;
          flex-shrink: 0;
        }
        .wcu-card__title {
          font-family: var(--ff-sans); font-size: .95rem; font-weight: 600;
          color: #fff; margin-bottom: .6rem;
        }
        .wcu-card__rule {
          width: 24px; height: 1px;
          background: linear-gradient(90deg, var(--c-orange), transparent);
          margin-bottom: 1rem;
        }
        .wcu-card__text {
          font-family: var(--ff-sans); font-size: .85rem;
          font-weight: 300; line-height: 1.78; color: var(--c-muted);
        }
      `}</style>

      <section className="wcu-section">
        {/* BG layers */}
        <div className="wcu-section__grid" />
        <div className="wcu-section__grain" />
        <div className="wcu-orb wcu-orb--1" />
        <div className="wcu-orb wcu-orb--2" />

        {/* Corner accents */}
        <div className="wcu-corner wcu-corner--tl" />
        <div className="wcu-corner wcu-corner--tr" />
        <div className="wcu-corner wcu-corner--bl" />
        <div className="wcu-corner wcu-corner--br" />

        <div className="wcu-inner">

          {/* Header */}
          <div className="wcu-header">
            <div className="wcu-header__eyebrow">
              <span className="wcu-header__dot" />
              Why Choose Us
            </div>
            <h2 className="wcu-header__h2">
              What makes us <em>different</em>
            </h2>
            <div className="wcu-header__rule" />
            <p className="wcu-header__sub">
              Check out some interesting facts about us
            </p>
          </div>

          {/* Grid */}
          <div className="wcu-grid">

            {/* Image 1 */}
            <div className="wcu-img-wrap">
              <Image
                src="/teamwork.jpg"
                alt="Teamwork"
                width={500}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Cards 1 & 2 */}
            {infoCards.slice(0, 2).map((item, index) => (
              <div key={index} className="wcu-card">
                <div className="wcu-card__icon">{item.icon}</div>
                <div className="wcu-card__title">{item.title}</div>
                <div className="wcu-card__rule" />
                <p className="wcu-card__text">{item.text}</p>
              </div>
            ))}

            {/* Cards 3 & 4 */}
            {infoCards.slice(2).map((item, index) => (
              <div key={index} className="wcu-card">
                <div className="wcu-card__icon">{item.icon}</div>
                <div className="wcu-card__title">{item.title}</div>
                <div className="wcu-card__rule" />
                <p className="wcu-card__text">{item.text}</p>
              </div>
            ))}

            {/* Image 2 */}
            <div className="wcu-img-wrap">
              <Image
                src="/award.webp"
                alt="Award and Integrity"
                width={500}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}