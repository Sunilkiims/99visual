import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { caseStudies, getCaseStudyBySlug, TEST_STATUS_LABEL, type TestStatus } from '@/lib/case-studies'
import { metaDescription } from '@/lib/seo'
import {
  BASE,
  buildGraph,
  orgSchema,
  websiteSchema,
  breadcrumbFromPath,
  webPage,
} from '@/lib/schema'

// ─────────────────────────────────────────────────────────────────────────────
// /work/[slug] — one delivered project, documented from evidence.
// Content lives in lib/case-studies.ts; this file only renders it. Every
// workstream item shows the evidence reference it was written from, and the
// "What we don't claim" block is always rendered so limits are stated on the
// page itself, not just in source comments.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

const iso = (d: string) => `${d}T00:00:00+05:30`

function formatDate(d: string) {
  return new Date(`${d}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case Study Not Found' }

  const url = `${BASE}/work/${study.slug}`
  const image = `${BASE}${study.image.src}`

  return {
    // Brand suffix comes from the root layout's title template.
    title: study.metaTitle,
    description: metaDescription(study.description),
    alternates: { canonical: url },
    openGraph: {
      title: study.title,
      description: study.description,
      url,
      siteName: '99 Visual Solutions',
      type: 'article',
      publishedTime: iso(study.published),
      modifiedTime: iso(study.updated),
      images: [{ url: image, width: study.image.width, height: study.image.height, alt: study.image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  }
}

const STATUS_STYLE: Record<TestStatus, string> = {
  scenario: 'bg-gray-800 text-gray-300 border-gray-700',
  implemented: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
  executed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const pathname = `/work/${study.slug}`
  const url = `${BASE}${pathname}`

  const graph = buildGraph(
    orgSchema,
    websiteSchema,
    breadcrumbFromPath(pathname, { work: 'Our Work', [study.slug]: study.navLabel }),
    webPage({
      pathname,
      name: `Case Study: ${study.title} | 99 Visual Solutions`,
      description: study.description,
      image: `${BASE}${study.image.src}`,
      datePublished: iso(study.published),
      dateModified: iso(study.updated),
    }),
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: study.title,
      description: study.description,
      image: { '@type': 'ImageObject', url: `${BASE}${study.image.src}`, width: study.image.width, height: study.image.height },
      url,
      datePublished: iso(study.published),
      dateModified: iso(study.updated),
      inLanguage: 'en',
      author: { '@id': `${BASE}/#organization` },
      publisher: { '@id': `${BASE}/#organization` },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      about: { '@id': `${BASE}${study.service.href}#service` },
    },
  )

  const others = caseStudies.filter((c) => c.slug !== study.slug)

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <main className="min-h-screen bg-gray-950">
        <article className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24">

          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <Link href="/work" className="hover:text-orange-400 transition-colors">Our Work</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-gray-400">Case study</span>
          </nav>

          <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Case study</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {study.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">{study.description}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
              <dt className="text-gray-500 text-xs uppercase tracking-wider mb-1">Client</dt>
              <dd className="text-gray-200 text-sm">{study.client}</dd>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
              <dt className="text-gray-500 text-xs uppercase tracking-wider mb-1">Period</dt>
              <dd className="text-gray-200 text-sm">
                <time dateTime={study.period.start}>{formatDate(study.period.start)}</time>
                {' – '}
                <time dateTime={study.period.end}>{formatDate(study.period.end)}</time>
                <span className="text-gray-500"> · ongoing</span>
              </dd>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
              <dt className="text-gray-500 text-xs uppercase tracking-wider mb-1">Service</dt>
              <dd className="text-sm">
                <Link href={study.service.href} className="text-orange-400 hover:text-orange-300 transition-colors">
                  {study.service.label}
                </Link>
              </dd>
            </div>
          </dl>

          <div style={{ aspectRatio: `${study.image.width} / ${study.image.height}` }} className="relative w-full rounded-3xl overflow-hidden mb-12 bg-gray-800 border border-gray-800/60">
            <Image src={study.image.src} alt={study.image.alt} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>

          <section aria-labelledby="context-heading" className="mb-14">
            <h2 id="context-heading" className="font-serif text-2xl md:text-3xl font-bold text-white mb-5">The starting point</h2>
            <div className="space-y-5">
              {study.context.map((p, i) => (
                <p key={i} className="text-gray-400 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="workflow-heading" className="mb-14">
            <h2 id="workflow-heading" className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">How we worked</h2>
            <ol className="space-y-4">
              {study.workflow.map((w, i) => (
                <li key={w.step} className="flex gap-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-800">
                  <span className="flex-none w-8 h-8 rounded-full bg-orange-500/15 text-orange-400 text-sm font-bold flex items-center justify-center" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{w.step}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{w.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="delivered-heading" className="mb-14">
            <h2 id="delivered-heading" className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">What we delivered</h2>
            <p className="text-gray-500 text-sm mb-8">Each item lists where it can be verified.</p>
            <div className="space-y-10">
              {study.workstreams.map((ws) => (
                <div key={ws.name}>
                  <h3 className="text-xl font-semibold text-white mb-1">{ws.name}</h3>
                  <p className="text-gray-500 mb-4">{ws.summary}</p>
                  <ul className="space-y-3">
                    {ws.items.map((item) => (
                      <li key={item.title} className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800">
                        <p className="text-gray-100 font-medium mb-1">{item.title}</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.detail}</p>
                        <p className="text-xs text-gray-500">
                          Evidence: <code className="text-gray-400 bg-gray-800/80 px-1.5 py-0.5 rounded">{item.evidence}</code>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {study.tests && study.tests.length > 0 && (
            <section aria-labelledby="tests-heading" className="mb-14">
              <h2 id="tests-heading" className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Test coverage</h2>
              <p className="text-gray-500 text-sm mb-6">
                Status is stated per row: a defined scenario, a test written in code, or a test with a run on record.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-800">
                <table className="w-full text-sm">
                  <thead className="bg-gray-900 text-gray-400 text-left">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Area</th>
                      <th scope="col" className="px-4 py-3 font-medium">Scenario</th>
                      <th scope="col" className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {study.tests.map((t) => (
                      <tr key={`${t.area}-${t.scenario}`}>
                        <td className="px-4 py-3 text-gray-300 align-top">{t.area}</td>
                        <td className="px-4 py-3 text-gray-400 align-top">
                          {t.scenario}
                          {t.evidence && <span className="block text-xs text-gray-500 mt-1">Evidence: {t.evidence}</span>}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className={`inline-block whitespace-nowrap px-2.5 py-1 rounded-full border text-xs ${STATUS_STYLE[t.status]}`}>
                            {TEST_STATUS_LABEL[t.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section aria-labelledby="outcomes-heading" className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800">
              <h2 id="outcomes-heading" className="text-lg font-semibold text-white mb-4">What the evidence supports</h2>
              <ul className="space-y-3">
                {study.outcomes.map((o) => (
                  <li key={o} className="text-gray-400 text-sm leading-relaxed pl-4 border-l-2 border-emerald-500/50">{o}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-4">What we don’t claim</h2>
              <ul className="space-y-3">
                {study.notClaimed.map((o) => (
                  <li key={o} className="text-gray-400 text-sm leading-relaxed pl-4 border-l-2 border-gray-600">{o}</li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="stack-heading" className="mb-14">
            <h2 id="stack-heading" className="text-xs uppercase tracking-widest text-gray-500 mb-3">Stack &amp; tools</h2>
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900 border border-gray-800 text-gray-400">{s}</li>
              ))}
            </ul>
          </section>

          <div className="p-7 bg-gray-900/60 border border-gray-800 rounded-3xl mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-white font-semibold mb-1">Want the same audit for your site?</p>
              <p className="text-gray-400 text-sm">See the full service, or tell us what you’re working with.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={study.service.href} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-700 text-gray-200 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
                View the service
              </Link>
              <Link href="/contact" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-400 transition-colors">
                Get in touch
              </Link>
            </div>
          </div>

          {others.length > 0 && (
            <nav aria-labelledby="more-heading">
              <h2 id="more-heading" className="mb-5 text-xs uppercase tracking-widest">
                <Link href="/work" className="text-white hover:text-orange-400 font-semibold transition-colors">More of our work →</Link>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/work/${c.slug}`} className="group block p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-orange-500/40 transition-colors">
                      <p className="text-gray-200 font-medium group-hover:text-orange-400 transition-colors mb-1">{c.title}</p>
                      <p className="text-gray-500 text-sm line-clamp-2">{c.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

        </article>
      </main>
      <Footer />
    </>
  )
}
