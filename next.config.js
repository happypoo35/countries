/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: true,
    optimizeCss: true,
  },
  images: {
    domains: ["assets.vercel.com", "upload.wikimedia.org", "flagcdn.com"],
  },
  sassOptions: {
    includePaths: ["./app"],
    prependData: '@import "@styles/config";',
  },
};

module.exports = nextConfig;
