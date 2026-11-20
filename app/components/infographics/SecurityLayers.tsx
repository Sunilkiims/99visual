// app/components/infographics/SecurityLayers.tsx
// Infographic F — defence in depth. Nested layers around your data, from
// monitoring on the outside to encryption at the core, plus backups as the
// safety net beside them. Layers reveal from the outside in; a scan line
// sweeps the outer layer while on screen.
import type { ReactNode } from "react";
import { FaShieldAlt, FaLock, FaKey, FaPlug, FaEye, FaDatabase, FaHistory } from "react-icons/fa";
import s from "./infographics.module.css";

const LAYERS = [
  { name: "Monitoring & alerts",     note: "Uptime and error alerts, so problems surface early", icon: <FaEye /> },
  { name: "SSL / HTTPS",             note: "All traffic encrypted between visitor and server",            icon: <FaLock /> },
  { name: "Secure APIs & firewall",  note: "Validated inputs, rate limits, secrets kept on the server",    icon: <FaPlug /> },
  { name: "Authentication & roles",  note: "Strong logins, permissions, MFA where it matters",            icon: <FaKey /> },
];

export default function SecurityLayers({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.sec} ${className}`} data-ig="" aria-labelledby="ig-sec-cap">
      <div className={s.secHead}>
        <span className={s.badge}>Security, layer by layer</span>
      </div>
      <div className={s.secGrid}>
        <div className={s.secNest}>
          {LAYERS.reduceRight<ReactNode>((inner, l, i) => (
            <div className={`${s.secLayer} ${s.rev}`} data-depth={i} style={{ ["--d" as string]: i }}>
              {i === 0 && <span className={s.secScan} aria-hidden="true" />}
              <span className={s.secLabel}>
                <span className={s.secIcon} aria-hidden="true">{l.icon}</span>
                <b>{l.name}</b>
                <span>{l.note}</span>
              </span>
              {inner}
            </div>
          ), (
            <div className={`${s.secCore} ${s.rev}`} style={{ ["--d" as string]: 4 }}>
              <span className={s.secCoreIcon} aria-hidden="true"><FaDatabase /><FaShieldAlt /></span>
              <b>Your data</b>
              <span>Encrypted at rest, least-privilege access</span>
            </div>
          ))}
        </div>
        <div className={`${s.secBackup} ${s.rev}`} style={{ ["--d" as string]: 5 }}>
          <span className={s.secIcon} aria-hidden="true"><FaHistory /></span>
          <b>Backups</b>
          <span>Automatic, stored separately, and restores tested — the safety net if every other layer fails.</span>
        </div>
      </div>
      <figcaption id="ig-sec-cap" className={s.caption}>
        No single measure makes a site secure. Each layer stops a different kind of problem, so a
        failure in one doesn&rsquo;t expose everything behind it.
      </figcaption>
    </figure>
  );
}
