'use client';

import { useEffect, useState } from 'react';

type Phase = 'loading' | 'done' | 'gone';

export default function PageLoader() {
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setPhase('done'), 300);
        setTimeout(() => setPhase('gone'), 1100);
      } else {
        setProgress(Math.floor(current));
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  if (phase === 'gone') return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .loader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.7s cubic-bezier(0.76, 0, 0.24, 1),
                      transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .loader-root.exiting {
          opacity: 0;
          transform: translateY(-24px);
          pointer-events: none;
        }

        .loader-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .loader-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
        }
        .loader-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -200px; right: -120px;
          opacity: 0.07;
          animation: orbFloat1 6s ease-in-out infinite;
        }
        .loader-orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -140px; left: -80px;
          opacity: 0.05;
          animation: orbFloat2 8s ease-in-out infinite;
        }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0,0); }
          50%       { transform: translate(-30px, 20px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0,0); }
          50%       { transform: translate(20px, -30px); }
        }

        .loader-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loader-logo-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 28px;
        }

        .loader-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .loader-ring-outer {
          inset: 0;
          border-color: rgba(249,115,22,0.2);
          animation: ringSpinSlow 4s linear infinite;
        }
        .loader-ring-mid {
          inset: 10px;
          border-top-color: #f97316;
          border-right-color: rgba(249,115,22,0.3);
          border-bottom-color: transparent;
          border-left-color: transparent;
          animation: ringSpinFast 1.4s linear infinite;
        }
        .loader-ring-inner {
          inset: 22px;
          border-bottom-color: #f97316;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          animation: ringSpinFast 1.4s linear infinite reverse;
        }
        .loader-ring-dot {
          position: absolute;
          inset: 32px;
          border-radius: 50%;
          background: #f97316;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        @keyframes ringSpinSlow { to { transform: rotate(360deg); } }
        @keyframes ringSpinFast  { to { transform: rotate(360deg); } }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }

        .loader-brand {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .loader-brand em {
          font-style: italic;
          color: #f97316;
        }

        .loader-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 40px;
        }

        .loader-bar-wrap {
          width: clamp(200px, 40vw, 320px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .loader-bar-track {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }
        .loader-bar-fill {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transition: width 0.12s ease;
          box-shadow: 0 0 12px rgba(249,115,22,0.6);
        }
        .loader-bar-fill::after {
          content: '';
          position: absolute;
          right: 0; top: -3px;
          width: 4px; height: 7px;
          background: #fff;
          border-radius: 2px;
          opacity: 0.9;
        }

        .loader-pct {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
        }
        .loader-pct span {
          color: #f97316;
          font-weight: 500;
        }
      `}</style>

      <div className={`loader-root${phase === 'done' ? ' exiting' : ''}`}>
        <div className="loader-grid" aria-hidden />
        <div className="loader-orb loader-orb-1" aria-hidden />
        <div className="loader-orb loader-orb-2" aria-hidden />

        <div className="loader-content">
          <div className="loader-logo-wrap" aria-hidden>
            <div className="loader-ring loader-ring-outer" />
            <div className="loader-ring loader-ring-mid" />
            <div className="loader-ring loader-ring-inner" />
            <div className="loader-ring-dot" />
          </div>

          <div className="loader-brand">
            99 <em>Visual</em>
          </div>
          <div className="loader-tagline">Solutions</div>

          <div className="loader-bar-wrap">
            <div className="loader-bar-track">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="loader-pct">
              <span>{progress}</span>%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
