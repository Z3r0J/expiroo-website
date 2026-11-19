import type { IconName } from '@/components/Icon';

/**
 * i18n base: locale list, typed UI dictionaries, and lookup helpers.
 *
 * Locale notes:
 * - DE uses informal "du" (tutea), matching the app's de bundle.
 * - ES uses LatAm vocabulary as primary (vencimiento/refrigerador/alacena) to
 *   stay consistent with the app bundle, with España synonyms (caducidad/nevera/
 *   despensa) woven in once for SEO España (plan correction M5).
 * Copy sourced from projects/expiroo/aso/{en-US,de-DE,es-419}.md.
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

export type FeatureCard = {
  icon: IconName;
  title: string;
  body: string;
  chip?: string;
};

export type FaqItem = { q: string; a: string };

export type ChartBar = {
  label: string;
  value: number;
  display: string;
  highlight?: boolean;
};

export type Dictionary = {
  meta: { defaultTitle: string; defaultDescription: string };
  nav: { skipToContent: string; blog: string; contact: string };
  cta: { download: string; note: string };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    eyebrow: string;
    heading: string;
    items: FeatureCard[];
    notvorrat?: { title: string; body: string; cta: string; href: string };
  };
  carousel: { eyebrow: string; heading: string; slides: string[] };
  waste: {
    eyebrow: string;
    heading: string;
    lead: string;
    caption: string;
    ariaLabel: string;
    bars: ChartBar[];
    sourceLabel: string;
    sourceUrl: string;
  };
  latestPosts: { eyebrow: string; heading: string };
  faq: { eyebrow: string; heading: string; items: FaqItem[] };
  downloadBanner: {
    headingLead: string;
    headingHighlight: string;
    sub: string;
    cta: string;
  };
  blog: {
    eyebrow: string;
    heading: string;
    description: string;
    empty: string;
    minRead: string;
    related: string;
    allPosts: string;
    updated: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    fallback: string;
    required: string;
  };
  footer: {
    tagline: string;
    availability: string;
    publisher: string;
    productHeading: string;
    blog: string;
    contact: string;
    alternatives?: string;
    legalHeading: string;
    privacy: string;
    imprint: string;
    terms: string;
    rights: string;
    language: string;
    notAvailable: string;
  };
};

const en: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo: Food Expiry Tracker & Pantry App for Android',
    defaultDescription:
      'Expiroo is a food expiry tracker app for Android: a fridge and pantry inventory that reminds you before food goes bad. Free on Google Play, no account, offline.',
  },
  nav: { skipToContent: 'Skip to content', blog: 'Blog', contact: 'Contact' },
  cta: { download: 'Get it on Google Play', note: 'Free download · Android 7.0 or later · No account' },
  hero: {
    eyebrow: 'Food expiry tracker · Android',
    titleLead: 'Never miss an ',
    titleHighlight: 'expiration date',
    lead: 'Half the food you throw away was still good yesterday. Expiroo remembers what’s in your fridge, freezer and pantry — and warns you before it goes bad.',
    ctaPrimary: 'Get it on Google Play',
    ctaSecondary: 'See features',
  },
  features: {
    eyebrow: 'Features',
    heading: 'A fridge and pantry inventory that keeps food out of the bin',
    items: [
      {
        icon: 'reminders',
        title: 'Alerts that reach you in time',
        body: 'Get notified 7, 3 and 1 days before an item expires — and again on the day. Set your own schedule or switch to a single daily summary.',
      },
      {
        icon: 'barcode',
        title: 'Scan the barcode, skip the typing',
        body: 'Point the camera at a barcode and Expiroo fills in the product name. Add the date and you’re done in seconds.',
      },
      {
        icon: 'urgency',
        title: 'Your whole kitchen at a glance',
        body: 'A traffic-light home screen sorts everything by urgency: expired first, expiring soon next, fresh last.',
      },
      {
        icon: 'locations',
        title: 'Fridge, freezer, pantry — your layout',
        body: 'Build your own locations and categories: fridge, freezer, pantry, cupboard, even the medicine cabinet. Anything with a printed date.',
      },
      {
        icon: 'waste',
        title: 'See what you’re wasting',
        body: 'The waste report shows what you consumed against what you threw out, month by month. The first month’s total is usually a wake-up call.',
      },
      {
        icon: 'privacy',
        title: 'No cloud, no account, no tracking',
        body: 'Your inventory lives in a local database on your device. No login, no account, no server collecting what you eat.',
        chip: 'No account · Offline',
      },
    ],
  },
  carousel: {
    eyebrow: 'A look inside',
    heading: 'See Expiroo in action',
    slides: [
      'Home screen sorting items by urgency',
      'An expiry reminder notification',
      'Barcode scanner detecting a product',
      'Settings — no account required',
      'Fridge, freezer and pantry locations',
      'Monthly food waste report',
    ],
  },
  waste: {
    eyebrow: 'The problem',
    heading: 'Households throw away the most',
    lead: 'Worldwide, households waste about 79 kg of food per person every year — part of 1.05 billion tonnes thrown away in 2022. Expiroo helps you keep your part of it down.',
    caption: 'Share of global food waste, 2022',
    ariaLabel:
      'Bar chart: households account for 60% of global food waste, the rest of the supply chain 40%.',
    bars: [
      { label: 'Households', value: 60, display: '60%', highlight: true },
      { label: 'Rest of the supply chain', value: 40, display: '40%' },
    ],
    sourceLabel: 'UNEP Food Waste Index Report 2024',
    sourceUrl: 'https://www.unep.org/resources/publication/food-waste-index-report-2024',
  },
  latestPosts: {
    eyebrow: 'From the blog',
    heading: 'Guides to waste less food',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'The questions people ask most',
    items: [
      {
        q: 'Is Expiroo free?',
        a: 'Yes. Expiroo is a free download on Google Play. The free version shows ads and tracks up to 10 items at a time, so you can try the whole app before deciding.',
      },
      {
        q: 'Do I need an account?',
        a: 'No. There’s no account and no sign-up — everything stays in a local database on your phone.',
      },
      {
        q: 'Does it work offline?',
        a: 'Completely. Expiroo never needs a connection to add or check an item.',
      },
      {
        q: 'What’s Expiroo Premium?',
        a: 'An optional upgrade you buy inside the app through Google Play. It’s a one-time purchase, not a subscription: it removes ads, unlocks unlimited items and opens the full statistics dashboard. Pay once, keep it forever.',
      },
      {
        q: 'Is Expiroo only for Android?',
        a: 'Yes. Expiroo is an Android app on Google Play and runs on Android 7.0 or later. An iPhone app with the same name exists, but it comes from a different developer and has nothing to do with this one.',
      },
      {
        q: 'What is a food expiry tracker app?',
        a: 'An app that keeps an inventory of your fridge, freezer and pantry with the date on each item, and reminds you before something expires. Expiroo does that on Android, with barcode scanning to add items fast. Comparing options? See our guide to the best food expiration tracker apps for Android on the blog.',
      },
      {
        q: 'Can I scan barcodes?',
        a: 'Yes. Scan a product’s barcode and Expiroo fills in the name automatically; you just add the date.',
      },
    ],
  },
  downloadBanner: {
    headingLead: 'Download Expiroo and ',
    headingHighlight: 'waste less',
    sub: 'Free on Google Play · Premium is a one-time purchase, no subscription',
    cta: 'Get it on Google Play',
  },
  blog: {
    eyebrow: 'Blog',
    heading: 'Notes on food, dates and waste',
    description:
      'Practical guides on food storage, expiration dates and cutting food waste — from the team behind Expiroo.',
    empty: 'No articles yet — check back soon.',
    minRead: 'min read',
    related: 'Keep reading',
    allPosts: 'All articles',
    updated: 'Updated',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Get in touch',
    lead: 'Questions, bug reports, feature ideas — send a message and we’ll get back to you.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    successTitle: 'Message sent',
    successBody: 'Thanks — we’ll reply to your email soon.',
    errorTitle: 'Something went wrong',
    errorBody: 'Your message could not be sent. Please email us directly:',
    fallback: 'Prefer email? Write to',
    required: 'This field is required.',
  },
  footer: {
    tagline: 'The food expiration tracker that keeps everything on your phone.',
    availability: 'Available on Google Play for Android.',
    publisher: 'An app by',
    productHeading: 'Product',
    blog: 'Blog',
    contact: 'Contact',
    alternatives: 'Alternatives',
    legalHeading: 'Legal',
    privacy: 'Privacy',
    imprint: 'Imprint',
    terms: 'Terms',
    rights: 'All rights reserved.',
    language: 'Language',
    notAvailable: 'Not available in this language',
  },
};

const es: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo: app para controlar fechas de vencimiento',
    defaultDescription:
      'Expiroo controla las fechas de vencimiento de tu refrigerador, congelador y alacena — un control de caducidad gratis en Google Play que te avisa antes de que algo se eche a perder.',
  },
  nav: { skipToContent: 'Saltar al contenido', blog: 'Blog', contact: 'Contacto' },
  cta: { download: 'Disponible en Google Play', note: 'Descarga gratis · Android 7.0 o superior · Sin cuenta' },
  hero: {
    eyebrow: 'Control de vencimientos · Android',
    titleLead: 'Controla las ',
    titleHighlight: 'fechas de vencimiento',
    lead: 'La mitad de la comida que botas todavía estaba buena ayer. Expiroo recuerda lo que tienes en el refrigerador, el congelador y la alacena, y te avisa antes de que se eche a perder.',
    ctaPrimary: 'Disponible en Google Play',
    ctaSecondary: 'Ver funciones',
  },
  features: {
    eyebrow: 'Funciones',
    heading: 'Funciones para que no se te pase ni una fecha',
    items: [
      {
        icon: 'reminders',
        title: 'Avisos que no se te escapan',
        body: 'Recibe un aviso 7, 3 y 1 días antes de que un producto venza, y también el mismo día. Elige tus intervalos o cámbialos por un resumen diario.',
      },
      {
        icon: 'barcode',
        title: 'Escanea el código, olvídate de escribir',
        body: 'Apunta la cámara al código de barras y Expiroo llena el nombre del producto. Agregas la fecha y listo, en segundos.',
      },
      {
        icon: 'urgency',
        title: 'Toda tu cocina de un vistazo',
        body: 'La pantalla principal funciona como un semáforo y ordena todo por urgencia: primero lo vencido, luego lo que está por vencer y al final lo fresco.',
      },
      {
        icon: 'locations',
        title: 'Refrigerador, congelador y alacena, a tu manera',
        body: 'Crea tus propias ubicaciones y categorías: refrigerador o nevera, congelador, alacena, despensa, hasta el botiquín. Cualquier cosa con una fecha impresa.',
      },
      {
        icon: 'waste',
        title: 'Mira cuánto estás botando',
        body: 'El reporte de desperdicio te muestra lo que consumiste frente a lo que tiraste, mes a mes. El total del primer mes suele abrir los ojos.',
      },
      {
        icon: 'privacy',
        title: 'Privacidad sin letra pequeña',
        body: 'Tu inventario vive en una base de datos local, en tu dispositivo. Sin login, sin cuenta y sin ningún servidor recopilando lo que comes.',
        chip: 'Sin cuenta · Offline',
      },
    ],
  },
  carousel: {
    eyebrow: 'Un vistazo por dentro',
    heading: 'Expiroo en acción',
    slides: [
      'Pantalla principal ordenando por urgencia',
      'Una notificación de recordatorio de vencimiento',
      'Escáner de código de barras detectando un producto',
      'Ajustes — sin necesidad de cuenta',
      'Ubicaciones: refrigerador, congelador y alacena',
      'Reporte mensual de desperdicio',
    ],
  },
  waste: {
    eyebrow: 'El problema',
    heading: 'Los hogares son los que más tiran',
    lead: 'En España se desperdician 1.125 millones de kg de comida al año — unos 24,38 kg por persona. Expiroo está para que tu parte de esa cifra baje.',
    caption: 'Desperdicio en el ámbito del consumo (no incluye producción ni distribución)',
    ariaLabel:
      'Gráfico de barras: dentro del desperdicio medido en el ámbito del consumo, los hogares concentran el 97,5 % y el consumo fuera del hogar el 2,5 %. No incluye producción ni distribución.',
    bars: [
      { label: 'Hogares', value: 97.5, display: '97,5 %', highlight: true },
      { label: 'Fuera del hogar', value: 2.5, display: '2,5 %' },
    ],
    sourceLabel: 'MAPA, Desperdicio Alimentario 2024',
    sourceUrl: 'https://www.mapa.gob.es',
  },
  latestPosts: {
    eyebrow: 'Del blog',
    heading: 'Guías para desperdiciar menos comida',
  },
  faq: {
    eyebrow: 'Preguntas',
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Expiroo es gratis?',
        a: 'Sí. Expiroo se descarga gratis desde Google Play. La versión gratuita muestra anuncios y controla hasta 10 productos a la vez, así que puedes probar toda la app antes de decidir.',
      },
      {
        q: '¿Necesito una cuenta?',
        a: 'No. No hay cuenta ni registro: todo se queda en una base de datos local en tu teléfono.',
      },
      {
        q: '¿Funciona sin conexión?',
        a: 'Por completo. Expiroo nunca necesita internet para agregar o consultar un producto.',
      },
      {
        q: '¿Qué es Expiroo Premium?',
        a: 'Una mejora opcional que compras dentro de la app a través de Google Play. Es un pago único, no una suscripción: quita los anuncios, desbloquea productos ilimitados y abre el panel completo de estadísticas. Pagas una vez y es tuyo.',
      },
      {
        q: '¿Expiroo es solo para Android?',
        a: 'Sí. Expiroo es una app para Android en Google Play y funciona con Android 7.0 o superior. Existe una app para iPhone con el mismo nombre, pero es de otro desarrollador y no tiene nada que ver con esta.',
      },
      {
        q: '¿Puedo escanear códigos de barras?',
        a: 'Sí. Escanea el código de barras de un producto y Expiroo llena el nombre automáticamente; tú solo agregas la fecha.',
      },
    ],
  },
  downloadBanner: {
    headingLead: 'Descarga Expiroo y ',
    headingHighlight: 'desperdicia menos',
    sub: 'Gratis en Google Play · Premium es un pago único, sin suscripción',
    cta: 'Disponible en Google Play',
  },
  blog: {
    eyebrow: 'Blog',
    heading: 'Notas sobre comida, fechas y desperdicio',
    description:
      'Guías prácticas sobre conservación de alimentos, fechas de vencimiento y cómo desperdiciar menos — del equipo de Expiroo.',
    empty: 'Todavía no hay artículos — vuelve pronto.',
    minRead: 'min de lectura',
    related: 'Sigue leyendo',
    allPosts: 'Todos los artículos',
    updated: 'Actualizado',
  },
  contact: {
    eyebrow: 'Contacto',
    heading: 'Escríbenos',
    lead: 'Dudas, reportes de errores, ideas para la app — envía un mensaje y te responderemos.',
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    successTitle: 'Mensaje enviado',
    successBody: 'Gracias — te responderemos a tu correo pronto.',
    errorTitle: 'Algo salió mal',
    errorBody: 'No se pudo enviar tu mensaje. Escríbenos directamente:',
    fallback: '¿Prefieres el correo? Escribe a',
    required: 'Este campo es obligatorio.',
  },
  footer: {
    tagline: 'El control de fechas de vencimiento que guarda todo en tu teléfono.',
    availability: 'Disponible en Google Play para Android.',
    publisher: 'Una app de',
    productHeading: 'Producto',
    blog: 'Blog',
    contact: 'Contacto',
    legalHeading: 'Legal',
    privacy: 'Privacidad',
    imprint: 'Aviso legal',
    terms: 'Términos',
    rights: 'Todos los derechos reservados.',
    language: 'Idioma',
    notAvailable: 'No disponible en este idioma',
  },
};

const de: Dictionary = {
  meta: {
    defaultTitle: 'Expiroo: Haltbarkeitsdatum-App mit Erinnerung für Android',
    defaultDescription:
      'Die Kühlschrank- und Vorrats-App, die jedes Haltbarkeitsdatum (MHD) im Blick behält und dich vor Ablauf erinnert. Kostenlos bei Google Play, ohne Konto.',
  },
  nav: { skipToContent: 'Zum Inhalt springen', blog: 'Blog', contact: 'Kontakt' },
  cta: { download: 'Jetzt bei Google Play', note: 'Kostenloser Download · ab Android 7.0 · ohne Konto' },
  hero: {
    eyebrow: 'Haltbarkeits-Tracker · Android',
    titleLead: 'Haltbarkeitsdatum ',
    titleHighlight: 'im Blick',
    lead: 'Die Hälfte der Lebensmittel, die du wegwirfst, war gestern noch gut. Expiroo behält im Blick, was in Kühlschrank, Gefrierschrank und Vorratskammer liegt — und meldet sich, bevor etwas schlecht wird.',
    ctaPrimary: 'Jetzt bei Google Play',
    ctaSecondary: 'Funktionen ansehen',
  },
  features: {
    eyebrow: 'Funktionen',
    heading: 'Funktionen, die dafür sorgen, dass nichts vergammelt',
    items: [
      {
        icon: 'reminders',
        title: 'Erinnerungen, die dich wirklich erreichen',
        body: 'Du wirst 7, 3 und 1 Tag vor Ablauf benachrichtigt — und noch einmal am Tag selbst. Die Intervalle stellst du selbst ein oder wechselst zu einer Tageszusammenfassung.',
      },
      {
        icon: 'barcode',
        title: 'Barcode scannen statt tippen',
        body: 'Kamera auf den Barcode halten, und Expiroo trägt den Produktnamen ein. MHD ergänzen, fertig, in Sekunden.',
      },
      {
        icon: 'urgency',
        title: 'Alles auf einen Blick',
        body: 'Der Startbildschirm sortiert nach Dringlichkeit wie eine Ampel: abgelaufen zuerst, dann was bald abläuft, zuletzt das Frische.',
      },
      {
        icon: 'locations',
        title: 'Kühlschrank, Gefrierschrank, Vorrat — dein Aufbau',
        body: 'Lagerorte und Kategorien legst du selbst an: Kühlschrank, Gefrierschrank, Vorratskammer, Keller, Medikamentenschrank. Alles mit aufgedrucktem Datum.',
      },
      {
        icon: 'waste',
        title: 'Sieh, was weggeworfen wird',
        body: 'Der Verschwendungs-Bericht stellt Monat für Monat gegenüber, was du verbraucht und was du entsorgt hast. Die Summe des ersten Monats ist oft ein Weckruf.',
      },
      {
        icon: 'privacy',
        title: 'Deine Daten bleiben bei dir',
        body: 'Dein Bestand liegt in einer lokalen Datenbank auf deinem Gerät. Kein Login, kein Konto, kein Server, der mitschreibt, was du isst.',
        chip: 'Ohne Konto · Offline',
      },
    ],
    notvorrat: {
      title: 'Auch für den Notvorrat',
      body: 'Wer einen Notvorrat im Rotationsverfahren führt, braucht genau das: eine Liste, die nach MHD sortiert und rechtzeitig meldet, was als Nächstes verbraucht werden sollte.',
      cta: 'Notvorrat richtig anlegen',
      href: '/de/blog/notvorrat-anlegen-rotieren',
    },
  },
  carousel: {
    eyebrow: 'Ein Blick hinein',
    heading: 'Expiroo in Aktion',
    slides: [
      'Startbildschirm nach Dringlichkeit sortiert',
      'Eine Erinnerung vor dem Ablaufdatum',
      'Barcode-Scanner erkennt ein Produkt',
      'Einstellungen — ohne Konto',
      'Orte: Kühlschrank, Gefrierschrank und Vorrat',
      'Monatlicher Verschwendungs-Bericht',
    ],
  },
  waste: {
    eyebrow: 'Das Problem',
    heading: 'Haushalte werfen am meisten weg',
    lead: 'In Deutschland fallen 10,8 Mio. Tonnen Lebensmittelabfälle pro Jahr an — rund 74,5 kg pro Kopf. Expiroo hilft dir, deinen Teil davon kleiner zu halten.',
    caption: 'Anteil an der Lebensmittelverschwendung',
    ariaLabel:
      'Balkendiagramm: Haushalte verursachen 58 % der Lebensmittelabfälle, der Rest der Kette 42 %.',
    bars: [
      { label: 'Haushalte', value: 58, display: '58 %', highlight: true },
      { label: 'Rest der Kette', value: 42, display: '42 %' },
    ],
    sourceLabel: 'BMLEH / UBA, 2022',
    sourceUrl: 'https://www.bmleh.de',
  },
  latestPosts: {
    eyebrow: 'Aus dem Blog',
    heading: 'Ratgeber gegen Lebensmittel\u00ADverschwendung',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Häufige Fragen',
    items: [
      {
        q: 'Ist Expiroo kostenlos?',
        a: 'Ja. Expiroo lädst du kostenlos bei Google Play herunter. Die kostenlose Version zeigt Werbung und verwaltet bis zu 10 Artikel gleichzeitig, genug, um die ganze App zu testen.',
      },
      {
        q: 'Brauche ich ein Konto?',
        a: 'Nein. Es gibt kein Konto und keine Anmeldung — alles bleibt in einer lokalen Datenbank auf deinem Gerät.',
      },
      {
        q: 'Funktioniert es offline?',
        a: 'Vollständig. Expiroo braucht zum Eintragen oder Nachsehen nie eine Verbindung.',
      },
      {
        q: 'Was ist Expiroo Premium?',
        a: 'Ein optionales Upgrade, das du in der App über Google Play kaufst. Es ist ein einmaliger Kauf, kein Abo: Es entfernt die Werbung, hebt das Limit auf und schaltet die vollständige Statistik frei. Einmal zahlen, dauerhaft behalten.',
      },
      {
        q: 'Gibt es Expiroo nur für Android?',
        a: 'Ja. Expiroo ist eine Android-App bei Google Play und läuft ab Android 7.0. Es gibt eine iPhone-App mit demselben Namen, aber sie stammt von einem anderen Entwickler und hat mit dieser App nichts zu tun.',
      },
      {
        q: 'Kann ich Barcodes scannen?',
        a: 'Ja. Scanne den Barcode eines Produkts, und Expiroo trägt den Namen automatisch ein; du ergänzt nur das Datum.',
      },
    ],
  },
  downloadBanner: {
    headingLead: 'Hol dir Expiroo und ',
    headingHighlight: 'wirf weniger weg',
    sub: 'Kostenlos bei Google Play · Premium ist ein einmaliger Kauf, kein Abo',
    cta: 'Jetzt bei Google Play',
  },
  blog: {
    eyebrow: 'Blog',
    heading: 'Notizen zu Lebensmitteln, Daten und Verschwendung',
    description:
      'Praktische Ratgeber zu Lebensmitteln, Haltbarkeit und weniger Verschwendung — vom Team hinter Expiroo.',
    empty: 'Noch keine Artikel — schau bald wieder vorbei.',
    minRead: 'Min. Lesezeit',
    related: 'Weiterlesen',
    allPosts: 'Alle Artikel',
    updated: 'Aktualisiert',
  },
  contact: {
    eyebrow: 'Kontakt',
    heading: 'Schreib uns',
    lead: 'Fragen, Fehlerberichte, Ideen für die App — schick eine Nachricht und wir melden uns.',
    name: 'Name',
    email: 'E-Mail',
    message: 'Nachricht',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    successTitle: 'Nachricht gesendet',
    successBody: 'Danke — wir antworten dir bald per E-Mail.',
    errorTitle: 'Etwas ist schiefgelaufen',
    errorBody: 'Deine Nachricht konnte nicht gesendet werden. Schreib uns direkt:',
    fallback: 'Lieber per E-Mail? Schreib an',
    required: 'Dieses Feld ist erforderlich.',
  },
  footer: {
    tagline: 'Der Haltbarkeits-Tracker, der alles auf deinem Gerät behält.',
    availability: 'Erhältlich bei Google Play für Android.',
    publisher: 'Eine App von',
    productHeading: 'Produkt',
    blog: 'Blog',
    contact: 'Kontakt',
    legalHeading: 'Rechtliches',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    terms: 'Nutzungsbedingungen',
    rights: 'Alle Rechte vorbehalten.',
    language: 'Sprache',
    notAvailable: 'In dieser Sprache nicht verfügbar',
  },
};

const dictionaries: Record<Locale, Dictionary> = { de, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
