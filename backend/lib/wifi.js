const crypto = require('crypto');
/* Guest Wi-Fi code. Issuing it to the real router or access controller is an integration step. */
function guestWifi(prefix = 'LumenYard') {
  const cs = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', r = crypto.randomBytes(8);
  const c = [...r].map(x => cs[x % cs.length]).join('');
  return { net: prefix + '-Guest', code: c.slice(0, 4) + '-' + c.slice(4) };
}
const newRef = () => { const cs = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', r = crypto.randomBytes(6); return 'LY-' + [...r].map(x => cs[x % cs.length]).join(''); };
module.exports = { guestWifi, newRef };
