# KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im offiziellen GitHub-Repo für das KaiJa KI-System – ein modulares, datenschutzkonformes und strategisch durchdachtes AI-Framework für Coaches, Solopreneure und Unternehmen.

---

## 🚀 Projektüberblick

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam alle Phasen des Business-Lifecycles abdecken – von Positionierung über Funnel und Pricing bis hin zu Coaching, CV, Ethik und Automatisierung.

> „Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn und Hightech – 100 % Swiss Made, 100 % DSGVO- & AI Act-konform.“

### 💡 Kernmodule (GPTs)

| GPT                      | Rolle                                | Status                     |
|--------------------------|---------------------------------------|----------------------------|
| Märki GPT                | Strategischer Orchestrator            | ✅ live (Azure CH)         |
| KaiJa GPT                | Funnel- & Content-Automation          | ✅ live (Azure CH)         |
| Honey GPT                | Pricing & Monetarisierung             | ✅ live (Azure CH + Vercel)|
| Homie GPT                | Onboarding & Training                 | ✅ bereit                  |
| KaiVio GPT               | Karriere- & CV-Coaching               | ✅ bereit                  |
| Baschti GPT              | Sales & LinkedIn                      | ✅ bereit                  |
| SoulGuide Gabriela GPT   | Werte & Ethik                         | ✅ bereit                  |
| InnerPilot AI            | Human Design & Inner Work             | ✅ bereit                  |
| DailyJasmin              | Impulsgeberin                         | ✅ bereit                  |
| _Fallback GPT_           | Sichere Rückmeldung / default         | ✅ aktiv in `mapping.json` |

---

## 🔧 Setup & Struktur

```bash
├── api/                   # GPT-Endpunkte (chat.js, health.js, test-gpt.js etc.)
├── admin/                 # Admin-Tools (Login, Prompt-Editor, Logs, Snapshots)
├── prompts/              # Markdown-Systemprompts (*.md pro GPT)
├── api/config/           # mapping.json, gpt-index.json
├── api/store/            # YAML-Prompts für GPT Store / CustomGPT
├── jsonl/                # JSONL-Dateien für Voicebots & Training
├── logs/                 # Automatisch generierte Logs (GPT Calls, JSONL)
├── middleware.js         # Admin-Zugangsschutz & IP-Restriktion
├── test.html             # Lokaler GPT Playground (optional aktivierbar)
└── vercel.json           # Vercel Deployment Config (Region: fra1)
🔐 Admin-Zugang & Sicherheit
Login: /admin/login

Session-Cookie: kaija_admin_session=valid

Zugriff via middleware.js abgesichert

ENV: ADMIN_SECRET_TOKEN in Vercel UI gesetzt

📦 Admin Tools
Tool	Funktion
gpt-tools.js	Live-Promptbearbeitung, Test & Speichern
log-gpt.js	API Call Logging → JSONL pro Monat
test-gpt.js	GPT-Test mit optionalem log=true
gpt-preview.js	Übersicht & Konfiguration aller GPTs
sync-jsonl.js	JSONL-Prompts aktualisieren & synchronisieren
export-snapshot.js	YAML + Mapping ZIP-Export (🔜 geplant)

⚙ Deployment
Hosting: Vercel – FRA1 (Frankfurt)

KI-Backend: Azure OpenAI – Switzerland North

Datenschutz: DSGVO-, nDSG- & AI Act-konform

Domain: kaija-marketing.pro – 100 % verifiziert

Microsoft Partner Status: ✅ App-ID 3132180

🔁 Logging & Monitoring
log-gpt.js: Webhook + lokales JSONL Logging

Make.com: optionaler Webhook für GPT-Metrics (Token, Nutzer, ROI → Google Sheets)

Alerts via Azure Budget-Forecast (empfohlen)

🧩 Integrationen
GPT Store: YAML-Export & Markdown-Prompts vorbereitet (OpenAI Submission folgt)

Make: Webhook-Trigger für Sheets, CRM, E-Mail, Reminder

Stripe: create-checkout-session.js für Abo-Handling + Auto-Conversion aktiviert

Google Sheets: API Call Sync + Unicorn Metrics Dashboard

Brevo: Monatsimpulse, Opt-in Logging, Follow-up Automationen

📚 Dokumentation & Struktur
mapping.json – GPT Routing

prompts/*.md – alle Systemprompts

store/*.yaml – CustomGPT / GPT Store Format

robots.txt

sitemap.xml

📍 Öffentliche Roadmap (in Vorbereitung)
GitHub Projects für Releases, Feedback & Milestones (Q3/Q4 2025)

Feature-Wünsche via Brevo Formular / Notion Voting geplant

README_UNICORN.md ist zentrale Startseite für Devs, Partner & Investoren

✅ Aktuelle To-Dos (Stand 06.06.2025)
 chat.js mit Make Logging

 DSGVO-Picker & Swiss Hosting Claim aktiv auf test.html

 Testimonials auf Website eingebaut (Rigerthof, V-ZUG)

 Stripe Auto-Abo nach 7 Tagen aktiv

 GPT Store Submission vorbereiten (honey-gpt-store.json)

 Roadmap-Board auf GitHub freischalten

 "Was ist Honey?" – Video auf gpt.html / Canva

© 2025 Daniel Betschart / KaiJa Marketing! – Swiss Made Unicorn Intelligence 🦄
