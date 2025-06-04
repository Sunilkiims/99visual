'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueScreenBox() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Flag to indicate component is mounted on client
  }, []);

  useEffect(() => {
    if (!mounted || !hasInteracted) return;

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
        const len = frame.data.length;

        for (let i = 0; i < len; i += 4) {
          const r = frame.data[i];
          const g = frame.data[i + 1];
          const b = frame.data[i + 2];

          const distance = Math.sqrt(
            (r - targetR) ** 2 + (g - targetG) ** 2 + (b - targetB) ** 2
          );

          if (distance < threshold) {
            frame.data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    video.play()
      .then(() => {
        animationRef.current = requestAnimationFrame(render);
      })
      .catch((err) => console.warn("Autoplay failed:", err));

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [hasInteracted, mounted]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && hasInteracted) {
      videoRef.current.play();
    }
  };

  const handleUserInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  if (!mounted) return null; // Avoid rendering on server

  return (
    <div
      className="p-8 flex flex-col items-center"
      onClick={handleUserInteraction}
      onMouseEnter={handleUserInteraction}
    >
      <h1 className="text-3xl font-bold mb-8">Smartwatch Product Showcase</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Video Box */}
        <div
          className="relative w-[420px] h-[280px] border border-white rounded-lg overflow-hidden bg-white"
          suppressHydrationWarning
        >
          <canvas
            ref={canvasRef}
            width={420}
            height={280}
            className="absolute top-0 left-0 z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <video
            ref={videoRef}
            src="/videos/blue-screen.mp4"
            muted
            loop
            playsInline
            width={0}
            height={0}
            style={{ position: 'absolute', left: '-9999px' }}
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-xl font-semibold mb-2">Revolutionary Smartwatches</h2>
          <p className="text-gray-700">
            Experience next-gen performance and sleek design with our latest smartwatch models.
            Featuring real-time tracking, AI-driven analytics, and stylish bands — all in one.
          </p>
        </div>
      </div>
    </div>
  );
}
