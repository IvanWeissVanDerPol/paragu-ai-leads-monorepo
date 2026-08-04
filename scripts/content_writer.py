#!/usr/bin/env python3
"""
scripts/content_writer.py — Generate real Spanish content for ParaguAI lead sites.

Given a scaffolded app's WEBSITE_BRIEF.md (or site.json) + a content template,
generate a complete es.json with:
- Hero (headline, subheadline, CTAs)
- Services (with realistic descriptions per service type)
- Packages (combo deals)
- Gallery captions
- Testimonials (based on rating + count from brief)
- FAQ (5-7 questions per industry)
- Pricing (transparent ranges)

Strategy:
- Use industry templates for common verticals (spa, barber, gym, restaurant)
- Pull from WEBSITE_BRIEF.md for unique data (name, owner, services, colors)
- Generate locally without external APIs (works in Hermes sandbox)
- Spanish (Py) tone — warm, professional, local Paraguayan

Usage:
    cd /root/paragu-ai-leads-monorepo
    python3 scripts/content_writer.py apps/Clau-Bellino
    python3 scripts/content_writer.py apps/Clau-Bellino --preview  # dry run
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Optional

sys.path.insert(0, str(Path(__file__).parent))
from icon_mapper import pick_icon, map_icons


# ============================================================================
# Industry templates
# ============================================================================

INDUSTRY_TEMPLATES = {
    "facial_aesthetics": {
        "hero_template": {
            "headline": "{businessName} — Estética Facial Profesional",
            "subheadline": "{rating}★ en Google · {review_count}+ reseñas · Asunción",
            "description": "Tratamientos faciales personalizados con productos dermatológicos certificados. Cuidamos tu piel con la atención que merecés.",
            "ctaPrimaryText": "Reservar Turno",
            "ctaSecondaryText": "Ver Servicios",
        },
        "services_default": [
            {"title": "Limpieza Facial Profunda", "icon": "sparkles",
             "description": "Removemos impurezas, células muertas y puntos negros con productos dermatológicos. Tu piel queda limpia, luminosa y fresca.", "price": "Gs. 150.000"},
            {"title": "Peeling Químico", "icon": "leaf",
             "description": "Renovación celular profunda que mejora manchas, textura y luminosidad. Protocolo personalizado según tu tipo de piel.", "price": "Gs. 200.000"},
            {"title": "Microdermoabrasión", "icon": "diamond",
             "description": "Exfoliación mecánica con puntas de diamante que elimina marcas y líneas finas. Resultados visibles desde la primera sesión.", "price": "Gs. 250.000"},
            {"title": "Tratamiento Anti-Edad", "icon": "shield",
             "description": "Protocolo especializado para reducir arrugas, flacidez y manchas. Incluye drenaje facial y aplicación de activos rejuvenecedores.", "price": "Gs. 350.000"},
            {"title": "Hidratación Profunda", "icon": "water",
             "description": "Recupera la barrera natural de tu piel con ácido hialurónico y vitaminas. Especial para pieles deshidratadas por clima o sol.", "price": "Gs. 180.000"},
        ],
        "faq_questions": [
            ("¿Cuánto dura cada sesión?",
             "La mayoría de nuestros tratamientos duran entre 60 y 90 minutos. Te confirmamos el tiempo exacto cuando reserves."),
            ("¿Necesito turno previo?",
             "Sí, trabajamos con turnos agendados para dedicarte el tiempo que necesitás. Escribinos por WhatsApp y te confirmamos disponibilidad."),
            ("¿Qué productos usan?",
             "Trabajamos con marcas dermatológicas certificadas. Te explicamos cada producto que usamos durante la sesión."),
            ("¿Atienden hombres también?",
             "Por supuesto. Cada vez más hombres cuidan su piel y tenemos protocolos adaptados para todo tipo de piel."),
            ("¿Tienen promociones?",
             "Sí, tenemos paquetes combinados y descuentos por sesiones múltiples. Preguntanos por WhatsApp."),
            ("¿Cuándo veo los resultados?",
             "La limpieza facial se ve desde el primer día. Para tratamientos como peeling o anti-edad, los resultados óptimos aparecen entre la 2da y 4ta sesión."),
            ("¿Cómo reservo?",
             "Tocá el botón de WhatsApp, escribinos tu nombre y el tratamiento que querés. Te confirmamos horario en el día."),
        ],
    },
    "spa": {
        "hero_template": {
            "headline": "Relajación y Bienestar en {city}",
            "subheadline": "Tratamientos profesionales · {city} · {rating}★",
            "description": "Spa profesional con ambiente acogedor. Hidromasaje, masajes y tratamientos pensados para desconectar y renovar energía.",
            "ctaPrimaryText": "Reservar Sesión",
            "ctaSecondaryText": "Ver Paquetes",
        },
        "services_default": [
            {"title": "Hidromasaje Relajante", "icon": "waves",
             "description": "Sesión de 45 min con jets que alivian tensiones musculares. Agua templada y aceites esenciales.", "price": "Gs. 180.000"},
            {"title": "Masaje Descontracturante", "icon": "hands",
             "description": "Masaje profundo para liberar tensiones del cuello, espalda y piernas. Duración 60 min.", "price": "Gs. 220.000"},
            {"title": "Tratamiento Facial", "icon": "sparkles",
             "description": "Limpieza + hidratación + mascarilla adaptada a tu tipo de piel.", "price": "Gs. 200.000"},
            {"title": "Sauna + Vapor", "icon": "fire",
             "description": "Sesión de 30 min en cabina de vapor con aromaterapia.", "price": "Gs. 120.000"},
        ],
    },
    "barber": {
        "hero_template": {
            "headline": "Barbería Profesional en {city}",
            "subheadline": "{rating}★ en Google · {review_count}+ clientes satisfechos",
            "description": "Cortes clásicos y modernos, perfiles definidos, y ambiente que invita a quedarse. Atendemos con y sin turno.",
            "ctaPrimaryText": "Reservar Turno",
            "ctaSecondaryText": "Ver Servicios",
        },
        "services_default": [
            {"title": "Corte Clásico", "icon": "scissors",
             "description": "Corte profesional con tijera y máquina, lavado y peinado. Incluye consulta de estilo.", "price": "Gs. 50.000"},
            {"title": "Corte + Barba", "icon": "razor",
             "description": "Combo completo: corte, perfilado de barba con navaja, toalla caliente y after shave.", "price": "Gs. 80.000"},
            {"title": "Coloración", "icon": "color",
             "description": "Tinturado profesional para cubrir canas o cambiar look. Productos sin amoníaco.", "price": "Gs. 100.000"},
        ],
    },
    "gym": {
        "hero_template": {
            "headline": "Entrená en {businessName}",
            "subheadline": "{city} · {rating}★ · Equipos modernos",
            "description": "Gimnasio con equipos de última generación, ambiente familiar y entrenadores certificados.",
            "ctaPrimaryText": "Clase de Prueba",
            "ctaSecondaryText": "Ver Planes",
        },
        "services_default": [
            {"title": "Membresía Mensual", "icon": "calendar",
             "description": "Acceso ilimitado a sala de musculación + cardio. Horario extendido.", "price": "Gs. 250.000/mes"},
            {"title": "Personal Trainer", "icon": "user",
             "description": "Sesiones individuales con plan personalizado. 1, 3 o 5 veces por semana.", "price": "Gs. 100.000/sesión"},
        ],
    },
    "restaurant": {
        "hero_template": {
            "headline": "{businessName} — {city}",
            "subheadline": "Cocina {cuisine} · {rating}★",
            "description": "Cocina auténtica con ingredientes frescos. Ambiente acogedor para compartir en familia o con amigos.",
            "ctaPrimaryText": "Reservar Mesa",
            "ctaSecondaryText": "Ver Carta",
        },
        "services_default": [
            {"title": "Almuerzo", "icon": "sun",
             "description": "Menú ejecutivo de lunes a viernes con plato principal, bebida y postre.", "price": "Gs. 45.000"},
            {"title": "Cena", "icon": "moon",
             "description": "Carta completa con opciones para compartir. Servicio de mesa.", "price": "Gs. 80.000"},
        ],
    },

    "nails": {
        "hero_template": {
            "headline": "{businessName} — Belleza para tus manos",
            "subheadline": "Manicura, nail art y extensiones · {city}",
            "description": "Salón de uñas profesional en {city}. Diseños únicos, productos de calidad y atención personalizada para cada clienta.",
            "ctaPrimaryText": "Reservar Turno",
            "ctaSecondaryText": "Ver Diseños",
        },
        "services_default": [
            {"title": "Manicura Tradicional", "icon": "sparkles",
             "description": "Manicura completa: limado, cutículas, hidratación y esmaltado tradicional. Acabado prolijo que dura.", "price": "Gs. 60.000"},
            {"title": "Manicura Semipermanente", "icon": "sparkles",
             "description": "Esmaltado en gel que dura hasta 3 semanas sin descascarillarse. Amplia carta de colores.", "price": "Gs. 120.000"},
            {"title": "Uñas Acrílicas", "icon": "diamond",
             "description": "Extensiones de acrílico esculpidas a medida. Largo y forma que se ajustan a tu mano.", "price": "Gs. 200.000"},
            {"title": "Nail Art", "icon": "palette",
             "description": "Diseños personalizados: francesa, degradados, decoraciones, cristales Swarovski. Cada uña es una obra de arte.", "price": "Gs. 50.000"},
            {"title": "Pedicura Spa", "icon": "water",
             "description": "Tratamiento completo para pies: exfoliación, masaje relajante, hidratación profunda y esmaltado.", "price": "Gs. 100.000"},
            {"title": "Extensiones de Pestañas", "icon": "eye",
             "description": "Pestañas pelo a pelo con técnica profesional. Mirada intensa y natural.", "price": "Gs. 180.000"},
        ],
        "faq_questions": [
            ("¿Cuánto dura una cita?",
             "Manicura tradicional: 45 min. Semipermanente: 1 hora. Acrílicas: 2 horas. Te confirmamos al reservar."),
            ("¿Necesito turno previo?",
             "Sí, trabajamos con turnos para darte la atención que merecés. Escribinos por WhatsApp."),
            ("¿Qué productos usan?",
             "Trabajamos con marcas profesionales hipoalergénicas. Tus uñas quedan protegidas y saludables."),
            ("¿Puedo llevar mi propio diseño?",
             "¡Por supuesto! Trabajamos con referencia o foto. Te asesoramos sobre lo que queda mejor en tus manos."),
            ("¿Cuánto dura el esmaltado semipermanente?",
             "Entre 2 y 3 semanas con cuidado normal. Te enseñamos cómo hacerlo durar más."),
            ("¿Atienden hombres?",
             "Sí, manicura y pedicura también son para hombres. Acabados discretos y prolijos."),
            ("¿Cómo reservo?",
             "Tocá el botón de WhatsApp, escribinos el servicio que querés y te confirmamos horario."),
        ],
    },
    "tattoo": {
        "hero_template": {
            "headline": "{businessName} — Estudio de Tatuajes",
            "subheadline": "Diseños personalizados · {city} · {rating}★",
            "description": "Estudio profesional de tatuajes con artistas certificados. Higiene impecable y diseños únicos.",
            "ctaPrimaryText": "Reservar Sesión",
            "ctaSecondaryText": "Ver Portfolio",
        },
        "services_default": [
            {"title": "Tatuaje Personalizado", "icon": "pen",
             "description": "Diseño exclusivo hecho en consulta. Trabajamos tu idea hasta que quede como lo imaginás.", "price": "Consultar"},
            {"title": "Cover Up", "icon": "layers",
             "description": "Cubrimos tatuajes antiguos con diseños nuevos. Asesoramiento gratuito sobre opciones.", "price": "Consultar"},
            {"title": "Retoque", "icon": "refresh",
             "description": "Restauramos tatuajes existentes: líneas difuminadas, colores apagados. Recuperá tu tattoo original.", "price": "Gs. 80.000"},
            {"title": "Piercing Profesional", "icon": "circle",
             "description": "Piercings corporales con joyería de calidad y técnica estéril. Asesoramiento sobre cuidados.", "price": "Gs. 100.000"},
        ],
    },
    "academy": {
        "hero_template": {
            "headline": "{businessName} — Academia en {city}",
            "subheadline": "Profesores certificados · {rating}★",
            "description": "Academia profesional con cursos personalizados. Metodología probada y resultados reales.",
            "ctaPrimaryText": "Inscribirme",
            "ctaSecondaryText": "Ver Cursos",
        },
        "services_default": [
            {"title": "Cursos Regulares", "icon": "book",
             "description": "Cursos completos con material y certificación. Grupos reducidos para atención personalizada.", "price": "Consultar"},
            {"title": "Clases Particulares", "icon": "user",
             "description": "Clases 1 a 1 con plan personalizado. Avanzás a tu ritmo según tus objetivos.", "price": "Gs. 150.000/mes"},
            {"title": "Talleres Intensivos", "icon": "calendar",
             "description": "Talleres cortos de fin de semana sobre temas específicos. Salís con conocimiento aplicable.", "price": "Gs. 200.000"},
        ],
    },
}


def detect_vertical(brief_content: str, site: dict) -> str:
    """Detect industry from WEBSITE_BRIEF.md content.

    Two-pass:
    1. Try the **Category** field from the brief (most reliable)
    2. Fall back to keyword matching on descriptions
    """
    text = (brief_content + " " + json.dumps(site)).lower()

    # Pass 1: explicit Category field from the brief (more reliable than keyword guessing)
    import re
    # Match either "| **Category** | Gym |" (markdown table) or "**Category** Gym"
    cat_match = re.search(r"Category\*?\*?\s*\|\s*([A-Za-zÁÉÍÓÚáéíóúñÑ /]+?)\s*\|", brief_content)
    if not cat_match:
        cat_match = re.search(r"\*\*Category\*\*\s+([A-Za-zÁÉÍÓÚáéíóúñÑ /]+)", brief_content)
    if cat_match:
        cat = cat_match.group(1).strip().lower()
        # Direct mapping from brief categories to templates
        cat_to_vertical = {
            "facial aesthetics": "facial_aesthetics",
            "facial": "facial_aesthetics",
            "estética facial": "facial_aesthetics",
            "spa": "spa",
            "wellness": "spa",
            "barber shop": "barber",
            "barbershop": "barber",
            "barber": "barber",
            "peluquería": "barber",
            "hair salon": "barber",
            "gym": "gym",
            "fitness": "gym",
            "gimnasio": "gym",
            "nails": "nails",
            "nail salon": "nails",
            "manicura": "nails",
            "tattoo": "tattoo",
            "tattoos": "tattoo",
            "tatuajes": "tattoo",
            "restaurant": "restaurant",
            "restaurante": "restaurant",
            "café": "restaurant",
            "cafe": "restaurant",
            "academia": "academy",
            "academy": "academy",
            "escuela": "academy",
        }
        for key, vertical in cat_to_vertical.items():
            if key in cat:
                return vertical

    # Pass 2: keyword matching on descriptions
    if any(k in text for k in ["facial", "piel", "limpieza facial", "peeling", "microdermoabrasión"]):
        return "facial_aesthetics"
    if any(k in text for k in ["manicura", "pedicura", "uña", "nail", "extensiones de pestañas"]):
        return "nails"
    if any(k in text for k in ["tatuaje", "tattoo", "tinta", "piercing"]):
        return "tattoo"
    if any(k in text for k in ["academia", "instituto", "clases", "cursos", "enseñanza"]):
        return "academy"
    if any(k in text for k in ["gimnasio", "gym", "entrenamiento", "musculación", "fitness"]):
        return "gym"
    if any(k in text for k in ["barber", "barba", "peluquería", "corte de cabello"]):
        return "barber"
    if any(k in text for k in ["spa", "hidromasaje", "masaje", "sauna", "wellness"]):
        return "spa"
    if any(k in text for k in ["restaurante", "cocina", "comida", "almuerzo", "cena", "menú"]):
        return "restaurant"
    return "spa"  # default


def fill_template(template: str, site: dict, rating: float, review_count: int) -> str:
    """Substitute {businessName}, {city}, etc. into a template string."""
    return (
        template
        .replace("{businessName}", site.get("businessName", site.get("name", "")))
        .replace("{name}", site.get("name", ""))
        .replace("{city}", site.get("city", "Asunción"))
        .replace("{rating}", str(rating))
        .replace("{review_count}", str(review_count))
        .replace("{cuisine}", "casual")
    )


def parse_brief(brief_path: Path) -> dict:
    """Extract structured info from WEBSITE_BRIEF.md."""
    info = {
        "rating": 4.5,
        "review_count": 20,
        "services": [],
        "owner": "",
    }
    if not brief_path.exists():
        return info
    text = brief_path.read_text()
    # Rating: "5.0★ (21 reviews)"
    import re
    m = re.search(r"(\d\.\d)★ \((\d+)\s*reviews?\)", text)
    if m:
        info["rating"] = float(m.group(1))
        info["review_count"] = int(m.group(2))
    # Owner (strip pipes, filter literal "Unknown")
    m = re.search(r"\*\*Owner\*\*\s*\|?\s*(.+?)\s*\|?\s*(?:\n|$)", text)
    if m:
        owner = m.group(1).strip().strip("|").strip()
        if owner.lower() not in ("unknown", "desconocido", "n/a", "-", ""):
            info["owner"] = owner
    # Services (lines starting with "- " under "## 2. Services / Products")
    m = re.search(r"## 2\..*?\n(.*?)(?=\n##|\Z)", text, re.DOTALL)
    if m:
        for line in m.group(1).split("\n"):
            line = line.strip()
            if line.startswith("- "):
                service = line[2:].strip()
                if service and not service.startswith("**"):
                    info["services"].append(service)
    return info


def generate_content(app_dir: Path, preview: bool = False) -> dict:
    """Generate a full es.json content tree for an app."""
    app_dir = Path(app_dir)
    site = json.loads((app_dir / "site.json").read_text())
    brief = parse_brief(app_dir / "WEBSITE_BRIEF.md")
    vertical = detect_vertical((app_dir / "WEBSITE_BRIEF.md").read_text() if (app_dir / "WEBSITE_BRIEF.md").exists() else "", site)
    template = INDUSTRY_TEMPLATES.get(vertical, INDUSTRY_TEMPLATES["spa"])

    # Build hero
    hero = {
        k: fill_template(v, site, brief["rating"], brief["review_count"])
        for k, v in template["hero_template"].items()
    }
    hero["ctaPrimaryHref"] = "#contacto"
    hero["ctaSecondaryHref"] = "#servicios"

    # Build services (use brief's services if present, else template defaults)
    if brief["services"]:
        # Use brief services + add descriptions from template defaults where possible
        items = []
        for i, s in enumerate(brief["services"][:6]):
            # Try to match with template
            match = None
            for td in template.get("services_default", []):
                if any(kw in s.lower() for kw in td["title"].lower().split()):
                    match = td
                    break
            if match:
                items.append({
                    "title": s,
                    "description": match["description"],
                    "price": match.get("price", "Consultar"),
                    "icon": match.get("icon") or pick_icon(s, fallback_index=i),
                })
            else:
                items.append({
                    "title": s,
                    "description": f"Servicio profesional de {s.lower()}. Realizado por {brief['owner'] or 'nuestro equipo'} con productos certificados.",
                    "price": "Consultar",
                    "icon": pick_icon(s, fallback_index=i),
                })
    else:
        items = template.get("services_default", [])

    # Build FAQ
    faq_items = []
    for q, a in template.get("faq_questions", []):
        faq_items.append({
            "question": q,
            "answer": fill_template(a, site, brief["rating"], brief["review_count"]),
        })

    # Build packages (always 3)
    business = site.get("businessName", site.get("name", "el negocio"))
    packages_items = [
        {"name": f"Pack Inicial",
         "description": f"Conocé nuestros servicios con un descuento especial. Ideal para probar {business} por primera vez.",
         "originalPrice": "Gs. 300.000", "price": "Gs. 250.000",
         "icon": "gift",
         "items": ["Una sesión de cualquier servicio", "Asesoría personalizada"]},
        {"name": "Pack Trimestral",
         "description": f"3 sesiones con 15% de descuento. Recomendado para resultados visibles y duraderos.",
         "originalPrice": "Gs. 600.000", "price": "Gs. 510.000",
         "icon": "package",
         "items": ["3 sesiones a elección", "Seguimiento entre sesiones", "Productos de regalo"]},
        {"name": "Pack Premium",
         "description": f"La experiencia completa de {business}. 6 sesiones + atenciones especiales.",
         "originalPrice": "Gs. 1.200.000", "price": "Gs. 950.000",
         "icon": "crown",
         "items": ["6 sesiones a elección", "Atención prioritaria", "Kit de productos", "Sesión de regalo al finalizar"]},
    ]

    # Build testimonials (3 generic Paraguayan ones based on rating)
    rating = brief["rating"]
    review_count = brief["review_count"]
    testimonials_items = [
        {"name": "María G.", "rating": rating, "text": f"Excelente atención y resultados visibles. {business} superó mis expectativas, lo recomiendo."},
        {"name": "Lucía R.", "rating": rating, "text": "Muy profesionales, el ambiente es súper agradable y los precios son justos. Ya fui varias veces."},
        {"name": "Carlos P.", "rating": rating, "text": f"De los mejores lugares de {site.get('city', 'la ciudad')}. {business} es serio y comprometido con sus clientes."},
    ]

    # Build gallery captions (6 generic for a placeholder gallery)
    gallery_items = [
        {"caption": "Recepción", "alt": "Recepción del local"},
        {"caption": "Sala principal", "alt": "Sala donde atendemos"},
        {"caption": "Servicio 1", "alt": "Momento del servicio"},
        {"caption": "Servicio 2", "alt": "Aplicación de productos"},
        {"caption": "Resultado final", "alt": "Resultado del tratamiento"},
        {"caption": "Equipo", "alt": "Nuestro equipo profesional"},
    ]

    # Build pricing (3 plans)
    pricing_plans = [
        {"name": "Por Sesión", "price": "Gs. 50.000–200.000", "description": "Reservá cualquier servicio individual"},
        {"name": "Mensual", "price": "Gs. 250.000", "description": "Acceso completo durante el mes"},
        {"name": "Trimestral", "price": "Gs. 650.000", "description": "Mejor precio · incluye beneficios extra"},
    ]

    # Assemble
    whatsapp = site.get("whatsapp", "")
    phone = site.get("phone", "")
    city = site.get("city", "Asunción")
    content = {
        "_meta": {
            "translationQuality": "native",
            "author": "ParaguAI / Ai-Whisperers",
            "lastReviewed": "2026-08-03",
            "version": "2.0",
            "generatedBy": "content_writer.py (R35)",
            "vertical": vertical,
        },
        "site": site,
        "navigation": {
            "businessName": site.get("businessName", site.get("name", "")),
            "items": [
                {"labelKey": "navigation.home", "path": ""},
                {"labelKey": "navigation.services", "path": "servicios"},
                {"labelKey": "navigation.about", "path": "nosotros"},
                {"labelKey": "navigation.faq", "path": "faq"},
                {"labelKey": "navigation.contact", "path": "contacto"},
            ],
        },
        "hero": hero,
        "services": {
            "title": "Nuestros Servicios",
            "subtitle": f"Tratamientos personalizados · {city}",
            "items": items,
        },
        "packages": {
            "title": "Paquetes y Promociones",
            "description": "Ahorrá con nuestros paquetes combinados.",
            "items": packages_items,
        },
        "gallery": {
            "title": "Conocé Nuestro Local",
            "items": gallery_items,
        },
        "promos": {
            "items": [
                {"title": "15% OFF primera visita", "description": "Mencioná 'WEB' cuando reserves y obtené 15% de descuento en tu primera sesión."},
            ],
        },
        "testimonials": {
            "title": f"Lo que dicen nuestros {review_count}+ clientes",
            "items": testimonials_items,
        },
        "contact": {
            "title": "Reservá tu turno",
            "description": f"Escribinos por WhatsApp o llamanos para agendar tu cita en {business}.",
            "cta": {"text": phone or whatsapp, "label": "WhatsApp"},
            "whatsappMessage": f"¡Hola! Vi la página de {business} y me gustaría reservar un turno.",
        },
        "footer": {
            "businessName": business,
            "tagline": f"© 2026 {business}. Todos los derechos reservados.",
            "credits": "Hecho con ❤️ por ParaguAI",
        },
        "faq": {
            "title": "Preguntas Frecuentes",
            "subtitle": f"Respondemos las dudas más comunes de nuestros clientes",
            "items": faq_items,
        },
        "pricing": {
            "title": "Precios Transparentes",
            "subtitle": "Sin sorpresas. Conocé nuestros precios antes de reservar.",
            "plans": pricing_plans,
        },
    }
    if preview:
        print(json.dumps(content, indent=2, ensure_ascii=False)[:5000])
    else:
        target = app_dir / "content" / "es.json"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(content, indent=2, ensure_ascii=False))
        print(f"✓ Wrote {target} ({len(json.dumps(content))} bytes)")
        print(f"  Vertical: {vertical}")
        print(f"  Services: {len(items)}")
        print(f"  FAQ: {len(faq_items)}")
        print(f"  Testimonials: {len(testimonials_items)}")
        print(f"  Rating: {brief['rating']}★ ({brief['review_count']} reviews)")
    return content


def main():
    p = argparse.ArgumentParser(description="Generate es.json content for a ParaguAI lead site")
    p.add_argument("app_dir", help="Path to the app directory (e.g., apps/Clau-Bellino)")
    p.add_argument("--preview", action="store_true", help="Print content without writing")
    args = p.parse_args()
    generate_content(args.app_dir, preview=args.preview)


if __name__ == "__main__":
    main()