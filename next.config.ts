import type { NextConfig } from "next";

// The only hostname that should ever be indexed. Every canonical, sitemap
// entry and JSON-LD URL already points here (lib/schema.ts BASE).
const PRODUCTION_HOST = "www.99visual.com";
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Static media under /public (video clips, images, fonts) is content-
  // addressed by filename only — there's no build hash in the URL, so a
  // long max-age relies on the filename changing when the content does.
  // Scoped to file extensions only (never matches an app/ page route, none
  // of which end in these extensions) so this can't accidentally cache an
  // HTML response. Improves repeat-view load time / Core Web Vitals for the
  // video showcase pages in particular, which otherwise re-fetch multi-MB
  // .mp4 files on every visit.
  async headers() {
    return [
      // ── Staging / preview protection ─────────────────────────────────────
      // Any request whose Host is not the production hostname — the
      // 99visual.vercel.app alias, per-deployment preview URLs, localhost —
      // gets `X-Robots-Tag: noindex`. This keeps duplicate copies of the site
      // out of Google's index even if a staging link leaks, while robots.txt
      // stays crawlable so Google can actually see the noindex. Requests to
      // www.99visual.com are unaffected.
      {
        source: "/:path*",
        missing: [{ type: "host", value: PRODUCTION_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: '/:path*(jpg|jpeg|png|gif|webp|avif|svg|ico|mp4|webm|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ── Service page redirects ─────────────────────────────────────────────
      {
        source: "/our_services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/visualisation-services",
        destination: "/services/visualization",
        permanent: true,
      },
      {
        source: "/services/digital-marketing-and-seo",
        destination: "/services/digital-marketing-seo",
        permanent: true,
      },
      {
        source: "/services/social-media-marketing",
        destination: "/services/digital-marketing-seo",
        permanent: true,
      },
      {
        source: "/services/testing-development",
        destination: "/services/automation-testing",
        permanent: true,
      },
      {
        source: "/services/gis-cad-photogrammetry",
        destination: "/services/cad-gis-photogrammetry",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/website-development",
        permanent: true,
      },
      // NEW — this was the actual legacy URL indexed in Google Search Console
      // (/services/website-webapp-development), which did not match any
      // existing source pattern above and was 404ing. Next.js matches this
      // with or without a trailing slash, so no separate rule is needed for
      // /services/website-webapp-development/.
      {
        source: "/services/website-webapp-development",
        destination: "/services/website-development",
        permanent: true,
      },

      // ── Company page redirects ──────────────────────────────────────────────
      // Legacy URL flagged in GSC as "Crawled - currently not indexed"
      // (99visual.com/partnership-with-us/) — no rule previously existed
      // for it, so it was 404ing just like website-webapp-development was.
      {
        source: "/partnership-with-us",
        destination: "/partner",
        permanent: true,
      },

      // ── Blog / insights redirects ──────────────────────────────────────────
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/insights/:slug*",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/post002",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})",
        destination: "/insights",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;