// 📁 kaija-chat.js
// Frontend-Modul zur Kommunikation mit dem Azure-GPT via Proxy + Button-Trigger

// Funktion zum Senden an die Azure-Proxy-API (/api/chat)
export async function sendToMaerkiGPT(userMessage) {
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
      throw new Error(`API Fehler: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return reply || '❌ Keine Antwort vom GPT erhalten.';
  } catch (error) {
    console.error('❌ Fehler beim Senden an Märki GPT:', error);
    return '❌ Fehler beim Verarbeiten der Anfrage. Bitte versuche es erneut.';
  }
}

// Lifecycle Check Trigger global verfügbar machen
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
