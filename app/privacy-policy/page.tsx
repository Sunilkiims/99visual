import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | 99 Visual Solutions Data Protection & Security",

  description:
    "Learn how 99Visual collects, uses, and protects your personal data. Our privacy policy ensures transparency, security, and compliance with global data standards.",

  keywords: [
    "99Visual Privacy Policy",
    "Data Protection India",
    "Website Privacy Policy",
    "User Data Security",
    "IT Company Privacy Policy",
    "Digital Agency Privacy Policy",
    "Personal Data Protection",
    "GDPR Compliance India",
    "User Information Policy",
    "Privacy Terms 99Visual",
    "Website Data Collection Policy"
  ],

  openGraph: {
    title: "Privacy Policy | 99 Visual Solutions",

    description:
      "Understand how 99Visual safeguards your data and ensures privacy across all digital services.",

    url: "https://www.99visual.com/privacy-policy",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/privacy-policy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy 99 Visual",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Privacy Policy | 99 Visual",

    description:
      "Your data matters. Learn how 99Visual protects and manages your information responsibly.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/privacy-policy-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>

          <p className="text-lg text-gray-300">
            Your privacy is important to us. This policy explains how we collect, use, and safeguard your information.
          </p>
        </div>
      </section>

      {/* 📄 CONTENT */}
      <section className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto space-y-10 text-gray-700 dark:text-gray-300">

          <PolicySection
            title="1. Information We Collect"
            desc="We collect personal information such as your name, email address, phone number, and business details when you interact with our services, contact forms, or inquiries."
          />

          <PolicySection
            title="2. How We Use Your Information"
            desc="Your information is used to provide and improve our services, respond to inquiries, process requests, and deliver a better user experience."
          />

          <PolicySection
            title="3. Data Protection & Security"
            desc="We implement industry-standard security measures to protect your data from unauthorized access, misuse, or disclosure."
          />

          <PolicySection
            title="4. Cookies & Tracking Technologies"
            desc="We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and improve our services."
          />

          <PolicySection
            title="5. Third-Party Services"
            desc="We may use third-party tools and services (such as analytics and marketing platforms) that may collect, monitor, and analyze user data."
          />

          <PolicySection
            title="6. Data Sharing"
            desc="We do not sell your personal information. Data may be shared only when necessary to deliver services or comply with legal obligations."
          />

          <PolicySection
            title="7. Your Rights"
            desc="You have the right to access, update, or request deletion of your personal data. You can contact us at any time regarding your data."
          />

          <PolicySection
            title="8. Changes to This Policy"
            desc="We may update this privacy policy periodically. Any changes will be reflected on this page with an updated effective date."
          />

          <PolicySection
            title="9. Contact Us"
            desc="If you have any questions about this Privacy Policy, please contact us through our official contact page."
          />

        </div>
      </section>

      {/* 🔒 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Trust Matters to Us
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We are committed to maintaining transparency and protecting your data at every step.
          </p>

          <a
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Contact Us →
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ========================= */
/* 📄 POLICY SECTION */
/* ========================= */

function PolicySection({ title, desc }: any) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-sm md:text-base leading-relaxed">
        {desc}
      </p>
    </div>
  );
}