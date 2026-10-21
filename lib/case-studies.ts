// lib/case-studies.ts
// ─────────────────────────────────────────────────────────────────────────────
// Case-study registry — single source of truth for /work and /work/[slug].
//
// EVIDENCE RULE
//   Every case study here describes delivered work that can be traced to
//   evidence (a repository, commit, live URL, report or screenshot). Each
//   workstream item carries an `evidence` reference for that reason. Nothing
//   is added on the strength of a description alone, and no results (rankings,
//   traffic, revenue, indexing counts) are stated unless data backs them.
//
//   Work that is delivered but not yet documented with evidence is NOT listed
//   as a placeholder: a thin "coming soon" page is a weak page for search
//   engines and visitors alike. Add the entry once the evidence is in hand.
//
// TESTING CLAIMS
//   Test coverage uses three explicit levels (see TestStatus). A scenario is
//   only "implemented" when the test code exists, and only "executed" when a
//   report, CI run or log shows it ran. The page renders the level beside
//   every row, so the distinction is visible to readers, not just to editors.
// ─────────────────────────────────────────────────────────────────────────────

export type TestStatus = 'scenario' | 'implemented' | 'executed';

export const TEST_STATUS_LABEL: Record<TestStatus, string> = {
  scenario: 'Scenario defined',
  implemented: 'Test implemented',
  executed: 'Executed (evidence on file)',
};

export interface WorkItem {
  title: string;
  detail: string;
  /** Where this can be verified: commit hash, file path, report or URL. */
  evidence: string;
}

export interface Workstream {
  name: string;
  summary: string;
  items: WorkItem[];
}

export interface TestRow {
  area: string;
  scenario: string;
  status: TestStatus;
  evidence?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** <title> text (brand suffix is added by the layout). Keep under ~45 chars. */
  metaTitle: string;
  /** Short label for cards and breadcrumbs. */
  navLabel: string;
  /** Meta description and card summary (unique per case study). */
  description: string;
  /** Who the work was for, exactly as the client has agreed to be named. */
  client: string;
  /** Live URL of the delivered work, if public. */
  liveUrl?: string;
  /** ISO dates from the evidence (e.g. first and last commit). */
  period: { start: string; end: string };
  /** Content dates for this case-study page itself. */
  published: string;
  updated: string;
  /** The service page this work belongs to (internal linking). */
  service: { label: string; href: string };
  image: { src: string; alt: string; width: number; height: number };
  /** The situation before the work started. */
  context: string[];
  /** Ordered workflow, from audit to monitoring. */
  workflow: { step: string; detail: string }[];
  workstreams: Workstream[];
  /** Optional test matrix — only for work with real test evidence. */
  tests?: TestRow[];
  /** What the evidence supports, stated plainly. */
  outcomes: string[];
  /** What this case study deliberately does not claim, and why. */
  notClaimed: string[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'technical-seo-99visual',
    title: 'End-to-End Technical SEO for a Next.js Company Website',
    metaTitle: 'Technical SEO Case Study: Next.js Website',
    navLabel: 'Technical SEO: 99visual.com',
    description:
      'How we audited, rebuilt and now monitor the technical SEO of 99visual.com — crawlability, canonicals, sitemaps, redirects, structured data and page speed — with every change traceable in version control.',
    client: '99 Visual Solutions (our own website)',
    liveUrl: 'https://www.99visual.com',
    period: { start: '2026-04-16', end: '2026-10-19' },
    published: '2026-10-21',
    updated: '2026-10-21',
    service: { label: 'Digital Marketing & SEO services', href: '/services/digital-marketing-seo' },
    image: {
      src: '/images/services/digital-marketing-seo-hero-banner.jpg',
      alt: 'Digital marketing and SEO services by 99 Visual Solutions',
      width: 1717,
      height: 916,
    },
    context: [
      'Our own website moved to a Next.js (App Router) build in 2026, replacing an older site whose URLs were still in Google’s index. A rebuild like this is where search visibility is most often lost: old URLs return 404s, new pages ship without canonicals, and JavaScript-driven navigation hides links from crawlers.',
      'We treated the site as we would a client engagement — audit first, fix in small traceable changes, check each fix against what Google actually receives, and keep monitoring in Google Search Console afterwards. This page documents that work. Because the client is us, every change below can be inspected in the site’s source history.',
    ],
    workflow: [
      {
        step: 'Audit',
        detail:
          'Crawl the live site and the source together: what each URL returns, its robots directives and canonical, what the server-rendered HTML contains before JavaScript runs, and what Search Console reports for coverage and enhancements.',
      },
      {
        step: 'Prioritise',
        detail:
          'Rank issues by what blocks crawling or indexing first (404s, wrong canonicals, hidden links), then by what weakens how pages are understood (structured data, titles, internal links), then by speed.',
      },
      {
        step: 'Implement',
        detail:
          'Fix at the source of truth rather than page by page — one robots generator, one sitemap generator, one date registry, one set of schema helpers — so the same mistake can’t reappear on the next page.',
      },
      {
        step: 'Validate',
        detail:
          'Re-fetch the live URLs and check the delivered HTML and headers, validate structured data, then use Search Console URL Inspection and sitemap reports to confirm Google sees the change.',
      },
      {
        step: 'Monitor',
        detail:
          'Watch Search Console coverage and enhancement reports, and fix new issues as they surface. Monitoring is ongoing; several of the fixes below came directly from Search Console reports.',
      },
    ],
    workstreams: [
      {
        name: 'Crawlability & indexability',
        summary: 'Making sure Google can reach every page that should rank, and nothing that shouldn’t.',
        items: [
          {
            title: 'robots.txt generated from code',
            detail:
              'Private areas (/api, /admin, /login) are disallowed for every crawler group, not just the default one. Rules that blocked tracking-parameter URLs were removed so Google can see their canonical tags, and /_next/ was unblocked so Google can load the CSS, JavaScript and images it needs to render pages.',
            evidence: 'app/robots.ts',
          },
          {
            title: 'Navigation links visible to crawlers',
            detail:
              'The header’s Services menu only existed in the HTML while a mouse hovered over it, so the server-rendered page had no main-menu links to any service page. The panel is now always rendered and hidden with CSS while closed, with descriptive anchor text.',
            evidence: 'commit ae7bf7a',
          },
          {
            title: 'Staging copies kept out of the index',
            detail:
              'Any request that isn’t for www.99visual.com — preview deployments, the hosting alias — is served an X-Robots-Tag: noindex header, so duplicate copies of the site can’t compete with the real one.',
            evidence: 'next.config.ts (headers)',
          },
          {
            title: 'Thin pages held back until they’re ready',
            detail:
              'Insights topic pages are noindex,follow and absent from the sitemap until a topic has at least two published articles; empty topics return 404.',
            evidence: 'commit 4de8d1d',
          },
        ],
      },
      {
        name: 'URLs, canonicals & redirects',
        summary: 'One clean URL per page, and every legacy URL sent somewhere useful.',
        items: [
          {
            title: '15 permanent redirects for legacy URLs',
            detail:
              'Old service, partner, blog, category and date-archive URLs from the previous site now 301 to their closest current page. Two of them were found because Search Console listed the old URL as returning 404 or not indexed.',
            evidence: 'next.config.ts (redirects)',
          },
          {
            title: 'Self-referencing canonicals everywhere',
            detail:
              'Every page declares an absolute canonical on the production host. On articles, a stored canonical field could keep a renamed article’s old slug, so the page pointed its canonical at a 404 and the sitemap silently dropped it; articles now always canonicalise to their own URL.',
            evidence: 'commit 1bc8e89',
          },
        ],
      },
      {
        name: 'XML sitemap',
        summary: 'A sitemap that lists exactly the indexable pages, with honest dates.',
        items: [
          {
            title: 'Generated and refreshed automatically',
            detail:
              'The sitemap is regenerated at most hourly and on every article save, so new articles appear without a redeploy. It covers core pages, service pages, Insights articles and topic pages, and video watch pages with video metadata.',
            evidence: 'app/sitemap.ts, lib/revalidate-insights.ts',
          },
          {
            title: 'Truthful lastmod dates',
            detail:
              'Most pages previously claimed a last-modified date earlier than the site’s own code. Dates now come from one registry that the sitemap and each page’s structured data both read, so they can’t disagree, and article dates no longer change when a page is merely viewed.',
            evidence: 'lib/page-dates.ts, commit 7289ceb',
          },
        ],
      },
      {
        name: 'Structured data',
        summary: 'Schema that describes the business and each page accurately — and validates.',
        items: [
          {
            title: 'One connected schema graph per page',
            detail:
              'Organization, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Article/BlogPosting, CollectionPage, ItemList and VideoObject nodes, linked by stable @id references instead of duplicated objects.',
            evidence: 'lib/schema.ts',
          },
          {
            title: 'Validation fixes',
            detail:
              'Invalid JSON-LD date formats are normalised or dropped (never defaulted to “now”), duplicate breadcrumb nodes were removed, and an FAQ graph that was built but never rendered on the Help Center is now output.',
            evidence: 'lib/schema-date.ts, commit 7289ceb',
          },
          {
            title: 'Video watch pages',
            detail:
              'Search Console reported that videos weren’t on a watch page. Each clip now has its own page with VideoObject data and a video sitemap entry, with durations and thumbnails taken from the files themselves.',
            evidence: 'lib/videos.ts, commit 039484a',
          },
        ],
      },
      {
        name: 'On-page SEO & internal linking',
        summary: 'Titles, descriptions and links that tell Google what each page is for.',
        items: [
          {
            title: 'Titles and meta descriptions',
            detail:
              'A sitewide title template with automatic removal of doubled brand suffixes, and meta descriptions trimmed at a sentence or word boundary to fit search results while the page keeps the full text.',
            evidence: 'lib/seo.ts',
          },
          {
            title: 'Internal links between related pages',
            detail:
              'Footer links to every service page and to previously orphaned pages; articles link to their topic page and the related service; every article now links to other articles (previously three of five linked to none).',
            evidence: 'app/components/footer.tsx, commit 1bc8e89',
          },
        ],
      },
      {
        name: 'Page speed',
        summary: 'Changes aimed at Core Web Vitals, described as changes — not as measured scores.',
        items: [
          {
            title: 'Render-blocking font requests removed',
            detail:
              'About 27 separate Google Fonts @import rules scattered through page styles were replaced with one preconnect and one stylesheet in the document head.',
            evidence: 'commit 840bca9',
          },
          {
            title: 'Pages no longer start invisible',
            detail:
              'The page-transition wrapper shipped every page with opacity 0 until JavaScript finished, delaying the largest contentful paint. The fade now runs only on in-site navigation.',
            evidence: 'app/components/PageTransition.tsx',
          },
          {
            title: 'Oversized assets',
            detail:
              'A 4904px, 11.3 MB photo shown at about 500px wide was resized to 1600px and 115 KB, and a stylesheet reference to a missing image (a 404 on every visit) was removed.',
            evidence: 'commit 96b81e4',
          },
        ],
      },
    ],
    outcomes: [
      'Every page in the sitemap is built to declare index,follow and a self-referencing canonical on the production host, and robots.txt allows Google to crawl all of them — confirmed in the source and spot-checked on the live site.',
      'robots.txt and the sitemap are generated from the same code that renders the pages, so they stay in step as the site changes.',
      'Every change listed above is a reviewable commit in the site’s source history, with the reason written alongside it.',
    ],
    notClaimed: [
      'Ranking, traffic or lead changes: we haven’t published before-and-after data, so we make no claim about them here.',
      'Indexing results: several service pages were still awaiting indexing when this was written. Getting pages crawlable and correctly signalled is within our control; when Google indexes them is not.',
      'Core Web Vitals scores: the speed changes are implemented, but we haven’t published field data measuring their effect.',
    ],
    stack: ['Next.js App Router', 'TypeScript', 'Prisma / PostgreSQL', 'Vercel', 'Google Search Console', 'Schema.org JSON-LD'],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * The /work index stays noindex,follow (and out of the sitemap) until it lists
 * at least this many case studies — a one-card listing page adds little on
 * its own. Same pattern as Insights topic pages.
 */
export const MIN_CASE_STUDIES_FOR_INDEXABLE_INDEX = 2;

export function workIndexIsIndexable(): boolean {
  return caseStudies.length >= MIN_CASE_STUDIES_FOR_INDEXABLE_INDEX;
}

/** Newest `updated` date across all case studies (ISO yyyy-mm-dd). */
export function latestCaseStudyUpdate(): string | undefined {
  return caseStudies.map((c) => c.updated).sort().at(-1);
}
