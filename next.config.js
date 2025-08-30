/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Better performance & fewer bugs
  swcMinify: true,       // Ensures optimized builds

  // ✅ Fixes "fs" issue when deploying on Vercel
  webpack: (config) => {
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.fs = false;
    return config;
  },
};

module.exports = nextConfig;
