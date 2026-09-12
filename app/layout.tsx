import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { BASE } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─────────────────────────────────────────────────────────────────────────────
// ROOT METADATA — sitewide defaults / fallback only.
//
// Every route in app/ already exports its own page-specific `metadata` (title,
// description, canonical, Open Graph, Twitter card). Next.js merges child
// metadata over these root values key-by-key, so nothing here duplicates or
// overrides a page's own metadata — it only fills in for the few routes that
// don't declare metadata of their own (e.g. /login) and provides site-wide
// values (metadataBase, icons, manifest, default robots) that would otherwise
// have to be repeated on every page.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "99 Visual Solutions | 3D Viz, Web, CAD, GIS & IT Consulting",
    template: "%s | 99 Visual Solutions",
  },
  description:
    "Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting to clients across India, USA, UK, UAE & Australia.",

  applicationName: "99 Visual Solutions",
  authors: [{ name: "99 Visual Solutions", url: BASE }],
  creator: "99 Visual Solutions",
  publisher: "99 Visual Solutions",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },

  // Default robots directive — indexable by default. Private routes such as
  // /admin and /login are additionally excluded via app/robots.ts.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Site-wide Open Graph / Twitter fallback. Individual pages override these
  // with page-specific title/description/image.
  openGraph: {
    title: "99 Visual Solutions | 3D Viz, Web, CAD, GIS & IT Consulting",
    description:
      "Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally.",
    url: `${BASE}/`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url: `${BASE}/images/home-og.jpg`,
        width: 1200,
        height: 630,
        alt: "99 Visual Solutions — Global IT & Digital Transformation Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "99 Visual Solutions | 3D Viz, Web, CAD, GIS & IT Consulting",
    description:
      "Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally.",
    images: [`${BASE}/images/home-og.jpg`],
  },

  // These icon/manifest files already exist under /public and app/, but only
  // favicon.ico is picked up automatically by Next.js's file-based icon
  // convention (icon.*, apple-icon.*). favicon.svg, favicon-96x96.png and
  // apple-touch-icon.png use non-convention filenames, so they were never
  // actually being served to browsers/search engines — wiring them up here.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  // site.webmanifest exists but was never linked from metadata, so it was
  // never discovered by browsers.
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        Pannellum's CSS/JS previously loaded here for every route. It's only
        used by the 360° panorama viewer on /services/visualization (via
        app/components/panoramaviewer.tsx), so it's now loaded there instead
        — every other page stops paying for a render-blocking third-party
        CDN stylesheet + beforeInteractive script it never needed.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}