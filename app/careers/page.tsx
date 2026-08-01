// app/careers/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Careers page — 99 Visual Solutions
//
// THIS REVISION — brings Hero + CTA in line with the Services page design
// system (app/services/page.tsx), matching the treatment already applied to
// app/about/page.tsx and app/partner/page.tsx:
//   1. Hero rebuilt on the Services mechanism: full-bleed photo banner,
//      fixed 100vh/100dvh/100svh, single left-aligned column, corner
//      brackets, grain texture, docked ticker bar on the hero's bottom edge.
//   2. Recolored to the shared Space Grotesk / Inter / IBM Plex Mono system
//      with the one blue signal accent (--cr-blue); orange eyebrow retained.
//   3. CTA rebuilt to match Services' .sv-cta exactly (light surface, radial
//      orb, Space Grotesk heading), wired through <ConsultationCTA/> so the
//      "talk to us" intent behaves identically across Services/About/
//      Partner/Careers, plus a sticky mobile CTA bar. The "Apply Now" /
//      "View Open Positions" CTAs stay as real navigation (Link/anchor)
//      since those are job-application actions, not consultation requests.
//   4. Career Areas, Why Us, Open Roles, and FAQ sections (content + JSON-LD)
//      are UNCHANGED. .cr-hero__h1 / .cr-hero__sub class names are kept so
//      the existing `speakable.cssSelector` entries in careersPageNode keep
//      working.
//
//   Save your banner image to: /public/images/careers/careers-hero-banner.jpg
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import Header           from "@/app/components/header";
import Footer           from "@/app/components/footer";
import ScrollDown       from "@/app/components/scrolldown";

import ConsultationCTA  from "@/app/components/ConsultationCTA";
import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Careers at 99 Visual Solutions | Web Developer & Design Jobs",

  description:
    "Join 99 Visual Solutions in Bangalore — hiring web developers, UI/UX designers, 3D visualization artists & digital marketing specialists. 500+ projects delivered. Apply now.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/careers`,
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
    title: "Careers at 99 Visual Solutions | Web Developer & Design Jobs",
    description:
      "Join 99 Visual Solutions — hiring web developers, UI/UX designers, 3D artists & digital marketers in Bangalore. 500+ projects delivered, 5+ years expertise.",
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
    description: "We're hiring web developers, UI/UX designers, 3D artists & digital marketers in Bangalore. Build your career with 99 Visual Solutions.",
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
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED    = "2023-01-01T00:00:00+05:30";
const DATE_MODIFIED     = new Date().toISOString();
const JOB_DATE_POSTED   = new Date().toISOString();
const JOB_VALID_THROUGH = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
).toISOString();

// ─────────────────────────────────────────────────────────────────────────────
// JOB POSTING HELPER — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const jobAddress = {
  "@type":         "PostalAddress",
  streetAddress:   "Varthur",
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
// FAQ DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    question: "What jobs is 99 Visual Solutions currently hiring for?",
    answer:
      `99 Visual Solutions is actively hiring for four roles at its Bengaluru office: Web Developer, UI/UX Designer, Digital Marketing Specialist, and 3D Visualization Artist. All positions are full-time and based in Bangalore, India. You can apply directly through the contact page at 99visual.com/contact or by emailing ${CONTACT_EMAIL} with your resume and portfolio.`,
  },
  {
    question: "Is 99 Visual Solutions a good company for freshers?",
    answer:
      "Yes, 99 Visual Solutions offers structured mentorship, continuous learning opportunities, and hands-on exposure to real global projects from day one. It is an excellent environment for freshers and early-career professionals looking to grow quickly in web development, design, or digital marketing. Our team fosters a collaborative culture where new talent is given real responsibilities and room to grow.",
  },
  {
    question: "Does 99 Visual Solutions offer remote or hybrid work options?",
    answer:
      "Work arrangements vary by role and project requirements. Candidates interested in remote or hybrid options should apply at 99visual.com/contact and discuss preferences during the interview process. Our team is open to flexible arrangements for the right candidates, and we have experience managing distributed teams across time zones for international projects.",
  },
  {
    question: "How do I apply for a job at 99 Visual Solutions?",
    answer:
      `Visit 99visual.com/contact, fill in your details, and attach your resume or portfolio. Alternatively, email us directly at ${CONTACT_EMAIL} with the job title in the subject line. Our hiring team reviews all applications and reaches out about suitable openings within a few business days. We welcome applications from freshers and experienced professionals alike.`,
  },
  {
    question: "How much experience does 99 Visual Solutions have?",
    answer:
      "99 Visual Solutions was founded in 2020 and has over 5 years of industry experience. The company has successfully delivered more than 500 projects across web development, 3D visualisation, SEO, digital marketing, CAD/GIS, and QA testing for clients in India, the USA, UK, Australia, and the UAE. Our team brings deep domain expertise to every engagement.",
  },
  {
    question: "What is the salary range for jobs at 99 Visual Solutions?",
    answer:
      "Compensation is competitive and commensurate with experience and role. Typical annual packages range from ₹3 LPA for entry-level positions to ₹12 LPA or more for senior roles. Benefits include a professional development budget, mentorship programme, and exposure to global projects across India, USA, UK, UAE, and Australia. Final compensation is discussed during the interview process.",
  },
  {
    question: "What technologies does the web development team at 99 Visual Solutions use?",
    answer:
      "The development team primarily works with React, Next.js, TypeScript, Node.js, and Tailwind CSS for frontend development. Projects also involve REST APIs, PostgreSQL, and cloud deployments on AWS, Azure, and GCP. Frontend developers are expected to have a solid understanding of Core Web Vitals, SEO best practices, and responsive design principles.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const careersBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Careers", url: "/careers" },
]);

const careersFaqNode = {
  "@type":          "FAQPage",
  "@id":            `${BASE}/careers#faq`,
  mainEntityOfPage: { "@id": `${BASE}/careers#webpage` },
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type":        "Question",
    name:           question,
    acceptedAnswer: {
      "@type": "Answer",
      text:    answer,
    },
  })),
};

const careersPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE}/careers#webpage`,
  url:           `${BASE}/careers`,
  name:          "Careers at 99 Visual Solutions | Web Developer & Design Jobs",
  description:
    "Explore open positions at 99 Visual Solutions: web developers, UI/UX designers, 3D visualization artists, SEO & digital marketing specialists. Apply today in Bangalore.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    "@id":     `${BASE}/careers#primaryimage`,
    url:       `${BASE}/images/og/careers-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Careers at 99 Visual Solutions — Web Developer, Designer & Digital Marketing Jobs",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".cr-hero__h1", ".cr-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/careers#breadcrumb` },
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
    `Join 99 Visual Solutions in Bengaluru as a Web Developer. Build scalable, performant web applications and platforms for global clients using modern React and Next.js stacks. Collaborate with designers, QA engineers, and project managers to deliver pixel-perfect, accessible digital products. To apply, visit ${BASE}/contact or email ${CONTACT_EMAIL}.`,
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
    `99 Visual Solutions is hiring a UI/UX Designer in Bengaluru. Create intuitive, human-centred designs that elevate every user touchpoint and brand interaction. Own the full design process — from research and wireframes through to high-fidelity prototypes and design system maintenance. To apply, visit ${BASE}/contact or email ${CONTACT_EMAIL}.`,
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
    `99 Visual Solutions is looking for a Digital Marketing Specialist in Bengaluru. Drive measurable growth through SEO, paid campaigns (Google Ads, Meta Ads), content strategy, and data-backed creative execution. Own performance metrics and report directly to leadership. To apply, visit ${BASE}/contact or email ${CONTACT_EMAIL}.`,
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
    `99 Visual Solutions is hiring a 3D Visualization Artist in Bengaluru. Create photorealistic 3D renders, animations, and interactive experiences for architecture, product, and GIS projects. Work alongside our CAD/GIS and development teams on next-generation visualisation pipelines. To apply, visit ${BASE}/contact or email ${CONTACT_EMAIL}.`,
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

// Illustrative ticker, mirrors the mechanism on Services/About/Partner.
const pipeline = [
  { cmd: "open_roles",       out: "4 hiring now" },
  { cmd: "web_developer",    out: "react · next.js" },
  { cmd: "ui_ux_designer",   out: "figma · systems" },
  { cmd: "3d_artist",        out: "3ds max · blender" },
  { cmd: "marketing_lead",   out: "seo · paid media" },
  { cmd: "team_culture",     out: "mentorship built-in" },
];

const stats = [
  { value: "4",    label: "Open Roles" },
  { value: "500+", label: "Projects Delivered" },
  { value: "5+",   label: "Years Active" },
  { value: "50+",  label: "Team Members" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      <script
        id="schema-careers-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cr-page{
          --cr-ink:#12141A; --cr-muted:#5B6172; --cr-paper:#F5F6F8; --cr-surface:#FFFFFF;
          --cr-line:#E4E6EC; --cr-blue:#2E5CFF; --cr-green:#37D67A; --cr-orange:#F97316;
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-indigo:  #6366f1;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        .cr-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO — same mechanism as Services/About/Partner ═══════════════ */
        .cr-hero {
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.78) 38%, rgba(0,0,0,.42) 64%, rgba(0,0,0,.18) 100%),
            linear-gradient(180deg, rgba(0,0,0,.20) 0%, rgba(0,0,0,.10) 40%, rgba(0,0,0,.55) 100%),
            url('/images/careers/careers-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#000000;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .cr-hero { height: 100svh; } }
        @supports (height: 100dvh) { .cr-hero { height: 100dvh; } }
        @media(max-width:960px){
          .cr-hero {
            background:
              linear-gradient(180deg, rgba(0,0,0,.60) 0%, rgba(0,0,0,.38) 38%, rgba(0,0,0,.82) 100%),
              linear-gradient(0deg, rgba(0,0,0,.30), rgba(0,0,0,.30)),
              url('/images/careers/careers-hero-banner.jpg') center center / cover no-repeat;
            background-color:#000000;
          }
        }
        .cr-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .cr-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .cr-corner--tl{top:28px;left:28px;border-top:1px solid var(--cr-blue);border-left:1px solid var(--cr-blue);}
        .cr-corner--tr{top:28px;right:28px;border-top:1px solid var(--cr-blue);border-right:1px solid var(--cr-blue);}
        .cr-corner--bl{bottom:120px;left:28px;border-bottom:1px solid var(--cr-blue);border-left:1px solid var(--cr-blue);}
        .cr-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--cr-blue);border-right:1px solid var(--cr-blue);}

        .cr-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .cr-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .cr-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .cr-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .cr-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .cr-hero__eyebrow{ margin-bottom:1.1rem; }
          .cr-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .cr-hero__rule{ margin-bottom:.8rem; }
          .cr-hero__sub{ margin-bottom:1.2rem; }
        }

        .cr-hero__content{animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes crFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.cr-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .cr-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--cr-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .cr-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--cr-orange);animation:crPulse 2s ease-in-out infinite;}
        @keyframes crPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .cr-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .cr-hero__h1 em{font-style:normal;color:var(--cr-blue);}
        .cr-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--cr-blue),transparent);margin:0 0 1.4rem;animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.cr-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--cr-blue),transparent);}}
        .cr-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.cr-hero__sub{margin:0 auto 2.6rem;}}
        .cr-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:crFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.cr-hero__actions{justify-content:center;}}
        .cr-hero__btn--primary{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--cr-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .cr-hero__btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .cr-hero__btn--ghost{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;border-radius:10px;text-decoration:none;transition:background .2s ease,border-color .2s ease;border:none;cursor:pointer;}
        .cr-hero__btn--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}

        .cr-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 45%, rgba(0,0,0,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .cr-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .cr-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:crScroll 34s linear infinite;}
        .cr-hero__ticker-bar:hover .cr-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .cr-ticker__track{ animation-duration:22s; } }
        @keyframes crScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .cr-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .cr-ticker__item b{color:rgba(255,255,255,.45);}
        .cr-ticker__pass{color:var(--cr-green);}
        @media(max-height:520px){ .cr-hero__ticker-bar{ padding-top:.75rem; } }

        /* ══ STATS STRIP ═════════════════════════════════════════════════ */
        .cr-stats{background:var(--cr-surface);border-top:1px solid var(--cr-line);border-bottom:1px solid var(--cr-line);padding:2.8rem 1.5rem;}
        .cr-stats__inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:640px){.cr-stats__inner{grid-template-columns:repeat(2,1fr);}}
        .cr-stat__val{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.9rem,3.4vw,2.4rem);font-weight:700;line-height:1;color:var(--cr-ink);margin-bottom:.3rem;}
        .cr-stat__val span{color:var(--cr-blue);}
        .cr-stat__lbl{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:400;color:var(--cr-muted);}

        /* ══ EXISTING DARK CONTENT SECTIONS — unchanged ════════════════════ */
        .c-areas{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .c-section-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:.8rem;display:block;}
        .c-section-h2{font-family:var(--ff-serif);font-size:clamp(2rem,4vw,3.2rem);font-weight:700;line-height:1.1;letter-spacing:-.015em;color:#fff;margin-bottom:1rem;}
        .c-section-sub{font-family:var(--ff-sans);font-size:.95rem;font-weight:300;line-height:1.7;color:var(--c-muted);max-width:480px;}
        .c-areas__header{text-align:center;margin:0 auto 4rem;}
        .c-areas__grid{display:grid;gap:1.5px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));max-width:1100px;margin:0 auto;border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;}
        .c-area-card{position:relative;background:var(--c-bg);padding:2.4rem 2rem;transition:background .25s ease;}
        .c-area-card:hover{background:#111;}
        .c-area-card__icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem;font-size:1.2rem;background:rgba(255,255,255,.04);border:1px solid var(--c-border);transition:transform .2s ease;}
        .c-area-card:hover .c-area-card__icon-wrap{transform:scale(1.1);}
        .c-area-card__title{font-family:var(--ff-serif);font-size:1.35rem;font-weight:600;color:#fff;margin-bottom:.4rem;letter-spacing:-.01em;}
        .c-area-card__job{font-family:var(--ff-sans);font-size:.75rem;font-weight:500;color:var(--c-orange);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.6rem;opacity:.7;}
        .c-area-card__desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .c-area-card__line{position:absolute;bottom:0;left:0;right:0;height:2px;opacity:0;transition:opacity .25s ease;}
        .c-area-card:hover .c-area-card__line{opacity:1;}

        .c-why{background:var(--c-bg);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .c-why__inner{max-width:1100px;margin:0 auto;}
        .c-why__layout{display:grid;gap:4rem;grid-template-columns:1fr 1fr;align-items:start;}
        @media(max-width:768px){.c-why__layout{grid-template-columns:1fr;}}
        .c-why__items{display:flex;flex-direction:column;gap:0;}
        .c-why__item{padding:2rem 0;border-bottom:1px solid var(--c-border);display:flex;gap:1.5rem;align-items:flex-start;}
        .c-why__item:first-child{border-top:1px solid var(--c-border);}
        .c-why__num{font-family:var(--ff-serif);font-size:1.1rem;font-weight:600;color:var(--c-orange);opacity:.6;flex-shrink:0;padding-top:2px;}
        .c-why__item-title{font-family:var(--ff-serif);font-size:1.25rem;font-weight:600;color:#fff;margin-bottom:.4rem;}
        .c-why__item-desc{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.7;color:var(--c-muted);}
        .c-why__visual{position:relative;background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(249,115,22,.02));border:1px solid rgba(249,115,22,.15);border-radius:20px;padding:2.5rem;display:flex;flex-direction:column;gap:1.2rem;}
        .c-why__stat{display:flex;flex-direction:column;}
        .c-why__stat-num{font-family:var(--ff-serif);font-size:clamp(2.2rem,4vw,3rem);font-weight:700;color:var(--c-orange);line-height:1;margin-bottom:4px;display:block;}
        .c-why__stat-label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--c-muted);display:block;}
        .c-why__divider{height:1px;background:var(--c-border);}

        .c-roles{background:var(--c-surface);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .c-roles__inner{max-width:1100px;margin:0 auto;}
        .c-roles__header{text-align:center;margin-bottom:4rem;}
        .c-roles__list{display:flex;flex-direction:column;gap:1px;border:1.5px solid var(--c-border);border-radius:20px;overflow:hidden;list-style:none;margin:0;padding:0;}
        .c-role-row{background:var(--c-bg);padding:1.8rem 2.4rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;transition:background .2s ease;flex-wrap:wrap;}
        .c-role-row:hover{background:#111;}
        .c-role-row__left{display:flex;flex-direction:column;gap:.35rem;}
        .c-role-row__title{font-family:var(--ff-serif);font-size:1.3rem;font-weight:600;color:#fff;letter-spacing:-.01em;}
        .c-role-row__meta{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
        .c-role-row__tag{font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:4px 10px;border-radius:100px;border:1px solid var(--c-border);color:var(--c-muted);}
        .c-role-row__tag--open{background:rgba(249,115,22,.1);border-color:rgba(249,115,22,.3);color:var(--c-orange);}
        .c-role-row__apply{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-sans);font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#fff;border:1px solid rgba(249,115,22,.3);background:rgba(249,115,22,.07);backdrop-filter:blur(8px);padding:10px 22px;border-radius:100px;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:all .2s ease;}
        .c-role-row__apply:hover{background:var(--c-orange);color:#080808;border-color:var(--c-orange);transform:translateY(-1px);}

        /* ══ FAQ — unchanged ════════════════════════════════════════════════ */
        .c-faq{background:var(--c-bg);padding:6rem 1.5rem;border-top:1px solid var(--c-border);}
        .c-faq__inner{max-width:800px;margin:0 auto;}
        .c-faq__header{text-align:center;margin-bottom:3.5rem;}
        .cr-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--c-border);border-radius:16px;overflow:hidden;}
        .cr-faq__item{border-bottom:1px solid var(--c-border);background:#0f0f0f;transition:background .2s ease;}
        .cr-faq__item:last-child{border-bottom:none;}
        .cr-faq__item[open]{background:#141414;}
        .cr-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .cr-faq__q::-webkit-details-marker{display:none;}.cr-faq__q::marker{display:none;}
        .cr-faq__q-text{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:rgba(255,255,255,.85);line-height:1.35;flex:1;transition:color .2s ease;}
        .cr-faq__item[open] .cr-faq__q-text,.cr-faq__q:hover .cr-faq__q-text{color:#fff;}
        .cr-faq__chevron{flex-shrink:0;color:var(--c-orange);opacity:.7;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .cr-faq__item[open] .cr-faq__chevron{transform:rotate(180deg);opacity:1;}
        .cr-faq__a{padding:0 1.75rem 1.5rem;animation:crFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes crFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .cr-faq__a p{font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--c-muted);margin:0;}

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .cr-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--cr-line);}
        @media(max-width:760px){.cr-sticky-cta{display:flex;justify-content:center;}}
        .cr-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--cr-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;display:block;}

        /* ══ CTA STRIP — matches Services .sv-cta exactly ══════════════ */
        .cr-cta{background:var(--cr-surface);border-top:1px solid var(--cr-line);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .cr-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,var(--cr-blue),transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .cr-cta__inner{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .cr-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--cr-blue);margin-bottom:1.2rem;display:block;}
        .cr-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--cr-ink);margin:0 0 1rem;}
        .cr-cta__h2 em{font-style:normal;color:var(--cr-blue);}
        .cr-cta__sub{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:var(--cr-muted);margin-bottom:2.6rem;}
        .cr-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--cr-ink);padding:14px 32px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .cr-cta__btn:hover{background:var(--cr-blue);transform:translateY(-2px);}

        @media(max-width:480px){.cr-hero__actions{flex-direction:column;align-items:stretch;}.cr-hero__btn--primary,.cr-hero__btn--ghost{justify-content:center;}}
        @media(prefers-reduced-motion:reduce){.cr-page *,.cr-page *::before,.cr-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      <div className="cr-page">
        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <section className="cr-hero" aria-labelledby="cr-hero-heading" id="careers-hero">
          <div aria-hidden="true">
            <div className="cr-hero__grain" />
          </div>
          <div className="cr-corner cr-corner--tl" aria-hidden="true" />
          <div className="cr-corner cr-corner--tr" aria-hidden="true" />
          <div className="cr-corner cr-corner--bl" aria-hidden="true" />
          <div className="cr-corner cr-corner--br" aria-hidden="true" />

          <nav className="cr-sr-only" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/careers" aria-current="page">Careers</a></li>
            </ol>
          </nav>

          <div className="cr-hero__inner">
            <div className="cr-hero__content">
              <div className="cr-hero__eyebrow" aria-hidden="true">
                <span className="cr-hero__dot" />
                Now Hiring · Bangalore &amp; Beyond
              </div>
              <h1 className="cr-hero__h1" id="cr-hero-heading">
                Create Technology That <em>Makes an Impact</em>
              </h1>
              <div className="cr-hero__rule" aria-hidden="true" />
              <p className="cr-hero__sub">
                Join a team of innovators, creators, and problem-solvers who
                shape the future of digital experiences together.
              </p>
              <div className="cr-hero__actions">
                <a href="#open-roles" className="cr-hero__btn--primary" aria-label="View open positions at 99 Visual Solutions Bangalore">
                  View Open Positions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <ConsultationCTA className="cr-hero__btn--ghost" ariaLabel="Ask 99 Visual Solutions about working here">
                  Ask Us Anything
                </ConsultationCTA>
              </div>
            </div>
          </div>

          <div className="cr-hero__ticker-bar" aria-hidden="true">
            <div className="cr-ticker">
              <div className="cr-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="cr-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="cr-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS STRIP ═════════════════════════════════════════════════ */}
        <div className="cr-stats" aria-label="Company statistics">
          <div className="cr-stats__inner">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="cr-stat__val">
                  {s.value.includes("+")
                    ? <>{s.value.replace("+", "")}<span>+</span></>
                    : s.value}
                </div>
                <div className="cr-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CAREER AREAS — unchanged ════════════════════════════════════ */}
        <section id="careers" className="c-areas" aria-labelledby="c-areas-heading">
          <div className="c-areas__header">
            <span className="c-section-label">What we do</span>
            <h2 className="c-section-h2" id="c-areas-heading">Career Opportunities</h2>
            <p className="c-section-sub" style={{ margin:"0 auto" }}>
              Four disciplines, one shared mission — craft exceptional digital experiences
              that move the world forward.
            </p>
          </div>
          <div className="c-areas__grid" role="list">
            {careerAreas.map(({ icon: Icon, accent, label, jobTitle, desc }) => (
              <article className="c-area-card" key={label} role="listitem" aria-label={label}>
                <div className="c-area-card__icon-wrap" style={{ color: accent }} aria-hidden="true"><Icon /></div>
                <h3 className="c-area-card__title">{label}</h3>
                <div className="c-area-card__job">Role: {jobTitle}</div>
                <p className="c-area-card__desc">{desc}</p>
                <div className="c-area-card__line" style={{ background:`linear-gradient(90deg, ${accent}, transparent)` }} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        {/* ══ WHY WORK WITH US — unchanged ═════════════════════════════════ */}
        <section className="c-why" aria-labelledby="c-why-heading">
          <div className="c-why__inner">
            <div className="c-why__layout">
              <div>
                <span className="c-section-label">Why us</span>
                <h2 className="c-section-h2" id="c-why-heading" style={{ marginBottom:"2.5rem" }}>
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
                <div className="c-why__stat"><dt className="c-why__stat-label">Years of expertise</dt><dd className="c-why__stat-num">5+</dd></div>
                <div className="c-why__divider" aria-hidden="true" />
                <div className="c-why__stat"><dt className="c-why__stat-label">Projects delivered</dt><dd className="c-why__stat-num">500+</dd></div>
                <div className="c-why__divider" aria-hidden="true" />
                <div className="c-why__stat"><dt className="c-why__stat-label">Team members globally</dt><dd className="c-why__stat-num">50+</dd></div>
                <div className="c-why__divider" aria-hidden="true" />
                <div className="c-why__stat"><dt className="c-why__stat-label">Core service domains</dt><dd className="c-why__stat-num">6</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* ══ OPEN ROLES — unchanged ═══════════════════════════════════════ */}
        <section id="open-roles" className="c-roles" aria-labelledby="c-roles-heading">
          <div className="c-roles__inner">
            <div className="c-roles__header">
              <span className="c-section-label">Open positions</span>
              <h2 className="c-section-h2" id="c-roles-heading">Current Job Openings in Bangalore</h2>
              <p className="c-section-sub" style={{ margin:"0 auto" }}>
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
                  <Link href="/contact" className="c-role-row__apply" aria-label={`Apply for ${title} position at 99 Visual Solutions, ${loc}`}>
                    Apply Now
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ FAQ — unchanged, JSON-LD only, no microdata ══════════════════ */}
        <section className="c-faq" aria-labelledby="c-faq-heading">
          <div className="c-faq__inner">
            <div className="c-faq__header">
              <span className="c-section-label">Common questions</span>
              <h2 className="c-section-h2" id="c-faq-heading">Frequently Asked Questions</h2>
              <p className="c-section-sub" style={{ margin:"0 auto" }}>
                Everything you need to know about working at 99 Visual Solutions.
              </p>
            </div>

            <div className="cr-faq__list">
              {faqItems.map(({ question, answer }, i) => (
                <details key={i} className="cr-faq__item">
                  <summary className="cr-faq__q">
                    <span className="cr-faq__q-text">{question}</span>
                    <span className="cr-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M4.5 6.75L9 11.25L13.5 6.75"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="cr-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
        <section className="cr-cta" aria-labelledby="cr-cta-heading">
          <div className="cr-cta__orb" aria-hidden="true" />
          <div className="cr-cta__inner">
            <span className="cr-cta__eyebrow">Join Our Team</span>
            <h2 className="cr-cta__h2" id="cr-cta-heading">
              Ready to shape the<br /><em>future together?</em>
            </h2>
            <p className="cr-cta__sub">
              Join a team that thrives on innovation, creativity, and delivering
              excellence across web development, design, and digital marketing.
              We invest in people who are curious, driven, and bold.
            </p>
            <Link href="/contact" className="cr-cta__btn" aria-label="Apply for a job at 99 Visual Solutions Bangalore">
              Join Our Team
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═══════════════════════════════════════════ */}
        <div className="cr-sticky-cta">
          <Link href="/contact" className="cr-sticky-cta__btn">Apply Now</Link>
        </div>
      </div>

      <Footer />
      <ScrollDown />
      </>
  );
}
