// app/components/infographics/WebsitePlaybooks.tsx
// Three website project types behind one tab control (same pattern as the
// digital-marketing ChannelPlaybooks), each with a visual that matches how
// that kind of build is structured:
//   Business website → a sitemap tree (pages that answer and convert)
//   Web application  → a layer stack a request travels through
//   E-commerce store → a funnel from browsing to a confirmed order
import Tabs from "./Tabs";
import { FaBuilding, FaLaptopCode, FaShoppingCart } from "react-icons/fa";
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

// ── Business website: sitemap tree ──────────────────────────────────────────
function SitemapTree() {
  const kids = [{ x: 20, l: "Services" }, { x: 130, l: "About" }, { x: 240, l: "Contact" }];
  return (
    <svg className={s.tree} viewBox="0 0 360 270" role="img" aria-labelledby="ig-tree-t">
      <title id="ig-tree-t">Business website sitemap: the home page links to services, about and contact; services branches into individual service pages and contact leads to a lead form.</title>
      {kids.map((k) => (
        <path key={k.l} className={s.treeLine} pathLength={100} d={`M180 62 C180 88, ${k.x + 50} 84, ${k.x + 50} 108`} />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={`g${i}`} className={s.treeLine} pathLength={100} d={`M70 148 C70 170, ${18 + i * 36} 168, ${18 + i * 36 + 14} 190`} />
      ))}
      <path className={s.treeLine} pathLength={100} d="M290 148 V190" />
      <g className={s.treeNode} style={{ ["--d" as string]: 0 }}>
        <rect x="125" y="20" width="110" height="42" rx="10" className={s.treeRoot} />
        <text x="180" y="47" textAnchor="middle" className={s.treeRootText}>Home</text>
      </g>
      {kids.map((k, i) => (
        <g key={k.l} className={s.treeNode} style={{ ["--d" as string]: i + 1 }}>
          <rect x={k.x} y="108" width="100" height="40" rx="10" className={s.treeBox} />
          <text x={k.x + 50} y="133" textAnchor="middle" className={s.treeText}>{k.l}</text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`p${i}`} className={s.treeNode} style={{ ["--d" as string]: i + 4 }}>
          <rect x={14 + i * 36} y="190" width="30" height="40" rx="5" className={s.treePage} />
          <rect x={19 + i * 36} y="198" width="20" height="4" rx="2" className={s.treePageBar} />
          <rect x={19 + i * 36} y="206" width="14" height="3" rx="1.5" className={s.treePageLine} />
        </g>
      ))}
      <g className={s.treeNode} style={{ ["--d" as string]: 7 }}>
        <rect x="238" y="190" width="104" height="40" rx="10" className={s.treeLead} />
        <text x="290" y="215" textAnchor="middle" className={s.treeLeadText}>Lead form</text>
      </g>
      <text x="70" y="252" textAnchor="middle" className={s.treeHint}>Service pages</text>
    </svg>
  );
}

// ── Web application: layer stack with a travelling request ─────────────────
const APP_LAYERS = [
  { l: "Users & roles",   n: "Login, permissions" },
  { l: "Dashboards",      n: "Data people act on" },
  { l: "Workflows",       n: "Approvals, alerts" },
  { l: "APIs",            n: "Logic & integrations" },
  { l: "Database",        n: "Records, backups" },
];

function AppStack() {
  return (
    <div className={s.stack} role="img" aria-label="Web application layers: users and roles, dashboards, workflows, APIs and the database, with a request travelling down through each layer.">
      <span className={s.stackRail} aria-hidden="true"><i className={s.stackPacket} /></span>
      <ol className={s.stackList}>
        {APP_LAYERS.map((x, i) => (
          <li key={x.l} className={s.stackItem} data-last={i === APP_LAYERS.length - 1 ? "" : undefined} style={{ ["--d" as string]: i }}>
            <span className={s.stackDot} aria-hidden="true" />
            <span className={s.stackLabel}>{x.l}</span>
            <span className={s.stackNote}>{x.n}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── E-commerce store: funnel (same component language as the PPC funnel) ────
const STORE_LAYERS = [
  { label: "Browse",       metric: "Category pages · search" },
  { label: "Product page", metric: "Photos · reviews · specs" },
  { label: "Cart",         metric: "Saved items · totals" },
  { label: "Checkout",     metric: "Guest · payments" },
  { label: "Order",        metric: "Email · tracking" },
];

function StoreFunnel() {
  const widths = [100, 88, 76, 64, 52];
  return (
    <div className={s.funnel} role="img" aria-label="E-commerce funnel: browse, product page, cart, checkout and a confirmed order.">
      {STORE_LAYERS.map((l, i) => {
        const w = widths[i];
        const next = widths[i + 1] ?? w - 8;
        const inset = (((w - next) / 2) / w) * 100;
        return (
          <div key={l.label} className={s.funnelLayer} data-last={i === STORE_LAYERS.length - 1 ? "" : undefined}
            style={{ width: `${w}%`, clipPath: `polygon(0 0,100% 0,${100 - inset}% 100%,${inset}% 100%)`, ["--d" as string]: i }}>
            <span className={s.funnelLabel}>{l.label}</span>
            <span className={s.funnelMetric}>{l.metric}</span>
          </div>
        );
      })}
    </div>
  );
}

const PANELS = {
  business: {
    visual: <SitemapTree />,
    tone: "blue" as const,
    steps: [
      { title: "Sitemap & content",  text: "Pages planned around what visitors need to find, not an org chart." },
      { title: "Design system",      text: "Reusable components and brand styles so new pages stay consistent." },
      { title: "CMS setup",          text: "Your team edits text, images and pages without a developer." },
      { title: "SEO foundation",     text: "Clean URLs, metadata, schema and fast pages from the first build." },
      { title: "Lead capture",       text: "Clear calls to action and forms that reach your inbox or CRM." },
    ],
  },
  app: {
    visual: <AppStack />,
    tone: "orange" as const,
    steps: [
      { title: "Users & roles",  text: "Logins and permissions so each person sees exactly what they should." },
      { title: "Dashboards",     text: "The numbers and lists people act on, on one screen." },
      { title: "Workflows",      text: "Approvals, notifications and automations that replace manual steps." },
      { title: "Integrations",   text: "APIs that connect payments, CRMs, ERPs and the tools you already use." },
      { title: "Monitoring",     text: "Logging, backups and alerts so issues are caught before users notice." },
    ],
  },
  store: {
    visual: <StoreFunnel />,
    tone: "green" as const,
    steps: [
      { title: "Catalogue",        text: "Categories, filters and search that make products easy to find." },
      { title: "Product pages",    text: "Photos, specs, reviews and structured data for rich results." },
      { title: "Cart & checkout",  text: "Short, mobile-friendly checkout with guest purchase." },
      { title: "Payments",         text: "Secure gateways such as Stripe or Razorpay, with tax and shipping rules." },
      { title: "Orders",           text: "Confirmation emails, tracking and an admin view for fulfilment." },
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

export default function WebsitePlaybooks({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.playbooks} ${className}`} data-ig="" aria-labelledby="ig-wplay-cap">
      <div className={s.playHead}>
        <span className={s.badge}>Project playbooks</span>
        <figcaption id="ig-wplay-cap" className={s.playCap}>How we structure the three kinds of website we build most often.</figcaption>
      </div>
      <Tabs
        label="Website project playbooks"
        tabs={[
          { id: "business", label: "Business Website", icon: <FaBuilding />,     panel: <Panel p={PANELS.business} /> },
          { id: "app",      label: "Web Application",  icon: <FaLaptopCode />,   panel: <Panel p={PANELS.app} /> },
          { id: "store",    label: "E-commerce Store", icon: <FaShoppingCart />, panel: <Panel p={PANELS.store} /> },
        ]}
      />
    </figure>
  );
}
