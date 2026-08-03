"use client"
import { useBusiness, BottomNav, ShareWhatsApp, EmptyState } from "@paragu-ai-leads/ui";

export default function Home() {
  const business = useBusiness();

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {business.name}
          </h1>
          <p className="text-xl text-foreground-muted mb-8">
            {business.tagline || `Local business in ${business.city}, Paraguay`}
          </p>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Acerca de nosotros</h2>
          <p className="text-foreground-muted">{business.description}</p>

          {business.address && (
            <p className="text-foreground-muted mt-2">
              📍 {business.address}, {business.city}
            </p>
          )}

          <div className="mt-6">
            <ShareWhatsApp title={business.name} />
          </div>
        </div>
      </section>

      {/* Empty state placeholder for services (filled in later) */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Servicios</h2>
          <EmptyState
            title="Servicios próximamente"
            description="Estamos actualizando esta sección con información detallada sobre nuestros servicios."
            icon="🛠️"
          />
        </div>
      </section>

      {/* Mobile bottom nav */}
      <BottomNav lang="es" />
    </main>
  );
}
