import Image from "next/image";
import Link from "next/link";
import Header from './components/header';
import HomeScreenSlider from './components/homeslider';
import Marqueee from './components/marquee';
import Poweredbysection from './components/powerdbysection';
import HowWeWork from './components/howwework';
import WhyWeAre from './components/whyweare';
import Footer from './components/footer';


export const metadata = {
  title: 'Home - 99 Visual Solutions | Your Partner for Advanced 3D Visualization',
  description: 'Learn more about 99Visual’s team, values, and mission.',
  keywords: ['99Visual', 'About 99Visual', 'Web Development Company', 'Digital Agency'],
  openGraph: {
    title: 'About Us - 99Visual',
    description: 'Learn more about 99Visual’s team, values, and mission.',
    url: 'https://www.99visual.com/about',
    siteName: '99Visual',
    images: [
      {
        url: 'https://www.99visual.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: '99Visual Team Photo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - 99Visual',
    description: 'Meet the team and story behind 99Visual.',
    site: '@99visual',
    creator: '@99visual',
    images: ['https://www.99visual.com/images/about-og.jpg'],
  },
  metadataBase: new URL('https://www.99visual.com'),
  alternates: {
    canonical: '/about',
  },
}

export default function Home() {
  return (
    <><Header />
    <HomeScreenSlider />
    <Marqueee />
    
    <Poweredbysection />
    <HowWeWork />
    <WhyWeAre />
    <Footer />
    </>
  );
}
