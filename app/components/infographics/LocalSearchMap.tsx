// app/components/infographics/LocalSearchMap.tsx
// Schematic (not-to-scale) map of the Bengaluru neighbourhoods the Local SEO
// copy names, with a "near me" search radius and the four signals that decide
// local-pack visibility. Map art is SVG; pins/labels are HTML so they stay
// legible on phones.
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import s from "./infographics.module.css";

const PINS: { name: string; x: number; y: number; side?: "l" | "r"; active?: boolean }[] = [
  { name: "Indiranagar",     x: 61, y: 37, side: "r" },
  { name: "Koramangala",     x: 53, y: 55, side: "r", active: true },
  { name: "Jayanagar",       x: 35, y: 60, side: "l" },
  { name: "HSR Layout",      x: 63, y: 71, side: "r" },
  { name: "Whitefield",      x: 88, y: 30, side: "l" },
  { name: "Electronic City", x: 70, y: 89, side: "l" },
];

const SIGNALS = ["Google Business Profile", "Consistent citations (NAP)", "Reviews managed", "Location-relevant pages"];

export default function LocalSearchMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.map} ${className}`} data-ig="" aria-labelledby="ig-map-cap">
      <div className={s.mapStage}>
        <div className={s.mapCanvas}>
        <svg className={s.mapSvg} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="ig-map-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M18 0H0V18" fill="none" stroke="#E3E7F0" strokeWidth="1" />
            </pattern>
            <radialGradient id="ig-map-radius">
              <stop offset="0%" stopColor="#2E5CFF" stopOpacity=".22" />
              <stop offset="100%" stopColor="#2E5CFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F7F8FB" />
          <rect width="400" height="300" fill="url(#ig-map-grid)" />
          {/* lakes */}
          <path d="M228 96c10-8 26-6 30 4s-6 20-18 20-20-16-12-24z" fill="#CFE0FF" />
          <path d="M276 196c14-10 40-8 44 6s-14 22-30 20-26-16-14-26z" fill="#CFE0FF" />
          {/* ring road + arterials */}
          <ellipse cx="200" cy="160" rx="168" ry="122" fill="none" stroke="#D3D9E6" strokeWidth="6" />
          <ellipse cx="200" cy="160" rx="168" ry="122" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M-10 70 C 110 110, 210 120, 410 80" fill="none" stroke="#DCE1EC" strokeWidth="5" />
          <path d="M150 -10 C 170 100, 210 200, 290 310" fill="none" stroke="#DCE1EC" strokeWidth="5" />
          <path d="M40 310 C 120 220, 240 170, 410 120" fill="none" stroke="#DCE1EC" strokeWidth="4" />
          {/* search radius around the active pin */}
          <circle cx="212" cy="165" r="70" fill="url(#ig-map-radius)" />
          <circle cx="212" cy="165" r="70" className={s.mapRadius} />
          <circle cx="212" cy="165" r="70" className={s.mapRadiusPulse} />
        </svg>

        {PINS.map((p, i) => (
          <span key={p.name} className={`${s.mapPin} ${s.rev}`} data-active={p.active ? "" : undefined} data-side={p.side}
            style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: i }}>
            <FaMapMarkerAlt className={s.mapPinIcon} aria-hidden="true" />
            <span className={s.mapPinLabel}>{p.name}</span>
          </span>
        ))}
        </div>

        <div className={`${s.mapCard} ${s.rev}`} style={{ ["--d" as string]: 3 }}>
          <div className={s.mapSearch} aria-hidden="true">
            <span className={s.mapSearchDot} /> service near me
          </div>
          <span className={s.mapCardTitle}>Local pack signals</span>
          <ul className={s.mapSignals}>
            {SIGNALS.map((x, i) => (
              <li key={x} style={{ ["--d" as string]: i + 4 }} className={s.rev}>
                <span className={s.mapCheck} aria-hidden="true"><FaCheck /></span>{x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption id="ig-map-cap" className={s.caption}>
        Schematic of the Bengaluru neighbourhoods mentioned above — not to scale. Local results
        depend on proximity, relevance and prominence, so all four signals have to line up.
      </figcaption>
    </figure>
  );
}
