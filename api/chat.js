// /api/chat.js – Azure GPT Proxy für Märki GPT via Vercel Serverless

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = process.env.AZURE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key missing in environment variables" });
  }

  const endpoint = "https://kaija-openai.openai.azure.com/openai/deployments/maerki-gpt/chat/completions?api-version=2024-04-15";
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid input: 'messages' must be an array." });
  }

  try {
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

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Azure GPT error:", data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}
