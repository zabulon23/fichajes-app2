const CACHE_NAME = 'fichajes-pwa-v2';
const ASSETS = [
  '/fichajes-app2/',
  '/fichajes-app2/index.html',
  '/fichajes-app2/manifest.json',
  '/fichajes-app2/sw.js',
  '/fichajes-app2/icons/icon-192.svg',
  '/fichajes-app2/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
