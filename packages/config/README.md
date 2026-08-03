# @paragu-ai-leads/config

**Shared TypeScript, Tailwind, PostCSS, Next.js, and ESLint configs.**

Used by all 19 apps via path aliases — update once, propagates everywhere.

## Usage

```js
// tsconfig.json in your app
{
  "extends": "@paragu-ai-leads/config/tsconfig/nextjs",
  ...
}

// next.config.js
const config = require("@paragu-ai-leads/config/next");
module.exports = {
  ...config,
  // app-specific overrides
};

// tailwind.config.js
const defaultConfig = require("@paragu-ai-leads/config/tailwind");
module.exports = {
  ...defaultConfig,
  content: [...defaultConfig.content, ...],
};

// postcss.config.js
module.exports = require("@paragu-ai-leads/config/postcss");

// .eslintrc.json
{
  "extends": "@paragu-ai-leads/config/eslint"
}
```

## What's included

| File | Purpose |
|------|---------|
| `tsconfig/base.json` | Base TS config (no Next) |
| `tsconfig/nextjs.json` | Next.js 15 + path aliases (`@/*`, `@ui/*`) |
| `tailwind/default.js` | Tailwind v4 with brand-color CSS variables |
| `postcss.config.js` | Tailwind v4 + autoprefixer |
| `next/default.config.js` | Next 15 with monorepo webpack aliases |
| `eslint/.eslintrc.json` | Next ESLint preset |

## Per-app overrides

Each app sets brand colors via CSS variables in `src/app/globals.css`:

```css
:root {
  --color-primary: #E94560;        /* brand color */
  --color-secondary: #1A1A2E;
  --color-accent: #FFD93D;
  --color-foreground: #1A1A2E;
  --color-foreground-light: #4A4A6A;
  --color-foreground-muted: #8A8AA0;
  --color-background: #FFFFFF;
  --color-card: #FAFAFA;
  --color-border: #E5E5E5;
  --font-sans: "Inter", system-ui, sans-serif;
}

.dark {
  --color-foreground: #FAFAFA;
  --color-background: #0A0A0B;
  /* etc. */
}
```

All components reference these variables, so changing the values in `globals.css` rebrands the entire site.
