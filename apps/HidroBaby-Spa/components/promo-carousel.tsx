"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { promotionsData } from "@/lib/config"
import type { Lang } from "@/lib/config"

export function PromoCarousel({ lang = "es" }: { lang?: Lang }) {
  const promotions = promotionsData(lang) ?? []
  const [idx, setIdx] = useState(0)
  const len = promotions.length

  useEffect(() => {
    if (len < 2) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % len), 5000)
    return () => clearInterval(timer)
  }, [len])

  if (len === 0) return null

  const promo = promotions[idx]
  const label = lang === "en" ? "View offers" : "Ver ofertas"
  const icons = ["🎉", "✨", "🔥", "💅", "🌟"]

  return (
    <div className="bg-primary/5 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{icons[idx % icons.length]}</span>
          <div className="min-w-0">
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
        <Link
          href={`/${lang}/ofertas`}
          className="text-xs font-semibold text-secondary hover:underline shrink-0 whitespace-nowrap"
        >
          {label} →
        </Link>
      </div>
      {len > 1 && (
        <div className="flex justify-center gap-1 pb-1">
          {promotions.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-4 bg-secondary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
