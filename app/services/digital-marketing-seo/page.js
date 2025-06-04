'use client';

import Header from '../../components/header';
import Image from 'next/image';

export default function DigitalMarketingSeoPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6 mt-12">
        <h1 className="text-4xl font-bold mb-4">Digital Marketing and  SEO Services</h1>
        <p className="text-lg mb-6">
          We provide expert Digital Marketing  services tailored to your business needs. From infrastructure planning to cybersecurity, we help you stay ahead with the right technology strategy.
        </p>
        
        <ul className="list-disc pl-6 mb-6 text-gray-800">
          <li>Infrastructure and Cloud Consulting</li>
          <li>Cybersecurity Audits and Solutions</li>
          <li>IT Strategy and Transformation</li>
          <li>Disaster Recovery Planning</li>
          <li>Support and Maintenance</li>
        </ul>

        <Image
          src="/it-consulting.png"
          alt="Digital Marketing "
          width={600}
          height={400}
          className="rounded"
        />
      </main>
    </>
  );
}
