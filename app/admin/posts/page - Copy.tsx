import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PostStatus } from '@prisma/client'
import DeletePostButton from '@/app/components/admin/DeletePostButton'

interface Props {
  searchParams: Promise<{ status?: string; page?: string; search?: string }>
}

export default async function AdminPostsPage({ searchParams }: Props) {
  const params = await searchParams
  const status = params.status as PostStatus | undefined
  const page = parseInt(params.page || '1')
  const search = params.search || ''
  const perPage = 10

  const where = {
    ...(status && { status }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, category: true },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.post.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{total} total posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          + New Post
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {['', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((s) => (
          <Link
            key={s}
            href={`/admin/posts${s ? `?status=${s}` : ''}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === s || (!status && !s)
                ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {s || 'All'}
          </Link>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No posts found</p>
            <Link
              href="/admin/posts/new"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Title</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Category</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Author</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Status</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Date</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-1">{post.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">/insights/{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{post.category.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{post.author.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-500/15 text-green-400'
                        : post.status === 'DRAFT'
                        ? 'bg-gray-500/15 text-gray-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {post.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/insights/${post.slug}`}
                        target="_blank"
                        className="text-gray-500 hover:text-white transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-gray-500 hover:text-orange-400 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-400 text-sm">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/posts?page=${page - 1}${status ? `&status=${status}` : ''}`}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/posts?page=${page + 1}${status ? `&status=${status}` : ''}`}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}