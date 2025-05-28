// 📁 /admin/validate-logs.js
// JSONL Validierung & Lückenprüfung für GPT-Logs

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const month = req.query.month || new Date().toISOString().slice(0, 7); // Format: YYYY-MM
  const filePath = path.join(process.cwd(), 'logs', `gpt-usage-${month}.jsonl`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Keine Logs für ${month} gefunden.` });
  }

  try {
    const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');

    const results = {
      totalLines: lines.length,
      malformed: [],
      missingFields: [],
      suspiciousTokens: [],
      unknownStatus: [],
      fallbackUsage: []
    };

    lines.forEach((line, index) => {
      try {
        const json = JSON.parse(line);

        if (!json.timestamp || !json.gpt || !json.prompt) {
          results.missingFields.push({ line: index + 1, json });
        }

        if (!json.cluster) {
          results.missingFields.push({ line: index + 1, json });
        }

        if (json.tokens === 0) {
          results.suspiciousTokens.push({ line: index + 1, json });
        }

        if (json.status === 'unknown') {
          results.unknownStatus.push({ line: index + 1, json });
        }

        if (json.status === 'fallback') {
          results.fallbackUsage.push({ line: index + 1, json });
        }

      } catch (err) {
        results.malformed.push({ line: index + 1, error: err.message });
      }
    });

    return res.status(200).json(results);
  } catch (err) {
    console.error('[Log Validation Error]', err);
    return res.status(500).json({ error: 'Fehler bei Validierung', details: err.message });
  }
}
