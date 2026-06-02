import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/testing-development",
        destination: "/services/automation-testing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;