// 📁 /api/test-gpt.js
// Öffentlicher GPT-Test-Endpunkt (DSGVO-konform, ohne Login)

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const {
    gpt = 'honey-gpt',
    message = 'Hallo, was kannst du?',
    user = 'testuser',
    optin = false,
    log = false
  } = req.body;

  if (!optin) {
    return res.status(403).json({
      error: 'DSGVO-Einwilligung fehlt. Bitte Opt-in aktivieren, um den GPT-Service zu testen.'
    });
  }

  try {
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const deploymentMap = JSON.parse(await fs.readFile(mappingPath, 'utf8'));

    const gptKey = Object.keys(deploymentMap).find(key => key.includes(gpt)) || '_fallback';
    const mapping = deploymentMap[gptKey];
    const promptPath = path.join(process.cwd(), mapping.prompt);
    const promptText = await fs.readFile(promptPath, 'utf8');

    const systemPrompt = { role: 'system', content: promptText.trim() };

    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${mapping.deployment}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
    const payload = {
      messages: [systemPrompt, { role: 'user', content: message }],
      temperature: mapping.temperature ?? 0.5,
      max_tokens: mapping.max_tokens ?? 1000
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Fehler bei GPT-Test: ${response.status}`,
        details: result
      });
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      error: 'Serverfehler beim Testlauf',
      details: error.message
    });
  }
}
