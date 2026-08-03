import { useState, useEffect } from "react";
import Link from "next/link";
import type { Lang } from "../types";

export interface Promotion {
  badge?: string;
  title: string;
  subtitle?: string;
  href?: string;
}

const ICONS = ["🎉", "✨", "🔥", "💅", "🌟"];

export function PromoCarousel({
  promotions,
  lang = "es" as Lang,
}: {
  promotions: Promotion[];
  lang?: Lang;
}) {
  const [idx, setIdx] = useState(0);
  const len = promotions.length;

  useEffect(() => {
    if (len < 2) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % len), 5000);
    return () => clearInterval(timer);
  }, [len]);

  if (len === 0) return null;

  const promo = promotions[idx];
  const label = lang === "en" ? "View offers" : lang === "pt" ? "Ver ofertas" : "Ver ofertas";

  return (
    <div className="bg-primary/5 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-xl shrink-0">{ICONS[idx % ICONS.length]}</span>
          <div className="min-w-0 flex-1">
            {promo.badge && (
              <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full mr-1.5 align-middle">
                {promo.badge}
              </span>
            )}
            <span className="text-sm font-medium text-foreground align-middle">{promo.title}</span>
            {promo.subtitle && (
              <span className="hidden sm:inline text-xs text-foreground-muted ml-2 align-middle">
                {promo.subtitle}
              </span>
            )}
          </div>
        </div>
        {promo.href && (
          <Link
            href={promo.href}
            className="text-xs font-bold text-primary hover:underline shrink-0"
          >
            {label} →
          </Link>
        )}
      </div>
    </div>
  );
}
