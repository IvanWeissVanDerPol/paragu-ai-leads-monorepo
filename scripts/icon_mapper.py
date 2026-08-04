#!/usr/bin/env python3
"""
scripts/icon_mapper.py — Per-brief + per-service icon matching.

Given a service title (Spanish), pick the best matching icon from a curated
Lucide/Heroicons set. Strategy:
1. Direct keyword match (e.g., "manicura" → "sparkles", "uñas acrílicas" → "diamond")
2. Partial substring match
3. Fuzzy category match (e.g., "facial" + "limpieza" → "drop")
4. Fallback: vary by index to avoid visual monotony

Icons are designed to work with the SectionsRenderer used across all ParaguAI
lead sites (renders via lucide-react or inline SVG).

CLI:
    python3 icon_mapper.py "Manicura semipermanente"
    python3 icon_mapper.py --varied 5 "service name"  # 5 icons for different items
"""

import argparse
import re
import sys
from typing import Optional


# ============================================================================
# Icon catalog — organized by semantic cluster
# ============================================================================

# Each entry: keyword(s) → icon_name
ICON_MAP = {
    # Hair / Barber
    "corte": "scissors",
    "tijera": "scissors",
    "barba": "razor",
    "afeitar": "razor",
    "navaja": "razor",
    "perfilar": "razor",
    "peluqueria": "scissors",
    "cabello": "scissors",
    "color": "palette",
    "tinte": "palette",
    "coloración": "palette",
    "mechas": "palette",
    "balayage": "palette",

    # Nails
    "manicura": "sparkles",
    "pedicura": "sparkles",
    "uña": "diamond",
    "uñas": "diamond",
    "acrilico": "diamond",
    "acrílico": "diamond",
    "gel": "sparkles",
    "semipermanente": "sparkles",
    "nail art": "palette",
    "pestaña": "eye",
    "pestañas": "eye",
    "extensiones": "layers",

    # Facial aesthetics
    "facial": "drop",
    "limpieza": "drop",
    "piel": "heart",
    "peeling": "leaf",
    "microdermabrasión": "diamond",
    "hidratación": "droplet",
    "hidratacion": "droplet",
    "anti-age": "shield",
    "antiedad": "shield",
    "rejuvenecim": "shield",
    "antienvejec": "shield",
    "arrugas": "shield",
    "mascarilla": "leaf",
    "mascarilla facial": "leaf",
    "serum": "drop",
    "sérum": "drop",

    # Spa / Massage
    "masaje": "hands",
    "relajante": "leaf",
    "relajacion": "leaf",
    "relajación": "leaf",
    "spa": "wave",
    "sauna": "flame",
    "vapor": "flame",
    "hidromasaje": "wave",
    "aromaterapia": "leaf",
    "aceite": "drop",

    # Body
    "cuerpo": "user",
    "corporal": "user",
    "tratamiento corporal": "user",
    "celulitis": "shield",
    "reduccion": "shield",
    "reducción": "shield",
    "moldeador": "shield",

    # Gym / Fitness
    "gimnasio": "dumbbell",
    "gym": "dumbbell",
    "musculación": "dumbbell",
    "musculacion": "dumbbell",
    "entrenamiento": "dumbbell",
    "funcional": "zap",
    "crossfit": "zap",
    "cardio": "heart",
    "pesas": "dumbbell",
    "clases": "users",
    "grupal": "users",
    "grupales": "users",
    "personal": "user",
    "entrenador": "user",
    "nutrición": "apple",
    "nutricion": "apple",
    "dieta": "apple",
    "alimentación": "apple",

    # Tattoo
    "tatuaje": "pen",
    "tattoo": "pen",
    "tinta": "pen",
    "diseño": "pen",
    "diseno": "pen",
    "cover": "layers",
    "retocar": "refresh",
    "retoque": "refresh",
    "piercing": "circle",

    # Academy / Education
    "curso": "book",
    "cursos": "book",
    "clase": "book",
    "clases": "book",
    "taller": "calendar",
    "academia": "graduation",
    "instituto": "graduation",
    "enseñanza": "graduation",

    # Restaurant / Food
    "almuerzo": "sun",
    "cena": "moon",
    "desayuno": "coffee",
    "comida": "coffee",
    "plato": "coffee",
    "menu": "book",
    "menú": "book",

    # Generic / fallback
    "servicio": "sparkles",
    "producto": "package",
    "consulta": "message-circle",
    "reserva": "calendar",
    "sesión": "calendar",
    "sesion": "calendar",
    "turno": "calendar",
    "promoción": "tag",
    "promocion": "tag",
}


# Fallback rotation when no keyword matches
FALLBACK_ROTATION = [
    "sparkles", "star", "heart", "shield", "drop",
    "zap", "award", "check-circle", "target", "rocket",
]


def _normalize(text: str) -> str:
    """Lowercase + strip accents + collapse whitespace."""
    text = text.lower().strip()
    # Strip accents for matching
    replacements = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
        "ñ": "n", "ü": "u",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text


def pick_icon(title: str, fallback_index: int = 0) -> str:
    """Pick the best icon for a service title.

    Strategy:
    1. Direct keyword match (longest match wins)
    2. Substring match (prioritize TATTOO over generic words like 'personal')
    3. Fallback: rotate through FALLBACK_ROTATION to avoid visual monotony
    """
    if not title:
        return FALLBACK_ROTATION[fallback_index % len(FALLBACK_ROTATION)]

    text = _normalize(title)

    # Pass 1: direct keyword match — tattoo/piercing first to win over generic words
    priority_clusters = [
        # tattoo wins over "personal"
        ["tatuaje", "tattoo", "tinta", "piercing", "cover up", "retoque"],
    ]
    for cluster in priority_clusters:
        for keyword in cluster:
            if _normalize(keyword) in text:
                return ICON_MAP[keyword]

    # Pass 2: longest direct match wins
    matches = []
    for keyword, icon in ICON_MAP.items():
        if _normalize(keyword) in text:
            matches.append((len(keyword), keyword, icon))
    if matches:
        matches.sort(reverse=True)
        return matches[0][2]

    # Pass 3: varied fallback
    return FALLBACK_ROTATION[fallback_index % len(FALLBACK_ROTATION)]


def map_icons(titles: list[str]) -> list[str]:
    """Pick icons for a list of titles, with index-aware fallback."""
    icons = []
    for i, title in enumerate(titles):
        icons.append(pick_icon(title, fallback_index=i))
    return icons


# ============================================================================
# CLI
# ============================================================================

def main():
    p = argparse.ArgumentParser(description="Pick icons for service titles")
    p.add_argument("title", nargs="?", help="Single service title to match")
    p.add_argument("--varied", type=int, metavar="N", help="Generate N icons (varied fallback)")

    args = p.parse_args()
    if args.varied:
        icons = map_icons([f"item-{i}" for i in range(args.varied)])
        for i, icon in enumerate(icons):
            print(f"  item-{i}: {icon}")
    elif args.title:
        icon = pick_icon(args.title)
        print(f"  '{args.title}' → {icon}")
    else:
        # Demo with sample titles
        samples = [
            "Manicura semipermanente",
            "Peeling químico",
            "Masaje relajante",
            "Corte clásico",
            "Entrenamiento personal",
            "Tatuaje personalizado",
            "Manicura tradicional",
            "Limpieza facial profunda",
            "Curso de maquillaje",
        ]
        print("Sample matches:")
        for s in samples:
            print(f"  {s:30} → {pick_icon(s)}")


if __name__ == "__main__":
    main()