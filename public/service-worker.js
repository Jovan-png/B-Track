const CACHE_NAME = 'Budget-tracker';
const DATA_CACHE_NAME = 'data-cache';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/index.js',
  '/js/idb.js',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
];

// Install the service worker
self.addEventListener('install', function(evt){
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache){
            console.log('Your files were Pre-cached sucessfully')
            return cache.addAll(FILES_TO_CACHE)

        })
    )
    self.skipWaiting()
})


// Activate the service worker and remove old data from the cache
// YOUR CODE HERE
//
self.addEventListener('activate', function(evt){
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key =>{
                    if(key !== CACHE_NAME && key !== DATA_CACHE_NAME){
                        console.log('Removing old cache data', key);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    self.clients.claim()
})
// Intercept fetch requests
// YOUR CODE HERE
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
      // if cache, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       
      // if no cache, fetch request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

//
