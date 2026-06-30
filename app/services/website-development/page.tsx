// app/services/website-development/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Website & Web App Development — 99 Visual Solutions
//
// AUDIT FIXES APPLIED (v2 — INDEXING FIX):
//   ✅ CRITICAL #3 — CANONICAL FIX (root cause of non-indexing):
//      metadataBase + absolute canonical URL = doubled/malformed URL.
//      Fix: canonical now uses a RELATIVE path "/services/website-development"
//      so Next.js metadataBase resolves it cleanly to the correct absolute URL.
//   ✅ CRITICAL #4 — BASE trailing-slash guard added via baseSafe() helper.
//      If BASE = "https://domain.com/" the old code produced
//      "https://domain.com//services/..." — Google treats that as a different
//      URL, breaks canonical signal, page never gets indexed.
//   ✅ CRITICAL #5 — robots: explicit "index, follow" added as string override
//      to prevent any parent layout.tsx defaulting to "noindex" from bleeding
//      through on this route in Next.js 14+ App Router.
//   ✅ All previous CRITICAL #1 (wdev- prefix) and #2 (breadcrumbFromItems)
//      fixes retained from prior audit.
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

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX #4 — Trailing-slash guard.
// Ensures BASE never produces double-slash URLs regardless of how the constant
// is defined in lib/schema.ts (e.g. "https://domain.com/" vs "https://domain.com")
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE = BASE.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ 63 chars — within sweet spot
  title: "Website & Web App Development Services | 99 Visual",

  description:
    "99 Visual Solutions offers end-to-end web development: custom web applications, front-end & back-end development, UX design, e-commerce, CMS, SEO optimization, API integrations, and web security worldwide.",

  // metadataBase tells Next.js the domain. It resolves relative canonical paths.
  metadataBase: new URL(BASE_SAFE),

  alternates: {
    // ✅ FIX #3 — RELATIVE canonical path (NOT absolute).
    // With metadataBase set above, Next.js builds the correct absolute URL:
    //   https://yourdomain.com/services/website-development
    // Using an absolute URL here caused Next.js to prepend metadataBase again,
    // producing: https://yourdomain.comhttps://yourdomain.com/services/...
    // which Google rejects, preventing the page from being indexed.
    canonical: "/services/website-development",
  },

  // ✅ FIX #5 — Explicit robots directive on this route.
  // Prevents any parent layout.tsx "noindex" from overriding this page.
  // Also emits the HTTP header X-Robots-Tag: index, follow via Next.js.
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
    description: "From custom web apps and UX design to e-commerce, SEO, API integrations, and web security — 99 Visual Solutions delivers full-cycle web development for startups and enterprises globally.",
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
    description: "Custom web apps, front-end & back-end development, e-commerce, SEO, API integrations & more — built for performance by 99 Visual Solutions.",
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
// All schema URLs now use BASE_SAFE to prevent double-slash issues.
// ─────────────────────────────────────────────────────────────────────────────

const wdevBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",            url: "/" },
  { name: "Services",        url: "/services" },
  { name: "Web Development", url: "/services/website-development" },
]);

const wdevServiceNode = {
  ...serviceSchema({
    name:        "Website & Web App Development",
    description: "Custom web application development, UX/UI design, front-end and back-end development, e-commerce & CMS development, SEO & performance optimization, web security, hosting & deployment, API integrations, and landing page & dashboard development.",
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
        `We offer custom web application development, UX/UI design, front-end and back-end development, e-commerce and CMS development, SEO and performance optimisation, web security services, hosting and deployment, API integrations, and landing page and dashboard development. Contact us at ${CONTACT_EMAIL} for a free consultation and project scoping call — all initial discussions are obligation-free.`,
    },
    {
      question: "Do you build mobile-responsive websites?",
      answer:
        "Yes, every website we build is fully responsive and mobile-first, ensuring seamless performance across all devices and screen sizes. We follow Google's Core Web Vitals guidelines to ensure fast load times, stable layouts, and responsive interactivity — all critical factors for both user experience and SEO ranking in 2024 and beyond.",
    },
    {
      question: "Which technologies do you use for web development?",
      answer:
        "We work with modern technology stacks including React, Next.js, Vue.js, Node.js, and various headless CMS platforms such as Sanity, Contentful, and Strapi. Our back-end services cover custom REST and GraphQL APIs, microservices architecture, and secure database design using PostgreSQL, MongoDB, and MySQL. We deploy on AWS, GCP, and Azure.",
    },
    {
      question: "Can you modernize or upgrade our existing web application?",
      answer:
        `Absolutely. We specialise in web application modernisation — re-engineering legacy systems, migrating to modern cloud-native architectures, upgrading front-end stacks to React or Next.js, and improving performance and security. Our process begins with a thorough technical audit of your existing system. Email us at ${CONTACT_EMAIL} to discuss your legacy system and get a modernisation assessment.`,
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
  description:   "End-to-end web development: custom web apps, UX design, e-commerce, CMS, SEO, API integrations, and web security — by 99 Visual Solutions.",
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
  { icon: <FaCogs />,      title: "Customized Solutions",          description: "Every business has unique needs. We create fully custom websites and web apps tailored to your specific goals, ensuring your digital presence reflects your brand." },
  { icon: <FaRocket />,    title: "SEO Optimization",              description: "Every website we build incorporates SEO best practices from day one — optimized structure, fast loading, Core Web Vitals compliance, and semantic HTML for better rankings." },
  { icon: <FaMobileAlt />, title: "Mobile Responsiveness",         description: "With mobile traffic dominating, we build fully responsive, mobile-first websites that provide seamless experiences across all devices, boosting satisfaction and rankings." },
  { icon: <FaClock />,     title: "Faster Load Times",             description: "Our websites are optimised for speed — fast load times on all devices improve user experience, reduce bounce rates, and enhance your Google Core Web Vitals scores." },
  { icon: <FaUsers />,     title: "Improved User Experience",      description: "We prioritise UX with intuitive, visually appealing designs that keep visitors engaged, increasing time on site, reducing friction, and boosting conversion rates." },
  { icon: <FaTools />,     title: "Ongoing Maintenance & Support", description: "We provide ongoing post-launch support — whether updates, security patches, performance monitoring, or new features — ensuring long-term performance and reliability." },
];

const services = [
  {
    id: "web-application",
    title: "Web Application Development",
    image: "/images/web-application.png",
    imageAlt: "Web Application Development illustration",
    description: "Your business operations demand more than a standard website — they require intelligent, scalable, and purpose-built digital solutions. We design and develop powerful web applications tailored to your unique workflows, enabling seamless automation, enhanced productivity, and data-driven decision-making.",
    highlight: "From dynamic dashboards to fully customised business tools and system integrations, every application we build is crafted to align precisely with your operational processes and growth objectives.",
    bullets: ["Custom dashboards & business tools", "Workflow automation & process optimisation", "Secure, scalable, and high-performance architecture"],
    imageLeft: true,
  },
  {
    id: "ux-design",
    title: "User Experience (UX) Design",
    image: "/images/ux-design.png",
    imageAlt: "UX design illustration",
    description: "Great design is not just about how it looks — it's about how it works and how it feels. We craft seamless, intuitive user experiences that guide users effortlessly through your digital products, reducing friction at every touchpoint.",
    highlight: "By deeply understanding user behaviour, business goals, and market trends, we create designs that reduce friction, enhance usability, and keep users engaged — turning visitors into loyal customers.",
    bullets: ["Human-centred design approach", "Wireframes, prototypes & usability testing", "Conversion-focused design strategy"],
    imageLeft: false,
  },
  {
    id: "website-customization",
    title: "Website Customisation",
    image: "/images/website-customization.png",
    imageAlt: "Website customisation illustration",
    description: "Your business is unique, and your website should reflect that at every level. We deliver fully customised web solutions — from powerful e-commerce platforms to high-converting landing pages and tailored functionalities that match your brand perfectly.",
    highlight: "Designed to align perfectly with your brand identity, customer journey, and business goals. Every detail is built with purpose and tested for performance before launch.",
    bullets: ["Custom e-commerce functionality", "Landing pages built for campaigns", "Personalisation for brand consistency"],
    imageLeft: true,
  },
  {
    id: "frontend",
    title: "Front-End Development",
    image: "/images/frontend-development.png",
    imageAlt: "Front-End Development illustration",
    description: "Your website's first impression is everything — and we make it count. Our front-end development services focus on creating visually stunning, highly interactive, and lightning-fast user interfaces that captivate users from the very first click.",
    highlight: "By leveraging modern frameworks and performance best practices, we build responsive, accessible, and performance-driven interfaces that deliver seamless experiences across all devices and browsers.",
    bullets: ["Responsive, mobile-first & cross-browser compatible design", "Modern frameworks (React, Next.js, Vue) & clean code architecture", "Optimised performance, accessibility & Core Web Vitals compliance"],
    imageLeft: false,
  },
  {
    id: "backend",
    title: "Back-End Development",
    image: "/images/backend-development.png",
    imageAlt: "Back-End Development illustration",
    description: "Behind every powerful digital experience lies a robust and intelligent back-end. We specialise in building secure, scalable, and high-performance back-end systems that ensure your website or application runs smoothly, efficiently, and reliably under any load.",
    highlight: "No two businesses are alike — and your digital infrastructure should reflect that uniqueness. Our back-end services are fully customised to meet your specific operational needs, security requirements, and scaling goals.",
    bullets: ["Custom APIs & microservices architecture", "Database design, optimisation & management", "Authentication, authorisation & data security"],
    imageLeft: true,
  },
  {
    id: "ecommerce",
    title: "E-Commerce & CMS Development",
    image: "/images/e-commerce-cms-development.png",
    imageAlt: "E-Commerce and CMS Development illustration",
    description: "In today's digital-first world, having a powerful online store and an easy-to-manage content system is essential for business growth. We specialise in developing scalable e-commerce platforms and intuitive Content Management Systems tailored to your needs.",
    highlight: "Our e-commerce solutions are designed to deliver seamless shopping experiences — from product browsing to secure checkout — ensuring higher engagement, lower abandonment rates, and increased conversions.",
    bullets: ["Custom storefront design & shopping cart development", "Headless CMS & content workflow management", "Secure payment gateway & order management integrations"],
    imageLeft: false,
  },
  {
    id: "modernization",
    title: "Web App Modernisation",
    image: "/images/webapp-modernization.png",
    imageAlt: "Web App Modernisation illustration",
    description: "In today's fast-evolving digital landscape, outdated applications can slow down performance, limit scalability, and impact user experience. We help businesses transform legacy web applications into modern, high-performing, and future-ready platforms.",
    highlight: "By leveraging the latest technologies, cloud capabilities, and responsive frameworks, we ensure your application is faster, more secure, easier to maintain, and aligned with current user expectations.",
    bullets: ["Legacy system upgrade & re-engineering", "Cloud migration & performance optimisation", "Scalable, secure & future-ready architecture"],
    imageLeft: true,
  },
  {
    id: "seo",
    title: "SEO & Performance Optimisation",
    image: "/images/seo-and-performance-optimization.png",
    imageAlt: "SEO & Performance Optimisation illustration",
    description: "A powerful digital presence goes beyond just having a website — it's about being discoverable, fast, and optimised for both users and search engines. We combine advanced SEO strategies with performance optimisation to rank higher and load faster.",
    highlight: "From technical SEO improvements to speed enhancements and Core Web Vitals optimisation, we focus on driving organic traffic, reducing bounce rates, and maximising your online visibility in competitive search results.",
    bullets: ["On-page, technical & keyword optimisation", "Website speed & Core Web Vitals improvement", "Analytics-driven insights & continuous optimisation"],
    imageLeft: false,
  },
  {
    id: "security",
    title: "Web Security Services",
    image: "/images/web-security-services.png",
    imageAlt: "Web Security Services illustration",
    description: "In an era where cyber threats are constantly evolving, securing your digital assets is essential. We provide comprehensive web security solutions designed to protect your website, applications, and user data from vulnerabilities, attacks, and data breaches.",
    highlight: "By implementing advanced security protocols, continuous monitoring, and proactive threat prevention, we ensure your platform remains safe, reliable, and compliant with modern security standards.",
    bullets: ["Vulnerability assessment & penetration testing", "SSL implementation, firewalls & malware protection", "Continuous monitoring & threat prevention strategies"],
    imageLeft: true,
  },
  {
    id: "hosting",
    title: "Website Hosting & Deployment",
    image: "/images/website-hosting-deployement.png",
    imageAlt: "Website Hosting & Deployment illustration",
    description: "A strong digital presence starts with reliable hosting and seamless deployment. We provide robust, secure, and high-performance hosting solutions tailored to your business needs, ensuring your website is always accessible, fast, and scalable under any traffic conditions.",
    highlight: "From initial setup to continuous deployment pipelines, our experts handle everything with precision — so you can focus on growing your business while we manage the infrastructure and uptime.",
    bullets: ["Secure, scalable & high-performance hosting solutions", "CI/CD pipelines & seamless deployment processes", "Server management, backups & uptime monitoring"],
    imageLeft: false,
  },
  {
    id: "api",
    title: "API & Third-Party Integrations",
    image: "/images/api-and-third-party-intigration.png",
    imageAlt: "API & Third-Party Integrations illustration",
    description: "Modern digital ecosystems thrive on connectivity. We enable your applications to seamlessly communicate with external platforms, services, and tools through secure and efficient REST and GraphQL API integrations.",
    highlight: "Whether it's payment gateways, CRM systems, analytics tools, or custom services, we ensure smooth data flow, real-time synchronisation, and reliable integration that scales with your business.",
    bullets: ["Secure REST & GraphQL API integrations", "Payment gateways, CRM & third-party service connections", "Real-time data sync & workflow automation"],
    imageLeft: true,
  },
  {
    id: "landing-page",
    title: "Landing Page Design & Development",
    image: "/images/landing-page-design.png",
    imageAlt: "Landing Page Design & Development illustration",
    description: "Your landing page is more than just a destination — it's a powerful conversion engine. We design and develop high-impact landing pages that are strategically crafted to capture attention, communicate value instantly, and drive visitor action.",
    highlight: "By combining compelling visuals, persuasive copy, and data-driven design principles, we create pages that guide visitors seamlessly toward your goals — whether that's a form submission, purchase, or enquiry.",
    bullets: ["Conversion-focused design & persuasive content", "Fast-loading, responsive & mobile-first layouts", "A/B testing & performance-driven optimisation"],
    imageLeft: false,
  },
  {
    id: "dashboard",
    title: "Custom Dashboard & Admin Panel Development",
    image: "/images/custom-dashboard-admin-panel.png",
    imageAlt: "Custom Dashboard & Admin Panel Development illustration",
    description: "Empower your business with intelligent control and complete visibility through custom-built dashboards and admin panels. We design and develop tailored management interfaces that simplify complex operations, streamline workflows, and provide real-time data insights.",
    highlight: "With a focus on usability, scalability, and performance, our dashboard solutions help you manage data efficiently, make informed decisions faster, and enhance overall team productivity.",
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

        /* ══ HERO ════════════════════════════════════════════════════════ */
        .wdev-hero{position:relative;min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#080808;overflow:hidden;padding:8rem 1.5rem 6rem;text-align:center;}
        .wdev-hero__orb{position:absolute;border-radius:50%;filter:blur(100px);animation:wdevOrbDrift 16s ease-in-out infinite alternate;pointer-events:none;}
        .wdev-hero__orb--1{width:540px;height:540px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-160px;left:-100px;opacity:.13;}
        .wdev-hero__orb--2{width:460px;height:460px;background:radial-gradient(circle,#f97316,#ea580c);bottom:-130px;right:-80px;opacity:.12;animation-delay:-8s;}
        .wdev-hero__orb--3{width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;right:15%;opacity:.07;animation-delay:-4s;}
        @keyframes wdevOrbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(32px,24px) scale(1.06)}}
        .wdev-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:60px 60px;}
        .wdev-hero__grain{position:absolute;inset:0;opacity:.03;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .wdev-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .wdev-corner--tl{top:24px;left:24px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .wdev-corner--tr{top:24px;right:24px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        .wdev-corner--bl{bottom:64px;left:24px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        .wdev-corner--br{bottom:64px;right:24px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}
        .wdev-hero__content{position:relative;z-index:10;max-width:860px;margin:0 auto;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        @keyframes wdevFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        .wdev-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .wdev-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:wdevPulse 2s ease-in-out infinite;}
        @keyframes wdevPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .wdev-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;}
        .wdev-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.2px #f97316;}
        .wdev-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        .wdev-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,2vw,1.1rem);font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto 2.6rem;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;}
        .wdev-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:wdevFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
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
          <div className="wdev-hero__orb wdev-hero__orb--1" />
          <div className="wdev-hero__orb wdev-hero__orb--2" />
          <div className="wdev-hero__orb wdev-hero__orb--3" />
          <div className="wdev-hero__grid" />
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
            and security — we engineer end-to-end digital solutions that connect,
            engage, and convert your audience into customers.
          </p>
          <a href="#services" className="wdev-hero__cta" aria-label="Explore web development services by 99 Visual Solutions">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
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
            At <strong>99 Visual Solutions</strong>, we go beyond creating websites — we design digital
            experiences that connect, engage, and inspire. As a trusted <strong>web design and development
            company</strong>, we combine creativity, strategy, and cutting-edge technology to deliver
            solutions that look stunning and perform flawlessly across every device.
          </p>
          <p className="wdev-intro__p">
            In today's fast-moving digital world, your website is the first impression customers have of
            your brand. That's why we create <strong>modern, responsive, and SEO-optimised websites</strong>{" "}
            tailored to your business goals — whether you are a startup, an enterprise, or an e-commerce brand
            looking to grow your online presence.
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
              Partnering with 99 Visual Solutions means more than just building a website — it means
              creating a lasting digital impact that drives real, measurable business growth.
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
            Get in touch with our team for a free consultation. We&apos;ll help you map out the right
            web development solution for your goals, timeline, and budget.
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