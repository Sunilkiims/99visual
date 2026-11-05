// app/services/website-development/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Website & Web App Development — 99 Visual Solutions
//
// THIS REVISION: Hero fully aligned to the /services (hub) page hero, which
//   is now the shared master template across all service pages — same
//   layout, spacing, typography (Space Grotesk / Inter / IBM Plex Mono
//   scales and clamp() values), corner bracket positions, eyebrow/rule/sub
//   treatment, button styling, ticker mechanics, and responsive breakpoints
//   (desktop/tablet/mobile/small-mobile/short-screen). Only the hero
//   heading, description, artwork (banner image), and ticker content stay
//   page-specific — everything else (CSS values, structure, animations)
//   now matches the hub page exactly.
//
//   All hero-area "contact us" CTAs (hero primary, pain-section CTA, CTA
//   strip, sticky mobile CTA) now open the ContactPopup modal via the
//   shared ConsultationCTA client wrapper instead of navigating to
//   /contact, matching the hub page's CTA implementation.
//
//   Nothing below the hero, no metadata/schema/SEO, and no business copy
//   has changed.
//
// THIS EDIT: "Services · Web Development" eyebrow pill in the hero is now
//   orange (#FF8A2E) instead of blue. Only the pill (text, border,
//   background tint, pulsing dot) changed — the shared --wdev-blue
//   variable used everywhere else on the page is untouched.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import { caseStudies } from '@/lib/case-studies';
import Link from "next/link";
import Image from "next/image";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ProcessList, FaqList, ServiceCTA, StickyCTA, IconLabelGrid } from "@/app/components/premium/service/ServiceBlocks";
import { SectionHeading } from "@/app/components/ui/primitives";


import type { Metadata } from "next";
import {
  FaCogs, FaRocket, FaMobileAlt,
  FaClock, FaUsers, FaTools,
  FaExclamationCircle, FaHourglassHalf, FaChartLine, FaLock,
  FaSearchengin, FaLayerGroup, FaFileCode, FaLifeRing, FaClipboardCheck,
  FaHospital, FaShoppingBag, FaGraduationCap, FaHome, FaUtensils, FaPlane,
  FaReact, FaNodeJs, FaAws, FaMicrosoft,
} from "react-icons/fa";
import {
  SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiVercel,
  SiVuedotjs, SiTypescript, SiTailwindcss, SiExpress, SiMysql, SiRedis,
  SiSanity, SiContentful, SiStrapi, SiGooglecloud,
  SiDocker, SiKubernetes, SiFigma, SiGithub, SiStripe,
} from "react-icons/si";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
  serviceSchema,
  jsonLdString,
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "Website Development Company in India",

  description:
    "Website development company in Bengaluru, India, building custom, responsive, SEO-friendly websites and web apps in React and Next.js. Get a free quote.",

  metadataBase: new URL(BASE_SAFE),

  alternates: {
    canonical: "/services/website-development",
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      "max-image-preview":  "large",
      "max-snippet":        -1,
      "max-video-preview":  -1,
    },
  },

  openGraph: {
    title:       "Website Development Company in India | 99 Visual Solutions",
    description: "Custom website development, business websites, and web applications built in React and Next.js — responsive, SEO-friendly, and engineered for speed, security, and conversions. Based in Bengaluru, serving clients across India and worldwide.",
    url:         `${BASE_SAFE}/services/website-development`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/og/web-development-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "Website Development Company in India — Web & Web App Development Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Website Development Company in India | 99 Visual Solutions",
    description: "Custom web apps, responsive business websites, e-commerce builds, and SEO-friendly development in React & Next.js — from a website development company based in Bengaluru, India.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/og/web-development-og.jpg`,
        alt: "Website Development Company in India — Web & Web App Development Services by 99 Visual Solutions",
      },
    ],
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE_SAFE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/website-development']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unchanged
// ─────────────────────────────────────────────────────────────────────────────

const wdevBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",            url: "/" },
  { name: "Services",        url: "/services" },
  { name: "Web Development", url: "/services/website-development" },
]);

const wdevServiceNode = {
  ...serviceSchema({
    name:        "Website Development",
    description: "Website development company services from 99 Visual Solutions: custom website development, business websites, and web application builds, UX/UI design, front-end and back-end engineering, e-commerce and CMS development, SEO and performance optimisation, security hardening, hosting and deployment, and API integrations — delivered from Bengaluru, India for clients in India and abroad.",
    pathname:    "/services/website-development",
    image:       `${BASE_SAFE}/images/og/web-development-og.jpg`,
  }),
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  provider: { "@id": `${BASE_SAFE}/#organization` },
  "@id": `${BASE_SAFE}/services/website-development#service`,
  serviceType: "Web Development",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Web Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "User Experience (UX) Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Customization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Front-End Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Back-End Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce & CMS Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web App Modernization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Performance Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Security Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Hosting & Deployment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "API & Third-Party Integrations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Design & Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Dashboard & Admin Panel Development" } },
    ],
  },
};

// FAQ copy lives in one place (faqItems, defined below with the rest of the
// page data) and is reused for both the on-page accordion and this JSON-LD
// node, so the two can no longer drift out of sync.
function buildWdevFaqNode(items: { question: string; answer: string }[]) {
  return {
    ...faqSchema(items),
    "@id":            `${BASE_SAFE}/services/website-development#faq`,
    mainEntityOfPage: { "@id": `${BASE_SAFE}/services/website-development#webpage` },
  };
}

const wdevPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE_SAFE}/services/website-development#webpage`,
  url:           `${BASE_SAFE}/services/website-development`,
  name:          "Website Development Company in India | 99 Visual Solutions",
  description:   "99 Visual Solutions is a website development company in India, covering custom website development, business websites, and web application builds — UX design, e-commerce and CMS builds, SEO, security, hosting, and API integrations, delivered from Bengaluru for clients in India and abroad.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE_SAFE}/images/og/web-development-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Website Development Company in India — Web & Web App Development Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".wdev-hero__h1", ".wdev-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE_SAFE}/services/website-development#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE_SAFE}/services/website-development`] },
};

// NOTE: wdevGraph is assembled further below (after `faqItems` is defined in
// the PAGE DATA section), via buildWdevFaqNode(faqItems), so the FAQ schema
// and the on-page FAQ accordion always share one copy of the same content.

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaCogs />,      title: "Customised Solutions",          description: "No two businesses run the same way, so we don't start from a template. Every site or application is scoped around your specific workflow, customers, and goals from the first conversation." },
  { icon: <FaRocket />,    title: "SEO Optimisation",              description: "SEO isn't something we bolt on before launch — it's part of how the site is structured from day one, from semantic HTML to Core Web Vitals, so you're not paying to fix it six months later." },
  { icon: <FaMobileAlt />, title: "Mobile Responsiveness",         description: "With most traffic now arriving on phones, a site that only works well on desktop is quietly losing customers. We design mobile-first and test on real devices, not just browser emulators." },
  { icon: <FaClock />,     title: "Faster Load Times",             description: "Every extra second of load time increases bounce rate and works against your Google ranking. We optimise images, scripts, and server response times so pages load quickly, even on slower connections." },
  { icon: <FaUsers />,     title: "Improved User Experience",      description: "Good UX isn't about how a screenshot looks — it's about whether someone can find what they need in a few clicks. We design for that outcome, then test it with real usage patterns." },
  { icon: <FaTools />,     title: "Ongoing Maintenance & Support", description: "Launch day isn't the finish line. We handle updates, security patches, and performance checks afterward, so the site keeps working as your business — and the web itself — keeps changing." },
];

const services = [
  {
    id: "web-application",
    title: "Web Application Development",
    description: "A standard website works fine until your business needs a login system, an internal tool, or a way to move data between teams without spreadsheets and email chains. That's the point where we start building web applications — software built around how your team actually works, not a page that just describes it.",
    highlight: "We map the workflow first and design the tool around it, so the result is something your team uses because it's faster, not something they route around because it isn't.",
    bullets: ["Custom dashboards & business tools", "Workflow automation & process optimisation", "Secure, scalable, and high-performance architecture"],
    icon: <FaLayerGroup />,
  },
  {
    id: "ux-design",
    title: "User Experience (UX) Design",
    description: "People rarely complain about confusing design — they just leave. Our UX process is built around finding the small frictions that quietly cost you conversions: unclear navigation, vague calls to action, forms that ask for too much too soon.",
    highlight: "Every layout decision is backed by a reason — user research, behavioural data, or testing — rather than personal preference, because what looks good and what actually converts aren't always the same thing.",
    bullets: ["Human-centred design approach", "Wireframes, prototypes & usability testing", "Conversion-focused design strategy"],
    icon: <FaUsers />,
  },
  {
    id: "website-customization",
    title: "Website Customisation",
    description: "Off-the-shelf templates rarely fit a real business perfectly. We start with how you actually sell and how customers actually browse, then build the site around that — rather than bending your business model to fit a theme's limitations.",
    highlight: "Whether that means a custom checkout flow or a landing page built for a single campaign, the goal stays the same: a site that behaves the way your business actually operates, not the way a template assumes it should.",
    bullets: ["Custom e-commerce functionality", "Landing pages built for campaigns", "Personalisation for brand consistency"],
    icon: <FaCogs />,
  },
  {
    id: "frontend",
    title: "Front-End Development",
    description: "The front end is the only part of your site users ever actually see, so small delays and layout shifts have an outsized effect on whether someone stays or bounces. We build interfaces in React and Next.js designed to load quickly and hold together across screen sizes and browsers.",
    highlight: "Clean component structure also pays off later — future updates are faster and cheaper because you're not paying someone to untangle tangled code two years from now.",
    bullets: ["Responsive, mobile-first & cross-browser compatible design", "Modern frameworks (React, Next.js, Vue) & clean code architecture", "Optimised performance, accessibility & Core Web Vitals compliance"],
    icon: <FaReact />,
  },
  {
    id: "backend",
    title: "Back-End Development",
    description: "Front-end polish doesn't matter much if the system behind it can't handle real traffic or keep data secure. We build the APIs, databases, and server architecture that hold up under actual load, not just a demo environment.",
    highlight: "Every back end is scoped to what you actually need — a small inventory tool doesn't require microservices, but a multi-location booking platform usually does, and we size the architecture accordingly rather than over-building by default.",
    bullets: ["Custom APIs & microservices architecture", "Database design, optimisation & management", "Authentication, authorisation & data security"],
    icon: <FaNodeJs />,
  },
  {
    id: "ecommerce",
    title: "E-Commerce & CMS Development",
    description: "Every step between adding an item to a cart and completing checkout is a chance to lose the sale. We build storefronts and content systems that keep that path short and fast, whether you're running a five-product shop or a growing multi-category catalogue.",
    highlight: "We also configure the CMS so your own team can update products, pages, and promotions without filing a support ticket every time something needs to change.",
    bullets: ["Custom storefront design & shopping cart development", "Headless CMS & content workflow management", "Secure payment gateway & order management integrations"],
    icon: <FaShoppingBag />,
  },
  {
    id: "modernization",
    title: "Web App Modernisation",
    description: "If your current system was built more than a few years ago, it's likely slower than it should be, harder to update safely, and more expensive to maintain than it needs to be. We audit what you have, work out what's genuinely worth keeping, and rebuild the rest on a modern stack.",
    highlight: "Modernisation doesn't always mean a full rebuild — sometimes the fastest win is migrating the database and upgrading the front end while leaving stable back-end logic alone.",
    bullets: ["Legacy system upgrade & re-engineering", "Cloud migration & performance optimisation", "Scalable, secure & future-ready architecture"],
    icon: <FaChartLine />,
  },
  {
    id: "seo",
    title: "SEO & Performance Optimisation",
    description: "Ranking well and loading fast aren't separate goals — Google's own ranking systems weigh page speed and Core Web Vitals directly. We handle both together: technical SEO, structured data, image and script optimisation, and monitoring that continues as your content grows.",
    highlight: "We report on what actually moved — organic traffic, ranking positions, and conversion rate — rather than vanity metrics that don't affect revenue.",
    bullets: ["On-page, technical & keyword optimisation", "Website speed & Core Web Vitals improvement", "Analytics-driven insights & continuous optimisation"],
    icon: <FaSearchengin />,
  },
  {
    id: "security",
    title: "Web Security Services",
    description: "A single unpatched vulnerability or an exposed API key can undo years of customer trust in a day. We build security in from the start — proper authentication, encrypted data handling, and regular vulnerability checks — rather than adding it after the fact.",
    highlight: "For sites handling payments or personal data, we also help you meet the compliance standards your industry expects, from PCI DSS to GDPR-aligned data handling.",
    bullets: ["Vulnerability assessment & penetration testing", "SSL implementation, firewalls & malware protection", "Continuous monitoring & threat prevention strategies"],
    icon: <FaLock />,
  },
  {
    id: "hosting",
    title: "Website Hosting & Deployment",
    description: "Hosting decisions rarely get attention until something breaks — a traffic spike, a failed deploy, a server going down at the worst possible time. We set up infrastructure and CI/CD pipelines designed to prevent those moments, with monitoring and backups running quietly in the background.",
    highlight: "Whether you need one production environment or staging, testing, and production kept in sync, releases are automated so shipping an update isn't a manual, error-prone process.",
    bullets: ["Secure, scalable & high-performance hosting solutions", "CI/CD pipelines & seamless deployment processes", "Server management, backups & uptime monitoring"],
    icon: <FaAws />,
  },
  {
    id: "api",
    title: "API & Third-Party Integrations",
    description: "Your website rarely operates alone — payment processors, CRMs, analytics tools, and internal systems all need to exchange data reliably. We build and connect REST and GraphQL APIs so information moves between them without manual exports or broken syncs.",
    highlight: "Where a ready-made integration doesn't exist, we build a custom one, matched to how your specific tools and data actually need to interact rather than forced through a generic connector.",
    bullets: ["Secure REST & GraphQL API integrations", "Payment gateways, CRM & third-party service connections", "Real-time data sync & workflow automation"],
    icon: <SiGraphql />,
  },
  {
    id: "landing-page",
    title: "Landing Page Design & Development",
    description: "A landing page has one job, and everything on it should serve that job — the headline, the layout, the single call to action. We design pages around one goal at a time, then test variations to see which layout actually converts better with your audience.",
    highlight: "Load time matters more here than almost anywhere else on your site: campaign traffic is often paid, so every extra second of load time is money leaking out of your ad budget.",
    bullets: ["Conversion-focused design & persuasive content", "Fast-loading, responsive & mobile-first layouts", "A/B testing & performance-driven optimisation"],
    icon: <FaRocket />,
  },
  {
    id: "dashboard",
    title: "Custom Dashboard & Admin Panel Development",
    description: "Spreadsheets and shared documents work fine until three people are editing the same file at once. We build dashboards and admin panels that give your team one shared, accurate view of the data that matters — orders, users, inventory, whatever your operation actually runs on.",
    highlight: "Role-based permissions mean each person sees exactly what they need and nothing more, which matters as much for security as it does for day-to-day usability.",
    bullets: ["Role-based access & secure user management", "Real-time analytics, reports & data visualisation", "Scalable, intuitive & fully customisable interfaces"],
    icon: <FaClipboardCheck />,
  },
];

const clusters = [
  {
    id: "product-ux",
    eyebrow: "Product & UX",
    heading: <>Design the <em>right thing</em>, before building it</>,
    intro: "Web applications, UX strategy, and site customisation — scoped to how your business actually operates, not a template.",
    cols: 3,
    ids: ["web-application", "ux-design", "website-customization"],
  },
  {
    id: "engineering",
    eyebrow: "Engineering",
    heading: <>Front to back, built to <em>hold up</em></>,
    intro: "Interfaces, APIs, and storefronts built on a modern stack, sized to your actual load — not over-built by default.",
    cols: 3,
    ids: ["frontend", "backend", "ecommerce"],
  },
  {
    id: "optimize-protect",
    eyebrow: "Optimize & Protect",
    heading: <>Modernise, rank, and <em>stay secure</em></>,
    intro: "Legacy upgrades, technical SEO, and security hardening — the unglamorous work that prevents expensive problems later.",
    cols: 3,
    ids: ["modernization", "seo", "security"],
  },
  {
    id: "operate-extend",
    eyebrow: "Operate & Extend",
    heading: <>Keep it running, <em>keep it connected</em></>,
    intro: "Hosting, integrations, campaign pages, and internal tools that extend what the core site can do.",
    cols: 4,
    ids: ["hosting", "api", "landing-page", "dashboard"],
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

// Illustration + descriptive alt text per service card. Assets already exist
// in /public/images — this swaps the icon-only cards for real content images
// with meaningful alt text (previously the page had no <img> elements at all).
const serviceMedia: Record<string, { src: string; alt: string }> = {
  "web-application":       { src: "/images/web-application.png",                 alt: "Custom web application development for a business dashboard and internal tool" },
  "ux-design":             { src: "/images/ux-design.png",                        alt: "UX and UI design process for a responsive business website" },
  "website-customization": { src: "/images/website-customization.png",            alt: "Custom website development layout tailored to a specific business workflow" },
  "frontend":              { src: "/images/frontend-development.png",             alt: "Front-end development in React and Next.js for a responsive website" },
  "backend":               { src: "/images/backend-development.png",              alt: "Back-end development with APIs, databases, and server architecture" },
  "ecommerce":             { src: "/images/e-commerce-cms-development.png",       alt: "E-commerce and CMS development for an online storefront" },
  "modernization":         { src: "/images/webapp-modernization.png",             alt: "Legacy web application modernisation and cloud migration" },
  "seo":                   { src: "/images/seo-and-performance-optimization.png", alt: "SEO-friendly, high-performance website development and Core Web Vitals optimisation" },
  "security":              { src: "/images/web-security-services.png",            alt: "Web security services including SSL, monitoring, and vulnerability testing" },
  "hosting":               { src: "/images/website-hosting-deployement.png",      alt: "Website hosting, deployment, and CI/CD pipeline setup" },
  "api":                   { src: "/images/api-and-third-party-intigration.png",  alt: "API and third-party integration for payment gateways and CRM systems" },
  "landing-page":          { src: "/images/landing-page-design.png",              alt: "Landing page design and development built for campaign conversions" },
  "dashboard":             { src: "/images/custom-dashboard-admin-panel.png",     alt: "Custom dashboard and admin panel development with role-based access" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORTING CONTENT — unchanged
// ─────────────────────────────────────────────────────────────────────────────

const painPoints = [
  { icon: <FaExclamationCircle />, title: "The site looks fine, but nothing converts", text: "Traffic shows up in analytics and leaves without filling out a form — usually a sign the design isn't guiding people toward a decision." },
  { icon: <FaHourglassHalf />,     title: "Every small change takes weeks",          text: "A codebase that's hard to touch turns simple updates into a back-and-forth with a developer who's slow to respond." },
  { icon: <FaMobileAlt />,         title: "It works on desktop, breaks on mobile",   text: "Most visitors are on a phone. If the mobile experience is an afterthought, so is most of your traffic." },
  { icon: <FaLock />,              title: "Nobody's sure how secure it actually is", text: "No one wants to find out the hard way — after a breach — that basic security hygiene was skipped at launch." },
];

const processSteps = [
  { step: "01", title: "Discovery & Scoping",  text: "We start by understanding your business, your users, and what the current site or process is actually costing you — not just what page to build." },
  { step: "02", title: "Strategy & UX",        text: "Wireframes and information architecture come before any visual design, so the structure is decided by what works, not what looks nice first." },
  { step: "03", title: "Design & Build",       text: "UI design and development run in parallel with regular checkpoints, so you see progress continuously instead of one big reveal at the end." },
  { step: "04", title: "Testing & Launch",     text: "Cross-device QA, performance checks, and a staged rollout catch problems before your customers do." },
  { step: "05", title: "Support & Growth",     text: "Post-launch, we monitor performance and security, and keep iterating based on how people actually use the site." },
];

const deliverables = [
  { icon: <FaFileCode />,        title: "Production-ready source code",     text: "Clean, documented code in your own repository — nothing locked to us." },
  { icon: <FaLayerGroup />,      title: "Design files & style guide",        text: "Figma files and a documented design system so future work stays consistent." },
  { icon: <FaSearchengin />,     title: "Technical SEO foundation",          text: "Metadata, schema, sitemap, and Core Web Vitals handled at launch, not after." },
  { icon: <FaClipboardCheck />,  title: "QA & cross-device test report",     text: "A record of what was tested and on which devices and browsers." },
  { icon: <FaLifeRing />,        title: "Handover documentation",            text: "Plain-language docs so your team — or the next developer — isn't guessing." },
  { icon: <FaTools />,           title: "30-day post-launch support window", text: "A buffer to catch anything real usage surfaces that testing didn't." },
];

const industries = [
  { icon: <FaHospital />,       name: "Healthcare" },
  { icon: <FaShoppingBag />,    name: "E-Commerce & Retail" },
  { icon: <FaGraduationCap />,  name: "Education" },
  { icon: <FaHome />,           name: "Real Estate" },
  { icon: <FaUtensils />,       name: "Hospitality & Food" },
  { icon: <FaPlane />,          name: "Travel & Logistics" },
];

const techStack = [
  { icon: <FaReact />,        name: "React" },
  { icon: <SiNextdotjs />,    name: "Next.js" },
  { icon: <SiVuedotjs />,     name: "Vue.js" },
  { icon: <SiTypescript />,   name: "TypeScript" },
  { icon: <SiTailwindcss />,  name: "Tailwind CSS" },
  { icon: <FaNodeJs />,       name: "Node.js" },
  { icon: <SiExpress />,      name: "Express" },
  { icon: <SiGraphql />,      name: "GraphQL" },
  { icon: <SiPostgresql />,   name: "PostgreSQL" },
  { icon: <SiMongodb />,      name: "MongoDB" },
  { icon: <SiMysql />,        name: "MySQL" },
  { icon: <SiRedis />,        name: "Redis" },
  { icon: <SiSanity />,       name: "Sanity" },
  { icon: <SiContentful />,   name: "Contentful" },
  { icon: <SiStrapi />,       name: "Strapi" },
  { icon: <FaAws />,          name: "AWS" },
  { icon: <SiGooglecloud />,  name: "Google Cloud" },
  { icon: <FaMicrosoft />,    name: "Microsoft Azure" },
  { icon: <SiVercel />,       name: "Vercel" },
  { icon: <SiDocker />,       name: "Docker" },
  { icon: <SiKubernetes />,   name: "Kubernetes" },
  { icon: <SiGithub />,       name: "GitHub" },
  { icon: <SiFigma />,        name: "Figma" },
  { icon: <SiStripe />,       name: "Stripe" },
];

const faqItems = [
  {
    question: "What web development services does 99 Visual Solutions offer?",
    answer:
      `We handle the full lifecycle: custom web applications, UX and UI design, front-end and back-end development, e-commerce and CMS builds, SEO and performance work, security, hosting, and API integrations. If you're not sure where to start, email us at ${CONTACT_EMAIL} — there's no cost or obligation for that first conversation.`,
  },
  {
    question: "Do you build mobile-responsive websites?",
    answer:
      "Yes. Every site we build is mobile-first and tested on real devices, not just resized in a browser. This matters for more than usability — Google's Core Web Vitals are part of how pages rank, so a slow or broken mobile layout costs you both users and search visibility.",
  },
  {
    question: "Which technologies do you use for web development?",
    answer:
      "Our front-end stack is mainly React and Next.js, paired with headless CMS platforms like Sanity, Contentful, or Strapi when a content team needs to publish independently. On the back end we build REST and GraphQL APIs on PostgreSQL, MongoDB, or MySQL, deployed to AWS, GCP, or Azure depending on your scale and budget.",
  },
  {
    question: "Can you modernize or upgrade our existing web application?",
    answer:
      `Yes — this is one of the more common requests we get. We start with a technical audit to separate what's genuinely broken from what's just old, then migrate incrementally where that's safer than a full rebuild. Email ${CONTACT_EMAIL} with some background on your current system and we'll give you a straight read on what it would take.`,
  },
  {
    question: "Are you a website development company based in India?",
    answer:
      "Yes. 99 Visual Solutions is a website development company headquartered in Bengaluru (Bangalore), Karnataka, India. Being based here doesn't limit who we work with — our team also builds and supports websites and web applications for clients in the US, UK, UAE, and Australia, all from the same India-based delivery team.",
  },
  {
    question: "What's the difference between a business website and a custom web application?",
    answer:
      "A business website — a marketing site, a service page, a catalogue — mainly needs to inform and convert visitors, so speed, SEO, and clear content structure matter most. A web application adds logins, dashboards, or workflows that your team or customers actually operate inside. Many projects start as a business website and grow a web application layer later; we design the site so that path stays open instead of requiring a rebuild.",
  },
  {
    question: "Do you build custom websites, or work from templates?",
    answer:
      "We build custom website development projects rather than reskinning a theme. That doesn't mean starting from a blank file for everything — reusable components and a documented design system keep the build efficient — but the structure, layout, and functionality are scoped to how your business actually sells and operates, not to a template's assumptions.",
  },
  {
    question: "How much does professional website development cost in India?",
    answer:
      `Cost depends mainly on scope — a business website with a handful of pages is priced very differently from a custom web application with logins, a database, and ongoing integrations. Rather than quote a generic range that won't match your project, we scope it properly: email ${CONTACT_EMAIL} with a short description of what you need and we'll come back with a clear, itemised estimate.`,
  },
];

const wdevFaqNode = buildWdevFaqNode(faqItems);

const wdevGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  wdevPageNode,
  wdevBreadcrumbNode,
  wdevServiceNode,
  wdevFaqNode,
);

// Illustrative build/QA pipeline lines for the signature ticker band.

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// Case studies filed under this service (lib/case-studies.ts), shown in the
// "Recent Work" section.
const webCaseStudies = caseStudies.filter((c) => c.service.href === '/services/website-development');

export default function WebsiteDevelopment() {
  const T = "Website Development";
  const P = "/services/website-development";
  return (
    <>
      <script
        id="schema-webdev-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(wdevGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="wdev-hero-heading"
            crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: P, label: "Web Development" }]}
            title="Website Development Company in India"
            tagline={<>Speed, security &amp; <em>growth</em>, engineered in</>}
            sub="Custom websites, business sites, and web applications — responsive, SEO-friendly, and engineered to hold up under real traffic, not just a demo."
            image="/images/services/website-development-hero-banner.jpg"
            imageAlt="Website development: responsive web application on multiple devices"
            ctaAria="Get a free web development quote from 99 Visual Solutions"
            postTitle={T}
            postUrl={P}
            secondary={{ href: "#services", label: "Explore Services" }}
            points={["Business websites", "Custom web apps", "E-commerce", "React & Next.js", "Technical SEO built in"]}
          />

          <FeatureGrid
            id="wdev-pain-heading"
            eyebrow="Sound Familiar?"
            title={<>Most sites don&apos;t fail because of one big mistake — they fail from <em>a dozen small ones</em></>}
            items={painPoints.map((p) => ({ title: p.title, description: p.text, icon: p.icon }))}
            surface
          />

          <ServiceIntro id="wdev-intro-heading" eyebrow="Our Philosophy" title={<>Crafting digital experiences that inspire, connect &amp; <em>convert</em></>}>
            <p className="vz-lead">
              At <strong>99 Visual Solutions</strong>, we treat design and engineering as one discipline, not two handoffs — because a site that looks great but loads slowly or breaks on mobile isn&apos;t actually doing its job. As a <strong>website design and development company</strong>, we build with that in mind from the first wireframe, not just at launch.
            </p>
            <p>
              Your website is usually the first real interaction a customer has with your business, which is why we build <strong>modern, responsive, and SEO-optimised sites</strong> around your actual goals — whether you&apos;re a startup validating an idea, an established business scaling up, or an e-commerce brand trying to grow order volume.
            </p>
          </ServiceIntro>

          <FeatureGrid
            id="wdev-expertise-heading"
            eyebrow="How We Think About It"
            title={<>What a <em>website development company</em> actually does</>}
            lead="“Website development” covers a wide range of work. As a web development company in India, here’s how we break it down, and what each piece means for your project."
            numbered
            surface
            items={[
              { title: "Business websites vs. custom web applications", description: <>A business website — a marketing site, a service catalogue, a lead-generation page — is judged on clarity, speed, and conversions. A custom web application adds logins, dashboards, or internal workflows on top of that. As a <strong>custom website development company</strong>, we scope each project against which of these you actually need, then build the site so it can grow into the other without a rebuild if your business does.</> },
              { title: "Responsive, mobile-first development", description: <>Every site we ship is built <strong>responsive website development</strong>-first — designed for a phone screen, then scaled up — and checked on real devices rather than a resized browser window. Since most traffic today arrives on mobile, this is less a nice-to-have and more a baseline requirement for usability and search ranking alike.</> },
              { title: "Performance & high-performance engineering", description: <><strong>High-performance website development</strong> means optimised images, minimal render-blocking scripts, and server responses tuned for Core Web Vitals — done at build time, not patched in after a slow launch. A page that loads in under two seconds keeps more visitors than one that takes five, and that difference compounds across every campaign you run to the site.</> },
              { title: "SEO-friendly by design", description: <><strong>SEO-friendly website development</strong> starts with semantic HTML, clean URL structures, and schema markup built in from the first sprint — not bolted on before launch. We also handle the technical side (sitemaps, canonical tags, structured data) in-house, and pair it with our <Link className="vz-prose-link" href="/services/digital-marketing-seo">SEO &amp; digital marketing services</Link> when a site needs ongoing content and off-page work as well.</> },
              { title: "Modern technologies: React & Next.js website development", description: <>Most of our builds run on <strong>React website development</strong> and <strong>Next.js website development</strong> — server rendering for fast first loads, a component-based front end that&apos;s easier to extend later, and a large enough ecosystem that hiring or handing off the codebase down the line isn&apos;t a problem. See the full stack in the &quot;Technologies we build with&quot; section below.</> },
              { title: "Security, scalability & maintenance", description: "Authentication, encrypted data handling, and dependency patching are built in from the start, not added after an incident. Architecture is sized to your actual load rather than over-built by default, and we offer ongoing maintenance and support after launch so the site keeps working as browsers, frameworks, and your business itself keep changing." },
            ]}
          />

          <ServiceIntro id="wdev-location-heading" eyebrow="Where We're Based" title={<>A website development company in <em>Bengaluru, India</em></>}>
            <p className="vz-lead">
              99 Visual Solutions is a <strong>website development company in Bangalore</strong> — headquartered in Bengaluru, Karnataka, and working as a <strong>business website development company</strong> and <strong>web application development company in India</strong> for clients across the country. Being a <strong>web development company in Bangalore</strong> also means our full design and engineering team sits together in one time zone, which keeps communication and turnaround fast on projects for clients elsewhere in India as well as in the US, UK, UAE, and Australia. Read more about our team and background on the <Link className="vz-prose-link" href="/about">About 99 Visual Solutions</Link> page.
            </p>
          </ServiceIntro>

          <section className="vz-section vz-section--surface" aria-labelledby="wdev-overview-heading" id="services">
            <div className="vz-container">
              <SectionHeading
                id="wdev-overview-heading"
                eyebrow="Our Solution"
                title={<>Everything under <em>one roof</em></>}
                lead="Our website development services in India cover everything from a single landing page to a full custom web development services engagement — jump to the piece you need, or scroll through the full detail below."
              />
              <ul className="vz-jump" role="list">
                {services.map((svc) => (
                  <li key={svc.id}><a href={`#${svc.id}`}><span aria-hidden="true">{svc.icon}</span>{svc.title}</a></li>
                ))}
              </ul>
            </div>
          </section>

          {clusters.map((cluster, ci) => (
            <ServiceCluster
              key={cluster.id}
              id={`wdev-cluster-h-${cluster.id}`}
              eyebrow={cluster.eyebrow}
              title={cluster.heading}
              intro={cluster.intro}
              surface={ci % 2 === 1}
              columns={cluster.cols === 4 ? 4 : 3}
              items={cluster.ids.map((id) => {
                const svc = serviceById(id);
                return { id: svc.id, title: svc.title, description: svc.description, highlight: svc.highlight, bullets: svc.bullets, icon: svc.icon, media: serviceMedia[svc.id] };
              })}
            />
          ))}

          <ProcessList
            id="wdev-process-heading"
            title={<>A process built to <em>remove risk</em></>}
            lead="Five stages, each with a clear checkpoint, so you always know what's next."
            steps={processSteps.map((s) => ({ title: s.title, description: s.text }))}
            surface
          />

          <FeatureGrid
            id="wdev-deliv-heading"
            eyebrow="What You Get"
            title={<>Exactly what&apos;s <em>in the box</em></>}
            lead="No vague scopes — here's what leaves with you at the end of the project."
            items={deliverables.map((d) => ({ title: d.title, description: d.text, icon: d.icon }))}
          />

          <section className="vz-section vz-section--surface" aria-labelledby="wdev-ba-heading">
            <div className="vz-container">
              <SectionHeading id="wdev-ba-heading" eyebrow="The Difference" title={<>Before <em>99 Visual</em> — and after</>} />
              <div className="vz-compare">
                <div>
                  <h3 className="vz-h3">Before</h3>
                  <ul>
                    <li>Site looks dated and loads slowly on mobile</li>
                    <li>Every update needs a developer and a week&apos;s wait</li>
                    <li>No clear path from visitor to inquiry</li>
                    <li>SEO an afterthought, rankings stuck</li>
                    <li>Security treated as someone else&apos;s problem</li>
                  </ul>
                </div>
                <div>
                  <h3 className="vz-h3">After</h3>
                  <ul>
                    <li>Fast, mobile-first, and built on a modern stack</li>
                    <li>A structure your team can actually maintain</li>
                    <li>Clear calls to action at every stage of the visit</li>
                    <li>Technical SEO foundation built in from day one</li>
                    <li>Security and monitoring handled from launch</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <IconLabelGrid
            id="wdev-ind-heading"
            eyebrow="Who We Work With"
            title={<>Industries we <em>serve</em></>}
            lead={<>Real estate clients building a project or listings site often pair this with our <Link className="vz-prose-link" href="/services/visualization">3D architectural visualisation</Link> service for renders and walkthroughs; e-commerce brands typically add our <Link className="vz-prose-link" href="/services/digital-marketing-seo">SEO &amp; digital marketing</Link> work once the site is live.</>}
            items={industries.map((ind) => ({ label: ind.name, icon: ind.icon }))}
          />

          <section className="vz-section vz-section--surface" aria-labelledby="wdev-tech-heading">
            <div className="vz-container">
              <SectionHeading
                id="wdev-tech-heading"
                eyebrow="Under the Hood"
                title={<>Technologies we <em>build with</em></>}
                lead={<>From front-end frameworks to databases, CMS platforms, and cloud infrastructure — the current, production-proven tools behind every build. For more on how we approach specific topics like Next.js and SEO, see our <Link className="vz-prose-link" href="/insights/category/web-development">web development insights</Link>.</>}
              />
              <ul className="vz-jump" role="list">
                {techStack.map((t) => (
                  <li key={t.name}><span className="vz-chip vz-chip--lg"><span aria-hidden="true">{t.icon}</span> {t.name}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {webCaseStudies.length > 0 && (
            <section className="vz-section" aria-labelledby="wdev-work-heading">
              <div className="vz-container">
                <SectionHeading
                  id="wdev-work-heading"
                  eyebrow="Recent Work"
                  title={<>Websites we&rsquo;ve <em>delivered</em></>}
                  lead="Two recent builds — a full e-commerce store and a photographer’s portfolio — with screenshots from the live sites and a breakdown of what each one does."
                />
                <ul className="vz-work vz-work--2" role="list">
                  {webCaseStudies.map((c) => {
                    const shot = c.gallery?.[0] ?? c.image;
                    return (
                      <li key={c.slug}>
                        <article className="vz-work__card">
                          <div className="vz-work__media">
                            <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 900px) 600px, 100vw" />
                          </div>
                          <div className="vz-work__meta">
                            <span className="vz-chip">{c.client}</span>
                            <h3 className="vz-h3" id={`wdev-work-${c.slug}`}>
                              <Link href={`/work/${c.slug}`} className="vz-stretched">{c.title}</Link>
                            </h3>
                            <p className="vz-body">{c.description}</p>
                            <ul className="vz-chips" role="list">
                              {c.workstreams.map((w) => (
                                <li key={w.name} className="vz-chip">{w.name}</li>
                              ))}
                            </ul>
                            {c.liveUrl && (
                              <a className="vz-prose-link vz-work__live" href={c.liveUrl} target="_blank" rel="noopener noreferrer">
                                Visit {c.liveUrl.replace(/^https?:\/\/(www\.)?/, "")} ↗
                              </a>
                            )}
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
                <p className="vz-work__all"><Link href="/work" className="vz-link-arrow">See all our work →</Link></p>
              </div>
            </section>
          )}

          <FaqList
            id="wdev-faq-heading"
            eyebrow="Common Questions"
            title="Frequently asked questions"
            faqs={faqItems.map((item) => ({ q: item.question, a: <p>{item.answer}</p> }))}
            surface
          />

          <FeatureGrid
            id="wdev-benefits-heading"
            eyebrow="Why Choose Us?"
            title={<>Benefits of working with <em>99 Visual</em></>}
            lead="A website is only worth what it does for your business afterward. As a professional website development company, here's what that looks like in practice when you work with us."
            items={benefits.map((b) => ({ title: b.title, description: b.description, icon: b.icon }))}
          />

          <ServiceCTA
            id="wdev-cta-heading"
            title={<>Ready to build something <em>remarkable</em>?</>}
            sub="Tell us about your project and we'll map out the right approach for your goals, timeline, and budget — no cost for that first conversation."
            ctaAria="Get a free web development consultation from 99 Visual Solutions"
            postTitle={T}
            postUrl={P}
          />
          <RelatedInsights serviceHref="/services/website-development" />
        </main>
        <Footer />
        <StickyCTA postTitle={T} postUrl={P} />
      </div>
    </>
  );
}
