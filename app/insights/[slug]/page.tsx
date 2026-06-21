import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { seo: true, author: true },
  })

  if (!post) return { title: 'Not Found' }

  const seo = post.seo
  const BASE = 'https://99visual.com'

  return {
    title: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt || '',
    alternates: {
      canonical: seo?.canonicalUrl || BASE + '/insights/' + slug,
    },
    openGraph: {
      title: seo?.ogTitle || post.title,
      description: seo?.ogDescription || post.excerpt || '',
      url: BASE + '/insights/' + slug,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || post.title,
      description: seo?.twitterDescription || post.excerpt || '',
    },
    robots: seo?.robots || 'index, follow',
  }
}

function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const base = 'https://99visual.com/insights/'
  const url = base + slug
  const twitterHref =
    'https://twitter.com/intent/tweet?text=' +
    encodeURIComponent(title) +
    '&url=' +
    encodeURIComponent(url)
  const linkedinHref =
    'https://www.linkedin.com/sharing/share-offsite/?url=' +
    encodeURIComponent(url)
  const facebookHref =
    'https://www.facebook.com/sharer/sharer.php?u=' +
    encodeURIComponent(url)
  const whatsappHref =
    'https://api.whatsapp.com/send?text=' +
    encodeURIComponent(title + ' ' + url)
  const cls = 'flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl text-sm transition-colors hover:border-gray-600'

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <a href={twitterHref} target="_blank" rel="noopener noreferrer" className={cls}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X
      </a>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className={cls}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
      <a href={facebookHref} target="_blank" rel="noopener noreferrer" className={cls}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cls}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>
    </div>
  )
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      author: true,
      category: true,
      featuredImage: true,
      tags: { include: { tag: true } },
      seo: true,
    },
  })

  if (!post) notFound()

  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  const [relatedPosts, allCategories] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        categoryId: post.categoryId,
        id: { not: post.id },
      },
      include: { author: true, category: true, featuredImage: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    }),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: '99 Visual Solutions',
      url: 'https://99visual.com',
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: 'https://99visual.com/insights/' + post.slug,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://99visual.com/insights/' + post.slug,
    },
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Main Article */}
            <article className="lg:col-span-3">

              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/insights" className="hover:text-orange-400 transition-colors">Insights</Link>
                <span>/</span>
                <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
              </nav>

              <div className="flex items-center gap-2 flex-wrap mb-6">
                <Link
                  href={'/insights?category=' + post.category.slug}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: (post.category.color || '#f97316') + '15',
                    color: post.category.color || '#f97316',
                  }}
                >
                  {post.category.name}
                </Link>
                {post.tags.map(({ tag }) => (
                  <Link
                    key={tag.id}
                    href={'/insights?tag=' + tag.slug}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 hover:text-white transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-800 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-orange-400 text-xs font-semibold">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <span>{post.author.name}</span>
                </div>
                <span>·</span>
                <span>{post.readingTime} min read</span>
                {post.publishedAt && (
                  <>
                    <span>·</span>
                    <time dateTime={post.publishedAt.toISOString()}>
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </>
                )}
                <span>·</span>
                <span>{post.viewCount} views</span>
              </div>

             {post.featuredImage && (
                <div className="relative w-full rounded-2xl overflow-hidden mb-10 bg-gray-900 flex items-center justify-center max-h-[500px]">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.altText || post.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto max-h-[500px] object-contain"
                    priority
                  />
                </div>
              )}

              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <style>{`
                .article-content { color: #d1d5db; font-size: 1.05rem; line-height: 1.85; }
                .article-content h1,
                .article-content h2,
                .article-content h3,
                .article-content h4 { color: #ffffff; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; }
                .article-content h2 { font-size: 1.5rem; }
                .article-content h3 { font-size: 1.25rem; }
                .article-content p { margin-bottom: 1.25rem; color: #d1d5db; }
                .article-content a { color: #f97316; text-decoration: none; }
                .article-content a:hover { color: #fb923c; }
                .article-content strong { color: #ffffff; font-weight: 600; }
                .article-content ul,
                .article-content ol { color: #d1d5db; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                .article-content li { margin-bottom: 0.5rem; }
                .article-content blockquote { border-left: 3px solid #f97316; padding-left: 1rem; color: #9ca3af; margin: 1.5rem 0; }
                .article-content code { color: #fb923c; background: #1f2937; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
                .article-content pre { background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 1rem; overflow-x: auto; margin-bottom: 1.25rem; }
                .article-content img { border-radius: 12px; max-width: 100%; }
              `}</style>

              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-4">Share this article</p>
                <ShareButtons slug={post.slug} title={post.title} />
              </div>

              {post.author.bio && (
                <div className="mt-10 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-400 text-lg font-semibold">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">{post.author.name}</p>
                      <p className="text-gray-400 text-sm">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 lg:pt-20">

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sticky top-8">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
                <div className="space-y-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={'/insights?category=' + cat.slug}
                      className="flex items-center justify-between group py-2 border-b border-gray-800 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: cat.color || '#f97316' }}
                        />
                        <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-gray-600 text-xs">{cat._count.posts}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={'/insights/' + related.slug}
                        className="group block"
                      >
                        <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-gray-800">
                          {related.featuredImage ? (
                            <Image
                              src={related.featuredImage.url}
                              alt={related.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl font-bold text-gray-700">99</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors line-clamp-2">
                          {related.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{related.readingTime} min read</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}