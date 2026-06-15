import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditPostClient from '@/app/components/admin/EditPostClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params

  const [post, categories, authors, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: {
        tags: { include: { tag: true } },
        seo: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.author.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ])

  if (!post) notFound()

  return (
    <EditPostClient
      post={post}
      categories={categories}
      authors={authors}
      tags={tags}
    />
  )
}