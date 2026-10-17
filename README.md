# expiroo.app

Marketing site for **Expiroo** (local-first pantry/expiry-tracking app). Static
one-pager per locale (hero, features, screenshots, FAQ) plus a blog, legal
pages, and a contact form.

## Stack

- Next.js 16 (App Router), static generation (SSG)
- TypeScript, `strict: true`
- Tailwind CSS v4
- MDX blog via `next-mdx-remote` + `gray-matter`
- i18n: `/de`, `/en`, `/es` — root `/` and the unprefixed legal routes
  (`/privacy`, `/terms`, linked without a locale from the Android app)
  redirect via `proxy.ts` (Next 16's renamed `middleware` convention),
  307 based on `Accept-Language`
- Contact form: [Web3Forms](https://web3forms.com) (no backend)
- Hosting target: Vercel, custom domain `expiroo.app`

## Commands

```bash
npm run dev          # local dev server
npm run build         # production build (SSG)
npx tsc --noEmit       # type-check only, no build output
```

### Blog hero/OG images

Heroes and OG images are generated **locally only** with a Python script and
the PNG/JPG output is committed to the repo — it never runs on Vercel/CI.

```bash
python scripts/og_hero.py --batch content/de/blog --outdir public/images/blog/de \
  --fontdir scripts/fonts --app Expiroo
```

Run it once per locale (`content/de/blog` → `public/images/blog/de`, same
pattern for `en`/`es`). It reads `title`, `description` (subtitle) and
`category` (kicker) from each post's frontmatter. It always renders a PNG
first; if the result is over 900 KB it also renders a JPG and prints a hint to
use that one instead — commit whichever file the post's `image` frontmatter
field actually points to, not both.

Fonts used by the script (Plus Jakarta Sans, Work Sans, JetBrains Mono) live
in `scripts/fonts/` and are Google Fonts under the SIL Open Font License.
**TODO:** add the `OFL.txt` license text to that folder (flagged by `happy`'s
pre-commit scan).

## Pending before/after deploy

These are placeholders or manual steps left for the site owner — search the
codebase for `TODO(user)` to find them again:

- [x] Replace `BETA_URL` in `lib/config.ts` with the real closed-beta Google
      Group invite link. UI CTAs (`BetaButton`) no longer link to it directly —
      they route to the `/{locale}/blog/${BETA_POST_SLUG}` join tutorial post
      (`join-expiroo-beta`, all three locales); `BETA_URL` now appears only
      inside that post's content.
- [ ] Replace `PLAY_URL` in `lib/config.ts` (`'#'` placeholder) with the Play
      Store listing URL once the app is public.
- [ ] Create a Web3Forms access key at [web3forms.com](https://web3forms.com)
      (using the `support@expiroo.app` inbox) and set it as
      `NEXT_PUBLIC_WEB3FORMS_KEY` in both Vercel's project env vars and
      `.env.local` (see `.env.local.example`).
- [ ] Fill in real Impressum data in `lib/legal.ts` — `[NAME]` / `[ADDRESS]`
      placeholders appear once per locale (DE/EN/ES).
- [ ] Confirm the `support@expiroo.app` mailbox exists and is monitored
      (`CONTACT_EMAIL` in `lib/config.ts`).
- [ ] Point `expiroo.app` DNS to Vercel.
- [ ] Enable Vercel Web Analytics for the project in the Vercel dashboard
      (the privacy policy already assumes it's on — cookieless, no IP storage).
- [ ] Add the site to Google Search Console for all three locale prefixes and
      submit `sitemap.xml`.

## Release checklist

Rules that keep the i18n/content system consistent — check these before
merging anything that touches routes or blog posts:

- **New locale-specific route or post translation** → register it in
  `lib/routes.ts`: `RESTRICTED_ROUTES` for a route that only exists in some
  locales (e.g. `/en/alternatives`), `POST_LOCALES` for a blog slug once it
  exists in more than one locale. The `LocaleSwitcher` is a client component
  and can't read the filesystem, so it relies on this file to avoid linking to
  a 404.
- **`PostChart` in MDX** → always pass `data` as a JSON *string*, never a JS
  expression. `next-mdx-remote`'s serializer drops expression-valued
  attributes, so `data={[...]}` silently becomes `undefined`; only
  `data='[...]'` survives.
- **Any figure/statistic in a post** → must have a verifiable source (cited
  inline or via `PostChart`'s `source`/`sourceUrl`).
- **Never** state Expiroo's price anywhere in copy — `lib/config.ts` exports
  no price constant on purpose; see the comment at the top of that file.
- **App Store assets** → never use Play's composited/marketing screenshot
  PNGs. Use raw device captures only, wrapped in `DeviceFrame`
  (`components/DeviceFrame.tsx`).

## Project structure

```
app/[locale]/       route segments: page (home), blog, blog/[slug],
                     alternatives (en-only), contact, privacy, imprint
content/{de,en,es}/blog/   MDX posts, one file per slug
public/images/blog/{de,en,es}/   hero/OG images (see og_hero.py above)
lib/                 config.ts, i18n.ts (dictionaries), legal.ts, posts.ts,
                     routes.ts, seo.ts, jsonld.ts
components/           shared UI + components/mdx (MDX component map)
scripts/og_hero.py    local-only hero/OG image generator
scripts/annotate_screenshot.py  local-only tutorial screenshot cropper/annotator
                     (companion to og_hero.py, output committed)
proxy.ts              root `/` locale-detect redirect
```

## Writing a new blog post

1. Add `content/<locale>/blog/<slug>.mdx` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "..." # also used as the meta description
   date: "YYYY-MM-DD"
   updated: "YYYY-MM-DD" # optional; set when the content is revised (quoted)
   keyword: "..."
   image: "/images/blog/<locale>/<slug>.jpg"
   readingMinutes: 7
   category: "..."
   ---
   ```
2. Generate the hero image (see [Blog hero/OG images](#blog-heroog-images)
   above) — run the batch command for that locale after adding the post, then
   confirm `image` in the frontmatter matches the file that was actually
   produced (`.jpg` if the script downgraded it).
3. Cite sources for any statistic, ideally with a `PostChart` (JSON-string
   `data`, see the release checklist above).
4. If the post is a translation of an existing slug, add it to
   `POST_LOCALES` in `lib/routes.ts`.
