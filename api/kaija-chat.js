document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");

  if (!chatLog || !userInput || !sendButton) {
    console.error("❌ DOM-Elemente nicht gefunden – prüfe IDs in index.html");
    return;
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  function appendMessage(content, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = content;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function handleUserInput(message) {
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = '';
    userInput.disabled = true;
    sendButton.disabled = true;

    appendMessage("🧠 Wird verarbeitet...", "assistant");

    setTimeout(() => {
      simulateReply(message);
    }, 800);
  }

  function simulateReply(message) {
    chatLog.querySelector(".message.assistant:last-child")?.remove(); // Entfernt "🧠 Wird verarbeitet..."

    if (message.toLowerCase() === "lifecycle check starten") {
      appendMessage(
`Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.

Ziel: Du findest in wenigen Minuten heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell ist.

Bereit? Dann starten wir.

Schritt 1 – Automatisierung
Frage 1: Welche Prozesse hast du bereits automatisiert?
(z. B. Bestellabwicklung, Kundensupport, Lifecycle-Management, Rechnungsstellung)`, "assistant");
    } else {
      appendMessage("Danke für deine Antwort! Ich analysiere das...", "assistant");
      setTimeout(() => {
        appendMessage("Schritt 1, Frage 2: Welche Tools oder Systeme nutzt du aktuell für diese Automatisierung?", "assistant");
      }, 1500);
    }

    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }

  // 🔄 Automatischer Trigger für Lifecycle-Start
  setTimeout(() => {
    handleUserInput("Lifecycle Check starten");
  }, 500);
});
