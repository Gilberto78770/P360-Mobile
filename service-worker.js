
const CACHE_NAME = "p360-mobile-v1";

const FICHIERS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./p360-icon-192.png",
  "./p360-icon-512.png",
  "./p360-apple-touch-icon.png"
];

self.addEventListener("install", evenement => {
  evenement.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FICHIERS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", evenement => {
  evenement.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", evenement => {
  if (evenement.request.method !== "GET") return;

  evenement.respondWith(
    fetch(evenement.request).catch(() => {
      return caches.match(evenement.request);
    })
  );
});
