// app/services/digital-marketing-seo/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Digital Marketing & SEO — 99 Visual Solutions
//
// THIS REVISION: Hero redesigned to match the full-bleed photo banner
//   treatment now used on /services/website-development, /services/it-consulting,
//   /services/visualization, and /services (the hub page) — photo as CSS
//   background with a dark gradient overlay, grain texture, and corner
//   brackets, single left-aligned text column. Replaces the previous
//   two-column hero (text + inline SVG "rank-climb" chart card). The chart
//   component has been removed since it's no longer rendered anywhere on
//   the page. The "ranking ticker" marquee that used to sit in its own
//   dark strip below the hero now docks to the bottom edge of the hero
//   itself, same mechanism as the tickers on the other redesigned pages.
//   Save your banner image to:
//   /public/images/services/digital-marketing-seo-hero-banner.jpg
//
//   All indexing/schema fixes from prior revisions are RETAINED UNCHANGED:
//   canonical/base handling, robots block, hardcoded dateModified, FAQ
//   schema/content parity via the shared `dmFaqs` array + <FaqSection />,
//   breadcrumbFromItems(), CONTACT_EMAIL, dm- CSS prefix, sr-only breadcrumb.
//   No metadata, schema, routing, or Header changes.
//
//   Everything else on the page — intro/stats, the four service clusters,
//   the MindTrick.io spotlight, benefits grid, FAQ, and CTA strip — is
//   unchanged from the previous revision. A sticky mobile CTA bar was added
//   to match the other redesigned service pages.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";


import type { Metadata } from "next";
import {
  FaSearch, FaTools, FaPenNib, FaLink,
  FaAd, FaHashtag,
  FaFeatherAlt, FaEnvelope, FaRobot,
  FaMapMarkerAlt, FaPalette, FaBrain,
  FaBullhorn, FaChartLine, FaMobileAlt, FaEnvelopeOpenText, FaHandshake,
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
// Trailing-slash guard (unchanged).
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE = BASE.replace(/\/$/, "");

const PAGE_CANONICAL = `${BASE_SAFE}/services/digital-marketing-seo`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Digital Marketing & SEO Services | SEO, PPC — 99 Visual",

  description:
    "99 Visual Solutions delivers full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content marketing, email automation, local SEO, link building, and promotional video — built for ROI.",

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
    title:       "Digital Marketing & SEO Services | SEO, PPC & Social Media — 99 Visual",
    description: "From SEO and PPC to Meta Ads, content marketing, email campaigns, local SEO, link building, and promotional videos — 99 Visual Solutions delivers data-driven digital marketing for measurable ROI.",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/digital-marketing-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "Digital Marketing & SEO Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Digital Marketing & SEO | SEO, PPC, Social Media — 99 Visual",
    description: "SEO, PPC, Meta Ads, social media, content marketing, email automation & promotional video — performance-driven digital marketing by 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/digital-marketing-og.jpg`,
        alt: "Digital Marketing & SEO Services by 99 Visual Solutions",
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
// DATES (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = "2025-06-01"; // <- Update this when content changes

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA (unchanged -- all URLs use BASE_SAFE + PAGE_CANONICAL)
// ─────────────────────────────────────────────────────────────────────────────

const dmBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: `${BASE_SAFE}/` },
  { name: "Services",                url: `${BASE_SAFE}/services` },
  { name: "Digital Marketing & SEO", url: PAGE_CANONICAL },
]);

const dmServiceNode = {
  ...serviceSchema({
    name:        "Digital Marketing & SEO Services",
    description: "Full-spectrum digital marketing including SEO, PPC, Meta Ads, social media marketing, content marketing, email marketing, local SEO, link building, marketing automation, and promotional video.",
    pathname:    "/services/digital-marketing-seo",
    image:       `${BASE_SAFE}/images/services/digital-marketing-og.jpg`,
  }),
  "@id": `${PAGE_CANONICAL}#service`,
  serviceType: "Digital Marketing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Digital Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Search Engine Optimization (SEO)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pay-Per-Click Advertising (PPC)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads & Social Media Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & Email Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "On-Page Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Off-Page SEO & Link Building" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Creative Banner & Promotional Video" } },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ -- unchanged: shared array feeds BOTH schema and the visible section.
// ─────────────────────────────────────────────────────────────────────────────
const dmFaqs = [
  {
    question: "What digital marketing services does 99 Visual Solutions offer?",
    answer:
      `We offer SEO (on-page, off-page, technical, local), PPC advertising on Google Ads, Meta Ads on Facebook and Instagram, social media marketing, content marketing, email marketing and automation, link building, on-page optimisation, creative banner design, and promotional video production. Contact us at ${CONTACT_EMAIL} for a free digital marketing consultation tailored to your business goals.`,
  },
  {
    question: "Do you manage Google Ads and Meta Ads campaigns?",
    answer:
      "Yes, we manage end-to-end PPC campaigns on Google Ads as well as paid social campaigns on Facebook, Instagram, and LinkedIn, including strategy, creative design, audience targeting, and continuous optimisation. Our paid media specialists focus on maximising return on ad spend (ROAS) and reducing cost per lead through data-driven campaign management and regular performance reporting.",
  },
  {
    question: "What is MindTrick.io?",
    answer:
      "MindTrick.io is our dedicated digital marketing hub focused on delivering result-oriented, data-driven marketing solutions — from performance marketing and SEO to brand storytelling and content strategy. It brings together our full digital marketing expertise under one platform, helping businesses build strong online visibility, generate quality leads, and achieve sustainable growth in competitive digital markets.",
  },
  {
    question: "How do you measure digital marketing performance?",
    answer:
      "We track key metrics including organic traffic growth, keyword ranking improvements, conversion rates, cost per lead, return on ad spend (ROAS), and social engagement rates. We provide regular performance reports using Google Analytics 4, Google Search Console, and campaign dashboards. Our data-driven approach ensures every strategy is continuously optimised based on measurable outcomes and client business goals.",
  },
];

const dmFaqNode = {
  ...faqSchema(dmFaqs),
  "@id":            `${PAGE_CANONICAL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_CANONICAL}#webpage` },
};

const dmPageNode = {
  "@type":       "WebPage",
  "@id":         `${PAGE_CANONICAL}#webpage`,
  url:           PAGE_CANONICAL,
  name:          "Digital Marketing & SEO Services | SEO, PPC — 99 Visual Solutions",
  description:   "Full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content & email marketing, local SEO, link building, marketing automation, and promotional video.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE_SAFE}/images/services/digital-marketing-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Digital Marketing & SEO Services by 99 Visual Solutions",
  },
  speakable:       { "@type": "SpeakableSpecification", cssSelector: [".dm-hero__h1", ".dm-hero__sub"] },
  breadcrumb:      { "@id": `${PAGE_CANONICAL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_CANONICAL] },
};

const dmGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  dmPageNode,
  dmBreadcrumbNode,
  dmServiceNode,
  dmFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaSearch />,           title: "Search Engine Visibility", description: "We optimise websites with proven SEO strategies to boost rankings, drive qualified organic traffic, and increase conversions across all major search engines." },
  { icon: <FaBullhorn />,         title: "Brand Awareness",          description: "Our campaigns build strong online visibility, ensuring your brand connects with the right audience at the right time across digital channels." },
  { icon: <FaChartLine />,        title: "Data-Driven Growth",       description: "We analyse performance metrics to continuously refine strategies, maximising ROI and delivering measurable, reportable outcomes for every campaign." },
  { icon: <FaMobileAlt />,        title: "Cross-Platform Reach",     description: "From social media to mobile-first campaigns, we ensure your brand reaches users on every platform and device where they spend their time." },
  { icon: <FaEnvelopeOpenText />, title: "Engaging Campaigns",       description: "We craft content, email, and ad campaigns that inspire action and build lasting customer loyalty through personalised, value-driven messaging." },
  { icon: <FaHandshake />,        title: "End-to-End Support",       description: "From strategy to execution, we provide continuous campaign optimisation, transparent reporting, and ongoing support throughout the engagement." },
];

// Service copy is unchanged from the previous revision. Only presentation
// fields (icon, category grouping) were added; image/imageAlt/imageLeft
// were removed since the redesign uses a single inline icon system instead
// of the twelve unmatched illustration PNGs.
const services = [
  { id:"seo", category:"foundational", icon:<FaSearch/>, title:"Search Engine Optimization (SEO)", description:"In a competitive digital landscape, visibility is everything. Our SEO services are designed to position your business at the top of search engine results, driving high-quality organic traffic and long-term sustainable growth for your brand.", highlight:"We combine strategic keyword research, technical optimisation, and content excellence to ensure your website not only ranks higher but also delivers real value to your audience at every stage of their journey.", bullets:["Keyword research & on-page optimisation","Technical SEO audits & fixes","High-quality backlink strategies"] },
  { id:"technical-seo", category:"foundational", icon:<FaTools/>, title:"Technical SEO", description:"A strong SEO strategy starts with a solid technical foundation. Our Technical SEO services focus on optimising your website's structure, performance, and crawlability to ensure search engines can efficiently access, understand, and rank your content.", highlight:"From fixing indexing issues to improving site speed and implementing structured data, we enhance every technical aspect that impacts your search engine visibility and Core Web Vitals scores.", bullets:["Website audit, crawlability & indexing optimisation","Core Web Vitals, speed & mobile performance enhancement","Structured data, schema markup & technical issue resolution"] },
  { id:"onpage", category:"foundational", icon:<FaPenNib/>, title:"On-Page Optimisation", description:"Maximise your website's visibility and relevance with strategic on-page optimisation. We fine-tune every element of your web pages — from content and keywords to meta tags and internal linking — to align with search engine algorithms and user intent.", highlight:"Our approach enhances both discoverability and user experience, helping your pages rank higher, engage visitors more effectively, and drive meaningful conversions across every key landing page.", bullets:["Keyword optimisation, meta tags & content structuring","Internal linking, URL optimisation & image SEO","User experience enhancements & search intent alignment"] },
  { id:"offpage", category:"foundational", icon:<FaLink/>, title:"Off-Page SEO & Link Building", description:"Strengthen your website's authority and credibility with powerful off-page SEO and strategic link building. We focus on building high-quality, relevant backlinks from trusted sources to improve your search engine rankings and domain authority.", highlight:"Through ethical white-hat practices and targeted outreach strategies, we enhance your domain authority, increase brand visibility across the web, and drive valuable referral traffic to your site.", bullets:["High-quality backlink acquisition & outreach campaigns","Guest posting, citations & brand mentions","Authority building, referral traffic & ranking improvement"] },

  { id:"ppc", category:"paid-social", icon:<FaAd/>, title:"Pay-Per-Click (PPC) Advertising", description:"Drive instant visibility and measurable results with strategic Pay-Per-Click advertising. We create and manage high-performing ad campaigns that place your business in front of the right audience at the right time across Google's search and display networks.", highlight:"By combining smart keyword targeting, compelling ad creatives, and continuous optimisation, we ensure maximum return on your ad spend while keeping your cost per acquisition competitive.", bullets:["Keyword research, bid management & campaign strategy","Social media ad management","Continuous monitoring, A/B testing & ROI optimisation"] },
  { id:"meta-ads", category:"paid-social", icon:<FaHashtag/>, title:"Meta Ads & Social Media Marketing", description:"Amplify your brand's reach and engagement with strategic Meta Ads and social media marketing. We create data-driven campaigns across Facebook and Instagram that not only capture attention but also convert audiences into loyal customers over time.", highlight:"By combining compelling creatives, precise audience targeting, and continuous optimisation, we ensure your brand stands out in crowded digital spaces and delivers consistent, measurable results.", bullets:["Facebook, Instagram, LinkedIn & Twitter marketing","Paid social ad campaigns","Analytics & engagement tracking"] },

  { id:"content-marketing", category:"content-lifecycle", icon:<FaFeatherAlt/>, title:"Content Marketing", description:"Turn your brand into a trusted voice with strategic, value-driven content marketing. We create and distribute high-quality content that educates, engages, and inspires your audience across every stage of their buyer journey.", highlight:"By aligning content with your business goals and audience search intent, we help you drive consistent organic traffic, improve engagement metrics, and increase conversions over time.", bullets:["Content strategy, planning & audience targeting","Blog writing, articles & SEO-driven content creation","Content distribution, engagement & performance optimisation"] },
  { id:"email-marketing", category:"content-lifecycle", icon:<FaEnvelope/>, title:"Content & Email Marketing", description:"Build meaningful connections with your audience through strategic content and personalised email marketing. We create compelling, value-driven content that attracts, engages, and nurtures your audience at every stage of their customer journey.", highlight:"From blog posts and website content to targeted email campaigns, our approach focuses on delivering the right message to the right audience at the right time — maximising engagement and driving measurable conversions.", bullets:["Content strategy, creation & storytelling","Email campaign design, automation & audience segmentation","Performance tracking, personalisation & conversion optimisation"] },
  { id:"automation", category:"content-lifecycle", icon:<FaRobot/>, title:"Marketing Automation", description:"Streamline your marketing efforts and deliver personalised experiences at scale with powerful marketing automation solutions. We help you automate repetitive tasks, nurture leads effectively, and engage your audience with the right message at precisely the right time.", highlight:"By integrating smart automation tools and data-driven workflows, we enhance operational efficiency, improve the customer journey from awareness to conversion, and maximise your marketing ROI.", bullets:["Automated workflows, lead nurturing & customer journeys","CRM integration, segmentation & personalised campaigns","Performance tracking, analytics & continuous optimisation"] },

  { id:"local-seo", category:"local-creative", icon:<FaMapMarkerAlt/>, title:"Local SEO", description:"Make your business stand out in your local market and attract customers right when they need you. Our Local SEO services are designed to boost your visibility in location-based searches, helping you connect with nearby audiences and drive local enquiries.", highlight:"From optimising your business listings to managing reviews and local keywords, we ensure your brand ranks higher in local search results and Google Maps — capturing high-intent local traffic.", bullets:["Google Business Profile optimisation & local listings management","Location-based keyword targeting & on-page optimisation","Review management, citations & local ranking improvements"] },
  { id:"creative", category:"local-creative", icon:<FaPalette/>, title:"Creative Banner & Promotional Video", description:"Capture attention and make a lasting impression with visually compelling banners and engaging promotional videos. We design high-impact creatives that communicate your brand message effectively across all digital platforms and advertising channels.", highlight:"From eye-catching display ads to dynamic video content, our creative solutions are crafted to boost engagement, enhance brand recall, and drive measurable conversions across digital platforms.", bullets:["Custom banner designs for ads, websites & social media","Promotional videos, motion graphics & brand storytelling","Platform-optimised creatives for maximum engagement & ROI"] },

  { id:"mindtrick", category:"platform", icon:<FaBrain/>, title:"MindTrick.io – Our Dedicated Digital Marketing Hub", description:"At MindTrick.io, we bring together innovation, creativity, and data-driven strategies to power your digital growth. As our dedicated digital marketing hub, MindTrick.io delivers result-oriented solutions that help businesses build strong online visibility and achieve sustainable success.", highlight:"From performance marketing to brand storytelling, we combine cutting-edge tools with expert insights to craft campaigns that truly make a measurable impact on your business's digital presence and revenue.", bullets:["End-to-end digital marketing solutions under one platform","Data-driven campaigns focused on growth & ROI","Expert strategies, creative execution & continuous optimisation"] },
];

const clusters = [
  {
    id: "foundational",
    eyebrow: "Foundational SEO",
    heading: <>Rank on a <em>technical foundation</em>, not luck</>,
    intro: "The structural layer every other channel depends on — crawlable, fast, and built to hold rankings.",
    cols: 2,
    ids: ["seo", "technical-seo", "onpage", "offpage"],
  },
  {
    id: "paid-social",
    eyebrow: "Paid & Social",
    heading: <>Pay for attention, <em>earn</em> the click</>,
    intro: "Immediate visibility on search and social, managed toward cost per acquisition — not just impressions.",
    cols: 2,
    ids: ["ppc", "meta-ads"],
  },
  {
    id: "content-lifecycle",
    eyebrow: "Content & Lifecycle",
    heading: <>Turn attention into <em>relationships</em></>,
    intro: "Content, email, and automation working as one system to nurture leads long after the first click.",
    cols: 3,
    ids: ["content-marketing", "email-marketing", "automation"],
  },
  {
    id: "local-creative",
    eyebrow: "Local & Creative",
    heading: <>Show up nearby, stand out <em>everywhere</em></>,
    intro: "Local search presence paired with the creative assets that make campaigns actually get noticed.",
    cols: 2,
    ids: ["local-seo", "creative"],
  },
];

// Illustrative keyword ranking movements for the signature ticker band —
// now docked to the bottom edge of the hero itself, same mechanism as the
// tickers on the other redesigned service pages.
const pipeline = [
  { term: "plumbers near me", from: "#38", to: "#4" },
  { term: "roof repair houston", from: "#52", to: "#6" },
  { term: "best seo agency", from: "#21", to: "#2" },
  { term: "meta ads management", from: "#44", to: "#5" },
  { term: "b2b lead generation", from: "#61", to: "#9" },
  { term: "local seo services", from: "#33", to: "#3" },
  { term: "ppc campaign audit", from: "#47", to: "#7" },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ SECTION -- unchanged content/behaviour, restyled to the new system.
// ─────────────────────────────────────────────────────────────────────────────
function FaqSection() {
  return (
    <section className="dm-faq" aria-labelledby="dm-faq-heading" id="dm-faq">
      <div className="dm-faq__inner">
        <div className="dm-faq__head">
          <span className="dm-faq__label">FAQ</span>
          <h2 className="dm-faq__h2" id="dm-faq-heading">
            Common <em>questions</em>
          </h2>
        </div>
        <div className="dm-faq__list">
          {dmFaqs.map((f) => (
            <div className="dm-faq-item" key={f.question}>
              <h3 className="dm-faq-item__q">{f.question}</h3>
              <p className="dm-faq-item__a">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function DigitalMarketing() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .dm-page{
          --dm-ink:#12141A; --dm-muted:#5B6172; --dm-paper:#F5F6F8; --dm-surface:#FFFFFF;
          --dm-line:#E4E6EC; --dm-blue:#2E5CFF; --dm-green:#37D67A;
          background:var(--dm-paper);
        }
        .dm-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        /* ══ HERO — full-bleed photo banner, same treatment as the
           website-development / it-consulting pages: photo as CSS
           background with a dark gradient overlay so the text column
           stays legible. Save your banner image to:
           /public/images/services/digital-marketing-seo-hero-banner.jpg ── */
        .dm-hero{
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/digital-marketing-seo-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        /* Fixed (not min-) height, so the section can never grow taller
           than one screen and push the ticker bar below the fold. dvh/svh
           account for mobile browser chrome so the banner never shows a
           gap or clips; falls back to 100vh. */
        @supports (height: 100svh) { .dm-hero { height: 100svh; } }
        @supports (height: 100dvh) { .dm-hero { height: 100dvh; } }
        @media(max-width:960px){
          .dm-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/digital-marketing-seo-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        /* Main hero content: fills the remaining space above the ticker
           and centers vertically within it. Header clearance and the
           left/right gutters live here (not on the fixed-height section)
           so the ticker's own height is never squeezed out. */
        .dm-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:8rem 1.5rem 1.5rem;
          padding-top:max(8rem, calc(env(safe-area-inset-top) + 6rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .dm-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .dm-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .dm-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        /* Short screens (landscape phones, small laptop windows with
           browser chrome): trim vertical rhythm and drop the badge row
           so everything still fits above the ticker without scrolling. */
        @media(max-height:520px){
          .dm-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .dm-hero__eyebrow{ margin-bottom:.7rem; }
          .dm-hero__h1{ margin-bottom:.6rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .dm-hero__sub{ margin-bottom:.9rem; }
          .dm-hero__ctas{ margin-bottom:0; }
          .dm-hero__badges{ display:none; }
        }

        .dm-hero__grain{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .dm-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .dm-corner--tl{top:24px;left:24px;border-top:1px solid var(--dm-blue);border-left:1px solid var(--dm-blue);}
        .dm-corner--tr{top:24px;right:24px;border-top:1px solid var(--dm-blue);border-right:1px solid var(--dm-blue);}
        .dm-corner--bl{bottom:24px;left:24px;border-bottom:1px solid var(--dm-blue);border-left:1px solid var(--dm-blue);}
        .dm-corner--br{bottom:24px;right:24px;border-bottom:1px solid var(--dm-blue);border-right:1px solid var(--dm-blue);}

        .dm-hero__content{animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;max-width:640px;}
        @keyframes dmFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.dm-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .dm-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--dm-blue);border:1px solid rgba(46,92,255,.28);background:rgba(46,92,255,.08);padding:6px 16px;border-radius:100px;margin-bottom:1.6rem;backdrop-filter:blur(8px);}
        .dm-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--dm-blue);animation:dmPulse 2s ease-in-out infinite;}
        @keyframes dmPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .dm-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4.4vw,3.4rem);font-weight:700;line-height:1.12;letter-spacing:-.015em;color:#fff;margin:0 0 1.1rem;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .dm-hero__h1 em{font-style:normal;color:var(--dm-blue);}
        .dm-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.98rem,1.3vw,1.08rem);font-weight:300;line-height:1.7;color:rgba(255,255,255,0.78);max-width:520px;margin:0 0 2rem;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.dm-hero__sub{margin:0 auto 2rem;}}

        .dm-hero__ctas{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:2rem;}
        @media(max-width:960px){.dm-hero__ctas{justify-content:center;}}
        .dm-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--dm-blue));padding:13px 28px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .dm-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .dm-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);}
        .dm-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .dm-hero__badges{display:flex;flex-wrap:wrap;gap:1.5rem;}
        @media(max-width:960px){.dm-hero__badges{justify-content:center;}}
        .dm-hero__badge{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:.76rem;font-weight:500;color:rgba(255,255,255,0.65);}
        .dm-hero__badge svg{color:var(--dm-blue);flex-shrink:0;}

        /* ══ TICKER — docked as a normal flex child at the bottom of the
           fixed-height hero (not position:absolute), so it can never end
           up below the fold regardless of how tall the content above it
           is — it always renders inside the first screen. ═══════════════ */
        .dm-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .dm-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .dm-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:dmScroll 32s linear infinite;}
        .dm-hero__ticker-bar:hover .dm-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .dm-ticker__track{ animation-duration:20s; } }
        @keyframes dmScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .dm-ticker__item{display:flex;align-items:center;gap:.5rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .dm-ticker__item b{color:rgba(255,255,255,.85);font-weight:500;}
        .dm-ticker__up{color:var(--dm-green);}
        .dm-ticker__caption{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:clamp(.6rem,1.5vw,.66rem);color:rgba(255,255,255,.4);margin:0;padding:.3rem 1rem 0;}
        @media(max-height:520px){
          .dm-hero__ticker-bar{ padding-top:.75rem; }
          .dm-ticker__caption{ display:none; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .dm-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--dm-line);}
        @media(max-width:760px){.dm-sticky-cta{display:flex;justify-content:center;}}
        .dm-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--dm-ink);padding:13px 20px;border-radius:10px;text-decoration:none;}

        /* INTRO / DEFINITION */
        .dm-intro{padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);background:var(--dm-surface);}
        .dm-intro__inner{max-width:920px;margin:0 auto;}
        .dm-intro__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--dm-blue);margin-bottom:1rem;display:block;}
        .dm-intro__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--dm-ink);margin:0 0 1.2rem;max-width:640px;}
        .dm-intro__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--dm-muted);max-width:680px;margin:0 0 2.5rem;}
        .dm-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        @media(max-width:768px){.dm-stats{grid-template-columns:1fr;}}
        .dm-stat{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:14px;padding:1.4rem 1.5rem;}
        .dm-stat__num{font-family:'Space Grotesk',sans-serif;font-size:1.6rem;font-weight:700;color:var(--dm-ink);}
        .dm-stat__label{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--dm-muted);margin-top:.3rem;}

        /* SERVICE CLUSTERS */
        .dm-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-cluster:nth-child(even){background:var(--dm-surface);}
        .dm-cluster__inner{max-width:1180px;margin:0 auto;}
        .dm-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .dm-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .dm-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--dm-ink);margin:0 0 .6rem;}
        .dm-cluster__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--dm-muted);margin:0;}
        .dm-cluster__grid{display:grid;gap:1.25rem;}
        .dm-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        .dm-cluster__grid--3{grid-template-columns:repeat(3,1fr);}
        @media(max-width:860px){.dm-cluster__grid--2,.dm-cluster__grid--3{grid-template-columns:1fr;}}

        .dm-card{background:var(--dm-surface);border:1px solid var(--dm-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .dm-cluster:nth-child(even) .dm-card{background:var(--dm-paper);}
        .dm-card:hover{border-color:var(--dm-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .dm-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--dm-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .dm-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.08rem;font-weight:600;color:var(--dm-ink);margin:0 0 .7rem;}
        .dm-card__desc{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0 0 .8rem;}
        .dm-card__highlight{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:400;line-height:1.7;color:var(--dm-ink);border-left:2px solid var(--dm-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .dm-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .dm-card__bullets li{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--dm-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .dm-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--dm-blue);margin-top:.5rem;flex-shrink:0;}

        /* MINDTRICK SPOTLIGHT */
        .dm-spotlight{padding:5rem 1.5rem;background:var(--dm-ink);border-bottom:1px solid var(--dm-line);}
        .dm-spotlight__inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.2fr .8fr;gap:3rem;align-items:center;}
        @media(max-width:860px){.dm-spotlight__inner{grid-template-columns:1fr;}}
        .dm-spotlight__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-green);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .dm-spotlight__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:#fff;margin:0 0 1rem;}
        .dm-spotlight__p{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,.62);margin:0 0 1rem;}
        .dm-spotlight__highlight{font-family:'Inter',sans-serif;font-size:.88rem;line-height:1.75;color:rgba(255,255,255,.8);border-left:2px solid var(--dm-green);padding-left:1rem;margin:0 0 1.5rem;}
        .dm-spotlight__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.6rem;}
        .dm-spotlight__bullets li{font-family:'Inter',sans-serif;font-size:.85rem;color:rgba(255,255,255,.85);display:flex;gap:.6rem;}
        .dm-spotlight__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--dm-green);margin-top:.55rem;flex-shrink:0;}
        .dm-spotlight__panel{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:2rem;display:flex;flex-direction:column;gap:1.3rem;}
        .dm-spotlight__stat{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:1.1rem;}
        .dm-spotlight__stat:last-child{border-bottom:none;padding-bottom:0;}
        .dm-spotlight__stat-num{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;}
        .dm-spotlight__stat-label{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:rgba(255,255,255,.5);}

        /* BENEFITS */
        .dm-benefits{padding:5.5rem 1.5rem;}
        .dm-benefits__inner{max-width:1180px;margin:0 auto;}
        .dm-benefits__head{max-width:560px;margin-bottom:3rem;}
        .dm-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-benefits__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}
        .dm-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.dm-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.dm-benefits__grid{grid-template-columns:1fr;}}
        .dm-benefit-card{background:var(--dm-surface);border:1px solid var(--dm-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .dm-benefit-card:hover{border-color:var(--dm-blue);transform:translateY(-3px);}
        .dm-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--dm-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .dm-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--dm-ink);margin-bottom:.5rem;}
        .dm-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--dm-muted);}

        /* FAQ */
        .dm-faq{background:var(--dm-surface);border-top:1px solid var(--dm-line);border-bottom:1px solid var(--dm-line);padding:5.5rem 1.5rem;}
        .dm-faq__inner{max-width:820px;margin:0 auto;}
        .dm-faq__head{margin-bottom:2.5rem;}
        .dm-faq__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .dm-faq__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.1rem);font-weight:700;line-height:1.2;color:var(--dm-ink);margin:0;}
        .dm-faq__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-faq__list{display:flex;flex-direction:column;gap:1rem;}
        .dm-faq-item{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:14px;padding:1.5rem 1.7rem;}
        .dm-faq-item__q{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--dm-ink);margin:0 0 .6rem;}
        .dm-faq-item__a{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin:0;}

        /* CTA */
        .dm-cta{padding:5.5rem 1.5rem;text-align:center;background:var(--dm-surface);border-top:1px solid var(--dm-line);}
        .dm-cta__inner{max-width:560px;margin:0 auto;}
        .dm-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .dm-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--dm-ink);margin:0 0 1rem;}
        .dm-cta__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin-bottom:2.2rem;}
        .dm-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--dm-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .dm-cta__btn:hover{background:var(--dm-blue);transform:translateY(-2px);}

        @media(prefers-reduced-motion:reduce){
          .dm-page *,.dm-page *::before,.dm-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-dm-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dmGraph) }}
      />

      <div className="dm-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════
            Full-bleed photo banner (set as the section's CSS background —
            see .dm-hero in <style> above), same treatment as the
            website-development and it-consulting pages, replacing the
            previous two-column layout with the inline SVG "rank-climb"
            chart card. A dark gradient overlay keeps the white/blue text
            legible over the photo. */}
        <section className="dm-hero" aria-labelledby="dm-hero-heading">
          <div aria-hidden="true">
            <div className="dm-hero__grain" />
          </div>
          <div className="dm-corner dm-corner--tl" aria-hidden="true" />
          <div className="dm-corner dm-corner--tr" aria-hidden="true" />
          <div className="dm-corner dm-corner--bl" aria-hidden="true" />
          <div className="dm-corner dm-corner--br" aria-hidden="true" />

          <nav className="dm-sr-only" aria-label="Breadcrumb">
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
                <a href="/services/digital-marketing-seo" itemProp="item" aria-current="page">
                  <span itemProp="name">Digital Marketing &amp; SEO</span>
                </a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="dm-hero__inner">
            <div className="dm-hero__content">
              <div className="dm-hero__eyebrow">
                <span className="dm-hero__dot" />
                Services · Digital Marketing &amp; SEO
              </div>
              <h1 className="dm-hero__h1" id="dm-hero-heading">
                Marketing measured in <em>rankings</em>,<br />leads, and revenue
              </h1>
              <p className="dm-hero__sub">
                SEO, PPC, Meta Ads, content, email, and promotional video — run as
                one connected system, reported against the numbers that actually
                move your business.
              </p>

              <div className="dm-hero__ctas">
                <a href="#services" className="dm-hero__cta" aria-label="Explore digital marketing and SEO services">
                  Explore Services
                </a>
                <Link href="/contact" className="dm-hero__cta dm-hero__cta--ghost" aria-label="Get a free digital marketing consultation">
                  Get a Free Consultation
                </Link>
              </div>

              <div className="dm-hero__badges" aria-hidden="true">
                <span className="dm-hero__badge"><FaSearch /> Search-first strategy</span>
                <span className="dm-hero__badge"><FaChartLine /> Reported against ROI</span>
                <span className="dm-hero__badge"><FaBullhorn /> Full-funnel campaigns</span>
              </div>
            </div>
          </div>

          {/*
            Ticker docks to the bottom edge of the hero itself (not a
            separate section below it), so the scrolling ranking-movement
            line and the photo banner render together as a single
            full-screen unit on every screen size. A soft gradient behind
            it keeps the text legible over the photo without a hard color
            break.
          */}
          <div className="dm-hero__ticker-bar" aria-hidden="true">
            <div className="dm-ticker">
              <div className="dm-ticker__track">
                {[...pipeline, ...pipeline].map((t, i) => (
                  <span className="dm-ticker__item" key={i}>
                    <b>{t.term}</b> {t.from} <span className="dm-ticker__up">{"->"} {t.to} ▲</span>
                  </span>
                ))}
              </div>
            </div>
            <p className="dm-ticker__caption">Illustrative keyword ranking movements</p>
          </div>
        </section>

        {/* INTRO / DEFINITION (GEO-ready clear answer) */}
        <section className="dm-intro" aria-labelledby="dm-intro-heading">
          <div className="dm-intro__inner">
            <span className="dm-intro__label">What we do</span>
            <h2 className="dm-intro__h2" id="dm-intro-heading">
              Full-funnel marketing, <em>run like a product</em>
            </h2>
            <p className="dm-intro__p">
              99 Visual Solutions is a digital marketing and SEO partner that plans,
              builds, and manages search, paid, social, content, and email programs
              under a single strategy — so every channel compounds the others
              instead of competing with them for budget and attention.
            </p>
            <div className="dm-stats">
              <div className="dm-stat">
                <div className="dm-stat__num">12</div>
                <div className="dm-stat__label">Disciplines under one roof</div>
              </div>
              <div className="dm-stat">
                <div className="dm-stat__num">1</div>
                <div className="dm-stat__label">Reporting dashboard, full visibility</div>
              </div>
              <div className="dm-stat">
                <div className="dm-stat__num">100%</div>
                <div className="dm-stat__label">Decisions backed by data, not guesses</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE CLUSTERS */}
        <div id="services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="dm-cluster" aria-labelledby={`dm-cluster-h-${cluster.id}`}>
              <div className="dm-cluster__inner">
                <div className="dm-cluster__head">
                  <span className="dm-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="dm-cluster__h2" id={`dm-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="dm-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`dm-cluster__grid dm-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="dm-card" id={svc.id} key={svc.id} aria-labelledby={`dm-card-h-${svc.id}`}>
                        <div className="dm-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="dm-card__title" id={`dm-card-h-${svc.id}`}>{svc.title}</h3>
                        <p className="dm-card__desc">{svc.description}</p>
                        <p className="dm-card__highlight">{svc.highlight}</p>
                        <ul className="dm-card__bullets">
                          {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}

          {/* MINDTRICK SPOTLIGHT -- structurally distinct, so it gets its own layout */}
          {(() => {
            const mt = serviceById("mindtrick");
            return (
              <section className="dm-spotlight" id={mt.id} aria-labelledby="dm-spotlight-heading">
                <div className="dm-spotlight__inner">
                  <div>
                    <span className="dm-spotlight__eyebrow">Our Platform</span>
                    <h2 className="dm-spotlight__h2" id="dm-spotlight-heading">{mt.title}</h2>
                    <p className="dm-spotlight__p">{mt.description}</p>
                    <p className="dm-spotlight__highlight">{mt.highlight}</p>
                    <ul className="dm-spotlight__bullets">
                      {mt.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                  <div className="dm-spotlight__panel" aria-hidden="true">
                    <div className="dm-spotlight__stat">
                      <span className="dm-spotlight__stat-num">10+</span>
                      <span className="dm-spotlight__stat-label">Channels unified</span>
                    </div>
                    <div className="dm-spotlight__stat">
                      <span className="dm-spotlight__stat-num">1</span>
                      <span className="dm-spotlight__stat-label">Strategy, cross-channel</span>
                    </div>
                    <div className="dm-spotlight__stat">
                      <span className="dm-spotlight__stat-num">∞</span>
                      <span className="dm-spotlight__stat-label">Iteration, always optimising</span>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}
        </div>

        {/* BENEFITS */}
        <section className="dm-benefits" aria-labelledby="dm-benefits-heading">
          <div className="dm-benefits__inner">
            <div className="dm-benefits__head">
              <span className="dm-benefits__label">Why Choose Us?</span>
              <h2 className="dm-benefits__h2" id="dm-benefits-heading">
                Benefits of partnering with <em>99 Visual</em>
              </h2>
              <p className="dm-benefits__sub">
                Digital marketing here means more than running ads — it's about
                building connections that compound into long-term growth.
              </p>
            </div>
            <div className="dm-benefits__grid">
              {benefits.map((b, i) => (
                <div className="dm-benefit-card" key={i}>
                  <div className="dm-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                  <div className="dm-benefit-card__title">{b.title}</div>
                  <p className="dm-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection />

        {/* CTA STRIP */}
        <section className="dm-cta" aria-labelledby="dm-cta-heading">
          <div className="dm-cta__inner">
            <span className="dm-cta__eyebrow">Start a Project</span>
            <h2 className="dm-cta__h2" id="dm-cta-heading">
              Ready to grow your brand <em>online</em>?
            </h2>
            <p className="dm-cta__sub">
              Get in touch for a free consultation. We'll map out the right
              digital marketing strategy for your business goals — and how
              we'll measure it.
            </p>
            <Link href="/contact" className="dm-cta__btn" aria-label="Get a free digital marketing consultation from 99 Visual Solutions">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="dm-sticky-cta">
          <Link href="/contact" className="dm-sticky-cta__btn">Get a Free Quote</Link>
        </div>
      </div>

      <Footer />
      <ScrollDown />
     
    </>
  );
}
