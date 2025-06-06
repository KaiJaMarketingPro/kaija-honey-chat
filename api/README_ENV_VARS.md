# 📘 README\_ENV\_VARS.md – KaiJa GPT Environment Variables

> 📁 **Pfad-Empfehlung:** `/api/README_ENV_VARS.md`

Diese Datei dokumentiert alle relevanten Umgebungsvariablen im Projekt `kaija-honey-chat` und erklärt deren Funktion für Deployment, GPT-Routing, DSGVO-Konformität und Monitoring.

---

## ✅ Azure GPT Setup

| Variable                | Beschreibung                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| `AZURE_OPENAI_KEY`      | API Key für Azure OpenAI (Switzerland North)                                |
| `AZURE_OPENAI_ENDPOINT` | API Endpoint für GPT-Zugriff, z. B. `https://kaija-openai.openai.azure.com` |
| `AZURE_OPENAI_VERSION`  | Modellversion z. B. `2024-04-09` (aktuelle GPT-4 Turbo Version)             |

---

## 🧠 GPT Deployment IDs (Azure)

Diese Werte müssen mit `mapping.json` und Azure Deploymentnamen übereinstimmen:

| Variable                 | GPT-Modul                        |
| ------------------------ | -------------------------------- |
| `DEPLOYMENT_HONEY`       | Honey GPT                        |
| `DEPLOYMENT_GABRIELA`    | SoulGuide Gabriela GPT           |
| `DEPLOYMENT_MAERKI`      | Märki GPT                        |
| `DEPLOYMENT_KAIJA`       | KaiJa GPT                        |
| `DEPLOYMENT_HOMIE`       | Homie GPT                        |
| `DEPLOYMENT_KAIVIO`      | KaiVio GPT                       |
| `DEPLOYMENT_BASCHTIS`    | Baschti Sales GPT                |
| `DEPLOYMENT_SOULSYNC`    | SoulSync / InnerPilot AI GPT     |
| `DEPLOYMENT_DAILYJASMIN` | DailyJasmin Impuls-GPT           |
| `DEPLOYMENT_INNERPILOT`  | Optional: InnerPilot AI explizit |

---

## 🔐 Security & Admin

| Variable               | Beschreibung                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `ADMIN_SECRET_TOKEN`   | Token für Admin-Endpunkte (z. B. `/admin/logs.js`)                     |
| `DSGVO_OPTIN_REQUIRED` | Symbolische Kennzeichnung, ob DSGVO-Opt-in aktiviert ist (Frontend/UI) |
| `PROJECT_VERSION`      | Aktuelle Projektnummer z. B. `v1.3.0`                                  |

---

## 🔁 Logging & Sheets

| Variable                   | Beschreibung                      |
| -------------------------- | --------------------------------- |
| `MAKE_WEBHOOK_URL`         | Webhook zum Logging via Make.com  |
| `GOOGLE_SHEET_ID_ACTIVITY` | GPT-Protokoll-Log für Aktivitäten |
| `GOOGLE_SHEET_ID_SUMMARY`  | Aggregiertes Sheet für KPIs       |
| `GOOGLE_SHEET_ID_ACCESS`   | DSGVO Opt-in Dokumentation        |

---

## 💳 Stripe Setup

| Variable                    | Beschreibung                        |
| --------------------------- | ----------------------------------- |
| `STRIPE_SECRET_KEY`         | Secret Key für Zahlungsabwicklung   |
| `STRIPE_PRICE_ID_SIGNATURE` | Preis-ID für Signature Abo (CHF 58) |
| `STRIPE_PRICE_ID_CORE`      | Preis-ID für Core/Standard-Abo      |
| `STRIPE_PRICE_ID_COACHING`  | Preis-ID für Coaching-Upgrade       |

---

## 📧 Brevo (E-Mail Automatisierung)

| Variable             | Beschreibung                                      |
| -------------------- | ------------------------------------------------- |
| `BREVO_API_KEY`      | API Key für DSGVO-konformen E-Mail-Versand        |
| `BREVO_SENDER_NAME`  | Anzeigename in E-Mails                            |
| `BREVO_SENDER_EMAIL` | Absender-Adresse für alle automatisierten E-Mails |

---

## 📍 Hinweise zur Pflege

* Änderungen an Deployments oder GPT-Namen → **immer auch in `mapping.json` + `.env.production` anpassen**
* Bei Key-Rotation oder Rollout: alte Variablen mit Datum versionieren, neue ergänzen (z. B. `..._V2`)
* Diese Datei dient als **Referenz und Schulung** für Admins, Devs und Auditoren

---

🛡️ *KaiJa Marketing – Transparent. Sicher. Unicorn Ready.*
