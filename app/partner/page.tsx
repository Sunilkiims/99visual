import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaHandshake, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

export const metadata = {
  title:
    "Partner With 99Visual | Business Collaboration & Growth Opportunities",

  description:
    "Join hands with 99Visual to unlock powerful business partnerships. Collaborate with us in 3D visualization, web development, SEO, and digital marketing to grow faster and scale globally.",

  keywords: [
    "Partner with 99Visual",
    "Business Partnership Opportunities",
    "Digital Agency Partnership",
    "3D Visualization Partnership",
    "Web Development Collaboration",
    "SEO Agency Partnership",
    "Digital Marketing Collaboration",
    "IT Consulting Partnership",
    "Startup Collaboration India",
    "B2B Partnership Agency",
    "White Label Web Development",
    "Outsource Web Development India",
    "Agency Collaboration Services",
    "Strategic Business Partnerships",
    "99Visual Partners"
  ],

  openGraph: {
    title:
      "Partner With 99 Visual | Collaborate & Grow Your Business",

    description:
      "Collaborate with 99Visual for web development, 3D visualization, and digital marketing services. Build strong partnerships and scale your business globally.",

    url: "https://www.99visual.com/partner",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/partner-og.jpg",
        width: 1200,
        height: 630,
        alt: "Partner With 99 Visual",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Partner With 99 Visual | Business Growth & Collaboration",

    description:
      "Looking for a reliable digital partner? Join 99Visual and grow with expert services in 3D, web, and marketing.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/partner-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/partner",
  },
};

export default function PartnersPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center bg-black text-white overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Grow Together with <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-lg text-gray-300">
            We collaborate with agencies, startups, and enterprises to deliver scalable, future-ready digital solutions.
          </p>

          <Link
            href="#services"
            className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Become a Partner
          </Link>
        </div>

        {/* 🔽 Arrow Scroll Indicator */}
        <a
          href="#services"
          className="absolute bottom-8 left-1/2 arrowSwing z-20 cursor-pointer"
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

      {/* 🚀 PARTNER TYPES */}
      <section id="services" className="py-20 px-6 bg-white dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Types of Partnerships
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaHandshake />} color="text-indigo-500" title="Business Partners" desc="Collaborate with enterprises to deliver tailored IT and visualization solutions." />
          <Card icon={<FaGlobe />} color="text-green-500" title="Global Partners" desc="Expand your reach with international collaborations and global impact." />
          <Card icon={<FaUsers />} color="text-blue-500" title="Technology Partners" desc="Work with innovators to build next-gen digital transformation solutions." />
          <Card icon={<FaLightbulb />} color="text-yellow-400" title="Creative Partners" desc="Partner with agencies and designers to create impactful experiences." />
        </div>
      </section>

      {/* 💎 WHY PARTNER */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Why Partner With Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <InfoCard title="Trusted Expertise" desc="Proven experience in development, IT consulting, visualization, and marketing." />
          <InfoCard title="Global Network" desc="Strong collaborations with clients and partners across multiple industries." />
          <InfoCard title="Innovation Driven" desc="Constantly evolving with cutting-edge technologies and strategies." />
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let’s Build the Future Together
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join our ecosystem and grow your business through strategic collaboration.
          </p>

          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Partner With Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
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

/* ========================= */
/* 💎 INFO CARD */
/* ========================= */

function InfoCard({ title, desc }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-zinc-800">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {desc}
      </p>
    </div>
  );
}