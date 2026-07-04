'use client';

export type Partner = {
  name: string;
  logo: string;
};

export type Stat = {
  value: string;
  label: string;
};

type PartnerMarqueeProps = {
  partners?: Partner[];
  /**
   * Pass real, verifiable numbers only. This section renders as a trust
   * signal — an invented stat is worse than no stat at all. Omit this
   * prop entirely to hide the stat row until you have numbers to show.
   */
  stats?: Stat[];
};

const defaultPartners: Partner[] = [
  { name: "Partner 1", logo: "/partners/partner1.png" },
  { name: "Partner 2", logo: "/partners/partner2.png" },
  { name: "Partner 3", logo: "/partners/partner3.png" },
  { name: "Partner 4", logo: "/partners/partner4.png" },
  { name: "Partner 5", logo: "/partners/partner5.png" },
  { name: "Partner 6", logo: "/partners/partner6.png" },
  { name: "Partner 7", logo: "/partners/partner7.png" },
  { name: "Partner 8", logo: "/partners/partner8.png" },
];

const PartnerMarquee = ({
  partners = defaultPartners,
  stats,
}: PartnerMarqueeProps) => {
  const looped = [...partners, ...partners];
  const half = partners.length;

  return (
    <>
      <style jsx>{`
        .pm-section {
          background: #f8fafc;
          padding: 0;
          overflow: hidden;
          border-top: 0.5px solid rgba(0, 0, 0, 0.06);
        }

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
          padding: 22px 0;
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

        .pm-track-wrap {
          overflow: hidden;
          width: 100%;
        }

        .pm-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: pmScroll 32s linear infinite;
        }

        .pm-strip:hover .pm-track {
          animation-play-state: paused;
        }

        @keyframes pmScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .pm-chip {
          position: relative;
          flex-shrink: 0;
          width: 128px;
          height: 60px;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          background: #fff;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }

        .pm-chip:hover {
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.08);
          transform: translateY(-2px);
        }

        .pm-chip img {
          max-width: 72%;
          max-height: 46%;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.55;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }

        .pm-chip:hover img {
          filter: grayscale(0);
          opacity: 1;
        }

        /* Stat strip */
        .pm-stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 32px 24px 44px;
          max-width: 900px;
          margin: 0 auto;
        }

        .pm-stat {
          flex: 1;
          min-width: 130px;
          text-align: center;
          padding: 0 20px;
          position: relative;
        }

        .pm-stat + .pm-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(0, 0, 0, 0.08);
        }

        .pm-stat__value {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #0f172a;
        }

        .pm-stat__label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: #64748b;
          margin-top: 4px;
        }

        @media (max-width: 640px) {
          .pm-stat + .pm-stat::before { display: none; }
          .pm-stat { min-width: 46%; margin-bottom: 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pm-track { animation: none; }
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
          <div className="pm-track-wrap">
            <div className="pm-track">
              {looped.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="pm-chip"
                  aria-hidden={index >= half ? true : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={partner.logo} alt={partner.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="pm-stats" aria-label="Company highlights">
            {stats.map((stat) => (
              <div className="pm-stat" key={stat.label}>
                <div className="pm-stat__value">{stat.value}</div>
                <div className="pm-stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default PartnerMarquee;
