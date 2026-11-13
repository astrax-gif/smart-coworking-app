/* Data layer. One interface, two backends: Supabase (Postgres) when configured, in-memory otherwise. */
const { HttpError } = require('./http');
const { overlaps } = require('./validate');
const useDb = () => !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
const mem = globalThis.__lumen || (globalThis.__lumen = { bookings: [], blocked: [], settings: { power: 'auto', pct: 20 } });
const DEFAULTS = { power: 'auto', pct: 20 };

async function sb(path, { method = 'GET', body, prefer } = {}) {
  const k = process.env.SUPABASE_SERVICE_KEY;
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    method, body: body ? JSON.stringify(body) : undefined,
    headers: { apikey: k, Authorization: 'Bearer ' + k, 'Content-Type': 'application/json', ...(prefer ? { Prefer: prefer } : {}) }
  });
  const text = await r.text();
  if (!r.ok) { const e = new Error('Supabase ' + r.status + ': ' + text); e.dup = text.includes('23505'); throw e; }
  return text ? JSON.parse(text) : null;
}
const fromRow = r => ({ id: r.id, ref: r.ref, space: r.space_id, name: r.name, email: r.email, date: r.date, slot: r.slot, status: r.status, drinks: r.drinks, setup: r.setup, extras: r.extras || [], notes: r.notes, wifi: { net: r.wifi_net, code: r.wifi_code }, createdAt: r.created_at });
const toRow = b => ({ ref: b.ref, space_id: b.space, name: b.name, email: b.email, date: b.date, slot: b.slot, status: 'pending', drinks: b.drinks, setup: b.setup, extras: b.extras, notes: b.notes, wifi_net: b.wifi.net, wifi_code: b.wifi.code });
const uuid = id => /^[0-9a-f-]{8,40}$/i.test(String(id));
const clash = (list, b) => list.some(x => x.space === b.space && x.date === b.date && x.status !== 'cancelled' && overlaps(x.slot, b.slot));
const conflict = () => new HttpError(409, 'That space is already booked for that time. Please pick another slot or space.');

async function createBooking(b) {
  if (!useDb()) {
    if (clash(mem.bookings, b)) throw conflict();
    const row = { ...b, id: 'm' + Date.now() + Math.floor(Math.random() * 1e4), status: 'pending', createdAt: new Date().toISOString() };
    mem.bookings.unshift(row); return row;
  }
  const same = await sb(`bookings?space_id=eq.${b.space}&date=eq.${b.date}&status=neq.cancelled&select=slot`);
  if (same.some(x => overlaps(x.slot, b.slot))) throw conflict();
  try { return fromRow((await sb('bookings', { method: 'POST', body: toRow(b), prefer: 'return=representation' }))[0]); }
  catch (e) { if (e.dup) throw conflict(); throw e; }
}
async function listBookings() {
  if (!useDb()) return mem.bookings;
  return (await sb('bookings?select=*&order=created_at.desc&limit=500')).map(fromRow);
}
async function takenOn(date) {
  if (!useDb()) return [...new Set(mem.bookings.filter(b => b.date === date && b.status !== 'cancelled').map(b => b.space))];
  return [...new Set((await sb(`bookings?date=eq.${date}&status=neq.cancelled&select=space_id`)).map(x => x.space_id))];
}
async function updateStatus(id, status) {
  if (!useDb()) { const b = mem.bookings.find(x => x.id === id); if (!b) return null; b.status = status; return b; }
  if (!uuid(id)) return null;
  const r = await sb(`bookings?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { status }, prefer: 'return=representation' });
  return r[0] ? fromRow(r[0]) : null;
}
async function deleteBooking(id) {
  if (!useDb()) { const n = mem.bookings.length; mem.bookings = mem.bookings.filter(x => x.id !== id); return mem.bookings.length < n; }
  if (!uuid(id)) return false;
  return (await sb(`bookings?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', prefer: 'return=representation' })).length > 0;
}
async function getKey(key, fallback) {
  if (!useDb()) return key === 'app' ? mem.settings : mem.blocked;
  const r = await sb(`settings?key=eq.${key}&select=value`); return r[0] ? r[0].value : fallback;
}
async function setKey(key, value) {
  if (!useDb()) { if (key === 'app') mem.settings = value; else mem.blocked = value; return value; }
  await sb('settings', { method: 'POST', body: { key, value }, prefer: 'resolution=merge-duplicates' }); return value;
}
module.exports = {
  createBooking, listBookings, takenOn, updateStatus, deleteBooking,
  getSettings: async () => ({ ...DEFAULTS, ...(await getKey('app', DEFAULTS)) }), saveSettings: v => setKey('app', v),
  getBlocked: async () => (await getKey('blocked', [])) || [], saveBlocked: v => setKey('blocked', v)
};
