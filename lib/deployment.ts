// lib/deployment.ts
//
// "Is this the live site?" — independent of where it is hosted.
//
// Google Analytics and IndexNow must only run on the real production site,
// never on previews, staging copies or `npm run dev`. On Vercel that is
// signalled by VERCEL_ENV=production. On our own server (Oracle Cloud) set
// APP_ENV=production in the server's .env instead.

type Env = Record<string, string | undefined>

export function isProductionDeployment(env: Env = process.env): boolean {
  if (env.APP_ENV !== undefined && env.APP_ENV !== '') return env.APP_ENV === 'production'
  return env.VERCEL_ENV === 'production'
}
