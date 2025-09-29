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


## Dynamic Links Service

Replaces Firebase Dynamic Links (deprecated) with a custom branded short link system for shared notes and voice notes.

### Environment Variables

Add these to Vercel Project Settings → Environment Variables and your local `.env.local`:

```bash
# API Security
MS_BRIDGE_API_KEY=your-secret-api-key

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://msbridge.rafay99.com

# Firebase Configuration (Client SDK)
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### API Endpoints

**POST `/api/shorten`** - Create short links
- **Headers:** `x-api-key: $MS_BRIDGE_API_KEY`, `Content-Type: application/json`
- **Body:** `{ "shareId": "uuid", "type": "note"|"voice", "originalUrl": "https://..." }`
- **Response:** `{ "shortUrl": "https://msbridge.rafay99.com/r/abc123x", "shortCode": "abc123x" }`
- **Idempotent:** Same `(shareId, type)` always returns the same short code

**GET `/r/{code}`** - Redirect short links
- **Behavior:** Looks up `short_links/{code}`, increments analytics, redirects to `/s/{shareId}` or `/voice/{shareId}`
- **Analytics:** Tracks `clickCount` and `lastClicked` timestamps

### Shared Content Display

**GET `/s/{shareId}`** - Display shared notes
- **API:** `/api/shared-notes/{shareId}` reads from Firestore `shared_notes/{shareId}`
- **Requirements:** Document must have `viewOnly: true`

**GET `/voice/{shareId}`** - Display shared voice notes  
- **API:** `/api/voice-notes/{shareId}` reads from Firestore `shared_voice_notes/{shareId}`
- **Requirements:** Document must have `viewOnly: true`

### Firestore Collections

```
Firestore:
├── shared_notes/{shareId}        # Public shared notes (viewOnly: true)
├── shared_voice_notes/{shareId}  # Public shared voice notes (viewOnly: true)  
├── short_links/{code}            # Short link mappings with analytics
└── short_links_index/{type_shareId} # Index for idempotent link creation
```


### Usage Flow

1. **Flutter app** creates shared note/voice note in Firestore
2. **Flutter app** calls POST `/api/shorten` to get branded short URL
3. **User shares** the short URL (e.g., `https://msbridge.rafay99.com/r/abc123x`)
4. **Recipient clicks** → redirects to `/s/{shareId}` or `/voice/{shareId}`
5. **Web page** displays the shared content with analytics tracking


## Contact 
If you have any question then free will to react out at rafay99.com/contact-me 

or 

Email me at [99marafay@gmail.com](mailto:99marafay@gmail.com)

Website [rafay99.com](https://rafay99.com)