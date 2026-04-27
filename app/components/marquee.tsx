'use client';

import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/partners/partner1.png" },
  { name: "Partner 2", logo: "/partners/partner2.png" },
  { name: "Partner 3", logo: "/partners/partner3.png" },
  { name: "Partner 4", logo: "/partners/partner4.png" },
  { name: "Partner 5", logo: "/partners/partner5.png" },
  { name: "Partner 6", logo: "/partners/partner6.png" },
  { name: "Partner 7", logo: "/partners/partner7.png" },
  { name: "Partner 8", logo: "/partners/partner8.png" },
];

const PartnerMarquee = () => {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=Outfit:wght@300;400;500&display=swap');

        .pm-section {
          position: relative;
          background: #080b12;
          padding: 4.5rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          isolation: isolate;
        }

        /* Background mesh — same palette as BlueScreenBox */
        .pm-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 80% at 10% 50%, rgba(99,102,241,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 90% 50%, rgba(249,115,22,0.05) 0%, transparent 60%);
        }

        /* Dot grid */
        .pm-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image: radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%);
        }

        /* Grain */
        .pm-grain {
          position: absolute;
          inset: 0;
          opacity: 0.028;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        /* Header */
        .pm-header {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 3rem;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .pm-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f97316;
          background: rgba(249,115,22,0.10);
          border: 1px solid rgba(249,115,22,0.22);
          padding: 5px 14px;
          border-radius: 100px;
          backdrop-filter: blur(10px);
        }

        .pm-eyebrow__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f97316;
          animation: pmPulse 2s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes pmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }

        .pm-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: rgba(255,255,255,0.92);
          margin: 0;
        }

        .pm-title em {
          font-style: normal;
          background: linear-gradient(135deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Divider under title */
        .pm-rule {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, #f97316, transparent);
        }

        /* Strip with golden border lines */
        .pm-strip {
          position: relative;
          z-index: 10;
          margin: 0;
          background: rgba(255, 255, 255, 0.96);
          padding: 0;
          overflow: hidden;
          border-top: 1.5px solid #f97316;
          border-bottom: 1.5px solid #f97316;
        }

        /* Fade edges */
        .pm-strip::before,
        .pm-strip::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 20;
          pointer-events: none;
        }
        .pm-strip::before {
          left: 0;
          background: linear-gradient(90deg, rgba(255,255,255,1) 0%, transparent 100%);
        }
        .pm-strip::after {
          right: 0;
          background: linear-gradient(270deg, rgba(255,255,255,1) 0%, transparent 100%);
        }

        .pm-marquee {
          display: flex;
          align-items: center;
          width: max-content;
          animation: pmScroll 28s linear infinite;
          padding: 1.4rem 0;
        }

        @keyframes pmScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Individual logo — no box, just the image */
        .pm-item {
          position: relative;
          flex-shrink: 0;
          width: 140px;
          height: 56px;
          margin: 0 2rem;
        }

        .pm-item img {
          filter: none !important;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          object-fit: contain;
        }

        .pm-item:hover img {
          opacity: 1;
        }

        /* Thin divider between logos */
        .pm-item + .pm-item::before {
          content: '';
          position: absolute;
          left: -2rem;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0,0,0,0.08);
        }
      `}</style>

      <section className="pm-section">
        <div className="pm-mesh" aria-hidden />
        <div className="pm-dots" aria-hidden />
        <div className="pm-grain" aria-hidden />

        {/* Header */}
        <div className="pm-header">
          <div className="pm-eyebrow">
            <span className="pm-eyebrow__dot" />
            Trusted By
          </div>
          <h2 className="pm-title">
            Our <em>Partners</em>
          </h2>
          <div className="pm-rule" />
        </div>

        {/* Marquee */}
        <div className="pm-strip">
          <div className="pm-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="pm-item">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default PartnerMarquee;