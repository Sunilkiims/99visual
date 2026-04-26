// components/BlueScreenBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueScreenBox() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const distance = Math.sqrt(
            (r - targetR) ** 2 +
            (g - targetG) ** 2 +
            (b - targetB) ** 2
          );

          if (distance < threshold) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    video.play().then(() => {
      animationRef.current = requestAnimationFrame(render);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasInteracted, mounted]);

  const handleMouseEnter = () => {
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    if (hasInteracted) videoRef.current?.play();
  };

  const handleUserInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  if (!mounted) return null;

  return (
    <section
      className="w-full flex justify-center px-4 sm:px-6 lg:px-8"
      onClick={handleUserInteraction}
      onMouseEnter={handleUserInteraction}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">

        {/* 🎬 Video Box */}
        <div className="relative w-full max-w-[420px] aspect-video border border-white rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
          
          <canvas
            ref={canvasRef}
            width={420}
            height={280}
            className="absolute top-0 left-0 w-full h-full z-10"
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
            className="hidden"
          />
        </div>

        {/* 📝 Text Section */}
        <div className="text-center md:text-left max-w-xl">
          
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 leading-snug">
            Captivate, Engage & Convert Like Never Before
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            At 99 Visual Solutions, we go beyond standard 3D modeling by offering
            advanced product visualization with customizable colors, textures,
            and multiple viewing options. Our services help you present products
            in a way that feels real, interactive, and customer-ready.
          </p>

        </div>

      </div>
    </section>
  );
}