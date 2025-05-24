// 📁 /admin/export-jsonl.js – GPT-Playbooks inkl. Logs + ZIP
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import archiver from 'archiver';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Nur GET erlaubt.');
  }

  try {
    const storeDir = path.join(process.cwd(), 'api/store');
    const jsonlDir = path.join(process.cwd(), 'jsonl');
    await fs.mkdir(jsonlDir, { recursive: true });

    const files = await fs.readdir(storeDir);
    const output = [];

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;

      const yamlRaw = await fs.readFile(path.join(storeDir, file), 'utf8');
      const parsed = yaml.load(yamlRaw);
      const gptId = file.replace('.yaml', '');

      const baseJsonl = [
        { role: 'system', content: parsed.instructions || `Du bist ${parsed.name}` },
        { role: 'user', content: 'Wie kannst du mir konkret helfen?' },
        { role: 'assistant', content: 'Ich unterstütze dich bei … (Antwort gemäß deiner Rolle).' }
      ];

      const logsPath = path.join(process.cwd(), 'logs/test-log.json');
      let fromLog = [];
      try {
        const logData = JSON.parse(await fs.readFile(logsPath, 'utf8'));
        fromLog = logData.filter(l => l.gpt === gptId).map(l => [
          { role: 'user', content: l.prompt },
          { role: 'assistant', content: l.output }
        ]).flat();
      } catch (e) {}

      const lines = [...baseJsonl, ...fromLog].map(j => JSON.stringify(j)).join('\n');
      const jsonlFile = path.join(jsonlDir, `${gptId}.jsonl`);
      await fs.writeFile(jsonlFile, lines);
      output.push({ file: `${gptId}.jsonl`, status: '✅ generiert' });
    }

    // Clara/Carola Spezialdialog
    const claraDialog = [
      { role: 'system', content: 'Du bist Clara, die empathische KI-Co-Coachin für Klarheit, Positionierung und Preis.' },
      { role: 'user', content: 'Ich weiss nicht, ob mein Angebot klar ist.' },
      { role: 'assistant', content: 'Was ist dein aktuelles Ziel – und welche Zielgruppe willst du erreichen?' },
      { role: 'user', content: 'Ich begleite Frauen in beruflichen Übergangsphasen …' },
      { role: 'assistant', content: 'Dann ist deine Energie für Veränderung zentral. Was wäre das eine Ergebnis, das du deinen Kundinnen versprichst?' }
    ];
    const claraPath = path.join(jsonlDir, 'clara.jsonl');
    await fs.writeFile(claraPath, claraDialog.map(j => JSON.stringify(j)).join('\n'));
    output.push({ file: 'clara.jsonl', status: '✅ spezialisiert' });

    // ZIP-Export
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="gpt-jsonl-playbooks.zip"');
    const archiver = require('archiver');
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);
    for (const o of output) {
      const fullPath = path.join(jsonlDir, o.file);
      archive.append(await fs.readFile(fullPath), { name: o.file });
    }
    await archive.finalize();
  } catch (err) {
    console.error('[JSONL Export] Fehler:', err);
    return res.status(500).send('Fehler beim Export der .jsonl-Dateien');
  }
}
