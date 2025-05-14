export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { userInput } = req.body;

    // Basisschutz
    if (!userInput || typeof userInput !== "string" || userInput.length > 2000) {
      return res.status(400).json({ error: "Ungültige oder zu lange Eingabe" });
    }

    // Triggerphrase erkennen und ggf. initiale Frageabfolge starten
    let promptText = userInput;

    if (userInput.toLowerCase().includes("lifecycle check starten")) {
      promptText = `Bitte starte den KaiJa Lifecycle Check mit der standardisierten 5-Fragen-Abfolge (Multiple Choice + Freitext) für IT-Reseller. Gib nacheinander je eine Frage aus und warte auf Antwort. Erkläre nichts, sei direkt.`;
    }

    const response = await fetch("https://kaija-openai.openai.azure.com/openai/deployments/kaiGPT-prod-v1/chat/completions?api-version=2024-03-01-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "Du bist KaiJa Honey GPT – eine empathische, datengestützte Preisstrategie-KI. Du gibst konkrete, realistische Empfehlungen zu Preisstruktur, Angebotslogik und Wertkommunikation für Coaches, Berater:innen und digitale Produkte. Sei hilfreich, klar, pragmatisch und DSGVO-konform."
          },
          {
            role: "user",
            content: promptText
          }
        ],
        temperature: 0.7,
        max_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Azure GPT Fehler",
        status: response.status,
        details: data
      });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({ error: "GPT-Antwort war leer oder unverständlich." });
    }

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: "Serverfehler",
      message: err.message || "Unbekannter Fehler im API-Handler"
    });
  }
}
