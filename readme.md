✅ Finaler Prompt: README.md – KaiJa GPT Proxy System
markdown
Kopieren
Bearbeiten
# 💡 KaiJa GPT Proxy – Azure OpenAI × Vercel API System

Ein skalierbarer, modularer API-Proxy für spezialisierte GPTs wie `kaija-gpt`, `honey-gpt`, `maerki-gpt` u. a.  
📍 100 % No-Code-fähig, DSGVO-konform, Azure-gehostet & Vercel-bereit.

---

## 👤 FÜR NO-CODER – Was du wissen musst

### 🔧 Was dieses System für dich tut:

| Bereich                  | Beschreibung                                                                 |
|--------------------------|------------------------------------------------------------------------------|
| ✅ GPT-Auswahl           | Du kannst beliebig viele GPTs über Namen wie `kaija-gpt` ansteuern           |
| ✅ Markdown Prompts      | Jeder GPT nutzt eine eigene `.md` Datei – editierbar wie Text                 |
| ✅ Zentrale Steuerung    | Alle GPTs werden über die Datei `mapping.json` verwaltet                     |
| ✅ Bereit auf Vercel     | Hosting & API-Zugriff ohne Server, kein Setup nötig                          |
| ✅ Sicher & konform      | Azure OpenAI API = DSGVO-konform (Swiss Hosting über Azure Zürich möglich)   |

---

## 🚀 Wie nutze ich es?

Du kannst GPTs **einfach über eine API ansprechen** (z. B. aus Postman, Zapier, Frontend etc.)

**API-URL:**
https://<dein-vercel-projekt>.vercel.app/api/chat

ruby
Kopieren
Bearbeiten

**HTTP-Methode:** `POST`  
**Header:**
```http
Content-Type: application/json
Beispiel Body:

json
Kopieren
Bearbeiten
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
/public/                   → Embed UI, Datenschutzseite, JS-Trigger
/vercel.json               → Sicherheitsheader (CSP, Referrer, HSTS)
/.env (nur in Vercel UI)   → Azure OpenAI API Zugang
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

lädt Systemprompt aus .md

kombiniert systemPrompt + messages

sendet POST-Request an Azure OpenAI API (mit Timeout & Retry)

gibt GPT-Antwort als JSON zurück

robustes Fehlerhandling + Logging

🛡 Environment Variablen (Vercel)
Key	Beispielwert
AZURE_OPENAI_KEY	sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_OPENAI_ENDPOINT	https://kaija-openai.openai.azure.com
AZURE_OPENAI_VERSION	2025-01-01-preview

✅ Unterstützte GPTs (Stand 21.05.2025)
GPT-Name	Beschreibung
maerki-gpt	Strategische KI-Unternehmensführung
kaija-gpt	Funnel- und Marketingautomation
honey-gpt	Pricing & Monetarisierung
homie-gpt	Onboarding & Learning Journeys
kaivio-gpt	Karriere & Personal Branding
baschis-gpt	Sales & LinkedIn Outreach
soulguide-gabriela-gpt	Spirituelles Branding & Ethikberatung
soulsyncai-gpt	Human Design Coaching & Leadership Flow
dailyjasmin-gpt	Selfcare & Alltagsempowerment

🔧 Technisches Setup (Quick Start für Developer)
git clone dieses Repository

.env Datei in Vercel UI setzen

Prompts in /prompts/*.md pflegen oder erweitern

mapping.json aktualisieren bei neuen GPTs

Push → Vercel deployed automatisch

🧠 Maintainer & Credits
Daniel Betschart
🧠 Gründer – KaiJa Marketing!
📧 you@kaija-marketing.pro
🌐 www.kaija-marketing.pro
🔗 linkedin.com/in/daniel-e-betschart

📅 Letzter Stand: 21.05.2025 – 15:55 CET
