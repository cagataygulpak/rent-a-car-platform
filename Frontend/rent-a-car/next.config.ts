import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http', // Backend http üzerinden çalışıyor
        hostname: 'localhost',
        port: '5261',    // Senin C# API portun
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;