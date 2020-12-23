const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/index.html",
  "/vendor/bootstrap/css/bootstrap.min.css",
  "/assets/css/fontawesome.css",
  "/assets/css/templatemo-style.css",
  "/assets/css/owl.css",
  "/assets/css/lightbox.css",
  "/assets/images/author-image.jpg",
  "/vendor/jquery/jquery.min.js",
  "/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "/assets/js/isotope.min.js",
  "/assets/js/owl-carousel.js",
  "/assets/js/lightbox.js",
  "/assets/js/custom.js"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME){  
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if(response){
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }
      
      console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
      return fetch(event.request);
    })
  );
});

