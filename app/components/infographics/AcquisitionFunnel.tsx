// app/components/infographics/AcquisitionFunnel.tsx
// The customer journey as five funnel bands, each paired with the question a
// buyer is asking at that point and the channels that answer it. Bands wipe
// in top to bottom; a dot drops through the funnel while on screen.
import s from "./infographics.module.css";

export type FunnelStage = { stage: string; question: string; channels: string[] };

export default function AcquisitionFunnel({ stages, className = "", caption }: {
  stages: FunnelStage[]; className?: string; caption: string;
}) {
  const n = stages.length;
  return (
    <figure className={`${s.ig} ${s.acq} ${className}`} data-ig="" aria-labelledby="ig-acq-cap">
      <div className={s.acqHead}><span className={s.badge}>The customer journey</span></div>
      <ol className={s.acqList}>
        {stages.map((st, i) => (
          <li key={st.stage} className={s.acqRow} style={{ ["--i" as string]: i, ["--n" as string]: n }}>
            <div className={s.acqBand}>
              <span className={s.acqNum}>{i + 1}</span>
              <b>{st.stage}</b>
            </div>
            <div className={`${s.acqInfo} ${s.rev}`} style={{ ["--d" as string]: i + 1 }}>
              <span className={s.acqQ}>{st.question}</span>
              <ul className={s.acqChips} aria-label={`Channels for ${st.stage}`}>
                {st.channels.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </li>
        ))}
        <i className={s.acqDrop} aria-hidden="true" />
      </ol>
      <figcaption id="ig-acq-cap" className={s.caption}>{caption}</figcaption>
    </figure>
  );
}
