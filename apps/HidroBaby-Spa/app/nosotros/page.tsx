// About Us Page - Server Component
export const metadata = {
  title: 'Nosotros | HidroBaby Spa - Fátima Flecha & Fabio Castillo',
  description: 'Conoce al equipo de HidroBaby Spa. Fundadores Fátima Flecha y Fabio Castillo. Más de 5 años cuidando bebés en Paraguay.',
};

export default function NosotrosPage() {
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
          Nosotros
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          maxWidth: '42rem',
          margin: '0 auto',
          opacity: 0.95
        }}>
          +1,300 familias confían en nosotros
        </p>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Founders */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '2rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Fundadores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', background: '#F7FFF7', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
              <div style={{ width: 120, height: 120, background: '#4ECDC4', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                👩‍⚕️
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#2E8B82', textAlign: 'center' }}>Fátima Flecha</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem', textAlign: 'center' }}>Cofundadora & Terapeuta Principal</p>
              <p style={{ color: '#2d2d2d', lineHeight: 1.6 }}>
                Más de 10 años de experiencia en estimulación temprana y fisioterapia pediátrica. Especializada en hidroterapia infantil y desarrollo motor. Certificada en terapias integrales para bebés con necesidades especiales.
              </p>
            </div>
            <div style={{ padding: '2rem', background: '#F7FFF7', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
              <div style={{ width: 120, height: 120, background: '#FFE66D', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                👨‍⚕️
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#2E8B82', textAlign: 'center' }}>Fabio Castillo</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem', textAlign: 'center' }}>Cofundador & Director de Operaciones</p>
              <p style={{ color: '#2d2d2d', lineHeight: 1.6 }}>
                Experto en gestión de servicios de salud infantil. Responsable de calidad de servicio, seguridad de instalaciones y coordinación de equipo. Asegura los más altos estándares de higiene y atención.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div style={{ marginBottom: '4rem', padding: '2rem', background: 'white', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Nuestra Historia
          </h2>
          <p style={{ color: '#2d2d2d', lineHeight: 1.8, marginBottom: '1rem' }}>
            HidroBaby Spa nació en marzo de 2020 con una visión simple pero poderosa: ofrecer a los bebés de Paraguay una experiencia de bienestar única y segura.
          </p>
          <p style={{ color: '#2d2d2d', lineHeight: 1.8, marginBottom: '1rem' }}>
            Lo que comenzó como un pequeño espacio con una piscina y mucho amor, hoy se ha convertido en el centro de spa infantil más completo del país, con tres sedes (Villa Morra, Fernando de la Mora, Luque) y más de 1,300 familias satisfechas.
          </p>
          <p style={{ color: '#2d2d2d', lineHeight: 1.8 }}>
            Nuestro diferencial es simple: combinamos experiencia técnica, instalaciones de primer nivel y un amor genuino por los bebés. Cada sesión está diseñada para estimular el desarrollo, fortalecer vínculos y crear recuerdos inolvidables.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '2rem',
            color: '#2E8B82',
            fontFamily: 'Georgia, serif'
          }}>
            Nuestros Valores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🛡️', title: 'Seguridad', desc: 'Agua esterilizada con ozono, temperatura controlada, protocolos estrictos' },
              { icon: '❤️', title: 'Amor', desc: 'Cada bebé es único. Lo tratamos con la dedicación que merece' },
              { icon: '🎓', title: 'Profesionalismo', desc: 'Terapeutas certificados, actualización constante, años de experiencia' },
              { icon: '🌟', title: 'Excelencia', desc: 'No buscamos ser buenos, buscamos ser los mejores en Paraguay' }
            ].map((value, i) => (
              <div key={i} style={{ padding: '1.5rem', background: '#F7FFF7', borderRadius: '1rem', border: '2px solid #E8F8F5' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{value.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#2E8B82' }}>{value.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          padding: '3rem',
          background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B82 100%)',
          borderRadius: '1rem',
          color: 'white',
          textAlign: 'center'
        }}>
          {[
            { value: '1,300+', label: 'Familias' },
            { value: '5+', label: 'Años de experiencia' },
            { value: '3', label: 'Sedes' },
            { value: '1,316+', label: 'Reviews 5⭐' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
