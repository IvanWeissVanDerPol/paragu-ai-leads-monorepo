import "./globals.css";
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
