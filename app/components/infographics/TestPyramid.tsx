// app/components/infographics/TestPyramid.tsx
// The test pyramid: most checks at unit level, fewer at API/contract level,
// and only the critical journeys as end-to-end browser tests. Tiers build up
// from the base when scrolled into view; the side axes show the trade-off
// (count vs run time / maintenance cost).
import s from "./infographics.module.css";

const TIERS = [
  { name: "End-to-end (UI)",  note: "Critical user journeys",           size: "Fewest · minutes",     tone: "orange", w: 44, dots: 2 },
  { name: "API & contract",   note: "Business logic & integrations",    size: "More · seconds",       tone: "blue",   w: 72, dots: 5 },
  { name: "Unit",             note: "Functions & components",           size: "Most · milliseconds",  tone: "green",  w: 100, dots: 9 },
] as const;

export default function TestPyramid({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.pyr} ${className}`} data-ig="" aria-labelledby="ig-pyr-cap">
      <div className={s.pyrHead}>
        <span className={s.badge}>Test pyramid</span>
      </div>
      <div className={s.pyrBody}>
        <span className={s.pyrAxis} data-side="l" aria-hidden="true"><i />Run time &amp; upkeep</span>
        <ol className={s.pyrList}>
          {TIERS.map((t, i) => {
            const top = i === 0 ? t.w - 26 : TIERS[i - 1].w;
            const inset = (((t.w - top) / 2) / t.w) * 100;
            return (
              <li key={t.name} className={s.pyrTier} data-tone={t.tone}
                style={{ width: `${t.w}%`, clipPath: `polygon(${inset}% 0,${100 - inset}% 0,100% 100%,0 100%)`, ["--d" as string]: TIERS.length - 1 - i }}>
                <span className={s.pyrName}>{t.name}</span>
                <span className={s.pyrNote}>{t.note}</span>
                <span className={s.pyrDots} aria-hidden="true">
                  {Array.from({ length: t.dots }, (_, k) => <i key={k} style={{ ["--k" as string]: k }} />)}
                </span>
                <span className={s.pyrSize}>{t.size}</span>
              </li>
            );
          })}
        </ol>
        <span className={s.pyrAxis} data-side="r" aria-hidden="true"><i />Number of tests</span>
      </div>
      <figcaption id="ig-pyr-cap" className={s.caption}>
        Most checks belong at unit and API level, where they run in seconds and fail for one clear
        reason. Browser tests are kept to the journeys that matter most.
      </figcaption>
    </figure>
  );
}
