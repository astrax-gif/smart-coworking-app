/* Shared by index.html and space.html */
const B = {
  hq: { name:'HQ Coworking', mono:'HQ', sub:'Sheikh Rashid Tower · Trade Centre 2', floor:8, hours:'Mon–Fri 08:30–18:00 · members 24/7', addr:'8th Floor, Sheikh Rashid Tower, Sheikh Zayed Road, DWTC', seed:7,
    title:'Creative working environments, eight floors above the Trade Centre.', text:'Flexi desks, private desks and meeting spaces with staffed reception on weekdays and round-the-clock access for members.',
    chips:[['pin','DWTC, Sheikh Zayed Rd'],['clock','Mon–Fri 08:30–18:00'],['key','24/7 for members']], plan:'8th floor plan', botName:'HQ Concierge',
    perks:['26 flexi desks and 32 private desks','2 meeting spaces','Phone booths and admin support','Direct access to DWTC exhibitions'],
    board:[['coffee','Members’ coffee morning, Thursday'],['users','Exhibition week: book desks early'],['package','Parcel pickup now at reception']],
    kinds:{flex:['Flexi desk','Rate confirmed by the HQ team'],priv:['Private suite · 4 desks','Rate confirmed by the HQ team'],room:['Meeting space','Rate confirmed by the HQ team']}, wifi:'HQ-Members',
    photos: [
      { ico:'desk', title: 'Flexi Desk Area', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
      { ico:'door', title: 'Private Offices', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80' },
      { ico:'video', title: 'Meeting Room', url: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  maktabi: { name:'Maktabi Business Centre', mono:'M', sub:'Sheikh Rashid Tower · Trade Centre 2', floor:18, hours:'Mon–Fri 09:00–18:00', addr:'18th Floor, Sheikh Rashid Tower, Sheikh Zayed Road, DWTC', seed:21,
    title:'Designed for your success, on the 18th floor.', text:'Over 100 flexible desks, 30 private offices, two meeting rooms and an event space, with parking and a prestigious DWTC business address.',
    chips:[['pin','DWTC, Sheikh Zayed Rd'],['clock','Mon–Fri 09:00–18:00'],['car','Parking on site']], plan:'18th floor plan', botName:'Maktabi Concierge',
    perks:['100+ flexible desks, 30 private offices','Unlimited coffee and tea','Business address and mail management','Printing credits and event access'],
    board:[['coffee','Members’ breakfast, first Monday'],['briefcase','Workshop: setting up in the free zone'],['mic','Event space open for member bookings']],
    kinds:{flex:['Flexible desk','From AED 16.50 / hour (listed rate)'],priv:['Private office','Rate confirmed by the Maktabi team'],room:['Meeting room','Rate confirmed by the Maktabi team'],event:['Event space','Rate confirmed by the Maktabi team']}, wifi:'Maktabi-Guest',
    photos: [
      { ico:'door', title: 'Executive Suites', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' },
      { ico:'mic', title: 'Event Space', url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80' },
      { ico:'coffee', title: 'Lounge & Coffee Bar', url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80' }
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
  door:'<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14M2 20h20M14 12v.01"/>'
};
const ic = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const SLOTS = ['09:00 – 12:00','12:00 – 15:00','15:00 – 18:00','Full day'];
function build(b) {
  let s = B[b].seed; const rnd = () => (s = s * 16807 % 2147483647) / 2147483647, out = [];
  const add = (id, kind, x, y, w, h, label) => out.push({ id, kind, x, y, w, h, label, free: rnd() > .38 });
  if (b === 'hq') {
    for (let i = 0; i < 8; i++) add('S' + (i + 1), 'priv', 20 + i * 70, 20, 62, 76, 'S' + (i + 1));
    for (let r = 0; r < 2; r++) for (let i = 0; i < 13; i++) add('F' + (r * 13 + i + 1), 'flex', 20 + i * 43, 130 + r * 42, 35, 30);
    add('M1', 'room', 20, 236, 150, 72, 'Meeting 1'); add('M2', 'room', 184, 236, 150, 72, 'Meeting 2');
  } else {
    for (let i = 0; i < 15; i++) { add('O' + (i + 1), 'priv', 20 + i * 37, 14, 33, 46, 'O' + (i + 1)); add('O' + (i + 16), 'priv', 20 + i * 37, 300, 33, 40, 'O' + (i + 16)); }
    for (let r = 0; r < 5; r++) for (let i = 0; i < 20; i++) add('D' + (r * 20 + i + 1), 'flex', 20 + i * 28, 76 + r * 24, 23, 18);
    add('M1', 'room', 20, 208, 110, 74, 'Meeting 1'); add('M2', 'room', 140, 208, 110, 74, 'Meeting 2'); add('E1', 'event', 260, 208, 320, 74, 'Event space');
  }
  return out;
}
const AM = {
  flex:[['desk','Ergonomic desk'],['wifi','Fibre Wi-Fi'],['plug','Power and USB-C'],['coffee','Coffee and tea']],
  priv:[['lock','Lockable suite'],['desk','Furnished desks'],['wifi','Dedicated network'],['wind','Climate control']],
  room:[['video','Display and video calls'],['users','Table seating'],['wifi','Fibre Wi-Fi'],['wind','Climate control']],
  event:[['mic','AV and PA system'],['users','Flexible layout'],['wifi','Fibre Wi-Fi'],['coffee','Catering access']]
};

const KIND_PHOTO = {
  flex: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  priv: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
  room: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
  event: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80'
};
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
const BK_KEY = 'hq_portal_bookings';
function getBookings() { try { return JSON.parse(localStorage.getItem(BK_KEY)) || {}; } catch (e) { return {}; } }
function saveBooking(b, id, data) { try { const all = getBookings(); (all[b] = all[b] || {})[id] = data; localStorage.setItem(BK_KEY, JSON.stringify(all)); } catch (e) {} }
function removeBooking(b, id) { try { const all = getBookings(); if (all[b]) delete all[b][id]; localStorage.setItem(BK_KEY, JSON.stringify(all)); } catch (e) {} }

/* Theme toggle (used on both pages) */
function initTheme() {
  const root = document.documentElement, btn = document.getElementById('theme-toggle'), label = document.getElementById('theme-label');
  const sync = () => { const l = root.getAttribute('data-theme') === 'light'; label.textContent = l ? 'Light' : 'Dark'; btn.setAttribute('aria-label', l ? 'Switch to dark theme' : 'Switch to light theme'); };
  btn.addEventListener('click', () => {
    document.body.classList.add('swap');
    setTimeout(() => {
      if (root.getAttribute('data-theme') === 'light') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', root.getAttribute('data-theme') || 'dark'); } catch (e) {}
      sync(); document.body.classList.remove('swap');
    }, 250);
  });
  sync();
}
