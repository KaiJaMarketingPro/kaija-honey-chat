// 📁 /api/chat-memory.js – Chat mit Memory-Integration aus Logs
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed.');
  }

  try {
    const body = await req.json();
    const { gpt = 'honey-gpt', messages = [] } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages fehlen oder sind leer.' });
    }

    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf8'));
    const entry = mapping[gpt];

    if (!entry) return res.status(404).json({ error: `GPT '${gpt}' nicht gefunden.` });

    const systemPrompt = await fs.readFile(path.join(process.cwd(), entry.prompt), 'utf8');

    // 🧠 Lade Memory-Chunks aus Logs
    let memory = [];
    const logPath = path.join(process.cwd(), 'logs/test-log.json');
    try {
      const logData = JSON.parse(await fs.readFile(logPath, 'utf8'));
      const filtered = logData.filter(l => l.gpt === gpt).slice(0, 3); // letzte 3 Dialoge
      memory = filtered.map(l => [
        { role: 'user', content: l.prompt },
        { role: 'assistant', content: l.output }
      ]).flat();
    } catch (e) {
      console.warn('[Memory] Keine Logs geladen.');
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
          ...memory,
          ...messages
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });

    const result = await response.json();
    const output = result.choices?.[0]?.message?.content || '[Keine Antwort]';

    return res.status(200).json({ result: output });
  } catch (err) {
    console.error('[Chat Memory] Fehler:', err);
    return res.status(500).json({ error: 'Serverfehler beim Chat mit Memory.', details: err.message });
  }
}
