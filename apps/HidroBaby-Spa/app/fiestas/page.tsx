// Birthday Parties Page - Server Component
export const metadata = {
  title: 'Fiestas Infantiles | HidroBaby Spa - Celebraciones en Fernando de la Mora',
  description: 'Organiza la mejor fiesta infantil de tu bebé en HidroBaby Spa. Hasta 12 niños, torta, decoración, sesión de fotos. Gs. 400,000.',
};

export default function FiestasPage() {
  return (
    <main>
      <div style={{ 
        background: 'linear-gradient(135deg, #FFE66D 0%, #FFD93D 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#2E8B82'
      }}>
        <h1 style={{ 
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          🎉 Fiestas Infantiles
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          maxWidth: '42rem',
          margin: '0 auto'
        }}>
          La celebración más especial de tu bebé, en el spa más lindo de Paraguay
        </p>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Main Package */}
        <div style={{ 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '1.5rem', 
          border: '3px solid #FFE66D',
          boxShadow: '0 20px 40px rgba(255, 230, 109, 0.2)',
          marginBottom: '4rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: '#FFE66D',
            color: '#2E8B82',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 700
          }}>
            🎂 Paquete Completo
          </div>
          
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Fiestas Infantiles - Hasta 12 Niños
          </h2>
          
          <p style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#4ECDC4',
            marginBottom: '2rem'
          }}>
            Gs. 400,000
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              'Uso exclusivo del spa',
              'Torta decorada',
              'Decoración temática personalizada',
              'Sesión de fotos profesional',
              'Souvenirs para cada invitado',
              'Coordinador de evento dedicado',
              '2-3 horas de celebración',
              'Bebidas y snacks',
              'Música ambiente',
              'Limpieza incluida'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#4ECDC4', fontSize: '1.25rem' }}>✓</span>
                <span style={{ color: '#2d2d2d' }}>{item}</span>
              </div>
            ))}
          </div>

          <a 
            href="https://wa.me/595993444222?text=Hola!%20Quiero%20reservar%20una%20fiesta%20infantil%20en%20HidroBaby%20Spa"
            style={{
              display: 'inline-block',
              background: '#25D366',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.125rem'
            }}
          >
            💬 Reservar Fiesta
          </a>
        </div>

        {/* Themes */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '2rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Temas Disponibles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🐧', name: 'Pingüinos', color: '#A8D8EA' },
              { emoji: '🦄', name: 'Unicornio', color: '#FFD1DC' },
              { emoji: '🌊', name: 'Bajo el Mar', color: '#A0E7E5' },
              { emoji: '🦁', name: 'Selva', color: '#95E1D3' },
              { emoji: '🚀', name: 'Espacio', color: '#B4F8C8' },
              { emoji: '🎈', name: 'Circo', color: '#FBE7C6' },
              { emoji: '👑', name: 'Princesa', color: '#FF9AA2' },
              { emoji: '🎨', name: 'Arte', color: '#E2F0CB' }
            ].map((theme, i) => (
              <div key={i} style={{ 
                padding: '1.5rem', 
                background: theme.color, 
                borderRadius: '1rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{theme.emoji}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#2E8B82' }}>{theme.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div style={{ marginBottom: '4rem', padding: '2rem', background: '#F7FFF7', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            ¿Qué incluye la fiesta?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#FFE66D' }}>🎉 Decoración</h3>
              <ul style={{ lineHeight: 2, color: '#2d2d2d' }}>
                <li>Globos temáticos</li>
                <li>Centros de mesa</li>
                <li>Panel decorativo</li>
                <li>Fondos para fotos</li>
                <li>Mesa de dulces</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#FFE66D' }}>📸 Fotos</h3>
              <ul style={{ lineHeight: 2, color: '#2d2d2d' }}>
                <li>Fotógrafo profesional</li>
                <li>50+ fotos editadas</li>
                <li>Video del evento</li>
                <li>Álbum digital</li>
                <li>Impresiones para invitados</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#FFE66D' }}>🎁 Souvenirs</h3>
              <ul style={{ lineHeight: 2, color: '#2d2d2d' }}>
                <li>Juguetes educativos</li>
                <li>Kit de baño (si desea)</li>
                <li>Memorias personalizadas</li>
                <li>Certificado de asistencia</li>
                <li>Notas de agradecimiento</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '2rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Proceso de Reserva
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: 1, title: 'Contactar', desc: 'Escríbenos por WhatsApp con fecha y tema' },
              { step: 2, title: 'Planificar', desc: 'Elegir tema, confirmar número de niños' },
              { step: 3, title: 'Reservar', desc: 'Pagar 50% para confirmar fecha' },
              { step: 4, title: 'Preparar', desc: 'Decoramos según el tema elegido' },
              { step: 5, title: 'Celebrar', desc: 'Disfruta de la fiesta relajado' },
              { step: 6, title: 'Recordar', desc: 'Recibe fotos y souvenirs en días' }
            ].map((item, i) => (
              <div key={i} style={{ 
                padding: '1.5rem', 
                background: 'white', 
                borderRadius: '1rem',
                border: '2px solid #E8F8F5',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#4ECDC4',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#2E8B82', textAlign: 'center', marginTop: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'center' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Preguntas Frecuentes
          </h2>
          {[
            { q: '¿Cuánto tiempo dura la fiesta?', a: '2-3 horas, según el paquete elegido' },
            { q: '¿Debemos traer algo?', a: 'Solo la ropa de cambio para los niños. Nosotros proveemos todo.' },
            { q: '¿Los padres pueden participar?', a: '¡Sí! Los padres pueden acompañar y tomar fotos.' },
            { q: '¿Qué temas pueden elegir?', a: 'Más de 20 temas disponibles. También personalizados.' },
            { q: '¿Cómo se paga?', a: '50% al reservar, 50% el día de la fiesta.' },
            { q: '¿Cuánto antes debo reservar?', a: 'Mínimo 2 semanas. 1 mes para fechas especiales.' }
          ].map((item, i) => (
            <details key={i} style={{ 
              background: '#F7FFF7', 
              borderRadius: '0.75rem', 
              border: '2px solid #E8F8F5', 
              overflow: 'hidden',
              marginBottom: '0.75rem'
            }}>
              <summary style={{ 
                padding: '1rem', 
                fontWeight: 600, 
                color: '#2E8B82', 
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>{item.q}</span>
                <span style={{ color: '#4ECDC4' }}>+</span>
              </summary>
              <div style={{ 
                padding: '0 1rem 1rem', 
                color: '#6b7280', 
                lineHeight: 1.6,
                borderTop: '1px solid #E8F8F5',
                paddingTop: '0.75rem'
              }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div style={{ 
          marginTop: '4rem', 
          padding: '3rem', 
          background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B82 100%)',
          borderRadius: '1rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            fontFamily: 'Georgia, serif'
          }}>
            ¿Listo para organizar la mejor fiesta?
          </h2>
          <p style={{ marginBottom: '2rem', opacity: 0.95 }}>
            Solo 12 fechas disponibles por mes. ¡Reserva ahora!
          </p>
          <a 
            href="https://wa.me/595993444222?text=Hola!%20Quiero%20reservar%20una%20fiesta%20infantil%20en%20HidroBaby%20Spa"
            style={{
              display: 'inline-block',
              background: '#25D366',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.125rem'
            }}
          >
            💬 Reservar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}