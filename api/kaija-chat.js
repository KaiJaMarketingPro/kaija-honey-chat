export default async function handler(req, res) {
  // Nur POST zulassen
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { userInput } = req.body;

    // Anfrage an Azure GPT senden
    const response = await fetch("https://kaija-openai.openai.azure.com/openai/deployments/kaiGPT-prod-v1/chat/completions?api-version=2024-03-01-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY // dein Azure Key aus Vercel Environment Variables
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "Du bist KaiJa Honey GPT – eine empathische, datengestützte Preisstrategie-KI. Du gibst konkrete, realistische Empfehlungen zu Preisstruktur, Angebotslogik und Wertkommunikation für Coaches, Berater:innen und digitale Produkte. Sei hilfreich, klar und pragmatisch."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    const data = await response.json();

    // Wenn GPT nicht korrekt antwortet
    if (!response.ok) {
      return res.status(response.status).json({
        error: "GPT Fehler",
        status: response.status,
        details: data
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "GPT-Antwort war leer oder unverständlich." });
    }

    return res.status(200).json({ reply });

  } catch (err) {
    // Technischer Fehler (z. B. Netzwerk, Key fehlt)
    return res.status(500).json({
      error: "Serverfehler",
      message: err.message || "Unbekannter Fehler"
    });
  }
}
