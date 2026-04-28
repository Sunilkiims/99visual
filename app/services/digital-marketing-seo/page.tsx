import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import {
  FaBullhorn,
  FaSearch,
  FaChartLine,
  FaMobileAlt,
  FaEnvelopeOpenText,
  FaHandshake,
} from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Services | SEO, PPC, Social Media, Content & More - 99 Visual Solutions",
  description:
    "99 Visual Solutions delivers full-spectrum digital marketing and SEO services including search engine optimization, PPC advertising, Meta Ads, social media marketing, content marketing, email marketing, local SEO, technical SEO, link building, marketing automation, and promotional video — designed to grow traffic, leads, and ROI for businesses worldwide.",
  keywords: [
    "Digital Marketing Services",
    "SEO Services",
    "Search Engine Optimization Services",
    "Technical SEO Services",
    "On-Page SEO Optimization",
    "Off-Page SEO Services",
    "Link Building Services",
    "Local SEO Services",
    "Google Business Profile Optimization",
    "SEO Agency",
    "PPC Advertising Services",
    "Pay-Per-Click Management",
    "Google Ads Management",
    "Meta Ads Services",
    "Facebook Ads Management",
    "Instagram Ads Services",
    "Paid Social Media Advertising",
    "Social Media Marketing Services",
    "Social Media Management",
    "LinkedIn Marketing Services",
    "Twitter Marketing Services",
    "Content Marketing Services",
    "Content Strategy Services",
    "Blog Writing Services",
    "Email Marketing Services",
    "Email Campaign Automation",
    "Marketing Automation Services",
    "CRM Integration Services",
    "Lead Nurturing Services",
    "Lead Generation Services",
    "Performance Marketing Services",
    "Creative Banner Design Services",
    "Promotional Video Services",
    "Brand Storytelling Services",
    "Motion Graphics Services",
    "Online Branding Services",
    "Digital Marketing for Startups",
    "Digital Marketing for Enterprises",
    "Digital Marketing for E-Commerce",
    "MindTrick.io Digital Marketing",
    "99 Visual Solutions",
    "99 Visual Digital Marketing",
  ],
  openGraph: {
    title: "Digital Marketing & SEO Services | SEO, PPC, Social Media, Content & More - 99 Visual Solutions",
    description:
      "From SEO and PPC to Meta Ads, content marketing, email campaigns, local SEO, link building, marketing automation, and promotional videos — 99Visual Solutions delivers data-driven digital marketing strategies that grow your traffic, leads, and revenue worldwide.",
    url: "https://www.99visual.com/services/digital-marketing-seo",
    siteName: "99 Visual Solutions",
    images: [
      {
        url: "https://www.99visual.com/images/services/digital-marketing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Marketing & SEO Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & SEO Services | SEO, PPC, Social Media & More - 99 Visual Solutions",
    description:
      "SEO, PPC, Meta Ads, social media, content marketing, email automation & promotional video — performance-driven digital marketing by 99Visual Solutions.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/services/digital-marketing-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/services/digital-marketing-seo" },
};

export default function DigitalMarketing() {
  const benefits = [
    {
      icon: <FaSearch />,
      title: "Search Engine Visibility",
      description:
        "We optimize websites with proven SEO strategies to boost rankings, traffic, and conversions.",
    },
    {
      icon: <FaBullhorn />,
      title: "Brand Awareness",
      description:
        "Our campaigns build strong online visibility, ensuring your brand connects with the right audience.",
    },
    {
      icon: <FaChartLine />,
      title: "Data-Driven Growth",
      description:
        "We analyze performance metrics to refine strategies, maximizing ROI and measurable outcomes.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Cross-Platform Reach",
      description:
        "From social media to mobile-first campaigns, we ensure your brand reaches users everywhere.",
    },
    {
      icon: <FaEnvelopeOpenText />,
      title: "Engaging Campaigns",
      description:
        "We craft content, email, and ad campaigns that inspire action and build customer loyalty.",
    },
    {
      icon: <FaHandshake />,
      title: "End-to-End Support",
      description:
        "From strategy to execution, we provide continuous optimization and marketing support.",
    },
  ];

  const services = [
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      image: "/images/seo.png",
      imageAlt: "Search Engine Optimization",
      description:
        "In a competitive digital landscape, visibility is everything. Our SEO services are designed to position your business at the top of search engine results, driving high-quality organic traffic and long-term growth.",
      highlight:
        "We combine strategic keyword research, technical optimization, and content excellence to ensure your website not only ranks higher but also delivers real value to your audience.",
      bullets: [
        "Keyword research & on-page optimization",
        "Technical SEO audits & fixes",
        "High-quality backlink strategies",
      ],
      imageLeft: false,
    },
    {
      id: "meta-ads",
      title: "Meta Ads & Social Media Marketing",
      image: "/images/social-media.png",
      imageAlt: "Social media marketing illustration",
      description:
        "Amplify your brand's reach and engagement with strategic Meta Ads and social media marketing. We create data-driven campaigns across platforms like Facebook and Instagram that not only capture attention but also convert audiences into loyal customers.",
      highlight:
        "By combining compelling creatives, precise audience targeting, and continuous optimization, we ensure your brand stands out in crowded digital spaces.",
      bullets: [
        "Facebook, Instagram, LinkedIn & Twitter marketing",
        "Paid social ad campaigns",
        "Analytics & engagement tracking",
      ],
      imageLeft: true,
    },
    {
      id: "ppc",
      title: "Pay-Per-Click (PPC) Advertising",
      image: "/images/ppc.png",
      imageAlt: "PPC advertising illustration",
      description:
        "Drive instant visibility and measurable results with strategic Pay-Per-Click advertising. We create and manage high-performing ad campaigns that place your business in front of the right audience at the right time.",
      highlight:
        "By combining smart keyword targeting, compelling ad creatives, and continuous optimization, we ensure maximum return on your ad spend.",
      bullets: [
        "Keyword research, bid management & campaign strategy",
        "Social media ad management",
        "Continuous monitoring, A/B testing & ROI optimization",
      ],
      imageLeft: false,
    },
    {
      id: "email-marketing",
      title: "Content & Email Marketing",
      image: "/images/email-marketing.png",
      imageAlt: "Email marketing illustration",
      description:
        "Build meaningful connections with your audience through strategic content and personalized email marketing. We create compelling, value-driven content that attracts, engages, and nurtures your audience at every stage of their journey.",
      highlight:
        "From blog posts and website content to targeted email campaigns, our approach focuses on delivering the right message to the right audience at the right time.",
      bullets: [
        "Content strategy, creation & storytelling that resonates",
        "Email campaign design, automation & audience segmentation",
        "Performance tracking, personalization & conversion optimization",
      ],
      imageLeft: true,
    },
    {
      id: "local-seo",
      title: "Local SEO",
      image: "/images/local-seo.png",
      imageAlt: "Local SEO",
      description:
        "Make your business stand out in your local market and attract customers right when they need you. Our Local SEO services are designed to boost your visibility in location-based searches, helping you connect with nearby audiences and drive foot traffic or local inquiries.",
      highlight:
        "From optimizing your business listings to managing reviews and local keywords, we ensure your brand ranks higher in local search results and maps.",
      bullets: [
        "Google Business Profile optimization & local listings management",
        "Location-based keyword targeting & on-page optimization",
        "Review management, citations & local ranking improvements",
      ],
      imageLeft: false,
    },
    {
      id: "technical-seo",
      title: "Technical SEO",
      image: "/images/technival-seo.png",
      imageAlt: "Technical SEO",
      description:
        "A strong SEO strategy starts with a solid technical foundation. Our Technical SEO services focus on optimizing your website's structure, performance, and crawlability to ensure search engines can efficiently access, understand, and rank your content.",
      highlight:
        "From fixing indexing issues to improving site speed and implementing structured data, we enhance every technical aspect that impacts your visibility.",
      bullets: [
        "Website audit, crawlability & indexing optimization",
        "Core Web Vitals, speed & mobile performance enhancement",
        "Structured data, schema markup & technical issue resolution",
      ],
      imageLeft: true,
    },
    {
      id: "onpage",
      title: "On-Page Optimization",
      image: "/images/onpage-optimization.png",
      imageAlt: "On-Page Optimization",
      description:
        "Maximize your website's visibility and relevance with strategic on-page optimization. We fine-tune every element of your web pages—from content and keywords to meta tags and internal linking—to ensure they align perfectly with search engine algorithms and user intent.",
      highlight:
        "Our approach enhances both discoverability and user experience, helping your pages rank higher, engage visitors effectively, and drive meaningful conversions.",
      bullets: [
        "Keyword optimization, meta tags & content structuring",
        "Internal linking, URL optimization & image SEO",
        "User experience enhancements & search intent alignment",
      ],
      imageLeft: false,
    },
    {
      id: "offpage",
      title: "Off-Page SEO & Link Building",
      image: "/images/off-page-link-building.png",
      imageAlt: "Off-Page SEO & Link Building",
      description:
        "Strengthen your website's authority and credibility with powerful off-page SEO and strategic link building. We focus on building high-quality, relevant backlinks from trusted sources to improve your search engine rankings and online reputation.",
      highlight:
        "Through ethical (white-hat) practices and outreach strategies, we enhance your domain authority, increase brand visibility, and drive referral traffic.",
      bullets: [
        "High-quality backlink acquisition & outreach campaigns",
        "Guest posting, citations & brand mentions",
        "Authority building, referral traffic & ranking improvement",
      ],
      imageLeft: true,
    },
    {
      id: "content-marketing",
      title: "Content Marketing",
      image: "/images/content-marketing.png",
      imageAlt: "Content Marketing",
      description:
        "Turn your brand into a trusted voice with strategic, value-driven content marketing. We create and distribute high-quality content that educates, engages, and inspires your audience across every stage of their journey.",
      highlight:
        "By aligning content with your business goals and audience intent, we help you drive consistent traffic, engagement, and conversions.",
      bullets: [
        "Content strategy, planning & audience targeting",
        "Blog writing, articles & SEO-driven content creation",
        "Content distribution, engagement & performance optimization",
      ],
      imageLeft: false,
    },
    {
      id: "automation",
      title: "Marketing Automation",
      image: "/images/marketing-automation.png",
      imageAlt: "Marketing Automation",
      description:
        "Streamline your marketing efforts and deliver personalized experiences at scale with powerful marketing automation solutions. We help you automate repetitive tasks, nurture leads effectively, and engage your audience with the right message at the right time.",
      highlight:
        "By integrating smart tools and data-driven workflows, we enhance efficiency, improve customer journeys, and maximize conversions.",
      bullets: [
        "Automated workflows, lead nurturing & customer journeys",
        "CRM integration, segmentation & personalized campaigns",
        "Performance tracking, analytics & continuous optimization",
      ],
      imageLeft: true,
    },
    {
      id: "creative",
      title: "Creative Banner & Promotional Video",
      image: "/images/creative-banner.png",
      imageAlt: "Creative Banner & Promotional Video",
      description:
        "Capture attention and make a lasting impression with visually compelling banners and engaging promotional videos. We design high-impact creatives that not only look stunning but also communicate your brand message effectively.",
      highlight:
        "From eye-catching display ads to dynamic video content, our creative solutions are crafted to boost engagement, enhance brand recall, and drive conversions across digital platforms.",
      bullets: [
        "Custom banner designs for ads, websites & social media",
        "Promotional videos, motion graphics & brand storytelling",
        "Platform-optimized creatives for maximum engagement & ROI",
      ],
      imageLeft: false,
    },
    {
      id: "mindtrick",
      title: "MindTrick.io – Our Dedicated Digital Marketing Hub",
      image: "/images/mindtrick-marketing.png",
      imageAlt: "Mindtrick.io - specialist for marketing",
      description:
        "At MindTrick.io, we bring together innovation, creativity, and data-driven strategies to power your digital growth. As our dedicated digital marketing hub, MindTrick.io is focused on delivering result-oriented solutions that help businesses build strong online visibility, generate quality leads, and achieve sustainable success.",
      highlight:
        "From performance marketing to brand storytelling, we combine cutting-edge tools with expert insights to craft campaigns that truly make an impact.",
      bullets: [
        "End-to-end digital marketing solutions under one platform",
        "Data-driven campaigns focused on growth & ROI",
        "Expert strategies, creative execution & continuous optimization",
      ],
      imageLeft: true,
    },
  ];

  return (
    <>
      <Header />

      {/* ─── Shared Design Tokens ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:       #080808;
          --c-surface:  #0f0f0f;
          --c-surface2: #141414;
          --c-border:   rgba(255,255,255,0.07);
          --c-orange:   #f97316;
          --c-orange-dim: rgba(249,115,22,0.12);
          --c-muted:    rgba(255,255,255,0.45);
          --c-muted2:   rgba(255,255,255,0.65);
          --ff-serif:   'Cormorant Garamond', serif;
          --ff-sans:    'DM Sans', sans-serif;
        }

        /* ── HERO ── */
        .wd-hero {
          position: relative; min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg); overflow: hidden;
          padding: 8rem 1.5rem 6rem; text-align: center;
        }
        .wd-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .wd-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: wdOrbDrift 16s ease-in-out infinite alternate;
        }
        .wd-hero__orb--1 {
          width: 540px; height: 540px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -160px; left: -100px; opacity: .13;
        }
        .wd-hero__orb--2 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -130px; right: -80px; opacity: .12;
          animation-delay: -8s;
        }
        .wd-hero__orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #06b6d4, #0891b2);
          top: 40%; right: 15%; opacity: .07;
          animation-delay: -4s;
        }
        @keyframes wdOrbDrift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(32px,24px) scale(1.06); }
        }
        .wd-hero__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .wd-hero__grain {
          position: absolute; inset: 0; opacity: .03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .wd-hero__content {
          position: relative; z-index: 10; max-width: 800px; margin: 0 auto;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes wdFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wd-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .wd-hero__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: wdPulse 2s ease-in-out infinite;
        }
        @keyframes wdPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }
        .wd-hero__h1 {
          font-family: var(--ff-serif);
          font-size: clamp(3rem, 8.5vw, 6.8rem);
          font-weight: 700; line-height: 1.0; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1.1rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .wd-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1.5px var(--c-orange);
        }
        .wd-hero__rule {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.5rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }
        .wd-hero__sub {
          font-family: var(--ff-sans);
          font-size: clamp(.95rem, 2vw, 1.12rem);
          font-weight: 300; line-height: 1.75; color: var(--c-muted);
          max-width: 560px; margin: 0 auto 2.6rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }
        .wd-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .wd-hero__cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }
        .wd-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-decoration: none;
          animation: wdFadeUp .9s ease .8s both;
        }
        .wd-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: wdScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes wdScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .wd-hero__scroll-lbl {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }

        /* corner marks */
        .wd-corner {
          position: absolute; width: 28px; height: 28px; z-index: 5; opacity: .2;
        }
        .wd-corner--tl { top: 24px; left: 24px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wd-corner--tr { top: 24px; right: 24px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .wd-corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .wd-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ── INTRO ── */
        .wd-intro {
          background: var(--c-surface);
          border-bottom: 1px solid var(--c-border);
          padding: 5rem 1.5rem;
        }
        .wd-intro__inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .wd-intro__label {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: 1.2rem; display: block;
        }
        .wd-intro__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1.5rem;
        }
        .wd-intro__h2 em { font-style: italic; color: var(--c-orange); }
        .wd-intro__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.8rem;
        }
        .wd-intro__p {
          font-family: var(--ff-sans); font-size: 1rem;
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          max-width: 680px; margin: 0 auto .9rem;
        }
        .wd-intro__p strong { color: var(--c-muted2); font-weight: 500; }

        /* ── SERVICE SECTIONS ── */
        .wd-services { background: var(--c-bg); }

        .wd-svc {
          padding: 5rem 1.5rem;
          border-bottom: 1px solid var(--c-border);
          position: relative;
        }
        .wd-svc:nth-child(odd)  { background: var(--c-surface); }
        .wd-svc:nth-child(even) { background: var(--c-bg); }

        .wd-svc__inner--img-left {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 3fr 4fr;
          gap: 4rem; align-items: center;
        }
        .wd-svc__inner--img-right {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 4fr 3fr;
          gap: 4rem; align-items: center;
        }
        @media (max-width: 768px) {
          .wd-svc__inner--img-left,
          .wd-svc__inner--img-right { grid-template-columns: 1fr; gap: 2.5rem; }
          .wd-svc__img-wrap { order: 2 !important; }
          .wd-svc__body    { order: 1 !important; }
        }

        .wd-svc__img-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
        }
        .wd-svc__img-wrap::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(135deg, rgba(249,115,22,.08), transparent 60%);
          border-radius: 16px;
        }
        .wd-svc__img-wrap img {
          width: 100%; height: auto; display: block;
          border-radius: 16px; border: 1px solid var(--c-border);
          transition: transform .4s ease;
        }
        .wd-svc__img-wrap:hover img { transform: scale(1.03); }

        .wd-svc__num {
          font-family: var(--ff-serif);
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 700; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(249,115,22,.18);
          position: absolute; top: -1.5rem; left: 0;
          pointer-events: none; user-select: none;
        }
        .wd-svc__body { position: relative; }
        .wd-svc__eyebrow {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: .9rem; display: block;
        }
        .wd-svc__h3 {
          font-family: var(--ff-serif);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.01em;
          color: #fff; margin: 0 0 .6rem;
        }
        .wd-svc__rule {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, var(--c-orange), transparent);
          margin: 0 0 1.4rem;
        }
        .wd-svc__p {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          margin-bottom: .8rem;
        }
        .wd-svc__highlight {
          font-family: var(--ff-sans); font-size: .93rem;
          font-weight: 400; line-height: 1.8;
          color: rgba(255,255,255,.6);
          border-left: 2px solid rgba(249,115,22,.4);
          padding-left: 1rem; margin-bottom: 1.6rem;
          font-style: italic;
        }
        .wd-svc__bullets {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: .5rem;
        }
        .wd-svc__bullets li {
          font-family: var(--ff-sans); font-size: .88rem;
          font-weight: 400; color: var(--c-muted2);
          display: flex; align-items: flex-start; gap: .6rem;
        }
        .wd-svc__bullets li::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange); margin-top: .45rem; flex-shrink: 0;
        }

        /* ── BENEFITS ── */
        .wd-benefits {
          background: var(--c-surface); padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .wd-benefits__inner { max-width: 1200px; margin: 0 auto; }
        .wd-benefits__head  { text-align: center; margin-bottom: 3.5rem; }
        .wd-benefits__label {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: 1rem; display: block;
        }
        .wd-benefits__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1rem;
        }
        .wd-benefits__h2 em { font-style: italic; color: var(--c-orange); }
        .wd-benefits__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.4rem;
        }
        .wd-benefits__sub {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: var(--c-muted);
          max-width: 520px; margin: 0 auto;
        }
        .wd-benefits__grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        @media (max-width: 1024px) { .wd-benefits__grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  { .wd-benefits__grid { grid-template-columns: 1fr; } }

        .wd-benefit-card {
          background: var(--c-surface2); border: 1px solid var(--c-border);
          border-radius: 16px; padding: 2rem 1.75rem;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
          position: relative; overflow: hidden;
        }
        .wd-benefit-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,.5), transparent);
          opacity: 0; transition: opacity .25s ease;
        }
        .wd-benefit-card:hover {
          border-color: rgba(249,115,22,.25); transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,.4);
        }
        .wd-benefit-card:hover::before { opacity: 1; }
        .wd-benefit-card__icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--c-orange-dim); border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-orange); font-size: 1.1rem; margin-bottom: 1.2rem;
        }
        .wd-benefit-card__title {
          font-family: var(--ff-sans); font-size: .95rem; font-weight: 600;
          color: #fff; margin-bottom: .5rem;
        }
        .wd-benefit-card__desc {
          font-family: var(--ff-sans); font-size: .85rem;
          font-weight: 300; line-height: 1.75; color: var(--c-muted);
        }

        /* ── CTA STRIP ── */
        .wd-cta {
          background: var(--c-bg); border-top: 1px solid var(--c-border);
          padding: 5rem 1.5rem; text-align: center;
          position: relative; overflow: hidden;
        }
        .wd-cta__orb {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, #f97316, transparent 70%);
          opacity: .05; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          filter: blur(60px); pointer-events: none;
        }
        .wd-cta__inner { position: relative; z-index: 10; max-width: 560px; margin: 0 auto; }
        .wd-cta__eyebrow {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: 1.2rem; display: block;
        }
        .wd-cta__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1rem;
        }
        .wd-cta__h2 em { font-style: italic; color: var(--c-orange); }
        .wd-cta__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.4rem;
        }
        .wd-cta__sub {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: var(--c-muted);
          margin-bottom: 2.4rem;
        }
        .wd-cta__btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .wd-cta__btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="wd-hero">
        <div className="wd-hero__bg">
          <div className="wd-hero__orb wd-hero__orb--1" />
          <div className="wd-hero__orb wd-hero__orb--2" />
          <div className="wd-hero__orb wd-hero__orb--3" />
          <div className="wd-hero__grid" />
          <div className="wd-hero__grain" />
        </div>

        <div className="wd-corner wd-corner--tl" />
        <div className="wd-corner wd-corner--tr" />
        <div className="wd-corner wd-corner--bl" />
        <div className="wd-corner wd-corner--br" />

        <div className="wd-hero__content">
          <div className="wd-hero__eyebrow">
            <span className="wd-hero__dot" />
            Services · Digital Marketing & SEO
          </div>

          <h1 className="wd-hero__h1">
            Marketing that drives<br />
            results, not just <em>clicks</em>
          </h1>

          <div className="wd-hero__rule" />

          <p className="wd-hero__sub">
            From SEO and PPC to Meta Ads, content marketing, email automation, and promotional video—we deliver data-driven strategies that grow your traffic, leads, and revenue.
          </p>

          <a href="#services" className="wd-hero__cta">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <a href="#services" className="wd-hero__scroll" aria-label="Scroll down">
          <div className="wd-hero__scroll-line" />
          <span className="wd-hero__scroll-lbl">Scroll</span>
        </a>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════ */}
      <section className="wd-intro">
        <div className="wd-intro__inner">
          <span className="wd-intro__label">Our Philosophy</span>
          <h2 className="wd-intro__h2">
            Creativity meets data to deliver<br />
            visibility, growth &amp; <em>conversions</em>
          </h2>
          <div className="wd-intro__rule" />
          <p className="wd-intro__p">
            At <strong>99 Visual Solutions</strong>, we combine creativity with data-driven insights to craft <strong>digital marketing strategies</strong> that not only attract audiences but convert them into loyal customers. Our holistic approach ensures your brand achieves <strong>maximum online visibility and sustainable growth</strong>.
          </p>
          <p className="wd-intro__p">
            From <strong>SEO and content marketing</strong> to <strong>social media campaigns and paid advertising</strong>, our solutions are tailored to your business goals—helping you stay ahead in today's competitive digital landscape.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ══════════════════════════════════ */}
      <div id="services" className="wd-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="wd-svc">
            <div className={`wd-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>

              {/* Image */}
              <div
                className="wd-svc__img-wrap"
                style={{ order: svc.imageLeft ? 1 : 2 }}
              >
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  width={600}
                  height={460}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Text */}
              <div
                className="wd-svc__body"
                style={{ order: svc.imageLeft ? 2 : 1 }}
              >
                <span className="wd-svc__num">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="wd-svc__eyebrow">Service 0{idx + 1}</span>
                <h2 className="wd-svc__h3">{svc.title}</h2>
                <div className="wd-svc__rule" />
                <p className="wd-svc__p">{svc.description}</p>
                <p className="wd-svc__highlight">{svc.highlight}</p>
                <ul className="wd-svc__bullets">
                  {svc.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ══════════════════════════════════════════ */}
      <section className="wd-benefits">
        <div className="wd-benefits__inner">
          <div className="wd-benefits__head">
            <span className="wd-benefits__label">Why Choose Us?</span>
            <h2 className="wd-benefits__h2">
              Benefits of partnering with<br /><em>99 Visual</em> Digital Marketing
            </h2>
            <div className="wd-benefits__rule" />
            <p className="wd-benefits__sub">
              With 99 Visual Solutions, digital marketing is more than just ads—it's about creating meaningful connections that turn into long-term business growth.
            </p>
          </div>

          <div className="wd-benefits__grid">
            {benefits.map((b, i) => (
              <div className="wd-benefit-card" key={i}>
                <div className="wd-benefit-card__icon">{b.icon}</div>
                <div className="wd-benefit-card__title">{b.title}</div>
                <p className="wd-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP ═════════════════════════════════════════ */}
      <section className="wd-cta">
        <div className="wd-cta__orb" />
        <div className="wd-cta__inner">
          <span className="wd-cta__eyebrow">Start a Project</span>
          <h2 className="wd-cta__h2">
            Ready to grow your brand <em>online</em>?
          </h2>
          <div className="wd-cta__rule" />
          <p className="wd-cta__sub">
            Get in touch with our team for a free consultation. We'll help you map out the right digital marketing strategy for your goals.
          </p>
          <Link href="/contact" className="wd-cta__btn">
            Get a Free Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
     
      <Footer />
    </>
  );
}