// Phoenix Nest Training App - Service Worker
// Cache-first strategy for full offline support

const CACHE_NAME = 'pn-training-v28';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './schema.json',
  './css/styles.css',
  './js/tasks.js',
  './js/checklists.js',
  './js/db.js',
  './js/app.js',
  './js/mm.js',
  './js/ops.js',
  './js/logs.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap'
];

// Install: cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Listen for skip waiting message from page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch: cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests (POST to /api/send etc)
  if (event.request.method !== 'GET') return;

  // Never cache API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ─── Background Sync: retry queued Mattermost sends ───

self.addEventListener('sync', (event) => {
  if (event.tag === 'send-logs') {
    event.waitUntil(flushOutbox());
  }
});

async function flushOutbox() {
  // Open IndexedDB directly from SW context
  var db = await openDB();
  var tx = db.transaction('outbox', 'readonly');
  var store = tx.objectStore('outbox');
  var items = await idbGetAll(store);

  if (items.length === 0) return;

  var apiBase = self.location.origin;
  var resp = await fetch(apiBase + '/api/queue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items.map(i => i.payload))
  });

  if (resp.ok) {
    var results = await resp.json();
    // Remove successfully sent items from outbox
    var tx2 = db.transaction('outbox', 'readwrite');
    var store2 = tx2.objectStore('outbox');
    for (var i = 0; i < results.length; i++) {
      if (results[i].ok) {
        store2.delete(items[i].id);
      }
    }

    // Notify the page that queued items were sent
    var clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type: 'SYNC_COMPLETE', results: results }));
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    var req = indexedDB.open('phoenix_nest_training', 3);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGetAll(store) {
  return new Promise((resolve, reject) => {
    var req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
