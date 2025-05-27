// 📁 /admin/kpi-summary.js
// Analyse GPT-Logs aus JSONL → Cluster + Token + Call KPIs (monatlich)

import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

export default async function handler(req, res) {
  const month = req.query.month || new Date().toISOString().slice(0, 7); // Format: YYYY-MM
  const filePath = path.join(process.cwd(), 'logs', `gpt-usage-${month}.jsonl`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Keine Logs für ${month} gefunden.` });
  }

  try {
    const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    const entries = lines.map(line => JSON.parse(line));

    const summary = {};
    let totalTokens = 0;

    for (const entry of entries) {
      const cluster = entry.cluster || 'unknown';
      if (!summary[cluster]) {
        summary[cluster] = { calls: 0, tokens: 0 };
      }
      summary[cluster].calls += 1;
      summary[cluster].tokens += entry.tokens || 0;
      totalTokens += entry.tokens || 0;
    }

    const clusters = Object.entries(summary).map(([cluster, data]) => ({
      cluster,
      calls: data.calls,
      tokens: data.tokens,
      avgTokens: Math.round(data.tokens / data.calls)
    }));

    return res.status(200).json({
      month,
      totalCalls: entries.length,
      totalTokens,
      avgTokensGlobal: Math.round(totalTokens / entries.length),
      clusters
    });
  } catch (err) {
    console.error('[KPI Summary Error]', err);
    return res.status(500).json({ error: 'Fehler bei KPI-Analyse', details: err.message });
  }
}
