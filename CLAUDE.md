# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing/SEO site for **Expiroo** (local-first Android pantry/expiry-tracker app, currently in closed beta). Next.js 16 App Router, fully static (SSG), TypeScript strict, Tailwind CSS v4. The README covers deploy pendings (`TODO(user)` markers), the release checklist, and the new-post workflow — read it before touching routes or blog content.

## Commands

```bash
npm run dev            # dev server
npm run build          # production build — must generate all routes as SSG
npx tsc --noEmit       # typecheck (no test runner exists; this + build are the verification)
npx eslint .           # lint

# Blog hero/OG images — LOCAL ONLY, output is committed; never runs on Vercel
python scripts/og_hero.py --batch content/de/blog --outdir public/images/blog/de --fontdir scripts/fonts --app Expiroo
# run once per locale (de/en/es)
```

There are no tests. Verification = `tsc` + `build` + inspecting generated HTML in `.next/server/app/`.

## Architecture

**i18n by path segment.** Everything lives under `app/[locale]/` (`de`/`en`/`es`, `generateStaticParams`); `[locale]/layout.tsx` IS the root layout (renders `<html lang>`) — there is deliberately no `app/layout.tsx` or `app/page.tsx`. Root `/` **and the unprefixed legal routes** (`/privacy`, `/terms`, linked without a locale from the Android app) are locale-prefixed by `proxy.ts` (Next 16's renamed middleware): **307 only** (301/308 would let a CDN cache the first visitor's locale), matcher `['/', '/privacy', '/terms']`, never branch on User-Agent. Never set `output: 'export'` — it kills the proxy. UI strings live in typed dictionaries in `lib/i18n.ts` (DE uses informal *du*; ES uses LatAm-primary vocabulary — *vencimiento/refrigerador* — with Spain synonyms mentioned once).

**SEO alternates (critical invariant).** `lib/seo.ts#buildMetadata` takes `availableLocales` and emits canonical + hreflang **only for locales where the route actually exists** (+ `x-default`=en). Posts are mostly single-locale → self-only hreflang. `/en/alternatives` is en-only. Same rule applies in `app/sitemap.ts`. Emitting an alternate to a non-existent URL makes Google discard the whole hreflang cluster — never regress this.

**LocaleSwitcher** (`components/LocaleSwitcher.tsx`) is a client component that cannot see the filesystem, so it resolves per-locale destinations from the manual allowlist in `lib/routes.ts` (`RESTRICTED_ROUTES`, `POST_LOCALES`; fallback: missing post translation → `/{locale}/blog`, restricted route → locale home). Any new locale-specific route or post translation MUST be registered there or the switcher regresses to 404 links.

**Blog engine.** MDX files in `content/{locale}/blog/*.mdx`, read by `lib/posts.ts` (gray-matter) and rendered with `next-mdx-remote/rsc`. MDX files cannot use `import`/`export`; all components (Disclaimer, PostChart, tables, img) are injected via the shared map in `components/mdx/index.tsx`. **`next-mdx-remote` drops expression-valued attributes**: `<PostChart data={[...]} />` silently becomes `undefined` — pass `data` as a JSON string (`data='[...]'`).

**Device imagery.** App screenshots are raw captures (`public/images/app/{locale}/`) composited into the Galaxy S25 mockup by `components/DeviceFrame.tsx` (CSS layers, screen coords from the mockup manifest). Never use Play's composited marketing PNGs on the site — they carry their own headline/mesh. The composited feature graphics are only used as OG images (`public/images/og/`).

## Hard content rules

- **No Expiroo price anywhere** — not in copy, FAQ, JSON-LD (`MobileApplication` has no `offers`). Say "one-time purchase, no subscription" / "Einmaliger Kauf, kein Abo". `lib/config.ts` exports no price constant on purpose; the price will change over time.
- **Every statistic needs a verified source** cited inline or via `PostChart`'s `source`/`sourceUrl`. Never invent figures; unverifiable claims are omitted or explicitly flagged. Competitor prices carry an "as of <month year>" note.
- **Food-safety posts** (expired/shelf-life topics) include the `Disclaimer` MDX component.
- **Honest beta messaging**: the app is in closed beta on Google Play; every CTA (`BetaButton`, used in Hero, Header, the BetaCTA banner, and `/en/alternatives`) routes internally to the join tutorial post (`BETA_POST_SLUG` in `lib/config.ts`, slug `join-expiroo-beta`, published in all three locales). The raw Google Group link (`BETA_URL`) appears only inside that post's content, not in any UI CTA.

## Design system ("Botanical Editorial" — mirrors the app)

Tokens live as Tailwind v4 `@theme` vars in `app/globals.css` (primary `#176a21`, accent `primary-container #9df196`, night `#08240f`, semáforo fresh/warning/expired with tonal container pairs). Typography: Plus Jakarta Sans (display) + Work Sans (body) via `next/font/google` only — **never a `<link>` to fonts.googleapis.com** (German legal risk). Utility classes: `.bg-mesh`/`.bg-mesh-wide` (brand gradients, CSS not images), `.text-display/-headline/-title/-lead/-body/-label` (clamp scale), `.prose-botanical` for post bodies (do NOT add `@tailwindcss/typography`).

Rules carried over from the app:
- **No-Line Rule**: no 1px borders for separation — alternate surface backgrounds (`bg-surface` → `bg-surface-container-low`, cards `bg-surface-container-lowest`). Sanctioned lines only: input underlines and chart axis baselines.
- **No pure black** — text uses `text-on-surface` (#2d2f2f); on dark bands white/white-80.
- **Never `#9df196` as text on light surfaces** (~1.3:1); it's the accent for dark bands only. Never `warning` base as text on light — use the tonal container pairs.
- Buttons/chips are pills; CTA is always the `from-primary to-primary-dim` gradient, never flat. Cards `rounded-3xl`+.
- Forms: underlined inputs only (`border-b-2`), never boxed.
- Charts are server-rendered inline SVG with the data values printed as text and the source linked — no client chart libraries.

## Agent workflow (user requirement)

Substantive work goes through the user's Stark roster: **rhodey** is the sole code author; **pepper** does SEO/keyword/fact research (SERPs verified live, never from memory); **friday** critiques plans and QAs output; **shuri** owns visual specs; **happy** gates before commits; **edith** writes docs. Conventional commits, never with AI attribution.
