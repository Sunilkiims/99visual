// app/components/infographics/SiteTypeMatrix.tsx
// Infographic C — business website vs e-commerce store vs custom web
// application. A real <table> (accessible to screen readers and crawlers)
// styled as a visual comparison; every mark carries a text label, so meaning
// never depends on colour or shape alone. Marks pop in row by row on scroll.
import type { ReactNode } from "react";
import { FaBuilding, FaShoppingCart, FaLaptopCode } from "react-icons/fa";
import s from "./infographics.module.css";

type Mark = "yes" | "some" | "no";
const MARK_LABEL: Record<Mark, string> = { yes: "Usually included", some: "Sometimes", no: "Not usually" };

const TYPES: { name: string; goal: string; examples: string; icon: ReactNode; tone: string }[] = [
  { name: "Business website", goal: "Explains what you do and turns visits into enquiries", examples: "Company sites, service pages, portfolios", icon: <FaBuilding />, tone: "blue" },
  { name: "E-commerce store", goal: "Sells products online, from browsing to payment", examples: "Catalogues, carts, checkout, order tracking", icon: <FaShoppingCart />, tone: "green" },
  { name: "Web application", goal: "Software customers or staff log in to and use", examples: "Portals, dashboards, booking systems", icon: <FaLaptopCode />, tone: "orange" },
];

const ROWS: { feature: string; marks: [Mark, Mark, Mark] }[] = [
  { feature: "Pages your team edits (CMS)",     marks: ["yes", "yes", "some"] },
  { feature: "Enquiry and contact forms",       marks: ["yes", "some", "some"] },
  { feature: "Product catalogue & checkout",    marks: ["no", "yes", "some"] },
  { feature: "Online payments",                 marks: ["no", "yes", "some"] },
  { feature: "Customer accounts & logins",      marks: ["no", "yes", "yes"] },
  { feature: "Dashboards & user roles",         marks: ["no", "some", "yes"] },
  { feature: "Custom business workflows",       marks: ["no", "some", "yes"] },
  { feature: "Integrations (CRM, ERP, APIs)",   marks: ["some", "yes", "yes"] },
  { feature: "Search as the main traffic source", marks: ["yes", "yes", "some"] },
];

export default function SiteTypeMatrix({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.matrix} ${className}`} data-ig="" aria-labelledby="ig-matrix-cap">
      <div className={s.matrixScroll}>
        <table className={s.matrixTable}>
          <caption className={s.srOnly}>Which features a business website, an e-commerce store and a web application usually include</caption>
          <thead>
            <tr>
              <th scope="col" className={s.matrixCorner}>
                <span className={s.matrixLegend} aria-hidden="true">
                  <span><i data-mark="yes" />Usually</span>
                  <span><i data-mark="some" />Sometimes</span>
                  <span><i data-mark="no" />Rarely</span>
                </span>
              </th>
              {TYPES.map((t, i) => (
                <th key={t.name} scope="col" className={`${s.matrixType} ${s.rev}`} data-tone={t.tone} style={{ ["--d" as string]: i }}>
                  <span className={s.matrixIcon} aria-hidden="true">{t.icon}</span>
                  <span className={s.matrixName}>{t.name}</span>
                  <span className={s.matrixGoal}>{t.goal}</span>
                  <span className={s.matrixEx}>{t.examples}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.feature}>
                <th scope="row" className={s.matrixFeature}>{r.feature}</th>
                {r.marks.map((m, k) => (
                  <td key={k} className={s.matrixCell}>
                    <span className={s.matrixMark} data-mark={m} style={{ ["--d" as string]: i + k * 0.3 }} aria-hidden="true" />
                    <span className={s.srOnly}>{MARK_LABEL[m]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="ig-matrix-cap" className={s.caption}>
        A general guide, not a rulebook. Plenty of projects mix types: a business website with a
        client login, or a store with a custom quoting tool.
      </figcaption>
    </figure>
  );
}
