// 📁 /admin/gptPreview.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only GET requests allowed.');
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
  <title>GPT Preview – KaiJa Admin</title>
  <style>
    body { font-family: sans-serif; background: #f9f9f9; padding: 2em; }
    h1 { margin-bottom: 1em; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { padding: 0.5em; border: 1px solid #ccc; }
    th { background: #eee; text-align: left; }
    tr:nth-child(even) { background: #f7f7f7; }
    code { font-size: 0.9em; background: #eef; padding: 2px 4px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>🧠 KaiJa GPT Preview (Live Index)</h1>
  <p>Alle GPTs laut <code>gpt-index.json</code></p>
  <table>
    <thead>
      <tr>
        <th>🧩</th>
        <th>Name / ID</th>
        <th>Beschreibung</th>
        <th>Testbar</th>
        <th>Typ</th>
        <th>Deployment</th>
        <th>YAML</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <p style="margin-top:2em; font-size:0.85em; color:#777;">
    Letztes Update: ${new Date().toLocaleString()}
  </p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[GPT Preview] Fehler beim Laden:', err);
    return res.status(500).send('Interner Fehler beim Laden von gpt-index.json');
  }
}
