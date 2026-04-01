import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | 99 Visual Solutions Service Agreement",

  description:
    "Read the terms and conditions for using 99Visual services including web development, 3D visualization, SEO, and digital solutions. Understand your rights and obligations.",

  keywords: [
    "99Visual Terms and Conditions",
    "Service Agreement IT Company",
    "Website Terms Policy India",
    "Digital Agency Terms",
    "User Agreement Web Services",
    "Legal Terms 99Visual",
    "Client Agreement IT Services",
    "Website Usage Terms",
    "SEO Service Terms India",
    "Software Development Agreement"
  ],

  openGraph: {
    title: "Terms & Conditions | 99 Visual Solutions",

    description:
      "Understand the terms governing your use of 99Visual services and website.",

    url: "https://www.99visual.com/terms",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/terms-og.jpg",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions 99 Visual",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Terms & Conditions | 99 Visual",

    description:
      "Review the terms and conditions for using 99Visual services.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/terms-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      {/* 🔥 HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Terms & <span className="text-orange-500">Conditions</span>
          </h1>

          <p className="text-lg text-gray-300">
            Please read these terms carefully before using our services. By accessing 99Visual, you agree to comply with these terms.
          </p>
        </div>
      </section>

      {/* 📄 CONTENT */}
      <section className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto space-y-10 text-gray-700 dark:text-gray-300">

          <TermSection
            title="1. Acceptance of Terms"
            desc="By accessing or using our website and services, you agree to be bound by these Terms & Conditions and all applicable laws and regulations."
          />

          <TermSection
            title="2. Services Overview"
            desc="99Visual provides services including web development, 3D visualization, digital marketing, SEO, and IT consulting. All services are subject to project-specific agreements."
          />

          <TermSection
            title="3. User Responsibilities"
            desc="You agree to provide accurate information, use our services lawfully, and not engage in activities that may harm our systems or reputation."
          />

          <TermSection
            title="4. Intellectual Property"
            desc="All content, designs, code, and materials created by 99Visual remain our intellectual property unless otherwise agreed upon in writing."
          />

          <TermSection
            title="5. Payments & Billing"
            desc="All payments must be made as per agreed terms. Delays in payment may result in service suspension or additional charges."
          />

          <TermSection
            title="6. Project Delivery"
            desc="Delivery timelines depend on project scope and client cooperation. Delays caused by incomplete requirements or approvals are not our responsibility."
          />

          <TermSection
            title="7. Limitation of Liability"
            desc="99Visual shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services."
          />

          <TermSection
            title="8. Termination"
            desc="We reserve the right to suspend or terminate services if terms are violated or misuse is detected."
          />

          <TermSection
            title="9. Third-Party Tools"
            desc="Our services may include third-party tools or platforms. We are not responsible for their policies or performance."
          />

          <TermSection
            title="10. Changes to Terms"
            desc="We may update these Terms & Conditions at any time. Continued use of our services indicates acceptance of updated terms."
          />

          <TermSection
            title="11. Governing Law"
            desc="These terms are governed by applicable laws in India. Any disputes shall be subject to jurisdiction in our operational location."
          />

          <TermSection
            title="12. Contact Information"
            desc="For any questions regarding these terms, please contact us through our official contact page."
          />

        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="relative py-20 text-center bg-black text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Have Questions About Our Terms?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our team is here to clarify everything and ensure complete transparency.
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
/* 📄 TERM SECTION */
/* ========================= */

function TermSection({ title, desc }: any) {
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