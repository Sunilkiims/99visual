import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaBookOpen, FaCode, FaChartLine, FaLightbulb } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog | 99 Visual Insights, Tutorials & Digital Trends",

  description:
    "Read the latest articles, tutorials, and insights from 99Visual on web development, SEO, digital marketing, and 3D visualization.",

  keywords: [
    "99Visual Blog",
    "Web Development Blog",
    "SEO Blog India",
    "Digital Marketing Tips",
    "3D Visualization Blog",
    "Tech Articles India",
    "Startup Growth Blog",
    "Frontend Backend Tutorials",
    "UI UX Blog",
    "IT Company Insights"
  ],

  openGraph: {
    title: "99 Visual Blog | Insights & Trends",

    description:
      "Explore expert insights and tutorials from 99Visual.",

    url: "https://www.99visual.com/blog",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "99 Visual Blog",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "99 Visual Blog",

    description:
      "Discover insights, tutorials, and strategies from 99Visual.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/blog-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Our <span className="text-orange-500">Blog</span>
          </h1>

          <p className="text-lg text-gray-300">
            Insights, tutorials, and strategies to help you grow in the digital world.
          </p>

          <Link
            href="#blog"
            className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Explore Articles
          </Link>
        </div>

        {/* Arrow */}
        <a
          href="#blog"
          className="absolute bottom-6 left-1/2 arrowSwing"
          style={{ transform: "translateX(-50%)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* 📰 BLOG POSTS */}
      <section id="blog" className="py-20 px-6 bg-white dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Latest Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <BlogCard title="Top Web Development Trends in 2026" date="March 2026" desc="Discover the latest technologies shaping modern web applications." />
          <BlogCard title="SEO Strategies That Drive Results" date="February 2026" desc="Learn proven techniques to rank higher on Google." />
          <BlogCard title="Why 3D Visualization is the Future" date="January 2026" desc="How 3D technology is transforming industries globally." />
        </div>
      </section>

      {/* 📚 BLOG CATEGORIES */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Explore Categories
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaCode />} title="Development" desc="Frontend, backend, and scalable systems." color="text-indigo-500" />
          <Card icon={<FaChartLine />} title="SEO" desc="Ranking strategies and search optimization." color="text-green-500" />
          <Card icon={<FaLightbulb />} title="Marketing" desc="Growth strategies and digital campaigns." color="text-yellow-400" />
          <Card icon={<FaBookOpen />} title="Insights" desc="Industry trends and expert knowledge." color="text-orange-500" />
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Want to Grow Your Business?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get expert insights and strategies tailored to your goals.
          </p>

          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Get in Touch →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ========================= */
/* 📰 BLOG CARD */
/* ========================= */

function BlogCard({ title, date, desc }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100 dark:border-zinc-800">
      <p className="text-xs text-orange-500 mb-2">{date}</p>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
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
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-orange-500/20 to-transparent hover:from-orange-500/40 transition">

      <div className="bg-white dark:bg-zinc-900 border border-white/20 dark:border-white/10 backdrop-blur-xl p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition transform group-hover:-translate-y-2">

        <div className={`w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-xl bg-gray-100 dark:bg-zinc-800 ${color} text-xl group-hover:scale-110 transition`}>
          {icon}
        </div>

        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 transition">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}