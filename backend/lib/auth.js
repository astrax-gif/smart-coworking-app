/* Admin authentication: password -> signed, expiring token (HMAC-SHA256). No dependencies. */
const crypto = require('crypto');
const { HttpError } = require('./http');
const demo = () => !process.env.SUPABASE_URL;   // demo mode = in-memory data, built-in demo password

function secret() {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (demo()) return 'demo-secret-not-for-production';
  throw new HttpError(500, 'AUTH_SECRET is not set');
}
function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (demo()) return 'admin2026';
  throw new HttpError(500, 'ADMIN_PASSWORD is not set');
}
const mac = s => crypto.createHmac('sha256', secret()).update(s).digest('base64url');
function safeEqual(a, b) {
  const x = crypto.createHash('sha256').update(String(a)).digest(), y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
function sign(ttlSeconds = 8 * 3600) {
  const body = Buffer.from(JSON.stringify({ role: 'admin', exp: Math.floor(Date.now() / 1000) + ttlSeconds })).toString('base64url');
  return body + '.' + mac(body);
}
function verify(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  if (!safeEqual(sig || '', mac(body))) return null;
  try { const p = JSON.parse(Buffer.from(body, 'base64url').toString()); return p.exp > Date.now() / 1000 ? p : null; } catch (e) { return null; }
}
function requireAdmin(req) {
  const h = String(req.headers.authorization || '');
  if (!h.startsWith('Bearer ') || !verify(h.slice(7))) throw new HttpError(401, 'Sign in required');
}
module.exports = { sign, verify, requireAdmin, safeEqual, adminPassword, demo };
