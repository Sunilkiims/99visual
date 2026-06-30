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
      <style>{`
        @property --in-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes in-border-spin {
          to { --in-angle: 360deg; }
        }

        .in-cta-wrap {
          position: relative;
          display: inline-flex;
          border-radius: 100px;
          padding: 3px;
        }
        .in-cta-wrap::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 100px;
          background: conic-gradient(
            from var(--in-angle),
            transparent 0%,
            transparent 60%,
            #f97316 75%,
            #fb923c 85%,
            #f97316 95%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .in-cta-wrap:hover::before {
          opacity: 1;
          animation: in-border-spin 2s linear infinite;
        }
        .in-cta-wrap::after {
          content: '';
          position: absolute;
          inset: 0px;
          border-radius: 100px;
          background: #030712;
          z-index: 1;
          transition: background 0.3s ease;
        }
        .in-cta {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: 100px;
          background: #f97316;
          color: #fff;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .05em;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .in-cta-wrap:hover .in-cta {
          background: #000;
          color: #f97316;
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          .in-cta { transition: none !important; }
          .in-cta-wrap::before { animation: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
            Latest Insights
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Industry Insights &{' '}
            <span className="text-orange-400">Expert Perspectives</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay ahead with trends, technology updates, business strategies, digital transformation insights, 
            and industry knowledge from our experts.
          </p>
        </div>

        <InsightsCarousel posts={posts} />

        <div className="text-center mt-12">
          <div className="in-cta-wrap">
            <Link
              href="/insights"
              aria-label="View all insights from 99 Visual Solutions"
              className="in-cta"
            >
              View All Insights
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}