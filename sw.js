self.addEventListener("install", function(event) {
  async function installResources() {
    const urlsToCache = [
      ".",
      "index.html",
      "icons/baseline_timer_black_24px.svg",
      "icons/baseline_timer_black_18.png",
      "icons/baseline_timer_black_24.png",
      "icons/baseline_timer_black_36.png",
      "icons/baseline_timer_black_48.png"
    ];
    const cache = await caches.open("sw-cache");
    await cache.addAll(urlsToCache);
  }
  event.waitUntil(installResources());
});

self.addEventListener("fetch", function(event) {
  async function fetchResource(request) {
    const responseFromCache = await caches.match(event.request);
    return responseFromCache || fetch(request);
  }
  event.respondWith(fetchResource(event.request));
});
