const sharedTailwind = require("@paragu-ai-leads/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedTailwind,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ...sharedTailwind.content,
  ],
};
