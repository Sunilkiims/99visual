'use client';

import { useEffect, useRef } from 'react';

export default function BlueScreenBox() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const targetR = 0;
    const targetG = 132;
    const targetB = 239;
    const threshold = 50; // Adjust this if needed

    const render = () => {
      if (video.readyState === 4) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const len = frame.data.length;

        for (let i = 0; i < len; i += 4) {
          const r = frame.data[i];
          const g = frame.data[i + 1];
          const b = frame.data[i + 2];

          const distance = Math.sqrt(
            (r - targetR) ** 2 +
            (g - targetG) ** 2 +
            (b - targetB) ** 2
          );

          if (distance < threshold) {
            frame.data[i + 3] = 0; // Transparent
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      requestAnimationFrame(render);
    };

    video.play().then(() => requestAnimationFrame(render));
  }, []);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Blue Screen Video Inside Box</h1>

      {/* Box Container */}
      <div className="relative w-[640px] h-[360px] border border-white rounded-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} width={640} height={360} className="absolute top-0 left-0 z-10" />
        <video ref={videoRef} src="/videos/blue-screen.mp4" muted loop playsInline className="hidden" />
      </div>
    </div>
  );
}
