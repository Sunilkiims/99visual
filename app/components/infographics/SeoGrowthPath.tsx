// app/components/infographics/SeoGrowthPath.tsx
// Six SEO layers as ascending isometric columns — each layer rests on the one
// before it, ending in organic growth. Desktop: a rising skyline with a growth
// curve; mobile: the same DOM reflows into stacked rows with growing bars.
import type { ReactNode } from "react";
import { FaKey, FaTools, FaPenNib, FaLayerGroup, FaLink, FaArrowUp } from "react-icons/fa";
import s from "./infographics.module.css";

type Step = { title: string; text: string; icon: ReactNode };

const STEPS: Step[] = [
  { title: "Keyword research",     text: "Real search demand and intent mapped to pages", icon: <FaKey /> },
  { title: "Technical SEO",        text: "A crawlable, fast, indexable foundation",       icon: <FaTools /> },
  { title: "On-page optimisation", text: "Titles, headings, copy and internal links",      icon: <FaPenNib /> },
  { title: "Content strategy",     text: "Topic clusters that answer real questions",      icon: <FaLayerGroup /> },
  { title: "Link building",        text: "Earned authority through digital PR",            icon: <FaLink /> },
  { title: "Organic growth",       text: "Qualified traffic that compounds over time",     icon: <FaArrowUp /> },
];

export default function SeoGrowthPath({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.growth} ${className}`} data-ig="" aria-labelledby="ig-growth-cap">
      <div className={s.growthHead}>
        <span className={s.badge}>SEO growth path</span>
        <span className={s.growthAxis} aria-hidden="true">Organic visibility ↑</span>
      </div>

      <div className={s.growthChart}>
        {/* Trend line through the top faces of the columns (same 200px box). */}
        <svg className={`${s.growthCurve} ${s.wipe}`} viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="ig-growth-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#2E5CFF" stopOpacity=".5" />
              <stop offset="100%" stopColor="#22A65A" />
            </linearGradient>
          </defs>
          <path d="M40 112 L148 85 L248 58 L348 31 L448 4 L560 -24" fill="none" stroke="url(#ig-growth-line)"
            strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className={s.growthList}>
          {STEPS.map((st, i) => (
            <li key={st.title} className={`${s.growthStep} ${s.rev}`}
              data-last={i === STEPS.length - 1 ? "" : undefined}
              style={{ ["--h" as string]: `${28 + i * 14.4}%`, ["--d" as string]: i }}>
              <div className={s.growthBarWrap} aria-hidden="true">
                <div className={s.growthBar}>
                  <span className={s.growthBarIcon}>{st.icon}</span>
                </div>
              </div>
              <div className={s.growthMeta}>
                <span className={s.growthNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.growthTitle}>{st.title}</span>
                <span className={s.growthText}>{st.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption id="ig-growth-cap" className={s.caption}>
        Each layer builds on the one before it — content and links can’t lift pages that
        search engines can’t crawl or understand. Illustrative, not to scale.
      </figcaption>
    </figure>
  );
}
