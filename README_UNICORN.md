# 🦄 KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im Unicorn README für das KaiJa KI-System – ein modulares, ethisch fundiertes und strategisch skalierbares AI-Framework für Coaches, KMU, Reseller & Solopreneure.

---

## 💠 Vision

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam den gesamten Business-Lifecycle abdecken – von Positionierung, Funnel & Pricing bis hin zu Ethik, Leadership, CV & Automatisierung.

> „Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn & Hightech – Swiss Made, DSGVO- & AI Act-konform.“

---

## 🌟 GPT Matrix & Rollen

| GPT                      | Rolle                                      | Status                     |
|--------------------------|---------------------------------------------|----------------------------|
| Märki GPT                | Entscheidungs-Logik, Leadership & Ethik-Coach | ✅ live (Azure CH)         |
| KaiJa GPT                | Funnel- & Content-Automation                | ✅ live (Azure CH)         |
| Honey GPT                | Pricing & Monetarisierung                   | ✅ live (Azure CH + Vercel)|
| Homie GPT                | Onboarding, Trainings, Team-Coaching        | ✅ bereit                  |
| KaiVio GPT               | CV- & Karriere-Coaching                     | ✅ bereit                  |
| Baschi GPT               | Sales & LinkedIn Funnel                     | ✅ bereit                  |
| SoulGuide Gabriela GPT   | Ethik, Werte & Selbstführung                | ✅ bereit                  |
| SoulSync AI              | Human Design Coaching & Energetik          | ✅ bereit                  |
| DailyJasmin              | Impulsgeberin, Stil & Frequenz              | ✅ bereit                  |
| _Fallback GPT_           | Neutrale Standardantworten / Absicherung    | ✅ aktiv in `mapping.json` |

---

## ⚙ Architektur & Hosting

- **Azure OpenAI** (Switzerland North): GPT-4 turbo, DSGVO-konform
- **Vercel**: Frontend, Admin, API Proxy
- **Make.com**: Webhooks, Logging, Sheet-Sync, Reminderflows
- **Google Sheets**: Unicorn Metrics Dashboard (ROI, Tokens, API Calls)
- **Stripe**: Subscriptions, Webhooks
- **Brevo/Mailgun**: Monatsimpulse, Onboarding-Mailings

---

## 📊 Unicorn Metrics Dashboard

Trackbare Metriken pro GPT:

| Feld         | Bedeutung                      |
|--------------|--------------------------------|
| GPT Name     | z. B. `honey-gpt`               |
| Tokens       | GPT-Verbrauchskosten (via Azure) |
| ROI          | Umsatz / Token-Verhältnis       |
| Status       | `✅ live`, `⚙ Launch`, `🛠 geplant` |

→ Automatisiert via Webhook aus `chat.js` → Google Sheet

---

## 🔁 Lessons Learned = System-Features

| Herausforderung (z. B. NetWyl)       | GPT-Modul als Lösung                      |
|--------------------------------------|-------------------------------------------|
| Unklare Rollen & Ziele               | 🎯 Märki GPT: Strategischer Rollen-Coach   |
| Pricing-Druck & Unsicherheit         | 💰 Honey GPT: Klarer Value & Fairness      |
| Kein Raum für Reflexion & Werte      | 🌿 Gabriela GPT: Ethik & Selbstklärung     |
| Onboarding-Chaos                     | 🧩 Homie GPT: Klarer Start, Tempo-Coach     |
| Überforderung durch Tech & Funnels   | 🧠 KaiJa GPT: Visual Funnel & Contenterzeugung |
| Keine Exitkultur                     | 🧘 Märki + Gabriela: Reflektierter Exitflow |

---

## 🧩 Admin-Tools Übersicht

| Datei               | Funktion |
|---------------------|----------|
| `chat.js`           | Azure Proxy mit Retry, Logging, Webhook |
| `log-gpt.js`        | JSONL Logging lokal |
| `test-gpt.js`       | Einzeltest für jeden GPT |
| `export-snapshot.js`| YAML + Mapping ZIP-Export (🔜) |
| `gpt-tools.js`      | Live-Editor & Prompt-Test |
| `gpt-preview.js`    | Übersicht aller GPTs |
| `validate-yaml.js`  | YAML-Strukturprüfung |

---

## 📚 Struktur (Verzeichnislogik)

```bash
├── api/                # GPT-Proxies (chat.js etc.)
├── admin/              # Tools & Logs
├── prompts/            # Markdown Prompts (*.md)
├── api/config/         # mapping.json, gpt-index.json
├── api/store/          # YAML für GPT Store / OpenAI GPTs
├── logs/               # Monatliche JSONL Logs
├── test.html           # DSGVO-sicherer Playground (optional)
└── vercel.json         # Deployment Konfiguration
🔐 Sicherheit & Compliance
✅ DSGVO + nDSG konform

✅ Azure Hosting 🇨🇭

✅ Admin via Middleware & ADMIN_SECRET_TOKEN

✅ mapping.json mit _fallback für Sicherheit

🗓 To-Dos (Unicorn Roadmap – Stand 27.05.2025)
 Make Webhook Logging → Sheets

 chat.js mit Retry & Token Tracker

 mapping.json + fallback.md

 Märki & Honey als systemisches Modul nutzen

 test.html aktivieren

 export-csv.js für Admin Reports

 GPT Store Launch (Beta)

© 2025 Daniel Betschart / KaiJa Marketing! – Swiss Made Unicorn Intelligence
Brücken bauen zwischen Herz, Hightech & Handlungskraft.
