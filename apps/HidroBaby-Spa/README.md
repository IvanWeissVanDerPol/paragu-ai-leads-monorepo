# HidroBaby-Spa

**Lead site for HidroBaby Spa (Asunción, Paraguay).**

This is the **monorepo version** (R27+) — previously a standalone repo at `IvanWeissVanDerPol/HidroBaby-Spa`. Now lives at `apps/HidroBaby-Spa/` in `paragu-ai-leads-monorepo`.

## Stack

- Next.js 15 + React 19 + TypeScript 5.8
- Tailwind v4 with CSS variables for branding
- Shared components from `@paragu-ai-leads/ui`
- Shared configs from `@paragu-ai-leads/config`

## Development

```bash
# From monorepo root:
pnpm install
pnpm --filter hidrobaby-spa dev    # http://localhost:3002

# Or from this directory:
pnpm dev
```

## What changed in R27

| Before | After |
|--------|-------|
| Custom `components/bottom-nav.tsx` | Import from `@paragu-ai-leads/ui` |
| Custom `components/share-messaging.tsx` | Import from `@paragu-ai-leads/ui` |
| Custom `tailwind.config.js` | Extend `@paragu-ai-leads/config/tailwind` |
| Custom `tsconfig.json` | Extend `@paragu-ai-leads/config/tsconfig/nextjs` |
| Custom `next.config.js` | Extend `@paragu-ai-leads/config/next` |

## Site config

`site.json` contains per-site configuration (name, phone, Messaging, etc.) — read by `useBusiness()` hook from `@paragu-ai-leads/ui`.

## Branding

Edit `src/app/globals.css` to set brand colors:

```css
:root {
  --color-primary: #YOUR_BRAND_COLOR;
  --color-secondary: #YOUR_SECONDARY;
  /* ... */
}
```

All 6 shared components + 19 apps will pick up the new colors.
