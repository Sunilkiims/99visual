"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function ScrollDownButton() {
  const [mounted,  setMounted]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(scrollY >= 100);
    setProgress(docH > 0 ? Math.min(scrollY / docH, 1) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  // Fix 1: Add native touchstart listener for instant response on mobile,
  // bypassing the 300ms onClick delay on some Android WebViews.
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onTouch = (e: TouchEvent) => {
      e.preventDefault(); // prevents ghost click
      scrollDown();
    };
    btn.addEventListener("touchstart", onTouch, { passive: false });
    return () => btn.removeEventListener("touchstart", onTouch);
  }, [scrollDown]);

  const SIZE          = 48;
  const STROKE        = 1.5;
  const RADIUS        = (SIZE - STROKE * 2) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const DASH_OFFSET   = CIRCUMFERENCE * (1 - progress);

  const visible = mounted && !scrolled;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .sd-anchor {
          position:  fixed;
          bottom:    env(safe-area-inset-bottom, 0.2rem);
          /* Fix 2: use env() so the button clears the iOS home indicator */
          left:      50%;
          transform: translateX(-50%);
          z-index:   9999;
          /* Fix 3: ensure the anchor itself never blocks touches */
          pointer-events: none;
        }

        .sd-wrap {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            6px;
          opacity:        0;
          transform:      translateY(12px);
          transition:     opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
          /* Fix 4: isolate stacking context so iOS doesn't misroute touches */
          isolation:      isolate;
        }
        .sd-wrap--visible {
          opacity:        1;
          transform:      translateY(0);
          pointer-events: auto;
        }
        .sd-wrap--hidden {
          opacity:        0;
          transform:      translateY(12px);
          pointer-events: none;
        }

        .sd-label {
          font-family:    'DM Sans', sans-serif;
          font-size:      8px;
          font-weight:    500;
          letter-spacing: .22em;
          text-transform: uppercase;
          color:          rgb(255 255 255);
          user-select:    none;
          pointer-events: none;
        }

        .sd-btn {
          position:   relative;
          width:      48px;
          height:     48px;
          padding:    0;
          margin:     0;
          border:     none;
          background: transparent;
          cursor:     pointer;
          display:    flex;
          align-items:     center;
          justify-content: center;
          box-sizing: border-box;
          outline:    none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          /* Fix 5: explicit will-change so iOS composites the layer correctly */
          will-change: transform;
          /* Fix 6: transparent background must be set explicitly for touch
             hit-testing on WKWebView — 'transparent' is treated as
             pointer-events: none by the compositor in some iOS versions */
          background-color: rgba(0, 0, 0, 0.001);
        }

        /*
         * Fix 7: Replace ::before touch-target pseudo with a real child div.
         * iOS Safari clips ::before hit areas at the element border-box when
         * the element uses flexbox or position:relative in certain stacking
         * contexts. A real DOM node is always reliable.
         * (The .sd-hit div is added to the JSX below.)
         */
        .sd-hit {
          position: absolute;
          top:      50%;
          left:     50%;
          width:    72px;
          height:   72px;
          transform: translate(-50%, -50%);
          /* Uncomment to debug: background: rgba(255,0,0,0.15); */
        }

        .sd-ring {
          position:       absolute;
          inset:          0;
          overflow:       visible;
          pointer-events: none;
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
          background:      rgba(255,255,255,.02);
          border:          1px solid rgba(249,115,22,.25);
          display:         flex;
          align-items:     center;
          justify-content: center;
          transition:      background .22s ease, border-color .22s ease, transform .22s ease;
          backdrop-filter: blur(8px);
          pointer-events:  none;
        }

        .sd-btn:hover      .sd-inner,
        .sd-btn:focus-visible .sd-inner {
          background:   rgba(252,246,250,.32);
          border-color: rgba(217,255,0,.6);
          transform:    scale(1.08);
        }
        .sd-btn:active .sd-inner {
          background:   rgba(252,246,250,.18);
          border-color: rgba(255,72,0,.7);
          transform:    scale(0.94);
        }

        .sd-chevrons {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          position:       relative;
          height:         16px;
          width:          14px;
          overflow:       hidden;
          pointer-events: none;
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
          0%   { opacity: 0;  transform: translateX(-50%) translateY(-4px); }
          40%  { opacity: .9; transform: translateX(-50%) translateY(0px);  }
          80%  { opacity: 0;  transform: translateX(-50%) translateY(4px);  }
          100% { opacity: 0;  transform: translateX(-50%) translateY(4px);  }
        }

        .sd-line {
          width:          1px;
          height:         28px;
          background:     linear-gradient(to bottom, transparent, rgba(249,115,22,.35));
          animation:      sdLinePulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes sdLinePulse {
          0%,100% { opacity: .5; }
          50%     { opacity: 1;  }
        }

        @media (prefers-reduced-motion: reduce) {
          .sd-chevron, .sd-line { animation: none !important; }
          .sd-wrap { transition: none !important; }
          .sd-chevron--1 { opacity: .7; transform: translateX(-50%); }
          .sd-chevron--2 { opacity: .4; transform: translateX(-50%); }
        }
      `}</style>

      <div className="sd-anchor">
        <div
          className={`sd-wrap${visible ? " sd-wrap--visible" : " sd-wrap--hidden"}`}
          role={visible ? undefined : "presentation"}
        >
          <div className="sd-line" aria-hidden="true" />

          <button
            ref={btnRef}
            className="sd-btn"
            onClick={scrollDown}
            aria-label="Scroll down to explore content"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
          >
            {/* Fix 7: real DOM node for extended touch target */}
            <div className="sd-hit" aria-hidden="true" />

            <svg
              className="sd-ring"
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              aria-hidden="true"
            >
              <circle className="sd-ring__track" cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} />
              <circle
                className="sd-ring__fill"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={DASH_OFFSET}
              />
            </svg>

            <div className="sd-inner" aria-hidden="true">
              <div className="sd-chevrons">
                <svg className="sd-chevron sd-chevron--1" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="sd-chevron sd-chevron--2" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </button>

        </div>
      </div>
    </>
  );
}