'use client';

import Header from '../../components/header'; // ✅ Update path if folder is named "components"
import Image from 'next/image';

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6 mt-12">
        <h1 className="text-4xl font-bold mb-4">Website Development</h1>
        <p className="text-lg mb-6">
          We build fast, responsive, and modern websites tailored to your business needs.
        </p>
        <Image
          src="/website-development-illustration.png"
          alt="Website Development Illustration"
          width={600}
          height={400}
          className="rounded"
        />
      </main>
    </>
  );
}
