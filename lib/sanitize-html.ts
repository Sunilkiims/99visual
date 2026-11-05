// lib/sanitize-html.ts
// ─────────────────────────────────────────────────────────────────────────────
// Cleans article HTML before it is stored and again before it is rendered
// with dangerouslySetInnerHTML (app/components/PostViewer.tsx).
//
// Why: article bodies are raw HTML from the Tiptap editor, and content will
// soon also come from AI generation and pasted drafts. Anything executable
// (<script>, on* handlers, javascript: links, <iframe> from unknown sites,
// <form>, <style>) is removed; everything the editor actually produces —
// headings, lists, links, images, tables, text colour, highlight and
// alignment — passes through unchanged.
//
// Server-only (sanitize-html depends on htmlparser2, not the browser DOM).
// ─────────────────────────────────────────────────────────────────────────────
import sanitizeHtml from 'sanitize-html'

// Styles the editor writes: text colour, highlight, alignment, table widths.
const COLOR = [/^#(?:[0-9a-f]{3}){1,2}$/i, /^rgba?\([\d\s.,%]+\)$/i, /^[a-z]+$/i, /^inherit$/i]
const LENGTH = [/^\d+(?:\.\d+)?(?:px|%|em|rem)$/]

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'div', 'span',
    'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'sub', 'sup', 'small',
    'blockquote', 'code', 'pre', 'kbd',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'a', 'img', 'figure', 'figcaption', 'picture', 'source',
    'table', 'colgroup', 'col', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'iframe',
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'title', 'style', 'dir', 'lang', 'data-color', 'data-type'],
    a: ['href', 'target', 'rel', 'name'],
    img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
    source: ['srcset', 'sizes', 'type', 'media'],
    th: ['colspan', 'rowspan', 'colwidth', 'scope'],
    td: ['colspan', 'rowspan', 'colwidth'],
    col: ['span'],
    ol: ['start', 'type'],
    li: ['value'],
    iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading'],
  },
  allowedStyles: {
    '*': {
      color: COLOR,
      'background-color': COLOR,
      'text-align': [/^(?:left|right|center|justify|start|end)$/],
      'font-weight': [/^(?:normal|bold|[1-9]00)$/],
      'font-style': [/^(?:normal|italic)$/],
      'text-decoration': [/^[a-z\s-]+$/],
      width: LENGTH,
      'min-width': LENGTH,
      'max-width': LENGTH,
      height: LENGTH,
    },
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  allowedSchemesAppliedToAttributes: ['href', 'src', 'srcset'],
  allowProtocolRelative: false,
  // Video embeds only from these hosts; any other iframe is dropped.
  allowedIframeHostnames: [
    'www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com',
    'www.google.com', // Google Maps embeds
  ],
  allowIframeRelativeUrls: false,
  // An iframe whose src was removed (not an allowed host) is dropped whole.
  exclusiveFilter: (frame) => frame.tag === 'iframe' && !frame.attribs.src,
  // Script/style blocks are removed together with their contents.
  nonTextTags: ['script', 'style', 'textarea', 'noscript', 'option'],
  transformTags: {
    // Links that open a new tab must not hand the opener to the new page.
    a: (tagName, attribs) => {
      if (attribs.target === '_blank') {
        const rel = new Set((attribs.rel || '').split(/\s+/).filter(Boolean))
        rel.add('noopener')
        rel.add('noreferrer')
        attribs.rel = [...rel].join(' ')
      }
      return { tagName, attribs }
    },
  },
}

export function sanitizeArticleHtml(html: string): string {
  if (!html) return html
  return sanitizeHtml(html, OPTIONS)
}
