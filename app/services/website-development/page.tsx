import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import WebDevBanner from "@/app/components/webdevbanner";
import { FaCogs, FaRocket, FaMobileAlt, FaClock, FaUsers, FaTools, FaWrench, FaLaptopCode, FaRegSmile } from "react-icons/fa";
import Footer from "@/app/components/footer";
export const metadata = {
  title: "99 Visual Solutions | 3D Visualization, Web Development & Digital Marketing Experts",
  
  description:
    "99Visual is a leading digital solutions company offering 3D visualization, web development, SEO, and digital marketing services. Transform your ideas into powerful digital experiences with our expert team.",

  keywords: [
    "3D Visualization Services",
    "Architectural Visualization Company",
    "Web Development Company India",
    "Custom Web Application Development",
    "SEO Services Company",
    "Digital Marketing Agency India",
    "E-commerce Website Development",
    "UI UX Design Services",
    "3D Rendering Services",
    "Best IT Consulting Company",
    "99Visual Solutions",
    "Website Design Company Bangalore",
    "Next.js Development Services",
    "Startup Digital Solutions",
    "Branding and Marketing Agency"
  ],

  openGraph: {
    title:
      "99 Visual Solutions | 3D Visualization, Web Development & Digital Growth",
    
    description:
      "Boost your business with 99Visual’s expert services in 3D visualization, web development, and digital marketing. Scalable, innovative, and result-driven solutions.",
    
    url: "https://www.99visual.com/",
    
    siteName: "99 Visual Solutions",

    images: [
      {
        url: "https://www.99visual.com/images/og/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "99 Visual Solutions - Digital & 3D Experts",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "99 Visual Solutions | 3D, Web & Digital Marketing Experts",

    description:
      "Grow your business with cutting-edge 3D visualization, web apps, and digital marketing solutions by 99Visual.",

    site: "@99visual",
    creator: "@99visual",

    images: ["https://www.99visual.com/images/og/home-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/",
  },
};

export default function WebsiteDevelopment() {
  const benefits = [
    {
      icon: <FaCogs className="text-blue-600 text-3xl" />,
      title: "Customized Solutions",
      description:
        "Every business has unique needs, and we create a site tailored to your specific goals. Our custom approach ensures your website reflects your brand and drives results.",
    },
    {
      icon: <FaRocket className="text-green-600 text-3xl" />,
      title: "SEO Optimization",
      description:
        "A well-designed website is built with SEO best practices in mind. Our designs are optimized to rank higher in search engine results, driving more traffic and leads.",
    },
    {
      icon: <FaMobileAlt className="text-purple-600 text-3xl" />,
      title: "Mobile Responsiveness",
      description:
        "With mobile-first usage rising, we build fully responsive websites that provide seamless experiences across all devices, boosting both satisfaction and search rankings.",
    },
    {
      icon: <FaClock className="text-orange-500 text-3xl" />,
      title: "Faster Load Times",
      description:
        "Our websites are optimized for speed, ensuring quick load times on all devices. This not only improves user experience but also enhances your Google rankings.",
    },
    {
      icon: <FaUsers className="text-pink-600 text-3xl" />,
      title: "Improved User Experience (UX)",
      description:
        "We prioritize UX with intuitive, visually appealing designs that keep visitors engaged. This increases time on site and boosts conversion rates.",
    },
    {
      icon: <FaTools className="text-yellow-600 text-3xl" />,
      title: "Ongoing Maintenance & Support",
      description:
        "We provide ongoing support even after launch—whether updates, security checks, or adding new features—ensuring your website continues to perform long-term.",
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
      Website & Web App <span className="text-orange-500">Development</span>
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
      <div id="services" className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
            Crafting Digital Experiences That Inspire, Connect & Convert
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">99 Visual Solutions</span>, we go beyond
            just creating websites—we design digital experiences that connect, engage,
            and inspire. As a trusted{" "}
            <span className="font-semibold">web design and development company</span>, we combine
            creativity, strategy, and cutting-edge technology to deliver designs that
            not only look stunning but also perform flawlessly across devices.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            In today’s fast-moving digital world, your website is the first impression
            customers have of your brand. That’s why we create{" "}
            <span className="font-semibold">modern, responsive, and SEO-optimized websites</span>
            tailored to your business goals. Whether you are a startup, an enterprise,
            or an e-commerce brand, our solutions are built to help you stand out and
            deliver an exceptional user experience.
          </p>
        </div>
      </div>



    {/* Web Application Development Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/web-application.png"
      alt="Web Application Development"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Web Application Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Your business operations demand more than a standard website—they require intelligent, scalable, and purpose-built digital solutions. We design and develop powerful web applications tailored to your unique workflows, enabling seamless automation, enhanced productivity, and data-driven decision-making. From dynamic dashboards to fully customized tools and system integrations, every application is crafted to align with your business processes, ensuring efficiency, flexibility, and long-term growth. 
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Custom dashboards & business tools</li>
        <li>✔ Workflow automation & process optimization</li>
        <li>✔ Secure, scalable, and high-performance architecture</li>
      </ul>
    </div>

  </div>
</div>

     {/* User Experience Design Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        User Experience (UX) Design
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Great design is not just about how it looks—it’s about how it works and how it feels. We craft seamless, intuitive user experiences that guide users effortlessly through your digital products.{" "}
        <span className="font-semibold">By deeply understanding user behavior, business goals, and market trends, we create designs that reduce friction, enhance usability, and keep users engaged. </span> 
       Our UX approach blends research, strategy, and creativity to deliver meaningful interactions that drive satisfaction, loyalty, and conversions.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Human-centered design approach</li>
        <li>✔ Wireframes, prototypes, & testing</li>
        <li>✔ Conversion-focused design strategy</li>
      </ul>
    </div>

    <Image
      src="/images/ux-design.png"
      alt="UX design illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>
      

     {/* Website Customization Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/website-customization.png"
      alt="Website customization illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Website Customization
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Your business is unique, and your website should reflect that at every level. We deliver fully customized web solutions—from powerful e-commerce platforms to high-converting landing pages and tailored functionalities—<span className="font-semibold">full website customization, </span> 
       designed to align perfectly with your brand identity, goals, and customer journey. Every detail is built with purpose, ensuring a seamless experience that not only stands out visually but also drives real results.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Custom e-commerce functionality</li>
        <li>✔ Landing pages built for campaigns</li>
        <li>✔ Personalization for brand consistency</li>
      </ul>
    </div>

  </div>
</div>
       {/* Front-End Development */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Front-End Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
       Your website’s first impression is everything—and we make it count. Our front-end development services focus on creating visually stunning, highly interactive, and lightning-fast user interfaces that captivate users from the very first click.{" "}
        <span className="font-semibold">By leveraging modern frameworks and best practices,  </span> 
        we build responsive, accessible, and performance-driven interfaces that deliver a seamless experience across all devices and browsers. The result is a digital presence that not only looks exceptional but also feels intuitive and engaging.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Responsive, mobile-first & cross-browser compatible design</li>
        <li>✔ Modern frameworks (React, Next.js, Vue) & clean code architecture</li>
        <li>✔ Optimized performance, accessibility & user experience</li>
      </ul>
    </div>

    <Image
      src="/images/frontend-development.png"
      alt="Frontend Delvelopment"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>

      {/* Back-End Development */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/backend-development.png"
      alt="Backend Development"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Back-End Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
       Behind every powerful digital experience lies a robust and intelligent back-end. We specialize in building secure, scalable, and high-performance back-end systems that ensure your website or application runs smoothly, efficiently, and reliably. <span className="font-semibold">No two businesses are alike—and your digital infrastructure should reflect that uniqueness.</span> 
        Our back-end development services are fully customized to meet your specific operational needs, whether you're running an e-commerce platform, managing dynamic landing pages, or building complex web applications.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Custom e-commerce functionality</li>
        <li>✔ Landing pages built for campaigns</li>
        <li>✔ Personalization for brand consistency</li>
      </ul>
    </div>

  </div>
</div>
 {/* E-Commerce and CMS Development */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        E-Commerce and CMS Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        In today’s digital-first world, having a powerful online store and an easy-to-manage content system is essential for business growth. We specialize in developing scalable e-commerce platforms and intuitive Content Management Systems (CMS) that give you complete control over your digital presence. {" "}
        <span className="font-semibold">Our e-commerce solutions are designed to deliver seamless shopping experiences—</span> 
        from product browsing to secure checkout—ensuring higher engagement and conversions. Whether you’re launching a new online store or upgrading an existing one, we build customized platforms tailored to your business model, target audience, and growth strategy.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Human-centered design approach</li>
        <li>✔ Wireframes, prototypes, & testing</li>
        <li>✔ Conversion-focused design strategy</li>
      </ul>
    </div>

    <Image
      src="/images/e-commerce-cms-development.png"
      alt="E-Commerce and CMS Development"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>

      {/* Web App Modernization */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/webapp-modernization.png"
      alt="Web App Modernization"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Web App Modernization
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        In today’s fast-evolving digital landscape, outdated applications can slow down performance, limit scalability, and impact user experience. We help businesses transform legacy web applications into modern, high-performing, and future-ready platforms. <span className="font-semibold">By leveraging the latest technologies, cloud capabilities, and responsive frameworks, we ensure your application is faster, more secure, and aligned with current user expectations</span> 
        Our modernization approach not only enhances functionality but also improves efficiency, reduces maintenance costs, and unlocks new growth opportunities.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Legacy system upgrade & re-engineering</li>
        <li>✔ Cloud migration & performance optimization</li>
        <li>✔ Scalable, secure & future-ready architecture</li>
      </ul>
    </div>

  </div>
</div>
       {/* SEO & Performance Optimization */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        SEO & Performance Optimization
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        A powerful digital presence goes beyond just having a website—it’s about being discoverable, fast, and optimized for both users and search engines. {" "}
        <span className="font-semibold">We combine advanced SEO strategies with performance optimization techniques to ensure your website ranks higher, loads faster, and delivers a seamless experience across all devices. </span> 
        From technical SEO improvements to speed enhancements, we focus on driving organic traffic, reducing bounce rates, and maximizing your online visibility and conversions.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ On-page, technical & keyword optimization</li>
        <li>✔ Website speed & Core Web Vitals improvement</li>
        <li>✔ Analytics-driven insights & continuous optimization</li>
      </ul>
    </div>

    <Image
      src="/images/seo-and-performance-optimization.png"
      alt="SEO & Performance Optimization"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>

      {/* Web Security Services */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/web-security-services.png"
      alt="Web Security Services"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Web Security Services
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        In an era where cyber threats are constantly evolving, securing your digital assets is no longer optional—it’s essential. We provide comprehensive web security solutions designed to protect your website, applications, and user data from vulnerabilities and attacks. <span className="font-semibold">By implementing advanced security protocols, continuous monitoring, and proactive threat prevention strategies, we ensure your platform remains safe, reliable, and compliant.</span> 
        Our approach not only safeguards your business reputation but also builds trust and confidence among your users.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Vulnerability assessment & penetration testing</li>
        <li>✔ SSL implementation, firewalls & malware protection</li>
        <li>✔ Continuous monitoring & threat prevention strategies</li>
      </ul>
    </div>

  </div>
</div>
          {/* Website Hosting & Deployment */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Website Hosting & Deployment
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        A strong digital presence starts with reliable hosting and seamless deployment. We provide robust, secure, and high-performance hosting solutions tailored to your business needs, ensuring your website is always accessible, fast, and scalable. {" "}
        <span className="font-semibold">From initial setup to continuous deployment, our experts handle everything with precision— </span> 
        so you can focus on growing your business while we manage the infrastructure behind it. With optimized environments and streamlined deployment pipelines, we guarantee minimal downtime and maximum efficiency.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Secure, scalable & high-performance hosting solutions</li>
        <li>✔ CI/CD pipelines & seamless deployment processes</li>
        <li>✔ Server management, backups & uptime monitoring</li>
      </ul>
    </div>

    <Image
      src="/images/website-hosting-deployement.png"
      alt="Website Hosting & Deployment"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>

     {/* API & Third-Party Integrations */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/api-and-third-party-intigration.png"
      alt="API & Third-Party Integrations"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        API & Third-Party Integrations
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Modern digital ecosystems thrive on connectivity. We enable your applications to seamlessly communicate with external platforms, services, and tools through secure and efficient API integrations. <span className="font-semibold">Whether it’s payment gateways, CRM systems, analytics tools, or custom services, we ensure smooth data flow and real-time synchronization. </span> 
        Our integration solutions are designed to enhance functionality, automate processes, and create a unified digital experience—helping your business operate smarter, faster, and more efficiently.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Secure REST & GraphQL API integrations</li>
        <li>✔ Payment gateways, CRM & third-party service connections</li>
        <li>✔ Real-time data sync & workflow automation</li>
      </ul>
    </div>

  </div>
</div>
              {/* Landing Page Design & Development */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Landing Page Design & Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Your landing page is more than just a destination—it’s a powerful conversion engine. We design and develop high-impact landing pages that are strategically crafted to capture attention, communicate value instantly, and drive user action. {" "}
        <span className="font-semibold">By combining compelling visuals, persuasive copy, and data-driven design principles, </span> 
        we create pages that guide visitors seamlessly toward your goals—whether it’s lead generation, product sales, or campaign success.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Conversion-focused design & persuasive content</li>
        <li>✔ Fast-loading, responsive & mobile-first layouts</li>
        <li>✔ A/B testing & performance-driven optimization</li>
      </ul>
    </div>

    <Image
      src="/images/landing-page-design.png"
      alt="Landing Page Design & Development"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

  </div>
</div>

      {/* Custom Dashboard & Admin Panel Development */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">

    <Image
      src="/images/custom-dashboard-admin-panel.png"
      alt="Custom Dashboard & Admin Panel Development"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full"
    />

    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Custom Dashboard & Admin Panel Development
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Empower your business with intelligent control and complete visibility through custom-built dashboards and admin panels. <span className="font-semibold">We design and develop tailored management interfaces that simplify complex operations, streamline workflows, and provide real-time insights— </span> 
        all in one centralized platform. With a focus on usability, scalability, and performance, our solutions help you manage data efficiently, make informed decisions faster, and enhance overall productivity.
      </p>

      <ul className="space-y-3 text-gray-800">
        <li>✔ Role-based access & secure user management</li>
        <li>✔ Real-time analytics, reports & data visualization</li>
        <li>✔ Scalable, intuitive & fully customizable interfaces</li>
      </ul>
    </div>

  </div>
</div>

      {/* Already have E-Commerce & Landing Page sections */}
      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-500 font-semibold mb-2">Why Choose Us?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits of Working with 99 Visual
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            Partnering with <span className="font-semibold">99 Visual Solutions</span> means 
            more than just building a website—it means creating a lasting digital impact. 
            Here’s why businesses trust us:
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
