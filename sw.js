/* VICEVERSE service worker. Bump VERSION whenever any file changes. */
const VERSION = "v1.5.1";
const CACHE = "viceverse-" + VERSION;
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./config.js",
  "./ads.js",
  "./anim.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./quiz.html",
  "./quiz.js",
  "./daily.html",
  "./daily.js",
  "./release-time.html",
  "./release-time.js",
  "./about.html",
  "./privacy.html",
  "./contact.html",
  "./disclaimer.html",
  "./guides/release-date-and-editions.html",
  "./guides/leonida-regions-guide.html",
  "./guides/characters-guide.html",
  "./guides/confirmed-vs-rumour.html",
  "./guides/index.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("viceverse-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // external links and sources are never cached

  // Pages: network first so updates show up, fall back to the cached shell offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }

  // Static files: cache first, refresh in the background.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
