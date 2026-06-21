import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import InsightsCarousel from './InsightsCarousel'

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

        <InsightsCarousel posts={posts} />

        <div className="text-center mt-12">
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