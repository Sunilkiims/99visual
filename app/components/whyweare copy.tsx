'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function WhyWeAre() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={`relative px-6 py-12 max-w-6xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Why We Are
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          In the ever-evolving landscape of information technology, businesses require innovative and visually appealing solutions to stay competitive. 
          <strong className="text-orange-500"> 99 Visual Solutions </strong> is a leading IT consulting firm dedicated to revolutionizing the industry by providing cutting-edge visual solutions.
        </p>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          From enhancing user experiences to streamlining complex processes, our team of experts leverages the power of visualization to bring remarkable transformations to your IT systems.
        </p>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our comprehensive range of 99 visual solutions that will take your business to new heights.
        </p>
      </div>

      {/* Optional: highlights or bullet points */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
        {[
          'Cutting-edge Visualization',
          'Streamlined IT Systems',
          'Expert Consulting Team',
          'Custom Web & App Solutions',
          'Result-Driven Strategies',
          'Trusted by Enterprises',
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 text-gray-700 dark:text-gray-200"
          >
            <FaCheckCircle className="text-orange-500 mt-1" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
