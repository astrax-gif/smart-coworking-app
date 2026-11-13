const test = require('node:test'), assert = require('node:assert');
const { validateBooking, overlaps } = require('../lib/validate');
const auth = require('../lib/auth');
const bookings = require('../api/bookings'), login = require('../api/admin/login'), adminBookings = require('../api/admin/bookings'), blocked = require('../api/admin/blocked'), availability = require('../api/availability');

/* Call a route handler with a fake request/response */
async function call(h, { method = 'GET', body, query, token } = {}) {
  const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(s) { this.body = s ? JSON.parse(s) : {}; } };
  await h({ method, body, query, headers: token ? { authorization: 'Bearer ' + token } : {} }, res);
  return { status: res.statusCode, body: res.body };
}
const day = n => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const good = (o = {}) => ({ space: 'D5', name: 'Sara Ali', email: 'sara@example.com', date: day(3), slot: '09:00 – 12:00', ...o });

test('slots overlap rules', () => {
  assert.ok(overlaps('Full day', '12:00 – 15:00')); assert.ok(overlaps('09:00 – 12:00', '09:00 – 12:00')); assert.ok(!overlaps('09:00 – 12:00', '12:00 – 15:00'));
});
test('validation accepts good input and rejects bad input', () => {
  assert.equal(validateBooking(good()).email, 'sara@example.com');
  for (const bad of [{ space: 'Z9' }, { email: 'nope' }, { name: 'A' }, { date: '2020-01-01' }, { date: '2026-02-31' }, { slot: 'Midnight' }]) assert.throws(() => validateBooking(good(bad)), /./);
});
test('auth tokens: valid, tampered and expired', () => {
  const t = auth.sign(60); assert.ok(auth.verify(t));
  assert.equal(auth.verify(t.slice(0, -2) + 'xx'), null); assert.equal(auth.verify(auth.sign(-5)), null); assert.equal(auth.verify('garbage'), null);
});
test('booking flow: create, clash, admin control', async () => {
  const r1 = await call(bookings, { method: 'POST', body: good() });
  assert.equal(r1.status, 201); assert.match(r1.body.ref, /^LY-/); assert.ok(r1.body.wifi.code);
  assert.equal((await call(bookings, { method: 'POST', body: good({ slot: 'Full day' }) })).status, 409);     // full day clashes with a slot
  assert.equal((await call(bookings, { method: 'POST', body: good({ slot: '12:00 – 15:00' }) })).status, 201); // different slot is fine
  assert.equal((await call(bookings, { method: 'POST', body: good({ email: 'x' }) })).status, 400);
  assert.equal((await call(adminBookings)).status, 401);                                                        // admin needs a token
  assert.equal((await call(login, { method: 'POST', body: { password: 'wrong' } })).status, 401);
  const { body: { token } } = await call(login, { method: 'POST', body: { password: 'admin2026' } });
  const list = await call(adminBookings, { token }); assert.equal(list.body.bookings.length, 2);
  const id = list.body.bookings.find(b => b.slot === '09:00 – 12:00').id;
  assert.equal((await call(adminBookings, { method: 'PATCH', query: { id }, body: { status: 'confirmed' }, token })).body.booking.status, 'confirmed');
  assert.equal((await call(adminBookings, { method: 'PATCH', query: { id }, body: { status: 'cancelled' }, token })).status, 200);
  assert.equal((await call(bookings, { method: 'POST', body: good() })).status, 201);                           // cancelled slot is free again
  await call(blocked, { method: 'PUT', body: { blocked: ['D9'] }, token });
  assert.equal((await call(bookings, { method: 'POST', body: good({ space: 'D9', date: day(5) }) })).status, 409);
  const av = await call(availability, { query: { date: day(3) } }); assert.ok(av.body.taken.includes('D5') && av.body.blocked.includes('D9'));
  assert.equal(av.body.email, undefined);
});
