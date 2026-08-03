// Shared Next.js 15 config for all ParaguAI lead sites.

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  // Path aliases for monorepo
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@ui": require("path").resolve(__dirname, "../../packages/ui/src"),
      "@config": require("path").resolve(__dirname, "../../packages/config"),
    };
    return config;
  },
  // Output tracing for monorepo source maps
  outputFileTracingIncludes: {
    "/**": ["./../../packages/ui/**/*", "./../../packages/config/**/*"],
  },
};

module.exports = defaultNextConfig;
