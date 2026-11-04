// app/components/insights/stripForeignImages.ts
//
// Removes images that were pasted into an article straight from a ChatGPT
// answer. Those <img> tags point at images.openai.com: URLs that are not
// ours, expire, and carry other companies' names as alt text (e.g.
// "Nullcraft | Digital Solutions That Matter"). To Google they are a strong
// "copied content" signal and, once the URLs expire, broken images.
//
// Runs on the server before the article HTML is rendered, so a post stays
// clean even if such an image is pasted into the editor again. Images hosted
// on our own domain or Cloudinary are untouched.

const BLOCKED_IMAGE_HOSTS = ['images.openai.com']

const hostPattern = BLOCKED_IMAGE_HOSTS.map((h) => h.replace(/\./g, '\\.')).join('|')

// An <img> whose src points at a blocked host, optionally wrapped in a link.
const imgTag = `<img\\b[^>]*\\bsrc\\s*=\\s*["']https?://(?:${hostPattern})[^"']*["'][^>]*>`
const linkedOrBareImg = new RegExp(`<a\\b[^>]*>\\s*${imgTag}\\s*</a>|${imgTag}`, 'gi')
// A <figure> or <p> left with nothing inside once its image is gone.
const emptyWrapper = /<(figure|p)\b[^>]*>\s*(?:<figcaption\b[^>]*>[\s\S]*?<\/figcaption>\s*)?<\/\1>/gi

export function stripForeignImages(html: string): string {
  if (!html) return html
  const withoutImages = html.replace(linkedOrBareImg, '')
  if (withoutImages === html) return html
  return withoutImages.replace(emptyWrapper, '')
}
