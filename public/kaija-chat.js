const DEBUG = false;
const MAX_RETRIES = 1;
const GPT_ENDPOINT = 'https://maerki-gpt.vercel.app/api/chat';

// Hauptfunktion zum Senden von User Prompts an ein beliebiges GPT
async function sendToGPT(gpt, userMessage, retries = MAX_RETRIES) {
  if (DEBUG) console.log(`📡 Sende an GPT ${gpt}:`, userMessage);

  try {
    const response = await fetch(GPT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gpt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '⚠️ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    console.error(`❌ GPT-Fehler [${gpt}]:`, error);
    if (retries > 0) return await sendToGPT(gpt, userMessage, retries - 1);
    return '❌ GPT konnte nicht kontaktiert werden.';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startButton");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const outputEl = document.getElementById("chatOutput");
  const gptSelect = document.getElementById("gptSelect");

  if (!button || !loadingEl || !errorEl || !outputEl || !gptSelect) return;

  const introPrompts = {
    "maerki-gpt": "Starte den 360° Business Check bitte.",
    "kaija-gpt": "Erstelle mir einen Funnel für mein Coaching-Angebot.",
    "honey-gpt": "Hilf mir, drei faire Paketpreise zu entwickeln.",
    "baschis-gpt": "Wie formuliere ich ein empathisches Follow-up auf LinkedIn?",
    "homie-gpt": "Ich brauche ein Onboarding für neue Mitarbeitende im Marketing.",
    "kaivio-gpt": "Was kann ich an meinem LinkedIn-Profil verbessern?",
    "soulguide-gabriela-gpt": "Wie kann ich mein Angebot DSGVO- & ethikgerecht kommunizieren?",
    "soulsyncai-gpt": "Ich möchte meinen Tag nach meinem Human Design Typ strukturieren.",
    "dailyjasmin-gpt": "Was wäre heute ein guter Selfcare-Impuls?"
  };

  button.addEventListener("click", async () => {
    const gpt = gptSelect.value;
    const prompt = introPrompts[gpt] || "Starte jetzt.";

    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    outputEl.innerText = '';

    const antwort = await sendToGPT(gpt, prompt);
    loadingEl.style.display = 'none';

    if (antwort.startsWith('❌')) {
      errorEl.style.display = 'block';
      outputEl.innerText = antwort;
    } else {
      errorEl.style.display = 'none';
      outputEl.innerText = antwort;
      outputEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
