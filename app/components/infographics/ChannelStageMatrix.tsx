// app/components/infographics/ChannelStageMatrix.tsx
// Which marketing channel does most of the work at which stage of the
// customer journey. Filled dot = main job, ring = supporting role. Dots pop
// in column by column (left to right) when the table scrolls into view.
import type { ReactNode } from "react";
import s from "./infographics.module.css";

export type ChannelRow = { name: string; icon: ReactNode; roles: (0 | 1 | 2)[] };

const LABEL = ["Not its main job", "Supporting role", "Main job"];

export default function ChannelStageMatrix({ stages, rows, className = "", caption }: {
  stages: string[]; rows: ChannelRow[]; className?: string; caption: string;
}) {
  return (
    <figure className={`${s.ig} ${s.csm} ${className}`} data-ig="" aria-labelledby="ig-csm-cap">
      <div className={s.csmHead}>
        <span className={s.badge}>Where each channel helps</span>
        <span className={s.csmLegend} aria-hidden="true">
          <span><i data-r="2" />Main job</span>
          <span><i data-r="1" />Supporting</span>
        </span>
      </div>
      <div className={s.csmScroll}>
        <table className={s.csmTable}>
          <thead>
            <tr>
              <th scope="col" className={s.csmCorner}><span className={s.srOnly}>Channel</span></th>
              {stages.map((st, i) => <th scope="col" key={st} className={s.csmStage} style={{ ["--c" as string]: i }}><span>{st}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row" className={s.csmRow}><span className={s.csmIcon} aria-hidden="true">{r.icon}</span>{r.name}</th>
                {r.roles.map((v, ci) => (
                  <td key={ci} className={s.csmCell}>
                    <i className={s.csmDot} data-r={v} style={{ ["--c" as string]: ci }} aria-hidden="true" />
                    <span className={s.srOnly}>{`${stages[ci]}: ${LABEL[v]}`}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="ig-csm-cap" className={s.caption}>{caption}</figcaption>
    </figure>
  );
}
