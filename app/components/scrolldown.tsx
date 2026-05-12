"use client";

import { useEffect, useState, useCallback } from "react";

export default function ScrollDownButton() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fade in after page load
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Hide after 100px scroll
    setScrolled(scrollY >= 100);

    // Track scroll progress for the ring fill (0–1)
    setProgress(docH > 0 ? Math.min(scrollY / docH, 1) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  // SVG ring math
  const SIZE          = 48;
  const STROKE        = 1.5;
  const RADIUS        = (SIZE - STROKE * 2) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const DASH_OFFSET   = CIRCUMFERENCE * (1 - progress);

  // Visible only when mounted AND not scrolled past threshold
  const visible = mounted && !scrolled;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .sd-wrap {
          position:       fixed;
          bottom:         0.2rem;
          left:           50%;
          transform:      translateX(-50%);
          z-index:        9999;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            6px;
          opacity:        0;
          transform:      translateX(-50%) translateY(12px);
          transition:     opacity .5s ease, transform .5s ease;
          pointer-events: none;
        }
        .sd-wrap--visible {
          opacity:        1;
          transform:      translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .sd-wrap--hidden {
          opacity:        0;
          transform:      translateX(-50%) translateY(12px);
          pointer-events: none;
        }

        .sd-label {
          font-family:    'DM Sans', sans-serif;
          font-size:      8px;
          font-weight:    500;
          letter-spacing: .22em;
          text-transform: uppercase;
          color:          rgb(255, 255, 255);
          user-select:    none;
        }

        .sd-btn {
          position:        relative;
          width:           48px;
          height:          48px;
          border:          none;
          background:      transparent;
          cursor:          pointer;
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         0;
          outline:         none;
          -webkit-tap-highlight-color: transparent;
        }

        .sd-ring {
          position: absolute;
          inset:    0;
          overflow: visible;
        }
        .sd-ring__track {
          fill:         none;
          stroke:       rgba(255,255,255,.08);
          stroke-width: 1.5px;
        }
        .sd-ring__fill {
          fill:             none;
          stroke:           #ff4800;
          stroke-width:     1.5px;
          stroke-linecap:   round;
          transform-origin: center;
          transform:        rotate(-90deg);
          transition:       stroke-dashoffset .15s ease;
        }

        .sd-inner {
          position:        relative;
          z-index:         2;
          width:           34px;
          height:          34px;
          border-radius:   50%;
          background:      rgba(255, 255, 255, 0.02);
          border:          1px solid rgba(249,115,22,.25);
          display:         flex;
          align-items:     center;
          justify-content: center;
          transition:      background .22s ease, border-color .22s ease, transform .22s ease;
          backdrop-filter: blur(8px);
        }
        .sd-btn:hover .sd-inner {
          background:   rgba(252, 246, 250, 0.32);
          border-color: rgba(217, 255, 0, 0.6);
          transform:    scale(1.08);
        }
        .sd-btn:active .sd-inner {
          transform: scale(.94);
        }

        .sd-chevrons {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            -2px;
          position:       relative;
          height:         16px;
          width:          14px;
          overflow:       hidden;
        }
        .sd-chevron {
          position:  absolute;
          left:      50%;
          transform: translateX(-50%);
          opacity:   0;
          color:     #ffffff;
        }
        .sd-chevron--1 {
          top:       0px;
          animation: sdChevron 1.6s ease-in-out infinite;
        }
        .sd-chevron--2 {
          top:       7px;
          animation: sdChevron 1.6s ease-in-out .24s infinite;
        }
        @keyframes sdChevron {
          0%   { opacity: 0;   transform: translateX(-50%) translateY(-4px); }
          40%  { opacity: .9;  transform: translateX(-50%) translateY(0px);  }
          80%  { opacity: 0;   transform: translateX(-50%) translateY(4px);  }
          100% { opacity: 0;   transform: translateX(-50%) translateY(4px);  }
        }

        .sd-line {
          width:      1px;
          height:     28px;
          background: linear-gradient(to bottom, transparent, rgba(249,115,22,.35));
          animation:  sdLinePulse 2s ease-in-out infinite;
        }
        @keyframes sdLinePulse {
          0%,100% { opacity: .5; }
          50%     { opacity: 1;  }
        }

        @media (prefers-reduced-motion: reduce) {
          .sd-chevron, .sd-line, .sd-wrap {
            animation: none !important;
            transition: none !important;
          }
          .sd-chevron--1 { opacity: .7; transform: translateX(-50%); }
          .sd-chevron--2 { opacity: .4; transform: translateX(-50%); }
        }
      `}</style>

      <div
        className={`sd-wrap${visible ? " sd-wrap--visible" : " sd-wrap--hidden"}`}
        aria-hidden={!visible}
      >
        {/* Tick line */}
        <div className="sd-line" aria-hidden="true" />

        {/* Button */}
        <button
          className="sd-btn"
          onClick={scrollDown}
          aria-label="Scroll down to explore content"
          title="Scroll down"
          tabIndex={visible ? 0 : -1}
        >
          {/* Progress ring SVG */}
          <svg
            className="sd-ring"
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
          >
            <circle
              className="sd-ring__track"
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
            />
            <circle
              className="sd-ring__fill"
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={DASH_OFFSET}
            />
          </svg>

          {/* Inner circle with animated chevrons */}
          <div className="sd-inner">
            <div className="sd-chevrons" aria-hidden="true">
              <svg className="sd-chevron sd-chevron--1" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="sd-chevron sd-chevron--2" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}