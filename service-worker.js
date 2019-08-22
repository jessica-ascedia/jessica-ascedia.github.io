"use strict";

const myCache = 'my-cool-pwa-v2';
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(myCache).then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/recipes/chocolate-chip.html',
        '/recipes/shortbread.html',
        '/styles.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('my-cool-pwa-v2').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});