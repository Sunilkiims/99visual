'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PARAGRAPHS = [
  {
    id: 1,
    text: `Our story doesn't start with a business plan. It starts during COVID-19, when our team was on the ground maintaining critical IT infrastructure for banks, police stations, and government institutions — while most of the world had come to a standstill.`,
  },
  {
    id: 2,
    text: `We kept servers running, networks stable, and biometric systems operational across facilities that had zero tolerance for downtime. The pressure was real. So were the lessons.`,
  },
  {
    id: 3,
    text: `Working in high-stakes environments during a crisis doesn't just test your technical ability — it reshapes how you think about responsibility. We came out of that chapter with three things we carry into every project today: accountability over excuses, clarity over jargon, and a genuine focus on whether our work holds up long after delivery.`,
  },
  {
    id: 4,
    text: `That experience is what 99 Visual is built on. From IT consulting and web development to digital marketing and geospatial services, the scope of what we do has grown — but our standard hasn't moved.`,
  },
  {
    id: 5,
    text: `We treat every client's problem as seriously as our own. That's not a tagline. It's how we've operated since the beginning.`,
    highlight: true,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function WhyChooseUs() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&display=swap');

        @media (prefers-reduced-motion: reduce) {
          .wcu-animate { transition: none !important; opacity: 1 !important; transform: none !important; }
        }

        .wcu-fade-left {
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .wcu-fade-left.in { opacity: 1; transform: translateX(0); }

        .wcu-fade-right {
          opacity: 0; transform: translateX(40px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .wcu-fade-right.in { opacity: 1; transform: translateX(0); }

        .wcu-fade-up {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .wcu-fade-up.in { opacity: 1; transform: translateY(0); }

        .wcu-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.1rem, 4.2vw, 3.1rem);
          font-weight: 700;
          line-height: 1.12;
          color: #0f172a;
          margin: 0 0 8px;
          letter-spacing: -.02em;
        }
        .wcu-title span {
          font-style: italic;
          color: #f97316;
        }

        .wcu-divider {
          width: 48px; height: 3px;
          background: linear-gradient(to right, #f97316, #fbbf24);
          border-radius: 2px;
          margin: 16px 0 28px;
        }

        .wcu-para {
          font-size: 15px;
          line-height: 1.75;
          color: #475569;
          margin: 0 0 14px;
        }
        .wcu-para.highlight {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          border-left: 3px solid #f97316;
          padding-left: 14px;
          margin-top: 20px;
        }

        .wcu-image-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
        }
        .wcu-image-wrap::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(249,115,22,0.06) 0%, transparent 60%);
          z-index: 1; pointer-events: none;
        }

        .wcu-glow-ring {
          position: absolute; inset: -2px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(249,115,22,0.3), rgba(251,191,36,0.2), transparent 60%);
          z-index: -1;
        }

        .wcu-float-tag {
          position: absolute;
          bottom: 24px; left: -20px;
          background: #fff;
          border-radius: 14px;
          padding: 10px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          display: flex; align-items: center; gap: 10px;
          z-index: 10;
          opacity: 0; transform: translateX(-10px);
          transition: opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s;
        }
        .wcu-float-tag.in { opacity: 1; transform: translateX(0); }

        .wcu-float-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: wcu-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes wcu-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }

        .wcu-float-text-main { font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1; }
        .wcu-float-text-sub  { font-size: 11px; color: #64748b; margin-top: 2px; }

        /* ── Section: top padding only, zero bottom ── */
        .wcu-section {
          padding: 96px 0 0;
          background: #f8fafc;
          overflow: hidden;
          border: none;
          outline: none;
        }

        .wcu-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .wcu-container {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .wcu-image-col { order: -1; }
          .wcu-float-tag { left: 16px; }
        }

        @media (max-width: 480px) {
          .wcu-section { padding: 56px 0 0; }
        }
      `}</style>

      <section className="wcu-section" ref={sectionRef} aria-labelledby="wcu-heading">
        <div className="wcu-container">

          {/* LEFT — Text */}
          <div>
            <div className={`wcu-animate wcu-fade-left ${inView ? 'in' : ''}`} style={{ transitionDelay: '0ms' }}>
              <h2 className="wcu-title" id="wcu-heading">
                Why Choose{' '}
                <span>99 Visual?</span>
              </h2>
              <div className="wcu-divider" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {PARAGRAPHS.map((p, i) => (
                <p
                  key={p.id}
                  className={`wcu-para${p.highlight ? ' highlight' : ''} wcu-animate wcu-fade-up ${inView ? 'in' : ''}`}
                  style={{ transitionDelay: `${120 + i * 90}ms` }}
                >
                  {p.text}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT — Image flush to bottom */}
          <div
            className={`wcu-image-col wcu-animate wcu-fade-right ${inView ? 'in' : ''}`}
            style={{ transitionDelay: '100ms', position: 'relative' }}
          >
            <div className="wcu-image-wrap">
              <div className="wcu-glow-ring" aria-hidden="true" />
              <Image
                src="/images/home/whychoose99visual.png"
                alt="99 Visual team — quality assurance, expert team, on-time delivery, 24/7 support"
                width={580}
                height={620}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
                priority
              />
            </div>

            <div className={`wcu-float-tag ${inView ? 'in' : ''}`}>
              <div className="wcu-float-dot" aria-hidden="true" />
              <div>
                <div className="wcu-float-text-main">Active Since 2020</div>
                <div className="wcu-float-text-sub">Trusted through every challenge</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}