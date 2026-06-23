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

const PRESET_COLORS = [
  '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6',
  '#a855f7', '#ec4899', '#84cc16', '#06b6d4', '#6366f1', '#f59e0b',
]

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48']

const FONT_FAMILIES = [
  { label: 'Default', value: '' },
  { label: 'Sans Serif', value: 'ui-sans-serif, system-ui, sans-serif' },
  { label: 'Serif', value: 'ui-serif, Georgia, serif' },
  { label: 'Monospace', value: 'ui-monospace, monospace' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
]

const TABLE_BORDER_COLORS = [
  '#374151', '#ffffff', '#f97316', '#ef4444',
  '#22c55e', '#3b82f6', '#a855f7', '#000000',
  '#d1d5db', '#fbbf24', '#14b8a6', '#6366f1',
]

const TABLE_FILL_COLORS = [
  '#1f2937', '#111827', '#ffffff', '#fef3c7',
  '#dcfce7', '#dbeafe', '#f3e8ff', '#fee2e2',
  '#f97316', '#374151', '#065f46', '#1e40af',
]

export default function TiptapEditor({ content, onChange, placeholder }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [showTableStyleMenu, setShowTableStyleMenu] = useState(false)
  const [customColor, setCustomColor] = useState('#f97316')
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkTarget, setLinkTarget] = useState('_blank')
  const [tableBorderColor, setTableBorderColor] = useState('#374151')
  const [tableBorderSize, setTableBorderSize] = useState('1')
  const [tableFillColor, setTableFillColor] = useState('#1f2937')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            target: {
              default: '_blank',
              parseHTML: (element) => element.getAttribute('target'),
              renderHTML: (attributes) => ({ target: attributes.target || '_blank' }),
            },
            rel: {
              default: 'noopener noreferrer nofollow',
              parseHTML: (element) => element.getAttribute('rel'),
              renderHTML: (attributes) => ({ rel: attributes.rel || 'noopener noreferrer nofollow' }),
            },
          }
        },
      }).configure({ openOnClick: false }),
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
      if (content) editor.commands.setContent(content)
    },
  })

  useEffect(() => {
    if (!editor) return
    if (!content) return
    if (editor.isEmpty) editor.commands.setContent(content)
  }, [editor, content])

  if (!editor) return null

  const Btn = ({
    onClick, active, title, children,
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
        active ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'
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
    if (!editor) return
    setLinkUrl(editor.getAttributes('link').href || '')
    setLinkTarget(editor.getAttributes('link').target || '_blank')
    setShowLinkDialog(true)
  }

  function applyLink() {
    if (!editor) return
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run()
    } else {
      const isInternal = linkUrl.startsWith('/')
      editor.chain().focus().setLink({
        href: linkUrl,
        target: linkTarget,
        rel: isInternal ? undefined : 'noopener noreferrer nofollow',
      }).run()
    }
    setShowLinkDialog(false)
  }

  function insertTable() {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    setShowTableMenu(false)
  }

  function applyColor(color: string) {
    if (!editor) return
    editor.chain().focus().setColor(color).run()
    setCustomColor(color)
  }

  function applyTableStyles(color: string, size: string) {
    if (!editor) return
    setTableBorderColor(color)
    setTableBorderSize(size)
    const { state, view } = editor
    const { tr } = state
    let modified = false
    state.doc.descendants((node, pos) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        const currentStyle = (node.attrs.style || '')
          .replace(/border:[^;]+;?/g, '')
          .trim()
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          style: (currentStyle ? currentStyle + ' ' : '') + `border: ${size}px solid ${color};`,
        })
        modified = true
      }
    })
    if (modified) view.dispatch(tr)
  }

  function applyTableFillColor(color: string) {
    if (!editor) return
    setTableFillColor(color)
    const { state, view } = editor
    const { tr } = state
    let modified = false
    state.doc.descendants((node, pos) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        const currentStyle = (node.attrs.style || '')
          .replace(/background(-color)?:[^;]+;?/g, '')
          .trim()
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          style: (currentStyle ? currentStyle + ' ' : '') + `background-color: ${color};`,
        })
        modified = true
      }
    })
    if (modified) view.dispatch(tr)
  }

  const currentColor = editor.getAttributes('textStyle').color || ''

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-700 flex-wrap">

        {/* Font Family */}
        <select
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setMark('textStyle', { fontFamily: e.target.value }).run()
            } else {
              editor.chain().focus().unsetMark('textStyle').run()
            }
          }}
          className="bg-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 border border-gray-600 focus:outline-none mr-1 max-w-[110px]"
          title="Font Family"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setMark('textStyle', { fontSize: e.target.value + 'px' }).run()
            }
          }}
          className="bg-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 border border-gray-600 focus:outline-none mr-1 w-16"
          title="Font Size"
          defaultValue="16"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        {/* Paragraph Style */}
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

        {/* Bold Italic Strike Highlight */}
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

        {/* Text Color */}
        <div className="relative">
          <button
            type="button"
            title="Text Color"
            onClick={() => { setShowColorPicker(!showColorPicker); setShowTableMenu(false); setShowTableStyleMenu(false) }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex flex-col items-center"
          >
            <span className="text-sm font-bold leading-none" style={{ color: currentColor || '#ffffff' }}>A</span>
            <div className="w-4 h-1 rounded-sm mt-0.5" style={{ backgroundColor: currentColor || '#f97316' }} />
          </button>
          {showColorPicker && (
            <div className="absolute top-9 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl w-56">
              <p className="text-gray-400 text-xs font-medium mb-3">Text Color</p>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="color"
                  value={currentColor || '#f97316'}
                  onChange={(e) => applyColor(e.target.value)}
                  className="w-10 h-9 rounded-lg cursor-pointer border border-gray-600 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={currentColor || ''}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) applyColor(e.target.value)
                  }}
                  placeholder="#f97316"
                  maxLength={7}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                />
              </div>
              <p className="text-gray-500 text-xs mb-2">Presets</p>
              <div className="grid grid-cols-6 gap-1.5 mb-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => applyColor(color)}
                    className={`w-7 h-7 rounded border-2 transition-all ${currentColor === color ? 'border-white scale-110' : 'border-gray-700 hover:border-gray-400'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => { editor.chain().focus().unsetColor().run(); setShowColorPicker(false) }}
                className="text-xs text-gray-400 hover:text-white w-full text-center border border-gray-700 rounded-lg py-1.5 hover:border-gray-500 transition-colors"
              >
                Reset to default
              </button>
            </div>
          )}
        </div>

        <Divider />

        {/* Text Align */}
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
        <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Btn>

        <Divider />

        {/* Lists */}
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

        {/* Table */}
        <div className="relative">
          <button
            type="button"
            title="Table"
            onClick={() => { setShowTableMenu(!showTableMenu); setShowColorPicker(false); setShowTableStyleMenu(false) }}
            className={`p-1.5 rounded-lg text-sm transition-colors ${showTableMenu ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18M8 6v12M16 6v12" />
            </svg>
          </button>
          {showTableMenu && (
            <div className="absolute top-9 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-xl min-w-[180px]">
              <p className="text-gray-400 text-xs font-medium mb-2">Table options</p>
              <div className="space-y-0.5">
                {[
                  { label: '+ Insert table (3×3)', action: insertTable, red: false },
                  { label: '+ Add column before', action: () => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false) }, red: false },
                  { label: '+ Add column after', action: () => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false) }, red: false },
                  { label: '+ Add row before', action: () => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false) }, red: false },
                  { label: '+ Add row after', action: () => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false) }, red: false },
                  { label: '− Delete column', action: () => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false) }, red: true },
                  { label: '− Delete row', action: () => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false) }, red: true },
                  { label: '× Delete table', action: () => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false) }, red: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${item.red ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Table Border + Fill Style */}
        <div className="relative">
          <button
            type="button"
            title="Table Border & Fill Style"
            onClick={() => { setShowTableStyleMenu(!showTableStyleMenu); setShowTableMenu(false); setShowColorPicker(false) }}
            className={`p-1.5 rounded-lg text-sm transition-colors ${showTableStyleMenu ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="1" strokeWidth={2} />
              <line x1="3" y1="12" x2="21" y2="12" strokeWidth={2} />
              <line x1="12" y1="3" x2="12" y2="21" strokeWidth={2} />
            </svg>
          </button>
          {showTableStyleMenu && (
            <div className="absolute top-9 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl w-64 max-h-[80vh] overflow-y-auto">
              <p className="text-gray-400 text-xs font-medium mb-3">Table Style</p>

              {/* Border Color */}
              <div className="mb-4">
                <label className="block text-gray-500 text-xs mb-1.5">Border Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={tableBorderColor}
                    onChange={(e) => applyTableStyles(e.target.value, tableBorderSize)}
                    className="w-10 h-9 rounded-lg cursor-pointer border border-gray-600 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={tableBorderColor}
                    onChange={(e) => {
                      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) applyTableStyles(e.target.value, tableBorderSize)
                    }}
                    maxLength={7}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {TABLE_BORDER_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyTableStyles(color, tableBorderSize)}
                      className={`w-7 h-7 rounded border-2 transition-all ${tableBorderColor === color ? 'border-white scale-110' : 'border-gray-700 hover:border-gray-400'}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Border Size */}
              <div className="mb-4">
                <label className="block text-gray-500 text-xs mb-1.5">
                  Border Size: <span className="text-orange-400">{tableBorderSize}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={tableBorderSize}
                  onChange={(e) => applyTableStyles(tableBorderColor, e.target.value)}
                  className="w-full accent-orange-500 mb-1"
                />
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>0px</span>
                  <span>4px</span>
                  <span>8px</span>
                </div>
              </div>

              {/* Quick sizes */}
              <div className="mb-4">
                <label className="block text-gray-500 text-xs mb-1.5">Quick sizes</label>
                <div className="flex gap-1.5">
                  {['0', '1', '2', '3', '4'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => applyTableStyles(tableBorderColor, size)}
                      className={`flex-1 py-1.5 rounded-lg text-xs border transition-colors ${
                        tableBorderSize === size
                          ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => applyTableStyles('transparent', '0')}
                className="w-full text-xs py-2 px-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-colors mb-4"
              >
                Remove borders
              </button>

              {/* Fill Color */}
              <div className="pt-4 border-t border-gray-700">
                <label className="block text-gray-500 text-xs mb-1.5">Cell Fill Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={tableFillColor}
                    onChange={(e) => applyTableFillColor(e.target.value)}
                    className="w-10 h-9 rounded-lg cursor-pointer border border-gray-600 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={tableFillColor}
                    onChange={(e) => {
                      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) applyTableFillColor(e.target.value)
                    }}
                    maxLength={7}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-2">
                  {TABLE_FILL_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyTableFillColor(color)}
                      className={`w-7 h-7 rounded border-2 transition-all ${tableFillColor === color ? 'border-white scale-110' : 'border-gray-700 hover:border-gray-400'}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => applyTableFillColor('transparent')}
                  className="w-full text-xs py-2 px-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  Remove fill color
                </button>
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* Link */}
        <Btn onClick={addLink} active={editor.isActive('link')} title="Add Link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </Btn>

        {/* Image */}
        <Btn onClick={addImage} title="Add Image" active={false}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </Btn>

        <Divider />

        {/* Undo Redo */}
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
        .ProseMirror td, .ProseMirror th { padding: 8px 12px; text-align: left; min-width: 80px; position: relative; }
        .ProseMirror th { color: #f9fafb; font-weight: 600; }
        .ProseMirror td { color: #d1d5db; }
        .ProseMirror .selectedCell { background: #1e3a5f !important; }
        .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background: #f97316; cursor: col-resize; z-index: 20; }
        .ProseMirror.resize-cursor { cursor: col-resize; }
        .ProseMirror a { color: #f97316; text-decoration: underline; cursor: pointer; }
      `}</style>

      <EditorContent editor={editor} />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-white font-semibold mb-5 text-lg">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /about"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter') applyLink() }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <p className="text-gray-500 text-xs mt-1.5">
                  External: <span className="text-gray-400">https://example.com</span> &nbsp;·&nbsp; Internal: <span className="text-gray-400">/services/web-development</span>
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Quick internal links</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'About', path: '/about' },
                    { label: 'Contact', path: '/contact' },
                    { label: 'Careers', path: '/careers' },
                    { label: 'All Insights', path: '/insights' },
                    { label: 'Web Development', path: '/services/website-development' },
                    { label: '3D Visualization', path: '/services/visualization' },
                    { label: 'Digital Marketing', path: '/services/digital-marketing-seo' },
                    { label: 'CAD / GIS', path: '/services/cad-gis-photogrammetry' },
                    { label: 'IT Consulting', path: '/services/it-consulting' },
                    { label: 'Automation Testing', path: '/services/automation-testing' },
                    { label: 'Partner', path: '/partner' },
                  ].map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => { setLinkUrl(item.path); setLinkTarget('_self') }}
                      className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors ${
                        linkUrl === item.path
                          ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Open in</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setLinkTarget('_blank')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      linkTarget === '_blank'
                        ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    🌐 New Tab
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkTarget('_self')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      linkTarget === '_self'
                        ? 'bg-green-500/20 border-green-500/40 text-green-400'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    🔗 Same Tab
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-1.5">
                  Use <span className="text-green-400">Same Tab</span> for internal links · <span className="text-orange-400">New Tab</span> for external links
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => { if (!editor) return; editor.chain().focus().unsetLink().run(); setShowLinkDialog(false) }}
                className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => setShowLinkDialog(false)}
                className="flex-1 py-2.5 bg-gray-800 border border-gray-700 text-gray-400 rounded-xl text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
