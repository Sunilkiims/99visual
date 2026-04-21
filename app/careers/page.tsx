import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Careers at 99 Visual | Web Developer, Designer & Digital Marketing Jobs - Bangalore India",
  description:
    "Join 99 Visual's growing team in Bangalore, India. We're hiring web developers, UI/UX designers, 3D visualization artists, SEO specialists, and digital marketers. Build your career with a forward-thinking digital agency.",
  keywords: [
    "99Visual Careers", "Jobs at 99Visual", "Work at 99Visual",
    "IT Company Jobs Bangalore", "Digital Agency Jobs Bangalore", "Startup Jobs Bangalore", "IT Jobs India",
    "Web Developer Jobs India", "Frontend Developer Jobs India", "Backend Developer Jobs India",
    "Full Stack Developer Jobs Bangalore", "React Developer Jobs India", "Next.js Developer Jobs India",
    "UI UX Designer Jobs India", "UI UX Designer Jobs Bangalore", "3D Visualization Jobs India", "3D Artist Jobs Bangalore",
    "Digital Marketing Jobs India", "SEO Jobs India", "SEO Specialist Jobs Bangalore", "Content Marketing Jobs India",
    "Creative Agency Careers India", "Hiring Web Developers India", "Careers in Digital Agency India", "Join Digital Agency Team India",
  ],
  openGraph: {
    title: "Careers at 99Visual | Web, Design & Digital Marketing Jobs - Bangalore",
    description: "We're hiring! Join 99Visual in Bangalore — roles in web development, UI/UX design, 3D visualization, SEO, and digital marketing. Shape the future of digital with us.",
    url: "https://www.99visual.com/careers",
    siteName: "99Visual Solutions",
    images: [{ url: "https://www.99visual.com/images/og/careers-og.jpg", width: 1200, height: 630, alt: "Careers at 99Visual - Web Developer, Designer & Digital Marketing Jobs Bangalore" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at 99Visual | Join Our Creative Team in Bangalore",
    description: "We're hiring web developers, UI/UX designers, 3D artists, and digital marketers in Bangalore. Grow your career at 99Visual.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/careers-og.jpg"],
  },
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/careers" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  authors: [{ name: "99Visual Solutions", url: "https://www.99visual.com" }],
  category: "Technology",
};

const careerAreas = [
  { icon: FaLaptopCode, accent: "#6366f1", label: "Development",       desc: "Build scalable web apps and platforms powering global businesses with modern React and Next.js stacks." },
  { icon: FaUsers,     accent: "#22d3ee", label: "Design & UX",        desc: "Create intuitive, human-centered designs that elevate every user touchpoint and brand interaction." },
  { icon: FaLightbulb, accent: "#fbbf24", label: "Innovation",         desc: "Work on AI, 3D visualization, GIS, and next-generation technologies that redefine industries." },
  { icon: FaRocket,    accent: "#f97316", label: "Digital Marketing",  desc: "Drive measurable growth with SEO, paid campaigns, and data-backed creative strategies." },
];

const whyItems = [
  { num: "01", title: "Growth & Learning",      desc: "Continuous mentorship, structured learning, and real-world experience that accelerates your career trajectory." },
  { num: "02", title: "Collaborative Culture",  desc: "A supportive, diverse, and creative team environment that values your voice and ideas at every level." },
  { num: "03", title: "Impactful Projects",     desc: "Work on meaningful global projects that create tangible business impact and push your craft further." },
];

export default function CareersPage() {
  return (
    <>
      <Header />

      {/* ── JSON-LD: Organization ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization",
        "@id": "https://www.99visual.com/#organization",
        "name": "99Visual Solutions", "url": "https://www.99visual.com",
        "logo": { "@type": "ImageObject", "url": "https://www.99visual.com/images/logo.png", "width": 200, "height": 60 },
        "description": "99Visual Solutions is a digital agency based in Bangalore, India, offering services in web development, 3D visualization, SEO, and digital marketing.",
        "address": { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressRegion": "Karnataka", "addressCountry": "IN" },
        "sameAs": ["https://twitter.com/99visual", "https://www.linkedin.com/company/99visual"],
        "knowsAbout": ["Web Development", "3D Visualization", "UI/UX Design", "Digital Marketing", "SEO", "GIS", "Automation Testing"],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage",
        "@id": "https://www.99visual.com/careers#webpage",
        "url": "https://www.99visual.com/careers",
        "name": "Careers at 99 Visual | Web Developer, Designer & Digital Marketing Jobs - Bangalore India",
        "description": "Join 99 Visual's growing team in Bangalore, India. We're hiring web developers, UI/UX designers, 3D visualization artists, SEO specialists, and digital marketers.",
        "inLanguage": "en-US",
        "isPartOf": { "@type": "WebSite", "@id": "https://www.99visual.com/#website", "url": "https://www.99visual.com", "name": "99Visual Solutions", "publisher": { "@id": "https://www.99visual.com/#organization" } },
        "about": { "@id": "https://www.99visual.com/#organization" },
        "breadcrumb": { "@id": "https://www.99visual.com/careers#breadcrumb" },
        "primaryImageOfPage": { "@type": "ImageObject", "url": "https://www.99visual.com/images/og/careers-og.jpg", "width": 1200, "height": 630 },
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "@id": "https://www.99visual.com/careers#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.99visual.com" },
          { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://www.99visual.com/careers" },
        ],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What roles is 99Visual hiring for in Bangalore?", "acceptedAnswer": { "@type": "Answer", "text": "99Visual is currently hiring for Web Developers, UI/UX Designers, Digital Marketing Specialists, and 3D Visualization Artists at its Bangalore office." } },
          { "@type": "Question", "name": "Is 99Visual a good place to work for freshers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. 99Visual offers continuous learning, mentorship, and real-world project experience, making it an excellent environment for freshers and early-career professionals to grow quickly." } },
          { "@type": "Question", "name": "Does 99Visual offer remote or hybrid work options?", "acceptedAnswer": { "@type": "Answer", "text": "Work arrangements vary by role. Please visit the Contact page at https://www.99visual.com/contact or apply directly to inquire about remote or hybrid options for a specific position." } },
          { "@type": "Question", "name": "How do I apply for a job at 99Visual?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply by visiting https://www.99visual.com/contact and submitting your details along with your resume. The hiring team will reach out regarding suitable openings." } },
        ],
      })}} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Shared tokens ─── */
        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ─── HERO ─── */
        .c-hero {
          position: relative;
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }
        .c-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .c-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: cOrbDrift 16s ease-in-out infinite alternate;
        }
        .c-hero__orb--1 { width:560px;height:560px; background:radial-gradient(circle,#6366f1,#4f46e5); top:-180px;right:-120px; opacity:.14; }
        .c-hero__orb--2 { width:420px;height:420px; background:radial-gradient(circle,#f97316,#ea580c); bottom:-120px;left:-80px; opacity:.12; animation-delay:-8s; }
        @keyframes cOrbDrift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(36px,28px) scale(1.07)} }

        .c-hero__grid {
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .c-hero__grain {
          position:absolute;inset:0;opacity:.03;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px 180px;
        }

        .c-hero__content {
          position:relative;z-index:10;max-width:760px;margin:0 auto;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes cFadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }

        .c-hero__eyebrow {
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;
          color:var(--c-orange);
          border:1px solid rgba(249,115,22,.28);
          background:rgba(249,115,22,.07);
          padding:6px 16px;border-radius:100px;
          margin-bottom:1.8rem;backdrop-filter:blur(8px);
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .c-hero__dot { width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:cPulse 2s ease-in-out infinite; }
        @keyframes cPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .c-hero__h1 {
          font-family:var(--ff-serif);
          font-size:clamp(3rem,8.5vw,6.8rem);
          font-weight:700;line-height:1.0;letter-spacing:-.02em;
          color:#fff;margin:0 0 1.1rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .c-hero__h1 em { font-style:italic;color:transparent;-webkit-text-stroke:1.5px var(--c-orange); }

        .c-hero__rule {
          width:48px;height:1px;
          background:linear-gradient(90deg,transparent,var(--c-orange),transparent);
          margin:0 auto 1.5rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .c-hero__sub {
          font-family:var(--ff-sans);font-size:clamp(.95rem,2vw,1.12rem);
          font-weight:300;line-height:1.75;color:var(--c-muted);
          max-width:520px;margin:0 auto 2.6rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .c-hero__cta {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          color:#080808;
          background:linear-gradient(135deg,#fb923c,#f97316);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          box-shadow:0 8px 32px rgba(249,115,22,.35);
          transition:transform .2s ease,box-shadow .2s ease;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .c-hero__cta:hover { transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5); }

        .c-hero__scroll {
          position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
          z-index:20;display:flex;flex-direction:column;align-items:center;gap:6px;
          text-decoration:none;animation: cFadeUp .9s ease .8s both;
        }
        .c-hero__scroll-line {
          width:1px;height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:cScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes cScrollLine {
          0%  {transform:scaleY(0);transform-origin:top;opacity:1}
          50% {transform:scaleY(1);transform-origin:top;opacity:1}
          100%{transform:scaleY(1);transform-origin:bottom;opacity:0}
        }
        .c-hero__scroll-lbl {
          font-family:var(--ff-sans);font-size:9px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.22);
        }

        /* corner marks */
        .c-corner {
          position:absolute;width:28px;height:28px;z-index:5;opacity:.2;
        }
        .c-corner--tl{top:24px;left:24px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .c-corner--tr{top:24px;right:24px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .c-corner--bl{bottom:64px;left:24px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .c-corner--br{bottom:64px;right:24px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ─── CAREER AREAS ─── */
        .c-areas {
          background:var(--c-surface);
          padding:6rem 1.5rem;
        }
        .c-section-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;
          color:var(--c-orange);margin-bottom:.8rem;
        }
        .c-section-h2 {
          font-family:var(--ff-serif);
          font-size:clamp(2rem,4vw,3.2rem);
          font-weight:700;line-height:1.1;letter-spacing:-.015em;
          color:#fff;margin-bottom:1rem;
        }
        .c-section-sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);max-width:480px;
        }
        .c-areas__header { text-align:center;margin:0 auto 4rem; }
        .c-areas__grid {
          display:grid;gap:1.5px;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          max-width:1100px;margin:0 auto;
          border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;
        }
        .c-area-card {
          position:relative;
          background:var(--c-bg);
          padding:2.4rem 2rem;
          transition:background .25s ease;
          cursor:default;
        }
        .c-area-card:hover { background:#111; }
        .c-area-card__icon-wrap {
          width:48px;height:48px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:1.4rem;font-size:1.2rem;
          background:rgba(255,255,255,.04);
          border:1px solid var(--c-border);
          transition:transform .2s ease;
        }
        .c-area-card:hover .c-area-card__icon-wrap { transform:scale(1.1); }
        .c-area-card__title {
          font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;
          color:#fff;margin-bottom:.6rem;letter-spacing:-.01em;
        }
        .c-area-card__desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .c-area-card__line {
          position:absolute;bottom:0;left:0;right:0;height:2px;
          opacity:0;transition:opacity .25s ease;
        }
        .c-area-card:hover .c-area-card__line { opacity:1; }

        /* ─── WHY WORK WITH US ─── */
        .c-why {
          background:var(--c-bg);
          padding:6rem 1.5rem;
        }
        .c-why__inner { max-width:1100px;margin:0 auto; }
        .c-why__layout {
          display:grid;gap:4rem;
          grid-template-columns:1fr 1fr;
          align-items:start;
        }
        @media(max-width:768px){ .c-why__layout{grid-template-columns:1fr;} }
        .c-why__items { display:flex;flex-direction:column;gap:0; }
        .c-why__item {
          padding:2rem 0;
          border-bottom:1px solid var(--c-border);
          display:flex;gap:1.5rem;align-items:flex-start;
        }
        .c-why__item:first-child { border-top:1px solid var(--c-border); }
        .c-why__num {
          font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;
          color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;
        }
        .c-why__item-title {
          font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;
          color:#fff;margin-bottom:.4rem;
        }
        .c-why__item-desc {
          font-family:var(--ff-sans);font-size:.88rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);
        }
        .c-why__visual {
          position:relative;
          background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));
          border:1px solid rgba(249,115,22,.15);
          border-radius:20px;padding:2.5rem;
          display:flex;flex-direction:column;gap:1.2rem;
        }
        .c-why__stat {
          display:flex;flex-direction:column;
        }
        .c-why__stat-num {
          font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);
          font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;
        }
        .c-why__stat-label {
          font-family:var(--ff-sans);font-size:10px;font-weight:500;
          letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);
        }
        .c-why__divider { height:1px;background:var(--c-border); }

        /* ─── OPEN ROLES (new section) ─── */
        .c-roles {
          background:var(--c-surface);
          padding:6rem 1.5rem;
        }
        .c-roles__inner { max-width:1100px;margin:0 auto; }
        .c-roles__header { text-align:center;margin-bottom:4rem; }
        .c-roles__list {
          display:flex;flex-direction:column;gap:1px;
          border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;
        }
        .c-role-row {
          background:var(--c-bg);
          padding:1.8rem 2.4rem;
          display:flex;align-items:center;justify-content:space-between;gap:2rem;
          transition:background .2s ease;
          flex-wrap:wrap;
        }
        .c-role-row:hover { background:#111; }
        .c-role-row__left { display:flex;flex-direction:column;gap:.35rem; }
        .c-role-row__title {
          font-family:var(--ff-serif);font-size:1.3rem;font-weight:600;
          color:#fff;letter-spacing:-.01em;
        }
        .c-role-row__meta {
          display:flex;gap:1rem;align-items:center;flex-wrap:wrap;
        }
        .c-role-row__tag {
          font-family:var(--ff-sans);font-size:9px;font-weight:500;
          letter-spacing:.18em;text-transform:uppercase;
          padding:4px 10px;border-radius:100px;
          border:1px solid var(--c-border);color:var(--c-muted);
        }
        .c-role-row__tag--open {
          background:rgba(249,115,22,.1);
          border-color:rgba(249,115,22,.3);
          color:var(--c-orange);
        }
        .c-role-row__apply {
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--ff-sans);font-size:10px;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;
          color:#fff;
          border:1px solid rgba(249,115,22,.3);
          background:rgba(249,115,22,.07);
          backdrop-filter:blur(8px);
          padding:10px 22px;border-radius:100px;text-decoration:none;
          white-space:nowrap;
          transition:all .2s ease;
          flex-shrink:0;
        }
        .c-role-row__apply:hover {
          background:var(--c-orange);color:#080808;border-color:var(--c-orange);
          transform:translateY(-1px);
        }

        /* ─── CTA ─── */
        .c-cta {
          position:relative;
          background:var(--c-bg);
          padding:7rem 1.5rem;
          text-align:center;overflow:hidden;
        }
        .c-cta__orb {
          position:absolute;width:600px;height:600px;
          border-radius:50%;filter:blur(110px);opacity:.12;
          background:radial-gradient(circle,#f97316,transparent);
          top:50%;left:50%;transform:translate(-50%,-50%);
          pointer-events:none;
        }
        .c-cta__content { position:relative;z-index:10;max-width:640px;margin:0 auto; }
        .c-cta__h2 {
          font-family:var(--ff-serif);
          font-size:clamp(2.2rem,5vw,4rem);
          font-weight:700;line-height:1.05;letter-spacing:-.02em;
          color:#fff;margin-bottom:1.2rem;
        }
        .c-cta__h2 em { font-style:italic;color:var(--c-orange); }
        .c-cta__sub {
          font-family:var(--ff-sans);font-size:.95rem;font-weight:300;
          line-height:1.7;color:var(--c-muted);margin-bottom:2.4rem;
        }
        .c-cta__btn {
          display:inline-flex;align-items:center;gap:10px;
          font-family:var(--ff-sans);font-size:11px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          color:#fff;
          border:1px solid rgba(249,115,22,.4);
          background:rgba(249,115,22,.1);
          backdrop-filter:blur(12px);
          padding:14px 34px;border-radius:100px;text-decoration:none;
          transition:all .2s ease;
        }
        .c-cta__btn:hover {
          background:var(--c-orange);color:#080808;border-color:var(--c-orange);
          transform:translateY(-2px);box-shadow:0 12px 36px rgba(249,115,22,.4);
        }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="c-hero">
        <div className="c-hero__bg">
          <div className="c-hero__orb c-hero__orb--1" />
          <div className="c-hero__orb c-hero__orb--2" />
          <div className="c-hero__grid" />
          <div className="c-hero__grain" />
        </div>

        <div className="c-corner c-corner--tl" />
        <div className="c-corner c-corner--tr" />
        <div className="c-corner c-corner--bl" />
        <div className="c-corner c-corner--br" />

        <div className="c-hero__content">
          <div className="c-hero__eyebrow">
            <span className="c-hero__dot" />
            Careers · Bangalore &amp; Beyond
          </div>

          <h1 className="c-hero__h1">
            Build your <em>future</em><br />with us
          </h1>

          <div className="c-hero__rule" />

          <p className="c-hero__sub">
            We're not just hiring — we're building a team of innovators, creators, and problem-solvers who shape the future of digital experiences together.
          </p>

          <Link href="#careers" className="c-hero__cta">
            Explore Opportunities
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <a href="#careers" className="c-hero__scroll" aria-label="Scroll down">
          <div className="c-hero__scroll-line" />
          <span className="c-hero__scroll-lbl">Scroll</span>
        </a>
      </section>

      {/* ══════════════════════════════
          CAREER AREAS
      ══════════════════════════════ */}
      <section id="careers" className="c-areas">
        <div className="c-areas__header">
          <p className="c-section-label">What we do</p>
          <h2 className="c-section-h2">Career Opportunities</h2>
          <p className="c-section-sub" style={{ margin: "0 auto" }}>
            Four disciplines, one shared mission — craft exceptional digital experiences that move the world.
          </p>
        </div>

        <div className="c-areas__grid">
          {careerAreas.map(({ icon: Icon, accent, label, desc }) => (
            <div className="c-area-card" key={label}>
              <div className="c-area-card__icon-wrap" style={{ color: accent }}>
                <Icon />
              </div>
              <div className="c-area-card__title">{label}</div>
              <div className="c-area-card__desc">{desc}</div>
              <div className="c-area-card__line" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          WHY WORK WITH US
      ══════════════════════════════ */}
      <section className="c-why">
        <div className="c-why__inner">
          <div className="c-why__layout">

            {/* Left: numbered items */}
            <div>
              <p className="c-section-label">Why us</p>
              <h2 className="c-section-h2" style={{ marginBottom: "2.5rem" }}>
                Why work<br />with 99 Visual?
              </h2>
              <div className="c-why__items">
                {whyItems.map(({ num, title, desc }) => (
                  <div className="c-why__item" key={num}>
                    <span className="c-why__num">{num}</span>
                    <div>
                      <div className="c-why__item-title">{title}</div>
                      <div className="c-why__item-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stats card */}
            <div className="c-why__visual">
              <div className="c-why__stat">
                <div className="c-why__stat-num">10+</div>
                <div className="c-why__stat-label">Years of expertise</div>
              </div>
              <div className="c-why__divider" />
              <div className="c-why__stat">
                <div className="c-why__stat-num">500+</div>
                <div className="c-why__stat-label">Projects delivered</div>
              </div>
              <div className="c-why__divider" />
              <div className="c-why__stat">
                <div className="c-why__stat-num">50+</div>
                <div className="c-why__stat-label">Team members globally</div>
              </div>
              <div className="c-why__divider" />
              <div className="c-why__stat">
                <div className="c-why__stat-num">6</div>
                <div className="c-why__stat-label">Core service domains</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          OPEN ROLES
      ══════════════════════════════ */}
      <section className="c-roles">
        <div className="c-roles__inner">
          <div className="c-roles__header">
            <p className="c-section-label">Open positions</p>
            <h2 className="c-section-h2">Current Openings</h2>
            <p className="c-section-sub" style={{ margin: "0 auto" }}>
              We're actively hiring across all disciplines. Don't see a perfect fit? Apply anyway — we're always interested in exceptional talent.
            </p>
          </div>

          <div className="c-roles__list">
            {[
              { title: "Web Developer",              dept: "Development",      type: "Full-time", loc: "Bangalore" },
              { title: "UI/UX Designer",             dept: "Design",           type: "Full-time", loc: "Bangalore" },
              { title: "Digital Marketing Specialist", dept: "Marketing",      type: "Full-time", loc: "Bangalore" },
              { title: "3D Visualization Artist",    dept: "Innovation",       type: "Full-time", loc: "Bangalore" },
            ].map(({ title, dept, type, loc }) => (
              <div className="c-role-row" key={title}>
                <div className="c-role-row__left">
                  <div className="c-role-row__title">{title}</div>
                  <div className="c-role-row__meta">
                    <span className="c-role-row__tag c-role-row__tag--open">Now Hiring</span>
                    <span className="c-role-row__tag">{dept}</span>
                    <span className="c-role-row__tag">{type}</span>
                    <span className="c-role-row__tag">{loc}</span>
                  </div>
                </div>
                <Link href="/contact" className="c-role-row__apply">
                  Apply
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="c-cta">
        <div className="c-cta__orb" />
        <div className="c-cta__content">
          <h2 className="c-cta__h2">
            Ready to shape the<br /><em>future</em> together?
          </h2>
          <p className="c-cta__sub">
            Join a team that thrives on innovation, creativity, and delivering excellence. We invest in people who are curious, driven, and bold.
          </p>
          <Link href="/contact" className="c-cta__btn">
            Join Our Team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}