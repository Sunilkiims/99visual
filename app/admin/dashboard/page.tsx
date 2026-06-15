import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

async function getStats() {
  const [totalPosts, publishedPosts, totalCategories, totalTags, totalAuthors, totalMedia, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.author.count(),
    prisma.media.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        category: true,
      },
    }),
  ])

  return {
    totalPosts,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalCategories,
    totalTags,
    totalAuthors,
    totalMedia,
    recentPosts,
  }
}

export default async function AdminDashboard() {
  const session = await getSession()
  const stats = await getStats()

  const statCards = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      sub: `${stats.publishedPosts} published`,
      href: '/admin/posts',
      color: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/20',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      sub: 'active categories',
      href: '/admin/categories',
      color: 'from-green-500/20 to-green-600/10',
      border: 'border-green-500/20',
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      label: 'Tags',
      value: stats.totalTags,
      sub: 'active tags',
      href: '/admin/tags',
      color: 'from-purple-500/20 to-purple-600/10',
      border: 'border-purple-500/20',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
    },
    {
      label: 'Authors',
      value: stats.totalAuthors,
      sub: 'content authors',
      href: '/admin/authors',
      color: 'from-orange-500/20 to-orange-600/10',
      border: 'border-orange-500/20',
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, {session?.email}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-center justify-between mb-3">
              {card.icon}
              <span className="text-3xl font-bold text-white">{card.value}</span>
            </div>
            <p className="text-white font-medium text-sm">{card.label}</p>
            <p className="text-gray-400 text-xs mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Posts</h2>
            <Link
              href="/admin/posts"
              className="text-orange-400 text-sm hover:text-orange-300 transition-colors"
            >
              View all
            </Link>
          </div>

          {stats.recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No posts yet</p>
              <Link
                href="/admin/posts/new"
                className="mt-3 inline-block text-orange-400 text-sm hover:text-orange-300"
              >
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-white text-sm font-medium truncate">{post.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {post.category.name} · {post.author.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-500/15 text-green-400'
                        : post.status === 'DRAFT'
                        ? 'bg-gray-500/15 text-gray-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {post.status.toLowerCase()}
                    </span>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'New Post', href: '/admin/posts/new', color: 'bg-orange-500 hover:bg-orange-600 text-white' },
              { label: 'New Category', href: '/admin/categories', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
              { label: 'New Tag', href: '/admin/tags', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
              { label: 'New Author', href: '/admin/authors', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
              { label: 'Media Library', href: '/admin/media', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
              { label: 'SEO Settings', href: '/admin/seo', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
              { label: 'View Insights', href: '/insights', color: 'bg-gray-800 hover:bg-gray-700 text-gray-300' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`block w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${action.color}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Content Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Published', value: stats.publishedPosts, color: 'text-green-400' },
            { label: 'Drafts', value: stats.draftPosts, color: 'text-yellow-400' },
            { label: 'Media Files', value: stats.totalMedia, color: 'text-blue-400' },
            { label: 'Total Posts', value: stats.totalPosts, color: 'text-orange-400' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-gray-500 text-xs mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}