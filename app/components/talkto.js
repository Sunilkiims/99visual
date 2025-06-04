'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/607bfaf4067c2605c0c3800e/DEFAULT';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
