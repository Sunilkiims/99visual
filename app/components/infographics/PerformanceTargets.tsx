// app/components/infographics/PerformanceTargets.tsx
// The performance bar a build is tested against before launch: Lighthouse
// category targets as animated rings, and Core Web Vitals shown on Google's
// own good / needs-improvement / poor scales with where we aim to land.
// These are targets and published thresholds — not client results.
import s from "./infographics.module.css";

const CATEGORIES = ["Performance", "Accessibility", "Best practices", "SEO"];

// Google's published Core Web Vitals thresholds (75th percentile of visits).
const VITALS = [
  { key: "LCP", name: "Largest Contentful Paint", good: "≤ 2.5 s", poor: "> 4 s",     split: [50, 30, 20], target: 30 },
  { key: "INP", name: "Interaction to Next Paint", good: "≤ 200 ms", poor: "> 500 ms", split: [40, 35, 25], target: 22 },
  { key: "CLS", name: "Cumulative Layout Shift",   good: "≤ 0.1",    poor: "> 0.25",   split: [40, 35, 25], target: 18 },
];

export default function PerformanceTargets({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.perf} ${className}`} data-ig="" aria-labelledby="ig-perf-cap">
      <div className={s.perfHead}>
        <span className={s.badge}>Performance targets</span>
        <span className={s.perfNote}>Checked before every launch</span>
      </div>
      <div className={s.perfGrid}>
        <ul className={s.perfRings} aria-label="Lighthouse score targets">
          {CATEGORIES.map((c, i) => (
            <li key={c} className={`${s.perfRing} ${s.rev}`} style={{ ["--d" as string]: i }}>
              <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                <circle cx="50" cy="50" r="42" className={s.perfTrack} />
                <circle cx="50" cy="50" r="42" className={s.perfArc} pathLength={100}
                  style={{ ["--v" as string]: 92, ["--d" as string]: i }} transform="rotate(-90 50 50)" />
              </svg>
              <span className={s.perfScore}>90+</span>
              <span className={s.perfLabel}>{c}</span>
            </li>
          ))}
        </ul>

        <ul className={s.vitals} aria-label="Core Web Vitals thresholds">
          {VITALS.map((v, i) => (
            <li key={v.key} className={`${s.vital} ${s.rev}`} style={{ ["--d" as string]: i + 2 }}>
              <div className={s.vitalTop}>
                <span className={s.vitalKey}>{v.key}</span>
                <span className={s.vitalName}>{v.name}</span>
                <span className={s.vitalGood}>Good {v.good}</span>
              </div>
              <div className={s.vitalBar} aria-hidden="true">
                <span style={{ flexGrow: v.split[0] }} data-zone="good" />
                <span style={{ flexGrow: v.split[1] }} data-zone="mid" />
                <span style={{ flexGrow: v.split[2] }} data-zone="poor" />
                <i className={s.vitalMarker} style={{ left: `${v.target}%`, ["--d" as string]: i }} />
              </div>
              <div className={s.vitalScale} aria-hidden="true">
                <span>Good</span><span>Needs improvement</span><span>Poor {v.poor}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="ig-perf-cap" className={s.caption}>
        Targets, not a scorecard: we aim for 90+ in each Lighthouse category and for every Core
        Web Vital to sit in Google&rsquo;s &ldquo;good&rdquo; range, measured on real visits after launch.
      </figcaption>
    </figure>
  );
}
