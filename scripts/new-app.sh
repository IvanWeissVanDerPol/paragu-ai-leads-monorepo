#!/usr/bin/env bash
# new-app.sh - scaffold a new app from the HidroBaby-Spa template
# Usage: ./scripts/new-app.sh <app-name> "<business-name>" <messaging-number>
set -euo pipefail

MONOREPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPS_DIR="$MONOREPO/apps"

APP_NAME="${1:?usage: new-app.sh <app-name> <business-name> <messaging>}"
BIZ_NAME="${2:?usage: new-app.sh <app-name> <business-name> <messaging>}"
MESSAGING="${3:?usage: new-app.sh <app-name> <business-name> <messaging>}"

TEMPLATE="$APPS_DIR/HidroBaby-Spa"
TARGET="$APPS_DIR/$APP_NAME"

if [ -d "$TARGET" ]; then
  echo "✗ App already exists: $APP_NAME"
  exit 1
fi

echo "→ Creating $APP_NAME from HidroBaby-Spa template"
cp -r "$TEMPLATE" "$TARGET"

# Clean up template-specific files
rm -rf "$TARGET/.next" "$TARGET/node_modules" "$TARGET/.git" 2>/dev/null || true

# Update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$TARGET/package.json'));
pkg.name = '$APP_NAME'.toLowerCase();
pkg.description = '$BIZ_NAME - ParaguAI lead site';
fs.writeFileSync('$TARGET/package.json', JSON.stringify(pkg, null, 2));
"

# Update site.json
node -e "
const fs = require('fs');
const site = JSON.parse(fs.readFileSync('$TARGET/site.json'));
site.name = '$BIZ_NAME';
site.shortName = '$BIZ_NAME';
site.tagline = '';
site.messaging = '$MESSAGING';
fs.writeFileSync('$TARGET/site.json', JSON.stringify(site, null, 2));
"

echo "✓ Created $TARGET"
echo
echo "Next steps:"
echo "  1. Edit $TARGET/site.json with the business's actual details"
echo "  2. Update $TARGET/src/app/globals.css with brand colors"
echo "  3. Replace placeholder content in $TARGET/content/"
echo "  4. Run: cd $TARGET && pnpm dev"
