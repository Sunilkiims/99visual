import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import DigitalMarketingBanner from "@/app/components/digitalmarkettingbanner";
import { FaBullhorn, FaSearch, FaChartLine, FaMobileAlt, FaUsers, FaGlobe, FaEnvelopeOpenText, FaHandshake } from "react-icons/fa";
import Footer from "@/app/components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Services | Grow Traffic, Leads & ROI - 99 Visual",
  
  description:
    "Accelerate your business growth with 99 Visual’s digital marketing and SEO services including search engine optimization, PPC advertising, social media marketing, content strategy, and performance-driven campaigns.",
  
  keywords: [
    "Digital Marketing Services",
    "SEO Services Company",
    "Search Engine Optimization Services",
    "PPC Advertising Services",
    "Google Ads Management",
    "Social Media Marketing Services",
    "Content Marketing Strategy",
    "Email Marketing Services",
    "Online Branding Services",
    "Lead Generation Services",
    "Digital Marketing Company India",
    "SEO Agency India",
    "99Visual Marketing Solutions"
  ],

  openGraph: {
    title: "Digital Marketing & SEO Services - 99 Visual",
    
    description:
      "Drive traffic, generate leads, and grow your business with expert SEO, PPC, social media, and content marketing strategies.",
    
    url: "https://www.99visual.com/services/digital-marketing-seo",
    
    siteName: "99Visual",
    
    images: [
      {
        url: "https://www.99visual.com/images/services/digital-marketing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Marketing & SEO Services by 99 Visual",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    
    title: "Digital Marketing & SEO Services | 99Visual",
    
    description:
      "Performance-driven digital marketing services including SEO, PPC, social media, and lead generation.",
    
    site: "@99visual",
    creator: "@99visual",
    
    images: [
      "https://www.99visual.com/images/services/digital-marketing-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/services/digital-marketing-seo",
  },
};

export default function DigitalMarketing() {
  const benefits = [
    {
      icon: <FaSearch className="text-blue-600 text-3xl" />,
      title: "Search Engine Visibility",
      description:
        "We optimize websites with proven SEO strategies to boost rankings, traffic, and conversions.",
    },
    {
      icon: <FaBullhorn className="text-green-600 text-3xl" />,
      title: "Brand Awareness",
      description:
        "Our campaigns build strong online visibility, ensuring your brand connects with the right audience.",
    },
    {
      icon: <FaChartLine className="text-purple-600 text-3xl" />,
      title: "Data-Driven Growth",
      description:
        "We analyze performance metrics to refine strategies, maximizing ROI and measurable outcomes.",
    },
    {
      icon: <FaMobileAlt className="text-orange-500 text-3xl" />,
      title: "Cross-Platform Reach",
      description:
        "From social media to mobile-first campaigns, we ensure your brand reaches users everywhere.",
    },
    {
      icon: <FaEnvelopeOpenText className="text-pink-600 text-3xl" />,
      title: "Engaging Campaigns",
      description:
        "We craft content, email, and ad campaigns that inspire action and build customer loyalty.",
    },
    {
      icon: <FaHandshake className="text-yellow-600 text-3xl" />,
      title: "End-to-End Support",
      description:
        "From strategy to execution, we provide continuous optimization and marketing support.",
    },
  ];

  return (
    <>
      <Header />
{/* Hero Banner */}
<section className="relative py-24 text-center overflow-hidden bg-black text-white">

  {/* Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

  <div className="relative z-10 max-w-3xl mx-auto px-4">

    <h1 className="text-2xl md:text-4xl font-bold mb-6">
      Digital Marketing & <span className="text-orange-500">SEO</span>
    </h1>

    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      We’re more than a workplace—we’re a community of creators, tech enthusiasts, and problem-solvers. 
      If you’re passionate about building impactful digital experiences, 99 Visual Solutions is the place for you.
    </p>

    <a
      href="#services"
      className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
    >
      Explore Our Services
    </a>

  </div>

  {/* 🔽 Arrow Swing Scroll Indicator */}
  <a
    href="#services"
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

      {/* Intro Section */}
      <div id="services" className="bg-gray-50 py-8 px-2 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
            Digital Marketing & SEO That Drive Results, Not Just Clicks
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">99 Visual Solutions</span>, we blend creativity and analytics to craft <span className="font-semibold">digital marketing strategies</span> that not only attract audiences but also convert them into loyal customers. Our holistic approach ensures your brand achieves <span className="font-semibold">maximum online visibility and sustainable growth</span>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            From <span className="font-semibold">SEO and content marketing</span> to <span className="font-semibold">social media campaigns and paid advertising</span>, our services are tailored to match your goals and keep you ahead in the competitive digital landscape.
          </p>
        </div>
      </div>

     {/* SEO Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Search Engine Optimization (SEO)
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        In a competitive digital landscape, visibility is everything. Our SEO services are designed to position your business at the top of search engine results, driving high-quality organic traffic and long-term growth.
      We combine strategic keyword research, technical optimization, and content excellence to ensure your website not only ranks higher but also delivers real value to your audience. With a data-driven and continuously evolving approach, we help you stay ahead of algorithm changes and outperform your competitors.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Keyword research & on-page optimization</li>
        <li>✔ Technical SEO audits & fixes</li>
        <li>✔ High-quality backlink strategies</li>
      </ul>
    </div>

    <Image
      src="/images/seo.png"
      alt="Search Engine Optimization"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto"
    />

  </div>
</div>

      {/*Meta Ads Social Media Marketing Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/social-media.png"
      alt="Social media marketing illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Meta Ads & Social Media Marketing
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
       Amplify your brand’s reach and engagement with strategic Meta Ads and social media marketing. We create data-driven campaigns across platforms like Facebook and Instagram that not only capture attention but also convert audiences into loyal customers.
      By combining compelling creatives, precise audience targeting, and continuous optimization, we ensure your brand stands out in crowded digital spaces. Our approach focuses on maximizing ROI, increasing brand awareness, and driving measurable business growth.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Facebook, Instagram, LinkedIn, & Twitter marketing</li>
        <li>✔ Paid social ad campaigns</li>
        <li>✔ Analytics & engagement tracking</li>
      </ul>
    </div>

  </div>
</div>

      {/* PPC Advertising Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Pay-Per-Click (PPC) Advertising
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Drive instant visibility and measurable results with strategic Pay-Per-Click (PPC) advertising. We create and manage high-performing ad campaigns that place your business in front of the right audience at the right time.
      By combining smart keyword targeting, compelling ad creatives, and continuous optimization, we ensure maximum return on your ad spend. Our data-driven approach focuses on increasing clicks, improving conversions, and scaling your growth efficiently across search engines and digital platforms.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Keyword research, bid management & campaign strategy</li>
        <li>✔ Social media ad management</li>
        <li>✔ Continuous monitoring, A/B testing & ROI optimization</li>
      </ul>
    </div>

    <Image
      src="/images/ppc.png"
      alt="PPC advertising illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>
      {/* Content & Email Marketing Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/email-marketing.png"
      alt="Email marketing illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Content & Email Marketing
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Build meaningful connections with your audience through strategic content and personalized email marketing. We create compelling, value-driven content that attracts, engages, and nurtures your audience at every stage of their journey.
      From blog posts and website content to targeted email campaigns, our approach focuses on delivering the right message to the right audience at the right time. By combining creativity with data-driven insights, we help you strengthen brand loyalty, increase engagement, and drive consistent conversions.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Content strategy, creation & storytelling that resonates</li>
        <li>✔ Email campaign design, automation & audience segmentation</li>
        <li>✔ Performance tracking, personalization & conversion optimization</li>
      </ul>
    </div>

  </div>
</div>
            {/* Local SEO Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Local SEO
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Make your business stand out in your local market and attract customers right when they need you. Our Local SEO services are designed to boost your visibility in location-based searches, helping you connect with nearby audiences and drive foot traffic or local inquiries.
      From optimizing your business listings to managing reviews and local keywords, we ensure your brand ranks higher in local search results and maps—building trust and credibility within your community.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Google Business Profile optimization & local listings management</li>
        <li>✔ Location-based keyword targeting & on-page optimization</li>
        <li>✔ Review management, citations & local ranking improvements</li>
      </ul>
    </div>

    <Image
      src="/images/local-seo.png"
      alt="Local SEO"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>
      {/* Technical SEO Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/technival-seo.png"
      alt="Technival Seo"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Technical SEO
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        A strong SEO strategy starts with a solid technical foundation. Our Technical SEO services focus on optimizing your website’s structure, performance, and crawlability to ensure search engines can efficiently access, understand, and rank your content.
      From fixing indexing issues to improving site speed and implementing structured data, we enhance every technical aspect that impacts your visibility. The result is a faster, more accessible, and search-engine-friendly website that performs consistently across all platforms.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Website audit, crawlability & indexing optimization</li>
        <li>✔ Core Web Vitals, speed & mobile performance enhancement</li>
        <li>✔ Structured data, schema markup & technical issue resolution</li>
      </ul>
    </div>

  </div>
</div>
      {/* On-Page Optimization Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        On-Page Optimization
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Maximize your website’s visibility and relevance with strategic on-page optimization. We fine-tune every element of your web pages—from content and keywords to meta tags and internal linking—to ensure they align perfectly with search engine algorithms and user intent.
        Our approach enhances both discoverability and user experience, helping your pages rank higher, engage visitors effectively, and drive meaningful conversions.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Keyword optimization, meta tags & content structuring</li>
        <li>✔ Internal linking, URL optimization & image SEO</li>
        <li>✔ User experience enhancements & search intent alignment</li>
      </ul>
    </div>

    <Image
      src="/images/onpage-optimization.png"
      alt="On-Page Optimization"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Off-Page SEO & Link Building Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/off-page-link-building.png"
      alt="Off-Page SEO & Link Building"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Off-Page SEO & Link Building
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Strengthen your website’s authority and credibility with powerful off-page SEO and strategic link building. We focus on building high-quality, relevant backlinks from trusted sources to improve your search engine rankings and online reputation.
      Through ethical (white-hat) practices and outreach strategies, we enhance your domain authority, increase brand visibility, and drive referral traffic. Our approach ensures sustainable growth while positioning your business as a trusted leader in your industry.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ High-quality backlink acquisition & outreach campaigns</li>
        <li>✔ Guest posting, citations & brand mentions</li>
        <li>✔ Authority building, referral traffic & ranking improvement</li>
      </ul>
    </div>

  </div>
</div>
          {/* Content Marketing Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Content Marketing
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Turn your brand into a trusted voice with strategic, value-driven content marketing. We create and distribute high-quality content that educates, engages, and inspires your audience across every stage of their journey.
      From blogs and articles to visuals and thought leadership pieces, our approach focuses on building authority, improving search visibility, and nurturing long-term relationships. By aligning content with your business goals and audience intent, we help you drive consistent traffic, engagement, and conversions.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Content strategy, planning & audience targeting</li>
        <li>✔ Blog writing, articles & SEO-driven content creation</li>
        <li>✔ Content distribution, engagement & performance optimization</li>
      </ul>
    </div>

    <Image
      src="/images/content-marketing.png"
      alt="Content Marketing"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Marketing Automation Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/marketing-automation.png"
      alt="Marketing Automatio"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Marketing Automation
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Streamline your marketing efforts and deliver personalized experiences at scale with powerful marketing automation solutions. We help you automate repetitive tasks, nurture leads effectively, and engage your audience with the right message at the right time.
      By integrating smart tools and data-driven workflows, we enhance efficiency, improve customer journeys, and maximize conversions—allowing your business to grow faster with less manual effort.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Automated workflows, lead nurturing & customer journeys</li>
        <li>✔ CRM integration, segmentation & personalized campaigns</li>
        <li>✔ Performance tracking, analytics & continuous optimization</li>
      </ul>
    </div>

  </div>
</div>
      {/* Creative Banner & Promotional Video Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Creative Banner & Promotional Video
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Capture attention and make a lasting impression with visually compelling banners and engaging promotional videos. We design high-impact creatives that not only look stunning but also communicate your brand message effectively.
      From eye-catching display ads to dynamic video content, our creative solutions are crafted to boost engagement, enhance brand recall, and drive conversions across digital platforms. By blending creativity with strategy, we ensure every visual tells a powerful story that resonates with your audience.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Custom banner designs for ads, websites & social media</li>
        <li>✔ Promotional videos, motion graphics & brand storytelling</li>
        <li>✔ Platform-optimized creatives for maximum engagement & ROI</li>
      </ul>
    </div>

    <Image
      src="/images/creative-banner.png"
      alt="Creative Banner & Promotional Video"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>
      {/* Mindtrick.io Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">
    
    <Image
      src="/images/mindtrick-marketing.png"
      alt="Mindtrick.io - specialist for marketing"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        MindTrick.io – Our Dedicated Digital Marketing Hub
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        At MindTrick.io, we bring together innovation, creativity, and data-driven strategies to power your digital growth. As our dedicated digital marketing hub, MindTrick.io is focused on delivering result-oriented solutions that help businesses build strong online visibility, generate quality leads, and achieve sustainable success.
      From performance marketing to brand storytelling, we combine cutting-edge tools with expert insights to craft campaigns that truly make an impact. It’s not just marketing—it’s a smarter, more strategic way to grow your business in the digital world.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ End-to-end digital marketing solutions under one platform</li>
        <li>✔ Data-driven campaigns focused on growth & ROI</li>
        <li>✔ Expert strategies, creative execution & continuous optimization</li>
      </ul>
    </div>

  </div>
</div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-500 font-semibold mb-2">Why Choose Us?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits of Partnering with 99 Visual Digital Marketing
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            With <span className="font-semibold">99 Visual Solutions</span>, digital marketing is more than just ads—it’s about creating meaningful connections that turn into long-term business growth. Here’s why brands trust us:
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}