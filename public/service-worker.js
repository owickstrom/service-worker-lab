'use strict';

importScripts('serviceworker-cache-polyfill.js');

var STATIC = 'static-v7';
var DYNAMIC = 'dynamic-v7';
var CACHE_NAMES = [STATIC, DYNAMIC];

var staticUrls = [
  '/stylesheets/style.css',
  '/images/refresh.svg',
  '/scripts/app.js',
  '/'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC).then(function (cache) {
      return cache.addAll(staticUrls);
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

function wait(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, null);
  });
}

function constantly(value) {
  return function () {
    return value;
  };
}

function isStaticAsset(request) {
  var requestUrl = '/' + request.url.replace(self.scope, '');
  return staticUrls.some(function (url) {
    return requestUrl === url;
  });
}

function resolveIfNotNull(value) {
  return function () {
    if (value) {
      return Promise.resolve(value);
    } else {
      return new Promise(function () {});
    }
  };
}

self.addEventListener('fetch', function (event) {
  var response = caches.match(event.request).then(function (match) {
    // Don't do network requests for cached static assets.
    if (isStaticAsset(event.request) && match) {
      return match;
    }

    // Only resolve the cache response after 1 second if there is a cached
    // response.
    var cacheResponse = wait(1000).then(resolveIfNotNull(match));

    // Always do a network fetch and update the cache.
    var networkResponse = fetch(event.request.clone()).then(function (response) {
      return caches.open(DYNAMIC).then(function (cache) {
        return cache.put(event.request, response.clone()).then(constantly(response));
      });
    }).catch(function (e) {
      // Use the cached value if available when the request failed (no server
      // connection etc). Otherwise just rethrow the error.
      return match || Promise.reject(e);
    });

    // RACE!
    return Promise.race([cacheResponse, networkResponse]);
  });

  event.respondWith(response);
});
