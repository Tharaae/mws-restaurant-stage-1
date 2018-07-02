/**
  *This is the Service Worker registered to handle site cache
  **/

const cacheName = 'cache6';
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
self.addEventListener('install', function(event) {
  console.log('SW installed!');
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('SW caching cache files');
      return cache.addAll(cacheFiles);
    })
  );
});

//When service worker activated, delete old caches if any
self.addEventListener('activate', function(event) {
  console.log('SW activated.');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCache) {
          if(thisCache !== cacheName) {
            console.log('SW deleting cache files from old cache ', thisCache);
            return caches.delete(thisCache);
          }
        })
      );
    })
  );
});

//When fetching, get file from cache if exists.
//Otherwise, fetch it from url
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // pass ignoreSearch for restaurant.html match with parameters
    caches.match(event.request, {ignoreSearch: true})
    .then(function(response) {
      // if request found in cache, then return it from cache
      if(response) {
        console.log('SW found file in cache', event.request.url);
        return response;
      }
      console.log('SW fetching url', event.request.url);

      // if request not found in cache, then fetch it from url
      return fetch(event.request)
      .then(function(response) {
        // return if no response
        if(!response) {
          console.log('SW fetch return no response', reqClone.url);
          return response;
        }

        // to handle 'Response body is already used' error
        const resClone = response.clone();

        // get requested file extension including the dot (ex: .jpg)
        const extension = event.request.url.substring(event.request.url.lastIndexOf('.'));

        //add to cache if fetched file is image asset
        if(extension == '.jpg' || extension == '.jpeg' || extension == '.png') {
          caches.open(cacheName)
          .then(function(cache) {
            console.log('SW adding new image to cache', event.request.url);
            cache.put(event.request, resClone);
          })
          .catch(function(err) {
            console.log('SW failed adding new image to cache', event.request.url, err);
          });
        }
        // return response after being cached
        return response;
      });
    })
  );
});
