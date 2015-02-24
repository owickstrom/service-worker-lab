# Service Worker Lab

In this lab you will learn how to add basic offline capabilities to a web app
using Service Worker. The app loads a couple of static assets from the server
and makes an XHR to get train departures from Malmö Central Station. Good stuff.

## Prerequisites

* NodeJS
* NPM
* Chrome 40 (currently)

## Server

```bash
npm install
npm start
```

## Objectives

1. Observe the behaviour of the app as it is. Try using the Chrome Devtools to
   simulate no or slow network.
1. Add an empty Service Worker in the `public` directory and register it in
   `public/index.html`. **Note that the Service Worker script needs to be at the
   root of its scope, or higher.** A Service Worker cannot be served at
   `/my-stuff/misc/service-worker.js` and have a scope of `/`.
1. **Add the [Cache Polyfill](https://github.com/coonsta/cache-polyfill) to be
   able to use the full Service Worker Cache API.** Without this it will be
   painful.
1. Add static assets to a separate cache in the `install` callback. This
   includes CSS and Javascript (not `service-worker.js`).
1. Add dynamic assets to a separate cache after they have been fetched. If the
   cache already has a match for the request, use that instead.
1. Improve the prior dynamic cache to always do a real request and update of the
   cache, even if the cache has a hit, but use the cache directly. This is
   effectively the same as
   [stale-while-revalidate](https://www.mnot.net/blog/2014/06/01/chrome_and_stale-while-revalidate).

## License

The MIT License (MIT)

Copyright (c) 2015 Oskar Wickström

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
