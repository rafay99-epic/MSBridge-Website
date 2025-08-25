---
title: "Lessons Learned Migrating to the Next.js App Router"
excerpt: "What broke, what improved, and the checklist I wish I had first."
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2025-08-26T10:00:00.000Z"
author:
  name: "Sam Engineer"
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

The App Router offers streaming, nested layouts, and simpler data fetching—but the migration has footguns. Highlights:

## Wins

- Built-in loading UI via `loading.tsx` and `suspense`.
- Colocation of data and UI inside route segments.
- Better cache semantics for static/dynamic data.

## Gotchas

- Mixing `server` and `client` components requires deliberate boundaries.
- Node-only APIs inside client components cause hydration errors.
- Route groups can hide state; name them intentionally.

## Migration Checklist

1. Inventory dynamic routes and params.
2. Decide cache strategies per fetch: `force-cache`, `revalidate`, or `no-store`.
3. Extract browser-only code to client components.
4. Introduce `generateMetadata` for SEO parity.
5. Add tests for navigation and streaming states.

If you plan it, the move pays off.


