# 🦄 KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im offiziellen GitHub-Repo für das KaiJa KI-System – ein modulares, datenschutzkonformes und strategisch durchdachtes AI-Framework für Coaches, Solopreneure und Unternehmen.

---

## 🚀 Projektüberblick

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam alle Phasen des Business-Lifecycles abdecken – von Positionierung über Funnel und Pricing bis hin zu Coaching, CV, Ethik und Automatisierung.

> „Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn und Hightech – 100 % Swiss Made, 100 % DSGVO- & AI Act-konform.“

### 💡 GPT-Kernmodule

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
| Fallback GPT             | Sichere Rückmeldung / Default Routing | ✅ aktiv in `mapping.json` |

---

## 🧠 Setup & Projektstruktur

```bash
├── public/               # Öffentliche HTML + robots.txt + sitemap.xml + 404.html
├── api/                  # GPT-Endpunkte (chat.js, health.js, test-gpt.js etc.)
├── api/config/           # mapping.json, gpt-index.json
├── api/store/            # YAML für GPT Store Submissions
├── prompts/              # Systemprompts als Markdown (*.md pro GPT)
├── admin/                # Admin-Tools (Prompt-Editor, Logs, Snapshots)
├── logs/                 # JSONL-generierte GPT Logs
├── jsonl/                # Trainingsdaten (z. B. Voicebots)
├── .github/workflows/    # CI/CD: Deploy, Smoke-Test, Sitemap, Alerts
└── vercel.json           # Vercel Config (Region: fra1 + Security Headers)
🔐 Admin-Zugang & Sicherheit
Admin-Login: /admin/login

Session Cookie: kaija_admin_session=valid

IP & Token Schutz via middleware.js

ENV Variable: ADMIN_SECRET_TOKEN in Vercel UI

🔧 Deploy & Hosting
Komponente	Technologie / Setup
Hosting	Vercel (Region fra1, EU/CH)
KI-Backend	Azure OpenAI – Switzerland North
Domain	kaija-marketing.pro ✅ verifiziert
DSGVO & AI Act	✅ voll konform
Microsoft Partner	✅ App-ID: 3132180

🔁 Logging & Monitoring
log-gpt.js → GPT Requests in logs/ + JSONL

Make.com → DSGVO-Webhook für Einwilligungen

Stripe → Auto-Renew & Abo mit create-checkout-session.js

Smoke-Test.yml → GitHub Action prüft /test täglich

Make-Mail bei Ausfall → DSGVO-konformer Alert via Webhook

🧩 Integrationen
System	Beschreibung
GPT Store	YAML-Export + Markdown-Prompts für Submission vorbereitet
Make.com	DSGVO Logging, CRM, Sheets, E-Mail Impulse
Stripe	Checkout + Auto-Conversion nach 7 Tagen
Google Sheets	GPT Call Metrics + Dashboard
Brevo	Monatsimpulse, Opt-in Mails, Reminder

📚 Dokumentation & Logik
Datei / Ordner	Inhalt
mapping.json	GPT Routing-Logik
prompts/*.md	GPT Systemprompts
store/*.yaml	OpenAI GPT Store-ready
robots.txt	Crawlingsteuerung (test, api disallowed)
sitemap.xml	SEO-optimierte Seitenübersicht
README.md	Dev-Übersicht (diese Datei)
README_UNICORN.md	Vision + Branding für Partner (in Vorbereitung)

📍 Roadmap & To-Dos (Q3/Q4 2025)
 chat.js Logging in Make (inkl. ROI)

 DSGVO-Claim & Swiss Hosting Hinweis auf /test

 Testimonials integriert (Rigerthof, V-ZUG)

 Stripe Auto-Renew aktiv

 GPT Store Submission: honey-gpt-store.json vorbereiten

 GitHub Project-Board: Milestones & Feedback

 Video „Was ist Honey?“ auf /gpt.html

💡 Mitmachen oder übernehmen?
Für Onboarding oder Co-Entwicklung:

bash
Kopieren
Bearbeiten
git clone https://github.com/KaiJaMarketingPro/kaija-honey-chat.git
cd kaija-honey-chat
vercel dev
👤 Autor
Daniel Betschart
🧠 www.kaija-marketing.pro
📩 you@kaija-marketing.pro

© 2025 Daniel Betschart / KaiJa Marketing! – Swiss Made Unicorn Intelligence 🦄
