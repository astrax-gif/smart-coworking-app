/* Browser client for the REST API. If no backend answers (e.g. static hosting), callers fall back to demo mode. */
const API = (() => {
  const call = async (path, opt = {}) => {
    let r, j;
    try { r = await fetch('/api/' + path, { ...opt, headers: { 'Content-Type': 'application/json', ...(opt.headers || {}) } }); }
    catch (e) { const x = new Error('Backend unreachable'); x.offline = true; throw x; }
    try { j = JSON.parse(await r.text()); } catch (e) { const x = new Error('Backend not available'); x.offline = true; throw x; }
    if (!r.ok) { const x = new Error(j.error || 'Request failed'); x.status = r.status; throw x; }
    return j;
  };
  const auth = () => ({ Authorization: 'Bearer ' + (sessionStorage.getItem('ly_token') || '') });
  return {
    availability: d => call('availability' + (d ? '?date=' + d : '')),
    createBooking: b => call('bookings', { method: 'POST', body: JSON.stringify(b) }),
    login: pw => call('admin/login', { method: 'POST', body: JSON.stringify({ password: pw }) }).then(r => { sessionStorage.setItem('ly_token', r.token); return r; }),
    logout: () => sessionStorage.removeItem('ly_token'),
    admin: (path, o = {}) => call('admin/' + path, { ...o, headers: auth() })
  };
})();
