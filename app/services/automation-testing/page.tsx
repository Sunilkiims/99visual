import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import {
  FaBug,
  FaCogs,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI-Powered QA & Automation Testing Services | Agentic AI Testing, Performance & CI/CD - 99 Visual",
  description:
    "99 Visual delivers next-generation QA and automation testing powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance & load testing, API testing, security testing, and CI/CD pipeline integration. Ship intelligent, bug-free software faster.",
  keywords: [
    "Agentic AI Testing Services",
    "AI-Powered QA Services India",
    "Autonomous Test Automation",
    "Self-Healing Test Automation",
    "LLM Testing Services",
    "Generative AI QA",
    "QA Testing Services India",
    "Automation Testing Services",
    "Software Testing Company India",
    "Manual Testing Services",
    "Functional Testing Services",
    "Exploratory Testing",
    "Regression Testing Services",
    "Selenium Automation Testing",
    "Playwright Testing Services",
    "Cypress Automation Testing",
    "Test Automation Framework",
    "Automated QA Testing",
    "AI Agent Testing",
    "RPA Testing Services",
    "Performance Testing Services",
    "Load Testing Services",
    "Stress Testing Services",
    "Scalability Testing",
    "Security Testing Services",
    "Vulnerability Assessment Testing",
    "OWASP Testing Services",
    "API Testing Services",
    "CI CD Pipeline Testing",
    "DevOps QA Integration",
    "Web Application Testing",
    "Mobile App Testing Services",
    "Cross Browser Testing",
    "99 Visual QA Services",
    "99 Visual Testing Solutions",
  ],
  openGraph: {
    title:
      "AI-Powered QA & Automation Testing | Agentic AI, Self-Healing Tests & Bug-Free Delivery - 99 Visual",
    description:
      "Next-generation QA powered by Agentic AI: autonomous test agents, self-healing automation, LLM-driven exploratory testing, load & performance testing, security testing, and CI/CD integration. Trusted by startups and enterprises across India.",
    url: "https://www.99visual.com/services/testing-development",
    siteName: "99 Visual",
    images: [
      {
        url: "https://www.99visual.com/images/services/testing-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI-Powered QA & Automation Testing Services by 99 Visual",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered QA & Automation Testing | 99 Visual",
    description:
      "Ship reliable software with 99 Visual's Agentic AI QA services — autonomous test agents, self-healing automation, performance testing, security testing & CI/CD integration.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/services/testing-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/services/testing-development" },
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
  authors: [{ name: "99 Visual Solutions", url: "https://www.99visual.com" }],
  category: "Technology",
};

export default function TestingDevelopment() {
  const benefits = [
    {
      icon: <FaBug />,
      title: "Zero-Defect Delivery",
      description:
        "Our Agentic AI test agents autonomously explore edge cases and failure paths humans often miss — catching critical defects before they ever reach production.",
    },
    {
      icon: <FaCogs />,
      title: "Self-Healing Automation",
      description:
        "AI-powered test scripts that automatically adapt to UI changes and DOM shifts, drastically reducing maintenance overhead and keeping your pipelines green.",
    },
    {
      icon: <FaChartLine />,
      title: "Intelligent Performance Insights",
      description:
        "We combine real-world load simulation with ML-driven analysis to pinpoint bottlenecks, predict failure thresholds, and optimize system throughput at scale.",
    },
    {
      icon: <FaShieldAlt />,
      title: "AI-Augmented Security",
      description:
        "LLM-assisted vulnerability scanning and threat modeling identify security weaknesses faster and with greater accuracy than traditional rule-based tools alone.",
    },
    {
      icon: <FaRocket />,
      title: "Accelerated Time-to-Market",
      description:
        "Autonomous test generation and intelligent regression selection cut test cycles by up to 70%, letting you ship high-quality releases at the speed your business demands.",
    },
    {
      icon: <FaTools />,
      title: "Continuous AI-Driven QA",
      description:
        "From code commit to production, our AI agents monitor, test, and validate continuously — providing real-time quality intelligence at every stage of your SDLC.",
    },
  ];

  const services = [
    {
      id: "manual-testing",
      title: "AI-Augmented Human Testing",
      image: "/images/manual-testing.png",
      imageAlt: "AI-Augmented Manual Testing illustration",
      description:
        "Combine the irreplaceable intuition of expert human testers with the analytical power of AI assistants. Our QA engineers are equipped with LLM-driven test case generators, context-aware checklists, and real-time anomaly suggestion tools — elevating manual testing from a checklist exercise to a high-signal quality intelligence process.",
      highlight:
        "Our testers don't just follow scripts — they think like users, reason like engineers, and leverage AI to surface the insights that define truly exceptional software. The result: fewer escaped defects, richer coverage, and faster feedback cycles from day one.",
      bullets: [
        "AI-assisted exploratory testing with LLM-generated scenario suggestions",
        "Functional, regression, usability & accessibility validation",
        "Structured defect reporting enriched with root cause context",
      ],
      imageLeft: false,
    },
    {
      id: "automation",
      title: "Agentic AI Test Automation",
      image: "/images/automated-testing.png",
      imageAlt: "Agentic AI Automation Testing illustration",
      description:
        "Move beyond traditional script-based automation with autonomous AI agents that plan, generate, execute, and self-heal test suites with minimal human intervention. Powered by Playwright, Cypress, and Selenium — orchestrated by intelligent agents — our automation frameworks adapt to your evolving product in real time.",
      highlight:
        "Agentic AI doesn't just run tests; it reasons about your application's behavior, identifies untested paths, and autonomously expands coverage as your codebase grows. Integrate with LangChain, AutoGen, or custom agent architectures for truly autonomous QA pipelines.",
      bullets: [
        "Autonomous test generation, execution & self-healing via AI agents",
        "Playwright, Cypress & Selenium frameworks with AI-driven orchestration",
        "LLM-powered test plan creation, RPA integration & intelligent regression selection",
      ],
      imageLeft: true,
    },
    {
      id: "performance-testing",
      title: "Intelligent Performance & Load Testing",
      image: "/images/performance-testing.png",
      imageAlt: "AI Performance Testing illustration",
      description:
        "Go beyond pass/fail load benchmarks with ML-assisted performance engineering. We simulate millions of concurrent users across geographies, analyze system telemetry with predictive models, and deliver actionable optimization recommendations — not just numbers on a dashboard.",
      highlight:
        "Our AI-driven performance analysis correlates infrastructure metrics, application traces, and user behavior patterns to pinpoint the exact bottlenecks costing you speed and stability — before they ever impact your customers.",
      bullets: [
        "AI-guided load, stress, spike & endurance testing at scale",
        "Predictive bottleneck detection & ML-assisted root cause analysis",
        "Observability integration with Datadog, Grafana & custom APM tooling",
      ],
      imageLeft: false,
    },
    {
      id: "continuous-qa",
      title: "Continuous AI-Driven QA & Support",
      image: "/images/continuous-qa.png",
      imageAlt: "Continuous AI QA support",
      description:
        "Quality is not a phase — it's a continuous signal. We embed intelligent QA agents directly into your CI/CD pipelines, enabling autonomous test execution, real-time quality gates, and proactive defect prediction at every stage of your delivery workflow.",
      highlight:
        "Our AI-driven QA agents learn from your codebase history and defect patterns to predict where failures are most likely to emerge next — shifting quality left and dramatically reducing the cost of late-stage bug discovery.",
      bullets: [
        "Autonomous CI/CD-integrated quality gates with AI decision logic",
        "Predictive defect detection using historical code & test pattern analysis",
        "Continuous monitoring, alerting & intelligent regression triage",
      ],
      imageLeft: true,
    },
    {
      id: "scale-readiness",
      title: "AI-Optimized Scale Readiness",
      image: "/images/performance-scale.png",
      imageAlt: "AI-Optimized Performance & Scale Readiness",
      description:
        "Prepare your architecture for exponential growth with AI-guided capacity planning and scale validation. We stress-test your systems across distributed cloud environments, model traffic surge scenarios with precision, and validate auto-scaling configurations to ensure zero-downtime performance under any load.",
      highlight:
        "By combining chaos engineering principles with AI-generated failure scenario modeling, we harden your infrastructure against real-world turbulence — so when traffic spikes, your systems scale gracefully, not catastrophically.",
      bullets: [
        "AI-modeled traffic surge simulation & chaos engineering integration",
        "Cloud-native scalability validation across AWS, GCP & Azure",
        "Auto-scaling configuration testing & resource efficiency benchmarking",
      ],
      imageLeft: false,
    },
    {
      id: "security-testing",
      title: "LLM-Assisted Security Testing",
      image: "/images/security-aware-testing.png",
      imageAlt: "LLM-Assisted Security Testing",
      description:
        "Security in the age of AI demands AI-native testing strategies. Our security testing practice combines OWASP-aligned penetration testing, automated vulnerability scanning, and LLM-assisted threat modeling to identify risks that static analyzers and legacy tools routinely miss.",
      highlight:
        "We test not only your application's traditional attack surface but also the emerging risks unique to AI-integrated systems — including prompt injection, model data poisoning, and adversarial input vulnerabilities — ensuring your product is secure in the era of intelligent software.",
      bullets: [
        "LLM-assisted threat modeling, OWASP testing & penetration assessment",
        "AI-specific security testing: prompt injection, adversarial inputs & model safety",
        "Compliance validation, risk scoring & remediation roadmap delivery",
      ],
      imageLeft: true,
    },
  ];

  return (
    <>
      <Header />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI-Powered QA & Automation Testing Services",
            description:
              "Next-generation software QA and automation testing powered by Agentic AI — including autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance testing, security testing, and CI/CD pipeline integration.",
            provider: {
              "@type": "Organization",
              name: "99 Visual Solutions",
              url: "https://www.99visual.com",
              logo: "https://www.99visual.com/images/logo.png",
              sameAs: [
                "https://twitter.com/99visual",
                "https://www.linkedin.com/company/99visual",
              ],
            },
            areaServed: { "@type": "Country", name: "India" },
            serviceType: [
              "Agentic AI Testing",
              "Self-Healing Test Automation",
              "LLM-Assisted Security Testing",
              "Manual Testing",
              "Performance Testing",
              "CI/CD QA Integration",
            ],
            url: "https://www.99visual.com/services/testing-development",
            image: "https://www.99visual.com/images/services/testing-og.jpg",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              areaServed: "IN",
              priceCurrency: "INR",
            },
          }),
        }}
      />

      {/* ─── Shared Design Tokens ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:         #080808;
          --c-surface:    #0f0f0f;
          --c-surface2:   #141414;
          --c-border:     rgba(255,255,255,0.07);
          --c-orange:     #f97316;
          --c-orange-dim: rgba(249,115,22,0.12);
          --c-muted:      rgba(255,255,255,0.45);
          --c-muted2:     rgba(255,255,255,0.65);
          --ff-serif:     'Cormorant Garamond', serif;
          --ff-sans:      'DM Sans', sans-serif;
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
            Services · Agentic AI QA & Automation Testing
          </div>

          <h1 className="wd-hero__h1">
            Intelligent quality engineering<br />
            powered by <em>Agentic AI</em>
          </h1>

          <div className="wd-hero__rule" />

          <p className="wd-hero__sub">
            From AI-augmented manual testing and autonomous agent-driven automation to LLM-assisted security testing and predictive performance engineering — we deliver next-generation QA that helps you ship intelligent, bug-free software at scale.
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
          <span className="wd-intro__label">Our Approach</span>
          <h2 className="wd-intro__h2">
            Agentic AI quality intelligence embedded at<br />
            every stage of your <em>development lifecycle</em>
          </h2>
          <div className="wd-intro__rule" />
          <p className="wd-intro__p">
            At <strong>99 Visual Solutions</strong>, we've reimagined quality assurance for the era of intelligent software. Our Agentic AI-powered testing practice deploys <strong>autonomous test agents</strong> that plan, generate, execute, and self-heal test suites — integrating seamlessly into your CI/CD pipelines alongside precision-driven human expertise.
          </p>
          <p className="wd-intro__p">
            Whether you're building traditional web applications, LLM-powered products, or complex distributed systems, we help your engineering teams <strong>minimize release risk, maximize test coverage, and ship with confidence</strong> — at the velocity modern businesses demand.
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
              The competitive advantage of<br /><em>AI-native</em> quality engineering
            </h2>
            <div className="wd-benefits__rule" />
            <p className="wd-benefits__sub">
              Partnering with 99 Visual Solutions gives your engineering org an Agentic AI quality layer that delivers faster releases, deeper coverage, and production-grade confidence — built in from day one.
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
            Ready to ship software with<br /><em>AI-powered</em> confidence?
          </h2>
          <div className="wd-cta__rule" />
          <p className="wd-cta__sub">
            Talk to our Agentic AI QA specialists for a free strategy consultation. We'll design an intelligent testing architecture tailored to your stack, your team, and your release velocity goals.
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