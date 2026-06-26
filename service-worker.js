const CACHE_NAME = "daily-intake-v1";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./dashboard.html",

    "./history.html",

    "./style.css",

    "./script.js",

    "./dashboard.js",

    "./history.js"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(FILES_TO_CACHE))

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => response || fetch(event.request))

    );

});