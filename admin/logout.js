// 📁 /admin/logout.js

export default function handler(req, res) {
  // Session-Cookie löschen
  res.setHeader('Set-Cookie', 'kaija_admin_session=deleted; Path=/; HttpOnly; Max-Age=0');
  res.writeHead(302, { Location: '/admin/login' });
  res.end();
}
