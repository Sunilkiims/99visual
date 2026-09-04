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

import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";


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
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Website & Web App Development Services | 99 Visual",

  description:
    "We build custom web applications and business websites engineered for speed, security, and conversions — covering UX design, front-end and back-end development, e-commerce, CMS, SEO, and API integrations for teams worldwide.",

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
    title:       "Website & Web App Development Services | 99 Visual Solutions",
    description: "From custom web applications to e-commerce platforms and API integrations, 99 Visual Solutions designs and builds full-cycle digital products for startups and enterprises around the world.",
    url:         `${BASE_SAFE}/services/website-development`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/og/web-development-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "Web Development & Web App Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Website & Web App Development Services | 99 Visual Solutions",
    description: "Custom web apps, e-commerce builds, API integrations, and ongoing SEO support — 99 Visual Solutions builds websites engineered to perform, not just look good.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/og/web-development-og.jpg`,
        alt: "Web Development & Web App Services by 99 Visual Solutions",
      },
    ],
  },

  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
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
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

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
    name:        "Website & Web App Development",
    description: "Full-cycle web development covering custom web application builds, UX and UI design, front-end and back-end engineering, e-commerce and CMS development, SEO and performance optimisation, security hardening, hosting and deployment, and API integrations.",
    pathname:    "/services/website-development",
    image:       `${BASE_SAFE}/images/og/web-development-og.jpg`,
  }),
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

const wdevFaqNode = {
  ...faqSchema([
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
  ]),
  "@id":            `${BASE_SAFE}/services/website-development#faq`,
  mainEntityOfPage: { "@id": `${BASE_SAFE}/services/website-development#webpage` },
};

const wdevPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE_SAFE}/services/website-development#webpage`,
  url:           `${BASE_SAFE}/services/website-development`,
  name:          "Website & Web App Development Services | 99 Visual Solutions",
  description:   "A complete overview of 99 Visual Solutions' web development services, including custom web applications, UX design, e-commerce and CMS builds, SEO, security, hosting, and API integrations.",
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
    caption:   "Web Development & Web App Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".wdev-hero__h1", ".wdev-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE_SAFE}/services/website-development#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE_SAFE}/services/website-development`] },
};

const wdevGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  wdevPageNode,
  wdevBreadcrumbNode,
  wdevServiceNode,
  wdevFaqNode,
);

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
];

// Illustrative build/QA pipeline lines for the signature ticker band.
const pipeline = [
  { cmd: "next build",          out: "compiled successfully" },
  { cmd: "lighthouse ci",       out: "98/100 performance" },
  { cmd: "vitest run",          out: "214 passed, 0 failed" },
  { cmd: "eslint .",            out: "no problems found" },
  { cmd: "deploy production",   out: "live in 42s" },
  { cmd: "axe-core audit",      out: "0 critical issues" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function WebsiteDevelopment() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .wdev-page{
          --wdev-ink:#12141A; --wdev-muted:#5B6172; --wdev-paper:#F5F6F8; --wdev-surface:#FFFFFF;
          --wdev-line:#E4E6EC; --wdev-blue:#2E5CFF; --wdev-green:#37D67A;
          background:var(--wdev-paper);
        }
        .wdev-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        /* Shared section head styles reused across sections */
        .wdev-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--wdev-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .wdev-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--wdev-ink);margin:0 0 1rem;text-align:center;}
        .wdev-h2 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-sub{font-family:'Inter',sans-serif;font-size:.94rem;font-weight:300;line-height:1.8;color:var(--wdev-muted);max-width:580px;margin:0 auto;text-align:center;}

        /* ══ HERO — matched exactly to the /services hub page hero.
           Save your banner image to:
           /public/images/services/website-development-hero-banner.jpg ── */
        .wdev-hero{
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/website-development-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .wdev-hero { height: 100svh; } }
        @supports (height: 100dvh) { .wdev-hero { height: 100dvh; } }
        @media(max-width:960px){
          .wdev-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/website-development-hero-banner.jpg') center center / cover no-repeat;
          }
        }
        .wdev-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .wdev-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .wdev-corner--tl{top:28px;left:28px;border-top:1px solid var(--wdev-blue);border-left:1px solid var(--wdev-blue);}
        .wdev-corner--tr{top:28px;right:28px;border-top:1px solid var(--wdev-blue);border-right:1px solid var(--wdev-blue);}
        .wdev-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--wdev-blue);border-left:1px solid var(--wdev-blue);}
        @media(max-width:480px){ .wdev-corner--bl{ left:28px; } }
        .wdev-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--wdev-blue);border-right:1px solid var(--wdev-blue);}

        .wdev-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .wdev-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .wdev-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .wdev-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .wdev-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .wdev-hero__eyebrow{ margin-bottom:1.1rem; }
          .wdev-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .wdev-hero__rule{ margin-bottom:.8rem; }
          .wdev-hero__sub{ margin-bottom:1.2rem; }
        }

        .wdev-hero__content{animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes wdevFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.wdev-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        /* Eyebrow badge — now orange (#FF8A2E), independent of --wdev-blue */
        .wdev-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:#FF8A2E;border:1px solid rgba(255,138,46,.28);background:rgba(255,138,46,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .wdev-hero__dot{width:5px;height:5px;border-radius:50%;background:#FF8A2E;animation:wdevPulse 2s ease-in-out infinite;}
        @keyframes wdevPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .wdev-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .wdev-hero__h1 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--wdev-blue),transparent);margin:0 0 1.4rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.wdev-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--wdev-blue),transparent);}}
        .wdev-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.wdev-hero__sub{margin:0 auto 2.6rem;}}
        .wdev-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.wdev-hero__actions{justify-content:center;}}
        .wdev-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--wdev-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;border:none;}
        .wdev-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .wdev-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;box-shadow:none;gap:8px;}
        .wdev-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);box-shadow:none;transform:none;}

        .wdev-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .wdev-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .wdev-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:wdevScroll 34s linear infinite;}
        .wdev-hero__ticker-bar:hover .wdev-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .wdev-ticker__track{ animation-duration:22s; } }
        @keyframes wdevScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .wdev-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .wdev-ticker__item b{color:rgba(255,255,255,.45);}
        .wdev-ticker__pass{color:var(--wdev-green);}
        @media(max-height:520px){
          .wdev-hero__ticker-bar{ padding-top:.75rem; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .wdev-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--wdev-line);}
        @media(max-width:760px){.wdev-sticky-cta{display:flex;justify-content:center;}}
        .wdev-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--wdev-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ PAIN SECTION ═══════════════════════════════════════════════ */
        .wdev-pain{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-pain__inner{max-width:1100px;margin:0 auto;}
        .wdev-pain__head{margin-bottom:3rem;}
        .wdev-pain__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
        @media(max-width:960px){.wdev-pain__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.wdev-pain__grid{grid-template-columns:1fr;}}
        .wdev-pain__card{background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:16px;padding:1.75rem 1.5rem;}
        .wdev-pain__icon{color:var(--wdev-blue);font-size:1.2rem;margin-bottom:1rem;}
        .wdev-pain__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--wdev-ink);margin-bottom:.5rem;}
        .wdev-pain__text{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.7;color:var(--wdev-muted);}
        .wdev-pain__cta-row{text-align:center;margin-top:3rem;}
        .wdev-pain__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:var(--wdev-ink);border:1px solid var(--wdev-line);padding:12px 26px;border-radius:10px;text-decoration:none;transition:border-color .2s ease,color .2s ease;background:transparent;cursor:pointer;}
        .wdev-pain__cta:hover{border-color:var(--wdev-blue);color:var(--wdev-blue);}

        /* ══ INTRO ═══════════════════════════════════════════════════════ */
        .wdev-intro{background:var(--wdev-paper);border-bottom:1px solid var(--wdev-line);padding:5.5rem 1.5rem;}
        .wdev-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .wdev-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--wdev-muted);max-width:700px;margin:0 auto .9rem;}
        .wdev-intro__p strong{color:var(--wdev-ink);font-weight:500;}

        /* ══ SOLUTION OVERVIEW GRID ═════════════════════════════════════ */
        .wdev-overview{background:var(--wdev-surface);padding:5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-overview__inner{max-width:1200px;margin:0 auto;}
        .wdev-overview__head{margin-bottom:2.5rem;}
        .wdev-overview__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        @media(max-width:1024px){.wdev-overview__grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:760px){.wdev-overview__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:480px){.wdev-overview__grid{grid-template-columns:1fr;}}
        .wdev-overview__card{display:flex;align-items:center;gap:.7rem;background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:12px;padding:1rem 1.1rem;text-decoration:none;transition:border-color .2s ease,transform .2s ease;}
        .wdev-overview__card:hover{border-color:var(--wdev-blue);transform:translateY(-2px);}
        .wdev-overview__icon{color:var(--wdev-blue);font-size:1rem;flex-shrink:0;}
        .wdev-overview__title{font-family:'Inter',sans-serif;font-size:.82rem;font-weight:500;color:var(--wdev-ink);}

        /* ══ SERVICE CLUSTERS (replaces 13 alternating rows) ═════════════ */
        .wdev-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-cluster:nth-child(even){background:var(--wdev-surface);}
        .wdev-cluster__inner{max-width:1180px;margin:0 auto;}
        .wdev-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .wdev-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--wdev-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .wdev-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--wdev-ink);margin:0 0 .6rem;}
        .wdev-cluster__h2 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--wdev-muted);margin:0;}
        .wdev-cluster__grid{display:grid;gap:1.25rem;}
        .wdev-cluster__grid--3{grid-template-columns:repeat(3,1fr);}
        .wdev-cluster__grid--4{grid-template-columns:repeat(4,1fr);}
        @media(max-width:960px){.wdev-cluster__grid--4{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:860px){.wdev-cluster__grid--3{grid-template-columns:1fr;}}
        @media(max-width:640px){.wdev-cluster__grid--4{grid-template-columns:1fr;}}

        .wdev-card{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .wdev-cluster:nth-child(even) .wdev-card{background:var(--wdev-paper);}
        .wdev-card:hover{border-color:var(--wdev-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .wdev-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--wdev-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .wdev-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--wdev-ink);margin:0 0 .7rem;}
        .wdev-card__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);margin:0 0 .8rem;}
        .wdev-card__highlight{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:400;line-height:1.7;color:var(--wdev-ink);border-left:2px solid var(--wdev-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .wdev-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .wdev-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;color:var(--wdev-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .wdev-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--wdev-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ PROCESS TIMELINE ════════════════════════════════════════════ */
        .wdev-process{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-process__inner{max-width:900px;margin:0 auto;}
        .wdev-process__head{margin-bottom:3rem;}
        .wdev-process__steps{display:flex;flex-direction:column;gap:0;}
        .wdev-process__step{display:grid;grid-template-columns:56px 1fr;gap:1.5rem;padding-bottom:2.5rem;position:relative;}
        .wdev-process__step:not(:last-child)::before{content:'';position:absolute;left:27px;top:52px;bottom:-2px;width:1px;background:var(--wdev-line);}
        .wdev-process__num{width:56px;height:56px;border-radius:50%;border:1px solid var(--wdev-line);background:var(--wdev-paper);display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:1rem;font-weight:500;color:var(--wdev-blue);flex-shrink:0;}
        .wdev-process__title{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--wdev-ink);margin-bottom:.5rem;}
        .wdev-process__text{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);max-width:520px;}

        /* ══ DELIVERABLES ═══════════════════════════════════════════════ */
        .wdev-deliv{background:var(--wdev-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-deliv__inner{max-width:1200px;margin:0 auto;}
        .wdev-deliv__head{margin-bottom:3rem;}
        .wdev-deliv__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:900px){.wdev-deliv__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.wdev-deliv__grid{grid-template-columns:1fr;}}
        .wdev-deliv__card{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:16px;padding:1.75rem;}
        .wdev-deliv__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--wdev-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .wdev-deliv__title{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--wdev-ink);margin-bottom:.5rem;}
        .wdev-deliv__text{font-family:'Inter',sans-serif;font-size:.83rem;font-weight:300;line-height:1.7;color:var(--wdev-muted);}

        /* ══ BEFORE / AFTER ══════════════════════════════════════════════ */
        .wdev-ba{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-ba__inner{max-width:1000px;margin:0 auto;}
        .wdev-ba__head{margin-bottom:3rem;}
        .wdev-ba__grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
        @media(max-width:700px){.wdev-ba__grid{grid-template-columns:1fr;}}
        .wdev-ba__col{border-radius:16px;padding:2rem;border:1px solid var(--wdev-line);}
        .wdev-ba__col--before{background:var(--wdev-paper);}
        .wdev-ba__col--after{background:#fff;border-color:rgba(55,214,122,.35);}
        .wdev-ba__label{font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;margin-bottom:1.2rem;display:block;}
        .wdev-ba__col--before .wdev-ba__label{color:var(--wdev-muted);}
        .wdev-ba__col--after .wdev-ba__label{color:var(--wdev-green);}
        .wdev-ba__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.85rem;}
        .wdev-ba__list li{font-family:'Inter',sans-serif;font-size:.87rem;line-height:1.6;color:var(--wdev-ink);display:flex;gap:.6rem;align-items:flex-start;}
        .wdev-ba__col--before .wdev-ba__list li::before{content:'✕';color:var(--wdev-muted);flex-shrink:0;}
        .wdev-ba__col--after .wdev-ba__list li::before{content:'✓';color:var(--wdev-green);flex-shrink:0;}

        /* ══ INDUSTRIES ══════════════════════════════════════════════════ */
        .wdev-ind{background:var(--wdev-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-ind__inner{max-width:1100px;margin:0 auto;}
        .wdev-ind__head{margin-bottom:3rem;}
        .wdev-ind__grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;}
        @media(max-width:900px){.wdev-ind__grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:480px){.wdev-ind__grid{grid-template-columns:repeat(2,1fr);}}
        .wdev-ind__card{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:16px;padding:1.5rem 1rem;text-align:center;transition:border-color .2s ease,transform .2s ease;}
        .wdev-ind__card:hover{border-color:var(--wdev-blue);transform:translateY(-3px);}
        .wdev-ind__icon{color:var(--wdev-blue);font-size:1.2rem;margin-bottom:.8rem;}
        .wdev-ind__name{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:var(--wdev-ink);}

        /* ══ TECH STACK ══════════════════════════════════════════════════ */
        .wdev-tech{background:var(--wdev-surface);padding:5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-tech__inner{max-width:1100px;margin:0 auto;text-align:center;}
        .wdev-tech__grid{display:flex;flex-wrap:wrap;justify-content:center;gap:.8rem;margin-top:2.5rem;max-width:900px;margin-left:auto;margin-right:auto;}
        .wdev-tech__badge{display:flex;align-items:center;gap:.5rem;background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:100px;padding:.6rem 1.15rem;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:var(--wdev-ink);}
        .wdev-tech__badge svg{color:var(--wdev-blue);}

        /* ══ METRICS ═════════════════════════════════════════════════════ */
        .wdev-metrics{background:var(--wdev-paper);padding:5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-metrics__inner{max-width:1000px;margin:0 auto;}
        .wdev-metrics__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;text-align:center;}
        @media(max-width:700px){.wdev-metrics__grid{grid-template-columns:repeat(2,1fr);}}
        .wdev-stat{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:14px;padding:1.6rem 1rem;}
        .wdev-stat__num{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,3.4vw,2.4rem);font-weight:700;color:var(--wdev-ink);line-height:1;}
        .wdev-stat__label{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:400;color:var(--wdev-muted);margin-top:.6rem;}

        /* ══ FAQ ══════════════════════════════════════════════════════════ */
        .wdev-faq{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-faq__inner{max-width:760px;margin:0 auto;}
        .wdev-faq__head{margin-bottom:2.5rem;}
        /* ✅ FIX — native <details>/<summary> accordion (zero JS). The previous
           implementation relied on a <script> tag injected via
           dangerouslySetInnerHTML to attach click listeners. Inline scripts
           inserted that way only execute on a hard page load — Next.js
           client-side navigation (clicking a <Link> anywhere on the site)
           inserts the page via React, and browsers never execute a <script>
           tag added that way. Result: the accordion silently did nothing for
           any visitor who arrived via normal in-site navigation. Matches the
           same robust pattern already used on the automation-testing and
           cad-gis-photogrammetry service pages. */
        .wdev-faq__list{display:flex;flex-direction:column;gap:.75rem;}
        .wdev-faq__item{background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:14px;overflow:hidden;}
        .wdev-faq__item[open]{border-color:var(--wdev-blue);}
        .wdev-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--wdev-ink);padding:1.25rem 1.5rem;cursor:pointer;user-select:none;}
        .wdev-faq__q::-webkit-details-marker{display:none;}
        .wdev-faq__q::marker{display:none;content:'';}
        .wdev-faq__chevron{color:var(--wdev-blue);flex-shrink:0;transition:transform .2s ease;}
        .wdev-faq__item[open] .wdev-faq__chevron{transform:rotate(180deg);}
        .wdev-faq__a-wrap{padding:0 1.5rem 1.4rem;animation:wdevFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes wdevFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .wdev-faq__a{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.8;color:var(--wdev-muted);margin:0;}

        /* ══ BENEFITS ════════════════════════════════════════════════════ */
        .wdev-benefits{background:var(--wdev-paper);padding:5.5rem 1.5rem;}
        .wdev-benefits__inner{max-width:1200px;margin:0 auto;}
        .wdev-benefits__head{max-width:560px;margin-bottom:3rem;}
        .wdev-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--wdev-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .wdev-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--wdev-ink);margin:0 0 .8rem;}
        .wdev-benefits__h2 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);margin:0;}
        .wdev-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.wdev-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.wdev-benefits__grid{grid-template-columns:1fr;}}
        .wdev-benefit-card{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .wdev-benefit-card:hover{border-color:var(--wdev-blue);transform:translateY(-3px);}
        .wdev-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--wdev-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .wdev-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--wdev-ink);margin-bottom:.5rem;}
        .wdev-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);}

        /* ══ CTA STRIP ═══════════════════════════════════════════════════ */
        .wdev-cta{background:var(--wdev-surface);border-top:1px solid var(--wdev-line);padding:5.5rem 1.5rem;text-align:center;}
        .wdev-cta__inner{max-width:560px;margin:0 auto;}
        .wdev-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--wdev-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .wdev-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--wdev-ink);margin:0 0 1rem;}
        .wdev-cta__h2 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--wdev-muted);margin-bottom:2.2rem;}
        .wdev-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--wdev-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .wdev-cta__btn:hover{background:var(--wdev-blue);transform:translateY(-2px);}

        @media(prefers-reduced-motion:reduce){
          .wdev-page *,.wdev-page *::before,.wdev-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-webdev-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wdevGraph) }}
      />

      <div className="wdev-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="wdev-hero" aria-labelledby="wdev-hero-heading">
          <div aria-hidden="true">
            <div className="wdev-hero__grain" />
          </div>
          <div className="wdev-corner wdev-corner--tl" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--tr" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--bl" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--br" aria-hidden="true" />

          <nav className="wdev-sr-only" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{ listStyle:"none",margin:0,padding:0 }}>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/services" itemProp="item"><span itemProp="name">Services</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/services/website-development" itemProp="item" aria-current="page">
                  <span itemProp="name">Web Development</span>
                </a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="wdev-hero__inner">
            <div className="wdev-hero__content">
              <div className="wdev-hero__eyebrow">
                <span className="wdev-hero__dot" />
                Services · Web Development
              </div>
              <h1 className="wdev-hero__h1" id="wdev-hero-heading">
                Web builds measured in <em>speed</em>,<br />uptime, and conversions
              </h1>
              <div className="wdev-hero__rule" aria-hidden="true" />
              <p className="wdev-hero__sub">
                Custom web applications, UX-first design, e-commerce, SEO, and
                security — built to hold up under real traffic, not just in a
                demo environment.
              </p>

              <div className="wdev-hero__actions">
                <ConsultationCTA className="wdev-hero__cta" ariaLabel="Get a free web development quote from 99 Visual Solutions">
                  Get a Free Quote
                </ConsultationCTA>
                <a href="#services" className="wdev-hero__cta wdev-hero__cta--ghost" aria-label="Explore web development services by 99 Visual Solutions">
                  Explore Services
                </a>
              </div>
            </div>
          </div>

          <div className="wdev-hero__ticker-bar" aria-hidden="true">
            <div className="wdev-ticker">
              <div className="wdev-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="wdev-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="wdev-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CLIENT PAIN — unchanged copy ══════════════════════════════════ */}
        <section className="wdev-pain" aria-labelledby="wdev-pain-heading">
          <div className="wdev-pain__inner">
            <div className="wdev-pain__head">
              <span className="wdev-label">Sound Familiar?</span>
              <h2 className="wdev-h2" id="wdev-pain-heading">
                Most sites don't fail because of one big mistake —<br />
                they fail from <em>a dozen small ones</em>
              </h2>
            </div>
            <div className="wdev-pain__grid">
              {painPoints.map((p) => (
                <div className="wdev-pain__card" key={p.title}>
                  <div className="wdev-pain__icon" aria-hidden="true">{p.icon}</div>
                  <div className="wdev-pain__title">{p.title}</div>
                  <p className="wdev-pain__text">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="wdev-pain__cta-row">
              <ConsultationCTA className="wdev-pain__cta">
                Talk to us about your site
              </ConsultationCTA>
            </div>
          </div>
        </section>

        {/* ══ INTRO — unchanged copy ═══════════════════════════════════════ */}
        <section className="wdev-intro" aria-labelledby="wdev-intro-heading">
          <div className="wdev-intro__inner">
            <span className="wdev-label">Our Philosophy</span>
            <h2 className="wdev-h2" id="wdev-intro-heading">
              Crafting digital experiences that<br />inspire, connect &amp; <em>convert</em>
            </h2>
            <p className="wdev-intro__p">
              At <strong>99 Visual Solutions</strong>, we treat design and engineering as one discipline,
              not two handoffs — because a site that looks great but loads slowly or breaks on mobile isn't
              actually doing its job. As a <strong>web design and development company</strong>, we build
              with that in mind from the first wireframe, not just at launch.
            </p>
            <p className="wdev-intro__p">
              Your website is usually the first real interaction a customer has with your business, which is
              why we build <strong>modern, responsive, and SEO-optimised sites</strong>{" "}
              around your actual goals — whether you're a startup validating an idea, an established
              business scaling up, or an e-commerce brand trying to grow order volume.
            </p>
          </div>
        </section>

        {/* ══ SOLUTION OVERVIEW — quick-jump index ══════════════════════════ */}
        <section className="wdev-overview" aria-labelledby="wdev-overview-heading">
          <div className="wdev-overview__inner">
            <div className="wdev-overview__head">
              <span className="wdev-label">Our Solution</span>
              <h2 className="wdev-h2" id="wdev-overview-heading">Everything under <em>one roof</em></h2>
              <p className="wdev-sub">Jump to the service you need, or scroll through the full detail below.</p>
            </div>
            <div className="wdev-overview__grid">
              {services.map((svc) => (
                <a className="wdev-overview__card" href={`#${svc.id}`} key={svc.id}>
                  <span className="wdev-overview__icon" aria-hidden="true">{svc.icon}</span>
                  <span className="wdev-overview__title">{svc.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICE CLUSTERS — 100% unchanged copy, grouped & iconified ═══ */}
        <div id="services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="wdev-cluster" aria-labelledby={`wdev-cluster-h-${cluster.id}`}>
              <div className="wdev-cluster__inner">
                <div className="wdev-cluster__head">
                  <span className="wdev-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="wdev-cluster__h2" id={`wdev-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="wdev-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`wdev-cluster__grid wdev-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="wdev-card" id={svc.id} key={svc.id} aria-labelledby={`wdev-svc-heading-${svc.id}`}>
                        <div className="wdev-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="wdev-card__title" id={`wdev-svc-heading-${svc.id}`}>{svc.title}</h3>
                        <p className="wdev-card__desc">{svc.description}</p>
                        <p className="wdev-card__highlight">{svc.highlight}</p>
                        <ul className="wdev-card__bullets">
                          {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ══ PROCESS — unchanged copy ═══════════════════════════════════════ */}
        <section className="wdev-process" aria-labelledby="wdev-process-heading">
          <div className="wdev-process__inner">
            <div className="wdev-process__head">
              <span className="wdev-label">How We Work</span>
              <h2 className="wdev-h2" id="wdev-process-heading">A process built to <em>remove risk</em></h2>
              <p className="wdev-sub">Five stages, each with a clear checkpoint, so you always know what's next.</p>
            </div>
            <div className="wdev-process__steps">
              {processSteps.map((s) => (
                <div className="wdev-process__step" key={s.step}>
                  <div className="wdev-process__num" aria-hidden="true">{s.step}</div>
                  <div>
                    <div className="wdev-process__title">{s.title}</div>
                    <p className="wdev-process__text">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DELIVERABLES — unchanged copy ═══════════════════════════════ */}
        <section className="wdev-deliv" aria-labelledby="wdev-deliv-heading">
          <div className="wdev-deliv__inner">
            <div className="wdev-deliv__head">
              <span className="wdev-label">What You Get</span>
              <h2 className="wdev-h2" id="wdev-deliv-heading">Exactly what's <em>in the box</em></h2>
              <p className="wdev-sub">No vague scopes — here's what leaves with you at the end of the project.</p>
            </div>
            <div className="wdev-deliv__grid">
              {deliverables.map((d) => (
                <div className="wdev-deliv__card" key={d.title}>
                  <div className="wdev-deliv__icon" aria-hidden="true">{d.icon}</div>
                  <div className="wdev-deliv__title">{d.title}</div>
                  <p className="wdev-deliv__text">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BEFORE / AFTER — unchanged copy ═══════════════════════════════ */}
        <section className="wdev-ba" aria-labelledby="wdev-ba-heading">
          <div className="wdev-ba__inner">
            <div className="wdev-ba__head">
              <span className="wdev-label">The Difference</span>
              <h2 className="wdev-h2" id="wdev-ba-heading">Before <em>99 Visual</em> — and after</h2>
            </div>
            <div className="wdev-ba__grid">
              <div className="wdev-ba__col wdev-ba__col--before">
                <span className="wdev-ba__label">Before</span>
                <ul className="wdev-ba__list">
                  <li>Site looks dated and loads slowly on mobile</li>
                  <li>Every update needs a developer and a week's wait</li>
                  <li>No clear path from visitor to inquiry</li>
                  <li>SEO an afterthought, rankings stuck</li>
                  <li>Security treated as someone else's problem</li>
                </ul>
              </div>
              <div className="wdev-ba__col wdev-ba__col--after">
                <span className="wdev-ba__label">After</span>
                <ul className="wdev-ba__list">
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

        {/* ══ INDUSTRIES — unchanged copy ═══════════════════════════════════ */}
        <section className="wdev-ind" aria-labelledby="wdev-ind-heading">
          <div className="wdev-ind__inner">
            <div className="wdev-ind__head">
              <span className="wdev-label">Who We Work With</span>
              <h2 className="wdev-h2" id="wdev-ind-heading">Industries we <em>serve</em></h2>
            </div>
            <div className="wdev-ind__grid">
              {industries.map((ind) => (
                <div className="wdev-ind__card" key={ind.name}>
                  <div className="wdev-ind__icon" aria-hidden="true">{ind.icon}</div>
                  <div className="wdev-ind__name">{ind.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TECH STACK — unchanged copy ════════════════════════════════ */}
        <section className="wdev-tech" aria-labelledby="wdev-tech-heading">
          <div className="wdev-tech__inner">
            <span className="wdev-label">Under the Hood</span>
            <h2 className="wdev-h2" id="wdev-tech-heading">Technologies we <em>build with</em></h2>
            <p className="wdev-sub">From front-end frameworks to databases, CMS platforms, and cloud infrastructure — the current, production-proven tools behind every build.</p>
            <div className="wdev-tech__grid">
              {techStack.map((t) => (
                <span className="wdev-tech__badge" key={t.name}>{t.icon} {t.name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ METRICS ═══════════════════════════════════════════════════ */}
        <section className="wdev-metrics" aria-labelledby="wdev-metrics-heading">
          <div className="wdev-metrics__inner">
            <h2 className="wdev-sr-only" id="wdev-metrics-heading">Our track record</h2>
            <div className="wdev-metrics__grid">
              {/* TODO(SS): replace placeholder figures with real, verifiable numbers before publishing. */}
              {[
                { value: 50, suffix: "+", label: "Projects delivered" },
                { value: 98, suffix: "%", label: "On-time delivery rate" },
                { value: 12, suffix: "+", label: "Industries served" },
                { value: 6,  suffix: "",  label: "Countries served" },
              ].map((s) => (
                <div className="wdev-stat" data-target={s.value} data-suffix={s.suffix} key={s.label}>
                  <div className="wdev-stat__num">{s.value}{s.suffix}</div>
                  <div className="wdev-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ — same copy as wdevFaqNode. Native <details>/<summary>
            accordion: no JS needed, so it works on every navigation type
            (see the ✅ FIX note in the <style> block above for why the old
            button+script version silently broke). FAQPage structured data
            is handled separately via JSON-LD (wdevFaqNode) — no microdata
            attributes needed here. */}
        <section className="wdev-faq" aria-labelledby="wdev-faq-heading">
          <div className="wdev-faq__inner">
            <div className="wdev-faq__head">
              <span className="wdev-label">Common Questions</span>
              <h2 className="wdev-h2" id="wdev-faq-heading">Frequently asked <em>questions</em></h2>
            </div>
            <div className="wdev-faq__list">
              {faqItems.map((item, i) => (
                <details className="wdev-faq__item" key={item.question} open={i === 0}>
                  <summary className="wdev-faq__q">
                    <span>{item.question}</span>
                    <svg className="wdev-faq__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="wdev-faq__a-wrap">
                    <p className="wdev-faq__a">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS — unchanged copy ═════════════════════════════════════ */}
        <section className="wdev-benefits" aria-labelledby="wdev-benefits-heading">
          <div className="wdev-benefits__inner">
            <div className="wdev-benefits__head">
              <span className="wdev-benefits__label">Why Choose Us?</span>
              <h2 className="wdev-benefits__h2" id="wdev-benefits-heading">
                Benefits of working with <em>99 Visual</em>
              </h2>
              <p className="wdev-benefits__sub">
                A website is only worth what it does for your business afterward. Here's what that
                looks like in practice when you work with us.
              </p>
            </div>
            <div className="wdev-benefits__grid">
              {benefits.map((b, i) => (
                <div className="wdev-benefit-card" key={i}>
                  <div className="wdev-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                  <div className="wdev-benefit-card__title">{b.title}</div>
                  <p className="wdev-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA STRIP — unchanged copy ════════════════════════════════════ */}
        <section className="wdev-cta" aria-labelledby="wdev-cta-heading">
          <div className="wdev-cta__inner">
            <span className="wdev-cta__eyebrow">Start a Project</span>
            <h2 className="wdev-cta__h2" id="wdev-cta-heading">
              Ready to build something <em>remarkable</em>?
            </h2>
            <p className="wdev-cta__sub">
              Tell us about your project and we'll map out the right approach for your goals,
              timeline, and budget — no cost for that first conversation.
            </p>
            <ConsultationCTA className="wdev-cta__btn" ariaLabel="Get a free web development consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="wdev-sticky-cta">
          <ConsultationCTA className="wdev-sticky-cta__btn">Get a Free Quote</ConsultationCTA>
        </div>
      </div>

      {/*
        Single vanilla-JS block powering every interactive piece on this
        page (FAQ accordion, animated stat counters). UNCHANGED from the
        previous revision — same selectors, same behaviour.
      */}
      <script
        id="wdev-interactions"
        dangerouslySetInnerHTML={{
          __html: `
          (function () {
            // FAQ accordion is now native <details>/<summary> (see the
            // ✅ FIX note near .wdev-faq__item in the <style> block) and
            // needs no JS at all, so that logic has been removed from here.

            // Animated stat counters — count up once, on first scroll into view
            var stats = document.querySelectorAll(".wdev-stat[data-target]");
            if ("IntersectionObserver" in window && stats.length) {
              var observer = new IntersectionObserver(
                function (entries) {
                  entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
                    var suffix = el.getAttribute("data-suffix") || "";
                    var numEl = el.querySelector(".wdev-stat__num");
                    var start = performance.now();
                    var duration = 1400;
                    function tick(now) {
                      var progress = Math.min((now - start) / duration, 1);
                      var eased = 1 - Math.pow(1 - progress, 3);
                      if (numEl) numEl.textContent = Math.round(eased * target) + suffix;
                      if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                    observer.unobserve(el);
                  });
                },
                { threshold: 0.4 }
              );
              stats.forEach(function (el) { observer.observe(el); });
            }
          })();
          `,
        }}
      />

      <Footer />
      <ScrollDown />

    </>
  );
}