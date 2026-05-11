// app/careers/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Careers page — 99 Visual Solutions
//
// CHANGES IN THIS VERSION:
//   ✅ Hero restructured to two-column layout matching contact/about pages
//      (text left, animated visual right) — replaces centred single-column
//   ✅ All schema, SEO, a11y, and section content below the hero unchanged
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import Header        from "@/app/components/header";
import Footer        from "@/app/components/footer";
import ScrollDown    from "@/app/components/scrolldown";
import Chatbot       from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader    from "@/app/components/PageLoader";
import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

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
  title: "Web Developer & Designer Jobs | Careers at 99 Visual Solutions",

  description:
    "Explore open roles at 99 Visual Solutions — web developers, UI/UX designers, 3D artists, SEO & digital marketing specialists. 5+ years, 500+ projects. Apply now.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: "/careers",
    languages: {
      "en-IN":     `${BASE}/careers`,
      "en-US":     `${BASE}/careers`,
      "en-GB":     `${BASE}/careers`,
      "en-AE":     `${BASE}/careers`,
      "en-AU":     `${BASE}/careers`,
      "x-default": `${BASE}/careers`,
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
    title: "Web Developer & Designer Jobs | Careers at 99 Visual",
    description:
      "Join 99 Visual Solutions — hiring web developers, UI/UX designers, 3D artists & digital marketers in Bangalore. 5+ yrs expertise, 500+ projects delivered.",
    url: `${BASE}/careers`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/careers-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Join 99 Visual Solutions — Web Developer, Designer & Digital Marketing Jobs",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Join Our Team | Careers at 99 Visual Solutions",
    description: "We're hiring web developers, UI/UX designers, 3D artists & digital marketers. Build your career with 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/careers-og.jpg`,
        alt: "Careers at 99 Visual Solutions",
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
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED    = "2023-01-01";
const DATE_MODIFIED     = new Date().toISOString().split("T")[0];
const JOB_DATE_POSTED   = "2025-01-01";
const JOB_VALID_THROUGH = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
).toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// JOB POSTING HELPER
// ─────────────────────────────────────────────────────────────────────────────
const jobAddress = {
  "@type":         "PostalAddress",
  addressLocality: "Bengaluru",
  addressRegion:   "Karnataka",
  postalCode:      "560087",
  addressCountry:  "IN",
};

const hiringOrg = { "@id": `${BASE}/#organization` };

interface JobPosting {
  "@type": string;
  "@id": string;
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  workHours: string;
  hiringOrganization: object;
  jobLocation: object;
  applicantLocationRequirements: object;
  directApply: boolean;
  url: string;
  industry: string;
  occupationalCategory: string;
  skills: string;
  responsibilities: string;
  qualifications: string;
  baseSalary: object;
  jobBenefits: string;
}

const makeJobPosting = (
  id: string,
  title: string,
  description: string,
  skills: string[],
  responsibilities: string[],
  qualifications: string[]
): JobPosting => ({
  "@type":          "JobPosting",
  "@id":            `${BASE}/careers#${id}`,
  title,
  description,
  datePosted:       JOB_DATE_POSTED,
  validThrough:     JOB_VALID_THROUGH,
  employmentType:   "FULL_TIME",
  workHours:        "Monday–Friday, 09:00–18:00 IST",
  hiringOrganization: hiringOrg,
  jobLocation: {
    "@type": "Place",
    name:    "99 Visual Solutions Office, Bengaluru",
    address: jobAddress,
  },
  applicantLocationRequirements: { "@type": "Country", name: "India" },
  directApply: true,
  url:         `${BASE}/contact`,
  industry:    "Information Technology",
  occupationalCategory: title,
  skills:          skills.join(", "),
  responsibilities: responsibilities.join(" "),
  qualifications:  qualifications.join(" "),
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "INR",
    value: {
      "@type":   "QuantitativeValue",
      unitText:  "YEAR",
      minValue:  300000,
      maxValue:  1200000,
    },
  },
  jobBenefits:
    "Competitive salary, professional development budget, collaborative team culture, real-world global project exposure, mentorship programme.",
});

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA
// ─────────────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    question: "What jobs is 99 Visual Solutions currently hiring for?",
    answer:
      "99 Visual Solutions is actively hiring for four roles at its Bengaluru office: Web Developer, UI/UX Designer, Digital Marketing Specialist, and 3D Visualization Artist. All positions are full-time. You can apply directly through the Contact page at 99visual.com/contact.",
  },
  {
    question: "Is 99 Visual Solutions a good company for freshers?",
    answer:
      "Yes. 99 Visual Solutions offers structured mentorship, continuous learning opportunities, and hands-on exposure to real global projects from day one. It is an excellent environment for freshers and early-career professionals looking to grow quickly in web development, design, or digital marketing.",
  },
  {
    question: "Does 99 Visual Solutions offer remote or hybrid work options?",
    answer:
      "Work arrangements vary by role and project requirements. Candidates interested in remote or hybrid options should apply at 99visual.com/contact and discuss preferences during the interview process. The team is open to flexible arrangements for the right candidates.",
  },
  {
    question: "How do I apply for a job at 99 Visual Solutions?",
    answer:
      "Visit 99visual.com/contact, fill in your details, and attach your resume or portfolio. The hiring team reviews all applications and reaches out about suitable openings within a few business days.",
  },
  {
    question: "How much experience does 99 Visual Solutions have?",
    answer:
      "99 Visual Solutions was founded in 2020 and has over 5 years of industry experience. The company has delivered more than 500 projects across web development, 3D visualisation, SEO, digital marketing, CAD/GIS, and QA testing for clients in India, the US, UK, Australia, and the UAE.",
  },
  {
    question: "What is the salary range for jobs at 99 Visual Solutions?",
    answer:
      "Compensation is competitive and commensurate with experience and role. Typical annual packages range from ₹3 LPA for entry-level positions to ₹12 LPA or more for senior roles. Benefits include professional development budget, mentorship, and exposure to global projects.",
  },
  {
    question: "What technologies does the web development team at 99 Visual Solutions use?",
    answer:
      "The development team primarily works with React, Next.js, TypeScript, Node.js, and Tailwind CSS. Projects also involve REST APIs, PostgreSQL, and cloud deployments. Frontend developers are expected to have a solid understanding of Core Web Vitals and SEO best practices.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — page-specific nodes only
// ─────────────────────────────────────────────────────────────────────────────
const careersBreadcrumbNode = {
  ...breadcrumb([
    { name: "Home",    url: "/" },
    { name: "Careers", url: "/careers" },
  ]),
  "@id": `${BASE}/careers#breadcrumb`,
};

const careersFaqNode = {
  ...faqSchema(faqItems),
  "@id":            `${BASE}/careers#faq`,
  mainEntityOfPage: { "@id": `${BASE}/careers#webpage` },
};

const careersPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/careers#webpage`,
  url:           `${BASE}/careers`,
  name:          "Web Developer & Designer Jobs | Careers at 99 Visual Solutions",
  headline:      "Build your future with 99 Visual Solutions — Careers",
  description:
    "Explore open positions at 99 Visual Solutions: web developers, UI/UX designers, 3D visualization artists, SEO & digital marketing specialists. Apply today.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/og/careers-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Careers at 99 Visual Solutions — Web Developer, Designer & Digital Marketing Jobs",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    // ── updated selectors to match new two-column hero class names ──
    cssSelector: [".cr-hero__h1", ".cr-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/careers#breadcrumb` },
  mainEntity:      { "@id": `${BASE}/careers#joblist` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/careers`] },
};

const itemListNode = {
  "@type":       "ItemList",
  "@id":         `${BASE}/careers#joblist`,
  name:          "Open Positions at 99 Visual Solutions",
  description:
    "Current job openings at 99 Visual Solutions across web development, UI/UX design, digital marketing, and 3D visualisation.",
  url:           `${BASE}/careers`,
  numberOfItems: 4,
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@id": `${BASE}/careers#job-web-developer` } },
    { "@type": "ListItem", position: 2, item: { "@id": `${BASE}/careers#job-uiux-designer` } },
    { "@type": "ListItem", position: 3, item: { "@id": `${BASE}/careers#job-digital-marketing` } },
    { "@type": "ListItem", position: 4, item: { "@id": `${BASE}/careers#job-3d-artist` } },
  ],
};

const careersGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  careersPageNode,
  careersBreadcrumbNode,
  itemListNode,
  makeJobPosting(
    "job-web-developer",
    "Web Developer",
    "Join 99 Visual Solutions in Bengaluru as a Web Developer. Build scalable, performant web applications and platforms for global clients using modern React and Next.js stacks. You will collaborate with designers, QA engineers, and project managers to deliver pixel-perfect, accessible digital products. To apply, visit https://99visual.com/contact and submit your resume.",
    ["React", "Next.js", "TypeScript", "Node.js", "REST APIs", "Git", "Tailwind CSS", "PostgreSQL"],
    [
      "Design and implement scalable front-end and back-end web solutions.",
      "Write clean, maintainable, and well-documented code.",
      "Collaborate with UI/UX designers to translate wireframes into production-ready interfaces.",
      "Optimise applications for maximum speed, SEO, and accessibility.",
      "Participate in code reviews and contribute to team knowledge sharing.",
    ],
    [
      "1–5 years of professional web development experience.",
      "Proficiency in React or Next.js; TypeScript a strong plus.",
      "Understanding of web performance, Core Web Vitals, and SEO fundamentals.",
      "Bachelor's degree in Computer Science, Engineering, or equivalent practical experience.",
    ]
  ),
  makeJobPosting(
    "job-uiux-designer",
    "UI/UX Designer",
    "99 Visual Solutions is hiring a UI/UX Designer in Bengaluru. Create intuitive, human-centred designs that elevate every user touchpoint and brand interaction. You will own the full design process — from research and wireframes through to high-fidelity prototypes and design system maintenance. To apply, visit https://99visual.com/contact.",
    ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Accessibility", "Interaction Design"],
    [
      "Lead end-to-end UX/UI design for web and mobile products.",
      "Conduct user research, usability testing, and competitive analysis.",
      "Build and maintain a scalable design system and component library.",
      "Collaborate closely with developers to ensure accurate implementation.",
      "Present design rationale and iterate based on stakeholder feedback.",
    ],
    [
      "2+ years of professional UI/UX design experience.",
      "Expert-level proficiency in Figma or equivalent design tooling.",
      "Strong portfolio demonstrating user-centred design thinking.",
      "Bachelor's degree in Design, HCI, or equivalent practical experience.",
    ]
  ),
  makeJobPosting(
    "job-digital-marketing",
    "Digital Marketing Specialist",
    "99 Visual Solutions is looking for a Digital Marketing Specialist in Bengaluru. Drive measurable growth through SEO, paid campaigns (Google Ads, Meta Ads), content strategy, and data-backed creative execution. You will own performance metrics and report directly to leadership. To apply, visit https://99visual.com/contact.",
    ["SEO", "Google Ads", "Meta Ads", "Google Analytics 4", "Content Marketing", "Email Marketing", "Copywriting", "Ahrefs", "SEMrush"],
    [
      "Plan, execute, and optimise multi-channel digital marketing campaigns.",
      "Lead on-page and off-page SEO strategy to improve organic rankings.",
      "Manage paid media budgets and maximise ROAS.",
      "Produce regular performance reports and actionable insights for stakeholders.",
      "Collaborate with design and development teams on landing pages and creative assets.",
    ],
    [
      "2+ years of hands-on digital marketing or SEO experience.",
      "Proven track record of improving organic traffic and/or paid campaign ROI.",
      "Google Ads and Analytics certifications preferred.",
      "Bachelor's degree in Marketing, Communications, or related field.",
    ]
  ),
  makeJobPosting(
    "job-3d-artist",
    "3D Visualization Artist",
    "99 Visual Solutions is hiring a 3D Visualization Artist in Bengaluru. Create photorealistic 3D renders, animations, and interactive experiences for architecture, product, and GIS projects. You will work alongside our CAD/GIS and development teams on next-generation visualisation pipelines. To apply, visit https://99visual.com/contact.",
    ["3ds Max", "Blender", "V-Ray", "Unreal Engine", "AutoCAD", "Photoshop", "After Effects", "GIS"],
    [
      "Produce high-quality 3D models, renders, and animations for client projects.",
      "Collaborate with CAD/GIS teams to integrate geospatial data into visualisations.",
      "Develop interactive real-time experiences using Unreal Engine or similar.",
      "Maintain quality standards and meet project deadlines in a fast-paced environment.",
    ],
    [
      "2+ years of professional 3D visualisation experience.",
      "Strong portfolio across architectural, product, or GIS visualisation.",
      "Proficiency in 3ds Max or Blender and a render engine (V-Ray, Corona, or Cycles).",
      "Degree in Architecture, Fine Arts, Animation, or equivalent practical experience.",
    ]
  ),
  careersFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const careerAreas = [
  {
    icon:     FaLaptopCode,
    accent:   "#6366f1",
    label:    "Development",
    jobTitle: "Web Developer",
    desc:     "Build scalable web apps and platforms powering global businesses with modern React and Next.js stacks.",
  },
  {
    icon:     FaUsers,
    accent:   "#22d3ee",
    label:    "Design & UX",
    jobTitle: "UI/UX Designer",
    desc:     "Create intuitive, human-centered designs that elevate every user touchpoint and brand interaction.",
  },
  {
    icon:     FaLightbulb,
    accent:   "#fbbf24",
    label:    "Innovation",
    jobTitle: "3D Visualization Artist",
    desc:     "Work on AI, 3D visualization, GIS, and next-generation technologies that redefine industries.",
  },
  {
    icon:     FaRocket,
    accent:   "#f97316",
    label:    "Digital Marketing",
    jobTitle: "Digital Marketing Specialist",
    desc:     "Drive measurable growth with SEO, paid campaigns, and data-backed creative strategies.",
  },
];

const whyItems = [
  {
    num:   "01",
    title: "Growth & Learning",
    desc:  "Continuous mentorship, structured learning paths, and real-world global project experience that accelerates your career trajectory.",
  },
  {
    num:   "02",
    title: "Collaborative Culture",
    desc:  "A supportive, diverse, and creative team environment that values your voice and ideas at every level.",
  },
  {
    num:   "03",
    title: "Impactful Projects",
    desc:  "Work on meaningful projects for clients in the US, UK, AU, and UAE that create tangible business impact and push your craft further.",
  },
];

const openRoles = [
  { title: "Web Developer",                dept: "Development", type: "Full-time", loc: "India" },
  { title: "UI/UX Designer",               dept: "Design",      type: "Full-time", loc: "India" },
  { title: "Digital Marketing Specialist", dept: "Marketing",   type: "Full-time", loc: "India" },
  { title: "3D Visualization Artist",      dept: "Innovation",  type: "Full-time", loc: "India" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-careers-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersGraph) }}
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

        /* ══ HERO SHELL — mirrors .ct-hero / .ab-hero exactly ═══════════ */
        .cr-hero {
          position:       relative;
          min-height:     92vh;
          display:        flex;
          flex-direction: row;
          align-items:    center;
          background:     var(--c-bg);
          overflow:       hidden;
        }

        .cr-hero__grid {
          position:         absolute;
          inset:            0;
          pointer-events:   none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* ── Left column — mirrors .ct-hero__left / .ab-hero__left exactly ─ */
        .cr-hero__left {
          position:       relative;
          z-index:        10;
          flex:           1 1 340px;
          padding:        6rem 3rem 6rem 6rem;
          display:        flex;
          flex-direction: column;
          align-items:    flex-start;
        }

        .cr-hero__eyebrow {
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
          animation:       crFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .cr-hero__dot {
          width:         5px;
          height:        5px;
          border-radius: 50%;
          background:    var(--c-orange);
          animation:     crPulse 2s ease-in-out infinite;
        }
        @keyframes crPulse {
          0%,100% { opacity:1;  transform:scale(1); }
          50%     { opacity:.35; transform:scale(.65); }
        }

        .cr-hero__h1 {
          font-family:    var(--ff-serif);
          font-size:      clamp(2rem, 4.5vw, 3.8rem);
          font-weight:    700;
          line-height:    1.1;
          letter-spacing: -.02em;
          color:          #fff;
          margin:         0 0 1rem;
          animation:      crFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;
        }
        .cr-hero__h1 em {
          font-style:          italic;
          color:               transparent;
          -webkit-text-stroke: .2px var(--c-orange);
        }

        .cr-hero__rule {
          width:      48px;
          height:     1px;
          background: linear-gradient(90deg,transparent,var(--c-orange),transparent);
          margin:     0 0 1.4rem;
          animation:  crFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both;
        }

        .cr-hero__sub {
          font-family: var(--ff-sans);
          font-size:   clamp(.95rem, 1.8vw, 1.1rem);
          font-weight: 300;
          line-height: 1.78;
          color:       var(--c-muted);
          max-width:   420px;
          margin:      0 0 2rem;
          animation:   crFadeUp .9s cubic-bezier(.22,1,.36,1) .32s both;
        }

        /* ── Stats row ────────────────────────────────────────────────────── */
        .cr-hero__stats {
          display:   flex;
          gap:       0;
          list-style: none;
          padding:   0;
          margin:    0 0 2.4rem;
          animation: crFadeUp .9s cubic-bezier(.22,1,.36,1) .38s both;
        }
        .cr-hero__stat {
          padding:      0 2rem 0 0;
          margin-right: 2rem;
          border-right: 1px solid rgba(255,255,255,.1);
        }
        .cr-hero__stat:last-child {
          border-right: none;
          margin-right: 0;
          padding-right: 0;
        }
        .cr-hero__stat-num {
          font-family:   var(--ff-serif);
          font-size:     clamp(1.6rem,3.5vw,2.2rem);
          font-weight:   600;
          color:         var(--c-orange);
          line-height:   1;
          margin-bottom: 4px;
          display:       block;
        }
        .cr-hero__stat-label {
          font-family:    var(--ff-sans);
          font-size:      9px;
          font-weight:    500;
          letter-spacing: .15em;
          text-transform: uppercase;
          color:          rgba(255,255,255,.35);
          display:        block;
        }

        /* ── CTA ──────────────────────────────────────────────────────────── */
        .cr-hero__cta {
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
          animation:       crFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .cr-hero__cta:hover {
          transform:  translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.52);
        }

        @keyframes crFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── Scroll indicator ─────────────────────────────────────────────── */
        .cr-hero__scroll {
          position:        absolute;
          bottom:          2rem;
          left:            calc(6rem + 20px);
          z-index:         20;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          gap:             6px;
          text-decoration: none;
          animation:       crFadeUp .9s ease .85s both;
        }
        .cr-hero__scroll-line {
          width:      1px;
          height:     40px;
          background: linear-gradient(to bottom,rgba(255,255,255,.3),transparent);
          animation:  crScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes crScrollLine {
          0%   { transform:scaleY(0);  transform-origin:top;    opacity:1; }
          50%  { transform:scaleY(1);  transform-origin:top;    opacity:1; }
          100% { transform:scaleY(1);  transform-origin:bottom; opacity:0; }
        }
        .cr-hero__scroll-lbl {
          font-family:    var(--ff-sans);
          font-size:      9px;
          font-weight:    500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color:          rgba(255,255,255,.22);
        }

        /* ── Right column: animated visual stage ──────────────────────────── */
        .cr-hero__right {
          flex:            0 0 460px;
          height:          92vh;
          min-height:      560px;
          position:        relative;
          display:         flex;
          align-items:     center;
          justify-content: center;
          overflow:        hidden;
        }

        /* ── Floating role cards animation ───────────────────────────────── */
        .cr-anim {
          position:       relative;
          width:          340px;
          height:         420px;
          pointer-events: none;
        }

        /* Central hiring badge */
        .cr-anim__badge {
          position:        absolute;
          top:             50%;
          left:            50%;
          transform:       translate(-50%, -50%);
          width:           110px;
          height:          110px;
          border-radius:   50%;
          background:      linear-gradient(135deg, rgba(249,115,22,.18), rgba(99,102,241,.18));
          border:          1.5px solid rgba(249,115,22,.4);
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          gap:             4px;
          box-shadow:
            0 0 40px rgba(249,115,22,.15),
            0 0 80px rgba(99,102,241,.08),
            inset 0 1px 0 rgba(255,255,255,.06);
          animation:       crBadgePulse 3s ease-in-out infinite;
          z-index:         10;
        }
        @keyframes crBadgePulse {
          0%,100% { box-shadow: 0 0 40px rgba(249,115,22,.15), 0 0 80px rgba(99,102,241,.08), inset 0 1px 0 rgba(255,255,255,.06); }
          50%     { box-shadow: 0 0 60px rgba(249,115,22,.30), 0 0 100px rgba(99,102,241,.15), inset 0 1px 0 rgba(255,255,255,.06); }
        }
        .cr-anim__badge-label {
          font-family:    var(--ff-sans);
          font-size:      8px;
          font-weight:    600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color:          var(--c-orange);
        }
        .cr-anim__badge-num {
          font-family: var(--ff-serif);
          font-size:   2rem;
          font-weight: 700;
          color:       #fff;
          line-height: 1;
        }
        .cr-anim__badge-sub {
          font-family:    var(--ff-sans);
          font-size:      7px;
          font-weight:    400;
          letter-spacing: .1em;
          text-transform: uppercase;
          color:          var(--c-muted);
        }

        /* Orbit ring */
        .cr-anim__ring {
          position:      absolute;
          top:           50%;
          left:          50%;
          transform:     translate(-50%, -50%);
          width:         200px;
          height:        200px;
          border-radius: 50%;
          border:        1px dashed rgba(249,115,22,.18);
          animation:     crRingSpin 18s linear infinite;
        }
        .cr-anim__ring--2 {
          width:         280px;
          height:        280px;
          border-color:  rgba(99,102,241,.12);
          animation:     crRingSpin 28s linear infinite reverse;
          border-style:  solid;
          border-width:  1px;
        }
        @keyframes crRingSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Role orbit dots */
        .cr-anim__dot {
          position:      absolute;
          top:           50%;
          left:          50%;
          width:         8px;
          height:        8px;
          border-radius: 50%;
          margin:        -4px 0 0 -4px;
        }

        /* Floating role cards */
        .cr-card {
          position:        absolute;
          display:         flex;
          align-items:     center;
          gap:             10px;
          background:      rgba(15,15,15,.9);
          border:          1px solid var(--c-border);
          border-radius:   12px;
          padding:         10px 14px;
          backdrop-filter: blur(12px);
          box-shadow:      0 8px 32px rgba(0,0,0,.4);
          white-space:     nowrap;
        }
        .cr-card__icon {
          width:          32px;
          height:         32px;
          border-radius:  8px;
          display:        flex;
          align-items:    center;
          justify-content: center;
          font-size:      .85rem;
          flex-shrink:    0;
        }
        .cr-card__title {
          font-family: var(--ff-sans);
          font-size:   .72rem;
          font-weight: 500;
          color:       #fff;
          line-height: 1.3;
        }
        .cr-card__tag {
          font-family:    var(--ff-sans);
          font-size:      8px;
          font-weight:    500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color:          var(--c-orange);
          opacity:        .75;
        }

        /* Individual card positions & animations */
        .cr-card--1 {
          top:       8%;
          left:      -8%;
          animation: crFloat1 6s ease-in-out infinite;
        }
        .cr-card--2 {
          top:       14%;
          right:     -4%;
          animation: crFloat2 7s ease-in-out infinite;
        }
        .cr-card--3 {
          bottom:    28%;
          left:      -10%;
          animation: crFloat3 5.5s ease-in-out infinite;
        }
        .cr-card--4 {
          bottom:    10%;
          right:     -6%;
          animation: crFloat4 6.5s ease-in-out infinite;
        }

        @keyframes crFloat1 {
          0%,100% { transform: translateY(0px)   rotate(-1deg); }
          50%     { transform: translateY(-10px)  rotate(1deg); }
        }
        @keyframes crFloat2 {
          0%,100% { transform: translateY(0px)   rotate(1deg); }
          50%     { transform: translateY(-14px)  rotate(-1deg); }
        }
        @keyframes crFloat3 {
          0%,100% { transform: translateY(0px)   rotate(.5deg); }
          50%     { transform: translateY(-8px)   rotate(-1.5deg); }
        }
        @keyframes crFloat4 {
          0%,100% { transform: translateY(0px)   rotate(-1.5deg); }
          50%     { transform: translateY(-12px)  rotate(1deg); }
        }

        /* Connecting lines between badge and cards (SVG-based, decorative) */
        .cr-anim__lines {
          position:       absolute;
          inset:          0;
          pointer-events: none;
          opacity:        .25;
        }

        /* Ambient glow behind the right panel */
       

        /* ── Corner brackets — mirrors contact/about pages exactly ──────── */
        .cr-corner {
          position:       absolute;
          width:          28px;
          height:         28px;
          z-index:        5;
          opacity:        .18;
          pointer-events: none;
        }
        .cr-corner--tl { top:22px;    left:22px;    border-top:   1px solid var(--c-orange); border-left:  1px solid var(--c-orange); }
        .cr-corner--tr { top:22px;    right:22px;   border-top:   1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .cr-corner--bl { bottom:22px; left:22px;    border-bottom:1px solid var(--c-orange); border-left:  1px solid var(--c-orange); }
        .cr-corner--br { bottom:22px; right:22px;   border-bottom:1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ══ SECTIONS below hero — unchanged from original ════════════════ */
        .c-areas {
          background: var(--c-surface);
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .c-section-label {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: .8rem; display: block;
        }
        .c-section-h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.015em;
          color: #fff; margin-bottom: 1rem;
        }
        .c-section-sub {
          font-family: var(--ff-sans); font-size: .95rem; font-weight: 300;
          line-height: 1.7; color: var(--c-muted); max-width: 480px;
        }
        .c-areas__header { text-align: center; margin: 0 auto 4rem; }
        .c-areas__grid {
          display: grid; gap: 1.5px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          max-width: 1100px; margin: 0 auto;
          border: 1.5px solid var(--c-border);
          border-radius: 20px; overflow: hidden;
        }
        .c-area-card {
          position: relative;
          background: var(--c-bg);
          padding: 2.4rem 2rem;
          transition: background .25s ease;
        }
        .c-area-card:hover { background: #111; }
        .c-area-card__icon-wrap {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.4rem; font-size: 1.2rem;
          background: rgba(255,255,255,.04);
          border: 1px solid var(--c-border);
          transition: transform .2s ease;
        }
        .c-area-card:hover .c-area-card__icon-wrap { transform: scale(1.1); }
        .c-area-card__title {
          font-family: var(--ff-serif); font-size: 1.35rem; font-weight: 600;
          color: #fff; margin-bottom: .4rem; letter-spacing: -.01em;
        }
        .c-area-card__job {
          font-family: var(--ff-sans); font-size: .75rem; font-weight: 500;
          color: var(--c-orange); letter-spacing: .08em; text-transform: uppercase;
          margin-bottom: .6rem; opacity: .7;
        }
        .c-area-card__desc {
          font-family: var(--ff-sans); font-size: .88rem; font-weight: 300;
          line-height: 1.7; color: var(--c-muted);
        }
        .c-area-card__line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          opacity: 0; transition: opacity .25s ease;
        }
        .c-area-card:hover .c-area-card__line { opacity: 1; }

        .c-why {
          background: var(--c-bg);
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .c-why__inner { max-width: 1100px; margin: 0 auto; }
        .c-why__layout {
          display: grid; gap: 4rem;
          grid-template-columns: 1fr 1fr; align-items: start;
        }
        @media (max-width: 768px) { .c-why__layout { grid-template-columns: 1fr; } }
        .c-why__items { display: flex; flex-direction: column; gap: 0; }
        .c-why__item {
          padding: 2rem 0;
          border-bottom: 1px solid var(--c-border);
          display: flex; gap: 1.5rem; align-items: flex-start;
        }
        .c-why__item:first-child { border-top: 1px solid var(--c-border); }
        .c-why__num {
          font-family: var(--ff-serif); font-size: 1.1rem; font-weight: 600;
          color: var(--c-orange); opacity: .6; flex-shrink: 0; padding-top: 2px;
        }
        .c-why__item-title {
          font-family: var(--ff-serif); font-size: 1.25rem; font-weight: 600;
          color: #fff; margin-bottom: .4rem;
        }
        .c-why__item-desc {
          font-family: var(--ff-sans); font-size: .88rem; font-weight: 300;
          line-height: 1.7; color: var(--c-muted);
        }
        .c-why__visual {
          position: relative;
          background: linear-gradient(135deg, rgba(249,115,22,.08), rgba(249,115,22,.02));
          border: 1px solid rgba(249,115,22,.15);
          border-radius: 20px; padding: 2.5rem;
          display: flex; flex-direction: column; gap: 1.2rem;
        }
        .c-why__stat { display: flex; flex-direction: column; }
        .c-why__stat-num {
          font-family: var(--ff-serif);
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 700; color: var(--c-orange); line-height: 1; margin-bottom: 4px;
          display: block;
        }
        .c-why__stat-label {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .15em; text-transform: uppercase; color: var(--c-muted);
          display: block;
        }
        .c-why__divider { height: 1px; background: var(--c-border); }

        .c-roles {
          background: var(--c-surface);
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .c-roles__inner { max-width: 1100px; margin: 0 auto; }
        .c-roles__header { text-align: center; margin-bottom: 4rem; }
        .c-roles__list {
          display: flex; flex-direction: column; gap: 1px;
          border: 1.5px solid var(--c-border);
          border-radius: 20px; overflow: hidden;
          list-style: none; margin: 0; padding: 0;
        }
        .c-role-row {
          background: var(--c-bg);
          padding: 1.8rem 2.4rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 2rem; transition: background .2s ease; flex-wrap: wrap;
        }
        .c-role-row:hover { background: #111; }
        .c-role-row__left { display: flex; flex-direction: column; gap: .35rem; }
        .c-role-row__title {
          font-family: var(--ff-serif); font-size: 1.3rem; font-weight: 600;
          color: #fff; letter-spacing: -.01em;
        }
        .c-role-row__meta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .c-role-row__tag {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .18em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 100px;
          border: 1px solid var(--c-border); color: var(--c-muted);
        }
        .c-role-row__tag--open {
          background: rgba(249,115,22,.1);
          border-color: rgba(249,115,22,.3);
          color: var(--c-orange);
        }
        .c-role-row__apply {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: #fff;
          border: 1px solid rgba(249,115,22,.3);
          background: rgba(249,115,22,.07);
          backdrop-filter: blur(8px);
          padding: 10px 22px; border-radius: 100px; text-decoration: none;
          white-space: nowrap; flex-shrink: 0;
          transition: all .2s ease;
        }
        .c-role-row__apply:hover {
          background: var(--c-orange); color: #080808; border-color: var(--c-orange);
          transform: translateY(-1px);
        }

        .c-faq {
          background: var(--c-bg);
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
        }
        .c-faq__inner { max-width: 800px; margin: 0 auto; }
        .c-faq__header { text-align: center; margin-bottom: 3.5rem; }
        .c-faq__list { display: flex; flex-direction: column; gap: 0; }
        .c-faq__item {
          border-bottom: 1px solid var(--c-border);
          padding: 1.8rem 0;
        }
        .c-faq__item:first-child { border-top: 1px solid var(--c-border); }
        .c-faq__q {
          font-family: var(--ff-serif); font-size: 1.15rem; font-weight: 600;
          color: #fff; margin-bottom: .6rem; line-height: 1.4;
        }
        .c-faq__a {
          font-family: var(--ff-sans); font-size: .88rem; font-weight: 300;
          line-height: 1.75; color: var(--c-muted);
        }

        .c-cta {
          position: relative;
          background: var(--c-surface);
          padding: 7rem 1.5rem;
          text-align: center; overflow: hidden;
          border-top: 1px solid var(--c-border);
        }
        .c-cta__orb {
          position: absolute; width: 600px; height: 600px;
          border-radius: 50%; filter: blur(110px); opacity: .12;
          background: radial-gradient(circle, #f97316, transparent);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .c-cta__content { position: relative; z-index: 10; max-width: 640px; margin: 0 auto; }
        .c-cta__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 700; line-height: 1.05; letter-spacing: -.02em;
          color: #fff; margin-bottom: 1.2rem;
        }
        .c-cta__h2 em { font-style: italic; color: var(--c-orange); }
        .c-cta__sub {
          font-family: var(--ff-sans); font-size: .95rem; font-weight: 300;
          line-height: 1.7; color: var(--c-muted); margin-bottom: 2.4rem;
        }
        .c-cta__btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #fff;
          border: 1px solid rgba(249,115,22,.4);
          background: rgba(249,115,22,.1);
          backdrop-filter: blur(12px);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          transition: all .2s ease;
        }
        .c-cta__btn:hover {
          background: var(--c-orange); color: #080808; border-color: var(--c-orange);
          transform: translateY(-2px); box-shadow: 0 12px 36px rgba(249,115,22,.4);
        }

        /* ══ RESPONSIVE — mirrors contact/about breakpoints exactly ════════ */
        @media (max-width: 900px) {
          .cr-hero__left  { padding: 5rem 2.5rem 5rem 3rem; }
          .cr-hero__right { flex: 0 0 340px; }
          .cr-anim        { width: 260px; height: 340px; }
        }

        @media (max-width: 768px) {
          .cr-hero { flex-direction: column; min-height: auto; }
          .cr-hero__left {
            order: 2; flex: none; width: 100%;
            padding: 3rem 1.5rem 4rem;
            align-items: center; text-align: center;
          }
          .cr-hero__sub    { max-width: 100%; }
          .cr-hero__stats  { justify-content: center; }
          .cr-hero__right  {
            order: 1; flex: none; width: 100%;
            height: 300px; min-height: 300px;
          }
          .cr-hero__scroll { left:50%; transform:translateX(-50%); }
          .cr-card--1 { top: 4%; left: 2%; }
          .cr-card--2 { top: 4%; right: 2%; }
          .cr-card--3 { bottom: 6%; left: 2%; }
          .cr-card--4 { bottom: 6%; right: 2%; }
        }

        @media (max-width: 480px) {
          .cr-hero__stat { padding: 0 1.2rem 0 0; margin-right: 1.2rem; }
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

      {/* ══ HERO — two-column layout matching contact / about pages ════════ */}
      <section
        className="cr-hero"
        aria-labelledby="cr-hero-heading"
        id="careers-hero"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="cr-hero__grid" aria-hidden="true" />

        <div className="cr-corner cr-corner--tl" aria-hidden="true" />
        <div className="cr-corner cr-corner--tr" aria-hidden="true" />
        <div className="cr-corner cr-corner--bl" aria-hidden="true" />
        <div className="cr-corner cr-corner--br" aria-hidden="true" />

        {/* ── LEFT: hero copy ─────────────────────────────────────────────── */}
        <div className="cr-hero__left">

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
                <a href="/careers" itemProp="item" aria-current="page">
                  <span itemProp="name">Careers</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <p className="cr-hero__eyebrow" aria-hidden="true">
            <span className="cr-hero__dot" />
            Now Hiring · Bangalore &amp; Beyond
          </p>

          <h1 className="cr-hero__h1" id="cr-hero-heading" itemProp="name">
            Build your <em>future</em><br />
            with 99 Visual Solutions
          </h1>

          <div className="cr-hero__rule" aria-hidden="true" />

          <p className="cr-hero__sub" itemProp="description">
            Join a team of innovators, creators, and problem-solvers who shape
            the future of digital experiences together.
          </p>

          {/* Stats row */}
          <dl className="cr-hero__stats" aria-label="Company highlights">
            <div className="cr-hero__stat">
              <dt className="cr-hero__stat-label">Open Roles</dt>
              <dd className="cr-hero__stat-num">4</dd>
            </div>
            <div className="cr-hero__stat">
              <dt className="cr-hero__stat-label">Projects Done</dt>
              <dd className="cr-hero__stat-num">500+</dd>
            </div>
            <div className="cr-hero__stat">
              <dt className="cr-hero__stat-label">Years Active</dt>
              <dd className="cr-hero__stat-num">5+</dd>
            </div>
          </dl>

          <a
            href="#open-roles"
            className="cr-hero__cta"
            aria-label="View open positions at 99 Visual Solutions Bangalore"
          >
            View Open Positions
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

        {/* ── RIGHT: floating role cards animation ────────────────────────── */}
        <div className="cr-hero__right" aria-hidden="true">
          <div className="cr-anim">

            {/* Orbit rings */}
            <div className="cr-anim__ring" />
            <div className="cr-anim__ring cr-anim__ring--2" />

            {/* Central badge */}
            <div className="cr-anim__badge">
              <span className="cr-anim__badge-label">We&apos;re</span>
              <span className="cr-anim__badge-num">4</span>
              <span className="cr-anim__badge-sub">Roles Open</span>
            </div>

            {/* Floating role card 1 — Web Developer */}
            <div className="cr-card cr-card--1">
              <div
                className="cr-card__icon"
                style={{ background: "rgba(99,102,241,.15)", color: "#6366f1" }}
              >
                <FaLaptopCode />
              </div>
              <div>
                <div className="cr-card__title">Web Developer</div>
                <div className="cr-card__tag">Full-time · India</div>
              </div>
            </div>

            {/* Floating role card 2 — UI/UX Designer */}
            <div className="cr-card cr-card--2">
              <div
                className="cr-card__icon"
                style={{ background: "rgba(34,211,238,.12)", color: "#22d3ee" }}
              >
                <FaUsers />
              </div>
              <div>
                <div className="cr-card__title">UI/UX Designer</div>
                <div className="cr-card__tag">Full-time · India</div>
              </div>
            </div>

            {/* Floating role card 3 — 3D Artist */}
            <div className="cr-card cr-card--3">
              <div
                className="cr-card__icon"
                style={{ background: "rgba(251,191,36,.12)", color: "#fbbf24" }}
              >
                <FaLightbulb />
              </div>
              <div>
                <div className="cr-card__title">3D Visualization Artist</div>
                <div className="cr-card__tag">Full-time · India</div>
              </div>
            </div>

            {/* Floating role card 4 — Digital Marketing */}
            <div className="cr-card cr-card--4">
              <div
                className="cr-card__icon"
                style={{ background: "rgba(249,115,22,.15)", color: "#f97316" }}
              >
                <FaRocket />
              </div>
              <div>
                <div className="cr-card__title">Digital Marketing</div>
                <div className="cr-card__tag">Full-time · India</div>
              </div>
            </div>

          </div>
        </div>

        <a href="#open-roles" className="cr-hero__scroll" aria-label="Scroll to open positions">
          <div className="cr-hero__scroll-line" aria-hidden="true" />
          <span className="cr-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CAREER AREAS ════════════════════════════════════════════════════ */}
      <section id="careers" className="c-areas" aria-labelledby="c-areas-heading">
        <div className="c-areas__header">
          <span className="c-section-label">What we do</span>
          <h2 className="c-section-h2" id="c-areas-heading">Career Opportunities</h2>
          <p className="c-section-sub" style={{ margin: "0 auto" }}>
            Four disciplines, one shared mission — craft exceptional digital experiences
            that move the world forward.
          </p>
        </div>

        <div className="c-areas__grid" role="list">
          {careerAreas.map(({ icon: Icon, accent, label, jobTitle, desc }) => (
            <article className="c-area-card" key={label} role="listitem" aria-label={label}>
              <div className="c-area-card__icon-wrap" style={{ color: accent }} aria-hidden="true">
                <Icon />
              </div>
              <h3 className="c-area-card__title">{label}</h3>
              <div className="c-area-card__job">Role: {jobTitle}</div>
              <p className="c-area-card__desc">{desc}</p>
              <div
                className="c-area-card__line"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </section>

      {/* ══ WHY WORK WITH US ════════════════════════════════════════════════ */}
      <section className="c-why" aria-labelledby="c-why-heading">
        <div className="c-why__inner">
          <div className="c-why__layout">
            <div>
              <span className="c-section-label">Why us</span>
              <h2 className="c-section-h2" id="c-why-heading" style={{ marginBottom: "2.5rem" }}>
                Why build your career<br />at 99 Visual Solutions?
              </h2>
              <div className="c-why__items">
                {whyItems.map(({ num, title, desc }) => (
                  <div className="c-why__item" key={num}>
                    <span className="c-why__num" aria-hidden="true">{num}</span>
                    <div>
                      <h3 className="c-why__item-title">{title}</h3>
                      <p className="c-why__item-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <dl className="c-why__visual" aria-label="99 Visual Solutions — company highlights">
              <div className="c-why__stat">
                <dt className="c-why__stat-label">Years of expertise</dt>
                <dd className="c-why__stat-num">5+</dd>
              </div>
              <div className="c-why__divider" aria-hidden="true" />
              <div className="c-why__stat">
                <dt className="c-why__stat-label">Projects delivered</dt>
                <dd className="c-why__stat-num">500+</dd>
              </div>
              <div className="c-why__divider" aria-hidden="true" />
              <div className="c-why__stat">
                <dt className="c-why__stat-label">Team members globally</dt>
                <dd className="c-why__stat-num">50+</dd>
              </div>
              <div className="c-why__divider" aria-hidden="true" />
              <div className="c-why__stat">
                <dt className="c-why__stat-label">Core service domains</dt>
                <dd className="c-why__stat-num">6</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ══ OPEN ROLES ══════════════════════════════════════════════════════ */}
      <section id="open-roles" className="c-roles" aria-labelledby="c-roles-heading">
        <div className="c-roles__inner">
          <div className="c-roles__header">
            <span className="c-section-label">Open positions</span>
            <h2 className="c-section-h2" id="c-roles-heading">
              Current Job Openings in Bangalore
            </h2>
            <p className="c-section-sub" style={{ margin: "0 auto" }}>
              We&apos;re actively hiring across all disciplines. Don&apos;t see a perfect fit?
              Apply anyway — we&apos;re always interested in exceptional talent.
            </p>
          </div>

          <ul className="c-roles__list" aria-label="Open job listings at 99 Visual Solutions Bangalore">
            {openRoles.map(({ title, dept, type, loc }) => (
              <li className="c-role-row" key={title}>
                <div className="c-role-row__left">
                  <h3 className="c-role-row__title">{title}</h3>
                  <div className="c-role-row__meta">
                    <span className="c-role-row__tag c-role-row__tag--open">Now Hiring</span>
                    <span className="c-role-row__tag">{dept}</span>
                    <span className="c-role-row__tag">{type}</span>
                    <span className="c-role-row__tag">{loc}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="c-role-row__apply"
                  aria-label={`Apply for ${title} position at 99 Visual Solutions, ${loc}`}
                  title={`Apply for ${title} — ${dept} · ${type} · ${loc}`}
                >
                  Apply Now
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section className="c-faq" aria-labelledby="c-faq-heading">
        <div className="c-faq__inner">
          <div className="c-faq__header">
            <span className="c-section-label">Common questions</span>
            <h2 className="c-section-h2" id="c-faq-heading">Frequently Asked Questions</h2>
            <p className="c-section-sub" style={{ margin: "0 auto" }}>
              Everything you need to know about working at 99 Visual Solutions.
            </p>
          </div>

          <dl className="c-faq__list" itemScope itemType="https://schema.org/FAQPage">
            {faqItems.map(({ question, answer }) => (
              <div
                key={question}
                className="c-faq__item"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <dt className="c-faq__q" itemProp="name">{question}</dt>
                <dd
                  className="c-faq__a"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{answer}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="c-cta" aria-labelledby="c-cta-heading">
        <div className="c-cta__orb" aria-hidden="true" />
        <div className="c-cta__content">
          <h2 className="c-cta__h2" id="c-cta-heading">
            Ready to shape the<br /><em>future</em> together?
          </h2>
          <p className="c-cta__sub">
            Join a team that thrives on innovation, creativity, and delivering excellence across
            web development, design, and digital marketing. We invest in people who are curious,
            driven, and bold.
          </p>
          <Link
            href="/contact"
            className="c-cta__btn"
            aria-label="Apply for a job at 99 Visual Solutions Bangalore"
            title="Apply for a job at 99 Visual Solutions Bangalore"
          >
            Join Our Team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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