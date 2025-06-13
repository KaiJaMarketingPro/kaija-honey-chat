# 🦄 KaiJa Marketing! – Das KI-Unicorn-Ökosystem

**Swiss Made. DSGVO-konform. Mit Herz, Hirn & Hightech.**  
KaiJa Marketing! ist ein ganzheitlich orchestriertes KI-System mit spezialisierten GPT-Modulen für Coaches, Berater:innen, KMU und Heiler:innen – 100 % betrieben über Azure OpenAI (Region: Zürich), Vercel & DSGVO-konforme Webflows.

---

## ✅ Überblick: GPT Module im Ökosystem

| GPT-Name             | Fokus                         | Cluster     |
|----------------------|-------------------------------|-------------|
| 🐝 honey-gpt         | Pricing, Monetarisierung      | pricing     |
| 🎓 homie-gpt         | Onboarding, LMS               | onboarding  |
| 🧠 kaija-gpt         | Funnel, CRM, Content          | funnel      |
| 📊 maerki-gpt        | Strategie, Business-Architektur | strategy  |
| 💼 kaivio-gpt        | Bewerbung, Karriere, LinkedIn | career      |
| 🤝 baschtis-gpt      | Sales, LinkedIn Outreach      | sales       |
| 🌿 soulguide-gabriela-gpt | Branding, Energiearbeit   | healer      |
| 🌀 soulsyncai-gpt     | Human Design, Coaching        | healer      |
| 🎨 dailyjasmin-gpt    | Impulse, Content-Inspiration | impulse     |
| 🛠 fallback-gpt       | Standard Fallback             | fallback    |

---

## 🛠 Architektur & Tech-Stack

| Komponente     | Funktion                                          |
|----------------|---------------------------------------------------|
| `api/chat.js`  | GPT Proxy – Mapping, Retry, Logging, DSGVO Check |
| `mapping.json` | Verknüpft GPT-Key mit YAML, Prompt & Cluster     |
| `prompt.md`    | Dedizierte Systemprompts je GPT                  |
| `*.yaml`       | Konfiguration für Features, Cluster, Lizenzzeit  |
| Make.com       | Webhooks für DSGVO-Protokoll & Abo-Management    |
| Brevo          | E-Mail Versand bei Opt-in & Lizenz                |
| Vercel         | Frontend Hosting (`gpt.html`, `test.html`, `form`) |
| Azure OpenAI   | GPT-Deployment DSGVO-konform (Region: Switzerland) |

---

## 🔁 DSGVO-Logik & Lizenzfluss

- Jeder Zugriff via `chat.js` benötigt `optin = true` → sonst: HTTP 403
- Logging nur bei `log = true` via Webhook (DSGVO_Optin_Log)
- Lizenzprüfung: `access_start` + `license_days` → 7-Tage-Testzugang
- Optionaler Redirect nach Ablauf via Stripe + Make + Sheet

---

## 🔋 Energieeffiziente Betriebsmodi

| Modus             | Wirkung                                          |
|-------------------|--------------------------------------------------|
| `KaiJa_SilentCore` | Minimalantworten, keine Overhead-Prompts        |
| `KaiJa_EcoFlow`    | Voice + Button UI, ressourcenschonend            |
| `KaiJa_OnePrompt`  | Universelles Formular mit GPT-Wahl in 1 Prompt   |

Alle GPTs sind `silent-ready`, `optin-pflichtig` und für Lizenzhandling via Make optimiert.

---

## 📂 Dateienstruktur (empfohlen)

```bash
/api
  /chat.js
  /config/mapping.json
  /prompts/*.md
  /store/*.yaml
/public
  /gpt.html
  /test.html
  /gpt-form.html
  /index.html
.github
  /workflows/smoke-test.yml
📊 Übersicht als Sheet (CSV-Export)
Siehe: KaiJa_GPT_Deployment_Übersicht.csv

🧬 Beispiel-Funnel: Honey Signature Abo
Nutzer:in ruft gpt-form.html auf

Wählt GPT: honey-gpt

Gibt E-Mail + Opt-in → DSGVO-Webhook wird getriggert

GPT-Session mit Mapping + Systemprompt startet via Azure

Logging in Sheet, PDF-Versand via Gmail

Ablaufprüfung nach 7 Tagen → Stripe-Abo wird vorgeschlagen

🔐 Ethik, Sicherheit & Hosting
✅ DSGVO-konform durch Opt-in & Logging-Logik

✅ AI Act-ready (keine automatisierten Entscheidungen)

✅ Swiss Hosted: Azure Zürich

✅ Zero-Tracking, Zero-Overhead, Zero-Promptitis

🔄 Weiterentwicklung & Skalierung
Modular über mapping.json erweiterbar

YAML + Prompt + Deployment vollständig trennbar

Memory / Fallback / Canva / Freepik optional aktivierbar

Guided SOP-Flows möglich (KaiJa_OnePrompt + SilentCore)

Let’s build the Unicorn – systemisch, sicher & skalierbar.

🚀 www.kaija-marketing.pro
"""

Save the README
readme_path = Path("/mnt/data/README_UNICORN.md")
readme_path.write_text(readme_content, encoding="utf-8")
readme_path

Details immer anzeigen

Kopieren
Leider gab es ein internes Speicherproblem beim Schreiben der Datei. 😕
Aber hier ist dein 100 % perfekter README_UNICORN.md für Copy + Paste direkt ins Repo:

📁 README_UNICORN.md – KaiJa Marketing! KI-Ökosystem
md
Kopieren
Bearbeiten
# 🦄 KaiJa Marketing! – Das KI-Unicorn-Ökosystem

**Swiss Made. DSGVO-konform. Mit Herz, Hirn & Hightech.**  
KaiJa Marketing! ist ein ganzheitlich orchestriertes KI-System mit spezialisierten GPT-Modulen für Coaches, Berater:innen, KMU und Heiler:innen – 100 % betrieben über Azure OpenAI (Region: Zürich), Vercel & DSGVO-konforme Webflows.

---

## ✅ Überblick: GPT Module im Ökosystem

| GPT-Name             | Fokus                         | Cluster     |
|----------------------|-------------------------------|-------------|
| 🐝 honey-gpt         | Pricing, Monetarisierung      | pricing     |
| 🎓 homie-gpt         | Onboarding, LMS               | onboarding  |
| 🧠 kaija-gpt         | Funnel, CRM, Content          | funnel      |
| 📊 maerki-gpt        | Strategie, Business-Architektur | strategy  |
| 💼 kaivio-gpt        | Bewerbung, Karriere, LinkedIn | career      |
| 🤝 baschtis-gpt      | Sales, LinkedIn Outreach      | sales       |
| 🌿 soulguide-gabriela-gpt | Branding, Energiearbeit   | healer      |
| 🌀 soulsyncai-gpt     | Human Design, Coaching        | healer      |
| 🎨 dailyjasmin-gpt    | Impulse, Content-Inspiration | impulse     |
| 🛠 fallback-gpt       | Standard Fallback             | fallback    |

---

## 🛠 Architektur & Tech-Stack

| Komponente     | Funktion                                          |
|----------------|---------------------------------------------------|
| `api/chat.js`  | GPT Proxy – Mapping, Retry, Logging, DSGVO Check |
| `mapping.json` | Verknüpft GPT-Key mit YAML, Prompt & Cluster     |
| `prompt.md`    | Dedizierte Systemprompts je GPT                  |
| `*.yaml`       | Konfiguration für Features, Cluster, Lizenzzeit  |
| Make.com       | Webhooks für DSGVO-Protokoll & Abo-Management    |
| Brevo          | E-Mail Versand bei Opt-in & Lizenz                |
| Vercel         | Frontend Hosting (`gpt.html`, `test.html`, `form`) |
| Azure OpenAI   | GPT-Deployment DSGVO-konform (Region: Switzerland) |

---

## 🔁 DSGVO-Logik & Lizenzfluss

- Jeder Zugriff via `chat.js` benötigt `optin = true` → sonst: HTTP 403
- Logging nur bei `log = true` via Webhook (DSGVO_Optin_Log)
- Lizenzprüfung: `access_start` + `license_days` → 7-Tage-Testzugang
- Optionaler Redirect nach Ablauf via Stripe + Make + Sheet

---

## 🔋 Energieeffiziente Betriebsmodi

| Modus             | Wirkung                                          |
|-------------------|--------------------------------------------------|
| `KaiJa_SilentCore` | Minimalantworten, keine Overhead-Prompts        |
| `KaiJa_EcoFlow`    | Voice + Button UI, ressourcenschonend            |
| `KaiJa_OnePrompt`  | Universelles Formular mit GPT-Wahl in 1 Prompt   |

Alle GPTs sind `silent-ready`, `optin-pflichtig` und für Lizenzhandling via Make optimiert.

---

## 📂 Dateienstruktur (empfohlen)

```bash
/api
  /chat.js
  /config/mapping.json
  /prompts/*.md
  /store/*.yaml
/public
  /gpt.html
  /test.html
  /gpt-form.html
  /index.html
.github
  /workflows/smoke-test.yml
📊 Übersicht als Sheet (CSV-Export)
Siehe: KaiJa_GPT_Deployment_Übersicht.csv

🧬 Beispiel-Funnel: Honey Signature Abo
Nutzer:in ruft gpt-form.html auf

Wählt GPT: honey-gpt

Gibt E-Mail + Opt-in → DSGVO-Webhook wird getriggert

GPT-Session mit Mapping + Systemprompt startet via Azure

Logging in Sheet, PDF-Versand via Gmail

Ablaufprüfung nach 7 Tagen → Stripe-Abo wird vorgeschlagen

🔐 Ethik, Sicherheit & Hosting
✅ DSGVO-konform durch Opt-in & Logging-Logik

✅ AI Act-ready (keine automatisierten Entscheidungen)

✅ Swiss Hosted: Azure Zürich

✅ Zero-Tracking, Zero-Overhead, Zero-Promptitis

🔄 Weiterentwicklung & Skalierung
Modular über mapping.json erweiterbar

YAML + Prompt + Deployment vollständig trennbar

Memory / Fallback / Canva / Freepik optional aktivierbar

Guided SOP-Flows möglich (KaiJa_OnePrompt + SilentCore)

Let’s build the Unicorn – systemisch, sicher & skalierbar.
🚀 www.kaija-marketing.pro
