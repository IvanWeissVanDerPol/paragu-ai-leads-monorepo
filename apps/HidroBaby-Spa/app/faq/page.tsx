'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const faqItems = [
    {
      category: 'General',
      questions: [
        {
          q: '¿Desde qué edad puede asistir mi bebé al spa?',
          a: 'Aceptamos bebés desde los 45 días de vida. Es importante que el cordón umbilical haya caído completamente y que el bebé tenga un peso mínimo de 3.5 kg para asegurar su bienestar durante la sesión.'
        },
        {
          q: '¿Cuánto dura cada sesión?',
          a: 'Las sesiones de hidromasaje duran entre 20 y 30 minutos, dependiendo de la edad del bebé y el servicio seleccionado. Para bebés de 45 días a 3 meses, recomendamos 20 minutos. Para bebés mayores de 3 meses, las sesiones pueden extenderse hasta 30 minutos.'
        },
        {
          q: '¿Los padres pueden acompañar al bebé?',
          a: 'Sí, los padres pueden acompañar al bebé durante toda la sesión. Contamos con un área especial para que los padres observen y participen si lo desean. Para quienes prefieren trabajar mientras el bebé disfruta del spa, ofrecemos nuestro servicio Coworking Baby.'
        },
        {
          q: '¿Qué debo llevar para la sesión?',
          a: 'Solo necesitas: toalla, pañales, ropa de cambio, y toallitas húmedas. Nosotros proporcionamos: agua esterilizada a la temperatura ideal, termómetro para verificar la temperatura corporal del bebé, y productos hipoalergénicos de cuidado de la piel.'
        }
      ]
    },
    {
      category: 'Seguridad e Higiene',
      questions: [
        {
          q: '¿Es seguro el spa post-vacunas?',
          a: 'Absolutamente. El spa post-vacunas es nuestro servicio más solicitado. El agua templada (36°C) y el movimiento suave ayudan a reducir la irritación en el sitio de la inyección, mejoran el sueño y alivian posibles cólicos. Más de 1,300 bebés han pasado por esta experiencia sin contraindicaciones.'
        },
        {
          q: '¿Cómo se garantiza la higiene del agua?',
          a: 'Contamos con un sistema de filtración y desinfección con ozono que garantiza agua esterilizada. El agua se cambia después de cada bebé y la temperatura se mantiene constante a 36°C. Todos los equipos se desinfectan con soluciones hipoalergénicas entre sesiones.'
        },
        {
          q: '¿Los terapeutas tienen certificación?',
          a: 'Todos nuestros terapeutas tienen certificación en fisioterapia pediátrica y formación especializada en hidroterapia infantil. El fundador, Fátima Flecha, tiene más de 10 años de experiencia en estimulación temprana. Nos actualizamos constantemente con las mejores prácticas internacionales.'
        }
      ]
    },
    {
      category: 'Beneficios',
      questions: [
        {
          q: '¿Qué beneficios tiene el hidromasaje para bebés?',
          a: 'Mejora el desarrollo motor, fortalece los músculos, estimula el sistema circulatorio, ayuda a conciliar el sueño, reduce cólicos y gases, y fortalece el vínculo afectivo entre padres e hijos. También es excelente para bebés prematuros y aquellos con hipotonía o tortícolis.'
        },
        {
          q: '¿Ayuda con el desarrollo del bebé?',
          a: 'Sí, el hidromasaje estimula el desarrollo motor grueso y fino, mejora el equilibrio, fortalece los músculos del core, y ayuda con el control de la cabeza. Es especialmente beneficioso para bebés con retraso motor o necesidades especiales.'
        }
      ]
    },
    {
      category: 'Precios y Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos efectivo, transferencias bancarias, tarjetas de crédito/débito, y我们也欢迎支付宝/微信支付 (para nuestros clientes chinos). Ofrecemos planes de pago para paquetes de sesiones múltiples.'
        },
        {
          q: '¿Hay descuentos para hermanos?',
          a: 'Sí, ofrecemos descuentos del 15% para hermanos que asisten en la misma sesión. También tenemos descuentos especiales para paquetes de 3 o más sesiones, y referidos de clientes existentes reciben un bono de descuento adicional.'
        }
      ]
    },
    {
      category: 'Servicios Especiales',
      questions: [
        {
          q: '¿Aceptan bebés con necesidades especiales?',
          a: 'Sí, tenemos especialización en fisioterapia infantil y atendemos bebés con necesidades especiales: hipotonía, tortícolis, prematuros, y otras condiciones. Contamos con fisioterapeutas certificados y equipos adaptados. Consulta con nosotros para evaluar la mejor opción para tu bebé.'
        },
        {
          q: '¿Realizan fiestas infantiles?',
          a: 'Sí, organizamos fiestas infantiles personalizadas. Incluyen: uso exclusivo del spa para los niños invitados, torta y decoración temática, sesión de fotos profesional, y souvenirs para cada invitado. Aceptamos grupos de hasta 12 niños con duración de 2-3 horas.'
        },
        {
          q: '¿Hay servicios de seguimiento?',
          a: 'Sí, ofrecemos seguimiento del desarrollo del bebé. Cada 6 sesiones, realizamos una evaluación de progreso y entregamos un reporte detallado a los padres. Esto es especialmente importante para bebés en terapia física o desarrollo motor.'
        }
      ]
    },
    {
      category: 'Ubicación y Contacto',
      questions: [
        {
          q: '¿Cómo reservo una cita?',
          a: 'Puedes reservar por WhatsApp al +595 993 444 222 o visitarnos directamente en Fernando de la Mora. Recomendamos reservar con 48 horas de anticipación, especialmente para los horarios de fin de semana. Para emergencias o consultas, también puedes escribirnos por WhatsApp.'
        },
        {
          q: '¿Hay estacionamiento?',
          a: 'Sí, tenemos estacionamiento gratuito disponible para nuestros clientes. Recomendamos llegar 10 minutos antes de la cita para completar el registro y permitir que el bebé se acostumbre al ambiente.'
        },
        {
          q: '¿HidroBaby Spa tiene otras sucursales?',
          a: 'Actualmente tenemos tres sedes: Villa Morra (principal), Fernando de la Mora (foco en post-vacunas y terapia), y Luque (fiestas infantiles). Cada sede tiene servicios especializados. Próximamente abriremos en San Lorenzo.'
        },
        {
          q: '¿Puedo ver instalaciones antes de reservar?',
          a: 'Sí, ofrecemos visitas guiadas gratuitas antes de reservar. Puedes venir sin cita en horarios de oficina o programar una visita específica. Es importante que veas las instalaciones y conozcas al equipo antes de decidir.'
        }
      ]
    },
    {
      category: 'Otros',
      questions: [
        {
          q: '¿Realizan visitas a domicilio?',
          a: 'Actualmente solo atendemos en nuestras instalaciones en Fernando de la Mora. Esto nos permite mantener los más altos estándares de higiene y contar con todo el equipo necesario. Estamos evaluando la posibilidad de visitas a domicilio para 2027.',
        },
        {
          q: '¿Qué pasa si mi bebé llora durante la sesión?',
          a: 'Es completamente normal que un bebé llore al principio. Nuestros terapeutas están entrenados para calmar a los bebés y hacer que la experiencia sea agradable. La mayoría de los bebés se relajan después de los primeros 2-3 minutos en el agua. Si el bebé persiste en llorar, podemos adaptar la sesión o hacer pausas.'
        }
      ]
    }
  ];

  const filteredItems = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const allQuestions = filteredItems.flatMap(cat => cat.questions);

  return (
    <main>
      {/* Header */}
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
          Preguntas Frecuentes
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          maxWidth: '42rem',
          margin: '0 auto',
          opacity: 0.95
        }}>
          Todo lo que necesitas saber sobre HidroBaby Spa
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: '48rem', margin: '-2rem auto 3rem', position: 'relative', zIndex: 10 }}>
        <input
          type="text"
          placeholder="🔍 Buscar preguntas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            fontSize: '1.125rem',
            border: '2px solid #E8F8F5',
            borderRadius: '0.75rem',
            background: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem 4rem' }}>
        {/* FAQ Sections */}
        {searchTerm === '' ? (
          filteredItems.map((category, catIdx) => (
            <div key={catIdx} style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                marginBottom: '1.5rem',
                color: '#2E8B82',
                fontFamily: 'Georgia, serif',
                borderBottom: '3px solid #FFE66D',
                paddingBottom: '0.5rem',
                display: 'inline-block'
              }}>
                {category.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {category.questions.map((item, qIdx) => {
                  const globalIdx = allQuestions.findIndex(q => q.q === item.q);
                  return (
                    <details
                      key={qIdx}
                      open={expandedItem === globalIdx}
                      onToggle={(e) => {
                        if ((e.target as HTMLDetailsElement).open) {
                          setExpandedItem(globalIdx);
                        } else if (expandedItem === globalIdx) {
                          setExpandedItem(null);
                        }
                      }}
                      style={{ 
                        background: '#F7FFF7', 
                        borderRadius: '0.75rem', 
                        border: '2px solid #E8F8F5', 
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <summary style={{ 
                        padding: '1.25rem', 
                        fontWeight: 600, 
                        color: '#2E8B82', 
                        cursor: 'pointer',
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ flex: 1 }}>{item.q}</span>
                        <span style={{ color: '#4ECDC4', fontSize: '1.25rem', marginLeft: '1rem' }}>
                          {expandedItem === globalIdx ? '−' : '+'}
                        </span>
                      </summary>
                      <div style={{ 
                        padding: '0 1.25rem 1.25rem', 
                        color: '#6b7280', 
                        lineHeight: 1.7,
                        borderTop: '1px solid #E8F8F5',
                        paddingTop: '1rem'
                      }}>
                        {item.a}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {allQuestions.map((item, idx) => (
              <details
                key={idx}
                open={expandedItem === idx}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    setExpandedItem(idx);
                  } else if (expandedItem === idx) {
                    setExpandedItem(null);
                  }
                }}
                style={{ 
                  background: '#F7FFF7', 
                  borderRadius: '0.75rem', 
                  border: '2px solid #E8F8F5', 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <summary style={{ 
                  padding: '1.25rem', 
                  fontWeight: 600, 
                  color: '#2E8B82', 
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ flex: 1 }}>{item.q}</span>
                  <span style={{ color: '#4ECDC4', fontSize: '1.25rem', marginLeft: '1rem' }}>
                    {expandedItem === idx ? '−' : '+'}
                  </span>
                </summary>
                <div style={{ 
                  padding: '0 1.25rem 1.25rem', 
                  color: '#6b7280', 
                  lineHeight: 1.7,
                  borderTop: '1px solid #E8F8F5',
                  paddingTop: '1rem'
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        )}

        {/* No Results */}
        {allQuestions.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: '#F7FFF7',
            borderRadius: '1rem',
            border: '2px dashed #E8F8F5'
          }}>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              No encontramos preguntas que coincidan con "{searchTerm}"
            </p>
            <p style={{ color: '#4ECDC4', marginTop: '0.5rem' }}>
              Intenta con otros términos
            </p>
          </div>
        )}

        {/* Stats */}
        {searchTerm === '' && (
          <div style={{ 
            marginTop: '4rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '1rem',
            border: '2px solid #E8F8F5',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#2E8B82', fontFamily: 'Georgia, serif' }}>
              ¿No encontraste tu respuesta?
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Estamos aquí para ayudar. Contáctanos directamente.
            </p>
            <a 
              href="https://wa.me/595993444222?text=Hola!%20Tengo%20una%20pregunta%20que%20no%20aparece%20en%20el%20FAQ"
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
              💬 Preguntar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </main>
  );
}