// app/services/digital-marketing-seo/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Digital Marketing & SEO Company in Bangalore, India — 99 Visual Solutions
//
// SEO/CONTENT REVISION (this edit):
//   Full audit-driven rewrite targeting "digital marketing/SEO company/agency
//   in Bangalore" + "...in India" and the related secondary cluster, without
//   keyword-stuffing. Key changes:
//   - Metadata (title/description/OG/Twitter) rewritten around the primary
//     keyword cluster. OG/Twitter image now points at the hero banner that
//     actually exists on disk — the previous `/images/services/
//     digital-marketing-og.jpg` reference 404s (file was never added).
//   - Service schema hasOfferCatalog expanded to match the new, more
//     complete on-page service architecture; areaServed now explicitly
//     includes Bengaluru/Karnataka/India ahead of the other served
//     countries (all figures pulled from existing org/local-business
//     schema — nothing invented).
//   - New sections: Why 99 Visual (SEO + web dev + digital marketing
//     positioning), a 6-card SEO Services grid (Technical/On-Page/Local/
//     Off-Page/Enterprise/eCommerce SEO), a Digital Marketing Services
//     grid, "Where Website Development Meets SEO", a 6-step process,
//     Industries, a Bengaluru/Bangalore SEO section, an India SEO section,
//     Measurement & Reporting, an honest Proof/Approach section (features
//     the one genuinely SEO-relevant testimonial already published on the
//     Contact page — nothing fabricated), and a short AI Search/GEO
//     section. FAQ expanded from 4 to 12 questions, still schema-linked.
//   - Hero ticker no longer displays invented keyword-ranking jumps
//     (e.g. "plumbers near me #38 -> #4") — that was presenting fabricated
//     numbers as if they were real client results. Replaced with a plain
//     list of the disciplines we actually offer.
//   - Hero CTAs updated to "Get a Free SEO Consultation" (primary) and
//     "Request a Digital Marketing Audit" (secondary), each now passed a
//     distinct postTitle/postUrl for lead-source tracking (previously
//     ConsultationCTA was called with no props, so every submission from
//     this page was attributed to the generic "Services Page" default).
//   - No unsupported superlative claims ("#1", "best", "guaranteed
//     rankings") added anywhere. No invented client names, review counts,
//     awards, or ratings added to visible copy or structured data.
//
//   Visual system (fonts, corner brackets, ticker mechanics, breakpoints,
//   card/spotlight/benefits/FAQ/CTA styling) is unchanged from the shared
//   /services hub template — only page-specific copy, data and the new
//   section styles below it were added.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ProcessList, FaqList, ServiceCTA, StickyCTA, IconLabelGrid } from "@/app/components/premium/service/ServiceBlocks";


import type { Metadata } from "next";
import {
  FaSearch, FaTools, FaPenNib, FaLink,
  FaAd, FaHashtag, FaShareAlt,
  FaFeatherAlt, FaEnvelope,
  FaMapMarkerAlt,
  FaBullhorn, FaChartLine, FaChartPie,
  FaSitemap, FaShoppingCart,
  FaLaptopCode, FaCogs,
  FaLightbulb, FaHome, FaHospital, FaShoppingBag, FaGraduationCap, FaIndustry,
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
  jsonLdString,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// Trailing-slash guard (unchanged).
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE = BASE.replace(/\/$/, "");

const PAGE_CANONICAL = `${BASE_SAFE}/services/digital-marketing-seo`;

// Existing on-disk hero banner — reused as the OG/Twitter image since the
// previously-referenced `digital-marketing-og.jpg` does not exist in /public.
const OG_IMAGE = `${BASE_SAFE}/images/services/digital-marketing-seo-hero-banner.jpg`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "Digital Marketing & SEO Company, Bangalore",

  description:
    "99 Visual Solutions is a Bengaluru-based digital marketing and SEO company helping businesses across India turn search and paid media into measurable growth.",

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
    title:       "Digital Marketing & SEO Company in Bangalore, India | 99 Visual",
    description: "Technical, on-page, local & enterprise SEO, Google Ads/PPC, Meta & LinkedIn Ads, content and email marketing — planned as one system by a Bengaluru-based team, for clients across India and worldwide.",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    OG_IMAGE,
        width:  1717,
        height: 916,
        type:   "image/jpeg",
        alt:    "Digital Marketing & SEO Company in Bangalore, India — 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Digital Marketing & SEO Company in Bangalore, India | 99 Visual",
    description: "SEO, PPC, Meta & LinkedIn Ads, content, email and marketing automation — run as one connected system by a Bengaluru-based team, for clients across India and internationally.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: OG_IMAGE,
        alt: "Digital Marketing & SEO Company in Bangalore, India — 99 Visual Solutions",
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
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/digital-marketing-seo']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA (all URLs use BASE_SAFE + PAGE_CANONICAL; nothing here is invented —
// areaServed reuses the same city/country facts already declared in
// orgSchema/localBusinessSchema elsewhere in this same @graph)
// ─────────────────────────────────────────────────────────────────────────────

const dmBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: `${BASE_SAFE}/` },
  { name: "Services",                url: `${BASE_SAFE}/services` },
  { name: "Digital Marketing & SEO", url: PAGE_CANONICAL },
]);

const dmAreaServed = [
  { "@type": "City",    name: "Bengaluru" },
  { "@type": "State",   name: "Karnataka" },
  { "@type": "Country", name: "India" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Australia" }, { "@type": "Country", name: "South Korea" }, { "@type": "Country", name: "Japan" },
];

const dmServiceNode = {
  ...serviceSchema({
    name:        "Digital Marketing & SEO Services in Bangalore, India",
    description: "Technical, on-page, local, off-page, enterprise and eCommerce SEO, PPC/Google Ads, Meta & LinkedIn Ads, social media marketing, content marketing, email marketing, marketing automation, and conversion rate optimisation — delivered by a Bengaluru-based team for clients across India and internationally.",
    pathname:    "/services/digital-marketing-seo",
    image:       OG_IMAGE,
    areaServed:  dmAreaServed,
  }),
  "@id": `${PAGE_CANONICAL}#service`,
  serviceType: "SEO & Digital Marketing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Digital Marketing & SEO Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "On-Page SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Off-Page SEO & Digital PR" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "eCommerce SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pay-Per-Click Advertising (Google Ads)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta & LinkedIn Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing & Marketing Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimisation & Analytics" } },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — shared array feeds BOTH schema and the visible section.
// Expanded from 4 to 12 questions targeting real search intent. Answers are
// deliberately honest about scope/cost/timelines rather than promising
// rankings or a fixed price.
// ─────────────────────────────────────────────────────────────────────────────
const dmFaqs = [
  {
    question: "What does a digital marketing company in Bangalore do?",
    answer:
      `A digital marketing company in Bangalore plans and runs the channels that help a business get found and chosen online — SEO, paid search and social advertising, content, email and marketing automation — usually alongside the website those channels send traffic to. At 99 Visual Solutions, we combine SEO and digital marketing with website development, so search visibility, site performance and the conversion journey are engineered together rather than handled by separate, disconnected teams. Contact us at ${CONTACT_EMAIL} for a free consultation.`,
  },
  {
    question: "What SEO services does 99 Visual Solutions provide?",
    answer:
      "We provide technical SEO (crawlability, indexing, Core Web Vitals, structured data), on-page SEO (keyword research, content and internal linking), local SEO (Google Business Profile and location-based search for Bangalore and other Indian cities), off-page SEO and digital PR, plus enterprise and eCommerce SEO for larger, catalogue-driven or multi-location websites. Every engagement starts with a technical and content audit, so recommendations are based on how your specific site currently performs rather than a generic checklist.",
  },
  {
    question: "Do you manage Google Ads and Meta Ads campaigns?",
    answer:
      "Yes. We manage end-to-end PPC campaigns on Google Ads as well as paid social campaigns on Meta and LinkedIn — strategy, creative, audience targeting and ongoing optimisation. Paid media is planned alongside SEO and content rather than in isolation, so campaigns and organic growth reinforce each other instead of competing for the same budget and attention.",
  },
  {
    question: "What is MindTrick.io?",
    answer:
      "MindTrick.io is our dedicated digital marketing hub, bringing together performance marketing, SEO and content strategy under one platform. It’s how we run and coordinate multi-channel campaigns for clients — helping businesses build online visibility and pursue sustainable growth in competitive digital markets like Bangalore and beyond.",
  },
  {
    question: "How much does SEO cost in Bangalore?",
    answer:
      "SEO pricing depends on your website’s current state, how competitive your target keywords are, and the scope of work — a technical audit, a full local SEO programme and an enterprise SEO engagement all involve very different levels of effort. Rather than quote a generic package price here, we start with a free consultation to understand your site and goals, then propose a scope and cost that actually matches what your business needs.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "Most SEO programmes start showing measurable movement — improved indexing, early keyword gains or more qualified traffic — within roughly three to six months, with results typically compounding over six to twelve months as technical fixes, content and authority-building take effect. SEO is a long-term, sustainable channel rather than an instant switch, and we’re upfront about that timeline in every proposal rather than promising rankings we can’t guarantee.",
  },
  {
    question: "Do you provide local SEO services in Bangalore?",
    answer:
      "Yes. We help Bangalore-based businesses improve visibility in location-based search and Google Maps results through Google Business Profile optimisation, location-relevant on-page SEO, citation consistency and review management — so you’re findable to customers searching in your specific neighbourhood or across the wider city.",
  },
  {
    question: "Do you provide SEO services across India?",
    answer:
      "Yes. Alongside Bangalore-focused work, we run national SEO strategies for businesses targeting customers across India, including keyword and content strategy for regional and multilingual audiences and, where it genuinely makes sense for the business, dedicated city or region landing pages — rather than large numbers of thin, near-duplicate pages built purely to target keyword variations.",
  },
  {
    question: "Can SEO and website development be handled by the same team?",
    answer:
      "Yes, and we’d generally recommend it. SEO performs better, and holds its rankings for longer, when the site’s technical architecture, page speed, Core Web Vitals and conversion UX are built correctly from the start rather than retrofitted afterward. Because 99 Visual Solutions builds websites in Next.js and React as well as running SEO and digital marketing, both can be aligned under one team instead of you coordinating between separate vendors.",
  },
  {
    question: "How do you measure SEO and digital marketing performance?",
    answer:
      "We track organic clicks, impressions and keyword positions through Google Search Console, engagement and conversions through Google Analytics 4, and paid performance directly inside Google Ads, alongside business metrics like leads and cost per lead. Reporting is shared on a regular cadence so you can see what’s working, what isn’t, and what we’re changing next.",
  },
  {
    question: "Do you provide technical SEO audits?",
    answer:
      "Yes. A technical SEO audit is usually the first step of any engagement — reviewing crawlability, indexation, site speed, Core Web Vitals, mobile usability, structured data and redirect or canonical issues — so any strategy we propose afterward is based on how your site actually behaves today, not assumptions.",
  },
  {
    question: "Can you help with Google Business Profile optimisation?",
    answer:
      "Yes. Google Business Profile is usually one of the highest-impact, fastest-to-implement parts of a local SEO programme — accurate business information, categories, photos, posts and review management all influence whether you show up in local search and Maps results, particularly in a competitive market like Bangalore.",
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
  name:          "Digital Marketing & SEO Company in Bangalore, India | 99 Visual Solutions",
  description:   "Technical, on-page, local, off-page, enterprise and eCommerce SEO, PPC, Meta & LinkedIn Ads, content and email marketing — planned as one system by a Bengaluru-based team, for clients across India and worldwide.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       OG_IMAGE,
    width:     1717,
    height:    916,
    caption:   "Digital Marketing & SEO Company in Bangalore, India — 99 Visual Solutions",
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
  { icon: <FaSearch />,    title: "Search Engine Visibility", description: "We optimise websites with proven SEO strategies to boost rankings, drive qualified organic traffic, and increase conversions across all major search engines." },
  { icon: <FaBullhorn />,  title: "Brand Awareness",          description: "Our campaigns build strong online visibility, ensuring your brand connects with the right audience at the right time across digital channels." },
  { icon: <FaChartLine />, title: "Data-Driven Growth",       description: "We analyse performance metrics to continuously refine strategies, aiming to improve ROI and deliver measurable, reportable outcomes for every campaign." },
  { icon: <FaCogs />,      title: "One Connected System",     description: "SEO, paid media, content and the website itself are planned together, so every channel reinforces the others instead of competing for the same budget." },
  { icon: <FaEnvelope />,  title: "Engaging Campaigns",       description: "We craft content, email, and ad campaigns that aim to inspire action and build lasting customer relationships through relevant, value-driven messaging." },
  { icon: <FaChartPie />,  title: "Transparent Reporting",    description: "Regular reporting against agreed metrics — not a one-off report at the end of a contract — so you always know what’s working and what’s changing next." },
];

// ── SEO Services (Section 3) ──────────────────────────────────────────────
const seoServices = [
  { id:"technical-seo", icon:<FaTools/>, title:"Technical SEO", description:"A strong SEO strategy starts with a solid technical foundation. Technical SEO focuses on your website’s structure, performance and crawlability, so search engines can efficiently access, understand and rank your content.", highlight:"From fixing indexing issues to improving site speed and implementing structured data, we work through every technical factor that affects visibility and Core Web Vitals.", bullets:["Crawlability, indexation, XML sitemap & robots directives","Core Web Vitals, page speed & mobile/JavaScript SEO","Structured data, canonicals & redirect clean-up"] },
  { id:"onpage", icon:<FaPenNib/>, title:"On-Page SEO", description:"On-page SEO fine-tunes every element of a page — content, keywords, meta tags and internal linking — to align with both search intent and how search engines read a page.", highlight:"The goal is discoverability and a better user experience together, so pages rank higher, hold visitors’ attention, and convert more of the traffic they already earn.", bullets:["Keyword research, search intent mapping & content structuring","Title tags, meta descriptions & heading architecture","Internal linking, URL structure & image SEO"] },
  { id:"local-seo", icon:<FaMapMarkerAlt/>, title:"Local SEO", description:"Local SEO helps a business show up in location-based search and Google Maps results — connecting with nearby customers at the exact moment they’re searching.", highlight:"For Bangalore and other Indian cities, that means an accurate Google Business Profile, location-relevant on-page content and consistent citations working together, not just a city name added to a title tag.", bullets:["Google Business Profile setup & ongoing optimisation","Location-based keyword targeting & local landing pages","Citation consistency & review management"] },
  { id:"offpage", icon:<FaLink/>, title:"Off-Page SEO & Digital PR", description:"Off-page SEO builds a website’s authority and credibility through relevant, high-quality backlinks and genuine brand visibility across the web.", highlight:"We focus on ethical, white-hat outreach and digital PR rather than link schemes — the kind of authority-building that holds up over time instead of risking a penalty.", bullets:["Digital PR & relevant outreach campaigns","Guest content, citations & brand mentions","Authority building measured through referral traffic & rankings"] },
  { id:"enterprise-seo", icon:<FaSitemap/>, title:"Enterprise SEO", description:"Large websites — hundreds or thousands of pages, multiple templates, sometimes multiple regions — need SEO governance, not just individual page fixes.", highlight:"We work with the templates, internal linking rules and content workflows that scale across a large site, plus ongoing monitoring so issues are caught before they compound.", bullets:["Technical governance across large, multi-template sites","Scalable content & internal linking frameworks","International/multi-location SEO monitoring"] },
  { id:"ecommerce-seo", icon:<FaShoppingCart/>, title:"eCommerce SEO", description:"eCommerce SEO covers the specific challenges of catalogue-driven sites — product and category pages, faceted navigation, and structured data at scale.", highlight:"The aim is visibility that actually converts: product pages that rank and are set up to sell, not just traffic for its own sake.", bullets:["Product & category page optimisation","Faceted navigation & duplicate-content handling","Product structured data for rich results"] },
];

// ── Digital Marketing Services (Section 4) ────────────────────────────────
const dmServices = [
  { id:"ppc", icon:<FaAd/>, title:"Google Ads / PPC", description:"Pay-per-click advertising puts your business in front of the right audience immediately, across Google’s search and display networks, while SEO builds up in the background.", highlight:"Keyword targeting, ad creative and continuous optimisation are managed toward cost per acquisition — not just impressions or clicks.", bullets:["Keyword research, bid management & campaign strategy","Ad creative, landing-page alignment & A/B testing","Continuous monitoring & conversion tracking"] },
  { id:"meta-linkedin-ads", icon:<FaHashtag/>, title:"Meta & LinkedIn Ads", description:"Paid social campaigns on Facebook, Instagram and LinkedIn reach audiences by interest, behaviour and — for LinkedIn — professional role, rather than only by search query.", highlight:"Creative, audience targeting and budget are adjusted continuously against real engagement and conversion data, not left to run unattended.", bullets:["Facebook & Instagram campaign management","LinkedIn Ads for B2B targeting & lead generation","Creative testing, audience refinement & reporting"] },
  { id:"social-media", icon:<FaShareAlt/>, title:"Social Media Marketing", description:"Organic and paid social work together to build brand presence and engagement across the platforms your audience actually spends time on.", highlight:"Content is planned around what each platform’s audience responds to, and tied back to the same content and campaign calendar as SEO and email.", bullets:["Content calendars aligned with campaigns & SEO topics","Platform-specific creative, banners & short-form video","Engagement tracking & community management"] },
  { id:"content-marketing", icon:<FaFeatherAlt/>, title:"Content Marketing", description:"Content marketing turns a brand into a genuinely useful resource — content that answers real questions your audience is searching for, at every stage of their decision.", highlight:"Content strategy is built from actual search intent and keyword research, so it supports SEO rather than existing separately from it.", bullets:["Content strategy, topic clusters & search-intent mapping","Blog, article & landing-page content creation","Distribution, promotion & performance review"] },
  { id:"email-automation", icon:<FaEnvelope/>, title:"Email Marketing & Automation", description:"Email and marketing automation nurture leads after the first click — segmented, personalised messaging that moves people from interest to decision without manual follow-up for every contact.", highlight:"Workflows, CRM integration and audience segmentation are set up once and then refined against real open, click and conversion data.", bullets:["Campaign design, segmentation & personalisation","Automated nurture workflows & CRM integration","Deliverability, testing & performance tracking"] },
  { id:"cro-analytics", icon:<FaChartPie/>, title:"Conversion Rate Optimisation & Analytics", description:"Traffic only matters if it converts. CRO looks at landing pages, forms and the overall journey to find where visitors drop off — then tests changes against real data.", highlight:"Analytics and reporting (Google Analytics 4, Google Search Console, Google Ads) tie every channel back to leads and cost per lead, so decisions are based on outcomes, not opinions.", bullets:["Landing-page & conversion-path optimisation","A/B testing & lead-generation funnel improvements","GA4/GSC reporting tied to leads & cost per lead"] },
];

const clusters = [
  {
    id: "seo-services",
    eyebrow: "SEO Services",
    heading: <>Rank on a <em>technical foundation</em>, not luck</>,
    intro: "Technical, on-page, local, off-page, enterprise and eCommerce SEO — the structural layer every other channel depends on.",
    list: seoServices,
    cols: 3,
  },
  {
    id: "digital-marketing-services",
    eyebrow: "Digital Marketing Services",
    heading: <>Channels that <em>work together</em>, not in isolation</>,
    intro: "Paid, social, content, email and automation planned as one connected system rather than six separate vendors with six separate reports.",
    list: dmServices,
    cols: 3,
  },
];


// ── Why 99 Visual — SEO + website dev + digital marketing pillars ─────────
const pillars = [
  { icon: <FaSearch/>,      title: "SEO Expertise",  description: "Technical, on-page, local, off-page, enterprise and eCommerce SEO — planned around real search intent and measured against actual rankings and traffic." },
  { icon: <FaLaptopCode/>,  title: "Website Development", description: <>Sites built in Next.js and React with Core Web Vitals, structured data and accessibility considered from day one — see how we build <Link href="/services/website-development">SEO-ready websites</Link>, with our <Link href="/services/it-consulting">IT consulting</Link> team supporting hosting and infrastructure decisions, and <Link href="/services/automation-testing">QA and automation testing</Link> before anything ships.</> },
  { icon: <FaBullhorn/>,    title: "Full-Funnel Digital Marketing", description: "PPC, social, content and email working as one connected system rather than isolated channels competing for the same budget and attention." },
  { icon: <FaChartLine/>,   title: "Data-Driven Decisions", description: "Every recommendation is checked against Google Search Console, Google Analytics 4 and campaign data — not assumptions about what should work." },
];

// ── SEO Process (Section 6) ───────────────────────────────────────────────
const processSteps = [
  { step: "01", title: "Discover",           text: "We start with your business goals, target customers and current digital presence — not just a keyword list — so the strategy is built around what actually grows the business." },
  { step: "02", title: "Audit",              text: "A technical, on-page and off-page audit of your existing website and search presence, using Google Search Console and Google Analytics 4, to find what’s holding rankings and traffic back today." },
  { step: "03", title: "Strategy",           text: "Keyword research, search-intent mapping and a channel plan — deciding where SEO, PPC, content and social should each carry weight for your market and budget, not a one-size-fits-all package." },
  { step: "04", title: "Build",              text: "Technical fixes, on-page optimisation, content production and campaign setup get built — often working alongside our website development team when the site itself needs structural changes." },
  { step: "05", title: "Optimise",           text: "Campaigns and content go live and get refined against real performance data — bid adjustments, content updates, outreach and conversion-path improvements based on what’s actually happening." },
  { step: "06", title: "Measure & Improve",  text: "Regular reporting against rankings, organic traffic, leads and cost per lead feeds back into the strategy, so the plan evolves as the market, algorithms and your business change." },
];

// ── Industries — only sectors already supported elsewhere on this site
//    (About/Home pages) — nothing new claimed here. ────────────────────────
const industries = [
  { icon: <FaLightbulb/>,     name: "Startups & Technology" },
  { icon: <FaHome/>,          name: "Real Estate & Construction" },
  { icon: <FaHospital/>,      name: "Healthcare" },
  { icon: <FaShoppingBag/>,   name: "E-Commerce & Retail" },
  { icon: <FaGraduationCap/>, name: "Education" },
  { icon: <FaIndustry/>,      name: "Manufacturing" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function DigitalMarketing() {
  const T = "Digital Marketing & SEO";
  const P = "/services/digital-marketing-seo";
  return (
    <>
      <script
        id="schema-dm-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(dmGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="dm-hero-heading"
            crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: P, label: "Digital Marketing & SEO" }]}
            title="Digital Marketing & SEO Company in Bangalore, India"
            tagline={<>Search, paid and content, run as <em>one growth system</em></>}
            sub="99 Visual Solutions is a Bengaluru-based digital marketing and SEO company that combines search strategy, paid media, content and conversion-focused web development — turning digital channels into measurable growth for businesses across Bangalore, India and beyond."
            image="/images/services/digital-marketing-seo-hero-banner.jpg"
            imageAlt="Digital marketing and SEO analytics dashboard"
            ctaLabel="Get a Free SEO Consultation"
            postTitle={T}
            postUrl={P}
            secondary={{ href: "#dm-cluster-h-seo-services", label: "Explore SEO services" }}
            points={["Bengaluru, India", "Est. 2020", "Serving India · USA · UK · UAE · Australia · Korea · Japan"]}
          />

          <ServiceIntro
            id="dm-intro-heading"
            eyebrow="What we do"
            title={<>Full-funnel marketing, run like a <em>product</em></>}
            aside={
              <ul className="vz-checks">
                <li>Three disciplines working as one: SEO, digital marketing &amp; web development</li>
                <li>One reporting cadence, with full visibility across every channel</li>
                <li>Decisions backed by data, not guesses</li>
              </ul>
            }
          >
            <p className="vz-lead">
              99 Visual Solutions is a digital marketing and SEO partner headquartered in Bengaluru that plans, builds, and manages search, paid, social, content, and email programs under a single strategy — so every channel compounds the others instead of competing with them for budget and attention.
            </p>
            <p>
              Whether you are a startup launching your first product in Bangalore or an enterprise modernising a legacy stack across India, we scale with your ambition and operate as a <strong>true extension of your team</strong>.
            </p>
          </ServiceIntro>

          <FeatureGrid
            id="dm-why-heading"
            eyebrow="Why 99 Visual"
            title={<>SEO, website development and digital marketing — <em>engineered together</em></>}
            lead="Many agencies treat SEO as something bolted onto whatever website already exists. We think that’s backwards: SEO performs better, and holds its rankings for longer, when the underlying site architecture, performance, content and conversion journey are engineered correctly from the start. Because 99 Visual Solutions builds websites as well as running SEO and digital marketing, we can align the technical foundation and the search strategy under one roof — instead of you coordinating between separate vendors who don’t talk to each other."
            items={pillars.map((p) => ({ title: p.title, description: p.description, icon: p.icon }))}
            surface
          />

          {clusters.map((cluster, ci) => (
            <ServiceCluster
              key={cluster.id}
              id={`dm-cluster-h-${cluster.id}`}
              eyebrow={cluster.eyebrow}
              title={cluster.heading}
              intro={cluster.intro}
              surface={ci % 2 === 1}
              columns={3}
              items={cluster.list.map((svc) => ({ id: svc.id, title: svc.title, description: svc.description, highlight: svc.highlight, bullets: svc.bullets, icon: svc.icon }))}
            />
          ))}

          <ServiceIntro
            id="dm-spotlight-heading"
            sectionId="mindtrick"
            eyebrow="Our Platform"
            title={<>MindTrick.io – Our Dedicated <em>Digital Marketing Hub</em></>}
            surface
            aside={
              <>
                <ul className="vz-checks">
                  <li>End-to-end digital marketing coordination under one platform</li>
                  <li>Data-driven campaigns focused on growth &amp; ROI</li>
                  <li>Strategy, creative execution &amp; continuous optimisation</li>
                </ul>
                <ul className="vz-statline" role="list">
                  <li><strong>10+</strong> Channels unified</li>
                  <li><strong>1</strong> Strategy, cross-channel</li>
                  <li><strong>∞</strong> Iteration, always optimising</li>
                </ul>
              </>
            }
          >
            <p className="vz-lead">
              At MindTrick.io, we bring together innovation, creativity, and data-driven strategies to power digital growth. As our dedicated digital marketing hub, MindTrick.io delivers result-oriented solutions that help businesses build strong online visibility and pursue sustainable growth.
            </p>
            <p>
              From performance marketing to brand storytelling, we combine practical tools with expert judgement to run campaigns aimed at making a measurable impact on your business’s digital presence.
            </p>
          </ServiceIntro>

          <ServiceIntro
            id="dm-webdev-heading"
            eyebrow="The Differentiator"
            title={<>Where <em>website development</em> meets SEO</>}
            aside={
              <>
                <ul className="vz-checks">
                  <li><strong>Modern architecture —</strong> Next.js/React builds that are fast, crawlable and easy to extend as content and campaigns grow.</li>
                  <li><strong>Core Web Vitals —</strong> page speed and stability engineered in, not patched on after launch.</li>
                  <li><strong>Structured data &amp; accessibility —</strong> semantic HTML and schema markup that help both search engines and assistive technology understand the page.</li>
                  <li><strong>Conversion-focused UX —</strong> pages designed around the action you actually want a visitor to take.</li>
                  <li><strong>Analytics from day one —</strong> Google Analytics 4 and conversion tracking set up at launch, not months later.</li>
                  <li><strong>QA before it ships —</strong> supported by our <Link className="vz-prose-link" href="/services/automation-testing">automation &amp; QA testing</Link> team, so changes don’t break what’s already working.</li>
                </ul>
                <Link href="/services/website-development" className="vz-link-arrow">See how we build SEO-ready websites →</Link>
              </>
            }
          >
            <p className="vz-lead">
              An SEO strategy is only as strong as the website it’s built on. A site that’s slow, hard to crawl, or badly structured will always fight against the strategy layered on top of it. That’s why we pair SEO and digital marketing with our own <Link className="vz-prose-link" href="/services/website-development">website development</Link> team, building in Next.js and React — rather than handing you off to optimise a site neither of us built.
            </p>
          </ServiceIntro>

          <ProcessList
            id="dm-process-heading"
            title={<>A process built to <em>remove guesswork</em></>}
            lead="Six steps, repeated on a cycle — because SEO and digital marketing are never really “done.”"
            steps={processSteps.map((s) => ({ title: s.title, description: s.text }))}
            surface
          />

          <IconLabelGrid
            id="dm-industries-heading"
            eyebrow="Who We Work With"
            title={<>Industries we <em>serve</em></>}
            lead="The same industries we support across our other services — approached here through SEO, content and paid media."
            items={industries.map((ind) => ({ label: ind.name, icon: ind.icon }))}
            note={
              <>
                Working in real estate, architecture or construction? Our <Link className="vz-prose-link" href="/services/cad-gis-photogrammetry">CAD, GIS &amp; photogrammetry</Link> team can support the visual and mapping side of a project alongside the marketing that promotes it.
              </>
            }
          />

          <ServiceIntro id="dm-local-heading" eyebrow="Local SEO" title={<>Built for how <em>Bangalore</em> searches</>} surface>
            <p className="vz-lead">
              Bangalore is one of India’s most competitive digital markets — a dense mix of technology companies, startups, retail, real estate and professional services all competing for attention across neighbourhoods from Koramangala and Indiranagar to Whitefield, HSR Layout, Electronic City and Jayanagar. Winning local search here takes more than adding “Bangalore” to a page title.
            </p>
            <p>
              We combine an accurate, well-maintained Google Business Profile with location-relevant on-page content, consistent citations and genuine organic authority — so a business shows up for the specific searches its customers are actually making, whether that’s a broad service search or something highly local.
            </p>
            <p>As a Bengaluru-headquartered team, we work with local businesses directly and understand the market we’re optimising for.</p>
          </ServiceIntro>

          <ServiceIntro
            id="dm-india-heading"
            eyebrow="National SEO"
            title={<>SEO strategy that works <em>across India</em></>}
            aside={
              <>
                <ul className="vz-checks">
                  <li>Location-based search &amp; regional search-behaviour differences</li>
                  <li>Multilingual and regional-language considerations where relevant</li>
                  <li>National keyword research &amp; content strategy</li>
                  <li>Dedicated city or region pages only where there’s a genuine business reason for them</li>
                  <li>Market-by-market competitive SERP analysis</li>
                </ul>
                <p>We’d rather build a smaller number of genuinely useful pages than dozens of thin, near-identical city pages that dilute a site’s authority and risk being treated as doorway pages by search engines.</p>
              </>
            }
          >
            <p className="vz-lead">
              India isn’t one search market. Search behaviour, competition and language preferences shift significantly between cities and regions, so a national SEO strategy has to account for where your customers actually are and how competitive the results are in each market you’re targeting.
            </p>
          </ServiceIntro>

          <ServiceIntro
            id="dm-measure-heading"
            eyebrow="Measurement & Reporting"
            title={<>Reported against numbers that <em>matter</em></>}
            surface
            aside={
              <div className="vz-measure">
                <div>
                  <h3 className="vz-tech__label">What we track</h3>
                  <ul className="vz-checks">
                    <li>Organic clicks &amp; impressions</li>
                    <li>Search visibility &amp; keyword positions</li>
                    <li>Organic conversions &amp; leads</li>
                    <li>Cost per lead &amp; conversion rate</li>
                    <li>Google Ads performance, including ROAS where applicable</li>
                    <li>Landing-page &amp; engagement performance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="vz-tech__label">Tools we report from</h3>
                  <ul className="vz-chips" role="list">
                    <li className="vz-chip">Google Search Console</li>
                    <li className="vz-chip">Google Analytics 4</li>
                    <li className="vz-chip">Google Ads</li>
                    <li className="vz-chip">Reporting dashboards (e.g. Looker Studio)</li>
                  </ul>
                </div>
              </div>
            }
          >
            <p className="vz-lead">
              SEO and digital marketing performance is only useful if it’s measured properly. We report on a regular cadence using Google Search Console, Google Analytics 4 and Google Ads’ own reporting, so you always know what’s actually happening — not just a summary at the end of a quarter.
            </p>
          </ServiceIntro>

          <ServiceIntro
            id="dm-proof-heading"
            eyebrow="Our Approach"
            title={<>What we <em>measure</em>, and what’s still being built</>}
            aside={
              <div className="vz-proof">
                <figure className="vz-quote">
                  <blockquote>
                    <p>“We hired them for SEO and ended up rebuilding our entire digital presence. Page-one rankings for seventeen target keywords within four months. Exceptional results, full stop.”</p>
                  </blockquote>
                  <figcaption>
                    Kavitha R. — VP Digital Strategy, Meridian Finance · <Link className="vz-prose-link" href="/contact">more client feedback on our Contact page</Link>
                  </figcaption>
                </figure>
                <div className="vz-card">
                  <p className="vz-eyebrow">Case study</p>
                  <p>
                    See exactly how we work in our <Link className="vz-prose-link" href="/work/technical-seo-99visual">technical SEO case study</Link>: the audit-to-monitoring workflow we ran on our own Next.js site, with every fix traceable to the change that made it. It covers crawlability, canonicals and redirects, the XML sitemap, structured data and page speed, and states what it doesn’t claim.
                  </p>
                  <p>
                    We’re also documenting client SEO case studies with real before-and-after data. If you’d like to be one of the first featured, <Link className="vz-prose-link" href="/contact">get in touch</Link>.
                  </p>
                  <p>
                    In the meantime, our <Link className="vz-prose-link" href="/insights">Insights blog</Link> covers how we think about search and digital strategy, and our <Link className="vz-prose-link" href="/about">About page</Link> has more on who we are and how we work.
                  </p>
                </div>
              </div>
            }
          >
            <p className="vz-lead">
              We won’t invent client results to fill this section. Here’s what we can genuinely show you today: direct feedback from a client we worked with on SEO, and an honest note on what’s still coming.
            </p>
          </ServiceIntro>

          <ServiceIntro id="dm-geo-heading" eyebrow="AI Search & GEO" title={<>Preparing for how <em>AI-powered search</em> is changing</>} surface>
            <p className="vz-lead">
              Search is no longer just a list of ten blue links. Google’s AI Overviews and other AI-powered systems increasingly summarise answers directly, and tools like ChatGPT, Gemini and Perplexity are becoming discovery surfaces of their own. The common thread across all of them is the same fundamentals good SEO has always relied on: clear, well-structured content; accurate, first-party information about a business; consistent entities and brand mentions; and technical implementation — structured data, clean HTML, crawlable pages — that makes it easy for any system, human or AI, to understand what a business actually does.
            </p>
            <p>
              We build with that in mind — clear entity information, structured data and genuinely useful content — as part of standard SEO practice, not a separate service. We won’t claim this guarantees visibility inside any specific AI system; no one can honestly promise that. What we can do is make sure a business is represented accurately and clearly wherever people, or the AI systems increasingly answering on their behalf, go looking.
            </p>
          </ServiceIntro>

          <FeatureGrid
            id="dm-benefits-heading"
            eyebrow="Why Choose Us?"
            title={<>Benefits of partnering with <em>99 Visual</em></>}
            lead="Digital marketing here means more than running ads — it’s about building visibility and connections that compound into long-term growth."
            items={benefits.map((b) => ({ title: b.title, description: b.description, icon: b.icon }))}
          />

          <div id="dm-faq">
            <FaqList
              id="dm-faq-heading"
              title="Common questions"
              faqs={dmFaqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))}
              surface
            />
          </div>

          <ServiceCTA
            id="dm-cta-heading"
            title={<>Ready to grow your business <em>online</em>?</>}
            sub="Get in touch for a free SEO consultation or digital marketing audit. We’ll map out the right strategy for your goals in Bangalore, across India, or internationally — and how we’ll measure it."
            ctaLabel="Get a Free SEO Consultation"
            postTitle={T}
            postUrl={P}
          />
          <RelatedInsights serviceHref="/services/digital-marketing-seo" />
        </main>
        <Footer />
        <StickyCTA postTitle={T} postUrl={P} label="Get a Free SEO Consultation" />
      </div>
    </>
  );
}
