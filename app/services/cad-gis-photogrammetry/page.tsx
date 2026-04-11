import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import CADGISBanner from "@/app/components/cadgisbanner";
import { FaDraftingCompass, FaMapMarkedAlt, FaCubes, FaSatellite, FaGlobe, FaChartArea, FaLayerGroup, FaProjectDiagram } from "react-icons/fa";
import Footer from "@/app/components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions - 99Visual",
  
  description:
    "Deliver precision-driven results with 99Visual’s CAD drafting, GIS mapping, LiDAR processing, and photogrammetry services. We provide accurate geospatial data, 3D mapping, and engineering support for infrastructure, construction, and planning projects.",
  
  keywords: [
    "CAD Drafting Services",
    "GIS Mapping Services",
    "Photogrammetry Services",
    "LiDAR Data Processing",
    "3D Mapping Services",
    "Geospatial Data Solutions",
    "Survey Mapping Services",
    "Topographic Mapping",
    "Remote Sensing Services",
    "Infrastructure Mapping Solutions",
    "Engineering CAD Services",
    "GIS Company India",
    "Photogrammetry Company India",
    "99Visual Geospatial Services"
  ],

  openGraph: {
    title: "CAD, GIS, LiDAR & Photogrammetry Services - 99Visual",
    
    description:
      "Accurate CAD drafting, GIS mapping, LiDAR processing, and photogrammetry solutions for infrastructure, engineering, and geospatial projects.",
    
    url: "https://www.99visual.com/services/cad-gis-photogrammetry",
    
    siteName: "99Visual",
    
    images: [
      {
        url: "https://www.99visual.com/images/services/cad-gis-og.jpg",
        width: 1200,
        height: 630,
        alt: "CAD GIS Photogrammetry Services by 99Visual",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    
    title: "CAD, GIS & Photogrammetry Services | 99Visual",
    
    description:
      "Advanced geospatial solutions including CAD drafting, GIS mapping, LiDAR processing, and 3D photogrammetry.",
    
    site: "@99visual",
    creator: "@99visual",
    
    images: [
      "https://www.99visual.com/images/services/cad-gis-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/services/cad-gis-photogrammetry",
  },
};



export default function CADGISPhotogrammetry() {
  const benefits = [
    {
      icon: <FaDraftingCompass className="text-blue-600 text-3xl" />,
      title: "Accurate CAD Drafting",
      description:
        "We provide precise CAD drawings and drafting services for engineering, architecture, and infrastructure projects.",
    },
    {
      icon: <FaMapMarkedAlt className="text-green-600 text-3xl" />,
      title: "Comprehensive GIS Solutions",
      description:
        "Our GIS services transform raw geospatial data into actionable insights for urban planning and resource management.",
    },
    {
      icon: <FaSatellite className="text-purple-600 text-3xl" />,
      title: "Advanced Photogrammetry",
      description:
        "We deliver accurate 3D models and orthomosaics using drone and satellite imagery for surveying and analysis.",
    },
    {
      icon: <FaCubes className="text-orange-500 text-3xl" />,
      title: "LiDAR Data Processing",
      description:
        "We process LiDAR point cloud data to generate precise digital terrain models and surface mapping outputs.",
    },
    {
      icon: <FaLayerGroup className="text-pink-600 text-3xl" />,
      title: "Multi-Layer Mapping",
      description:
        "Our layered mapping solutions allow integration of CAD, GIS, and photogrammetry data for holistic insights.",
    },
    {
      icon: <FaProjectDiagram className="text-yellow-600 text-3xl" />,
      title: "Project-Ready Deliverables",
      description:
        "We deliver data in client-specified formats, ensuring compatibility and readiness for project implementation.",
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
      CAD, GIS & <span className="text-orange-500">Photogrammetry</span>
    </h1>

    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      We’re more than a workplace—we’re a community of creators, tech enthusiasts, and problem-solvers. 
      If you’re passionate about building impactful digital experiences, 99Visual Solutions is the place for you.
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
<div id="services" className="bg-gray-50 py-10 px-4 md:px-20">
  <div className="max-w-4xl mx-auto">

    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
      CAD, GIS & Photogrammetry Services for Precision & Innovation
    </h1>

    <p className="text-gray-700 leading-8 text-justify text-[17px] mb-4">
      At <span className="font-semibold">99 Visual Solutions</span>, we specialize in <span className="font-semibold">Computer-Aided Design (CAD)</span>, <span className="font-semibold">Geographic Information Systems (GIS)</span>, and <span className="font-semibold">Photogrammetry</span>, delivering data-rich and high-accuracy solutions that empower businesses, government agencies, and planners to make informed decisions.
    </p>

    <p className="text-gray-700 leading-8 text-justify text-[17px]">
      Whether it’s <span className="font-semibold">surveying, infrastructure planning, urban development, or environmental analysis</span>, our advanced tools and expertise provide actionable insights that drive efficiency, precision, and project success.
    </p>

  </div>
</div>
      {/* Advanced CAD, GIS & Geospatial Services Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Advanced CAD, GIS & Geospatial Services
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Transform complex spatial data into actionable insights with our advanced CAD, GIS, and geospatial solutions. We help businesses, infrastructure projects, and government organizations visualize, analyze, and manage geographic and engineering data with precision.
      By combining cutting-edge tools, accurate data processing, and domain expertise, we deliver high-quality mapping, modeling, and analysis that support smarter planning and decision-making. Our solutions enhance efficiency, improve accuracy, and enable you to unlock the true potential of your spatial data.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ CAD drafting, 2D/3D modeling & engineering design support</li>
        <li>✔ GIS mapping, spatial analysis & geospatial data management</li>
        <li>✔ LIDAR, photogrammetry & high-precision data processing</li>
      </ul>
    </div>

    <Image
      src="/images/advanced-cad-gis.png"
      alt="Advanced CAD, GIS & Geospatial"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

      {/* End-to-End CAD, GIS & Mapping Solutions Section */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 items-center">
    
    <Image
      src="/images/GIS-Mapping.png"
      alt="GIS mapping solutions"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2"> 
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        End-to-End CAD, GIS & Mapping Solutions
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        From data capture to final visualization, we deliver comprehensive CAD, GIS, and mapping solutions tailored to your project needs. Our end-to-end approach ensures seamless integration of geospatial data, engineering design, and advanced mapping technologies to support accurate planning, analysis, and execution.
      Whether it’s infrastructure development, urban planning, or asset management, we provide scalable and precise solutions that streamline workflows, reduce errors, and enhance decision-making across every stage of your project lifecycle.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Complete workflow from data collection to final map delivery</li>
        <li>✔ Integrated CAD, GIS & mapping for accurate planning & execution</li>
        <li>✔ Scalable solutions for infrastructure, utilities & land management</li>
      </ul>
    </div>

  </div>
</div>

      {/* Precision CAD, GIS & LiDAR Services Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Precision CAD, GIS & LiDAR Services
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Achieve unmatched accuracy and detail with our precision-driven CAD, GIS, and LiDAR services. We specialize in transforming complex spatial and survey data into highly accurate models, maps, and actionable insights.
      By leveraging advanced LiDAR technology alongside expert CAD drafting and GIS analysis, we deliver reliable outputs that support critical decision-making across infrastructure, engineering, and environmental projects. Our solutions are designed to enhance accuracy, reduce risks, and ensure efficiency at every stage.
      </p>
      <ul className="space-y-3 text-gray-800">
        <li>✔ High-precision LiDAR data processing & 3D modeling</li>
        <li>✔ Accurate CAD drafting & GIS-based spatial analysis</li>
        <li>✔ Reliable data outputs for infrastructure, planning & surveying projects</li>
      </ul>
    </div>

    <Image
      src="/images/Precision-CAD-GIS.png"
      alt="Precision CAD, GIS & LiDAR"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

{/* GIS Data Management & Spatial Analysis */}
<div className="bg-gray-50 py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 items-center">
    
    <Image
      src="/images/GIS-Data-Management.png"
      alt="GIS Data Management & Spatial Analysis"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain order-2 md:order-1"
    />

    <div className="order-1 md:order-2"> 
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        GIS Data Management & Spatial Analysis
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Turn complex geographic data into meaningful insights with our advanced GIS data management and spatial analysis services. We help organizations collect, organize, and analyze spatial data to support smarter planning, decision-making, and resource management.
      By leveraging powerful GIS tools and analytical techniques, we uncover patterns, trends, and relationships that drive efficiency and strategic growth. Our solutions ensure your geospatial data is accurate, accessible, and actionable across all your projects.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Geospatial data collection, cleaning & database management</li>
        <li>✔ Geospatial data collection, cleaning & database management</li>
        <li>✔ Data-driven decision support for planning & operations</li>
      </ul>
    </div>

  </div>
</div>
  
      {/* Engineering, Mapping & Geospatial Solutions Section */}
<div className="bg-white py-12 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10 items-center">
    
    <div>
      <h2 className="text-1xl md:text-2xl font-bold text-gray-900 mb-6">
        Engineering, Mapping & Geospatial Solutions
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        Using advanced imaging and{" "}
        Bridge the gap between engineering precision and geospatial intelligence with our integrated solutions. We deliver comprehensive engineering, mapping, and geospatial services that support accurate planning, design, and execution across infrastructure and development projects.
      By combining advanced technologies with domain expertise, we transform complex data into clear, actionable insights—helping you improve efficiency, reduce risks, and make informed decisions at every stage of your project lifecycle.
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>✔ Integrated engineering design, mapping & geospatial analysis</li>
        <li>✔ High-accuracy data processing for infrastructure & development projects</li>
        <li>✔ Scalable solutions for planning, execution & asset management</li>
      </ul>
    </div>

    <Image
      src="/images/Engineering-Mapping.png"
      alt="Engineering, Mapping & Geospatial"
      width={500}
      height={400}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
    />

  </div>
</div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-500 font-semibold mb-2">Why Choose Us?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Benefits of Partnering with 99Visual CAD, GIS & Photogrammetry
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            With <span className="font-semibold">99 Visual Solutions</span>, precision and innovation go hand in hand. Our services are designed to provide reliable, scalable, and accurate geospatial insights for complex projects.
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
