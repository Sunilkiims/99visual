import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

export const metadata: Metadata = {
  title: 'Industry Insights & Expert Perspectives | 99 Visual Solutions',
  description: 'Stay ahead with trends, technology updates, business strategies, digital transformation insights, and industry knowledge from our experts.',
  alternates: {
    canonical: 'https://99visual.com/insights',
  },
  openGraph: {
    title: 'Industry Insights & Expert Perspectives',
    description: 'Stay ahead with trends, technology updates, and industry knowledge from 99 Visual Solutions.',
    url: 'https://99visual.com/insights',
  },
}

interface Props {
  searchParams: Promise<{ category?: string; tag?: string; page?: string; search?: string }>
}

async function getPosts(params: Awaited<Props['searchParams']>) {
  const page = parseInt(params.page || '1')
  const perPage = 9
  const search = params.search || ''

  const where = {
    status: 'PUBLISHED' as const,
    ...(params.category && { category: { slug: params.category } }),
    ...(params.tag && { tags: { some: { tag: { slug: params.tag } } } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [posts, total, categories, featuredPost] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: true,
        category: true,
        featuredImage: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.post.count({ where }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    }),
    prisma.post.findFirst({
      where: { status: 'PUBLISHED', featured: true },
      include: { author: true, category: true, featuredImage: true },
      orderBy: { publishedAt: 'desc' },
    }),
  ])

  return { posts, total, categories, featuredPost, page, perPage }
}

// Builds a compact pagination window (e.g. 1 … 4 5 [6] 7 8 … 20) so the
// pager never overflows on small screens even with many pages.
function getPageWindow(current: number, total: number) {
  const delta = 1
  const range: (number | 'dots')[] = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)
  if (left > 2) range.push('dots')
  for (let i = left; i <= right; i++) range.push(i)
  if (right < total - 1) range.push('dots')
  if (total > 1) range.push(total)

  return range
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams
  const { posts, total, categories, featuredPost, page, perPage } = await getPosts(params)
  const totalPages = Math.ceil(total / perPage)
  const isFiltered = params.category || params.tag || params.search
  const pageWindow = getPageWindow(page, totalPages)

  const buildPageHref = (p: number) =>
    '/insights?page=' + p + (params.category ? '&category=' + params.category : '')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950">

        {/* Hero */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-3 sm:mb-4">
              Insights & Perspectives
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Industry Insights &{' '}
              <span className="text-orange-400">Expert Perspectives</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Stay ahead with trends, technology updates, business strategies, digital transformation insights, and industry knowledge from our experts.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <form method="GET">
              <div className="relative">
                <svg className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  name="search"
                  defaultValue={params.search}
                  placeholder="Search articles..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-2xl pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Category Filters */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:snap-none">
              <Link
                href="/insights"
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  !params.category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={'/insights?category=' + cat.slug}
                  className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    params.category === cat.slug
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-900 text-gray-400 border border-gray-800'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-xs opacity-60">{cat._count.posts}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !isFiltered && page === 1 && (
          <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <Link href={'/insights/' + featuredPost.slug} className="group block">
              <div className="relative bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-56 sm:h-72 lg:h-full lg:min-h-[300px] bg-gray-900 flex items-center justify-center">
                    {featuredPost.featuredImage ? (
                      <Image
                        src={featuredPost.featuredImage.url}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl sm:text-8xl font-bold text-orange-500/10">99</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Featured
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: (featuredPost.category.color || '#f97316') + '15',
                          color: featuredPost.category.color || '#f97316',
                        }}
                      >
                        {featuredPost.category.name}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-snug group-hover:text-orange-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500">
                      <span>{featuredPost.author.name}</span>
                      <span className="hidden sm:inline">·</span>
                      <span>{featuredPost.readingTime} min read</span>
                      {featuredPost.publishedAt && (
                        <>
                          <span className="hidden sm:inline">·</span>
                          <span>
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Posts Grid */}
        <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pb-16 sm:pb-20">
          {posts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg mb-4">No articles found</p>
              <Link href="/insights" className="text-orange-400 transition-colors">
                View all articles
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={'/insights/' + post.slug}
                    className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-44 sm:h-48 bg-gray-900 flex items-center justify-center">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage.url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-bold text-gray-700/50">99</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: (post.category.color || '#f97316') + '20',
                            color: post.category.color || '#f97316',
                          }}
                        >
                          {post.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-gray-500">
                        <span className="truncate max-w-[45%]">{post.author.name}</span>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span>{post.readingTime} min read</span>
                          {post.publishedAt && (
                            <>
                              <span>·</span>
                              <span>
                                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mt-10 sm:mt-12"
                >
                  {page > 1 && (
                    <Link
                      href={buildPageHref(page - 1)}
                      className="px-3 sm:px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm transition-colors"
                    >
                      Prev
                    </Link>
                  )}

                  {pageWindow.map((p, i) =>
                    p === 'dots' ? (
                      <span
                        key={'dots-' + i}
                        className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-gray-600 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={buildPageHref(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                          p === page
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-900 border border-gray-800 text-gray-400'
                        }`}
                      >
                        {p}
                      </Link>
                    )
                  )}

                  {page < totalPages && (
                    <Link
                      href={buildPageHref(page + 1)}
                      className="px-3 sm:px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
