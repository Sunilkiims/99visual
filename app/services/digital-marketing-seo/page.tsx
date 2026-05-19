// app/services/digital-marketing-seo/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Digital Marketing & SEO — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #2 — Replaced deprecated breadcrumb() with breadcrumbFromItems()
//      emitting item as { "@type": "Thing", "@id": url } objects.
//   ✅ WARNING #8  — CONTACT_EMAIL imported — single source of truth.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed.
//   ✅ aria-hidden removed from breadcrumb <nav> — sr-only pattern used.
//   ✅ FAQ answers verified 40+ words for rich result eligibility.
//   ✅ Title within 65-char limit.
//   ✅ serviceSchema() now uses pathname instead of url for consistency.
//   ✅ All CSS classes retain "dm-" prefix (correct, no collision).
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader     from "@/app/components/PageLoader";
import type { Metadata } from "next";
import {
  FaBullhorn, FaSearch, FaChartLine,
  FaMobileAlt, FaEnvelopeOpenText, FaHandshake,
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
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ FIX: 63 chars — within sweet spot
  title: "Digital Marketing & SEO Services | SEO, PPC — 99 Visual",

  description:
    "99 Visual Solutions delivers full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content marketing, email automation, local SEO, link building, and promotional video — built for ROI.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/services/digital-marketing-seo`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Digital Marketing & SEO Services | SEO, PPC & Social Media — 99 Visual",
    description:
      "From SEO and PPC to Meta Ads, content marketing, email campaigns, local SEO, link building, and promotional videos — 99 Visual Solutions delivers data-driven digital marketing for measurable ROI.",
    url:     `${BASE}/services/digital-marketing-seo`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/services/digital-marketing-og.jpg`,
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
        url: `${BASE}/images/services/digital-marketing-og.jpg`,
        alt: "Digital Marketing & SEO Services by 99 Visual Solutions",
      },
    ],
  },

  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
  authors:         [{ name: "99 Visual Solutions", url: BASE }],
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
// ✅ FIX: breadcrumbFromItems() with correct @id item objects.
// ✅ FIX: CONTACT_EMAIL used in FAQ answers.
// ✅ FIX: All FAQ answers 40+ words.
// ─────────────────────────────────────────────────────────────────────────────

const dmBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: "/" },
  { name: "Services",                url: "/services" },
  { name: "Digital Marketing & SEO", url: "/services/digital-marketing-seo" },
]);

const dmServiceNode = {
  ...serviceSchema({
    name:        "Digital Marketing & SEO Services",
    description: "Full-spectrum digital marketing including SEO, PPC, Meta Ads, social media marketing, content marketing, email marketing, local SEO, link building, marketing automation, and promotional video.",
    pathname:    "/services/digital-marketing-seo",
    image:       `${BASE}/images/services/digital-marketing-og.jpg`,
  }),
  "@id": `${BASE}/services/digital-marketing-seo#service`,
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

// ✅ FIX: All answers 40+ words, CONTACT_EMAIL used.
const dmFaqNode = {
  ...faqSchema([
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
  ]),
  "@id":            `${BASE}/services/digital-marketing-seo#faq`,
  mainEntityOfPage: { "@id": `${BASE}/services/digital-marketing-seo#webpage` },
};

const dmPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/services/digital-marketing-seo#webpage`,
  url:           `${BASE}/services/digital-marketing-seo`,
  name:          "Digital Marketing & SEO Services | SEO, PPC — 99 Visual Solutions",
  description:   "Full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content & email marketing, local SEO, link building, marketing automation, and promotional video.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/services/digital-marketing-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Digital Marketing & SEO Services by 99 Visual Solutions",
  },
  speakable:       { "@type": "SpeakableSpecification", cssSelector: [".dm-hero__h1", ".dm-hero__sub"] },
  breadcrumb:      { "@id": `${BASE}/services/digital-marketing-seo#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/services/digital-marketing-seo`] },
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

const services = [
  { id:"seo",title:"Search Engine Optimization (SEO)",image:"/images/seo.png",imageAlt:"SEO services illustration",description:"In a competitive digital landscape, visibility is everything. Our SEO services are designed to position your business at the top of search engine results, driving high-quality organic traffic and long-term sustainable growth for your brand.",highlight:"We combine strategic keyword research, technical optimisation, and content excellence to ensure your website not only ranks higher but also delivers real value to your audience at every stage of their journey.",bullets:["Keyword research & on-page optimisation","Technical SEO audits & fixes","High-quality backlink strategies"],imageLeft:false },
  { id:"meta-ads",title:"Meta Ads & Social Media Marketing",image:"/images/social-media.png",imageAlt:"Social media marketing illustration",description:"Amplify your brand's reach and engagement with strategic Meta Ads and social media marketing. We create data-driven campaigns across Facebook and Instagram that not only capture attention but also convert audiences into loyal customers over time.",highlight:"By combining compelling creatives, precise audience targeting, and continuous optimisation, we ensure your brand stands out in crowded digital spaces and delivers consistent, measurable results.",bullets:["Facebook, Instagram, LinkedIn & Twitter marketing","Paid social ad campaigns","Analytics & engagement tracking"],imageLeft:true },
  { id:"ppc",title:"Pay-Per-Click (PPC) Advertising",image:"/images/ppc.png",imageAlt:"PPC advertising illustration",description:"Drive instant visibility and measurable results with strategic Pay-Per-Click advertising. We create and manage high-performing ad campaigns that place your business in front of the right audience at the right time across Google's search and display networks.",highlight:"By combining smart keyword targeting, compelling ad creatives, and continuous optimisation, we ensure maximum return on your ad spend while keeping your cost per acquisition competitive.",bullets:["Keyword research, bid management & campaign strategy","Social media ad management","Continuous monitoring, A/B testing & ROI optimisation"],imageLeft:false },
  { id:"email-marketing",title:"Content & Email Marketing",image:"/images/email-marketing.png",imageAlt:"Email marketing illustration",description:"Build meaningful connections with your audience through strategic content and personalised email marketing. We create compelling, value-driven content that attracts, engages, and nurtures your audience at every stage of their customer journey.",highlight:"From blog posts and website content to targeted email campaigns, our approach focuses on delivering the right message to the right audience at the right time — maximising engagement and driving measurable conversions.",bullets:["Content strategy, creation & storytelling","Email campaign design, automation & audience segmentation","Performance tracking, personalisation & conversion optimisation"],imageLeft:true },
  { id:"local-seo",title:"Local SEO",image:"/images/local-seo.png",imageAlt:"Local SEO illustration",description:"Make your business stand out in your local market and attract customers right when they need you. Our Local SEO services are designed to boost your visibility in location-based searches, helping you connect with nearby audiences and drive local enquiries.",highlight:"From optimising your business listings to managing reviews and local keywords, we ensure your brand ranks higher in local search results and Google Maps — capturing high-intent local traffic.",bullets:["Google Business Profile optimisation & local listings management","Location-based keyword targeting & on-page optimisation","Review management, citations & local ranking improvements"],imageLeft:false },
  { id:"technical-seo",title:"Technical SEO",image:"/images/technival-seo.png",imageAlt:"Technical SEO illustration",description:"A strong SEO strategy starts with a solid technical foundation. Our Technical SEO services focus on optimising your website's structure, performance, and crawlability to ensure search engines can efficiently access, understand, and rank your content.",highlight:"From fixing indexing issues to improving site speed and implementing structured data, we enhance every technical aspect that impacts your search engine visibility and Core Web Vitals scores.",bullets:["Website audit, crawlability & indexing optimisation","Core Web Vitals, speed & mobile performance enhancement","Structured data, schema markup & technical issue resolution"],imageLeft:true },
  { id:"onpage",title:"On-Page Optimisation",image:"/images/onpage-optimization.png",imageAlt:"On-Page Optimisation illustration",description:"Maximise your website's visibility and relevance with strategic on-page optimisation. We fine-tune every element of your web pages — from content and keywords to meta tags and internal linking — to align with search engine algorithms and user intent.",highlight:"Our approach enhances both discoverability and user experience, helping your pages rank higher, engage visitors more effectively, and drive meaningful conversions across every key landing page.",bullets:["Keyword optimisation, meta tags & content structuring","Internal linking, URL optimisation & image SEO","User experience enhancements & search intent alignment"],imageLeft:false },
  { id:"offpage",title:"Off-Page SEO & Link Building",image:"/images/off-page-link-building.png",imageAlt:"Off-Page SEO illustration",description:"Strengthen your website's authority and credibility with powerful off-page SEO and strategic link building. We focus on building high-quality, relevant backlinks from trusted sources to improve your search engine rankings and domain authority.",highlight:"Through ethical white-hat practices and targeted outreach strategies, we enhance your domain authority, increase brand visibility across the web, and drive valuable referral traffic to your site.",bullets:["High-quality backlink acquisition & outreach campaigns","Guest posting, citations & brand mentions","Authority building, referral traffic & ranking improvement"],imageLeft:true },
  { id:"content-marketing",title:"Content Marketing",image:"/images/content-marketing.png",imageAlt:"Content Marketing illustration",description:"Turn your brand into a trusted voice with strategic, value-driven content marketing. We create and distribute high-quality content that educates, engages, and inspires your audience across every stage of their buyer journey.",highlight:"By aligning content with your business goals and audience search intent, we help you drive consistent organic traffic, improve engagement metrics, and increase conversions over time.",bullets:["Content strategy, planning & audience targeting","Blog writing, articles & SEO-driven content creation","Content distribution, engagement & performance optimisation"],imageLeft:false },
  { id:"automation",title:"Marketing Automation",image:"/images/marketing-automation.png",imageAlt:"Marketing Automation illustration",description:"Streamline your marketing efforts and deliver personalised experiences at scale with powerful marketing automation solutions. We help you automate repetitive tasks, nurture leads effectively, and engage your audience with the right message at precisely the right time.",highlight:"By integrating smart automation tools and data-driven workflows, we enhance operational efficiency, improve the customer journey from awareness to conversion, and maximise your marketing ROI.",bullets:["Automated workflows, lead nurturing & customer journeys","CRM integration, segmentation & personalised campaigns","Performance tracking, analytics & continuous optimisation"],imageLeft:true },
  { id:"creative",title:"Creative Banner & Promotional Video",image:"/images/creative-banner.png",imageAlt:"Creative Banner & Promotional Video illustration",description:"Capture attention and make a lasting impression with visually compelling banners and engaging promotional videos. We design high-impact creatives that communicate your brand message effectively across all digital platforms and advertising channels.",highlight:"From eye-catching display ads to dynamic video content, our creative solutions are crafted to boost engagement, enhance brand recall, and drive measurable conversions across digital platforms.",bullets:["Custom banner designs for ads, websites & social media","Promotional videos, motion graphics & brand storytelling","Platform-optimised creatives for maximum engagement & ROI"],imageLeft:false },
  { id:"mindtrick",title:"MindTrick.io – Our Dedicated Digital Marketing Hub",image:"/images/mindtrick-marketing.png",imageAlt:"MindTrick.io — dedicated digital marketing hub by 99 Visual Solutions",description:"At MindTrick.io, we bring together innovation, creativity, and data-driven strategies to power your digital growth. As our dedicated digital marketing hub, MindTrick.io delivers result-oriented solutions that help businesses build strong online visibility and achieve sustainable success.",highlight:"From performance marketing to brand storytelling, we combine cutting-edge tools with expert insights to craft campaigns that truly make a measurable impact on your business's digital presence and revenue.",bullets:["End-to-end digital marketing solutions under one platform","Data-driven campaigns focused on growth & ROI","Expert strategies, creative execution & continuous optimisation"],imageLeft:true },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function DigitalMarketing() {
  return (
    <>
      <PageLoader />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ✅ FIX: dm-sr-only — accessible but visually hidden */
        .dm-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .dm-hero{position:relative;min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#080808;overflow:hidden;padding:8rem 1.5rem 6rem;text-align:center;}
        .dm-hero__orb{position:absolute;border-radius:50%;filter:blur(100px);animation:dmOrbDrift 16s ease-in-out infinite alternate;pointer-events:none;}
        .dm-hero__orb--1{width:540px;height:540px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-160px;left:-100px;opacity:.13;}
        .dm-hero__orb--2{width:460px;height:460px;background:radial-gradient(circle,#f97316,#ea580c);bottom:-130px;right:-80px;opacity:.12;animation-delay:-8s;}
        .dm-hero__orb--3{width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;right:15%;opacity:.07;animation-delay:-4s;}
        @keyframes dmOrbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(32px,24px) scale(1.06)}}
        .dm-hero__grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:60px 60px;}
        .dm-hero__grain{position:absolute;inset:0;opacity:.03;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .dm-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .dm-corner--tl{top:24px;left:24px;border-top:1px solid #f97316;border-left:1px solid #f97316;}
        .dm-corner--tr{top:24px;right:24px;border-top:1px solid #f97316;border-right:1px solid #f97316;}
        .dm-corner--bl{bottom:64px;left:24px;border-bottom:1px solid #f97316;border-left:1px solid #f97316;}
        .dm-corner--br{bottom:64px;right:24px;border-bottom:1px solid #f97316;border-right:1px solid #f97316;}
        .dm-hero__content{position:relative;z-index:10;max-width:860px;margin:0 auto;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        @keyframes dmFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        .dm-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .dm-hero__dot{width:5px;height:5px;border-radius:50%;background:#f97316;animation:dmPulse 2s ease-in-out infinite;}
        @keyframes dmPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .dm-hero__h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;}
        .dm-hero__h1 em{font-style:italic;color:transparent;-webkit-text-stroke:0.2px #f97316;}
        .dm-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        .dm-hero__sub{font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,2vw,1.1rem);font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto 2.6rem;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;}
        .dm-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:dmFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .dm-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}
        .dm-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;}
        .dm-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .dm-intro__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .dm-intro__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .dm-intro__h2 em{font-style:italic;color:#f97316;}
        .dm-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.8rem;}
        .dm-intro__p{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);max-width:680px;margin:0 auto .9rem;}
        .dm-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}
        .dm-services{background:#080808;}
        .dm-svc{padding:5rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;}
        .dm-svc:nth-child(odd){background:#0f0f0f;}
        .dm-svc:nth-child(even){background:#080808;}
        .dm-svc__inner--img-left{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:3fr 4fr;gap:4rem;align-items:center;}
        .dm-svc__inner--img-right{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:4fr 3fr;gap:4rem;align-items:center;}
        @media(max-width:768px){.dm-svc__inner--img-left,.dm-svc__inner--img-right{grid-template-columns:1fr;gap:2.5rem;}.dm-svc__img-wrap{order:2!important;}.dm-svc__body{order:1!important;}}
        .dm-svc__img-wrap{position:relative;border-radius:16px;overflow:hidden;}
        .dm-svc__img-wrap::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent 60%);border-radius:16px;}
        .dm-svc__img-wrap img{width:100%;height:auto;display:block;border-radius:16px;border:1px solid rgba(255,255,255,0.07);transition:transform .4s ease;}
        .dm-svc__img-wrap:hover img{transform:scale(1.03);}
        .dm-svc__num{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(249,115,22,.18);position:absolute;top:-1.5rem;left:0;pointer-events:none;user-select:none;}
        .dm-svc__body{position:relative;}
        .dm-svc__eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:.9rem;display:block;}
        .dm-svc__heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;line-height:1.15;letter-spacing:-.01em;color:#fff;margin:0 0 .6rem;}
        .dm-svc__rule{width:32px;height:1px;background:linear-gradient(90deg,#f97316,transparent);margin:0 0 1.4rem;}
        .dm-svc__p{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.85;color:rgba(255,255,255,0.45);margin-bottom:.8rem;}
        .dm-svc__highlight{font-family:'DM Sans',sans-serif;font-size:.93rem;font-weight:400;line-height:1.8;color:rgba(255,255,255,.6);border-left:2px solid rgba(249,115,22,.4);padding-left:1rem;margin-bottom:1.6rem;font-style:italic;}
        .dm-svc__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .dm-svc__bullets li{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:rgba(255,255,255,0.65);display:flex;align-items:flex-start;gap:.6rem;}
        .dm-svc__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:#f97316;margin-top:.45rem;flex-shrink:0;}
        .dm-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-top:1px solid rgba(255,255,255,0.07);}
        .dm-benefits__inner{max-width:1200px;margin:0 auto;}
        .dm-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .dm-benefits__label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1rem;display:block;}
        .dm-benefits__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .dm-benefits__h2 em{font-style:italic;color:#f97316;}
        .dm-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .dm-benefits__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);max-width:520px;margin:0 auto;}
        .dm-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.dm-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.dm-benefits__grid{grid-template-columns:1fr;}}
        .dm-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .dm-benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .dm-benefit-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .dm-benefit-card:hover::before{opacity:1;}
        .dm-benefit-card__icon{width:44px;height:44px;border-radius:10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;color:#f97316;font-size:1.1rem;margin-bottom:1.2rem;}
        .dm-benefit-card__title{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.5rem;}
        .dm-benefit-card__desc{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.45);}
        .dm-cta{background:#080808;border-top:1px solid rgba(255,255,255,0.07);padding:5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .dm-cta__orb{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f97316,transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(60px);pointer-events:none;}
        .dm-cta__inner{position:relative;z-index:10;max-width:560px;margin:0 auto;}
        .dm-cta__eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#f97316;margin-bottom:1.2rem;display:block;}
        .dm-cta__h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,3.2rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .dm-cta__h2 em{font-style:italic;color:#f97316;}
        .dm-cta__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:0 auto 1.4rem;}
        .dm-cta__sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:rgba(255,255,255,0.45);margin-bottom:2.4rem;}
        .dm-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:14px 34px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .dm-cta__btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      {/* Header first — prevents UI displacement */}
      <Header />

      <script
        id="schema-dm-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dmGraph) }}
      />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="dm-hero" aria-labelledby="dm-hero-heading">
        <div aria-hidden="true">
          <div className="dm-hero__orb dm-hero__orb--1" />
          <div className="dm-hero__orb dm-hero__orb--2" />
          <div className="dm-hero__orb dm-hero__orb--3" />
          <div className="dm-hero__grid" />
          <div className="dm-hero__grain" />
        </div>
        <div className="dm-corner dm-corner--tl" aria-hidden="true" />
        <div className="dm-corner dm-corner--tr" aria-hidden="true" />
        <div className="dm-corner dm-corner--bl" aria-hidden="true" />
        <div className="dm-corner dm-corner--br" aria-hidden="true" />

        {/* ✅ FIX: aria-hidden removed — dm-sr-only used instead */}
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

        <div className="dm-hero__content">
          <div className="dm-hero__eyebrow" aria-hidden="true">
            <span className="dm-hero__dot" />
            Services · Digital Marketing &amp; SEO
          </div>
          <h1 className="dm-hero__h1" id="dm-hero-heading">
            Marketing that drives<br />results, not just <em>clicks</em>
          </h1>
          <div className="dm-hero__rule" aria-hidden="true" />
          <p className="dm-hero__sub">
            From SEO and PPC to Meta Ads, content marketing, email automation,
            and promotional video — we deliver data-driven strategies that grow
            your traffic, leads, and revenue.
          </p>
          <a href="#services" className="dm-hero__cta" aria-label="Explore digital marketing and SEO services">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
      <section className="dm-intro" aria-labelledby="dm-intro-heading">
        <div className="dm-intro__inner">
          <span className="dm-intro__label">Our Philosophy</span>
          <h2 className="dm-intro__h2" id="dm-intro-heading">
            Creativity meets data to deliver<br />visibility, growth &amp; <em>conversions</em>
          </h2>
          <div className="dm-intro__rule" aria-hidden="true" />
          <p className="dm-intro__p">
            At <strong>99 Visual Solutions</strong>, we combine creativity with data-driven insights to craft{" "}
            <strong>digital marketing strategies</strong> that not only attract audiences but convert them into
            loyal customers. Our holistic approach ensures your brand achieves{" "}
            <strong>maximum online visibility and sustainable growth</strong>.
          </p>
          <p className="dm-intro__p">
            From <strong>SEO and content marketing</strong> to <strong>social media campaigns and paid advertising</strong>,
            our solutions are tailored to your business goals — helping you stay ahead in today's competitive
            digital landscape with measurable, reportable results every step of the way.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ══════════════════════════════════════════════ */}
      <div id="services" className="dm-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="dm-svc" aria-labelledby={`dm-svc-heading-${svc.id}`}>
            <div className={`dm-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>
              <div className="dm-svc__img-wrap" style={{ order: svc.imageLeft ? 1 : 2 }}>
                <Image src={svc.image} alt={svc.imageAlt} width={600} height={460} style={{ width:"100%",height:"auto" }} />
              </div>
              <div className="dm-svc__body" style={{ order: svc.imageLeft ? 2 : 1 }}>
                <span className="dm-svc__num" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <span className="dm-svc__eyebrow">Service {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="dm-svc__heading" id={`dm-svc-heading-${svc.id}`}>{svc.title}</h3>
                <div className="dm-svc__rule" aria-hidden="true" />
                <p className="dm-svc__p">{svc.description}</p>
                <p className="dm-svc__highlight">{svc.highlight}</p>
                <ul className="dm-svc__bullets">
                  {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ══════════════════════════════════════════════════════ */}
      <section className="dm-benefits" aria-labelledby="dm-benefits-heading">
        <div className="dm-benefits__inner">
          <div className="dm-benefits__head">
            <span className="dm-benefits__label">Why Choose Us?</span>
            <h2 className="dm-benefits__h2" id="dm-benefits-heading">
              Benefits of partnering with<br /><em>99 Visual</em> Digital Marketing
            </h2>
            <div className="dm-benefits__rule" aria-hidden="true" />
            <p className="dm-benefits__sub">
              With 99 Visual Solutions, digital marketing is more than just ads — it's about creating
              meaningful connections that turn into long-term business growth.
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

      {/* ══ CTA STRIP ═════════════════════════════════════════════════════ */}
      <section className="dm-cta" aria-labelledby="dm-cta-heading">
        <div className="dm-cta__orb" aria-hidden="true" />
        <div className="dm-cta__inner">
          <span className="dm-cta__eyebrow">Start a Project</span>
          <h2 className="dm-cta__h2" id="dm-cta-heading">
            Ready to grow your brand <em>online</em>?
          </h2>
          <div className="dm-cta__rule" aria-hidden="true" />
          <p className="dm-cta__sub">
            Get in touch with our team for a free consultation. We&apos;ll help you map out the right
            digital marketing strategy to achieve your business goals and outperform competitors.
          </p>
          <Link href="/contact" className="dm-cta__btn" aria-label="Get a free digital marketing consultation from 99 Visual Solutions">
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