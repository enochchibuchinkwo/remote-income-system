// Service worker for Remote Income System PWA.
// Caches static pages for offline use. NEVER caches checkout/Paystack (must be live + secure).
const CACHE = "ris-pwa-v1";
const STATIC = [
  "/",
  "/aura.html",
  "/product.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Never intercept Paystack or API/verify/subscribe — keep them live + secure.
  if (url.hostname.includes("paystack.com") || url.pathname.startsWith("/api/")) return;
  if (e.request.method !== "GET") return;

  // Network-first for navigation, cache fallback when offline.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match("/aura.html")))
    );
    return;
  }
  // Cache-first for static assets.
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => r))
  );
});
