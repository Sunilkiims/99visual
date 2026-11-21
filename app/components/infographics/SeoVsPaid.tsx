// app/components/infographics/SeoVsPaid.tsx
// Organic search vs paid search: the typical SHAPE of visibility over time
// (not data), followed by a side-by-side comparison. Neither channel is
// presented as better; the caption says most businesses use a mix.
import s from "./infographics.module.css";

const ROWS = [
  ["Time to first visibility", "Days, once ads are approved", "Usually months of steady work"],
  ["What you pay for", "Each click or impression", "Content, technical work and time"],
  ["When spending stops", "Traffic stops with it", "Rankings tend to hold for a while, then drift"],
  ["How much control you have", "Exact keywords, budget, schedule and audience", "Search engines decide rankings; you influence them"],
  ["How it's measured", "Conversions, cost per lead, ROAS in Google Ads", "Clicks, rankings and organic conversions in Search Console and GA4"],
  ["Often a good fit for", "Launches, promotions, testing demand quickly", "Steady demand and research-heavy purchases"],
];

// Illustrative curves on a 0–600 × 0–220 canvas (y down).
const PAID = "M20 200 L80 200 L92 92 L120 86 L160 94 L200 84 L240 90 L280 82 L320 92 L360 86 L392 90 L404 200 L580 200";
const ORGANIC = "M20 200 C120 198 170 186 230 160 S340 100 400 82 S520 52 580 44";

export default function SeoVsPaid({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.svp} ${className}`} data-ig="" aria-labelledby="ig-svp-cap">
      <div className={s.svpHead}>
        <span className={s.badge}>SEO vs paid search</span>
        <span className={s.svpLegend} aria-hidden="true">
          <span data-k="paid"><i />Paid search</span>
          <span data-k="org"><i />Organic search</span>
        </span>
      </div>
      <div className={s.svpChart}>
        <span className={s.svpY} aria-hidden="true">Visibility</span>
        <svg viewBox="0 0 600 220" className={s.svpSvg} role="img" aria-labelledby="ig-svp-t">
          <title id="ig-svp-t">Illustration: paid visibility switches on quickly and stops when spend stops; organic visibility builds slowly and keeps growing.</title>
          {[60, 110, 160].map((y) => <line key={y} x1="20" x2="580" y1={y} y2={y} className={s.svpGrid} />)}
          <line x1="20" x2="580" y1="200" y2="200" className={s.svpAxis} />
          <line x1="92" x2="92" y1="30" y2="200" className={s.svpMark} />
          <line x1="404" x2="404" y1="30" y2="200" className={s.svpMark} />
          <path d={PAID} pathLength={100} className={`${s.svpLine} ${s.draw}`} data-k="paid" />
          <path d={ORGANIC} pathLength={100} className={`${s.svpLine} ${s.draw}`} data-k="org" />
        </svg>
        <span className={s.svpTag} data-at="start" aria-hidden="true">Campaign starts</span>
        <span className={s.svpTag} data-at="stop" aria-hidden="true">Ad spend paused</span>
        <span className={s.svpX} aria-hidden="true">Time →</span>
        <span className={s.svpNote}>Illustrative shape, not real data</span>
      </div>
      <div className={s.svpTable} role="table" aria-label="SEO and paid search compared">
        <div className={s.svpTr} role="row">
          <span role="columnheader" />
          <span role="columnheader" data-k="paid">Paid search (PPC)</span>
          <span role="columnheader" data-k="org">Organic search (SEO)</span>
        </div>
        {ROWS.map(([k, a, b], i) => (
          <div className={`${s.svpTr} ${s.rev}`} role="row" key={k} style={{ ["--d" as string]: i * 0.5 }}>
            <span role="rowheader">{k}</span>
            <span role="cell" data-k="paid" data-h="Paid">{a}</span>
            <span role="cell" data-k="org" data-h="Organic">{b}</span>
          </div>
        ))}
      </div>
      <figcaption id="ig-svp-cap" className={s.caption}>
        Neither channel is better in every case. Paid search buys visibility now; SEO builds
        visibility you don&apos;t pay for per click. Most businesses get the best return from a mix
        that shifts as organic traffic grows.
      </figcaption>
    </figure>
  );
}
