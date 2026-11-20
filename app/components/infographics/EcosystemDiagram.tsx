// app/components/infographics/EcosystemDiagram.tsx
// Hub-and-spoke diagram: six channels around one shared strategy, with the
// hand-off between each neighbouring pair labelled on the ring.
// SVG draws the rings/spokes; nodes and labels are HTML positioned in % so
// text stays crisp and legible at every width (container queries scale it).
import type { ReactNode } from "react";
import { FaSearch, FaFeatherAlt, FaShareAlt, FaAd, FaEnvelope, FaChartPie } from "react-icons/fa";
import s from "./infographics.module.css";

type Node = { label: string; sub: string; icon: ReactNode; tone: "blue" | "green" | "orange" };

const NODES: Node[] = [
  { label: "SEO",       sub: "Organic search",   icon: <FaSearch />,     tone: "blue" },
  { label: "Content",   sub: "Answers & topics", icon: <FaFeatherAlt />, tone: "green" },
  { label: "Social",    sub: "Meta · LinkedIn",  icon: <FaShareAlt />,   tone: "orange" },
  { label: "PPC",       sub: "Google Ads",       icon: <FaAd />,         tone: "blue" },
  { label: "Email",     sub: "Nurture & CRM",    icon: <FaEnvelope />,   tone: "green" },
  { label: "Analytics", sub: "GA4 · GSC",        icon: <FaChartPie />,   tone: "orange" },
];

// What flows between neighbouring channels (clockwise from SEO).
const LINKS = ["Topic demand", "Distribution", "Audiences", "Leads", "Attribution", "Insights"];

const R_NODE = 37; // node orbit radius, in % of the square
const R_LINK = 31.5;

const pos = (i: number, r: number, offsetDeg = 0) => {
  const a = ((-90 + i * 60 + offsetDeg) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
};

export default function EcosystemDiagram({ className = "" }: { className?: string }) {
  const nodePts = NODES.map((_, i) => pos(i, R_NODE));

  return (
    <figure className={`${s.ig} ${s.eco} ${className}`} data-ig="" aria-labelledby="ig-eco-cap">
      <div className={s.ecoStage}>
        <svg className={s.ecoSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="ig-eco-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2E5CFF" stopOpacity=".22" />
              <stop offset="100%" stopColor="#2E5CFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ig-eco-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2E5CFF" />
              <stop offset="55%" stopColor="#37D67A" />
              <stop offset="100%" stopColor="#FF8A2E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="30" fill="url(#ig-eco-glow)" />
          <circle cx="50" cy="50" r={R_NODE} className={s.ecoOrbit} />
          <circle cx="50" cy="50" r={R_NODE} className={`${s.ecoRing} ${s.draw}`} pathLength={100} stroke="url(#ig-eco-ring)" />
          <circle cx="50" cy="50" r="46" className={s.ecoOuter} />
          {nodePts.map((p, i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={p.x} y2={p.y} className={s.ecoSpoke} />
              <line x1="50" y1="50" x2={p.x} y2={p.y} className={s.ecoPulse} pathLength={100}
                style={{ animationDelay: `${i * 0.45}s` }} />
            </g>
          ))}
        </svg>

        <div className={`${s.ecoCore} ${s.rev}`}>
          <span className={s.ecoCoreKicker}>99 Visual</span>
          <span className={s.ecoCoreTitle}>One strategy</span>
          <span className={s.ecoCoreSub}>one report</span>
        </div>

        {NODES.map((n, i) => {
          const p = nodePts[i];
          return (
            <div key={n.label} className={`${s.ecoNode} ${s.rev}`} data-tone={n.tone}
              style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: i + 1 }}>
              <span className={s.ecoIcon} aria-hidden="true">{n.icon}</span>
              <span className={s.ecoLabel} title={n.sub}>{n.label}</span>
            </div>
          );
        })}

        {LINKS.map((l, i) => {
          const p = pos(i, R_LINK, 30);
          return (
            <span key={l} className={`${s.ecoLink} ${s.rev}`} aria-hidden="true"
              style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: i + 4 }}>
              {l}
            </span>
          );
        })}
      </div>

      <figcaption id="ig-eco-cap" className={s.caption}>
        <span className={s.srOnly}>
          Diagram: SEO, content, social, PPC, email and analytics arranged around one shared
          strategy. SEO reveals topic demand for content; content feeds social distribution;
          social builds audiences for paid campaigns; PPC generates leads for email nurture;
          email closes the loop with attribution in analytics; and analytics feeds insights back
          into SEO.{" "}
        </span>
        Six channels, one plan — each hands something useful to the next.
      </figcaption>
    </figure>
  );
}
