const CACHE = 'battleship-v55';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-180.png', './menu.webp', './sea1.webp', './sea2.webp', './sea3.webp', './sea4.webp', './atlantis.webp', './atl_council.webp', ...['boat','destroyer','sub','cruiser','battleship','sub2','sub3','subx','cargo','atl_bb','atl_cargo','atl_dd'].flatMap(b => ['./ship_' + b + '.webp', './top_' + b + '.webp']), './fort_base.webp', './fort_base_dawn.webp', './fort_base_dusk.webp', './fort_base_night.webp', './fort_scaffold.webp', './fort_hall.webp', './dock_hall.webp', ...['citadel','treasury','barracks','walls','battery','academy','workshop','market','dock','lighthouse'].map(b => './fort_' + b + '_1.webp')];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// network first for the page (so updates arrive), cache first for the rest
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate';
  if (isPage) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
