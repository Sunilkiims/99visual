// components/BlueScreenBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueScreenBox() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

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

    video.play().then(() => {
      animationRef.current = requestAnimationFrame(render);
    });

    return () => {
      if (animationRef.current !== null) {
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
    <div
      className="flex flex-col items-center m-0 p-0"
      onClick={handleUserInteraction}
      onMouseEnter={handleUserInteraction}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 m-0 p-0">
        
        {/* Video Box */}
        <div className="relative w-[420px] h-[280px] border border-white rounded-lg overflow-hidden bg-white">
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
            preload="auto"
            width={0}
            height={0}
            style={{ position: 'absolute', left: '-9999px' }}
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-md m-0 p-0">
          <h2 className="text-xl font-semibold mb-1">
            Captivate, Engage & Convert Like Never Before
          </h2>

          <p className="text-gray-700 m-0">
            At 99Visual Solutions, we go beyond standard 3D modeling by offering
            advanced product visualization with customizable colors, textures,
            and multiple viewing options. Our services help you present products
            in a way that feels real, interactive, and customer-ready.
          </p>
        </div>

      </div>
    </div>
  );
}