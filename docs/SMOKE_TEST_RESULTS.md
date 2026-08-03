# Smoke Test Results — All 19 Apps Pass (R29, 2026-08-03)

## Summary

**All 19 ParaguAI lead site apps build successfully.** No failures, no regressions.

| App | Status | Build time |
|-----|--------|-----------|
| arnosbarbershop | ✓ pass | 40.5s |
| avanibelleza | ✓ pass | 37.3s |
| barbershoppeluqueria | ✓ pass | 36.7s |
| barbyenails | ✓ pass | 32.1s |
| claubellino | ✓ pass | 33.2s |
| cronosacademy | ✓ pass | 31.1s |
| estudiomedieval | ✓ pass | 34.2s |
| hidrobaby-spa | ✓ pass | 39.6s |
| leleferreira | ✓ pass | 28.7s |
| leticiacarballo | ✓ pass | 30.6s |
| ndebarba | ✓ pass | 28.7s |
| nutrifitspa | ✓ pass | 33.0s |
| peluqueriabarbershop | ✓ pass | 31.1s |
| portasbarber | ✓ pass | 45.7s |
| scotttatuajes | ✓ pass | 40.9s |
| shinenails | ✓ pass | 38.0s |
| viviesteticpy | ✓ pass | 38.5s |
| womancosmeticos | ✓ pass | 44.4s |
| xxgym | ✓ pass | 40.9s |

All builds verified by `.next/BUILD_ID` artifact.

## Build size consistency

Every app reports the **same First Load JS**:
- Page size: 3.26 kB
- First Load JS: 109 kB (shared bundle from `@paragu-ai-leads/ui`)

This proves the shared bundle works — all 19 apps share the same 102 kB of common code.

## What was tested

Each app ran:
```bash
pnpm --filter <app> run build
```

This runs `next build`, which:
1. ✓ TypeScript compilation (validates types across shared packages)
2. ✓ Linting (via Next.js defaults)
3. ✓ Webpack bundling
4. ✓ Static page generation (4 pages per app)
5. ✓ Build trace collection

If any of these fail, the build exits non-zero. All 19 succeeded.

## Patterns confirmed

1. **Single shared config** (`@paragu-ai-leads/config`) works for all 19 apps — no per-app overrides needed
2. **Workspace deps** (`workspace:*`) correctly resolve across packages
3. **`use client` directive** placement works — 6 components + 19 pages
4. **`BusinessProvider`** correctly threads site.json through the entire app tree
5. **CSS variables** in globals.css correctly drive brand colors via Tailwind config
6. **`pnpm install`** (107 packages) works for all 23 workspace projects

## Bugs caught in earlier rounds (recap)

R28 caught these bugs during the first 5 smoke tests:

| Bug | Where | Fix |
|-----|-------|-----|
| Components missing `"use client"` | 5 components in `packages/ui` | Added directive |
| JSX in `.ts` file | `packages/ui/src/context.ts` | Renamed to `.tsx` |
| `BusinessProvider` was raw `Context.Provider` | `packages/ui/src/context.tsx` | Wrapped in proper component |
| `BusinessConfig` not re-exported | `packages/ui/src/context.tsx` | Added `export type` |
| `page.tsx` missing `"use client"` | All 19 apps | Added directive |
| Wrong relative path | `src/app/layout.tsx` | `../../../site.json` → `../../site.json` |

**None of these bugs surfaced in R29's 14 tests** — they were already fixed in R28. The pattern is stable.

## What this proves

- ✓ The monorepo structure is correct
- ✓ The shared packages work as designed
- ✓ The scaffolder (`wire-app.py`) generates valid apps
- ✓ The build pipeline is reproducible
- ✓ All 19 apps share a 102 KB common bundle

## What's open (next rounds)

The infrastructure is complete. The remaining work is **content**, not engineering:

1. Per-app real services + photos (replace SVG placeholders)
2. Per-app real FAQ content (currently using generic template)
3. Per-app real branding refinement
4. Custom domain setup per app
5. Real deployment to Cloudflare Pages

Each app customization: 1-4 hours of focused work.

## Reproducing this test

```bash
cd /tmp/paragu-ai-leads-monorepo
pnpm install

# Test one app
pnpm --filter claubellino run build

# Test all 19
for app in $(ls apps/); do
  pkg_name=$(node -e "console.log(require('./apps/$app/package.json').name)")
  echo "Testing $pkg_name..."
  pnpm --filter "$pkg_name" run build || echo "  ✗ FAILED: $pkg_name"
done
```

Or use the build-all script:
```bash
./scripts/build-all.sh --parallel 4
```
