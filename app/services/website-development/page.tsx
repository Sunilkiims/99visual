// app/services/website-development/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Website & Web App Development — 99 Visual Solutions
//
// THIS REVISION: Hero background updated to a full-bleed photo banner
//   (dark blue/purple tech desk-setup image) with a dark gradient overlay
//   so text stays readable — same treatment as /services/visualization.
//   - Right-column product image and the mug-steam CSS animation were
//     removed, since the steam was pixel-positioned to match the old
//     transparent PNG's mug and won't line up with the new banner photo.
//   - NO COPY CHANGES: headline, sub-copy, eyebrow, and CTA text are the
//     exact same words as before — only the layout/CSS changed.
//   - Everything else on the page (service sections, benefits, CTA strip,
//     schema, SEO) is unchanged from the previous revision.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";

import type { Metadata } from "next";
import {
  FaCogs, FaRocket, FaMobileAlt,
  FaClock, FaUsers, FaTools,
} from "react-icons/fa";

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
// METADATA
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
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
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
// PAGE DATA
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
    image: "/images/web-application.png",
    imageAlt: "Web Application Development illustration",
    description: "A standard website works fine until your business needs a login system, an internal tool, or a way to move data between teams without spreadsheets and email chains. That's the point where we start building web applications — software built around how your team actually works, not a page that just describes it.",
    highlight: "We map the workflow first and design the tool around it, so the result is something your team uses because it's faster, not something they route around because it isn't.",
    bullets: ["Custom dashboards & business tools", "Workflow automation & process optimisation", "Secure, scalable, and high-performance architecture"],
    imageLeft: true,
  },
  {
    id: "ux-design",
    title: "User Experience (UX) Design",
    image: "/images/ux-design.png",
    imageAlt: "UX design illustration",
    description: "People rarely complain about confusing design — they just leave. Our UX process is built around finding the small frictions that quietly cost you conversions: unclear navigation, vague calls to action, forms that ask for too much too soon.",
    highlight: "Every layout decision is backed by a reason — user research, behavioural data, or testing — rather than personal preference, because what looks good and what actually converts aren't always the same thing.",
    bullets: ["Human-centred design approach", "Wireframes, prototypes & usability testing", "Conversion-focused design strategy"],
    imageLeft: false,
  },
  {
    id: "website-customization",
    title: "Website Customisation",
    image: "/images/website-customization.png",
    imageAlt: "Website customisation illustration",
    description: "Off-the-shelf templates rarely fit a real business perfectly. We start with how you actually sell and how customers actually browse, then build the site around that — rather than bending your business model to fit a theme's limitations.",
    highlight: "Whether that means a custom checkout flow or a landing page built for a single campaign, the goal stays the same: a site that behaves the way your business actually operates, not the way a template assumes it should.",
    bullets: ["Custom e-commerce functionality", "Landing pages built for campaigns", "Personalisation for brand consistency"],
    imageLeft: true,
  },
  {
    id: "frontend",
    title: "Front-End Development",
    image: "/images/frontend-development.png",
    imageAlt: "Front-End Development illustration",
    description: "The front end is the only part of your site users ever actually see, so small delays and layout shifts have an outsized effect on whether someone stays or bounces. We build interfaces in React and Next.js designed to load quickly and hold together across screen sizes and browsers.",
    highlight: "Clean component structure also pays off later — future updates are faster and cheaper because you're not paying someone to untangle tangled code two years from now.",
    bullets: ["Responsive, mobile-first & cross-browser compatible design", "Modern frameworks (React, Next.js, Vue) & clean code architecture", "Optimised performance, accessibility & Core Web Vitals compliance"],
    imageLeft: false,
  },
  {
    id: "backend",
    title: "Back-End Development",
    image: "/images/backend-development.png",
    imageAlt: "Back-End Development illustration",
    description: "Front-end polish doesn't matter much if the system behind it can't handle real traffic or keep data secure. We build the APIs, databases, and server architecture that hold up under actual load, not just a demo environment.",
    highlight: "Every back end is scoped to what you actually need — a small inventory tool doesn't require microservices, but a multi-location booking platform usually does, and we size the architecture accordingly rather than over-building by default.",
    bullets: ["Custom APIs & microservices architecture", "Database design, optimisation & management", "Authentication, authorisation & data security"],
    imageLeft: true,
  },
  {
    id: "ecommerce",
    title: "E-Commerce & CMS Development",
    image: "/images/e-commerce-cms-development.png",
    imageAlt: "E-Commerce and CMS Development illustration",
    description: "Every step between adding an item to a cart and completing checkout is a chance to lose the sale. We build storefronts and content systems that keep that path short and fast, whether you're running a five-product shop or a growing multi-category catalogue.",
    highlight: "We also configure the CMS so your own team can update products, pages, and promotions without filing a support ticket every time something needs to change.",
    bullets: ["Custom storefront design & shopping cart development", "Headless CMS & content workflow management", "Secure payment gateway & order management integrations"],
    imageLeft: false,
  },
  {
    id: "modernization",
    title: "Web App Modernisation",
    image: "/images/webapp-modernization.png",
    imageAlt: "Web App Modernisation illustration",
    description: "If your current system was built more than a few years ago, it's likely slower than it should be, harder to update safely, and more expensive to maintain than it needs to be. We audit what you have, work out what's genuinely worth keeping, and rebuild the rest on a modern stack.",
    highlight: "Modernisation doesn't always mean a full rebuild — sometimes the fastest win is migrating the database and upgrading the front end while leaving stable back-end logic alone.",
    bullets: ["Legacy system upgrade & re-engineering", "Cloud migration & performance optimisation", "Scalable, secure & future-ready architecture"],
    imageLeft: true,
  },
  {
    id: "seo",
    title: "SEO & Performance Optimisation",
    image: "/images/seo-and-performance-optimization.png",
    imageAlt: "SEO & Performance Optimisation illustration",
    description: "Ranking well and loading fast aren't separate goals — Google's own ranking systems weigh page speed and Core Web Vitals directly. We handle both together: technical SEO, structured data, image and script optimisation, and monitoring that continues as your content grows.",
    highlight: "We report on what actually moved — organic traffic, ranking positions, and conversion rate — rather than vanity metrics that don't affect revenue.",
    bullets: ["On-page, technical & keyword optimisation", "Website speed & Core Web Vitals improvement", "Analytics-driven insights & continuous optimisation"],
    imageLeft: false,
  },
  {
    id: "security",
    title: "Web Security Services",
    image: "/images/web-security-services.png",
    imageAlt: "Web Security Services illustration",
    description: "A single unpatched vulnerability or an exposed API key can undo years of customer trust in a day. We build security in from the start — proper authentication, encrypted data handling, and regular vulnerability checks — rather than adding it after the fact.",
    highlight: "For sites handling payments or personal data, we also help you meet the compliance standards your industry expects, from PCI DSS to GDPR-aligned data handling.",
    bullets: ["Vulnerability assessment & penetration testing", "SSL implementation, firewalls & malware protection", "Continuous monitoring & threat prevention strategies"],
    imageLeft: true,
  },
  {
    id: "hosting",
    title: "Website Hosting & Deployment",
    image: "/images/website-hosting-deployement.png",
    imageAlt: "Website Hosting & Deployment illustration",
    description: "Hosting decisions rarely get attention until something breaks — a traffic spike, a failed deploy, a server going down at the worst possible time. We set up infrastructure and CI/CD pipelines designed to prevent those moments, with monitoring and backups running quietly in the background.",
    highlight: "Whether you need one production environment or staging, testing, and production kept in sync, releases are automated so shipping an update isn't a manual, error-prone process.",
    bullets: ["Secure, scalable & high-performance hosting solutions", "CI/CD pipelines & seamless deployment processes", "Server management, backups & uptime monitoring"],
    imageLeft: false,
  },
  {
    id: "api",
    title: "API & Third-Party Integrations",
    image: "/images/api-and-third-party-intigration.png",
    imageAlt: "API & Third-Party Integrations illustration",
    description: "Your website rarely operates alone — payment processors, CRMs, analytics tools, and internal systems all need to exchange data reliably. We build and connect REST and GraphQL APIs so information moves between them without manual exports or broken syncs.",
    highlight: "Where a ready-made integration doesn't exist, we build a custom one, matched to how your specific tools and data actually need to interact rather than forced through a generic connector.",
    bullets: ["Secure REST & GraphQL API integrations", "Payment gateways, CRM & third-party service connections", "Real-time data sync & workflow automation"],
    imageLeft: true,
  },
  {
    id: "landing-page",
    title: "Landing Page Design & Development",
    image: "/images/landing-page-design.png",
    imageAlt: "Landing Page Design & Development illustration",
    description: "A landing page has one job, and everything on it should serve that job — the headline, the layout, the single call to action. We design pages around one goal at a time, then test variations to see which layout actually converts better with your audience.",
    highlight: "Load time matters more here than almost anywhere else on your site: campaign traffic is often paid, so every extra second of load time is money leaking out of your ad budget.",
    bullets: ["Conversion-focused design & persuasive content", "Fast-loading, responsive & mobile-first layouts", "A/B testing & performance-driven optimisation"],
    imageLeft: false,
  },
  {
    id: "dashboard",
    title: "Custom Dashboard & Admin Panel Development",
    image: "/images/custom-dashboard-admin-panel.png",
    imageAlt: "Custom Dashboard & Admin Panel Development illustration",
    description: "Spreadsheets and shared documents work fine until three people are editing the same file at once. We build dashboards and admin panels that give your team one shared, accurate view of the data that matters — orders, users, inventory, whatever your operation actually runs on.",
    highlight: "Role-based permissions mean each person sees exactly what they need and nothing more, which matters as much for security as it does for day-to-day usability.",
    bullets: ["Role-based access & secure user management", "Real-time analytics, reports & data visualisation", "Scalable, intuitive & fully customisable interfaces"],
    imageLeft: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function WebsiteDevelopment() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .wdev-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        /* ══ HERO — full-bleed photo banner, same treatment as
           /services/visualization: photo as CSS background with a dark
           gradient overlay so the text column stays legible. ══ */
        .wdev-hero {
          position:relative;min-height:90vh;display:flex;align-items:center;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/website-development-hero-banner.jpg') center center / cover no-repeat;
          overflow:hidden;padding:8rem 1.5rem 6rem;
        }
        .wdev-hero__grain{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .wdev-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .wdev-corner--tl{top:24px;left:24px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .wdev-corner--tr{top:24px;right:24px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        .wdev-corner--bl{bottom:64px;left:24px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        .wdev-corner--br{bottom:64px;right:24px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}

        /* Single-column content — sits on top of the photo banner
           background, capped to a comfortable reading width. */
        .wdev-hero__inner{
          position:relative;z-index:10;max-width:1280px;margin:0 auto;width:100%;
          display:grid;grid-template-columns:1fr;
        }

        .wdev-hero__content{animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:620px;}
        @keyframes wdevFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.wdev-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .wdev-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .wdev-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:wdevPulse 2s ease-in-out infinite;}
        @keyframes wdevPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .wdev-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,3.6vw,3.1rem);font-weight:700;line-height:1.16;letter-spacing:-.01em;color:#fff;margin:0 0 .9rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .wdev-hero__h1 em{font-style:italic;color:#f97316;}
        .wdev-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.2rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.wdev-hero__rule{margin:0 auto 1.2rem;background:linear-gradient(90deg,transparent,#f97316,transparent);}}
        .wdev-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.86rem,1.2vw,.98rem);font-weight:300;line-height:1.75;color:rgba(255,255,255,0.75);max-width:520px;margin:0 0 2.2rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.wdev-hero__sub{margin:0 auto 2.2rem;}}
        .wdev-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'DM Sans',sans-serif;font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:12px 28px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .wdev-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        /* ══ INTRO ═══════════════════════════════════════════════════════ */
        .wdev-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .wdev-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .wdev-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .wdev-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .wdev-intro__h2 em{font-style:italic;color:#f97316;}
        .wdev-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .wdev-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .wdev-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}

        /* ══ SERVICE SECTIONS ════════════════════════════════════════════ */
        .wdev-services{background:#080808;}
        .wdev-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .wdev-svc:nth-child(odd){background:#0f0f0f;}
        .wdev-svc:nth-child(even){background:#080808;}
        .wdev-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .wdev-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){.wdev-svc__inner--img-left,.wdev-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}.wdev-svc__img-wrap{order:2!important;}.wdev-svc__body{order:1!important;}}
        .wdev-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .wdev-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .wdev-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .wdev-svc__img-wrap:hover img{transform:scale(1.03);}
        .wdev-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .wdev-svc__body{position:relative;}
        .wdev-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .wdev-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .wdev-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .wdev-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .wdev-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .wdev-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .wdev-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .wdev-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}

        /* ══ BENEFITS ════════════════════════════════════════════════════ */
        .wdev-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .wdev-benefits__inner{max-width:1200px;margin:0 auto;}
        .wdev-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .wdev-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .wdev-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .wdev-benefits__h2 em{font-style:italic;color:#f97316;}
        .wdev-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .wdev-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .wdev-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.wdev-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.wdev-benefits__grid{grid-template-columns:1fr;}}
        .wdev-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .wdev-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .wdev-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .wdev-benefit-card:hover::before{opacity:1;}
        .wdev-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .wdev-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .wdev-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}

        /* ══ CTA STRIP ═══════════════════════════════════════════════════ */
        .wdev-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .wdev-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .wdev-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .wdev-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .wdev-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .wdev-cta__h2 em{font-style:italic;color:#f97316;}
        .wdev-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .wdev-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .wdev-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .wdev-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      <script
        id="schema-webdev-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wdevGraph) }}
      />

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
          Hero content now sits on top of a full-bleed photo banner
          (set as the section's CSS background — see .wdev-hero in <style>
          below) instead of the previous two-column layout with a separate
          product-shot image. A dark gradient overlay (also in CSS) keeps
          the white/orange text legible over the photo.
        */}
        <div className="wdev-hero__inner">
          <div className="wdev-hero__content">
            <div className="wdev-hero__eyebrow" aria-hidden="true">
              <span className="wdev-hero__dot" />
              Services · Web Development
            </div>
            <h1 className="wdev-hero__h1" id="wdev-hero-heading">
              Building digital<br />experiences that <em>perform</em>
            </h1>
            <div className="wdev-hero__rule" aria-hidden="true" />
            <p className="wdev-hero__sub">
              From custom web applications and UX-first design to e-commerce, SEO,
              and security, we build digital products that hold up under real
              traffic — not just in a demo.
            </p>
            <a href="#services" className="wdev-hero__cta" aria-label="Explore web development services by 99 Visual Solutions">
              Explore Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
      <section className="wdev-intro" aria-labelledby="wdev-intro-heading">
        <div className="wdev-intro__inner">
          <span className="wdev-intro__label">Our Philosophy</span>
          <h2 className="wdev-intro__h2" id="wdev-intro-heading">
            Crafting digital experiences that<br />inspire, connect &amp; <em>convert</em>
          </h2>
          <div className="wdev-intro__rule" aria-hidden="true" />
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

      {/* ══ SERVICE SECTIONS ══════════════════════════════════════════════ */}
      <div id="services" className="wdev-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="wdev-svc" aria-labelledby={`wdev-svc-heading-${svc.id}`}>
            <div className={`wdev-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="wdev-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image src={svc.image} alt={svc.imageAlt} width={600} height={460} style={{ width:"100%",height:"auto" }} />
              </div>
              <div className="wdev-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="wdev-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="wdev-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="wdev-svc__heading" id={`wdev-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="wdev-svc__rule" aria-hidden="true" />
                <p className="wdev-svc__p">{svc.description}</p>
                <p className="wdev-svc__highlight">{svc.highlight}</p>
                <ul className="wdev-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ══════════════════════════════════════════════════════ */}
      <section className="wdev-benefits" aria-labelledby="wdev-benefits-heading">
        <div className="wdev-benefits__inner">
          <div className="wdev-benefits__head">
            <span className="wdev-benefits__label">Why Choose Us?</span>
            <h2 className="wdev-benefits__h2" id="wdev-benefits-heading">
              Benefits of working with<br /><em>99 Visual</em>
            </h2>
            <div className="wdev-benefits__rule" aria-hidden="true" />
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

      {/* ══ CTA STRIP ═════════════════════════════════════════════════════ */}
      <section className="wdev-cta" aria-labelledby="wdev-cta-heading">
        <div className="wdev-cta__orb" aria-hidden="true" />
        <div className="wdev-cta__inner">
          <span className="wdev-cta__eyebrow">Start a Project</span>
          <h2 className="wdev-cta__h2" id="wdev-cta-heading">
            Ready to build something <em>remarkable</em>?
          </h2>
          <div className="wdev-cta__rule" aria-hidden="true" />
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

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}