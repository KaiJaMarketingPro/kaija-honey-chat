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
| Baschi GPT               | Sales & LinkedIn                      | ✅ bereit                  |
| SoulGuide Gabriela GPT   | Werte & Ethik                         | ✅ bereit                  |
| SoulSync AI              | Human Design Coaching                 | ✅ bereit                  |
| DailyJasmin              | Impulsgeberin                         | ✅ bereit                  |
| _Fallback GPT_           | Sichere Rückmeldung / default         | ✅ aktiv in `mapping.json` |

---

## 🔧 Setup & Struktur

```bash
├── api/                   # GPT-Endpunkte (chat.js, health.js, test-gpt.js etc.)
├── admin/                # Admin-Tools (Login, Prompt-Editor, Logs, Snapshots)
├── prompts/              # Markdown-Systemprompts (*.md pro GPT)
├── api/config/           # mapping.json, gpt-index.json
├── api/store/            # YAML-Prompts für GPT Store / CustomGPT
├── jsonl/                # JSONL-Dateien für Voicebots & Training
├── logs/                 # Automatisch generierte Logs (GPT Calls, JSONL)
├── middleware.js         # Admin-Zugangsschutz & IP-Restriktion
├── test.html             # Lokaler GPT Playground (optional aktivierbar)
└── vercel.json           # Vercel Deployment Config (Region: fra1)
```

---

## 🔐 Admin-Zugang & Sicherheit

**Login:** `/admin/login`

- Session-Cookie: `kaija_admin_session=valid`
- Zugriff via `middleware.js` abgesichert
- ENV: `ADMIN_SECRET_TOKEN` in Vercel UI gesetzt

---

## 📦 Admin Tools

| Tool               | Funktion |
|--------------------|----------|
| `gpt-tools.js`     | Live-Promptbearbeitung, Test & Speichern |
| `log-gpt.js`       | API Call Logging → JSONL pro Monat |
| `test-gpt.js`      | GPT-Test mit optionalem `log=true` |
| `gpt-preview.js`   | Übersicht & Konfiguration aller GPTs |
| `sync-jsonl.js`    | JSONL-Prompts aktualisieren & synchronisieren |
| `export-snapshot.js` | YAML + Mapping ZIP-Export (🔜 geplant) |

---

## ⚙ Deployment

- Hosting: [Vercel](https://vercel.com/) – FRA1 (Frankfurt)
- KI-Backend: [Azure OpenAI](https://azure.microsoft.com/) – Switzerland North
- Datenschutz: DSGVO-, nDSG- & AI Act-konform
- Domain: `kaija-marketing.pro` – 100 % verifiziert
- Microsoft Partner Status: ✅ App-ID 3132180

---

## 🔁 Logging & Monitoring

- `log-gpt.js`: Webhook + lokales JSONL Logging
- `Make.com`: optionaler Webhook für GPT-Metrics (Token, Nutzer, ROI → Google Sheets)
- Alerts via Azure Budget-Forecast (empfohlen)

---

## 🧩 Integrationen

- **GPT Store:** YAML-Export & Markdown-Prompts vorbereitet
- **Make:** Webhook-Trigger für Sheets, CRM, E-Mail, Reminder
- **Stripe:** `create-checkout-session.js` für Abo-Handling
- **Google Sheets:** API Call Sync + Unicorn Metrics Dashboard
- **Brevo / Mailgun:** für Monatsimpulse & Nutzerkommunikation

---

## 📚 Dokumentation & Struktur

- `mapping.json` – GPT Routing
- `prompts/*.md` – alle Systemprompts
- `store/*.yaml` – CustomGPT / GPT Store Format
- `robots.txt`
- `sitemap.xml`

---

## ✅ Aktuelle To-Dos (Stand 26.05.2025)

- [x] `chat.js` mit Make Logging
- [x] `log-gpt.js` → Admin-Logger JSONL
- [x] `mapping.json` + `fallback.md` finalisiert
- [x] Markdown- & YAML-Struktur für alle GPTs
- [x] Webhook-Ready für Make.com & Sheets
- [x] `README.md` finalisieren (✅ ← done!)
- [ ] `test.html` minimal aktivieren
- [ ] `export-csv.js` Modul als Admin-Export
- [ ] GPT Store Deployments via Azure vorbereiten (Beta)

---

© 2025 Daniel Betschart / KaiJa Marketing! – Swiss Made Unicorn Intelligence 🦄
