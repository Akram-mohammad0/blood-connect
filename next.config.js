/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    if (!config.resolve.fallback) config.resolve.fallback = {};
    config.resolve.fallback.fs = false; // Needed for Prisma
    return config;
  },
};

module.exports = nextConfig;
