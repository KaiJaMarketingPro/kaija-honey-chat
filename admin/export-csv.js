// 📁 /admin/export-csv.js
// Exportiere JSONL Logfiles (GPT Calls) als CSV für Sheets oder Excel

import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt' });
  }

  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7); // z. B. "2025-05"
    const filePath = path.join(process.cwd(), 'logs', `gpt-usage-${month}.jsonl`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `Keine Logs gefunden für ${month}` });
    }

    const raw = fs.readFileSync(filePath, 'utf8').trim().split('\n').map(line => JSON.parse(line));
    const csv = parse(raw);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=gpt-usage-${month}.csv`);
    return res.status(200).send(csv);

  } catch (err) {
    console.error('[CSV Export Error]', err);
    return res.status(500).json({ error: 'Fehler beim Exportieren der Logs', details: err.message });
  }
}
