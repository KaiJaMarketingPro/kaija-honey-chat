// 📁 /admin/gpt-tools.js
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import fsSync from 'fs';

export default async function handler(req, res) {
  const isPost = req.method === 'POST';
  const session = req.cookies?.kaija_admin_session;
  if (session !== 'valid') {
    return res.status(401).send('Nicht autorisiert – Admin-Session fehlt oder ungültig');
  }

  try {
    const gptIndexPath = path.join(process.cwd(), 'api/config/gpt-index.json');
    const index = JSON.parse(await fs.readFile(gptIndexPath, 'utf8'));

    const rows = await Promise.all(index.map(async (gpt) => {
      const yamlPath = path.join(process.cwd(), gpt.yaml);
      let content = '';
      try {
        content = await fs.readFile(yamlPath, 'utf8');
      } catch (e) {
        content = `❌ Datei nicht gefunden: ${gpt.yaml}`;
      }

      return `
      <details>
        <summary><strong>${gpt.emoji || ''} ${gpt.name}</strong> <code>${gpt.id}</code></summary>
        <form method="POST">
          <textarea name="yaml" rows="12" style="width:100%;font-family:monospace">${content}</textarea>
          <input type="hidden" name="id" value="${gpt.id}">
          <button type="submit">💾 Speichern</button>
        </form>
        <form method="GET" action="/api/test-gpt" target="_blank">
          <input type="hidden" name="gpt" value="${gpt.id}">
          <input type="text" name="prompt" placeholder="Prompt testen" style="width:80%">
          <button type="submit">🧠 Test starten</button>
        </form>
        <hr>
      </details>`;
    }));

    if (isPost) {
      const buffers = [];
      for await (const chunk of req) buffers.push(chunk);
      const data = Buffer.concat(buffers).toString();
      const parsed = new URLSearchParams(data);
      const yamlRaw = parsed.get('yaml');
      const id = parsed.get('id');

      const gptEntry = index.find((g) => g.id === id);
      if (!gptEntry) return res.status(400).send('GPT nicht gefunden');

      const filePath = path.join(process.cwd(), gptEntry.yaml);
      await fs.writeFile(filePath, yamlRaw);
      return res.writeHead(302, { Location: '/admin/gpt-tools' }).end();
    }

    // CSV Exportbereich (Monatsübersicht)
    const logDir = path.join(process.cwd(), 'logs');
    const files = fsSync.existsSync(logDir) ? fsSync.readdirSync(logDir) : [];
    const months = files
      .filter(f => f.startsWith('gpt-usage-') && f.endsWith('.jsonl'))
      .map(f => f.replace('gpt-usage-', '').replace('.jsonl', ''))
      .sort();

    const csvLinks = months.map(m => `<li><a href="/admin/export-csv?month=${m}" target="_blank">📥 CSV Export – ${m}</a></li>`).join('\n');

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>YAML Editor – KaiJa Admin</title>
  <style>
    body { font-family: sans-serif; background: #f0f0f0; padding: 2em; }
    summary { cursor: pointer; padding: 0.3em 0; }
    textarea { background: #fff; padding: 0.5em; border-radius: 6px; border: 1px solid #ccc; }
    button { margin-top: 0.5em; padding: 0.4em 1em; }
    details { margin-bottom: 1.5em; background: #fff; padding: 1em; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.05); }
  </style>
</head>
<body>
  <h1>🛠 KaiJa Admin – YAML Editor + GPT Test</h1>
  <h3>📥 CSV Exporte</h3>
  <ul>${csvLinks}</ul>
  ${rows.join('')}
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[Admin Tools] Fehler:', err);
    return res.status(500).send('Interner Fehler beim Laden');
  }
}
