// 📁 /pages/api/chat.js
// Serverless-Proxy zu Azure OpenAI (Deployment: maerki-gpt)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  const { messages } = req.body;

  const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_VERSION}`;

  try {
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
    });

    if (!azureRes.ok) {
      console.error(`Azure GPT-Fehler: ${azureRes.status}`);
      return res
        .status(azureRes.status)
        .json({ error: `Azure GPT Fehler: ${azureRes.status}` });
    }

    const result = await azureRes.json();
    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Serverfehler beim Proxy-Request:', err);
    res.status(500).json({ error: 'Proxy-Fehler beim Aufruf der Azure API.' });
  }
}
