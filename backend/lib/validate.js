/* Input validation. The browser is never trusted: every rule is checked again here. */
const { HttpError } = require('./http');
const SLOTS = ['09:00 – 12:00', '12:00 – 15:00', '15:00 – 18:00', 'Full day'];
const DRINKS = ['None', 'Coffee', 'Tea', 'Water'];
const STATUSES = ['pending', 'confirmed', 'cancelled'];
const SPACE = /^(O([1-9]|[12]\d|30)|D([1-9]\d?|100)|M[12]|E1)$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = { O: 'priv', D: 'flex', M: 'room', E: 'event' };

const isSpace = id => typeof id === 'string' && SPACE.test(id);
const kindOf = id => KINDS[id[0]];
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const bad = m => new HttpError(400, m);

function validDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const t = Date.parse(s + 'T00:00:00Z');
  return !isNaN(t) && new Date(t).toISOString().slice(0, 10) === s;
}
function validateBooking(b) {
  if (!b || typeof b !== 'object') throw bad('Invalid request');
  const space = clean(b.space, 8), name = clean(b.name, 80), email = clean(b.email, 120).toLowerCase(), date = clean(b.date, 10), slot = clean(b.slot, 20);
  if (!isSpace(space)) throw bad('Unknown space');
  if (name.length < 2) throw bad('Enter your full name');
  if (!EMAIL.test(email)) throw bad('Enter a valid email address');
  if (!validDate(date)) throw bad('Choose a valid date');
  const day = 864e5, today = Date.parse(new Date().toISOString().slice(0, 10) + 'T00:00:00Z'), t = Date.parse(date + 'T00:00:00Z');
  if (t < today - day) throw bad('That date has passed');
  if (t > today + 90 * day) throw bad('Bookings open up to 90 days ahead');
  if (!SLOTS.includes(slot)) throw bad('Choose a time slot');
  const drinks = DRINKS.includes(b.drinks) ? b.drinks : 'None';
  const extras = Array.isArray(b.extras) ? b.extras.slice(0, 8).map(x => clean(x, 40)).filter(Boolean) : [];
  return { space, name, email, date, slot, drinks, setup: clean(b.setup, 40), extras, notes: clean(b.notes, 300) };
}
/* Two slots clash when they are the same, or either one is the full day */
const overlaps = (a, b) => a === 'Full day' || b === 'Full day' || a === b;
module.exports = { SLOTS, STATUSES, validateBooking, validDate, isSpace, kindOf, overlaps, clean };
