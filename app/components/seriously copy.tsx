// components/BlueScreenBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueScreenBox() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const targetR = 0;
    const targetG = 132;
    const targetB = 239;
    const threshold = 50;

    const render = () => {
      if (video.readyState === 4 && !video.paused) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const distance = Math.sqrt((r - targetR) ** 2 + (g - targetG) ** 2 + (b - targetB) ** 2);
          if (distance < threshold) data[i + 3] = 0;
        }
        ctx.putImageData(frame, 0, 0);
      }
      animationRef.current = requestAnimationFrame(render);
    };

    const startPlayback = () => {
      if (isPlayingRef.current) return;
      video.play().then(() => {
        isPlayingRef.current = true;
        animationRef.current = requestAnimationFrame(render);
      }).catch(() => {
        // Autoplay blocked — waiting for user interaction
      });
    };

    // Muted videos can autoplay in all modern browsers
    startPlayback();

    // Fallback: trigger on any user interaction with the page
    const onInteraction = () => {
      startPlayback();
      window.removeEventListener('click', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
    };
    window.addEventListener('click', onInteraction);
    window.addEventListener('touchstart', onInteraction);
    window.addEventListener('mousemove', onInteraction);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('click', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
    };
  }, [mounted]);

  const handleMouseEnter = () => { videoRef.current?.pause(); };
  const handleMouseLeave = () => { videoRef.current?.play(); };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .bsb-section {
          position: relative;
          background: #0f0f0f;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          padding: 5rem 1.5rem;
        }

        /* bg layers */
        .bsb-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .bsb-grain {
          position: absolute; inset: 0; opacity: .025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .bsb-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .bsb-orb--1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -140px; right: -80px; opacity: .06;
        }
        .bsb-orb--2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -100px; left: -60px; opacity: .05;
        }

        /* corners */
        .bsb-corner {
          position: absolute; width: 22px; height: 22px; z-index: 5; opacity: .15;
        }
        .bsb-corner--tl { top: 20px; left: 20px; border-top: 1px solid #f97316; border-left: 1px solid #f97316; }
        .bsb-corner--tr { top: 20px; right: 20px; border-top: 1px solid #f97316; border-right: 1px solid #f97316; }
        .bsb-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid #f97316; border-left: 1px solid #f97316; }
        .bsb-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid #f97316; border-right: 1px solid #f97316; }

        .bsb-inner {
          position: relative; z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .bsb-inner {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
          }
        }

        /* Video box */
        .bsb-video-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 3 / 2;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #141414;
          flex-shrink: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          transition: box-shadow .3s ease, border-color .3s ease;
        }
        .bsb-video-wrap:hover {
          border-color: rgba(249,115,22,.25);
          box-shadow: 0 24px 70px rgba(0,0,0,.6), 0 0 0 1px rgba(249,115,22,.1);
        }
        /* Orange gradient overlay on video */
        .bsb-video-wrap::before {
          content: '';
          position: absolute; inset: 0; z-index: 11;
          background: linear-gradient(135deg, rgba(249,115,22,.06), transparent 60%);
          border-radius: 16px;
          pointer-events: none;
        }

        /* Text section */
        .bsb-text {
          flex: 1;
          text-align: center;
        }
        @media (min-width: 768px) {
          .bsb-text { text-align: left; }
        }

        .bsb-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316;
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.4rem;
          backdrop-filter: blur(8px);
        }
        .bsb-eyebrow__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #f97316;
          animation: bsbPulse 2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes bsbPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }

        .bsb-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 3.5vw, 2.8rem);
          font-weight: 700; line-height: 1.12;
          letter-spacing: -.02em;
          color: #fff;
          margin: 0 0 .7rem;
        }
        .bsb-h2 em {
          font-style: italic;
          color: #f97316;
        }

        .bsb-rule {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, #f97316, transparent);
          margin: 0 0 1.3rem;
        }
        @media (max-width: 767px) {
          .bsb-rule { margin: 0 auto 1.3rem; }
        }

        .bsb-p {
          font-family: 'DM Sans', sans-serif;
          font-size: .95rem; font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
        }
        @media (max-width: 767px) {
          .bsb-p { margin: 0 auto; }
        }
      `}</style>

      <section className="bsb-section">
        {/* BG layers */}
        <div className="bsb-grid" aria-hidden />
        <div className="bsb-grain" aria-hidden />
        <div className="bsb-orb bsb-orb--1" aria-hidden />
        <div className="bsb-orb bsb-orb--2" aria-hidden />

        {/* Corners */}
        <div className="bsb-corner bsb-corner--tl" aria-hidden />
        <div className="bsb-corner bsb-corner--tr" aria-hidden />
        <div className="bsb-corner bsb-corner--bl" aria-hidden />
        <div className="bsb-corner bsb-corner--br" aria-hidden />

        <div className="bsb-inner">

          {/* Video Box */}
          <div className="bsb-video-wrap">
            <canvas
              ref={canvasRef}
              width={420}
              height={280}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <video
              ref={videoRef}
              src="/videos/blue-screen.mp4"
              muted
              loop
              playsInline
              preload="auto"
              style={{ display: 'none' }}
            />
          </div>

          {/* Text */}
          <div className="bsb-text">
            <div className="bsb-eyebrow">
              <span className="bsb-eyebrow__dot" />
              3D Product Visualization
            </div>

            <h2 className="bsb-h2">
              Captivate, Engage &amp; <em>Convert</em> Like Never Before
            </h2>

            <div className="bsb-rule" />

            <p className="bsb-p">
              At 99 Visual Solutions, we go beyond standard 3D modeling by offering
              advanced product visualization with customizable colors, textures,
              and multiple viewing options. Our services help you present products
              in a way that feels real, interactive, and customer-ready.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}