// 📁 /admin/export-jsonl.js – Erstellt GPT-Dialog-Playbooks (.jsonl) aus YAML
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Nur GET erlaubt.');
  }

  try {
    const dir = path.join(process.cwd(), 'api/store');
    const files = await fs.readdir(dir);
    const output = [];

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;

      const yamlRaw = await fs.readFile(path.join(dir, file), 'utf8');
      const parsed = yaml.load(yamlRaw);
      const gptId = file.replace('.yaml', '');

      // Basis-Dialoglogik – aus YAML generiert + 1 Beispiel
      const jsonl = [
        { role: 'system', content: parsed.instructions || `Du bist ${parsed.name}` },
        { role: 'user', content: 'Wie kannst du mir konkret helfen?' },
        { role: 'assistant', content: 'Ich unterstütze dich bei … (Antwort gemäß deiner Rolle).' }
      ];

      const filePath = path.join(process.cwd(), 'jsonl', `${gptId}.jsonl`);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, jsonl.map(j => JSON.stringify(j)).join('\n'));

      output.push({ file: `${gptId}.jsonl`, status: '✅ erstellt' });
    }

    const html = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>JSONL Export</title></head>
<body style="font-family:sans-serif;padding:2em;">
<h2>📚 JSONL Playbooks</h2>
<ul>${output.map(o => `<li>${o.file} – ${o.status}</li>`).join('')}</ul>
<p><strong>Speicherort:</strong> /jsonl/*.jsonl</p>
<p><a href="/admin/gpt-tools">⬅️ Zurück</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[JSONL Export] Fehler:', err);
    return res.status(500).send('Fehler beim Export der .jsonl-Dateien');
  }
}
