# 🦄 KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im Unicorn README für das KaiJa KI-System – ein modulares, ethisch fundiertes und strategisch skalierbares AI-Framework für Coaches, KMU, Reseller & Solopreneure.

---

## 💠 Vision

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam den gesamten Business-Lifecycle abdecken – von Positionierung, Funnel & Pricing bis hin zu Ethik, Leadership, CV & Automatisierung.

> „Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn & Hightech – Swiss Made, DSGVO- & AI Act-konform.“

---

## 🌟 GPT Matrix

| GPT                    | Fokusbereich                         | Status            |
|------------------------|--------------------------------------|-------------------|
| Märki GPT              | Entscheidung, Ethik, Orchestrierung | ✅ live (Azure CH) |
| KaiJa GPT              | Funnel, Content, Automation         | ✅ live (Azure CH) |
| Honey GPT              | Pricing, Subscription, ROI          | ✅ live (Azure + Vercel) |
| Homie GPT              | Onboarding, Training, SOP           | ✅ bereit          |
| KaiVio GPT             | CV, Karriere, LinkedIn Optimierung  | ✅ bereit          |
| Baschti GPT            | Sales, Messaging, LinkedIn Funnel   | ✅ bereit          |
| SoulGuide Gabriela     | Werte, Ethik, Selbstführung         | ✅ bereit          |
| SoulSync AI            | Human Design & Energy Coaching      | ✅ bereit          |
| DailyJasmin            | Impulse, Rhythmus, Inspiration      | ✅ bereit          |
| Fallback GPT           | Fehlerbehandlung, Absicherung       | ✅ aktiv           |

---

## ⚙ Architektur & Hosting

- **Azure OpenAI** – Switzerland North 🇨🇭
- **Vercel** – FRA1 (EU) für Frontend/API Proxy
- **Make.com** – DSGVO-Webhooks, Reminder, Sheets
- **Google Sheets** – Logs, KPIs, GPT Usage
- **Stripe** – Subscription Flow & Auto-Conversion
- **Brevo** – Onboarding, Monatsimpulse, DSGVO-Mail

---

## 📊 Unicorn Metrics (automatisch getrackt)

| Metrik     | Beschreibung |
|------------|-------------|
| GPT        | z. B. `honey-gpt` |
| Tokens     | GPT-Nutzungskosten |
| ROI        | Umsatz / Token-Verhältnis |
| Status     | `✅ live`, `🛠 geplant`, `⚙ Test` |

Tracking via `chat.js` + `logToSheet.js` + JSONL

---

## 🔁 Lessons Learned → Feature-System

| Herausforderung         | Lösung via GPT                  |
|-------------------------|----------------------------------|
| Rollenchaos             | 🎯 Märki GPT: Struktur & Klarheit |
| Pricing-Schwierigkeit   | 💰 Honey GPT: Value statt Unsicherheit |
| Ethik- & Fokusverlust   | 🌿 Gabriela GPT: Tiefe & Leadership |
| Funnel-Überforderung    | 🧠 KaiJa GPT: Fokus & Contenterstellung |
| CV & Positionierung     | 💼 KaiVio GPT: ATS & HumanFit |
| Kein Raum für Pause     | 🧩 DailyJasmin: Impulse & Taktgeberin |

---

## 🧩 Admin-Tooling (Vercel + GitHub Actions)

| Datei              | Funktion                                     |
|--------------------|----------------------------------------------|
| `chat.js`          | Proxy, Sheet-Logging, Retry-Fallback         |
| `logToSheet.js`    | Sheets-Anbindung via Make oder API           |
| `gpt-preview.js`   | GPT Admin-Vorschau & Konfiguration           |
| `gpt-tools.js`     | Prompt Editor + Testumgebung                 |
| `log-gpt.js`       | JSONL-Logging lokal (nach GPT, Monat)        |
| `kpi-summary.js`   | Cluster KPI Analyse (GPT, Tokens, ROI)       |
| `export-csv.js`    | KPI Export als CSV (Sheets-kompatibel)       |
| `export-snapshot.js` | YAML + Mapping ZIP für Archiv (geplant)    |

---

## 📚 Strukturübersicht

```bash
├── api/                # GPT-Proxies & DSGVO-APIs
├── prompts/            # Systemprompts (Markdown je GPT)
├── admin/              # KPI-Tools, Logging, Exports
├── api/config/         # mapping.json, fallback.yaml
├── api/store/          # GPT Store YAMLs
├── logs/               # JSONL Logs (monatsweise)
├── public/             # test.html, robots.txt, sitemap.xml, 404.html
└── vercel.json         # Rewrite, Security, Headers
✅ Compliance & Sicherheit
Punkt	Status
DSGVO	✅ 100 % konform
AI Act	✅ Swiss Hosting + Transparenz
Cookie-Tracking	❌ deaktiviert
Admin-Zugang	✅ gesichert via ADMIN_SECRET_TOKEN
Fallback GPT	✅ aktiviert für Ausfallsicherheit

📍 Unicorn Roadmap (Stand 08.06.2025)
 chat.js Retry + Make Logging

 DSGVO-Hinweis auf /test

 Testimonials (Rigerthof, V-ZUG)

 Stripe Abo Flow + Auto-Renew aktiv

 GPT Store Submission: Honey, Gabriela, KaiJa

 Smoke-Test + Monitoring via Make

 Sitemap + Robots automatisiert

 export-snapshot.js (ZIP YAML Mapping)

 FLiP!N, CBA, HUK Partner-Onboarding

💡 KaiJa DNA
KaiJa Marketing! steht für Klarheit, Integrität, Automatisierung & Wirkung.
Wir verbinden Ethik, Effizienz & Empathie zu einer neuen Form unternehmerischer KI.

© 2025 Daniel Betschart / KaiJa Marketing!
Swiss Made Unicorn Intelligence – gebaut mit Herz, Hirn & Hightech 🦄
