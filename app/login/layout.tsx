import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIX — /login had no noindex directive anywhere. It was excluded from
// crawling via app/robots.ts (disallow), but a robots.txt disallow only
// blocks crawling — it does not guarantee the URL stays out of Google's
// index if the URL is discovered some other way (an external link, a stray
// internal reference, browser history, etc.). Google's own guidance is to
// pair a "don't index this" URL with an explicit noindex, not rely on
// robots.txt alone.
//
// page.tsx here is a Client Component ('use client'), and Next.js does not
// allow a `metadata` export from Client Components — so the noindex has to
// live in this sibling layout.tsx instead.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
