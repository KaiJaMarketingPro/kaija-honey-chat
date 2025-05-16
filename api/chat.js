// 📁 /api/chat.js
// Azure OpenAI Proxy mit Retry, Timeout & Systemprompt-Integration

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const { messages = [] } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Ungültiges Nachrichtenformat. Erwartet: Array von Messages.' });
  }

  const systemPrompt = {
    role: "system",
    content: `Du bist Märki – eine hochentwickelte KI für datengetriebene Unternehmensstrategie, Automatisierung und Margenoptimierung im IT-Bereich. Du führst systematisch durch den 360° Lifecycle-Check für IT-Reseller in der Schweiz.

Stelle insgesamt 21 Fragen, je Kategorie 7 (Automatisierung, Skalierbarkeit, Margenstärke).
Jede Frage ist im Multiple-Choice-Format: (a) ... (b) ... (c) ...
Antworte nur mit einer Frage pro Runde.
Warte auf eine Eingabe „a“, „b“ oder „c“, bewerte jede Antwort intern mit Punkten:
a = 1 Punkt, b = 2 Punkte, c = 3 Punkte.
Am Ende:
- Zeige Score + Kategorie (A: 52–63, B: 34–51, C: 0–33)
- Gib eine klare Handlungsempfehlung (z. B. Automatisierung, Funnel, Beratung).
Verlasse niemals das Lifecycle-Format. Keine Meta-Kommentare. DSGVO- und AI Act-konform.`
  };

  const payload = {
    messages: [systemPrompt, ...messages],
    temperature: 0.3,
    max_tokens: 1200,
  };

  const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;
  const apiKey = process.env.AZURE_OPENAI_KEY;

  if (!endpoint || !apiKey) {
    return res.status(500).json({ error: 'Fehlende Umgebungsvariablen. Bitte überprüfe AZURE_OPENAI_* in Vercel.' });
  }

  const maxRetries = 1;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      console.log(`[${new Date().toISOString()}] 🌐 GPT-Request an Azure wird gesendet (Versuch ${retryCount + 1})`);

      const azureRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!azureRes.ok) {
        if ([500, 502, 503, 504].includes(azureRes.status) && retryCount < maxRetries) {
          console.warn(`🔁 Retry (#${retryCount + 1}) wegen GPT-Fehler: ${azureRes.status}`);
          retryCount++;
          continue;
        }
        const errText = await azureRes.text();
        return res.status(azureRes.status).json({ error: `Azure GPT Fehler: ${azureRes.status}`, message: errText });
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
      return res.status(500).json({ error: 'Serverfehler beim Aufruf der Azure API.', details: err.message });
    }
  }
}
