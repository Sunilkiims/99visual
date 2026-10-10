// app/components/RelatedInsights.tsx
//
// Server component: a short "Related insights" strip for a service page,
// listing published articles that are actually about that service. It is
// the reverse of the "Related Service" link on each article, so services and
// Insights link to each other in both directions.
//
// Matching uses getRelatedService() — the same rules the article page uses —
// so an article only appears on the service page it links back to. Renders
// nothing when no article matches or the database is unreachable, so it can
// never break a service page.
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getRelatedService } from '@/app/components/insights/categoryIcon'

type PostRow = {
  slug: string
  title: string
  excerpt: string | null
  category: { name: string; slug: string } | null
}

export default async function RelatedInsights({ serviceHref }: { serviceHref: string }) {
  let posts: PostRow[] = []
  try {
    posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED', NOT: { seo: { robots: { contains: 'noindex' } } } },
      select: { slug: true, title: true, excerpt: true, category: { select: { name: true, slug: true } } },
      orderBy: { publishedAt: 'desc' },
      take: 50,
    })
  } catch {
    return null
  }

  const related = posts
    .filter((p) => {
      const svc = getRelatedService(p.title) ?? getRelatedService(p.category?.name, p.category?.slug)
      return svc?.href === serviceHref
    })
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section
      aria-labelledby="related-insights-heading"
      style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '4rem 1.5rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          id="related-insights-heading"
          style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600, margin: '0 0 1.5rem' }}
        >
          Related insights
        </h2>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {related.map((post) => (
            <li
              key={post.slug}
              style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.25rem' }}
            >
              <Link
                href={`/insights/${post.slug}`}
                style={{ color: '#fb923c', fontWeight: 600, textDecoration: 'none', lineHeight: 1.4 }}
              >
                {post.title}
              </Link>
              {post.excerpt && (
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 0' }}>
                  {post.excerpt.length > 140 ? `${post.excerpt.slice(0, 137).trimEnd()}…` : post.excerpt}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p style={{ margin: '1.5rem 0 0' }}>
          <Link href="/insights" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
            Browse all Insights articles
          </Link>
        </p>
      </div>
    </section>
  )
}
