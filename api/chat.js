// 📁 /api/chat.js
// KaiJa GPT Proxy – Azure OpenAI + Mapping + Retry + Webhook Logging + Unicorn Ready 🦄

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const {
    messages = [],
    gpt = 'maerki-gpt',
    user = 'anonymous',
    optin = false,
    log = false
  } = req.body;

  // 🛡 DSGVO Opt-in validieren
  if (!optin) {
    return res.status(403).json({
      error: 'DSGVO-Einwilligung fehlt. Bitte Opt-in aktivieren, um den GPT-Service zu nutzen.'
    });
  }

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Ungültiges Nachrichtenformat. Erwartet: Array von Messages.' });
  }

  try {
    const safeGpt = gpt.replace(/[^\w-]/g, '');
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const deploymentMap = JSON.parse(await fs.readFile(mappingPath, 'utf8'));

    const gptAliases = {
      baschtis: 'baschtis-gpt'
    };
    const resolvedGpt = gptAliases[safeGpt] || safeGpt;

    const mapping = deploymentMap[resolvedGpt] || deploymentMap['_fallback'];
    const usedFallback = !deploymentMap[resolvedGpt];

    if (usedFallback) {
      console.warn(`[${new Date().toISOString()}] ⚠️ Fallback aktiviert: "${resolvedGpt}" nicht im Mapping.`);
    }

    const promptPath = path.join(process.cwd(), mapping.prompt);
    const systemPromptText = await fs.readFile(promptPath, 'utf8');
    const systemPrompt = { role: 'system', content: systemPromptText.trim() };
    const deploymentName = mapping.deployment;

    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!endpoint || !apiKey) {
      return res.status(500).json({ error: 'Fehlende Azure API-Konfiguration in Vercel.' });
    }

    const payload = {
      messages: [systemPrompt, ...messages],
      temperature: mapping.temperature ?? 0.5,
      max_tokens: mapping.max_tokens ?? 1200
    };

    const maxRetries = 1;
    let retryCount = 0;

    while (retryCount <= maxRetries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        console.log(`[${new Date().toISOString()}] 🚀 GPT-Request an "${resolvedGpt}" → ${deploymentName}`);
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

        // 📤 DSGVO-konformes Logging (nur wenn log=true gesetzt)
        if (webhookUrl && log) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              gpt: resolvedGpt,
              user,
              tokens: result.usage?.total_tokens || 0,
              prompt: messages?.[0]?.content?.slice(0, 80) || '-',
              status: usedFallback ? 'fallback' : 'success',
              cluster: mapping?.cluster || 'unknown',
              yaml: mapping?.yaml || null,
              canva_prompt: req.body?.canvaPrompt || '',
              freepik_used: !!req.body?.freepikMarkdown,
              mail_sent: req.body?.mailSent || false,
              source: 'chat.js → webhook log',
              session_id: req.body?.sessionId || null,
              license_days: req.body?.access_days || 7,
              access_start: req.body?.access_start || null
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
        console.error(`[${new Date().toISOString()}] ❌ GPT-Proxy-Fehler (${resolvedGpt}):`, err);
        return res.status(500).json({
          error: 'Serverfehler beim Aufruf der Azure API.',
          details: err.message
        });
      }
    }
  } catch (e) {
    console.error(`[${new Date().toISOString()}] ❌ Fehler beim Laden von Mapping oder Prompt für (${gpt}):`, e);
    return res.status(500).json({
      error: `Fehler beim Laden des Prompts oder Deployments für "${gpt}"`,
      details: e.message
    });
  }
}
