const nombreCache = "apv-v5";
const archivos = [
    "index.html",
    "error.html",
    "css/bootstrap.css",
    "css/styles.css",
    "js/app.js",
    "js/install.js"
];

self.addEventListener("install", e => {
    console.log("Se instaló el service worker...");
    
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log("Cacheando...");
                cache.addAll(archivos)
            })
    );
});

self.addEventListener("activate", e => {
    console.log("SW activado...");
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key))
                );
            })
    );
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(responseCache => responseCache ? responseCache : caches.match("error.html"))
    );
})