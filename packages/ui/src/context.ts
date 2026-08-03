// Business context for ParaguAI lead sites
import { createContext } from "react";
import type { BusinessConfig } from "./types";

export const BusinessContext = createContext<BusinessConfig | null>(null);

export const BusinessProvider = BusinessContext.Provider;
