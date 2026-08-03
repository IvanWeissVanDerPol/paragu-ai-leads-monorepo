// Schema Markup Component - Server Component (no use client)

interface SchemaProps {
  schema: object;
}

export function SchemaMarkup({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function generateSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#localbusiness',
        name: 'HidroBaby Spa',
        alternateName: 'HidroBaby Spa Fernando de la Mora',
        description: 'Spa post vacunas, hidromasaje y fisioterapia infantil en Fernando de la Mora. Más de 1,300 familias confían en nosotros.',
        url: 'https://hidrobaby-spa.paragu-ai.com',
        telephone: '+595993444222',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Fernando de la Mora, cerca de la Facultad Politécnica',
          addressLocality: 'Fernando de la Mora',
          addressRegion: 'Central',
          addressCountry: 'PY'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -25.330,
          longitude: -57.540
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '17:00'
          }
        ],
        priceRange: '$$',
        image: 'https://hidrobaby-spa.paragu-ai.com/images/brand/logo.svg',
        sameAs: [
          'https://www.facebook.com/HidroBabySpaParaguay',
          'https://www.instagram.com/hidrobabyspa'
        ]
      },
      {
        '@type': 'MedicalOrganization',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#medical',
        name: 'HidroBaby Spa',
        description: 'Centro especializado en fisioterapia infantil, hidroterapia y spa post vacunas.',
        url: 'https://hidrobaby-spa.paragu-ai.com',
        telephone: '+595993444222',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Fernando de la Mora, cerca de la Facultad Politécnica',
          addressLocality: 'Fernando de la Mora',
          addressCountry: 'PY'
        },
        medicalSpecialty: ['Pediatric Physical Therapy', 'Hydrotherapy', 'Infant Development']
      },
      {
        '@type': 'Organization',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#organization',
        name: 'HidroBaby Spa',
        url: 'https://hidrobaby-spa.paragu-ai.com',
        logo: 'https://hidrobaby-spa.paragu-ai.com/images/brand/logo.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+595993444222',
          contactType: 'customer service',
          areaServed: 'PY',
          availableLanguage: 'Spanish'
        },
        founder: [
          {
            '@type': 'Person',
            name: 'Fátima Flecha',
            jobTitle: 'Cofundadora & Terapeuta Principal',
            description: 'Más de 10 años de experiencia en estimulación temprana y fisioterapia pediátrica.'
          },
          {
            '@type': 'Person',
            name: 'Fabio Castillo',
            jobTitle: 'Cofundador & Director de Operaciones',
            description: 'Experto en gestión de servicios de salud infantil.'
          }
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#spa-post-vacunas',
        name: 'Spa Post Vacunas',
        description: 'Hidroterapia especializada después de vacunas. Reduce irritación, mejora sueño y alivia cólicos.',
        provider: {
          '@id': 'https://hidrobaby-spa.paragu-ai.com/#medical'
        },
        offers: {
          '@type': 'Offer',
          price: '60000',
          priceCurrency: 'PYG',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01'
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -25.330,
            longitude: -57.540
          },
          geoRadius: '50000'
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#hidromasaje-infantil',
        name: 'Hidromasaje Infantil',
        description: 'Terapia de agua para desarrollo motor, relajación y vínculo afectivo.',
        provider: {
          '@id': 'https://hidrobaby-spa.paragu-ai.com/#medical'
        },
        offers: {
          '@type': 'Offer',
          price: '60000',
          priceCurrency: 'PYG',
          availability: 'https://schema.org/InStock'
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -25.330,
            longitude: -57.540
          },
          geoRadius: '50000'
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://hidrobaby-spa.paragu-ai.com/#fisioterapia-infantil',
        name: 'Fisioterapia Infantil',
        description: 'Rehabilitación motora, hipotonía, tortícolis y desarrollo infantil especializado.',
        provider: {
          '@id': 'https://hidrobaby-spa.paragu-ai.com/#medical'
        },
        offers: {
          '@type': 'Offer',
          price: '80000',
          priceCurrency: 'PYG',
          availability: 'https://schema.org/InStock'
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -25.330,
            longitude: -57.540
          },
          geoRadius: '50000'
        }
      }
    ]
  };

  return schema;
}

export function generateFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Desde qué edad puede asistir mi bebé al spa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aceptamos bebés desde los 45 días de vida. Es importante que el cordón umbilical haya caído completamente y que el bebé tenga un peso mínimo de 3.5 kg para asegurar su bienestar durante la sesión.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Es seguro el spa post-vacunas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutamente. El agua templada (36°C) y el movimiento suave ayudan a reducir la irritación en el sitio de la inyección, mejoran el sueño y alivian posibles cólicos. Más de 1,300 bebés han pasado por esta experiencia sin contraindicaciones.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué métodos de pago aceptan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aceptamos efectivo, transferencias bancarias, tarjetas de crédito/débito, y我们也欢迎支付宝/微信支付 (para nuestros clientes chinos). Ofrecemos planes de pago para paquetes de sesiones múltiples.'
        }
      },
      {
        '@type': 'Question',
        name: '¿HidroBaby Spa tiene otras sucursales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Actualmente tenemos tres sedes: Villa Morra (principal), Fernando de la Mora (foco en post-vacunas y terapia), y Luque (fiestas infantiles). Cada sede tiene servicios especializados. Próximamente abriremos en San Lorenzo.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuánto dura cada sesión?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las sesiones de hidromasaje duran entre 20 y 30 minutos, dependiendo de la edad del bebé y el servicio seleccionado. Para bebés de 45 días a 3 meses, recomendamos 20 minutos. Para bebés mayores de 3 meses, las sesiones pueden extenderse hasta 30 minutos.'
        }
      }
    ]
  };

  return schema;
}