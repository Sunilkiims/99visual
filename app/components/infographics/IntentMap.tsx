// app/components/infographics/IntentMap.tsx
// Search intent: four kinds of query, an example of each, and the page that
// best answers it. Ordered from early research to ready-to-act, with a
// progress rail that fills when the graphic scrolls in.
import { FaBookOpen, FaBalanceScale, FaShoppingCart, FaCompass } from "react-icons/fa";
import s from "./infographics.module.css";

const INTENTS = [
  { k: "Informational", q: "how to improve website loading speed", page: "A practical guide or blog article", icon: <FaBookOpen /> },
  { k: "Commercial",    q: "best seo agency in bangalore",        page: "Service page with proof, process and pricing approach", icon: <FaBalanceScale /> },
  { k: "Transactional", q: "book seo audit",                      page: "Landing page with a short form and a clear next step", icon: <FaShoppingCart /> },
  { k: "Navigational",  q: "99 visual solutions contact",         page: "Contact page and Google Business Profile", icon: <FaCompass /> },
];

export default function IntentMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.intent} ${className}`} data-ig="" aria-labelledby="ig-intent-cap">
      <div className={s.intentHead}>
        <span className={s.badge}>Search intent → the right page</span>
      </div>
      <div className={s.intentRail} aria-hidden="true">
        <span>Researching</span><i><b /></i><span>Ready to act</span>
      </div>
      <ol className={s.intentGrid}>
        {INTENTS.map((it, i) => (
          <li key={it.k} className={`${s.intentCol} ${s.rev}`} style={{ ["--d" as string]: i }}>
            <span className={s.intentKind}><span aria-hidden="true">{it.icon}</span>{it.k}</span>
            <span className={s.intentQuery}><span className={s.srOnly}>Example search: </span>{it.q}<i aria-hidden="true" /></span>
            <span className={s.intentArrow} aria-hidden="true">↓</span>
            <span className={s.intentPage}><span className={s.srOnly}>Best page: </span>{it.page}</span>
          </li>
        ))}
      </ol>
      <figcaption id="ig-intent-cap" className={s.caption}>
        Keyword research isn&apos;t only about search volume. The words people type show what
        they&apos;re trying to do, and a page ranks and converts best when it matches that intent.
        Example searches are illustrative.
      </figcaption>
    </figure>
  );
}
