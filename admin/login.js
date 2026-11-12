/* POST /api/admin/login {password} -> {token}. Rate limited, constant-time comparison. */
const { route, send, limit, HttpError } = require('../../lib/http');
const { sign, safeEqual, adminPassword } = require('../../lib/auth');
module.exports = route(['POST'], async (req, res) => {
  limit(req, 'login', 8, 60000);
  if (!safeEqual(String(req.body.password || ''), adminPassword())) throw new HttpError(401, 'Wrong password');
  send(res, 200, { token: sign(), expiresIn: 8 * 3600 });
});
