// kaija-chat.js

document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  sendButton.addEventListener("click", handleUserInput);

  async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = "";
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
      const reply = data?.choices?.[0]?.message?.content;

      if (reply) {
        appendMessage(reply, "assistant");
      } else {
        appendMessage("⚠️ Märki hat nicht geantwortet. Bitte später erneut versuchen.", "assistant");
      }

    } catch (error) {
      appendMessage("❌ Technischer Fehler. Bitte versuche es erneut.", "assistant");
      console.error("GPT Fehler:", error);
    }
  }

  function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = content;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Autostart nur einmal bei Laden der Seite
  setTimeout(() => {
    userInput.value = "Lifecycle Check starten";
    sendButton.click();
  }, 600);
});
