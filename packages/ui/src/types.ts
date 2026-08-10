// Shared types for ParaguAI lead sites

export type Lang = "es" | "en" | "pt";

export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  messaging: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  hours?: string;
  founded?: string;
  instagram?: string;
  facebook?: string;
  url?: string;
  description?: string;
  logo?: string;
}

export interface NavItem {
  labelKey: string;
  path: string;
}

export interface Promotion {
  badge?: string;
  title: string;
  subtitle?: string;
  href?: string;
}
