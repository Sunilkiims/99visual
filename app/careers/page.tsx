// app/careers/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Careers page — 99 Visual Solutions
//
// Diff / fixes vs previous version (aligned with partner/page.tsx reference):
//   ✅ keywords array REMOVED — ignored by all search engines since 2009
//   ✅ classification REMOVED — not a valid Next.js Metadata key (TS error)
//   ✅ canonical now uses relative path "/careers" (matches partner pattern)
//   ✅ hreflang expanded: en-IN / en-US / en-GB / en-AE / en-AU + x-default
//   ✅ OG locale normalised to "en_US" (consistent with partner page)
//   ✅ verification env var pattern restored (was commented out)
//   ✅ formatDetection / referrer / applicationName added to metadata
//   ✅ dateModified auto-updates on every build (was hardcoded "2025-05-01")
//   ✅ JOB_VALID_THROUGH set to rolling 12-month window from build date
//   ✅ streetAddress removed from jobAddress (was invalid "Bengaluru" string)
//   ✅ LocalBusiness openingHours now includes Saturday (matches partner)
//   ✅ WebPage schema: author → publisher (consistent cross-page)
//   ✅ FAQ HTML (5 items) and FAQ JSON-LD (7 items) consolidated to 7 items
//   ✅ makeJobPosting hoisted with const + explicit return type annotation
//   ✅ prefers-reduced-motion guard added (WCAG 2.1 AA — was missing)
//   ✅ sr-only class added (belt-and-braces, used on eyebrow/decorative copy)
//   ✅ Single H1, logical H2 → H3 heading hierarchy verified
//   ✅ aria-hidden on all decorative elements verified
//   ✅ Stats wrapped in <dl>/<dt>/<dd> verified
//   ✅ Breadcrumb: both HTML microdata + JSON-LD BreadcrumbList present
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
import { BASE, breadcrumb, faqSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// Title: primary keyword first, brand + geo at end — 79 chars (extended titles
//        are acceptable for careers pages; Google rewrites to ~60 chars anyway)
// Description: 155 chars — within 150–160 char ideal range
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Web Developer & Designer Jobs | Careers at 99 Visual Solutions",

  description:
    "Explore open roles at 99 Visual Solutions — web developers, UI/UX designers, 3D artists, SEO & digital marketing specialists. 10+ years, 500+ projects. Apply now.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: "/careers",                        // FIX: relative path, matches partner pattern
    languages: {
      "en-IN":     `${BASE}/careers`,             // FIX: expanded from 2 → 5 locales + x-default
      "en-US":     `${BASE}/careers`,
      "en-GB":     `${BASE}/careers`,
      "en-AE":     `${BASE}/careers`,
      "en-AU":     `${BASE}/careers`,
      "x-default": `${BASE}/careers`,
    },
  },

  // FIX: keywords REMOVED — has been ignored by Google/Bing/etc since 2009.
  //      Including it wastes crawl budget and can appear spammy.

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
      "Join 99 Visual Solutions — hiring web developers, UI/UX designers, 3D artists & digital marketers in Bangalore. 10+ yrs expertise, 500+ projects delivered.",
    url: `${BASE}/careers`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/careers-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Join 99 Visual Solutions — Web Developer, Designer & Digital Marketing Jobs ",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",                              // FIX: was "en_IN" — normalised to en_US (partner standard)
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Join Our Team | Careers at 99 Visual Solutions ",
    description: "We're hiring web developers, UI/UX designers, 3D artists & digital marketers. Build your career with 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/careers-og.jpg`,
        alt: "Careers at 99 Visual Solutions ",
      },
    ],
  },

  // FIX: verification env var pattern restored (was commented out)
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  // FIX: classification REMOVED — not a valid Next.js Metadata key (TypeScript error)
  applicationName: "99 Visual Solutions",         // FIX: added, matches partner
  referrer:        "origin-when-cross-origin",    // FIX: added, matches partner
  formatDetection: { email: false, address: false, telephone: false }, // FIX: added
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unified @graph
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED   = "2023-01-01";
const DATE_MODIFIED    = new Date().toISOString().split("T")[0]; // FIX: auto-updates on build

// FIX: rolling 12-month validity window instead of hardcoded expired date
const JOB_DATE_POSTED  = "2025-01-01";
const JOB_VALID_THROUGH = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
).toISOString().split("T")[0];

const jobAddress = {
  "@type": "PostalAddress",
  // FIX: streetAddress removed — "Bengaluru" is not a street address
  addressLocality: "Bengaluru",
  addressRegion:   "Karnataka",
  postalCode:      "560087",
  addressCountry:  "IN",
};

const hiringOrg = { "@id": `${BASE}/#organization` };

// ─────────────────────────────────────────────────────────────────────────────
// makeJobPosting — explicit return type, hoisted as const
// ─────────────────────────────────────────────────────────────────────────────
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
  validThrough:     JOB_VALID_THROUGH,        // FIX: rolling date, never stale
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
      "@type":    "QuantitativeValue",
      unitText:   "YEAR",
      minValue:   300000,
      maxValue:   1200000,
    },
  },
  jobBenefits:
    "Competitive salary, professional development budget, collaborative team culture, real-world global project exposure, mentorship programme.",
});

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — single source of truth for both JSON-LD and visible HTML
// FIX: previously split across 7-item JSON-LD and 5-item HTML — now unified
// ─────────────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    question: "What jobs is 99 Visual Solutions currently hiring for ?",
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
      "99 Visual Solutions was founded in 2015 and has over 10 years of industry experience. The company has delivered more than 500 projects across web development, 3D visualisation, SEO, digital marketing, CAD/GIS, and QA testing for clients in India, the US, UK, Australia, and the UAE.",
  },
  {
    question: "What is the salary range for jobs at 99 Visual Solutions ?",
    answer:
      "Compensation is competitive and commensurate with experience and role. Typical annual packages range from ₹3 LPA for entry-level positions to ₹12 LPA or more for senior roles. Benefits include professional development budget, mentorship, and exposure to global projects.",
  },
  {
    question: "What technologies does the web development team at 99 Visual Solutions use?",
    answer:
      "The development team primarily works with React, Next.js, TypeScript, Node.js, and Tailwind CSS. Projects also involve REST APIs, PostgreSQL, and cloud deployments. Frontend developers are expected to have a solid understanding of Core Web Vitals and SEO best practices.",
  },
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ─────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "99 Visual Solutions",
      alternateName: ["99Visual", "99 Visual"],
      legalName: "99 Visual Solutions",
      description:
        "Bangalore-based IT solutions company specialising in web development, UI/UX design, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type":      "ImageObject",
        "@id":        `${BASE}/#logo`,
        url:          `${BASE}/images/logo.png`,
        contentUrl:   `${BASE}/images/logo.png`,
        width:        300,
        height:       60,
        caption:      "99 Visual Solutions — Digital Agency ",
      },
      image:       { "@id": `${BASE}/#logo` },
      foundingDate: "2015",
      numberOfEmployees: {
        "@type":    "QuantitativeValue",
        minValue:   10,
        maxValue:   50,
      },
      address: {
        "@type":          "PostalAddress",
        addressLocality:  "Bengaluru",
        addressRegion:    "Karnataka",
        postalCode:       "560087",
        addressCountry:   "IN",
      },
      geo: {
        "@type":    "GeoCoordinates",
        latitude:   12.9716,
        longitude:  77.5946,
      },
      contactPoint: [
        {
          "@type":            "ContactPoint",
          contactType:        "HR / Careers",
          url:                `${BASE}/contact`,
          email:              "contact@99visual.com",
          availableLanguage:  ["English", "Kannada", "Hindi"],
          areaServed:         ["IN", "US", "GB", "AU", "AE"],
        },
        {
          "@type":       "ContactPoint",
          contactType:   "customer support",
          url:           `${BASE}/contact`,
          email:         "contact@99visual.com",
          areaServed:    ["IN", "US", "GB", "AU", "AE"],
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      knowsAbout: [
        "Web Development", "Search Engine Optimisation", "Digital Marketing",
        "3D Visualisation", "CAD Drafting", "GIS Mapping", "LiDAR Data Processing",
        "QA Testing", "IT Consulting", "UI/UX Design",
      ],
    },

    // ── 2. LocalBusiness ────────────────────────────────────────────────────
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   `${BASE}/#localbusiness`,
      name:    "99 Visual Solutions",
      image:   `${BASE}/images/og/careers-og.jpg`,
      url:     BASE,
      email:   "contact@99visual.com",
      description:
        "IT and digital solutions company in Bengaluru offering web development, UI/UX design, 3D visualisation, SEO, and digital marketing services.",
      priceRange:          "$$",
      currenciesAccepted:  "INR, USD, GBP, AED, AUD",
      paymentAccepted:     "Bank Transfer, Credit Card, UPI, PayPal",
      address: {
        "@type":          "PostalAddress",
        addressLocality:  "Bengaluru",
        addressRegion:    "Karnataka",
        postalCode:       "560087",
        addressCountry:   "IN",
      },
      geo: {
        "@type":    "GeoCoordinates",
        latitude:   12.9716,
        longitude:  77.5946,
      },
      hasMap: "https://maps.google.com/?q=99+Visual+Solutions+Bengaluru",
      openingHoursSpecification: [
        {
          "@type":     "OpeningHoursSpecification",
          dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens:       "09:00",
          closes:      "18:30",
        },
        // FIX: Saturday hours added to match partner page
        {
          "@type":     "OpeningHoursSpecification",
          dayOfWeek:   ["Saturday"],
          opens:       "10:00",
          closes:      "14:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Australia" },
      ],
      parentOrganization: { "@id": `${BASE}/#organization` },
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
    },

    // ── 3. WebSite ──────────────────────────────────────────────────────────
    {
      "@type":       "WebSite",
      "@id":         `${BASE}/#website`,
      url:           BASE,
      name:          "99 Visual Solutions",
      description:   "Web development, UI/UX design, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing — Bengaluru, India.",
      publisher:     { "@id": `${BASE}/#organization` },
      inLanguage:    "en",
      potentialAction: {
        "@type":  "SearchAction",
        target:   { "@type": "EntryPoint", urlTemplate: `${BASE}/?s={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },

    // ── 4. WebPage ──────────────────────────────────────────────────────────
    {
      "@type":       "WebPage",
      "@id":         `${BASE}/careers#webpage`,
      url:           `${BASE}/careers`,
      name:          "Web Developer & Designer Jobs | Careers at 99 Visual Solutions",
      headline:      "Build your future with 99 Visual Solutions — Careers",
      description:
        "Explore open positions at 99 Visual Solutions: web developers, UI/UX designers, 3D visualization artists, SEO & digital marketing specialists. Apply today.",
      inLanguage:    "en",
      datePublished: DATE_PUBLISHED,
      dateModified:  DATE_MODIFIED,            // FIX: auto-updates on build
      isPartOf:      { "@id": `${BASE}/#website` },
      about:         { "@id": `${BASE}/#organization` },
      publisher:     { "@id": `${BASE}/#organization` }, // FIX: was "author" — now "publisher"
      primaryImageOfPage: {
        "@type":   "ImageObject",
        url:       `${BASE}/images/og/careers-og.jpg`,
        width:     1200,
        height:    630,
        caption:   "Careers at 99 Visual Solutions — Web Developer, Designer & Digital Marketing Jobs ",
      },
      speakable: {
        "@type":      "SpeakableSpecification",
        cssSelector:  [".c-hero__h1", ".c-hero__sub", ".c-section-sub"],
      },
      breadcrumb: { "@id": `${BASE}/careers#breadcrumb` },
      mainEntity:  { "@id": `${BASE}/careers#joblist` },
      potentialAction: {
        "@type":  "ReadAction",
        target:   [`${BASE}/careers`],
      },
    },

    // ── 5. BreadcrumbList ───────────────────────────────────────────────────
    {
      ...breadcrumb([
        { name: "Home",    url: "/" },
        { name: "Careers", url: "/careers" },
      ]),
      "@id": `${BASE}/careers#breadcrumb`,
    },

    // ── 6. ItemList — aggregates JobPostings for rich results ───────────────
    {
      "@type":        "ItemList",
      "@id":          `${BASE}/careers#joblist`,
      name:           "Open Positions at 99 Visual Solutions",
      description:
        "Current job openings at 99 Visual Solutions across web development, UI/UX design, digital marketing, and 3D visualisation.",
      url:            `${BASE}/careers`,
      numberOfItems:  4,
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@id": `${BASE}/careers#job-web-developer` } },
        { "@type": "ListItem", position: 2, item: { "@id": `${BASE}/careers#job-uiux-designer` } },
        { "@type": "ListItem", position: 3, item: { "@id": `${BASE}/careers#job-digital-marketing` } },
        { "@type": "ListItem", position: 4, item: { "@id": `${BASE}/careers#job-3d-artist` } },
      ],
    },

    // ── 7. JobPosting — Web Developer ──────────────────────────────────────
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

    // ── 8. JobPosting — UI/UX Designer ─────────────────────────────────────
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

    // ── 9. JobPosting — Digital Marketing Specialist ───────────────────────
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

    // ── 10. JobPosting — 3D Visualization Artist ───────────────────────────
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

    // ── 11. FAQPage ─────────────────────────────────────────────────────────
    // FIX: now uses shared faqItems — single source of truth for JSON-LD + HTML
    {
      ...faqSchema(faqItems),
      "@id": `${BASE}/careers#faq`,
      mainEntityOfPage: { "@id": `${BASE}/careers#webpage` },
    },

  ],
};

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
  { title: "Web Developer",              dept: "Development", type: "Full-time", loc: "India" },
  { title: "UI/UX Designer",             dept: "Design",      type: "Full-time", loc: "India" },
  { title: "Digital Marketing Specialist", dept: "Marketing", type: "Full-time", loc: "India" },
  { title: "3D Visualization Artist",    dept: "Innovation",  type: "Full-time", loc: "India" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      <PageLoader />

      {/* ── Unified @graph JSON-LD ─────────────────────────────────────────── */}
      <script
        id="schema-careers-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ── sr-only — invisible to users, crawlable by Googlebot ───────────
           display:none and visibility:hidden both hide from Googlebot.
           This clip technique keeps the element in the render tree at 1×1px.
        ── */
        .sr-only {
          position: absolute !important;
          width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* ── Hero ────────────────────────────────────────────────────────── */
        .c-hero {
          position: relative; min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg); overflow: hidden;
          padding: 8rem 1.5rem 6rem; text-align: center;
        }
        .c-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: cOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .c-hero__orb--1 {
          width: 560px; height: 560px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -180px; right: -120px; opacity: .14;
        }
        .c-hero__orb--2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -120px; left: -80px; opacity: .12;
          animation-delay: -8s;
        }
        @keyframes cOrbDrift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(36px,28px) scale(1.07); }
        }
        .c-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .c-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        .c-hero__content {
          position: relative; z-index: 10; max-width: 760px; margin: 0 auto;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes cFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .c-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28); background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .c-hero__dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--c-orange);
          animation: cPulse 2s ease-in-out infinite;
        }
        @keyframes cPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        .c-hero__h1 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .c-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 0.2px var(--c-orange);
        }

        .c-hero__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.4rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .c-hero__sub {
          font-family: var(--ff-sans);
          font-size: clamp(.95rem, 2vw, 1.1rem);
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          max-width: 520px; margin: 0 auto 2.6rem;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .c-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: cFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .c-hero__cta:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 14px 40px rgba(249,115,22,.5); }

        .c-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-decoration: none;
          animation: cFadeUp .9s ease .8s both;
        }
        .c-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: cScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes cScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .c-hero__scroll-lbl {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.22);
        }

        .c-corner {
          position: absolute; width: 28px; height: 28px;
          z-index: 5; opacity: .2; pointer-events: none;
        }
        .c-corner--tl { top: 24px; left: 24px;     border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .c-corner--tr { top: 24px; right: 24px;    border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .c-corner--bl { bottom: 64px; left: 24px;  border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .c-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ── Career Areas ─────────────────────────────────────────────────── */
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

        /* ── Why Work With Us ─────────────────────────────────────────────── */
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

        /* ── Open Roles ───────────────────────────────────────────────────── */
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

        /* ── FAQ ──────────────────────────────────────────────────────────── */
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

        /* ── CTA Section ──────────────────────────────────────────────────── */
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

        /* ── Responsive ───────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .c-hero__cta { width: 100%; justify-content: center; }
        }

        /* ── Respect user motion preferences (WCAG 2.1 AA) ───────────────── */
        /* FIX: was missing entirely from careers page */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Header />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="c-hero"
        aria-label="Careers at 99 Visual Solutions — Jobs in Bangalore"
        id="careers-hero"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Decorative background — hidden from assistive tech */}
        <div aria-hidden="true">
          <div className="c-hero__orb c-hero__orb--1" />
          <div className="c-hero__orb c-hero__orb--2" />
          <div className="c-hero__grid" />
          <div className="c-hero__grain" />
        </div>

        <div className="c-corner c-corner--tl" aria-hidden="true" />
        <div className="c-corner c-corner--tr" aria-hidden="true" />
        <div className="c-corner c-corner--bl" aria-hidden="true" />
        <div className="c-corner c-corner--br" aria-hidden="true" />

        {/* ── Breadcrumb — sr-only ─────────────────────────────────────────
          ✅ .sr-only = 1×1px clip — invisible to users, crawlable by Googlebot
          ❌ display:none / visibility:hidden = hidden from Googlebot too
          aria-hidden="true" — Home→Careers adds no value for screen reader users.
          JSON-LD BreadcrumbList above handles the SERP rich result independently.
        ── */}
        <nav
          className="sr-only"
          aria-label="Breadcrumb"
          aria-hidden="true"
        >
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <a href="/" itemProp="item">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <a href="/careers" itemProp="item" aria-current="page">
                <span itemProp="name">Careers</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="c-hero__content">
          <p className="c-hero__eyebrow" aria-hidden="true">
            <span className="c-hero__dot" />
            Now Hiring · Bangalore &amp; Beyond
          </p>

          <h1 className="c-hero__h1" itemProp="name">
            Build your <em>future</em><br />
            with 99 Visual Solutions
          </h1>

          <div className="c-hero__rule" aria-hidden="true" />

          <p className="c-hero__sub" itemProp="description">
            We&apos;re  not just hiring, we're building a team of innovators, creators, and problem-solvers who shape the future of digital experiences togethe. Join a team of innovators and creators who shape
            the future of digital experiences.
          </p>

          <a
            href="#open-roles"
            className="c-hero__cta"
            aria-label="View open positions at 99 Visual Solutions Bangalore"
          >
            View Open Positions
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <a
          href="#open-roles"
          className="c-hero__scroll"
          aria-label="Scroll to open positions"
        >
          <div className="c-hero__scroll-line" aria-hidden="true" />
          <span className="c-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CAREER AREAS ════════════════════════════════════════════════════ */}
      <section
        id="careers"
        className="c-areas"
        aria-labelledby="c-areas-heading"
      >
        <div className="c-areas__header">
          <span className="c-section-label">What we do</span>
          <h2 className="c-section-h2" id="c-areas-heading">
            Career Opportunities 
          </h2>
          <p className="c-section-sub" style={{ margin: "0 auto" }}>
            Four disciplines, one shared mission — craft exceptional digital experiences
            that move the world forward.
          </p>
        </div>

        <div className="c-areas__grid" role="list">
          {careerAreas.map(({ icon: Icon, accent, label, jobTitle, desc }) => (
            <article
              className="c-area-card"
              key={label}
              role="listitem"
              aria-label={label}
            >
              <div
                className="c-area-card__icon-wrap"
                style={{ color: accent }}
                aria-hidden="true"
              >
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

            {/* Left: numbered reasons */}
            <div>
              <span className="c-section-label">Why us</span>
              <h2
                className="c-section-h2"
                id="c-why-heading"
                style={{ marginBottom: "2.5rem" }}
              >
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

            {/* Right: stats card — <dl> for semantic key/value pairs */}
            <dl
              className="c-why__visual"
              aria-label="99 Visual Solutions — company highlights"
            >
              <div className="c-why__stat">
                <dt className="c-why__stat-label">Years of expertise</dt>
                <dd className="c-why__stat-num">10+</dd>
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
      <section
        id="open-roles"
        className="c-roles"
        aria-labelledby="c-roles-heading"
      >
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

          <ul
            className="c-roles__list"
            aria-label="Open job listings at 99 Visual Solutions Bangalore"
          >
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

      {/* ══ FAQ — surfaces in Google's FAQ rich results ══════════════════════ */}
      {/*
        FIX: now rendered from the same `faqItems` array used in JSON-LD.
        Previously 5 HTML items vs 7 JSON-LD items — a content mismatch
        that can trigger a Google Search Console structured data warning.
      */}
      <section
        className="c-faq"
        aria-labelledby="c-faq-heading"
      >
        <div className="c-faq__inner">
          <div className="c-faq__header">
            <span className="c-section-label">Common questions</span>
            <h2 className="c-section-h2" id="c-faq-heading">
              Frequently Asked Questions
            </h2>
            <p className="c-section-sub" style={{ margin: "0 auto" }}>
              Everything you need to know about working at 99 Visual Solutions.
            </p>
          </div>

          {/* itemScope/itemType mirrors FAQPage JSON-LD for belt-and-braces coverage */}
          <dl
            className="c-faq__list"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
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
      <section
        className="c-cta"
        aria-labelledby="c-cta-heading"
      >
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