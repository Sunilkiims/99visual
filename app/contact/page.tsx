// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from '../components/contactform';
import ContactUsBanner from '../components/contactus-banner';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing - Bangalore India",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",

  keywords: [
    // Primary
    "Contact 99 Visual",
    "Contact 99 Visual Solutions",
    // Quote & Consultation
    "Get Free Quote Web Development India",
    "Free Consultation Digital Marketing",
    "Request Quote 3D Visualization",
    "Hire Web Developers India",
    "Website Development Enquiry India",
    // Service-Specific Contact
    "Contact Web Development Company India",
    "Contact Digital Marketing Agency India",
    "Contact SEO Company India",
    "3D Visualization Company Contact India",
    "IT Consulting Contact Bangalore",
    // Location
    "Web Development Company Bangalore Contact",
    "Digital Agency Bangalore Enquiry",
    "Bangalore IT Company Contact",
    // General
    "Business Enquiry Digital Services India",
    "Digital Agency Contact Page",
    "Start a Project 99Visual",
  ],

  openGraph: {
    title: "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing - Bangalore",

    description:
      "Have a project in mind? Contact 99Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",

    url: "https://www.99visual.com/contact",
    siteName: "99Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact 99Visual Solutions - Free Consultation for Web, 3D & Digital Services",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description:
      "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/contact-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/contact",
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

  authors: [{ name: "99 Visual Solutions", url: "https://www.99visual.com" }],

  category: "Technology",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact 99Visual Solutions",
            "description":
              "Get in touch with 99Visual Solutions for web development, 3D visualization, SEO, and digital marketing services. Free consultation available.",
            "url": "https://www.99visual.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "99 Visual Solutions",
              "url": "https://www.99visual.com",
              "logo": "https://www.99visual.com/images/logo.png",
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
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Sales",
                  "url": "https://www.99visual.com/contact",
                  "areaServed": "Worldwide",
                  "availableLanguage": "English",
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Customer Support",
                  "url": "https://www.99visual.com/contact",
                  "areaServed": "Worldwide",
                  "availableLanguage": "English",
                },
              ],
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Free Consultation",
                  "description": "Free consultation for web development, 3D visualization, SEO, and digital marketing services.",
                  "price": "0",
                  "priceCurrency": "INR",
                  "url": "https://www.99visual.com/contact",
                },
              ],
            },
          }),
        }}
      />

      {/* Hero Banner */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Contact <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We believe collaboration drives innovation. We partner with forward-thinking organizations to create impactful, future-ready solutions.
          </p>
        </div>

        {/* Arrow Swing Scroll Indicator */}
        <a
          href="#contact-form"
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

      {/* Contact Form */}
      <section id="contact-form">
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}