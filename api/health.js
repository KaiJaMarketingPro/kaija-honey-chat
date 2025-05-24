// 📁 /api/health.js
// Health Check API inkl. HTML-View, Azure-Test & Webhook-Ping bei Statusänderung

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const WEBHOOK_URL = process.env.HEALTH_WEBHOOK_URL || null;
let lastAzureStatus = null;

export default async function handler(req, res) {
  const acceptHtml = req.headers.accept?.includes('text/html');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt.' });
  }

  const timestamp = new Date().toISOString();
  const env = {
    AZURE_OPENAI_KEY: !!process.env.AZURE_OPENAI_KEY,
    AZURE_OPENAI_ENDPOINT: !!process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_VERSION: !!process.env.AZURE_OPENAI_VERSION
  };

  try {
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const mappingRaw = await fs.readFile(mappingPath, 'utf8');
    const gptMap = JSON.parse(mappingRaw);
    const gptList = Object.entries(gptMap).filter(([id]) => id !== '_fallback');

    const deployments = gptList.map(([id, conf]) => ({
      gpt: id,
      deployment: conf.deployment,
      prompt: conf.prompt,
      status: conf.deployment ? '✅' : '❌ fehlt'
    }));

    const testGpt = 'maerki-gpt';
    const testDeployment = gptMap[testGpt]?.deployment;
    let azureStatus = '❌ nicht getestet';

    if (env.AZURE_OPENAI_ENDPOINT && env.AZURE_OPENAI_KEY && testDeployment) {
      try {
        const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${testDeployment}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
        const testResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPENAI_KEY
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Testsystem. Bitte nur OK zurückgeben.' },
              { role: 'user', content: 'Ping?' }
            ],
            temperature: 0.1,
            max_tokens: 10
          })
        });
        azureStatus = testResponse.ok ? '✅ erreichbar' : `❌ Fehler: ${testResponse.status}`;
      } catch (err) {
        azureStatus = `❌ Netzwerkfehler: ${err.message}`;
      }
    }

    // 📡 Webhook-Ping bei Statusänderung
    if (WEBHOOK_URL && lastAzureStatus !== null && lastAzureStatus !== azureStatus) {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `⚠️ Health Check Änderung [${timestamp}]: ${lastAzureStatus} → ${azureStatus}`
        })
      });
    }
    lastAzureStatus = azureStatus;

    // HTML View
    if (acceptHtml) {
      const html = `<!DOCTYPE html><html lang='de'><head><meta charset='UTF-8'><title>GPT System Health</title>
<style>body{font-family:sans-serif;background:#f4f4f4;padding:2em}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ccc;padding:8px}th{background:#eee}tr:nth-child(even){background:#fafafa}</style>
</head><body>
<h2>🚥 GPT Health Dashboard</h2>
<p>Stand: ${timestamp}</p>
<h3>Azure Verbindung: ${azureStatus}</h3>
<table><thead><tr><th>GPT</th><th>Deployment</th><th>Prompt</th><th>Status</th></tr></thead><tbody>
${deployments.map(d => `<tr><td>${d.gpt}</td><td>${d.deployment}</td><td>${d.prompt}</td><td>${d.status}</td></tr>`).join('')}
</tbody></table>
<h4>Umgebungsvariablen</h4>
<ul>
<li>AZURE_OPENAI_KEY: ${env.AZURE_OPENAI_KEY ? '✅' : '❌'}</li>
<li>AZURE_OPENAI_ENDPOINT: ${env.AZURE_OPENAI_ENDPOINT ? '✅' : '❌'}</li>
<li>AZURE_OPENAI_VERSION: ${env.AZURE_OPENAI_VERSION ? '✅' : '❌'}</li>
</ul>
</body></html>`;
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    return res.status(200).json({
      status: 'ok',
      timestamp,
      azureStatus,
      deployments,
      env
    });
  } catch (err) {
    console.error('[HEALTH] ❌ Fehler beim Laden der Systemdaten:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
