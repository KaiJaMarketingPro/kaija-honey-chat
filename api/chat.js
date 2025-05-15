export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = process.env.AZURE_API_KEY;
  const apiUrl = process.env.AZURE_API_URL;

  if (!apiKey || !apiUrl) {
    return res.status(500).json({ error: "Missing API credentials." });
  }

  const userMessage = req.body.messages?.[0]?.content || "Lifecycle Check starten";

  console.log("▶️ Eingehende User-Nachricht:", userMessage); // 🔍 Debug

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "Du bist Märki – eine hochentwickelte KI für datengetriebene Unternehmensstrategie..."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        top_p: 1
      })
    });

    const data = await response.json();
    console.log("✅ GPT-Antwort erhalten:", data); // 🔍 Debug

    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Fehler bei GPT-Fetch:", error);
    res.status(500).json({ error: "GPT-Fetch fehlgeschlagen." });
  }
}
