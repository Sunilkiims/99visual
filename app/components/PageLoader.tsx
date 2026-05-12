'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Phase = 'loading' | 'done' | 'gone';

const STATUSES = [
  'Initializing…',
  'Loading assets…',
  'Preparing workspace…',
  '',
  '',
];

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 16 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusIdx(4);
        setTimeout(() => setPhase('done'), 300);
        setTimeout(() => setPhase('gone'), 1200);
      } else {
        const floored = Math.floor(current);
        setProgress(floored);
        setStatusIdx(Math.min(Math.floor(current / 25), 3));
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (phase === 'gone') return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .ldr-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #080810;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.75s cubic-bezier(0.76, 0, 0.24, 1),
                      transform 0.75s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .ldr-root.exiting {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        /* Grid overlay */
        .ldr-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Ambient orbs */
        .ldr-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(90px);
        }
        .ldr-orb-1 {
          width: 500px; height: 500px;
          background: #4B3BC7;
          top: -200px; left: -120px;
          opacity: 0.08;
          animation: orbDrift1 7s ease-in-out infinite;
        }
        .ldr-orb-2 {
          width: 400px; height: 400px;
          background: #E97B20;
          bottom: -180px; right: -100px;
          opacity: 0.08;
          animation: orbDrift2 9s ease-in-out infinite;
        }
        .ldr-orb-3 {
          width: 280px; height: 280px;
          background: #1DA975;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.05;
          animation: orbPulse 5s ease-in-out infinite;
        }
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-24px, 18px); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(18px, -24px); }
        }
        @keyframes orbPulse {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.09; }
        }

        /* Logo stage */
        .ldr-stage {
          position: relative;
          width: 148px;
          height: 148px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }

        .ldr-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid transparent;
        }
        .ldr-ring-r1 {
          inset: 0;
          border-color: rgba(75,59,199,0.2);
          animation: spinCW 9s linear infinite;
        }
        .ldr-ring-r2 {
          inset: 9px;
          border-top-color: #4B3BC7;
          border-right-color: rgba(75,59,199,0.12);
          animation: spinCW 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        .ldr-ring-r3 {
          inset: 20px;
          border-top-color: #E97B20;
          border-left-color: rgba(233,123,32,0.15);
          animation: spinCCW 1.8s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        .ldr-ring-r4 {
          inset: 31px;
          border-bottom-color: #1DA975;
          border-right-color: rgba(29,169,117,0.12);
          animation: spinCW 3.2s linear infinite;
        }

        @keyframes spinCW  { to { transform: rotate(360deg);  } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }

        .ldr-dots {
          position: absolute;
          inset: 4px;
          animation: spinCW 6s linear infinite;
        }

        .ldr-logo {
          width: 76px;
          height: 76px;
          object-fit: contain;
          position: relative;
          z-index: 2;
          animation: logoEntrance 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
          filter: drop-shadow(0 0 20px rgba(233,123,32,0.4));
        }
        @keyframes logoEntrance {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Progress */
        .ldr-progress-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 288px;
          margin-top: 28px;
          animation: slideUp 0.7s ease 1s both;
        }

        .ldr-status {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          height: 14px;
          transition: opacity 0.3s ease;
        }

        .ldr-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          position: relative;
        }

        .ldr-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            #4B3BC7 0%,
            #1DA975 40%,
            #E97B20 75%,
            #EAB308 100%
          );
          background-size: 288px 100%;
          transition: width 0.11s ease;
          position: relative;
        }
        .ldr-fill::after {
          content: '';
          position: absolute;
          right: -1px; top: -3px;
          width: 8px; height: 8px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.7), 0 0 18px rgba(233,123,32,0.6);
        }

        .ldr-pct {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
        }
        .ldr-pct strong {
          color: rgba(255,255,255,0.65);
          font-weight: 500;
        }

      `}</style>

      <div className={`ldr-root${phase === 'done' ? ' exiting' : ''}`} role="status" aria-label="Loading">
        <div className="ldr-grid" aria-hidden />
        <div className="ldr-orb ldr-orb-1" aria-hidden />
        <div className="ldr-orb ldr-orb-2" aria-hidden />
        <div className="ldr-orb ldr-orb-3" aria-hidden />

        {/* Logo with rings */}
        <div className="ldr-stage">
          <div className="ldr-ring ldr-ring-r1" />
          <div className="ldr-ring ldr-ring-r2" />
          <div className="ldr-ring ldr-ring-r3" />
          <div className="ldr-ring ldr-ring-r4" />

          <svg className="ldr-dots" viewBox="0 0 140 140" aria-hidden>
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
              const r = 64;
              const x = 70 + r * Math.cos(angle);
              const y = 70 + r * Math.sin(angle);
              const colors = ['#4B3BC7','#E97B20','#1DA975','#EAB308','#5DCAA5','#AFA9EC'];
              return (
                <circle
                  key={i}
                  cx={x} cy={y}
                  r={i % 3 === 0 ? 2.8 : 1.5}
                  fill={colors[i % colors.length]}
                  opacity={0.65}
                />
              );
            })}
          </svg>

          <img
            src="/logo.png"
            alt="99 Visual Solutions"
            className="ldr-logo"
          />
        </div>


        <div className="ldr-progress-wrap" aria-live="polite">
          <div className="ldr-status">{STATUSES[statusIdx]}</div>
          <div className="ldr-track">
            <div className="ldr-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="ldr-pct">
            <strong>{progress}</strong>%
          </div>
        </div>

      </div>
    </>
  );
}