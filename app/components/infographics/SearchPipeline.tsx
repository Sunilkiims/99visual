// app/components/infographics/SearchPipeline.tsx
// How a search engine gets from a URL to a visible result — four isometric
// stages, each paired with what we check at that stage. Mirrors the audit
// checklist in the "website itself" section so the visual and copy agree.
import s from "./infographics.module.css";
import { box, TONES, type Tone } from "./iso";

function IsoBox({ b, tone }: { b: ReturnType<typeof box>; tone: Tone }) {
  return (
    <g>
      <polygon points={b.left} fill={tone.left} />
      <polygon points={b.right} fill={tone.right} />
      <polygon points={b.top} fill={tone.top} />
    </g>
  );
}

function CrawlArt() {
  const base = box(0, 0, 0, 64, 64, 5, 80, 46);
  const tiles = [
    { b: box(6, 6, 14, 18, 22, 2, 80, 46), tone: TONES.blue },
    { b: box(40, 8, 14, 18, 22, 2, 80, 46), tone: TONES.paper },
    { b: box(22, 38, 14, 18, 22, 2, 80, 46), tone: TONES.paper },
  ];
  const c = tiles.map((t) => t.b.topCenter);
  return (
    <svg viewBox="0 0 160 120" className={s.pipeArt} aria-hidden="true" focusable="false">
      <IsoBox b={base} tone={TONES.paper} />
      {c.map(([x, y], i) => <ellipse key={i} cx={x} cy={y + 14} rx="13" ry="6" fill="#12141A" opacity=".08" />)}
      <path className={s.pipeLinkPath} d={`M${c[0][0]} ${c[0][1]} L${c[1][0]} ${c[1][1]} L${c[2][0]} ${c[2][1]} Z`} />
      {tiles.map((t, i) => <IsoBox key={i} b={t.b} tone={t.tone} />)}
      <g className={s.pipeBob}>
        <circle cx={c[0][0] - 4} cy={c[0][1] - 24} r="9" fill="#fff" stroke="#12141A" strokeWidth="2.2" />
        <line x1={c[0][0] + 2.5} y1={c[0][1] - 17.5} x2={c[0][0] + 8} y2={c[0][1] - 11} stroke="#12141A" strokeWidth="3" strokeLinecap="round" />
        <circle cx={c[0][0] - 4} cy={c[0][1] - 24} r="3" fill="#2E5CFF" />
      </g>
    </svg>
  );
}

function IndexArt() {
  const cx = 80;
  const discs = [86, 64, 42];
  return (
    <svg viewBox="0 0 160 120" className={s.pipeArt} aria-hidden="true" focusable="false">
      <ellipse cx={cx} cy={104} rx="40" ry="10" fill="#12141A" opacity=".07" />
      {discs.map((y, i) => {
        const t = i === 2 ? TONES.blue : TONES.paper;
        return (
          <g key={y}>
            <path d={`M${cx - 34} ${y} v12 a34 14 0 0 0 68 0 v-12 z`} fill={t.left} />
            <path d={`M${cx} ${y + 14} v12 a34 14 0 0 0 34 -14 v-12 a34 14 0 0 1 -34 14 z`} fill={t.right} />
            <ellipse cx={cx} cy={y} rx="34" ry="14" fill={t.top} />
            {i < 2 && <circle cx={cx + 22} cy={y + 15} r="2" fill="#37D67A" />}
          </g>
        );
      })}
      <g className={s.pipeDrop}>
        <rect x={cx - 9} y="6" width="18" height="22" rx="2.5" fill="#fff" stroke="#12141A" strokeWidth="1.8" />
        <line x1={cx - 5} y1="13" x2={cx + 5} y2="13" stroke="#2E5CFF" strokeWidth="2" strokeLinecap="round" />
        <line x1={cx - 5} y1="18" x2={cx + 3} y2="18" stroke="#C9D0E2" strokeWidth="2" strokeLinecap="round" />
        <line x1={cx - 5} y1="22" x2={cx + 4} y2="22" stroke="#C9D0E2" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RankArt() {
  const O: [number, number] = [74, 46];
  const base = box(0, 0, 0, 70, 30, 4, ...O);
  const bars = [
    { b: box(4, 7, 4, 16, 16, 24, ...O), tone: TONES.paper, n: "2" },
    { b: box(27, 7, 4, 16, 16, 40, ...O), tone: TONES.blue,  n: "1" },
    { b: box(50, 7, 4, 16, 16, 14, ...O), tone: TONES.paper, n: "3" },
  ];
  return (
    <svg viewBox="0 0 160 120" className={s.pipeArt} aria-hidden="true" focusable="false">
      <IsoBox b={base} tone={TONES.paper} />
      {bars.map((x) => <IsoBox key={x.n} b={x.b} tone={x.tone} />)}
      {bars.map((x) => (
        <text key={`t${x.n}`} x={x.b.topCenter[0]} y={x.b.topCenter[1] - 8} textAnchor="middle"
          className={s.pipeArtNum} data-first={x.n === "1" ? "" : undefined}>#{x.n}</text>
      ))}
    </svg>
  );
}

function VisibilityArt() {
  return (
    <svg viewBox="0 0 160 120" className={s.pipeArt} aria-hidden="true" focusable="false">
      <rect x="22" y="12" width="116" height="94" rx="8" fill="#12141A" opacity=".06" transform="translate(3 4)" />
      <rect x="22" y="12" width="116" height="94" rx="8" fill="#fff" stroke="#DCE0EA" />
      <circle cx="32" cy="22" r="2.2" fill="#FF8A2E" /><circle cx="39" cy="22" r="2.2" fill="#C9D0E2" /><circle cx="46" cy="22" r="2.2" fill="#C9D0E2" />
      <rect x="32" y="30" width="96" height="11" rx="5.5" fill="#F2F4F8" stroke="#E4E6EC" />
      <circle cx="39" cy="35.5" r="2.6" fill="none" stroke="#5B6172" strokeWidth="1.3" />
      <rect x="30" y="48" width="100" height="20" rx="5" fill="#2E5CFF" fillOpacity=".08" stroke="#2E5CFF" strokeOpacity=".5" />
      <rect x="36" y="53" width="48" height="3.5" rx="1.75" fill="#2E5CFF" />
      <rect x="36" y="60" width="74" height="3" rx="1.5" fill="#9AA3B8" />
      <g transform="translate(118 58)"><circle r="6.5" fill="#37D67A" /><path d="M-3 0 l2 2.4 l4 -4.6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
      {[74, 86, 98].map((y) => (
        <g key={y}><rect x="36" y={y - 2} width="40" height="3" rx="1.5" fill="#C9D0E2" /><rect x="36" y={y + 3} width="62" height="2.5" rx="1.25" fill="#E4E6EC" /></g>
      ))}
      <path className={s.pipeCursor} d="M100 66 l0 16 l4.5 -4 l3 6.5 l3 -1.4 l-3 -6.3 l6 -0.4 z" fill="#12141A" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

const STAGES = [
  { n: "01", title: "Crawl",            art: <CrawlArt />,      text: "Search bots discover URLs by following internal links and XML sitemaps.",                      checks: ["robots.txt", "XML sitemap", "Internal links"] },
  { n: "02", title: "Render & index",   art: <IndexArt />,      text: "Pages are rendered, understood and stored in the index — or excluded, with a reason.",           checks: ["Server-rendered HTML", "Canonicals", "Indexing report"] },
  { n: "03", title: "Rank",             art: <RankArt />,       text: "Indexed pages are ordered for each query by relevance, quality and page experience.",            checks: ["Search intent", "Core Web Vitals", "Authority"] },
  { n: "04", title: "Search visibility", art: <VisibilityArt />, text: "Results earn the click through titles, rich results, Maps listings and AI Overviews.",          checks: ["Structured data", "Titles & meta", "Business Profile"] },
];

export default function SearchPipeline({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.pipe} ${className}`} data-ig="" aria-labelledby="ig-pipe-cap">
      <ol className={s.pipeList}>
        {STAGES.map((st, i) => (
          <li key={st.n} className={`${s.pipeStage} ${s.rev}`} style={{ ["--d" as string]: i }}>
            <div className={s.pipeArtWrap}>{st.art}</div>
            <div className={s.pipeBody}>
              <span className={s.pipeNum}>{st.n}</span>
              <h3 className={s.pipeTitle}>{st.title}</h3>
              <p className={s.pipeText}>{st.text}</p>
              <ul className={s.pipeChecks} aria-label={`What we check at the ${st.title.toLowerCase()} stage`}>
                {st.checks.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            {i < STAGES.length - 1 && <span className={s.pipeArrow} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <figcaption id="ig-pipe-cap" className={s.caption}>
        A problem at any stage caps everything after it — which is why every engagement starts
        with the crawl and index stages, not with content.
      </figcaption>
    </figure>
  );
}
