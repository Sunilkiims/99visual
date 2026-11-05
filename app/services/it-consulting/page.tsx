// app/services/it-consulting/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// IT Consulting — 99 Visual Solutions
//
// THIS REVISION: Hero fully aligned to the /services (hub) page hero, which
//   is now the shared master template across all service pages — same
//   layout, spacing, typography (Space Grotesk / Inter / IBM Plex Mono
//   scales and clamp() values), corner bracket positions, eyebrow/rule/sub
//   treatment, button styling, ticker mechanics, and responsive breakpoints
//   (desktop/tablet/mobile/small-mobile/short-screen). Only the hero
//   heading, description, artwork (banner image), and ticker content stay
//   page-specific — everything else (CSS values, structure, animations)
//   now matches the hub page exactly. The previous badge row (network/
//   security/cloud) has been removed since the hub template's hero has no
//   equivalent row.
//
//   All hero-area and page-wide "contact us" CTAs (hero primary, CTA
//   strip, sticky mobile CTA) now open the ContactPopup modal via the
//   shared ConsultationCTA client wrapper instead of navigating to
//   /contact, matching the hub page's CTA implementation.
//
// Unchanged: metadata, all schema nodes (org/local business/website/page/
// breadcrumb/service/FAQ), PAGE_CANONICAL handling, DATE_MODIFIED hardcoding,
// `benefits` and `services` copy (title/description/highlight/bullets),
// canonical/robots/OG/Twitter tags, H1/H2 hierarchy and text, sections below
// the hero, Header component.
//
// THIS EDIT: "Services · IT Consulting" eyebrow pill in the hero is now
//   orange (#FF8A2E) instead of blue. Only the pill (text, border,
//   background tint, pulsing dot) changed — the shared --itc-blue
//   variable used everywhere else on the page is untouched.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ServiceCTA, StickyCTA } from "@/app/components/premium/service/ServiceBlocks";


import type { Metadata } from "next";
import {
  FaCogs, FaShieldAlt, FaProjectDiagram,
  FaNetworkWired, FaHandsHelping, FaCloud,
  FaLaptopCode, FaMicrochip,
} from "react-icons/fa";

import {
  BASE,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  jsonLdString,
} from "@/lib/schema";

const BASE_SAFE      = BASE.replace(/\/$/, "");
const PAGE_CANONICAL = `${BASE_SAFE}/services/it-consulting`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "IT Consulting: Cloud, Cybersecurity & IoT",

  description:
    "End-to-end IT consulting: infrastructure planning, cloud migration (AWS, Azure, GCP), cybersecurity, IoT integration and IT project management.",

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
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/it-consulting']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES — unchanged
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

// FAQPage markup removed: Google requires FAQ structured data to mirror
// question/answer text that is visible on the page, and this page renders
// no FAQ section. Markup for invisible content is a structured-data policy
// violation (risk of a manual action). Re-add it alongside a visible FAQ.

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
    id: "installation-migration",
    title: "Installation & System Migration Services",
    description: "Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure.",
    highlight: "From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity, data integrity, and system performance throughout the transition.",
    bullets: ["Installation of servers, routers, systems & peripherals", "Data migration & system upgrades with minimal downtime", "Seamless integration with existing infrastructure and workflows"],
    icon: <FaCogs />,
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure Planning & Optimisation",
    description: "A strong digital foundation is critical for business growth and operational efficiency. We design and optimise IT infrastructures that are reliable, scalable, and aligned with your business goals, from network architecture to cloud environments.",
    highlight: "From network architecture to hybrid cloud environments, we ensure your systems are built for performance, security, and future expansion — enabling your business to scale with confidence.",
    bullets: ["Infrastructure design, assessment & capacity planning", "Cloud strategy, migration & resource optimisation", "Cost optimisation, system upgrades & performance tuning"],
    icon: <FaNetworkWired />,
  },
  {
    id: "cloud-transformation",
    title: "Cloud Migration & Digital Transformation",
    description: "Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and operational performance.",
    highlight: "Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape while reducing infrastructure costs.",
    bullets: ["Cloud strategy, migration & modernisation (AWS, Azure, GCP)", "Legacy system transformation & process automation", "Scalable, secure & cost-efficient cloud architecture design"],
    icon: <FaCloud />,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Risk Management",
    description: "In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and operational continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems.",
    highlight: "By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets industry compliance standards and protects against modern threats.",
    bullets: ["Risk assessment, vulnerability management & compliance support", "Threat monitoring, incident response & security audits", "Endpoint, network & application security implementation"],
    icon: <FaShieldAlt />,
  },
  {
    id: "project-management",
    title: "IT Project Management & Support",
    description: "Successful digital initiatives require more than just great ideas — they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management to ensure your projects are delivered on time, within budget, and aligned with your business goals.",
    highlight: "From planning and resource allocation to deployment and post-launch support, we manage every phase with precision — using agile methodologies, transparent reporting, and dedicated project ownership.",
    bullets: ["Agile project planning, execution & delivery management", "Resource management, risk mitigation & quality assurance", "Ongoing technical support, maintenance & performance monitoring"],
    icon: <FaProjectDiagram />,
  },
  {
    id: "software-consulting",
    title: "Software & Application Consulting",
    description: "Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities — providing strategic guidance on the right technologies and development approaches.",
    highlight: "Whether you're building from scratch, upgrading existing systems, or optimising performance, our consulting ensures your applications are efficient, secure, future-ready, and aligned with your business strategy.",
    bullets: ["Technology selection & solution architecture planning", "Application audit, optimisation & modernisation strategy", "Scalable, secure & performance-driven development guidance"],
    icon: <FaLaptopCode />,
  },
  {
    id: "iot",
    title: "IoT & Smart Device Integration",
    description: "Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven operational environments for businesses of all sizes.",
    highlight: "From sensors and automation systems to advanced analytics dashboards, our solutions help you monitor, control, and optimise operations in real time — reducing costs and improving decision-making across your organisation.",
    bullets: ["IoT device connectivity & architecture design", "Smart automation & sensor integration", "Real-time data monitoring, analytics & reporting dashboards"],
    icon: <FaMicrochip />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

const clusters = [
  {
    id: "infra-migration",
    eyebrow: "Infrastructure & Migration",
    heading: <>Build the <em>foundation</em> right, the first time</>,
    intro: "Installation, infrastructure planning, and cloud transformation — the groundwork everything else runs on.",
    cols: 3,
    ids: ["installation-migration", "it-infrastructure", "cloud-transformation"],
  },
  {
    id: "security-operations",
    eyebrow: "Security & Operations",
    heading: <>Stay protected, stay <em>on schedule</em></>,
    intro: "Cybersecurity and structured project delivery, so growth doesn't come at the cost of risk or missed timelines.",
    cols: 2,
    ids: ["cybersecurity", "project-management"],
  },
  {
    id: "software-connected",
    eyebrow: "Software & Connected Systems",
    heading: <>From applications to <em>connected devices</em></>,
    intro: "Software strategy and IoT integration for businesses building beyond a standard website or internal tool.",
    cols: 2,
    ids: ["software-consulting", "iot"],
  },
];

// Illustrative IT-ops log lines for the signature ticker band.

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ITConsulting() {
  const clusterSections = clusters.map((cluster, ci) => (
    <ServiceCluster
      key={cluster.id}
      id={`itc-cluster-h-${cluster.id}`}
      eyebrow={cluster.eyebrow}
      title={cluster.heading}
      intro={cluster.intro}
      surface={ci % 2 === 0}
      columns={cluster.cols === 3 ? 3 : 2}
      items={cluster.ids.map((id) => {
        const svc = serviceById(id);
        return { id: svc.id, title: svc.title, description: svc.description, highlight: svc.highlight, bullets: svc.bullets, icon: svc.icon };
      })}
    />
  ));

  return (
    <>
      <script
        id="schema-itc-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(itcGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="itc-hero-heading"
            crumbs={[{ href: '/', label: 'Home' }, { href: '/services', label: 'Services' }, { href: '/services/it-consulting', label: 'IT Consulting' }]}
            title="IT Consulting Services"
            tagline={<>Technology strategy measured in <em>uptime</em>, not slides</>}
            sub="Cloud migration, cybersecurity, infrastructure planning, IoT integration, and IT project management — end-to-end consulting that prepares your business for the digital future."
            image="/images/services/it-consulting-hero-banner.jpg"
            imageAlt="IT consulting: cloud infrastructure and network operations"
            ctaAria="Get a free IT consulting quote from 99 Visual Solutions"
            postTitle="IT Consulting"
            postUrl={PAGE_CANONICAL}
            secondary={{ href: '#services', label: 'Explore Services' }}
            points={['Cloud & migration', 'Cybersecurity', 'Infrastructure', 'IoT integration', 'Project delivery']}
          />

          <ServiceIntro id="itc-intro-heading" eyebrow="Our Philosophy" title={<>Strategic IT consulting for smarter, secure &amp; <em>scalable</em> businesses</>}>
            <p className="vz-lead">
              At <strong>99 Visual Solutions</strong>, we don&apos;t just solve IT challenges — we help you harness technology as a powerful growth driver. Our <strong>IT consulting services</strong> deliver strategic guidance, robust security, and scalable infrastructure designed to prepare your business for the digital future with confidence.
            </p>
            <p>
              Whether you&apos;re modernising legacy systems, migrating to the cloud, or strengthening cybersecurity, our experts partner with you to deliver <strong>sustainable, cost-effective, and future-ready IT solutions</strong> tailored precisely to your business goals and industry requirements.
            </p>
          </ServiceIntro>

          <div id="services">{clusterSections}</div>

          <FeatureGrid
            id="itc-benefits-heading"
            eyebrow="Why Choose Us?"
            title={<>Partnering with <em>99 Visual</em> IT Consulting</>}
            lead="IT isn't just a support function — it becomes a competitive advantage. Here's how we empower businesses with strategic technology."
            items={benefits.map((b) => ({ title: b.title, description: b.description, icon: b.icon }))}
          />

          <ServiceCTA
            id="itc-cta-heading"
            title={<>Ready to transform your <em>IT infrastructure</em>?</>}
            sub="Get in touch with our team for a free consultation. We'll help you map out the right IT strategy to achieve your goals and future-proof your business."
            ctaAria="Get a free IT consulting consultation from 99 Visual Solutions"
            postTitle="IT Consulting"
            postUrl={PAGE_CANONICAL}
          />
          <RelatedInsights serviceHref="/services/it-consulting" />
        </main>
        <Footer />
        <StickyCTA postTitle="IT Consulting" postUrl={PAGE_CANONICAL} />
      </div>
    </>
  );
}
