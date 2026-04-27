'use client';

import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/partners/partner1.png" },
  { name: "Partner 2", logo: "/partners/partner2.png" },
  { name: "Partner 3", logo: "/partners/partner3.png" },
  { name: "Partner 4", logo: "/partners/partner4.png" },
  { name: "Partner 5", logo: "/partners/partner5.png" },
  { name: "Partner 6", logo: "/partners/partner6.png" },
  { name: "Partner 7", logo: "/partners/partner7.png" },
  { name: "Partner 8", logo: "/partners/partner8.png" },
];

const PartnerMarquee = () => {
  return (
    <section className="w-full bg-gray-50 py-5 overflow-hidden">

      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-semibold text-black">
          Our Partners
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">

        <div className="marquee flex items-center">

          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[150px] h-[80px] mx-12 group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain transition duration-300 group-hover:grayscale group-hover:brightness-0"
              />
            </div>
          ))}

        </div>

      </div>

      {/* Animation CSS */}
      <style jsx>{`
        .marquee {
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </section>
  );
};

export default PartnerMarquee;