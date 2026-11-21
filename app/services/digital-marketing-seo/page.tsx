// app/services/digital-marketing-seo/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Digital Marketing & SEO — 99 Visual Solutions
//
// FULL UPGRADE (Nov 2026): audit-driven rewrite of every section in plain
// language, plus animated server-rendered infographics (one client
// InViewObserver drives them):
//   EcosystemDiagram + ChannelStageMatrix  channels × journey stages (A)
//   SeoArchitecture                        how SEO layers fit together (B)
//   AcquisitionFunnel                      awareness → retention (C)
//   SeoVsPaid                              organic vs paid, no winner (D)
//   LaunchTimeline                         social media workflow (E)
//   RequestFlow (content, email)           content workflow (F), email automation
//   MetricChain + AnalyticsDashboard       analytics & conversion maths (G)
//   IntentMap                              keyword research & search intent
//   SearchPipeline, LocalSearchMap, ProcessCycle, TechStackMap (existing)
//
// Honesty rules kept from earlier revisions and tightened:
//   - No ranking, traffic, lead or revenue promises anywhere.
//   - The unverified client quote ("page-one rankings for seventeen
//     keywords") was removed from this page; it remains on /contact.
//   - MindTrick section no longer shows filler stats ("10+", "∞").
//   - Every number in an infographic is labelled illustrative or a worked
//     example; the dashboard stays labelled as sample data.
//   - Case study block only shows what lib/case-studies.ts documents.
//
// Hero layout, ConsultationCTA lead-source tags (postTitle/postUrl), URL,
// canonical and JSON-LD plumbing are unchanged.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { preload } from 'react-dom';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import { caseStudies } from '@/lib/case-studies';
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import {
  InViewObserver,
  EcosystemDiagram,
  SearchPipeline,
  ProcessCycle,
  LocalSearchMap,
  AnalyticsDashboard,
  ChannelStageMatrix,
  SeoArchitecture,
  AcquisitionFunnel,
  SeoVsPaid,
  IntentMap,
  MetricChain,
  LaunchTimeline,
  RequestFlow,
  TechStackMap,
  type CycleStep,
  type ChannelRow,
  type FunnelStage,
  type FlowHop,
  type LaunchStop,
  type StackLayer,
} from "@/app/components/infographics";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  FaSearch, FaTools, FaPenNib, FaLink,
  FaAd, FaHashtag, FaShareAlt,
  FaFeatherAlt, FaEnvelope,
  FaMapMarkerAlt,
  FaChartLine, FaChartPie,
  FaSitemap, FaShoppingCart,
  FaCogs, FaLaptopCode,
  FaLightbulb, FaHome, FaHospital, FaShoppingBag, FaGraduationCap, FaIndustry,
  FaCompass, FaClipboardCheck, FaRoute, FaHammer, FaSlidersH,
  FaEyeSlash, FaMoneyBillWave, FaRandom, FaQuestionCircle, FaMobileAlt, FaHourglassHalf,
  FaUsers, FaPencilRuler, FaImage, FaCalendarAlt, FaComments, FaFileAlt,
  FaBullseye, FaUserTag, FaRobot, FaInbox, FaUserCheck, FaArrowRight,
  FaKey, FaCode, FaGlobe,
} from "react-icons/fa";
import {
  SiGooglesearchconsole, SiGoogleanalytics, SiGoogleads, SiMeta, SiLooker,
  SiGoogletagmanager, SiNextdotjs, SiReact, SiGooglemaps, SiInstagram,
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
const PAGE_PATH = "/services/digital-marketing-seo";
const PAGE_CANONICAL = `${BASE_SAFE}${PAGE_PATH}`;

// Existing on-disk hero banner, reused as the OG/Twitter image.
const OG_IMAGE = `${BASE_SAFE}/images/services/digital-marketing-seo-hero-banner.jpg`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

const META_DESCRIPTION =
  "Digital marketing and SEO services from a Bengaluru team: technical, on-page and local SEO, Google Ads, social, content, email and conversion work, reported honestly.";

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "Digital Marketing & SEO Company, Bangalore",
  description: META_DESCRIPTION,
  metadataBase: new URL(BASE_SAFE),
  alternates: { canonical: PAGE_CANONICAL },
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
    description: "SEO, Google Ads, social media, content, email and conversion optimisation planned as one programme by a Bengaluru-based team, for businesses across India and abroad.",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    images: [{ url: OG_IMAGE, width: 1717, height: 916, type: "image/jpeg", alt: "Digital marketing and SEO services by 99 Visual Solutions, Bengaluru" }],
    locale: "en_US",
    type:   "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Digital Marketing & SEO Company in Bangalore, India | 99 Visual",
    description: "SEO, Google Ads, social, content, email and conversion work, run as one programme by a Bengaluru-based team.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [{ url: OG_IMAGE, alt: "Digital marketing and SEO services by 99 Visual Solutions, Bengaluru" }],
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
type Service = { id: string; icon: ReactNode; title: string; description: string; highlight: string; bullets: string[] };

const seoServices: Service[] = [
  { id: "technical-seo", icon: <FaTools />, title: "Technical SEO",
    description: "Search engines have to crawl, render and index a page before it can rank. Technical SEO removes whatever gets in the way: slow templates, broken redirects, duplicate URLs, content that only appears after JavaScript runs.",
    highlight: "Findings are written as specific fixes your developers can act on, ranked by what blocks indexing first.",
    bullets: ["Crawlability, indexing, sitemaps and robots rules", "Core Web Vitals, page speed and mobile rendering", "Structured data, canonicals and redirect clean-up"] },
  { id: "onpage", icon: <FaPenNib />, title: "On-Page SEO",
    description: "On-page work makes each page clearly about one thing, in the words your customers use. That means titles, headings, copy, images and internal links that match what people are searching for.",
    highlight: "A well-matched page tends to rank better and convert better, because visitors find what they expected when they clicked.",
    bullets: ["Keyword and search-intent mapping per page", "Titles, meta descriptions and heading structure", "Internal links, URL structure and image SEO"] },
  { id: "local-seo", icon: <FaMapMarkerAlt />, title: "Local SEO",
    description: "For businesses that serve a city or neighbourhood, the map results often matter more than the ten blue links. Local SEO helps you appear when someone nearby searches for what you offer.",
    highlight: "It works when your Google Business Profile, location pages, citations and reviews all tell the same story, not when a city name is added to every title.",
    bullets: ["Google Business Profile set-up and upkeep", "Location pages where there's a real reason for one", "Citation consistency and review management"] },
  { id: "offpage", icon: <FaLink />, title: "Off-Page SEO & Digital PR",
    description: "Search engines treat links and mentions from other reputable sites as a sign of trust. Off-page SEO earns those signals through content worth citing, PR and genuine relationships.",
    highlight: "We don't buy links or use link schemes. They can bring short gains and long penalties.",
    bullets: ["Digital PR and relevant outreach", "Guest articles, citations and brand mentions", "Authority tracked through referral traffic and rankings"] },
  { id: "enterprise-seo", icon: <FaSitemap />, title: "Enterprise SEO",
    description: "Sites with thousands of pages, many templates or several regions need rules more than one-off fixes. A single template change can affect every product page at once.",
    highlight: "We work on templates, internal-linking rules and publishing workflows, then monitor so problems are caught before they spread.",
    bullets: ["Technical governance across large sites", "Scalable content and internal-linking frameworks", "Multi-region and multi-location monitoring"] },
  { id: "ecommerce-seo", icon: <FaShoppingCart />, title: "eCommerce SEO",
    description: "Online stores have their own problems: thin product pages, filters that create thousands of duplicate URLs, and products that come and go.",
    highlight: "The goal is product and category pages that rank for buying searches and are set up to sell once people land.",
    bullets: ["Product and category page optimisation", "Faceted navigation and duplicate handling", "Product structured data for rich results"] },
];

const paidServices: Service[] = [
  { id: "ppc", icon: <FaAd />, title: "Google Ads / PPC Management",
    description: "Google Ads puts you in front of people searching right now, which makes it useful for launches, promotions and testing demand while SEO builds. We plan keywords, write ads, match them to landing pages and track every conversion.",
    highlight: "We manage toward cost per lead or return on ad spend, not clicks. A cheap click that never converts is still wasted budget.",
    bullets: ["Keyword strategy, bidding and budgets", "Ad copy, landing-page alignment and A/B tests", "Conversion tracking set up before spend starts"] },
  { id: "meta-linkedin-ads", icon: <FaHashtag />, title: "Meta & LinkedIn Ads",
    description: "Paid social reaches people by interest, behaviour or job role before they search. Meta (Facebook and Instagram) suits visual products and broad audiences; LinkedIn suits B2B, where job title and company matter.",
    highlight: "Creative and audiences are tested and adjusted against real results each week, not left running unattended.",
    bullets: ["Facebook and Instagram campaigns", "LinkedIn Ads for B2B lead generation", "Creative testing, remarketing and reporting"] },
];

const socialContentServices: Service[] = [
  { id: "social-media", icon: <FaShareAlt />, title: "Social Media Marketing",
    description: "Social media works best when each platform gets content made for it, posted consistently, with someone replying to comments and messages. We plan, create and manage that for the platforms your customers use.",
    highlight: "Social topics come from the same calendar as SEO and email, so one good idea gets used across channels instead of once.",
    bullets: ["Platform strategy and monthly content calendars", "Graphics, carousels and short-form video", "Community management and monthly reporting"] },
  { id: "content-marketing", icon: <FaFeatherAlt />, title: "Content Marketing",
    description: "Useful content answers the questions people ask before they buy: how something works, what it costs, how to choose. Done well, it earns search traffic, gets shared and makes sales conversations easier.",
    highlight: "Every piece starts from real search demand and a clear purpose, and is written by people, not padded to hit a word count.",
    bullets: ["Content strategy and topic clusters", "Articles, guides and landing-page copy", "Distribution, internal linking and performance review"] },
];

const emailCroServices: Service[] = [
  { id: "email-automation", icon: <FaEnvelope />, title: "Email Marketing & Automation",
    description: "Most people aren't ready to buy on their first visit. Email keeps you in touch with useful, relevant messages until they are, without anyone sending follow-ups by hand.",
    highlight: "Lists are segmented by interest and stage, so a new subscriber, a repeat customer and a lapsed lead each get different messages.",
    bullets: ["Newsletters and campaign emails", "Automated welcome and nurture sequences", "Segmentation, CRM integration and deliverability"] },
  { id: "cro-analytics", icon: <FaChartPie />, title: "Conversion Rate Optimisation",
    description: "More traffic isn't always the answer. Often the faster win is getting more of your existing visitors to enquire. CRO finds where people drop off and tests changes to fix it.",
    highlight: "Changes are tested against real behaviour in GA4 rather than opinion, and only the ones that work are kept.",
    bullets: ["Landing-page and form improvements", "A/B testing and journey analysis", "GA4 conversion tracking tied to leads"] },
];

const allServices = [...seoServices, ...paidServices, ...socialContentServices, ...emailCroServices];

// ── Ecosystem matrix (A): stages × channels ───────────────────────────────
const journeyStages = ["Awareness", "Traffic", "Engagement", "Leads", "Conversion"];
const channelRows: ChannelRow[] = [
  { name: "SEO",                icon: <FaSearch />,    roles: [1, 2, 1, 1, 0] },
  { name: "Paid advertising",   icon: <FaAd />,        roles: [2, 2, 0, 1, 1] },
  { name: "Social media",       icon: <FaShareAlt />,  roles: [2, 1, 2, 0, 0] },
  { name: "Content",            icon: <FaFeatherAlt />, roles: [1, 2, 2, 1, 0] },
  { name: "Email",              icon: <FaEnvelope />,  roles: [0, 1, 2, 1, 2] },
  { name: "Conversion (CRO)",   icon: <FaBullseye />,  roles: [0, 0, 1, 2, 2] },
  { name: "Analytics",          icon: <FaChartPie />,  roles: [1, 1, 1, 1, 1] },
];

// ── Funnel (C) ────────────────────────────────────────────────────────────
const funnelStages: FunnelStage[] = [
  { stage: "Awareness",     question: "Do they know you exist?",              channels: ["Social media", "Display & video ads", "Digital PR"] },
  { stage: "Discovery",     question: "Do you show up when they search?",     channels: ["SEO", "Google Ads", "Google Business Profile"] },
  { stage: "Consideration", question: "Can they compare and trust you?",      channels: ["Content", "Case studies", "Reviews", "Remarketing"] },
  { stage: "Conversion",    question: "Is it easy to take the next step?",    channels: ["Landing pages", "Clear forms", "CRO testing"] },
  { stage: "Retention",     question: "Do they come back and refer others?",  channels: ["Email", "Social community", "Remarketing"] },
];

// ── Social workflow (E) ───────────────────────────────────────────────────
const socialStops: LaunchStop[] = [
  { title: "Audience research", note: "Who they are and where they spend time" },
  { title: "Content strategy",  note: "Themes, formats and posting rhythm" },
  { title: "Creative",          note: "Graphics, video and captions" },
  { title: "Publishing",        note: "Scheduled to a shared calendar" },
  { title: "Engagement",        note: "Replies, comments and messages" },
  { title: "Optimisation",      note: "Boost what works, drop what doesn't" },
  { title: "Reporting",         note: "Monthly results and next steps" },
];

// ── Content workflow (F) ──────────────────────────────────────────────────
const contentFlow: FlowHop[] = [
  { title: "Research",      note: "Search demand, questions, competitors", icon: <FaSearch />,      tone: "orange" },
  { title: "Planning",      note: "Topics, clusters and a calendar",       icon: <FaCalendarAlt />, tone: "blue" },
  { title: "Writing",       note: "Original, expert-reviewed copy",        icon: <FaPencilRuler />, tone: "blue" },
  { title: "Visuals",       note: "Diagrams, images and video",            icon: <FaImage />,       tone: "blue" },
  { title: "Distribution",  note: "Social, email and outreach",            icon: <FaShareAlt />,    tone: "blue" },
  { title: "Internal links", note: "Connect it to related pages",          icon: <FaLink />,        tone: "green" },
  { title: "Analysis",      note: "Rankings, traffic and leads it drives", icon: <FaChartLine />,   tone: "green" },
];

// ── Email automation flow ─────────────────────────────────────────────────
const emailFlow: FlowHop[] = [
  { title: "Sign-up",   note: "Form, download or purchase",        icon: <FaInbox />,     tone: "orange" },
  { title: "Segment",   note: "Tagged by interest and stage",      icon: <FaUserTag />,   tone: "blue" },
  { title: "Welcome",   note: "Sent straight away",                icon: <FaEnvelope />,  tone: "blue" },
  { title: "Nurture",   note: "Useful emails over a few weeks",    icon: <FaRobot />,     tone: "blue" },
  { title: "Sales-ready", note: "Engaged leads passed to your team", icon: <FaUserCheck />, tone: "green" },
];

type Cluster = { id: string; eyebrow: string; heading: ReactNode; intro: string; list: Service[]; cols: 2 | 3; visuals: ReactNode[] };

const clusters: Cluster[] = [
  {
    id: "seo-services",
    eyebrow: "SEO Services",
    heading: <>Search engine optimisation built on <em>solid foundations</em></>,
    intro: "Technical, on-page, local and off-page SEO, plus enterprise and eCommerce work for larger sites. Each piece supports the others.",
    list: seoServices,
    cols: 3,
    visuals: [<SeoArchitecture key="arch" />],
  },
  {
    id: "paid-advertising",
    eyebrow: "Paid Advertising",
    heading: <>Google Ads and paid social that <em>pay for themselves</em>, or get changed</>,
    intro: "PPC advertising gives you visibility while SEO builds. Here's how the two compare, so you can decide where budget should go.",
    list: paidServices,
    cols: 2,
    visuals: [<SeoVsPaid key="svp" />],
  },
  {
    id: "social-content",
    eyebrow: "Social Media & Content Marketing",
    heading: <>Content people <em>want to read</em>, shared where they already are</>,
    intro: "Content marketing and social media marketing run from one calendar, so research done once feeds articles, posts and emails.",
    list: socialContentServices,
    cols: 2,
    visuals: [
      <LaunchTimeline key="social" stops={socialStops} badge="Social media workflow" caption="A monthly cycle: research and planning up front, publishing and replies through the month, then a report that shapes next month's plan." />,
      <RequestFlow key="content" id="ig-content-flow" hops={contentFlow} badge="Content marketing workflow" legend={{ out: "Production", back: "What we learn" }} caption="Each article is linked into related pages and measured after publishing; what performs well shapes the next round of topics." />,
    ],
  },
  {
    id: "email-cro",
    eyebrow: "Email Marketing & Conversion Optimisation",
    heading: <>Turn interest into <em>enquiries</em></>,
    intro: "Email keeps leads warm until they're ready; conversion work makes sure the page they land on makes the next step easy.",
    list: emailCroServices,
    cols: 2,
    visuals: [
      <RequestFlow key="email" id="ig-email-flow" hops={emailFlow} badge="An automated email journey" legend={{ out: "Subscriber path", back: "Engagement data" }} caption="Set up once, then refined using open, click and reply data. Subscribers who stop engaging get fewer emails, which protects deliverability." />,
    ],
  },
];

// ── Challenges ────────────────────────────────────────────────────────────
const challenges = [
  { icon: <FaEyeSlash />,      title: "Customers can't find you online",   text: "Competitors show up for the searches your customers make, while your site sits on page three or isn't indexed properly." },
  { icon: <FaMoneyBillWave />, title: "Ad spend without clear returns",    text: "Money goes into Google or Meta every month, but nobody can say which campaigns bring in leads and which just bring clicks." },
  { icon: <FaRandom />,        title: "Channels that don't talk",          text: "SEO, ads, social and email are handled by different people with different reports, and none of it adds up to a plan." },
  { icon: <FaMobileAlt />,     title: "Traffic that doesn't convert",      text: "Visitors arrive and leave. Slow pages, unclear offers or long forms lose people who were ready to enquire." },
  { icon: <FaQuestionCircle />, title: "Reports full of vanity metrics",   text: "Impressions and followers look good in a deck, but they don't tell you whether marketing is paying for itself." },
  { icon: <FaHourglassHalf />, title: "No time to keep it all running",    text: "Posting, testing, writing and reporting take hours every week, and they're the first things dropped when the team is busy." },
];

// ── Process ───────────────────────────────────────────────────────────────
const processSteps: CycleStep[] = [
  { step: "01", title: "Discover",         icon: <FaCompass />,        text: "We learn your goals, customers, margins and what's been tried before, so the plan fits how your business makes money." },
  { step: "02", title: "Audit",            icon: <FaClipboardCheck />, text: "A technical, content and campaign audit using Search Console, GA4 and your ad accounts shows what's holding results back today." },
  { step: "03", title: "Strategy",         icon: <FaRoute />,          text: "Keyword research, intent mapping and a channel plan decide where SEO, ads, content and social should each carry weight, and what to measure." },
  { step: "04", title: "Build",            icon: <FaHammer />,         text: "Technical fixes, content, landing pages and campaigns are built and tracking is checked before anything goes live." },
  { step: "05", title: "Optimise",         icon: <FaSlidersH />,       text: "Bids, creative, content and pages are adjusted every week or month based on what the data shows." },
  { step: "06", title: "Report & improve", icon: <FaChartLine />,      text: "A monthly report covers rankings, traffic, leads and cost per lead, with what we're changing next and why." },
];

// ── Deliverables ──────────────────────────────────────────────────────────
const deliverableGroups = [
  { title: "At the start", items: ["Website SEO audit with prioritised fixes", "Keyword research and search-intent map", "Technical SEO recommendations for your developers", "Analytics and conversion tracking check"] },
  { title: "Every month", items: ["On-page optimisation and internal-linking updates", "Content plan and published articles", "Social media content calendar", "Campaign set-up, testing and optimisation", "Email campaign planning and sends"] },
  { title: "Where relevant", items: ["Local SEO and Google Business Profile optimisation", "Link-building and digital PR plan", "Landing-page recommendations and A/B tests", "Monthly performance report with next steps"] },
];

// ── Industries ────────────────────────────────────────────────────────────
const industries = [
  { icon: <FaLightbulb />,     name: "Startups & Technology",      note: "Launch campaigns, product content and B2B lead generation on LinkedIn." },
  { icon: <FaHome />,          name: "Real Estate & Construction", note: "Local search, project landing pages and lead forms for site visits." },
  { icon: <FaHospital />,      name: "Healthcare",                 note: "Local SEO for clinics, appointment journeys and trustworthy content." },
  { icon: <FaShoppingBag />,   name: "E-Commerce & Retail",        note: "Product SEO, shopping campaigns, remarketing and email flows." },
  { icon: <FaGraduationCap />, name: "Education",                  note: "Course pages, enquiry campaigns around admission seasons." },
  { icon: <FaIndustry />,      name: "Manufacturing",              note: "Technical content and search visibility for specialist B2B buyers." },
];

// ── Tools ─────────────────────────────────────────────────────────────────
const toolLayers: StackLayer[] = [
  { name: "Search", note: "Visibility, indexing and local presence", tone: "blue",
    tools: [ { name: "Google Search Console", icon: <SiGooglesearchconsole /> }, { name: "Google Business Profile", icon: <SiGooglemaps /> }, { name: "Structured data", icon: <FaCode /> } ] },
  { name: "Analytics", note: "What visitors do and what converts", tone: "green",
    tools: [ { name: "Google Analytics 4", icon: <SiGoogleanalytics /> }, { name: "Google Tag Manager", icon: <SiGoogletagmanager /> }, { name: "Looker Studio", icon: <SiLooker /> } ] },
  { name: "Advertising", note: "Paid search and paid social", tone: "orange",
    tools: [ { name: "Google Ads", icon: <SiGoogleads /> }, { name: "Meta Ads", icon: <SiMeta /> }, { name: "LinkedIn Ads", icon: <FaUsers /> } ] },
  { name: "Content & social", note: "Publishing and community", tone: "blue",
    tools: [ { name: "Instagram & Facebook", icon: <SiInstagram /> }, { name: "LinkedIn", icon: <FaComments /> }, { name: "Email & CRM", icon: <FaEnvelope /> } ] },
  { name: "Website", note: "Where every channel sends people", tone: "green",
    tools: [ { name: "Next.js", icon: <SiNextdotjs /> }, { name: "React", icon: <SiReact /> }, { name: "Landing pages", icon: <FaFileAlt /> } ] },
];

// ── Why choose ────────────────────────────────────────────────────────────
const benefits = [
  { icon: <FaCogs />,       title: "One plan across channels",   description: "SEO, ads, social, content and email are planned together, so each channel supports the others instead of competing for budget." },
  { icon: <FaLaptopCode />, title: "Developers on the same team", description: "When the website is what's holding results back, our own developers fix it. No waiting on a separate agency." },
  { icon: <FaChartLine />,  title: "Reporting that ties to leads", description: "Monthly reports follow the chain from visitors to leads and cost per lead, not just impressions and followers." },
  { icon: <FaKey />,        title: "You own everything",          description: "Ad accounts, analytics, content and data stay in your name. If we part ways, nothing has to be rebuilt." },
  { icon: <FaGlobe />,      title: "Local and national",          description: "A Bengaluru team that knows the local market, with experience planning SEO for businesses selling across India and abroad." },
  { icon: <FaPenNib />,     title: "Honest about timelines",      description: "We tell you when SEO is likely to take months, when ads will be faster, and when neither is the right fix." },
];

// Hero ticker — the disciplines we offer (decorative, aria-hidden).
const pipeline = [
  "Technical SEO", "On-Page SEO", "Local SEO · Bangalore", "Google Ads (PPC)",
  "Meta & LinkedIn Ads", "Content Marketing", "Email Automation", "Conversion Optimisation", "GA4 Reporting",
];

// ── FAQ (feeds both the visible section and FAQPage JSON-LD) ──────────────
const dmFaqs = [
  {
    question: "What does a digital marketing agency actually do for my business?",
    answer: `We plan and run the channels that help customers find and choose you online: SEO, Google Ads, social media, content, email and the landing pages they all point to. Because we also build websites, we can fix site problems that hold marketing back instead of working around them. Contact ${CONTACT_EMAIL} for a free consultation.`,
  },
  {
    question: "What SEO services do you provide?",
    answer: "Technical SEO (indexing, speed, Core Web Vitals, structured data), on-page SEO (keyword research, content and internal links), local SEO (Google Business Profile and location pages), off-page SEO and digital PR, plus enterprise and eCommerce SEO for large or catalogue-driven sites. Every engagement starts with an audit of how your site performs today.",
  },
  {
    question: "How long does SEO take to show results?",
    answer: "It depends on your site, your competition and how much needs fixing. Technical fixes can show up in Search Console within weeks, but meaningful growth in rankings and organic leads usually takes several months of steady work. We'll give you an honest view for your situation after the audit, and we never promise specific rankings.",
  },
  {
    question: "Should I invest in SEO or Google Ads?",
    answer: "Often both, in different proportions over time. Google Ads brings visibility within days but stops when you stop paying. SEO takes longer but builds traffic you don't pay for per click. Many businesses start with more ad spend and shift budget toward SEO and content as organic traffic grows.",
  },
  {
    question: "How much do your digital marketing services cost?",
    answer: "It depends on scope: a one-off technical audit, a local SEO programme and a multi-channel campaign need very different effort and ad budgets. After a free consultation we propose a scope and fee that fits your goals, with ad spend kept separate and paid directly to the platforms.",
  },
  {
    question: "Do you manage Google Ads, Meta and LinkedIn campaigns?",
    answer: "Yes. We handle strategy, keywords and audiences, ad creative, landing-page alignment, conversion tracking and ongoing optimisation. Ad accounts stay in your name so you keep full access and history.",
  },
  {
    question: "Do you provide local SEO in Bangalore?",
    answer: "Yes. We help Bangalore businesses appear in local and Maps results through Google Business Profile optimisation, location-relevant content, consistent citations and review management. We also run national SEO for businesses selling across India.",
  },
  {
    question: "How do you measure and report results?",
    answer: "We use Google Search Console for search visibility, GA4 for engagement and conversions, and the ad platforms for paid results, combined into a monthly report. It covers rankings, traffic, leads, conversion rate and cost per lead, plus what we're changing next.",
  },
  {
    question: "Can the same team handle SEO and website development?",
    answer: "Yes, and it usually helps. Many SEO problems are really website problems, such as slow templates, missing server-rendered content or messy redirects. Our development team builds in Next.js and React, so fixes can be made directly instead of passed between vendors.",
  },
  {
    question: "What is MindTrick.io?",
    answer: "MindTrick.io is the brand we use for our digital marketing work. It's where our performance marketing, SEO and content services are coordinated, run by the same team behind 99 Visual Solutions.",
  },
  {
    question: "Will we own our accounts, content and data?",
    answer: "Yes. Analytics properties, ad accounts, Google Business Profile, content and reports belong to you. We work with access you grant, so nothing is lost if the engagement ends.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
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
    description: "Technical, on-page, local, off-page, enterprise and eCommerce SEO, Google Ads and paid social, social media marketing, content marketing, email marketing and automation, and conversion rate optimisation, delivered by a Bengaluru-based team for clients across India and internationally.",
    pathname:    PAGE_PATH,
    image:       OG_IMAGE,
    areaServed:  dmAreaServed,
  }),
  "@id": `${PAGE_CANONICAL}#service`,
  serviceType: "SEO & Digital Marketing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Digital Marketing & SEO Services",
    itemListElement: allServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
};

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
    width:     1717,
    height:    916,
    caption:   "Digital marketing and SEO services by 99 Visual Solutions, Bengaluru",
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

// SEO case study (lib/case-studies.ts) — only what that record documents.
const seoCase = caseStudies.find((c) => c.slug === "technical-seo-99visual");

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function DigitalMarketing() {
  // The hero image is a CSS background, which the browser only discovers
  // after downloading and parsing the stylesheet. Preloading it lets the
  // largest above-the-fold image (the LCP element) start downloading at once.
  preload('/images/services/digital-marketing-seo-hero-banner.jpg', { as: 'image', fetchPriority: 'high' });
  return (
    <>
      <style>{`
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
          position:relative;min-height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/digital-marketing-seo-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .dm-hero { min-height: 100svh; } }
        @supports (height: 100dvh) { .dm-hero { min-height: 100dvh; } }
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
          display:flex;align-items:center;overflow:visible;
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
        .dm-intro__inner{max-width:1180px;margin:0 auto;}
        .dm-intro__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.92fr);gap:3rem;align-items:center;margin-bottom:2.5rem;}
        .dm-intro__grid .dm-intro__p:last-child{margin-bottom:0;}
        @media(max-width:960px){.dm-intro__grid{grid-template-columns:1fr;gap:2.25rem;}.dm-intro__visual{max-width:520px;margin:0 auto;}}
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
        .dm-webdev__pipeline{max-width:1180px;margin:3.5rem auto 0;padding-top:2.75rem;border-top:1px solid var(--dm-line);}
        .dm-webdev__pipe-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;margin:0 0 -1.5rem;}

        /* PROCESS */
        .dm-process{background:var(--dm-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-process__inner{max-width:1180px;margin:0 auto;}
        .dm-process__head{margin-bottom:3rem;max-width:640px;}
        .dm-process__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-process__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-process__h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-process__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0;}

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
        .dm-local__inner{max-width:1180px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3.5rem;align-items:center;}
        @media(max-width:960px){.dm-local__inner{grid-template-columns:1fr;gap:2.25rem;}}
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


        /* ══ FULL UPGRADE (Nov 2026) ═══════════════════════════════════ */
        .dm-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--dm-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .dm-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--dm-ink);margin:0 0 .8rem;}
        .dm-h2 em{font-style:normal;color:var(--dm-blue);}
        .dm-sub{font-family:'Inter',sans-serif;font-size:.94rem;font-weight:300;line-height:1.8;color:var(--dm-muted);margin:0;}
        .dm-sub a{color:var(--dm-blue);text-decoration:underline;text-decoration-color:rgba(46,92,255,.35);text-underline-offset:2px;}
        .dm-head{max-width:700px;margin-bottom:2.5rem;}
        .dm-benefit-card__title{margin-top:0;}
        .dm-head--center{margin-left:auto;margin-right:auto;text-align:center;}

        /* Challenges */
        .dm-pain{background:var(--dm-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-pain__inner{max-width:1120px;margin:0 auto;}
        .dm-pain__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;}
        @media(max-width:960px){.dm-pain__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.dm-pain__grid{grid-template-columns:1fr;}}
        .dm-pain__card{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:16px;padding:1.6rem 1.5rem;}
        .dm-pain__icon{color:var(--dm-blue);font-size:1.15rem;margin-bottom:.9rem;}
        .dm-pain__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--dm-ink);margin:0 0 .45rem;}
        .dm-pain__text{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.7;color:var(--dm-muted);margin:0;}
        .dm-pain__cta{text-align:center;margin-top:2.5rem;}

        /* Intro extras */
        .dm-intro__matrix{margin-top:2.5rem;}
        .dm-webdev__list li{display:block;}
        .dm-webdev__list li b{margin-right:.3rem;}

        /* Cluster visuals */
        .dm-cluster__visual{margin:0 0 2.5rem;}
        .dm-cluster__visual + .dm-cluster__visual{margin-top:-1rem;}

        /* Keyword intent */
        .dm-intentsec{background:var(--dm-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-intentsec__inner{max-width:1180px;margin:0 auto;}
        .dm-intentsec__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:2rem;}
        @media(max-width:860px){.dm-intentsec__grid{grid-template-columns:1fr;}}
        .dm-intentsec__item{border-top:2px solid var(--dm-blue);padding-top:1rem;}
        .dm-intentsec__item h3{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--dm-ink);margin:0 0 .4rem;}
        .dm-intentsec__item p{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.7;color:var(--dm-muted);margin:0;}

        /* Funnel section */
        .dm-funnel{background:var(--dm-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-funnel__inner{max-width:1100px;margin:0 auto;}

        /* Measurement additions */
        .dm-measure__chain{margin-bottom:2rem;}
        .dm-measure__dash{margin-bottom:2rem;}

        /* Tools */
        .dm-tools{background:var(--dm-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-tools__inner{max-width:1000px;margin:0 auto;}

        /* Deliverables */
        .dm-deliv{background:var(--dm-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-deliv__inner{max-width:1120px;margin:0 auto;}
        .dm-deliv__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:900px){.dm-deliv__grid{grid-template-columns:1fr;}}
        .dm-deliv__col{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:16px;padding:1.6rem 1.6rem 1.7rem;}
        .dm-deliv__col h3{font-family:'IBM Plex Mono',monospace;font-size:.74rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--dm-blue);margin:0 0 1rem;}
        .dm-deliv__col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.7rem;}
        .dm-deliv__col li{font-family:'Inter',sans-serif;font-size:.87rem;line-height:1.55;color:var(--dm-ink);display:flex;gap:.6rem;}
        .dm-deliv__col li::before{content:'✓';color:#1A9E53;font-weight:700;flex-shrink:0;}
        .dm-deliv__note{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:300;line-height:1.7;color:var(--dm-muted);margin:1.5rem 0 0;text-align:center;}

        /* Industries with notes */
        .dm-industries__grid{grid-template-columns:repeat(3,1fr);}
        @media(max-width:900px){.dm-industries__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.dm-industries__grid{grid-template-columns:1fr;}}
        .dm-industries__card{text-align:left;display:grid;grid-template-columns:auto 1fr;column-gap:.9rem;align-items:start;padding:1.3rem 1.3rem;}
        .dm-industries__icon{grid-row:1 / span 2;margin:0;width:38px;height:38px;border-radius:10px;background:rgba(46,92,255,.08);display:grid;place-items:center;font-size:.95rem;}
        .dm-industries__name{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;margin:0 0 .25rem;}
        .dm-industries__desc{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:300;line-height:1.6;color:var(--dm-muted);margin:0;}

        /* India list inside local section */
        .dm-local__india{max-width:1180px;margin:3rem auto 0;padding-top:2.5rem;border-top:1px solid var(--dm-line);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2.5rem;}
        @media(max-width:860px){.dm-local__india{grid-template-columns:1fr;gap:1rem;}}

        /* Case study */
        .dm-case{background:var(--dm-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--dm-line);}
        .dm-case__inner{max-width:1120px;margin:0 auto;}
        .dm-case__card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2.5rem;background:var(--dm-surface);border:1px solid var(--dm-line);border-radius:22px;padding:2rem;}
        @media(max-width:900px){.dm-case__card{grid-template-columns:1fr;gap:1.6rem;padding:1.4rem;}}
        .dm-case__kind{font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--dm-blue);}
        .dm-case__title{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.15rem,2vw,1.4rem);font-weight:700;line-height:1.3;color:var(--dm-ink);margin:.5rem 0 .8rem;}
        .dm-case__title a{color:inherit;text-decoration:none;}
        .dm-case__title a:hover{color:var(--dm-blue);}
        .dm-case__p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;line-height:1.75;color:var(--dm-muted);margin:0 0 1rem;}
        .dm-case__h{font-family:'IBM Plex Mono',monospace;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--dm-ink);margin:1.1rem 0 .55rem;}
        .dm-case__steps{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;}
        .dm-case__steps li{display:flex;align-items:center;gap:.4rem;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:500;color:var(--dm-ink);}
        .dm-case__steps li span{background:rgba(46,92,255,.07);border:1px solid rgba(46,92,255,.2);border-radius:100px;padding:.28rem .75rem;}
        .dm-case__steps li:not(:last-child)::after{content:'→';color:var(--dm-blue);}
        .dm-case__ws{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem;}
        @media(max-width:520px){.dm-case__ws{grid-template-columns:1fr;}}
        .dm-case__ws li{background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:12px;padding:.7rem .85rem;}
        .dm-case__ws b{display:block;font-family:'Space Grotesk',sans-serif;font-size:.84rem;font-weight:600;color:var(--dm-ink);margin-bottom:.15rem;}
        .dm-case__ws span{font-family:'Inter',sans-serif;font-size:.76rem;font-weight:300;line-height:1.5;color:var(--dm-muted);}
        .dm-case__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem;}
        .dm-case__list li{font-family:'Inter',sans-serif;font-size:.84rem;line-height:1.6;color:var(--dm-ink);display:flex;gap:.55rem;}
        .dm-case__list li::before{content:'✓';color:#1A9E53;font-weight:700;flex-shrink:0;}
        .dm-case__honest{font-family:'Inter',sans-serif;font-size:.78rem;line-height:1.6;color:var(--dm-muted);border-left:2px solid var(--dm-line);padding-left:.8rem;margin:1rem 0 0;}
        .dm-case__links{display:flex;flex-wrap:wrap;gap:1.25rem;margin-top:1.3rem;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;}
        .dm-case__links a{color:var(--dm-blue);text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;}
        .dm-case__links a:hover{text-decoration:underline;}
        .dm-case__more{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.7;color:var(--dm-muted);margin:1.5rem 0 0;text-align:center;}
        .dm-case__more a{color:var(--dm-blue);}

        /* MindTrick (no stats panel any more) */
        .dm-spotlight__inner--solo{grid-template-columns:1fr;max-width:820px;}

        /* CTA steps */
        .dm-cta__inner{max-width:880px;}
        .dm-cta__sub{max-width:600px;margin-left:auto;margin-right:auto;}
        .dm-cta__steps{list-style:none;margin:0 0 2.4rem;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;counter-reset:dmstep;text-align:left;}
        @media(max-width:700px){.dm-cta__steps{grid-template-columns:1fr;}}
        .dm-cta__steps li{counter-increment:dmstep;background:var(--dm-paper);border:1px solid var(--dm-line);border-radius:14px;padding:1.1rem 1.2rem;display:grid;grid-template-columns:auto 1fr;column-gap:.8rem;}
        .dm-cta__steps li::before{content:counter(dmstep);grid-row:1 / span 2;width:30px;height:30px;border-radius:50%;background:var(--dm-blue);color:#fff;display:grid;place-items:center;font-family:'IBM Plex Mono',monospace;font-size:.8rem;font-weight:600;}
        .dm-cta__steps b{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--dm-ink);}
        .dm-cta__steps span{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:300;line-height:1.55;color:var(--dm-muted);}

        @media(prefers-reduced-motion:reduce){
          .dm-page *,.dm-page *::before,.dm-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <script
        id="schema-dm-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(dmGraph) }}
      />

      <div className="dm-page">
        {/* ══ 1. HERO ═══════════════════════════════════════════════════════ */}
        <section className="dm-hero" aria-labelledby="dm-hero-heading">
          <div aria-hidden="true">
            <div className="dm-hero__grain" />
          </div>
          <div className="dm-corner dm-corner--tl" aria-hidden="true" />
          <div className="dm-corner dm-corner--tr" aria-hidden="true" />
          <div className="dm-corner dm-corner--bl" aria-hidden="true" />
          <div className="dm-corner dm-corner--br" aria-hidden="true" />

          <nav className="dm-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/"><span>Home</span></Link></li>
              <li className="dm-breadcrumb__sep" aria-hidden="true">/</li>
              <li><Link href="/services"><span>Services</span></Link></li>
              <li className="dm-breadcrumb__sep" aria-hidden="true">/</li>
              <li>
                <Link href={PAGE_PATH} aria-current="page"><span>Digital Marketing &amp; SEO</span></Link>
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
                We help businesses get found on Google, spend ad budgets where they pay back, and
                turn more visitors into enquiries. SEO, paid ads, social, content and email are
                planned as one programme by a team that also builds websites.
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
                  postUrl={PAGE_PATH}
                >
                  Get a Free SEO Consultation
                </ConsultationCTA>
                <ConsultationCTA
                  className="dm-hero__cta dm-hero__cta--ghost"
                  ariaLabel="Request a digital marketing audit from 99 Visual Solutions"
                  postTitle="Digital Marketing & SEO — Hero (Secondary)"
                  postUrl={PAGE_PATH}
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
                  <span className="dm-ticker__item" key={i}><b>{t}</b></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. CHALLENGES ═════════════════════════════════════════════════ */}
        <section className="dm-pain" aria-labelledby="dm-pain-heading">
          <div className="dm-pain__inner">
            <div className="dm-head dm-head--center">
              <span className="dm-label">Sound Familiar?</span>
              <h2 className="dm-h2" id="dm-pain-heading">
                Most marketing problems aren&rsquo;t about <em>effort</em>. They&rsquo;re about direction.
              </h2>
              <p className="dm-sub">These are the situations business owners describe most often in a first call.</p>
            </div>
            <div className="dm-pain__grid">
              {challenges.map((c) => (
                <div className="dm-pain__card" key={c.title}>
                  <div className="dm-pain__icon" aria-hidden="true">{c.icon}</div>
                  <h3 className="dm-pain__title">{c.title}</h3>
                  <p className="dm-pain__text">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="dm-pain__cta">
              <ConsultationCTA
                className="dm-cta__btn dm-cta__btn--ghost"
                ariaLabel="Request a digital marketing audit from 99 Visual Solutions"
                postTitle="Digital Marketing & SEO — Challenges"
                postUrl={PAGE_PATH}
              >
                Ask for an honest audit
              </ConsultationCTA>
            </div>
          </div>
        </section>

        {/* ══ 3. PHILOSOPHY + ECOSYSTEM (A) ═════════════════════════════════ */}
        <section className="dm-intro" aria-labelledby="dm-intro-heading">
          <div className="dm-intro__inner">
            <div className="dm-intro__grid">
              <div className="dm-intro__copy">
                <span className="dm-intro__label">Our Approach</span>
                <h2 className="dm-intro__h2" id="dm-intro-heading">
                  Channels that <em>work together</em>, measured against real leads
                </h2>
                <p className="dm-intro__p">
                  Most businesses don&apos;t need more marketing activity. They need the activity they
                  already pay for to point in one direction. A blog post should target a search people
                  make, get shared on social, feed an email, and link to a page that makes it easy to
                  enquire.
                </p>
                <p className="dm-intro__p">
                  That&apos;s how we run digital marketing at 99 Visual Solutions: one plan across SEO,
                  paid ads, social, content and email, checked every month against Search Console, GA4
                  and the leads that actually come in. Engagements range from a one-off technical SEO
                  audit to ongoing management of every channel, with <strong>one monthly report</strong>{" "}
                  covering all of it.
                </p>
              </div>
              <EcosystemDiagram
                className="dm-intro__visual"
                caption="Six channels, one plan. Each one hands something useful to the next."
              />
            </div>
            <ChannelStageMatrix
              className="dm-intro__matrix"
              stages={journeyStages}
              rows={channelRows}
              caption="No channel does everything. Social is strong at awareness, SEO and ads at bringing people to the site, email and conversion work at turning interest into enquiries. Analytics measures every stage."
            />
          </div>
        </section>

        {/* ══ 4–10. SERVICE GROUPS: SEO (B) · Paid (D) · Social & content
            (E, F) · Email & CRO ═══════════════════════════════════════════ */}
        <div id="services">
          {clusters.map((cluster) => (
            <section key={cluster.id} id={cluster.id} className="dm-cluster" aria-labelledby={`dm-cluster-h-${cluster.id}`}>
              <div className="dm-cluster__inner">
                <div className="dm-cluster__head">
                  <span className="dm-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="dm-cluster__h2" id={`dm-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="dm-cluster__intro">{cluster.intro}</p>
                </div>
                {cluster.visuals.map((v, i) => <div className="dm-cluster__visual" key={i}>{v}</div>)}
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
        </div>

        {/* ══ KEYWORD RESEARCH & SEARCH INTENT ══════════════════════════════ */}
        <section className="dm-intentsec" aria-labelledby="dm-intent-heading">
          <div className="dm-intentsec__inner">
            <div className="dm-head">
              <span className="dm-label">Keyword Research &amp; Search Intent</span>
              <h2 className="dm-h2" id="dm-intent-heading">Start with what people <em>actually search</em></h2>
              <p className="dm-sub">
                Before writing a page or launching a campaign, we look at the searches your customers
                make: how often, how competitive, and what they&apos;re hoping to find. That decides which
                pages to create, which to improve and which keywords are worth paying for.
              </p>
            </div>
            <IntentMap />
            <div className="dm-intentsec__grid">
              <div className="dm-intentsec__item">
                <h3>Demand before volume</h3>
                <p>A keyword searched 50 times a month by buyers can be worth more than one searched 5,000 times by students. We weigh intent and fit, not just numbers.</p>
              </div>
              <div className="dm-intentsec__item">
                <h3>One page per intent</h3>
                <p>Two pages chasing the same search compete with each other. Mapping keywords to pages keeps each one focused and avoids that overlap.</p>
              </div>
              <div className="dm-intentsec__item">
                <h3>Shared with paid search</h3>
                <p>The same research tells Google Ads which terms convert and which to exclude, so organic and paid don&apos;t duplicate effort.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WEBSITE + SEO ═════════════════════════════════════════════════ */}
        <section className="dm-webdev" aria-labelledby="dm-webdev-heading">
          <div className="dm-webdev__inner">
            <div>
              <span className="dm-webdev__label">Where Website Development Meets SEO</span>
              <h2 className="dm-webdev__h2" id="dm-webdev-heading">
                When the <em>website itself</em> is the ranking problem
              </h2>
              <p className="dm-webdev__p">
                Content and links can&apos;t rank pages that search engines struggle to crawl, render or
                trust. So every engagement starts by checking the site itself, and findings are written
                as specific tickets your developers can act on. When the honest answer is that the
                platform needs replacing, our{" "}
                <Link href="/services/website-development">website development</Link> team builds it
                with SEO in the brief from day one, with{" "}
                <Link href="/services/automation-testing">QA testing</Link> before launch and{" "}
                <Link href="/services/it-consulting">IT consulting</Link> for hosting decisions.
              </p>
              <Link href="/services/website-development" className="dm-webdev__link">
                How we build SEO-ready websites
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <ul className="dm-webdev__list">
              <li><b>Indexing status:</b> Search Console&apos;s page indexing report read reason by reason, because &ldquo;Crawled, currently not indexed&rdquo; and &ldquo;Duplicate, Google chose different canonical&rdquo; need different fixes.</li>
              <li><b>Rendering:</b> whether main content and links are in the server-rendered HTML or only appear after JavaScript runs.</li>
              <li><b>Canonicals, redirects &amp; sitemaps:</b> one indexable URL per page, single-hop redirects, and a sitemap listing only those URLs.</li>
              <li><b>Core Web Vitals:</b> field data from real visitors (LCP, INP, CLS), not just a lab score, with the elements causing each problem.</li>
              <li><b>Internal links:</b> whether important pages are linked from related content, not only from menus and footers.</li>
              <li><b>Tracking:</b> GA4 events and conversions checked before any campaign spend, so results can be measured from day one.</li>
            </ul>
          </div>
          <div className="dm-webdev__pipeline">
            <p className="dm-webdev__pipe-label">How search engines process a page</p>
            <SearchPipeline />
          </div>
        </section>

        {/* ══ CUSTOMER ACQUISITION FUNNEL (C) ═══════════════════════════════ */}
        <section className="dm-funnel" aria-labelledby="dm-funnel-heading">
          <div className="dm-funnel__inner">
            <div className="dm-head dm-head--center">
              <span className="dm-label">Online Marketing Strategy</span>
              <h2 className="dm-h2" id="dm-funnel-heading">A channel for every <em>stage of the decision</em></h2>
              <p className="dm-sub">
                People rarely go from never hearing of you to buying in one step. A good online
                marketing strategy makes sure you&apos;re present at each stage, with the right message.
              </p>
            </div>
            <AcquisitionFunnel
              stages={funnelStages}
              caption="Gaps in the funnel show up as wasted spend: ads that bring awareness with nowhere to convert, or great landing pages nobody reaches. We plan for every stage, then shift budget to where the drop-off is."
            />
          </div>
        </section>

        {/* ══ ANALYTICS & REPORTING (G) ═════════════════════════════════════ */}
        <section className="dm-measure" aria-labelledby="dm-measure-heading">
          <div className="dm-measure__inner">
            <div className="dm-measure__head">
              <span className="dm-measure__label">Analytics &amp; Reporting</span>
              <h2 className="dm-measure__h2" id="dm-measure-heading">Reported against numbers that <em>matter</em></h2>
              <p className="dm-measure__p">
                Every report follows the same chain: how many people arrived, what they did, how many
                became leads and what each lead cost. That makes it obvious where the next improvement
                should come from.
              </p>
            </div>
            <MetricChain className="dm-measure__chain" />
            <div className="dm-measure__dash"><AnalyticsDashboard /></div>
            <div className="dm-measure__grid">
              <div className="dm-measure__col">
                <h3 className="dm-measure__col-title">What we track</h3>
                <ul className="dm-measure__list">
                  <li>Website visitors and traffic sources</li>
                  <li>Search visibility, clicks and keyword positions</li>
                  <li>Engagement on key pages</li>
                  <li>Leads, conversion rate and cost per lead</li>
                  <li>Campaign performance, including ROAS where relevant</li>
                  <li>Return on marketing spend, using your real deal values</li>
                </ul>
              </div>
              <div className="dm-measure__col">
                <h3 className="dm-measure__col-title">How reporting works</h3>
                <ul className="dm-measure__list">
                  <li>One monthly report covering every channel we run</li>
                  <li>Plain-language summary first, detail after</li>
                  <li>What changed, why, and what we&apos;ll do next</li>
                  <li>Live dashboard access between reports</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESS ═══════════════════════════════════════════════════════ */}
        <section className="dm-process" aria-labelledby="dm-process-heading">
          <div className="dm-process__inner">
            <div className="dm-process__head">
              <span className="dm-process__label">Marketing Workflow</span>
              <h2 className="dm-process__h2" id="dm-process-heading">Six steps, <em>repeated</em> every cycle</h2>
              <p className="dm-process__sub">
                Search algorithms, competitors and your own offers keep changing, so the plan does too.
                Each cycle starts from what the last one taught us.
              </p>
            </div>
            <ProcessCycle steps={processSteps} />
          </div>
        </section>

        {/* ══ DELIVERABLES ══════════════════════════════════════════════════ */}
        <section className="dm-deliv" aria-labelledby="dm-deliv-heading">
          <div className="dm-deliv__inner">
            <div className="dm-head dm-head--center">
              <span className="dm-label">What You Receive</span>
              <h2 className="dm-h2" id="dm-deliv-heading">Services are what we do. These are <em>what you get</em>.</h2>
              <p className="dm-sub">The exact mix depends on the services you choose, and it&apos;s agreed in writing before work starts.</p>
            </div>
            <div className="dm-deliv__grid">
              {deliverableGroups.map((g) => (
                <div className="dm-deliv__col" key={g.title}>
                  <h3>{g.title}</h3>
                  <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="dm-deliv__note">
              We don&apos;t promise rankings, leads or revenue. Nobody honestly can. What we commit to is
              the work above, done well, and clear reporting on what it achieves.
            </p>
          </div>
        </section>

        {/* ══ INDUSTRIES ════════════════════════════════════════════════════ */}
        <section className="dm-industries" aria-labelledby="dm-industries-heading">
          <div className="dm-industries__inner">
            <div className="dm-industries__head">
              <span className="dm-industries__label">Who We Work With</span>
              <h2 className="dm-industries__h2" id="dm-industries-heading">Industries we <em>serve</em></h2>
              <p className="dm-industries__sub">The channels are the same; what changes is the mix and the message.</p>
            </div>
            <div className="dm-industries__grid">
              {industries.map((ind) => (
                <div className="dm-industries__card" key={ind.name}>
                  <div className="dm-industries__icon" aria-hidden="true">{ind.icon}</div>
                  <h3 className="dm-industries__name">{ind.name}</h3>
                  <p className="dm-industries__desc">{ind.note}</p>
                </div>
              ))}
            </div>
            <p className="dm-industries__note">
              Working in real estate, architecture or construction? Our{" "}
              <Link href="/services/cad-gis-photogrammetry">CAD, GIS &amp; photogrammetry</Link> and{" "}
              <Link href="/services/visualization">3D visualisation</Link> teams can produce the visuals
              your campaigns promote.
            </p>
          </div>
        </section>

        {/* ══ LOCAL (BANGALORE) & NATIONAL SEO ══════════════════════════════ */}
        <section className="dm-local" aria-labelledby="dm-local-heading">
          <div className="dm-local__inner">
            <div className="dm-local__copy">
              <span className="dm-local__label">Local SEO</span>
              <h2 className="dm-local__h2" id="dm-local-heading">Built for how <em>Bangalore</em> searches</h2>
              <p className="dm-local__p">
                Bangalore is one of India&apos;s most competitive digital markets, with technology
                companies, startups, retailers, clinics and property developers all competing across
                neighbourhoods from Koramangala and Indiranagar to Whitefield and Electronic City.
              </p>
              <p className="dm-local__p">
                Showing up locally takes an accurate Google Business Profile, location pages with real
                substance, consistent citations and a steady flow of genuine reviews, all pointing the
                same way.
              </p>
              <p className="dm-local__note">
                We&apos;re based in Bengaluru, so we work with local businesses face to face and know the
                market we&apos;re optimising for.
              </p>
            </div>
            <LocalSearchMap className="dm-local__visual" />
          </div>
          <div className="dm-local__india">
            <div>
              <span className="dm-india__label">National SEO</span>
              <h2 className="dm-india__h2">SEO that works <em>across India</em></h2>
              <p className="dm-india__p">
                India isn&apos;t one search market. Competition, behaviour and language change from city to
                city, so a national strategy has to reflect where your customers are. We&apos;d rather build
                a few genuinely useful city pages than dozens of near-identical ones that search engines
                may treat as doorway pages.
              </p>
            </div>
            <ul className="dm-india__list">
              <li>National keyword research and content strategy</li>
              <li>Regional search behaviour and competition by market</li>
              <li>Regional-language considerations where relevant</li>
              <li>City or region pages only where there&apos;s a real business reason</li>
            </ul>
          </div>
        </section>

        {/* ══ TOOLS ═════════════════════════════════════════════════════════ */}
        <section className="dm-tools" aria-labelledby="dm-tools-heading">
          <div className="dm-tools__inner">
            <div className="dm-head dm-head--center">
              <span className="dm-label">Technology &amp; Tools</span>
              <h2 className="dm-h2" id="dm-tools-heading">The platforms we <em>work in</em></h2>
              <p className="dm-sub">Standard, widely used tools, set up in your name so the data stays yours.</p>
            </div>
            <TechStackMap
              layers={toolLayers}
              badge="Marketing stack, layer by layer"
              caption="Data flows up from the website into analytics, where it's joined with search and ad data for one view of what's working."
            />
          </div>
        </section>

        {/* ══ CASE STUDY + MINDTRICK ════════════════════════════════════════ */}
        {seoCase && (
          <section className="dm-case" id="work" aria-labelledby="dm-case-heading">
            <div className="dm-case__inner">
              <div className="dm-head dm-head--center">
                <span className="dm-label">Case Study</span>
                <h2 className="dm-h2" id="dm-case-heading">How we run technical SEO, <em>shown in full</em></h2>
                <p className="dm-sub">
                  We don&apos;t publish client rankings or traffic figures we can&apos;t verify. This case study
                  documents our own site, where every change can be checked in the source history.
                </p>
              </div>
              <article className="dm-case__card" aria-labelledby="dm-case-title">
                <div>
                  <span className="dm-case__kind">{seoCase.client}</span>
                  <h3 className="dm-case__title" id="dm-case-title">
                    <Link href={`/work/${seoCase.slug}`}>{seoCase.title}</Link>
                  </h3>
                  <p className="dm-case__p">{seoCase.description}</p>
                  <h4 className="dm-case__h">Background</h4>
                  <p className="dm-case__p">{seoCase.context[0]}</p>
                  {seoCase.workflow && (
                    <>
                      <h4 className="dm-case__h">{seoCase.workflow.heading}</h4>
                      <ol className="dm-case__steps">
                        {seoCase.workflow.steps.map((st) => <li key={st.step}><span>{st.step}</span></li>)}
                      </ol>
                    </>
                  )}
                </div>
                <div>
                  <h4 className="dm-case__h" style={{ marginTop: 0 }}>What we worked on</h4>
                  <ul className="dm-case__ws">
                    {seoCase.workstreams.map((w) => <li key={w.name}><b>{w.name}</b><span>{w.summary}</span></li>)}
                  </ul>
                  {seoCase.outcomes?.length ? (
                    <>
                      <h4 className="dm-case__h">Verified outcomes</h4>
                      <ul className="dm-case__list">
                        {seoCase.outcomes.slice(0, 3).map((o) => <li key={o}>{o}</li>)}
                      </ul>
                    </>
                  ) : null}
                  {seoCase.notClaimed?.length ? (
                    <p className="dm-case__honest"><strong>Not claimed:</strong> {seoCase.notClaimed[0]}</p>
                  ) : null}
                  <div className="dm-case__links">
                    <Link href={`/work/${seoCase.slug}`}>Read the full case study <FaArrowRight aria-hidden="true" /></Link>
                  </div>
                </div>
              </article>
              <p className="dm-case__more">
                We&apos;re documenting client SEO case studies with real before-and-after data. If you&apos;d
                like to be featured, <Link href="/contact">get in touch</Link>. Meanwhile, our{" "}
                <Link href="/insights">Insights articles</Link> explain how we approach search and digital strategy.
              </p>
            </div>
          </section>
        )}

        <section className="dm-spotlight" id="mindtrick" aria-labelledby="dm-spotlight-heading">
          <div className="dm-spotlight__inner dm-spotlight__inner--solo">
            <div>
              <span className="dm-spotlight__eyebrow">Our Marketing Brand</span>
              <h2 className="dm-spotlight__h2" id="dm-spotlight-heading">MindTrick.io</h2>
              <p className="dm-spotlight__p">
                MindTrick.io is the name we use for our digital marketing work. It&apos;s where performance
                marketing, SEO and content are coordinated, run by the same people behind 99 Visual
                Solutions, with the same reporting and the same honesty about results.
              </p>
              <ul className="dm-spotlight__bullets">
                <li>Campaign planning and coordination across channels</li>
                <li>Creative production for ads, social and email</li>
                <li>Ongoing optimisation against leads and cost per lead</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ══ AI SEARCH ═════════════════════════════════════════════════════ */}
        <section className="dm-geo" aria-labelledby="dm-geo-heading">
          <div className="dm-geo__inner">
            <span className="dm-geo__label">AI Search &amp; GEO</span>
            <h2 className="dm-geo__h2" id="dm-geo-heading">Preparing for how <em>AI-powered search</em> is changing</h2>
            <p className="dm-geo__p">
              Google&apos;s AI Overviews and assistants such as ChatGPT, Gemini and Perplexity increasingly
              answer questions directly. They rely on the same things good SEO always has: clear,
              well-structured content, accurate information about your business, consistent mentions
              across the web, and pages that are easy to crawl and understand.
            </p>
            <p className="dm-geo__p">
              We build those in as standard practice. No one can honestly guarantee visibility inside
              any particular AI system, but we can make sure your business is described accurately
              wherever people, or the tools answering for them, go looking.
            </p>
          </div>
        </section>

        {/* ══ WHY CHOOSE 99 VISUAL ══════════════════════════════════════════ */}
        <section className="dm-benefits" aria-labelledby="dm-benefits-heading">
          <div className="dm-benefits__inner">
            <div className="dm-benefits__head">
              <span className="dm-benefits__label">Why Choose 99 Visual</span>
              <h2 className="dm-benefits__h2" id="dm-benefits-heading">
                What working with us <em>looks like</em>
              </h2>
              <p className="dm-benefits__sub">
                No lock-in contracts dressed up as strategy, and no reports designed to look busy. Just a
                small, experienced team doing the work and showing you what it achieves.
              </p>
            </div>
            <div className="dm-benefits__grid">
              {benefits.map((b) => (
                <div className="dm-benefit-card" key={b.title}>
                  <div className="dm-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                  <h3 className="dm-benefit-card__title">{b.title}</h3>
                  <p className="dm-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ — same copy as dmFaqNode (FAQPage JSON-LD) ════════════════ */}
        <section className="dm-faq" aria-labelledby="dm-faq-heading" id="dm-faq">
          <div className="dm-faq__inner">
            <div className="dm-faq__head">
              <span className="dm-faq__label">FAQ</span>
              <h2 className="dm-faq__h2" id="dm-faq-heading">Common <em>questions</em></h2>
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

        {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
        <section className="dm-cta" aria-labelledby="dm-cta-heading">
          <div className="dm-cta__inner">
            <span className="dm-cta__eyebrow">Start a Project</span>
            <h2 className="dm-cta__h2" id="dm-cta-heading">
              Let&rsquo;s talk about your <em>marketing</em>
            </h2>
            <p className="dm-cta__sub">
              Tell us what you&apos;re trying to grow. We&apos;ll look at your site and channels, tell you what
              we&apos;d change first, and how we&apos;d measure it. The first conversation is free, with no
              obligation.
            </p>
            <ol className="dm-cta__steps">
              <li><b>Free consultation</b><span>A short call about your goals, market and budget.</span></li>
              <li><b>Audit &amp; plan</b><span>What&apos;s working, what isn&apos;t, and a prioritised plan.</span></li>
              <li><b>Start &amp; report</b><span>Work begins, with monthly reports tied to leads.</span></li>
            </ol>
            <div className="dm-cta__actions">
              <ConsultationCTA
                className="dm-cta__btn"
                ariaLabel="Get a free SEO consultation from 99 Visual Solutions"
                postTitle="Digital Marketing & SEO — CTA Strip (Primary)"
                postUrl={PAGE_PATH}
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
                postUrl={PAGE_PATH}
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
            postUrl={PAGE_PATH}
          >
            Get a Free SEO Consultation
          </ConsultationCTA>
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
