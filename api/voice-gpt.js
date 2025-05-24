// 📁 /api/voice-gpt.js – Voice-API mit Everlast AI Best Practices
// 📌 Integrierte Empfehlungen:
// 1. Sprachverständnis optimieren – gpt-4-turbo via Azure Deployment
// 2. Nahtlose Integration – JSON-API, VAPI-kompatibel
// 3. Benutzererfahrung priorisieren – klare Fehler- & Erfolgsantworten
// 4. Kontinuierliches Lernen vorbereiten – Memory- oder Feedback-Logik (optional)

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed.');
  }

  try {
    const body = await req.json();
    const { gpt = 'honey-gpt', text = '' } = body;
    if (!text) return res.status(400).json({ error: 'Text fehlt für die Sprachausgabe.' });

    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf8'));
    const entry = mapping[gpt] || mapping['_fallback'];

    if (!entry) return res.status(404).json({ error: `GPT '${gpt}' nicht gefunden – auch kein Fallback verfügbar.` });

    const systemPromptPath = path.join(process.cwd(), entry.prompt);
    let systemPrompt = 'Du bist ein KI-Coach. Bitte gib eine freundliche Antwort.';
    try {
      systemPrompt = await fs.readFile(systemPromptPath, 'utf8');
    } catch (e) {
      console.warn(`[Voice GPT] Hinweis: Prompt-Datei '${entry.prompt}' nicht gefunden. Fallback-Text wird verwendet.`);
    }

    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${entry.deployment}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt.trim() },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    const result = await response.json();
    const output = result.choices?.[0]?.message?.content || '[Keine Antwort]';

    return res.status(200).json({ result: output });
  } catch (err) {
    console.error('[Voice GPT] Fehler:', err);
    return res.status(500).json({ error: 'Serverfehler beim Voice-GPT-Call.', details: err.message });
  }
}
