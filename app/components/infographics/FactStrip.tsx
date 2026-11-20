// app/components/infographics/FactStrip.tsx
// A row of headline facts that rise in one after another, each with a short
// accent bar that draws under it. Facts are passed in by the page and must be
// ones the page already states — this component adds motion, not claims.
// `tone="dark"` styles it for dark sections.
import s from "./infographics.module.css";

export type Fact = { value: string; label: string };

export default function FactStrip({ facts, tone = "light", className = "", label = "Key facts" }: {
  facts: Fact[]; tone?: "light" | "dark"; className?: string; label?: string;
}) {
  return (
    <div className={`${s.ig} ${s.facts} ${className}`} data-ig="" data-tone={tone}>
      <ul className={s.factList} aria-label={label}>
        {facts.map((f, i) => (
          <li key={f.label} className={`${s.fact} ${s.rev}`} style={{ ["--d" as string]: i }}>
            <span className={s.factValue}>{f.value}</span>
            <span className={`${s.factBar} ${s.grow}`} style={{ ["--d" as string]: i }} aria-hidden="true" />
            <span className={s.factLabel}>{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
