// app/components/ArtDirectedVisual.tsx
// One <img> (one alt text) with a wide variant for larger screens and a tall
// variant for phones, both served through the Next.js image optimiser. Only
// the variant that matches the viewport is downloaded.
import { getImageProps } from "next/image";

export type VisualSource = { src: string; width: number; height: number };

export default function ArtDirectedVisual({ wide, tall, alt, sizes, className }: {
  wide: VisualSource; tall: VisualSource; alt: string; sizes: string; className?: string;
}) {
  const { props: { srcSet: tallSrcSet } } = getImageProps({ ...tall, alt, sizes: "100vw" });
  const { props: wideProps } = getImageProps({ ...wide, alt, sizes, loading: "lazy" });
  return (
    <picture className={className}>
      <source media="(max-width: 640px)" srcSet={tallSrcSet} width={tall.width} height={tall.height} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through wideProps */}
      <img {...wideProps} />
    </picture>
  );
}
