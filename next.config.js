/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    domains: ["localhost", "vercel.app"]
  }
};

module.exports = nextConfig;
