#!/usr/bin/env bash
# status.sh - quick health check for all apps + shared packages
set -euo pipefail

MONOREPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPS_DIR="$MONOREPO/apps"
PACKAGES_DIR="$MONOREPO/packages"

echo "═══════════════════════════════════════"
echo "  ParaguAI Leads Monorepo — Status"
echo "═══════════════════════════════════════"
echo

echo "Shared packages:"
for pkg in "$PACKAGES_DIR"/*/; do
  name=$(basename "$pkg")
  if [ -f "$pkg/package.json" ]; then
    version=$(node -e "console.log(require('$pkg/package.json').version)")
    echo "  ✓ $name@$version"
  fi
done

echo
echo "Apps (count: $(ls -1 "$APPS_DIR" | wc -l)):"
for app in "$APPS_DIR"/*/; do
  name=$(basename "$app")
  if [ -f "$app/package.json" ] && [ -f "$app/site.json" ]; then
    site_name=$(node -e "console.log(require('$app/site.json').name || '?')" 2>/dev/null || echo "?")
    domain=$(node -e "console.log(require('$app/site.json').domain || '')" 2>/dev/null || echo "")
    echo "  ✓ $name → $site_name ($domain)"
  else
    echo "  ⚠ $name (missing package.json or site.json)"
  fi
done

echo
echo "Last commit: $(git -C "$MONOREPO" log -1 --oneline 2>/dev/null || echo "no commits")"
echo
