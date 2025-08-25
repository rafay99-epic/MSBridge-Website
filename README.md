# MS Bridge – Website & Blog

Next.js app with a blog, versions/release page, RSS feeds, dynamic sitemap, caching, and a modern neutral UI.


## Stack

- Next.js 15
- React 19 (React Compiler enabled)
- TypeScript
- Tailwind CSS 3

## Getting started

```bash
npm install

# dev
npm run dev

# build & start
npm run build
npm start
```

Set your site origin for absolute URLs (RSS/Sitemap):

```bash
export NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

## Content

- Blog posts live in `/_posts` as Markdown with front‑matter.
- Add a new `my-post.md` and it appears automatically (sorted by `date`).

## Releases page

Releases are defined in `src/lib/versions.ts` and rendered at `/versions`. Latest release appears on top with a download button.

## RSS feeds

- Blog: `/feed.xml`
- Releases: `/releases.xml`

These are generated at request time and cached. Absolute links use `NEXT_PUBLIC_SITE_URL` (falls back to `http://localhost:3000`).

## Sitemap

Dynamic sitemap at `/sitemap.xml` including:

- Static pages: Home, Features, Technologies, Versions, Privacy, Terms
- All blog posts from `/_posts`
- Versions page with `lastmod` from latest release

## Caching

Configured in `next.config.js`:

- Long‑term HTTP caching for static assets
- Image optimization with AVIF/WebP and 1‑day TTL
- ISR revalidate every hour (see `src/app/layout.tsx`)

## Favicons & icons

- Favicon: `public/favicon/icon.ico`
- App Icon: `public/assets/logo/icon.png`
- Web Manifest: `public/favicon/site.webmanifest`

## Verification (Google Search Console)

Place the HTML verification file in `public/` (e.g., `public/googleXXXX.html`) and deploy. Keep the file after verification.

## Project structure (high‑level)

```text
src/app
  ├── (pages...)            # Route groups
  ├── feed.xml/route.ts     # Blog RSS
  ├── releases.xml/route.ts # Releases RSS
  ├── sitemap.xml/route.ts  # Dynamic sitemap
  └── _components           # UI components
src/lib
  ├── api.ts                # Posts loader
  ├── versions.ts           # Releases data
  └── constants.ts          # SITE_URL, etc.
_posts                      # Markdown posts
public                      # Static files (favicons, images)
```

## Notes

- UI supports light/dark theme with a neutral palette.
- React Compiler is enabled via `experimental.reactCompiler: true`.

## Deployment

Deploy on any Next.js‑compatible host (Vercel recommended). Ensure `NEXT_PUBLIC_SITE_URL` is set in production.


## Contact 
If you have any question then free will to react out at rafay99.com/contact-me 

or 

Email me at [99marafay@gmail.com](mailto:99marafay@gmail.com)

Website [rafay99.com](https://rafay99.com)