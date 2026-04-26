'use client';

import Image from 'next/image';
import { FaUserTie, FaGraduationCap, FaArrowsAlt, FaShieldAlt } from 'react-icons/fa';

const infoCards = [
  {
    title: 'Strong leaders',
    icon: <FaUserTie size={20} className="text-blue-600" />,
    text: `At the heart of 99 Visual Solutions is a team of visionary leaders who drive our mission to deliver innovative, reliable, and cutting-edge digital solutions. Our leadership team brings a wealth of experience, expertise, and a relentless passion for excellence, setting the standard for everything we do.`,
  },
  {
    title: 'Education',
    icon: <FaGraduationCap size={20} className="text-blue-600" />,
    text: `We believe that continuous learning and professional development are the cornerstones of innovation and excellence. Our leadership team and experts come from diverse educational backgrounds, bringing together a wealth of knowledge and experience that drives our success.`,
  },
  {
    title: 'Flexibility',
    icon: <FaArrowsAlt size={20} className="text-blue-600" />,
    text: `In today’s rapidly evolving digital landscape, flexibility is key to staying ahead. At 99 Visual Solutions, we pride ourselves on our ability to adapt and respond to the unique needs of our clients. Whether you’re a small startup or a large enterprise, our flexible approach ensures that we tailor our solutions to fit your specific requirements, timelines, and budgets.`,
  },
  {
    title: 'Integrity',
    icon: <FaShieldAlt size={20} className="text-blue-600" />,
    text: `At 99 Visual Solutions, integrity is the cornerstone of everything we do. We believe that trust is earned through transparency, honesty, and a steadfast commitment to doing what’s right. Our dedication to integrity drives our relationships with clients, partners, and our team, ensuring that every interaction is handled with mutual respect and ethical practices.`,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-gray-100 py-16 px-6 sm:px-10 lg:px-24">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Why choose us</h2>
        <p className="text-blue-600 mt-2">Check out some interesting facts about us</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* First Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="/teamwork.jpg"
            alt="Teamwork"
            width={500}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* First Two Info Cards */}
        {infoCards.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}

        {/* Second Two Info Cards */}
        {infoCards.slice(2).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}

        {/* Second Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="/award.webp"
            alt="Award and Integrity"
            width={500}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
