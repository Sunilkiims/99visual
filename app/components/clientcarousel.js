'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './clientcarousel.module.css';
import Image from 'next/image';

const clientLogos = [
  '/logos/client1.png',
  '/logos/client2.png',
  '/logos/client3.png',
  '/logos/client4.png',
  '/logos/client5.png',
];

export default function ClientCarousel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Duplicate logos for smooth looping
  const repeatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.carouselContainer} aria-label="Client Logo Marquee">
      <h2 className={styles.heading}>Our Clients</h2>
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={30}
        slidesPerView="5"
        loop
        freeMode
        speed={3000} // Smooth, consistent scroll speed
        autoplay={{
          delay: 0, // Minimal delay for continuous motion
          disableOnInteraction: false,
        }}
        allowTouchMove={false} // Disable drag to keep it marquee-like
        className="marquee-swiper"
      >
        {repeatedLogos.map((logo, idx) => (
          <SwiperSlide key={idx} style={{ width: '150px' }}>
            <div className={styles.logoSlide}>
              <Image
                src={logo}
                alt={`Client ${idx + 1}`}
                width={160}
                height={70}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
