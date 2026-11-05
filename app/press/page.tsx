import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaNewspaper, FaBullhorn, FaChartLine, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  // `absolute` — already contains the brand; prevents a duplicated suffix.
  title: { absolute: "Press & Media | 99 Visual News, Announcements & Media Kit" },

  description:
    "Explore the latest news, press releases, media coverage, and announcements from 99Visual. Download our media kit and connect with our team.",

  keywords: [
    "99Visual Press",
    "99Visual News",
    "Digital Agency Media Coverage",
    "IT Company Press Release",
    "Startup News India",
    "Web Development Company News",
    "3D Visualization Company Updates",
    "Media Kit 99Visual",
    "Press Contact IT Company",
    "Company Announcements Digital Agency"
  ],

  openGraph: {
    title: "99 Visual Press & Media | Latest Updates",

    description:
      "Stay updated with the latest announcements, press releases, and media coverage from 99Visual.",

    url: "https://www.99visual.com/press",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/press-og.jpg",
        width: 1200,
        height: 630,
        alt: "99 Visual Press",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "99 Visual Press & Media",

    description:
      "Discover news, press releases, and updates from 99Visual.",

    site: "@99VisualSoluti1",
    creator: "@99VisualSoluti1",

    images: ["https://www.99visual.com/images/og/press-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/press",
  },
};

export default function PressPage() {
  return (
    <>
      <Header />
      <div className="vz vz-legacy-type">
      <main id="main">

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,107,255,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Press & <span className="text-[#9bb6ff]">Media</span>
          </h1>

          <p className="text-lg text-gray-300">
            Stay updated with the latest news, announcements, and media resources from 99Visual.
          </p>

          <Link
            href="#press"
            className="inline-block mt-8 bg-gradient-to-r from-[#386BFF] to-[#9bb6ff] px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Explore News
          </Link>
        </div>

        {/* Arrow */}
        <a
          href="#press"
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 arrowSwing"
          style={{ transform: "translateX(-50%)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#9bb6ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* 📰 PRESS HIGHLIGHTS */}
      <section id="press" className="py-20 px-6 bg-[#111827] dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-[#F4F6FC] dark:text-white">
          Latest Announcements
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <PressCard title="Launching Advanced 3D Visualization Services" date="March 2026" desc="99Visual expands its portfolio with cutting-edge 3D and visualization solutions." />
          <PressCard title="Expanding Digital Marketing Solutions" date="February 2026" desc="Introducing AI-driven SEO and marketing strategies for global businesses." />
          <PressCard title="Strategic Growth & Global Vision" date="January 2026" desc="99Visual aims to expand operations into international markets including the UK." />
        </div>
      </section>

      {/* 📢 MEDIA RESOURCES */}
      <section className="py-20 px-6 bg-[#0d1322] dark:bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-[#F4F6FC] dark:text-white">
          Media Resources
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaNewspaper />} title="Press Releases" desc="Official company announcements and updates." color="text-indigo-500" />
          <Card icon={<FaBullhorn />} title="Media Kit" desc="Download logos, brand assets, and company information." color="text-[#9bb6ff]" />
          <Card icon={<FaChartLine />} title="Company Insights" desc="Key metrics, growth data, and performance highlights." color="text-green-500" />
          <Card icon={<FaEnvelope />} title="Press Contact" desc="Get in touch with our media relations team." color="text-red-500" />
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,107,255,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Want to Feature 99Visual?
          </h2>
          <p className="text-[#8a94ad] mb-8 max-w-xl mx-auto">
            Connect with our team for collaborations, interviews, and media inquiries.
          </p>

          <Link
            href="/contact"
            className="bg-[#111827] text-[#F4F6FC] px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#1d2740] transition"
          >
            Contact Press Team →
          </Link>
        </div>
      </section>

      </main>

      </div>

      <Footer />
    </>
  );
}

/* ========================= */
/* 📰 PRESS CARD */
/* ========================= */

function PressCard({ title, date, desc }: any) {
  return (
    <div className="bg-[#111827] dark:bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition border border-white/10 dark:border-zinc-800">
      <p className="text-xs text-[#9bb6ff] mb-2">{date}</p>
      <h3 className="text-lg font-semibold mb-2 text-[#F4F6FC] dark:text-white">
        {title}
      </h3>
      <p className="text-[#A7B0C6] dark:text-[#8a94ad] text-sm">
        {desc}
      </p>
    </div>
  );
}

/* ========================= */
/* 💎 CARD */
/* ========================= */

function Card({ icon, title, desc, color }: any) {
  return (
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-[#386BFF]/20 to-transparent hover:from-[#386BFF]/40 transition">

      <div className="bg-[#111827] dark:bg-zinc-900 border border-white/20 dark:border-white/10 backdrop-blur-xl p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition transform group-hover:-translate-y-2">

        <div className={`w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-xl bg-[#161f33] dark:bg-zinc-800 ${color} text-xl group-hover:scale-110 transition`}>
          {icon}
        </div>

        <h3 className="text-lg font-semibold mb-2 text-[#F4F6FC] dark:text-white group-hover:text-[#9bb6ff] transition">
          {title}
        </h3>

        <p className="text-[#A7B0C6] dark:text-[#8a94ad] text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}