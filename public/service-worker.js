'use strict';

importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function () {
  console.log('I\'m installed!');
});

self.addEventListener('activate', function () {
  console.log('I\'m activated!');
});

self.addEventListener('fetch', function () {
  console.log('I\'m intercepting a fetch!');
});
