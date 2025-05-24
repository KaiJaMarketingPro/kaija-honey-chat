// 📁 /admin/sync-jsonl.js – Kopiert JSONL-Dateien nach /public/jsonl
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Nur GET erlaubt');
  }

  try {
    const sourceDir = path.join(process.cwd(), 'jsonl');
    const targetDir = path.join(process.cwd(), 'public', 'jsonl');
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);
    const copied = [];

    for (const file of files) {
      if (!file.endsWith('.jsonl')) continue;
      const source = path.join(sourceDir, file);
      const target = path.join(targetDir, file);
      await fs.copyFile(source, target);
      copied.push(file);
    }

    const html = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>JSONL Sync</title></head>
<body style="font-family:sans-serif;padding:2em;">
<h2>📤 Öffentliche JSONL-Dateien synchronisiert</h2>
<ul>${copied.map(f => `<li>${f}</li>`).join('')}</ul>
<p><strong>Pfad:</strong> /public/jsonl/</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[JSONL Sync] Fehler:', err);
    return res.status(500).send('Fehler beim Kopieren der JSONL-Dateien');
  }
}
