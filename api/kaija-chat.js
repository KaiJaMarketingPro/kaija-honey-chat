document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");

  if (!chatLog || !userInput || !sendButton) {
    console.error("❌ DOM-Elemente fehlen. Prüfe IDs.");
    return;
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  function handleUserInput(message) {
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = "";

    // Journey Trigger
    if (message.toLowerCase() === "lifecycle check starten") {
      setTimeout(() => {
        appendMessage(
          `Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.

Ziel: Du findest in wenigen Minuten heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell ist.

Bereit? Dann starten wir.

Schritt 1 – Automatisierung
Frage 1: Welche Prozesse hast du bereits automatisiert?
(z. B. Bestellabwicklung, Kundensupport, Lifecycle-Management, Rechnungsstellung)`,
          "assistant"
        );
      }, 600);
    } else {
      // Folgefragen simuliert
      simulateFollowUp(message);
    }
  }

  function simulateFollowUp(previousMessage) {
    setTimeout(() => {
      appendMessage("Danke für deine Antwort! Ich analysiere das...", "assistant");

      setTimeout(() => {
        appendMessage("Schritt 1, Frage 2: Welche Tools oder Systeme nutzt du aktuell für diese Automatisierung?", "assistant");
      }, 1500);
    }, 800);
  }

  function appendMessage(content, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.innerText = content;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Automatischer Start
  setTimeout(() => {
    userInput.value = "Lifecycle Check starten";
    handleUserInput("Lifecycle Check starten");
  }, 500);
});
