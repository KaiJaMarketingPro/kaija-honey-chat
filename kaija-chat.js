// 📁 kaija-chat.js
// GPT-Kommunikation via Proxy mit Debug & Retry

export async function sendToMaerkiGPT(userMessage, retries = 1) {
  console.log("📡 Starte GPT-Request mit:", userMessage);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      console.warn("⚠️ GPT-Antwort nicht erfolgreich:", response.status);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    console.log("✅ GPT-Antwort:", reply);

    return reply || '❌ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    console.error('❌ Fehler bei sendToMaerkiGPT:', error);
    if (retries > 0) {
      console.log("🔁 Neuer Versuch...", retries - 1);
      return await sendToMaerkiGPT(userMessage, retries - 1);
    }
    return '❌ Fehler beim Kontakt mit GPT.';
  }
}
