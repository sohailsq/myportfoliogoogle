const CACHE_PREFIX = 'sohail-portfolio-pwa-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const PRECACHE_URLS = [
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/hero_developer_workspace_1790605403219.jpg',
  '/images/project_jetfyx_trading_1790605421873.jpg',
  '/images/project_nexadeutsch_learning_1790605451699.jpg',
  '/images/project_richesse_fintech_1790605439082.jpg',
  '/images/sohail_developer_portrait_1790605389453.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const shellResponse = await fetch('/', { cache: 'reload' });
    if (!shellResponse.ok) {
      throw new Error(`Unable to precache the application shell: ${shellResponse.status}`);
    }

    const html = await shellResponse.clone().text();
    await cache.put('/', shellResponse);

    const shellAssets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))(?:\?[^"']*)?["']/gi)]
      .map((match) => new URL(match[1], self.location.origin))
      .filter((url) => url.origin === self.location.origin)
      .map((url) => url.href);

    await cache.addAll([...new Set([...PRECACHE_URLS, ...shellAssets])]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
      .map((cacheName) => caches.delete(cacheName)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put('/', response.clone());
        }
        return response;
      } catch {
        const cachedShell = await caches.match('/');
        if (cachedShell) return cachedShell;
        throw new Error('The application shell is unavailable offline.');
      }
    })());
    return;
  }

  if (!['script', 'style', 'image', 'font'].includes(request.destination)) {
    return;
  }

  event.respondWith((async () => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
