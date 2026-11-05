'use client';

// Defers the WebGL globe until after hydration (it never blocks first paint)
// and shows a static CSS orb in its place until then.
import dynamic from 'next/dynamic';

const InteractiveGlobe = dynamic(() => import('./InteractiveGlobe'), {
  ssr: false,
  loading: () => <div className="vz-globe vz-globe--placeholder" aria-hidden="true" />,
});

export default function GlobeLoader() {
  return <InteractiveGlobe />;
}
