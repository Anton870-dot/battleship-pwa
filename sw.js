const CACHE = 'battleship-v141';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-180.png', './menu.webp', './menu_m.webp', './sea1.webp', './sea1_dawn.webp', './sea1_dusk.webp', './sea1_night.webp', './sea2.webp', './sea3.webp', './sea4.webp', './atlantis.webp', './atl_council.webp', ...['boat','destroyer','sub','cruiser','battleship','sub2','sub3','subx','cargo','atl_bb','atl_cargo','atl_dd','pir_dd','pir_boat','pir_ds','pir_sub','echo'].flatMap(b => ['./ship_' + b + '.webp', './top_' + b + '.webp']), './fort_base.webp', './fort_base_dawn.webp', './fort_base_dusk.webp', './fort_base_night.webp', './fort_scaffold.webp', './fort_hall.webp', './dock_hall.webp', './treasury_hall.webp', './battery_hall.webp', './academy_hall.webp', './walls_hall.webp', './memorial_room.webp', './trophy_room.webp', './pir_clan.webp', './diplomacy_room.webp', './raid_clan.webp', './raid_abyss.webp', './atl_dread.webp', './atl_leaders.webp', './sci_team.webp', './adj.webp', './adj_smile.webp', './adj_full.webp', './irena.webp', './irena_smile.webp', './irena_full.webp', './sci_orian.webp', './thalassira.webp', './fleet_hall.webp', './echo_hero.webp', './atl_elarion.webp', './atl_mirrena.webp', './atl_kael.webp', './sci_selina.webp', './sci_teyr.webp', './corvin.webp', './corvin_smile.webp', './lucia.webp', './lucia_smile.webp', './pir_ship_hero.webp', './pir_boat_hero.webp', './pir_ds_hero.webp', './pir_sub_hero.webp', './deep_sea.webp', './sci_face.webp', './deep_mission.webp', './lighthouse_hall.webp', './market_hall.webp', './barracks_hall.webp', './workshop_hall.webp', './isle_white_cliff.webp', './isle_gull_rock.webp', './isle_turtle.webp', './isle_port.webp', './isle_green.webp', './isle_green_1.webp', './isle_green_2.webp', './isle_green_3.webp', './isle_green_4.webp', './isle_green_5.webp', './isle_green_6.webp', './isle_port_1.webp', './isle_port_2.webp', './isle_port_3.webp', './isle_port_4.webp', './isle_port_5.webp', './isle_port_6.webp', './isle_turtle_1.webp', './isle_turtle_2.webp', './isle_turtle_3.webp', './isle_turtle_4.webp', './isle_turtle_5.webp', './isle_turtle_6.webp', './isle_gull_rock_1.webp', './isle_gull_rock_2.webp', './isle_gull_rock_3.webp', './isle_gull_rock_4.webp', './isle_gull_rock_5.webp', './isle_gull_rock_6.webp', './isle_white_cliff_1.webp', './isle_white_cliff_2.webp', './isle_white_cliff_3.webp', './isle_white_cliff_4.webp', './isle_white_cliff_5.webp', './isle_white_cliff_6.webp', ...['citadel','treasury','barracks','walls','battery','academy','workshop','market','dock','lighthouse'].map(b => './fort_' + b + '_1.webp')];
self.addEventListener('install', e => {
  // каждый файл кэшируется отдельно: если какой-то картинки нет на сервере, обновление всё равно ставится
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting()));
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
