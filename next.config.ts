import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Evita padrões inválidos de `hostname` que podem confundir o bundler. */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
