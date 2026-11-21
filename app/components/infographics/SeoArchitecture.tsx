// app/components/infographics/SeoArchitecture.tsx
// SEO as a building: technical foundations at the bottom, the on-site work as
// pillars, authority as the beam across the top, and organic visibility as
// the roof it all holds up. Built from the ground up when it scrolls in.
import { FaServer, FaCode, FaSearch, FaKey, FaPenNib, FaFeatherAlt, FaProjectDiagram, FaLink, FaChartLine } from "react-icons/fa";
import s from "./infographics.module.css";

const FOUNDATION = [
  { t: "Technical SEO",   n: "Speed, crawlability, mobile, clean URLs", i: <FaServer /> },
  { t: "Structured data", n: "Schema that explains what each page is",  i: <FaCode /> },
  { t: "Indexing",        n: "The right pages crawled, rendered, indexed", i: <FaSearch /> },
];
const PILLARS = [
  { t: "Keyword research", n: "What people search, and why",           i: <FaKey /> },
  { t: "On-page SEO",      n: "Titles, headings, copy that match intent", i: <FaPenNib /> },
  { t: "Content",          n: "Useful pages that answer real questions", i: <FaFeatherAlt /> },
  { t: "Internal linking", n: "Paths that pass relevance between pages", i: <FaProjectDiagram /> },
];

export default function SeoArchitecture({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.arch} ${className}`} data-ig="" aria-labelledby="ig-arch-cap">
      <div className={s.archHead}><span className={s.badge}>How SEO fits together</span></div>
      <div className={s.archBuild}>
        <div className={s.archRoof}>
          <span className={s.archRoofIcon} aria-hidden="true"><FaChartLine /></span>
          <b>Organic search visibility</b>
          <span>More of the right people finding you</span>
        </div>
        <div className={s.archBeam}>
          <span aria-hidden="true"><FaLink /></span>
          <b>Off-page authority</b>
          <span>Links, mentions and reviews from other sites</span>
        </div>
        <ul className={s.archPillars}>
          {PILLARS.map((p, i) => (
            <li key={p.t} className={s.archPillar} style={{ ["--d" as string]: i }}>
              <span className={s.archIcon} aria-hidden="true">{p.i}</span>
              <b>{p.t}</b><span>{p.n}</span>
            </li>
          ))}
        </ul>
        <ul className={s.archBase}>
          {FOUNDATION.map((f, i) => (
            <li key={f.t} className={s.rev} style={{ ["--d" as string]: i }}>
              <span className={s.archIcon} aria-hidden="true">{f.i}</span>
              <span><b>{f.t}</b><span>{f.n}</span></span>
            </li>
          ))}
        </ul>
        <div className={s.archGround} aria-hidden="true">Foundations</div>
      </div>
      <figcaption id="ig-arch-cap" className={s.caption}>
        Each layer depends on the one below it. Great content can&apos;t rank if pages aren&apos;t
        indexed, and links to a slow, confusing site are wasted. That&apos;s why every engagement
        starts with the foundations.
      </figcaption>
    </figure>
  );
}
