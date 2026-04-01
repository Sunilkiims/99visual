// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from '../components/contactform';
import ContactUsBanner from '../components/contactus-banner';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title:
    "Contact 99 Visual Solutions | Get in Touch for 3D, Web & Digital Services",

  description:
    "Contact 99 Visual for expert 3D visualization, web development, SEO, and digital marketing services. Reach out today for a free consultation and grow your business.",

  keywords: [
    "Contact 99Visual",
    "Contact Web Development Company",
    "Contact Digital Marketing Agency",
    "3D Visualization Company Contact",
    "SEO Company Contact India",
    "IT Consulting Contact",
    "Website Development Enquiry",
    "Digital Agency Contact Page",
    "Get Quote Web Development",
    "Hire Web Developers India",
    "Contact 99Visual Solutions",
    "Business Enquiry Digital Services",
    "Bangalore Web Development Contact",
    "Request Quote Digital Agency",
    "Free Consultation SEO Services"
  ],

  openGraph: {
    title:
      "Contact 99 Visual | Start Your Project Today",

    description:
      "Have a project in mind? Contact 99Visual for web development, 3D visualization, and digital marketing solutions tailored to your business needs.",

    url: "https://www.99visual.com/contact",

    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact 99 Visual Solutions",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Contact 99 Visual | Let’s Build Something Great",

    description:
      "Reach out to 99 Visual for expert digital solutions in 3D, web, and marketing. Let’s discuss your project today.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/contact-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/contact",
  },
};
export default function ContactPage() {
  return (       
    <>
      <Header />

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

        {/* 🔽 Arrow Swing Scroll Indicator */}
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

      {/* ✅ FIX: Added wrapper with ID */}
      <section id="contact-form">
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}