// Pornire din copia de pe telefon (merge și fără internet sau pe Wi-Fi cu pagină de logare);
// actualizarea se descarcă în fundal și se păstrează doar dacă e chiar aplicația.
const CACHE = 'bifa-v46';
const MARK = 'apple-mobile-web-app-title';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon.png', './fonts/inter-latin-wght-normal.woff2', './fonts/inter-latin-ext-wght-normal.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const good = r => r && r.ok && r.type === 'basic' && !r.redirected;
async function refresh(req, key) {
  const r = await fetch(req, { cache: 'no-store' });
  if (!good(r)) return null;
  const ct = r.headers.get('content-type') || '';
  if (ct.includes('text/html')) { const t = await r.clone().text(); if (!t.includes(MARK)) return null; }
  const c = await caches.open(CACHE); await c.put(key || req, r.clone()); return r;
}
self.addEventListener('fetch', e => {
  const req = e.request; const u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin) return;
  // cereri cu parametri (verificare versiune etc.): rețea, cu verificare
  if (u.search) {
    e.respondWith(fetch(req, { cache: 'no-store' }).then(r => good(r) ? r : Promise.reject()).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || Response.error())));
    return;
  }
  const isNav = req.mode === 'navigate';
  const key = isNav ? './index.html' : req;
  e.respondWith(caches.match(key).then(hit => {
    const net = refresh(req, key).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return net.then(r => r || caches.match('./index.html') || Response.error());
  }));
});
