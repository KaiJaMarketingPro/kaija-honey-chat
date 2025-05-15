// 📁 kaija-chat.js
// Frontend-Modul zur Kommunikation mit dem Azure-GPT via Proxy

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
