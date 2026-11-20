// app/components/infographics/SeoImpactMap.tsx
// Infographic E — how build decisions feed search and business outcomes.
// Left: what we build. Middle: what it improves. Right: what it supports.
// Curved connectors (animated dashes) show which affects which. On phones
// the three columns stack with a "leads to" step between them.
// Wording avoids ranking promises: Google doesn't publish weightings.
import s from "./infographics.module.css";

const BUILD = ["Page speed", "Mobile responsiveness", "Technical SEO", "Structured data"];
const IMPROVES = ["Core Web Vitals", "Crawling & indexing", "Rich result eligibility", "User experience"];
const SUPPORTS = ["Search visibility", "Engagement", "Enquiries & sales"];

// [fromIndex, toIndex] pairs, left→middle and middle→right.
const L2M: [number, number][] = [[0, 0], [0, 3], [1, 0], [1, 3], [2, 1], [3, 2]];
const M2R: [number, number][] = [[0, 0], [0, 1], [1, 0], [2, 0], [3, 1], [3, 2]];

const yL = (i: number) => 12.5 + i * 25;           // 4 rows
const yR = (i: number) => (100 / 6) + i * (100 / 3); // 3 rows

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export default function SeoImpactMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.seoMap} ${className}`} data-ig="" aria-labelledby="ig-seomap-cap">
      <div className={s.seoMapHead}>
        <span className={s.badge}>Performance &amp; SEO</span>
      </div>
      <div className={s.seoMapGrid}>
        <svg className={s.seoMapLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          {L2M.map(([a, b]) => <path key={`l${a}${b}`} d={curve(30, yL(a), 36, yL(b))} className={s.seoMapPath} pathLength={100} />)}
          {M2R.map(([a, b]) => <path key={`r${a}${b}`} d={curve(64, yL(a), 70, yR(b))} className={s.seoMapPath} data-side="r" pathLength={100} />)}
        </svg>
        {[{ title: "What we build", items: BUILD, key: "build" }, { title: "What it improves", items: IMPROVES, key: "imp" }, { title: "What it supports", items: SUPPORTS, key: "sup" }].map((col, ci) => (
          <div key={col.key} className={s.seoMapCol} data-col={col.key}>
            <span className={s.seoMapColTitle}>{col.title}</span>
            <ul>
              {col.items.map((it, i) => (
                <li key={it} className={`${s.seoMapItem} ${s.rev}`} data-col={col.key} style={{ ["--d" as string]: ci * 2 + i * 0.5 }}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption id="ig-seomap-cap" className={s.caption}>
        Speed and mobile layout feed Core Web Vitals and user experience; technical SEO and
        structured data help search engines crawl the site and show richer results. Google
        doesn&rsquo;t publish exact weightings, so nobody can honestly guarantee rankings — these are
        the parts we control.
      </figcaption>
    </figure>
  );
}
