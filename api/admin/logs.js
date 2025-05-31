// 📁 /api/admin/logs.js
// KaiJa GPT – Admin Logs View (YAML, GPT, Tokens, Webhook-Trigger)

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET erlaubt' });
  }

  try {
    const logsPath = path.join(process.cwd(), 'api/logs/gpt-usage.jsonl');
    const raw = await fs.readFile(logsPath, 'utf8');
    const lines = raw.trim().split('\n').map(line => JSON.parse(line));

    // Neueste oben, limitiere auf 100
    const recent = lines.reverse().slice(0, 100);

    return res.status(200).json({
      count: recent.length,
      logs: recent
    });

  } catch (err) {
    return res.status(500).json({
      error: 'Fehler beim Lesen der Logs',
      details: err.message
    });
  }
}
