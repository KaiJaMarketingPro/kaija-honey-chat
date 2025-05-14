document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");
  const resultBox = document.getElementById("lifecycle-result");
  const resultHeadline = document.getElementById("result-headline");
  const resultSummary = document.getElementById("result-summary");

  // ⛔ Für produktiven Einsatz API-KEY & ENDPOINT NIE im Frontend!
  const API_ENDPOINT = "https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions?api-version=2024-04-15";
  const API_KEY = "sk-EXAMPLEKEY"; // ⚠ Nur für Testzwecke – in Produktion via Proxy/Backend ersetzen

  let currentQuestion = 0;
  let score = 0;
  const chatHistory = [];

  const allowedAnswers = ["a", "b", "c"];

  const questions = [
    {
      text: "1. Wie aktiv ist dein aktuelles Pricing-Modell?\n\na) feste Preise\nb) teilweise dynamisch\nc) automatisiert oder Abo-Modell",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "2. Wie bildest du intern/extern Schulungen ab?\n\na) manuell\nb) Tools vereinzelt\nc) LMS oder KI-gestützt",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "3. Wie gehst du mit Rückläufern um?\n\na) manuell\nb) strukturiert\nc) vollautomatisch",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "4. Wie organisierst du Re-Sale?\n\na) projektbasiert\nb) teilautomatisiert\nc) Funnel + GPT + Email",
      points: { a: 2, b: 4, c: 6 }
    },
    {
      text: "5. Wie automatisiert ist dein Lifecycle?\n\na) < 30 %\nb) 30–70 %\nc) > 70 %",
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
    const userAnswer = message.trim().toLowerCase();
    appendMessage(message, "user");
    chatHistory.push({ role: "user", content: message });
    userInput.value = '';
    userInput.disabled = true;
    sendButton.disabled = true;

    // Bewertung
    if (currentQuestion > 0 && currentQuestion <= questions.length) {
      const lastQ = questions[currentQuestion - 1];
      if (allowedAnswers.includes(userAnswer)) {
        score += lastQ.points[userAnswer];
      } else {
        appendMessage("⚠️ Bitte antworte mit a, b oder c.", "assistant");
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        return;
      }
    }

    showSpinner();

    if (currentQuestion < questions.length) {
      const prompt = questions[currentQuestion].text;
      currentQuestion++;
      fetchGPTReply(prompt);
    } else {
      hideSpinner();
      showResult();
    }
  }

  function fetchGPTReply(nextPrompt) {
    const messages = [
      { role: "system", content: "Du bist Märki GPT. Klar, analytisch, CEO-ready. Antworte präzise." },
      ...chatHistory,
      { role: "assistant", content: nextPrompt }
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages,
        temperature: 0.5
      }),
      signal: controller.signal
    })
    .then(res => res.json())
    .then(data => {
      hideSpinner();
      const reply = data.choices?.[0]?.message?.content || "❌ GPT hat nicht geantwortet.";
      chatHistory.push({ role: "assistant", content: reply });
      appendMessage(reply, "assistant");
      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.focus();
    })
    .catch(err => {
      hideSpinner();
      appendMessage("❌ Verbindung fehlgeschlagen oder GPT hat nicht geantwortet.", "assistant");
      console.error("GPT Fehler:", err);
      userInput.disabled = false;
      sendButton.disabled = false;
    })
    .finally(() => clearTimeout(timeout));
  }

  function showResult() {
    let result = "";
    let summary = "";

    if (score >= 25) {
      result = "🟢 Kategorie A: Ready to Scale";
      summary = "Du bist strategisch stark – Fokus jetzt auf Funnel & Pricing-Automatisierung mit KaiJa & Honey GPT.";
    } else if (score >= 17) {
      result = "🟡 Kategorie B: Auf Kurs";
      summary = "Du bist stabil unterwegs, aber es gibt Luft nach oben – starte mit Training & Re-Sale-Funnel.";
    } else {
      result = "🔴 Kategorie C: Viel Potenzial";
      summary = "Dein Lifecycle ist stark manuell – starte jetzt mit dem Mini-KaiJa-System + Strategy-Call.";
    }

    appendMessage("🎯 Dein Ergebnis:\n" + result + "\n\n" + summary, "assistant");
    if (resultBox) {
      resultHeadline.innerText = result;
      resultSummary.innerText = summary;
      resultBox.style.display = "block";
    }
  }

  function showSpinner() {
    appendMessage("⏳ GPT denkt nach ...", "assistant");
  }

  function hideSpinner() {
    chatLog.querySelector(".message.assistant:last-child")?.remove();
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  // Intro
  setTimeout(() => {
    const intro = `Willkommen zum 360° Lifecycle-Check für IT-Reseller – powered by KaiJa & Märki GPT.

In 3 Minuten findest du heraus, wie automatisiert, skalierbar und margenstark dein Geschäftsmodell wirklich ist.

👉 Ziel: Ehrliches Selbstbild + direkte Handlungsempfehlung – 100 % Swiss Made.

Bereit? Dann los – Frage für Frage.`;
    appendMessage(intro, "assistant");
    chatHistory.push({ role: "assistant", content: intro });
    const prompt = questions[0].text;
    currentQuestion = 1;
    fetchGPTReply(prompt);
  }, 800);
});
