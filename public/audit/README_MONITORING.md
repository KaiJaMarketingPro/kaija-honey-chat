📊 KaiJa Monitoring & Live-Kontrollpunkte

📁 Ablageort: /audit/README_MONITORING.md
📅 Stand: 2025-06-06
🔍 Ziel: Dokumentation aller aktiven System- und Nutzungsüberwachungen im KaiJa Honey Chat Framework.

⸻

🧠 1. status.js – Systemstatus API

Endpoint	Zweck
/api/status.js	Gibt aktuelle Deploy-Version, ENV-Werte, GPT-Mapping und DSGVO-Status zurück

{
  "version": "v1.3.0",
  "azure": true,
  "optin_enforced": true,
  "deployments": [ ... ]
}


⸻

📄 2. Google Sheet Logs (via Make Szenarien)

Sheet	Zweck
GPT_INSIGHTS_SUMMARY	Gesamtstatistik GPT Calls (Token, GPT, Zeit)
GPT_ACTIVITY_LOG	Detail Logging pro Call (User, GPT, Prompt)
DSGVO_OPTIN_LOG	Logging aller Einwilligungen (E-Mail, Zeit)
ACCESS_SHEET	Wer nutzt wann was? DSGVO-Protokollierung

→ Zugriff erfolgt über MAKE_WEBHOOK_URL via JSON-POST aus chat.js, test-gpt.js

⸻

💳 3. Azure OpenAI Monitoring (Switzerland North)

Kontrollpunkt	Beschreibung
Quota Usage	Tokenverbrauch nach Modell
Forecast Monitoring	Budget-Alert ab definierter Schwelle
Deployment Status	GPT-4 Turbo Live, alle IDs aktiv?

→ Monitoring über Azure Portal + Budget Alerts aktiv

⸻

🧪 4. Smoke Tests (GitHub Actions)

Workflow	Zeitplan	Zweck
post-deploy-check.yml	bei jedem Push	DSGVO, GPT, Chat.js Verfügbarkeit prüfen
html-smoke-check.yml	täglich 5 Uhr	test.html, gpt-test.html, onboarding etc.

→ Beide Workflows liegen in .github/workflows/ und sind CI/CD-integriert

⸻

📌 Empfehlung: Tägliche Prüfung via GitHub Action Logs oder automatisiertem Make-Sync mit Slack-Benachrichtigung.

🧠 Erstellt mit 💡 von deinem KaiJa Monitoring GPT
