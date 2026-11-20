"use client";

// app/components/infographics/Tabs.tsx
// Accessible tab shell (WAI-ARIA tabs pattern: roving tabindex, arrow/Home/End
// keys). Panels are server-rendered and passed in, so all panel content is in
// the initial HTML for search engines; only this switching logic ships as JS.
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import s from "./infographics.module.css";

export type TabDef = { id: string; label: string; icon?: ReactNode; panel: ReactNode };

export default function Tabs({ tabs, label }: { tabs: TabDef[]; label: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const focus = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); focus(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); focus(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); focus(0); }
    else if (e.key === "End") { e.preventDefault(); focus(tabs.length - 1); }
  };

  return (
    <div className={s.tabs}>
      <div className={s.tabList} role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            type="button"
            id={`${uid}-tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.icon && <span className={s.tabIcon} aria-hidden="true">{t.icon}</span>}
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={active !== i}
          className={s.tabPanel}
          tabIndex={0}
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
