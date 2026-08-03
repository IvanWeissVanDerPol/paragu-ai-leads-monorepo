#!/usr/bin/env python3
"""
wire-app.py — R28-2: Automate wiring a brief-only app to use shared packages.

Given a brief-only app (just README.md + WEBSITE_BRIEF.md), this script:
1. Reads the WEBSITE_BRIEF.md to extract business info
2. Reads site.json (if present) for canonical business config
3. Creates a full Next.js app structure using shared packages
4. Generates site.json from extracted info
5. Generates minimal globals.css with brand colors
6. Adds the app to pnpm-workspace

Usage:
    python3 wire-app.py <app-name>
    python3 wire-app.py --all          # wire all 18 brief-only apps
"""

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from datetime import date


MONOREPO = Path("/tmp/paragu-ai-leads-monorepo")
TEMPLATE_APP = MONOREPO / "apps" / "HidroBaby-Spa"
APPS_DIR = MONOREPO / "apps"
PACKAGES_UI = MONOREPO / "packages" / "ui"
PACKAGES_CONFIG = MONOREPO / "packages" / "config"


def slugify(name: str) -> str:
    """Convert 'Clau-Bellino' → 'claubellino' (for npm package names)."""
    return re.sub(r"[^a-z0-9]+", "", name.lower())


def extract_business_info(brief_path: Path) -> dict:
    """Extract business info from WEBSITE_BRIEF.md."""
    if not brief_path.exists():
        return {}

    text = brief_path.read_text()
    info = {}

    # Try to extract business name (H1 title)
    name_match = re.search(r"^#\s+(.+?)\s*[—–-]\s*Website Brief", text, re.MULTILINE)
    if name_match:
        info["businessName"] = name_match.group(1).strip()

    # Phone
    phone_match = re.search(r"\*\*Phone\*\*\s*\|\s*(\+?[\d\s\-\(\)]+)", text)
    if phone_match:
        info["phone"] = phone_match.group(1).strip()

    # WhatsApp number (digits only)
    wa_match = re.search(r"wa\.me/(\d+)", text)
    if wa_match:
        info["whatsapp"] = wa_match.group(1)

    # Address
    addr_match = re.search(r"\*\*Address\*\*\s*\|\s*(.+?)$", text, re.MULTILINE)
    if addr_match:
        info["address"] = addr_match.group(1).strip()

    # City
    city_match = re.search(r"\*\*City\*\*\s*\|\s*(.+?)$", text, re.MULTILINE)
    if city_match:
        info["city"] = city_match.group(1).strip()

    # Primary color
    color_match = re.search(r"\*\*Primary Color\*\*\s*\|\s*`?(#[A-Fa-f0-9]{6})`?", text)
    if color_match:
        info["primaryColor"] = color_match.group(1)

    # Secondary color
    sec_match = re.search(r"\*\*Secondary Color\*\*\s*\|\s*`?(#[A-Fa-f0-9]{6})`?", text)
    if sec_match:
        info["secondaryColor"] = sec_match.group(1)

    return info


def make_site_json(app_name: str, brief_info: dict) -> dict:
    """Generate a site.json from extracted info."""
    # Slug for domain
    slug = slugify(app_name)

    site = {
        "vertical": "unknown",
        "country": "Paraguay",
        "domain": f"{slug}.com.py",
        "defaultLocale": "es",
        "locales": ["es"],
        "name": brief_info.get("businessName", app_name),
        "businessName": brief_info.get("businessName", app_name),
        "shortName": brief_info.get("businessName", app_name),
        "tagline": "",
        "phone": brief_info.get("phone", ""),
        "whatsapp": brief_info.get("whatsapp", ""),
        "email": "",
        "address": brief_info.get("address", ""),
        "city": brief_info.get("city", "Asunción"),
        "country": "Paraguay",
        "hours": "",
        "founded": "",
        "instagram": "",
        "facebook": "",
        "url": f"https://{slug}.com.py",
        "description": f"{brief_info.get('businessName', app_name)} — Local business in {brief_info.get('city', 'Asunción')}, Paraguay.",
        "navigation": [
            { "labelKey": "navigation.home", "path": "" },
            { "labelKey": "navigation.services", "path": "servicios" },
            { "labelKey": "navigation.about", "path": "nosotros" },
            { "labelKey": "navigation.contact", "path": "contacto" }
        ],
        "_meta": {
            "extractedFrom": "WEBSITE_BRIEF.md",
            "generatedAt": date.today().isoformat(),
            "generatedBy": "wire-app.py (R28)"
        }
    }
    return site


def make_package_json(app_name: str, brief_info: dict) -> dict:
    """Generate package.json with shared workspace deps."""
    slug = slugify(app_name)
    port = 3002 + (hash(app_name) % 100)  # Stable but distributed ports

    return {
        "name": slug,
        "version": "0.1.0",
        "private": True,
        "description": f"{brief_info.get('businessName', app_name)} - ParaguAI lead site",
        "scripts": {
            "dev": f"next dev -p {port}",
            "build": "next build",
            "start": f"next start -p {port}",
            "lint": "next lint"
        },
        "dependencies": {
            "@paragu-ai-leads/ui": "workspace:*",
            "@paragu-ai-leads/config": "workspace:*",
            "next": "^15.0.0",
            "react": "^19.0.0",
            "react-dom": "^19.0.0"
        },
        "devDependencies": {
            "@types/node": "20.17.6",
            "@types/react": "19.2.15",
            "@types/react-dom": "^19.0.0",
            "autoprefixer": "^10.4.20",
            "@tailwindcss/postcss": "^4.0.0",
            "postcss": "^8.4.49",
            "tailwindcss": "^4.0.0",
            "typescript": "5.8.2"
        }
    }


def make_globals_css(brief_info: dict) -> str:
    """Generate globals.css with brand colors."""
    primary = brief_info.get("primaryColor", "#000000")
    secondary = brief_info.get("secondaryColor", "#666666")

    return f"""@tailwind base;
@tailwind components;
@tailwind utilities;

:root {{
  --color-primary: {primary};
  --color-secondary: {secondary};
  --color-accent: {primary};
  --color-foreground: #1A1A2E;
  --color-foreground-light: #4A4A6A;
  --color-foreground-muted: #8A8AA0;
  --color-background: #FFFFFF;
  --color-card: #FAFAFA;
  --color-border: #E5E5E5;
  --font-sans: "Inter", system-ui, sans-serif;
}}

.dark {{
  --color-foreground: #FAFAFA;
  --color-foreground-light: #C4C4D4;
  --color-foreground-muted: #6C6C75;
  --color-background: #0A0A0B;
  --color-card: #16161A;
  --color-border: #26262C;
}}

html {{
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}}
"""


def wire_app(app_name: str) -> dict:
    """Wire a single brief-only app to use shared packages."""
    app_dir = APPS_DIR / app_name
    if not app_dir.exists():
        return {"status": "skipped", "reason": "directory does not exist", "app": app_name}

    # Skip if already has code
    if (app_dir / "package.json").exists():
        return {"status": "skipped", "reason": "already has package.json", "app": app_name}

    # Extract info from WEBSITE_BRIEF.md
    brief_path = app_dir / "WEBSITE_BRIEF.md"
    brief_info = extract_business_info(brief_path)

    # Generate site.json
    site = make_site_json(app_name, brief_info)
    (app_dir / "site.json").write_text(json.dumps(site, indent=2))

    # Generate package.json
    pkg = make_package_json(app_name, brief_info)
    (app_dir / "package.json").write_text(json.dumps(pkg, indent=2))

    # Generate tsconfig.json (extends shared)
    tsconfig = """{
  "extends": "@paragu-ai-leads/config/tsconfig/nextjs",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next.config.js",
    "src/**/*",
    ".next/types/**/*.ts",
    "../../packages/ui/src/**/*"
  ]
}
"""
    (app_dir / "tsconfig.json").write_text(tsconfig)

    # Generate next.config.js
    next_config = """const sharedConfig = require("@paragu-ai-leads/config/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...sharedConfig,
};

module.exports = nextConfig;
"""
    (app_dir / "next.config.js").write_text(next_config)

    # Generate tailwind.config.js
    tailwind_config = """const sharedTailwind = require("@paragu-ai-leads/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedTailwind,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ...sharedTailwind.content,
  ],
};
"""
    (app_dir / "tailwind.config.js").write_text(tailwind_config)

    # Generate postcss.config.js
    (app_dir / "postcss.config.js").write_text('module.exports = require("@paragu-ai-leads/config/postcss");\n')

    # Create src/app/ structure with minimal landing page using shared components
    src_app = app_dir / "src" / "app"
    src_app.mkdir(parents=True, exist_ok=True)

    # globals.css
    (src_app / "globals.css").write_text(make_globals_css(brief_info))

    # layout.tsx
    layout = """import "./globals.css";
import { BusinessProvider } from "@paragu-ai-leads/ui";
import siteConfig from "../../site.json";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.defaultLocale}>
      <body className="bg-background text-foreground">
        <BusinessProvider config={siteConfig}>{children}</BusinessProvider>
      </body>
    </html>
  );
}
"""
    (src_app / "layout.tsx").write_text(layout)

    # page.tsx — minimal landing page using shared components
    page = """'use client';
import { useBusiness, BottomNav, ShareWhatsApp, EmptyState } from "@paragu-ai-leads/ui";

export default function Home() {
  const business = useBusiness();

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {business.name}
          </h1>
          <p className="text-xl text-foreground-muted mb-8">
            {business.tagline || `Local business in ${business.city}, Paraguay`}
          </p>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Acerca de nosotros</h2>
          <p className="text-foreground-muted">{business.description}</p>

          {business.address && (
            <p className="text-foreground-muted mt-2">
              📍 {business.address}, {business.city}
            </p>
          )}

          <div className="mt-6">
            <ShareWhatsApp title={business.name} />
          </div>
        </div>
      </section>

      {/* Empty state placeholder for services (filled in later) */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Servicios</h2>
          <EmptyState
            title="Servicios próximamente"
            description="Estamos actualizando esta sección con información detallada sobre nuestros servicios."
            icon="🛠️"
          />
        </div>
      </section>

      {/* Mobile bottom nav */}
      <BottomNav lang="es" />
    </main>
  );
}
"""
    (src_app / "page.tsx").write_text(page)

    # Empty public/ dir
    (app_dir / "public").mkdir(exist_ok=True)

    # Update README to document the scaffold
    readme = f"""# {app_name}

**{brief_info.get('businessName', app_name)}** — lead site for {brief_info.get('city', 'Asunción')}, Paraguay.

This app was **scaffolded by `wire-app.py` in R28** from a WEBSITE_BRIEF.md. It uses the shared packages from the monorepo.

## What's included

- Next.js 15 + React 19 + TypeScript 5.8
- Shared components from `@paragu-ai-leads/ui`
- Shared configs from `@paragu-ai-leads/config`
- Minimal landing page generated from `WEBSITE_BRIEF.md`

## What's TODO

The scaffold provides a working landing page. To complete this app:

1. **Replace placeholder content** — add real services, photos, prices in `src/app/page.tsx`
2. **Brand colors** — verify the colors in `src/app/globals.css` match the business
3. **Add real sections** — copy from HidroBaby-Spa (Faq, Galeria, etc.) as needed
4. **Add a domain** — set the `domain` in `site.json` to the actual domain
5. **Run locally** — `pnpm dev` from this directory, or `./scripts/dev.sh {app_name}` from monorepo root

## Source

- WEBSITE_BRIEF.md (kept for reference)
- site.json (generated)

## Status

🚧 **Lead scaffold** — needs design + content work before launch.
"""
    (app_dir / "README.md").write_text(readme)

    return {
        "status": "wired",
        "app": app_name,
        "files_created": [
            "site.json", "package.json", "tsconfig.json",
            "next.config.js", "tailwind.config.js", "postcss.config.js",
            "src/app/globals.css", "src/app/layout.tsx", "src/app/page.tsx",
            "README.md"
        ],
        "extracted_info": brief_info,
    }


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 wire-app.py <app-name> | --all")
        sys.exit(1)

    if sys.argv[1] == "--all":
        # Wire all brief-only apps
        apps_to_wire = []
        for app_dir in sorted(APPS_DIR.iterdir()):
            if not app_dir.is_dir():
                continue
            name = app_dir.name
            if name == "HidroBaby-Spa":
                continue  # already wired
            if (app_dir / "package.json").exists():
                continue  # already wired
            apps_to_wire.append(name)

        print(f"Wiring {len(apps_to_wire)} apps...")
        print()
        results = []
        for app_name in apps_to_wire:
            result = wire_app(app_name)
            status_icon = "✓" if result["status"] == "wired" else "✗"
            print(f"  {status_icon} {app_name:25} {result['status']}")
            results.append(result)

        # Summary
        wired = sum(1 for r in results if r["status"] == "wired")
        skipped = sum(1 for r in results if r["status"] == "skipped")
        print()
        print(f"Wired: {wired}")
        print(f"Skipped: {skipped}")
    else:
        app_name = sys.argv[1]
        result = wire_app(app_name)
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
