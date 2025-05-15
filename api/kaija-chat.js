document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chatLog");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  sendButton.addEventListener("click", handleUserInput);

  async function handleUserInput() {
    const message = userInput.value.trim();
    if (message === "") return;

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
      const reply = data.choices?.[0]?.message?.content || "⚠️ Märki hat nicht reagiert.";
      appendMessage(reply, "assistant");
    } catch (error) {
      console.error("❌ Fehler beim Abrufen der GPT-Antwort:", error);
      appendMessage("❌ Verbindung zu Märki GPT fehlgeschlagen.", "assistant");
    }
  }

  function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = content;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Automatisch starten mit Trigger
  setTimeout(() => {
    userInput.value = "Lifecycle Check starten";
    sendButton.click();
  }, 600);
});
