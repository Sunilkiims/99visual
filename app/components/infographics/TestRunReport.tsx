// app/components/infographics/TestRunReport.tsx
// A CI test-run report of the kind we hand over: totals, results per suite,
// failures with their trace / screenshot / video, quarantined flaky tests and
// a duration trend. SAMPLE DATA, badged as such — not client results.
// Identity is never colour-alone: every status carries a text label, the
// suite bars have a legend and visible counts, and an sr-only table repeats
// the numbers.
import s from "./infographics.module.css";

const KPIS = [
  { label: "Passed",            value: "412",    tone: "good" },
  { label: "Failed",            value: "3",      tone: "bad" },
  { label: "Flaky, quarantined", value: "2",     tone: "warn" },
  { label: "Duration",          value: "6m 40s", tone: "none" },
] as const;

const SUITES = [
  { name: "Unit",           pass: 280, fail: 0, flaky: 0 },
  { name: "API & contract", pass: 95,  fail: 1, flaky: 0 },
  { name: "End-to-end",     pass: 37,  fail: 2, flaky: 2 },
];

const FAILURES = [
  { test: "checkout › applies coupon code", status: "Failed",      tone: "bad" },
  { test: "orders API › rejects expired token", status: "Failed",  tone: "bad" },
  { test: "profile › uploads avatar",        status: "Quarantined", tone: "warn" },
] as const;

// Minutes per run, last 10 runs (sample).
const DURATION = [9.1, 8.8, 8.9, 8.2, 7.9, 7.6, 7.4, 7.0, 6.9, 6.7];

export default function TestRunReport({ className = "" }: { className?: string }) {
  const max = Math.max(...SUITES.map((x) => x.pass + x.fail + x.flaky));
  const dmin = Math.min(...DURATION), dmax = Math.max(...DURATION);
  const spark = DURATION.map((v, i) => `${i ? "L" : "M"}${((i / (DURATION.length - 1)) * 100).toFixed(1)} ${(90 - ((v - dmin) / (dmax - dmin)) * 80).toFixed(1)}`).join(" ");

  return (
    <figure className={`${s.ig} ${s.dash} ${s.run} ${className}`} data-ig="" aria-labelledby="ig-run-cap">
      <div className={s.dashWindow}>
        <div className={s.dashChrome}>
          <span className={s.dashDots} aria-hidden="true"><i /><i /><i /></span>
          <span className={s.dashTitle}>CI test run · main</span>
          <span className={s.dashSample}>Sample data</span>
        </div>

        <div className={s.dashKpis}>
          {KPIS.map((k, i) => (
            <div key={k.label} className={`${s.dashKpi} ${s.rev}`} style={{ ["--d" as string]: i }}>
              <span className={s.dashKpiLabel}>{k.label}</span>
              <span className={s.runKpiValue} data-tone={k.tone}>{k.value}</span>
            </div>
          ))}
        </div>

        <div className={s.dashBody}>
          <div className={s.dashPanel}>
            <div className={s.dashPanelHead}>
              <span className={s.dashPanelTitle}>Results by suite</span>
              <span className={s.runLegend} aria-hidden="true">
                <span><i data-tone="good" />Passed</span><span><i data-tone="bad" />Failed</span><span><i data-tone="warn" />Flaky</span>
              </span>
            </div>
            <ul className={s.runSuites}>
              {SUITES.map((x, i) => {
                const total = x.pass + x.fail + x.flaky;
                return (
                  <li key={x.name}>
                    <span className={s.runSuiteName}>{x.name}</span>
                    <span className={s.runSuiteBar} style={{ width: `${(total / max) * 100}%` }}>
                      <i className={s.grow} data-tone="good" style={{ flexGrow: x.pass, ["--d" as string]: i }} title={`${x.pass} passed`} />
                      {x.fail > 0 && <i className={s.grow} data-tone="bad" style={{ flexGrow: Math.max(x.fail, 4), ["--d" as string]: i }} title={`${x.fail} failed`} />}
                      {x.flaky > 0 && <i className={s.grow} data-tone="warn" style={{ flexGrow: Math.max(x.flaky, 4), ["--d" as string]: i }} title={`${x.flaky} flaky`} />}
                    </span>
                    <span className={s.runSuiteCount}>{x.pass}/{total}</span>
                  </li>
                );
              })}
            </ul>
            <div className={s.runTrend}>
              <span className={s.dashPanelMeta}>Run time, last 10 runs</span>
              <svg className={`${s.runSpark} ${s.wipe}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d={spark} className={s.dashSparkLine} />
              </svg>
              <span className={s.runTrendNote}>9.1 → 6.7 min</span>
            </div>
          </div>

          <div className={s.dashPanel}>
            <div className={s.dashPanelHead}>
              <span className={s.dashPanelTitle}>Needs attention</span>
            </div>
            <ul className={s.runFails}>
              {FAILURES.map((f, i) => (
                <li key={f.test} className={s.rev} style={{ ["--d" as string]: i + 2 }}>
                  <span className={s.runFailTest}>{f.test}</span>
                  <span className={s.runFailMeta}>
                    <b data-tone={f.tone}>{f.status}</b>
                    <span>trace</span><span>screenshot</span><span>video</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <table className={s.srOnly}>
        <caption>Sample CI test run results by suite</caption>
        <thead><tr><th scope="col">Suite</th><th scope="col">Passed</th><th scope="col">Failed</th><th scope="col">Flaky</th></tr></thead>
        <tbody>{SUITES.map((x) => <tr key={x.name}><th scope="row">{x.name}</th><td>{x.pass}</td><td>{x.fail}</td><td>{x.flaky}</td></tr>)}</tbody>
      </table>
      <figcaption id="ig-run-cap" className={s.caption}>
        Illustrative report with sample data — not client results. Real runs publish Playwright,
        Allure or JUnit reports in your CI, with traces, screenshots and video on every failure.
      </figcaption>
    </figure>
  );
}
