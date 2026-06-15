'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from './TiptapEditor'

interface Category { id: string; name: string }
interface Author { id: string; name: string }
interface Tag { id: string; name: string }
interface MediaItem { id: string; url: string; filename: string }

interface Props {
  categories: Category[]
  authors: Author[]
  tags: Tag[]
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NewPostClient({ categories, authors, tags }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '')
  const [authorId, setAuthorId] = useState(authors[0]?.id || '')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [featured, setFeatured] = useState(false)
  const [featuredImageId, setFeaturedImageId] = useState('')
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [loadingMedia, setLoadingMedia] = useState(false)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content')

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(slugify(value))
    if (!metaTitle) setMetaTitle(value)
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    )
  }

  async function openMediaPicker() {
    setShowMediaPicker(true)
    setLoadingMedia(true)
    try {
      const res = await fetch('/api/admin/media-list')
      const data = await res.json()
      setMediaList(data.media || [])
    } catch {
      setMediaList([])
    } finally {
      setLoadingMedia(false)
    }
  }

  async function handleSave(publishStatus: 'DRAFT' | 'PUBLISHED') {
    if (!title) { setError('Title is required'); return }
    if (!content) { setError('Content is required'); return }
    if (!categoryId) { setError('Category is required'); return }
    if (!authorId) { setError('Author is required'); return }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          categoryId,
          authorId,
          tags: selectedTags,
          status: publishStatus,
          featured,
          featuredImageId: featuredImageId || undefined,
          seo: {
            metaTitle: metaTitle || title,
            metaDescription,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to save post')
        setSaving(false)
        return
      }

      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Something went wrong')
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">New Post</h1>
          <p className="text-gray-400 text-sm mt-1">Create a new insights article</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex gap-2 border-b border-gray-800 pb-0">
            {(['content', 'seo'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'seo' ? 'SEO' : 'Content'}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <>
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-slug"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Content</label>
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your post..."
                />
              </div>
            </>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-5">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <p className="text-gray-500 text-xs mt-1">{metaTitle.length}/60 characters</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
                <p className="text-gray-500 text-xs mt-1">{metaDescription.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Canonical URL</label>
                <input
                  type="text"
                  value={'https://99visualsolutions.com/insights/' + slug}
                  readOnly
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-gray-400 font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-400 text-sm">Featured Post</label>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${featured ? 'bg-orange-500' : 'bg-gray-700'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${featured ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">Featured Image</h3>
            {featuredImageUrl ? (
              <div>
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-xl mb-2"
                />
                <button
                  type="button"
                  onClick={() => { setFeaturedImageUrl(''); setFeaturedImageId('') }}
                  className="w-full text-xs text-red-400 py-1 transition-colors"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openMediaPicker}
                className="w-full h-24 border-2 border-dashed border-gray-700 rounded-xl text-gray-500 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select from media
              </button>
            )}
          </div>

          {/* Category */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">Category</h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">Author</h3>
            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
            >
              {authors.map((author) => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag.id)
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-white font-semibold">Select Featured Image</h3>
              <button
                onClick={() => setShowMediaPicker(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {loadingMedia ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : mediaList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No media uploaded yet. Go to Media Library to upload images first.
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFeaturedImageId(item.id)
                        setFeaturedImageUrl(item.url)
                        setShowMediaPicker(false)
                      }}
                      className="relative h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-orange-500 transition-colors"
                    >
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}