import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function InsightsSection() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: true,
      category: true,
      featuredImage: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  })

  if (posts.length === 0) return null

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
            Latest Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Industry Insights &{' '}
            <span className="text-orange-400">Expert Perspectives</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay ahead with trends, technology updates, business strategies, digital transformation insights, and industry knowledge from our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={'/insights/' + post.slug}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.altText || post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundColor: post.category.color || '#f97316' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/10 select-none">99</span>
                    </div>
                  </>
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

              <div className="p-5">
                <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author.name}</span>
                  <div className="flex items-center gap-2">
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

        <div className="text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-xl font-medium transition-colors"
          >
            View All Insights
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}