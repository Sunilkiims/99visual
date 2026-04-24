import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {
  FaCogs,
  FaRocket,
  FaMobileAlt,
  FaClock,
  FaUsers,
  FaTools,
} from "react-icons/fa";

export const metadata = {
  title: "Website & Web App Development Services | 99 Visual Solutions",
  description:
    "99 Visual Solutions offers end-to-end web development services including custom web applications, front-end & back-end development, UX design, e-commerce, CMS, SEO optimization, API integrations, and web security. Trusted by startups, enterprises, and e-commerce brands worldwide.",
  keywords: [
    "Web Development Services",
    "Custom Web Development Company",
    "Web Application Development",
    "Full Stack Web Development",
    "Next.js Development Services",
    "React Web Development",
    "Front-End Development Services",
    "Back-End Development Services",
    "Responsive Web Design",
    "Mobile-First Web Development",
    "UI UX Design Services",
    "User Experience Design Agency",
    "Website Customization Services",
    "Landing Page Design and Development",
    "Custom Dashboard Development",
    "Admin Panel Development",
    "E-Commerce Website Development",
    "CMS Development Services",
    "Custom E-Commerce Solutions",
    "WordPress Development Services",
    "SEO Optimization Services",
    "Website Performance Optimization",
    "Core Web Vitals Optimization",
    "Technical SEO Services",
    "Web Security Services",
    "Website Hosting and Deployment",
    "API Integration Services",
    "Third-Party API Integration",
    "Web App Modernization",
    "Legacy System Upgrade",
    "Cloud Migration Services",
    "Web Development for Startups",
    "Web Development for Enterprises",
    "Website Design Company",
    "99 Visual Solutions",
    "99 Visual",
  ],
  openGraph: {
    title: "Web Development & Web App Development Services | 99 Visual Solutions",
    description:
      "From custom web apps and UX design to e-commerce, SEO, API integrations, and web security — 99 Visual Solutions delivers full-cycle web development services for startups, enterprises, and e-commerce brands globally.",
    url: "https://www.99visual.com/services/web-development",
    siteName: "99 Visual Solutions",
    images: [
      {
        url: "https://www.99visual.com/images/og/web-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development & Web App Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Web App Development Services | 99 Visual Solutions",
    description:
      "Custom web apps, front-end & back-end development, e-commerce, SEO, API integrations & more — built for performance by 99Visual Solutions.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/web-development-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/services/web-development" },
};

export default function WebsiteDevelopment() {
  const benefits = [
    {
      icon: <FaCogs />,
      title: "Customized Solutions",
      description:
        "Every business has unique needs, and we create a site tailored to your specific goals. Our custom approach ensures your website reflects your brand and drives results.",
    },
    {
      icon: <FaRocket />,
      title: "SEO Optimization",
      description:
        "A well-designed website is built with SEO best practices in mind. Our designs are optimized to rank higher in search engine results, driving more traffic and leads.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Responsiveness",
      description:
        "With mobile-first usage rising, we build fully responsive websites that provide seamless experiences across all devices, boosting satisfaction and search rankings.",
    },
    {
      icon: <FaClock />,
      title: "Faster Load Times",
      description:
        "Our websites are optimized for speed, ensuring quick load times on all devices. This improves user experience and enhances your Google rankings.",
    },
    {
      icon: <FaUsers />,
      title: "Improved User Experience",
      description:
        "We prioritize UX with intuitive, visually appealing designs that keep visitors engaged, increasing time on site and boosting conversion rates.",
    },
    {
      icon: <FaTools />,
      title: "Ongoing Maintenance & Support",
      description:
        "We provide ongoing support even after launch—whether updates, security checks, or new features—ensuring long-term performance.",
    },
  ];

  const services = [
    {
      id: "web-application",
      title: "Web Application Development",
      image: "/images/web-application.png",
      imageAlt: "Web Application Development",
      description:
        "Your business operations demand more than a standard website—they require intelligent, scalable, and purpose-built digital solutions. We design and develop powerful web applications tailored to your unique workflows, enabling seamless automation, enhanced productivity, and data-driven decision-making.",
      highlight:
        "From dynamic dashboards to fully customized tools and system integrations, every application is crafted to align with your business processes.",
      bullets: [
        "Custom dashboards & business tools",
        "Workflow automation & process optimization",
        "Secure, scalable, and high-performance architecture",
      ],
      imageLeft: true,
    },
    {
      id: "ux-design",
      title: "User Experience (UX) Design",
      image: "/images/ux-design.png",
      imageAlt: "UX design illustration",
      description:
        "Great design is not just about how it looks—it's about how it works and how it feels. We craft seamless, intuitive user experiences that guide users effortlessly through your digital products.",
      highlight:
        "By deeply understanding user behavior, business goals, and market trends, we create designs that reduce friction, enhance usability, and keep users engaged.",
      bullets: [
        "Human-centered design approach",
        "Wireframes, prototypes, & testing",
        "Conversion-focused design strategy",
      ],
      imageLeft: false,
    },
    {
      id: "website-customization",
      title: "Website Customization",
      image: "/images/website-customization.png",
      imageAlt: "Website customization illustration",
      description:
        "Your business is unique, and your website should reflect that at every level. We deliver fully customized web solutions—from powerful e-commerce platforms to high-converting landing pages and tailored functionalities.",
      highlight:
        "Designed to align perfectly with your brand identity, goals, and customer journey. Every detail is built with purpose.",
      bullets: [
        "Custom e-commerce functionality",
        "Landing pages built for campaigns",
        "Personalization for brand consistency",
      ],
      imageLeft: true,
    },
    {
      id: "frontend",
      title: "Front-End Development",
      image: "/images/frontend-development.png",
      imageAlt: "Frontend Development",
      description:
        "Your website's first impression is everything—and we make it count. Our front-end development services focus on creating visually stunning, highly interactive, and lightning-fast user interfaces that captivate users from the very first click.",
      highlight:
        "By leveraging modern frameworks and best practices, we build responsive, accessible, and performance-driven interfaces that deliver a seamless experience across all devices.",
      bullets: [
        "Responsive, mobile-first & cross-browser compatible design",
        "Modern frameworks (React, Next.js, Vue) & clean code architecture",
        "Optimized performance, accessibility & user experience",
      ],
      imageLeft: false,
    },
    {
      id: "backend",
      title: "Back-End Development",
      image: "/images/backend-development.png",
      imageAlt: "Backend Development",
      description:
        "Behind every powerful digital experience lies a robust and intelligent back-end. We specialize in building secure, scalable, and high-performance back-end systems that ensure your website or application runs smoothly, efficiently, and reliably.",
      highlight:
        "No two businesses are alike—and your digital infrastructure should reflect that uniqueness. Our back-end services are fully customized to meet your specific operational needs.",
      bullets: [
        "Custom APIs & microservices architecture",
        "Database design, optimization & management",
        "Authentication, authorization & data security",
      ],
      imageLeft: true,
    },
    {
      id: "ecommerce",
      title: "E-Commerce & CMS Development",
      image: "/images/e-commerce-cms-development.png",
      imageAlt: "E-Commerce and CMS Development",
      description:
        "In today's digital-first world, having a powerful online store and an easy-to-manage content system is essential for business growth. We specialize in developing scalable e-commerce platforms and intuitive Content Management Systems.",
      highlight:
        "Our e-commerce solutions are designed to deliver seamless shopping experiences—from product browsing to secure checkout—ensuring higher engagement and conversions.",
      bullets: [
        "Custom storefront design & shopping cart development",
        "Headless CMS & content workflow management",
        "Secure payment gateway & order management integrations",
      ],
      imageLeft: false,
    },
    {
      id: "modernization",
      title: "Web App Modernization",
      image: "/images/webapp-modernization.png",
      imageAlt: "Web App Modernization",
      description:
        "In today's fast-evolving digital landscape, outdated applications can slow down performance, limit scalability, and impact user experience. We help businesses transform legacy web applications into modern, high-performing, and future-ready platforms.",
      highlight:
        "By leveraging the latest technologies, cloud capabilities, and responsive frameworks, we ensure your application is faster, more secure, and aligned with current user expectations.",
      bullets: [
        "Legacy system upgrade & re-engineering",
        "Cloud migration & performance optimization",
        "Scalable, secure & future-ready architecture",
      ],
      imageLeft: true,
    },
    {
      id: "seo",
      title: "SEO & Performance Optimization",
      image: "/images/seo-and-performance-optimization.png",
      imageAlt: "SEO & Performance Optimization",
      description:
        "A powerful digital presence goes beyond just having a website—it's about being discoverable, fast, and optimized for both users and search engines. We combine advanced SEO strategies with performance optimization to ensure your website ranks higher and loads faster.",
      highlight:
        "From technical SEO improvements to speed enhancements, we focus on driving organic traffic, reducing bounce rates, and maximizing online visibility.",
      bullets: [
        "On-page, technical & keyword optimization",
        "Website speed & Core Web Vitals improvement",
        "Analytics-driven insights & continuous optimization",
      ],
      imageLeft: false,
    },
    {
      id: "security",
      title: "Web Security Services",
      image: "/images/web-security-services.png",
      imageAlt: "Web Security Services",
      description:
        "In an era where cyber threats are constantly evolving, securing your digital assets is no longer optional—it's essential. We provide comprehensive web security solutions designed to protect your website, applications, and user data from vulnerabilities and attacks.",
      highlight:
        "By implementing advanced security protocols, continuous monitoring, and proactive threat prevention, we ensure your platform remains safe, reliable, and compliant.",
      bullets: [
        "Vulnerability assessment & penetration testing",
        "SSL implementation, firewalls & malware protection",
        "Continuous monitoring & threat prevention strategies",
      ],
      imageLeft: true,
    },
    {
      id: "hosting",
      title: "Website Hosting & Deployment",
      image: "/images/website-hosting-deployement.png",
      imageAlt: "Website Hosting & Deployment",
      description:
        "A strong digital presence starts with reliable hosting and seamless deployment. We provide robust, secure, and high-performance hosting solutions tailored to your business needs, ensuring your website is always accessible, fast, and scalable.",
      highlight:
        "From initial setup to continuous deployment, our experts handle everything with precision so you can focus on growing your business while we manage the infrastructure.",
      bullets: [
        "Secure, scalable & high-performance hosting solutions",
        "CI/CD pipelines & seamless deployment processes",
        "Server management, backups & uptime monitoring",
      ],
      imageLeft: false,
    },
    {
      id: "api",
      title: "API & Third-Party Integrations",
      image: "/images/api-and-third-party-intigration.png",
      imageAlt: "API & Third-Party Integrations",
      description:
        "Modern digital ecosystems thrive on connectivity. We enable your applications to seamlessly communicate with external platforms, services, and tools through secure and efficient API integrations.",
      highlight:
        "Whether it's payment gateways, CRM systems, analytics tools, or custom services, we ensure smooth data flow and real-time synchronization.",
      bullets: [
        "Secure REST & GraphQL API integrations",
        "Payment gateways, CRM & third-party service connections",
        "Real-time data sync & workflow automation",
      ],
      imageLeft: true,
    },
    {
      id: "landing-page",
      title: "Landing Page Design & Development",
      image: "/images/landing-page-design.png",
      imageAlt: "Landing Page Design & Development",
      description:
        "Your landing page is more than just a destination—it's a powerful conversion engine. We design and develop high-impact landing pages that are strategically crafted to capture attention, communicate value instantly, and drive user action.",
      highlight:
        "By combining compelling visuals, persuasive copy, and data-driven design principles, we create pages that guide visitors seamlessly toward your goals.",
      bullets: [
        "Conversion-focused design & persuasive content",
        "Fast-loading, responsive & mobile-first layouts",
        "A/B testing & performance-driven optimization",
      ],
      imageLeft: false,
    },
    {
      id: "dashboard",
      title: "Custom Dashboard & Admin Panel Development",
      image: "/images/custom-dashboard-admin-panel.png",
      imageAlt: "Custom Dashboard & Admin Panel Development",
      description:
        "Empower your business with intelligent control and complete visibility through custom-built dashboards and admin panels. We design and develop tailored management interfaces that simplify complex operations, streamline workflows, and provide real-time insights.",
      highlight:
        "With a focus on usability, scalability, and performance, our solutions help you manage data efficiently, make informed decisions faster, and enhance overall productivity.",
      bullets: [
        "Role-based access & secure user management",
        "Real-time analytics, reports & data visualization",
        "Scalable, intuitive & fully customizable interfaces",
      ],
      imageLeft: true,
    },
  ];

  return (
    <>
      <Header />

      {/* ─── Shared Design Tokens (mirrors contact page) ─── */}
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

        /* Image LEFT  → image gets 3fr, content gets 4fr */
        .wd-svc__inner--img-left {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 3fr 4fr;
          gap: 4rem;
          align-items: center;
        }

        /* Image RIGHT → content gets 4fr, image gets 3fr */
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
            Services · Web Development
          </div>

          <h1 className="wd-hero__h1">
            Building digital<br />
            experiences that <em>perform</em>
          </h1>

          <div className="wd-hero__rule" />

          <p className="wd-hero__sub">
            From custom web applications and UX-first design to e-commerce, SEO, and security—we engineer end-to-end digital solutions that connect, engage, and convert.
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
            Crafting digital experiences that<br />
            inspire, connect &amp; <em>convert</em>
          </h2>
          <div className="wd-intro__rule" />
          <p className="wd-intro__p">
            At <strong>99 Visual Solutions</strong>, we go beyond just creating websites—we design digital experiences that connect, engage, and inspire. As a trusted <strong>web design and development company</strong>, we combine creativity, strategy, and cutting-edge technology to deliver solutions that not only look stunning but also perform flawlessly across every device.
          </p>
          <p className="wd-intro__p">
            In today's fast-moving digital world, your website is the first impression customers have of your brand. That's why we create <strong>modern, responsive, and SEO-optimized websites</strong> tailored to your business goals—whether you are a startup, an enterprise, or an e-commerce brand.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ══════════════════════════════════ */}
      <div id="services" className="wd-services">
        {services.map((svc, idx) => (
          <section key={svc.id} id={svc.id} className="wd-svc">
            {/*
              imageLeft=true  → image is col-1 (3fr), content is col-2 (4fr) → use img-left class
              imageLeft=false → content is col-1 (4fr), image is col-2 (3fr) → use img-right class
            */}
            <div className={`wd-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>

              {/* Image — left or right */}
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
              Benefits of working with<br /><em>99 Visual</em>
            </h2>
            <div className="wd-benefits__rule" />
            <p className="wd-benefits__sub">
              Partnering with 99 Visual Solutions means more than just building a website—it means creating a lasting digital impact. Here's why businesses trust us.
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
            Ready to build something <em>remarkable</em>?
          </h2>
          <div className="wd-cta__rule" />
          <p className="wd-cta__sub">
            Get in touch with our team for a free consultation. We'll help you map out the right solution for your goals.
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