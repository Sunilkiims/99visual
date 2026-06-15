import { prisma } from '@/lib/prisma'
import NewPostClient from '@/app/components/admin/NewPostClient'

export default async function NewPostPage() {
  const [categories, authors, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.author.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <NewPostClient
      categories={categories}
      authors={authors}
      tags={tags}
    />
  )
}