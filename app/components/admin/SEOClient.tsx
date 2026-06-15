'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PageSEO {
  id: string
  pagePath: string
  pageTitle: string
  metaTitle?: string | null
  metaDescription?: string | null
  robots: string
}

interface Post {
  id: string
  title: string
  slug: string
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    robots: string
  } | null
}

interface Props {
  pageSEOs: PageSEO[]
  posts: Post[]
}

export default function SEOClient({ pageSEOs, posts }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'pages' | 'posts'>('posts')
  const [editing, setEditing] = useState<PageSEO | null>(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [robots, setRobots] = useState('index, follow')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  function openEdit(page: PageSEO) {
    setEditing(page)
    setMetaTitle(page.metaTitle || '')
    setMetaDescription(page.metaDescription || '')
    setRobots(page.robots || 'index, follow')
    setSuccess('')
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)

    const res = await fetch('/api/admin/seo/' + editing.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metaTitle, metaDescription, robots }),
    })

    if (res.ok) {
      setSuccess('Saved successfully')
      router.refresh()
    }

    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold">SEO Management</h1>
        <p className="text-gray-400 text-sm mt-1">Manage SEO settings for all pages and posts</p>
      </div>

      <div className="flex gap-2 border-b border-gray-800 mb-6">
        {(['posts', 'pages'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={'px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ' + (
              activeTab === tab
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-gray-400 hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {activeTab === 'posts' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Post</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Status</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Edit</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-800 last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-white text-sm font-medium line-clamp-1">{post.title}</p>
                      <p className="text-gray-500 text-xs">/insights/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={'px-2 py-0.5 rounded-full text-xs font-medium ' + (
                        post.seo?.metaTitle
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-yellow-500/15 text-yellow-400'
                      )}>
                        {post.seo?.metaTitle ? 'configured' : 'default'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={'/admin/posts/' + post.id + '/edit'}
                        className="text-orange-400 text-xs hover:text-orange-300 transition-colors"
                      >
                        Edit SEO
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Page</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageSEOs.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500 text-sm">
                      No page SEO configured yet
                    </td>
                  </tr>
                ) : (
                  pageSEOs.map((page) => (
                    <tr key={page.id} className="border-b border-gray-800 last:border-0">
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium">{page.pageTitle}</p>
                        <p className="text-gray-500 text-xs">{page.pagePath}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openEdit(page)}
                          className="text-orange-400 text-xs hover:text-orange-300 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit Panel */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {editing ? (
            <>
              <h2 className="text-white font-medium mb-5">
                Editing: {editing.pageTitle}
              </h2>

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 mb-4">
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <p className="text-gray-500 text-xs mt-1">{metaTitle.length}/60</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">{metaDescription.length}/160</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Robots</label>
                  <select
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center py-16">
              <p className="text-gray-500 text-sm">Select a page to edit its SEO settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}