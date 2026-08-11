// lib/knowledge.ts
//
// Company, industry, market, and problem-solving knowledge base for the
// 99 Visual Solutions RAG chatbot. Chunks are deliberately small and
// single-topic for accurate semantic retrieval (see lib/retrieve.ts, which
// embeds a user's question and cosine-matches it against the pre-computed
// vectors in lib/knowledge-embeddings.json).
//
// After editing this file, regenerate embeddings with your existing
// scripts/generate-embeddings.ts so lib/knowledge-embeddings.json stays in
// sync. Every id below is unique — do not duplicate an id.
//
// Chunk categories (for maintainers, not used at runtime):
//   1. COMPANY        — confirmed 99 Visual facts only. Never invent claims here.
//   2. SERVICES        — what 99 Visual builds/does, one capability per chunk.
//   3. PROBLEM-SOLVING  — "my website is slow" style consultant answers.
//   4. BUYER EDUCATION  — how clients should think about vendors, cost, build choices.
//   5. CROSS-SERVICE    — how services combine into end-to-end solutions.
//   6. INDUSTRY         — sector-specific needs and applicable 99 Visual services.
//   7. TROUBLESHOOTING  — first-level technical guidance, clearly non-diagnostic.
//   8. MARKET/TREND     — 2026 industry context, kept separate from company claims
//                          so it can be refreshed independently as the market moves.
//   9. SALES/CONVERSION — qualification and response-style guidance for the bot itself.
//   10. IT INFRASTRUCTURE & SUPPORT SERVICES — on-site/physical IT services
//                          (AMC, networking, hardware installs, CCTV, biometric,
//                          servers, OS upgrades). Kept distinct from the software/
//                          web/creative services in section 2.

export const KNOWLEDGE_CHUNKS: { id: string; text: string }[] = [

  // ────────────────────────────────────────────────────────────
  // 1. COMPANY KNOWLEDGE (confirmed facts only)
  // ────────────────────────────────────────────────────────────
  {
    id: "company-overview",
    text: "99 Visual Solutions is a multidisciplinary technology and creative studio built on one belief: exceptional digital products demand both imagination and engineering precision. We bring 3D Visualisation, Web & App Development, Digital Marketing & SEO, IT Consulting, CAD, GIS & LiDAR, QA & Automation, IT Infrastructure & Support, and AI-powered solutions together under one team, one process, and one point of accountability. Every engagement begins with a clear understanding of your business objectives and ends with measurable, scalable outcomes. We design, build, and optimise with the same discipline — prioritising innovation, quality, and collaboration at every stage, from early concept to enterprise deployment.",
  },
  {
    id: "differentiators",
    text: "99 Visual's approach centers on covering multiple disciplines under one team (development, AI, marketing, visualization, geospatial, QA, IT infrastructure) instead of requiring a client to coordinate several vendors, transparent communication throughout a project, and hands-on technical delivery rather than pure account management. The company also builds and runs its own production AI features (including this chatbot, using retrieval-augmented generation) as a working demonstration of its AI integration capability.",
  },
  {
    id: "contact-process",
    text: "Visitors interested in working with 99 Visual can reach out via the contact page, phone at +91-9205737431 (also reachable on WhatsApp at the same number), or email. The typical next step after initial interest is a short discovery call to understand the business problem and requirements, followed by a scoped proposal. There is no obligation attached to an initial conversation.",
  },
  {
    id: "pricing-policy",
    text: "99 Visual does not publish fixed prices publicly because cost depends on scope, complexity, integrations, chosen technology, timeline, and content/data readiness. When a visitor asks about cost, the right response is to explain what drives pricing and ask for enough detail about their project to enable a custom quote — never state or imply a specific number, discount, or guarantee.",
  },
  {
    id: "project-timelines",
    text: "As a general guide, simple marketing websites or landing pages typically take about 1 to 3 weeks. Web applications, portals, dashboards, or platforms with integrations typically take about 4 to 12+ weeks depending on scope. AI chatbot/RAG integrations, 3D visualization packages, CAD/GIS/LiDAR projects, and IT infrastructure/support engagements (AMC, hardware installs, networking) vary widely by data volume, site conditions, and complexity — exact timelines should be confirmed after scoping, not assumed from this general range.",
  },
  {
    id: "project-process",
    text: "A typical 99 Visual engagement follows: (1) discovery call to understand the problem and goals, (2) scoping and proposal covering deliverables, timeline, and cost basis, (3) design/architecture planning, (4) build in iterative stages with client check-ins, (5) QA and testing, (6) launch/deployment, and (7) a post-launch support period. The exact stages are adapted to the size and type of project.",
  },
  {
    id: "maintenance-support",
    text: "After launch, websites and applications generally need ongoing attention: security and dependency updates, hosting/monitoring, content updates, performance checks, and occasional feature changes as the business evolves. Clients should ask about what support is included post-launch and what is billed separately before signing off on a project, since this varies by engagement.",
  },

  // ────────────────────────────────────────────────────────────
  // 2. SERVICES
  // ────────────────────────────────────────────────────────────
  {
    id: "website-development-core",
    text: "99 Visual builds custom business websites and marketing sites using modern frameworks such as Next.js and React, with Node.js or Python on the backend where needed. Sites are engineered for fast loading, mobile-first responsiveness, and accessibility rather than assembled from generic page builders, which typically gives more control over performance, SEO structure, and design than template-based platforms.",
  },
  {
    id: "web-applications",
    text: "99 Visual builds web applications, client portals, internal dashboards, and multi-user platforms tailored to a specific business workflow — for example customer account areas, booking systems, internal tools, or reporting dashboards. These are built with attention to data modeling, authentication, scalability, and long-term maintainability rather than as one-off marketing sites.",
  },
  {
    id: "saas-development",
    text: "For clients building a SaaS product, 99 Visual can architect and build multi-tenant applications including subscription/billing integration, user authentication and roles, usage-based or tiered access, and a database structure designed to scale with customer growth. Early SaaS builds benefit from starting with a focused MVP rather than every planned feature at once — see the MVP-planning guidance for how that scoping works.",
  },
  {
    id: "ecommerce-development",
    text: "99 Visual builds e-commerce websites and storefronts covering product catalogs, cart and checkout flows, payment gateway integration, inventory considerations, and performance/SEO for product pages. E-commerce projects commonly pair with SEO, paid advertising, analytics, and conversion optimization to turn traffic into completed purchases — technical build alone rarely solves a revenue problem on its own.",
  },
  {
    id: "api-integration",
    text: "99 Visual integrates third-party APIs into websites and applications — payment providers, mapping, email/SMS, booking systems, analytics, or internal company systems. Good API integration work includes handling authentication securely (keys and secrets kept server-side, never exposed in client-side code), error handling for when the third-party service is slow or down, and rate-limit awareness.",
  },
  {
    id: "crm-integration",
    text: "99 Visual connects websites and applications to CRM systems so that leads, form submissions, and customer activity flow into the client's existing sales pipeline instead of sitting in a separate inbox. This typically involves API or webhook integration with the CRM, field mapping, and testing that data arrives correctly and in real time.",
  },
  {
    id: "website-performance",
    text: "99 Visual optimizes website performance and Core Web Vitals — Largest Contentful Paint (LCP, target under 2.5 seconds), Interaction to Next Paint (INP, target under 200 milliseconds), and Cumulative Layout Shift (CLS, target under 0.1). Common levers include image optimization, reducing/deferring JavaScript, server-side rendering or static generation, CDN and caching configuration, and font-loading strategy.",
  },
  {
    id: "website-accessibility",
    text: "99 Visual builds with accessibility in mind — semantic HTML, sufficient color contrast, keyboard navigability, alt text for meaningful images, and ARIA attributes where appropriate. Accessible sites also tend to be more machine-readable, which helps both traditional SEO and how AI search systems parse and cite page content.",
  },
  {
    id: "website-security",
    text: "99 Visual applies standard web security practices in builds: HTTPS/SSL everywhere, secure authentication and password handling, server-side validation, keeping secrets (API keys, credentials) out of client-side code, and dependency updates. For clients with specific compliance requirements (e.g. handling payment or health data), those requirements should be scoped explicitly at the start of a project rather than assumed.",
  },

  // ── AI / GenAI ──
  {
    id: "ai-chatbots",
    text: "99 Visual builds AI chatbots for websites that can answer questions using a company's own information rather than generic responses. This typically uses retrieval-augmented generation (RAG): the company's content is broken into chunks, embedded, and searched semantically at query time so the AI's answer is grounded in real, current information rather than invented from the model's general training.",
  },
  {
    id: "rag-solutions",
    text: "Retrieval-Augmented Generation (RAG) is the technique of retrieving relevant chunks of a company's own documents or website content via semantic (embedding-based) search, then feeding those chunks to an AI model as grounding context before it answers. This reduces hallucination compared to an AI answering from general training alone, and lets the AI's knowledge be updated by editing source content rather than retraining a model. 99 Visual's own website chatbot is a working RAG implementation.",
  },
  {
    id: "ai-agents",
    text: "AI agents go beyond a single question/answer exchange — they can plan and carry out multi-step tasks (e.g. looking something up, taking an action, following up) with reduced need for step-by-step human direction. Businesses are increasingly using agentic workflows for things like customer support resolution, lead qualification, and back-office process automation, typically alongside human oversight for higher-stakes decisions rather than fully unattended.",
  },
  {
    id: "voice-assistants",
    text: "Voice assistant features let website visitors speak instead of type — speech is converted to text, sent through the same chatbot/AI pipeline as typed messages, and the reply can be read back aloud. This can use either browser-native speech APIs (no extra API cost, quality varies by browser) or a cloud speech service for more consistent voice quality across devices; the right choice depends on budget and how critical voice UX is to the product.",
  },
  {
    id: "website-ai-integration",
    text: "Beyond chatbots, AI can be integrated into a website or application for tasks like intelligent search, content summarization, personalized recommendations, document processing, or auto-generated first-draft content for staff review. The right approach depends on the specific workflow being improved — a discovery conversation about what's currently manual or slow is the fastest way to identify where AI adds real value versus where it's unnecessary.",
  },
  {
    id: "ai-automation-workflows",
    text: "99 Visual builds automation for repetitive business processes — for example auto-routing form submissions, generating reports, syncing data between systems, or handling first-pass customer replies — combining traditional workflow automation with AI where judgment or language understanding is needed. The most successful automation projects start with one well-defined, high-volume, rule-based process rather than trying to automate an entire department at once.",
  },

  // ── SEO / Marketing ──
  {
    id: "technical-seo",
    text: "Technical SEO covers the infrastructure that lets search engines (and AI answer engines) find, crawl, and understand a site: clean URL structure, correct canonical tags, working sitemaps, proper robots.txt configuration, fast page load, mobile-friendliness, and no crawl-blocking errors. Technical SEO problems often silently cap a site's visibility even when the content itself is good.",
  },
  {
    id: "seo-indexing",
    text: "If pages aren't showing up in Google search, common causes include: pages blocked in robots.txt, a 'noindex' tag left on by accident, canonical tags pointing to the wrong URL, a missing or broken sitemap, thin/duplicate content, or the site being too new or low-authority for those pages to be crawled yet. Diagnosing this requires checking the specific site's search console data and page source — a general chatbot answer can outline likely causes but not confirm which one applies without that access.",
  },
  {
    id: "seo-schema",
    text: "Structured data (schema.org markup, e.g. FAQPage, Product, LocalBusiness, Article) helps search engines and AI systems understand exactly what a page is about, which can improve rich results in Google and citation likelihood in AI-generated answers. Duplicate or conflicting schema on the same page is a common technical error that can actively hurt eligibility for rich results.",
  },
  {
    id: "seo-core-web-vitals",
    text: "Core Web Vitals (LCP, INP, CLS) are part of Google's page experience signals and are measured from real visitor data, not just lab tests — Google evaluates the 75th percentile of real users over a rolling window. A page can look fast in a developer's own testing and still fail Core Web Vitals for a meaningful share of real visitors on slower devices or networks, which is why field-data monitoring matters alongside lab testing.",
  },
  {
    id: "local-seo",
    text: "Local SEO helps a business appear in location-based searches and map results: an accurate, fully filled-out Google Business Profile, consistent name/address/phone (NAP) information across the web, local-relevant content and landing pages, and customer reviews. This matters most for businesses that serve customers in a specific city or region rather than purely online-only businesses.",
  },
  {
    id: "ai-search-geo",
    text: "Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) refer to structuring content so AI systems like ChatGPT, Google AI Overviews, Perplexity, and Gemini are more likely to cite or reference a business when answering related questions. GEO/AEO are not replacements for SEO — as of 2026, AI answer engines still rely heavily on the same signals traditional SEO builds: crawlable technical structure, clear and well-organized content, structured data, and topical authority. The practical addition GEO/AEO bring is writing content that directly and concisely answers specific questions (clear opening answers, FAQ-style structure) so it's easy for an AI system to extract and cite.",
  },
  {
    id: "conversion-optimization",
    text: "Conversion Rate Optimization (CRO) improves the percentage of visitors who take a desired action (contact, purchase, sign-up). Common levers include clearer value proposition and messaging, stronger and better-placed calls-to-action, simplified forms, faster page load, and landing pages matched to the specific traffic source. Traffic and conversion are separate problems — a site can have healthy traffic and still convert poorly, which points to messaging/UX/CRO work rather than more SEO or ad spend.",
  },
  {
    id: "paid-advertising",
    text: "99 Visual supports Google Ads and Meta (Facebook/Instagram) advertising campaigns, including retargeting visitors who didn't convert on their first visit. Paid ads can drive fast traffic while organic SEO builds over months, but ad traffic that lands on a slow page or unclear landing page will still convert poorly — ad spend and landing-page/CRO quality need to be addressed together for good ROI.",
  },
  {
    id: "content-strategy-topical-authority",
    text: "Building topical authority — consistently covering a subject area in depth with well-linked, genuinely useful content — helps both traditional SEO rankings and citation likelihood in AI answers, since both systems favor sources that appear comprehensive and trustworthy on a topic rather than a single isolated page. Internal linking between related pages helps both search engines and AI systems understand how a site's content connects.",
  },

  // ── 3D / CAD / GIS ──
  {
    id: "3d-visualization",
    text: "99 Visual produces 3D visualization: photorealistic architectural renders, interior and exterior visualization, immersive virtual walkthroughs, and product renders. These are used heavily in real estate marketing (pre-construction sales, listing presentation), hospitality, interior design, and retail/product presentation, where showing a space or product before it physically exists (or without expensive photography) drives buyer confidence.",
  },
  {
    id: "3d-configurators",
    text: "Interactive 3D and web-based configurators (built with technologies like Three.js/WebGL) let website visitors explore a product or space directly in the browser — rotating a model, changing finishes/materials, or walking through a floor plan — without needing a separate app download. These work well for real estate, furniture/product customization, and showroom-style experiences.",
  },
  {
    id: "cad-services",
    text: "99 Visual provides CAD drafting services in both 2D and 3D, supporting architectural, engineering, and construction documentation needs. CAD output feeds into visualization, construction planning, and coordination between architects, engineers, and contractors.",
  },
  {
    id: "gis-services",
    text: "99 Visual provides GIS (Geographic Information System) mapping services — organizing and visualizing spatial/location-based data for infrastructure, construction, land, and asset-mapping projects. GIS work is often combined with LiDAR and drone photogrammetry data to produce accurate, geo-referenced maps and models.",
  },
  {
    id: "lidar-processing",
    text: "99 Visual processes LiDAR point-cloud data, which is common in survey, construction, and infrastructure projects. This includes cleaning and organizing raw point-cloud captures and using them to produce terrain models, elevation data, or as a base layer for 3D reconstruction — useful when a client already has scan data and needs it turned into something usable for design or planning.",
  },
  {
    id: "photogrammetry",
    text: "99 Visual builds 3D models and maps from drone photography using photogrammetry — stitching overlapping aerial images into an orthomosaic (a single accurate map image) or a full 3D reconstruction of a site. This is commonly used for construction progress tracking, land surveying, and infrastructure/asset mapping where flying a drone is faster and safer than manual ground survey alone.",
  },

  // ── QA / IT Consulting ──
  {
    id: "qa-automation",
    text: "99 Visual builds automated QA and testing using tools such as Selenium, Cypress, Playwright, and Appium, covering functional testing, regression testing, cross-browser testing, mobile testing, and API testing. Automated test suites can run in CI/CD pipelines so bugs are caught before deployment rather than after a customer reports them.",
  },
  {
    id: "software-testing",
    text: "Beyond automation, 99 Visual supports broader software quality work: writing test plans, functional and regression testing, performance/load testing, and structured test reporting. This is especially relevant before a major release, after significant refactoring, or when an application has grown without a formal testing process and bugs have started reaching production.",
  },
  {
    id: "it-consulting",
    text: "99 Visual provides IT consulting including technology stack selection for a new project, cloud architecture guidance, and infrastructure/security assessment. This is useful for a business trying to decide between build approaches or vendors before committing budget to a large technical project.",
  },
  {
    id: "cloud-consulting",
    text: "99 Visual advises on and implements cloud architecture — choosing appropriate hosting (serverless/edge, managed cloud platforms, or traditional VPS depending on the workload), setting up CI/CD deployment pipelines, and structuring infrastructure for the scale a business actually needs rather than over- or under-provisioning.",
  },
  {
    id: "cybersecurity-basics",
    text: "General security guidance 99 Visual applies in projects: HTTPS everywhere, secure authentication, principle of least privilege for access control, keeping dependencies patched, and not exposing API keys or secrets client-side. A full security audit or penetration test for compliance purposes is a distinct, more specialized engagement — 99 Visual can advise on whether that level of assessment is needed for a given project.",
  },
  {
    id: "digital-transformation",
    text: "Digital transformation consulting helps a business move from manual, paper-based, or fragmented legacy processes to integrated digital systems — websites, applications, automation, and data connected together rather than siloed. This is usually approached as a phased roadmap (highest-impact, lowest-risk changes first) rather than a single big-bang rebuild.",
  },
  {
    id: "application-modernization",
    text: "99 Visual helps modernize and migrate legacy applications — for example moving an outdated system to a modern framework, migrating to cloud hosting, or replacing a fragile custom build with a more maintainable architecture. Modernization projects typically start with an assessment of the existing system (what it does, what's fragile, what data needs to be preserved) before any rebuild work begins.",
  },

  // ────────────────────────────────────────────────────────────
  // 3. PROBLEM-SOLVING KNOWLEDGE (consultant-style guidance)
  // ────────────────────────────────────────────────────────────
  {
    id: "problem-slow-website",
    text: "A slow website usually traces back to a handful of causes: unoptimized/oversized images, too much render-blocking JavaScript, no CDN or caching, slow server response time, or poor hosting. The fix depends on which of these is the actual bottleneck, which requires looking at the specific site's performance data (e.g. PageSpeed Insights, real-user Core Web Vitals) rather than guessing. 99 Visual can run a performance review and prioritize fixes by impact — the client should be ready to share their site URL and, if available, existing analytics or hosting details.",
  },
  {
    id: "problem-no-leads",
    text: "Getting traffic without leads usually comes from one or more of: unclear messaging/value proposition, weak or missing calls-to-action, slow page load, a landing page mismatched to what the visitor was searching for, forms that are too long or intimidating, or traffic that doesn't actually match the target customer. The useful first step is a combined website/CRO and analytics review rather than assuming it's a single problem. 99 Visual would want the site URL and a description of the ideal customer to start diagnosing this.",
  },
  {
    id: "problem-poor-seo-ranking",
    text: "Poor rankings can stem from technical issues (crawl/indexing errors, slow site, weak mobile experience), content issues (thin or duplicate content, missing topical coverage, poor keyword-intent match), or authority issues (few quality backlinks, low domain trust). A useful next step is a technical + content SEO audit to identify which category is limiting the site, since fixing the wrong one wastes effort. This requires access to the actual site and, ideally, Search Console data.",
  },
  {
    id: "problem-need-online-portal",
    text: "A request for a customer or employee portal usually means: a system where specific users log in and see data/actions relevant to them (orders, account status, documents, internal tools). Key scoping questions are: who are the users, what should they be able to see/do, does it need to connect to any existing system (CRM, ERP, database), and roughly how many users. 99 Visual builds these as web applications with authentication and role-based access rather than as a public website.",
  },
  {
    id: "problem-automate-repetitive-work",
    text: "Automating repetitive work starts with identifying one specific, high-volume, rule-based process — e.g. routing form submissions, generating recurring reports, or syncing data between two systems — rather than trying to automate an entire department at once. 99 Visual scopes automation projects by mapping the current manual steps first, then deciding which parts are pure workflow automation versus which parts need AI (for judgment/language understanding) layered in.",
  },
  {
    id: "problem-ai-integration",
    text: "Wanting 'AI integrated into the website' usually maps to one of a few concrete things: a chatbot that answers questions using company content, AI-powered search, automated content drafting, document processing, or an agent that completes multi-step tasks. The most useful next question is what specific task or question is currently slow, manual, or inconsistent — that determines which type of AI integration actually fits, rather than adding AI generically.",
  },
  {
    id: "problem-chatbot-on-company-docs",
    text: "A chatbot 'trained on our documents' is best built with retrieval-augmented generation (RAG) rather than fine-tuning: the company's documents are chunked and embedded, and the chatbot retrieves the most relevant chunks at answer time and grounds its response in them. This keeps answers accurate and lets the knowledge be updated by editing source content rather than retraining a model. 99 Visual would want to know roughly how much content/how many documents, how often it changes, and where visitors should be able to use the chatbot.",
  },
  {
    id: "problem-need-ecommerce",
    text: "An e-commerce project needs scoping around: number of products, whether inventory/variants are complex, required payment methods, shipping/tax logic, and whether it needs to integrate with existing systems (accounting, inventory, fulfillment). Technical build is only part of e-commerce success — SEO, paid ads, analytics, and CRO are usually needed alongside the storefront itself to actually drive and convert traffic.",
  },
  {
    id: "problem-scale-high-traffic",
    text: "Handling thousands of users reliably comes down to architecture choices: efficient database queries and indexing, caching where appropriate, a CDN for static assets, server-side rendering or edge/serverless deployment that scales automatically, and load testing before a high-traffic event (launch, sale, campaign). The right approach depends on the expected traffic pattern (steady growth vs. a sudden spike) and current bottlenecks, which 99 Visual would assess before recommending specific infrastructure changes.",
  },
  {
    id: "problem-rebuild-existing-website",
    text: "Deciding whether to rebuild or improve an existing website depends on: how much of the current site's technical foundation is workable versus fundamentally limiting, how much SEO equity (rankings, backlinks) exists that a rebuild could put at risk if not migrated carefully, and budget. A full rebuild makes sense when the existing platform can't support needed features or performance; an incremental improvement often makes sense when the foundation is sound but specific pages or flows are underperforming.",
  },
  {
    id: "problem-outdated-wordpress",
    text: "An outdated WordPress site commonly suffers from plugin bloat slowing the site down, security risk from unpatched plugins/themes, and design/UX that hasn't kept pace with the business. Options range from cleaning up and modernizing the existing WordPress install to migrating to a custom-built site (e.g. Next.js) for more control over performance and long-term maintainability — which option makes sense depends on how content-heavy the site is and how much custom functionality is needed.",
  },
  {
    id: "problem-need-mobile-app",
    text: "For a mobile app request, the first scoping question is whether it truly needs to be a native/cross-platform app (offline access, push notifications, device features like camera/GPS, app-store presence) or whether a well-built mobile-responsive web app would serve the same purpose with less ongoing maintenance overhead. 99 Visual can build cross-platform apps (e.g. with Flutter) when a true app is the right call.",
  },
  {
    id: "problem-need-employee-dashboard",
    text: "An internal employee dashboard request should be scoped around: what data needs to be visualized or acted on, where that data currently lives (spreadsheets, a database, another system), how many employees will use it, and what level of access control is needed by role. These are typically built as internal web applications rather than public-facing sites.",
  },
  {
    id: "problem-connect-crm",
    text: "Connecting a website to a CRM usually means routing form submissions, chatbot leads, or customer activity into the CRM automatically via API or webhook, with field mapping so the data lands in the right place. 99 Visual would need to know which CRM is in use and what data/events should sync before scoping this integration.",
  },
  {
    id: "problem-appear-ai-search",
    text: "Appearing in AI-generated answers (ChatGPT, Google AI Overviews, Perplexity, Gemini) is built on the same foundation as strong SEO — crawlable technical structure, clear well-organized content, and topical authority — plus specific habits like answering questions directly and concisely near the top of a page, using structured data, and building genuine third-party mentions/citations. There is no guaranteed way to force inclusion in an AI answer, since these systems choose sources algorithmically, but strengthening the underlying content and technical foundation measurably improves the odds.",
  },
  {
    id: "problem-3d-renders-real-estate",
    text: "For real-estate 3D renders, the useful details to gather are: whether the project is pre-construction (rendering from architectural plans) or an existing property, how many units/spaces need renders, whether interactive walkthroughs are needed alongside static renders, and the intended use (sales brochure, website, on-site display). 99 Visual can pair renders with a real-estate website and lead capture so the visuals directly support sales.",
  },
  {
    id: "problem-lidar-data-processing",
    text: "If a client already has LiDAR scan data and needs it processed, 99 Visual can clean and organize the point cloud and produce outputs like terrain models, elevation data, or a base layer for 3D reconstruction. Useful details upfront: the scan's source/format, the site size, and what the output needs to feed into (design, construction planning, GIS mapping).",
  },
  {
    id: "problem-drone-mapping",
    text: "For mapping from drone images, 99 Visual uses photogrammetry to stitch aerial photos into an orthomosaic map or full 3D site reconstruction — commonly used for construction progress tracking, land survey, and asset mapping. Useful details upfront: how the images were captured (drone model/flight pattern, overlap percentage), site size, and intended use of the output.",
  },
  {
    id: "problem-automated-testing-needed",
    text: "A request for automated software testing is best scoped by asking what's currently tested manually (or not tested at all), what's broken most often in production, and whether there's an existing CI/CD pipeline to plug automated tests into. 99 Visual typically starts by automating the highest-risk, most frequently broken flows first rather than trying to cover 100% of the application immediately.",
  },
  {
    id: "problem-legacy-app-migration",
    text: "Migrating an old application starts with an assessment of the current system: what it does, what data needs to be preserved, what's fragile or undocumented, and why the migration is needed (performance, security, hosting cost, inability to add new features). 99 Visual typically recommends this assessment phase before committing to a rebuild timeline, since legacy systems often have undocumented dependencies that only surface during close inspection.",
  },
  {
    id: "problem-need-amc-support",
    text: "A business asking about ongoing IT support or an AMC (Annual Maintenance Contract) usually wants regular, scheduled attention to their IT infrastructure rather than one-off firefighting. 99 Visual offers AMC coverage for IT infrastructure that includes preventive maintenance, troubleshooting, and regular system support. Useful scoping details: what hardware/systems are covered, how many devices/locations, and current pain points (frequent breakdowns, no dedicated IT support, slow response to issues).",
  },
  {
    id: "problem-need-office-network-setup",
    text: "Setting up or fixing office networking and connectivity typically involves router installation and configuration, basic network setup, and troubleshooting connectivity issues. 99 Visual handles this as part of its IT infrastructure and support services. Useful scoping details: number of devices/users on the network, current internet connection type, and whether there are specific connectivity problems already being experienced.",
  },
  {
    id: "problem-need-security-hardware",
    text: "A request to add CCTV or biometric attendance/access-control systems is IT hardware installation work: physical installation, configuration, and connecting the system to the local network. 99 Visual installs and configures both CCTV and biometric systems. Useful scoping details: number of cameras/entry points or biometric devices needed, the site layout, and whether this is a new installation or replacing existing equipment.",
  },

  // ────────────────────────────────────────────────────────────
  // 4. CLIENT-BUYING / EDUCATIONAL KNOWLEDGE
  // ────────────────────────────────────────────────────────────
  {
    id: "choosing-a-vendor",
    text: "When evaluating a web/software development vendor, useful questions include: can they show relevant past work, do they explain their technical choices clearly, how do they handle scope changes, what's included after launch, and do they communicate directly with the people doing the actual work rather than only through account managers. A vendor who asks good clarifying questions about the business problem — not just the feature list — is usually a better sign than one who quotes a price immediately.",
  },
  {
    id: "website-cost-factors",
    text: "Website and application cost is driven by: number and complexity of pages/screens, custom functionality versus template-based design, integrations (payments, CRM, third-party APIs), content volume, whether content/design assets already exist or need to be created, and timeline pressure. Because these vary so much, an honest vendor will not quote a firm number without first understanding these factors.",
  },
  {
    id: "development-timeline-factors",
    text: "Development timelines are driven by scope (number of features/pages), integration complexity, how quickly the client can provide content/feedback/approvals, and whether the team is starting from scratch versus building on an existing codebase. Delays most commonly come from slow client-side feedback cycles or late-added scope, not just development speed itself.",
  },
  {
    id: "rebuild-vs-improve",
    text: "Whether to rebuild from scratch or improve an existing website/app depends on whether the current technical foundation can actually support what's needed. If the platform itself is the limitation (can't scale, can't add needed features, fundamentally poor performance), a rebuild makes sense. If the foundation is sound but specific pages, flows, or features are underperforming, targeted improvement is usually faster, cheaper, and lower-risk — especially where existing SEO rankings need to be preserved.",
  },
  {
    id: "wordpress-vs-custom",
    text: "WordPress (or similar CMS platforms) is a reasonable choice for content-heavy sites managed by non-technical staff and where a large plugin ecosystem covers most needed functionality. Custom development (e.g. Next.js/React) gives more control over performance, security, and exactly-fitted functionality, at the cost of needing developer involvement for changes that a WordPress plugin might otherwise handle. The right choice depends on who will maintain the site day-to-day and how custom the required functionality is.",
  },
  {
    id: "react-vs-nextjs",
    text: "React is a UI library for building interactive interfaces; Next.js is a full framework built on React that adds routing, server-side rendering/static generation, and other production concerns out of the box. For most business websites and applications, Next.js is the more complete starting point since it handles SEO-relevant rendering concerns and routing that would otherwise need to be built manually on top of plain React.",
  },
  {
    id: "website-vs-webapp",
    text: "A website is primarily about presenting information to visitors (marketing site, brochure site, blog); a web application involves users logging in and interacting with data (portals, dashboards, SaaS products). The distinction matters for planning because applications need authentication, data modeling, and ongoing feature development in a way a marketing website typically doesn't.",
  },
  {
    id: "saas-vs-traditional-website",
    text: "A SaaS product is software delivered and paid for as an ongoing subscription, with all users on shared, centrally maintained infrastructure — distinct from a traditional website, which mainly presents information rather than being the product itself. Building a SaaS product requires additional planning around multi-tenancy, billing, user roles, and long-term scalability from the start, not just a website with a login added on.",
  },
  {
    id: "custom-vs-offtheshelf",
    text: "Off-the-shelf software is faster and cheaper to get running when it already fits the business process closely; custom software makes sense when the business's workflow is genuinely different from what off-the-shelf tools assume, or when integrating multiple existing tools together is more painful than building one system that fits. A useful first step is listing what's actually missing or awkward in current off-the-shelf tools before committing to a custom build.",
  },
  {
    id: "cloud-vs-traditional-hosting",
    text: "Cloud/serverless hosting (e.g. Vercel, AWS, edge platforms) scales automatically with traffic and often has lower operational overhead, which suits most modern web applications. Traditional VPS or dedicated hosting can make sense for specific workloads needing more control over the server environment. For most business websites and applications in 2026, cloud-native hosting is the more common and generally lower-maintenance default.",
  },
  {
    id: "post-launch-maintenance-expectations",
    text: "After launch, expect ongoing needs like security/dependency updates, hosting and uptime monitoring, occasional bug fixes, and periodic feature additions as the business changes. Clients should clarify with any vendor — including 99 Visual — exactly what's covered under any post-launch support period versus what would be a separate, billed engagement.",
  },
  {
    id: "mvp-planning",
    text: "Planning an MVP (Minimum Viable Product) means identifying the smallest version of the product that lets real users validate the core idea — not the smallest version of every planned feature. A good MVP scope prioritizes the one or two things the product must prove work before investing further, and treats everything else as a later phase. This reduces both cost and time-to-learning compared to building a fully-featured product before any real user feedback.",
  },
  {
    id: "project-prep-checklist",
    text: "Before starting a project, it helps to have ready: a clear description of the problem being solved (not just the feature list), any existing brand assets (logo, colors, content), access to any existing site/system that needs to be worked with, a rough budget range and timeline, and a list of must-have integrations. The more of this that's ready upfront, the faster and more accurate the initial quote and timeline will be.",
  },
  {
    id: "quote-information-needed",
    text: "To provide an accurate quote, 99 Visual typically needs: the type of project (website, application, e-commerce, AI feature, visualization, IT infrastructure/support, etc.), the core features/pages/hardware needed, any required integrations, existing assets or systems involved, target timeline, and whether ongoing maintenance/support is expected to be included. Sharing this upfront leads to a faster, more accurate proposal than a generic 'how much does this cost' question.",
  },
  {
    id: "proposal-contents",
    text: "A solid development proposal should clearly state: what will be delivered (scope), what's explicitly out of scope, the technology approach and why, timeline with milestones, pricing basis (fixed price vs. time-and-materials), what happens with change requests, and what's included after launch. A vague proposal without these details is a common source of disputes later in a project.",
  },
  {
    id: "evaluating-it-vendors",
    text: "When comparing IT/development vendors, look beyond price to: their communication style and responsiveness during the sales process itself (a preview of what working together will be like), whether they explain trade-offs honestly rather than agreeing to everything, how they handle scope changes and communicate delays, and whether their proposal is specific rather than boilerplate. References or examples of similar past work are useful, but asking pointed questions about how they'd approach your specific problem reveals more than a generic portfolio review.",
  },

  // ────────────────────────────────────────────────────────────
  // 5. CROSS-SERVICE SOLUTION PATTERNS
  // ────────────────────────────────────────────────────────────
  {
    id: "solution-path-website-growth",
    text: "A typical growth path for a business website: build a fast, well-structured site → add technical/on-page SEO → connect analytics to see what's working → layer in conversion rate optimization on underperforming pages → consider an AI chatbot to capture and qualify leads around the clock → set up a maintenance plan to keep performance and security current. These build on each other rather than being independent projects.",
  },
  {
    id: "solution-path-ecommerce-growth",
    text: "A typical e-commerce growth path: build a fast, conversion-ready storefront → SEO for product/category pages → paid advertising (Google/Meta) with retargeting → analytics to track what drives purchases → conversion rate optimization on the checkout flow → AI chatbot for customer support/product questions. Skipping the analytics/CRO step is a common reason ad spend underperforms.",
  },
  {
    id: "solution-path-real-estate",
    text: "A typical real-estate digital package: a lead-focused website → 3D visualization and interactive walkthroughs of properties or pre-construction units → SEO for local/property search terms → CRM integration so inquiries flow directly to the sales team → occasionally GIS/site-mapping for larger developments. Visualization work converts better when it's embedded in a website built to capture the resulting interest, rather than existing as a standalone asset.",
  },
  {
    id: "solution-path-construction",
    text: "A typical construction/infrastructure digital package: CAD drafting and GIS mapping for planning → drone photogrammetry and/or LiDAR processing for site/terrain data → 3D visualization for stakeholder presentation → progress tracking using repeated drone capture over time. These services are often used together across a single project's lifecycle rather than as one-off deliverables.",
  },
  {
    id: "solution-path-enterprise-software",
    text: "A typical enterprise software path: a web application built on cloud infrastructure → security-conscious architecture from the start → QA automation to catch regressions before release → CI/CD for reliable deployment → AI integration (e.g. internal knowledge assistant, automation) once the core application is stable. Retrofitting security and testing onto an already-built application is usually more expensive than designing them in from the start.",
  },
  {
    id: "solution-path-marketing",
    text: "A typical marketing-focused path: a fast, well-structured website → content and SEO for organic visibility → paid advertising for immediate traffic → landing pages matched to specific campaigns → analytics and CRO to improve what's already getting traffic → GEO/AEO-aware content structure so AI answer engines can also surface the business. Marketing works best as a connected system rather than isolated channels competing for separate budget.",
  },
  {
    id: "solution-path-ai-project",
    text: "A typical AI project path: identify the specific task or question the AI should handle → decide whether it needs a chatbot, RAG-based knowledge assistant, automation, or an agent that takes multi-step actions → build the retrieval/knowledge layer (embeddings, vector search) if grounding in company data is needed → integrate with the website or internal systems via API → add human-in-the-loop review for higher-stakes actions. Starting from a narrow, well-defined use case produces better results than trying to build a general-purpose AI system first.",
  },
  {
    id: "solution-path-office-it-setup",
    text: "A typical new-office or growing-business IT setup path: router installation and network configuration → new hardware installation (workstations, servers, peripherals) → security hardware such as CCTV and biometric attendance systems → software installation and configuration on end-user machines → an AMC arrangement for ongoing preventive maintenance and support once everything is running. These are commonly bundled together for a single site rather than done as separate uncoordinated visits.",
  },

  // ────────────────────────────────────────────────────────────
  // 6. INDUSTRY KNOWLEDGE
  // ────────────────────────────────────────────────────────────
  {
    id: "industry-real-estate",
    text: "Real estate businesses commonly need: a lead-generating website, 3D visualization/walkthroughs for listings or pre-construction projects, local SEO for property searches, and CRM integration so inquiries reach agents quickly. 99 Visual can combine website development, 3D visualization, and SEO for this sector; specific past real-estate clients or results should be confirmed directly with the team rather than assumed.",
  },
  {
    id: "industry-construction",
    text: "Construction and infrastructure businesses commonly need: CAD drafting, GIS mapping, LiDAR/photogrammetry for site and progress data, and digital presentation of projects for stakeholders or bids. 99 Visual's geospatial and visualization services apply directly here; a company website with case-study style project pages can also support business development for this sector.",
  },
  {
    id: "industry-architecture-engineering",
    text: "Architecture and engineering firms commonly need CAD drafting support, 3D visualization for client presentations and approvals, and a portfolio-focused website that showcases past work clearly. Accurate, well-organized visual presentation is often as important as the technical work itself in winning new projects in this sector.",
  },
  {
    id: "industry-manufacturing",
    text: "Manufacturing businesses commonly need: a professional website for B2B credibility and lead generation, product visualization/3D renders for catalogs, internal dashboards for production or inventory data, integration between a website's inquiry forms and internal CRM/ERP systems, and on-site IT infrastructure support (networking, servers, security hardware) for factory and office locations. QA automation is also relevant for any customer-facing software these businesses run.",
  },
  {
    id: "industry-retail-ecommerce",
    text: "Retail and e-commerce businesses commonly need a conversion-optimized storefront, product visualization/3D configurators for higher-consideration products, SEO and paid advertising for discovery, and analytics/CRO to keep improving conversion over time. An AI chatbot can also handle common product questions and reduce support load. Physical stores may also need in-store IT infrastructure such as networking, CCTV, and biometric staff attendance systems.",
  },
  {
    id: "industry-hospitality",
    text: "Hospitality businesses (hotels, resorts, venues) commonly need a fast, visually strong website, 3D/virtual walkthroughs of spaces, local SEO for location-based search, booking-system integration, and on-premise IT infrastructure such as networking, CCTV, and biometric staff attendance systems. Visual presentation quality has an outsized impact on conversion in this sector since customers are making a decision largely based on how a space looks and feels online.",
  },
  {
    id: "industry-healthcare-tech",
    text: "Healthcare-adjacent technology projects (patient portals, scheduling systems, internal healthcare-operations tools) commonly need careful attention to security, access control, and data handling. 99 Visual can build the application and integration layer for this kind of project, but any specific regulatory/compliance requirement (e.g. handling protected health information) should be explicitly scoped with legal/compliance input at the start rather than assumed to be covered by default.",
  },
  {
    id: "industry-education",
    text: "Education-sector projects commonly include learning platforms, student/staff portals, content-heavy websites, and internal dashboards for administration or reporting. These are typically built as web applications with role-based access (students, staff, administrators) rather than simple marketing sites. Campuses and institutes may also need biometric attendance systems, CCTV, and general networking/IT support.",
  },
  {
    id: "industry-logistics",
    text: "Logistics and supply-chain businesses commonly need internal dashboards for tracking/reporting, integrations between systems (e.g. order management, inventory, shipping providers), and automation for repetitive coordination tasks. GIS/mapping capabilities can also apply for route or asset visualization in this sector, and warehouses/depots commonly need on-site networking, CCTV, and biometric access-control hardware.",
  },
  {
    id: "industry-professional-services",
    text: "Professional services businesses (consulting, legal, financial, agencies) commonly need a credibility-focused website, SEO for their specific service niche, lead-capture and CRM integration, and increasingly a chatbot or AI-search-visible content strategy so prospective clients can find and evaluate them through both traditional search and AI answer engines.",
  },
  {
    id: "industry-startups-smes",
    text: "Startups and SMEs typically benefit from an MVP-first approach — building the smallest version of a product/website that proves the core value before investing in every planned feature — combined with lean marketing (SEO plus targeted paid ads) rather than large upfront spend across every channel. 99 Visual can scope a phased roadmap so early spending focuses on validating the business idea first. New offices commonly also need basic IT infrastructure set up (networking, hardware, security systems) alongside the digital product.",
  },

  // ────────────────────────────────────────────────────────────
  // 7. TECHNICAL TROUBLESHOOTING (first-level guidance only)
  // ────────────────────────────────────────────────────────────
  {
    id: "troubleshoot-website-performance",
    text: "First-level causes of a slow site: unoptimized images, too much unused/render-blocking JavaScript, no CDN or browser caching, slow server/database response, or unoptimized web fonts. General guidance can point to likely culprits, but confirming the actual bottleneck requires looking at the specific site's real performance data (e.g. PageSpeed Insights, server logs) — this chatbot cannot inspect a client's live site, server, or analytics directly, and a proper diagnosis needs that access.",
  },
  {
    id: "troubleshoot-seo-indexing",
    text: "If pages aren't being indexed: check for accidental 'noindex' tags, robots.txt blocking, incorrect canonical tags, sitemap errors, or the site being too new/low-authority to be crawled yet. As with performance issues, confirming which cause applies requires access to the specific site's Search Console data and source code, which this chatbot does not have — general guidance here should be treated as a starting checklist, not a diagnosis.",
  },
  {
    id: "troubleshoot-applications",
    text: "Common web application issues include: authentication/login failures (often session, token expiry, or misconfigured auth provider issues), third-party API integration failures (often auth, rate limits, or the third-party service being down), database performance problems (often missing indexes or inefficient queries as data grows), and deployment/environment configuration mismatches between development and production. Precise diagnosis needs access to logs, error messages, and the actual codebase.",
  },
  {
    id: "troubleshoot-ai-rag-quality",
    text: "If an AI chatbot gives wrong or inconsistent answers, common causes are: the knowledge base chunks are too broad or poorly organized for accurate retrieval, the underlying source content is outdated, embeddings weren't regenerated after content changed, or the retrieval step isn't returning enough (or the right) context for the question asked. Improving RAG quality usually means refining how content is chunked, keeping the knowledge base current, and testing retrieval against real user questions rather than only tuning the AI model's prompt.",
  },
  {
    id: "troubleshoot-network-connectivity",
    text: "Common causes of office network connectivity problems include router/modem misconfiguration, weak Wi-Fi coverage in parts of a site, IP address conflicts, outdated router firmware, or ISP-side outages. First-level troubleshooting can point to likely causes, but confirming the exact issue requires being on-site or having access to the router/network configuration, which is part of 99 Visual's router installation and networking support service.",
  },

  // ────────────────────────────────────────────────────────────
  // 8. MARKET / TREND KNOWLEDGE (2026) — refresh periodically
  // ────────────────────────────────────────────────────────────
  {
    id: "trend-core-web-vitals-2026",
    text: "As of 2026, Google's Core Web Vitals thresholds remain LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1, measured from real-user (field) data at the 75th percentile rather than lab tests alone. INP (which replaced the older FID metric) is generally the hardest metric for sites to pass since fixing it often requires deeper JavaScript architecture changes, not just image or caching fixes.",
  },
  {
    id: "trend-ai-search-2026",
    text: "As of 2026, AI answer engines (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Gemini) have become a meaningful share of how people research purchases, alongside traditional search. Industry guidance — including from Google itself — treats optimizing for these AI surfaces as an extension of solid SEO rather than a separate discipline: strong technical SEO, clear well-structured content, and topical authority remain the foundation both traditional and AI search rely on.",
  },
  {
    id: "trend-agentic-ai-2026",
    text: "As of 2026, businesses are increasingly moving from simple AI chat assistants toward agentic workflows — AI that can carry out multi-step tasks with less constant human direction, commonly starting in customer support, sales/lead-handling, and back-office operations. Industry analysis generally frames 2026 as the year agentic AI shifted from experimentation toward operational use for early-adopter businesses, though thoughtful human oversight for higher-stakes decisions remains standard practice rather than fully unattended automation.",
  },
  {
    id: "trend-headless-api-first",
    text: "Headless and API-first architecture — where the frontend is decoupled from the backend/content system and connected via APIs — continues to be a common approach for businesses that need flexibility across multiple frontends (web, mobile, in-store displays) or that want to avoid being locked into a single monolithic CMS platform.",
  },
  {
    id: "trend-ai-native-websites",
    text: "A growing expectation for modern websites is being 'AI-ready': content structured with clean semantic HTML and schema markup so both search engines and AI systems can parse it accurately, fast and accessible pages, and increasingly an on-site AI assistant (chatbot/voice) so visitors can get answers directly rather than searching through pages manually.",
  },

  // ────────────────────────────────────────────────────────────
  // 9. SALES QUALIFICATION & RESPONSE STYLE (guidance for the bot)
  // ────────────────────────────────────────────────────────────
  {
    id: "lead-qualification-signals",
    text: "Signals that a visitor is a genuine potential lead include: describing a specific business problem or project need, asking about pricing or timelines, comparing 99 Visual to other vendors, or asking detailed technical/process questions about how a project would work. When these signals appear, it's appropriate to ask one relevant follow-up question and, once there's real buying intent, to suggest a discovery call — without pushing every visitor toward a sales conversation regardless of what they actually asked.",
  },
  {
    id: "discovery-call-questions",
    text: "Useful qualifying questions to ask a prospective client (one or two at a time, not all at once) include: what type of business they operate, what specific problem they're trying to solve, whether they have an existing website/application/IT setup already, what integrations or hardware are required, their expected timeline, and roughly how many users/customers/devices the solution needs to support. The goal is understanding the requirement well enough to route them toward the right service and a useful discovery call — not interrogating every visitor with a full checklist.",
  },
  {
    id: "response-guidelines-conversion",
    text: "A good response to a client problem answers the question first in plain terms, explains the likely causes or approach, connects it to the specific 99 Visual service that helps, asks at most one relevant follow-up question, and — only where there's genuine buying intent — offers a discovery call or invites them to share more project detail. Responses should read as helpful consulting, not a generic service pitch; avoid restating a full list of services when only one is relevant to what was asked.",
  },

  // ────────────────────────────────────────────────────────────
  // 10. IT INFRASTRUCTURE & SUPPORT SERVICES
  // (on-site/physical IT services — distinct from the software, web, and
  // creative services in section 2; scoped strictly to what's confirmed here)
  // ────────────────────────────────────────────────────────────
  {
    id: "it-infrastructure-support-overview",
    text: "Alongside its software, web, and creative services, 99 Visual also provides IT Infrastructure & Support Services covering the physical/on-site side of business IT: Annual Maintenance Contracts (AMC), router installation and configuration, software and networking services, new hardware installation, biometric attendance/access-control system installation, server installation and configuration, CCTV installation, and operating system upgrades. This category is kept distinct from 99 Visual's software/web/creative services, since it involves on-site hardware and infrastructure work rather than digital product development.",
  },
  {
    id: "amc-services",
    text: "99 Visual offers AMC (Annual Maintenance Contract) services: annual maintenance and technical support for IT infrastructure. This covers preventive maintenance, troubleshooting, and regular system support, intended for businesses that want ongoing, scheduled IT support rather than one-off fixes when something breaks.",
  },
  {
    id: "router-installation",
    text: "99 Visual provides router installation and configuration as part of its IT infrastructure services: setting up routers, configuring network settings, and general network setup. This includes network connectivity support and basic troubleshooting if connectivity issues come up.",
  },
  {
    id: "software-networking-services",
    text: "99 Visual provides software and networking services for businesses: software installation and configuration, network setup, troubleshooting and maintenance, and general system and network support. This is aimed at keeping a business's day-to-day software and network environment running reliably.",
  },
  {
    id: "new-hardware-installation",
    text: "99 Visual installs and configures new IT hardware for businesses, including biometric attendance systems, servers, CCTV systems, and other business IT hardware and peripherals. This covers the physical setup and configuration of new equipment being added to a business's IT environment.",
  },
  {
    id: "biometric-system-installation",
    text: "99 Visual installs and configures biometric attendance and access-control systems, including hardware setup and basic system configuration. This is commonly used by businesses wanting to track staff attendance or control access to specific areas.",
  },
  {
    id: "server-installation",
    text: "99 Visual provides server installation and configuration services: setting up new servers, basic server setup, connectivity, and maintenance support. This is relevant for businesses adding on-premise server infrastructure or replacing existing server hardware.",
  },
  {
    id: "cctv-installation",
    text: "99 Visual installs and configures CCTV camera systems, including network connectivity for the cameras and basic troubleshooting. This covers physical camera installation and getting the system connected and operational on the business's network.",
  },
  {
    id: "os-upgrade",
    text: "99 Visual provides operating system upgrade services — upgrading Windows or other operating systems and handling related system configuration. This includes compatibility checks before the upgrade and troubleshooting support after the upgrade is completed.",
  },
];