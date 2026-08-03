#!/usr/bin/env bash
# build-all.sh - build all 19 apps in sequence
# Usage: ./scripts/build-all.sh [--parallel N]
set -euo pipefail

MONOREPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPS_DIR="$MONOREPO/apps"

PARALLEL=1
if [ "${1:-}" = "--parallel" ] && [ -n "${2:-}" ]; then
  PARALLEL=$2
fi

apps=()
for app in "$APPS_DIR"/*/; do
  [ -f "$app/package.json" ] && apps+=("$(basename "$app")")
done

total=${#apps[@]}
echo "→ Building $total apps (parallel=$PARALLEL)"
echo

failures=()
start_time=$(date +%s)

if [ "$PARALLEL" = "1" ]; then
  # Sequential build (easier to read)
  i=0
  for app in "${apps[@]}"; do
    i=$((i+1))
    echo "[$i/$total] Building $app..."
    cd "$APPS_DIR/$app"
    if pnpm build > "/tmp/build-$app.log" 2>&1; then
      echo "  ✓ $app"
    else
      echo "  ✗ $app (log: /tmp/build-$app.log)"
      failures+=("$app")
    fi
  done
else
  # Parallel build
  for app in "${apps[@]}"; do
    (
      cd "$APPS_DIR/$app"
      if pnpm build > "/tmp/build-$app.log" 2>&1; then
        echo "  ✓ $app"
      else
        echo "  ✗ $app (log: /tmp/build-$app.log)"
        echo "$app" >> /tmp/build-failures.txt
      fi
    ) &
    # Limit concurrent builds
    if [ $(jobs -r | wc -l) -ge "$PARALLEL" ]; then
      wait -n
    fi
  done
  wait
fi

end_time=$(date +%s)
duration=$((end_time - start_time))

echo
echo "================================"
echo "Build complete in ${duration}s"
echo "Built: $total apps"
if [ ${#failures[@]} -gt 0 ]; then
  echo "Failed: ${#failures[@]}"
  printf "  - %s\n" "${failures[@]}"
  exit 1
fi
echo "All apps built successfully."
