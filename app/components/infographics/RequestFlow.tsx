// app/components/infographics/RequestFlow.tsx
// How one page request is served: browser → CDN edge → server render → APIs
// → database, with an animated request travelling out and the rendered HTML
// coming back. Horizontal on wide screens, vertical on phones.
import type { ReactNode } from "react";
import { FaMobileAlt, FaGlobeAsia, FaServer, FaCode, FaDatabase } from "react-icons/fa";
import s from "./infographics.module.css";

type Hop = { title: string; note: string; icon: ReactNode; tone: "blue" | "green" | "orange" };

const HOPS: Hop[] = [
  { title: "Visitor",        note: "Phone or desktop browser",            icon: <FaMobileAlt />, tone: "orange" },
  { title: "CDN edge",       note: "Static files from the nearest region", icon: <FaGlobeAsia />, tone: "blue" },
  { title: "Next.js server", note: "Page rendered to HTML",               icon: <FaServer />,    tone: "blue" },
  { title: "APIs",           note: "Business logic & integrations",       icon: <FaCode />,      tone: "blue" },
  { title: "Database",       note: "Content and records",                 icon: <FaDatabase />,  tone: "green" },
];

export default function RequestFlow({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.flow} ${className}`} data-ig="" aria-labelledby="ig-flow-cap">
      <div className={s.flowHead}>
        <span className={s.badge}>How a page is served</span>
        <span className={s.flowLegend} aria-hidden="true">
          <span><i data-dir="out" />Request</span>
          <span><i data-dir="back" />Rendered HTML</span>
        </span>
      </div>
      <ol className={s.flowList}>
        {HOPS.map((h, i) => (
          <li key={h.title} className={`${s.flowHop} ${s.rev}`} data-tone={h.tone} style={{ ["--d" as string]: i }}>
            <span className={s.flowIcon} aria-hidden="true">{h.icon}</span>
            <span className={s.flowTitle}>{h.title}</span>
            <span className={s.flowNote}>{h.note}</span>
            {i < HOPS.length - 1 && (
              <span className={s.flowLink} aria-hidden="true">
                <i className={s.flowPacket} style={{ animationDelay: `${i * 0.35}s` }} />
                <i className={s.flowPacketBack} style={{ animationDelay: `${1.8 + (HOPS.length - 2 - i) * 0.35}s` }} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption id="ig-flow-cap" className={s.caption}>
        Pages are rendered on the server and cached at the edge, so visitors and search engines
        get complete HTML on the first request instead of waiting for JavaScript to build it.
      </figcaption>
    </figure>
  );
}
