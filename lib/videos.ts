// lib/videos.ts
// ─────────────────────────────────────────────────────────────────────────────
// Video watch-page registry — single source of truth for every video that
// gets its own dedicated /videos/[slug] watch page.
//
// WHY THIS EXISTS
//   Google Search Console was flagging "Video isn't on a watch page" for every
//   <video> on the site. All of them were embedded as decorative/supporting
//   content on marketing pages (services, homepage) with no unique URL, no
//   VideoObject structured data, and no page whose primary subject was the
//   video itself. This registry backs a real watch-page route for each one.
//
// DATA INTEGRITY
//   - `uploadDate` is not fabricated. It comes from the git history of this
//     repository (the commit date each video asset was first added):
//     2026-04-01 for all five files. If the real-world publish date differs,
//     update it here — it is a single source of truth used by both the
//     on-page <time> element and the VideoObject/sitemap dateModified.
//   - `duration` and the thumbnail images were extracted directly from the
//     actual video files (ffprobe / ffmpeg), not guessed.
//   - `description` / `body` are written specifically for the watch page and
//     are NOT copy-pasted from the corresponding /services page, to avoid
//     duplicate content — they describe the clip itself and link out to the
//     full service page for readers who want the complete service details.
// ─────────────────────────────────────────────────────────────────────────────

export interface VideoEntry {
  /** URL slug — final page lives at /videos/{slug} */
  slug: string;
  /** <h1> / <title> / VideoObject.name */
  title: string;
  /** Short label used in nav/cards/footer */
  navLabel: string;
  /** Meta description + VideoObject.description (unique per video) */
  description: string;
  /** Body paragraphs shown on the watch page (unique per video, not duplicated from /services) */
  body: string[];
  /** Path to the actual video file, relative to /public */
  videoSrc: string;
  /** Path to the poster/thumbnail image, relative to /public */
  thumbnail: string;
  /** Descriptive alt text for the thumbnail/poster */
  thumbnailAlt: string;
  /** Duration in whole seconds, from ffprobe */
  durationSeconds: number;
  /** ISO date the asset was actually added to the codebase (git history) */
  uploadDate: string;
  /** The related /services/* page this clip illustrates, for internal linking */
  relatedService: { label: string; href: string };
  /** Short tag list for VideoObject / video sitemap */
  tags: string[];
}

export const videos: VideoEntry[] = [
  {
    slug: 'walkthrough-flyover-visualization',
    title: 'Architectural Walkthrough & Flyover Visualization',
    navLabel: 'Walkthrough & Flyover',
    description:
      'A 3D flyover walkthrough render showing camera-driven exterior navigation through a residential interior and its surrounding architecture — the kind of cinematic flyover we build for real estate and township projects.',
    body: [
      'This clip is a short excerpt from a 3D architectural walkthrough and flyover render, one of the visualization formats produced by 99 Visual Solutions for real estate, township, and infrastructure clients.',
      'The camera glides through a fully modeled interior space, showing how lighting, furnishing, and material choices read in a moving render rather than a static image — useful for clients who want to see a space before it exists.',
      'Flyover and walkthrough renders like this one are typically delivered as part of a larger package covering exterior flyovers, interior walkthroughs, and cinematic promotional cuts for a project.',
    ],
    videoSrc: '/videos/flyover.mp4',
    thumbnail: '/videos/thumbnails/flyover.jpg',
    thumbnailAlt: 'Rendered interior living room from the architectural flyover walkthrough video',
    durationSeconds: 6,
    uploadDate: '2026-04-01',
    relatedService: { label: 'Walkthrough & Flyover services', href: '/services/visualization#flyover' },
    tags: ['3D walkthrough', 'architectural flyover', 'real estate visualization'],
  },
  {
    slug: 'animation-motion-visualization',
    title: 'Architectural Animation & Motion Visualization',
    navLabel: 'Animation & Motion',
    description:
      'A cinematic 3D animation of a high-rise tower at dusk, demonstrating motion visualization techniques used to showcase architectural massing, lighting, and surrounding context in real estate and development marketing.',
    body: [
      'This clip is a short excerpt from a 3D animation and motion visualization render — a format used to turn a static architectural concept into a moving, cinematic sequence.',
      'The scene shows a high-rise development at dusk, with simulated lighting, reflections, and surrounding city context rendered to communicate scale and design intent before construction.',
      'Motion visualizations like this are commonly used for design reviews, marketing campaigns, and investor presentations where a still render doesn\'t fully convey a building\'s presence.',
    ],
    videoSrc: '/videos/animation.mp4',
    thumbnail: '/videos/thumbnails/animation.jpg',
    thumbnailAlt: 'Rendered high-rise tower at dusk from the architectural animation video',
    durationSeconds: 6,
    uploadDate: '2026-04-01',
    relatedService: { label: 'Animation & Motion Visualization services', href: '/services/visualization#animation' },
    tags: ['3D animation', 'motion visualization', 'architectural rendering'],
  },
  {
    slug: 'marketing-visualization-demo',
    title: 'Visualization Assets for Digital Marketing',
    navLabel: 'Marketing Visuals',
    description:
      'A motion demo reel of social and display ad creative — Instagram posts, Facebook covers, Google Display ads, and LinkedIn banners — showing how visualization output is packaged into ready-to-run marketing assets.',
    body: [
      'This clip demonstrates how renders and visual assets get repackaged into ready-to-publish marketing creative: Instagram post templates, Facebook cover art, Google Display ad units, and LinkedIn banners built from the same underlying visual library.',
      'The goal is showing the full pipeline from a photorealistic render or animation to platform-specific ad creative, rather than just the raw 3D output on its own.',
      'This is representative of the marketing visualization work we produce for clients who need consistent visual branding across paid and organic channels.',
    ],
    videoSrc: '/videos/marketing.mp4',
    thumbnail: '/videos/thumbnails/marketing.jpg',
    thumbnailAlt: 'Social media and display ad mockups from the marketing visualization demo video',
    durationSeconds: 8,
    uploadDate: '2026-04-01',
    relatedService: { label: 'Visualization Services for Marketing', href: '/services/visualization#marketing' },
    tags: ['digital marketing', 'social media creative', 'ad visualization'],
  },
  {
    slug: 'product-visualization-compositing-demo',
    title: '3D Product Visualization — Compositing Demo',
    navLabel: '3D Product Visualization',
    description:
      'A 3D product render of a smartwatch shown against a blue-screen background, illustrating the raw compositing plate used before a product visualization is placed into its final marketing scene.',
    body: [
      'This clip shows a 3D-rendered product — a smartwatch — set against a solid blue background. It is the compositing plate stage of a product visualization project, before the render is keyed out and placed into a final marketing scene or background.',
      'Working this way lets the same 3D product render be dropped into multiple backgrounds, campaigns, or platforms without re-rendering the product itself each time.',
      'It is representative of the 3D product modeling and rendering work we do for e-commerce, packaging, and marketing visualization clients.',
    ],
    videoSrc: '/videos/blue-screen.mp4',
    thumbnail: '/videos/thumbnails/blue-screen.jpg',
    thumbnailAlt: 'Two rendered smartwatch angles on a blue compositing background',
    durationSeconds: 16,
    uploadDate: '2026-04-01',
    relatedService: { label: 'Product Modelling & Rendering services', href: '/services/visualization#productmodelling' },
    tags: ['3D product rendering', 'compositing', 'product visualization'],
  },
  {
    slug: '3d-visualization-showreel',
    title: 'Creative Visualizations — 3D & Visualization Showreel',
    navLabel: 'Visualization Showreel',
    description:
      'A short showreel clip introducing our 3D modeling and rendering capabilities, featured on the 99 Visual Solutions homepage as an entry point into our full visualization services.',
    body: [
      'This clip is the short visualization showreel featured on the 99 Visual Solutions homepage, introducing the 3D modeling and rendering work behind our visualization services.',
      'It is intended as a quick, at-a-glance introduction rather than a full case study — for a complete look at the services this reel represents, see our visualization service page.',
    ],
    videoSrc: '/slider/background.mp4',
    thumbnail: '/videos/thumbnails/3d-visualization-showreel.jpg',
    thumbnailAlt: 'Frame from the 3D visualization showreel featured on the homepage',
    durationSeconds: 3,
    uploadDate: '2026-04-01',
    relatedService: { label: 'Visualization services', href: '/services/visualization' },
    tags: ['3D modeling', 'visualization showreel', 'rendering'],
  },
];

export function getVideoBySlug(slug: string): VideoEntry | undefined {
  return videos.find((v) => v.slug === slug);
}
