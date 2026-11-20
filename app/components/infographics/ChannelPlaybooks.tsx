// app/components/infographics/ChannelPlaybooks.tsx
// Three channel playbooks behind one tab control — each with a visual form
// that matches how that channel actually works:
//   PPC      → a funnel (spend narrows to measured return)
//   Social   → ripples (one piece of content radiating outward to leads)
//   Content  → a journey path (research through to conversion)
import type { ReactNode } from "react";
import {
  FaAd, FaShareAlt, FaFeatherAlt, FaSearch, FaFileAlt, FaComments, FaBullseye,
} from "react-icons/fa";
import Tabs from "./Tabs";
import s from "./infographics.module.css";

type Step = { title: string; text: string };

function StepList({ steps, tone }: { steps: Step[]; tone: "blue" | "orange" | "green" }) {
  return (
    <ol className={s.playSteps} data-tone={tone}>
      {steps.map((st, i) => (
        <li key={st.title} className={s.playStep} style={{ ["--d" as string]: i }}>
          <span className={s.playStepNum} aria-hidden="true">{i + 1}</span>
          <span>
            <span className={s.playStepTitle}>{st.title}</span>
            <span className={s.playStepText}>{st.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// ── PPC funnel ──────────────────────────────────────────────────────────────
const PPC_LAYERS = [
  { label: "Campaign planning",   metric: "Goals · budget · keywords" },
  { label: "Audience targeting",  metric: "Impressions" },
  { label: "Ad optimisation",     metric: "CTR · Quality Score" },
  { label: "Conversion tracking", metric: "Conversions" },
  { label: "ROI",                 metric: "CPL · ROAS" },
];

function PpcFunnel() {
  const widths = [100, 88, 76, 64, 52];
  return (
    <div className={s.funnel} role="img" aria-label="PPC funnel: campaign planning, audience targeting, ad optimisation, conversion tracking, and return on investment measured as cost per lead and ROAS.">
      {PPC_LAYERS.map((l, i) => {
        const w = widths[i];
        const next = widths[i + 1] ?? w - 8;
        const inset = (((w - next) / 2) / w) * 100;
        return (
          <div key={l.label} className={s.funnelLayer} data-last={i === PPC_LAYERS.length - 1 ? "" : undefined}
            style={{ width: `${w}%`, clipPath: `polygon(0 0,100% 0,${100 - inset}% 100%,${inset}% 100%)`, ["--d" as string]: i }}>
            <span className={s.funnelLabel}>{l.label}</span>
            <span className={s.funnelMetric}>{l.metric}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Social ripple ───────────────────────────────────────────────────────────
function SocialRipple() {
  const C = 150;
  return (
    <svg className={s.ripple} viewBox="0 0 360 300" role="img" aria-labelledby="ig-ripple-t">
      <title id="ig-ripple-t">Social media reach: content creation at the centre, rippling out to audience engagement, brand awareness and finally lead generation.</title>
      <circle className={s.rippleWave} cx={C} cy={C} r="48" />
      <circle className={s.rippleWave} cx={C} cy={C} r="48" style={{ animationDelay: "1.4s" }} />
      <circle cx={C} cy={C} r="138" className={s.rippleRing3} />
      <circle cx={C} cy={C} r="94" className={s.rippleRing2} />
      <circle cx={C} cy={C} r="50" className={s.rippleCore} />
      {/* post card */}
      <rect x={C - 20} y={C - 26} width="40" height="34" rx="5" fill="#fff" />
      <rect x={C - 15} y={C - 21} width="30" height="16" rx="2.5" fill="#FFC596" />
      <circle cx={C - 7} cy={C - 15} r="3" fill="#fff" />
      <rect x={C - 15} y={C - 1} width="22" height="3" rx="1.5" fill="#C9D0E2" />
      <text x={C} y={C + 28} textAnchor="middle" className={s.rippleCoreText}>Content</text>
      {/* ring labels */}
      <g>
        <rect x={C - 44} y={C - 104} width="88" height="20" rx="10" className={s.ripplePill} />
        <text x={C} y={C - 90} textAnchor="middle" className={s.rippleLabel}>Engagement</text>
      </g>
      <g>
        <rect x={C - 56} y={C - 148} width="112" height="20" rx="10" className={s.ripplePill} />
        <text x={C} y={C - 134} textAnchor="middle" className={s.rippleLabel}>Brand awareness</text>
      </g>
      {/* reactions on the engagement ring */}
      {[[-150, "♥"], [-30, "↗"], [90, "…"]].map(([deg, g]) => {
        const a = ((deg as number) * Math.PI) / 180;
        return (
          <g key={deg} className={s.rippleReact} transform={`translate(${C + 94 * Math.cos(a)} ${C + 94 * Math.sin(a)})`}>
            <circle r="11" fill="#fff" stroke="#FF8A2E" strokeWidth="1.5" />
            <text y="4.5" textAnchor="middle" className={s.rippleGlyph}>{g}</text>
          </g>
        );
      })}
      {/* audience dots on the awareness ring */}
      {[-120, -60, 160, 200, 120, 60].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <circle key={deg} cx={C + 138 * Math.cos(a)} cy={C + 138 * Math.sin(a)} r="5" fill="#2E5CFF" opacity=".75" />;
      })}
      {/* lead capture */}
      <path d={`M${C + 112} ${C + 80} q 30 18 60 6`} className={s.rippleArrow} />
      <g transform={`translate(${C + 182} ${C + 84})`}>
        <circle r="22" fill="#37D67A" />
        <path d="M-8 -9 v8 a8 8 0 0 0 16 0 v-8 h-5 v8 a3 3 0 0 1 -6 0 v-8z" fill="#fff" />
        <text y="38" textAnchor="middle" className={s.rippleLabelStrong}>Leads</text>
      </g>
    </svg>
  );
}

// ── Content journey ─────────────────────────────────────────────────────────
const JOURNEY: { label: string; icon: ReactNode; x: number; y: number }[] = [
  { label: "Research",   icon: <FaSearch />,   x: 50,  y: 168 },
  { label: "Publish",    icon: <FaFileAlt />,  x: 175, y: 78 },
  { label: "Distribute", icon: <FaShareAlt />, x: 300, y: 168 },
  { label: "Engage",     icon: <FaComments />, x: 425, y: 78 },
  { label: "Convert",    icon: <FaBullseye />, x: 550, y: 168 },
];

function ContentJourney() {
  const d = "M50 168 C112 168,112 78,175 78 S238 168,300 168 S362 78,425 78 S488 168,550 168";
  return (
    <div className={s.journey} role="img" aria-label="Content marketing journey: research, publish, distribute, engage, convert.">
      <svg className={s.journeySvg} viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ig-journey" x1="0" x2="1">
            <stop offset="0%" stopColor="#2E5CFF" />
            <stop offset="100%" stopColor="#37D67A" />
          </linearGradient>
        </defs>
        <path d={d} className={s.journeyTrack} />
        <path d={d} className={`${s.journeyLine} ${s.draw}`} pathLength={100} stroke="url(#ig-journey)" />
        <path d={d} className={s.journeyPulse} pathLength={100} />
      </svg>
      <ol className={s.journeyNodes}>
        {JOURNEY.map((n, i) => (
          <li key={n.label} className={s.journeyNode} data-pos={n.y < 120 ? "up" : "down"}
            style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 240) * 100}%`, ["--d" as string]: i }}>
            <span className={s.journeyDot} aria-hidden="true">{n.icon}</span>
            <span className={s.journeyLabel}>{n.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const PANELS = {
  ppc: {
    visual: <PpcFunnel />,
    tone: "blue" as const,
    steps: [
      { title: "Campaign planning",   text: "Goals, budget, keyword and channel mix agreed before anything launches." },
      { title: "Audience targeting",  text: "Search intent, interests, professional roles and remarketing lists." },
      { title: "Ad optimisation",     text: "Creative and bid testing, with landing pages aligned to each ad group." },
      { title: "Conversion tracking", text: "GA4 and Google Ads conversions verified before spend, not after." },
      { title: "ROI",                 text: "Cost per lead and ROAS reported, and budget moved to what converts." },
    ],
  },
  social: {
    visual: <SocialRipple />,
    tone: "orange" as const,
    steps: [
      { title: "Content creation",    text: "Platform-specific creative, banners and short-form video from one calendar." },
      { title: "Audience engagement", text: "Comments, shares and community management that keep conversations going." },
      { title: "Brand awareness",     text: "Organic and paid reach extended to the audiences most likely to care." },
      { title: "Lead generation",     text: "Lead forms and landing pages that turn attention into enquiries." },
    ],
  },
  content: {
    visual: <ContentJourney />,
    tone: "green" as const,
    steps: [
      { title: "Research",   text: "Topic clusters built from real search intent and keyword research." },
      { title: "Publish",    text: "Blog, article and landing-page content structured for search and readers." },
      { title: "Distribute", text: "Promoted through social, email and internal links — not left to chance." },
      { title: "Engage",     text: "Read depth, return visits and shares show which pieces genuinely help." },
      { title: "Convert",    text: "Clear next steps turn readers into leads, measured in GA4." },
    ],
  },
};

function Panel({ p }: { p: (typeof PANELS)[keyof typeof PANELS] }) {
  return (
    <div className={s.play}>
      <div className={s.playVisual}>{p.visual}</div>
      <StepList steps={p.steps} tone={p.tone} />
    </div>
  );
}

export default function ChannelPlaybooks({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.playbooks} ${className}`} data-ig="" aria-labelledby="ig-play-cap">
      <div className={s.playHead}>
        <span className={s.badge}>Channel playbooks</span>
        <figcaption id="ig-play-cap" className={s.playCap}>How each paid and earned channel moves people from first impression to measurable result.</figcaption>
      </div>
      <Tabs
        label="Channel playbooks"
        tabs={[
          { id: "ppc",     label: "PPC & Paid Ads",    icon: <FaAd />,         panel: <Panel p={PANELS.ppc} /> },
          { id: "social",  label: "Social Media",      icon: <FaShareAlt />,   panel: <Panel p={PANELS.social} /> },
          { id: "content", label: "Content Marketing", icon: <FaFeatherAlt />, panel: <Panel p={PANELS.content} /> },
        ]}
      />
    </figure>
  );
}
