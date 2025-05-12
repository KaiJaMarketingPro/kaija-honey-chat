export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { userInput } = req.body;

    const response = await fetch("https://kaija-openai.openai.azure.com/openai/deployments/kaiGPT-prod-v1/chat/completions?api-version=2024-03-01-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "Du bist KaiJa Honey GPT – du gibst empathische, pragmatische Empfehlungen zu Preisstrategie, Produktwert und Kundengefühl." },
          { role: "user", content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: "GPT Fehler", details: errorData });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "GPT-Antwort leer" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Serverfehler", message: err.message });
  }
}
