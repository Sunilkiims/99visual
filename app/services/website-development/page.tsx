// app/services/website-development/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Website Development — 99 Visual Solutions
//
// Full page upgrade (Nov 2026): every section rewritten in plain language,
// with animated infographics from app/components/infographics:
//   LaunchTimeline  (idea → launch)          — Philosophy
//   SiteTypeMatrix  (website vs store vs app) — Which build do you need?
//   FrontBackSplit  (frontend vs backend)     — Engineering cluster
//   RequestFlow     (shopping workflow)       — E-commerce & CMS cluster
//   SeoImpactMap    (performance → SEO)       — SEO & Performance cluster
//   SecurityLayers  (layered protection)      — Security & Infrastructure
//   ProcessCycle    (7-stage lifecycle)       — Process
//   TechStackMap    (stack by layer)          — Technologies
// All are Server Components; one client InViewObserver drives the entrance
// animations. Case studies come from lib/case-studies.ts and only show what
// those records document: no invented results, figures or testimonials.
//
// Hero layout, URLs, ConsultationCTA popups, analytics and schema wiring
// are unchanged.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import { caseStudies } from '@/lib/case-studies';
import Link from "next/link";
import Image from "next/image";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import {
  InViewObserver,
  PerformanceTargets,
  RequestFlow,
  AnimatedMedia,
  WebsitePlaybooks,
  ProcessCycle,
  SiteTypeMatrix,
  FrontBackSplit,
  TechStackMap,
  SeoImpactMap,
  SecurityLayers,
  LaunchTimeline,
  type CycleStep,
  type FlowHop,
  type StackLayer,
  type LaunchStop,
} from "@/app/components/infographics";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  FaCogs, FaRocket, FaMobileAlt, FaUsers,
  FaExclamationCircle, FaHourglassHalf, FaChartLine, FaLock,
  FaSearchengin, FaLayerGroup, FaFileCode, FaLifeRing, FaClipboardCheck,
  FaShoppingBag, FaReact, FaNodeJs, FaAws, FaPlug,
  FaSearch, FaSitemap, FaPencilRuler, FaCode, FaVial, FaCloudUploadAlt, FaWrench,
  FaBoxOpen, FaShoppingCart, FaEdit, FaCreditCard, FaTruck, FaTachometerAlt,
  FaArrowRight,
} from "react-icons/fa";
import {
  SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiVercel,
  SiTypescript, SiTailwindcss, SiExpress, SiMysql, SiRedis,
  SiSanity, SiStrapi, SiWordpress, SiDocker, SiGithub,
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
const PAGE_PATH = "/services/website-development";
const PAGE_URL  = `${BASE_SAFE}${PAGE_PATH}`;
const OG_IMAGE  = `${BASE_SAFE}/images/og/web-development-og.jpg`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

const META_DESCRIPTION =
  "Website development company in Bengaluru, India. We design and build business websites, online stores and web apps in React and Next.js. Get a free quote.";

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "Website Development Company in India",
  description: META_DESCRIPTION,
  metadataBase: new URL(BASE_SAFE),
  alternates: { canonical: PAGE_PATH },
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
    description: "Business websites, online stores and web applications designed and built in React and Next.js by one team in Bengaluru, with hosting, SEO set-up and support included.",
    url:         PAGE_URL,
    siteName:    "99 Visual Solutions",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, type: "image/jpeg", alt: "Website and web app development by 99 Visual Solutions" }],
    locale: "en_US",
    type:   "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Website Development Company in India | 99 Visual Solutions",
    description: "Business websites, online stores and web apps built in React and Next.js by a design and engineering team in Bengaluru, India.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [{ url: OG_IMAGE, alt: "Website and web app development by 99 Visual Solutions" }],
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
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED[PAGE_PATH]; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────

type Service = { id: string; title: string; description: string; highlight: string; bullets: string[]; icon: ReactNode };

const services: Service[] = [
  {
    id: "web-application",
    title: "Web Application Development",
    description: "When a spreadsheet, a shared inbox and a lot of copying and pasting are holding a process together, a web application can take over. We build portals, booking systems and internal tools that your staff or customers log in to and use every day.",
    highlight: "We talk to the people who will use the tool, map how the work moves today and design around that. If the new system is slower than the old workaround, nobody will use it.",
    bullets: ["Customer portals, booking systems and internal tools", "Logins, roles and permissions", "Room to add users and features later"],
    icon: <FaLayerGroup />,
  },
  {
    id: "dashboard",
    title: "Custom Dashboard & Admin Panel Development",
    description: "Orders, enquiries, stock and users are often tracked in several places, and someone spends hours reconciling them. An admin panel brings that data onto one screen, with the actions your team takes most often a click away.",
    highlight: "Role-based access means a sales rep, a warehouse lead and an owner each see what they need. The screen stays simple and the data stays safer.",
    bullets: ["Role-based access and user management", "Reports, charts and CSV exports", "Admin screens for orders, content and users"],
    icon: <FaClipboardCheck />,
  },
  {
    id: "ux-design",
    title: "User Experience (UX) Design",
    description: "Visitors rarely tell you a site is confusing. They just leave. Our UX work looks for the small things behind that: navigation that hides key pages, buttons with vague labels, forms that ask for too much.",
    highlight: "We agree the page structure in wireframes before any visual design, so decisions are made on how a page works rather than on colours and fonts.",
    bullets: ["User flows and information architecture", "Wireframes and clickable prototypes", "Design systems in Figma for consistent pages"],
    icon: <FaUsers />,
  },
  {
    id: "landing-page",
    title: "Landing Page Design & Development",
    description: "A landing page has one job, such as a demo request or a signup. Everything on it should serve that job: a clear headline, the few details people need to decide, and one obvious next step.",
    highlight: "Campaign traffic is often paid for, so speed matters here more than anywhere. We keep these pages light so your budget isn't spent on visitors who leave while the page loads.",
    bullets: ["One goal and one call to action per page", "Fast, mobile-first layouts", "Ready for A/B tests and campaign tracking"],
    icon: <FaRocket />,
  },
  {
    id: "frontend",
    title: "Front-End Development",
    description: "The front end is everything a visitor sees and touches. We build it in React and Next.js with TypeScript, so pages render quickly, layouts stay steady while they load, and the interface behaves the same on phones, tablets and desktops.",
    highlight: "We build from reusable components. That keeps the design consistent and makes the next change cheaper, because nobody has to untangle one-off code first.",
    bullets: ["Responsive, mobile-first layouts", "React, Next.js, TypeScript and Tailwind CSS", "Accessibility and Core Web Vitals checked during the build"],
    icon: <FaReact />,
  },
  {
    id: "backend",
    title: "Back-End Development",
    description: "Behind every form, login and order there is server code and a database doing the work. We build APIs and data models that keep records accurate, apply your business rules and stay quick as traffic grows.",
    highlight: "We size the back end to the job. A small booking tool doesn't need a complex microservice set-up, and we won't build one just because it sounds impressive.",
    bullets: ["REST and GraphQL APIs in Node.js", "Database design in PostgreSQL or MongoDB", "Authentication, permissions and input validation"],
    icon: <FaNodeJs />,
  },
  {
    id: "api",
    title: "API & Third-Party Integrations",
    description: "Your site usually needs to talk to other systems: a payment gateway, a CRM, email marketing, shipping or accounting software. We connect them so data moves on its own instead of being exported and typed in again.",
    highlight: "When there's no ready-made plugin, we write the integration against the service's API, with error handling and logging so a failed sync doesn't go unnoticed.",
    bullets: ["Payment, CRM, email and shipping integrations", "Custom REST and GraphQL connections", "Webhooks, retries and error logging"],
    icon: <SiGraphql />,
  },
  {
    id: "modernization",
    title: "Web App Modernisation",
    description: "Older sites and apps tend to get slower, harder to update and riskier to touch. We review what you have, decide with you what is worth keeping, and move the rest to a current stack in planned stages.",
    highlight: "A full rebuild isn't always the answer. Sometimes upgrading the front end and keeping a stable back end gets most of the benefit for much less effort.",
    bullets: ["Code and architecture review", "Staged migration that keeps URLs and redirects", "Moves to modern frameworks and cloud hosting"],
    icon: <FaChartLine />,
  },
  {
    id: "ecommerce",
    title: "E-Commerce & CMS Development",
    description: "Each extra step between the product page and payment is a chance for a buyer to give up. We build stores where browsing, the cart and checkout are quick on a phone, and where totals, discounts and shipping are worked out correctly before the customer pays.",
    highlight: "The ShilpiKala store in our recent projects is one example: categories, search, customer accounts, a cart with live totals, checkout and guest order tracking.",
    bullets: ["Catalogue, product pages, cart and checkout", "Payment gateway and order management", "Customer accounts, wishlists and order tracking"],
    icon: <FaShoppingBag />,
  },
  {
    id: "website-customization",
    title: "Website Customisation",
    description: "Most businesses want their own team to change prices, pages and banners without calling a developer. We set up a CMS (Sanity, Strapi or WordPress, depending on the project) and shape it around the content you publish.",
    highlight: "Editors get fields that match their content, like a product, a project or a team member, instead of one large text box that is easy to break.",
    bullets: ["Headless CMS or WordPress set-up", "Content models and editor roles", "Custom features that themes and plugins can't handle"],
    icon: <FaCogs />,
  },
  {
    id: "seo",
    title: "SEO & Performance Optimisation",
    description: "Search engines have to crawl, render and understand a page before it can appear in results. We build for that: clean HTML structure, metadata, structured data, sitemaps, readable URLs and fast pages that meet Core Web Vitals targets.",
    highlight: "We can't promise rankings, and nobody honestly can. What we make sure of is that nothing in the build holds your pages back, and we show you how to track progress in Search Console and analytics.",
    bullets: ["Technical SEO set up before launch", "Page speed and Core Web Vitals work", "Structured data, sitemaps and redirects"],
    icon: <FaSearchengin />,
  },
  {
    id: "security",
    title: "Web Security Services",
    description: "A leaked password or an outdated plugin can do more damage than any design flaw. We handle the basics properly from the start: HTTPS everywhere, secure logins, validated input, secrets kept on the server and dependencies kept up to date.",
    highlight: "If your site takes payments or stores personal data, we explain what that means for how the data is stored and who can reach it, and build accordingly.",
    bullets: ["SSL, security headers and firewall rules", "Secure authentication and access control", "Dependency updates and vulnerability checks"],
    icon: <FaLock />,
  },
  {
    id: "hosting",
    title: "Website Hosting & Deployment",
    description: "Hosting usually gets attention only when something breaks. We set up hosting, backups and automated deployments so releases are routine and a bad update can be rolled back quickly.",
    highlight: "Staging and production are kept separate, so you can review changes on a preview link before your customers see them.",
    bullets: ["Cloud hosting on AWS, Vercel or similar", "CI/CD pipelines with preview builds", "Backups, uptime alerts and rollbacks"],
    icon: <FaAws />,
  },
];

const serviceMedia: Record<string, { src: string; alt: string }> = {
  "web-application":      { src: "/images/services/website-development/web-application-development.webp", alt: "Web application architecture: a business dashboard connected to login, API, database and workflow components" },
  "ux-design":            { src: "/images/services/website-development/ux-ui-design.webp", alt: "A dashed wireframe turning into a finished interface, with the design system colours and type below" },
  "website-customization":{ src: "/images/services/website-development/website-customisation.webp", alt: "Reusable interface components and brand tokens assembled into a tailored website layout" },
  "frontend":             { src: "/images/services/website-development/frontend-development.webp", alt: "React component tree rendering a responsive page in the browser, with React, Next.js, TypeScript and Tailwind" },
  "backend":              { src: "/images/services/website-development/backend-development.webp", alt: "Back-end architecture: client requests passing through an API gateway to auth, orders and search services, a database and a cache" },
  "ecommerce":            { src: "/images/services/website-development/ecommerce-cms.webp", alt: "Online storefront with a product grid and cart beside a CMS publishing panel, above the catalogue-to-payment flow" },
  "modernization":        { src: "/images/services/website-development/web-app-modernisation.webp", alt: "Legacy server application being migrated in stages to cloud-native containers" },
  "seo":                  { src: "/images/services/website-development/seo-performance.webp", alt: "Highlighted search result beside Core Web Vitals scores for LCP, INP and CLS, with an analytics chart" },
  "security":             { src: "/images/services/website-development/web-security.webp", alt: "Web security layers around a protected site: SSL/TLS, login and MFA, firewall, encryption, monitoring and vulnerability scanning" },
  "hosting":              { src: "/images/services/website-development/hosting-deployment.webp", alt: "Deployment pipeline from commit to build, test and deploy, feeding cloud servers with monitoring and backups" },
  "api":                  { src: "/images/services/website-development/api-integrations.webp", alt: "A website connected to payments, CRM, analytics, email, maps and external APIs" },
  "landing-page":         { src: "/images/services/website-development/landing-page-development.webp", alt: "Landing page with one highlighted call to action, a fast-load marker and a visit-to-lead funnel" },
  "dashboard":            { src: "/images/services/website-development/dashboard-admin-panel.webp", alt: "Admin dashboard with KPI cards and charts beside a users-and-roles permissions panel and a report export button" },
};

// ── Shopping workflow (E-commerce & CMS cluster) ──
const shopFlow: FlowHop[] = [
  { title: "Browse",       note: "Categories, search and curated shelves", icon: <FaSearch />,       tone: "orange" },
  { title: "Product page", note: "Price, stock, photos and reviews",       icon: <FaBoxOpen />,      tone: "blue" },
  { title: "Cart",         note: "Totals, discounts and shipping update live", icon: <FaShoppingCart />, tone: "blue" },
  { title: "Checkout",     note: "Contact and delivery details",           icon: <FaEdit />,         tone: "blue" },
  { title: "Payment",      note: "Handed to the payment gateway",          icon: <FaCreditCard />,   tone: "green" },
  { title: "Track order",  note: "Account history or guest lookup",        icon: <FaTruck />,        tone: "green" },
];

type Cluster = {
  id: string; eyebrow: string; heading: ReactNode; intro: string;
  cols: 1 | 2 | 4; ids: string[]; visual?: ReactNode; after?: ReactNode;
};

const clusters: Cluster[] = [
  {
    id: "product-ux",
    eyebrow: "Product & UX",
    heading: <>Plan the right product <em>before</em> building it</>,
    intro: "Web applications, dashboards, UX design and landing pages, planned around the people who will use them.",
    cols: 4,
    ids: ["web-application", "dashboard", "ux-design", "landing-page"],
  },
  {
    id: "engineering",
    eyebrow: "Frontend & Backend Engineering",
    heading: <>The front end, the back end and <em>what connects them</em></>,
    intro: "The interface people see, the server code and data behind it, and the links to the other tools your business runs on.",
    cols: 4,
    ids: ["frontend", "backend", "api", "modernization"],
    visual: <FrontBackSplit />,
  },
  {
    id: "commerce",
    eyebrow: "E-commerce & CMS",
    heading: <>Online stores that make buying <em>straightforward</em></>,
    intro: "From the first product page to order tracking, plus a content system your team can update without help.",
    cols: 2,
    ids: ["ecommerce", "website-customization"],
    visual: (
      <RequestFlow
        id="ig-shop"
        className="wdev-cluster__visual"
        hops={shopFlow}
        badge="The shopping journey"
        legend={{ out: "Customer steps", back: "Order updates" }}
        caption="The path a buyer takes through a store we build. Each step loads quickly on a phone, and the totals they see in the cart are the totals they pay."
      />
    ),
  },
  {
    id: "seo-performance",
    eyebrow: "SEO & Performance",
    heading: <>Fast pages that search engines <em>can read</em></>,
    intro: "Speed and technical SEO are part of the build, not an add-on after launch.",
    cols: 1,
    ids: ["seo"],
    visual: <SeoImpactMap />,
    after: <PerformanceTargets />,
  },
  {
    id: "security-infrastructure",
    eyebrow: "Security & Infrastructure",
    heading: <>Secure, backed up and <em>easy to update</em></>,
    intro: "Protection for your data and your customers, and hosting that makes releases routine.",
    cols: 2,
    ids: ["security", "hosting"],
    visual: <SecurityLayers />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

const painPoints = [
  { icon: <FaExclamationCircle />, title: "Visitors arrive but don't get in touch", text: "Analytics show traffic, but the forms stay empty. Usually the page doesn't make the next step clear, or it asks for too much too soon." },
  { icon: <FaHourglassHalf />,     title: "Small changes take weeks",               text: "If updating a price or a banner needs a developer, the site falls behind the business. A proper CMS and clean code fix that." },
  { icon: <FaMobileAlt />,         title: "It works on desktop, not on a phone",    text: "Most visits now come from phones. Menus that won't open, tiny text and heavy images cost you those visitors." },
  { icon: <FaTachometerAlt />,     title: "Pages are slow to load",                 text: "Large images and piles of scripts frustrate visitors and make it harder for search engines to show your pages." },
  { icon: <FaPlug />,              title: "Your tools don't talk to each other",    text: "Orders, leads and stock sit in separate systems, so someone spends hours copying data from one to another." },
  { icon: <FaLock />,              title: "Nobody is sure how secure it is",        text: "Old plugins, shared passwords and missing backups are common, and they tend to go unnoticed until something goes wrong." },
];

const launchStops: LaunchStop[] = [
  { title: "Idea",       note: "You tell us what the site needs to do" },
  { title: "Brief",      note: "Pages, features and budget agreed in writing" },
  { title: "Wireframes", note: "Page structure approved before design" },
  { title: "Design",     note: "Visual design on your real content" },
  { title: "Build",      note: "Progress on a staging link every week" },
  { title: "Launch",     note: "Tested, checked, then live" },
];

const buildTypes = [
  { title: "Business website", text: "A company site, a service catalogue or a portfolio. Its job is to explain what you do and turn visits into enquiries, so clear content, speed and search visibility matter most." },
  { title: "Online store",     text: "Everything a business website does, plus a catalogue, cart, checkout, payments and order tracking. Accuracy matters as much as looks: prices, stock and shipping have to be right." },
  { title: "Web application",  text: "Software that customers or staff log in to and use, such as a portal, a booking system or a dashboard. The work is mostly in user roles, data and business rules." },
];

const processSteps: CycleStep[] = [
  { step: "01", title: "Discovery",     icon: <FaSearch />,         text: "We learn about your business, customers and goals, review any current site, and agree what success looks like." },
  { step: "02", title: "Planning",      icon: <FaSitemap />,        text: "Sitemap, features, content and technology are written down with a timeline and estimate for you to sign off." },
  { step: "03", title: "UI/UX Design",  icon: <FaPencilRuler />,    text: "Wireframes first, then visual design on real content, with a clickable prototype for the key pages." },
  { step: "04", title: "Development",   icon: <FaCode />,           text: "We build in short cycles and share a staging link, so you can see progress every week." },
  { step: "05", title: "Testing",       icon: <FaVial />,           text: "Checks on phones, tablets, desktops and major browsers, plus forms, speed, accessibility and SEO basics." },
  { step: "06", title: "Deployment",    icon: <FaCloudUploadAlt />, text: "Launch with redirects, analytics and Search Console in place, and a rollback plan ready." },
  { step: "07", title: "Maintenance",   icon: <FaWrench />,         text: "Updates, backups, security patches and improvements based on how people use the site." },
];

const deliverables = [
  { icon: <FaFileCode />,       title: "Source code in your repository", text: "Clean, commented code in a Git repository you own. You are never locked in to us." },
  { icon: <FaLayerGroup />,     title: "Design files & style guide",     text: "Figma files and a style guide covering colours, type and components." },
  { icon: <FaSearchengin />,    title: "Technical SEO set-up",           text: "Metadata, structured data, sitemap, robots rules and redirects in place at launch." },
  { icon: <FaClipboardCheck />, title: "Test report",                    text: "A record of what we tested, and on which devices and browsers." },
  { icon: <FaLifeRing />,       title: "Handover guide",                 text: "Plain-language notes on editing content, deploying changes and where everything lives." },
  { icon: <FaWrench />,         title: "30 days of post-launch support", text: "Fixes for anything real-world use turns up in the first month after launch." },
];

const beforeAfter = [
  { topic: "Speed",     before: "Large images and plugins slow every page",  after: "Optimised images and lean code, checked against Core Web Vitals" },
  { topic: "Mobile",    before: "A desktop layout squeezed onto a phone",    after: "Designed for phones first and tested on real devices" },
  { topic: "Updates",   before: "Every text change needs a developer",       after: "A CMS your team can use on its own" },
  { topic: "Enquiries", before: "No clear next step on most pages",          after: "One clear call to action on every key page" },
  { topic: "Search",    before: "Missing metadata and broken links",         after: "Technical SEO in place from launch day" },
  { topic: "Security",  before: "Old plugins and no backups",                after: "Regular updates, HTTPS and automated backups" },
];

const industries = [
  { img: "/images/services/website-development/industry-healthcare.webp",       alt: "Healthcare website illustration: patient vitals and a confirmed appointment",       name: "Healthcare",          note: "Appointment booking, doctor profiles and clear contact details." },
  { img: "/images/services/website-development/industry-ecommerce.webp",        alt: "E-commerce illustration: product card, shopping bag and cart",                      name: "E-Commerce & Retail", note: "Catalogues, checkout, payments and order tracking." },
  { img: "/images/services/website-development/industry-education.webp",        alt: "Education illustration: online course video with a progress bar",                 name: "Education",           note: "Course pages, enquiry forms and student portals." },
  { img: "/images/services/website-development/industry-real-estate.webp",      alt: "Real estate illustration: property listing next to a map location pin",            name: "Real Estate",         note: "Property listings, search filters and project microsites." },
  { img: "/images/services/website-development/industry-hospitality.webp",      alt: "Hospitality illustration: restaurant booking with a star rating",                  name: "Hospitality & Food",  note: "Menus, table bookings and location pages." },
  { img: "/images/services/website-development/industry-travel-logistics.webp", alt: "Travel and logistics illustration: delivery truck on a tracked route between two points", name: "Travel & Logistics", note: "Booking requests, shipment tracking and partner dashboards." },
];

const stackLayers: StackLayer[] = [
  { name: "Frontend",         note: "What visitors see and use",       tone: "blue",   tools: [ { name: "React", icon: <FaReact /> }, { name: "Next.js", icon: <SiNextdotjs /> }, { name: "TypeScript", icon: <SiTypescript /> }, { name: "Tailwind CSS", icon: <SiTailwindcss /> } ] },
  { name: "Backend & APIs",   note: "Business logic and integrations", tone: "orange", tools: [ { name: "Node.js", icon: <FaNodeJs /> }, { name: "Express", icon: <SiExpress /> }, { name: "REST APIs", icon: <FaPlug /> }, { name: "GraphQL", icon: <SiGraphql /> } ] },
  { name: "Data",             note: "Records, content and caching",    tone: "green",  tools: [ { name: "PostgreSQL", icon: <SiPostgresql /> }, { name: "MongoDB", icon: <SiMongodb /> }, { name: "MySQL", icon: <SiMysql /> }, { name: "Redis", icon: <SiRedis /> } ] },
  { name: "Content (CMS)",    note: "Where your team edits pages",     tone: "blue",   tools: [ { name: "Sanity", icon: <SiSanity /> }, { name: "Strapi", icon: <SiStrapi /> }, { name: "WordPress", icon: <SiWordpress /> } ] },
  { name: "Cloud & delivery", note: "Hosting, deployment and code",    tone: "green",  tools: [ { name: "AWS", icon: <FaAws /> }, { name: "Vercel", icon: <SiVercel /> }, { name: "Docker", icon: <SiDocker /> }, { name: "GitHub", icon: <SiGithub /> } ] },
];

const benefits = [
  { img: "/images/services/website-development/benefit-custom-solutions.webp",  alt: "Interface components being assembled into a layout built for one specific business", title: "Built around your business", description: "We don't start from a theme. Pages and features are planned around how you sell and how your customers make decisions." },
  { img: "/images/services/website-development/benefit-seo.webp",               alt: "Search results page with one listing highlighted",                                     title: "SEO from the start",         description: "Search basics such as page structure, metadata, speed and structured data are part of the build, so you don't pay to fix them later." },
  { img: "/images/services/website-development/benefit-mobile-responsive.webp", alt: "The same page layout adapting from desktop to tablet to phone screens",               title: "Designed for phones first",  description: "We design the phone layout first and test on real devices, because that is where most of your visitors will be." },
  { img: "/images/services/website-development/benefit-performance.webp",       alt: "Page speed gauge with the needle in the fast, green zone",                             title: "Fast pages",                 description: "Images, scripts and hosting are tuned so pages load quickly, including on slower mobile connections." },
  { img: "/images/services/website-development/benefit-user-experience.webp",   alt: "Three-screen user journey with a cursor moving from first click to a completed step", title: "Easy to use",                description: "We check whether people can find what they came for in a few clicks, not just whether the page looks good in a screenshot." },
  { img: "/images/services/website-development/benefit-ongoing-support.webp",   alt: "Maintenance cycle linking security, fixes, performance checks and alerts",             title: "Support after launch",       description: "We stay on for updates, security patches and improvements, so the site keeps working as your business changes." },
];

const faqItems = [
  {
    question: "What does your website development service include?",
    answer: `Everything needed to plan, build and run a website or web application: discovery and planning, UX and UI design, front-end and back-end development, e-commerce and CMS set-up, technical SEO, security, hosting and support after launch. You can hire us for the whole project or for one part of it. If you're not sure where to start, email ${CONTACT_EMAIL}.`,
  },
  {
    question: "How long does it take to build a website?",
    answer: "It depends on the scope. A small business website is a matter of weeks, while an online store or a custom web application takes longer because there is more to design, build and test. After the discovery call we give you a written timeline with each stage and its review point, so you know what to expect before work starts.",
  },
  {
    question: "How much does website development cost in India?",
    answer: `Cost depends mainly on scope. A business website with a handful of pages is priced very differently from a web application with logins, a database and integrations. Rather than quote a generic range that won't match your project, we scope it properly: email ${CONTACT_EMAIL} with a short description of what you need and we'll come back with an itemised estimate.`,
  },
  {
    question: "What's the difference between a business website and a web application?",
    answer: "A business website, such as a company site, a service catalogue or a portfolio, mainly needs to inform visitors and turn them into enquiries, so speed, SEO and clear content matter most. A web application adds logins, dashboards or workflows that customers or staff use inside the site. Many projects start as a website and add an application layer later, and we plan the structure so that is possible without a rebuild.",
  },
  {
    question: "Do you build custom websites or use templates?",
    answer: "We build custom sites rather than reskinning a theme. We do reuse our own components and a documented design system to keep the build efficient, but the structure, layout and features are planned around how your business works.",
  },
  {
    question: "Which technologies do you use?",
    answer: "Most of our builds use React and Next.js with TypeScript and Tailwind CSS. On the server side we use Node.js with PostgreSQL or MongoDB, and a CMS such as Sanity, Strapi or WordPress when your team needs to publish content. We host on AWS, Vercel or similar cloud platforms, depending on the project's needs and budget.",
  },
  {
    question: "Can you redesign or modernise our existing website?",
    answer: `Yes. We start with a review of the current site to separate what is broken from what is simply old, then plan the migration. Where possible we keep existing URLs or add redirects so the search traffic you already have isn't lost. Email ${CONTACT_EMAIL} with some background and we'll tell you honestly what it would take.`,
  },
  {
    question: "Will my new website rank on Google?",
    answer: "No one can honestly guarantee rankings or indexing, and you should be wary of anyone who does. What we can do is make sure the build doesn't hold you back: crawlable pages, clean structure, metadata, structured data, a sitemap and fast load times. Rankings then depend on your content, competition and ongoing work, which our SEO and digital marketing team can help with.",
  },
  {
    question: "Can our team update the website without a developer?",
    answer: "Yes. We set up a CMS with fields that match your content, so your team can edit pages, products, blog posts and banners themselves. We include a short handover guide, and we're available if something needs a developer later.",
  },
  {
    question: "Do you provide support after the website is live?",
    answer: "Every project includes 30 days of post-launch support to fix anything real-world use turns up. After that, we offer ongoing maintenance covering updates, security patches, backups and improvements, so the site doesn't fall behind.",
  },
  {
    question: "Where is your team based, and do you work with clients outside India?",
    answer: "Our team is based in Bengaluru (Bangalore), Karnataka, India. We also build and support websites and web applications for clients in the US, UK, UAE and Australia, with the same team handling the work.",
  },
];

// Honest, process-only labels for the hero ticker (no invented metrics).
const pipeline = [
  { cmd: "discovery",  out: "goals and scope written down" },
  { cmd: "wireframes", out: "structure approved before design" },
  { cmd: "build",      out: "weekly previews on staging" },
  { cmd: "test",       out: "phones, tablets, desktops, browsers" },
  { cmd: "launch",     out: "redirects, analytics, Search Console" },
  { cmd: "support",    out: "updates, backups, fixes" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

const wdevBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",            url: "/" },
  { name: "Services",        url: "/services" },
  { name: "Web Development", url: PAGE_PATH },
]);

const wdevServiceNode = {
  ...serviceSchema({
    name:        "Website Development",
    description: "Website development from 99 Visual Solutions: business websites, online stores and web applications, with UX and UI design, front-end and back-end development, e-commerce and CMS set-up, technical SEO, security, hosting and API integrations. Delivered from Bengaluru, India for clients in India and abroad.",
    pathname:    PAGE_PATH,
    image:       OG_IMAGE,
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
  "@id": `${PAGE_URL}#service`,
  serviceType: "Web Development",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Web Development Services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
};

const wdevFaqNode = {
  ...faqSchema(faqItems),
  "@id":            `${PAGE_URL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_URL}#webpage` },
};

const wdevPageNode = {
  "@type":       "WebPage",
  "@id":         `${PAGE_URL}#webpage`,
  url:           PAGE_URL,
  name:          "Website Development Company in India | 99 Visual Solutions",
  description:   META_DESCRIPTION,
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       OG_IMAGE,
    width:     1200,
    height:    630,
    caption:   "Website and web app development by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".wdev-hero__h1", ".wdev-hero__sub"],
  },
  breadcrumb:      { "@id": `${PAGE_URL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_URL] },
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

// Case studies filed under this service (lib/case-studies.ts).
const webCaseStudies = caseStudies.filter((c) => c.service.href === PAGE_PATH);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function WebsiteDevelopment() {
  return (
    <>
      <style>{`
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

        /* ══ HERO — layout matched to the /services hub page hero. The visual
           is public/images/services/website-development/website-development-hero.webp,
           rendered by next/image in .wdev-hero__media (regenerate with
           scripts/visuals/website-development/generate.mjs). ── */
        .wdev-hero{
          position:relative;min-height:100vh;width:100%;
          display:flex;flex-direction:column;
          background-color:#060B17;
          overflow:hidden;
        }
        .wdev-hero__media{position:absolute;inset:0;z-index:0;}
        .wdev-hero__media img{object-fit:cover;object-position:right center;}
        .wdev-hero__media::after{
          content:'';position:absolute;inset:0;pointer-events:none;
          background:
            linear-gradient(90deg, rgba(6,11,23,.92) 0%, rgba(6,11,23,.7) 34%, rgba(6,11,23,.18) 60%, rgba(6,11,23,0) 100%),
            linear-gradient(180deg, rgba(6,11,23,.15) 0%, rgba(6,11,23,0) 40%, rgba(6,11,23,.5) 100%);
        }
        @supports (height: 100svh) { .wdev-hero { min-height:100svh; } }
        @supports (height: 100dvh) { .wdev-hero { min-height:100dvh; } }
        @media(max-width:960px){
          .wdev-hero__media img{ object-position:72% center; }
          .wdev-hero__media::after{
            background:
              linear-gradient(180deg, rgba(6,11,23,.72) 0%, rgba(6,11,23,.55) 40%, rgba(6,11,23,.9) 100%);
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
          display:flex;align-items:center;overflow-x:hidden;overflow-y:visible;
          max-width:1280px;margin:0 auto;width:100%;
          padding:7rem 1.5rem 1.5rem;
          padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .wdev-hero__inner{ padding:5.5rem 1.25rem 1.25rem; padding-top:max(5.5rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-width:640px){ .wdev-hero__inner{ padding:5rem 1rem 1rem; padding-top:max(5rem, calc(env(safe-area-inset-top) + 4rem)); } }
        @media(max-width:380px){ .wdev-hero__inner{ padding:4.5rem .85rem .85rem; padding-top:max(4.5rem, calc(env(safe-area-inset-top) + 3.5rem)); } }
        @media(max-height:520px){
          .wdev-hero__inner{ padding-top:3.25rem; padding-bottom:.75rem; }
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
        .wdev-breadcrumb{position:relative;z-index:2;padding:1.6rem 0 0;}
        .wdev-breadcrumb ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;margin:0;padding:0;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.02em;}
        .wdev-breadcrumb li{display:flex;align-items:center;gap:6px;}
        .wdev-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s ease;}
        .wdev-breadcrumb a:hover{color:#FF8A2E;}
        .wdev-breadcrumb a[aria-current="page"]{color:rgba(255,255,255,.85);pointer-events:none;}
        .wdev-breadcrumb__sep{color:rgba(255,255,255,.25);}
        @media(max-width:640px){.wdev-breadcrumb{padding-top:1.1rem;}}
        .wdev-hero__dot{width:5px;height:5px;border-radius:50%;background:#FF8A2E;animation:wdevPulse 2s ease-in-out infinite;}
        @keyframes wdevPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .wdev-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .wdev-hero__h1 em{font-style:normal;color:var(--wdev-blue);}
        .wdev-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--wdev-blue),transparent);margin:0 0 1.4rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.wdev-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--wdev-blue),transparent);}}
        .wdev-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.wdev-hero__sub{margin:0 auto 2.6rem;}}
        .wdev-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin-bottom:.5rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
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

        /* ══ LOCATION STRIP — Bengaluru / India / global delivery ═══════ */
        .wdev-location{background:var(--wdev-paper);padding:4.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-location__inner{max-width:860px;margin:0 auto;text-align:center;}
        .wdev-location__p{font-family:'Inter',sans-serif;font-size:.94rem;font-weight:300;line-height:1.85;color:var(--wdev-muted);max-width:720px;margin:0 auto .9rem;}
        .wdev-location__p strong{color:var(--wdev-ink);font-weight:500;}
        .wdev-location__p a{color:var(--wdev-blue);text-decoration:underline;text-decoration-color:rgba(46,92,255,.35);text-underline-offset:2px;}
        .wdev-location__p a:hover{text-decoration-color:var(--wdev-blue);}

        /* Service-card illustration image (real content image + alt text) */
        .wdev-card__media{position:relative;width:100%;aspect-ratio:16/10;border-radius:12px;overflow:hidden;margin-bottom:1.1rem;background:#0A1224;}
        .wdev-card__media img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}

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

        /* ══ FAQ ══════════════════════════════════════════════════════════ */
        .wdev-faq{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-faq__inner{max-width:760px;margin:0 auto;}
        .wdev-faq__head{margin-bottom:2.5rem;}
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
        .wdev-benefit-card__img{display:block;width:100%;height:auto;aspect-ratio:16/9;border-radius:12px;margin-bottom:1.2rem;}
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

        /* ══ UPGRADE (Nov 2026) — new and reworked sections ═════════════ */
        .wdev-pain__grid{grid-template-columns:repeat(3,1fr);}
        @media(max-width:960px){.wdev-pain__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.wdev-pain__grid{grid-template-columns:1fr;}}
        .wdev-intro__launch{margin-top:2.75rem;}
        .wdev-intro__wide{max-width:1100px;margin:0 auto;}
        .wdev-pain__title,.wdev-deliv__title,.wdev-benefit-card__title{margin-top:0;}

        /* Which build do you need? (website vs store vs app) */
        .wdev-compare{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-compare__inner{max-width:1100px;margin:0 auto;}
        .wdev-compare__head{max-width:720px;margin:0 auto 2.75rem;}
        .wdev-compare__types{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:2.25rem;}
        @media(max-width:860px){.wdev-compare__types{grid-template-columns:1fr;}}
        .wdev-compare__type{border-top:2px solid var(--wdev-line);padding-top:1.1rem;}
        .wdev-compare__type:nth-child(1){border-top-color:var(--wdev-blue);}
        .wdev-compare__type:nth-child(2){border-top-color:#1FB862;}
        .wdev-compare__type:nth-child(3){border-top-color:#E8710F;}
        .wdev-compare__type h3{font-family:'Space Grotesk',sans-serif;font-size:1.02rem;font-weight:600;color:var(--wdev-ink);margin:0 0 .5rem;}
        .wdev-compare__type p{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);margin:0;}
        .wdev-compare__note{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);max-width:720px;margin:2rem auto 0;text-align:center;}
        .wdev-compare__note a{color:var(--wdev-blue);text-decoration:underline;text-decoration-color:rgba(46,92,255,.35);text-underline-offset:2px;}
        .wdev-compare__playbooks{margin-top:2.5rem;}

        /* Cluster extras: visual slot, 2-up grid, single wide card */
        .wdev-cluster__visual{margin:0 0 2.5rem;}
        .wdev-cluster__after{margin-top:2.5rem;}
        .wdev-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        @media(max-width:760px){.wdev-cluster__grid--2{grid-template-columns:1fr;}}
        .wdev-cluster__grid--1{grid-template-columns:1fr;}
        @media(min-width:861px){
          .wdev-card--wide{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);column-gap:2.25rem;align-items:start;}
          .wdev-card--wide .wdev-card__media{grid-row:1 / span 5;margin-bottom:0;}
        }
        @media(min-width:961px) and (max-width:1180px){
          .wdev-cluster__grid--4{grid-template-columns:repeat(2,1fr);}
        }
        .wdev-card{display:flex;flex-direction:column;}
        .wdev-card--wide{display:block;}
        @media(min-width:861px){.wdev-card--wide{display:grid;}}
        .wdev-card__icon{flex:0 0 auto;}

        /* Process (lifecycle) */
        .wdev-process{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-process__inner{max-width:1120px;margin:0 auto;}
        .wdev-process__head{margin-bottom:3rem;}

        /* Media wrappers (AnimatedMedia owns radius + spacing) */
        .wdev-ind__media{border-radius:12px;margin-bottom:.9rem;}
        .wdev-benefit-card__media{border-radius:12px;margin-bottom:1.2rem;}
        .wdev-benefit-card__media .wdev-benefit-card__img{margin-bottom:0;}

        /* Before / after — paired rows */
        .wdev-ba{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-ba__inner{max-width:1000px;margin:0 auto;}
        .wdev-ba__head{margin-bottom:2.75rem;}
        .wdev-ba__cols{display:grid;grid-template-columns:120px minmax(0,1fr) 36px minmax(0,1fr);gap:0 1rem;padding:0 1.25rem .7rem;font-family:'IBM Plex Mono',monospace;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;}
        .wdev-ba__cols span:nth-child(2){color:var(--wdev-muted);}
        .wdev-ba__cols span:nth-child(4){color:#1A9E53;}
        .wdev-ba__rows{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.7rem;}
        .wdev-ba__row{display:grid;grid-template-columns:120px minmax(0,1fr) 36px minmax(0,1fr);gap:1rem;align-items:center;background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:14px;padding:1rem 1.25rem;}
        .wdev-ba__topic{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--wdev-ink);}
        .wdev-ba__before,.wdev-ba__after{font-family:'Inter',sans-serif;font-size:.86rem;line-height:1.55;display:flex;gap:.55rem;align-items:baseline;}
        .wdev-ba__before{color:var(--wdev-muted);}
        .wdev-ba__before::before{content:'✕';color:#B4BACB;flex-shrink:0;}
        .wdev-ba__after{color:var(--wdev-ink);}
        .wdev-ba__after::before{content:'✓';color:#1A9E53;font-weight:700;flex-shrink:0;}
        .wdev-ba__arrow{color:var(--wdev-blue);display:flex;justify-content:center;font-size:.85rem;}
        .wdev-ba__label{display:none;}
        @media(max-width:720px){
          .wdev-ba__cols{display:none;}
          .wdev-ba__row{grid-template-columns:1fr;gap:.45rem;padding:1rem 1.1rem;}
          .wdev-ba__arrow{display:none;}
          .wdev-ba__label{display:inline;font-family:'IBM Plex Mono',monospace;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;margin-right:.35rem;}
        }

        /* Industries */
        .wdev-ind{background:var(--wdev-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-ind__inner{max-width:1100px;margin:0 auto;}
        .wdev-ind__head{margin-bottom:3rem;}
        .wdev-ind__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:860px){.wdev-ind__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.wdev-ind__grid{grid-template-columns:1fr;}}
        .wdev-ind__card{display:grid;grid-template-columns:120px minmax(0,1fr);gap:1rem;align-items:center;background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:16px;padding:.8rem;transition:border-color .2s ease,transform .2s ease;}
        .wdev-ind__card:hover{border-color:var(--wdev-blue);transform:translateY(-3px);}
        .wdev-ind__card .wdev-ind__media{margin:0;}
        .wdev-ind__img{display:block;width:100%;height:auto;aspect-ratio:4/3;border-radius:12px;}
        .wdev-ind__name{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--wdev-ink);margin:0 0 .3rem;}
        .wdev-ind__note{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:300;line-height:1.6;color:var(--wdev-muted);margin:0;}

        /* Technologies */
        .wdev-tech{background:var(--wdev-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-tech__inner{max-width:1000px;margin:0 auto;}
        .wdev-sub a{color:var(--wdev-blue);text-decoration:underline;text-decoration-color:rgba(46,92,255,.35);text-underline-offset:2px;}

        /* Recent projects — case studies */
        .wdev-work{background:var(--wdev-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--wdev-line);}
        .wdev-work__inner{max-width:1180px;margin:0 auto;}
        .wdev-work__head{margin-bottom:3rem;}
        .wdev-work__list{display:flex;flex-direction:column;gap:2rem;}
        .wdev-case{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);gap:2.5rem;align-items:start;background:var(--wdev-surface);border:1px solid var(--wdev-line);border-radius:22px;padding:2rem;}
        .wdev-case:nth-child(even) .wdev-case__media{order:2;}
        @media(max-width:920px){.wdev-case{grid-template-columns:1fr;gap:1.75rem;padding:1.4rem;}.wdev-case:nth-child(even) .wdev-case__media{order:0;}}
        .wdev-case__media{display:flex;flex-direction:column;gap:.9rem;min-width:0;}
        @media(min-width:921px){.wdev-case__media{position:sticky;top:6.5rem;}}
        .wdev-browser{border:1px solid var(--wdev-line);border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 24px 50px -30px rgba(18,20,26,.35);}
        .wdev-browser__bar{display:flex;align-items:center;gap:.4rem;padding:.55rem .8rem;background:#EEF0F5;border-bottom:1px solid var(--wdev-line);}
        .wdev-browser__bar i{width:9px;height:9px;border-radius:50%;background:#D3D7E2;display:block;}
        .wdev-browser__bar i:nth-child(1){background:#FF6B5F;}
        .wdev-browser__bar i:nth-child(2){background:#FFBD2E;}
        .wdev-browser__bar i:nth-child(3){background:#28C840;}
        .wdev-browser__url{margin-left:.6rem;flex:1;min-width:0;font-family:'IBM Plex Mono',monospace;font-size:.68rem;color:var(--wdev-muted);background:#fff;border-radius:6px;padding:.2rem .6rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .wdev-browser__shot{display:block;width:100%;height:auto;}
        .wdev-case__caption{font-family:'Inter',sans-serif;font-size:.76rem;color:var(--wdev-muted);margin:0;}
        .wdev-case__thumbs{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem;}
        .wdev-case__thumbs li{margin:0;}
        .wdev-case__thumbs img{display:block;width:100%;height:auto;border-radius:9px;border:1px solid var(--wdev-line);}
        .wdev-case__thumbs figcaption{font-family:'Inter',sans-serif;font-size:.68rem;line-height:1.45;color:var(--wdev-muted);margin-top:.35rem;}
        .wdev-case__body{display:flex;flex-direction:column;gap:1.05rem;min-width:0;}
        .wdev-case__kind{font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--wdev-blue);}
        .wdev-case__title{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.15rem,2vw,1.4rem);font-weight:700;line-height:1.3;color:var(--wdev-ink);margin:0;}
        .wdev-case__title a{color:inherit;text-decoration:none;}
        .wdev-case__title a:hover{color:var(--wdev-blue);}
        .wdev-case__desc{font-family:'Inter',sans-serif;font-size:.9rem;font-weight:300;line-height:1.75;color:var(--wdev-muted);margin:0;}
        .wdev-case__h{font-family:'IBM Plex Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--wdev-ink);margin:0 0 .5rem;}
        .wdev-case__brief{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.7;color:var(--wdev-muted);margin:0;}
        .wdev-case__journey{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;}
        .wdev-case__journey li{display:flex;align-items:center;gap:.4rem;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:500;color:var(--wdev-ink);}
        .wdev-case__journey li span{background:rgba(46,92,255,.07);border:1px solid rgba(46,92,255,.2);border-radius:100px;padding:.28rem .75rem;}
        .wdev-case__journey li:not(:last-child)::after{content:'→';color:var(--wdev-blue);}
        .wdev-case__built{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem;}
        @media(max-width:520px){.wdev-case__built{grid-template-columns:1fr;}}
        .wdev-case__built li{background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:12px;padding:.7rem .85rem;}
        .wdev-case__built b{display:block;font-family:'Space Grotesk',sans-serif;font-size:.84rem;font-weight:600;color:var(--wdev-ink);margin-bottom:.15rem;}
        .wdev-case__built span{font-family:'Inter',sans-serif;font-size:.76rem;font-weight:300;line-height:1.5;color:var(--wdev-muted);}
        .wdev-case__stack{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.45rem;}
        .wdev-case__stack li{font-family:'Inter',sans-serif;font-size:.74rem;font-weight:500;color:var(--wdev-ink);background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:100px;padding:.32rem .8rem;}
        .wdev-case__honest{font-family:'Inter',sans-serif;font-size:.76rem;line-height:1.6;color:var(--wdev-muted);border-left:2px solid var(--wdev-line);padding-left:.8rem;margin:0;}
        .wdev-case__links{display:flex;flex-wrap:wrap;align-items:center;gap:1.25rem;padding-top:.2rem;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;}
        .wdev-case__links a{color:var(--wdev-blue);text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;}
        .wdev-case__links a:hover{text-decoration:underline;}
        .wdev-case__links a.wdev-case__live{color:var(--wdev-muted);font-weight:500;}
        .wdev-work__all{text-align:center;margin-top:2.5rem;font-family:'Inter',sans-serif;font-size:.92rem;}
        .wdev-work__all a{color:var(--wdev-blue);font-weight:600;text-decoration:none;}
        .wdev-work__all a:hover{text-decoration:underline;}

        /* FAQ links + CTA steps */
        .wdev-faq__more{text-align:center;margin-top:2rem;font-family:'Inter',sans-serif;font-size:.88rem;color:var(--wdev-muted);}
        .wdev-faq__more a{color:var(--wdev-blue);font-weight:600;text-decoration:none;}
        .wdev-cta__inner{max-width:880px;}
        .wdev-cta__sub{max-width:580px;margin-left:auto;margin-right:auto;}
        .wdev-cta__steps{list-style:none;margin:0 0 2.4rem;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;counter-reset:wdevstep;text-align:left;}
        @media(max-width:700px){.wdev-cta__steps{grid-template-columns:1fr;}}
        .wdev-cta__steps li{counter-increment:wdevstep;background:var(--wdev-paper);border:1px solid var(--wdev-line);border-radius:14px;padding:1.1rem 1.2rem;display:grid;grid-template-columns:auto 1fr;column-gap:.8rem;}
        .wdev-cta__steps li::before{content:counter(wdevstep);grid-row:1 / span 2;width:30px;height:30px;border-radius:50%;background:var(--wdev-blue);color:#fff;display:grid;place-items:center;font-family:'IBM Plex Mono',monospace;font-size:.8rem;font-weight:600;}
        .wdev-cta__steps b{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--wdev-ink);}
        .wdev-cta__steps span{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:300;line-height:1.55;color:var(--wdev-muted);}

        @media(prefers-reduced-motion:reduce){
          .wdev-page *,.wdev-page *::before,.wdev-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-webdev-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(wdevGraph) }}
      />

      <div className="wdev-page">
        {/* ══ 1. HERO ═══════════════════════════════════════════════════════ */}
        <section className="wdev-hero" aria-labelledby="wdev-hero-heading">
          <div className="wdev-hero__media">
            <Image
              src="/images/services/website-development/website-development-hero.webp"
              alt="Responsive website shown on desktop, tablet and phone, connected to front-end, API, database and cloud layers"
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
          <div aria-hidden="true">
            <div className="wdev-hero__grain" />
          </div>
          <div className="wdev-corner wdev-corner--tl" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--tr" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--bl" aria-hidden="true" />
          <div className="wdev-corner wdev-corner--br" aria-hidden="true" />

          <nav className="wdev-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/"><span>Home</span></Link></li>
              <li className="wdev-breadcrumb__sep" aria-hidden="true">/</li>
              <li><Link href="/services"><span>Services</span></Link></li>
              <li className="wdev-breadcrumb__sep" aria-hidden="true">/</li>
              <li>
                <Link href={PAGE_PATH} aria-current="page"><span>Web Development</span></Link>
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
                Website development company in <em>India</em> for business sites, online stores and web apps
              </h1>
              <div className="wdev-hero__rule" aria-hidden="true" />
              <p className="wdev-hero__sub">
                We design and build websites and web applications in React and Next.js. One team in
                Bengaluru handles design, development, hosting and support, so nothing gets lost
                between handoffs.
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

        {/* ══ 2. CHALLENGES ═════════════════════════════════════════════════ */}
        <section className="wdev-pain" aria-labelledby="wdev-pain-heading">
          <div className="wdev-pain__inner">
            <div className="wdev-pain__head">
              <span className="wdev-label">Sound Familiar?</span>
              <h2 className="wdev-h2" id="wdev-pain-heading">
                Most websites don&rsquo;t fail from one big mistake.<br />
                They fail from <em>a lot of small ones.</em>
              </h2>
              <p className="wdev-sub">These are the problems we hear about most often when a business asks us to look at its site.</p>
            </div>
            <div className="wdev-pain__grid">
              {painPoints.map((p) => (
                <div className="wdev-pain__card" key={p.title}>
                  <div className="wdev-pain__icon" aria-hidden="true">{p.icon}</div>
                  <h3 className="wdev-pain__title">{p.title}</h3>
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

        {/* ══ 3. PHILOSOPHY + idea-to-launch workflow (G) ═══════════════════ */}
        <section className="wdev-intro" aria-labelledby="wdev-intro-heading">
          <div className="wdev-intro__inner">
            <span className="wdev-label">Our Philosophy</span>
            <h2 className="wdev-h2" id="wdev-intro-heading">
              Design and engineering, <em>one team</em>
            </h2>
            <p className="wdev-intro__p">
              At <strong>99 Visual Solutions</strong>, the people who design your site and the people who
              build it work together from the first meeting. That avoids a common problem: a design that
              looks good in a mockup but turns out slow, hard to build or awkward on a phone.
            </p>
            <p className="wdev-intro__p">
              We start with what the site has to do for your business, whether that&rsquo;s bringing in
              enquiries, selling products or running part of your operations. Every decision about layout,
              technology and content is then made against that goal.
            </p>
          </div>
          <div className="wdev-intro__wide">
            <LaunchTimeline
              className="wdev-intro__launch"
              stops={launchStops}
              caption="Every project follows the same path, and nothing moves to the next stop until you have approved the last one."
            />
          </div>
        </section>

        {/* ══ 4. WHICH BUILD DO YOU NEED? (C) ═══════════════════════════════ */}
        <section className="wdev-compare" aria-labelledby="wdev-compare-heading">
          <div className="wdev-compare__inner">
            <div className="wdev-compare__head">
              <span className="wdev-label">Website or Web App?</span>
              <h2 className="wdev-h2" id="wdev-compare-heading">
                Which kind of build <em>do you need?</em>
              </h2>
              <p className="wdev-sub">
                Most projects fall into one of three types. The type shapes the features, the budget and
                the technology, so it helps to agree on it early.
              </p>
            </div>
            <div className="wdev-compare__types">
              {buildTypes.map((t) => (
                <div className="wdev-compare__type" key={t.title}>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
            <SiteTypeMatrix />
            <p className="wdev-compare__note">
              Not sure which one fits? That is what the discovery call is for. Many projects also start as
              a business website and add a store or an app later, so we plan the structure to allow for
              that. Search visibility for any of the three can be extended with our{" "}
              <Link href="/services/digital-marketing-seo">SEO &amp; digital marketing services</Link>.
            </p>
            <WebsitePlaybooks className="wdev-compare__playbooks" />
          </div>
        </section>

        {/* ══ 5. SERVICES — quick-jump index ════════════════════════════════ */}
        <section className="wdev-overview" aria-labelledby="wdev-overview-heading">
          <div className="wdev-overview__inner">
            <div className="wdev-overview__head">
              <span className="wdev-label">Our Services</span>
              <h2 className="wdev-h2" id="wdev-overview-heading">Website development <em>services</em></h2>
              <p className="wdev-sub">
                Thirteen services, grouped below by what they help with. Hire us for a complete project or
                for one piece of it. Jump straight to the one you need.
              </p>
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

        {/* ══ 6–10. SERVICE GROUPS: Product & UX, Engineering (B), E-commerce
            & CMS (shopping flow), SEO & Performance (E), Security (F) ═════ */}
        <div id="services">
          {clusters.map((cluster) => (
            <section key={cluster.id} id={cluster.id} className="wdev-cluster" aria-labelledby={`wdev-cluster-h-${cluster.id}`}>
              <div className="wdev-cluster__inner">
                <div className="wdev-cluster__head">
                  <span className="wdev-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="wdev-cluster__h2" id={`wdev-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="wdev-cluster__intro">{cluster.intro}</p>
                </div>
                {cluster.visual && <div className="wdev-cluster__visual">{cluster.visual}</div>}
                <div className={`wdev-cluster__grid wdev-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id, idx) => {
                    const svc = serviceById(id);
                    const media = serviceMedia[svc.id];
                    const sizes =
                      cluster.cols === 4 ? "(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 300px"
                      : cluster.cols === 2 ? "(max-width: 760px) 100vw, 560px"
                      : "(max-width: 860px) 100vw, 520px";
                    return (
                      <article
                        className={`wdev-card${cluster.cols === 1 ? " wdev-card--wide" : ""}`}
                        id={svc.id}
                        key={svc.id}
                        aria-labelledby={`wdev-svc-heading-${svc.id}`}
                      >
                        {media && (
                          <AnimatedMedia className="wdev-card__media" delay={idx}>
                            <Image src={media.src} alt={media.alt} width={960} height={600} sizes={sizes} />
                          </AnimatedMedia>
                        )}
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
                {cluster.after && <div className="wdev-cluster__after">{cluster.after}</div>}
              </div>
            </section>
          ))}
        </div>

        {/* ══ 11. PROCESS — 7-stage lifecycle (A) ═══════════════════════════ */}
        <section className="wdev-process" id="process" aria-labelledby="wdev-process-heading">
          <div className="wdev-process__inner">
            <div className="wdev-process__head">
              <span className="wdev-label">How We Work</span>
              <h2 className="wdev-h2" id="wdev-process-heading">
                Seven stages, from <em>first call</em> to long-term care
              </h2>
              <p className="wdev-sub">
                Each stage ends with something you can review, so there are no surprises on launch day.
                After launch, maintenance feeds new ideas back into the next round of work.
              </p>
            </div>
            <ProcessCycle steps={processSteps} />
          </div>
        </section>

        {/* ══ 12. DELIVERABLES ══════════════════════════════════════════════ */}
        <section className="wdev-deliv" aria-labelledby="wdev-deliv-heading">
          <div className="wdev-deliv__inner">
            <div className="wdev-deliv__head">
              <span className="wdev-label">What You Get</span>
              <h2 className="wdev-h2" id="wdev-deliv-heading">What you <em>receive</em></h2>
              <p className="wdev-sub">Everything below is handed over at the end of the project, and it&rsquo;s yours to keep.</p>
            </div>
            <div className="wdev-deliv__grid">
              {deliverables.map((d) => (
                <div className="wdev-deliv__card" key={d.title}>
                  <div className="wdev-deliv__icon" aria-hidden="true">{d.icon}</div>
                  <h3 className="wdev-deliv__title">{d.title}</h3>
                  <p className="wdev-deliv__text">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 13. BEFORE / AFTER ════════════════════════════════════════════ */}
        <section className="wdev-ba" aria-labelledby="wdev-ba-heading">
          <div className="wdev-ba__inner">
            <div className="wdev-ba__head">
              <span className="wdev-label">The Difference</span>
              <h2 className="wdev-h2" id="wdev-ba-heading">What changes when a site is <em>rebuilt properly</em></h2>
              <p className="wdev-sub">Problems we often find in existing sites, and how a new build deals with each one.</p>
            </div>
            <div className="wdev-ba__cols" aria-hidden="true">
              <span />
              <span>Common before</span>
              <span />
              <span>After a proper build</span>
            </div>
            <ul className="wdev-ba__rows">
              {beforeAfter.map((r) => (
                <li className="wdev-ba__row" key={r.topic}>
                  <span className="wdev-ba__topic">{r.topic}</span>
                  <span className="wdev-ba__before"><span><span className="wdev-ba__label">Before:</span>{r.before}</span></span>
                  <span className="wdev-ba__arrow" aria-hidden="true"><FaArrowRight /></span>
                  <span className="wdev-ba__after"><span><span className="wdev-ba__label">After:</span>{r.after}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ 14. INDUSTRIES ════════════════════════════════════════════════ */}
        <section className="wdev-ind" aria-labelledby="wdev-ind-heading">
          <div className="wdev-ind__inner">
            <div className="wdev-ind__head">
              <span className="wdev-label">Who We Work With</span>
              <h2 className="wdev-h2" id="wdev-ind-heading">Industries <em>we build for</em></h2>
              <p className="wdev-sub">
                Each industry needs different features. Real estate clients often pair a listings site with
                our <Link href="/services/visualization">3D architectural visualisation</Link> for renders
                and walkthroughs, and online stores usually add{" "}
                <Link href="/services/digital-marketing-seo">SEO &amp; digital marketing</Link> once the
                site is live.
              </p>
            </div>
            <div className="wdev-ind__grid">
              {industries.map((ind, i) => (
                <div className="wdev-ind__card" key={ind.name}>
                  <AnimatedMedia className="wdev-ind__media" delay={i % 3}>
                    <Image className="wdev-ind__img" src={ind.img} alt={ind.alt} width={480} height={360} sizes="120px" />
                  </AnimatedMedia>
                  <div>
                    <h3 className="wdev-ind__name">{ind.name}</h3>
                    <p className="wdev-ind__note">{ind.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 15. TECHNOLOGIES (D) ══════════════════════════════════════════ */}
        <section className="wdev-tech" aria-labelledby="wdev-tech-heading">
          <div className="wdev-tech__inner">
            <span className="wdev-label">Under the Hood</span>
            <h2 className="wdev-h2" id="wdev-tech-heading">Technologies <em>we build with</em></h2>
            <p className="wdev-sub">
              We choose tools that are widely used, well supported and easy for another developer to pick
              up later. Here&rsquo;s how they fit together. For deeper write-ups on topics like Next.js and
              SEO, see our <Link href="/insights/category/web-development">web development insights</Link>.
            </p>
            <TechStackMap layers={stackLayers} />
          </div>
        </section>

        {/* ══ 16. RECENT PROJECTS — from lib/case-studies.ts. Only what each
            record documents: screenshots, brief, journey, workstreams, stack,
            and what the case study does not claim. ═══════════════════════ */}
        {webCaseStudies.length > 0 && (
          <section className="wdev-work" id="work" aria-labelledby="wdev-work-heading">
            <div className="wdev-work__inner">
              <div className="wdev-work__head">
                <span className="wdev-label">Recent Projects</span>
                <h2 className="wdev-h2" id="wdev-work-heading">Websites we&rsquo;ve <em>delivered</em></h2>
                <p className="wdev-sub">
                  An online store and a photographer&rsquo;s portfolio, both live today. Screenshots are taken
                  from the live sites, and each case study lists what we built and what it doesn&rsquo;t claim.
                </p>
              </div>
              <div className="wdev-work__list">
                {webCaseStudies.map((c) => {
                  const [main, ...rest] = c.gallery?.length ? c.gallery : [{ ...c.image, caption: "" }];
                  const host = c.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");
                  return (
                    <article className="wdev-case" key={c.slug} aria-labelledby={`wdev-case-${c.slug}`}>
                      <div className="wdev-case__media">
                        <figure className="wdev-browser" style={{ margin: 0 }}>
                          <div className="wdev-browser__bar" aria-hidden="true">
                            <i /><i /><i />
                            <span className="wdev-browser__url">{host ?? c.client}</span>
                          </div>
                          <Image
                            className="wdev-browser__shot"
                            src={main.src}
                            alt={main.alt}
                            width={main.width}
                            height={main.height}
                            sizes="(max-width: 920px) 100vw, 600px"
                          />
                        </figure>
                        {main.caption && <p className="wdev-case__caption">{main.caption}</p>}
                        {rest.length > 0 && (
                          <ul className="wdev-case__thumbs" aria-label={`More screenshots of ${c.client}`}>
                            {rest.slice(0, 3).map((g) => (
                              <li key={g.src}>
                                <figure style={{ margin: 0 }}>
                                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(max-width: 920px) 33vw, 190px" />
                                  {g.caption && <figcaption>{g.caption}</figcaption>}
                                </figure>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="wdev-case__body">
                        <span className="wdev-case__kind">{c.client}</span>
                        <h3 className="wdev-case__title" id={`wdev-case-${c.slug}`}>
                          <Link href={`/work/${c.slug}`}>{c.title}</Link>
                        </h3>
                        <p className="wdev-case__desc">{c.description}</p>

                        {c.context[0] && (
                          <div>
                            <h4 className="wdev-case__h">The brief</h4>
                            <p className="wdev-case__brief">{c.context[0]}</p>
                          </div>
                        )}

                        {c.workflow && (
                          <div>
                            <h4 className="wdev-case__h">{c.workflow.heading}</h4>
                            <ol className="wdev-case__journey">
                              {c.workflow.steps.map((s) => <li key={s.step}><span>{s.step}</span></li>)}
                            </ol>
                          </div>
                        )}

                        <div>
                          <h4 className="wdev-case__h">What we built</h4>
                          <ul className="wdev-case__built">
                            {c.workstreams.map((w) => (
                              <li key={w.name}><b>{w.name}</b><span>{w.summary}</span></li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="wdev-case__h">Built with</h4>
                          <ul className="wdev-case__stack">
                            {c.stack.map((t) => <li key={t}>{t}</li>)}
                          </ul>
                        </div>

                        {c.notClaimed?.length ? (
                          <p className="wdev-case__honest">
                            <strong>Not claimed:</strong> {c.notClaimed[0]}
                          </p>
                        ) : null}

                        <div className="wdev-case__links">
                          <Link href={`/work/${c.slug}`} aria-label={`Read the ${c.client} case study`}>
                            Read the case study <FaArrowRight aria-hidden="true" />
                          </Link>
                          {c.liveUrl && (
                            <a href={c.liveUrl} target="_blank" rel="noopener" className="wdev-case__live">
                              Visit {host?.replace(/^www\./, "")} ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="wdev-work__all">
                <Link href="/work">See all our work</Link>
              </p>
            </div>
          </section>
        )}

        {/* ══ 17. FAQ — same copy as wdevFaqNode (FAQPage JSON-LD). Native
            <details>/<summary>, so it works without JavaScript. ════════════ */}
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
            <p className="wdev-faq__more">
              Have a question that isn&rsquo;t here? <Link href="/contact">Contact our team</Link>.
            </p>
          </div>
        </section>

        {/* ══ 18. WHY CHOOSE US ═════════════════════════════════════════════ */}
        <section className="wdev-benefits" aria-labelledby="wdev-benefits-heading">
          <div className="wdev-benefits__inner">
            <div className="wdev-benefits__head">
              <span className="wdev-benefits__label">Why Choose Us?</span>
              <h2 className="wdev-benefits__h2" id="wdev-benefits-heading">
                Why businesses <em>work with us</em>
              </h2>
              <p className="wdev-benefits__sub">
                A website is only worth what it does for your business after launch. This is how we work
                to make sure it pulls its weight.
              </p>
            </div>
            <div className="wdev-benefits__grid">
              {benefits.map((b, i) => (
                <div className="wdev-benefit-card" key={b.title}>
                  <AnimatedMedia className="wdev-benefit-card__media" delay={i % 3}>
                    <Image
                      className="wdev-benefit-card__img"
                      src={b.img}
                      alt={b.alt}
                      width={960}
                      height={540}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    />
                  </AnimatedMedia>
                  <h3 className="wdev-benefit-card__title">{b.title}</h3>
                  <p className="wdev-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LOCATION ══════════════════════════════════════════════════════ */}
        <section className="wdev-location" aria-labelledby="wdev-location-heading">
          <div className="wdev-location__inner">
            <span className="wdev-label">Where We&rsquo;re Based</span>
            <h2 className="wdev-h2" id="wdev-location-heading">
              Based in <em>Bengaluru</em>, working across India and abroad
            </h2>
            <p className="wdev-location__p">
              Our design and engineering team works together from Bengaluru (Bangalore), Karnataka, in one
              time zone. That keeps questions, reviews and fixes moving quickly, whether the client is
              elsewhere in India or in the US, UK, UAE or Australia. Read more about the team on the{" "}
              <Link href="/about">About 99 Visual Solutions</Link> page, or see our other{" "}
              <Link href="/services">services</Link>.
            </p>
          </div>
        </section>

        {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
        <section className="wdev-cta" aria-labelledby="wdev-cta-heading">
          <div className="wdev-cta__inner">
            <span className="wdev-cta__eyebrow">Start a Project</span>
            <h2 className="wdev-cta__h2" id="wdev-cta-heading">
              Tell us about <em>your project</em>
            </h2>
            <p className="wdev-cta__sub">
              Share a few details and we&rsquo;ll come back with questions, a suggested approach and an
              itemised estimate. The first conversation is free, with no obligation.
            </p>
            <ol className="wdev-cta__steps">
              <li><b>Share your goals</b><span>A short call or email about what you need.</span></li>
              <li><b>Get a plan</b><span>Scope, timeline and an itemised estimate.</span></li>
              <li><b>Start building</b><span>We kick off once you&rsquo;re happy with the plan.</span></li>
            </ol>
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

      {/* Articles about this service — reverse of the article's "Related Service" link. */}
      <RelatedInsights serviceHref={PAGE_PATH} />
      {/* Drives scroll-in animations for every infographic on this page. */}
      <InViewObserver />
      <Footer />
      <ScrollDown />
    </>
  );
}
