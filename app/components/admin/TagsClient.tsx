'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Tag {
  id: string
  name: string
  slug: string
  _count: { postTags: number }
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function TagsClient({ tags: initial }: { tags: Tag[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Tag | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function openNew() {
    setEditing(null)
    setName('')
    setSlug('')
    setShowForm(true)
    setError('')
  }

  function openEdit(tag: Tag) {
    setEditing(tag)
    setName(tag.name)
    setSlug(tag.slug)
    setShowForm(true)
    setError('')
  }

  async function handleSave() {
    if (!name) { setError('Name is required'); return }
    setSaving(true)
    setError('')

    try {
      const res = await fetch(
        editing ? `/api/admin/tags/${editing.id}` : '/api/admin/tags',
        {
          method: editing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug }),
        }
      )

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save'); setSaving(false); return }

      setShowForm(false)
      router.refresh()
      window.location.reload()
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this tag?')) return
    await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' })
    router.refresh()
    window.location.reload()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">Tags</h1>
          <p className="text-gray-400 text-sm mt-1">{initial.length} tags</p>
        </div>
        <button
          onClick={openNew}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          + New Tag
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-medium mb-5">{editing ? 'Edit Tag' : 'New Tag'}</h2>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)) }}
                placeholder="Tag name"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="tag-slug"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors font-mono text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Tag'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {initial.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No tags yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Name</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Slug</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Posts</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initial.map((tag) => (
                <tr key={tag.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white text-sm font-medium">{tag.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm font-mono">{tag.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{tag._count.postTags} posts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(tag)} className="text-gray-500 hover:text-orange-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(tag.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}