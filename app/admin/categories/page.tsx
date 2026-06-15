import { prisma } from '@/lib/prisma'
import CategoriesClient from '@/app/components/admin/CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  })
  return <CategoriesClient categories={categories} />
}