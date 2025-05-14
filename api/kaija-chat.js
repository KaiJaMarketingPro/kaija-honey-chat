document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.querySelector("button");

  sendButton.addEventListener("click", handleUserInput);

  function handleUserInput() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage(message, "user");

    if (message.toLowerCase() === "lifecycle check starten") {
      // Einstieg in die Journey
      setTimeout(() => {
        appendMessage(
          `Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.\n\nZiel: Du findest in wenigen Minuten heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell ist.\n\nBereit? Dann starten wir.\n\n**Schritt 1 – Automatisierung**\nFrage 1: Welche Prozesse hast du bereits automatisiert?\n(z. B. Bestellabwicklung, Kundensupport, Lifecycle-Management, Rechnungsstellung)`,
          "assistant"
        );
      }, 600);

    } else {
      // Hier können weitere Antworten oder API-Calls ergänzt werden
      setTimeout(() => {
        appendMessage("Danke für deine Antwort! Ich analysiere das...", "assistant");

        // Beispiel für Folgefrage (simuliert)
        setTimeout(() => {
          appendMessage("Schritt 1, Frage 2: Welche Tools oder Systeme nutzt du aktuell für diese Automatisierung?", "assistant");
        }, 1800);

      }, 800);
    }

    userInput.value = "";
  }

  function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = content;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});
