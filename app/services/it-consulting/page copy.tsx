import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import ItConsultingBanner from "@/app/components/itconsultingbanner";
import { FaCogs, FaShieldAlt, FaProjectDiagram, FaNetworkWired, FaUsers, FaTools, FaCloud, FaHandsHelping } from "react-icons/fa";
import Footer from "@/app/components/footer";
import ITConsultBanner from "@/app/components/itconsultingbanner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT Solutions - 99 Visual Solutions",

  description:
    "99 Visual Solutions provides end-to-end IT consulting services including IT infrastructure planning, cloud migration, cybersecurity & risk management, software consulting, IoT integration, system migration, and IT project management. Trusted by enterprises and growing businesses worldwide.",

  keywords: [
    // Core IT Consulting
    "IT Consulting Services",
    "IT Consulting Company",
    "Technology Consulting Services",
    "Enterprise IT Consulting",
    "Managed IT Services",
    "IT Support Services",
    "IT Advisory Services",

    // Infrastructure
    "IT Infrastructure Planning",
    "IT Infrastructure Management",
    "IT Infrastructure Optimization",
    "Network Infrastructure Services",
    "Server Management Services",
    "System Migration Services",
    "IT Installation Services",

    // Cloud
    "Cloud Migration Services",
    "Cloud Transformation Services",
    "AWS Migration Services",
    "Azure Cloud Services",
    "Google Cloud Migration",
    "Cloud Infrastructure Management",
    "Digital Transformation Services",

    // Cybersecurity
    "Cybersecurity Consulting Services",
    "Cybersecurity Risk Management",
    "Network Security Solutions",
    "Endpoint Security Services",
    "IT Compliance Services",
    "Threat Monitoring Services",

    // Software & Applications
    "Software Consulting Services",
    "Application Modernization Services",
    "IT Project Management Services",
    "Agile IT Project Delivery",

    // IoT
    "IoT Integration Services",
    "Smart Device Integration",
    "IoT Consulting Services",
    "Industrial IoT Solutions",

    // Audience & Brand
    "IT Solutions for Enterprises",
    "IT Solutions for Startups",
    "99 Visual Solutions",
    "99 Visual IT Consulting",
  ],

  openGraph: {
    title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT - 99 Visual Solutions",
    description:
      "From cloud migration and cybersecurity to IT infrastructure, software consulting, IoT integration, and project management — 99Visual Solutions delivers strategic IT consulting for enterprises and growing businesses worldwide.",
    url: "https://www.99visual.com/services/it-consulting",
    siteName: "99 Visual Solutions",
    images: [
      {
        url: "https://www.99visual.com/images/services/it-consulting-og.jpg",
        width: 1200,
        height: 630,
        alt: "IT Consulting Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "IT Consulting Services | Cloud, Cybersecurity, Infrastructure & IoT - 99 Visual Solutions",
    description:
      "Cloud migration, cybersecurity, IT infrastructure, IoT integration & software consulting — strategic IT solutions by 99Visual Solutions for businesses worldwide.",
    site: "@99 visual",
    creator: "@99 visual",
    images: [
      "https://www.99visual.com/images/services/it-consulting-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/services/it-consulting",
  },
};

export default function ITConsulting() {
  const benefits = [
    {
      icon: <FaCogs className="text-blue-600 text-3xl" />,
      title: "Tailored IT Strategies",
      description:
        "We align IT strategies with your business goals, ensuring technology drives growth, efficiency, and innovation.",
    },
    {
      icon: <FaShieldAlt className="text-green-600 text-3xl" />,
      title: "Robust Cybersecurity",
      description:
        "Protect your business from threats with proactive monitoring, security audits, and compliance-driven solutions.",
    },
    {
      icon: <FaNetworkWired className="text-purple-600 text-3xl" />,
      title: "Infrastructure Modernization",
      description:
        "Upgrade outdated systems with scalable, future-ready IT infrastructure designed for seamless performance.",
    },
    {
      icon: <FaCloud className="text-orange-500 text-3xl" />,
      title: "Cloud Enablement",
      description:
        "We help you migrate to the cloud securely and efficiently, optimizing costs and improving scalability.",
    },
    {
      icon: <FaProjectDiagram className="text-pink-600 text-3xl" />,
      title: "Expert IT Project Management",
      description:
        "From planning to execution, we ensure IT projects are delivered on time, within scope, and aligned with ROI goals.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-600 text-3xl" />,
      title: "Ongoing IT Support",
      description:
        "Our consultants provide continuous guidance, ensuring your IT ecosystem evolves with business needs.",
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
      IT <span className="text-orange-500">Consulting</span>
    </h1>

    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      We're more than a workplace—we're a community of creators, tech enthusiasts, and problem-solvers. 
      If you're passionate about building impactful digital experiences, 99 Visual Solutions is the place for you.
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
<div id="services" className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-4xl mx-auto">

    <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
      Strategic IT Consulting for Smarter, Secure & Scalable Businesses
    </h1>

    <p className="text-gray-700 leading-8 text-justify text-[17px] mb-4">
      At <span className="font-semibold">99 Visual Solutions</span>, we don't just solve IT challenges—we help you harness technology as a powerful growth driver. Our <span className="font-semibold">IT consulting services</span> deliver strategic guidance, robust security, and scalable infrastructure designed to prepare your business for the digital future.
    </p>

    <p className="text-gray-700 leading-8 text-justify text-[17px]">
      Whether you're modernizing legacy systems, migrating to the cloud, or strengthening cybersecurity, our experts partner with you to deliver <span className="font-semibold">sustainable, cost-effective, and future-ready IT solutions</span> tailored to your business goals.
    </p>

  </div>
</div>
{/* Installation & System Migration Services */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-1 md:order-1">
      <Image
        src="/images/Installation-services.png"
        alt="Installation & System Migration Services"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Installation & System Migration Services
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Adopting new technology or upgrading existing systems requires precision, expertise, and minimal disruption to your operations. We provide end-to-end installation and migration services, ensuring your new systems, applications, and peripherals are seamlessly integrated into your existing infrastructure. From initial setup to full deployment, every step is carefully planned and executed to maintain business continuity and performance.
      
      Our team ensures smooth transitions—whether it's migrating data, configuring hardware, or integrating new devices—so your business can operate efficiently without downtime or risk. With a focus on reliability, security, and scalability, we help you modernize your IT environment with confidence and ease.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Installation of servers,routers, systems & peripherals</li>
        <li>✔ Data migration & system upgrades</li>
        <li>✔ Seamless integration with existing infrastructure</li>
      </ul>
    </div>

  </div>
</div>
      {/* IT Infrastructure Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3 order-2 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        IT Infrastructure Planning & Optimization
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
      A strong digital foundation is critical for business growth and operational efficiency. We design and optimize IT infrastructures that are reliable, scalable, and aligned with your business goals.      
      From network architecture to cloud environments, we ensure your systems are built for performance, security, and future expansion. Our strategic approach helps reduce downtime, improve resource utilization, and enhance overall system efficiency—empowering your business to operate seamlessly and scale with confidence.</p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ Infrastructure design, assessment & capacity planning</li>
        <li>✔ Cloud strategy, migration & resource optimization</li>
        <li>✔ Cost optimization & system upgrades</li>
      </ul>
    </div>

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-2 md:order-1">
      <Image
        src="/images/it-infrastructure.png"
        alt="IT infrastructure illustration"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

  </div>
</div>
      {/* Cybersecurity Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-1 md:order-1">
      <Image
        src="/images/cybersecurity.png"
        alt="Cybersecurity illustration"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Cybersecurity & Risk Management
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        In a digital-first world, protecting your business from evolving cyber threats is critical to maintaining trust and continuity. We provide end-to-end cybersecurity and risk management solutions that proactively identify vulnerabilities, mitigate risks, and safeguard your systems, data, and operations.
        By combining advanced security technologies with strategic risk assessment, we help you build a resilient digital environment that meets compliance standards and ensures long-term protection against emerging threats.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Risk assessment, vulnerability management & compliance support</li>
        <li>✔ Threat monitoring & incident response</li>
        <li>✔ Endpoint, network & application security implementation</li>
      </ul>
    </div>

  </div>
</div>

     {/* Cloud Transformation Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3 order-2 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Cloud Migration & Digital Transformation
      </h2>

       <p className="text-gray-700 leading-relaxed mb-8 text-justify">
       Transform your business for the future with seamless cloud migration and strategic digital transformation. We help you move from traditional infrastructure to modern, cloud-powered environments that enhance flexibility, scalability, and performance.
        By adopting the latest technologies and optimizing your digital ecosystem, we enable faster innovation, improved collaboration, and cost efficiency. Our end-to-end approach ensures a smooth transition with minimal disruption, empowering your business to stay competitive in a rapidly evolving digital landscape.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Cloud strategy, migration & modernization (AWS, Azure, GCP)</li>
        <li>✔ Legacy system transformation & process automation</li>
        <li>✔ Scalable, secure & cost-efficient cloud architecture</li>
      </ul>
    </div>

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-2 md:order-1">
      <Image
        src="/images/cloud-migration.png"
        alt="Cloud migration illustration"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

  </div>
</div>

      {/* IT Project Management Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-1 md:order-1">
      <Image
        src="/images/it-project.png"
        alt="IT project management illustration"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        IT Project Management & Support
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
       Successful digital initiatives require more than just great ideas—they demand structured execution, clear communication, and ongoing support. We provide end-to-end IT project management and support services to ensure your projects are delivered on time, within budget, and aligned with your business goals.
        From planning and resource allocation to deployment and post-launch support, we manage every phase with precision. Our proactive support ensures your systems continue to perform optimally, allowing you to focus on growth while we handle the complexities.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Agile project planning, execution & delivery</li>
        <li>✔ Resource management, risk mitigation & quality assurance</li>
        <li>✔ Ongoing technical support, maintenance & performance monitoring</li>
      </ul>
    </div>

  </div>
</div>
 {/* Software & Application Consulting */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3 order-2 md:order-2">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Software & Application Consulting
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Turn your ideas into powerful, scalable digital solutions with expert software and application consulting. We work closely with you to understand your business objectives, challenges, and opportunities, providing strategic guidance on the right technologies, architectures, and development approaches. 
        Whether you're building from scratch, upgrading existing systems, or optimizing performance, our consulting ensures your applications are efficient, secure, and future-ready—driving innovation and long-term success.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Technology selection & solution architecture planning</li>
        <li>✔ Application audit, optimization & modernization strategy</li>
        <li>✔ Scalable, secure & performance-driven development guidance</li>
      </ul>
    </div>

     {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-2 md:order-1">
      <Image
        src="/images/software-application.png"
        alt="Software Application Consulting"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

  </div>
</div>

     {/* IoT & Smart Device Integration */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">

    {/* Image Area (2 parts) */}
    <div className="md:col-span-2 flex justify-center order-1 md:order-1">
      <Image
        src="/images/iot-smart-devices.png"
        alt="IoT & Smart Device Integration"
        width={500}
        height={400}
        className="rounded-xl shadow-lg w-full h-auto"
      />
    </div>

    {/* Text Area (3 parts) */}
    <div className="md:col-span-3">
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        IoT & Smart Device Integration
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Unlock the power of connected ecosystems with intelligent IoT and smart device integration. We enable seamless communication between devices, applications, and cloud platforms to create efficient, data-driven environments.
        From sensors and automation systems to advanced analytics, our solutions help you monitor, control, and optimize operations in real time. By combining innovation with reliability, we transform everyday processes into smart, connected experiences that drive efficiency, reduce costs, and open new opportunities for growth.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ IoT device connectivity & architecture</li>
        <li>✔ Smart automation & sensor integration</li>
        <li>✔ Real-time data monitoring & analytics</li>
      </ul>
    </div>

  </div>
</div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-500 font-semibold mb-2">Why Choose Us?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partnering with 99 Visual IT Consulting
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
             IT isn't just a support function—it becomes a competitive advantage. Here's how we empower businesses with technology:
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