#!/usr/bin/env bash
# ============================================================
# scripts/deploy.sh — Deploy a ParaguAI lead site to Cloudflare Pages
# ============================================================
#
# Prerequisites:
#   1. npm install -g wrangler  (already installed: /usr/bin/wrangler)
#   2. wrangler login            (one-time, opens browser)
#   3. CLOUDFLARE_API_TOKEN env var (or use 'wrangler login' instead)
#
# Usage:
#   ./scripts/deploy.sh <app-name> [--env production]
#   ./scripts/deploy.sh Clau-Bellino
#   ./scripts/deploy.sh XXGym --env preview
#
# What it does:
#   1. pnpm build (Next.js with output: 'export')
#   2. Generate wrangler.toml from template + site.json
#   3. wrangler pages deploy ./out --project-name=<slug>
#
# ============================================================

set -euo pipefail

# --- Args ------------------------------------------------------------
APP_NAME="${1:-}"
if [[ -z "$APP_NAME" ]]; then
  echo "Usage: $0 <app-name> [--env production|preview]"
  echo ""
  echo "Available apps:"
  monorepo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  for app in "$monorepo_root"/apps/*/; do
    name=$(basename "$app")
    [[ -f "$app/site.json" ]] && echo "  - $name"
  done | sort
  exit 1
fi
ENV_TARGET="${3:-production}"  # default to production

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APP_DIR="$MONOREPO_ROOT/apps/$APP_NAME"
SITE_JSON="$APP_DIR/site.json"
WRANGLER_TEMPLATE="$SCRIPT_DIR/wrangler.toml.template"

# --- Pre-flight ------------------------------------------------------
if [[ ! -d "$APP_DIR" ]]; then
  echo "❌ App not found: $APP_DIR"
  exit 1
fi
if [[ ! -f "$SITE_JSON" ]]; then
  echo "❌ site.json not found in $APP_DIR"
  exit 1
fi
if ! command -v wrangler >/dev/null 2>&1; then
  echo "❌ wrangler not installed. Run: npm install -g wrangler"
  exit 1
fi

echo "→ Deploying $APP_NAME to Cloudflare Pages (env: $ENV_TARGET)"

# --- Step 1: Inject output: 'export' into next.config.js (if missing)
NEXT_CONFIG="$APP_DIR/next.config.js"
if [[ -f "$NEXT_CONFIG" ]] && ! grep -q "output:.*'export'" "$NEXT_CONFIG"; then
  echo "→ Patching next.config.js with output: 'export'..."
  python3 << PYEOF
from pathlib import Path
import re
p = Path("$NEXT_CONFIG")
content = p.read_text()

# Idempotent: skip if already has output: 'export'
if "output:" in content and "export" in content:
    print("  → Already has output: 'export'")
else:
    # Detect if config is spread (e.g., ...sharedConfig) vs object literal
    if "\.\.\." in content:
        # Spread pattern: const nextConfig = { ...sharedConfig, output: 'export', images: { unoptimized: true } }
        content = re.sub(
            r"(\.\.\.\w+,?\s*\n?\s*)(\})",
            r"\1  output: 'export',\n  images: { unoptimized: true },\n  trailingSlash: true,\n\2",
            content,
            count=1,
        )
    else:
        # Object literal pattern
        content = re.sub(
            r"(const nextConfig = \{[^}]*?)\n(\})",
            r"\1\n  output: 'export',\n  images: { unoptimized: true },\n  trailingSlash: true,\n\2",
            content,
            count=1,
        )
    p.write_text(content)
    print(f"  ✓ Patched {p}")
PYEOF
fi

# --- Step 2: Build the app ------------------------------------------
echo "→ Building $APP_NAME..."
cd "$APP_DIR"
pnpm run build 2>&1 | tail -10
if [[ ! -d "$APP_DIR/out" ]]; then
  echo "❌ Build did not produce ./out — check next.config.js has output: 'export'"
  exit 1
fi

# --- Step 3: Generate wrangler.toml from template + site.json --------
PROJECT_SLUG=$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
echo "→ Project slug: $PROJECT_SLUG"

WRANGLER_FILE="$APP_DIR/wrangler.toml"
python3 << PYEOF
import json
from pathlib import Path

site = json.loads(Path("$SITE_JSON").read_text())
template = Path("$WRANGLER_TEMPLATE").read_text()

# Substitute placeholders
content = template.replace("REPLACE_WITH_APP_SLUG", "$PROJECT_SLUG")
content = content.replace("REPLACE_WITH_BUSINESS_NAME", site.get("businessName", site.get("name", "")))
content = content.replace("REPLACE_WITH_MESSAGING", site.get("messaging", ""))

# Add custom domain routes if site.json has a domain
domain = site.get("domain", "")
if domain:
    # Insert custom_domain block before [vars]
    routes_block = f'\n[[env.production.routes]]\npattern = "{domain}/*"\ncustom_domain = true\n\n'
    content = content.replace("[vars]", routes_block + "[vars]")

Path("$WRANGLER_FILE").write_text(content)
print(f"  ✓ Generated {Path('$WRANGLER_FILE')}")
PYEOF

# --- Step 4: Deploy to Cloudflare Pages ------------------------------
# Check for --dry-run or env DRY_RUN
DRY_RUN="${DRY_RUN:-}"
for arg in "$@"; do
  [[ "$arg" == "--dry-run" ]] && DRY_RUN="1"
done

echo ""
if [[ -n "$DRY_RUN" ]]; then
  echo "🔍 DRY RUN — skipping actual deploy"
else
  echo "→ Deploying to Cloudflare Pages..."
fi

cd "$APP_DIR"

if [[ "$ENV_TARGET" == "preview" ]]; then
  DEPLOY_CMD="wrangler pages deploy ./out --project-name=$PROJECT_SLUG --branch=preview"
else
  DEPLOY_CMD="wrangler pages deploy ./out --project-name=$PROJECT_SLUG"
fi

echo "  $ $DEPLOY_CMD"
if [[ -n "$DRY_RUN" ]]; then
  echo ""
  echo "  [DRY-RUN] Would execute: $DEPLOY_CMD"
  echo ""
  echo "  ✓ Build artifact ready at: $APP_DIR/out"
  echo "  ✓ Wrangler config ready at: $APP_DIR/wrangler.toml"
  echo "  ✓ Run without --dry-run to actually deploy"
else
  eval "$DEPLOY_CMD"
fi

echo ""
echo "✅ Deploy complete!"
echo ""
echo "🔗 Next steps:"
echo "  1. Go to https://dash.cloudflare.com → Pages → $PROJECT_SLUG"
echo "  2. Set up custom domain if configured in site.json"
echo "  3. Verify the deployment URL works"
