// useBusiness hook - reads business config from the host app
import { useContext } from "react";
import { BusinessConfig, BusinessContext } from "../context";

export function useBusiness(): BusinessConfig {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error(
      "useBusiness must be used within a BusinessProvider. " +
      "Wrap your app with <BusinessProvider config={siteJson}>...</BusinessProvider>"
    );
  }
  return ctx;
}
