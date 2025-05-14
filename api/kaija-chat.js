document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");

  let stepIndex = 0;

  const steps = [
    // Schritt 1 – Automatisierung
    "Welche Prozesse hast du bereits automatisiert? (z. B. Bestellabwicklung, Kundensupport, Lifecycle-Management, Rechnungsstellung)",
    "Welche Tools oder Systeme nutzt du aktuell für diese Automatisierung?",
    "Welche Schnittstellen funktionieren gut – und wo gibt es Medienbrüche?",

    // Schritt 2 – Skalierbarkeit
    "Wie reagiert dein Geschäftsmodell auf eine plötzliche Auftragssteigerung? Was passiert bei 2× mehr Volumen?",
    "Hast du skalierbare Teams, Prozesse oder Partnerstrukturen etabliert?",

    // Schritt 3 – Margenstärke
    "Wie hoch sind deine durchschnittlichen Margen auf deine Dienstleistungen/Produkte?",
    "Welche Strategie verfolgst du aktuell zur Margenverbesserung (z. B. Preisanpassung, Automatisierung, Upselling)?"
  ];

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
      chatLog.querySelector(".message.assistant:last-child")?.remove();

      if (stepIndex === 0) {
        appendMessage(
`Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.

Ziel: Du findest in wenigen Minuten heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell ist.

Bereit? Dann starten wir.

Schritt 1 – Automatisierung\nFrage 1: ${steps[stepIndex]}`, "assistant"
        );
        stepIndex++;
      } else if (stepIndex < steps.length) {
        if (stepIndex === 3) {
          appendMessage("Super – dann gehen wir weiter zu Schritt 2 – Skalierbarkeit.\nFrage 4: " + steps[stepIndex], "assistant");
        } else if (stepIndex === 5) {
          appendMessage("Danke! Jetzt kommt Schritt 3 – Margenstärke.\nFrage 6: " + steps[stepIndex], "assistant");
        } else {
          appendMessage("Frage " + (stepIndex + 1) + ": " + steps[stepIndex], "assistant");
        }
        stepIndex++;
      } else {
        appendMessage("🎯 Danke für deine Antworten! Ich fasse gleich alles für dich zusammen oder leite dich an KaiJa für die nächste Empfehlung weiter.", "assistant");
      }

      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.focus();
    }, 800);
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  // Autostart mit Lifecycle Check
  setTimeout(() => {
    handleUserInput("Lifecycle Check starten");
  }, 500);
});
