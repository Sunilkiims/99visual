// app/components/infographics/AccuracyCheckMap.tsx
// Ground control points vs independent checkpoints on a stylised site plan.
// GCPs fix the model to real coordinates; checkpoints are kept out of
// processing and used only to test it. Checkpoints pulse while on screen.
import s from "./infographics.module.css";

const GCPS = [[70, 60], [330, 48], [560, 70], [80, 300], [330, 320], [570, 290]];
const CHECKS = [[200, 150], [450, 170], [210, 250], [460, 245]];

export default function AccuracyCheckMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.acc} ${className}`} data-ig="" aria-labelledby="ig-acc-cap">
      <div className={s.accHead}><span className={s.badge}>How accuracy is checked</span></div>
      <div className={s.accGrid}>
        <svg className={s.accSvg} viewBox="0 0 640 370" role="img" aria-labelledby="ig-acc-t">
          <title id="ig-acc-t">Site plan with six ground control points around the edges and four separate checkpoints inside the area.</title>
          <rect x="0" y="0" width="640" height="370" rx="16" className={s.accBg} />
          <path d="M0 210 C120 190 220 230 340 200 S520 170 640 190" className={s.accRoad} />
          <rect x="40" y="96" width="120" height="70" rx="6" className={s.accPlot} />
          <rect x="380" y="232" width="150" height="70" rx="6" className={s.accPlot} />
          <rect x="220" y="80" width="90" height="56" rx="6" className={s.accPlot} data-b="" />
          <rect x="500" y="100" width="80" height="52" rx="6" className={s.accPlot} data-b="" />
          <rect x="20" y="20" width="600" height="330" rx="10" className={`${s.accBound} ${s.draw}`} pathLength={100} />
          {GCPS.map(([x, y], i) => (
            <g key={`g${i}`} transform={`translate(${x} ${y})`} className={`${s.accGcp} ${s.rev}`} style={{ ["--d" as string]: i * 0.4 }}>
              <path d="M0 -13 L12 9 L-12 9 Z" />
            </g>
          ))}
          {CHECKS.map(([x, y], i) => (
            <g key={`c${i}`} transform={`translate(${x} ${y})`} className={`${s.accChk} ${s.rev}`} style={{ ["--d" as string]: 3 + i * 0.4 }}>
              <circle r="20" className={s.accRipple} />
              <circle r="9" />
            </g>
          ))}
        </svg>
        <ul className={s.accList}>
          <li data-k="gcp"><i aria-hidden="true" /><span><b>Ground control points</b>Surveyed targets used during processing to tie the model to real-world coordinates.</span></li>
          <li data-k="chk"><i aria-hidden="true" /><span><b>Independent checkpoints</b>Surveyed the same way, but kept out of processing so they can test the result honestly.</span></li>
          <li data-k="rep"><i aria-hidden="true" /><span><b>Accuracy report</b>Horizontal and vertical RMSE measured against the checkpoints, set against the target agreed at the start.</span></li>
        </ul>
      </div>
      <figcaption id="ig-acc-cap" className={s.caption}>
        A model checked only against the points used to build it will always look accurate. Ask for
        accuracy measured on separate checkpoints.
      </figcaption>
    </figure>
  );
}
