import Image from "next/image";
import Link from "next/link";
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

export const metadata = {
  title: ' 3D Visualization, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',
  
  description:
    'Grow faster with 99 Visual Solutions—experts in 3D visualization, web & app development, CAD, GIS, LiDAR, automation, SEO, marketing and IT consulting.',

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
    title: '3D Visualization, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',
    description:
    'Grow faster with 99 Visual Solutions—experts in 3D visualization, web & app development, CAD, GIS, LiDAR, automation, SEO, marketing and IT consulting.',    
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
    title: '3D Visualization, Web & App Development, CAD, GIS, LiDAR, SEO & IT Consulting | 99 Visual Solutions',
    description:
      'Grow faster with 99 Visual Solutions—experts in 3D visualization, web & app development, CAD, GIS, LiDAR, automation, SEO, marketing and IT consulting.',
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
      <WeServe />
      <Footer />
      <ScrollDown />

      {/* 🤖 Chatbot */}
      <Chatbot />
    </>
  );
}