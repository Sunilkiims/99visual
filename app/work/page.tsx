import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { caseStudies, workIndexIsIndexable, latestCaseStudyUpdate } from '@/lib/case-studies'
import {
  BASE,
  buildGraph,
  orgSchema,
  websiteSchema,
  breadcrumbFromPath,
  webPage,
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
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <main className="min-h-screen bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Our Work
          </h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Case studies of work we’ve delivered. Each one sets out what we did and how, points to where it
            can be checked, and says plainly what it doesn’t claim.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} className="group block h-full rounded-3xl overflow-hidden bg-gray-900/60 border border-gray-800 hover:border-orange-500/40 transition-colors">
                  <div className="relative aspect-video bg-gray-800">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2">{c.service.label.replace(/ services$/i, '')}</p>
                    <h2 className="text-white text-xl font-semibold group-hover:text-orange-400 transition-colors leading-snug mb-2">{c.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{c.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 p-7 bg-gray-900/60 border border-gray-800 rounded-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-300">Looking for something specific? Browse <Link href="/services" className="text-orange-400 hover:text-orange-300">all our services</Link>.</p>
            <Link href="/contact" className="self-start sm:self-auto px-5 py-2.5 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-400 transition-colors">
              Start a project
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
