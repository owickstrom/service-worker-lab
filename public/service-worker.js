'use strict';

importScripts('serviceworker-cache-polyfill.js');

var STATIC = 'static-1.0.0';
var DYNAMIC = 'dynamic-1.0.0';
var CACHE_NAMES = [STATIC, DYNAMIC];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC).then(function (cache) {
      return cache.addAll([
        '/stylesheets/style.css',
        '/scripts/app.js'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return CACHE_NAMES.indexOf(cacheName) === -1;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(DYNAMIC).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request.clone()).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
