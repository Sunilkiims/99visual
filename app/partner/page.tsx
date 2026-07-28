// app/partner/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Partner page — 99 Visual Solutions
//
// THIS REVISION — brings Hero + CTA in line with the Services page design
// system (app/services/page.tsx), same treatment applied to app/about/page.tsx:
//   1. Hero rebuilt on the Services mechanism: full-bleed photo banner,
//      fixed 100vh/100dvh/100svh, single left-aligned column, corner
//      brackets, grain texture, docked ticker bar on the hero's bottom edge.
//   2. Recolored to the shared Space Grotesk / Inter / IBM Plex Mono system
//      with the one blue signal accent (--pt-blue); orange eyebrow retained.
//   3. CTA section rebuilt to match Services' .sv-cta exactly, wired through
//      <ConsultationCTA /> (modal) instead of a plain <Link href="/contact">,
//      plus a sticky mobile CTA bar — consistent with About/Services.
//   4. Partner types, Why Partner, and FAQ sections (content + JSON-LD)
//      are UNCHANGED. .pt-hero__h1 / .pt-hero__sub class names are kept so
//      the existing `speakable.cssSelector` entries keep working.
//
//   Save your banner image to: /public/images/partner/partner-hero-banner.jpg
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Header           from "@/app/components/header";
import Footer           from "@/app/components/footer";
import ScrollDown       from "@/app/components/scrolldown";

import ConsultationCTA  from "@/app/components/ConsultationCTA";

import { FaHandshake, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Partner With 99 Visual | White-Label & Agency Collaboration",

  description:
    "Partner with 99 Visual Solutions — white-label web development, 3D visualisation, SEO & digital marketing. Scale globally with India's trusted IT partner. 30+ global partners.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/partner`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "Partner With 99 Visual | White-Label & Agency Collaboration",
    description: "Join 99 Visual's partner ecosystem — white-label web development, 3D visualisation, SEO & digital marketing. Build strategic collaborations and scale globally. 30+ active partners.",
    url:         `${BASE}/partner`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/partner-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Partner With 99 Visual Solutions — Business Collaboration & Growth Opportunities India",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Partner With 99 Visual | White-Label & Agency Collaboration",
    description: "India's trusted IT partner for white-label web development, 3D visualisation, SEO & digital marketing. 30+ global partners.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/partner-og.jpg`,
        alt: "Partner With 99 Visual Solutions — Business Collaboration India",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — unchanged, single source of truth for schema AND visible HTML
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What types of partnerships does 99 Visual Solutions offer?",
    answer:
      "99 Visual Solutions offers four partnership models: Business Partnerships for enterprises seeking tailored IT and visualisation solutions; Global Partnerships for international digital collaboration; Technology Partnerships for innovators building next-generation transformation solutions; and Creative Partnerships for agencies and designers creating digital experiences. Each model is structured to meet you where you are and scale as your business grows.",
  },
  {
    question: "Does 99 Visual offer white-label web development services?",
    answer:
      `Yes, we provide fully white-label web development, SEO, digital marketing, and 3D visualisation services so agencies can resell our expertise under their own brand. Our white-label model includes full NDA protection, dedicated project managers, and delivery that matches your brand standards — your clients never know we're involved. Contact us at ${CONTACT_EMAIL} to discuss white-label arrangements.`,
  },
  {
    question: "Can international agencies partner with 99 Visual?",
    answer:
      "Absolutely. We work with partners across India, the USA, UK, UAE, and Australia, providing offshore IT collaboration with competitive pricing and fast turnaround. Our team ensures time-zone overlap, real-time communication via Slack or Teams, and agile delivery cycles that work for international partners. We have successfully managed long-term white-label relationships with agencies across multiple continents.",
  },
  {
    question: "How many global partners does 99 Visual Solutions currently work with?",
    answer:
      "99 Visual Solutions has an active network of over 30 global partners across various industries and regions, including agencies, startups, and enterprises in the USA, UK, UAE, and Australia. Our partner relationships are built on long-term mutual success, transparent communication, and consistent delivery quality. We prioritise depth of partnership over volume.",
  },
  {
    question: "How do I start a partnership with 99 Visual Solutions?",
    answer:
      `You can initiate a partnership by visiting our contact page at 99visual.com/contact or emailing us at ${CONTACT_EMAIL}. Our partnerships team typically responds within 24 business hours. We begin with a no-obligation discovery call to understand your needs, followed by a tailored partnership proposal with clear terms, timelines, and deliverables.`,
  },
  {
    question: "What industries do 99 Visual's partners typically come from?",
    answer:
      "Our partners come from a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, and logistics. We work with digital agencies, IT consultancies, design studios, and enterprise businesses — any organisation that needs to scale their digital delivery capabilities without expanding their in-house team.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01T00:00:00+05:30";
const DATE_MODIFIED  = new Date().toISOString();

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const partnerBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Partner", url: "/partner" },
]);

const { "@type": _faqType, "@id": _faqId, ...faqBase } = faqSchema(FAQ_ITEMS) as Record<string, unknown>;

const partnerFaqNode = {
  "@type":          "FAQPage",
  "@id":            `${BASE}/partner#faq`,
  ...faqBase,
  mainEntityOfPage: { "@id": `${BASE}/partner#webpage` },
};

const partnerPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/partner#webpage`,
  url:           `${BASE}/partner`,
  name:          "Partner With 99 Visual | White-Label & Agency Collaboration",
  description:   "Join 99 Visual's partner ecosystem for white-label web development, 3D visualisation, SEO, and digital marketing. Build strategic collaborations and scale globally.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    "@id":     `${BASE}/partner#primaryimage`,
    url:       `${BASE}/images/og/partner-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Partner With 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".pt-hero__h1", ".pt-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/partner#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/partner`] },
};

const partnerGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  partnerPageNode,
  partnerBreadcrumbNode,
  partnerFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const partnerTypes = [
  { icon: FaHandshake, accent: "#f97316", label: "Business Partners",   desc: "Collaborate with enterprises to deliver tailored IT and visualization solutions at scale." },
  { icon: FaGlobe,     accent: "#22d3ee", label: "Global Partners",     desc: "Expand your reach with international collaborations and worldwide digital impact." },
  { icon: FaUsers,     accent: "#a78bfa", label: "Technology Partners", desc: "Work with innovators to build next-gen digital transformation solutions." },
  { icon: FaLightbulb, accent: "#fbbf24", label: "Creative Partners",   desc: "Partner with agencies and designers to create unforgettable digital experiences." },
];

const whyItems = [
  { num: "01", title: "Trusted Expertise",  desc: "Proven depth in web development, IT consulting, 3D visualization, and performance marketing." },
  { num: "02", title: "Global Network",     desc: "Strong collaborations with clients and partners across industries on every continent." },
  { num: "03", title: "Innovation Driven",  desc: "Constantly evolving with cutting-edge technologies and data-backed growth strategies." },
];

// Illustrative ticker, mirrors the mechanism on Services/About.
const pipeline = [
  { cmd: "global_partners",  out: "30+ active" },
  { cmd: "white_label",      out: "nda protected" },
  { cmd: "response_time",    out: "< 24h" },
  { cmd: "delivery_model",   out: "agile · offshore" },
  { cmd: "regions_served",   out: "india · usa · uk · uae · au" },
  { cmd: "partnership_types", out: "4 collaboration models" },
];

const stats = [
  { value: "30+",  label: "Global Partners" },
  { value: "500+", label: "Projects Delivered" },
  { value: "5+",   label: "Years of Expertise" },
  { value: "6",    label: "Core Service Domains" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  return (
    <>
      <script
        id="schema-partner-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pt-page{
          --pt-ink:#12141A; --pt-muted:#5B6172; --pt-paper:#F5F6F8; --pt-surface:#FFFFFF;
          --pt-line:#E4E6EC; --pt-blue:#2E5CFF; --pt-green:#37D67A; --pt-orange:#F97316;
          --c-bg:#080808;--c-surface:#0f0f0f;--c-border:rgba(255,255,255,0.07);
          --c-orange:#f97316;--c-muted:rgba(255,255,255,0.45);
          --ff-serif:'Cormorant Garamond',serif;--ff-sans:'DM Sans',sans-serif;
        }

        .pt-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO — same mechanism as Services / About ═══════════════════ */
        .pt-hero {
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/partner/partner-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .pt-hero { height: 100svh; } }
        @supports (height: 100dvh) { .pt-hero { height: 100dvh; } }
        @media(max-width:960px){
          .pt-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/partner/partner-hero-banner.jpg') center center / cover no-repeat;
          }
        }
        .pt-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .pt-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .pt-corner--tl{top:28px;left:28px;border-top:1px solid var(--pt-blue);border-left:1px solid var(--pt-blue);}
        .pt-corner--tr{top:28px;right:28px;border-top:1px solid var(--pt-blue);border-right:1px solid var(--pt-blue);}
        .pt-corner--bl{bottom:120px;left:28px;border-bottom:1px solid var(--pt-blue);border-left:1px solid var(--pt-blue);}
        .pt-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--pt-blue);border-right:1px solid var(--pt-blue);}

        .pt-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .pt-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .pt-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .pt-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .pt-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .pt-hero__eyebrow{ margin-bottom:1.1rem; }
          .pt-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .pt-hero__rule{ margin-bottom:.8rem; }
          .pt-hero__sub{ margin-bottom:1.2rem; }
        }

        .pt-hero__content{animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes ptFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.pt-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .pt-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--pt-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .pt-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--pt-orange);animation:ptPulse 2s ease-in-out infinite;}
        @keyframes ptPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .pt-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .pt-hero__h1 em{font-style:normal;color:var(--pt-blue);}
        .pt-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--pt-blue),transparent);margin:0 0 1.4rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.pt-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--pt-blue),transparent);}}
        .pt-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.pt-hero__sub{margin:0 auto 2.6rem;}}
        .pt-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:ptFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.pt-hero__actions{justify-content:center;}}
        .pt-hero__btn--primary{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--pt-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;border:none;cursor:pointer;}
        .pt-hero__btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .pt-hero__btn--ghost{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;border-radius:10px;text-decoration:none;transition:background .2s ease,border-color .2s ease;}
        .pt-hero__btn--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .pt-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.55) 45%, rgba(8,8,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .pt-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .pt-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:ptScroll 34s linear infinite;}
        .pt-hero__ticker-bar:hover .pt-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .pt-ticker__track{ animation-duration:22s; } }
        @keyframes ptScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .pt-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .pt-ticker__item b{color:rgba(255,255,255,.45);}
        .pt-ticker__pass{color:var(--pt-green);}
        @media(max-height:520px){ .pt-hero__ticker-bar{ padding-top:.75rem; } }

        /* ══ STATS STRIP ═════════════════════════════════════════════════ */
        .pt-stats{background:var(--pt-surface);border-top:1px solid var(--pt-line);border-bottom:1px solid var(--pt-line);padding:2.8rem 1.5rem;}
        .pt-stats__inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:640px){.pt-stats__inner{grid-template-columns:repeat(2,1fr);}}
        .pt-stat__val{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.9rem,3.4vw,2.4rem);font-weight:700;line-height:1;color:var(--pt-ink);margin-bottom:.3rem;}
        .pt-stat__val span{color:var(--pt-blue);}
        .pt-stat__lbl{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:400;color:var(--pt-muted);}

        /* ══ EXISTING DARK CONTENT SECTIONS — unchanged ═══════════════════ */
        .p-types{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-section-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:.8rem;display:block;}
        .p-section-h2{font-family:var(--ff-serif);font-size:clamp(2rem,4vw,3.2rem);font-weight:700;line-height:1.1;letter-spacing:-.015em;color:#fff;margin-bottom:1rem;}
        .p-section-sub{font-family:var(--ff-sans);font-size:.95rem;font-weight:300;line-height:1.7;color:var(--c-muted);max-width:480px;}
        .p-types__header{text-align:center;margin:0 auto 4rem;}
        .p-types__grid{display:grid;gap:1.5px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));max-width:1100px;margin:0 auto;border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;}
        .p-type-card{position:relative;background:var(--c-bg);padding:2.4rem 2rem;transition:background .25s ease;}
        .p-type-card:hover{background:#111;}
        .p-type-card__icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem;font-size:1.2rem;background:rgba(255,255,255,.04);border:1px solid var(--c-border);transition:transform .2s ease;}
        .p-type-card:hover .p-type-card__icon-wrap{transform:scale(1.1);}
        .p-type-card__title{font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;color:#fff;margin-bottom:.6rem;letter-spacing:-.01em;}
        .p-type-card__desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .p-type-card__line{position:absolute;bottom:0;left:0;right:0;height:2px;opacity:0;transition:opacity .25s ease;}
        .p-type-card:hover .p-type-card__line{opacity:1;}

        .p-why{background:var(--c-bg);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-why__inner{max-width:1100px;margin:0 auto;}
        .p-why__layout{display:grid;gap:4rem;grid-template-columns:1fr 1fr;align-items:start;}
        @media(max-width:768px){.p-why__layout{grid-template-columns:1fr;}}
        .p-why__items{display:flex;flex-direction:column;gap:0;}
        .p-why__item{padding:2rem 0;border-bottom:1px solid var(--c-border);display:flex;gap:1.5rem;align-items:flex-start;}
        .p-why__item:first-child{border-top:1px solid var(--c-border);}
        .p-why__num{font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;}
        .p-why__item-title{font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;color:#fff;margin-bottom:.4rem;}
        .p-why__item-desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .p-why__visual{position:relative;background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));border:1px solid rgba(249,115,22,.15);border-radius:20px;padding:2.5rem;display:flex;flex-direction:column;gap:1.2rem;}
        .p-why__stats{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.2rem;}
        .p-why__stat{display:flex;flex-direction:column;}
        .p-why__stat-num{font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;display:block;}
        .p-why__stat-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);display:block;}
        .p-why__divider{height:1px;background:var(--c-border);}

        .p-faq{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .p-faq__inner{max-width:800px;margin:0 auto;}
        .p-faq__header{text-align:center;margin-bottom:3.5rem;}
        .p-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--c-border);border-radius:16px;overflow:hidden;}
        .p-faq__item{border-bottom:1px solid var(--c-border);background:var(--c-bg);transition:background .2s ease;}
        .p-faq__item:last-child{border-bottom:none;}
        .p-faq__item[open]{background:#0d0d0d;}
        .p-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .p-faq__q::-webkit-details-marker{display:none;}.p-faq__q::marker{display:none;}
        .p-faq__q-text{font-family:var(--ff-serif);font-size:1.15rem;font-weight:600;color:rgba(255,255,255,.85);line-height:1.35;flex:1;transition:color .2s ease;}
        .p-faq__item[open] .p-faq__q-text,.p-faq__q:hover .p-faq__q-text{color:#fff;}
        .p-faq__chevron{flex-shrink:0;color:var(--c-orange);opacity:.7;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .p-faq__item[open] .p-faq__chevron{transform:rotate(180deg);opacity:1;}
        .p-faq__a{padding:0 1.75rem 1.5rem;animation:ptFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes ptFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .p-faq__a p{font-family:var(--ff-sans);font-size:.92rem;font-weight:300;line-height:1.8;color:var(--c-muted);margin:0;}

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .pt-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--pt-line);}
        @media(max-width:760px){.pt-sticky-cta{display:flex;justify-content:center;}}
        .pt-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--pt-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ CTA STRIP — matches Services .sv-cta exactly ══════════════ */
        .pt-cta{background:var(--pt-surface);border-top:1px solid var(--pt-line);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .pt-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,var(--pt-blue),transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .pt-cta__inner{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .pt-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--pt-blue);margin-bottom:1.2rem;display:block;}
        .pt-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--pt-ink);margin:0 0 1rem;}
        .pt-cta__h2 em{font-style:normal;color:var(--pt-blue);}
        .pt-cta__sub{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:var(--pt-muted);margin-bottom:2.6rem;}
        .pt-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--pt-ink);padding:14px 32px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .pt-cta__btn:hover{background:var(--pt-blue);transform:translateY(-2px);}

        @media(max-width:480px){.pt-hero__actions{flex-direction:column;align-items:stretch;}.pt-hero__btn--primary,.pt-hero__btn--ghost{justify-content:center;}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      <div className="pt-page">
        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <section className="pt-hero" aria-labelledby="pt-hero-heading" id="partner-hero">
          <div aria-hidden="true">
            <div className="pt-hero__grain" />
          </div>
          <div className="pt-corner pt-corner--tl" aria-hidden="true" />
          <div className="pt-corner pt-corner--tr" aria-hidden="true" />
          <div className="pt-corner pt-corner--bl" aria-hidden="true" />
          <div className="pt-corner pt-corner--br" aria-hidden="true" />

          <nav className="pt-sr-only" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/partner" aria-current="page">Partner</a></li>
            </ol>
          </nav>

          <div className="pt-hero__inner">
            <div className="pt-hero__content">
              <div className="pt-hero__eyebrow" aria-hidden="true">
                <span className="pt-hero__dot" />
                Strategic Collaboration · India &amp; Global
              </div>
              <h1 className="pt-hero__h1" id="pt-hero-heading">
                Grow <em>together</em><br />with us
              </h1>
              <div className="pt-hero__rule" aria-hidden="true" />
              <p className="pt-hero__sub">
                We collaborate with agencies, startups, and enterprises to
                deliver scalable, future-ready digital solutions — built on
                trust and shared ambition.
              </p>
              <div className="pt-hero__actions">
                <a href="#partner-types" className="pt-hero__btn--primary" aria-label="Explore partnership types with 99 Visual Solutions">
                  Become a Partner
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <ConsultationCTA className="pt-hero__btn--ghost" ariaLabel="Contact 99 Visual Solutions to start a partnership">
                  Talk to Us
                </ConsultationCTA>
              </div>
            </div>
          </div>

          <div className="pt-hero__ticker-bar" aria-hidden="true">
            <div className="pt-ticker">
              <div className="pt-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="pt-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="pt-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS STRIP ═════════════════════════════════════════════════ */}
        <div className="pt-stats" aria-label="Partnership statistics">
          <div className="pt-stats__inner">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="pt-stat__val">
                  {s.value.includes("+")
                    ? <>{s.value.replace("+", "")}<span>+</span></>
                    : s.value}
                </div>
                <div className="pt-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PARTNER TYPES — unchanged ═══════════════════════════════════ */}
        <section id="partner-types" className="p-types" aria-labelledby="p-types-heading">
          <div className="p-types__header">
            <p className="p-section-label">What we offer</p>
            <h2 className="p-section-h2" id="p-types-heading">Types of Partnerships</h2>
            <p className="p-section-sub" style={{ margin:"0 auto" }}>
              Four distinct models — each designed to meet you where you are
              and grow where you&apos;re going.
            </p>
          </div>
          <div className="p-types__grid" role="list">
            {partnerTypes.map(({ icon: Icon, accent, label, desc }) => (
              <article className="p-type-card" key={label} role="listitem" aria-label={label}>
                <div className="p-type-card__icon-wrap" style={{ color: accent }} aria-hidden="true"><Icon /></div>
                <h3 className="p-type-card__title">{label}</h3>
                <p className="p-type-card__desc">{desc}</p>
                <div className="p-type-card__line" style={{ background:`linear-gradient(90deg, ${accent}, transparent)` }} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        {/* ══ WHY PARTNER — unchanged ══════════════════════════════════════ */}
        <section className="p-why" aria-labelledby="p-why-heading">
          <div className="p-why__inner">
            <div className="p-why__layout">
              <div>
                <p className="p-section-label">Why us</p>
                <h2 className="p-section-h2" id="p-why-heading" style={{ marginBottom:"2.5rem" }}>
                  Why partner<br />with 99 Visual?
                </h2>
                <div className="p-why__items">
                  {whyItems.map(({ num, title, desc }) => (
                    <div className="p-why__item" key={num}>
                      <span className="p-why__num" aria-hidden="true">{num}</span>
                      <div>
                        <h3 className="p-why__item-title">{title}</h3>
                        <p className="p-why__item-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-why__visual" aria-label="Partnership statistics">
                <dl className="p-why__stats">
                  <div className="p-why__stat"><dt className="p-why__stat-label">Years of Expertise</dt><dd className="p-why__stat-num">5+</dd></div>
                  <div className="p-why__divider" aria-hidden="true" />
                  <div className="p-why__stat"><dt className="p-why__stat-label">Projects Delivered</dt><dd className="p-why__stat-num">500+</dd></div>
                  <div className="p-why__divider" aria-hidden="true" />
                  <div className="p-why__stat"><dt className="p-why__stat-label">Global Partners</dt><dd className="p-why__stat-num">30+</dd></div>
                  <div className="p-why__divider" aria-hidden="true" />
                  <div className="p-why__stat"><dt className="p-why__stat-label">Core Service Domains</dt><dd className="p-why__stat-num">6</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FAQ — unchanged, JSON-LD only, no microdata ═════════════════ */}
        <section id="faq" className="p-faq" aria-labelledby="p-faq-heading">
          <div className="p-faq__inner">
            <div className="p-faq__header">
              <p className="p-section-label">Got questions?</p>
              <h2 className="p-section-h2" id="p-faq-heading">Frequently Asked Questions</h2>
              <p className="p-section-sub" style={{ margin:"0 auto" }}>
                Everything you need to know about partnering with 99 Visual Solutions.
              </p>
            </div>

            <div className="p-faq__list">
              {FAQ_ITEMS.map(({ question, answer }, i) => (
                <details key={i} className="p-faq__item">
                  <summary className="p-faq__q">
                    <span className="p-faq__q-text">{question}</span>
                    <span className="p-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════════════════════════ */}
        <section className="pt-cta" aria-labelledby="pt-cta-heading">
          <div className="pt-cta__orb" aria-hidden="true" />
          <div className="pt-cta__inner">
            <span className="pt-cta__eyebrow">Let's Build Together</span>
            <h2 className="pt-cta__h2" id="pt-cta-heading">
              Let's build the<br /><em>future together</em>
            </h2>
            <p className="pt-cta__sub">
              Join our ecosystem and grow your business through strategic,
              long-term collaboration with a team that's invested in your success.
            </p>
            <ConsultationCTA className="pt-cta__btn" ariaLabel="Start a partnership with 99 Visual Solutions">
              Partner With Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═══════════════════════════════════════════ */}
        <div className="pt-sticky-cta">
          <ConsultationCTA className="pt-sticky-cta__btn">Partner With Us</ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />
   
    </>
  );
}