#!/usr/bin/env python3
"""
annotate_screenshot.py — Expiroo blog: annotate raw screenshots for tutorials.

Companion to og_hero.py. Takes a raw browser/app capture and produces a clean,
committed 1536x1024 (3:2) annotated image: crop away chrome, redact anything
private (emails, avatars) with a neutral fill, and draw rounded red highlight
boxes — optionally numbered — over the controls a step refers to. Never runs
during `next build`; the PNGs are committed to the repo like the heroes.

Coordinate model
----------------
`--crop` is applied FIRST, in the input image's pixel space. Every `--redact`
and `--box` coordinate is then measured on the CROPPED image (top-left = 0,0).
Line weight and badge size are specified in OUTPUT pixels and back-scaled so the
result looks the same regardless of the capture's resolution.

Usage
-----
python scripts/annotate_screenshot.py \
  --in scratchpad/raw/groups-en.png \
  --out public/images/blog/en/join-expiroo-beta-step-1.png \
  --crop 0,120,1536,1144 \
  --box 640,300,300,64 --badge 1

python scripts/annotate_screenshot.py \
  --in scratchpad/raw/play-en.png \
  --out public/images/blog/en/join-expiroo-beta-step-2.png \
  --crop 0,120,1536,1144 \
  --redact 40,210,420,28 \
  --box 620,360,320,60 --badge 2
"""

import argparse
import os
import sys

from PIL import Image, ImageDraw, ImageFont

# ---------------- constantes ----------------

TARGET = (1536, 1024)          # 3:2, igual que el tamaño "site" de og_hero
RED = (229, 57, 53)            # #E53935 — highlight de anotación
RED_FILL = RED + (26,)         # ~10% de relleno translúcido dentro del box
NEUTRAL = (236, 236, 236)      # tono de superficie para tapar datos privados

OUTLINE_W = 4                  # grosor del outline en px de SALIDA
BADGE_R = 22                   # radio del badge en px de SALIDA
BADGE_FS = 26                  # tamaño de fuente del número en px de SALIDA
JPG_THRESHOLD_KB = 500         # sobre esto, además emite un JPG q85


# ---------------- fuentes ----------------

def find_bold_font(fontdir=None):
    """Fuente bold para el número del badge: busca en scripts/fonts (Plus Jakarta
    Sans 800/700), degrada a Arial Bold de Windows y, como último recurso, a la
    fuente por defecto de PIL. Sin rutas Linux hardcodeadas."""
    roots = [r for r in [fontdir, "fonts", "scripts/fonts", "assets/fonts"] if r]
    for r in roots:
        if not os.path.isdir(r):
            continue
        for dp, _, fs in os.walk(r):
            if "__MACOSX" in dp:
                continue
            for fn in fs:
                low = fn.lower()
                if (low.endswith(".ttf") and "italic" not in low
                        and not fn.startswith("._")
                        and ("_800" in fn or "_700" in fn or "bold" in low)):
                    return os.path.join(dp, fn)
    win = r"C:\Windows\Fonts"
    for n in ("arialbd.ttf", "arial.ttf"):
        p = os.path.join(win, n)
        if os.path.exists(p):
            return p
    return None


def load_font(path, size):
    if path:
        return ImageFont.truetype(path, size)
    try:
        return ImageFont.load_default(size)
    except TypeError:  # Pillow < 10.1 no acepta size
        return ImageFont.load_default()


# ---------------- parseo de coordenadas ----------------

def parse_ints(s, n, name):
    parts = [p.strip() for p in s.split(",")]
    if len(parts) != n:
        sys.exit(f"--{name} espera {n} enteros separados por coma; recibi: {s!r}")
    try:
        return tuple(int(p) for p in parts)
    except ValueError:
        sys.exit(f"--{name} debe ser enteros; recibi: {s!r}")


# ---------------- anotación ----------------

def draw_badge(draw, cx, cy, r, number, font):
    """Círculo rojo relleno con el número del paso en blanco bold, centrado en
    (cx, cy) — la esquina superior izquierda del box."""
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=RED + (255,))
    txt = str(number)
    l, t, rr, b = draw.textbbox((0, 0), txt, font=font)
    draw.text((cx - (rr - l) / 2 - l, cy - (b - t) / 2 - t), txt,
              font=font, fill=(255, 255, 255, 255))


def annotate(base, crop, redacts, boxes, badges, fontdir):
    if crop:
        l, t, r, b = crop
        base = base.crop((l, t, r, b))
    base = base.convert("RGBA")
    W, H = base.size

    aspect = W / H if H else 0
    if abs(aspect - TARGET[0] / TARGET[1]) > 0.02:
        print(f"  AVISO: recorte {W}x{H} no es 3:2 ({aspect:.3f}); el escalado "
              f"a {TARGET[0]}x{TARGET[1]} lo deformara. Ajusta --crop.")

    # px de salida -> px del recorte (se invierte el escalado final).
    sf = TARGET[1] / H

    def px(v):
        return max(1, round(v / sf))

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    for x, y, w, h in redacts:
        d.rectangle([x, y, x + w, y + h], fill=NEUTRAL + (255,))

    font = load_font(find_bold_font(fontdir), px(BADGE_FS))
    for i, (x, y, w, h) in enumerate(boxes):
        radius = max(px(6), round(min(w, h) * 0.10))
        d.rounded_rectangle([x, y, x + w, y + h], radius=radius,
                            fill=RED_FILL, outline=RED + (255,), width=px(OUTLINE_W))
        badge = badges[i] if i < len(badges) else None
        if badge:
            draw_badge(d, x, y, px(BADGE_R), badge, font)

    out = Image.alpha_composite(base, overlay).convert("RGB")
    return out.resize(TARGET, Image.LANCZOS)


# ---------------- salida ----------------

def save(img, out):
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    img.save(out, "PNG", optimize=True)
    kb = os.path.getsize(out) / 1024
    msg = f"{out}  {img.width}x{img.height}  {kb:.0f} KB"
    if kb > JPG_THRESHOLD_KB:
        jpg = os.path.splitext(out)[0] + ".jpg"
        img.save(jpg, "JPEG", quality=85, optimize=True, progressive=True)
        msg += (f"  -> tambien {jpg} ({os.path.getsize(jpg)/1024:.0f} KB); "
                f"usa el .jpg y apunta el frontmatter/markdown a el")
    print(msg)


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--in", dest="inp", required=True, help="captura cruda de entrada")
    p.add_argument("--out", required=True, help="PNG anotado de salida (1536x1024)")
    p.add_argument("--crop", default=None, metavar="L,T,R,B",
                   help="recorte en px de la imagen de ENTRADA (se aplica primero)")
    p.add_argument("--redact", action="append", default=[], metavar="X,Y,W,H",
                   help="tapa una zona con tono neutro (repetible; coords sobre el recorte)")
    p.add_argument("--box", action="append", default=[], metavar="X,Y,W,H",
                   help="highlight rojo redondeado (repetible; coords sobre el recorte)")
    p.add_argument("--badge", action="append", default=[], metavar="N",
                   help="numero del badge para el --box en la misma posicion; 0 = sin badge")
    p.add_argument("--fontdir", default="scripts/fonts",
                   help="carpeta de fuentes para el numero del badge")
    a = p.parse_args()

    crop = parse_ints(a.crop, 4, "crop") if a.crop else None
    redacts = [parse_ints(s, 4, "redact") for s in a.redact]
    boxes = [parse_ints(s, 4, "box") for s in a.box]
    badges = []
    for s in a.badge:
        try:
            n = int(s)
        except ValueError:
            sys.exit(f"--badge debe ser un entero; recibi: {s!r}")
        badges.append(n if n > 0 else None)

    base = Image.open(a.inp)
    save(annotate(base, crop, redacts, boxes, badges, a.fontdir), a.out)
