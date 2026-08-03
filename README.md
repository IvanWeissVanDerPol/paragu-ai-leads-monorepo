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
