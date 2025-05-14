document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-button");
  const resultBox = document.getElementById("lifecycle-result");
  const resultHeadline = document.getElementById("result-headline");
  const resultSummary = document.getElementById("result-summary");

  const API_ENDPOINT = "/api/chat"; // ✅ Proxy-Zugriff via Node.js Backend

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
        content: "Du bist Märki GPT. Führe einen strukturierten Lifecycle Check durch. Du bekommst 5 Multiple-Choice-Fragen (a, b, c). Du stellst keine Rückfragen. Bestätige Antworten präzise, analytisch, professionell. Gib keine Meta-Kommentare. Antworte klar, CEO-tauglich."
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

    if (score >= 25) {
      result = "🟢 Kategorie A: Ready to Scale";
      summary = "Du bist strategisch stark – jetzt Fokus auf Funnel & Pricing-Automatisierung (KaiJa + Honey).";
    } else if (score >= 17) {
      result = "🟡 Kategorie B: Auf Kurs";
      summary = "Du bist auf gutem Weg – Training & Re-Sale-Funnel sind dein nächster Hebel.";
    } else {
      result = "🔴 Kategorie C: Viel Potenzial";
      summary = "Starte jetzt mit dem Mini-KaiJa-System + kostenlosem Strategy-Call.";
    }

    appendMessage("🎯 Ergebnis:\n" + result + "\n\n" + summary, "assistant");
    resultHeadline.innerText = result;
    resultSummary.innerText = summary;
    resultBox.style.display = "block";
  }

  sendButton.addEventListener("click", () => handleUserInput(userInput.value.trim()));

  setTimeout(() => {
    const intro = `Willkommen zum 360° Lifecycle-Check – powered by KaiJa & Märki GPT.\n\nIn 3 Minuten erfährst du, wie automatisiert, skalierbar & margenstark dein Business ist.\n\n👉 Ziel: Ehrliches Selbstbild + direkte Handlungsempfehlung – Swiss Made.`;
    appendMessage(intro, "assistant");
    chatHistory.push({ role: "assistant", content: intro });
    const prompt = questions[0].text;
    currentQuestion = 1;
    fetchGPTReply(prompt);
  }, 600);
});
