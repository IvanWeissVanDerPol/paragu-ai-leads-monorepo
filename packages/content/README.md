# @paragu-ai-leads/content

**Shared i18n strings, navigation labels, FAQ templates for all 19 ParaguAI lead sites.**

## What's included

| File | Purpose |
|------|---------|
| `i18n/es.json` | Spanish translations |
| `i18n/en.json` | English translations |
| `templates/faq.json` | Default FAQ questions/answers |
| `index.ts` | `t(locale, key)` helper + types |

## Usage

```tsx
import { t, getNavigation } from "@paragu-ai-leads/content";

export default function Page() {
  const locale = "es";
  const nav = getNavigation(locale);
  return (
    <>
      <h1>{t(locale, "home.aboutTitle")}</h1>
      <a href="/servicios">{nav.services}</a>
    </>
  );
}
```

## Per-app overrides

Each app can extend the defaults by adding `content/<app>.json`:

```json
{
  "es": {
    "heroTagline": "Spa de día completo en Asunción"
  }
}
```

## Adding translations

1. Add to `i18n/es.json` and `i18n/en.json`
2. Use via `t("es", "path.to.key")`
3. Falls back to the key string if missing
