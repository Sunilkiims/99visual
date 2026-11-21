// app/components/infographics/MetricChain.tsx
// How marketing numbers connect: visitors → engaged visitors → leads →
// customers, the rate between each step, and the three formulas used to
// judge spend. Bars grow in when on screen. Figures are a worked example.
import { FaUsers, FaMousePointer, FaEnvelopeOpenText, FaHandshake } from "react-icons/fa";
import s from "./infographics.module.css";

const STEPS = [
  { t: "Visitors",         n: "By traffic source: organic, paid, social, email, referral", v: "1,000", w: 100, icon: <FaUsers /> },
  { t: "Engaged visitors", n: "Read, scrolled, clicked, stayed",                           v: "550",   w: 55,  icon: <FaMousePointer /> },
  { t: "Leads",            n: "Forms, calls, chats, bookings",                             v: "30",    w: 18,  icon: <FaEnvelopeOpenText /> },
  { t: "Customers",        n: "Leads that became paying clients",                          v: "6",     w: 8,   icon: <FaHandshake /> },
];
const RATES = ["Engagement rate 55%", "Conversion rate 3%", "Close rate 20%"];
const FORMULAS = [
  { k: "Conversion rate", f: "Leads ÷ Visitors", e: "30 ÷ 1,000 = 3%" },
  { k: "Cost per lead",   f: "Spend ÷ Leads",   e: "₹30,000 ÷ 30 = ₹1,000" },
  { k: "ROI",             f: "(Revenue − Cost) ÷ Cost", e: "Uses your real deal values" },
];

export default function MetricChain({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.mchain} ${className}`} data-ig="" aria-labelledby="ig-mchain-cap">
      <div className={s.mchainHead}>
        <span className={s.badge}>How the numbers connect</span>
        <span className={s.mchainTag}>Worked example, not client data</span>
      </div>
      <ol className={s.mchainSteps}>
        {STEPS.map((st, i) => (
          <li key={st.t} className={s.mchainStep}>
            <div className={s.mchainLabel}>
              <span className={s.mchainIcon} aria-hidden="true">{st.icon}</span>
              <span><b>{st.t}</b><span>{st.n}</span></span>
            </div>
            <div className={s.mchainBarWrap}>
              <span className={`${s.mchainBar} ${s.grow}`} style={{ ["--w" as string]: `${st.w}%`, ["--d" as string]: i }} />
              <span className={s.mchainVal}>{st.v}</span>
            </div>
            {i < RATES.length && <span className={s.mchainRate}>↓ {RATES[i]}</span>}
          </li>
        ))}
      </ol>
      <ul className={s.mchainFormulas}>
        {FORMULAS.map((f, i) => (
          <li key={f.k} className={s.rev} style={{ ["--d" as string]: 4 + i * 0.5 }}>
            <b>{f.k}</b><code>{f.f}</code><span>{f.e}</span>
          </li>
        ))}
      </ul>
      <figcaption id="ig-mchain-cap" className={s.caption}>
        Reports should follow this chain, not stop at traffic. If visitors rise but leads don&apos;t,
        the fix is usually on the landing page, not in the ad account.
      </figcaption>
    </figure>
  );
}
