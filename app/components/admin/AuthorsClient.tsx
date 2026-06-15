'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Author {
  id: string
  name: string
  slug: string
  email?: string | null
  bio?: string | null
  avatarUrl?: string | null
  _count: { posts: number }
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AuthorsClient({ authors: initial }: { authors: Author[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Author | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function openNew() {
    setEditing(null)
    setName(''); setSlug(''); setEmail(''); setBio('')
    setShowForm(true); setError('')
  }

  function openEdit(author: Author) {
    setEditing(author)
    setName(author.name)
    setSlug(author.slug)
    setEmail(author.email || '')
    setBio(author.bio || '')
    setShowForm(true); setError('')
  }

  async function handleSave() {
    if (!name) { setError('Name is required'); return }
    setSaving(true); setError('')

    try {
      const res = await fetch(
        editing ? `/api/admin/authors/${editing.id}` : '/api/admin/authors',
        {
          method: editing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug, email, bio }),
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
    if (!confirm('Delete this author?')) return
    await fetch(`/api/admin/authors/${id}`, { method: 'DELETE' })
    router.refresh()
    window.location.reload()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">Authors</h1>
          <p className="text-gray-400 text-sm mt-1">{initial.length} authors</p>
        </div>
        <button
          onClick={openNew}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          + New Author
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-medium mb-5">{editing ? 'Edit Author' : 'New Author'}</h2>
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
                placeholder="Author name"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="author@99visual.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Bio</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Author'}
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
            <p className="text-gray-500">No authors yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Name</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Email</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Posts</th>
                <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initial.map((author) => (
                <tr key={author.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                        <span className="text-orange-400 text-xs font-semibold">
                          {author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium">{author.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{author.email || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{author._count.posts} posts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(author)} className="text-gray-500 hover:text-orange-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(author.id)} className="text-gray-500 hover:text-red-400 transition-colors">
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