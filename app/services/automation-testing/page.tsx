// app/services/automation-testing/page.tsx
//
// QA, Software Testing & Test Automation service page.
//
// REBUILD NOTES (this revision):
//   - Repositioned from an "Agentic AI"-first pitch to a Software Quality
//     Engineering & Test Automation partner: human expertise + automation +
//     continuous quality engineering, with AI/LLM application testing as one
//     clearly-scoped differentiator rather than a label on every service.
//   - Removed unverifiable/fabricated claims: the "up to 70% faster" stat and
//     the hero ticker's invented pass counts / latency numbers / "0 critical
//     CVEs" have been replaced with non-quantitative, non-misleading copy.
//   - Added: "What We Test" section, a framework-choice section (Playwright /
//     Cypress / Selenium / API tooling / CI-CD), a 10-step QA & automation
//     lifecycle, an industries/use-case section framed as supported testing
//     scenarios (not client claims), an expanded FAQ (12 items, schema-
//     matched), and a "Related Services & Reading" internal-linking section.
//   - Service clusters expanded from 6 to 8 distinct offerings so Functional
//     Testing, API Testing, Mobile Testing and Accessibility Testing each
//     get their own card instead of being folded into others.
//   - Hero, header/footer, breadcrumb markup, CSS design tokens (qa-* custom
//     properties), card/section visual language, ConsultationCTA wiring and
//     JSON-LD plumbing (buildGraph/orgSchema/etc.) are all reused as-is from
//     the existing 99 Visual design system — only content, structure and
//     claims changed.
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";

import {
  FaBug, FaCogs, FaChartLine, FaRocket, FaShieldAlt, FaTools,
  FaMobileAlt, FaUniversalAccess, FaPlug, FaRobot, FaCloud,
  FaSitemap, FaBuilding, FaCode, FaCheckCircle,
} from "react-icons/fa";

import type { Metadata } from "next";
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

const CLEAN_BASE = BASE.replace(/\/+$/, "");
const PAGE_PATH  = "/services/automation-testing";
const PAGE_URL   = `${CLEAN_BASE}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "QA & Software Test Automation Services | 99 Visual",

  description:
    "Software QA, test automation and quality engineering services — functional, API, performance, mobile, accessibility and security testing, plus AI/LLM application testing, integrated into your CI/CD pipeline.",

  metadataBase: new URL(CLEAN_BASE),

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "QA & Software Test Automation Services | 99 Visual Solutions",
    description:
      "Functional testing, test automation engineering, API testing, performance testing, mobile & accessibility testing, security testing, and AI/LLM application testing — built into your CI/CD pipeline.",
    url: PAGE_URL,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${CLEAN_BASE}/images/services/testing-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "QA & Software Test Automation Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "QA & Software Test Automation Services | 99 Visual Solutions",
    description:
      "Functional, API, performance, mobile, accessibility and security testing, plus AI/LLM application testing — integrated into your CI/CD pipeline.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${CLEAN_BASE}/images/services/testing-og.jpg`,
        alt: "QA & Software Test Automation Services by 99 Visual Solutions",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  authors:         [{ name: "99 Visual Solutions", url: CLEAN_BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = "2026-09-24"; // <- Update this when content changes (must match app/sitemap.ts lastModified for this route)

const FAQ_ITEMS = [
  {
    question: "What is QA automation testing?",
    answer:
      "QA automation testing uses scripted test suites — built with tools like Playwright, Cypress or Selenium — to execute test cases automatically instead of a person clicking through the application by hand. It's best suited to test cases you run repeatedly (regression suites, smoke tests, cross-browser checks), while exploratory and usability testing usually stay manual, where human judgment matters more.",
  },
  {
    question: "What's the difference between QA testing and test automation?",
    answer:
      "QA (quality assurance) is the broader discipline: test strategy, test case design, risk assessment, exploratory testing, and release sign-off. Test automation is one tool within QA — the practice of scripting repeatable checks so they run on every build without manual effort. A mature QA practice combines both: automation for repeatable coverage, and skilled human testers for judgment calls automation can't make.",
  },
  {
    question: "How does test automation improve software quality?",
    answer:
      "Automation lets you re-run your full regression suite on every commit instead of only before a release, which means regressions get caught within minutes of being introduced rather than weeks later. It also frees your QA engineers from repetitive manual checks so they can spend more time on exploratory testing, edge cases, and new feature coverage — the work automation can't do for you.",
  },
  {
    question: "Which automation framework should I choose — Playwright, Cypress or Selenium?",
    answer:
      "It depends on your application and constraints. Playwright is a strong default for modern web apps needing fast, reliable cross-browser and cross-tab automation. Cypress is a good fit for teams that want tight feedback loops during development and heavy component-level testing, though its cross-browser and multi-tab support is more limited. Selenium remains the right call for legacy browser matrices, existing Selenium Grid infrastructure, or when you need language bindings outside the JavaScript ecosystem. We assess your stack, browser coverage requirements and CI/CD setup before recommending one.",
  },
  {
    question: "Can you automate regression testing?",
    answer:
      "Yes — regression automation is one of the highest-value places to start, since it's the test suite you're already re-running manually before every release. We identify which regression cases are worth automating (stable, high-value, frequently-run) versus which are better left manual, then build and maintain the automated suite.",
  },
  {
    question: "Do you provide API testing?",
    answer:
      "Yes. We test REST and GraphQL APIs for functional correctness, integration behaviour, contract adherence, and negative/edge-case handling — independently of the UI, so issues get caught before they surface in the front end. API tests typically run earlier and faster in the pipeline than UI automation.",
  },
  {
    question: "Do you provide mobile application testing?",
    answer:
      "Yes. We test Android and iOS applications, including real-device testing, mobile browser testing, and responsive-layout validation, alongside functional and regression coverage for mobile-specific flows.",
  },
  {
    question: "Can QA automation integrate with CI/CD?",
    answer:
      "Yes — this is central to how we build automation, not an afterthought. We wire automated suites into pipelines like GitHub Actions, GitLab CI or Jenkins so tests run automatically on pull requests and merges, and can act as quality gates that block a deployment when critical tests fail.",
  },
  {
    question: "Can you test AI and LLM applications?",
    answer:
      "Yes. AI application testing is different from traditional software testing because outputs are non-deterministic. We test prompt behaviour, evaluate response quality against defined criteria, run adversarial and prompt-injection checks, and build regression evaluation suites that flag when a model or prompt change degrades output quality — alongside standard integration testing of the surrounding application and APIs.",
  },
  {
    question: "What is self-healing test automation?",
    answer:
      "Self-healing automation refers to test scripts that can automatically adapt when a UI selector changes — for example, when an element's ID or class name shifts after a front-end update — instead of failing outright and requiring a manual fix. It reduces maintenance overhead on fast-moving front ends, though it isn't a substitute for well-structured, maintainable test architecture; we use it as one input, not the whole strategy.",
  },
  {
    question: "How early should QA start in the software development lifecycle?",
    answer:
      "As early as requirements and design — this is what \"shift-left\" testing means in practice. Reviewing requirements and designs for testability, writing test cases alongside development rather than after it, and running automated checks on every commit all catch issues while they're cheap to fix, rather than after they've reached staging or production.",
  },
  {
    question: "Can you work with our existing QA team?",
    answer:
      `Yes. We regularly work alongside in-house QA teams — extending existing automation frameworks, building out coverage in areas your team hasn't had bandwidth for, or handling a specific testing discipline (performance, security, mobile) that complements what your team already does. Tell us your current setup at ${CONTACT_EMAIL} and we'll scope how we fit in rather than duplicate effort.`,
  },
];

const qaBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                    url: "/" },
  { name: "Services",                url: "/services" },
  { name: "QA & Automation Testing", url: PAGE_PATH },
]);

const qaFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${PAGE_URL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_URL}#webpage` },
};

const qaServiceNode = {
  "@type":     "Service",
  "@id":       `${PAGE_URL}#service`,
  name:        "QA & Software Test Automation",
  description: "Software quality engineering and test automation: functional testing, test automation engineering, API testing, performance testing, mobile testing, accessibility testing, security testing, and AI/LLM application testing, integrated into CI/CD.",
  provider:    { "@id": `${CLEAN_BASE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         PAGE_URL,
  serviceType: "QA & Software Testing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "QA & Automation Testing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Functional & Regression Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Test Automation Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "API & Contract Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Application Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Accessibility Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Application Security Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & LLM Application Testing" } },
    ],
  },
};

const qaPageNode = {
  "@type":       "WebPage",
  "@id":         `${PAGE_URL}#webpage`,
  url:           PAGE_URL,
  name:          "QA & Software Test Automation Services | 99 Visual Solutions",
  description:   "Software quality engineering and test automation services — functional, API, performance, mobile, accessibility and security testing, plus AI/LLM application testing, integrated into CI/CD.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${CLEAN_BASE}/#website` },
  about:         { "@id": `${CLEAN_BASE}/#organization` },
  publisher:     { "@id": `${CLEAN_BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${CLEAN_BASE}/images/services/testing-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "QA & Software Test Automation Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".qa-hero__h1", ".qa-hero__sub"],
  },
  breadcrumb:      { "@id": `${PAGE_URL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_URL] },
};

const qaGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  qaPageNode,
  qaBreadcrumbNode,
  qaServiceNode,
  qaFaqNode,
);

const benefits = [
  { icon: <FaBug />,          title: "Earlier Defect Detection",     description: "Shift-left testing embeds QA into requirements review and development, not just the days before release — so defects surface while they're still cheap to fix." },
  { icon: <FaCogs />,         title: "Lower Regression Risk",        description: "Automated regression suites re-verify existing functionality on every build, catching breakage introduced by new code before it reaches staging or production." },
  { icon: <FaChartLine />,    title: "Performance You Can Plan Around", description: "Load, stress and endurance testing under realistic traffic patterns gives your team concrete bottleneck data instead of guesswork about where the system will strain." },
  { icon: <FaShieldAlt />,    title: "A Stronger Security Baseline", description: "OWASP-oriented testing and authentication/authorization checks catch common vulnerability classes as part of the regular test cycle, not a one-off audit." },
  { icon: <FaRocket />,       title: "Calmer, More Predictable Releases", description: "CI/CD-integrated quality gates give engineering and product teams an objective basis for release confidence, instead of relying on \"it seemed fine.\"" },
  { icon: <FaTools />,        title: "Less Manual Regression Toil",  description: "Automating the repetitive checks frees your QA engineers to spend their time on exploratory testing, edge cases and new feature coverage — the work automation can't do." },
];

const services = [
  {
    id: "functional-testing",
    title: "Functional & Regression Testing",
    description: "Verification that your application does what it's supposed to do — functional, regression, smoke and sanity testing, plus integration and system testing across connected services, and structured support for user acceptance testing.",
    highlight: "This is the foundation every other testing discipline sits on top of: clear, traceable test cases mapped to requirements, so \"does this work\" has a documented answer.",
    bullets: ["Functional, regression, smoke & sanity testing", "Integration and system testing across services", "Traceable test cases and structured UAT support"],
    icon: <FaBug />,
  },
  {
    id: "test-automation",
    title: "Test Automation Engineering",
    description: "UI and end-to-end automation frameworks built with Playwright, Cypress or Selenium — chosen for your application architecture, not a default — covering cross-browser, cross-platform and data-driven testing.",
    highlight: "We build automation as maintainable engineering, not one-off scripts: modular test architecture, version-controlled suites, and a deliberate maintenance strategy so the suite stays trustworthy as your product evolves.",
    bullets: ["UI, end-to-end and regression automation", "Cross-browser & cross-platform coverage", "Data-driven testing and reusable framework design"],
    icon: <FaCogs />,
  },
  {
    id: "api-testing",
    title: "API & Contract Testing",
    description: "REST and, where applicable, GraphQL API testing — functional and integration testing, contract testing between services, and negative/edge-case testing — run independently of the UI so issues surface earlier and faster.",
    highlight: "API tests execute faster and catch backend issues before they ever reach a rendered screen, which is why we typically build API coverage before or alongside UI automation, not after.",
    bullets: ["REST & GraphQL functional and integration testing", "Contract testing between services", "Negative testing and edge-case validation"],
    icon: <FaPlug />,
  },
  {
    id: "performance-testing",
    title: "Performance Engineering",
    description: "Load, stress, spike and endurance testing to understand how your system behaves under real-world and peak traffic, plus scalability testing and bottleneck analysis to identify what actually limits throughput.",
    highlight: "The deliverable isn't a pass/fail number — it's a clear picture of where your system slows down, why, and what to fix first.",
    bullets: ["Load, stress, spike & endurance testing", "Scalability testing across environments", "Bottleneck analysis with concrete findings"],
    icon: <FaChartLine />,
  },
  {
    id: "mobile-testing",
    title: "Mobile Application Testing",
    description: "Functional and regression testing for Android and iOS applications, including real-device testing, mobile browser testing, and responsive-layout validation for mobile web experiences.",
    highlight: "Device fragmentation is the core mobile testing problem — we test the combinations of OS version, device and network condition that actually matter for your user base, not an exhaustive but unfocused matrix.",
    bullets: ["Android & iOS functional testing", "Real-device and mobile browser testing", "Responsive layout validation"],
    icon: <FaMobileAlt />,
  },
  {
    id: "accessibility-testing",
    title: "Accessibility Testing",
    description: "Accessibility validation against recognised standards, covering keyboard navigation, screen-reader compatibility, colour contrast, and semantic markup — genuinely supported checks, not a compliance rubber stamp.",
    highlight: "We test accessibility the way real assistive-technology users experience your product, combined with automated checks that catch structural issues at scale.",
    bullets: ["Keyboard navigation & screen-reader testing", "Colour contrast & semantic markup checks", "Standards-aligned manual and automated review"],
    icon: <FaUniversalAccess />,
  },
  {
    id: "security-testing",
    title: "Application Security Testing",
    description: "OWASP-oriented application security testing: authentication and authorization testing, vulnerability validation, and security regression testing to confirm known issues stay fixed across releases.",
    highlight: "This is application-level security testing integrated into the QA cycle — we don't claim formal penetration-testing certifications we don't hold, and we'll tell you plainly when a finding needs a specialised security audit instead.",
    bullets: ["OWASP-oriented security testing", "Authentication & authorization testing", "Security regression testing across releases"],
    icon: <FaShieldAlt />,
  },
  {
    id: "ai-application-testing",
    title: "AI & LLM Application Testing",
    description: "Testing for AI-powered features and LLM-integrated applications: prompt testing, AI response evaluation, hallucination and prompt-injection testing, adversarial testing, and regression evaluation when a model or prompt changes.",
    highlight: "AI outputs are non-deterministic, so \"pass/fail\" isn't always the right frame — we build evaluation criteria and regression baselines that tell you when output quality actually degrades, alongside standard testing of the application and model/API integration around it.",
    bullets: ["Prompt testing & AI response evaluation", "Hallucination & prompt-injection testing", "Regression evaluation for model/prompt changes"],
    icon: <FaRobot />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

const clusters = [
  {
    id: "functional-automation",
    eyebrow: "Functional Quality & Automation",
    heading: <>Coverage that&apos;s built to <em>last</em></>,
    intro: "Structured functional testing paired with automation engineering that's designed to be maintained, not rewritten every sprint.",
    cols: 2,
    ids: ["functional-testing", "test-automation"],
  },
  {
    id: "apis-performance",
    eyebrow: "APIs & Performance",
    heading: <>Know your breaking point <em>before your users do</em></>,
    intro: "API and contract testing that catches issues before the UI does, plus load and performance testing that tells you where the system actually strains.",
    cols: 2,
    ids: ["api-testing", "performance-testing"],
  },
  {
    id: "mobile-access",
    eyebrow: "Mobile & Inclusive Access",
    heading: <>Tested for <em>real devices, real users</em></>,
    intro: "Mobile application testing across the device matrix that matters, and accessibility testing that reflects how assistive technology is actually used.",
    cols: 2,
    ids: ["mobile-testing", "accessibility-testing"],
  },
  {
    id: "security-ai",
    eyebrow: "Security & AI Applications",
    heading: <>Quality gates for <em>traditional and AI-powered</em> software</>,
    intro: "OWASP-oriented application security testing alongside a dedicated practice for testing AI and LLM-integrated features.",
    cols: 2,
    ids: ["security-testing", "ai-application-testing"],
  },
];

// "What We Test" — the application types our testing practice covers.
const whatWeTest = [
  { icon: <FaCode />,      label: "Web applications" },
  { icon: <FaMobileAlt />, label: "Mobile applications" },
  { icon: <FaCloud />,     label: "SaaS platforms" },
  { icon: <FaPlug />,      label: "APIs & microservices" },
  { icon: <FaCloud />,     label: "Cloud applications" },
  { icon: <FaBuilding />,  label: "Enterprise applications" },
  { icon: <FaRobot />,     label: "AI / LLM applications" },
  { icon: <FaCheckCircle />, label: "E-commerce platforms" },
  { icon: <FaUniversalAccess />, label: "Customer portals" },
  { icon: <FaSitemap />,   label: "Internal business applications" },
];

// Framework guidance — when each tool/approach is the right call, not a logo wall.
const frameworks = [
  {
    name: "Playwright",
    bestFor:
      "A strong default for modern web applications that need fast, reliable, parallelized cross-browser and cross-tab automation, with solid built-in support for network mocking, tracing and debugging.",
  },
  {
    name: "Cypress",
    bestFor:
      "A good fit when the priority is a tight feedback loop during development and strong component-level testing. Its in-browser architecture makes cross-tab and true cross-browser scenarios more limited than Playwright.",
  },
  {
    name: "Selenium",
    bestFor:
      "Still the right choice for legacy browser matrices, teams with existing Selenium Grid infrastructure, or projects that need language bindings outside the JavaScript ecosystem.",
  },
  {
    name: "API Testing Tooling",
    bestFor:
      "Code-first and REST/GraphQL-aware testing frameworks that run in the same pipeline as UI tests, so contract and functional checks can complete before a UI even needs to render.",
  },
  {
    name: "CI/CD Integration",
    bestFor:
      "GitHub Actions, GitLab CI and Jenkins, running suites on pull requests and merges as automated quality gates — so a failing suite blocks a deploy instead of surfacing after one.",
  },
];

// 10-step QA & automation lifecycle.
const lifecycle = [
  { n: "01", title: "Discovery & Risk Assessment", desc: "We review your application, architecture and release history to identify where defects are most likely and most costly." },
  { n: "02", title: "Test Strategy",                desc: "A written strategy defining scope, test types, automation vs. manual split, and success criteria — agreed before work starts." },
  { n: "03", title: "Test Architecture",            desc: "Framework structure, environment setup, and data management design, built to be maintainable as your product grows." },
  { n: "04", title: "Automation Framework",         desc: "The chosen framework (Playwright, Cypress, Selenium, or a mix) is configured and integrated with your codebase and CI/CD." },
  { n: "05", title: "Test Development",             desc: "Test cases and automated scripts are built against your actual requirements and user flows, not generic templates." },
  { n: "06", title: "CI/CD Integration",             desc: "Suites are wired into your pipeline to run on pull requests and merges, with quality gates where appropriate." },
  { n: "07", title: "Execution & Reporting",        desc: "Tests run automatically and on demand, with clear, actionable reporting your team can act on without translation." },
  { n: "08", title: "Defect Analysis",              desc: "Failures are triaged and root-caused, with structured defect reports your engineers can reproduce and fix quickly." },
  { n: "09", title: "Regression & Maintenance",     desc: "Suites are kept in sync with your product — flaky tests are fixed or removed, and coverage is extended as features ship." },
  { n: "10", title: "Continuous Quality Improvement", desc: "Ongoing review of coverage gaps, test health and release metrics, so the QA practice improves alongside your product." },
];

// Industries — framed as testing scenarios we can support, not client claims.
const industries = [
  { icon: <FaCloud />,          name: "SaaS", note: "Multi-tenant data isolation, subscription flows, and regression coverage across frequent releases." },
  { icon: <FaChartLine />,      name: "FinTech", note: "Transaction accuracy, calculation logic, and security-sensitive flows like authentication and payments." },
  { icon: <FaShieldAlt />,      name: "Healthcare Technology", note: "Data handling accuracy, workflow correctness, and accessibility across clinical and patient-facing interfaces." },
  { icon: <FaCheckCircle />,    name: "E-commerce", note: "Checkout and payment flows, catalog and inventory accuracy, and performance under peak traffic." },
  { icon: <FaBuilding />,       name: "Real Estate Technology", note: "Listing search, filtering and map-based interfaces, plus integration testing with third-party data feeds." },
  { icon: <FaSitemap />,        name: "Logistics", note: "Tracking accuracy, integration testing across carrier/API dependencies, and real-time status updates." },
  { icon: <FaCode />,           name: "Media & Entertainment", note: "Streaming and content-delivery reliability, cross-device playback, and load testing for traffic spikes." },
  { icon: <FaUniversalAccess />, name: "Education Technology", note: "Accessibility testing, assessment/grading logic accuracy, and cross-device usability." },
  { icon: <FaTools />,          name: "Enterprise Applications", note: "Role-based access testing, complex workflow validation, and integration testing across internal systems." },
  { icon: <FaRobot />,          name: "AI-Powered Applications", note: "Prompt and response evaluation, regression testing for model/prompt changes, and integration testing of AI features." },
];

// Illustrative CLI-style log lines for the hero ticker band — process labels,
// not quantitative claims about real test runs, latency or vulnerability counts.
const pipeline = [
  { cmd: "playwright_run",   out: "regression suite executed" },
  { cmd: "self_heal",        out: "selectors verified" },
  { cmd: "load_test",        out: "thresholds evaluated" },
  { cmd: "security_scan",    out: "scan completed" },
  { cmd: "ci_gate",          out: "quality gate evaluated" },
  { cmd: "api_tests",        out: "contract checks passed" },
];

export default function AutomationTestingPage() {
  return (
    <>
      <script
        id="schema-qa-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .qa-page{
          --qa-ink:#12141A; --qa-muted:#5B6172; --qa-paper:#F5F6F8; --qa-surface:#FFFFFF;
          --qa-line:#E4E6EC; --qa-blue:#2E5CFF; --qa-green:#37D67A; --qa-orange:#F97316;
          background:var(--qa-paper);
        }
        .qa-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .qa-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--qa-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .qa-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--qa-ink);margin:0 0 1rem;text-align:center;}
        .qa-h2 em{font-style:normal;color:var(--qa-blue);}

        /* ══ HERO ══════════════════════════════════════════════════════ */
        .qa-hero{
          position:relative;min-height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/automation-testing-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .qa-hero { min-height: 100svh; } }
        @supports (height: 100dvh) { .qa-hero { min-height: 100dvh; } }
        @media(max-width:960px){
          .qa-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/automation-testing-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        .qa-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;
          max-width:1280px;margin:0 auto;width:100%;
          padding:5rem 1.5rem 1.5rem;
          padding-top:max(5rem, calc(env(safe-area-inset-top) + 4rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .qa-hero__inner{ padding:3.25rem 1.25rem 1rem; padding-top:max(3.25rem, calc(env(safe-area-inset-top) + 2.5rem)); } }
        @media(max-width:640px){ .qa-hero__inner{ padding:2.75rem 1rem .75rem; padding-top:max(2.75rem, calc(env(safe-area-inset-top) + 2.25rem)); } }
        @media(max-width:380px){ .qa-hero__inner{ padding:2.5rem .85rem .65rem; padding-top:max(2.5rem, calc(env(safe-area-inset-top) + 2rem)); } }
        @media(max-width:640px){ .qa-hero__actions{ margin-bottom:.5rem; } }
        @media(max-height:520px){
          .qa-hero__inner{ padding-top:1.75rem; padding-bottom:.5rem; }
          .qa-hero__eyebrow{ margin-bottom:.85rem; }
          .qa-hero__h1{ margin-bottom:.6rem; font-size:clamp(1.3rem,4vh,2.2rem); }
          .qa-hero__rule{ margin-bottom:.65rem; }
          .qa-hero__sub{ margin-bottom:.9rem; }
          .qa-hero__actions{ margin-bottom:.25rem; }
        }

        .qa-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .qa-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .qa-corner--tl{top:28px;left:28px;border-top:1px solid var(--qa-blue);border-left:1px solid var(--qa-blue);}
        .qa-corner--tr{top:28px;right:28px;border-top:1px solid var(--qa-blue);border-right:1px solid var(--qa-blue);}
        .qa-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--qa-blue);border-left:1px solid var(--qa-blue);}
        @media(max-width:480px){ .qa-corner--bl{ left:28px; } }
        .qa-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--qa-blue);border-right:1px solid var(--qa-blue);}

        .qa-hero__content{animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes qaFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.qa-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .qa-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--qa-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .qa-breadcrumb{position:relative;z-index:2;padding:1.6rem 0 0;}
        .qa-breadcrumb ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;margin:0;padding:0;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.02em;}
        .qa-breadcrumb li{display:flex;align-items:center;gap:6px;}
        .qa-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s ease;}
        .qa-breadcrumb a:hover{color:var(--qa-orange);}
        .qa-breadcrumb a[aria-current="page"]{color:rgba(255,255,255,.85);pointer-events:none;}
        .qa-breadcrumb__sep{color:rgba(255,255,255,.25);}
        @media(max-width:640px){.qa-breadcrumb{padding-top:1.1rem;}}
        .qa-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--qa-orange);animation:qaPulse 2s ease-in-out infinite;}
        @keyframes qaPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .qa-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .qa-hero__h1 em{font-style:normal;color:var(--qa-blue);}
        .qa-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--qa-blue),transparent);margin:0 0 1.4rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.qa-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--qa-blue),transparent);}}
        .qa-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.qa-hero__sub{margin:0 auto 2.6rem;}}

        .qa-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:qaFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.qa-hero__actions{justify-content:center;}}
        .qa-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--qa-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;border:none;}
        .qa-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .qa-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;box-shadow:none;gap:8px;}
        .qa-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);box-shadow:none;transform:none;}

        .qa-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.72) 30%, rgba(8,8,8,.92) 100%);
          padding-top:1.75rem;
          margin-top:.25rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .qa-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .qa-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:qaScroll 34s linear infinite;}
        .qa-hero__ticker-bar:hover .qa-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .qa-ticker__track{ animation-duration:22s; } }
        @keyframes qaScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .qa-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .qa-ticker__item b{color:rgba(255,255,255,.45);}
        .qa-ticker__pass{color:var(--qa-green);}
        @media(max-height:520px){
          .qa-hero__ticker-bar{ padding-top:.75rem; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .qa-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--qa-line);}
        @media(max-width:760px){.qa-sticky-cta{display:flex;justify-content:center;}}
        .qa-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--qa-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ INTRO ═════════════════════════════════════════════════════ */
        .qa-intro{background:var(--qa-surface);border-bottom:1px solid var(--qa-line);padding:5.5rem 1.5rem;}
        .qa-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .qa-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--qa-muted);max-width:700px;margin:0 auto .9rem;}
        .qa-intro__p strong{color:var(--qa-ink);font-weight:500;}

        /* ══ WHAT WE TEST ══════════════════════════════════════════════ */
        .qa-wwt{background:var(--qa-paper);padding:4.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-wwt__inner{max-width:1180px;margin:0 auto;}
        .qa-wwt__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-top:2.5rem;}
        @media(max-width:960px){.qa-wwt__grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:600px){.qa-wwt__grid{grid-template-columns:repeat(2,1fr);}}
        .qa-wwt__card{background:var(--qa-surface);border:1px solid var(--qa-line);border-radius:14px;padding:1.4rem 1rem;text-align:center;transition:border-color .2s ease,transform .2s ease;}
        .qa-wwt__card:hover{border-color:var(--qa-blue);transform:translateY(-2px);}
        .qa-wwt__icon{width:38px;height:38px;margin:0 auto .8rem;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:.95rem;}
        .qa-wwt__label{font-family:'Inter',sans-serif;font-size:.82rem;font-weight:500;color:var(--qa-ink);line-height:1.4;}

        /* ══ SERVICE CLUSTERS ══════════════════════════════════════════ */
        .qa-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-cluster:nth-child(even){background:var(--qa-surface);}
        .qa-cluster__inner{max-width:1180px;margin:0 auto;}
        .qa-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .qa-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .qa-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--qa-ink);margin:0 0 .6rem;}
        .qa-cluster__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--qa-muted);margin:0;}
        .qa-cluster__grid{display:grid;gap:1.25rem;}
        .qa-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        @media(max-width:860px){.qa-cluster__grid--2{grid-template-columns:1fr;}}

        .qa-card{background:var(--qa-surface);border:1px solid var(--qa-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .qa-cluster:nth-child(even) .qa-card{background:var(--qa-paper);}
        .qa-card:hover{border-color:var(--qa-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .qa-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .qa-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--qa-ink);margin:0 0 .7rem;}
        .qa-card__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--qa-muted);margin:0 0 .8rem;}
        .qa-card__highlight{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:400;line-height:1.7;color:var(--qa-ink);border-left:2px solid var(--qa-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .qa-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .qa-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;color:var(--qa-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .qa-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--qa-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ TECHNOLOGY / FRAMEWORK GUIDANCE ══════════════════════════ */
        .qa-tech{background:var(--qa-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-tech__inner{max-width:1000px;margin:0 auto;}
        .qa-tech__head{max-width:680px;margin:0 auto 1.4rem;text-align:center;}
        .qa-tech__note{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--qa-muted);max-width:680px;margin:0 auto 2.8rem;text-align:center;}
        .qa-tech__note strong{color:var(--qa-ink);font-weight:500;}
        .qa-tech__list{display:flex;flex-direction:column;gap:1px;background:var(--qa-line);border:1px solid var(--qa-line);border-radius:16px;overflow:hidden;}
        .qa-tech__row{background:var(--qa-surface);padding:1.5rem 1.75rem;display:grid;grid-template-columns:180px 1fr;gap:1.5rem;align-items:start;}
        @media(max-width:640px){.qa-tech__row{grid-template-columns:1fr;gap:.4rem;padding:1.25rem 1.4rem;}}
        .qa-tech__name{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--qa-ink);}
        .qa-tech__best{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--qa-muted);}

        /* ══ QA & AUTOMATION LIFECYCLE ═════════════════════════════════ */
        .qa-life{background:var(--qa-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-life__inner{max-width:1000px;margin:0 auto;}
        .qa-life__head{max-width:640px;margin:0 auto 3rem;text-align:center;}
        .qa-life__list{display:flex;flex-direction:column;}
        .qa-life__step{display:grid;grid-template-columns:64px 1fr;gap:1.4rem;padding:1.4rem 0;border-bottom:1px solid var(--qa-line);}
        .qa-life__step:last-child{border-bottom:none;}
        .qa-life__n{font-family:'IBM Plex Mono',monospace;font-size:1.1rem;font-weight:500;color:var(--qa-blue);}
        .qa-life__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--qa-ink);margin:0 0 .4rem;}
        .qa-life__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--qa-muted);margin:0;}

        /* ══ INDUSTRIES / USE CASES ════════════════════════════════════ */
        .qa-ind{background:var(--qa-paper);padding:5.5rem 1.5rem;}
        .qa-ind__inner{max-width:1200px;margin:0 auto;}
        .qa-ind__head{max-width:640px;margin:0 auto 1rem;text-align:center;}
        .qa-ind__note{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;color:var(--qa-muted);text-align:center;max-width:600px;margin:0 auto 2.8rem;}
        .qa-ind__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:900px){.qa-ind__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.qa-ind__grid{grid-template-columns:1fr;}}
        .qa-ind__card{background:var(--qa-surface);border:1px solid var(--qa-line);border-radius:16px;padding:1.6rem 1.6rem;transition:border-color .2s ease,transform .2s ease;}
        .qa-ind__card:hover{border-color:var(--qa-blue);transform:translateY(-3px);}
        .qa-ind__icon{width:38px;height:38px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:.9rem;margin-bottom:.9rem;}
        .qa-ind__name{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--qa-ink);margin:0 0 .5rem;}
        .qa-ind__desc{font-family:'Inter',sans-serif;font-size:.82rem;font-weight:300;line-height:1.7;color:var(--qa-muted);margin:0;}

        /* ══ BENEFITS ═══════════════════════════════════════════════════ */
        .qa-benefits{background:var(--qa-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--qa-line);}
        .qa-benefits__inner{max-width:1200px;margin:0 auto;}
        .qa-benefits__head{max-width:560px;margin:0 auto 3rem;text-align:center;}
        .qa-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .qa-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--qa-ink);margin:0 0 .8rem;}
        .qa-benefits__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--qa-muted);max-width:520px;margin:0 auto;}
        .qa-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.qa-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.qa-benefits__grid{grid-template-columns:1fr;}}
        .qa-benefit-card{background:var(--qa-paper);border:1px solid var(--qa-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .qa-benefit-card:hover{border-color:var(--qa-blue);transform:translateY(-3px);}
        .qa-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--qa-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .qa-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--qa-ink);margin-bottom:.5rem;}
        .qa-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--qa-muted);}

        /* ══ FAQ — native details/summary ══════════════════════════════ */
        .qa-faq{background:var(--qa-paper);padding:5.5rem 1.5rem;border-top:1px solid var(--qa-line);}
        .qa-faq__inner{max-width:800px;margin:0 auto;}
        .qa-faq__header{text-align:center;margin-bottom:3rem;}
        .qa-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--qa-line);border-radius:16px;overflow:hidden;}
        .qa-faq__item{border-bottom:1px solid var(--qa-line);background:var(--qa-surface);transition:background .2s ease;}
        .qa-faq__item:last-child{border-bottom:none;}
        .qa-faq__item[open]{background:#fff;}
        .qa-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .qa-faq__q::-webkit-details-marker{display:none;}.qa-faq__q::marker{display:none;}
        .qa-faq__q-text{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--qa-ink);line-height:1.35;flex:1;transition:color .2s ease;}
        .qa-faq__item[open] .qa-faq__q-text,.qa-faq__q:hover .qa-faq__q-text{color:var(--qa-blue);}
        .qa-faq__chevron{flex-shrink:0;color:var(--qa-blue);opacity:.8;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .qa-faq__item[open] .qa-faq__chevron{transform:rotate(180deg);opacity:1;}
        .qa-faq__a{padding:0 1.75rem 1.5rem;animation:qaFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes qaFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .qa-faq__a p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;line-height:1.8;color:var(--qa-muted);margin:0;}

        /* ══ RELATED SERVICES & READING (internal linking) ═════════════ */
        .qa-related{background:var(--qa-surface);padding:5rem 1.5rem;border-top:1px solid var(--qa-line);}
        .qa-related__inner{max-width:1100px;margin:0 auto;}
        .qa-related__head{max-width:600px;margin:0 auto 2.5rem;text-align:center;}
        .qa-related__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;}
        @media(max-width:900px){.qa-related__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.qa-related__grid{grid-template-columns:1fr;}}
        .qa-related__card{display:block;background:var(--qa-paper);border:1px solid var(--qa-line);border-radius:14px;padding:1.4rem 1.3rem;text-decoration:none;transition:border-color .2s ease,transform .2s ease;}
        .qa-related__card:hover{border-color:var(--qa-blue);transform:translateY(-2px);}
        .qa-related__title{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--qa-ink);margin:0 0 .45rem;}
        .qa-related__desc{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:300;line-height:1.6;color:var(--qa-muted);margin:0;}

        /* ══ CTA ═══════════════════════════════════════════════════════ */
        .qa-cta{background:var(--qa-paper);border-top:1px solid var(--qa-line);padding:5.5rem 1.5rem;text-align:center;}
        .qa-cta__inner{max-width:600px;margin:0 auto;}
        .qa-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--qa-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .qa-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--qa-ink);margin:0 0 1rem;}
        .qa-cta__h2 em{font-style:normal;color:var(--qa-blue);}
        .qa-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--qa-muted);margin-bottom:2.2rem;}
        .qa-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--qa-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .qa-cta__btn:hover{background:var(--qa-blue);transform:translateY(-2px);}

        @media(max-width:600px){.qa-faq__q{padding:1.25rem;}.qa-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){
          .qa-page *,.qa-page *::before,.qa-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <div className="qa-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="qa-hero" aria-labelledby="qa-hero-heading">
          <div aria-hidden="true">
            <div className="qa-hero__grain" />
          </div>
          <div className="qa-corner qa-corner--tl" aria-hidden="true" />
          <div className="qa-corner qa-corner--tr" aria-hidden="true" />
          <div className="qa-corner qa-corner--bl" aria-hidden="true" />
          <div className="qa-corner qa-corner--br" aria-hidden="true" />

          <nav className="qa-breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="qa-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/services" itemProp="item"><span itemProp="name">Services</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="qa-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href={PAGE_PATH} itemProp="item" aria-current="page">
                  <span itemProp="name">QA &amp; Automation Testing</span>
                </Link>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="qa-hero__inner">
            <div className="qa-hero__content">
              <div className="qa-hero__eyebrow">
                <span className="qa-hero__dot" />
                Services · QA, Testing &amp; Automation Engineering
              </div>
              <h1 className="qa-hero__h1" id="qa-hero-heading">
                QA &amp; software test automation<br />for <em>reliable</em> digital products
              </h1>
              <div className="qa-hero__rule" aria-hidden="true" />
              <p className="qa-hero__sub">
                Functional testing, automation engineering, API and performance testing,
                security and accessibility validation, and AI/LLM application testing —
                integrated into your CI/CD pipeline, not bolted on right before release.
              </p>

              <div className="qa-hero__actions">
                <ConsultationCTA className="qa-hero__cta" ariaLabel="Talk to a QA expert at 99 Visual Solutions" postTitle="QA & Automation Testing" postUrl={PAGE_PATH}>
                  Talk to a QA Expert
                </ConsultationCTA>
                <a href="#qa-services" className="qa-hero__cta qa-hero__cta--ghost" aria-label="Explore QA and software testing services">
                  Explore Testing Services
                </a>
              </div>
            </div>
          </div>

          <div className="qa-hero__ticker-bar" aria-hidden="true">
            <div className="qa-ticker">
              <div className="qa-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="qa-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="qa-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTRO — Quality Engineering, Not Just Testing ═══════════════ */}
        <section className="qa-intro" aria-labelledby="qa-intro-heading">
          <div className="qa-intro__inner">
            <span className="qa-label">Our Approach</span>
            <h2 className="qa-h2" id="qa-intro-heading">
              Quality engineering, embedded across<br />
              your entire <em>development lifecycle</em>
            </h2>
            <p className="qa-intro__p">
              At <strong>99 Visual Solutions</strong>, quality assurance isn&apos;t a phase we run right
              before a release — it&apos;s engineered into the software lifecycle from day one. That means{" "}
              <strong>shift-left testing</strong> during design and development, <strong>continuous testing</strong>{" "}
              on every commit, and <strong>CI/CD quality gates</strong> that catch regressions before they reach production.
            </p>
            <p className="qa-intro__p">
              We combine <strong>risk-based test prioritisation</strong>, automated regression coverage, and
              application observability to give engineering teams an accurate, continuously updated picture of
              release readiness — so &quot;ready to ship&quot; is a measured statement, backed by test results,
              not a guess.
            </p>
          </div>
        </section>

        {/* ══ WHAT WE TEST ═════════════════════════════════════════════════ */}
        <section className="qa-wwt" aria-labelledby="qa-wwt-heading">
          <div className="qa-wwt__inner">
            <span className="qa-label">What We Test</span>
            <h2 className="qa-h2" id="qa-wwt-heading">
              Built for <em>real-world</em> application architectures
            </h2>
            <div className="qa-wwt__grid">
              {whatWeTest.map((w) => (
                <div className="qa-wwt__card" key={w.label}>
                  <div className="qa-wwt__icon" aria-hidden="true">{w.icon}</div>
                  <div className="qa-wwt__label">{w.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICE CLUSTERS ═════════════════════════════════════════════ */}
        <div id="qa-services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="qa-cluster" aria-labelledby={`qa-cluster-h-${cluster.id}`}>
              <div className="qa-cluster__inner">
                <div className="qa-cluster__head">
                  <span className="qa-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="qa-cluster__h2" id={`qa-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="qa-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`qa-cluster__grid qa-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="qa-card" id={svc.id} key={svc.id} aria-labelledby={`qa-svc-heading-${svc.id}`}>
                        <div className="qa-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="qa-card__title" id={`qa-svc-heading-${svc.id}`}>{svc.title}</h3>
                        <p className="qa-card__desc">{svc.description}</p>
                        <p className="qa-card__highlight">{svc.highlight}</p>
                        <ul className="qa-card__bullets">
                          {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ══ TECHNOLOGY / FRAMEWORK GUIDANCE ═══════════════════════════════ */}
        <section className="qa-tech" aria-labelledby="qa-tech-heading">
          <div className="qa-tech__inner">
            <div className="qa-tech__head">
              <span className="qa-label">Test Automation Technology</span>
              <h2 className="qa-h2" id="qa-tech-heading">
                Choosing the right tool <em>for your stack</em>
              </h2>
            </div>
            <p className="qa-tech__note">
              Choosing the right automation framework depends on application architecture, browser
              coverage, team expertise, CI/CD requirements, and long-term maintenance strategy —{" "}
              <strong>not on which tool is trending</strong>. Here&apos;s how we think about each one.
            </p>
            <div className="qa-tech__list">
              {frameworks.map((f) => (
                <div className="qa-tech__row" key={f.name}>
                  <div className="qa-tech__name">{f.name}</div>
                  <div className="qa-tech__best">{f.bestFor}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ QA & AUTOMATION LIFECYCLE ══════════════════════════════════════ */}
        <section className="qa-life" aria-labelledby="qa-life-heading">
          <div className="qa-life__inner">
            <div className="qa-life__head">
              <span className="qa-label">How We Work</span>
              <h2 className="qa-h2" id="qa-life-heading">
                The QA &amp; automation <em>delivery lifecycle</em>
              </h2>
            </div>
            <div className="qa-life__list">
              {lifecycle.map((step) => (
                <div className="qa-life__step" key={step.n}>
                  <div className="qa-life__n">{step.n}</div>
                  <div>
                    <h3 className="qa-life__title">{step.title}</h3>
                    <p className="qa-life__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INDUSTRIES / USE CASES ══════════════════════════════════════════ */}
        <section className="qa-ind" aria-labelledby="qa-ind-heading">
          <div className="qa-ind__inner">
            <div className="qa-ind__head">
              <span className="qa-label">Industries</span>
              <h2 className="qa-h2" id="qa-ind-heading">
                Testing scenarios we can <em>support</em>
              </h2>
            </div>
            <p className="qa-ind__note">
              These reflect the kinds of testing challenges each industry typically presents —
              not a claim of prior client work in every sector listed.
            </p>
            <div className="qa-ind__grid">
              {industries.map((ind) => (
                <div className="qa-ind__card" key={ind.name}>
                  <div className="qa-ind__icon" aria-hidden="true">{ind.icon}</div>
                  <h3 className="qa-ind__name">{ind.name}</h3>
                  <p className="qa-ind__desc">{ind.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS ═════════════════════════════════════════════════════ */}
        <section className="qa-benefits" aria-labelledby="qa-benefits-heading">
          <div className="qa-benefits__inner">
            <div className="qa-benefits__head">
              <span className="qa-benefits__label">Why Choose Us?</span>
              <h2 className="qa-benefits__h2" id="qa-benefits-heading">
                The business case for <em>continuous</em> quality engineering
              </h2>
              <p className="qa-benefits__sub">
                Partnering with 99 Visual Solutions gives your engineering team a dedicated quality
                engineering layer — human expertise plus automation, working together.
              </p>
            </div>
            <div className="qa-benefits__grid">
              {benefits.map((b, i) => (
                <div className="qa-benefit-card" key={i}>
                  <div className="qa-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                  <div className="qa-benefit-card__title">{b.title}</div>
                  <p className="qa-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQPage structured data is handled exclusively via JSON-LD in the
            <script> tag above (qaFaqNode); no microdata attributes here. */}
        <section id="qa-faq" className="qa-faq" aria-labelledby="qa-faq-heading">
          <div className="qa-faq__inner">
            <div className="qa-faq__header">
              <span className="qa-label">Got Questions?</span>
              <h2 className="qa-h2" id="qa-faq-heading">Frequently Asked Questions</h2>
            </div>
            <dl className="qa-faq__list">
              {FAQ_ITEMS.map(({ question, answer }, i) => (
                <details key={i} className="qa-faq__item">
                  <summary className="qa-faq__q">
                    <span className="qa-faq__q-text">{question}</span>
                    <span className="qa-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="qa-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ══ RELATED SERVICES & READING — internal linking ═══════════════════ */}
        <section className="qa-related" aria-labelledby="qa-related-heading">
          <div className="qa-related__inner">
            <div className="qa-related__head">
              <span className="qa-label">Keep Exploring</span>
              <h2 className="qa-h2" id="qa-related-heading">Related services &amp; reading</h2>
            </div>
            <div className="qa-related__grid">
              <Link href="/services/website-development" className="qa-related__card">
                <div className="qa-related__title">Web Development</div>
                <p className="qa-related__desc">Pair QA and test automation with our web development team from day one of the build.</p>
              </Link>
              <Link href="/services/it-consulting" className="qa-related__card">
                <div className="qa-related__title">IT Consulting</div>
                <p className="qa-related__desc">Architecture and infrastructure guidance that complements a quality engineering practice.</p>
              </Link>
              <Link href="/services/digital-marketing-seo" className="qa-related__card">
                <div className="qa-related__title">Digital Marketing &amp; SEO</div>
                <p className="qa-related__desc">A reliable, well-tested product is the foundation good SEO and marketing results are built on.</p>
              </Link>
              <Link href="/insights" className="qa-related__card">
                <div className="qa-related__title">Insights</div>
                <p className="qa-related__desc">Engineering articles on QA, test automation, and software delivery from the 99 Visual team.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="qa-cta" aria-labelledby="qa-cta-heading">
          <div className="qa-cta__inner">
            <span className="qa-cta__eyebrow">Start a Project</span>
            <h2 className="qa-cta__h2" id="qa-cta-heading">
              Ready to start your <em>testing project</em>?
            </h2>
            <p className="qa-cta__sub">
              Book a short call with a QA engineer. We&apos;ll review your stack, current test coverage
              and release cadence, and outline a practical automation and quality-engineering plan for
              your team — no obligation.
            </p>
            <ConsultationCTA className="qa-cta__btn" ariaLabel="Request a QA strategy consultation from 99 Visual Solutions" postTitle="QA & Automation Testing" postUrl={PAGE_PATH}>
              Request a QA Strategy
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="qa-sticky-cta">
          <ConsultationCTA className="qa-sticky-cta__btn" postTitle="QA & Automation Testing" postUrl={PAGE_PATH}>Talk to a QA Expert</ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />

    </>
  );
}
