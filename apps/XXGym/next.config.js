const sharedConfig = require("@paragu-ai-leads/config/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...sharedConfig,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
