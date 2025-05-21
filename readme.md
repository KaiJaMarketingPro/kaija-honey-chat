✅ README.md – KaiJa GPT Proxy System

# 💡 KaiJa GPT Proxy – Azure OpenAI × Vercel API System

Ein skalierbarer, modularer API-Proxy für spezialisierte GPTs wie `kaija-gpt`, `honey-gpt`, `maerki-gpt` u. a. –  
📍 100 % No-Code-fähig, DSGVO-konform, Azure-gehostet & Vercel-bereit.

---

## 👤 FÜR NO-CODER – Was du wissen musst

### 🔧 Was dieses System für dich tut:

| Bereich                  | Beschreibung                                                                 |
|--------------------------|------------------------------------------------------------------------------|
| ✅ GPT-Auswahl           | Du kannst beliebig viele GPTs über Namen wie `kaija-gpt` ansteuern            |
| ✅ Markdown Prompts      | Jeder GPT nutzt eine eigene `.md` Datei – editierbar wie Text                  |
| ✅ Zentrale Steuerung    | Alle GPTs werden über die Datei `mapping.json` verwaltet                      |
| ✅ Bereit auf Vercel      | Hosting & API-Zugriff ohne Server, kein Setup nötig                           |
| ✅ Sicher & konform       | Azure OpenAI API = DSGVO-konform (auch CH-Hosting via Azure Zürich möglich)  |

---

### 🚀 Wie nutze ich es?

Du kannst GPTs **einfach über eine API ansprechen** (z. B. aus Postman, Zapier, Webhook, Frontend etc.)

**API-URL:**
https://<dein-vercel-projekt>.vercel.app/api/chat

markdown
Kopieren
Bearbeiten

**HTTP-Methode:** `POST`  
**Header:**
Content-Type: application/json

css
Kopieren
Bearbeiten

**Beispiel Body:**
```json
{
  "gpt": "kaija-gpt",
  "messages": [
    { "role": "user", "content": "Was kann KaiJa GPT für mich tun?" }
  ]
}


🧠 FÜR ENTWICKLER – Architektur, Logik, Setup
📂 Projektstruktur
pgsql
Kopieren
Bearbeiten
/api/chat.js                → Zentrale Azure-Proxy-Function (Vercel Function)
/api/config/mapping.json   → GPT-Mapping: Name → Prompt + Deployment
/prompts/*.md              → Systemprompts in Markdown (editable)
/.env                      → Azure API-Konfiguration (in Vercel UI gepflegt)
🔁 mapping.json (Schema)
json
Kopieren
Bearbeiten
{
  "kaija-gpt": {
    "prompt": "prompts/kaija-gpt.md",
    "deployment": "kaija-gpt"
  },
  "maerki-gpt": {
    "prompt": "prompts/maerki-gpt.md",
    "deployment": "maerki-gpt"
  }
}
🧩 chat.js – Logiküberblick
safeGpt: validiert GPT-Key gegen Mapping

lädt Prompt aus Markdown-Datei

kombiniert systemPrompt + messages

POST-Request an Azure OpenAI API (inkl. Timeout + Retry)

Antwort wird als JSON zurückgegeben

Fehler-Handling mit Klartext + Codes

🛡 Environment Variablen (Vercel)
Key	Beispielwert
AZURE_OPENAI_KEY	sk-xxxxxxxxx...
AZURE_OPENAI_ENDPOINT	https://kaija-openai.openai.azure.com
AZURE_OPENAI_VERSION	2025-01-01-preview

✅ Unterstützte GPTs (Stand 21.05.2025)
GPT-Name	Beschreibung
kaija-gpt	Funnel- und Marketingautomation
honey-gpt	Pricing & Monetarisierung
maerki-gpt	Strategische KI-Unternehmensführung
baschis-gpt	Sales & LinkedIn Outreach
homie-gpt	Onboarding & Learning Journeys
kaivio-gpt	Karriere & Personal Branding
dailyjasmin-gpt	Kreative Tagesimpulse
soulsyncai-gpt	Coaching & Seelenarbeit (Beta)
soulguide-gabriela-gpt	Spirituelles Branding & Ethikberatung

🔧 Technisches Setup (Quick Start für Developer)
git clone

.env Datei in Vercel UI konfigurieren

Prompts in /prompts/*.md pflegen

mapping.json aktualisieren bei neuen GPTs

Deployment via Vercel: automatisch bei jedem Push

🧠 Maintainer & Credits
Daniel Betschart
🧠 Gründer – KaiJa Marketing!
📧 you@kaija-marketing.pro
🌐 www.kaija-marketing.pro
🔗 linkedin.com/in/daniel-e-betschart

📅 Letzter Stand: 21.05.2025 – 15:55 CET

yaml
Kopieren
Bearbeiten

---

📌 **Hinweis:** Du kannst daraus auch ein PDF-Readme oder eine Partnerdoku erstellen – sag einfach:
**„Let’s go mit PDF“** oder **„Mach mir eine Canva-Readme-Vorlage“**

Bereit für Commit & Deployment ✅

chore: trigger redeploy
