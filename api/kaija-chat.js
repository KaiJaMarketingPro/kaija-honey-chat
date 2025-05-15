// 📁 kaija-chat.js
// GPT-Kommunikation via Proxy mit Retry, Lade- & Fehleranzeige

export async function sendToMaerkiGPT(userMessage, retries = 1) {
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
      if (response.status === 401 || response.status === 403) {
        alert('⚠️ Deine Session ist abgelaufen. Bitte lade die Seite neu.');
        location.reload();
        return;
      }

      if ([500, 502, 503, 504].includes(response.status) && retries > 0) {
        console.warn(`🔁 Retry wegen GPT-Fehler (${response.status})...`);
        return await sendToMaerkiGPT(userMessage, retries - 1);
      }

      throw new Error(`API Fehler: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return reply || '❌ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    if (retries > 0) {
      console.warn('🔁 Retry wegen Netzwerkfehler...', error);
      return await sendToMaerkiGPT(userMessage, retries - 1);
    }

    console.error('❌ Fehler beim Senden an Märki GPT:', error);
    return '❌ Fehler beim Verarbeiten der Anfrage. Bitte versuche es erneut.';
  }
}

// Globaler Trigger für HTML-Button
window.startCheck = async function () {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const outputEl = document.getElementById('chatOutput');

  if (!loadingEl || !errorEl || !outputEl) {
    console.error('❌ HTML-Elemente nicht gefunden. Bitte prüfe index.html IDs.');
    return;
  }

  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  outputEl.innerText = '';

  const antwort = await sendToMaerkiGPT("Lifecycle Check starten");

  loadingEl.style.display = 'none';

  if (antwort.startsWith('❌')) {
    errorEl.style.display = 'block';
    outputEl.innerText = antwort;
  } else {
    outputEl.innerText = antwort;
  }
};
