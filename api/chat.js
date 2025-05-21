// 📁 /api/chat.js
// Azure OpenAI Proxy mit Retry, Timeout & Deployment/Prompt-Mapping

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
    // 🧠 sicheres GPT-Label (nur a-z, A-Z, 0-9, -, _)
    const safeGpt = gpt.replace(/[^\w-]/g, '');

    // 📦 Lade Mapping-Datei
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const deploymentMap = JSON.parse(await fs.readFile(mappingPath, 'utf8'));
    const mapping = deploymentMap[safeGpt];

    if (!mapping) {
      return res.status(400).json({ error: `GPT "${safeGpt}" nicht im Mapping gefunden.` });
    }

    // 📥 Lade Prompt-Datei
    const promptPath = path.join(process.cwd(), mapping.prompt);
    const systemPromptText = await fs.readFile(promptPath, 'utf8');
    const systemPrompt = { role: 'system', content: systemPromptText.trim() };
    const deploymentName = mapping.deployment;

    // 🧠 Anfrage an Azure vorbereiten
    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
    const apiKey = process.env.AZURE_OPENAI_KEY;

    if (!endpoint || !apiKey) {
      return res.status(500).json({
        error: 'Fehlende Umgebungsvariablen. Bitte prüfe AZURE_OPENAI_* in Vercel.'
      });
    }

    const payload = {
      messages: [systemPrompt, ...messages],
      temperature: 0.3,
      max_tokens: 1200
    };

    // 🔁 Retry mit Timeout
    const maxRetries = 1;
    let retryCount = 0;

    while (retryCount <= maxRetries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

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
          const errText = await azureRes.text();

          if ([500, 502, 503, 504].includes(azureRes.status) && retryCount < maxRetries) {
            console.warn(`🔁 Retry (${retryCount + 1}) bei GPT-Fehler: ${azureRes.status}`);
            retryCount++;
            continue;
          }

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
    console.error(`[${new Date().toISOString()}] ❌ Fehler beim Laden von Mapping oder Prompt für (${gpt}):`, e);
    return res.status(500).json({
      error: `Fehler beim Laden des Prompts oder Deployment für "${gpt}"`,
      details: e.message
    });
  }
}
