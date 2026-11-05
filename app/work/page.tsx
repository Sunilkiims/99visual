import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { caseStudies, workIndexIsIndexable, latestCaseStudyUpdate } from '@/lib/case-studies'
import { videos } from '@/lib/videos'
import { SectionHeading } from '@/app/components/ui/primitives'
import { Breadcrumbs } from '@/app/components/premium/service/ServiceBlocks'
import { CTASection } from '@/app/components/premium/home/HomeSections'
import {
  BASE,
  buildGraph,
  orgSchema,
  websiteSchema,
  breadcrumbFromPath,
  webPage,
  jsonLdString,
} from '@/lib/schema'

// ─────────────────────────────────────────────────────────────────────────────
// /work — "Our Work" index of documented case studies.
// noindex,follow (and absent from the sitemap) until it lists at least
// MIN_CASE_STUDIES_FOR_INDEXABLE_INDEX studies; the individual case-study
// pages are indexable from day one. Followed links still pass crawl paths.
// ─────────────────────────────────────────────────────────────────────────────

const DESCRIPTION =
  'Documented projects from 99 Visual Solutions — what we delivered, how we did it, and where each piece of work can be verified.'

const indexable = workIndexIsIndexable()
const updated = latestCaseStudyUpdate()

export const metadata: Metadata = {
  title: 'Our Work: Case Studies',
  description: DESCRIPTION,
  alternates: { canonical: `${BASE}/work` },
  openGraph: {
    title: 'Our Work | 99 Visual Solutions',
    description: DESCRIPTION,
    url: `${BASE}/work`,
    siteName: '99 Visual Solutions',
    type: 'website',
    ...(caseStudies[0] && {
      images: [{ url: `${BASE}${caseStudies[0].image.src}`, alt: caseStudies[0].image.alt }],
    }),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | 99 Visual Solutions',
    description: DESCRIPTION,
  },
  robots: { index: indexable, follow: true },
}

export default function WorkIndexPage() {
  const graph = buildGraph(
    orgSchema,
    websiteSchema,
    breadcrumbFromPath('/work', { work: 'Our Work' }),
    webPage({
      pathname: '/work',
      name: 'Our Work | 99 Visual Solutions',
      description: DESCRIPTION,
      ...(updated && { dateModified: `${updated}T00:00:00+05:30` }),
    }),
    {
      '@type': 'ItemList',
      '@id': `${BASE}/work#case-studies`,
      itemListElement: caseStudies.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}/work/${c.slug}`,
        name: c.title,
      })),
    },
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }} />
      <div className="vz">
        <Header />
        <main id="main">
          <section className="vz-hero vz-hero--page" aria-labelledby="work-hero-heading">
            <div className="vz-grid-bg" aria-hidden="true" />
            <div className="vz-aurora vz-hero__aurora-a" aria-hidden="true" />
            <div className="vz-container vz-page-hero">
              <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/work', label: 'Our Work' }]} />
              <p className="vz-eyebrow">Portfolio</p>
              <h1 id="work-hero-heading" className="vz-display">Our <span className="vz-grad-text">Work</span></h1>
              <p className="vz-lead vz-page-hero__lead">
                Case studies of work we’ve delivered. Each one sets out what we did and how, points to where it
                can be checked, and says plainly what it doesn’t claim.
              </p>
            </div>
          </section>

          <section className="vz-section vz-section--surface" aria-labelledby="work-cs-heading">
            <div className="vz-container">
              <SectionHeading id="work-cs-heading" eyebrow="Case studies" title="Documented projects" />
              <ul className="vz-work vz-work--2" role="list">
                {caseStudies.map((c) => (
                  <li key={c.slug}>
                    <article className="vz-work__card">
                      <div className="vz-work__media">
                        <Image src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                      </div>
                      <div className="vz-work__meta">
                        <span className="vz-chip">{c.service.label.replace(/ services$/i, '')}</span>
                        <h2 className="vz-h3"><Link href={`/work/${c.slug}`} className="vz-stretched">{c.title}</Link></h2>
                        <p className="vz-body">{c.description}</p>
                        <ul className="vz-chips" role="list">
                          {c.stack.slice(0, 5).map((t) => <li key={t} className="vz-chip">{t}</li>)}
                        </ul>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="vz-section" aria-labelledby="work-video-heading">
            <div className="vz-container">
              <div className="vz-row-head">
                <SectionHeading id="work-video-heading" eyebrow="3D visualization" title="Video showcase" lead="Rendered walkthroughs, animation and product visualization from our studio." />
                <Link href="/videos" className="vz-btn vz-btn--ghost">All videos →</Link>
              </div>
              <ul className="vz-posts" role="list">
                {videos.slice(0, 3).map((v) => (
                  <li key={v.slug}>
                    <article className="vz-post">
                      <div className="vz-post__media">
                        <Image src={v.thumbnail} alt={v.thumbnailAlt} fill sizes="(min-width: 768px) 33vw, 100vw" />
                        <span className="vz-work__play" aria-hidden="true">▶</span>
                      </div>
                      <h3 className="vz-h3"><Link href={`/videos/${v.slug}`} className="vz-stretched">{v.title}</Link></h3>
                      <p className="vz-body vz-post__excerpt">{v.description}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <CTASection
            title="Looking for something specific?"
            body="Browse all our services, or tell us about your project and we’ll reply within 24 business hours."
          />
        </main>
        <Footer />
      </div>
    </>
  )
}
