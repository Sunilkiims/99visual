// app/components/infographics/ProcessCycle.tsx
// The delivery process as a continuous cycle: a ring of numbered stages beside
// the step cards. Hovering/focusing a card lights up its stage on the ring via
// CSS :has() — no JavaScript. Step copy is passed in from the page so the
// content stays owned by the page, not the component.
import type { ReactNode } from "react";
import { FaSyncAlt } from "react-icons/fa";
import s from "./infographics.module.css";

export type CycleStep = { step: string; title: string; text: string; icon: ReactNode };

const C = 160;
const R = 118;

export default function ProcessCycle({ steps, className = "" }: { steps: CycleStep[]; className?: string }) {
  const n = steps.length;
  const at = (i: number, r = R, off = 0) => {
    const a = ((-90 + (360 / n) * i + off) * Math.PI) / 180;
    return { x: C + r * Math.cos(a), y: C + r * Math.sin(a), deg: -90 + (360 / n) * i + off };
  };

  return (
    <div className={`${s.ig} ${className}`} data-ig="">
     <div className={s.cycle}>
      <div className={s.cycleRingWrap}>
        <svg className={s.cycleSvg} viewBox="0 0 320 320" role="img" aria-labelledby="ig-cycle-t">
          <title id="ig-cycle-t">{`A repeating ${n}-stage cycle: ${steps.map((x) => x.title).join(", ")}, then back to the start.`}</title>
          <defs>
            <linearGradient id="ig-cycle-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2E5CFF" />
              <stop offset="100%" stopColor="#37D67A" />
            </linearGradient>
          </defs>
          <circle cx={C} cy={C} r={R + 26} className={s.cycleHalo} />
          <circle cx={C} cy={C} r={R} className={s.cycleTrack} />
          <circle cx={C} cy={C} r={R} className={`${s.cycleArc} ${s.draw}`} pathLength={100} stroke="url(#ig-cycle-grad)"
            transform={`rotate(-90 ${C} ${C})`} />
          {steps.map((_, i) => {
            const m = at(i, R, 180 / n);
            return (
              <path key={`c${i}`} d="M-4 -5 L3 0 L-4 5" className={s.cycleChevron}
                transform={`translate(${m.x} ${m.y}) rotate(${m.deg + 90})`} />
            );
          })}
          {steps.map((st, i) => {
            const p = at(i);
            return (
              <g key={st.step} className={s.cycleNode} data-step={i + 1} transform={`translate(${p.x} ${p.y})`}>
                <circle r="22" className={s.cycleNodeBg} />
                <text y="5" textAnchor="middle" className={s.cycleNodeNum}>{st.step}</text>
              </g>
            );
          })}
        </svg>
        <div className={s.cycleCenter} aria-hidden="true">
          <span className={s.cycleCenterIcon}><FaSyncAlt /></span>
          <span className={s.cycleCenterTitle}>Repeat</span>
          <span className={s.cycleCenterSub}>every cycle</span>
        </div>
      </div>

      <ol className={s.cycleSteps}>
        {steps.map((st, i) => (
          <li key={st.step} className={`${s.cycleStep} ${s.rev}`} data-step={i + 1}
            style={{ ["--d" as string]: i }}>
            <div className={s.cycleStepTop}>
              <span className={s.cycleStepIcon} aria-hidden="true">{st.icon}</span>
              <span className={s.cycleStepNum} aria-hidden="true">{st.step}</span>
            </div>
            <h3 className={s.cycleStepTitle}>{st.title}</h3>
            <p className={s.cycleStepText}>{st.text}</p>
          </li>
        ))}
      </ol>
     </div>
    </div>
  );
}
