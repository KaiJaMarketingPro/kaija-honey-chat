// 📁 /api/test-gpt.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only GET requests allowed.');
  }

  try {
    const { gpt, prompt } = new URL(req.url, 'http://localhost').searchParams;
    if (!gpt || !prompt) return res.status(400).send('GPT oder Prompt fehlt.');

    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf8'));
    const entry = mapping[gpt];

    if (!entry) return res.status(404).send(`GPT ${gpt} nicht gefunden.`);

    const systemPrompt = await fs.readFile(path.join(process.cwd(), entry.prompt), 'utf8');

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
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 400
      })
    });

    const result = await response.json();
    const output = result.choices?.[0]?.message?.content || '[Keine Antwort]';

    const html = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Prompt Test: ${gpt}</title></head>
<body style="font-family:sans-serif;padding:2em;background:#f4f4f4">
<h2>🧪 GPT Test: ${gpt}</h2>
<p><strong>Prompt:</strong><br><pre>${prompt}</pre></p>
<p><strong>Antwort:</strong><br><pre style="background:#fff;padding:1em;border-radius:8px;border:1px solid #ccc">${output}</pre></p>
<p><a href="/admin/gpt-tools">⬅️ Zurück zum Tool</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[Test GPT] Fehler:', err);
    return res.status(500).send('Interner Fehler bei GPT-Test');
  }
}
