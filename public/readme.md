Hier ist der holistische & brutal-truth-basierte README.md Text für dein GitHub-Projekt
kaija-honey-chat:

md
Kopieren
Bearbeiten
# 🐝 KaiJa Honey Chat – Das KI-Funnel-Frontend für Märki & Honey GPT  
**Version:** 1.4.1 · **Status:** Stable · **Stand:** 19.05.2025

---

## 🔥 Projektziel

**KaiJa Honey Chat** ist das offizielle Frontend für die Interaktion mit dem **KaiJa KI-Ökosystem**, speziell für:

- 💡 **Lifecycle-Checks & Mini-Audits** mit **Märki GPT**
- 🐝 **Pricing- & Funnel-Beratung** mit **Honey Pricing Pro**
- 🎯 Bereitstellung von **iFrame-kompatiblen GPTs** über Azure OpenAI oder OpenAI GPT Store

Es wurde mit Fokus auf **UX, Compliance, Skalierbarkeit und API-Integration** gebaut – 100 % DSGVO- & AI Act-konform, gehostet auf Vercel.

---

## 🧱 Projektstruktur

```bash
/kaija-honey-chat
├── api/
│   └── chat.js                    # GPT-Fetch & Proxy-Handling (Azure/OpenAI)
│   └── .env                      # GPT-API Key & Model-Konfiguration
├── public/
│   ├── index.html                # Haupt-UI für GPT-Dialog (iframe-fähig)
│   ├── datenschutz.html         # DSGVO-konforme Datenschutzerklärung
│   ├── embed.html               # Light-Version für Web-Einbettung
│   ├── system-prompt_maerki.md  # Märki-spezifischer Systemprompt
│   ├── prompt-stack-141.md      # Globaler Prompt Stack für das gesamte GPT-Ökosystem
│   └── vercel.json              # Rewrite-Rules für API-Proxies & Public-Routing
🧬 Key Features
✅ Modularer Aufbau: Klar getrennte Logik für Märki, KaiJa, Honey & Co.

💬 Prompt Stack 1.4.1 integriert: inkl. Fallbacks, Memory, Operatoren, Ethikmodul

🔄 Ready für GPT Store & Azure GPT API

🛡 100 % DSGVO & AI-Act-konform

🚀 Deployment via Vercel in < 1 Min

📂 Relevante Dateien
Datei	Beschreibung
prompt-stack-141.md	Master-Promptlogik (Systemprompt, Operatoren, Moduslogik)
system-prompt_maerki.md	Strategischer Prompt für Märki GPT (Lifecycle Check, Decision Logic)
chat.js	API-Handler (mit GPT-Fetch und Retry-Mechanik)
kaija-chat.js	Frontend-Logik (Fragen, Score-System, Modussteuerung)
vercel.json	API-Routing für GPT-Endpunkte & Rewrite-Konfigurationen

⚙️ Verwendung / Setup
bash
Kopieren
Bearbeiten
# 1. Repo klonen
git clone https://github.com/KaiJaMarketingPro/kaija-honey-chat.git

# 2. .env Datei anpassen (Beispiel siehe .env.example)
OPENAI_API_KEY=sk-xxx
OPENAI_API_URL=https://your-openai-endpoint
OPENAI_MODEL=gpt-4-turbo

# 3. Lokal starten
npm install && npm run dev
🧪 Live-Preview & Demo
👉 https://kaija-honey-chat.vercel.app
(oder in deine eigene Domain via iFrame einbetten)

📌 Hinweise & Brutal-Truth Check
❗ Keine Daten werden gespeichert. Alle Antworten sind temporär und rein sitzungsbasiert.

❗ Die GPTs sind nicht autonom – sie geben Handlungsempfehlungen, entscheiden aber nichts ohne Kontext oder Interaktion.

❗ Nicht geeignet für juristische, medizinische oder sicherheitsrelevante Entscheidungen.

🧠 Alle Prompts wurden mit echten Nutzer:innen getestet – keine Bullshit-Floskeln, sondern Wirkung & Klarheit.

🧠 Lizenz & Mitwirkende
© 2025 – KaiJa Marketing! | www.kaija-marketing.pro
Entwickelt mit Herz, Hirn und Hightech.
Bereitgestellt unter MIT License (siehe LICENSE)

Maintainer:

🧑‍💻 Daniel Betschart – LinkedIn

🤖 Märki GPT – Strategischer KI-Coach

🐝 Honey GPT – Pricing & Monetarisierung

🎯 KaiJa GPT – Funnel, Content & Conversion

💡 Nächste Schritte
 Prompt Stack 1.4.1 als JSON-Export einbinden

 Voicebot-Anbindung mit Twilio vorbereiten

 Playground für Custom GPT Interaktionen erweitern

🙌 Contribute / Feedback?
Issues, Pull Requests oder direkte Ideen sind jederzeit willkommen.
Let’s build the first AI unicorn from Switzerland – with purpose and precision.

yaml
Kopieren
Bearbeiten

---
