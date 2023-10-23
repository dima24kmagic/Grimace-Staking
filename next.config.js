/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['grimace-nft-preview.s3.eu-central-1.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
      encoding: false,
    };
    return config;
  },
};

module.exports = nextConfig;
