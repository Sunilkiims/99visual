// app/about/page.tsx
import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import TabAbout from "../components/tabstory";
import WhyChooseUs from "../components/whychooseus";
import DataPrivacy from "../components/dataprivacy";

export const metadata: Metadata = {
  title: "About 99 Visual | IT, Web Development, SEO & 3D Visualization Company in India",
  
  description:
    "Learn about 99 Visual, a leading IT solutions company offering web development, digital marketing, SEO, 3D visualization, CAD/GIS, and QA testing services. Discover our mission, expertise, and commitment to innovation.",
  
  keywords: [
    "About 99Visual",
    "IT Company India",
    "Web Development Company India",
    "Digital Marketing Agency India",
    "SEO Company India",
    "3D Visualization Company",
    "CAD GIS Company India",
    "Software Development Company",
    "Technology Solutions Company",
    "IT Services Company Bangalore",
    "99 Visual Solutions"
  ],

  openGraph: {
    title: "About 99Visual | Our Story & Expertise",
    
    description:
      "Discover 99Visual’s journey, team, and expertise in IT consulting, web development, SEO, digital marketing, and visualization services.",
    
    url: "https://www.99visual.com/about",
    
    siteName: "99Visual",
    
    images: [
      {
        url: "https://www.99visual.com/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About 99Visual Solutions",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    
    title: "About 99Visual | IT & Digital Solutions Company",
    
    description:
      "Meet the team behind 99Visual and explore our expertise in IT, web development, SEO, and visualization services.",
    
    site: "@99visual",
    creator: "@99visual",
    
    images: [
      "https://www.99visual.com/images/about-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            About <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're not just another digital agency—we're the bridge between your wildest
            creative visions and the digital reality your audience craves. We believe that
            every pixel, every interaction, and every moment of user experience should tell a
            story worth remembering.
          </p>
        </div>

        {/* 🔽 Arrow Swing Scroll Indicator */}
        <a
          href="#about-content"
          className="absolute bottom-6 left-1/2 arrowSwing z-20 cursor-pointer"
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

      {/* ✅ Added ID here */}
      <div id="about-content">
        <TabAbout />
        <WhyChooseUs />
        <DataPrivacy />
      </div>

      <Footer />
    </>
  );
}