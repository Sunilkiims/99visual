// app/components/infographics/TechStackMap.tsx
// Infographic D — the technology stack as layers, from what visitors see down
// to the cloud it runs on. Each layer names real tools (passed in by the page
// with their icons). Layers rise in one by one; a request dot travels down
// the rail while the graphic is on screen.
import type { ReactNode } from "react";
import s from "./infographics.module.css";

export type StackLayer = { name: string; note: string; tone: "blue" | "green" | "orange"; tools: { name: string; icon: ReactNode }[] };

export default function TechStackMap({ layers, className = "", badge = "Our stack, layer by layer", caption }: {
  layers: StackLayer[]; className?: string; badge?: string; caption?: string;
}) {
  return (
    <figure className={`${s.ig} ${s.stackMap} ${className}`} data-ig="" aria-labelledby="ig-stackmap-cap">
      <div className={s.stackMapHead}>
        <span className={s.badge}>{badge}</span>
      </div>
      <div className={s.stackMapBody}>
        <span className={s.stackMapRail} aria-hidden="true"><i /></span>
        <ol className={s.stackMapList}>
          {layers.map((l, i) => (
            <li key={l.name} className={`${s.stackMapLayer} ${s.rev}`} data-tone={l.tone} style={{ ["--d" as string]: i }}>
              <span className={s.stackMapDot} aria-hidden="true" />
              <span className={s.stackMapLabel}>
                <b>{l.name}</b>
                <span>{l.note}</span>
              </span>
              <ul className={s.stackMapTools} aria-label={`${l.name} tools`}>
                {l.tools.map((t) => (
                  <li key={t.name}><span aria-hidden="true">{t.icon}</span>{t.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="ig-stackmap-cap" className={s.caption}>
        {caption ?? "Each request travels down these layers and back. Every tool here is widely used and well documented, so your site isn\u2019t tied to one agency to maintain it."}
      </figcaption>
    </figure>
  );
}
