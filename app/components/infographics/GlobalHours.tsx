// app/components/infographics/GlobalHours.tsx
// Typical business hours (09:00–18:00 local) in each country the page lists,
// converted to India Standard Time and laid on one 24-hour axis, with the
// Bengaluru team's day shaded across every row. Pure time-zone arithmetic —
// no availability or response-time claims. Bars grow in when scrolled to.
import s from "./infographics.module.css";

type Row = { place: string; zone: string; ist: string; segs: [number, number][]; tone: "orange" | "blue" | "green"; home?: boolean };

// IST hour ranges for 09:00–18:00 local, November (UK on GMT, US Eastern on
// EST, Sydney on AEDT). Ranges that cross midnight are split in two.
const ROWS: Row[] = [
  { place: "India",     zone: "Bengaluru · IST, UTC+5:30", ist: "09:00–18:00 IST", segs: [[9, 18]],               tone: "orange", home: true },
  { place: "UAE",       zone: "Dubai · UTC+4",             ist: "10:30–19:30 IST", segs: [[10.5, 19.5]],          tone: "green" },
  { place: "UK",        zone: "London · UTC+0",            ist: "14:30–23:30 IST", segs: [[14.5, 23.5]],          tone: "blue" },
  { place: "USA",       zone: "New York · UTC−5",          ist: "19:30–04:30 IST", segs: [[19.5, 24], [0, 4.5]],  tone: "blue" },
  { place: "Australia", zone: "Sydney · UTC+11",           ist: "03:30–12:30 IST", segs: [[3.5, 12.5]],           tone: "green" },
];

const TICKS = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const pct = (h: number) => `${(h / 24) * 100}%`;

export default function GlobalHours({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.hours} ${className}`} data-ig="" aria-labelledby="ig-hours-cap">
      <div className={s.hoursHead}>
        <span className={s.badge}>Global hours</span>
        <span className={s.hoursLegend} aria-hidden="true"><i />Bengaluru team day</span>
      </div>

      <div className={s.hoursGrid}>
        <div className={s.hoursAxis} aria-hidden="true">
          {TICKS.map((t) => <span key={t} style={{ left: pct(t) }}>{String(t % 24).padStart(2, "0")}:00</span>)}
        </div>
        <ul className={s.hoursRows}>
          {ROWS.map((r, i) => (
            <li key={r.place} className={`${s.hoursRow} ${s.rev}`} data-home={r.home ? "" : undefined} style={{ ["--d" as string]: i }}>
              <span className={s.hoursPlace}>
                <b>{r.place}</b>
                <span>{r.zone}</span>
              </span>
              <span className={s.hoursTrack}>
                <i className={s.hoursTeam} style={{ left: pct(9), width: pct(9) }} aria-hidden="true" />
                {r.segs.map(([a, b], k) => (
                  <i key={k} className={`${s.hoursBar} ${s.grow}`} data-tone={r.tone}
                    style={{ left: pct(a), width: pct(b - a), ["--d" as string]: i }} aria-hidden="true" />
                ))}
              </span>
              <span className={s.hoursIst}>{r.ist}</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption id="ig-hours-cap" className={s.caption}>
        Typical business hours (09:00–18:00 local) in each country we serve, shown in Indian Standard
        Time. Times are for November; daylight saving moves the UK, US and Australian rows by an
        hour during the year.
      </figcaption>
    </figure>
  );
}
