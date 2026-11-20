// app/components/infographics/RequestFlow.tsx
// A chain of hops with an animated packet travelling out and another coming
// back — horizontal on wide screens, vertical on phones. Content is passed
// in as props; the defaults describe how a web page request is served
// (browser → CDN edge → server render → APIs → database), and other pages
// reuse it for their own flows (e.g. a CI/CD quality-gate pipeline).
import type { ReactNode } from "react";
import { FaMobileAlt, FaGlobeAsia, FaServer, FaCode, FaDatabase } from "react-icons/fa";
import s from "./infographics.module.css";

export type FlowHop = { title: string; note: string; icon: ReactNode; tone: "blue" | "green" | "orange" };

const DEFAULT_HOPS: FlowHop[] = [
  { title: "Visitor",        note: "Phone or desktop browser",            icon: <FaMobileAlt />, tone: "orange" },
  { title: "CDN edge",       note: "Static files from the nearest region", icon: <FaGlobeAsia />, tone: "blue" },
  { title: "Next.js server", note: "Page rendered to HTML",               icon: <FaServer />,    tone: "blue" },
  { title: "APIs",           note: "Business logic & integrations",       icon: <FaCode />,      tone: "blue" },
  { title: "Database",       note: "Content and records",                 icon: <FaDatabase />,  tone: "green" },
];

export default function RequestFlow({
  className = "",
  id = "ig-flow",
  hops = DEFAULT_HOPS,
  badge = "How a page is served",
  legend = { out: "Request", back: "Rendered HTML" },
  caption = "Pages are rendered on the server and cached at the edge, so visitors and search engines get complete HTML on the first request instead of waiting for JavaScript to build it.",
}: {
  className?: string;
  id?: string;
  hops?: FlowHop[];
  badge?: string;
  legend?: { out: string; back: string };
  caption?: string;
}) {
  const capId = `${id}-cap`;
  return (
    <figure className={`${s.ig} ${s.flow} ${className}`} data-ig="" aria-labelledby={capId}>
      <div className={s.flowHead}>
        <span className={s.badge}>{badge}</span>
        <span className={s.flowLegend} aria-hidden="true">
          <span><i data-dir="out" />{legend.out}</span>
          <span><i data-dir="back" />{legend.back}</span>
        </span>
      </div>
      <ol className={s.flowList} style={{ ["--n" as string]: hops.length }}>
        {hops.map((h, i) => (
          <li key={h.title} className={`${s.flowHop} ${s.rev}`} data-tone={h.tone} style={{ ["--d" as string]: i }}>
            <span className={s.flowIcon} aria-hidden="true">{h.icon}</span>
            <span className={s.flowTitle}>{h.title}</span>
            <span className={s.flowNote}>{h.note}</span>
            {i < hops.length - 1 && (
              <span className={s.flowLink} aria-hidden="true">
                <i className={s.flowPacket} style={{ animationDelay: `${i * 0.35}s` }} />
                <i className={s.flowPacketBack} style={{ animationDelay: `${1.8 + (hops.length - 2 - i) * 0.35}s` }} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption id={capId} className={s.caption}>{caption}</figcaption>
    </figure>
  );
}
