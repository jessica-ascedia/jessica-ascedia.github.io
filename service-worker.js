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
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });