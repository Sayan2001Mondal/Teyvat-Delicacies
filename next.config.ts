import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
         pathname: '/v1/storage/buckets/**'
      }

    ]
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
