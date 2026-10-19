// app/insights/category/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Topic (category) hub pages — e.g. /insights/category/3d-visualization.
//
// Category filtering used to be /insights?category=<slug>, a noindex view of
// the listing with the listing's own title and copy. Each topic now has a
// real page with its own title, description, H1, breadcrumb and structured
// data, so it can rank for the topic itself and concentrates internal links
// on the articles in it (topical authority). Old ?category= URLs 308-redirect
// here (see app/insights/page.tsx).
//
// Thin-content guard: a topic with fewer than MIN_POSTS_FOR_INDEXABLE_TOPIC
// published articles still renders for readers, but as `noindex, follow`
// and without a sitemap entry, until it has enough content to stand alone.
// ─────────────────────────────────────────────────────────────────────────────
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import Reveal from '@/app/components/insights/Reveal'
import InsightCard from '@/app/components/insights/InsightCard'
import { CategoryIcon, getRelatedService } from '@/app/components/insights/categoryIcon'
import { BASE, buildGraph, orgSchema, websiteSchema, breadcrumbFromItems, jsonLdString } from '@/lib/schema'
import { metaDescription } from '@/lib/seo'
import { MIN_POSTS_FOR_INDEXABLE_TOPIC, topicPath, topicUrl } from '@/lib/insights'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

const PER_PAGE = 9

function parsePage(value: string | undefined): number {
  const n = Number.parseInt(value || '1', 10)
  return Number.isFinite(n) && n >= 1 ? n : 1
}

async function getTopic(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { posts: { where: { status: 'PUBLISHED' } } } } },
  })
}

function topicCopy(topic: { name: string; description: string | null }) {
  const title = `${topic.name} Insights & Articles`
  const description = metaDescription(
    topic.description?.trim()
      ? `${topic.description.trim()} Articles and expert perspectives from 99 Visual Solutions.`
      : `Articles, guides and expert perspectives on ${topic.name} from 99 Visual Solutions.`,
  )
  return { title, description }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = parsePage((await searchParams).page)
  const topic = await getTopic(slug)
  if (!topic || topic._count.posts === 0) return { title: 'Not Found', robots: { index: false, follow: false } }

  const { title: baseTitle, description } = topicCopy(topic)
  const title = page > 1 ? `${baseTitle} – Page ${page}` : baseTitle
  const url = page > 1 ? `${topicUrl(slug)}?page=${page}` : topicUrl(slug)
  const indexable = topic._count.posts >= MIN_POSTS_FOR_INDEXABLE_TOPIC

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: '99 Visual Solutions',
      type: 'website',
      images: [{ url: `${BASE}/images/home-og.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE}/images/home-og.jpg`] },
  }
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { slug } = await params
  const page = parsePage((await searchParams).page)

  const topic = await getTopic(slug)
  // A topic with no published articles is a 404, not an empty page.
  if (!topic || topic._count.posts === 0) notFound()

  const where = { status: 'PUBLISHED' as const, categoryId: topic.id }
  const [posts, total, otherTopics] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, category: true, featuredImage: true },
      orderBy: { publishedAt: 'desc' },
      take: PER_PAGE,
      skip: (page - 1) * PER_PAGE,
    }),
    prisma.post.count({ where }),
    prisma.category.findMany({
      where: { id: { not: topic.id }, posts: { some: { status: 'PUBLISHED' } } },
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: { where: { status: 'PUBLISHED' } } } } },
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
  if (page > totalPages) notFound()

  const { title } = topicCopy(topic)
  const accent = topic.color || '#f97316'
  const relatedService = getRelatedService(topic.name, topic.slug)
  const path = topicPath(topic.slug)
  const pageUrl = page > 1 ? `${topicUrl(topic.slug)}?page=${page}` : topicUrl(topic.slug)
  const pageHref = (p: number) => (p > 1 ? `${path}?page=${p}` : path)

  // Mirrors the visible breadcrumb and lists exactly the articles rendered.
  const breadcrumbNode = breadcrumbFromItems([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: topic.name, url: path },
  ])
  const jsonLd = buildGraph(orgSchema, websiteSchema, breadcrumbNode, {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: page > 1 ? `${title} – Page ${page}` : title,
    ...(topic.description && { description: topic.description }),
    inLanguage: 'en',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    breadcrumb: { '@id': breadcrumbNode['@id'] },
    about: { '@type': 'Thing', name: topic.name },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: total,
      itemListElement: posts.map((p: { slug: string; title: string }, i: number) => ({
        '@type': 'ListItem',
        position: (page - 1) * PER_PAGE + i + 1,
        url: `${BASE}/insights/${p.slug}`,
        name: p.title,
      })),
    },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-gray-950">
        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 18% 0%, ${accent}24, transparent 45%)` }}
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.08),transparent_42%)]" />

          <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
            <Reveal fade={false}>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-8 flex-wrap">
                <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-700" strokeWidth={2} aria-hidden="true" />
                <Link href="/insights" className="hover:text-orange-400 transition-colors">Insights</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-700" strokeWidth={2} aria-hidden="true" />
                <span className="text-gray-400" aria-current="page">{topic.name}</span>
              </nav>

              <div className="max-w-3xl">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide mb-4 sm:mb-5"
                  style={{ backgroundColor: accent + '18', color: accent, border: `1px solid ${accent}33` }}
                >
                  <CategoryIcon labels={[topic.slug, topic.name]} className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  Topic
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-white mb-3 leading-[1.15] tracking-tight">
                  {topic.name} <span className="text-blue-400">Insights</span>
                </h1>
                {topic.description && (
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">{topic.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-500">
                  <span>
                    <strong className="text-white font-semibold">{total}</strong> {total === 1 ? 'article' : 'articles'}
                  </span>
                  {relatedService && (
                    <Link
                      href={relatedService.href}
                      className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Explore our {relatedService.label} services
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ ARTICLES ═══════════════════════ */}
        <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pb-14 sm:pb-16" aria-labelledby="topic-articles">
          <h2 id="topic-articles" className="sr-only">Articles about {topic.name}</h2>
          {posts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg mb-4">No articles in this topic yet.</p>
              <Link href="/insights" className="text-orange-400 hover:text-orange-300 transition-colors">
                Browse all insights
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {posts.map((post, i) => (
                <InsightCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-10 sm:mt-14">
              {page > 1 && (
                <Link
                  href={pageHref(page - 1)}
                  className="px-4 h-10 inline-flex items-center gap-1 bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:border-gray-700 hover:text-white"
                >
                  <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" /> Prev
                </Link>
              )}
              <span className="px-3 text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={pageHref(page + 1)}
                  className="px-4 h-10 inline-flex items-center gap-1 bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:border-gray-700 hover:text-white"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}
        </section>

        {/* ═══════════════════════ OTHER TOPICS ═══════════════════════ */}
        {otherTopics.length > 0 && (
          <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pb-20 sm:pb-28" aria-labelledby="other-topics">
            <Reveal>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 sm:p-8">
                <h2 id="other-topics" className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-4">
                  Explore more topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherTopics.map((t: { id: string; slug: string; name: string; _count: { posts: number } }) => {
                    return (
                      <Link
                        key={t.id}
                        href={topicPath(t.slug)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700 transition-all duration-200"
                      >
                        <CategoryIcon labels={[t.slug, t.name]} className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                        {t.name}
                        <span className="text-[10px] sm:text-xs opacity-60">{t._count.posts}</span>
                      </Link>
                    )
                  })}
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-orange-500 text-white hover:bg-orange-400 transition-all duration-200"
                  >
                    All insights <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
