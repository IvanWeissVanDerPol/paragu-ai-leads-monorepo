// @paragu-ai-leads/content
// Shared content, i18n strings, navigation labels, FAQ templates

import es from "./i18n/es.json";
import en from "./i18n/en.json";

export { es, en };
export type Locale = keyof typeof translations;
export const translations = { es, en };

export function t(locale: Locale, key: string): string {
  const parts = key.split(".");
  let value: any = translations[locale];
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = value[part];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}

export function getNavigation(locale: Locale) {
  return translations[locale]?.navigation || translations.es.navigation;
}
