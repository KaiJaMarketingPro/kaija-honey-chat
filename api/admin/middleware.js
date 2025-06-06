// 📁 /api/admin/middleware.js

export function validateAdminAuth(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Zugriff verweigert: Token fehlt.' });
  }

  const token = authHeader.split(' ')[1];
  const expectedToken = process.env.ADMIN_SECRET_TOKEN;

  if (token !== expectedToken) {
    return res.status(403).json({ error: 'Zugriff verweigert: Ungültiger Token.' });
  }

  return null; // Auth OK
}
