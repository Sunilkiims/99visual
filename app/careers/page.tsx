import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

export const metadata = {
  title:
    "Careers at 99 Visual | Join Our Team in 3D, Web & Digital Innovation",

  description:
    "Explore exciting career opportunities at 99Visual. Join our team of experts in 3D visualization, web development, SEO, and digital marketing. Grow your career with us.",

  keywords: [
    "99Visual Careers",
    "Jobs in Web Development India",
    "3D Visualization Jobs",
    "Digital Marketing Jobs India",
    "SEO Jobs India",
    "IT Company Careers Bangalore",
    "Frontend Developer Jobs India",
    "Backend Developer Jobs India",
    "Join Digital Agency Team",
    "Creative Agency Careers",
    "Hiring Web Developers India",
    "Startup Jobs India",
    "Careers in Digital Agency",
    "UI UX Designer Jobs India",
    "Work at 99Visual"
  ],

  openGraph: {
    title:
      "Careers at 99 Visual | Build Your Future With Us",

    description:
      "Looking for exciting opportunities in web development, 3D visualization, or digital marketing? Join 99Visual and grow your career with innovation and creativity.",

    url: "https://www.99visual.com/careers",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/careers-og.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at 99 Visual",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Careers at 99 Visual | Join Our Creative Team",

    description:
      "Discover career opportunities at 99 Visual in web development, 3D, and digital marketing. Let’s grow together.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/careers-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Build Your Future with <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-lg text-gray-300">
            We’re not just hiring—we’re building a team of innovators, creators, and problem-solvers shaping the future of digital experiences.
          </p>

          {/* CTA */}
          <Link
            href="#careers"
            className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Explore Opportunities
          </Link>
        </div>

        {/* 🔽 Arrow Swing Scroll Indicator */}
        <a
          href="#careers"
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

      {/* 🚀 CAREER AREAS */}
      <section id="careers" className="py-20 px-6 bg-white dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Career Opportunities
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaLaptopCode />} color="text-indigo-500" title="Development" desc="Build scalable web apps and platforms powering global businesses." />
          <Card icon={<FaUsers />} color="text-green-500" title="Design & UX" desc="Create intuitive, human-centered designs that elevate user experiences." />
          <Card icon={<FaLightbulb />} color="text-yellow-400" title="Innovation" desc="Work on AI, 3D visualization, GIS, and next-gen technologies." />
          <Card icon={<FaRocket />} color="text-red-500" title="Digital Marketing" desc="Drive growth with SEO, paid campaigns, and creative strategies." />
        </div>
      </section>

      {/* 💎 WHY WORK WITH US */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Why Work With Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <InfoCard title="Growth & Learning" desc="Continuous learning, mentorship, and real-world experience to accelerate your career." />
          <InfoCard title="Collaborative Culture" desc="A supportive, creative, and diverse team environment that values your ideas." />
          <InfoCard title="Impactful Projects" desc="Work on meaningful projects that create real business impact globally." />
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join a team that thrives on innovation, creativity, and delivering excellence.
          </p>

          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Join Our Team →
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

        {/* Icon */}
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