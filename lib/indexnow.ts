// lib/indexnow.ts
//
// IndexNow tells Bing (and Yandex, Seznam, Naver) the moment a page is added
// or changed, so it is crawled within minutes instead of whenever the crawler
// next comes by. Google does not take part; this has no effect on Google.
//
// The key below proves we own the site: the same value is served as a text
// file at https://www.99visual.com/<key>.txt (public/<key>.txt). If you ever
// change the key, rename that file to match.

import { BASE } from '@/lib/schema'

export const INDEXNOW_KEY = 'd05f66a70518d17975748117598809bb'

const ENDPOINT = 'https://api.indexnow.org/indexnow'

/**
 * Submits URLs to IndexNow. Runs only on the production deployment, so
 * previews and local development never ping search engines. Never throws:
 * a failed ping must not fail the save that triggered it.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (process.env.VERCEL_ENV !== 'production') return
  const urlList = [...new Set(urls)].filter((u) => u.startsWith(`${BASE}/`) || u === BASE)
  if (urlList.length === 0) return

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(BASE).host,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    })
    if (!res.ok && res.status !== 202) {
      console.error(`IndexNow: ${res.status} ${await res.text().catch(() => '')}`)
    }
  } catch (e) {
    console.error('IndexNow: request failed', e)
  }
}
