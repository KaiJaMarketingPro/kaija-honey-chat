export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST requests allowed" });

  const apiKey = process.env.AZURE_API_KEY;
  const endpoint = "https://kaija-openai.openai.azure.com/openai/deployments/maerki-gpt/chat/completions?api-version=2024-04-15";

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Invalid input: messages missing" });

  messages.unshift({
    role: "system",
    content: "Du bist Märki GPT. Du führst den User durch 21 Multiple-Choice-Fragen (a/b/c). Keine Rückfragen, keine Wiederholung. Jede Antwort wird interpretiert (a=1, b=2, c=3). Gib am Ende eine Bewertung nach Punktestand: A (53–63), B (35–52), C (0–34). Empfehlung: kurz, strategisch, keine GPT-Floskeln. Konzentriert auf Automatisierung, Skalierung und Marge."
  });

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

    if (!response.ok) return res.status(response.status).json(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.message });
  }
}
