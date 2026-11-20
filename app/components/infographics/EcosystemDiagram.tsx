// app/components/infographics/EcosystemDiagram.tsx
// Hub-and-spoke diagram: six parts around one shared core, with what passes
// between each neighbouring pair labelled on the ring. Content is passed in
// as props (defaults = the digital-marketing channel ecosystem), so other
// pages can reuse the graphic with their own nodes.
// SVG draws the rings/spokes; nodes and labels are HTML positioned in % so
// text stays crisp and legible at every width (container queries scale it).
import type { ReactNode } from "react";
import { FaSearch, FaFeatherAlt, FaShareAlt, FaAd, FaEnvelope, FaChartPie } from "react-icons/fa";
import s from "./infographics.module.css";

export type EcoNode = { label: string; sub: string; icon: ReactNode; tone: "blue" | "green" | "orange" };

const DEFAULT_NODES: EcoNode[] = [
  { label: "SEO",       sub: "organic search",         icon: <FaSearch />,     tone: "blue" },
  { label: "Content",   sub: "answers and topics",     icon: <FaFeatherAlt />, tone: "green" },
  { label: "Social",    sub: "Meta and LinkedIn",      icon: <FaShareAlt />,   tone: "orange" },
  { label: "PPC",       sub: "Google Ads",             icon: <FaAd />,         tone: "blue" },
  { label: "Email",     sub: "nurture and CRM",        icon: <FaEnvelope />,   tone: "green" },
  { label: "Analytics", sub: "GA4 and Search Console", icon: <FaChartPie />,   tone: "orange" },
];

// What flows between neighbouring nodes (clockwise from the top node).
const DEFAULT_LINKS = ["Topic demand", "Distribution", "Audiences", "Leads", "Attribution", "Insights"];

const DEFAULT_DESCRIPTION =
  "SEO reveals topic demand for content; content feeds social distribution; social builds audiences for paid campaigns; PPC generates leads for email nurture; email closes the loop with attribution in analytics; and analytics feeds insights back into SEO.";

const R_NODE = 37; // node orbit radius, in % of the square
const R_LINK = 31.5;

const pos = (i: number, n: number, r: number, offsetDeg = 0) => {
  const a = ((-90 + i * (360 / n) + offsetDeg) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
};

export default function EcosystemDiagram({
  className = "",
  id = "ig-eco",
  nodes = DEFAULT_NODES,
  links = DEFAULT_LINKS,
  core = { kicker: "99 Visual", title: "One strategy", sub: "one report" },
  caption = "Six channels, one plan — each hands something useful to the next.",
  description = DEFAULT_DESCRIPTION,
}: {
  className?: string;
  id?: string;
  nodes?: EcoNode[];
  links?: string[];
  core?: { kicker: string; title: string; sub: string };
  caption?: string;
  description?: string;
}) {
  const n = nodes.length;
  const nodePts = nodes.map((_, i) => pos(i, n, R_NODE));
  const capId = `${id}-cap`;
  const glowId = `${id}-glow`;
  const ringId = `${id}-ring`;

  return (
    <figure className={`${s.ig} ${s.eco} ${className}`} data-ig="" aria-labelledby={capId}>
      <div className={s.ecoStage}>
        <svg className={s.ecoSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2E5CFF" stopOpacity=".22" />
              <stop offset="100%" stopColor="#2E5CFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2E5CFF" />
              <stop offset="55%" stopColor="#37D67A" />
              <stop offset="100%" stopColor="#FF8A2E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="30" fill={`url(#${glowId})`} />
          <circle cx="50" cy="50" r={R_NODE} className={s.ecoOrbit} />
          <circle cx="50" cy="50" r={R_NODE} className={`${s.ecoRing} ${s.draw}`} pathLength={100} stroke={`url(#${ringId})`} />
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
          <span className={s.ecoCoreKicker}>{core.kicker}</span>
          <span className={s.ecoCoreTitle}>{core.title}</span>
          <span className={s.ecoCoreSub}>{core.sub}</span>
        </div>

        {nodes.map((node, i) => {
          const p = nodePts[i];
          return (
            <div key={node.label} className={`${s.ecoNode} ${s.rev}`} data-tone={node.tone}
              style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: i + 1 }}>
              <span className={s.ecoIcon} aria-hidden="true">{node.icon}</span>
              <span className={s.ecoLabel} title={node.sub}>{node.label}</span>
            </div>
          );
        })}

        {links.map((l, i) => {
          const p = pos(i, n, R_LINK, 180 / n);
          return (
            <span key={l} className={`${s.ecoLink} ${s.rev}`} aria-hidden="true"
              style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: i + 4 }}>
              {l}
            </span>
          );
        })}
      </div>

      <figcaption id={capId} className={s.caption}>
        <span className={s.srOnly}>
          {`Diagram: ${nodes.map((x) => `${x.label} (${x.sub})`).join(", ")} arranged around ${core.title.toLowerCase()}. ${description} `}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}
