import Header from './components/header';
import HomeScreenSlider from './components/homeslider';
import Marqueee from './components/marquee';
import Poweredbysection from './components/powerdbysection';
import HowWeWork from './components/howwework';
import WhyWeAre from './components/whyweare';
import WeServe from './components/weserve';
import Footer from './components/footer';
import ScrollDown from './components/scrolldown';
import Chatbot from './components/chatbot';

// ─── Structured Data ──────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "99 Visual Solutions",
  "url": "https://www.99visual.com",
  "logo": "https://www.99visual.com/images/logo.png",
  "sameAs": [
    "https://x.com/99VisualSoluti1",
    "https://www.linkedin.com/company/99-visual-solutions/",
    "https://www.facebook.com/profile.php?id=100093639888151"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "availableLanguage": "English",
    "areaServed": ["IN", "US", "GB", "AU", "AE"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "description": "99 Visual Solutions is a full-service IT and digital transformation company specialising in 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO, and IT consulting — serving startups and enterprises globally."
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: '3D Visualisation, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',

  description:
    '99 Visual Solutions is a global IT and digital transformation company. We deliver 3D visualisation, custom web & app development, CAD drafting, GIS & LiDAR mapping, SEO, and IT consulting to businesses worldwide — including India, USA, UK, UAE & Australia.',

  keywords: [
    '99 Visual Solutions',
    '3D Visualisation Company India',
    'Architectural 3D Rendering Services',
    'Custom Web Development Company India',
    'Mobile App Development India',
    'CAD Drafting Services Online',
    'GIS Mapping Services India',
    'LiDAR Data Processing Company',
    'SEO Services for Global Businesses',
    'IT Consulting Company India',
    'Digital Transformation Services India',
    'Affordable Web Development India',
    'BIM Modelling Services',
    'Real Estate 3D Visualisation',
    'Offshore IT Services India',
  ],

  metadataBase: new URL('https://www.99visual.com'),

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: '3D Visualisation, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',
    description:
      'Partner with 99 Visual Solutions for world-class 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting. Trusted by businesses across India, USA, UK, UAE & Australia.',
    url: 'https://www.99visual.com/',
    siteName: '99 Visual Solutions',
    images: [
      {
        url: 'https://www.99visual.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: '99 Visual Solutions — Global IT & Digital Transformation Company',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '3D Visualisation, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',
    description:
      'Partner with 99 Visual Solutions for world-class 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting. Trusted globally.',
    site: '@99VisualSoluti1',
    creator: '@99VisualSoluti1',
    images: ['https://www.99visual.com/images/about-og.jpg'],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Header />
      <HomeScreenSlider />
      <Marqueee />

      {/* SEO Intro Section */}
      <section className="w-full pt-16 pb-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">

          {/* ✅ Updated H1 */}
         <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4 
bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 
bg-clip-text text-transparent">
  We Don&apos;t Just Build Technology. We Build What&apos;s Next.
</h1>

          <h2 className="text-lg md:text-xl font-medium text-gray-500 mb-5">
            Trusted by Startups &amp; Enterprises Across India, USA, UK, UAE &amp; Australia
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-4">
            We believe
            technology should not just support businesses — it should drive growth, innovation, and
            long-term success. We are a full-service IT solutions and digital transformation company
            specialising in{' '}
            <span className="font-medium text-black">
              3D architectural visualisation, custom web &amp; mobile app development, CAD drafting,
              GIS mapping, LiDAR data processing, search engine optimisation (SEO), and IT consulting
            </span>
            . From startups to large enterprises, we help organisations worldwide build powerful
            digital ecosystems that perform, scale, and deliver measurable results.
          </p>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-6">
            Headquartered in India and serving clients globally, our cross-functional team of
            engineers, designers, and strategists brings deep domain expertise to every project —
            ensuring faster delivery, competitive pricing, and uncompromising quality.
          </p>

        </div>
      </section>

      {/* Services Section */}
      <Poweredbysection />

      <HowWeWork />
      <WhyWeAre />
      <WeServe />
      <Footer />
      <ScrollDown />

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}