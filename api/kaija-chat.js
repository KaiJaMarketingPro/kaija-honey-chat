document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  sendButton.addEventListener("click", handleUserInput);

  async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    console.log("🟦 User Input:", message);
    appendMessage(message, "user");
    userInput.value = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }]
        })
      });

      const data = await response.json();
      console.log("🟩 GPT Response (Raw):", data);

      const reply = data?.choices?.[0]?.message?.content;

      if (reply) {
        console.log("🟢 GPT antwortet:", reply);
        appendMessage(reply, "assistant");
      } else {
        console.warn("⚠️ GPT hat keine verwertbare Antwort zurückgegeben.");
        appendMessage("⚠️ Märki GPT hat leider nicht geantwortet. Bitte versuche es erneut oder überprüfe die API.", "assistant");
      }

    } catch (error) {
      console.error("❌ Fehler beim Abruf der GPT-Antwort:", error);
      appendMessage("❌ Technischer Fehler beim Aufruf von Märki GPT. Bitte später erneut versuchen.", "assistant");
    }
  }

  function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = content;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Automatischer Start mit „Lifecycle Check starten“
  setTimeout(() => {
    console.log("▶️ Autostart Trigger: Lifecycle Check starten");
    userInput.value = "Lifecycle Check starten";
    sendButton.click();
  }, 600);
});
