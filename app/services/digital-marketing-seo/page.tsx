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

import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";


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
export const metadata: Metadata = {
  title: "Digital Marketing & SEO Company in Bangalore, India | 99 Visual",

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
const DATE_MODIFIED  = "2026-09-21"; // <- Update this when content changes

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
  { "@type": "Country", name: "Australia" },
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

// ── Hero ticker — plain list of disciplines we offer. No invented
//    keyword-ranking numbers; this is decorative and aria-hidden. ─────────
const pipeline = [
  "Technical SEO",
  "On-Page & Content SEO",
  "Local SEO — Bangalore",
  "Off-Page SEO & Digital PR",
  "Google Ads (PPC)",
  "Meta & LinkedIn Ads",
  "Core Web Vitals",
  "GA4 & Search Console Reporting",
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
// FAQ SECTION — visible content stays in exact parity with dmFaqNode schema.
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

        /* ══ HERO — matched exactly to the /services hub page hero.
           Save your banner image to:
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

        .dm-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .dm-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .dm-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .dm-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .dm-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .dm-hero__eyebrow{ margin-bottom:1.1rem; }
          .dm-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .dm-hero__rule{ margin-bottom:.8rem; }
          .dm-hero__sub{ margin-bottom:1.2rem; }
        }

        .dm-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .dm-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .dm-corner--tl{top:28px;left:28px;border-top:1px solid var(--dm-blue);border-left:1px solid var(--dm-blue);}
        .dm-corner--tr{top:28px;right:28px;border-top:1px solid var(--dm-blue);border-right:1px solid var(--dm-blue);}
        .dm-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--dm-blue);border-left:1px solid var(--dm-blue);}
        @media(max-width:480px){ .dm-corner--bl{ left:28px; } }
        .dm-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--dm-blue);border-right:1px solid var(--dm-blue);}

        .dm-hero__content{animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes dmFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.dm-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        /* Eyebrow badge — orange (#FF8A2E), independent of --dm-blue */
        .dm-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:#FF8A2E;border:1px solid rgba(255,138,46,.28);background:rgba(255,138,46,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .dm-breadcrumb{position:relative;z-index:2;padding:1.6rem 0 0;}
        .dm-breadcrumb ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;margin:0;padding:0;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.02em;}
        .dm-breadcrumb li{display:flex;align-items:center;gap:6px;}
        .dm-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s ease;}
        .dm-breadcrumb a:hover{color:#FF8A2E;}
        .dm-breadcrumb a[aria-current="page"]{color:rgba(255,255,255,.85);pointer-events:none;}
        .dm-breadcrumb__sep{color:rgba(255,255,255,.25);}
        @media(max-width:640px){.dm-breadcrumb{padding-top:1.1rem;}}
        .dm-hero__dot{width:5px;height:5px;border-radius:50%;background:#FF8A2E;animation:dmPulse 2s ease-in-out infinite;}
        @keyframes dmPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .dm-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .dm-hero__h1 em{font-style:normal;color:var(--dm-blue);}
        .dm-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--dm-blue),transparent);margin:0 0 1.4rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.dm-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--dm-blue),transparent);}}
        .dm-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:580px;margin:0 0 1.6rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.dm-hero__sub{margin:0 auto 1.6rem;}}

        .dm-hero__trust{display:flex;flex-wrap:wrap;gap:.6rem;margin:0 0 2rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .4s both;}
        @media(max-width:960px){.dm-hero__trust{justify-content:center;}}
        .dm-hero__trust-item{display:inline-flex;align-items:center;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.05);padding:6px 12px;border-radius:100px;backdrop-filter:blur(6px);}

        .dm-hero__ctas{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.dm-hero__ctas{justify-content:center;}}
        .dm-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--dm-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;border:none;}
        .dm-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .dm-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;box-shadow:none;gap:8px;}
        .dm-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);box-shadow:none;transform:none;}

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
        .dm-ticker__item::before{content:'•';color:var(--dm-blue);}
        @media(max-height:520px){
          .dm-hero__ticker-bar{ padding-top:.75rem; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .dm-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--dm-line);}
        @media(max-width:760px){.dm-sticky-cta{display:flex;justify-content:center;}}
        .dm-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--dm-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* INTRO / DEFINITION */
        .dm-intro{padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);background:var(--dm-surface);}
        .dm-intro__inner{max-width:920px;margin:0 auto;}
        .dm-intro__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--dm-blue);margin-bottom:1rem;display:block;}
        .dm-intro__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--dm-ink);margin:0 0 1.2rem;max-width:640px;}
        .dm-intro__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--dm-muted);max-width:680px;margin:0 0 2.5rem;}
        .dm-intro__p a,.dm-card__desc a,.dm-card__highlight a,.dm-benefits__sub a,.dm-local__p a,.dm-india__p a,.dm-proof__p a,.dm-measure__p a,.dm-geo__p a,.dm-why__p a{color:var(--dm-blue);text-decoration:underline;text-decoration-color:rgba(46,92,255,.35);text-underline-offset:2px;}
        .dm-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        @media(max-width:768px){.dm-stats{grid-template-columns:1fr;}}
        .dm-stat{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:14px;padding:1.4rem 1.5rem;}
        .dm-stat__num{font-family:'Space Grotesk',sans-serif;font-size:1.6rem;font-weight:700;color:var(--dm-ink);}
        .dm-stat__label{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--dm-muted);margin-top:.3rem;}

        /* WHY 99 VISUAL */
        .dm-why{padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);background:var(--dm-paper);}
        .dm-why__inner{max-width:1180px;margin:0 auto;}
        .dm-why__head{max-width:720px;margin-bottom:2rem;}
        .dm-why__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-why__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 1rem;}
        .dm-why__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-why__p{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:var(--dm-muted);margin:0 0 3rem;max-width:760px;}
        .dm-why__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
        @media(max-width:1024px){.dm-why__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.dm-why__grid{grid-template-columns:1fr;}}
        .dm-why__card{background:var(--dm-surface);border:1px solid var(--dm-line);border-radius:16px;padding:1.7rem 1.6rem;transition:border-color .2s ease,transform .2s ease;}
        .dm-why__card:hover{border-color:var(--dm-blue);transform:translateY(-3px);}
        .dm-why__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--dm-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1rem;}
        .dm-why__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--dm-ink);margin:0 0 .6rem;}
        .dm-why__desc{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}

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
        @media(max-width:1060px){.dm-cluster__grid--3{grid-template-columns:repeat(2,1fr);}}
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

        /* WEBSITE DEVELOPMENT + SEO */
        .dm-webdev{padding:5.5rem 1.5rem;background:var(--dm-surface);border-bottom:1px solid var(--dm-line);}
        .dm-webdev__inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;}
        @media(max-width:900px){.dm-webdev__inner{grid-template-columns:1fr;}}
        .dm-webdev__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.9rem;}
        .dm-webdev__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.8vw,2.05rem);font-weight:700;line-height:1.24;color:var(--dm-ink);margin:0 0 1.1rem;}
        .dm-webdev__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-webdev__p{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin:0 0 1.2rem;}
        .dm-webdev__link{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.86rem;font-weight:600;color:var(--dm-blue);text-decoration:none;}
        .dm-webdev__link:hover{text-decoration:underline;}
        .dm-webdev__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.9rem;}
        .dm-webdev__list li{font-family:'Inter',sans-serif;font-size:.87rem;line-height:1.6;color:var(--dm-ink);display:flex;gap:.7rem;background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:12px;padding:.9rem 1.1rem;}
        .dm-webdev__list li b{color:var(--dm-blue);font-weight:600;}

        /* PROCESS */
        .dm-process{background:var(--dm-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-process__inner{max-width:900px;margin:0 auto;}
        .dm-process__head{margin-bottom:3rem;max-width:640px;}
        .dm-process__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-process__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-process__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-process__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}
        .dm-process__steps{display:flex;flex-direction:column;gap:0;}
        .dm-process__step{display:grid;grid-template-columns:56px 1fr;gap:1.5rem;padding-bottom:2.5rem;position:relative;}
        .dm-process__step:not(:last-child)::before{content:'';position:absolute;left:27px;top:52px;bottom:-2px;width:1px;background:var(--dm-line);}
        .dm-process__num{width:56px;height:56px;border-radius:50%;border:1px solid var(--dm-line);background:var(--dm-surface);display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:1rem;font-weight:500;color:var(--dm-blue);flex-shrink:0;}
        .dm-process__title{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--dm-ink);margin-bottom:.5rem;}
        .dm-process__text{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--dm-muted);max-width:560px;}

        /* INDUSTRIES */
        .dm-industries{background:var(--dm-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-industries__inner{max-width:1100px;margin:0 auto;}
        .dm-industries__head{margin-bottom:2.5rem;max-width:680px;}
        .dm-industries__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-industries__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-industries__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-industries__sub{font-family:'Inter',sans-serif;font-size:.9rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}
        .dm-industries__grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;margin-bottom:1.5rem;}
        @media(max-width:900px){.dm-industries__grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:480px){.dm-industries__grid{grid-template-columns:repeat(2,1fr);}}
        .dm-industries__card{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:16px;padding:1.5rem 1rem;text-align:center;transition:border-color .2s ease,transform .2s ease;}
        .dm-industries__card:hover{border-color:var(--dm-blue);transform:translateY(-3px);}
        .dm-industries__icon{color:var(--dm-blue);font-size:1.2rem;margin-bottom:.8rem;}
        .dm-industries__name{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:var(--dm-ink);}
        .dm-industries__note{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}

        /* BANGALORE / INDIA SECTIONS */
        .dm-local,.dm-india{padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-local{background:var(--dm-paper);}
        .dm-india{background:var(--dm-surface);}
        .dm-local__inner,.dm-india__inner{max-width:820px;margin:0 auto;}
        .dm-local__label,.dm-india__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.9rem;}
        .dm-local__h2,.dm-india__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.8vw,2.05rem);font-weight:700;line-height:1.24;color:var(--dm-ink);margin:0 0 1.2rem;}
        .dm-local__h2 em,.dm-india__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-local__p,.dm-india__p{font-family:'Inter',sans-serif;font-size:.94rem;font-weight:300;line-height:1.85;color:var(--dm-muted);margin:0 0 1.3rem;}
        .dm-india__list{list-style:none;padding:0;margin:0 0 1.3rem;display:flex;flex-direction:column;gap:.7rem;}
        .dm-india__list li{font-family:'Inter',sans-serif;font-size:.9rem;color:var(--dm-ink);display:flex;align-items:flex-start;gap:.6rem;line-height:1.6;}
        .dm-india__list li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--dm-blue);margin-top:.55rem;flex-shrink:0;}
        .dm-local__note{font-family:'Inter',sans-serif;font-size:.85rem;font-style:italic;color:var(--dm-ink);border-left:2px solid var(--dm-blue);padding-left:1rem;margin:0;}

        /* MEASUREMENT & REPORTING */
        .dm-measure{padding:5.5rem 1.5rem;background:var(--dm-paper);border-bottom:1px solid var(--dm-line);}
        .dm-measure__inner{max-width:1100px;margin:0 auto;}
        .dm-measure__head{max-width:680px;margin-bottom:2.5rem;}
        .dm-measure__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-measure__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-measure__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-measure__p{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0 0 2.5rem;max-width:760px;}
        .dm-measure__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;}
        @media(max-width:860px){.dm-measure__grid{grid-template-columns:1fr;}}
        .dm-measure__col{background:var(--dm-surface);border:1px solid var(--dm-line);border-radius:16px;padding:1.8rem 1.9rem;}
        .dm-measure__col-title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--dm-ink);margin:0 0 1rem;}
        .dm-measure__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.65rem;}
        .dm-measure__list li{font-family:'Inter',sans-serif;font-size:.86rem;color:var(--dm-ink);display:flex;align-items:flex-start;gap:.6rem;line-height:1.6;}
        .dm-measure__list li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--dm-blue);margin-top:.5rem;flex-shrink:0;}
        .dm-measure__tools{display:flex;flex-wrap:wrap;gap:.6rem;}
        .dm-measure__tool{font-family:'IBM Plex Mono',monospace;font-size:.76rem;color:var(--dm-ink);background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:100px;padding:.5rem 1rem;}

        /* PROOF / APPROACH */
        .dm-proof{padding:5.5rem 1.5rem;background:var(--dm-surface);border-bottom:1px solid var(--dm-line);}
        .dm-proof__inner{max-width:1100px;margin:0 auto;}
        .dm-proof__head{max-width:720px;margin-bottom:2.5rem;}
        .dm-proof__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-proof__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 1rem;}
        .dm-proof__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-proof__p{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin:0 0 1rem;}
        .dm-proof__grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;margin-top:2rem;}
        @media(max-width:860px){.dm-proof__grid{grid-template-columns:1fr;}}
        .dm-proof__quote{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:16px;padding:2rem;}
        .dm-proof__quote-text{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:500;line-height:1.6;color:var(--dm-ink);margin:0 0 1.2rem;}
        .dm-proof__quote-who{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--dm-muted);}
        .dm-proof__quote-who b{color:var(--dm-ink);font-weight:600;}
        .dm-proof__note{background:var(--dm-paper);border:1px dashed var(--dm-line);border-radius:16px;padding:2rem;}
        .dm-proof__note-title{font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:500;letter-spacing:.04em;color:var(--dm-blue);display:block;margin-bottom:.9rem;}
        .dm-proof__note p{font-family:'Inter',sans-serif;font-size:.87rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0 0 .8rem;}

        /* AI SEARCH / GEO */
        .dm-geo{padding:5.5rem 1.5rem;background:var(--dm-paper);border-bottom:1px solid var(--dm-line);}
        .dm-geo__inner{max-width:820px;margin:0 auto;}
        .dm-geo__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.9rem;}
        .dm-geo__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.8vw,2.05rem);font-weight:700;line-height:1.24;color:var(--dm-ink);margin:0 0 1.2rem;}
        .dm-geo__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-geo__p{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.85;color:var(--dm-muted);margin:0 0 1.2rem;}

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
        .dm-cta__inner{max-width:600px;margin:0 auto;}
        .dm-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .dm-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--dm-ink);margin:0 0 1rem;}
        .dm-cta__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin-bottom:2.2rem;}
        .dm-cta__actions{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;}
        .dm-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--dm-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .dm-cta__btn:hover{background:var(--dm-blue);transform:translateY(-2px);}
        .dm-cta__btn--ghost{color:var(--dm-ink);background:var(--dm-surface);border:1px solid var(--dm-line);}
        .dm-cta__btn--ghost:hover{background:var(--dm-paper);color:var(--dm-ink);}

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
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="dm-hero" aria-labelledby="dm-hero-heading">
          <div aria-hidden="true">
            <div className="dm-hero__grain" />
          </div>
          <div className="dm-corner dm-corner--tl" aria-hidden="true" />
          <div className="dm-corner dm-corner--tr" aria-hidden="true" />
          <div className="dm-corner dm-corner--bl" aria-hidden="true" />
          <div className="dm-corner dm-corner--br" aria-hidden="true" />

          <nav className="dm-breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="dm-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/services" itemProp="item"><span itemProp="name">Services</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="dm-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/services/digital-marketing-seo" itemProp="item" aria-current="page">
                  <span itemProp="name">Digital Marketing &amp; SEO</span>
                </Link>
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
                Digital Marketing &amp; SEO Company<br />in <em>Bangalore</em>, India
              </h1>
              <div className="dm-hero__rule" aria-hidden="true" />
              <p className="dm-hero__sub">
                99 Visual Solutions is a Bengaluru-based digital marketing and SEO
                company that combines search strategy, paid media, content and
                conversion-focused web development — turning digital channels into
                measurable growth for businesses across Bangalore, India and beyond.
              </p>

              <div className="dm-hero__trust" aria-label="Company facts">
                <span className="dm-hero__trust-item">Bengaluru, India</span>
                <span className="dm-hero__trust-item">Est. 2020</span>
                <span className="dm-hero__trust-item">Serving India · USA · UK · UAE · Australia</span>
              </div>

              <div className="dm-hero__ctas">
                <ConsultationCTA
                  className="dm-hero__cta"
                  ariaLabel="Get a free SEO consultation from 99 Visual Solutions"
                  postTitle="Digital Marketing & SEO — Hero (Primary)"
                  postUrl="/services/digital-marketing-seo"
                >
                  Get a Free SEO Consultation
                </ConsultationCTA>
                <ConsultationCTA
                  className="dm-hero__cta dm-hero__cta--ghost"
                  ariaLabel="Request a digital marketing audit from 99 Visual Solutions"
                  postTitle="Digital Marketing & SEO — Hero (Secondary)"
                  postUrl="/services/digital-marketing-seo"
                >
                  Request a Digital Marketing Audit
                </ConsultationCTA>
              </div>
            </div>
          </div>

          <div className="dm-hero__ticker-bar" aria-hidden="true">
            <div className="dm-ticker">
              <div className="dm-ticker__track">
                {[...pipeline, ...pipeline].map((t, i) => (
                  <span className="dm-ticker__item" key={i}>
                    <b>{t}</b>
                  </span>
                ))}
              </div>
            </div>
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
              99 Visual Solutions is a digital marketing and SEO partner
              headquartered in Bengaluru that plans, builds, and manages search,
              paid, social, content, and email programs under a single strategy —
              so every channel compounds the others instead of competing with
              them for budget and attention.
            </p>
            <p className="dm-intro__p">
              Whether you are a startup launching your first product in Bangalore
              or an enterprise modernising a legacy stack across India, we scale
              with your ambition and operate as a{" "}
              <strong>true extension of your team</strong>.
            </p>
            <div className="dm-stats">
              <div className="dm-stat">
                <div className="dm-stat__num">3</div>
                <div className="dm-stat__label">Disciplines working as one: SEO, digital marketing &amp; web development</div>
              </div>
              <div className="dm-stat">
                <div className="dm-stat__num">1</div>
                <div className="dm-stat__label">Reporting cadence, full visibility across every channel</div>
              </div>
              <div className="dm-stat">
                <div className="dm-stat__num">100%</div>
                <div className="dm-stat__label">Decisions backed by data, not guesses</div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY 99 VISUAL */}
        <section className="dm-why" aria-labelledby="dm-why-heading">
          <div className="dm-why__inner">
            <div className="dm-why__head">
              <span className="dm-why__label">Why 99 Visual</span>
              <h2 className="dm-why__h2" id="dm-why-heading">
                SEO, website development and digital marketing — <em>engineered together</em>
              </h2>
            </div>
            <p className="dm-why__p">
              Many agencies treat SEO as something bolted onto whatever website
              already exists. We think that’s backwards: SEO performs better, and
              holds its rankings for longer, when the underlying site architecture,
              performance, content and conversion journey are engineered correctly
              from the start. Because 99 Visual Solutions builds websites as well as
              running SEO and digital marketing, we can align the technical
              foundation and the search strategy under one roof — instead of you
              coordinating between separate vendors who don’t talk to each other.
            </p>
            <div className="dm-why__grid">
              {pillars.map((p) => (
                <div className="dm-why__card" key={p.title}>
                  <div className="dm-why__icon" aria-hidden="true">{p.icon}</div>
                  <div className="dm-why__title">{p.title}</div>
                  <p className="dm-why__desc">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE CLUSTERS — SEO Services, then Digital Marketing Services */}
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
                  {cluster.list.map((svc) => (
                    <article className="dm-card" id={svc.id} key={svc.id} aria-labelledby={`dm-card-h-${svc.id}`}>
                      <div className="dm-card__icon" aria-hidden="true">{svc.icon}</div>
                      <h3 className="dm-card__title" id={`dm-card-h-${svc.id}`}>{svc.title}</h3>
                      <p className="dm-card__desc">{svc.description}</p>
                      <p className="dm-card__highlight">{svc.highlight}</p>
                      <ul className="dm-card__bullets">
                        {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* MINDTRICK SPOTLIGHT -- structurally distinct, so it gets its own layout */}
          <section className="dm-spotlight" id="mindtrick" aria-labelledby="dm-spotlight-heading">
            <div className="dm-spotlight__inner">
              <div>
                <span className="dm-spotlight__eyebrow">Our Platform</span>
                <h2 className="dm-spotlight__h2" id="dm-spotlight-heading">
                  MindTrick.io – Our Dedicated Digital Marketing Hub
                </h2>
                <p className="dm-spotlight__p">
                  At MindTrick.io, we bring together innovation, creativity, and
                  data-driven strategies to power digital growth. As our dedicated
                  digital marketing hub, MindTrick.io delivers result-oriented
                  solutions that help businesses build strong online visibility and
                  pursue sustainable growth.
                </p>
                <p className="dm-spotlight__highlight">
                  From performance marketing to brand storytelling, we combine
                  practical tools with expert judgement to run campaigns aimed at
                  making a measurable impact on your business’s digital presence.
                </p>
                <ul className="dm-spotlight__bullets">
                  <li>End-to-end digital marketing coordination under one platform</li>
                  <li>Data-driven campaigns focused on growth &amp; ROI</li>
                  <li>Strategy, creative execution &amp; continuous optimisation</li>
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
        </div>

        {/* WHERE WEBSITE DEVELOPMENT MEETS SEO */}
        <section className="dm-webdev" aria-labelledby="dm-webdev-heading">
          <div className="dm-webdev__inner">
            <div>
              <span className="dm-webdev__label">The Differentiator</span>
              <h2 className="dm-webdev__h2" id="dm-webdev-heading">
                Where <em>website development</em> meets SEO
              </h2>
              <p className="dm-webdev__p">
                An SEO strategy is only as strong as the website it’s built on. A
                site that’s slow, hard to crawl, or badly structured will always
                fight against the strategy layered on top of it. That’s why we
                pair SEO and digital marketing with our own{" "}
                <Link href="/services/website-development">website development</Link>{" "}
                team, building in Next.js and React — rather than handing you off
                to optimise a site neither of us built.
              </p>
              <Link href="/services/website-development" className="dm-webdev__link">
                See how we build SEO-ready websites
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <ul className="dm-webdev__list">
              <li><b>Modern architecture —</b> Next.js/React builds that are fast, crawlable and easy to extend as content and campaigns grow.</li>
              <li><b>Core Web Vitals —</b> page speed and stability engineered in, not patched on after launch.</li>
              <li><b>Structured data &amp; accessibility —</b> semantic HTML and schema markup that help both search engines and assistive technology understand the page.</li>
              <li><b>Conversion-focused UX —</b> pages designed around the action you actually want a visitor to take.</li>
              <li><b>Analytics from day one —</b> Google Analytics 4 and conversion tracking set up at launch, not months later.</li>
              <li><b>QA before it ships —</b> supported by our <Link href="/services/automation-testing">automation &amp; QA testing</Link> team, so changes don’t break what’s already working.</li>
            </ul>
          </div>
        </section>

        {/* SEO PROCESS */}
        <section className="dm-process" aria-labelledby="dm-process-heading">
          <div className="dm-process__inner">
            <div className="dm-process__head">
              <span className="dm-process__label">How We Work</span>
              <h2 className="dm-process__h2" id="dm-process-heading">A process built to <em>remove guesswork</em></h2>
              <p className="dm-process__sub">
                Six steps, repeated on a cycle — because SEO and digital marketing
                are never really “done.”
              </p>
            </div>
            <div className="dm-process__steps">
              {processSteps.map((s) => (
                <div className="dm-process__step" key={s.step}>
                  <div className="dm-process__num" aria-hidden="true">{s.step}</div>
                  <div>
                    <div className="dm-process__title">{s.title}</div>
                    <p className="dm-process__text">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="dm-industries" aria-labelledby="dm-industries-heading">
          <div className="dm-industries__inner">
            <div className="dm-industries__head">
              <span className="dm-industries__label">Who We Work With</span>
              <h2 className="dm-industries__h2" id="dm-industries-heading">Industries we <em>serve</em></h2>
              <p className="dm-industries__sub">
                The same industries we support across our other services —
                approached here through SEO, content and paid media.
              </p>
            </div>
            <div className="dm-industries__grid">
              {industries.map((ind) => (
                <div className="dm-industries__card" key={ind.name}>
                  <div className="dm-industries__icon" aria-hidden="true">{ind.icon}</div>
                  <div className="dm-industries__name">{ind.name}</div>
                </div>
              ))}
            </div>
            <p className="dm-industries__note">
              Working in real estate, architecture or construction? Our{" "}
              <Link href="/services/cad-gis-photogrammetry">CAD, GIS &amp; photogrammetry</Link>{" "}
              team can support the visual and mapping side of a project alongside
              the marketing that promotes it.
            </p>
          </div>
        </section>

        {/* BANGALORE / BENGALURU SEO */}
        <section className="dm-local" aria-labelledby="dm-local-heading">
          <div className="dm-local__inner">
            <span className="dm-local__label">Local SEO</span>
            <h2 className="dm-local__h2" id="dm-local-heading">Built for how <em>Bangalore</em> searches</h2>
            <p className="dm-local__p">
              Bangalore is one of India’s most competitive digital markets — a
              dense mix of technology companies, startups, retail, real estate and
              professional services all competing for attention across
              neighbourhoods from Koramangala and Indiranagar to Whitefield, HSR
              Layout, Electronic City and Jayanagar. Winning local search here
              takes more than adding “Bangalore” to a page title.
            </p>
            <p className="dm-local__p">
              We combine an accurate, well-maintained Google Business Profile with
              location-relevant on-page content, consistent citations and
              genuine organic authority — so a business shows up for the specific
              searches its customers are actually making, whether that’s a broad
              service search or something highly local.
            </p>
            <p className="dm-local__note">
              As a Bengaluru-headquartered team, we work with local businesses
              directly and understand the market we’re optimising for.
            </p>
          </div>
        </section>

        {/* INDIA SEO */}
        <section className="dm-india" aria-labelledby="dm-india-heading">
          <div className="dm-india__inner">
            <span className="dm-india__label">National SEO</span>
            <h2 className="dm-india__h2" id="dm-india-heading">SEO strategy that works <em>across India</em></h2>
            <p className="dm-india__p">
              India isn’t one search market. Search behaviour, competition and
              language preferences shift significantly between cities and
              regions, so a national SEO strategy has to account for where your
              customers actually are and how competitive the results are in each
              market you’re targeting.
            </p>
            <ul className="dm-india__list">
              <li>Location-based search &amp; regional search-behaviour differences</li>
              <li>Multilingual and regional-language considerations where relevant</li>
              <li>National keyword research &amp; content strategy</li>
              <li>Dedicated city or region pages only where there’s a genuine business reason for them</li>
              <li>Market-by-market competitive SERP analysis</li>
            </ul>
            <p className="dm-india__p">
              We’d rather build a smaller number of genuinely useful pages than
              dozens of thin, near-identical city pages that dilute a site’s
              authority and risk being treated as doorway pages by search engines.
            </p>
          </div>
        </section>

        {/* MEASUREMENT & REPORTING */}
        <section className="dm-measure" aria-labelledby="dm-measure-heading">
          <div className="dm-measure__inner">
            <div className="dm-measure__head">
              <span className="dm-measure__label">Measurement &amp; Reporting</span>
              <h2 className="dm-measure__h2" id="dm-measure-heading">Reported against numbers that <em>matter</em></h2>
              <p className="dm-measure__p">
                SEO and digital marketing performance is only useful if it’s
                measured properly. We report on a regular cadence using Google
                Search Console, Google Analytics 4 and Google Ads’ own reporting,
                so you always know what’s actually happening — not just a summary
                at the end of a quarter.
              </p>
            </div>
            <div className="dm-measure__grid">
              <div className="dm-measure__col">
                <div className="dm-measure__col-title">What we track</div>
                <ul className="dm-measure__list">
                  <li>Organic clicks &amp; impressions</li>
                  <li>Search visibility &amp; keyword positions</li>
                  <li>Organic conversions &amp; leads</li>
                  <li>Cost per lead &amp; conversion rate</li>
                  <li>Google Ads performance, including ROAS where applicable</li>
                  <li>Landing-page &amp; engagement performance</li>
                </ul>
              </div>
              <div className="dm-measure__col">
                <div className="dm-measure__col-title">Tools we report from</div>
                <div className="dm-measure__tools">
                  <span className="dm-measure__tool">Google Search Console</span>
                  <span className="dm-measure__tool">Google Analytics 4</span>
                  <span className="dm-measure__tool">Google Ads</span>
                  <span className="dm-measure__tool">Reporting dashboards (e.g. Looker Studio)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF / OUR APPROACH */}
        <section className="dm-proof" aria-labelledby="dm-proof-heading">
          <div className="dm-proof__inner">
            <div className="dm-proof__head">
              <span className="dm-proof__label">Our Approach</span>
              <h2 className="dm-proof__h2" id="dm-proof-heading">What we <em>measure</em>, and what’s still being built</h2>
              <p className="dm-proof__p">
                We won’t invent client results to fill this section. Here’s what
                we can genuinely show you today: direct feedback from a client we
                worked with on SEO, and an honest note on what’s still coming.
              </p>
            </div>
            <div className="dm-proof__grid">
              <div className="dm-proof__quote">
                <p className="dm-proof__quote-text">
                  “We hired them for SEO and ended up rebuilding our entire
                  digital presence. Page-one rankings for seventeen target
                  keywords within four months. Exceptional results, full stop.”
                </p>
                <p className="dm-proof__quote-who">
                  <b>Kavitha R.</b> — VP Digital Strategy, Meridian Finance ·{" "}
                  <Link href="/contact">more client feedback on our Contact page</Link>
                </p>
              </div>
              <div className="dm-proof__note">
                <span className="dm-proof__note-title">In progress</span>
                <p>
                  We’re building out dedicated, verified SEO case studies with
                  real before-and-after data. If you’d like to be one of the first
                  featured, <Link href="/contact">get in touch</Link>.
                </p>
                <p>
                  In the meantime, our <Link href="/insights">Insights blog</Link>{" "}
                  covers how we think about search and digital strategy, and our{" "}
                  <Link href="/about">About page</Link> has more on who we are and
                  how we work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI SEARCH / GEO */}
        <section className="dm-geo" aria-labelledby="dm-geo-heading">
          <div className="dm-geo__inner">
            <span className="dm-geo__label">AI Search &amp; GEO</span>
            <h2 className="dm-geo__h2" id="dm-geo-heading">Preparing for how <em>AI-powered search</em> is changing</h2>
            <p className="dm-geo__p">
              Search is no longer just a list of ten blue links. Google’s AI
              Overviews and other AI-powered systems increasingly summarise
              answers directly, and tools like ChatGPT, Gemini and Perplexity are
              becoming discovery surfaces of their own. The common thread across
              all of them is the same fundamentals good SEO has always relied on:
              clear, well-structured content; accurate, first-party information
              about a business; consistent entities and brand mentions; and
              technical implementation — structured data, clean HTML, crawlable
              pages — that makes it easy for any system, human or AI, to
              understand what a business actually does.
            </p>
            <p className="dm-geo__p">
              We build with that in mind — clear entity information, structured
              data and genuinely useful content — as part of standard SEO
              practice, not a separate service. We won’t claim this guarantees
              visibility inside any specific AI system; no one can honestly
              promise that. What we can do is make sure a business is represented
              accurately and clearly wherever people, or the AI systems
              increasingly answering on their behalf, go looking.
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="dm-benefits" aria-labelledby="dm-benefits-heading">
          <div className="dm-benefits__inner">
            <div className="dm-benefits__head">
              <span className="dm-benefits__label">Why Choose Us?</span>
              <h2 className="dm-benefits__h2" id="dm-benefits-heading">
                Benefits of partnering with <em>99 Visual</em>
              </h2>
              <p className="dm-benefits__sub">
                Digital marketing here means more than running ads — it’s about
                building visibility and connections that compound into long-term
                growth.
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
              Ready to grow your business <em>online</em>?
            </h2>
            <p className="dm-cta__sub">
              Get in touch for a free SEO consultation or digital marketing audit.
              We’ll map out the right strategy for your goals in Bangalore, across
              India, or internationally — and how we’ll measure it.
            </p>
            <div className="dm-cta__actions">
              <ConsultationCTA
                className="dm-cta__btn"
                ariaLabel="Get a free SEO consultation from 99 Visual Solutions"
                postTitle="Digital Marketing & SEO — CTA Strip (Primary)"
                postUrl="/services/digital-marketing-seo"
              >
                Get a Free SEO Consultation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ConsultationCTA>
              <ConsultationCTA
                className="dm-cta__btn dm-cta__btn--ghost"
                ariaLabel="Request a digital marketing audit from 99 Visual Solutions"
                postTitle="Digital Marketing & SEO — CTA Strip (Secondary)"
                postUrl="/services/digital-marketing-seo"
              >
                Request a Digital Marketing Audit
              </ConsultationCTA>
            </div>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="dm-sticky-cta">
          <ConsultationCTA
            className="dm-sticky-cta__btn"
            postTitle="Digital Marketing & SEO — Sticky Mobile CTA"
            postUrl="/services/digital-marketing-seo"
          >
            Get a Free SEO Consultation
          </ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />

    </>
  );
}