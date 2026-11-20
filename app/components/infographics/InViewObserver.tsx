"use client";

// app/components/infographics/InViewObserver.tsx
// ─────────────────────────────────────────────────────────────────────────────
// One tiny observer for every infographic on a page (render it once).
//
// Every infographic root carries `data-ig`. Server HTML ships with no value, so
// without JavaScript (or before hydration) every graphic is fully visible in
// its final state — nothing is ever hidden behind JS.
//
// After hydration:
//   data-ig="pending" → below the fold, waiting (entrance styles apply)
//   data-ig="in"      → has entered the viewport once; entrance animation runs
//   data-ig-live      → present only while on screen; looping micro-animations
//                       (data pulses etc.) run only then, so off-screen
//                       graphics cost nothing.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";

export default function InViewObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ig]"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.setAttribute("data-ig", "in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.setAttribute("data-ig", "in");
            el.setAttribute("data-ig-live", "");
          } else {
            if (el.getAttribute("data-ig") !== "in") el.setAttribute("data-ig", "pending");
            el.removeAttribute("data-ig-live");
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
