// SectionsRenderer - Server Component
// Renders all sections from content/es.json

interface SectionProps {
  content: any;
  locale?: string;
}

// Header
function Header({ content }: SectionProps) {
  const nav = content?.navigation;
  const site = content?.site;
  return (
    <header style={{ background: '#2E8B82', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, background: '#FFE66D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#2E8B82', fontSize: '1.25rem' }}>👶</span>
          </div>
          <span style={{ color: 'white', fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: 700 }}>{nav?.businessName || 'HidroBaby Spa'}</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {(nav?.items || []).map((link: any, i: number) => (
            <a key={i} href={link.href || '#'} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
              {link.label}
            </a>
          ))}
        </nav>
        {site?.whatsapp && (
          <a href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, '')}`}
            style={{ background: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💬 {nav?.ctaText || 'Reservar'}
          </a>
        )}
      </div>
    </header>
  );
}

// Hero Section
function HeroSection({ content }: SectionProps) {
  const hero = content?.hero || {};
  const site = content?.site || {};
  return (
    <section style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B82 100%)', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {hero.subheadline && (
          <p style={{ color: '#FFE66D', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            {hero.subheadline}
          </p>
        )}
        <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          {hero.headline || 'HidroBaby Spa'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          {hero.description || site.tagline || 'Baby Spa en Fernando de la Mora — Atención profesional'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={hero.ctaPrimaryHref || `https://wa.me/${(site.whatsapp || '').replace(/[^0-9]/g, '')}`}
            style={{ background: '#FFE66D', color: '#2E8B82', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '1.125rem' }}>
            {hero.ctaPrimaryText || 'Reservar Cita →'}
          </a>
          {hero.secondaryCtaHref && (
            <a href={hero.secondaryCtaHref}
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', border: '2px solid white', fontWeight: 600 }}>
              {hero.secondaryCtaText || 'Ver Galería'}
            </a>
          )}
        </div>
        {hero.stats && (
          <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {hero.stats.map((stat: any, i: number) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: '#FFE66D', fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Services Section
function ServicesSection({ content }: SectionProps) {
  const services = content?.services;
  const items = services?.items || [];
  return (
    <section id="servicios" style={{ padding: '5rem 2rem', background: 'white' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {services?.title && (
            <>
              <p style={{ color: '#4ECDC4', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Servicios</p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2E8B82' }}>{services.title}</h2>
            </>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {items.map((service: any, i: number) => (
            <div key={i} style={{ padding: '2rem', background: '#F7FFF7', borderRadius: '1rem', border: '2px solid #E8F8F5', transition: 'all 0.3s ease' }}>
              {service.icon && <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#2E8B82' }}>{service.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{service.description}</p>
              {service.price && <p style={{ marginTop: '1rem', color: '#4ECDC4', fontWeight: 700, fontSize: '1.25rem' }}>{service.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Packages Section
function PackagesSection({ content }: SectionProps) {
  const packages = content?.packages;
  const items = packages?.items || [];
  const site = content?.site || {};
  
  if (!items || items.length === 0) return null;
  
  return (
    <section id="paquetes" style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #F7FFF7 0%, #E8F8F5 100%)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {packages?.title && (
            <>
              <p style={{ color: '#4ECDC4', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Promociones</p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2E8B82', marginBottom: '1rem' }}>{packages.title}</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto' }}>{packages.description}</p>
            </>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {items.map((pkg: any, i: number) => {
            const whatsappNumber = (site.whatsapp || '').replace(/[^0-9]/g, '');
            const message = encodeURIComponent(pkg.whatsappMessage || `Hola! Me interesa el ${pkg.name}. ¿Tienen disponibilidad?`);
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            return (
              <div key={i} style={{ 
                padding: '2rem', 
                background: 'white', 
                borderRadius: '1rem', 
                border: pkg.badge ? '3px solid #4ECDC4' : '2px solid #E8F8F5',
                position: 'relative',
                boxShadow: pkg.badge ? '0 20px 40px rgba(78, 205, 196, 0.2)' : '0 4px 6px rgba(46, 139, 130, 0.05)',
                transform: pkg.badge ? 'scale(1.05)' : 'none'
              }}>
                {pkg.badge && (
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
                    {pkg.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#2E8B82' }}>{pkg.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{pkg.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  {(pkg.services || []).map((item: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#2d2d2d', fontSize: '0.9rem' }}>
                      <span style={{ color: '#4ECDC4', fontSize: '1.25rem' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {pkg.originalPrice && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'line-through', margin: 0 }}>
                      Gs. {pkg.originalPrice.toLocaleString()}
                    </p>
                    <p style={{ color: '#4ECDC4', fontSize: '2rem', fontWeight: 700, margin: '0.25rem 0' }}>
                      Gs. {pkg.price.toLocaleString()}
                    </p>
                    {pkg.savings && (
                      <p style={{ color: '#FF6B6B', fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>
                        Ahorras Gs. {pkg.savings.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
                <a href={whatsappLink}
                   style={{ 
                     display: 'block', 
                     background: '#25D366', 
                     color: 'white', 
                     padding: '1rem', 
                     borderRadius: '0.5rem', 
                     textDecoration: 'none', 
                     fontWeight: 600, 
                     textAlign: 'center',
                     transition: 'all 0.3s ease'
                   }}>
                  💬 Reservar Ahora
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Promo Carousel Section
function PromoCarouselSection({ content }: SectionProps) {
  const promos = content?.promos;
  const items = promos?.items || [];
  
  if (!items || items.length === 0) return null;
  
  return (
    <section style={{ padding: '4rem 2rem', background: 'white' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {items.map((promo: any, i: number) => (
            <div key={i} style={{ 
              padding: '2rem', 
              borderRadius: '1rem', 
              background: promo.bgColor || '#4ECDC4',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>{promo.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{promo.description}</p>
              <a href={promo.ctaLink}
                 style={{ 
                   display: 'inline-block', 
                   background: 'white', 
                   color: promo.bgColor || '#4ECDC4', 
                   padding: '0.75rem 1.5rem', 
                   borderRadius: '0.5rem', 
                   textDecoration: 'none', 
                   fontWeight: 700 
                 }}>
                {promo.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection({ content }: SectionProps) {
  const gallery = content?.gallery;
  const items = gallery?.items || [];
  return (
    <section id="galeria" style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {gallery?.title && (
            <>
              <p style={{ color: '#e94560', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Galería</p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#1a1a2e' }}>{gallery.title}</h2>
            </>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {items.map((img: any, i: number) => (
            <div key={i} style={{ aspectRatio: '1', background: '#e5e7eb', borderRadius: '0.75rem', overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.3s ease' }}>
              <img 
                src={img.src || img.url || `https://picsum.photos/400/400?random=${i}`}
                alt={img.alt || img.caption || 'Experiencia spa'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '1rem', 
                background: 'linear-gradient(transparent, rgba(46, 139, 130, 0.9))', 
                color: 'white', 
                fontSize: '0.875rem',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              >
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection({ content }: SectionProps) {
  const testimonials = content?.testimonials;
  const items = testimonials?.items || [];
  return (
    <section style={{ padding: '5rem 2rem', background: '#F7FFF7' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {testimonials?.title && (
            <>
              <p style={{ color: '#4ECDC4', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Reseñas</p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2E8B82' }}>{testimonials.title}</h2>
            </>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {items.slice(0, 6).map((t: any, i: number) => (
            <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#FFE66D' }}>★</span>)}
              </div>
              <p style={{ color: '#2d2d2d', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                "{t.text || t.content || t.quote || ''}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, background: '#4ECDC4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>
                  {(t.name || t.author || 'C').charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#2E8B82', margin: 0 }}>{t.name || t.author || 'Cliente'}</p>
                  {t.rating && <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: 0 }}>⭐ {t.rating}/5</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ content }: SectionProps) {
  const faq = content?.faq;
  const items = faq?.items || [];
  return (
    <section id="faq" style={{ padding: '5rem 2rem', background: 'white' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {faq?.title && (
            <>
              <p style={{ color: '#4ECDC4', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Preguntas Frecuentes</p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2E8B82', marginBottom: '1rem' }}>{faq.title}</h2>
              {faq?.subtitle && <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto' }}>{faq.subtitle}</p>}
            </>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item: any, i: number) => (
            <details key={i} style={{ background: '#F7FFF7', borderRadius: '0.75rem', border: '2px solid #E8F8F5', overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <summary style={{ padding: '1.25rem', fontWeight: 600, color: '#2E8B82', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ flex: 1 }}>{item.question || item.q || item.title}</span>
                <span style={{ color: '#4ECDC4', fontSize: '1.25rem', marginLeft: '1rem' }}>+</span>
              </summary>
              <div style={{ padding: '0 1.25rem 1.25rem', color: '#6b7280', lineHeight: 1.6, borderTop: '1px solid #E8F8F5', paddingTop: '1rem' }}>
                {item.answer || item.a || item.description || ''}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// Booking/CTA Section
function CTASection({ content }: SectionProps) {
  const contact = content?.contact || {};
  const site = content?.site || {};
  const whatsapp = (site.whatsapp || '').replace(/[^0-9]/g, '');
  const msg = encodeURIComponent(contact.cta?.text || contact.whatsappMessage || 'Hola! Quiero reservar un turno en HidroBaby Spa');
  return (
    <section id="reservar" style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B82 100%)', textAlign: 'center' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
          ¿Necesitás relajarte?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.125rem', marginBottom: '2rem' }}>
          {contact.subtitle || 'Reserva tu cita por WhatsApp. Te responderemos en minutos.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`https://wa.me/${whatsapp}?text=${msg}`}
            style={{ background: '#25D366', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 700, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            💬 {contact.cta?.label || 'Reservar por WhatsApp'}
          </a>
        </div>
        <div style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
          📍 {site.address || 'Fernando de la Mora, cerca de la Politécnica'}
          {site.hours && ` · ${site.hours}`}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ content }: SectionProps) {
  const footer = content?.footer || {};
  const site = content?.site || {};
  return (
    <footer style={{ background: '#2E8B82', color: 'rgba(255,255,255,0.9)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>{site.name || 'HidroBaby Spa'}</h3>
            <p style={{ lineHeight: 1.6 }}>{footer.text || site.description || 'Baby Spa profesional en Fernando de la Mora.'}</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem' }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
              <li><a href="#servicios" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Spa</a></li>
              <li><a href="#servicios" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Masajes</a></li>
              <li><a href="#paquetes" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Paquetes</a></li>
              <li><a href="#galeria" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Galería</a></li>
              <li><a href="#reservar" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Reservar</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
              {site.address && <li>📍 {site.address}</li>}
              {site.phone && <li>📞 {site.phone}</li>}
              {site.whatsapp && <li>💬 +{site.whatsapp}</li>}
              {site.email && <li>✉ {site.email}</li>}
              {site.hours && <li>🕐 {site.hours}</li>}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} {site.name || 'HidroBaby Spa'} · {site.city || 'Fernando de la Mora'}, {site.country || 'Paraguay'}<br />
            <span style={{ color: '#FFE66D' }}>Hecho con 👶 por ParaguAI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main SectionsRenderer
export function SectionsRenderer({ content, locale }: SectionProps) {
  if (!content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e' }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', marginBottom: '1rem' }}>ESTUDIO MEDIEVAL</h1>
          <p>Cargando contenido...</p>
        </div>
      </div>
    );
  }
  return (
    <main>
      <Header content={content} />
      <HeroSection content={content} />
      <PromoCarouselSection content={content} />
      <ServicesSection content={content} />
      <PackagesSection content={content} />
      <GallerySection content={content} />
      <TestimonialsSection content={content} />
      <FAQSection content={content} />
      <CTASection content={content} />
      <Footer content={content} />
    </main>
  );
}