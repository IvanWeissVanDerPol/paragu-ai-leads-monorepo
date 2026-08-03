import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBusiness } from "../hooks/useBusiness";
import type { Lang } from "../types";

const ICONS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6",
  services: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  booking: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
  blog: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
};

const LABELS = {
  es: { home: "Inicio", services: "Servicios", booking: "Reservar", blog: "Blog" },
  en: { home: "Home", services: "Services", booking: "Book", blog: "Blog" },
  pt: { home: "Início", services: "Serviços", booking: "Reservar", blog: "Blog" },
};

export function BottomNav({ lang = "es" as Lang }) {
  const pathname = usePathname();
  const business = useBusiness();

  if (pathname?.startsWith("/admin")) return null;

  const labels = LABELS[lang];
  const waText = encodeURIComponent("Hola! Quiero información sobre servicios");

  const items = [
    { label: labels.home, href: `/${lang}`, icon: ICONS.home },
    { label: labels.services, href: `/${lang}/servicios`, icon: ICONS.services },
    { label: labels.booking, href: `/${lang}/booking`, icon: ICONS.booking },
    { label: labels.blog, href: `/${lang}/blog`, icon: ICONS.blog },
    {
      label: "WhatsApp",
      href: `https://wa.me/${business.whatsapp}?text=${waText}`,
      icon: ICONS.blog,
      external: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-foreground-muted hover:text-primary transition-colors min-w-0 px-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="text-[10px] mt-0.5 truncate">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center text-foreground-muted hover:text-primary transition-colors min-w-0 px-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="text-[10px] mt-0.5 truncate">{item.label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
