// 📁 /admin/export-csv.js
// Exportiert JSONL-Log als CSV für Excel/Sheets – inkl. Clusterfilter & strukturierter Header

import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt' });
  }

  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    const clusterFilter = req.query.cluster || null;

    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ error: 'Ungültiges Format für "month". Erwartet: YYYY-MM' });
    }

    const filePath = path.join(process.cwd(), 'logs', `gpt-usage-${month}.jsonl`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `Keine Logs gefunden für ${month}` });
    }

    const raw = fs.readFileSync(filePath, 'utf8').trim().split('\n').map(line => JSON.parse(line));
    const filtered = clusterFilter
      ? raw.filter(entry => entry.cluster === clusterFilter)
      : raw;

    const fields = [
      { label: 'Zeitpunkt', value: 'timestamp' },
      { label: 'Cluster', value: 'cluster' },
      { label: 'GPT-ID', value: 'gpt' },
      { label: 'User', value: 'user' },
      { label: 'Prompt (gekürzt)', value: 'prompt' },
      { label: 'Status', value: 'status' },
      { label: 'Tokens [Total]', value: 'tokens' },
      { label: 'Token-Klasse', value: 'token_class' },
      { label: 'Stunde', value: 'hour' },
      { label: 'Wochentag', value: 'weekday' }
    ];

    const csv = '\uFEFF' + parse(filtered, { fields });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=gpt-usage-${month}.csv`);
    return res.status(200).send(csv);

  } catch (err) {
    console.error('[CSV Export Error]', err);
    return res.status(500).json({ error: 'Fehler beim Exportieren der Logs', details: err.message });
  }
}
