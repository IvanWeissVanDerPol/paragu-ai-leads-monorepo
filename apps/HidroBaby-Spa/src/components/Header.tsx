'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface NavItem {
  label: string;
  href: string;
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Header({ navigation }: { navigation?: { items?: NavItem[]; businessName?: string; ctaText?: string; ctaHref?: string } }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = navigation?.items?.length ? navigation.items : DEFAULT_NAV;
  const businessName = navigation?.businessName || 'Estudio Medieval';
  const ctaText = navigation?.ctaText || 'Reservar turno';
  const ctaHref = navigation?.ctaHref || 'https://wa.me/595961482854?text=Hola!%20Quiero%20reservar%20un%20turno';

  // Only render portal after mount to avoid SSR mismatch
  if (typeof window !== 'undefined') {
    if (!mounted) setMounted(true);
  }

  return (
    <>
      {/* Desktop nav */}
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="font-display text-xl text-white tracking-wider">{businessName}</span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-6">
              {items.map((item) => (
                <Link key={item.href} href={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors no-underline font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <a href={ctaHref} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-accent/90 transition-all no-underline">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              {ctaText}
            </a>

            {/* Mobile hamburger */}
            <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-secondary border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {items.map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-white/80 hover:text-white py-2 text-sm no-underline"
                  onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <a href={ctaHref} target="_blank" rel="noopener noreferrer"
                className="block bg-accent text-white text-center font-semibold py-3 rounded-lg mt-4 no-underline">
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* WhatsApp floating button */}
      {mounted && createPortal(
        <a href={ctaHref} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center gap-2 no-underline"
          style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.5)' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </a>,
        document.body
      )}
    </>
  );
}