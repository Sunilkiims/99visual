import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Careers at 99 Visual | Web Developer, Designer & Digital Marketing Jobs - Bangalore India",

  description:
    "Join 99 Visual's growing team in Bangalore, India. We're hiring web developers, UI/UX designers, 3D visualization artists, SEO specialists, and digital marketers. Build your career with a forward-thinking digital agency.",

  keywords: [
    // Primary
    "99Visual Careers",
    "Jobs at 99Visual",
    "Work at 99Visual",
    // Location-Specific
    "IT Company Jobs Bangalore",
    "Digital Agency Jobs Bangalore",
    "Startup Jobs Bangalore",
    "IT Jobs India",
    // Development
    "Web Developer Jobs India",
    "Frontend Developer Jobs India",
    "Backend Developer Jobs India",
    "Full Stack Developer Jobs Bangalore",
    "React Developer Jobs India",
    "Next.js Developer Jobs India",
    // Design
    "UI UX Designer Jobs India",
    "UI UX Designer Jobs Bangalore",
    "3D Visualization Jobs India",
    "3D Artist Jobs Bangalore",
    // Marketing
    "Digital Marketing Jobs India",
    "SEO Jobs India",
    "SEO Specialist Jobs Bangalore",
    "Content Marketing Jobs India",
    // General
    "Creative Agency Careers India",
    "Hiring Web Developers India",
    "Careers in Digital Agency India",
    "Join Digital Agency Team India",
  ],

  openGraph: {
    title: "Careers at 99Visual | Web, Design & Digital Marketing Jobs - Bangalore",

    description:
      "We're hiring! Join 99Visual in Bangalore — roles in web development, UI/UX design, 3D visualization, SEO, and digital marketing. Shape the future of digital with us.",

    url: "https://www.99visual.com/careers",
    siteName: "99Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/careers-og.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at 99Visual - Web Developer, Designer & Digital Marketing Jobs Bangalore",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Careers at 99Visual | Join Our Creative Team in Bangalore",
    description:
      "We're hiring web developers, UI/UX designers, 3D artists, and digital marketers in Bangalore. Grow your career at 99Visual.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/careers-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/careers",
  },

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

  authors: [{ name: "99Visual Solutions", url: "https://www.99visual.com" }],

  category: "Technology",
};

export default function CareersPage() {
  return (
    <>
      <Header />

      {/* ── JSON-LD: Organization ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.99visual.com/#organization",
            "name": "99Visual Solutions",
            "url": "https://www.99visual.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.99visual.com/images/logo.png",
              "width": 200,
              "height": 60,
            },
            "description":
              "99Visual Solutions is a digital agency based in Bangalore, India, offering services in web development, 3D visualization, SEO, and digital marketing.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN",
            },
            "sameAs": [
              "https://twitter.com/99visual",
              "https://www.linkedin.com/company/99visual",
            ],
            "knowsAbout": [
              "Web Development",
              "3D Visualization",
              "UI/UX Design",
              "Digital Marketing",
              "SEO",
              "GIS",
              "Automation Testing",
            ],
          }),
        }}
      />

      {/* ── JSON-LD: WebPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.99visual.com/careers#webpage",
            "url": "https://www.99visual.com/careers",
            "name": "Careers at 99 Visual | Web Developer, Designer & Digital Marketing Jobs - Bangalore India",
            "description":
              "Join 99 Visual's growing team in Bangalore, India. We're hiring web developers, UI/UX designers, 3D visualization artists, SEO specialists, and digital marketers.",
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://www.99visual.com/#website",
              "url": "https://www.99visual.com",
              "name": "99Visual Solutions",
              "publisher": {
                "@id": "https://www.99visual.com/#organization",
              },
            },
            "about": {
              "@id": "https://www.99visual.com/#organization",
            },
            "breadcrumb": {
              "@id": "https://www.99visual.com/careers#breadcrumb",
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://www.99visual.com/images/og/careers-og.jpg",
              "width": 1200,
              "height": 630,
            },
          }),
        }}
      />

      {/* ── JSON-LD: BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://www.99visual.com/careers#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.99visual.com",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Careers",
                "item": "https://www.99visual.com/careers",
              },
            ],
          }),
        }}
      />

      {/* ── JSON-LD: JobPosting × 4 (individual scripts for Google Jobs eligibility) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Web Developer",
            "description":
              "Build scalable web apps and platforms powering global businesses. Work with modern frameworks like React and Next.js to deliver high-performance digital solutions for clients worldwide.",
            "identifier": {
              "@type": "PropertyValue",
              "name": "99Visual Solutions",
              "value": "99visual-web-developer",
            },
            "hiringOrganization": {
              "@type": "Organization",
              "@id": "https://www.99visual.com/#organization",
              "name": "99Visual Solutions",
              "sameAs": "https://www.99visual.com",
              "logo": "https://www.99visual.com/images/logo.png",
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN",
              },
            },
            "employmentType": "FULL_TIME",
            "workHours": "Monday to Friday, 9am - 6pm IST",
            "url": "https://www.99visual.com/careers",
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "India",
            },
            "skills": "React, Next.js, JavaScript, TypeScript, HTML, CSS, REST APIs",
            "occupationalCategory": "15-1254 Web Developers",
            "jobBenefits": "Growth opportunities, mentorship, collaborative culture, impactful projects",
            "datePosted": "2025-01-01",
            "validThrough": "2025-12-31",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "UI/UX Designer",
            "description":
              "Create intuitive, human-centered designs that elevate user experiences. Collaborate with developers and stakeholders to design wireframes, prototypes, and pixel-perfect interfaces.",
            "identifier": {
              "@type": "PropertyValue",
              "name": "99Visual Solutions",
              "value": "99visual-ui-ux-designer",
            },
            "hiringOrganization": {
              "@type": "Organization",
              "@id": "https://www.99visual.com/#organization",
              "name": "99Visual Solutions",
              "sameAs": "https://www.99visual.com",
              "logo": "https://www.99visual.com/images/logo.png",
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN",
              },
            },
            "employmentType": "FULL_TIME",
            "workHours": "Monday to Friday, 9am - 6pm IST",
            "url": "https://www.99visual.com/careers",
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "India",
            },
            "skills": "Figma, Adobe XD, Wireframing, Prototyping, User Research, Design Systems",
            "occupationalCategory": "27-1021 Commercial and Industrial Designers",
            "jobBenefits": "Growth opportunities, mentorship, collaborative culture, impactful projects",
            "datePosted": "2025-01-01",
            "validThrough": "2025-12-31",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Digital Marketing Specialist",
            "description":
              "Drive growth with SEO, paid campaigns, and creative strategies. Plan and execute digital marketing campaigns across search, social, and display channels for a diverse client base.",
            "identifier": {
              "@type": "PropertyValue",
              "name": "99Visual Solutions",
              "value": "99visual-digital-marketing-specialist",
            },
            "hiringOrganization": {
              "@type": "Organization",
              "@id": "https://www.99visual.com/#organization",
              "name": "99Visual Solutions",
              "sameAs": "https://www.99visual.com",
              "logo": "https://www.99visual.com/images/logo.png",
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN",
              },
            },
            "employmentType": "FULL_TIME",
            "workHours": "Monday to Friday, 9am - 6pm IST",
            "url": "https://www.99visual.com/careers",
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "India",
            },
            "skills": "SEO, Google Ads, Meta Ads, Content Marketing, Analytics, Email Marketing",
            "occupationalCategory": "11-2021 Marketing Managers",
            "jobBenefits": "Growth opportunities, mentorship, collaborative culture, impactful projects",
            "datePosted": "2025-01-01",
            "validThrough": "2025-12-31",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "3D Visualization Artist",
            "description":
              "Work on AI, 3D visualization, GIS, and next-gen technologies. Create photorealistic renders, animations, and interactive 3D content for architecture, product, and digital projects.",
            "identifier": {
              "@type": "PropertyValue",
              "name": "99Visual Solutions",
              "value": "99visual-3d-visualization-artist",
            },
            "hiringOrganization": {
              "@type": "Organization",
              "@id": "https://www.99visual.com/#organization",
              "name": "99Visual Solutions",
              "sameAs": "https://www.99visual.com",
              "logo": "https://www.99visual.com/images/logo.png",
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bangalore",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN",
              },
            },
            "employmentType": "FULL_TIME",
            "workHours": "Monday to Friday, 9am - 6pm IST",
            "url": "https://www.99visual.com/careers",
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "India",
            },
            "skills": "Blender, 3ds Max, Cinema 4D, V-Ray, Unreal Engine, GIS, Photorealistic Rendering",
            "occupationalCategory": "27-1014 Special Effects Artists and Animators",
            "jobBenefits": "Growth opportunities, mentorship, collaborative culture, impactful projects",
            "datePosted": "2025-01-01",
            "validThrough": "2025-12-31",
          }),
        }}
      />

      {/* ── JSON-LD: FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What roles is 99Visual hiring for in Bangalore?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "99Visual is currently hiring for Web Developers, UI/UX Designers, Digital Marketing Specialists, and 3D Visualization Artists at its Bangalore office.",
                },
              },
              {
                "@type": "Question",
                "name": "Is 99Visual a good place to work for freshers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. 99Visual offers continuous learning, mentorship, and real-world project experience, making it an excellent environment for freshers and early-career professionals to grow quickly.",
                },
              },
              {
                "@type": "Question",
                "name": "Does 99Visual offer remote or hybrid work options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Work arrangements vary by role. Please visit the Contact page at https://www.99visual.com/contact or apply directly to inquire about remote or hybrid options for a specific position.",
                },
              },
              {
                "@type": "Question",
                "name": "How do I apply for a job at 99Visual?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "You can apply by visiting https://www.99visual.com/contact and submitting your details along with your resume. The hiring team will reach out regarding suitable openings.",
                },
              },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Build Your Future with <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-lg text-gray-300">
            We're not just hiring—we're building a team of innovators, creators, and problem-solvers shaping the future of digital experiences.
          </p>

          <Link
            href="#careers"
            className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Explore Opportunities
          </Link>
        </div>

        {/* Arrow Swing Scroll Indicator */}
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

      {/* CAREER AREAS */}
      <section id="careers" className="py-20 px-6 bg-white dark:bg-black">
        <h2 className="text-3xl md:text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Career Opportunities
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card icon={<FaLaptopCode />} color="text-indigo-500" title="Development" desc="Build scalable web apps and platforms powering global businesses." />
          <Card icon={<FaUsers />} color="text-green-500" title="Design & UX" desc="Create intuitive, human-centered designs that elevate user experiences." />
          <Card icon={<FaLightbulb />} color="text-yellow-400" title="Innovation" desc="Work on AI, 3D visualization, GIS, and next-gen technologies." />
          <Card icon={<FaRocket />} color="text-red-500" title="Digital Marketing" desc="Drive growth with SEO, paid campaigns, and creative strategies." />
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
        <h2 className="text-3xl md:text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Why Work With Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <InfoCard title="Growth & Learning" desc="Continuous learning, mentorship, and real-world experience to accelerate your career." />
          <InfoCard title="Collaborative Culture" desc="A supportive, creative, and diverse team environment that values your ideas." />
          <InfoCard title="Impactful Projects" desc="Work on meaningful projects that create real business impact globally." />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join a team that thrives on innovation, creativity, and delivering excellence.
          </p>

          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Join Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ========================= */
/* CARD */
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
/* INFO CARD */
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