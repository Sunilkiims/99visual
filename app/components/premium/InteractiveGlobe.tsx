'use client';

// InteractiveGlobe — lightweight WebGL globe (cobe, ~5 KB) for the homepage hero.
// Performance rules:
// - Loaded with next/dynamic (ssr:false) from the hero, after first paint.
// - The animation loop only runs while the canvas is on screen and the tab
//   is visible; it is destroyed on unmount.
// - Device pixel ratio capped at 2 (1.5 on small screens), fewer map samples
//   on mobile.
// - prefers-reduced-motion: no auto-rotation (drag still works).
// Markers: Bengaluru HQ plus the five markets in the Organization schema's
// areaServed (India, USA, UK, UAE, Australia, South Korea, Japan).
import { useEffect, useRef } from 'react';
import createGlobe, { type Arc, type Marker } from 'cobe';

const HQ: [number, number] = [12.94, 77.74];
const MARKETS: [number, number][] = [
  [40.71, -74.0],   // USA (New York)
  [51.5, -0.12],    // UK (London)
  [25.2, 55.27],    // UAE (Dubai)
  [-33.87, 151.21], // Australia (Sydney)
  [37.57, 126.98],  // South Korea (Seoul)
  [35.68, 139.69],  // Japan (Tokyo)
  [28.61, 77.2],    // India (Delhi)
];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 767px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);

    let size = wrap.offsetWidth;
    let phi = 4.2;
    let theta = 0.28;
    let dragX: number | null = null;
    let dragVel = 0;
    let raf = 0;
    let running = false;

    const markers: Marker[] = [
      { location: HQ, size: 0.09, color: [0.16, 0.85, 0.95] },
      ...MARKETS.map((location) => ({ location, size: 0.05 })),
    ];
    // Arcs to every overseas market; Delhi (last entry) is too close to draw.
    const arcs: Arc[] = MARKETS.slice(0, -1).map((to) => ({ from: HQ, to }));

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta,
      dark: 1,
      diffuse: 1.15,
      mapSamples: small ? 9000 : 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.02,
      baseColor: [0.16, 0.2, 0.32],
      markerColor: [0.53, 0.34, 1],
      glowColor: [0.13, 0.2, 0.45],
      markers,
      arcs,
      arcColor: [0.22, 0.42, 1],
      arcWidth: 0.6,
      arcHeight: 0.28,
      opacity: 0.92,
    });

    const frame = () => {
      if (dragX === null) {
        if (!reduce) phi += 0.0026;
        phi += dragVel;
        dragVel *= 0.94;
      }
      globe.update({ phi, theta });
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()), {
      threshold: 0.05,
    });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const ro = new ResizeObserver(() => {
      size = wrap.offsetWidth;
      globe.update({ width: size * dpr, height: size * dpr });
    });
    ro.observe(wrap);

    const onDown = (e: PointerEvent) => {
      dragX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (dragX === null) return;
      const dx = e.clientX - dragX;
      dragX = e.clientX;
      phi += dx / 180;
      dragVel = dx / 900;
      theta = Math.max(-0.5, Math.min(0.8, theta + e.movementY / 400));
    };
    const onUp = () => {
      dragX = null;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    requestAnimationFrame(() => canvas.classList.add('is-ready'));

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      globe.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className="vz-globe">
      <canvas
        ref={canvasRef}
        className="vz-globe__canvas"
        role="img"
        aria-label="Rotating globe marking our Bengaluru studio and client regions in the USA, UK, UAE, Sydney (Australia), South Korea, Japan and India. Drag to rotate."
        style={{ cursor: 'grab' }}
      />
    </div>
  );
}
