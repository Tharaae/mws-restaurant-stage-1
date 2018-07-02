/**
 *This is the Service Worker registered to handle site cache
 **/

const cacheName = 'cache8';
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  'css/styles.css',
  'data/restaurants.json',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'js/sw-controller.js',
  'img/image-not-found.jpg'
];

// When installing the service worker, open the cache and cache the target files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      return cache.addAll(cacheFiles);
    })
    .catch((err) => {
      console.log('SW failed caching files', err);
    })
  );
});

//When service worker activated, delete old caches if any
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((thisCache) => {
          //delete this cache if this cache name is not current cache name
          if (thisCache !== cacheName) {
            return caches.delete(thisCache);
          }
        })
      );
    })
    .catch((err) => {
      console.log('SW failed deleting old caches', err);
    })
  );
});

//When fetching, get file from cache if exists.
//Otherwise, fetch it from url
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // pass ignoreSearch for restaurant.html match with parameters
    caches.match(event.request, {
      ignoreSearch: true
    })
    .then((response) => {
      // if request found in cache, then return it from cache
      if (response) {
        return response;
      }

      // if request not found in cache, then fetch it from url and cache it if image
      return fetch(event.request)
        .then((response) => {
          // return if no response
          if (!response) {
            return response;
          }

          // create cope of response to handle 'Response body is already used' error
          const resClone = response.clone();

          // get requested file extension including the dot (ex: .jpg)
          const extension = event.request.url.substring(event.request.url.lastIndexOf('.'));

          //add to cache if fetched file is image asset
          if (extension == '.jpg' || extension == '.jpeg' || extension == '.png') {
            caches.open(cacheName)
              .then((cache) => {
                cache.put(event.request, resClone);
              })
              .catch((err) => {
                console.log('SW failed adding new image to cache', event.request.url, err);
              });
          }
          // return response after being cached
          return response;
        })
        .catch((err) => {
          console.log('SW failed fetching request', err);
        });
    })
    .catch((err) => {
      console.log('SW failed matching request url', err);
    })
  );
});
