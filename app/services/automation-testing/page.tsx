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
import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ProcessList, FaqList, ServiceCTA, StickyCTA, RelatedLinks, IconLabelGrid } from "@/app/components/premium/service/ServiceBlocks";

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
  jsonLdString,
} from "@/lib/schema";

const CLEAN_BASE = BASE.replace(/\/+$/, "");
const PAGE_PATH  = "/services/automation-testing";
const PAGE_URL   = `${CLEAN_BASE}${PAGE_PATH}`;

// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "QA & Software Test Automation Services",

  description:
    "Software QA and test automation: functional, API, performance, mobile, accessibility, security and AI/LLM testing, built into your CI/CD pipeline.",

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

  authors:         [{ name: "99 Visual Solutions", url: CLEAN_BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/automation-testing']; // shared with app/sitemap.ts — edit lib/page-dates.ts

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

export default function AutomationTestingPage() {
  const T = "QA & Automation Testing";
  return (
    <>
      <script
        id="schema-qa-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(qaGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="qa-hero-heading"
            crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: PAGE_PATH, label: "QA & Automation Testing" }]}
            title="QA & Software Test Automation Services"
            tagline={<>QA &amp; software test automation for <em>reliable</em> digital products</>}
            sub="Functional testing, automation engineering, API and performance testing, security and accessibility validation, and AI/LLM application testing — integrated into your CI/CD pipeline, not bolted on right before release."
            image="/images/services/automation-testing-hero-banner.jpg"
            imageAlt="Software quality assurance and automated testing dashboard"
            ctaLabel="Talk to a QA Expert"
            ctaAria="Talk to a QA expert at 99 Visual Solutions"
            postTitle={T}
            postUrl={PAGE_PATH}
            secondary={{ href: "#qa-services", label: "Explore Testing Services" }}
            points={["Functional & regression", "API & performance", "Security & accessibility", "AI/LLM testing", "CI/CD quality gates"]}
          />

          <ServiceIntro id="qa-intro-heading" eyebrow="Our Approach" title={<>Quality engineering, embedded across your entire <em>development lifecycle</em></>}>
            <p className="vz-lead">
              At <strong>99 Visual Solutions</strong>, quality assurance isn&apos;t a phase we run right before a release — it&apos;s engineered into the software lifecycle from day one. That means <strong>shift-left testing</strong> during design and development, <strong>continuous testing</strong> on every commit, and <strong>CI/CD quality gates</strong> that catch regressions before they reach production.
            </p>
            <p>
              We combine <strong>risk-based test prioritisation</strong>, automated regression coverage, and application observability to give engineering teams an accurate, continuously updated picture of release readiness — so &quot;ready to ship&quot; is a measured statement, backed by test results, not a guess.
            </p>
          </ServiceIntro>

          <IconLabelGrid
            id="qa-wwt-heading"
            eyebrow="What We Test"
            title={<>Built for <em>real-world</em> application architectures</>}
            items={whatWeTest.map((w) => ({ label: w.label, icon: w.icon }))}
            surface
          />

          <div id="qa-services">
            {clusters.map((cluster, ci) => (
              <ServiceCluster
                key={cluster.id}
                id={`qa-cluster-h-${cluster.id}`}
                eyebrow={cluster.eyebrow}
                title={cluster.heading}
                intro={cluster.intro}
                surface={ci % 2 === 1}
                columns={cluster.cols === 3 ? 3 : 2}
                items={cluster.ids.map((id) => {
                  const svc = serviceById(id);
                  return { id: svc.id, title: svc.title, description: svc.description, highlight: svc.highlight, bullets: svc.bullets, icon: svc.icon };
                })}
              />
            ))}
          </div>

          <FeatureGrid
            id="qa-tech-heading"
            eyebrow="Test Automation Technology"
            title={<>Choosing the right tool for <em>your stack</em></>}
            lead={<>Choosing the right automation framework depends on application architecture, browser coverage, team expertise, CI/CD requirements, and long-term maintenance strategy — <strong>not on which tool is trending</strong>. Here&apos;s how we think about each one.</>}
            items={frameworks.map((f) => ({ title: f.name, description: f.bestFor }))}
            surface
          />

          <ProcessList
            id="qa-life-heading"
            eyebrow="How We Work"
            title={<>The QA &amp; automation <em>delivery lifecycle</em></>}
            steps={lifecycle.map((s) => ({ title: s.title, description: s.desc }))}
          />

          <IconLabelGrid
            id="qa-ind-heading"
            eyebrow="Industries"
            title={<>Testing scenarios we can <em>support</em></>}
            note="These reflect the kinds of testing challenges each industry typically presents — not a claim of prior client work in every sector listed."
            items={industries.map((ind) => ({ label: ind.name, icon: ind.icon, description: ind.note }))}
            surface
          />

          <FeatureGrid
            id="qa-benefits-heading"
            eyebrow="Why Choose Us?"
            title={<>The business case for <em>continuous</em> quality engineering</>}
            lead="Partnering with 99 Visual Solutions gives your engineering team a dedicated quality engineering layer — human expertise plus automation, working together."
            items={benefits.map((b) => ({ title: b.title, description: b.description, icon: b.icon }))}
          />

          <div id="qa-faq">
            <FaqList
              id="qa-faq-heading"
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              faqs={FAQ_ITEMS.map(({ question, answer }) => ({ q: question, a: <p>{answer}</p> }))}
              surface
            />
          </div>

          <RelatedLinks
            id="qa-related-heading"
            title={<>Related services &amp; <em>reading</em></>}
            links={[
              { href: "/services/website-development", label: "Web Development", description: "Pair QA and test automation with our web development team from day one of the build." },
              { href: "/services/it-consulting", label: "IT Consulting", description: "Architecture and infrastructure guidance that complements a quality engineering practice." },
              { href: "/services/digital-marketing-seo", label: "Digital Marketing & SEO", description: "A reliable, well-tested product is the foundation good SEO and marketing results are built on." },
              { href: "/insights", label: "Insights", description: "Engineering articles on QA, test automation, and software delivery from the 99 Visual team." },
            ]}
          />

          <ServiceCTA
            id="qa-cta-heading"
            title={<>Ready to start your <em>testing project</em>?</>}
            sub="Book a short call with a QA engineer. We'll review your stack, current test coverage and release cadence, and outline a practical automation and quality-engineering plan for your team — no obligation."
            ctaLabel="Request a QA Consultation"
            ctaAria="Request a QA strategy consultation from 99 Visual Solutions"
            postTitle={T}
            postUrl={PAGE_PATH}
          />
          <RelatedInsights serviceHref="/services/automation-testing" />
        </main>
        <Footer />
        <StickyCTA postTitle={T} postUrl={PAGE_PATH} label="Talk to a QA Expert" />
      </div>
    </>
  );
}
