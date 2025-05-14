// /api/chat.js – Azure GPT Proxy für Vercel
export default async function handler(req, res) {
  const endpoint = "https://kaija-openai.openai.azure.com/openai/deployments/maerki-gpt/chat/completions?api-version=2024-04-15";
  const apiKey = process.env.AZURE_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages,
        temperature: 0.5,
        max_tokens: 800,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Fehler im Proxy:", err);
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
}
