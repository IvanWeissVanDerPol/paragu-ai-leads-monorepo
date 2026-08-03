const sharedConfig = require("@paragu-ai-leads/config/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...sharedConfig,
  // HidroBaby-Spa-specific overrides
  images: {
    ...sharedConfig.images,
    remotePatterns: [
      ...sharedConfig.images.remotePatterns,
      { protocol: "https", hostname: "hidrobabyspa.com.py" },
    ],
  },
};

module.exports = nextConfig;
