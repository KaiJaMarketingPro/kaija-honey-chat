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

    // Sofortige Ladeanzeige
    appendMessage("⏳ Märki analysiert deine Eingabe...", "assistant");

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
        console.warn("⚠️ GPT hat keine Antwort geliefert.");
        appendMessage("⚠️ Märki GPT hat nicht geantwortet. Bitte versuche es erneut.", "assistant");
      }

    } catch (error) {
      console.error("❌ Fehler beim GPT-Aufruf:", error);
      appendMessage("❌ Technischer Fehler. Bitte versuche es später erneut.", "assistant");
    }
  }

  function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = content;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Autostart
  setTimeout(() => {
    console.log("▶️ Lifecycle Check Trigger gestartet");
    userInput.value = "Lifecycle Check starten";
    sendButton.click();
  }, 600);
});
