import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    // ppr: "incremental",
  },
};

export default nextConfig;
