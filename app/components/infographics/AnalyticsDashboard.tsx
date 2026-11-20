// app/components/infographics/AnalyticsDashboard.tsx
// A report-style dashboard showing the metrics we report on (GSC, GA4,
// Google Ads). It uses SAMPLE DATA and is labelled as such everywhere — the
// page deliberately publishes no invented client results.
//
// Charts follow the house rules: one y-axis, thin 2px lines, a legend plus
// direct end labels for the two series (the paid line is also dashed so
// identity never relies on colour), a recessive grid, one sequential hue for
// magnitude, and a CSS-only crosshair tooltip per month. Axis text is HTML,
// so it stays readable at phone widths.
import s from "./infographics.module.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ORGANIC = [4.2, 4.5, 4.7, 5.2, 5.5, 6.1, 6.4, 7.0, 7.4, 8.1, 8.6, 9.3];
const PAID    = [3.0, 3.4, 3.3, 3.6, 3.8, 3.7, 4.0, 4.1, 3.9, 4.2, 4.4, 4.3];
const Y_MAX = 10;

const KPIS = [
  { label: "Organic clicks",  value: "12.4k", delta: "+18%",            note: "vs previous period", spark: [6, 7, 6.5, 8, 8.4, 9.2, 10.1, 12.4], invert: false },
  { label: "Avg. position",   value: "8.7",   delta: "from 11.2",       note: "lower is better",    spark: [11.2, 10.9, 10.4, 10.1, 9.6, 9.3, 9.0, 8.7], invert: true },
  { label: "Conversions",     value: "326",   delta: "+12%",            note: "all channels",       spark: [240, 255, 262, 270, 284, 291, 305, 326], invert: false },
  { label: "Engagement rate", value: "61%",   delta: "+4 pts",          note: "GA4 engaged sessions", spark: [54, 55, 55, 57, 58, 58, 60, 61], invert: false },
];

const POSITIONS = [
  { band: "Top 3", n: 24, color: "#1D3FC4" },
  { band: "4–10",  n: 41, color: "#2E5CFF" },
  { band: "11–20", n: 36, color: "#7F9BFF" },
  { band: "21–50", n: 29, color: "#C3D0FF" },
];

const CHANNELS = [
  { name: "Organic search", n: 142 },
  { name: "Paid search",    n: 96 },
  { name: "Paid social",    n: 38 },
  { name: "Email",          n: 31 },
  { name: "Referral",       n: 19 },
];

const xAt = (i: number) => (i / (MONTHS.length - 1)) * 100;
const yAt = (v: number) => 100 - (v / Y_MAX) * 100;
const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${xAt(i).toFixed(2)} ${yAt(v).toFixed(2)}`).join(" ");

function Spark({ vals, invert }: { vals: number[]; invert: boolean }) {
  const min = Math.min(...vals), max = Math.max(...vals);
  const d = vals.map((v, i) => {
    let t = (v - min) / (max - min || 1);
    if (invert) t = 1 - t;
    return `${i ? "L" : "M"}${((i / (vals.length - 1)) * 100).toFixed(1)} ${(92 - t * 84).toFixed(1)}`;
  }).join(" ");
  return (
    <svg className={`${s.dashSpark} ${s.wipe}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={`${d} L100 100 L0 100 Z`} className={s.dashSparkArea} />
      <path d={d} className={s.dashSparkLine} />
    </svg>
  );
}

export default function AnalyticsDashboard({ className = "" }: { className?: string }) {
  const totalKw = POSITIONS.reduce((a, b) => a + b.n, 0);
  const maxCh = Math.max(...CHANNELS.map((c) => c.n));

  return (
    <figure className={`${s.ig} ${s.dash} ${className}`} data-ig="" aria-labelledby="ig-dash-cap">
      <div className={s.dashWindow}>
        <div className={s.dashChrome}>
          <span className={s.dashDots} aria-hidden="true"><i /><i /><i /></span>
          <span className={s.dashTitle}>Monthly performance report</span>
          <span className={s.dashSample}>Sample data</span>
        </div>

        <div className={s.dashKpis}>
          {KPIS.map((k, i) => (
            <div key={k.label} className={`${s.dashKpi} ${s.rev}`} style={{ ["--d" as string]: i }}>
              <span className={s.dashKpiLabel}>{k.label}</span>
              <span className={s.dashKpiValue}>{k.value}</span>
              <span className={s.dashKpiDelta}><b>▲ {k.delta}</b> {k.note}</span>
              <Spark vals={k.spark} invert={k.invert} />
            </div>
          ))}
        </div>

        <div className={s.dashBody}>
          <div className={`${s.dashPanel} ${s.dashPanelWide}`}>
            <div className={s.dashPanelHead}>
              <span className={s.dashPanelTitle}>Sessions by source · thousands</span>
              <span className={s.dashLegend}>
                <span><i className={s.dashKeyOrganic} />Organic</span>
                <span><i className={s.dashKeyPaid} />Paid</span>
              </span>
            </div>
            <div className={s.dashChart}>
              <div className={s.dashYAxis} aria-hidden="true">
                {[10, 7.5, 5, 2.5, 0].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className={s.dashPlot}>
                <svg className={`${s.dashLines} ${s.wipe}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  {[0, 25, 50, 75, 100].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className={y === 100 ? s.dashBase : s.dashGrid} />)}
                  <path d={`${line(ORGANIC)} L100 100 L0 100 Z`} className={s.dashArea} />
                  <path d={line(PAID)} className={s.dashPaid} />
                  <path d={line(ORGANIC)} className={s.dashOrganic} />
                </svg>
                <span className={s.dashEnd} data-series="organic" style={{ top: `${yAt(ORGANIC[11])}%` }}>Organic</span>
                <span className={s.dashEnd} data-series="paid" style={{ top: `${yAt(PAID[11])}%` }}>Paid</span>
                <div className={s.dashHits}>
                  {MONTHS.map((m, i) => (
                    <span key={m} className={s.dashHit} data-edge={i > 8 ? "r" : i < 2 ? "l" : undefined}
                      style={{ left: `${xAt(i)}%`, ["--yo" as string]: `${yAt(ORGANIC[i])}%`, ["--yp" as string]: `${yAt(PAID[i])}%` }}>
                      <span className={s.dashTip}>
                        <b>{m}</b>
                        <span><i className={s.dashKeyOrganic} />Organic {ORGANIC[i].toFixed(1)}k</span>
                        <span><i className={s.dashKeyPaid} />Paid {PAID[i].toFixed(1)}k</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.dashXAxis} aria-hidden="true">
                {MONTHS.map((m, i) => <span key={m} style={{ left: `${xAt(i)}%` }} data-minor={i % 2 ? "" : undefined}>{m}</span>)}
              </div>
            </div>
            <table className={s.srOnly}>
              <caption>Sample sessions by source, in thousands</caption>
              <thead><tr><th scope="col">Month</th><th scope="col">Organic</th><th scope="col">Paid</th></tr></thead>
              <tbody>{MONTHS.map((m, i) => <tr key={m}><th scope="row">{m}</th><td>{ORGANIC[i]}</td><td>{PAID[i]}</td></tr>)}</tbody>
            </table>
          </div>

          <div className={s.dashSide}>
            <div className={s.dashPanel}>
              <div className={s.dashPanelHead}>
                <span className={s.dashPanelTitle}>Keyword positions</span>
                <span className={s.dashPanelMeta}>{totalKw} tracked</span>
              </div>
              <div className={s.dashStack} aria-hidden="true">
                {POSITIONS.map((p, i) => (
                  <span key={p.band} className={`${s.dashStackSeg} ${s.grow}`} title={`${p.band}: ${p.n} keywords`}
                    style={{ flexGrow: p.n, background: p.color, ["--d" as string]: i }} />
                ))}
              </div>
              <ul className={s.dashStackLegend}>
                {POSITIONS.map((p) => (
                  <li key={p.band}><i style={{ background: p.color }} />{p.band}<b>{p.n}</b></li>
                ))}
              </ul>
            </div>

            <div className={s.dashPanel}>
              <div className={s.dashPanelHead}>
                <span className={s.dashPanelTitle}>Conversions by channel</span>
              </div>
              <ul className={s.dashBars}>
                {CHANNELS.map((c, i) => (
                  <li key={c.name} title={`${c.name}: ${c.n} conversions`}>
                    <span className={s.dashBarName}>{c.name}</span>
                    <span className={s.dashBarTrack}>
                      <span className={`${s.dashBarFill} ${s.grow}`} style={{ width: `${(c.n / maxCh) * 100}%`, ["--d" as string]: i }} />
                    </span>
                    <span className={s.dashBarVal}>{c.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption id="ig-dash-cap" className={s.caption}>
        Illustrative report layout with sample data — not client results. Real reports pull
        from Google Search Console, Google Analytics 4 and Google Ads for your own account.
      </figcaption>
    </figure>
  );
}
