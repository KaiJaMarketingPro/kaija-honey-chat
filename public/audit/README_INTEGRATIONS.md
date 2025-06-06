🔗 KaiJa Integrationen (Live-Status & Setup Guide)

📅 Stand: 2025-06-06
🔍 Ziel: Vollständige Übersicht aller externen Services & deren Integration ins GPT-Framework

⸻

✉️ Brevo (ex Sendinblue)

Zweck	Status	Beschreibung
Opt-in Logging	✅ aktiv	DSGVO-E-Mail-Erfassung (gpt-test.html) via Make Webhook → Google Sheet
Follow-up Mails	✅ aktiv	Monatsimpuls nach DSGVO-Einwilligung (Honey Signature)
Tagging & Segmentierung	🔜 geplant	z. B. nach Produkt (Signature, Coaching)

💡 Setup:
	•	Brevo API Key in Vercel UI (BREVO_API_KEY)
	•	Trigger via Make Szenario ds-gvo-optin

⸻

💳 Stripe

Zweck	Status	Beschreibung
Checkout Pages	✅ aktiv	checkout.kaija-marketing.pro Subdomain + PriceIDs
Abo-Portal (Self Service)	✅ aktiv	admin-abo.html mit create-stripe-portal-session.js
Auto-Abo nach 7 Tagen Test	✅ aktiv	via Stripe Trial + Brevo Info

💡 Setup:
	•	STRIPE_SECRET_KEY, PRICE_ID_* in Vercel UI
	•	Webhook optional über Make

⸻

🤖 Make.com (Low-Code Automatisierung)

Szenario	Zweck
ds-gvo-optin	Speichert Einwilligungen + DSGVO-Mailversand
gpt-abos	Verbindet Stripe mit Sheets
admin-logs-to-sheet	(optional) Logging der API-Calls

💡 Setup:
	•	MAKE_WEBHOOK_URL in .env gesetzt
	•	Alle Szenarien dokumentiert mit Zugriff über make.com

⸻

☁️ Azure OpenAI (Switzerland North)

Zweck	Status	Beschreibung
GPT Deployment	✅ aktiv	GPT-4 Turbo über 9 GPTs, DSGVO-konform
API Monitoring	✅ aktiv	Usage, Quota, Budget Alerts
Modell & Region Tracking	✅ aktiv	via status.js abrufbar

💡 Setup:
	•	AZURE_OPENAI_KEY, ENDPOINT, VERSION in .env
	•	Deployment-Namen in mapping.json + gptDeployments.json

⸻

🧠 Erstellt mit 💡 von deinem KaiJa Integrationen GPT
