// Pricing Page - Server Component
import { SectionsRenderer } from '@/components/SectionsRenderer';

export const metadata = {
  title: 'Precios Transparentes | HidroBaby Spa - Fernando de la Mora',
  description: 'Precios claros sin costos ocultos. Spa post vacunas, hidromasaje, fisioterapia infantil y fiestas infantiles. Gs. 60,000-400,000.',
};

export default function PreciosPage() {
  // Read content
  const fs = require('fs');
  const path = require('path');
  const contentPath = path.join(process.cwd(), 'content', 'es.json');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

  return (
    <main>
      <div style={{ 
        background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B82 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          Precios Transparentes
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          maxWidth: '42rem',
          margin: '0 auto',
          opacity: 0.95
        }}>
          Sin costos ocultos. Solo cobramos por lo que recibes.
        </p>
      </div>
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '4rem 2rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {(content?.pricing?.plans || []).map((plan: any, i: number) => (
            <div key={i} style={{
              padding: '2rem',
              background: plan.popular ? '#F7FFF7' : 'white',
              borderRadius: '1rem',
              border: plan.popular ? '3px solid #4ECDC4' : '2px solid #E8F8F5',
              boxShadow: plan.popular ? '0 20px 40px rgba(78, 205, 196, 0.2)' : '0 4px 6px rgba(46, 139, 130, 0.05)',
              position: 'relative'
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: '#4ECDC4',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  Más Popular
                </div>
              )}
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                marginBottom: '0.75rem',
                color: '#2E8B82',
                fontFamily: 'Georgia, serif'
              }}>
                {plan.name}
              </h3>
              <p style={{ 
                color: '#4ECDC4', 
                fontSize: '2rem', 
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                {plan.price}
              </p>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '0.875rem',
                marginBottom: '1.5rem'
              }}>
                {plan.duration}
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                marginBottom: '2rem',
                lineHeight: 2
              }}>
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    color: '#2d2d2d'
                  }}>
                    <span style={{ color: '#4ECDC4', fontSize: '1.25rem' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/${content?.site?.whatsapp?.replace(/[^0-9]/g, '') || '595993444222'}`}
                style={{
                  display: 'block',
                  background: '#25D366',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: 700,
                  textAlign: 'center'
                }}
              >
                💬 Reservar Ahora
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', background: '#F7FFF7', borderRadius: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#2E8B82', fontFamily: 'Georgia, serif' }}>
            Preguntas sobre precios
          </h3>
          <ul style={{ lineHeight: 2, color: '#2d2d2d' }}>
            <li>✓ Todos los precios incluyen impuestos</li>
            <li>✓ Descuentos disponibles para hermanos (15%)</li>
            <li>✓ Paquetes de sesiones múltiples con ahorros de 25-35%</li>
            <li>✓ Cancelación gratuita con 24h de aviso</li>
            <li>✓ Aceptamos efectivo, transferencia y tarjeta</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
