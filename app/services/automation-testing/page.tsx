import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaBug, FaCogs, FaChartLine, FaRocket, FaShieldAlt, FaTools } from "react-icons/fa";
import TestingBanner from "@/app/components/testingdevelopmentbanner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Testing & QA Services | Software Testing, Performance & CI/CD QA - 99Visual",
  
  description:
    "Deliver high-quality software with 99Visual’s automation testing and QA services including manual testing, test automation, performance testing, API testing, and CI/CD integration for reliable and scalable applications.",
  
  keywords: [
    "Automation Testing Services",
    "QA Testing Services",
    "Software Testing Company India",
    "Manual Testing Services",
    "Automated QA Testing",
    "Performance Testing Services",
    "API Testing Services",
    "Web Application Testing",
    "Mobile App Testing Services",
    "Selenium Automation Testing",
    "CI CD Testing Integration",
    "Quality Assurance Services",
    "Software Testing Company",
    "99Visual QA Services"
  ],

  openGraph: {
    title: "Automation Testing & QA Services - 99Visual",
    
    description:
      "End-to-end QA and testing services including automation, performance, API, and CI/CD testing to ensure reliable software delivery.",
    
    url: "https://www.99visual.com/services/testing-development",
    
    siteName: "99Visual",
    
    images: [
      {
        url: "https://www.99visual.com/images/services/testing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Automation Testing & QA Services by 99Visual",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    
    title: "Automation Testing & QA Services | 99Visual",
    
    description:
      "Comprehensive QA services including automation, manual testing, performance testing, and CI/CD integration.",
    
    site: "@99visual",
    creator: "@99visual",
    
    images: [
      "https://www.99visual.com/images/services/testing-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/services/testing-development",
  },
};

export default function TestingDevelopment() {
  const benefits = [
    {
      icon: <FaBug className="text-red-600 text-3xl" />,
      title: "Bug-Free Software",
      description:
        "Our thorough testing process detects and resolves issues early, ensuring a stable and reliable product at launch.",
    },
    {
      icon: <FaCogs className="text-blue-600 text-3xl" />,
      title: "Automated Efficiency",
      description:
        "With automation frameworks, we streamline testing cycles, saving time and delivering faster releases.",
    },
    {
      icon: <FaChartLine className="text-green-600 text-3xl" />,
      title: "Performance Optimization",
      description:
        "We test system performance under real-world conditions to ensure scalability, speed, and responsiveness.",
    },
    {
      icon: <FaShieldAlt className="text-purple-600 text-3xl" />,
      title: "Security Assurance",
      description:
        "Through rigorous testing, we identify vulnerabilities and safeguard your applications against threats.",
    },
    {
      icon: <FaRocket className="text-orange-500 text-3xl" />,
      title: "Faster Time-to-Market",
      description:
        "Streamlined testing processes reduce delays, helping you launch your software quicker without sacrificing quality.",
    },
    {
      icon: <FaTools className="text-pink-600 text-3xl" />,
      title: "Continuous Support",
      description:
        "Even after release, we provide ongoing QA and testing support to maintain peak system performance.",
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
      Automation & <span className="text-orange-500">Testing</span>
    </h1>

    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Not Just Testing Software = Engineering Confidence, 
      We act as a quality intelligence layer embedded into your business, your release cycles, and your growth roadmap.
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Reliable Automation & Testing for Software That Never Breaks Trust
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">99 Visual Solutions</span>, we embed quality into every stage of development. Our automation and testing services integrate seamlessly with modern delivery pipelines, balancing precision-driven manual testing with robust automation to ensure stability, performance, and security at scale.

We help engineering teams minimize release risk, optimize test coverage, and maintain confidence even as complexity grows across platforms. <span className="font-semibold">bug-free, scalable, and secure</span>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            With a mix of cutting-edge tools and proven methodologies, we help businesses achieve <span className="font-semibold">faster release cycles, reduced risks, and consistent user satisfaction</span> across platforms.
          </p>
        </div>
      </div>

     {/* Manual Testing Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Human-Centric Manual Testing
      </h2>
      <p className="text-gray-700 leading-normal mb-6">
        Deliver flawless user experiences with our human-centric manual testing approach. We go beyond automated checks by simulating real user behavior to identify usability issues, functional gaps, and edge-case scenarios that machines often miss.
      Our testers combine domain expertise with attention to detail to ensure your application performs seamlessly across all user journeys. By focusing on quality, reliability, and user satisfaction, we help you launch products that are truly polished and error-free.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Real-user scenario testing & usability validation</li>
        <li>✔ Functional, regression & exploratory testing</li>
        <li>✔ Detailed bug reporting & quality assurance insights</li>
      </ul>
    </div>

    <Image
      src="/images/manual-testing.png"
      alt="Manual Testing illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Automated Testing Section */}
<div className="bg-gray-50 py-10 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-8 items-center">
    
    <Image
      src="/images/automated-testing.png"
      alt="Automated Testing illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2"> 
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Intelligent Automation Engineering
      </h2>
      <p className="text-gray-700 leading-normal mb-5">
        Accelerate efficiency and innovation with intelligent automation engineered for modern businesses. We design and implement smart automation solutions that streamline complex processes, reduce manual effort, and enhance operational accuracy.
      By combining AI-driven technologies, robust frameworks, and scalable architectures, we enable faster workflows, improved productivity, and consistent performance. Our approach empowers your organization to focus on strategic growth while automation handles repetitive and time-consuming tasks with precision.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Process automation, workflow optimization & RPA solutions</li>
        <li>✔ AI-driven decision-making & intelligent system integration</li>
        <li>✔ Scalable, secure & performance-focused automation architecture</li>
      </ul>
    </div>

  </div>
</div>

     {/* Performance Testing Section */}
<div className="bg-white py-10 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-8 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Performance & Load Testing
      </h2>
      <p className="text-gray-700 leading-normal mb-5">
        We simulate real-world usage to evaluate{" "}
        Ensure your applications perform flawlessly under pressure with comprehensive performance and load testing. We evaluate how your system behaves under varying user loads, identify bottlenecks, and optimize performance to deliver a fast, stable, and reliable user experience.
      By simulating real-world traffic scenarios, we help you prepare for peak demand, minimize downtime, and maintain consistent performance across all environments.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Load, stress & scalability testing for real-world scenarios</li>
        <li>✔ Bottleneck identification & performance optimization</li>
        <li>✔ Detailed reporting with actionable insights & recommendations</li>
      </ul>
    </div>

    <Image
      src="/images/performance-testing.png"
      alt="Performance Testing illustration"
      width={500}
      height={400}
      className="rounded-2xl shadow-md w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Continuous QA Section */}
<div className="bg-gray-50 py-10 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-8 items-center">
    
    <Image
      src="/images/continuous-qa.png"
      alt="Continuous QA support"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Continuous QA & Support
      </h2>
      <p className="text-gray-700 leading-normal mb-5">
        Maintain consistent quality and reliability with our continuous QA and support services. We integrate testing seamlessly into your development lifecycle, ensuring issues are identified and resolved early and efficiently.
      Through proactive monitoring, regular testing cycles, and ongoing support, we help you deliver stable, high-performing applications that evolve with your business needs. Our approach minimizes risks, reduces downtime, and ensures your product consistently meets user expectations.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Continuous testing integration within CI/CD pipelines</li>
        <li>✔ Proactive issue detection, monitoring & quick resolution</li>
        <li>✔ Ongoing support, maintenance & quality improvements</li>
      </ul>
    </div>

  </div>
</div>

            {/* Performance & Scale Readiness Section */}
<div className="bg-white py-10 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-8 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Performance & Scale Readiness
      </h2>
      <p className="text-gray-700 leading-normal mb-5">
        Prepare your applications to perform flawlessly and scale effortlessly as your business grows. We ensure your systems are optimized to handle increasing user demands, high traffic spikes, and expanding data loads without compromising speed or stability.
      By combining performance engineering with scalable architecture design, we help you build resilient systems that are ready for both current needs and future growth. Our approach minimizes risks, enhances reliability, and ensures your platform is always ready to scale with confidence.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Load & stress testing</li>
        <li>✔ Scalability validation</li>
        <li>✔ Resource usage optimization</li>
      </ul>
    </div>

    <Image
      src="/images/performance-scale.png"
      alt="Performance & Scale Readiness"
      width={500}
      height={400}
      className="rounded-2xl shadow-md w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Security-Aware Testing Section */}
<div className="bg-gray-50 py-10 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-8 items-center">
    
    <Image
      src="/images/security-aware-testing.png"
      alt="Security-Aware Testing"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Security-Aware Testing
      </h2>
      <p className="text-gray-700 leading-normal mb-5">
        Protect your applications from vulnerabilities by embedding security into every stage of testing. Our security-aware testing approach focuses on identifying potential threats, weaknesses, and risks before they can be exploited.
      By combining functional testing with security best practices, we ensure your applications are not only reliable but also resilient against cyber attacks. Our goal is to deliver secure, compliant, and trustworthy digital products that safeguard both your business and your users.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Vulnerability assessment & secure code validation</li>
        <li>✔ Authentication, authorization & data protection testing</li>
        <li>✔ Risk analysis, compliance checks & threat mitigation</li>
      </ul>
    </div>

  </div>
</div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-500 font-semibold mb-2">Why Choose Us?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Benefits of Testing with 99 Visual
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            Partnering with <span className="font-semibold">99 Visual Solutions</span> ensures that your digital products are reliable, secure, and future-ready. Here’s what sets our Testing & Development services apart:
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
