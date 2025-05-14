document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");
  const resultBox = document.getElementById("lifecycle-result");
  const resultHeadline = document.getElementById("result-headline");
  const resultSummary = document.getElementById("result-summary");

  let currentQuestion = 0;
  let score = 0;

  const questions = [
    {
      text: "1. Wie aktiv ist dein aktuelles Pricing-Modell für Service oder Finanzierung?\n\na) Wir haben feste Preise – aber keine dynamische Steuerung\nb) Teilweise dynamisch, aber nicht standardisiert\nc) Wir nutzen eine automatisierte Pricing-Logik oder Abo-Modelle",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "2. Wie bildest du intern oder extern Schulungen ab (z. B. für Kunden, Partner oder Team)?\n\na) Wir schulen manuell oder reaktiv\nb) Es gibt vereinzelte Tools, aber keine skalierbare Lösung\nc) Schulungen laufen standardisiert (z. B. LMS, KI, Video-Abläufe)",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "3. Wie gehst du aktuell mit Altgeräten oder Rückläufern um?\n\na) Manuell, ohne definierten Prozess\nb) Teilweise strukturiert (z. B. Rückkauf, Bewertung)\nc) Vollautomatisierter Refurbishing-Flow mit Partnern",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "4. Wie organisierst du Re-Sale von Neuware oder Refurbished-Produkten?\n\na) Projektbasiert oder auf Zuruf\nb) Teilweise mit Funnel oder gezielter Ansprache\nc) Wir nutzen einen automatisierten Verkaufsprozess (inkl. Funnel, GPT, E-Mail-Serie)",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "5. Wie stark ist dein Lifecycle aktuell automatisiert?\n\na) Weniger als 30 %\nb) Zwischen 30–70 %\nc) Über 70 % (z. B. Pricing, Support, Re-Sale, Training)",
      points: { a: 2, b: 4, c: 6 }
    }
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

      // Punkte zuordnen
      if (currentQuestion > 0 && currentQuestion <= questions.length) {
        const answerKey = message.trim().toLowerCase();
        const lastQ = questions[currentQuestion - 1];
        if (lastQ.points[answerKey]) {
          score += lastQ.points[answerKey];
        }
      }

      // Nächste Frage oder Abschluss
      if (currentQuestion < questions.length) {
        appendMessage("Frage " + (currentQuestion + 1) + ": " + questions[currentQuestion].text, "assistant");
        currentQuestion++;
      } else {
        showResult();
      }

      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.focus();
    }, 800);
  }

  function showResult() {
    let result = "";
    let summary = "";

    if (score >= 25) {
      result = "🟢 Kategorie A: „Ready to Scale“";
      summary = "Du bist technisch & strategisch gut aufgestellt – KaiJa hilft dir jetzt, Marge & Zeit vollautomatisiert zu maximieren. Empfehlung: Starte direkt mit Funnel-Boost & Pricing-Prozessen (Honey + Baschi).";
    } else if (score >= 17) {
      result = "🟡 Kategorie B: „Auf Kurs“";
      summary = "Dein Lifecycle funktioniert – aber er ist ausbaufähig. Empfehlung: Fokus auf Schulung & Service-Automatisierung (Homie + KaiJa GPT + Re-Sale-Funnel).";
    } else {
      result = "🔴 Kategorie C: „Lifecycle manuell – viel Potenzial“";
      summary = "Dein Geschäft läuft – aber du verschenkst Marge & Zeit. Empfehlung: Starte mit dem „Mini-KaiJa-System“: Pricing, Training & GPT-gestützter Re-Sale. Kostenloser Strategy-Call empfohlen.";
    }

    appendMessage("🎯 Dein Ergebnis:\n" + result + "\n\n" + summary, "assistant");

    if (resultBox) {
      resultHeadline.innerText = result;
      resultSummary.innerText = summary;
      resultBox.style.display = "block";
    }
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  // Automatisch starten
  setTimeout(() => {
    appendMessage(
      `Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.

In 3 Minuten findest du heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell wirklich ist.

👉 Ziel: Ehrliches Selbstbild + direkte Handlungsempfehlung – 100 % Swiss Made.

Bereit? Dann los – Frage für Frage.`,
      "assistant"
    );
    appendMessage("Frage 1: " + questions[0].text, "assistant");
    currentQuestion = 1;
  }, 600);
});
