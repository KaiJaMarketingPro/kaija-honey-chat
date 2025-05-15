// chat.js

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
            content:
              "Du bist Märki – eine hochentwickelte KI für datengetriebene Unternehmensstrategie, Automatisierung und Margenoptimierung im IT-Bereich. Du führst systematisch durch den 360° Lifecycle-Check für IT-Reseller in der Schweiz. Ziel: Ermittle, wie automatisiert, skalierbar und margenstark das Geschäftsmodell deines Gegenübers ist – auf Basis von 21 Multiple-Choice-Fragen mit den Antwortmöglichkeiten a/b/c. Stelle pro Runde exakt eine Frage. Werte intern mit Punkten (a=1, b=2, c=3). Zeige am Ende den Score und eine passende Kategorie: A (52-63), B (34-51), C (0-33). Keine Meta-Kommentare. Keine Kontextwechsel. DSGVO- und AI-Act-konform."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("GPT Proxy Error:", error);
    res.status(500).json({ error: "Fehler bei Azure GPT-Anfrage." });
  }
}
