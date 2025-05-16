const DEBUG = false;
const MAX_RETRIES = 1;
const GPT_ENDPOINT = 'https://maerki-gpt.vercel.app/api/chat';

async function sendToMaerkiGPT(userMessage, retries = MAX_RETRIES) {
  if (DEBUG) console.log("📡 Sende an GPT:", userMessage);

  try {
    const response = await fetch(GPT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '❌ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    console.error(`❌ GPT-Fehler:`, error);
    if (retries > 0) return await sendToMaerkiGPT(userMessage, retries - 1);
    return '❌ GPT konnte nicht kontaktiert werden.';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startButton");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const outputEl = document.getElementById("chatOutput");

  if (!button || !loadingEl || !errorEl || !outputEl) return;

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
      outputEl.innerText = antwort;
      outputEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
