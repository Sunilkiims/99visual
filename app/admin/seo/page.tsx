import { prisma } from '@/lib/prisma'
import SEOClient from '@/app/components/admin/SEOClient'

export default async function SEOPage() {
  const [pageSEOs, posts] = await Promise.all([
    prisma.pageSEO.findMany({ orderBy: { pagePath: 'asc' } }),
    prisma.post.findMany({
      include: { seo: true },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return <SEOClient pageSEOs={pageSEOs} posts={posts} />
}