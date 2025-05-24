// 📁 /api/validate-yaml.js
// Validiert alle store/*.yaml Dateien auf Syntax, Felder & Konsistenz + HTML-Ausgabe + Slack/GitHub Notification

import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import fetch from 'node-fetch';

const REQUIRED_FIELDS = ['name', 'description', 'instructions', 'tags', 'language'];
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export default async function handler(req, res) {
  const acceptHtml = req.headers.accept?.includes('text/html');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt.' });
  }

  try {
    const storeDir = path.join(process.cwd(), 'api/store');
    const files = await fs.readdir(storeDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    const report = await Promise.all(
      yamlFiles.map(async (file) => {
        const filePath = path.join(storeDir, file);
        const result = { file };

        try {
          const content = await fs.readFile(filePath, 'utf8');
          const parsed = yaml.load(content);
          const missing = REQUIRED_FIELDS.filter(field => !parsed[field]);

          result.status = missing.length === 0 ? '✅ gültig' : '⚠️ fehlende Felder';
          result.missing = missing;
        } catch (err) {
          result.status = '❌ Fehler';
          result.error = err.message;
        }

        return result;
      })
    );

    const timestamp = new Date().toISOString();

    // 🔁 GitHub/Slack Webhook Notification (optional)
    const webhookPayload = {
      text: `📊 YAML-Check (${timestamp}) abgeschlossen: ${report.length} Dateien geprüft.`,
      attachments: report.map(r => ({
        color: r.status.startsWith('✅') ? 'good' : r.status.startsWith('⚠️') ? 'warning' : 'danger',
        title: r.file,
        text: r.status + (r.missing ? ` → Fehlt: ${r.missing.join(', ')}` : '')
      }))
    };
    if (SLACK_WEBHOOK_URL) {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      });
    }

    // 📄 HTML Ausgabe (Admin Preview oder CMS-Integration)
    if (acceptHtml) {
      const rows = report.map(r => `
        <tr>
          <td>${r.file}</td>
          <td>${r.status}</td>
          <td>${(r.missing || []).join(', ')}</td>
          <td>${r.error || ''}</td>
        </tr>`).join('');
      const html = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>YAML Validator Report</title>
<style>
body { font-family: sans-serif; background: #f8f8f8; padding: 2em; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5em; border: 1px solid #ccc; text-align: left; }
th { background: #eee; }
tr:nth-child(even) { background: #fafafa; }
</style>
</head>
<body>
<h2>📋 YAML Validator Report (${timestamp})</h2>
<table>
<thead><tr><th>Datei</th><th>Status</th><th>Fehlende Felder</th><th>Fehlermeldung</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</body>
</html>`;
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    // JSON Response (Standard)
    return res.status(200).json({ validated: timestamp, files: report });

  } catch (e) {
    console.error('[YAML Validator] ❌ Fehler:', e);
    return res.status(500).json({ error: 'Interner Serverfehler beim Validieren der YAML-Dateien.', details: e.message });
  }
}
