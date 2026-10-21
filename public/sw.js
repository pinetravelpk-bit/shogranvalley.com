const CACHE='shogran-offline-v1';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/offline.html','/travel/icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shogran-offline-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Network-only for all content, admin and booking requests. Cache only the generic offline screen.
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).catch(()=>caches.match('/offline.html')))});
