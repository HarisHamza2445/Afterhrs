/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // product photo uploads from the admin panel
    serverActions: { bodySizeLimit: "12mb" },
  },
};

export default nextConfig;
