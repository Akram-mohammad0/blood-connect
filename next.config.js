/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true, // ✅ Ensure app directory works properly
  },
  output: "standalone", // ✅ Required for Vercel to optimize build
};

module.exports = nextConfig;
