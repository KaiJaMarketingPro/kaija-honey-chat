# KaiJa Honey GPT – Azure OpenAI Deployment (DSGVO-konform)

## 🧠 Projektüberblick

**KaiJa Marketing!** ist ein in der Schweiz registriertes Einzelunternehmen mit DSGVO-, DSG- und AI-Act-konformer Infrastruktur für KI-gestützte Businesslösungen.  
Dieses Repository dient der Bereitstellung des Honey GPT KI-Ökosystems für Coaches, Heiler:innen und Berater:innen, auf Azure OpenAI gehostet – DSGVO-konform mit Zugriffskontrolle, Logging und EU-Datenhaltung.

---

## 🎯 Zweck dieses Deployments

- Bereitstellung von 9 spezialisierten GPTs als API-gestützte Assistenzsysteme
- Einbettung in Websites, Funnels und Chat-Frontends
- Logging + Opt-In Handling gemäss DSGVO/AI Act
- Skalierbare GPT-Architektur via Azure OpenAI

---

## 📂 Strukturübersicht

| Ordner / Datei                  | Inhalt / Zweck |
|---------------------------------|----------------|
| `/store/*.yaml`                | GPT Store YAML-Files (9 GPTs) |
| `/prompts/*.md`               | Systemprompts je GPT als Markdown |
| `/public/`                    | DSGVO-konforme HTML-Seiten (test, onboarding, admin-abo) |
| `/api/`                       | Vercel API-Routing – nutzbar für Azure Functions |
| `/docs/mapping/`              | GPT-Feld- & Prompt-Mappings |
| `/jsonl/honey-voice.jsonl`    | Fine-Tuning-Input (optional) |
| `/admin/`                     | Export-, Logging- & Analysefunktionen |
| `/azure/deployment-config.yaml` | Technische Konfiguration für Upload (separat) |

---

## 🔐 DSGVO/AI-Act Strategie

- Keine Cookies / kein externes Tracking
- Zugriff nur mit aktiver Einwilligung (`access-granted = true`)
- DSGVO Logging über Make → Google Sheet → JSON Export möglich
- Hosting-Ziel: **Azure Schweiz Nord (Switzerland North)**
- Keine Profilbildung ohne Freigabe
- Alle Webhooks und API-Calls dokumentiert

---

## 📜 GPT-Übersicht & Zielgruppen

| GPT Name               | Fokus / Nutzen                     |
|------------------------|-------------------------------------|
| `honey-gpt`            | Preispsychologie / Abo-Clarity      |
| `maerki-gpt`           | Strategie / Lifecycle-Automation    |
| `kaija-gpt`            | Funnel- & Content-Logik             |
| `homie-gpt`            | Onboarding & Lernpfade              |
| `baschtis-gpt`         | Sales über LinkedIn & CRM Sync      |
| `soulguide-gabriela-gpt` | Intuition & energetische Markenführung |
| `soulsyncai-gpt`       | Wertebasierte Persönlichkeitsausrichtung |
| `kaivio-gpt`           | Karriere, CV, ATS                   |
| `dailyjasmin-gpt`      | Kreative Mikroimpulse                |

---

## ✅ Azure Upload Hinweise

- Modell: `gpt-4-turbo` (Stand: April 2024)
- Bereitstellung erfolgt über `fra1` (EU) oder `switzerlandnorth`
- Alle GPTs als `chat-completion`-fähige YAML-Dateien
- Prompts sind in Markdown strukturiert, bei Bedarf YAML exportierbar

---

## 📎 Weitere Hinweise

- Dieses System wurde von **Daniel Betschart, Founder – KaiJa Marketing**, vollständig entwickelt, dokumentiert und DSGVO-geprüft bereitgestellt.
- Verknüpfungen mit Stripe, Brevo, Make.com, Gmail API und Google Sheets bestehen, sind aber **nicht Azure-hostingkritisch**.
- Operator-Kontrollschnittstellen (`/admin/`) sind optional aktivierbar für Deployment-Zustände.

---

## 👤 Kontakt für Rückfragen

**Daniel Betschart**  
Founder – KaiJa Marketing  
📍 Luzern, Schweiz  
🌐 www.kaija-marketing.pro  
📧 you@kaija-marketing.pro  
📎 Application ID: **3132180** (Azure OpenAI)

---
