const CACHE_NAME = 'mntn-offline-v2';

const OFFLINE_ASSETS = [
  '/offline/uk.html',
  '/offline/en.html',
  '/offline/offline.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(OFFLINE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
    const url = new URL(request.url);

    if (url.pathname.startsWith('/offline/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse ?? fetch(request);
      }),
    );

    return;
  }

  if (request.mode !== 'navigate') {
    return;
  }


  event.respondWith(
    fetch(request).catch(async () => {
      const url = new URL(request.url);
      console.log({url, path: url.pathname})

      const locale = url.pathname === '/uk' || url.pathname.startsWith('/uk/')
        ? 'uk'
        : 'en';

      return (
        (await caches.match(`/offline/${locale}.html`)) ?? Response.error()
      );
    }),
  );
});