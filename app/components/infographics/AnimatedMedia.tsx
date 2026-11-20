// app/components/infographics/AnimatedMedia.tsx
// Wraps a raster infographic (next/image or <picture>) so it animates like
// the SVG infographics: it rises and fades in when scrolled into view, a soft
// light sweep crosses it once, and it zooms slightly on hover. Driven by the
// same <InViewObserver /> (data-ig); fully visible without JavaScript, and
// static for visitors who prefer reduced motion.
import type { ReactNode } from "react";
import s from "./infographics.module.css";

export default function AnimatedMedia({ children, className = "", delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  return (
    <div className={`${s.media} ${className}`} data-ig="" style={{ ["--d" as string]: delay }}>
      {children}
    </div>
  );
}
