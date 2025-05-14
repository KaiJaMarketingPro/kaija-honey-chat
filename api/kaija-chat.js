document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");
  const resultBox = document.getElementById("lifecycle-result");
  const resultHeadline = document.getElementById("result-headline");
  const resultSummary = document.getElementById("result-summary");

  const API_ENDPOINT = "/api/chat";

  let currentQuestion = 0;
  let score = 0;
  const chatHistory = [];
  const allowedAnswers = ["a", "b", "c"];

  const questions = [
    // Automatisierung
    { text: "1. Welche Prozesse hast du automatisiert?\na) kaum\nb) teilweise\nc) umfassend", points: { a: 1, b: 2, c: 3 } },
    { text: "2. Wie viele Systeme sind verbunden?\na) keine\nb) 2–3\nc) vollständig integriert", points: { a: 1, b: 2, c: 3 } },
    { text: "3. Nutzt du KI für Automatisierung?\na) nein\nb) experimentell\nc) fest integriert", points: { a: 1, b: 2, c: 3 } },
    { text: "4. Rechnungsstellung automatisiert?\na) manuell\nb) teils\nc) vollautomatisch", points: { a: 1, b: 2, c: 3 } },
    { text: "5. Support-Abläufe automatisiert?\na) nicht\nb) Chatbot\nc) inkl. Eskalation", points: { a: 1, b: 2, c: 3 } },
    { text: "6. Angebotsprozesse?\na) Word-Doku\nb) Tools\nc) automatisch generiert", points: { a: 1, b: 2, c: 3 } },
    { text: "7. Wie schnell ist dein Reaktionssystem?\na) manuell\nb) teilautomatisiert\nc) proaktiv automatisiert", points: { a: 1, b: 2, c: 3 } },
    // Skalierbarkeit
    { text: "8. Wie gut skalierst du bei mehr Anfragen?\na) kaum\nb) mit Aufwand\nc) reibungslos", points: { a: 1, b: 2, c: 3 } },
    { text: "9. Ist dein System cloudfähig?\na) lokal\nb) teils\nc) voll cloudbasiert", points: { a: 1, b: 2, c: 3 } },
    { text: "10. Re-Sale Struktur?\na) Projektweise\nb) manuell geplant\nc) Funnel-gestützt", points: { a: 1, b: 2, c: 3 } },
    { text: "11. Wachstumsprognosen?\na) Bauchgefühl\nb) Tabellen\nc) datenbasiert", points: { a: 1, b: 2, c: 3 } },
    { text: "12. Reaktion auf Marktveränderung?\na) verzögert\nb) moderat\nc) adaptiv in Echtzeit", points: { a: 1, b: 2, c: 3 } },
    { text: "13. Schulungsfähigkeit für Team?\na) kaum\nb) Wiki/Videos\nc) Onboarding-Automation", points: { a: 1, b: 2, c: 3 } },
    { text: "14. Wie skaliert dein Vertrieb?\na) Einzelkontakte\nb) E-Mail-Serie\nc) GPT & Funnel", points: { a: 1, b: 2, c: 3 } },
    // Margenstärke
    { text: "15. Wie hoch ist deine Marge?\na) < 20 %\nb) 20–40 %\nc) > 40 %", points: { a: 1, b: 2, c: 3 } },
    { text: "16. Wie oft passt du Preise an?\na) nie\nb) jährlich\nc) dynamisch", points: { a: 1, b: 2, c: 3 } },
    { text: "17. Nutzt du Preispsychologie?\na) nein\nb) teils\nc) systematisch", points: { a: 1, b: 2, c: 3 } },
    { text: "18. Bundling / Up-Selling?\na) nicht genutzt\nb) vereinzelt\nc) automatisiert", points: { a: 1, b: 2, c: 3 } },
    { text: "19. Wie effizient ist deine Preisstrategie?\na) unklar\nb) nachvollziehbar\nc) datengetrieben", points: { a: 1, b: 2, c: 3 } },
    { text: "20. Welche Preismodelle nutzt du?\na) Fixpreise\nb) Pakete\nc) Subscriptions + Upsell", points: { a: 1, b: 2, c: 3 } },
    { text: "21. Wie stark schützt du deine Marge?\na) gar nicht\nb) projektweise\nc) aktiv & systematisch", points: { a: 1, b: 2, c: 3 } }
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
    const userAnswer = message.trim().toLowerCase();
    appendMessage(message, "user");
    chatHistory.push({ role: "user", content: message });
    userInput.value = '';
    userInput.disabled = true;
    sendButton.disabled = true;

    if (currentQuestion > 0 && currentQuestion <= questions.length) {
      const lastQ = questions[currentQuestion - 1];
      if (allowedAnswers.includes(userAnswer)) {
        score += lastQ.points[userAnswer];
      } else {
        appendMessage("⚠️ Bitte nur mit a, b oder c antworten.", "assistant");
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        return;
      }
    }

    appendMessage("⏳ GPT denkt nach ...", "assistant");

    if (currentQuestion < questions.length) {
      const prompt = questions[currentQuestion].text;
      currentQuestion++;
      fetchGPTReply(prompt);
    } else {
      showResult();
    }
  }

  function fetchGPTReply(nextPrompt) {
    const messages = [
      {
        role: "system",
        content: "Du bist Märki GPT. Führe 21 Multiple-Choice-Fragen (a/b/c) als strukturierter Lifecycle-Check durch. Antworte klar, ohne Rückfragen. Interpretiere jede Antwort direkt. Gib am Ende eine Kategorie (A–C) basierend auf 63 Punkten und eine passende Handlungsempfehlung."
      },
      ...chatHistory,
      { role: "assistant", content: nextPrompt }
    ];

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    })
    .then(res => res.json())
    .then(data => {
      chatLog.querySelector(".message.assistant:last-child")?.remove();
      const reply = data.choices?.[0]?.message?.content || "❌ GPT hat nicht geantwortet.";
      chatHistory.push({ role: "assistant", content: reply });
      appendMessage(reply, "assistant");
      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.focus();
    })
    .catch(err => {
      chatLog.querySelector(".message.assistant:last-child")?.remove();
      appendMessage("❌ Proxy-/Serverfehler oder GPT-Zeitüberschreitung.", "assistant");
      console.error(err);
      userInput.disabled = false;
      sendButton.disabled = false;
    });
  }

  function showResult() {
    let result = "";
    let summary = "";

    if (score >= 53) {
      result = "🟢 Kategorie A: Ready to Scale";
      summary = "Du bist strategisch stark – jetzt Fokus auf Funnel & Pricing mit KaiJa & Honey GPT.";
    } else if (score >= 35) {
      result = "🟡 Kategorie B: Auf Kurs";
      summary = "Du bist auf einem guten Weg – Fokus auf Re-Sale, Training & Automation.";
    } else {
      result = "🔴 Kategorie C: Viel Potenzial";
      summary = "Starte mit dem Mini-KaiJa-System + Strategy-Call, um Marge & Automatisierung zu steigern.";
    }

    appendMessage("🎯 Ergebnis:\n" + result + "\n\n" + summary, "assistant");
    resultHeadline.innerText = result;
    resultSummary.innerText = summary;
    resultBox.style.display = "block";
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  setTimeout(() => {
    const intro = `Willkommen zum 360° Lifecycle-Check für dein Business – powered by KaiJa & Märki GPT.

In weniger als 5 Minuten findest du heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell wirklich ist.

🔍 Du erhältst 21 präzise Fragen in 3 Kategorien:
1. Automatisierung
2. Skalierung
3. Margenstärke

👉 Antworte einfach mit a, b oder c – und erhalte am Ende eine klare Bewertung + Handlungsempfehlung.`;
    appendMessage(intro, "assistant");
    chatHistory.push({ role: "assistant", content: intro });
    const prompt = questions[0].text;
    currentQuestion = 1;
    fetchGPTReply(prompt);
  }, 600);
});
