"use client";
// Business context for ParaguAI lead sites
import { createContext, type ReactNode } from "react";
import type { BusinessConfig } from "./types";

export const BusinessContext = createContext<BusinessConfig | null>(null);
export type { BusinessConfig };

interface BusinessProviderProps {
  config: BusinessConfig;
  children: ReactNode;
}

/**
 * Wrap your app with this in the root layout:
 *   <BusinessProvider config={siteConfig}>{children}</BusinessProvider>
 */
export function BusinessProvider({ config, children }: BusinessProviderProps) {
  return (
    <BusinessContext.Provider value={config}>
      {children}
    </BusinessContext.Provider>
  );
}
