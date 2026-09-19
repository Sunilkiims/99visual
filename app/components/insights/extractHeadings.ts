// extractHeadings.ts
//
// The article body (`post.content`) is stored as raw HTML from a rich-text
// editor and rendered via dangerouslySetInnerHTML in PostViewer — there's no
// existing outline/AST to build a Table of Contents from. This does the
// minimum needed for that: find each <h2>/<h3>, generate a stable slug id
// for it (de-duplicated if two headings render the same text), and inject
// that id onto the tag so `#slug` anchors + the TOC's scroll-spy both have
// something real to target.
//
// Deliberately a regex pass rather than a full HTML parser: the content
// only ever comes from the CMS's rich-text editor, which emits clean,
// non-nested <h2>/<h3> tags, so a parser dependency isn't warranted here.
// Everything else in the HTML (paragraphs, images, tables, existing CTA
// links, etc.) passes through completely untouched.

export interface ArticleHeading {
  id: string
  text: string
  level: 2 | 3
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-+|-+$)/g, '') || 'section'
  )
}

export function extractHeadings(html: string): { html: string; headings: ArticleHeading[] } {
  const headings: ArticleHeading[] = []
  const seenSlugs = new Map<string, number>()

  const withIds = html.replace(
    /<h([23])((?:\s+[^>]*)?)>([\s\S]*?)<\/h\1>/gi,
    (match, levelStr, attrs, inner) => {
      const text = inner
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .trim()

      if (!text) return match

      let slug = slugify(text)
      const seenCount = seenSlugs.get(slug) ?? 0
      seenSlugs.set(slug, seenCount + 1)
      if (seenCount > 0) slug = `${slug}-${seenCount}`

      const level = Number(levelStr) as 2 | 3
      headings.push({ id: slug, text, level })

      // Strip any pre-existing id from the editor's own markup so we never
      // emit a duplicate id="" attribute on the tag.
      const cleanAttrs = attrs.replace(/\s+id\s*=\s*"[^"]*"/i, '')
      return `<h${levelStr}${cleanAttrs} id="${slug}">${inner}</h${levelStr}>`
    }
  )

  return { html: withIds, headings }
}
