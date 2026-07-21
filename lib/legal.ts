import { CONTACT_EMAIL } from './config';
import type { Locale } from './i18n';

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

// Privacy: this is a static marketing site — no cookies, Vercel hosting,
// cookieless Vercel Web Analytics, Web3Forms as the contact-form processor.
export const privacyDoc: Record<Locale, LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 21 July 2026',
    intro:
      'This website (expiroo.app) is a static marketing site for the Expiroo mobile app. It sets no cookies and builds no advertising profiles. This policy explains the limited data processed when you visit or contact us.',
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
          'This website sets no cookies and needs no account. The Expiroo app itself is local-first and keeps your data on your device — see the data safety section on its store listing.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Under the GDPR you may request access to, correction of, or deletion of your personal data, and object to its processing. To exercise these rights, contact us at ${CONTACT_EMAIL}. You also have the right to complain to a data protection authority.`,
        ],
      },
    ],
  },
  es: {
    title: 'Política de privacidad',
    updated: 'Última actualización: 21 de julio de 2026',
    intro:
      'Este sitio web (expiroo.app) es un sitio estático de presentación de la app Expiroo. No usa cookies ni crea perfiles publicitarios. Esta política explica los pocos datos que se tratan cuando lo visitas o nos escribes.',
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
          'Este sitio no usa cookies ni requiere cuenta. La app Expiroo es local-first y guarda tus datos en tu dispositivo — consulta la sección de seguridad de los datos en su ficha de la tienda.',
        ],
      },
      {
        heading: 'Tus derechos',
        body: [
          `Según el RGPD, puedes solicitar el acceso, la rectificación o la supresión de tus datos personales y oponerte a su tratamiento. Para ejercer estos derechos, escríbenos a ${CONTACT_EMAIL}. También puedes reclamar ante una autoridad de protección de datos.`,
        ],
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: 21. Juli 2026',
    intro:
      'Diese Website (expiroo.app) ist eine statische Info-Seite zur Expiroo-App. Sie setzt keine Cookies und erstellt keine Werbeprofile. Diese Erklärung beschreibt die wenigen Daten, die verarbeitet werden, wenn du sie besuchst oder uns schreibst.',
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
          'Diese Website setzt keine Cookies und braucht kein Konto. Die Expiroo-App selbst ist local-first und behält deine Daten auf deinem Gerät — siehe die Datensicherheits-Angaben im Store-Eintrag.',
        ],
      },
      {
        heading: 'Deine Rechte',
        body: [
          `Nach der DSGVO kannst du Auskunft über deine personenbezogenen Daten verlangen sowie deren Berichtigung oder Löschung, und der Verarbeitung widersprechen. Wende dich dafür an ${CONTACT_EMAIL}. Du hast außerdem das Recht, dich bei einer Datenschutzbehörde zu beschweren.`,
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
          '[NAME] — TODO: operator name',
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
          '[NOMBRE] — TODO: nombre del operador',
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
          '[NAME] — TODO: Name des Betreibers',
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
