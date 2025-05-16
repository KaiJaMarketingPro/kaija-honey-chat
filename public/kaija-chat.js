// 📁 public/kaija-chat.js
// Optimiert für 10/10: sicher, verständlich, UX-freundlich, produktionsreif

const DEBUG = false;
const MAX_RETRIES = 1;
const GPT_ENDPOINT = 'https://maerki-gpt.vercel.app/api/chat';

/**
 * Sendet eine Nachricht an die GPT-API und gibt die Antwort zurück.
 * @param {string} userMessage - Die vom Nutzer initiierte Nachricht.
 * @param {number} retries - Anzahl verbleibender Wiederholungen bei Fehler.
 * @returns {Promise<string>} GPT-Antwort als Text
 */
async function sendToMaerkiGPT(userMessage, retries = MAX_RETRIES) {
  if (DEBUG) console.log("📡 Sende an GPT:", userMessage);

  try {
    const response = await fetch(GPT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] })
    });

    if (!response.ok) {
      if (DEBUG) console.warn("⚠️ HTTP Status:", response.status);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (DEBUG) console.log("✅ GPT-Antwort:", reply);

    return reply || '❌ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    console.error(`❌ Fehler bei sendToMaerkiGPT (${new Date().toLocaleTimeString()}):`, error);
    if (retries > 0) {
      if (DEBUG) console.log("🔁 Versuche erneut...", retries - 1);
      return await sendToMaerkiGPT(userMessage, retries - 1);
    }
    return '❌ GPT konnte nicht kontaktiert werden.';
  }
}

/**
 * Initialisiert das Event-Handling für den Start-Button und verarbeitet die Antwort.
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startButton");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const outputEl = document.getElementById("chatOutput");

  if (!button || !loadingEl || !errorEl || !outputEl) {
    console.error('❌ Wichtige HTML-Elemente nicht gefunden.');
    return;
  }

  button.addEventListener("click", async () => {
    const prompt = "Lifecycle Check starten";
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    outputEl.innerText = '';

    const antwort = await sendToMaerkiGPT(prompt);

    loadingEl.style.display = 'none';

    if (antwort.startsWith('❌')) {
      errorEl.style.display = 'block';
      outputEl.innerText = antwort;
    } else {
      errorEl.style.display = 'none';
      // Wenn später HTML benötigt wird:
      // outputEl.innerHTML = antwort;
      outputEl.innerText = antwort;
      outputEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
