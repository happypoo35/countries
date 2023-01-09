/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.vercel.com", "upload.wikimedia.org", "flagcdn.com"],
  },
  sassOptions: {
    includePaths: ["./app"],
    prependData: '@import "@styles/config";',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
