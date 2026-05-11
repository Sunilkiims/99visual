// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// FIXES APPLIED:
//   ✅ Removed inline schemaGraph with its own "@context" — uses buildGraph()
//   ✅ Removed duplicate Organization, LocalBusiness, WebSite node definitions
//      that diverged from lib/schema.ts (foundingDate "2015" vs "2020",
//      different descriptions, different logo refs)
//   ✅ Page-specific nodes (ContactPage, BreadcrumbList, FAQPage) kept inline
//   ✅ All animation, styling, and layout unchanged
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactForm     from "../components/contactform";
import ContactUsBanner from "../components/contactus-banner";
import Header          from "../components/header";
import Footer          from "../components/footer";
import ScrollDown      from "../components/scrolldown";
import Chatbot         from "../components/chatbot";
import Whatsappbutton  from "../components/wahtsappbutton";
import PageLoader      from "../components/PageLoader";

import {
  BASE,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumb,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",
  metadataBase: new URL(BASE),
  alternates: {
    canonical: "/contact",
    languages: {
      "en-IN":     `${BASE}/contact`,
      "en-US":     `${BASE}/contact`,
      "en-GB":     `${BASE}/contact`,
      "en-AE":     `${BASE}/contact`,
      "en-AU":     `${BASE}/contact`,
      "x-default": `${BASE}/contact`,
    },
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
    title:
      "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url:      `${BASE}/contact`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/contact-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Contact 99 Visual Solutions — Free Consultation for Web, 3D & Digital Services",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description:
      "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site:    "@99VisualSoluti1",
    creator: "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/contact-og.jpg`,
        alt: "Contact 99 Visual Solutions — Free Consultation Bangalore",
      },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — page-specific nodes only
// Organization, LocalBusiness, WebSite come from lib/schema.ts.
// Only ContactPage, BreadcrumbList, and FAQPage are defined here.
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

const contactBreadcrumbNode = {
  ...breadcrumb([
    { name: "Home",    url: "/" },
    { name: "Contact", url: "/contact" },
  ]),
  "@id": `${BASE}/contact#breadcrumb`,
};

const contactFaqNode = {
  ...faqSchema([
    {
      question: "Does 99 Visual offer a free consultation?",
      answer:
        "Yes. 99 Visual Solutions offers a free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form and the team will get back to you within one business day.",
    },
    {
      question: "Where is 99 Visual Solutions located?",
      answer:
        "99 Visual Solutions is based in Bengaluru, Karnataka, India. The team works with clients both locally and globally across the USA, UK, UAE, and Australia.",
    },
    {
      question: "How quickly does 99 Visual respond to enquiries?",
      answer:
        "The team typically responds to all enquiries within one business day. You can reach out via the contact form at 99visual.com/contact or by emailing contact@99visual.com.",
    },
    {
      question: "What services can I get a quote for?",
      answer:
        "You can request a quote for web development, UI/UX design, 3D visualisation, SEO, digital marketing, GIS services, CAD drafting, and IT consulting. Use the contact form to describe your project requirements.",
    },
    {
      question: "Does 99 Visual work with international clients?",
      answer:
        "Yes. 99 Visual Solutions serves startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times.",
    },
  ]),
  "@id":            `${BASE}/contact#faq`,
  mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
};

const contactPageNode = {
  "@type":       "ContactPage",
  "@id":         `${BASE}/contact#webpage`,
  url:           `${BASE}/contact`,
  name:          "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
  description:   "Get in touch with 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/og/contact-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Contact 99 Visual Solutions — Free Consultation Bangalore",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".ct-hero__h1", ".ct-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/contact`] },
};

// Single @graph — one @context, zero duplicated node definitions.
const contactGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  contactPageNode,
  contactBreadcrumbNode,
  contactFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <PageLoader />

      {/* Single JSON-LD script — one @context via buildGraph */}
      <script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Design tokens ───────────────────────────────────────────────── */
        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-indigo:  #6366f1;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        .sr-only {
          position:    absolute !important;
          width:       1px      !important;
          height:      1px      !important;
          padding:     0        !important;
          margin:      -1px     !important;
          overflow:    hidden   !important;
          clip:        rect(0,0,0,0) !important;
          white-space: nowrap   !important;
          border:      0        !important;
        }

        /* ══ HERO SHELL ═══════════════════════════════════════════════════ */
        .ct-hero {
          position:        relative;
          min-height:      92vh;
          display:         flex;
          flex-direction:  row;
          align-items:     center;
          background:      var(--c-bg);
          overflow:        hidden;
        }

        .ct-hero__grid {
          position:         absolute;
          inset:            0;
          pointer-events:   none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* ── Left column ─────────────────────────────────────────────────── */
        .ct-hero__left {
          position:       relative;
          z-index:        10;
          flex:           1 1 340px;
          padding:        6rem 3rem 6rem 6rem;
          display:        flex;
          flex-direction: column;
          align-items:    flex-start;
        }

        .ct-hero__eyebrow {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          font-family:     var(--ff-sans);
          font-size:       10px;
          font-weight:     500;
          letter-spacing:  .22em;
          text-transform:  uppercase;
          color:           var(--c-orange);
          border:          1px solid rgba(249,115,22,.28);
          background:      rgba(249,115,22,.07);
          padding:         6px 16px;
          border-radius:   100px;
          margin-bottom:   1.8rem;
          backdrop-filter: blur(8px);
          animation:       ctFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .ct-hero__dot {
          width:        5px;
          height:       5px;
          border-radius: 50%;
          background:   var(--c-orange);
          animation:    ctPulse 2s ease-in-out infinite;
        }
        @keyframes ctPulse {
          0%,100% { opacity:1;  transform:scale(1); }
          50%     { opacity:.35; transform:scale(.65); }
        }

        .ct-hero__h1 {
          font-family:    var(--ff-serif);
          font-size:      clamp(2rem, 4.5vw, 3.8rem);
          font-weight:    700;
          line-height:    1.1;
          letter-spacing: -.02em;
          color:          #fff;
          margin:         0 0 1rem;
          animation:      ctFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;
        }
        .ct-hero__h1 em {
          font-style:          italic;
          color:               transparent;
          -webkit-text-stroke: .2px var(--c-orange);
        }

        .ct-hero__rule {
          width:      48px;
          height:     1px;
          background: linear-gradient(90deg,transparent,var(--c-orange),transparent);
          margin:     0 0 1.4rem;
          animation:  ctFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both;
        }

        .ct-hero__sub {
          font-family: var(--ff-sans);
          font-size:   clamp(.95rem, 1.8vw, 1.1rem);
          font-weight: 300;
          line-height: 1.78;
          color:       var(--c-muted);
          max-width:   420px;
          margin:      0 0 2.4rem;
          animation:   ctFadeUp .9s cubic-bezier(.22,1,.36,1) .32s both;
        }

        .ct-hero__cta {
          display:         inline-flex;
          align-items:     center;
          gap:             10px;
          font-family:     var(--ff-sans);
          font-size:       11px;
          font-weight:     600;
          letter-spacing:  .12em;
          text-transform:  uppercase;
          color:           #080808;
          background:      linear-gradient(135deg,#fb923c,#f97316);
          padding:         14px 34px;
          border-radius:   100px;
          text-decoration: none;
          box-shadow:      0 8px 32px rgba(249,115,22,.35);
          transition:      transform .22s ease, box-shadow .22s ease;
          animation:       ctFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .ct-hero__cta:hover {
          transform:  translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.52);
        }

        @keyframes ctFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ct-hero__scroll {
          position:       absolute;
          bottom:         2rem;
          left:           calc(6rem + 20px);
          z-index:        20;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            6px;
          text-decoration: none;
          animation:      ctFadeUp .9s ease .85s both;
        }
        .ct-hero__scroll-line {
          width:      1px;
          height:     40px;
          background: linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:  ctScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes ctScrollLine {
          0%   { transform:scaleY(0);  transform-origin:top;    opacity:1; }
          50%  { transform:scaleY(1);  transform-origin:top;    opacity:1; }
          100% { transform:scaleY(1);  transform-origin:bottom; opacity:0; }
        }
        .ct-hero__scroll-lbl {
          font-family:    var(--ff-sans);
          font-size:      9px;
          font-weight:    500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color:          rgba(255,255,255,.22);
        }

        /* ── Right column: animation stage ──────────────────────────────── */
        .ct-hero__right {
          flex:            0 0 460px;
          height:          92vh;
          min-height:      560px;
          position:        relative;
          display:         flex;
          align-items:     center;
          justify-content: center;
          overflow:        visible;
        }
        

        /* ── Animation stage ─────────────────────────────────────────────── */
        .ct-anim {
          position:       relative;
          width:          360px;
          height:         440px;
          pointer-events: none;
        }

        /* ─── Letter ─────────────────────────────────────────────────────── */
        .ct-letter {
          position:        absolute;
          top:             30px;
          left:            40px;
          width:           72px;
          height:          55px;
          transform-origin: center center;
          animation:       ctLetterFly 3.2s cubic-bezier(.45,0,.2,1) infinite;
        }
        @keyframes ctLetterFly {
          0%   { transform: translate(0px,   0px)   rotate(-18deg) scale(.88); opacity:0; }
          6%   { opacity: 1; }
          32%  { transform: translate(220px, -50px)  rotate(14deg)  scale(1.08); opacity:1; }
          64%  { transform: translate(136px, 220px)  rotate(-5deg)  scale(.94); opacity:1; }
          76%  { transform: translate(112px, 262px)  rotate(-1deg)  scale(.52); opacity:.8; }
          86%  { transform: translate(112px, 282px)  rotate(0deg)   scale(.18); opacity:0; }
          87%  { transform: translate(0px,   0px)   rotate(-18deg) scale(.88); opacity:0; }
          100% { transform: translate(0px,   0px)   rotate(-18deg) scale(.88); opacity:0; }
        }
        .ct-letter svg {
          width:  100%;
          height: 100%;
          animation: ctLetterGlow 3.2s ease-in-out infinite;
        }
        @keyframes ctLetterGlow {
          0%,100% { filter: drop-shadow(0 0 9px rgba(249,115,22,.62)) drop-shadow(0 0 22px rgba(249,115,22,.28)); }
          32%     { filter: drop-shadow(0 0 20px rgba(249,115,22,1))  drop-shadow(0 0 48px rgba(249,115,22,.6)); }
          76%     { filter: drop-shadow(0 0 13px rgba(99,102,241,.9)) drop-shadow(0 0 32px rgba(99,102,241,.5)); }
        }

        /* ─── Trail dots ─────────────────────────────────────────────────── */
        .ct-trail {
          position:       absolute;
          top:            56px;
          left:           74px;
          border-radius:  50%;
          background:     var(--c-orange);
          pointer-events: none;
        }
        .ct-trail-1 { width:4px; height:4px; animation: ctTr1 3.2s ease-in-out infinite; opacity:0; }
        .ct-trail-2 { width:3px; height:3px; animation: ctTr2 3.2s ease-in-out infinite; opacity:0; animation-delay:.06s; }
        .ct-trail-3 { width:2px; height:2px; animation: ctTr3 3.2s ease-in-out infinite; opacity:0; animation-delay:.12s; }
        .ct-trail-4 { width:2px; height:2px; animation: ctTr4 3.2s ease-in-out infinite; opacity:0; animation-delay:.18s; background:rgba(249,115,22,.5); }

        @keyframes ctTr1 {
          0%,6%  { transform:translate(0,0);         opacity:0; }
          28%    { transform:translate(178px,-52px);  opacity:.85; }
          60%    { transform:translate(98px,190px);   opacity:.4; }
          74%    { opacity:0; }
          100%   { opacity:0; }
        }
        @keyframes ctTr2 {
          0%,6%  { transform:translate(0,0);         opacity:0; }
          28%    { transform:translate(145px,-42px);  opacity:.65; }
          60%    { transform:translate(78px,172px);   opacity:.28; }
          72%    { opacity:0; }
          100%   { opacity:0; }
        }
        @keyframes ctTr3 {
          0%,6%  { transform:translate(0,0);         opacity:0; }
          28%    { transform:translate(110px,-30px);  opacity:.45; }
          60%    { transform:translate(58px,150px);   opacity:.18; }
          70%    { opacity:0; }
          100%   { opacity:0; }
        }
        @keyframes ctTr4 {
          0%,6%  { transform:translate(0,0);         opacity:0; }
          28%    { transform:translate(74px,-16px);   opacity:.3; }
          60%    { transform:translate(38px,126px);   opacity:.1; }
          68%    { opacity:0; }
          100%   { opacity:0; }
        }

        /* ─── Mailbox ────────────────────────────────────────────────────── */
        .ct-mailbox {
          position:        absolute;
          bottom:          28px;
          left:            50%;
          transform:       translateX(-50%);
          display:         flex;
          flex-direction:  column;
          align-items:     center;
        }
        .ct-mailbox__glow {
          position:       absolute;
          top:            -18px;
          left:           -16px;
          right:          -16px;
          bottom:         -34px;
          border-radius:  16px;
          border:         1.5px solid transparent;
          pointer-events: none;
          animation:      ctMbGlow 3.2s ease-in-out infinite;
        }
        @keyframes ctMbGlow {
          0%,64%  { border-color:transparent; box-shadow:none; }
          80%     { border-color:rgba(99,102,241,.72);
                    box-shadow:0 0 36px rgba(99,102,241,.38), 0 0 72px rgba(99,102,241,.16); }
          100%    { border-color:transparent; box-shadow:none; }
        }
        .ct-mailbox__roof {
          width:  0;
          height: 0;
          border-left:   63px solid transparent;
          border-right:  63px solid transparent;
          border-bottom: 25px solid #1a1a2e;
          filter:        drop-shadow(0 -1px 0 rgba(99,102,241,.42));
        }
        .ct-mailbox__body {
          width:         126px;
          height:        82px;
          background:    linear-gradient(160deg,#1e1e2e 50%,#12122a);
          border:        1.5px solid rgba(99,102,241,.58);
          border-radius: 10px 10px 6px 6px;
          position:      relative;
          box-shadow:
            0 0 32px rgba(99,102,241,.2),
            inset 0 1px 0 rgba(255,255,255,.06);
        }
        .ct-mailbox__slot {
          position:      absolute;
          top:           50%;
          left:          50%;
          transform:     translate(-50%,-50%);
          width:         62px;
          height:        7px;
          background:    #000;
          border-radius: 3.5px;
          box-shadow:    inset 0 2px 6px rgba(0,0,0,1);
        }
        .ct-mailbox__slot::after {
          content:       '';
          position:      absolute;
          top:           0;
          left:          5px;
          right:         5px;
          height:        1px;
          background:    rgba(99,102,241,.35);
          border-radius: 1px;
        }
        .ct-mailbox__icon {
          position: absolute;
          bottom:   9px;
          right:    11px;
          opacity:  .22;
        }
        .ct-mailbox__post {
          width:         12px;
          height:        34px;
          background:    linear-gradient(to right,#1a1a2e,#242440);
          border:        1px solid rgba(99,102,241,.22);
          border-top:    none;
          border-radius: 0 0 4px 4px;
        }

        /* ─── Spark burst ────────────────────────────────────────────────── */
        .ct-spark {
          position:      absolute;
          border-radius: 50%;
          bottom:        100px;
          left:          50%;
          opacity:       0;
        }
        .ct-spark-1 { width:4px; height:4px; background:#6366f1; animation:ctSp1 3.2s ease-out infinite; }
        .ct-spark-2 { width:4px; height:4px; background:#f97316; animation:ctSp2 3.2s ease-out infinite; }
        .ct-spark-3 { width:3px; height:3px; background:#a78bfa; animation:ctSp3 3.2s ease-out infinite; }
        .ct-spark-4 { width:3px; height:3px; background:#6366f1; animation:ctSp4 3.2s ease-out infinite; }
        .ct-spark-5 { width:2px; height:2px; background:#fbbf24; animation:ctSp5 3.2s ease-out infinite; }
        .ct-spark-6 { width:2px; height:2px; background:#f97316; animation:ctSp6 3.2s ease-out infinite; }

        @keyframes ctSp1 { 0%,72%{opacity:0;transform:translate(0,0) scale(1)} 78%{opacity:1;transform:translate(-24px,-20px) scale(1.5)} 96%{opacity:0;transform:translate(-36px,-7px) scale(.3)} 100%{opacity:0} }
        @keyframes ctSp2 { 0%,73%{opacity:0;transform:translate(0,0) scale(1)} 79%{opacity:1;transform:translate( 22px,-24px) scale(1.5)} 96%{opacity:0;transform:translate( 34px,-8px) scale(.3)} 100%{opacity:0} }
        @keyframes ctSp3 { 0%,71%{opacity:0;transform:translate(0,0) scale(1)} 77%{opacity:1;transform:translate(-10px,-30px) scale(1.4)} 96%{opacity:0;transform:translate(-16px,-9px) scale(.3)} 100%{opacity:0} }
        @keyframes ctSp4 { 0%,74%{opacity:0;transform:translate(0,0)}          80%{opacity:1;transform:translate( 16px,-16px)}               96%{opacity:0;transform:translate( 24px, 2px)}              100%{opacity:0} }
        @keyframes ctSp5 { 0%,75%{opacity:0;transform:translate(0,0)}          81%{opacity:1;transform:translate(-18px,-12px)}               96%{opacity:0;transform:translate(-28px, 4px)}             100%{opacity:0} }
        @keyframes ctSp6 { 0%,76%{opacity:0;transform:translate(0,0)}          82%{opacity:1;transform:translate(  8px,-26px)}               96%{opacity:0;transform:translate( 12px,-8px)}             100%{opacity:0} }

        /* ─── Corner brackets ────────────────────────────────────────────── */
        .ct-corner {
          position:       absolute;
          width:          28px;
          height:         28px;
          z-index:        5;
          opacity:        .18;
          pointer-events: none;
        }
        .ct-corner--tl { top:22px;    left:22px;    border-top:   1px solid var(--c-orange); border-left:  1px solid var(--c-orange); }
        .ct-corner--tr { top:22px;    right:22px;   border-top:   1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom:22px; left:22px;    border-bottom:1px solid var(--c-orange); border-left:  1px solid var(--c-orange); }
        .ct-corner--br { bottom:22px; right:22px;   border-bottom:1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ══ RESPONSIVE ════════════════════════════════════════════════════ */
        @media (max-width: 900px) {
          .ct-hero__left  { padding: 5rem 2.5rem 5rem 3rem; }
          .ct-hero__right { flex: 0 0 340px; }
          .ct-anim        { width:280px; height:360px; }
        }

        @media (max-width: 768px) {
          .ct-hero { flex-direction: column; min-height: auto; }
          .ct-hero__left {
            order: 2; flex: none; width: 100%;
            padding: 3rem 1.5rem 4rem;
            align-items: center; text-align: center;
          }
          .ct-hero__sub  { max-width: 100%; }
          .ct-hero__right {
            order: 1; flex: none; width: 100%;
            height: 320px; min-height: 320px; opacity: .45;
          }
          .ct-anim { width:220px; height:280px; }
          .ct-letter { width:54px; height:42px; }
          @keyframes ctLetterFly {
            0%   { transform:translate(0px,0px)    rotate(-18deg) scale(.88); opacity:0; }
            6%   { opacity:1; }
            32%  { transform:translate(160px,-36px) rotate(14deg) scale(1.06); opacity:1; }
            64%  { transform:translate(98px,162px)  rotate(-5deg) scale(.93); opacity:1; }
            76%  { transform:translate(80px,196px)  rotate(-1deg) scale(.5);  opacity:.8; }
            86%  { transform:translate(80px,212px)  rotate(0deg)  scale(.16); opacity:0; }
            87%  { transform:translate(0px,0px)    rotate(-18deg) scale(.88); opacity:0; }
            100% { transform:translate(0px,0px)    rotate(-18deg) scale(.88); opacity:0; }
          }
          .ct-hero__scroll { left:50%; transform:translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:        0.01ms !important;
            animation-iteration-count: 1      !important;
            transition-duration:       0.01ms !important;
          }
        }
      `}</style>

      <Header />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="ct-hero"
        aria-labelledby="ct-hero-heading"
        id="contact-hero"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <div className="ct-hero__grid" aria-hidden="true" />

        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        {/* ── LEFT: hero copy ─────────────────────────────────────────────── */}
        <div className="ct-hero__left">

          <nav className="sr-only" aria-label="Breadcrumb" aria-hidden="true">
            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <a href="/contact" itemProp="item" aria-current="page">
                  <span itemProp="name">Contact</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <p className="ct-hero__eyebrow" aria-hidden="true">
            <span className="ct-hero__dot" />
            Contact · Bangalore &amp; Beyond
          </p>

          <h1 className="ct-hero__h1" id="ct-hero-heading" itemProp="name">
            Let&apos;s build something<br /><em>great</em> together
          </h1>

          <div className="ct-hero__rule" aria-hidden="true" />

          <p className="ct-hero__sub" itemProp="description">
            We believe collaboration drives innovation. We partner with forward-thinking
            organisations to create impactful, future-ready solutions.
          </p>

          <a
            href="#contact-form"
            className="ct-hero__cta"
            aria-label="Scroll to contact form — get in touch with 99 Visual Solutions"
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 2v10M3 8l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* ── RIGHT: letter-to-mailbox animation ──────────────────────────── */}
        <div className="ct-hero__right" aria-hidden="true">
          <div className="ct-anim">

            <div className="ct-trail ct-trail-1" />
            <div className="ct-trail ct-trail-2" />
            <div className="ct-trail ct-trail-3" />
            <div className="ct-trail ct-trail-4" />

            <div className="ct-letter">
              <svg viewBox="0 0 72 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="70" height="53" rx="5" fill="#1e1032" stroke="#f97316" strokeWidth="1.4" />
                <rect x="7" y="6" width="58" height="36" rx="2.5" fill="#fff" opacity="0.07" />
                <line x1="13" y1="17" x2="59" y2="17" stroke="#f97316" strokeWidth=".9" opacity=".45" />
                <line x1="13" y1="25" x2="52" y2="25" stroke="#f97316" strokeWidth=".9" opacity=".32" />
                <line x1="13" y1="33" x2="44" y2="33" stroke="#f97316" strokeWidth=".9" opacity=".22" />
                <path d="M1 7 L36 32 L71 7" stroke="#f97316" strokeWidth="1.2" opacity=".65" fill="none" />
                <circle cx="36" cy="30" r="7" fill="#f97316" opacity=".75" />
                <circle cx="36" cy="30" r="4" fill="#fde68a" opacity=".95" />
                <rect x="3" y="2" width="66" height="4" rx="2" fill="white" opacity=".04" />
              </svg>
            </div>

            <div className="ct-mailbox">
              <div className="ct-mailbox__glow" />
              <div className="ct-mailbox__roof" />
              <div className="ct-mailbox__body">
                <div className="ct-mailbox__slot" />
                <svg className="ct-mailbox__icon" width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                  <rect x=".5" y=".5" width="17" height="12" rx="2" stroke="white" strokeWidth="1" />
                  <path d="M.5 1.5 L9 8 L17.5 1.5" stroke="white" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="ct-mailbox__post" />

              <div className="ct-spark ct-spark-1" />
              <div className="ct-spark ct-spark-2" />
              <div className="ct-spark ct-spark-3" />
              <div className="ct-spark ct-spark-4" />
              <div className="ct-spark ct-spark-5" />
              <div className="ct-spark ct-spark-6" />
            </div>

          </div>
        </div>

        <a href="#contact-form" className="ct-hero__scroll" aria-label="Scroll to contact form">
          <div className="ct-hero__scroll-line" aria-hidden="true" />
          <span className="ct-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CONTACT US BANNER ═══════════════════════════════════════════════ */}
      <ContactUsBanner />

      {/* ══ CONTACT FORM ════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        aria-label="Contact form — send 99 Visual Solutions a message"
      >
        <ContactForm />
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}