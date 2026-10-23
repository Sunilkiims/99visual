import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  // `absolute` — already contains the brand; prevents a duplicated suffix.
  title: { absolute: "Privacy Policy | 99 Visual Solutions Data Protection & Security" },

  description:
    "How 99 Visual Solutions collects, uses and protects your personal data, and the choices you have. Read our privacy policy.",

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

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Effective date: 23 October 2026
          </p>

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

          <WhatsAppSection />

          <PolicySection
            title="9. Changes to This Policy"
            desc="We may update this privacy policy periodically. Any changes will be reflected on this page with an updated effective date."
          />

          <PolicySection
            title="10. Contact Us"
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
/* 💬 WHATSAPP COMMUNICATIONS */
/* ========================= */

function WhatsAppSection() {
  const sub = "font-semibold text-gray-900 dark:text-white";
  return (
    <div id="whatsapp">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
        8. WhatsApp Communications
      </h2>
      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <p>
          <span className={sub}>What we send.</span> With your permission, 99 Visual Solutions may send you WhatsApp
          messages about our services, such as website development, 3D visualization, SEO, digital marketing and IT
          consulting, along with offers, updates and replies to your enquiries.
        </p>
        <p>
          <span className={sub}>Your consent.</span> We only send marketing messages on WhatsApp to people who have
          agreed to receive them. For example, you may have ticked a box on our enquiry form, signed up at an event,
          or asked us directly. We keep a record of when and how you gave consent. We do not message numbers taken
          from public directories, purchased lists or other sources where you have not agreed to hear from us.
        </p>
        <p>
          <span className={sub}>Information we use.</span> To send these messages we use your name, WhatsApp phone
          number and, where you have given it, your company name, so that messages can be addressed to you. We also
          keep a record of the messages we send, whether they were delivered or read (as reported by WhatsApp), and
          any replies you send us.
        </p>
        <p>
          <span className={sub}>How messages are delivered.</span> Our messages are sent through the WhatsApp Business
          Platform, operated by Meta Platforms, Inc. To deliver them, your phone number and the message content are
          processed by Meta. Meta&apos;s handling of this information is described in{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 dark:text-orange-400 underline"
          >
            WhatsApp&apos;s privacy policy
          </a>
          . We do not sell your information to anyone.
        </p>
        <div>
          <p>
            <span className={sub}>How to stop receiving messages.</span> You can stop our marketing messages at any
            time:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              reply <strong>STOP</strong> to any of our WhatsApp messages;
            </li>
            <li>
              tap <strong>Stop promotions</strong> where that button appears; or
            </li>
            <li>
              email{" "}
              <a href="mailto:info@99visual.com" className="text-orange-600 dark:text-orange-400 underline">
                info@99visual.com
              </a>{" "}
              or use our{" "}
              <a href="/contact" className="text-orange-600 dark:text-orange-400 underline">
                contact page
              </a>
              .
            </li>
          </ul>
          <p className="mt-2">
            We act on your request promptly, and you will not receive further marketing messages from us on WhatsApp.
            We may still reply if you write to us about an enquiry or ongoing project.
          </p>
        </div>
        <p>
          <span className={sub}>How long we keep your information.</span> We keep your contact details and consent
          record for as long as you are happy to hear from us. If you opt out, we keep your phone number on a
          &ldquo;do not contact&rdquo; list so that we can make sure you are not messaged again; we use it for no
          other purpose. You can ask us to delete your other details at any time.
        </p>
        <p>
          <span className={sub}>Your rights.</span> You can ask to see the information we hold about you, correct it,
          or have it deleted, by emailing{" "}
          <a href="mailto:info@99visual.com" className="text-orange-600 dark:text-orange-400 underline">
            info@99visual.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

/* ========================= */
/* 📄 POLICY SECTION */
/* ========================= */

function PolicySection({ title, desc }: { title: string; desc: string }) {
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