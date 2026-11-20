// app/components/infographics/LaunchTimeline.tsx
// Infographic G — the project journey from first idea to production launch.
// When scrolled into view, a progress line fills along the rail and each
// stop checks off in turn; a highlight keeps travelling along the finished
// line while it's on screen. Horizontal on wide screens, vertical on phones.
import s from "./infographics.module.css";

export type LaunchStop = { title: string; note: string };

export default function LaunchTimeline({ stops, className = "", badge = "From idea to launch", caption }: {
  stops: LaunchStop[]; className?: string; badge?: string; caption: string;
}) {
  return (
    <figure className={`${s.ig} ${s.launch} ${className}`} data-ig="" aria-labelledby="ig-launch-cap">
      <div className={s.launchHead}>
        <span className={s.badge}>{badge}</span>
      </div>
      <div className={s.launchTrack} style={{ ["--n" as string]: stops.length }}>
      <span className={s.launchRail} aria-hidden="true"><i className={s.launchFill} /><i className={s.launchGlow} /></span>
      <ol className={s.launchList}>
        {stops.map((st, i) => (
          <li key={st.title} className={s.launchStop} data-last={i === stops.length - 1 ? "" : undefined} style={{ ["--i" as string]: i }}>
            <span className={s.launchDot} aria-hidden="true">{i + 1}</span>
            <span className={s.launchTitle}>{st.title}</span>
            <span className={s.launchNote}>{st.note}</span>
          </li>
        ))}
      </ol>
      </div>
      <figcaption id="ig-launch-cap" className={s.caption}>{caption}</figcaption>
    </figure>
  );
}
