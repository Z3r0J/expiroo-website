import { CONTACT_EMAIL } from './config';
import type { Locale } from './i18n';

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  /** ≤160-char meta description; falls back to `intro` if absent. */
  metaDescription?: string;
  intro: string;
  sections: LegalSection[];
};

// Privacy: this is a static marketing site — no cookies, Vercel hosting,
// cookieless Vercel Web Analytics, Web3Forms as the contact-form processor.
export const privacyDoc: Record<Locale, LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 21 July 2026',
    metaDescription:
      'Privacy at Expiroo: a cookieless website and a local-first Android app. What Google Play Billing, Firebase and AdMob process, plus your GDPR rights.',
    intro:
      'This policy covers both the Expiroo website (expiroo.app) and the Expiroo mobile app. The website is static, sets no cookies and builds no advertising profiles; the app keeps your pantry data on your device. It explains the limited data processed in each.',
    sections: [
      {
        heading: 'Who is responsible',
        body: [
          `The controller for this website is the operator named in the Imprint. You can reach us by email at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Hosting',
        body: [
          'The site is hosted by Vercel Inc. When you open a page, Vercel automatically processes technical data such as your IP address and browser type in server logs so the site can be delivered securely. Vercel acts as our processor.',
        ],
      },
      {
        heading: 'Analytics',
        body: [
          'We use Vercel Web Analytics, a cookieless tool. It measures aggregate page views without cookies, without storing your IP address in readable form, and without building cross-site profiles.',
        ],
      },
      {
        heading: 'Contact form',
        body: [
          'If you use the contact form, your name, email address and message are sent through Web3Forms, a form-processing service acting as our processor, so we can read and answer your request. We use this data only to reply to you — never for marketing.',
          `You can also email us directly at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Cookies and accounts',
        body: [
          'This website sets no cookies and needs no account.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Under the GDPR you may request access to, correction of, or deletion of your personal data, and object to its processing. To exercise these rights, contact us at ${CONTACT_EMAIL}. You also have the right to complain to a data protection authority.`,
        ],
      },
      {
        heading: 'The Expiroo app',
        body: [
          'The Expiroo app is local-first: your pantry items, expiry dates and locations are stored in a database on your device, with no account and no sign-up. We do not receive or store this inventory. If you uninstall the app, this local data is deleted with it.',
        ],
      },
      {
        heading: 'In-app purchases',
        body: [
          'Expiroo offers a Premium upgrade as a one-time purchase, not a subscription. It is processed through Google Play Billing: Google Play handles the payment, and we never see or store your payment details.',
        ],
      },
      {
        heading: 'Analytics and crash diagnostics',
        body: [
          'The app uses Firebase Analytics and Firebase Crashlytics (Google) to collect aggregated usage statistics and crash reports. This technical and diagnostic data helps us understand how the app is used and fix problems; it does not include the contents of your pantry.',
        ],
      },
      {
        heading: 'Advertising',
        body: [
          'The free version shows ads through Google AdMob, which uses device and advertising identifiers to serve them. If you are in the EEA, the UK or Switzerland, the app asks for your consent before showing personalised ads, and you can change that choice at any time in the app’s ad settings. You can reset or limit your advertising ID in your Android settings (Settings › Privacy › Ads). For this advertising data Google acts as an independent controller, not a processor — see Google’s advertising policy at https://policies.google.com/technologies/ads and its privacy policy at https://policies.google.com/privacy.',
        ],
      },
      {
        heading: 'Your rights and the app',
        body: [
          `The GDPR rights described above — access, correction, deletion and objection — apply equally to data processed through the app. To exercise them, contact us at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Data retention and deletion',
        body: [
          `Analytics, diagnostic and advertising data processed by Google’s services is kept only for a limited time, in line with Google’s retention policies. You can ask us to delete data associated with you by writing to ${CONTACT_EMAIL}. The app’s local data — your pantry and dates — is deleted when you uninstall the app.`,
        ],
      },
      {
        heading: 'Data safety on Google Play',
        body: [
          'Google Play publishes a Data Safety section on the Expiroo store listing that summarises what data the app collects and shares. It complements this policy.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de privacidad',
    updated: 'Última actualización: 21 de julio de 2026',
    metaDescription:
      'Privacidad de Expiroo: sitio sin cookies y app Android local-first. Qué tratan Google Play Billing, Firebase y AdMob, y tus derechos RGPD.',
    intro:
      'Esta política cubre tanto el sitio web de Expiroo (expiroo.app) como la app móvil Expiroo. El sitio es estático, no usa cookies ni crea perfiles publicitarios; la app guarda los datos de tu despensa en tu dispositivo. Explica los pocos datos que se tratan en cada uno.',
    sections: [
      {
        heading: 'Responsable',
        body: [
          `El responsable de este sitio es el operador indicado en el Aviso legal. Puedes escribirnos a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Alojamiento',
        body: [
          'El sitio está alojado por Vercel Inc. Al abrir una página, Vercel trata automáticamente datos técnicos como tu dirección IP y el tipo de navegador en registros de servidor para poder entregar el sitio de forma segura. Vercel actúa como encargado del tratamiento.',
        ],
      },
      {
        heading: 'Analítica',
        body: [
          'Usamos Vercel Web Analytics, una herramienta sin cookies. Mide visitas de forma agregada, sin cookies, sin guardar tu dirección IP de forma legible y sin crear perfiles entre sitios.',
        ],
      },
      {
        heading: 'Formulario de contacto',
        body: [
          'Si usas el formulario de contacto, tu nombre, correo y mensaje se envían a través de Web3Forms, un servicio de procesamiento de formularios que actúa como encargado, para que podamos leer y responder tu solicitud. Usamos estos datos solo para responderte, nunca con fines de marketing.',
          `También puedes escribirnos directamente a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Cookies y cuentas',
        body: [
          'Este sitio no usa cookies ni requiere cuenta.',
        ],
      },
      {
        heading: 'Tus derechos',
        body: [
          `Según el RGPD, puedes solicitar el acceso, la rectificación o la supresión de tus datos personales y oponerte a su tratamiento. Para ejercer estos derechos, escríbenos a ${CONTACT_EMAIL}. También puedes reclamar ante una autoridad de protección de datos.`,
        ],
      },
      {
        heading: 'La app Expiroo',
        body: [
          'La app Expiroo es local-first: tus productos, fechas de vencimiento y ubicaciones se guardan en una base de datos en tu dispositivo, sin cuenta ni registro. No recibimos ni guardamos ese inventario. Si desinstalas la app, esos datos locales se eliminan con ella.',
        ],
      },
      {
        heading: 'Compras dentro de la app',
        body: [
          'Expiroo ofrece la mejora Premium como una compra única, no una suscripción. Se procesa a través de Google Play Billing: Google Play gestiona el pago y nosotros nunca vemos ni guardamos tus datos de pago.',
        ],
      },
      {
        heading: 'Analítica y diagnóstico de fallos',
        body: [
          'La app usa Firebase Analytics y Firebase Crashlytics (Google) para recopilar estadísticas de uso agregadas e informes de fallos. Estos datos técnicos y de diagnóstico nos ayudan a entender cómo se usa la app y a corregir problemas; no incluyen el contenido de tu despensa.',
        ],
      },
      {
        heading: 'Publicidad',
        body: [
          'La versión gratuita muestra anuncios a través de Google AdMob, que usa identificadores del dispositivo y de publicidad para mostrarlos. Si estás en el EEE, el Reino Unido o Suiza, la app te solicita tu consentimiento antes de mostrar anuncios personalizados, y puedes cambiar esa elección en cualquier momento desde los ajustes de anuncios de la app. Puedes restablecer o limitar tu identificador de publicidad en los ajustes de Android (Ajustes › Privacidad › Anuncios). Para estos datos publicitarios, Google actúa como responsable independiente del tratamiento, no como encargado — consulta la política de publicidad de Google en https://policies.google.com/technologies/ads y su política de privacidad en https://policies.google.com/privacy.',
        ],
      },
      {
        heading: 'Tus derechos y la app',
        body: [
          `Los derechos del RGPD descritos arriba — acceso, rectificación, supresión y oposición — se aplican igual a los datos tratados a través de la app. Para ejercerlos, escríbenos a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Conservación y eliminación de datos',
        body: [
          `Los datos de analítica, diagnóstico y publicidad que tratan los servicios de Google se conservan solo por un tiempo limitado, según las políticas de retención de Google. Puedes solicitar la eliminación de los datos asociados a ti escribiéndonos a ${CONTACT_EMAIL}. Los datos locales de la app — tu despensa y sus fechas — se eliminan al desinstalar la app.`,
        ],
      },
      {
        heading: 'Seguridad de los datos en Google Play',
        body: [
          'Google Play publica una sección de seguridad de los datos en la ficha de Expiroo que resume qué datos recopila y comparte la app. Complementa esta política.',
        ],
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: 21. Juli 2026',
    metaDescription:
      'Datenschutz bei Expiroo: cookiefreie Website und local-first Android-App. Was Google Play Billing, Firebase und AdMob verarbeiten, plus deine DSGVO-Rechte.',
    intro:
      'Diese Erklärung gilt für die Expiroo-Website (expiroo.app) und die Expiroo-App. Die Website ist statisch, setzt keine Cookies und erstellt keine Werbeprofile; die App behält deine Vorratsdaten auf deinem Gerät. Sie beschreibt die wenigen Daten, die dabei jeweils verarbeitet werden.',
    sections: [
      {
        heading: 'Verantwortlich',
        body: [
          `Verantwortlich für diese Website ist der im Impressum genannte Betreiber. Du erreichst uns per E-Mail unter ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Hosting',
        body: [
          'Die Seite wird von Vercel Inc. gehostet. Beim Öffnen einer Seite verarbeitet Vercel automatisch technische Daten wie deine IP-Adresse und den Browsertyp in Server-Logs, damit die Seite sicher ausgeliefert werden kann. Vercel handelt als Auftragsverarbeiter.',
        ],
      },
      {
        heading: 'Analyse',
        body: [
          'Wir nutzen Vercel Web Analytics, ein cookiefreies Werkzeug. Es misst Seitenaufrufe aggregiert, ohne Cookies, ohne deine IP-Adresse lesbar zu speichern und ohne seitenübergreifende Profile.',
        ],
      },
      {
        heading: 'Kontaktformular',
        body: [
          'Wenn du das Kontaktformular nutzt, werden dein Name, deine E-Mail-Adresse und deine Nachricht über Web3Forms gesendet, einen Formulardienst, der als Auftragsverarbeiter handelt, damit wir deine Anfrage lesen und beantworten können. Wir nutzen diese Daten nur zur Antwort, nie für Werbung.',
          `Du kannst uns auch direkt unter ${CONTACT_EMAIL} schreiben.`,
        ],
      },
      {
        heading: 'Cookies und Konten',
        body: [
          'Diese Website setzt keine Cookies und braucht kein Konto.',
        ],
      },
      {
        heading: 'Deine Rechte',
        body: [
          `Nach der DSGVO kannst du Auskunft über deine personenbezogenen Daten verlangen sowie deren Berichtigung oder Löschung, und der Verarbeitung widersprechen. Wende dich dafür an ${CONTACT_EMAIL}. Du hast außerdem das Recht, dich bei einer Datenschutzbehörde zu beschweren.`,
        ],
      },
      {
        heading: 'Die Expiroo-App',
        body: [
          'Die Expiroo-App ist local-first: deine Artikel, Haltbarkeitsdaten und Lagerorte werden in einer Datenbank auf deinem Gerät gespeichert, ohne Konto und ohne Anmeldung. Wir erhalten oder speichern diesen Bestand nicht. Wenn du die App deinstallierst, werden diese lokalen Daten mit ihr gelöscht.',
        ],
      },
      {
        heading: 'Käufe in der App',
        body: [
          'Expiroo bietet die Premium-Freischaltung als einmaligen Kauf an, kein Abo. Sie wird über Google Play Billing abgewickelt: Google Play verarbeitet die Zahlung, und wir sehen oder speichern deine Zahlungsdaten nie.',
        ],
      },
      {
        heading: 'Analyse und Absturzdiagnose',
        body: [
          'Die App nutzt Firebase Analytics und Firebase Crashlytics (Google), um aggregierte Nutzungsstatistiken und Absturzberichte zu erfassen. Diese technischen und diagnostischen Daten helfen uns zu verstehen, wie die App genutzt wird, und Fehler zu beheben; sie enthalten nicht den Inhalt deines Vorrats.',
        ],
      },
      {
        heading: 'Werbung',
        body: [
          'Die kostenlose Version zeigt Werbung über Google AdMob, das dafür Geräte- und Werbe-IDs nutzt. Wenn du im EWR, im Vereinigten Königreich oder in der Schweiz bist, fragt dich die App vor personalisierter Werbung um deine Einwilligung, und du kannst diese Wahl jederzeit in den Werbeeinstellungen der App ändern. Du kannst deine Werbe-ID in den Android-Einstellungen zurücksetzen oder einschränken (Einstellungen › Datenschutz › Werbung). Für diese Werbedaten handelt Google als eigenständiger Verantwortlicher, nicht als Auftragsverarbeiter — siehe die Werberichtlinie von Google unter https://policies.google.com/technologies/ads und ihre Datenschutzerklärung unter https://policies.google.com/privacy.',
        ],
      },
      {
        heading: 'Deine Rechte und die App',
        body: [
          `Die oben beschriebenen DSGVO-Rechte — Auskunft, Berichtigung, Löschung und Widerspruch — gelten ebenso für Daten, die über die App verarbeitet werden. Wende dich zur Ausübung an ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Aufbewahrung und Löschung',
        body: [
          `Analyse-, Diagnose- und Werbedaten, die von den Diensten von Google verarbeitet werden, werden nur für begrenzte Zeit gemäß den Aufbewahrungsrichtlinien von Google gespeichert. Du kannst die Löschung der mit dir verbundenen Daten verlangen, indem du uns an ${CONTACT_EMAIL} schreibst. Die lokalen Daten der App — dein Vorrat und deine Haltbarkeitsdaten — werden beim Deinstallieren der App gelöscht.`,
        ],
      },
      {
        heading: 'Datensicherheit bei Google Play',
        body: [
          'Google Play veröffentlicht im Expiroo-Store-Eintrag einen Abschnitt zur Datensicherheit, der zusammenfasst, welche Daten die App erfasst und teilt. Er ergänzt diese Erklärung.',
        ],
      },
    ],
  },
};

// Terms for the Expiroo Android app (closed beta on Google Play). No price is
// ever stated (repo pricing rule) and no governing law is invented — the user
// provides jurisdiction later. The food-safety wording mirrors the blog Disclaimer.
export const termsDoc: Record<Locale, LegalDoc> = {
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: 21 July 2026',
    metaDescription:
      'Terms of Service for the Expiroo app: closed-beta status, a one-time Premium purchase, a food-safety disclaimer and a fair indie limitation of liability.',
    intro:
      'These terms govern your use of the Expiroo mobile app. By using the app, you accept them.',
    sections: [
      {
        heading: 'Acceptance',
        body: [
          'By downloading, installing or using the Expiroo app, you agree to these terms. If you do not agree, please do not use the app.',
        ],
      },
      {
        heading: 'Closed beta',
        body: [
          'Expiroo is currently in closed beta on Google Play. While we develop the app, features may change, break or be removed, and access is granted through the Google Play beta programme.',
        ],
      },
      {
        heading: 'Licence to use the app',
        body: [
          'We grant you a personal, non-exclusive, non-transferable licence to use Expiroo on your own devices for your personal use. You may not resell, redistribute or reverse-engineer the app except where the law allows.',
        ],
      },
      {
        heading: 'Premium purchase',
        body: [
          'Expiroo offers a Premium upgrade as a one-time purchase, not a subscription. It is sold through Google Play, and refunds are handled under Google Play’s terms.',
        ],
      },
      {
        heading: 'Food safety',
        body: [
          'Expiroo helps you keep track of dates; it does not test food and cannot guarantee that any item is safe to eat. Dates are guidelines — when a food looks, smells or tastes off, or its use-by date has passed, throw it out, and always follow the storage and use-by instructions on the package. When in doubt, throw it out.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'Expiroo is provided “as is”. We are a small independent developer and do our best to keep the app working, but we cannot guarantee it will be error-free or always available. To the extent the law allows, we are not liable for any loss arising from using the app, including spoiled food or missed reminders.',
        ],
      },
      {
        heading: 'Changes to these terms',
        body: [
          'We may update these terms as the app evolves. The version published here is always the current one; continued use after a change means you accept it.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Questions about these terms? Email us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  es: {
    title: 'Términos de servicio',
    updated: 'Última actualización: 21 de julio de 2026',
    metaDescription:
      'Términos de servicio de la app Expiroo: estado de beta cerrada, compra única Premium, aviso de seguridad alimentaria y una limitación de responsabilidad justa.',
    intro:
      'Estos términos rigen el uso de la app móvil Expiroo. Al usarla, los aceptas.',
    sections: [
      {
        heading: 'Aceptación',
        body: [
          'Al descargar, instalar o usar la app Expiroo, aceptas estos términos. Si no estás de acuerdo, no uses la app.',
        ],
      },
      {
        heading: 'Beta cerrada',
        body: [
          'Expiroo está actualmente en beta cerrada en Google Play. Mientras desarrollamos la app, las funciones pueden cambiar, fallar o retirarse, y el acceso se concede a través del programa beta de Google Play.',
        ],
      },
      {
        heading: 'Licencia de uso',
        body: [
          'Te concedemos una licencia personal, no exclusiva e intransferible para usar Expiroo en tus propios dispositivos y para tu uso personal. No puedes revender, redistribuir ni aplicar ingeniería inversa a la app, salvo donde la ley lo permita.',
        ],
      },
      {
        heading: 'Compra Premium',
        body: [
          'Expiroo ofrece la mejora Premium como una compra única, no una suscripción. Se vende a través de Google Play, y los reembolsos se gestionan según los términos de Google Play.',
        ],
      },
      {
        heading: 'Seguridad alimentaria',
        body: [
          'Expiroo te ayuda a llevar el control de las fechas; no analiza los alimentos y no puede garantizar que un producto sea seguro para comer. Las fechas son orientativas: si un alimento tiene mal aspecto, olor o sabor, o su fecha de caducidad ha pasado, deséchalo, y respeta siempre las indicaciones de conservación y consumo del envase. Ante la duda, deséchalo.',
        ],
      },
      {
        heading: 'Limitación de responsabilidad',
        body: [
          'Expiroo se ofrece “tal cual”. Somos un desarrollador independiente pequeño y hacemos lo posible por mantener la app funcionando, pero no podemos garantizar que esté libre de errores ni siempre disponible. En la medida en que la ley lo permita, no somos responsables de las pérdidas derivadas del uso de la app, incluidos alimentos echados a perder o recordatorios no recibidos.',
        ],
      },
      {
        heading: 'Cambios en estos términos',
        body: [
          'Podemos actualizar estos términos a medida que la app evoluciona. La versión publicada aquí es siempre la vigente; si sigues usando la app tras un cambio, lo aceptas.',
        ],
      },
      {
        heading: 'Contacto',
        body: [
          `¿Dudas sobre estos términos? Escríbenos a ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    updated: 'Zuletzt aktualisiert: 21. Juli 2026',
    metaDescription:
      'Nutzungsbedingungen der Expiroo-App: geschlossene Beta, einmaliger Premium-Kauf, ein Hinweis zur Lebensmittelsicherheit und eine faire Haftungsbeschränkung.',
    intro:
      'Diese Nutzungsbedingungen regeln die Nutzung der Expiroo-App. Mit der Nutzung der App erklärst du dich mit ihnen einverstanden.',
    sections: [
      {
        heading: 'Annahme',
        body: [
          'Wenn du die Expiroo-App herunterlädst, installierst oder nutzt, akzeptierst du diese Bedingungen. Wenn du nicht einverstanden bist, nutze die App bitte nicht.',
        ],
      },
      {
        heading: 'Geschlossene Beta',
        body: [
          'Expiroo befindet sich derzeit in der geschlossenen Beta bei Google Play. Während wir die App entwickeln, können sich Funktionen ändern, ausfallen oder entfernt werden, und der Zugang wird über das Beta-Programm von Google Play gewährt.',
        ],
      },
      {
        heading: 'Nutzungslizenz',
        body: [
          'Wir gewähren dir eine persönliche, nicht ausschließliche und nicht übertragbare Lizenz, Expiroo auf deinen eigenen Geräten für deinen persönlichen Gebrauch zu nutzen. Du darfst die App nicht weiterverkaufen, weiterverbreiten oder zurückentwickeln, außer soweit das Gesetz es erlaubt.',
        ],
      },
      {
        heading: 'Premium-Kauf',
        body: [
          'Expiroo bietet die Premium-Freischaltung als einmaligen Kauf an, kein Abo. Sie wird über Google Play verkauft, und Rückerstattungen richten sich nach den Bedingungen von Google Play.',
        ],
      },
      {
        heading: 'Lebensmittelsicherheit',
        body: [
          'Expiroo hilft dir, die Daten im Blick zu behalten; die App prüft keine Lebensmittel und kann nicht garantieren, dass ein Produkt sicher zu essen ist. Daten sind Richtwerte: Wenn ein Lebensmittel schlecht aussieht, riecht oder schmeckt oder sein Verbrauchsdatum abgelaufen ist, wirf es weg, und halte dich immer an die Aufbewahrungs- und Verbrauchshinweise auf der Verpackung. Im Zweifel gehört es in den Müll.',
        ],
      },
      {
        heading: 'Haftungsbeschränkung',
        body: [
          'Expiroo wird „wie besehen“ bereitgestellt. Wir sind ein kleines unabhängiges Entwicklerteam und tun unser Bestes, damit die App funktioniert, können aber nicht garantieren, dass sie fehlerfrei oder immer verfügbar ist. Soweit das Gesetz es zulässt, haften wir nicht für Schäden, die aus der Nutzung der App entstehen, einschließlich verdorbener Lebensmittel oder nicht erhaltener Erinnerungen.',
        ],
      },
      {
        heading: 'Änderungen dieser Bedingungen',
        body: [
          'Wir können diese Bedingungen anpassen, während sich die App weiterentwickelt. Es gilt immer die hier veröffentlichte Fassung; nutzt du die App nach einer Änderung weiter, erklärst du dich damit einverstanden.',
        ],
      },
      {
        heading: 'Kontakt',
        body: [
          `Fragen zu diesen Bedingungen? Schreib uns an ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
};

// Imprint (§ 5 DDG). Operator identity is intentionally left as TODO
// placeholders — the user provides the real name/address (no fabrication).
export const imprintDoc: Record<Locale, LegalDoc> = {
  en: {
    title: 'Imprint',
    updated: 'Last updated: 21 July 2026',
    intro: 'Information pursuant to § 5 DDG (German Digital Services Act).',
    sections: [
      {
        heading: 'Provider',
        body: [
          'FusionCore Apps',
          '[LEGAL ENTITY / NAME] — TODO: registered entity or operator full name',
          '[ADDRESS] — TODO: full postal address',
          `Email: ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: 'Responsible for content',
        body: [
          '[NAME] — TODO: person responsible for content, at the address above (§ 18 (2) MStV).',
        ],
      },
      {
        heading: 'Liability for content and links',
        body: [
          'The contents of this site were created with care. As a service provider we are responsible for our own content under general law but are not obliged to monitor third-party information.',
          'Links to external sites were checked at the time of linking. We have no influence over their current content and accept no liability for it; responsibility lies with the respective operators.',
        ],
      },
    ],
  },
  es: {
    title: 'Aviso legal',
    updated: 'Última actualización: 21 de julio de 2026',
    intro: 'Información conforme al § 5 DDG (Ley alemana de servicios digitales).',
    sections: [
      {
        heading: 'Titular',
        body: [
          'FusionCore Apps',
          '[ENTIDAD LEGAL / NOMBRE] — TODO: entidad registrada o nombre completo del operador',
          '[DIRECCIÓN] — TODO: dirección postal completa',
          `Correo: ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: 'Responsable del contenido',
        body: [
          '[NOMBRE] — TODO: persona responsable del contenido, en la dirección indicada (§ 18 (2) MStV).',
        ],
      },
      {
        heading: 'Responsabilidad por contenidos y enlaces',
        body: [
          'Los contenidos de este sitio se elaboraron con cuidado. Como prestador de servicios somos responsables de nuestros propios contenidos según la ley general, pero no estamos obligados a supervisar información de terceros.',
          'Los enlaces a sitios externos se revisaron en el momento de enlazarlos. No tenemos influencia sobre su contenido actual y no asumimos responsabilidad por él; corresponde a sus respectivos operadores.',
        ],
      },
    ],
  },
  de: {
    title: 'Impressum',
    updated: 'Zuletzt aktualisiert: 21. Juli 2026',
    intro: 'Angaben gemäß § 5 DDG.',
    sections: [
      {
        heading: 'Anbieter',
        body: [
          'FusionCore Apps',
          '[RECHTSTRÄGER / NAME] — TODO: registrierter Rechtsträger oder vollständiger Name des Betreibers',
          '[ADRESSE] — TODO: vollständige Anschrift',
          `E-Mail: ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: 'Verantwortlich für den Inhalt',
        body: [
          '[NAME] — TODO: verantwortliche Person, unter der oben genannten Anschrift (§ 18 Abs. 2 MStV).',
        ],
      },
      {
        heading: 'Haftung für Inhalte und Links',
        body: [
          'Die Inhalte dieser Seite wurden mit Sorgfalt erstellt. Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich, jedoch nicht verpflichtet, fremde Informationen zu überwachen.',
          'Links zu externen Seiten wurden zum Zeitpunkt der Verlinkung geprüft. Auf ihre aktuellen Inhalte haben wir keinen Einfluss und übernehmen dafür keine Haftung; verantwortlich sind die jeweiligen Betreiber.',
        ],
      },
    ],
  },
};
