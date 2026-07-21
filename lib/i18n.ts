/**
 * i18n base: locale list, typed UI dictionaries, and lookup helpers.
 *
 * Locale notes:
 * - DE uses informal "du" (tutea).
 * - ES uses LatAm vocabulary as primary (vencimiento/refrigerador) to stay
 *   consistent with the app bundle, with España synonyms (caducar/nevera)
 *   woven in once for SEO (plan correction M5).
 */

export const locales = ['de', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  de: 'DE',
  en: 'EN',
  es: 'ES',
};

/** OpenGraph locale codes (language_TERRITORY). */
export const ogLocales: Record<Locale, string> = {
  de: 'de_DE',
  en: 'en_US',
  es: 'es_ES',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Dictionary = {
  meta: {
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    skipToContent: string;
  };
  cta: {
    beta: string;
    betaNote: string;
  };
  footer: {
    tagline: string;
    privacy: string;
    imprint: string;
    contact: string;
    rights: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
};

const en: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo — Track food expiration dates, waste less',
    defaultDescription:
      'Expiroo reminds you before food expires. Barcode scan, an urgency traffic light, and fridge / freezer / pantry locations — no account, works offline. One-time purchase, no subscription.',
  },
  nav: {
    skipToContent: 'Skip to content',
  },
  cta: {
    beta: 'Join the beta',
    betaNote: 'Closed beta on Google Play',
  },
  footer: {
    tagline: 'Never miss an expiration date again.',
    privacy: 'Privacy',
    imprint: 'Imprint',
    contact: 'Contact',
    rights: 'All rights reserved.',
    language: 'Language',
  },
  hero: {
    title: 'Never miss an expiration date',
    subtitle:
      "Expiroo tracks what's in your fridge, freezer and pantry — and reminds you before it goes bad. No account. Works offline. One-time purchase, no subscription.",
  },
};

const es: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo — Controla las fechas de vencimiento, desperdicia menos',
    defaultDescription:
      'Expiroo te avisa antes de que se venza la comida. Escaneo de código de barras, semáforo de urgencia y ubicaciones refrigerador / congelador / despensa — sin cuenta y sin conexión. Pago único, sin suscripción.',
  },
  nav: {
    skipToContent: 'Saltar al contenido',
  },
  cta: {
    beta: 'Únete a la beta',
    betaNote: 'Beta cerrada en Google Play',
  },
  footer: {
    tagline: 'No vuelvas a olvidar una fecha de vencimiento.',
    privacy: 'Privacidad',
    imprint: 'Aviso legal',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    language: 'Idioma',
  },
  hero: {
    title: 'Controla las fechas de vencimiento',
    subtitle:
      'Expiroo organiza lo que hay en tu refrigerador, congelador y despensa, y te avisa antes de que caduque. Sin cuenta. Funciona sin conexión. Pago único, sin suscripción.',
  },
};

const de: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo — Haltbarkeitsdatum & MHD im Blick, weniger wegwerfen',
    defaultDescription:
      'Expiroo erinnert dich, bevor Lebensmittel ablaufen. Barcode-Scan, Dringlichkeits-Ampel und Orte für Kühlschrank / Gefrierfach / Vorrat — ohne Konto, offline. Einmaliger Kauf, kein Abo.',
  },
  nav: {
    skipToContent: 'Zum Inhalt springen',
  },
  cta: {
    beta: 'Zur Beta anmelden',
    betaNote: 'Geschlossene Beta bei Google Play',
  },
  footer: {
    tagline: 'Verpasse nie wieder ein Haltbarkeitsdatum.',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    contact: 'Kontakt',
    rights: 'Alle Rechte vorbehalten.',
    language: 'Sprache',
  },
  hero: {
    title: 'Haltbarkeitsdatum im Blick',
    subtitle:
      'Expiroo behält im Blick, was in Kühlschrank, Gefrierfach und Vorrat liegt – und erinnert dich, bevor es abläuft. Ohne Konto. Offline. Einmaliger Kauf, kein Abo.',
  },
};

const dictionaries: Record<Locale, Dictionary> = { de, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
