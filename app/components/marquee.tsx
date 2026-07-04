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
        .pm-section {
          background: #f8fafc;
          padding: 0;
          overflow: hidden;
          border-top: 0.5px solid rgba(0, 0, 0, 0.06);
        }

        /* Header */
        .pm-header {
          text-align: center;
          padding: 48px 24px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .pm-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f97316;
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.2);
          padding: 5px 14px;
          border-radius: 100px;
        }

        .pm-eyebrow__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f97316;
          display: inline-block;
          animation: pmPulse 2s ease-in-out infinite;
        }

        @keyframes pmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.6); }
        }

        .pm-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #0f172a;
          margin: 0;
        }

        .pm-title em {
          font-style: normal;
          background: linear-gradient(135deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pm-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(to right, #f97316, #fbbf24);
          border-radius: 2px;
        }

        /* Strip */
        .pm-strip {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(249, 115, 22, 0.15);
          border-bottom: 1px solid rgba(249, 115, 22, 0.15);
          background: #fff;
        }

        .pm-strip::before,
        .pm-strip::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 20;
          pointer-events: none;
        }
        .pm-strip::before {
          left: 0;
          background: linear-gradient(90deg, #fff 0%, transparent 100%);
        }
        .pm-strip::after {
          right: 0;
          background: linear-gradient(270deg, #fff 0%, transparent 100%);
        }

        .pm-marquee {
          display: flex;
          align-items: center;
          width: max-content;
          animation: pmScroll 14s linear infinite;
          padding: 20px 0;
        }

        @keyframes pmScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .pm-item {
          position: relative;
          flex-shrink: 0;
          width: 130px;
          height: 52px;
          margin: 0 2rem;
        }

        .pm-item img {
          opacity: 0.55;
          transition: opacity 0.3s ease;
          object-fit: contain;
        }
        .pm-item:hover img { opacity: 1; }

        .pm-item + .pm-item::before {
          content: '';
          position: absolute;
          left: -2rem;
          top: 20%; height: 60%;
          width: 1px;
          background: rgba(0, 0, 0, 0.07);
        }

        @media (prefers-reduced-motion: reduce) {
          .pm-marquee { animation: none; }
        }
      `}</style>

      <section className="pm-section">

        <div className="pm-header">
          <div className="pm-eyebrow">
            <span className="pm-eyebrow__dot" />
            Trusted By
          </div>
          <h2 className="pm-title">
            Our <em>Happy Clients</em>
          </h2>
          <div className="pm-divider" />
        </div>

        <div className="pm-strip">
          <div className="pm-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="pm-item">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="130px"
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
