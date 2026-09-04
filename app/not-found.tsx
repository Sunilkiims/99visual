import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

// ─────────────────────────────────────────────────────────────────────────────
// Custom 404. Next.js already serves this route (and any unmatched route)
// with a real HTTP 404 status automatically — that behavior is unaffected by
// this file. What this adds:
//   • Branded content instead of the bare framework default page.
//   • An explicit noindex,nofollow directive so a stray inbound/broken link
//     can never get this URL indexed.
//   • A handful of links into key sections so a visitor who lands here from
//     a broken/old link isn't stuck at a dead end.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

const HELPFUL_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-500">
          404 error
        </p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 max-w-md text-neutral-600">
          The page you&apos;re looking for may have been moved, renamed, or
          no longer exists. Here are a few places to pick up from instead.
        </p>
        <nav aria-label="Suggested pages" className="mt-8 flex flex-wrap justify-center gap-3">
          {HELPFUL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
