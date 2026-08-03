#!/usr/bin/env bash
# deploy-all.sh - deploy all 19 apps
# Reads deploy target from each app's site.json → deploys via wrangler (Cloudflare Pages)
set -euo pipefail

MONOREPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPS_DIR="$MONOREPO/apps"

# Check wrangler is installed
if ! command -v wrangler >/dev/null 2>&1; then
  echo "✗ wrangler not installed. Run: npm install -g wrangler"
  exit 1
fi

# Check CLOUDFLARE_API_TOKEN
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "✗ CLOUDFLARE_API_TOKEN not set"
  exit 1
fi

deploy_app() {
  local app="$1"
  local app_dir="$APPS_DIR/$app"
  local site_json="$app_dir/site.json"

  if [ ! -f "$site_json" ]; then
    echo "  ⚠ $app has no site.json, skipping"
    return 1
  fi

  # Extract domain or project_name from site.json
  local project_name=$(node -e "console.log(require('$site_json').domain?.split('.')[0] || '$app'.toLowerCase())" 2>/dev/null || echo "$app")
  local domain=$(node -e "console.log(require('$site_json').domain || '')" 2>/dev/null || echo "")

  echo "  → $app → $project_name ($domain)"

  # Build first
  (cd "$app_dir" && pnpm build > "/tmp/deploy-$app.log" 2>&1) || {
    echo "    ✗ build failed"
    return 1
  }

  # Deploy with wrangler (Cloudflare Pages)
  if (cd "$app_dir" && wrangler pages deploy .next --project-name "$project_name" --commit-dirty=true > "/tmp/deploy-$app.log" 2>&1); then
    echo "    ✓ deployed"
    return 0
  else
    echo "    ✗ wrangler deploy failed (log: /tmp/deploy-$app.log)"
    return 1
  fi
}

echo "→ Deploying all apps to Cloudflare Pages"
echo

apps=()
for app in "$APPS_DIR"/*/; do
  [ -f "$app/package.json" ] && apps+=("$(basename "$app")")
done

total=${#apps[@]}
echo "Found $total apps"
echo

failures=()
successes=0
i=0
for app in "${apps[@]}"; do
  i=$((i+1))
  echo "[$i/$total]"
  if deploy_app "$app"; then
    successes=$((successes + 1))
  else
    failures+=("$app")
  fi
done

echo
echo "================================"
echo "Deploy summary:"
echo "  ✓ Success: $successes/$total"
if [ ${#failures[@]} -gt 0 ]; then
  echo "  ✗ Failed: ${#failures[@]}"
  printf "    - %s\n" "${failures[@]}"
  exit 1
fi
