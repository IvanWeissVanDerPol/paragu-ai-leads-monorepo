#!/usr/bin/env bash
# dev.sh - run any app in dev mode
# Usage: ./scripts/dev.sh [app-name]
#        ./scripts/dev.sh              # lists all apps
set -euo pipefail

APPS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/apps"

list_apps() {
  echo "Available apps:"
  for app in "$APPS_DIR"/*/; do
    [ -f "$app/package.json" ] && echo "  $(basename "$app")"
  done
}

if [ -z "${1:-}" ]; then
  list_apps
  exit 0
fi

APP="$1"
APP_DIR="$APPS_DIR/$APP"

if [ ! -d "$APP_DIR" ]; then
  echo "✗ App not found: $APP"
  list_apps
  exit 1
fi

if [ ! -f "$APP_DIR/package.json" ]; then
  echo "✗ $APP has no package.json"
  exit 1
fi

# Find a free port
PORT="${2:-}"
if [ -z "$PORT" ]; then
  # Try 3002, 3003, ... (3000/3001 reserved for main platform)
  for p in 3002 3003 3004 3005 3006 3007 3008 3009 3010; do
    if ! lsof -i ":$p" -t >/dev/null 2>&1; then
      PORT=$p
      break
    fi
  done
fi

echo "→ Starting $APP on port $PORT"
echo "  (Ctrl+C to stop)"
cd "$APP_DIR"
PORT="$PORT" pnpm dev
