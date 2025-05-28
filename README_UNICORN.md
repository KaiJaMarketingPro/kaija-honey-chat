# 🦄 KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im Unicorn README für das KaiJa KI-System – ein modulares, ethisch fundiertes und strategisch skalierbares AI-Framework für Coaches, KMU, Reseller & Solopreneure.

---

## 💠 Vision

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam den gesamten Business-Lifecycle abdecken – von Positionierung, Funnel & Pricing bis hin zu Ethik, Leadership, CV & Automatisierung.

> „Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn & Hightech – Swiss Made, DSGVO- & AI Act-konform.“

---

## 🌟 GPT Matrix & Rollen

| GPT                      | Rolle                                       | Status                     |
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
- **Vercel**: Frontend, Admin, API Proxy (`chat.js`, `logToSheet.js`, Admin UI)
- **Make.com**: Webhooks, Logging, Reminderflows, CRM-Sync
- **Google Sheets**: GPT Activity Log, Cluster KPI, Access Control
- **Stripe**: Subscriptions, Pricing, Kündigungs-Trigger
- **Brevo/Mailgun**: Onboarding-Mails, Monatsimpulse

---

## 📊 Unicorn Metrics Dashboard

Trackbare Metriken pro GPT:

| Feld         | Bedeutung                          |
|--------------|------------------------------------|
| GPT Name     | z. B. `honey-gpt`                   |
| Tokens       | GPT-Verbrauchskosten (via Azure)   |
| ROI          | Umsatz / Token-Verhältnis          |
| Status       | `✅ live`, `⚙ Launch`, `🛠 geplant`  |

→ Automatisiert via Webhook aus `chat.js` → Google Sheets

---

## 🔁 Lessons Learned = System-Features

| Herausforderung             | GPT-Modul als Lösung                      |
|-----------------------------|-------------------------------------------|
| Unklare Rollen & Ziele      | 🎯 Märki GPT: Strategischer Rollen-Coach   |
| Pricing-Druck & Unsicherheit| 💰 Honey GPT: Klarer Value & Fairness      |
| Kein Raum für Reflexion     | 🌿 Gabriela GPT: Ethik & Selbstklärung     |
| Onboarding-Chaos            | 🧩 Homie GPT: Klarer Start, Tempo-Coach     |
| Funnel-Überforderung        | 🧠 KaiJa GPT: Visual Funnel & Contenterzeugung |
| Keine Exitkultur            | 🧘 Märki + Gabriela: Reflektierter Exitflow |

---

## 🧩 Admin-Tools Übersicht

| Datei                | Funktion                                           |
|----------------------|----------------------------------------------------|
| `chat.js`            | Azure Proxy mit Retry, Logging, Sheet-Sync        |
| `log-gpt.js`         | JSONL Logging lokal mit Token-Klassifikation      |
| `logToSheet.js`      | Logging an Google Sheet via `googleapis`          |
| `kpi-summary.js`     | Monatsauswertung (Calls, Tokens, Score, GPTs)     |
| `export-csv.js`      | Export der KPIs als CSV                           |
| `gpt-preview.js`     | Admin-Vorschau aller GPTs                         |
| `gpt-tools.js`       | Editor für Prompts + Test-Calls                   |
| `validate-logs.js`   | Prüft JSONL Logs auf Format & Felder              |
| `export-snapshot.js` | YAML + mapping.json ZIP-Export für Archiv (🔜)    |

---

## 📚 Struktur (Verzeichnislogik)

```bash
├── api/                    # GPT-Proxies (chat.js, logToSheet.js)
├── admin/                  # KPI-Tools & Logging (kpi-summary.js etc.)
├── prompts/                # Markdown Prompts (*.md) je GPT
├── api/config/             # mapping.json, fallback.yaml
├── api/store/              # YAMLs für GPT Store
├── logs/                   # Monatliche JSONL Usage Logs
├── test.html               # DSGVO-sicherer Playground (optional)
└── vercel.json             # Deployment Konfiguration
🔐 Sicherheit & Compliance
✅ DSGVO + nDSG-konform
✅ Azure OpenAI mit Hosting in Zürich
✅ Kein Cookie-Tracking / Kein Personenbezug
✅ Admin geschützt mit ADMIN_SECRET_TOKEN
✅ _fallback GPT immer aktiv

🗓 Unicorn Roadmap (Stand: 28.05.2025)
 chat.js optimieren → Retry + Webhook Logging

 logToSheet.js bereitstellen

 kpi-summary.js mit Score & GPTs

 Dual Logging: JSONL + Google Sheets

 mapping.json konsistent mit Clustern

 Vercel Deploy + Environment Variables setzen

 Admin UI mit Preview, Export & Test

 export-snapshot.js für YAML ZIP-Archiv

 GPT Store: YAML-Export + Submission (Honey, Gabriela, KaiJa)

 test.html DSGVO-konform reaktivieren

 Webhook-Sync für GPT Score / KPI Heatmap aktivieren

 Partner-Onboarding FLiP!N, CBA, Daniela HUK automatisieren

© 2025 Daniel Betschart / KaiJa Marketing!
Swiss Made Unicorn Intelligence
Brücken bauen zwischen Herz, Hightech & Handlungskraft.
