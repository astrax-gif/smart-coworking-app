/* Shared by index.html and space.html */
const B = {
  co: { name:'Lumen Yard', mono:'LY', sub:'Halo Tower · Meridian District', floor:12, hours:'Mon–Fri 08:30–18:00 · members 24/7', addr:'Level 12, Halo Tower, Meridian District', seed:21,
    title:'Bright, flexible workspaces above the city.', text:'Open desks, private offices, meeting rooms and an event space, with staffed reception on weekdays and round-the-clock access for members.',
    chips:[['pin','Halo Tower, Meridian District'],['clock','Mon–Fri 08:30–18:00'],['key','24/7 for members']], plan:'Level 12 floor plan', botName:'Lumen Concierge',
    perks:['100+ open desks and 30 private offices','2 meeting rooms and an event space','Unlimited coffee and tea','Printing credits and member events'],
    board:[['coffee','Members’ breakfast, first Monday'],['briefcase','Workshop: setting up a small business'],['mic','Event space open for member bookings']],
    kinds:{flex:['Open desk','Rate set by the Lumen Yard team'],priv:['Private office','Rate set by the Lumen Yard team'],room:['Meeting room','Rate set by the Lumen Yard team'],event:['Event space','Rate set by the Lumen Yard team']}, wifi:'LumenYard-Members',
    photos: [
      { ico:'desk', title: 'Open Desk Area', url: 'images/flex.svg' },
      { ico:'door', title: 'Private Offices', url: 'images/priv.svg' },
      { ico:'video', title: 'Meeting Rooms', url: 'images/room.svg' },
      { ico:'mic', title: 'Event Space', url: 'images/event.svg' },
      { ico:'coffee', title: 'Lounge & Coffee Bar', url: 'images/lounge.svg' },
      { ico:'phone', title: 'Quiet Pods', url: 'images/pod.svg' }
    ]
  }
};
const ICONS = {
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2M16 7l3 3M14 9l2 2"/>',
  car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  package:'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  coffee:'<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8h1a4 4 0 0 1 0 8h-1M3 8h13v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>',
  briefcase:'<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  wifi:'<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>',
  monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  plug:'<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  wind:'<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  video:'<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  desk:'<rect width="18" height="12" x="3" y="3" rx="2"/><path d="M8 21h8M12 15v6"/>',
  phone:'<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  door:'<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14M2 20h20M14 12v.01"/>'
};
const ic = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const SLOTS = ['09:00 – 12:00','12:00 – 15:00','15:00 – 18:00','Full day'];
function build(b) {
  let s = B[b].seed; const rnd = () => (s = s * 16807 % 2147483647) / 2147483647, out = [];
  const add = (id, kind, x, y, w, h, label) => out.push({ id, kind, x, y, w, h, label: label || id, free: rnd() > .38 });
  for (let i = 0; i < 15; i++) { add('O' + (i + 1), 'priv', 20 + i * 37, 14, 33, 46, 'O' + (i + 1)); add('O' + (i + 16), 'priv', 20 + i * 37, 300, 33, 40, 'O' + (i + 16)); }
  for (let r = 0; r < 5; r++) for (let i = 0; i < 20; i++) add('D' + (r * 20 + i + 1), 'flex', 20 + i * 28, 76 + r * 24, 23, 18);
  add('M1', 'room', 20, 208, 110, 74, 'Meeting 1'); add('M2', 'room', 140, 208, 110, 74, 'Meeting 2'); add('E1', 'event', 260, 208, 320, 74, 'Event space');
  return out;
}
const AM = {
  flex:[['desk','Ergonomic desk'],['wifi','Fibre Wi-Fi'],['plug','Power and USB-C'],['coffee','Coffee and tea']],
  priv:[['lock','Lockable suite'],['desk','Furnished desks'],['wifi','Dedicated network'],['wind','Climate control']],
  room:[['video','Display and video calls'],['users','Table seating'],['wifi','Fibre Wi-Fi'],['wind','Climate control']],
  event:[['mic','AV and PA system'],['users','Flexible layout'],['wifi','Fibre Wi-Fi'],['coffee','Catering access']]
};

const KIND_PHOTO = { flex: 'images/flex.svg', priv: 'images/priv.svg', room: 'images/room.svg', event: 'images/event.svg' };
const KIND_DESC = {
  flex: 'A flexible desk in the shared work area. Sit where you like, plug in and get on with your day.',
  priv: 'A lockable private space for you and your team, away from the shared floor.',
  room: 'A bookable meeting room with a display for presentations and video calls.',
  event: 'A large space for workshops, launches and member events, with a flexible layout.'
};
/* Preference options shown on the detail page (all placeholders until the operator confirms) */
const DRINKS = ['None', 'Coffee', 'Tea', 'Water'];
const PREFS = {
  flex:  { setup: ['Standard desk', 'Standing desk'], extras: [['monitor', 'External monitor'], ['lock', 'Locker'], ['wind', 'Quiet zone'], ['plug', 'Extra power strip']] },
  priv:  { setup: ['Desks as set', 'Extra chairs'], extras: [['monitor', 'External monitor'], ['lock', 'Key access'], ['wifi', 'Dedicated network'], ['plug', 'Extra power strip']] },
  room:  { setup: ['Boardroom', 'U-shape', 'Classroom'], extras: [['video', 'Video call kit'], ['monitor', 'Whiteboard'], ['users', 'Visitor check-in'], ['coffee', 'Refreshments tray']] },
  event: { setup: ['Theatre', 'Cabaret', 'Open floor'], extras: [['mic', 'AV and PA'], ['coffee', 'Catering'], ['users', 'Visitor check-in'], ['monitor', 'Projector']] }
};

/* Bookings are saved in this browser only (demo) */
const BK_KEY = 'lumen_yard_bookings';
function getBookings() { try { return JSON.parse(localStorage.getItem(BK_KEY)) || {}; } catch (e) { return {}; } }
function saveBooking(b, id, data) { try { const all = getBookings(); (all[b] = all[b] || {})[id] = data; localStorage.setItem(BK_KEY, JSON.stringify(all)); } catch (e) {} }
function removeBooking(b, id) { try { const all = getBookings(); if (all[b]) delete all[b][id]; localStorage.setItem(BK_KEY, JSON.stringify(all)); } catch (e) {} }

/* Full-screen sunset / sunrise transition played when the theme is toggled */
let fxBusy = false;
function skyTransition(toDark, swap) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { swap(); return; }
  fxBusy = true;
  const T = 2600;
  const base = { duration: T, fill: 'forwards', direction: toDark ? 'normal' : 'reverse' };
  const mk = (css, parent) => { const e = document.createElement('div'); e.style.cssText = css; (parent || o).append(e); return e; };

  const o = document.createElement('div');
  o.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden;opacity:0';

  // Sky layers, cross-faded: day -> dusk -> night
  const day = mk('position:absolute;inset:0;background:linear-gradient(180deg,#38bdf8 0%,#bae6fd 100%)');
  const dusk = mk('position:absolute;inset:0;opacity:0;background:linear-gradient(180deg,#312e81 0%,#be185d 38%,#f97316 68%,#fde68a 100%)');
  const night = mk('position:absolute;inset:0;opacity:0;background:linear-gradient(180deg,#020617 0%,#0b132b 60%,#1e1b4b 100%)');

  // Stars
  const stars = mk('position:absolute;inset:0;opacity:0');
  for (let i = 0; i < 50; i++) {
    const z = 1 + Math.random() * 2;
    mk(`position:absolute;left:${Math.random() * 100}%;top:${Math.random() * 60}%;width:${z}px;height:${z}px;border-radius:50%;background:#fff;opacity:${.4 + Math.random() * .6}`, stars);
  }

  // Horizon glow
  const glow = mk('position:absolute;left:0;right:0;top:50vh;height:50vh;opacity:0;background:radial-gradient(ellipse 60% 70% at 50% 60%,rgba(251,146,60,.85),transparent 70%)');

  // Sun and moon (positioned by top, moved with translateY)
  const sun = mk('position:absolute;left:50%;top:0;width:110px;height:110px;border-radius:50%;background:#facc15;box-shadow:0 0 70px 24px rgba(250,204,21,.6)');
  const moon = mk('position:absolute;left:68%;top:0;width:76px;height:76px;border-radius:50%;box-shadow:inset -24px 0 0 0 #f1f5f9,0 0 30px 6px rgba(241,245,249,.25)');

  // Ridge in front: sun and moon disappear behind it
  mk('position:absolute;left:0;right:0;top:66vh;height:34vh;background:#050816;clip-path:polygon(0 60%,10% 45%,22% 58%,35% 38%,48% 55%,60% 42%,75% 58%,88% 44%,100% 56%,100% 100%,0 100%)');

  document.body.append(o);

  const ease = 'ease-in-out';
  o.animate([{ opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .85 }, { opacity: 0 }], { duration: T, fill: 'forwards' })
    .finished.then(() => { o.remove(); fxBusy = false; });

  day.animate([{ opacity: 1 }, { opacity: 1, offset: .2 }, { opacity: 0, offset: .55 }, { opacity: 0 }], base);
  dusk.animate([{ opacity: 0 }, { opacity: 0, offset: .15 }, { opacity: 1, offset: .45 }, { opacity: 0, offset: .8 }, { opacity: 0 }], base);
  night.animate([{ opacity: 0 }, { opacity: 0, offset: .45 }, { opacity: 1, offset: .85 }, { opacity: 1 }], base);
  stars.animate([{ opacity: 0 }, { opacity: 0, offset: .6 }, { opacity: 1 }], base);
  glow.animate([{ opacity: 0 }, { opacity: 0, offset: .2 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .8 }, { opacity: 0 }], base);

  // Sun sinks behind the ridge, getting bigger and redder
  sun.animate([
    { transform: 'translate(-50%,20vh) scale(1)', backgroundColor: '#facc15', boxShadow: '0 0 70px 24px rgba(250,204,21,.6)' },
    { transform: 'translate(-50%,58vh) scale(1.3)', backgroundColor: '#f97316', boxShadow: '0 0 90px 36px rgba(249,115,22,.7)', offset: .55 },
    { transform: 'translate(-50%,90vh) scale(1.45)', backgroundColor: '#dc2626', boxShadow: '0 0 100px 40px rgba(220,38,38,.6)' }
  ], { ...base, easing: ease });

  // Moon rises from behind the ridge after the sun is gone
  moon.animate([
    { transform: 'translate(-50%,92vh)', offset: 0 },
    { transform: 'translate(-50%,92vh)', offset: .45 },
    { transform: 'translate(-50%,22vh)', offset: 1 }
  ], { ...base, easing: ease });

  setTimeout(swap, T * .5);   // theme swaps at the midpoint, while the overlay fully covers the page
}

/* Theme toggle (both pages). Plays the sky transition, and the sun/moon icon morphs too. */
function initTheme() {
  const root = document.documentElement, btn = document.getElementById('theme-toggle'), label = document.getElementById('theme-label');
  const core = document.getElementById('tcore'), cut = document.getElementById('tcut'), rays = document.getElementById('trays'), g = document.getElementById('tg');
  const isLight = () => root.getAttribute('data-theme') === 'light';
  const lerp = (a, b, t) => a + (b - a) * t, ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  /* p = 0 is a sun, p = 1 is a moon */
  function draw(p) {
    core.setAttribute('r', lerp(5, 8.6, p));
    cut.setAttribute('cx', lerp(28, 17.4, p)); cut.setAttribute('cy', lerp(-4, 6.6, p));
    const s = 1 - p * .55;
    rays.setAttribute('transform', `translate(12 12) rotate(${p * 90}) scale(${s}) translate(-12 -12)`);
    rays.setAttribute('opacity', Math.max(0, 1 - p * 2.4));
    g.setAttribute('transform', `rotate(${p * -35} 12 12)`);
  }
  let p = isLight() ? 0 : 1, raf = 0;
  function animateTo(target) {
    cancelAnimationFrame(raf);
    const from = p, t0 = performance.now(), dur = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 750;
    const step = now => {
      const t = dur ? Math.min(1, (now - t0) / dur) : 1; p = lerp(from, target, ease(t)); draw(p);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  const sync = () => { label.textContent = isLight() ? 'Light' : 'Dark'; btn.setAttribute('aria-label', isLight() ? 'Switch to dark theme' : 'Switch to light theme'); };
  btn.addEventListener('click', () => {
    if (fxBusy) return;
    const toDark = isLight();
    const swap = () => {
      if (toDark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', toDark ? 'dark' : 'light'); } catch (e) {}
      sync();
    };
    animateTo(toDark ? 1 : 0);
    skyTransition(toDark, swap);
  });
  draw(p); sync();
}
