// 📁 /api/health.js
// Health Check für KaiJa GPT-Systeme inkl. Mapping, Azure-Verfügbarkeit & Umgebungsvariablen

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
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

    // Optional: Live-Verbindungstest an einen GPT-Endpoint (Märki als Standard)
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
