'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Fade in after 1.5s so it doesn't distract on initial load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const phoneNumber = '919205737431'; // ← replace with your WhatsApp number (no + sign)
  const message = encodeURIComponent("Hi! I'd like to know more about your services.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <style>{`
        /* ── WhatsApp Button ── */
        .wa-btn-wrap {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .wa-btn-wrap--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Tooltip */
        .wa-tooltip {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: .02em;
          padding: 7px 14px;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          opacity: 0;
          transform: translateX(8px);
          transition: opacity .25s ease, transform .25s ease;
          pointer-events: none;
          position: relative;
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-left-color: #141414;
          border-right: none;
        }
        .wa-tooltip--show {
          opacity: 1;
          transform: translateX(0);
        }

        /* Button */
        .wa-btn {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25d366, #128c7e);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow:
            0 4px 20px rgba(37,211,102,0.4),
            0 0 0 0 rgba(37,211,102,0.4);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: waPulseRing 2.4s cubic-bezier(.4,0,.6,1) infinite;
          flex-shrink: 0;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow:
            0 8px 32px rgba(37,211,102,0.55),
            0 0 0 6px rgba(37,211,102,0.12);
          animation: none;
        }

        /* Outer glow rings */
        .wa-btn::before,
        .wa-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37,211,102,0.25);
          animation: waRingExpand 2.4s cubic-bezier(.4,0,.6,1) infinite;
          pointer-events: none;
        }
        .wa-btn::after {
          animation-delay: .8s;
          background: rgba(37,211,102,0.15);
        }

        @keyframes waPulseRing {
          0%   { box-shadow: 0 4px 20px rgba(37,211,102,0.4), 0 0 0 0   rgba(37,211,102,0.35); }
          50%  { box-shadow: 0 4px 20px rgba(37,211,102,0.4), 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4), 0 0 0 0   rgba(37,211,102,0); }
        }

        @keyframes waRingExpand {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(2.2);  opacity: 0; }
        }

        /* Icon */
        .wa-btn__icon {
          width: 28px;
          height: 28px;
          fill: #fff;
          position: relative;
          z-index: 1;
          transition: transform .2s ease;
        }
        .wa-btn:hover .wa-btn__icon {
          transform: rotate(-8deg) scale(1.08);
        }

        /* Notification dot */
        .wa-btn__dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 13px;
          height: 13px;
          background: #f97316;
          border-radius: 50%;
          border: 2px solid #080808;
          animation: waDotPulse 2s ease-in-out infinite;
          z-index: 2;
        }
        @keyframes waDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.2); opacity: .8; }
        }

        @media (max-width: 480px) {
          .wa-btn-wrap { bottom: 20px; right: 20px; }
          .wa-btn { width: 52px; height: 52px; }
          .wa-btn__icon { width: 24px; height: 24px; }
        }
      `}</style>

      <div className={`wa-btn-wrap${visible ? ' wa-btn-wrap--visible' : ''}`}>

        {/* Tooltip */}
        <div className={`wa-tooltip${hovered ? ' wa-tooltip--show' : ''}`}>
          Chat with us on WhatsApp
        </div>

        {/* Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* WhatsApp SVG icon */}
          <svg className="wa-btn__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.003 3C9.376 3 4 8.373 4 15c0 2.388.67 4.617 1.832 6.514L4 29l7.699-1.807A12.94 12.94 0 0 0 16.003 28C22.63 28 28 22.627 28 16S22.63 3 16.003 3zm0 2C21.534 5 26 9.467 26 15c0 5.532-4.466 10-9.997 10a10.94 10.94 0 0 1-5.63-1.555l-.393-.24-4.572 1.073 1.103-4.452-.26-.406A9.954 9.954 0 0 1 5 15C5 9.467 9.471 5 16.003 5zm-3.49 5.004c-.23 0-.604.086-.921.43-.317.344-1.21 1.181-1.21 2.88 0 1.697 1.238 3.337 1.41 3.567.172.23 2.401 3.812 5.912 5.196 2.929 1.152 3.514.923 4.147.866.633-.057 2.043-.836 2.331-1.642.289-.807.289-1.497.202-1.642-.086-.144-.316-.23-.662-.403-.345-.172-2.043-1.008-2.36-1.123-.317-.115-.548-.173-.778.172-.23.345-.892 1.123-1.094 1.354-.201.23-.403.259-.748.086-.345-.172-1.456-.537-2.773-1.713-1.025-.915-1.717-2.044-1.919-2.389-.201-.345-.022-.532.151-.703.155-.155.345-.403.518-.604.172-.2.23-.344.345-.574.115-.23.057-.432-.029-.604-.086-.172-.757-1.872-1.06-2.56-.273-.636-.554-.645-.778-.653l-.663-.01z"/>
          </svg>

          {/* Orange notification dot */}
          <span className="wa-btn__dot" aria-hidden />
        </a>
      </div>
    </>
  );
}