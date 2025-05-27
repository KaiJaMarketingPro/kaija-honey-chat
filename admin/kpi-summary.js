// 📁 /admin/kpi-summary.js
// Analyse GPT-Logs aus JSONL → Cluster + Token + Call KPIs (monatlich) + Score + GPT-Names

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
    const entries = lines.map(line => JSON.parse(line));

    const summary = {};
    let totalTokens = 0;

    for (const entry of entries) {
      const cluster = entry.cluster || 'unknown';
      const gpt = entry.gpt || 'unbekannt';
      if (!summary[cluster]) {
        summary[cluster] = { calls: 0, tokens: 0, gpts: new Set() };
      }
      summary[cluster].calls += 1;
      summary[cluster].tokens += entry.tokens || 0;
      summary[cluster].gpts.add(gpt);
      totalTokens += entry.tokens || 0;
    }

    const clusters = Object.entries(summary).map(([cluster, data]) => ({
      cluster,
      calls: data.calls,
      tokens: data.tokens,
      avgTokens: Math.round(data.tokens / data.calls),
      gpts: Array.from(data.gpts).sort(),
      qualityScore: +(10 - (5000 / Math.max(data.tokens / data.calls, 1))).toFixed(2) // Näherung
    }));

    const csv = ['Cluster,Calls,Tokens,AvgTokens,GPTs,Score']
      .concat(clusters.map(c =>
        `${c.cluster},${c.calls},${c.tokens},${c.avgTokens},"${c.gpts.join(';')}",${c.qualityScore}`
      ))
      .join('\n');

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-CSV-Download', Buffer.from(csv).toString('base64')); // base64 für UI-Download (optional)
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
