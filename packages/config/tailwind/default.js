/** @type {import('tailwindcss').Config} */
// Shared Tailwind v4 config for all ParaguAI lead sites.
// Each site overrides CSS variables in app/globals.css for branding.

const defaultConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Each site sets these CSS vars in globals.css:
        // --color-primary, --color-secondary, --color-accent
        // --color-foreground, --color-foreground-muted
        // --color-background, --color-card, --color-border
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        foreground: "var(--color-foreground)",
        "foreground-light": "var(--color-foreground-light)",
        "foreground-muted": "var(--color-foreground-muted)",
        background: "var(--color-background)",
        card: "var(--color-card)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = defaultConfig;
