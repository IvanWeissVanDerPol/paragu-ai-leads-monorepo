# Migration to Monorepo

**Date**: 2026-08-03
**Round**: R26

## What changed

19 separate GitHub repos for ParaguAI lead sites → 1 monorepo with 19 `apps/`.

### Before

- IvanWeissVanDerPol/HidroBaby-Spa (independent repo)
- IvanWeissVanDerPol/Peluqueria-Barbershop
- ... (17 more)

### After

IvanWeissVanDerPol/paragu-ai-leads-monorepo/apps/<client-name>/

## Why

1. **Maintenance cost**: 19 separate `package.json` files needed 19 separate Next.js upgrades, Tailwind upgrades, ESLint upgrades. With monorepo: upgrade once.

2. **CI/CD**: 19 pipelines → 1 pipeline.

3. **Shared components**: A "Book Now" widget would be added 19 times before. Now: add once to `packages/ui/`, available everywhere.

4. **Dependency management**: 19 `node_modules` folders (each ~300 MB) → 1 root `node_modules` with shared dependencies.

## Migration steps

1. Created `paragu-ai-leads-monorepo` (this repo)
2. For each old repo: copied files into `apps/<client-name>/`, preserved git history via filter-branch
3. Set up shared `packages/ui` + `packages/config`
4. Archived the 19 old repos

## Old repos (now archived)

- HidroBaby-Spa → apps/HidroBaby-Spa/
- Peluqueria-Barbershop → apps/Peluqueria-Barbershop/
- Clau-Bellino → apps/Clau-Bellino/
- Woman-Cosmeticos → apps/Woman-Cosmeticos/
- Barbershop-Peluqueria → apps/Barbershop-Peluqueria/
- Avani-Belleza → apps/Avani-Belleza/
- Scott-Tatuajes → apps/Scott-Tatuajes/
- Lele-Ferreira → apps/Lele-Ferreira/
- XXGym → apps/XXGym/
- Portas-Barber → apps/Portas-Barber/
- Viviesteticpy → apps/Viviesteticpy/
- Cronos-Academy → apps/Cronos-Academy/
- Arnos-Barber-Shop → apps/Arnos-Barber-Shop/
- Nde-Barba → apps/Nde-Barba/
- Barbye-Nails → apps/Barbye-Nails/
- Nutrifit-Spa → apps/Nutrifit-Spa/
- Leticia-Carballo → apps/Leticia-Carballo/
- Shine-Nails → apps/Shine-Nails/
- Estudio-Medieval → apps/Estudio-Medieval/

## Rollback plan

If needed, each old repo can be un-archived and the contents extracted back to its standalone repo. History is preserved.
