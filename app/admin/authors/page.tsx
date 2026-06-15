import { prisma } from '@/lib/prisma'
import AuthorsClient from '@/app/components/admin/AuthorsClient'

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  })

  return <AuthorsClient authors={authors} />
}