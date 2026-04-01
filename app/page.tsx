import Image from "next/image";
import Link from "next/link";
import Header from './components/header';
import HomeScreenSlider from './components/homeslider';
import Marqueee from './components/marquee';
import Poweredbysection from './components/powerdbysection';
import HowWeWork from './components/howwework';
import WhyWeAre from './components/whyweare';
import Footer from './components/footer';
import Chatbot from './components/chatbot';

export const metadata = {
  title: ' 99 Visual Solutions | 3D Visualization, Web Development & IT Consulting Experts',
  
  description:
    'Discover 99 Visual Solutions – a leading digital agency specializing in 3D visualization, web development, SEO, and IT consulting. Learn about our mission, expertise, and innovative solutions.',

  keywords: [
    '99 Visual Solutions',
    '3D Visualization Services',
    'Web Development Company India',
    'Digital Marketing Agency',
    'SEO Services India',
    'IT Consulting Services',
    'CAD GIS LiDAR Services',
    'About 99 Visual'
  ],

  metadataBase: new URL('https://www.99visual.com'),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: '99 Visual Solutions | 3D Visualization, Web Development & IT Consulting Experts',
    description:
      'Discover 99 Visual Solutions – a leading digital agency specializing in 3D visualization, web development, SEO, and IT consulting. Learn about our mission, expertise, and innovative solutions.',
    url: 'https://www.99visual.com/',
    siteName: '99Visual Solutions',
    images: [
      {
        url: 'https://www.99visual.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: '99 Visual Solutions Team and Workspace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '99 Visual Solutions | 3D Visualization, Web Development & IT Consulting Experts',
    description:
      'Discover 99 Visual Solutions – a leading digital agency specializing in 3D visualization, web development, SEO, and IT consulting. Learn about our mission, expertise, and innovative solutions.',
    site: '@99visual',
    creator: '@99visual',
    images: ['https://www.99visual.com/images/about-og.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <HomeScreenSlider />
      <Marqueee />

      {/* 🔥 SEO Intro Section */}
      <section className="w-full pt-16 pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Driving Innovation with Smart Digital Solutions
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            At <span className="font-semibold text-black">99 Visual</span>, we believe technology should not just support businesses — it should drive growth, innovation, and long-term success. We are a full-service IT solutions and digital transformation company dedicated to helping startups, enterprises, and organizations build powerful digital ecosystems that perform, scale, and deliver real results.
          </p>

        </div>
      </section>

      {/* Services Section */}
      <Poweredbysection />

      <HowWeWork />
      <WhyWeAre />
      <Footer />

      {/* 🤖 Chatbot */}
      <Chatbot />
    </>
  );
}