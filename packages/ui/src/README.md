# @paragu-ai-leads/ui

**Shared UI components for all 19 ParaguAI lead sites.**

Replaces the per-site `components/` directories with one canonical package. Updated once → affects all sites.

## What's included

| Component | Purpose | Used by |
|-----------|---------|---------|
| `BottomNav` | Mobile bottom navigation with Messaging shortcut | All sites |
| `ShareMessaging` | Messaging share button using site config | All sites |
| `PromoCarousel` | Rotating promotions banner | Sites with promos |
| `DarkModeToggle` | Light/dark mode toggle | All sites |
| `EmptyState` | Empty list/message placeholder | All sites |
| `LoadingBar` | Top-of-page progress bar | All sites |

## Usage

```tsx
// In your site layout (src/app/layout.tsx)
import { BusinessProvider } from "@paragu-ai-leads/ui";
import { BusinessConfig } from "@paragu-ai-leads/ui";

// site.json is per-app, lives in apps/<name>/site.json
import siteJson from "../../site.json";

export default function RootLayout({ children }) {
  return (
    <BusinessProvider config={siteJson}>
      {children}
    </BusinessProvider>
  );
}
```

```tsx
// In a component
import { BottomNav, ShareMessaging, useBusiness } from "@paragu-ai-leads/ui";

export function MyPage() {
  const business = useBusiness();  // typed BusinessConfig
  return (
    <>
      <BottomNav lang="es" />
      <main>
        <ShareMessaging title="Check this out" />
      </main>
    </>
  );
}
```

## Versioning

The package is versioned with the monorepo. Bumping `@paragu-ai-leads/ui` from 1.0.0 → 1.1.0 means a new component was added or a breaking change was made.

Apps reference `@paragu-ai-leads/ui@^1.0.0` which auto-updates on minor versions.
