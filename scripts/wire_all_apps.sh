#!/usr/bin/env bash
# scripts/wire_all_apps.sh — Wire all 17 remaining scaffolded apps
# R36: Generate content + upgrade page.tsx for each

set -e

MONOREPO="${1:-/tmp/paragu-ai-leads-monorepo}"
APPS=(
  "Arnos-Barber-Shop"
  "Avani-Belleza"
  "Barbershop-Peluqueria"
  "Barbye-Nails"
  "Cronos-Academy"
  "Estudio-Medieval"
  "Lele-Ferreira"
  "Leticia-Carballo"
  "Nde-Barba"
  "Nutrifit-Spa"
  "Peluqueria-Barbershop"
  "Portas-Barber"
  "Scott-Tatuajes"
  "Shine-Nails"
  "Viviesteticpy"
  "Woman-Cosmeticos"
  "XXGym"
)

SUCCESS=0
FAILED=()

for app in "${APPS[@]}"; do
  APP_DIR="$MONOREPO/apps/$app"
  if [ ! -d "$APP_DIR" ]; then
    echo "  ✗ $app: directory not found"
    FAILED+=("$app")
    continue
  fi

  # Generate content
  if python3 "$MONOREPO/scripts/content_writer.py" "$APP_DIR" 2>/dev/null; then
    # Upgrade page.tsx
    cat > "$APP_DIR/src/app/page.tsx" << 'EOF'
import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../../../HidroBaby-Spa/src/components/SectionsRenderer';

async function loadContent(locale: string = 'es') {
  try {
    const contentPath = path.join(process.cwd(), 'content', `${locale}.json`);
    const contentRaw = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(contentRaw);
  } catch (e) {
    console.error('Failed to load content:', e);
    return null;
  }
}

export default async function HomePage() {
  const content = await loadContent('es');
  if (!content) {
    return <main className="p-8">Error: no se pudo cargar el contenido.</main>;
  }
  return <SectionsRenderer content={content} locale="es" />;
}
EOF
    SUCCESS=$((SUCCESS+1))
    echo "  ✓ $app"
  else
    echo "  ✗ $app: content_writer failed"
    FAILED+=("$app")
  fi
done

echo ""
echo "=== Summary ==="
echo "Wired: $SUCCESS of ${#APPS[@]}"
if [ ${#FAILED[@]} -gt 0 ]; then
  echo "Failed: ${FAILED[*]}"
  exit 1
fi
echo "All apps wired successfully ✓"