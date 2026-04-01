import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaQuestionCircle, FaHeadset, FaBookOpen, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "Help Center | 99 Visual Support, FAQs & Customer Assistance",

  description:
    "Get help with 99Visual services including web development, 3D visualization, SEO, and digital marketing. Explore FAQs, guides, and contact support.",

  keywords: [
    "99Visual Help Center",
    "Customer Support 99Visual",
    "Web Development Help India",
    "SEO Support India",
    "3D Visualization Help",
    "Digital Marketing Support",
    "Technical Support IT Company",
    "FAQ 99Visual",
    "Client Support Services",
    "Website Issue Help India",
    "Support for Web Applications",
    "99Visual Customer Care",
    "Help Desk IT Services",
    "Troubleshooting Web Issues"
  ],

  openGraph: {
    title: "99 Visual Help Center | Fast & Reliable Support",

    description:
      "Need help? Access FAQs, guides, and expert support from 99Visual. We’re here to assist you with all your digital and IT needs.",

    url: "https://www.99visual.com/help-center",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/help-center-og.jpg",
        width: 1200,
        height: 630,
        alt: "99 Visual Help Center",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "99 Visual Help Center | Support & FAQs",

    description:
      "Explore FAQs, troubleshooting guides, and expert support at 99Visual Help Center.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/help-center-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/help-center",
  },
};

export default function HelpCenterPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            How Can We <span className="text-orange-500">Help You?</span>
          </h1>

          <p className="text-lg text-gray-300">
            Explore solutions, guides, and expert support to resolve your queries quickly and efficiently.
          </p>

          <Link
            href="#support"
            className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Support
          </Link>
        </div>

        {/* Arrow */}
        <a
          href="#support"
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

      {/* 📚 SUPPORT OPTIONS */}
      <section id="support" className="py-20 px-6 bg-white dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Support Categories
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaQuestionCircle />} color="text-orange-500" title="FAQs" desc="Find quick answers to commonly asked questions about our services." />
          <Card icon={<FaBookOpen />} color="text-indigo-500" title="Guides" desc="Step-by-step tutorials to help you use our services effectively." />
          <Card icon={<FaTools />} color="text-green-500" title="Technical Help" desc="Resolve issues related to websites, apps, and IT infrastructure." />
          <Card icon={<FaHeadset />} color="text-red-500" title="Contact Support" desc="Reach out to our experts for personalized assistance." />
        </div>
      </section>

      {/* 💡 FAQ SECTION */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          <FAQ question="What services does 99Visual offer?" answer="We provide web development, 3D visualization, digital marketing, SEO, and IT consulting services tailored to your business needs." />
          <FAQ question="How can I contact support?" answer="You can reach our team via the contact page or directly request support through this help center." />
          <FAQ question="Do you provide ongoing maintenance?" answer="Yes, we offer ongoing support, maintenance, and optimization services for all our solutions." />
          <FAQ question="How quickly will I get a response?" answer="Our team typically responds within 24 hours, depending on the complexity of the request." />
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Still Need Help?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our experts are ready to assist you with tailored solutions and quick support.
          </p>

          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Contact Support →
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
/* 💎 FAQ */
/* ========================= */

function FAQ({ question, answer }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
        {question}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {answer}
      </p>
    </div>
  );
}