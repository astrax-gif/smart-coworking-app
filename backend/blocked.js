/* Admin: GET / PUT {blocked:[spaceIds]} : spaces staff have taken out of service */
const { route, send, HttpError } = require('../../lib/http');
const { requireAdmin } = require('../../lib/auth');
const { isSpace } = require('../../lib/validate');
const store = require('../../lib/store');
module.exports = route(['GET', 'PUT'], async (req, res) => {
  requireAdmin(req);
  if (req.method === 'PUT') {
    const list = req.body.blocked;
    if (!Array.isArray(list) || list.length > 200 || !list.every(isSpace)) throw new HttpError(400, 'Invalid list');
    await store.saveBlocked([...new Set(list)]);
  }
  send(res, 200, { blocked: await store.getBlocked() });
});
