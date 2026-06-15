import { prisma } from '@/lib/prisma'
import TagsClient from '@/app/components/admin/TagsClient'

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { postTags: true } } },
  })

  return <TagsClient tags={tags} />
}