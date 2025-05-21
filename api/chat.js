// 📁 /api/chat.js
// Azure OpenAI Proxy mit Retry, Timeout & dynamischer Prompt + Deployment-Integration

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const { messages = [], gpt = 'maerki-gpt' } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Ungültiges Nachrichtenformat. Erwartet: Array von Messages.' });
  }

  try {
    // 🧠 sicheres GPT-Label
    const safeGpt = gpt.replace(/[^\w-]/g, '');

    // 📥 Lade Systemprompt aus /prompts
    const promptPath = path.join(process.cwd(), 'prompts', `${safeGpt}.md`);
    const systemPromptText = await fs.readFile(promptPath, 'utf8');

    const systemPrompt = {
      role: 'system',
      content: systemPromptText.trim()
    };

    // 📦 Lade Deployment Mapping aus JSON
    const deploymentMapPath = path.join(process.cwd(), 'api/config/gptDeployments.json');
    const deploymentMap = JSON.parse(await fs.readFile(deploymentMapPath, 'utf8'));
    const deploymentName = deploymentMap[safeGpt] || process.env.AZURE_OPENAI_DEPLOYMENT;

    const payload = {
      messages: [systemPrompt, ...messages],
      temperature: 0.3,
      max_tokens: 1200
    };

    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
    const apiKey = process.env.AZURE_OPENAI_KEY;

    if (!endpoint || !apiKey) {
      return res.status(500).json({
        error: 'Fehlende Umgebungsvariablen. Bitte prüfe AZURE_OPENAI_* in Vercel.'
      });
    }

    // 🔁 Retry + Timeout
    const maxRetries = 1;
    let retryCount = 0;

    while (retryCount <= maxRetries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s

        console.log(`[${new Date().toISOString()}] 🚀 Request an ${safeGpt} → Deployment: ${deploymentName}`);

        const azureRes = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (!azureRes.ok) {
          if ([500, 502, 503, 504].includes(azureRes.status) && retryCount < maxRetries) {
            console.warn(`🔁 Retry (${retryCount + 1}) bei GPT-Fehler: ${azureRes.status}`);
            retryCount++;
            continue;
          }

          const errText = await azureRes.text();
          return res.status(azureRes.status).json({
            error: `Azure GPT Fehler: ${azureRes.status}`,
            message: errText
          });
        }

        const result = await azureRes.json();
        return res.status(200).json(result);

      } catch (err) {
        if (retryCount < maxRetries) {
          console.warn(`🔁 Retry (#${retryCount + 1}) wegen Netzwerkfehler:`, err);
          retryCount++;
          continue;
        }

        console.error(`[${new Date().toISOString()}] ❌ GPT-Proxy-Fehler (${safeGpt}):`, err);
        return res.status(500).json({
          error: 'Serverfehler beim Aufruf der Azure API.',
          details: err.message
        });
      }
    }
  } catch (e) {
    console.error(`[${new Date().toISOString()}] ❌ Fehler beim Laden von Prompt oder Deployment für (${gpt}):`, e);
    return res.status(500).json({
      error: `Fehler beim Laden des Prompts oder Deployment für "${gpt}"`,
      details: e.message
    });
  }
}
