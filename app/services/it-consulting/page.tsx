import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import {
  FaCogs,
  FaShieldAlt,
  FaProjectDiagram,
  FaNetworkWired,
  FaHandsHelping,
  FaCloud,
} from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT Solutions - 99 Visual Solutions",
  description:
    "99 Visual Solutions provides end-to-end IT consulting services including IT infrastructure planning, cloud migration, cybersecurity & risk management, software consulting, IoT integration, system migration, and IT project management. Trusted by enterprises and growing businesses worldwide.",
  keywords: [
    "IT Consulting Services",
    "IT Consulting Company",
    "Technology Consulting Services",
    "Enterprise IT Consulting",
    "Managed IT Services",
    "IT Support Services",
    "IT Advisory Services",
    "IT Infrastructure Planning",
    "IT Infrastructure Management",
    "IT Infrastructure Optimization",
    "Network Infrastructure Services",
    "Server Management Services",
    "System Migration Services",
    "IT Installation Services",
    "Cloud Migration Services",
    "Cloud Transformation Services",
    "AWS Migration Services",
    "Azure Cloud Services",
    "Google Cloud Migration",
    "Cloud Infrastructure Management",
    "Digital Transformation Services",
    "Cybersecurity Consulting Services",
    "Cybersecurity Risk Management",
    "Network Security Solutions",
    "Endpoint Security Services",
    "IT Compliance Services",
    "Threat Monitoring Services",
    "Software Consulting Services",
    "Application Modernization Services",
    "IT Project Management Services",
    "Agile IT Project Delivery",
    "IoT Integration Services",
    "Smart Device Integration",
    "IoT Consulting Services",
    "Industrial IoT Solutions",
    "IT Solutions for Enterprises",
    "IT Solutions for Startups",
    "99 Visual Solutions",
    "99 Visual IT Consulting",
  ],
  openGraph: {
    title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT - 99 Visual Solutions",
    description:
      "From cloud migration and cybersecurity to IT infrastructure, software consulting, IoT integration, and project management — 99Visual Solutions delivers strategic IT consulting for enterprises and growing businesses worldwide.",
    url: "https://www.99visual.com/services/it-consulting",
    siteName: "99 Visual Solutions",
    images: [
      {
        url: "https://www.99visual.com/images/services/it-consulting-og.jpg",
        width: 1200,
        height: 630,
        alt: "IT Consulting Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT - 99 Visual Solutions",
    description:
      "Cloud migration, cybersecurity, IT infrastructure, IoT integration & software consulting — strategic IT solutions by 99Visual Solutions for businesses worldwide.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/services/it-consulting-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/services/it-consulting" },
};

export default function ITConsulting() {
  const benefits = [
    {
      icon: <FaCogs />,
      title: "Tailored IT Strategies",
      description:
        "We align IT strategies with your business goals, ensuring technology drives growth, efficiency, and innovation.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Robust Cybersecurity",
      description:
        "Protect your business from threats with proactive monitoring, security audits, and compliance-driven solutions.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Infrastructure Modernization",
      description:
        "Upgrade outdated systems with scalable, future-ready IT infrastructure designed for seamless performance.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Enablement",
      description:
        "We help you migrate to the cloud securely and efficiently, optimizing costs and improving scalability.",
    },
    {
      icon: <FaProjectDiagram />,
      title: "Expert IT Project Management",
      description:
        "From planning to execution, we ensure IT projects are delivered on time, within scope, and aligned with ROI goals.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Ongoing IT Support",
      description:
        "Our consultants provide continuous guidance, ensuring your IT ecosystem evolves with business needs.",
    },
  ];

  const services = [
    {
      id: "installation-migration",
      title: "Installation & System Migration Services",
      image: "/images/Installation-services.png",
      imageAlt: "Installation & System Migration Services",
      description:
        "Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure.",
      highlight:
        "From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity and performance.",
      bullets: [
        "Installation of servers, routers, systems & peripherals",
        "Data migration & system upgrades",
        "Seamless integration with existing infrastructure",
      ],
      imageLeft: true,
    },
    {
      id: "it-infrastructure",
      title: "IT Infrastructure Planning & Optimization",
      image: "/images/it-infrastructure.png",
      imageAlt: "IT infrastructure illustration",
      description:
        "A strong digital foundation is critical for business growth and operational efficiency. We design and optimize IT infrastructures that are reliable, scalable, and aligned with your business goals.",
      highlight:
        "From network architecture to cloud environments, we ensure your systems are built for performance, security, and future expansion.",
      bullets: [
        "Infrastructure design, assessment & capacity planning",
        "Cloud strategy, migration & resource optimization",
        "Cost optimization & system upgrades",
      ],
      imageLeft: false,
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Risk Management",
      image: "/images/cybersecurity.png",
      imageAlt: "Cybersecurity illustration",
      description:
        "In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems, data, and operations.",
      highlight:
        "By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets compliance standards.",
      bullets: [
        "Risk assessment, vulnerability management & compliance support",
        "Threat monitoring & incident response",
        "Endpoint, network & application security implementation",
      ],
      imageLeft: true,
    },
    {
      id: "cloud-transformation",
      title: "Cloud Migration & Digital Transformation",
      image: "/images/cloud-migration.png",
      imageAlt: "Cloud migration illustration",
      description:
        "Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and performance.",
      highlight:
        "Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape.",
      bullets: [
        "Cloud strategy, migration & modernization (AWS, Azure, GCP)",
        "Legacy system transformation & process automation",
        "Scalable, secure & cost-efficient cloud architecture",
      ],
      imageLeft: false,
    },
    {
      id: "project-management",
      title: "IT Project Management & Support",
      image: "/images/it-project.png",
      imageAlt: "IT project management illustration",
      description:
        "Successful digital initiatives require more than just great ideas—they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management and support services to ensure your projects are delivered on time, within budget, and aligned with your business goals.",
      highlight:
        "From planning and resource allocation to deployment and post-launch support, we manage every phase with precision.",
      bullets: [
        "Agile project planning, execution & delivery",
        "Resource management, risk mitigation & quality assurance",
        "Ongoing technical support, maintenance & performance monitoring",
      ],
      imageLeft: true,
    },
    {
      id: "software-consulting",
      title: "Software & Application Consulting",
      image: "/images/software-application.png",
      imageAlt: "Software Application Consulting",
      description:
        "Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities, providing strategic guidance on the right technologies, architectures, and development approaches.",
      highlight:
        "Whether you're building from scratch, upgrading existing systems, or optimizing performance, our consulting ensures your applications are efficient, secure, and future-ready.",
      bullets: [
        "Technology selection & solution architecture planning",
        "Application audit, optimization & modernization strategy",
        "Scalable, secure & performance-driven development guidance",
      ],
      imageLeft: false,
    },
    {
      id: "iot",
      title: "IoT & Smart Device Integration",
      image: "/images/iot-smart-devices.png",
      imageAlt: "IoT & Smart Device Integration",
      description:
        "Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven environments.",
      highlight:
        "From sensors and automation systems to advanced analytics, our solutions help you monitor, control, and optimize operations in real time.",
      bullets: [
        "IoT device connectivity & architecture",
        "Smart automation & sensor integration",
        "Real-time data monitoring & analytics",
      ],
      imageLeft: true,
    },
  ];

  return (
    <>
      <Header />

      {/* ─── Shared Design Tokens (mirrors web development page) ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-surface2: #141414;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-orange-dim: rgba(249,115,22,0.12);
          --c-muted:   rgba(255,255,255,0.45);
          --c-muted2:  rgba(255,255,255,0.65);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ── HERO ── */
        .wd-hero {
          position: relative;
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
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
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(32px, 24px) scale(1.06); }
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
        .wd-intro__inner {
          max-width: 860px; margin: 0 auto; text-align: center;
        }
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
        .wd-intro__h2 em {
          font-style: italic; color: var(--c-orange);
        }
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
        .wd-intro__p strong {
          color: var(--c-muted2); font-weight: 500;
        }

        /* ── SERVICE SECTIONS ── */
        .wd-services { background: var(--c-bg); }

        .wd-svc {
          padding: 5rem 1.5rem;
          border-bottom: 1px solid var(--c-border);
          position: relative;
        }
        .wd-svc:nth-child(odd) { background: var(--c-surface); }
        .wd-svc:nth-child(even) { background: var(--c-bg); }

        .wd-svc__inner--img-left {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 3fr 4fr;
          gap: 4rem;
          align-items: center;
        }

        .wd-svc__inner--img-right {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 4fr 3fr;
          gap: 4rem;
          align-items: center;
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
          border-radius: 16px;
          border: 1px solid var(--c-border);
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
          content: '';
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          margin-top: .45rem; flex-shrink: 0;
        }

        /* ── BENEFITS ── */
        .wd-benefits {
          background: var(--c-surface);
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .wd-benefits__inner { max-width: 1200px; margin: 0 auto; }
        .wd-benefits__head { text-align: center; margin-bottom: 3.5rem; }
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
        .wd-benefits__h2 em {
          font-style: italic; color: var(--c-orange);
        }
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
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .wd-benefits__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .wd-benefits__grid { grid-template-columns: 1fr; } }

        .wd-benefit-card {
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 16px;
          padding: 2rem 1.75rem;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
          position: relative; overflow: hidden;
        }
        .wd-benefit-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,.5), transparent);
          opacity: 0; transition: opacity .25s ease;
        }
        .wd-benefit-card:hover {
          border-color: rgba(249,115,22,.25);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,.4);
        }
        .wd-benefit-card:hover::before { opacity: 1; }

        .wd-benefit-card__icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--c-orange-dim);
          border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-orange); font-size: 1.1rem;
          margin-bottom: 1.2rem;
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
          background: var(--c-bg);
          border-top: 1px solid var(--c-border);
          padding: 5rem 1.5rem;
          text-align: center;
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
        .wd-cta__h2 em {
          font-style: italic; color: var(--c-orange);
        }
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
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
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
            Services · IT Consulting
          </div>

          <h1 className="wd-hero__h1">
            Strategic technology<br />
            that drives <em>growth</em>
          </h1>

          <div className="wd-hero__rule" />

          <p className="wd-hero__sub">
            From cloud migration and cybersecurity to infrastructure planning, IoT integration, and IT project management—we deliver end-to-end consulting that prepares your business for the digital future.
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
            Strategic IT consulting for smarter,<br />
            secure &amp; <em>scalable</em> businesses
          </h2>
          <div className="wd-intro__rule" />
          <p className="wd-intro__p">
            At <strong>99 Visual Solutions</strong>, we don't just solve IT challenges—we help you harness technology as a powerful growth driver. Our <strong>IT consulting services</strong> deliver strategic guidance, robust security, and scalable infrastructure designed to prepare your business for the digital future.
          </p>
          <p className="wd-intro__p">
            Whether you're modernizing legacy systems, migrating to the cloud, or strengthening cybersecurity, our experts partner with you to deliver <strong>sustainable, cost-effective, and future-ready IT solutions</strong> tailored to your business goals.
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
              Partnering with<br /><em>99 Visual</em> IT Consulting
            </h2>
            <div className="wd-benefits__rule" />
            <p className="wd-benefits__sub">
              IT isn't just a support function—it becomes a competitive advantage. Here's how we empower businesses with technology.
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
            Ready to transform your <em>IT infrastructure</em>?
          </h2>
          <div className="wd-cta__rule" />
          <p className="wd-cta__sub">
            Get in touch with our team for a free consultation. We'll help you map out the right IT strategy for your goals.
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