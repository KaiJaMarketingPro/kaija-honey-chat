🚀 KaiJa Deployment Status Overview

📅 Stand: 2025-06-06
🔍 Fokus: Funnel-Verfügbarkeit, API-Integrität, GPT-Verbindungen & DSGVO-Konformität

⸻

🧠 GPT Deployments (Azure Switzerland North)

GPT Name	Deployment-ID	Prompt File	Status	DSGVO ✅
Märki GPT	maerki-gpt	prompts/maerki-gpt.md	✅ Live	✅
KaiJa GPT	kaija-gpt	prompts/kaija-gpt.md	✅ Live	✅
Honey GPT	honey-gpt	prompts/honey-gpt.md	✅ Live	✅
Homie GPT	homie-gpt	prompts/homie-gpt.md	✅ Live	✅
KaiVio GPT	kaivio-gpt	prompts/kaivio-gpt.md	✅ Live	✅
Baschti GPT	baschtis-gpt	prompts/baschtis-gpt.md	✅ Live	✅
Gabriela GPT	soulguide-gabriela-gpt	prompts/soulguide-gabriela-gpt.md	✅ Live	✅
InnerPilot AI	innerpilotai-gpt	prompts/soulsyncai-gpt.md	✅ Live	✅
DailyJasmin	dailyjasmin-gpt	prompts/dailyjasmin-gpt.md	✅ Live	✅
Fallback GPT	fallback-gpt	prompts/fallback.md	✅ Live	✅

🔗 API-Endpunkte (/api/*.js)

Datei	Zweck	Authentifiziert	DSGVO-sicher
chat.js	GPT Proxy → Azure API	Nein	✅ (Opt-in)
test-gpt.js	Öffentlicher Test-GPT-Endpunkt	Nein	✅
log-gpt.js	GPT Logging (JSONL)	Nein	✅
env-auditlog.js	Täglicher ENV-Hash-Check	Optional (Admin)	✅
status.js	API für Projektstatus & ENV	Nein	✅
create-stripe-portal-session.js	Stripe Session	Nein	✅

🌐 Funnel Pages (/public/*.html)

Seite	Funktion	DSGVO	Status
test.html	DSGVO-konformer GPT-Test	✅	✅ Online
gpt-test.html	E-Mail Consent + Redirect	✅	✅ Online
admin.html	Token-Login für Admin-Dashboard	✅	✅ Online
admin-abo.html	Stripe Portal Zugang	✅	✅ Online
onboarding.html	Willkommen bei Honey Core	✅	✅ Online
gpt.html	Meta-Redirect zu GPT-Test	⚠️	Optional
404.html	Fehlerseite	✅	✅ Online
datenschutz.html	Weiterleitung Datenschutzerklärung	✅	✅ Online

🧾 Monitoring / Dokumentation / Audits

Datei / Tool	Zweck
KaiJa_Repo_Health_Check.md	Fullstack Audit (alle Systeme)
KaiJa_HTML_Health_Check.md	DSGVO & UX Check für HTML Layer
README_STATIC_PAGES.md	Funktion & DSGVO je HTML-Seite
README_ENV_VARS.md	Übersicht aller .env Variablen
env-auditlog.js	Hash-Logging der ENV-Werte
robots.txt / sitemap.xml	SEO-Konfiguration
test-openai.html	❌ gelöscht (OpenAI US – DSGVO ❌)


⸻

📍 Aktueller Funnel-Einstieg (DSGVO-konform):
https://gpt.kaija-marketing.pro/test.html

📁 Ablageort im Repo: /audit/README_DEPLOY_STATUS.md
