// app/components/infographics/FrontBackSplit.tsx
// Infographic B — frontend vs backend. The user interface talks to the
// application logic through an API (animated request / response packets);
// the backend reads and writes the database; everything runs on the hosting
// infrastructure underneath. Stacks vertically on phones.
import { FaDesktop, FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import s from "./infographics.module.css";

export default function FrontBackSplit({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.split} ${className}`} data-ig="" aria-labelledby="ig-split-cap">
      <div className={s.splitHead}>
        <span className={s.badge}>Frontend &amp; backend</span>
        <span className={s.flowLegend} aria-hidden="true">
          <span><i data-dir="out" />Request</span>
          <span><i data-dir="back" />Response</span>
        </span>
      </div>

      <div className={s.splitGrid}>
        <div className={`${s.splitCard} ${s.rev}`} data-tone="blue" style={{ ["--d" as string]: 0 }}>
          <span className={s.splitKicker}>Frontend · what visitors see</span>
          <span className={s.splitTitle}><span className={s.splitIcon} aria-hidden="true"><FaDesktop /></span>User interface</span>
          <ul className={s.splitList}>
            <li>Pages, menus and layouts</li>
            <li>Forms, search and interactions</li>
            <li>Responsive on every screen</li>
          </ul>
          <span className={s.splitTech}>React · Next.js · Tailwind CSS</span>
        </div>

        <div className={s.splitChannel} aria-hidden="true">
          <span className={s.splitApi}>API</span>
          <span className={s.splitWire}>
            <i className={s.flowPacket} />
            <i className={s.flowPacketBack} style={{ animationDelay: "1.4s" }} />
          </span>
          <span className={s.splitApiNote}>REST / GraphQL</span>
        </div>

        <div className={s.splitStack}>
          <div className={`${s.splitCard} ${s.rev}`} data-tone="orange" style={{ ["--d" as string]: 1 }}>
            <span className={s.splitKicker}>Backend · what runs behind</span>
            <span className={s.splitTitle}><span className={s.splitIcon} aria-hidden="true"><FaServer /></span>Application logic</span>
            <ul className={s.splitList}>
              <li>Business rules and calculations</li>
              <li>Logins, roles and permissions</li>
              <li>Payments, emails and integrations</li>
            </ul>
            <span className={s.splitTech}>Node.js · APIs</span>
          </div>
          <span className={s.splitDown} aria-hidden="true"><i /></span>
          <div className={`${s.splitCard} ${s.splitCardSmall} ${s.rev}`} data-tone="green" style={{ ["--d" as string]: 2 }}>
            <span className={s.splitTitle}><span className={s.splitIcon} aria-hidden="true"><FaDatabase /></span>Database</span>
            <span className={s.splitTech}>PostgreSQL · MongoDB · Redis cache</span>
          </div>
        </div>
      </div>

      <div className={`${s.splitInfra} ${s.rev}`} style={{ ["--d" as string]: 3 }}>
        <span className={s.splitIcon} aria-hidden="true"><FaCloud /></span>
        <span><b>Hosting infrastructure</b> — cloud servers, CDN, SSL certificates, backups and automated deployments, underneath everything above</span>
      </div>

      <figcaption id="ig-split-cap" className={s.caption}>
        Clicking “Book now” on the frontend sends a request through the API; the backend checks
        availability in the database and sends the answer back to the page in a fraction of a second.
      </figcaption>
    </figure>
  );
}
