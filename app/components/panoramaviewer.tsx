"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// ─────────────────────────────────────────────────────────────────────────────
// Pannellum (360° panorama viewer) — loaded HERE, not sitewide.
//
// PanoramaViewer is only rendered by app/components/services.tsx, which is
// only imported by app/services/visualization/page.tsx. Pannellum's CSS/JS
// previously lived in the root layout (app/layout.tsx) and shipped as a
// render-blocking stylesheet + beforeInteractive script on every route in
// the site — homepage, about, contact, every other service page — to
// support a feature used on exactly one page. Moving it here means only
// visitors to /services/visualization pay for it, and it loads lazily
// instead of blocking hydration.
// ─────────────────────────────────────────────────────────────────────────────

const PANNELLUM_CSS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
const PANNELLUM_JS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";

export default function PanoramaViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Inject the Pannellum stylesheet once, only when this component mounts.
  // A plain <link> tag (rather than next/head) is fine here since this is a
  // client component and the tag only needs to exist before the viewer paints
  // — it carries no SEO weight and doesn't need to be server-rendered.
  useEffect(() => {
    if (document.querySelector(`link[href="${PANNELLUM_CSS}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = PANNELLUM_CSS;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!scriptReady || !(window as any).pannellum || !containerRef.current) return;

    const viewer = (window as any).pannellum.viewer(containerRef.current, {
      type: "equirectangular",
      panorama: "/panoramas/luxury-apartment.jpg",
      autoLoad: true,
      hfov: 110,
      pitch: 10,
      yaw: 180,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
    });

    const t = setTimeout(() => viewer.resize(), 300);
    return () => clearTimeout(t);
  }, [scriptReady]);

  return (
    <div className="w-full md:w-[100%]">
      {/*
        strategy="lazyOnload" — fetched after the page is interactive, not
        beforeInteractive. Since this component only ever renders on
        /services/visualization, this never competes with LCP/FCP on any
        other route.
      */}
      <Script
        src={PANNELLUM_JS}
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "320px",
        }}
        className="rounded-2xl overflow-hidden shadow-xl"
      />
    </div>
  );
}