'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useEffect, useState } from 'react'

interface Props {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const COLORS = [
  '#ffffff', '#d1d5db', '#f97316', '#ef4444', '#22c55e',
  '#3b82f6', '#a855f7', '#eab308', '#ec4899', '#14b8a6',
]

export default function TiptapEditor({ content, onChange, placeholder }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your post content...',
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-6 py-4 text-gray-300',
      },
    },
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      if (content) {
        editor.commands.setContent(content)
      }
    },
  })

  useEffect(() => {
    if (!editor) return
    if (!content) return
    if (editor.isEmpty) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  if (!editor) return null

  const Btn = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-orange-500/20 text-orange-400'
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  )

  const Divider = () => <div className="w-px h-5 bg-gray-600 mx-1" />

  function addImage() {
    const url = prompt('Enter image URL:')
    if (url && editor) editor.chain().focus().setImage({ src: url }).run()
  }

  function addLink() {
    const url = prompt('Enter URL:')
    if (url && editor) editor.chain().focus().setLink({ href: url }).run()
  }

  function insertTable() {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    setShowTableMenu(false)
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-700 flex-wrap">

        <select
          onChange={(e) => {
            const val = e.target.value
            if (val === 'p') editor.chain().focus().setParagraph().run()
            if (val === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run()
            if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run()
            if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run()
            if (val === 'h4') editor.chain().focus().toggleHeading({ level: 4 }).run()
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? 'h1' :
            editor.isActive('heading', { level: 2 }) ? 'h2' :
            editor.isActive('heading', { level: 3 }) ? 'h3' :
            editor.isActive('heading', { level: 4 }) ? 'h4' : 'p'
          }
          className="bg-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 border border-gray-600 focus:outline-none mr-1"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <Divider />

        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <strong>B</strong>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <em>I</em>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <s>S</s>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
          <span className="bg-yellow-400 text-black px-0.5 rounded text-xs font-bold">H</span>
        </Btn>

        <Divider />

        <div className="relative">
          <button
            type="button"
            title="Text Color"
            onClick={() => { setShowColorPicker(!showColorPicker); setShowTableMenu(false) }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center gap-1"
          >
            <span className="text-sm font-bold" style={{ color: editor.getAttributes('textStyle').color || '#fff' }}>A</span>
            <div className="w-3 h-1 rounded-sm" style={{ backgroundColor: editor.getAttributes('textStyle').color || '#f97316' }} />
          </button>
          {showColorPicker && (
            <div className="absolute top-8 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-xl">
              <p className="text-gray-400 text-xs mb-2">Text color</p>
              <div className="grid grid-cols-5 gap-1.5">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => { editor.chain().focus().setColor(color).run(); setShowColorPicker(false) }}
                    className="w-6 h-6 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => { editor.chain().focus().unsetColor().run(); setShowColorPicker(false) }}
                className="mt-2 text-xs text-gray-400 hover:text-white w-full text-center"
              >
                Reset color
              </button>
            </div>
          )}
        </div>

        <Divider />

        <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h12" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M6 18h12" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M8 18h12" />
          </svg>
        </Btn>

        <Divider />

        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h11M9 12h11M9 19h11M5 5v.01M5 12v.01M5 19v.01" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </Btn>

        <Divider />

        <div className="relative">
          <button
            type="button"
            title="Table"
            onClick={() => { setShowTableMenu(!showTableMenu); setShowColorPicker(false) }}
            className={`p-1.5 rounded-lg text-sm transition-colors ${showTableMenu ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18M8 6v12M16 6v12" />
            </svg>
          </button>
          {showTableMenu && (
            <div className="absolute top-8 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-xl min-w-[160px]">
              <p className="text-gray-400 text-xs mb-2">Table options</p>
              <div className="space-y-1">
                {[
                  { label: 'Insert table (3x3)', action: insertTable, red: false },
                  { label: 'Add column before', action: () => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false) }, red: false },
                  { label: 'Add column after', action: () => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false) }, red: false },
                  { label: 'Add row before', action: () => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false) }, red: false },
                  { label: 'Add row after', action: () => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false) }, red: false },
                  { label: 'Delete column', action: () => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false) }, red: true },
                  { label: 'Delete row', action: () => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false) }, red: true },
                  { label: 'Delete table', action: () => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false) }, red: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded hover:bg-gray-800 transition-colors ${item.red ? 'text-red-400 hover:text-red-300' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Divider />

        <Btn onClick={addLink} active={editor.isActive('link')} title="Add Link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </Btn>
        <Btn onClick={addImage} title="Add Image" active={false}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </Btn>

        <Divider />

        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo" active={false}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo" active={false}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </Btn>

        <div className="ml-auto text-gray-500 text-xs">
          {editor.storage.characterCount?.characters?.() ?? 0} chars
        </div>
      </div>

      <style>{`
        .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        .ProseMirror td, .ProseMirror th { border: 1px solid #374151; padding: 8px 12px; text-align: left; min-width: 80px; }
        .ProseMirror th { background: #1f2937; color: #f9fafb; font-weight: 600; }
        .ProseMirror td { color: #d1d5db; }
        .ProseMirror .selectedCell { background: #1e3a5f; }
      `}</style>

      <EditorContent editor={editor} />
    </div>
  )
}