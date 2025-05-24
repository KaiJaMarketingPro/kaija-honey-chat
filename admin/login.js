// 📁 /admin/login.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>KaiJa Admin Login</title>
  <style>
    body { font-family: sans-serif; background: #f4f4f4; padding: 2em; text-align: center; }
    input { padding: 0.5em; width: 300px; font-size: 1em; }
    button { padding: 0.5em 1em; font-size: 1em; margin-top: 1em; }
    .box { background: white; padding: 2em; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="box">
    <h2>🔒 Admin Login</h2>
    <form method="POST">
      <input type="password" name="token" placeholder="Admin-Token eingeben" required><br>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>`);
  }

  if (req.method === 'POST') {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const data = Buffer.concat(buffers).toString();
    const token = new URLSearchParams(data).get('token');

    if (token === process.env.ADMIN_SECRET_TOKEN) {
      res.setHeader('Set-Cookie', 'kaija_admin_session=valid; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600');
      return res.writeHead(302, { Location: '/admin/gpt-preview' }).end();
    } else {
      return res.status(403).send('❌ Ungültiger Token. Zugriff verweigert.');
    }
  }

  return res.status(405).send('Method not allowed');
}
