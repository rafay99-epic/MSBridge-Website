"use client"
import { useEffect } from "react";

// Reads a build id embedded at build time and forces clients to refresh when it changes
// Usage: place in layout so it runs on every page load
export default function CacheRefresher() {
  // Prefer an env-provided build id; fallback to current timestamp at build time
  const buildId = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";

  useEffect(() => {
    try {
      const STORAGE_KEY = "__ms_bridge_build_id";
      const previous = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (previous !== buildId) {
        // Update stored id first to avoid loops in case reload fails
        window.localStorage.setItem(STORAGE_KEY, buildId);

        // Best-effort: clear Service Worker and Cache Storage if present
        if ("caches" in window) {
          caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))).catch(() => void 0));
        }
        if (navigator.serviceWorker?.controller) {
          navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => void 0);
        }

        // Reload to fetch the latest assets and HTML
        window.location.reload();
      }
    } catch {
      // ignore
    }
  }, [buildId]);

  return null;
}


