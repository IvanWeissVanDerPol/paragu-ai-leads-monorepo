# ParaguAI Leads Monorepo

**Single repo containing all ParaguAI.com lead demo sites.**

This monorepo replaces the previous pattern of one-repo-per-lead (19 separate repos). Migration happened in R26 (August 2026).

## Structure

```
paragu-ai-leads-monorepo/
├── apps/
│   ├── HidroBaby-Spa/
│   ├── Peluqueria-Barbershop/
│   ├── Clau-Bellino/
│   ├── ... (19 apps total)
├── packages/
│   ├── ui/           # Shared React components
│   ├── config/       # Shared Tailwind, ESLint, TypeScript config
├── scripts/
│   ├── dev.sh        # Run any app locally
│   ├── build-all.sh  # Build all apps
│   ├── deploy-all.sh # Deploy all apps
├── docs/
│   ├── MIGRATION.md  # How we got here
│   ├── ARCHITECTURE.md
```

## Apps

19 client-specific lead sites, each in its own directory under `apps/`:

| App | Client | Status |
|-----|--------|--------|
| HidroBaby-Spa | HidroBaby Spa | Migrated from separate repo |
| Peluqueria-Barbershop | Peluquería Barbershop | Migrated |
| Clau-Bellino | Clau Bellino | Migrated |
| ... (16 more) | | |

## Quick start

```bash
# Install deps for all apps
pnpm install

# Run any app locally
pnpm --filter hidrobaby-spa dev

# Build all apps
pnpm -r build

# Deploy all apps
./scripts/deploy-all.sh
```

## Migration history

Before R26 (August 2026), each lead site had its own GitHub repo:
- 19 separate `package.json` files
- 19 separate CI/CD pipelines
- 19 separate Tailwind/Next.js configs
- 19 separate secret rotations

After R26:
- 1 monorepo
- 1 shared `packages/ui` component library
- 1 `packages/config` (Tailwind + ESLint + TS)
- 1 CI/CD pipeline
- 1 secret rotation

## Adding a new lead site

```bash
mkdir apps/NewClient-Name
# Copy template from apps/HidroBaby-Spa/
# Update content, brand, package.json name
# Commit
```

## See also

- `paragu-ai-platform` (the main ParaguAI production repo)
- `paragu-ai-website` (the public-facing site)
- `ParaguAI-leads` (the CRM for tracking these leads)

## Monorepo structure

```
paragu-ai-leads-monorepo/
├── apps/                              # 19 client lead sites
│   ├── HidroBaby-Spa/                 # Most-developed app (template)
│   ├── Peluqueria-Barbershop/
│   ├── ... (17 more)
├── packages/                          # Shared code (NEW in R27)
│   ├── ui/                            # @paragu-ai-leads/ui
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── BottomNav.tsx
│   │   │   │   ├── ShareWhatsApp.tsx
│   │   │   │   ├── PromoCarousel.tsx
│   │   │   │   ├── DarkModeToggle.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── LoadingBar.tsx
│   │   │   ├── hooks/
│   │   │   ├── context.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── config/                        # @paragu-ai-leads/config
│       ├── tsconfig/                  # base + nextjs presets
│       ├── tailwind/                  # default.js
│       ├── next/                      # default.config.js
│       ├── postcss.config.js
│       ├── eslint/.eslintrc.json
│       └── package.json
├── scripts/                           # DevOps (NEW in R27)
│   ├── dev.sh                         # Run any app
│   ├── build-all.sh                   # Build all 19
│   ├── deploy-all.sh                  # Deploy all 19
│   ├── new-app.sh                     # Scaffold new app
│   └── status.sh                      # Quick health check
├── .github/workflows/                 # CI/CD (NEW in R27)
│   ├── ci.yml                         # Lint + typecheck + 19-app matrix
│   ├── deploy.yml                     # Deploy to Cloudflare Pages
│   └── dependabot.yml                  # Auto-update deps
├── package.json                       # Root: scripts + workspace config
├── pnpm-workspace.yaml                # Workspace config
└── docs/                              # Architecture, MIGRATION
```

## Daily workflow

```bash
# Bootstrap (one-time)
pnpm install

# Run any app locally
./scripts/dev.sh HidroBaby-Spa    # http://localhost:3002
./scripts/dev.sh                  # lists all 19 apps

# Build everything
pnpm build                         # = ./scripts/build-all.sh

# Deploy
pnpm deploy                        # = ./scripts/deploy-all.sh

# Check health
pnpm status                       # = ./scripts/status.sh

# Add a new lead site
./scripts/new-app.sh NewClient "Business Name" 595XXXXXXXX
```

## CI/CD

| Event | Workflow | Action |
|-------|----------|--------|
| PR / push to main | `ci.yml` | Lint + typecheck + 19-app build matrix |
| Push to main | `deploy.yml` | Auto-deploy all 19 apps to Cloudflare Pages |
| Weekly | `dependabot.yml` | Auto-PR for npm updates |

The **single pipeline replaces 19 separate pipelines** — one CI run builds all sites, one deploy pushes all of them.


## Smoke Test Status

✅ **All 19 apps build successfully** (verified R29, 2026-08-03).

See [docs/SMOKE_TEST_RESULTS.md](docs/SMOKE_TEST_RESULTS.md) for the full per-app build report.
