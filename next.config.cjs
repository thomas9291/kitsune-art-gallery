/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
