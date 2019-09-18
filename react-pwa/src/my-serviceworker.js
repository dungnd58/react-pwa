/* 
    Custom SW using Workbox 
*/
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

const urlsCache = [
    './favicon.ico'
];

//Pre-cache the static assets
workbox.precaching.precacheAndRoute([...self.__precacheManifest,...urlsCache] || []);
workbox.precaching.cleanupOutdatedCaches();

//Caching 3rd party
workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    new workbox.strategies.CacheFirst()
)

//Caching API
workbox.routing.registerRoute(
    new RegExp('/data/pricemulti'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-freshness'
    })
)
workbox.routing.registerRoute(
    new RegExp('/data/pricehistorical'),
    new workbox.strategies.CacheFirst({
        cacheName: 'api-performance',
        plugins: [
            new workbox.expiration.Plugin({
                //Only cache request for 12 hours.
                maxAgeSeconds: 12 * 60 * 60,
                //Only cache 10 requests.
                maxEntries: 50
            })
        ]
    })
)