import { prisma } from '@/lib/prisma'
import MediaClient from '@/app/components/admin/MediaClient'

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <MediaClient media={media} />
}