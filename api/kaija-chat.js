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
