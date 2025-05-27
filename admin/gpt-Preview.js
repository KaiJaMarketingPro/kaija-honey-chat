// 📁 /admin/gpt-preview.js – mit integriertem Admin-Menü

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Nur GET erlaubt.');
  }

  try {
    const indexPath = path.join(process.cwd(), 'api/config/gpt-index.json');
    const raw = await fs.readFile(indexPath, 'utf8');
    const gpts = JSON.parse(raw);

    const rows = gpts.map(gpt => `
      <tr>
        <td>${gpt.emoji || ''}</td>
        <td><strong>${gpt.name}</strong><br><small>${gpt.id}</small></td>
        <td>${gpt.description}</td>
        <td>${gpt.testable ? '✅' : '❌'}</td>
        <td>${gpt.free ? '🆓' : '💰'}</td>
        <td>${gpt.deployment || '–'}</td>
        <td>${gpt.yaml || '–'}</td>
      </tr>`).join('');

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>KaiJa Admin – GPT Preview</title>
  <style>
    body { font-family: sans-serif; background: #f9f9f9; padding: 2em; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2em; }
    h1 { margin: 0; font-size: 1.5em; }
    .nav a { margin-left: 1em; text-decoration: none; font-size: 0.95em; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { padding: 0.5em; border: 1px solid #ccc; }
    th { background: #eee; text-align: left; }
    tr:nth-child(even) { background: #f7f7f7; }
    footer { margin-top: 3em; font-size: 0.85em; color: #777; }
  </style>
</head>
<body>
  <header>
    <h1>🧠 KaiJa Admin UI</h1>
    <nav class="nav">
      <a href="/admin/login">🔐 Login</a>
      <a href="/admin/logout">🔓 Logout</a>
      <a href="/api/health" target="_blank">🩺 Health</a>
      <a href="/api/validate-yaml" target="_blank">🧪 YAML Check</a>
    </nav>
  </header>
  <h2>Live GPT Übersicht</h2>
  <table>
    <thead>
      <tr>
        <th>🧩</th><th>Name / ID</th><th>Beschreibung</th><th>Testbar</th><th>Typ</th><th>Deployment</th><th>YAML</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <footer>
    Letztes Update: ${new Date().toLocaleString()}
  </footer>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[Admin UI] Fehler beim Laden:', err);
    return res.status(500).send('Interner Fehler beim Admin-UI-Aufbau');
  }
}
