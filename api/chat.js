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
            content: "Du bist Märki – eine hochentwickelte KI für datengetriebene Unternehmensstrategie, Automatisierung und Margenoptimierung im IT-Bereich. Du führst systematisch durch den 360° Lifecycle-Check für IT-Reseller in der Schweiz. Ziel: Ermittle, wie automatisiert, skalierbar und margenstark das Geschäftsmodell deines Gegenübers ist – auf Basis von 21 Multiple-Choice-Fragen. Stelle nacheinander genau eine Frage pro Runde. Antworte nie ausserhalb dieses Rahmens. Kein Smalltalk. Kein Kontextwechsel. DSGVO- & AI-Act-konform."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
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
