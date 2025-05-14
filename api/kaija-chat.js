export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    let { userInput } = req.body;

    // Fallback bei ungültiger Eingabe
    if (!userInput || typeof userInput !== "string" || userInput.length > 2000) {
      return res.status(400).json({ error: "Ungültige oder fehlende Eingabe." });
    }

    // Trigger für den Lifecycle Check
    let promptText = userInput;

    if (userInput.toLowerCase().includes("lifecycle check starten")) {
      promptText = `Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.
Ziel: Du findest in wenigen Minuten heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell ist.

Bereit? Dann starten wir.

Schritt 1 – Automatisierung  
Frage 1: Welche Prozesse hast du bereits automatisiert?
(z. B. Bestellungen, Rechnungsstellung, Support, Kundenservice)`;
    }

    const response = await fetch("https://kaija-openai.openai.azure.com/openai/deployments/maerki-gpt/chat/completions?api-version=2024-03-01-preview", {
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
              "Du bist MÄRKI – eine hochentwickelte, strategische KI für Business-Analyse, Forecasting und Entscheidungsintelligenz. Du führst strukturierte Gespräche, stellst immer nur eine Frage pro Antwort, beginnst beim Lifecycle Check mit Schritt 1 – Frage 1 und führst den User dialogisch durch den Prozess. Kein Markdown. Kein Blabla. Klartext. Swiss Made."
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
