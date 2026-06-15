import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/our_services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/visualisation-services",
        destination: "/services/visualization",
        permanent: true,
      },
      {
        source: "/services/digital-marketing-and-seo",
        destination: "/services/digital-marketing-seo",
        permanent: true,
      },
      {
        source: "/services/social-media-marketing",
        destination: "/services/digital-marketing-seo",
        permanent: true,
      },
      {
        source: "/services/testing-development",
        destination: "/services/automation-testing",
        permanent: true,
      },
{
  source: '/blog',
  destination: '/insights',
  permanent: true,
},
{
  source: '/blog/:slug*',
  destination: '/insights/:slug*',
  permanent: true,
},
      {
        source: "/services/gis-cad-photogrammetry",
        destination: "/services/cad-gis-photogrammetry",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;