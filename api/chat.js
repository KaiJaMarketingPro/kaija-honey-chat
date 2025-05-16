// 📁 /api/chat.js
// Azure OpenAI Proxy mit Retry, Timeout-Handling & Sicherheitsprüfung

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Ungültiges Nachrichtenformat. Erwartet: Array von Messages.' });
  }

  const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;

  const maxRetries = 1;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 Sek

      console.log(`[${new Date().toISOString()}] 🌐 GPT-Request an Azure wird gesendet (Versuch ${retryCount + 1})`);

      const azureRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_KEY,
        },
        body: JSON.stringify({
          messages,
          temperature: 0.3,
          max_tokens: 1200,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!azureRes.ok) {
        if ([500, 502, 503, 504].includes(azureRes.status) && retryCount < maxRetries) {
          console.warn(`🔁 Retry (#${retryCount + 1}) wegen GPT-Fehler: ${azureRes.status}`);
          retryCount++;
          continue;
        }
        return res.status(azureRes.status).json({ error: `Azure GPT Fehler: ${azureRes.status}` });
      }

      const result = await azureRes.json();
      return res.status(200).json(result);

    } catch (err) {
      if (retryCount < maxRetries) {
        console.warn(`🔁 Retry (#${retryCount + 1}) wegen Netzwerkfehler:`, err);
        retryCount++;
        continue;
      }
      console.error(`[${new Date().toISOString()}] ❌ GPT-Proxy-Fehler:`, err);
      return res.status(500).json({ error: 'Serverfehler beim Aufruf der Azure API.' });
    }
  }
}
