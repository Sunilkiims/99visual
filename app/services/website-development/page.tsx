// app/services/it-consulting/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// IT Consulting — 99 Visual Solutions
//
<<<<<<< HEAD
// PRODUCTION-READY INDEXING FIXES (unchanged from prior revision):
//   ✅ FIX 1 — PAGE_CANONICAL: single absolute URL constant reused across
//      metadata.alternates.canonical, OG url, and ALL JSON-LD nodes.
//   ✅ FIX 2 — metadataBase added (BASE_SAFE).
//   ✅ FIX 3 — robots: unchanged.
//   ✅ FIX 4 — DATE_MODIFIED: hardcoded instead of new Date().
//   ✅ FIX 5 — schema nodes: unchanged, still built inline.
//   ✅ FIX 6 — buildGraph() imports: unchanged.
//
// THIS REVISION — HERO REDESIGN:
//   Swapped the full-bleed photo-banner hero for the same hero *system* now
//   used on /services/website-development: a light "analytics" surface with
//   a dark scrim band behind the fixed/transparent header, a two-column
//   layout (copy + inline SVG stat card), a feature-badge row, and a dual
//   CTA (primary + ghost). No external hero photo asset required anymore.
//
//   The SVG card is page-specific, not a copy-paste of the web-dev gauge:
//   it's an "Infrastructure Health" gauge (uptime/monitoring flavored,
//   matching this page's cybersecurity/infrastructure copy) instead of a
//   Core Web Vitals performance score. Accent color stays this page's
//   existing orange (#f97316) rather than web-dev's blue, so the hero still
//   reads as part of this page rather than a copy of another one — the
//   dark sections immediately below (intro, services, benefits, CTA) are
//   unchanged, so the hero's dark scrim + a bottom fade keep the handoff
//   smooth instead of cutting hard from light to dark.
//
//   Everything else — copy, schema, metadata, services/benefits data,
//   section order below the hero — is untouched.
=======
// THIS REVISION: Hero redesigned to match the full-bleed photo banner
//   treatment used on /services/visualization and /services (the hub
//   page) — photo as CSS background with a dark gradient overlay, grain
//   texture, and corner brackets, single left-aligned text column.
//   Replaces the previous two-column hero (text + inline SVG "Performance
//   Score" gauge card). The gauge component has been removed since it's
//   no longer rendered anywhere on the page.
//   Save your banner image to:
//   /public/images/services/website-development-hero-banner.jpg
//
//   Nothing else on the page has changed: all copy (services, benefits,
//   pain points, process, deliverables, industries, tech stack, FAQ),
//   schema, metadata, the ticker band, sticky mobile CTA, and the
//   interaction script (FAQ accordion + animated counters) are identical
//   to the previous revision.
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";


import type { Metadata } from "next";
import {
<<<<<<< HEAD
  FaCogs, FaShieldAlt, FaProjectDiagram,
  FaNetworkWired, FaHandsHelping, FaCloud,
  FaServer, FaClock,
=======
  FaCogs, FaRocket, FaMobileAlt,
  FaClock, FaUsers, FaTools,
  FaExclamationCircle, FaHourglassHalf, FaChartLine, FaLock,
  FaSearchengin, FaLayerGroup, FaFileCode, FaLifeRing, FaClipboardCheck,
  FaHospital, FaShoppingBag, FaGraduationCap, FaHome, FaUtensils, FaPlane,
  FaReact, FaNodeJs, FaAws, FaMicrosoft,
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
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
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX 1 & 2 — BASE_SAFE + PAGE_CANONICAL.
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE      = BASE.replace(/\/$/, "");
const PAGE_CANONICAL = `${BASE_SAFE}/services/it-consulting`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "IT Consulting Services | Cloud, Cybersecurity & IoT — 99 Visual",

  description:
    "99 Visual Solutions provides end-to-end IT consulting: infrastructure planning, cloud migration (AWS, Azure, GCP), cybersecurity, IoT integration, software consulting, and IT project management worldwide.",

  metadataBase: new URL(BASE_SAFE),

  alternates: {
    canonical: PAGE_CANONICAL,
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT",
    description: "From cloud migration and cybersecurity to IT infrastructure, software consulting, IoT integration, and project management — 99 Visual Solutions delivers strategic IT consulting worldwide.",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "IT Consulting Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "IT Consulting | Cloud, Cybersecurity & IoT — 99 Visual Solutions",
    description: "Cloud migration, cybersecurity, IT infrastructure, IoT integration & software consulting — strategic IT solutions by 99 Visual Solutions for businesses worldwide.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
        alt: "IT Consulting Services by 99 Visual Solutions",
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
const DATE_MODIFIED  = "2025-06-01"; // ← Update this when content changes

// ─────────────────────────────────────────────────────────────────────────────
<<<<<<< HEAD
// SCHEMA NODES — unchanged
=======
// SCHEMA — unchanged
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
// ─────────────────────────────────────────────────────────────────────────────
const itcBreadcrumbNode = {
  "@type": "BreadcrumbList",
  "@id":   `${PAGE_CANONICAL}#breadcrumb`,
  "itemListElement": [
    {
      "@type":    "ListItem",
      "position": 1,
      "name":     "Home",
      "item": { "@type": "Thing", "@id": `${BASE_SAFE}/` },
    },
    {
      "@type":    "ListItem",
      "position": 2,
      "name":     "Services",
      "item": { "@type": "Thing", "@id": `${BASE_SAFE}/services` },
    },
    {
      "@type":    "ListItem",
      "position": 3,
      "name":     "IT Consulting",
      "item": { "@type": "Thing", "@id": PAGE_CANONICAL },
    },
  ],
};

const itcServiceNode = {
  "@type":       "Service",
  "@id":         `${PAGE_CANONICAL}#service`,
  "name":        "IT Consulting Services",
  "description": "End-to-end IT consulting including infrastructure planning, cloud migration, cybersecurity, IoT integration, software consulting, and IT project management.",
  "url":         PAGE_CANONICAL,
  "image":       `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
  "serviceType": "IT Consulting",
  "provider":    { "@id": `${BASE_SAFE}/#organization` },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Australia" },
  ],
  "offers": {
    "@type":        "Offer",
    "availability": "https://schema.org/InStock",
    "url":          `${BASE_SAFE}/contact`,
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name":  "IT Consulting Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Installation & System Migration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Infrastructure Planning & Optimization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cybersecurity & Risk Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Migration & Digital Transformation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Project Management & Support" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software & Application Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IoT & Smart Device Integration" } },
    ],
  },
};

<<<<<<< HEAD
const itcFaqNode = {
  "@type": "FAQPage",
  "@id":   `${PAGE_CANONICAL}#faq`,
  "mainEntity": [
=======
// The four Q&A pairs below are the SAME copy used in the visible FAQ
// accordion further down the page (`faqItems`). Keep both in sync manually
// if you ever edit an answer — there is intentionally one source of truth
// in prose, duplicated into these two spots because schema and render need
// separate objects.
const wdevFaqNode = {
  ...faqSchema([
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
    {
      "@type": "Question",
      "name":  "What IT consulting services does 99 Visual Solutions provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          `We offer IT infrastructure planning and optimisation, cloud migration and digital transformation (AWS, Azure, GCP), cybersecurity and risk management, software and application consulting, IoT and smart device integration, IT project management, and installation and system migration services. Contact us at ${CONTACT_EMAIL} for a free IT consulting consultation tailored to your organisation's needs.`,
      },
    },
    {
      "@type": "Question",
      "name":  "Which cloud platforms do you support for migration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "We support migrations to and on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), including hybrid and multi-cloud strategies. Our cloud migration team handles everything from initial assessment and architecture planning to data migration, application refactoring, and post-migration support and optimisation to ensure a smooth, disruption-free transition.",
      },
    },
    {
      "@type": "Question",
      "name":  "Do you provide ongoing IT support after the project is complete?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Yes. Our consultants provide continuous guidance, monitoring, and support to ensure your IT ecosystem evolves alongside your business needs. Post-project support includes system health monitoring, performance optimisation, security patching, and strategic technology reviews to keep your infrastructure aligned with your long-term business objectives.",
      },
    },
    {
      "@type": "Question",
      "name":  "Can you help us with cybersecurity compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          `Absolutely. We provide risk assessments, vulnerability management, and compliance support aligned with industry standards including ISO 27001, SOC 2, and GDPR. Our cybersecurity practice includes threat monitoring, incident response planning, penetration testing, and remediation roadmaps. Email us at ${CONTACT_EMAIL} to discuss your specific compliance requirements.`,
      },
    },
  ],
  "mainEntityOfPage": { "@id": `${PAGE_CANONICAL}#webpage` },
};

const itcPageNode = {
  "@type":         "WebPage",
  "@id":           `${PAGE_CANONICAL}#webpage`,
  "url":           PAGE_CANONICAL,
  "name":          "IT Consulting Services | Cloud, Cybersecurity & IoT — 99 Visual Solutions",
  "description":   "End-to-end IT consulting: infrastructure planning, cloud migration, cybersecurity, IoT integration, software consulting, and IT project management by 99 Visual Solutions.",
  "inLanguage":    "en",
  "datePublished": DATE_PUBLISHED,
  "dateModified":  DATE_MODIFIED,
  "isPartOf":      { "@id": `${BASE_SAFE}/#website` },
  "about":         { "@id": `${BASE_SAFE}/#organization` },
  "publisher":     { "@id": `${BASE_SAFE}/#organization` },
  "primaryImageOfPage": {
    "@type":   "ImageObject",
    "url":     `${BASE_SAFE}/images/services/it-consulting-og.jpg`,
    "width":   1200,
    "height":  630,
    "caption": "IT Consulting Services by 99 Visual Solutions",
  },
  "speakable": {
    "@type":       "SpeakableSpecification",
    "cssSelector": [".itc-hero__h1", ".itc-hero__sub"],
  },
  "breadcrumb":      { "@id": `${PAGE_CANONICAL}#breadcrumb` },
  "potentialAction": {
    "@type":  "ReadAction",
    "target": [PAGE_CANONICAL],
  },
};

const itcGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  itcPageNode,
  itcBreadcrumbNode,
  itcServiceNode,
  itcFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaCogs />,           title: "Tailored IT Strategies",       description: "We align IT strategies with your business goals, ensuring technology drives growth, efficiency, and innovation across every department and process." },
  { icon: <FaShieldAlt />,      title: "Robust Cybersecurity",         description: "Protect your business from threats with proactive monitoring, security audits, penetration testing, and compliance-driven solutions tailored to your industry." },
  { icon: <FaNetworkWired />,   title: "Infrastructure Modernisation", description: "Upgrade outdated systems with scalable, future-ready IT infrastructure designed for seamless performance, high availability, and cost efficiency." },
  { icon: <FaCloud />,          title: "Cloud Enablement",             description: "We help you migrate to the cloud securely and efficiently on AWS, Azure, or GCP — optimising costs, improving scalability, and enabling digital transformation." },
  { icon: <FaProjectDiagram />, title: "Expert IT Project Management", description: "From planning to execution, we ensure IT projects are delivered on time, within scope, and aligned with ROI goals through structured agile delivery." },
  { icon: <FaHandsHelping />,   title: "Ongoing IT Support",           description: "Our consultants provide continuous guidance and post-project support, ensuring your IT ecosystem evolves with your changing business needs over time." },
];

const services = [
  {
<<<<<<< HEAD
    id: "installation-migration",
    title: "Installation & System Migration Services",
    image: "/images/Installation-services.png",
    imageAlt: "Installation & System Migration Services illustration",
    description: "Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure.",
    highlight: "From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity, data integrity, and system performance throughout the transition.",
    bullets: ["Installation of servers, routers, systems & peripherals", "Data migration & system upgrades with minimal downtime", "Seamless integration with existing infrastructure and workflows"],
    imageLeft: true,
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure Planning & Optimisation",
    image: "/images/it-infrastructure.png",
    imageAlt: "IT Infrastructure Planning & Optimisation illustration",
    description: "A strong digital foundation is critical for business growth and operational efficiency. We design and optimise IT infrastructures that are reliable, scalable, and aligned with your business goals, from network architecture to cloud environments.",
    highlight: "From network architecture to hybrid cloud environments, we ensure your systems are built for performance, security, and future expansion — enabling your business to scale with confidence.",
    bullets: ["Infrastructure design, assessment & capacity planning", "Cloud strategy, migration & resource optimisation", "Cost optimisation, system upgrades & performance tuning"],
    imageLeft: false,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Risk Management",
    image: "/images/cybersecurity.png",
    imageAlt: "Cybersecurity & Risk Management illustration",
    description: "In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and operational continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems.",
    highlight: "By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets industry compliance standards and protects against modern threats.",
    bullets: ["Risk assessment, vulnerability management & compliance support", "Threat monitoring, incident response & security audits", "Endpoint, network & application security implementation"],
    imageLeft: true,
  },
  {
    id: "cloud-transformation",
    title: "Cloud Migration & Digital Transformation",
    image: "/images/cloud-migration.png",
    imageAlt: "Cloud Migration & Digital Transformation illustration",
    description: "Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and operational performance.",
    highlight: "Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape while reducing infrastructure costs.",
    bullets: ["Cloud strategy, migration & modernisation (AWS, Azure, GCP)", "Legacy system transformation & process automation", "Scalable, secure & cost-efficient cloud architecture design"],
    imageLeft: false,
  },
  {
    id: "project-management",
    title: "IT Project Management & Support",
    image: "/images/it-project.png",
    imageAlt: "IT Project Management & Support illustration",
    description: "Successful digital initiatives require more than just great ideas — they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management to ensure your projects are delivered on time, within budget, and aligned with your business goals.",
    highlight: "From planning and resource allocation to deployment and post-launch support, we manage every phase with precision — using agile methodologies, transparent reporting, and dedicated project ownership.",
    bullets: ["Agile project planning, execution & delivery management", "Resource management, risk mitigation & quality assurance", "Ongoing technical support, maintenance & performance monitoring"],
    imageLeft: true,
  },
  {
    id: "software-consulting",
    title: "Software & Application Consulting",
    image: "/images/software-application.png",
    imageAlt: "Software & Application Consulting illustration",
    description: "Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities — providing strategic guidance on the right technologies and development approaches.",
    highlight: "Whether you're building from scratch, upgrading existing systems, or optimising performance, our consulting ensures your applications are efficient, secure, future-ready, and aligned with your business strategy.",
    bullets: ["Technology selection & solution architecture planning", "Application audit, optimisation & modernisation strategy", "Scalable, secure & performance-driven development guidance"],
    imageLeft: false,
  },
  {
    id: "iot",
    title: "IoT & Smart Device Integration",
    image: "/images/iot-smart-devices.png",
    imageAlt: "IoT & Smart Device Integration illustration",
    description: "Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven operational environments for businesses of all sizes.",
    highlight: "From sensors and automation systems to advanced analytics dashboards, our solutions help you monitor, control, and optimise operations in real time — reducing costs and improving decision-making across your organisation.",
    bullets: ["IoT device connectivity & architecture design", "Smart automation & sensor integration", "Real-time data monitoring, analytics & reporting dashboards"],
    imageLeft: true,
=======
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
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
  },
];

// Groups the 13 services above into four labeled clusters for the bento
// grid. Purely a presentation grouping; referenced ids/copy above are
// untouched.
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

// The FAQ copy rendered on-page. This is an exact copy of the four Q&A
// pairs passed into `faqSchema()` above — keep them identical.
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
// HERO STAT CARD — page-specific inline SVG, in the spirit of the web-dev
// page's PerformanceGauge but built around this page's own subject matter:
// infrastructure health / uptime, not Core Web Vitals. Pure SVG, no external
// image asset, draws in on load, respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────
function InfrastructureGauge() {
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const arcFraction = 270 / 360;
  const arcLength = circumference * arcFraction;
  const scoreFraction = 0.999; // 99.9% uptime

  return (
    <div className="itc-gaugecard" role="img" aria-label="Illustrative infrastructure uptime score of 99.9 percent">
      <div className="itc-gaugecard__top">
        <span className="itc-gaugecard__badge">Infrastructure Monitor</span>
      </div>
      <svg className="itc-gaugecard__svg" viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(110,100) rotate(135)">
          <circle
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="14"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            className="itc-gaugecard__arc"
            r={r}
            fill="none"
            stroke="#f97316"
            strokeWidth="14"
            strokeDasharray={`${arcLength * scoreFraction} ${circumference}`}
            strokeLinecap="round"
          />
        </g>
        <text x="110" y="96" textAnchor="middle" className="itc-gaugecard__num">99.9%</text>
        <text x="110" y="122" textAnchor="middle" className="itc-gaugecard__lbl">Uptime</text>
      </svg>
      <div className="itc-gaugecard__vitals">
        <span><b>Threats blocked</b> 24/7 <i>✓</i></span>
        <span><b>Patch cycle</b> Weekly <i>✓</i></span>
        <span><b>Monitoring</b> Real-time <i>✓</i></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ITConsulting() {
  return (
    <>
      <style>{`
<<<<<<< HEAD
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .itc-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        /* ══ HERO — website-development-style system: dark scrim band
           behind the fixed/transparent header, two-column layout (copy +
           inline SVG stat card), feature-badge row, dual CTA. Kept on this
           page's own dark base + orange accent (rather than web-dev's light
           theme + blue) so it still reads as part of THIS page and hands
           off cleanly into the dark sections immediately below it. ══ */
        .itc-hero{
          position:relative;padding:9.5rem 1.5rem 6rem;overflow:hidden;
          background:
            linear-gradient(180deg, #050505 0px, #050505 64px, rgba(5,5,5,.9) 110px, rgba(5,5,5,.55) 220px, #080808 100%),
            radial-gradient(1100px 480px at 88% -10%, rgba(249,115,22,.10), transparent 60%),
            #080808;
        }
        @supports (padding-top: env(safe-area-inset-top)) {
          .itc-hero { padding-top: calc(9.5rem + env(safe-area-inset-top)); }
        }
        @media(max-width:960px){
          .itc-hero{padding:8rem 1.25rem 4.5rem;
            background:
              linear-gradient(180deg, #050505 0px, #050505 56px, rgba(5,5,5,.9) 92px, rgba(5,5,5,.55) 190px, #080808 100%),
              radial-gradient(1100px 480px at 88% -10%, rgba(249,115,22,.10), transparent 60%),
              #080808;}
        }
        @media(max-width:640px){ .itc-hero{padding:7.5rem 1rem 4rem;} }

        .itc-hero__grain{position:absolute;inset:0;opacity:.02;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}

        .itc-hero__inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:3.5rem;align-items:center;}
        @media(max-width:960px){.itc-hero__inner{grid-template-columns:1fr;gap:2.5rem;}}

        .itc-hero__content{animation:itcFadeUp .8s cubic-bezier(.22,1,.36,1) both;}
        @keyframes itcFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.itc-hero__content{text-align:center;}}

        .itc-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:#f97316;border:1px solid rgba(249,115,22,.26);background:rgba(249,115,22,.07);padding:6px 14px;border-radius:100px;margin-bottom:1.6rem;}
        .itc-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:itcPulse 2s ease-in-out infinite;}
        @keyframes itcPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}

        .itc-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.3rem);font-weight:700;line-height:1.14;letter-spacing:-.015em;color:#fff;margin:0 0 1.1rem;}
        .itc-hero__h1 em{font-style:normal;color:#f97316;}

        .itc-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.94rem,1.2vw,1.02rem);font-weight:300;line-height:1.75;color:rgba(255,255,255,0.62);max-width:520px;margin:0 0 2rem;}
        @media(max-width:960px){.itc-hero__sub{margin:0 auto 2rem;}}

        .itc-hero__actions{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:2rem;}
        @media(max-width:960px){.itc-hero__actions{justify-content:center;}}
        .itc-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;letter-spacing:.02em;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:13px 28px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.32);transition:transform .2s ease,box-shadow .2s ease;}
        .itc-hero__cta:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 14px 40px rgba(249,115,22,.46);}
        .itc-hero__cta--ghost{color:#fff;background:transparent;border:1px solid rgba(255,255,255,.16);box-shadow:none;}
        .itc-hero__cta--ghost:hover{border-color:#f97316;color:#f97316;transform:translateY(-2px) scale(1.02);box-shadow:none;}

        .itc-hero__badges{display:flex;flex-wrap:wrap;gap:1.5rem;}
        @media(max-width:960px){.itc-hero__badges{justify-content:center;}}
        .itc-hero__badge{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:rgba(255,255,255,.5);}
        .itc-hero__badge svg{color:#f97316;flex-shrink:0;}

        /* Stat card — mirrors web-dev's gauge-card structure/proportions,
           re-skinned in dark glass to match this page's palette. */
        .itc-gaugecard{background:rgba(20,20,20,.72);border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:1.75rem 1.75rem 1.5rem;backdrop-filter:blur(14px);box-shadow:0 24px 60px -20px rgba(0,0,0,.5);animation:itcFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;}
        .itc-gaugecard__top{display:flex;justify-content:center;margin-bottom:.5rem;}
        .itc-gaugecard__badge{font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:5px 12px;border-radius:8px;}
        .itc-gaugecard__svg{width:100%;height:auto;display:block;}
        .itc-gaugecard__arc{stroke-dasharray:0 999;animation:itcArcDraw 1.4s ease-out .3s forwards;}
        @keyframes itcArcDraw{from{stroke-dasharray:0 999;}to{stroke-dasharray:216 999;}}
        .itc-gaugecard__num{font-family:'Space Grotesk',sans-serif;font-size:2.15rem;font-weight:700;fill:#fff;}
        .itc-gaugecard__lbl{font-family:'IBM Plex Mono',monospace;font-size:.78rem;fill:rgba(255,255,255,.5);}
        .itc-gaugecard__vitals{display:flex;justify-content:space-between;gap:.5rem;padding-top:.5rem;border-top:1px solid rgba(255,255,255,.09);flex-wrap:wrap;}
        .itc-gaugecard__vitals span{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:rgba(255,255,255,.5);}
        .itc-gaugecard__vitals b{color:#fff;font-weight:500;}
        .itc-gaugecard__vitals i{font-style:normal;color:#f97316;}

        .itc-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .itc-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .itc-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .itc-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .itc-intro__h2 em{font-style:italic;color:#f97316;}
        .itc-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .itc-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .itc-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}

        .itc-services{background:#080808;}
        .itc-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .itc-svc:nth-child(odd){background:#0f0f0f;}
        .itc-svc:nth-child(even){background:#080808;}
        .itc-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .itc-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){.itc-svc__inner--img-left,.itc-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}.itc-svc__img-wrap{order:2!important;}.itc-svc__body{order:1!important;}}
        .itc-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .itc-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .itc-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .itc-svc__img-wrap:hover img{transform:scale(1.03);}
        .itc-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .itc-svc__body{position:relative;}
        .itc-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .itc-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .itc-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .itc-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .itc-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .itc-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .itc-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .itc-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}

        .itc-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .itc-benefits__inner{max-width:1200px;margin:0 auto;}
        .itc-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .itc-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .itc-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .itc-benefits__h2 em{font-style:italic;color:#f97316;}
        .itc-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .itc-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .itc-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.itc-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.itc-benefits__grid{grid-template-columns:1fr;}}
        .itc-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .itc-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .itc-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .itc-benefit-card:hover::before{opacity:1;}
        .itc-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .itc-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .itc-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}

        .itc-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .itc-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .itc-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .itc-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .itc-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .itc-cta__h2 em{font-style:italic;color:#f97316;}
        .itc-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .itc-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .itc-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .itc-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        @media(prefers-reduced-motion:reduce){
          *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
          .itc-gaugecard__arc{stroke-dasharray:216 999!important;}
        }
=======
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

        /* ══ HERO — full-bleed photo banner, same treatment as the
           visualization and services hub pages: photo as CSS background
           with a dark gradient overlay so the text column stays legible.
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
        /* Fixed (not min-) height, so the section can never grow taller
           than one screen and push the ticker bar below the fold — that
           was the bug. dvh/svh account for mobile browser chrome so the
           banner never shows a gap or clips; falls back to 100vh. */
        @supports (height: 100svh) { .wdev-hero { height: 100svh; } }
        @supports (height: 100dvh) { .wdev-hero { height: 100dvh; } }
        @media(max-width:960px){
          .wdev-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/website-development-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        /* Main hero content: fills the remaining space above the ticker
           and centers vertically within it. Header clearance and the
           left/right gutters live here now (not on the fixed-height
           section) so the ticker's own height is never squeezed out. */
        .wdev-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:8rem 1.5rem 1.5rem;
          padding-top:max(8rem, calc(env(safe-area-inset-top) + 6rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .wdev-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .wdev-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .wdev-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        /* Short screens (landscape phones, small laptop windows with
           browser chrome): trim vertical rhythm and drop the badge row
           so everything still fits above the ticker without scrolling. */
        @media(max-height:520px){
          .wdev-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .wdev-hero__eyebrow{ margin-bottom:.7rem; }
          .wdev-hero__h1{ margin-bottom:.6rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .wdev-hero__sub{ margin-bottom:.9rem; }
          .wdev-hero__actions{ margin-bottom:0; }
          .wdev-hero__badges{ display:none; }
        }

        .wdev-hero__grain{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .wdev-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .wdev-corner--tl{top:24px;left:24px;border-top:1px solid var(--wdev-blue);border-left:1px solid var(--wdev-blue);}
        .wdev-corner--tr{top:24px;right:24px;border-top:1px solid var(--wdev-blue);border-right:1px solid var(--wdev-blue);}
        .wdev-corner--bl{bottom:24px;left:24px;border-bottom:1px solid var(--wdev-blue);border-left:1px solid var(--wdev-blue);}
        .wdev-corner--br{bottom:24px;right:24px;border-bottom:1px solid var(--wdev-blue);border-right:1px solid var(--wdev-blue);}

        .wdev-hero__content{animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;max-width:640px;}
        @keyframes wdevFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.wdev-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .wdev-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--wdev-blue);border:1px solid rgba(46,92,255,.28);background:rgba(46,92,255,.08);padding:6px 16px;border-radius:100px;margin-bottom:1.6rem;backdrop-filter:blur(8px);}
        .wdev-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--wdev-blue);animation:wdevPulse 2s ease-in-out infinite;}
        @keyframes wdevPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .wdev-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.4rem);font-weight:700;line-height:1.12;letter-spacing:-.015em;color:#fff;margin:0 0 1.1rem;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .wdev-hero__h1 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.98rem,1.3vw,1.08rem);font-weight:300;line-height:1.7;color:rgba(255,255,255,0.78);max-width:520px;margin:0 0 2rem;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.wdev-hero__sub{margin:0 auto 2rem;}}

        .wdev-hero__actions{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:2rem;}
        @media(max-width:960px){.wdev-hero__actions{justify-content:center;}}
        .wdev-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--wdev-blue));padding:13px 28px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .wdev-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .wdev-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);}
        .wdev-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .wdev-hero__badges{display:flex;flex-wrap:wrap;gap:1.5rem;}
        @media(max-width:960px){.wdev-hero__badges{justify-content:center;}}
        .wdev-hero__badge{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:rgba(255,255,255,0.65);}
        .wdev-hero__badge svg{color:var(--wdev-blue);flex-shrink:0;}

        /* ══ TICKER — a normal flex child pinned to the bottom of the
           fixed-height hero (not position:absolute), so it can never end
           up below the fold regardless of how tall the content above it
           is — it always renders inside the first screen. ═══════════════ */
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
        .wdev-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:clamp(.6rem,1.5vw,.66rem);color:rgba(255,255,255,.4);margin:0;padding:.3rem 1rem 0;}
        @media(max-height:520px){
          .wdev-hero__ticker-bar{ padding-top:.75rem; }
          .wdev-ticker__caption{ display:none; }
        }


        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .wdev-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--wdev-line);}
        @media(max-width:760px){.wdev-sticky-cta{display:flex;justify-content:center;}}
        .wdev-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--wdev-ink);padding:13px 20px;border-radius:10px;text-decoration:none;}

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
        .wdev-pain__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:var(--wdev-ink);border:1px solid var(--wdev-line);padding:12px 26px;border-radius:10px;text-decoration:none;transition:border-color .2s ease,color .2s ease;}
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

        /* ══ METRICS ═════════════════════════════════════════════════════
           Class names/structure unchanged — the counter script below
           selects .wdev-stat[data-target] and .wdev-stat__num. */
        .wdev-metrics{background:var(--wdev-paper);padding:5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-metrics__inner{max-width:1000px;margin:0 auto;}
        .wdev-metrics__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;text-align:center;}
        @media(max-width:700px){.wdev-metrics__grid{grid-template-columns:repeat(2,1fr);}}
        .wdev-stat{background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:14px;padding:1.6rem 1rem;}
        .wdev-stat__num{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,3.4vw,2.4rem);font-weight:700;color:var(--wdev-ink);line-height:1;}
        .wdev-stat__label{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:400;color:var(--wdev-muted);margin-top:.6rem;}

        /* ══ FAQ — class names/behaviour unchanged, restyled only ═══════ */
        .wdev-faq{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-faq__inner{max-width:760px;margin:0 auto;}
        .wdev-faq__head{margin-bottom:2.5rem;}
        .wdev-faq__list{display:flex;flex-direction:column;gap:.75rem;}
        .wdev-faq__item{background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:14px;overflow:hidden;}
        .wdev-faq__item.is-open{border-color:var(--wdev-blue);}
        .wdev-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:1rem;background:transparent;border:none;text-align:left;font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--wdev-ink);padding:1.25rem 1.5rem;cursor:pointer;}
        .wdev-faq__chevron{color:var(--wdev-blue);flex-shrink:0;transition:transform .2s ease;}
        .wdev-faq__item.is-open .wdev-faq__chevron{transform:rotate(180deg);}
        .wdev-faq__a-wrap{padding:0 1.5rem 1.4rem;}
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
        .wdev-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--wdev-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .wdev-cta__btn:hover{background:var(--wdev-blue);transform:translateY(-2px);}

        @media(prefers-reduced-motion:reduce){
          .wdev-page *,.wdev-page *::before,.wdev-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
      `}</style>

      <Header />

      <script
        id="schema-itc-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itcGraph) }}
      />

<<<<<<< HEAD
      {/* ══ HERO — website-development hero system, IT-consulting-skinned ══ */}
      <section className="itc-hero" aria-labelledby="itc-hero-heading">
        <div aria-hidden="true">
          <div className="itc-hero__grain" />
        </div>

        <nav className="itc-sr-only" aria-label="Breadcrumb">
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
              <a href="/services/it-consulting" itemProp="item" aria-current="page">
                <span itemProp="name">IT Consulting</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="itc-hero__inner">
          <div className="itc-hero__content">
            <div className="itc-hero__eyebrow" aria-hidden="true">
              <span className="itc-hero__dot" />
              Services · IT Consulting
            </div>
            <h1 className="itc-hero__h1" id="itc-hero-heading">
              Strategic technology<br />that drives <em>growth</em>
            </h1>
            <p className="itc-hero__sub">
              From cloud migration and cybersecurity to infrastructure planning,
              IoT integration, and IT project management — we deliver end-to-end
              consulting that prepares your business for the digital future.
            </p>

            <div className="itc-hero__actions">
              <Link href="/contact" className="itc-hero__cta" aria-label="Get a free IT consulting consultation from 99 Visual Solutions">
                Get a Free Consultation
              </Link>
              <a href="#services" className="itc-hero__cta itc-hero__cta--ghost" aria-label="Explore IT consulting services from 99 Visual Solutions">
                Explore Services
              </a>
            </div>

            <div className="itc-hero__badges" aria-hidden="true">
              <span className="itc-hero__badge"><FaShieldAlt /> Compliance-ready security</span>
              <span className="itc-hero__badge"><FaServer /> 24/7 infrastructure monitoring</span>
              <span className="itc-hero__badge"><FaClock /> No-cost first consultation</span>
            </div>
          </div>
          <InfrastructureGauge />
        </div>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
      <section className="itc-intro" aria-labelledby="itc-intro-heading">
        <div className="itc-intro__inner">
          <span className="itc-intro__label">Our Philosophy</span>
          <h2 className="itc-intro__h2" id="itc-intro-heading">
            Strategic IT consulting for smarter,<br />secure &amp; <em>scalable</em> businesses
          </h2>
          <div className="itc-intro__rule" aria-hidden="true" />
          <p className="itc-intro__p">
            At <strong>99 Visual Solutions</strong>, we don't just solve IT challenges — we help you harness
            technology as a powerful growth driver. Our <strong>IT consulting services</strong> deliver
            strategic guidance, robust security, and scalable infrastructure designed to prepare your business
            for the digital future with confidence.
          </p>
          <p className="itc-intro__p">
            Whether you're modernising legacy systems, migrating to the cloud, or strengthening cybersecurity,
            our experts partner with you to deliver{" "}
            <strong>sustainable, cost-effective, and future-ready IT solutions</strong> tailored precisely to
            your business goals and industry requirements.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS — unchanged ═════════════════════════════════ */}
      <div id="services" className="itc-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="itc-svc" aria-labelledby={`itc-svc-heading-${svc.id}`}>
            <div className={`itc-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="itc-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  width={600}
                  height={460}
                  style={{ width:"100%", height:"auto" }}
                />
              </div>
              <div className="itc-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="itc-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="itc-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="itc-svc__heading" id={`itc-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="itc-svc__rule" aria-hidden="true" />
                <p className="itc-svc__p">{svc.description}</p>
                <p className="itc-svc__highlight">{svc.highlight}</p>
                <ul className="itc-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
=======
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

          {/*
            Hero content now sits on top of a full-bleed photo banner (set
            as the section's CSS background — see .wdev-hero in <style>
            above) instead of the previous two-column layout with an inline
            SVG "Performance Score" gauge card. A dark gradient overlay
            keeps the white/blue text legible over the photo.
          */}
          <div className="wdev-hero__inner">
            <div className="wdev-hero__content">
              <div className="wdev-hero__eyebrow">
                <span className="wdev-hero__dot" />
                Services · Web Development
              </div>
              <h1 className="wdev-hero__h1" id="wdev-hero-heading">
                Web builds measured in <em>speed</em>,<br />uptime, and conversions
              </h1>
              <p className="wdev-hero__sub">
                Custom web applications, UX-first design, e-commerce, SEO, and
                security — built to hold up under real traffic, not just in a
                demo environment.
              </p>

              <div className="wdev-hero__actions">
                <Link href="/contact" className="wdev-hero__cta" aria-label="Get a free web development quote from 99 Visual Solutions">
                  Get a Free Quote
                </Link>
                <a href="#services" className="wdev-hero__cta wdev-hero__cta--ghost" aria-label="Explore web development services by 99 Visual Solutions">
                  Explore Services
                </a>
              </div>

              <div className="wdev-hero__badges" aria-hidden="true">
                <span className="wdev-hero__badge"><FaLock /> Security-first builds</span>
                <span className="wdev-hero__badge"><FaMobileAlt /> Mobile-first, always</span>
                <span className="wdev-hero__badge"><FaClock /> No-cost first consultation</span>
              </div>
            </div>
          </div>

          {/*
            Ticker now docks to the bottom edge of the hero itself (not a
            separate section below it), so the scrolling build/QA line and
            the photo banner render together as a single full-screen unit
            on every screen size. A soft gradient behind it keeps the text
            legible over the photo without a hard color break.
          */}
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
            <p className="wdev-ticker__caption">Illustrative build &amp; QA pipeline output</p>
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
              <Link href="/contact" className="wdev-pain__cta">
                Talk to us about your site
              </Link>
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
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704
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

        {/* ══ METRICS — class names unchanged, counter script untouched ═══ */}
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

        {/* ══ FAQ — same copy as wdevFaqNode, structure/script untouched ══ */}
        <section className="wdev-faq" aria-labelledby="wdev-faq-heading">
          <div className="wdev-faq__inner">
            <div className="wdev-faq__head">
              <span className="wdev-label">Common Questions</span>
              <h2 className="wdev-h2" id="wdev-faq-heading">Frequently asked <em>questions</em></h2>
            </div>
            <div className="wdev-faq__list">
              {faqItems.map((item, i) => (
                <div className={`wdev-faq__item${i === 0 ? " is-open" : ""}`} key={item.question}>
                  <button
                    type="button"
                    className="wdev-faq__q"
                    aria-expanded={i === 0}
                    aria-controls={`wdev-faq-panel-${i}`}
                    id={`wdev-faq-trigger-${i}`}
                  >
                    <span>{item.question}</span>
                    <svg className="wdev-faq__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className="wdev-faq__a-wrap"
                    role="region"
                    id={`wdev-faq-panel-${i}`}
                    aria-labelledby={`wdev-faq-trigger-${i}`}
                    hidden={i !== 0}
                  >
                    <p className="wdev-faq__a">{item.answer}</p>
                  </div>
                </div>
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
            <Link href="/contact" className="wdev-cta__btn" aria-label="Get a free web development consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="wdev-sticky-cta">
          <Link href="/contact" className="wdev-sticky-cta__btn">Get a Free Quote</Link>
        </div>
      </div>

<<<<<<< HEAD
      {/* ══ BENEFITS — unchanged ═════════════════════════════════════════ */}
      <section className="itc-benefits" aria-labelledby="itc-benefits-heading">
        <div className="itc-benefits__inner">
          <div className="itc-benefits__head">
            <span className="itc-benefits__label">Why Choose Us?</span>
            <h2 className="itc-benefits__h2" id="itc-benefits-heading">
              Partnering with<br /><em>99 Visual</em> IT Consulting
            </h2>
            <div className="itc-benefits__rule" aria-hidden="true" />
            <p className="itc-benefits__sub">
              IT isn't just a support function — it becomes a competitive advantage. Here's how
              we empower businesses with strategic technology.
            </p>
          </div>
          <div className="itc-benefits__grid">
            {benefits.map((b, i) => (
              <div className="itc-benefit-card" key={i}>
                <div className="itc-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <div className="itc-benefit-card__title">{b.title}</div>
                <p className="itc-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP — unchanged ════════════════════════════════════════ */}
      <section className="itc-cta" aria-labelledby="itc-cta-heading">
        <div className="itc-cta__orb" aria-hidden="true" />
        <div className="itc-cta__inner">
          <span className="itc-cta__eyebrow">Start a Project</span>
          <h2 className="itc-cta__h2" id="itc-cta-heading">
            Ready to transform your <em>IT infrastructure</em>?
          </h2>
          <div className="itc-cta__rule" aria-hidden="true" />
          <p className="itc-cta__sub">
            Get in touch with our team for a free consultation. We&apos;ll help you
            map out the right IT strategy to achieve your goals and future-proof your business.
          </p>
          <Link href="/contact" className="itc-cta__btn" aria-label="Get a free IT consulting consultation from 99 Visual Solutions">
            Get a Free Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
=======
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
            // FAQ accordion — one panel open at a time
            document.querySelectorAll(".wdev-faq__item").forEach(function (item) {
              var btn = item.querySelector(".wdev-faq__q");
              var panel = item.querySelector(".wdev-faq__a-wrap");
              if (!btn || !panel) return;
              btn.addEventListener("click", function () {
                var wasOpen = item.classList.contains("is-open");
                document.querySelectorAll(".wdev-faq__item").forEach(function (i) {
                  i.classList.remove("is-open");
                  var p = i.querySelector(".wdev-faq__a-wrap");
                  var b = i.querySelector(".wdev-faq__q");
                  if (p) p.hidden = true;
                  if (b) b.setAttribute("aria-expanded", "false");
                });
                if (!wasOpen) {
                  item.classList.add("is-open");
                  panel.hidden = false;
                  btn.setAttribute("aria-expanded", "true");
                }
              });
            });

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
>>>>>>> 29685a8b3bee362cb8edc925f2336e4b37bda704

      <Footer />
      <ScrollDown />
     
    </>
  );
}
