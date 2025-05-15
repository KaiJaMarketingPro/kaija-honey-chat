export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = process.env.AZURE_API_KEY;
  const apiUrl = process.env.AZURE_API_URL;

  if (!apiKey || !apiUrl) {
    return res.status(500).json({ error: "API config missing. Check environment variables." });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        messages: req.body.messages,
        temperature: 0.7,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    console.error("GPT Proxy Error:", error);
    res.status(500).json({ error: "Fehler bei der Kommunikation mit Märki GPT." });
  }
}
