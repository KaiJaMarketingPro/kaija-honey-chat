export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = process.env.AZURE_API_KEY;
  const deployment = process.env.AZURE_DEPLOYMENT_NAME || "maerki-gpt";
  const endpoint = `${process.env.AZURE_ENDPOINT}/openai/deployments/${deployment}/chat/completions?api-version=2024-04-15`;

  const { messages } = req.body;

  if (!apiKey || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Missing API key or invalid input." });
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
      console.error("GPT-Proxy error:", data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("GPT Fetch failed:", err);
    res.status(500).json({ error: "GPT call failed", details: err.message });
  }
}
