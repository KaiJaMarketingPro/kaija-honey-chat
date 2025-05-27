// 📁 /api/chat.js
// Azure OpenAI Proxy mit Retry, Timeout, Mapping, Prompt-Loader, Fallback + Make Webhook → Dual Sheet Logging

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const { messages = [], gpt = 'maerki-gpt', user = 'anonymous' } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Ungültiges Nachrichtenformat. Erwartet: Array von Messages.' });
  }

  try {
    const safeGpt = gpt.replace(/[^\w-]/g, '');

    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const deploymentMap = JSON.parse(await fs.readFile(mappingPath, 'utf8'));
    const mapping = deploymentMap[safeGpt] || deploymentMap['_fallback'];
    const usedFallback = !deploymentMap[safeGpt];

    if (usedFallback) {
      console.warn(`[${new Date().toISOString()}] ⚠️ Unbekannter GPT "${safeGpt}" – Fallback aktiviert.`);
    }

    const promptPath = path.join(process.cwd(), mapping.prompt);
    const systemPromptText = await fs.readFile(promptPath, 'utf8');
    const systemPrompt = { role: 'system', content: systemPromptText.trim() };
    const deploymentName = mapping.deployment;

    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

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

        const result = await azureRes.json();

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

        // 🔁 Logging an Make Webhook → GPT_Activity_Log + Access_Log Sheet
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              gpt: safeGpt,
              user,
              tokens: result.usage?.total_tokens || 0,
              prompt: messages?.[0]?.content?.slice(0, 80) || '-',
              status: usedFallback ? 'fallback' : 'success',
              canva_prompt: req.body?.canvaPrompt || '',
              freepik_used: !!req.body?.freepikMarkdown,
              mail_sent: req.body?.mailSent || false,
              source: 'chat.js → dual sheet sync'
            })
          });
        }

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
