# 📦 CHANGELOG – KaiJa Marketing! GPT Ökosystem
> Projektname: Unicorn – KaiJa Marketing!
> Maintainer: Daniel Betschart
> Status: Aktiv – DSGVO-, AI Act- & Swiss Hosted-konform

---

## [v1.9.0] – 2025-05-29  
### 🔁 Namenskorrektur & Branding-Rework
- ✅ Umbenennung aller Systemreferenzen von `baschis-gpt` → `baschti-gpt`
- ✅ Vollständige Korrektur in:
  - `/api/gpt-index.js`
  - `/api/config/mapping.json`
  - `/api/config/gpt-index.json`
  - `/docs/prompts/gpt-prompt-mapping.md`
  - `/docs/mapping/kaija-gpt-global-mapping-v1.1.md`
  - `/store/baschtis-gpt.yaml`
  - `/prompts/baschtis-gpt.md`
- ✅ Alle "Baschi" Klartext-Vorkommen in Dokus & GPT-Intros ersetzt
- 🔐 Rechtssicherheit gestärkt (Abgrenzung zu realer Person auf LinkedIn)
- 🧠 Branding konsolidiert & GPT-Rolle klar positioniert

---

## [v1.8.0] – 2025-05-28  
### ✅ DSGVO-Automation & E-Mailflow Launch
- ✉️ DSGVO-konformer Make-Webhook `ds-gvo-optin` eingerichtet
- 📄 `DSGVO_Optin_Log` Google Sheet aktiviert (timestamp, email, status, source)
- 💌 Gmail-Modul mit HTML-Mailing + PDF-Link eingebunden
- 📎 Monatsimpuls & Honey GPT Klarheits-Workshop als Drive-Link in Mail integriert
- 📄 PDF-Links: `Honey_GPT_Workshop_Abostart_v5.pdf`
- 🔗 Kundenportal-Integration mit Stripe Login aktiv

---

## [v1.7.0] – 2025-05-27  
### 📊 Admin- & YAML-System
- ✅ `status.js` aktiviert zur Prompt/YAML-Gültigkeitsprüfung
- 📦 Snapshot-Export, JSONL Logging, GPT-Heatmap-Logik vorbereitet
- 🧾 Prompt- & Deployment-Mapping finalisiert

---

## [v1.6.0] – 2025-05-26  
### 🛠 YAML Registry & Prompt Mapping überarbeitet
- Alle GPTs mit YAML + Markdown gekoppelt
- 🧠 `prompt-stack` für KaiJa, Gabriela, Märki, Honey optimiert
- 🌀 DailyJasmin GPT + Monthly Triggerstruktur eingebunden

---

## [v1.5.0] – 2025-05-25  
### 🚀 Azure GPT Routing aktiviert
- Proxy `/api/chat.js` voll Azure-kompatibel mit Retry & Fallback
- Mapping-Pfade dynamisch lesbar, DSGVO-konform
- Vercel Deployment erfolgreich über `/public/honey-gpt.html`

---

## [v1.4.0] – 2025-05-23  
### 🧠 Unicorn Struktur eingeführt
- GPT-Index, Mapping, Prompt-Struktur modularisiert
- Einführung der Rollen: Honey, Märki, Gabriela, KaiJa, Homie, DailyJasmin, KaiVio

---

## [v1.3.0] – 2025-05-18  
### 🌐 GPT Store Vorbereitung gestartet
- Metadata-Felder in YAML eingefügt
- DSGVO- & AI-Act-Konformität dokumentiert

---

## [v1.2.0] – 2025-05-15  
### 📁 Systemstruktur refactored
- `/prompts`, `/store`, `/api/config` erstellt
- GPT-Prompt Trennung (Markdown ↔ YAML)

---

## [v1.0.0] – 2025-05-11  
### ✅ Initiales Repository Setup
- Vercel-Deployment `kaija-honey-chat`
- GPT-Indexing & Fallback-Logik
- KaiJa Core GPTs eingebunden (Honey, KaiJa, Märki)

---

## 📘 Hinweise

- Diese Datei wird kontinuierlich gepflegt & reflektiert technische UND inhaltliche Changes
- Fokus liegt auf Transparenz, Nachvollziehbarkeit & Datenschutz-Konformität
- Owner: Daniel Betschart – [kaiJa-marketing.pro](https://www.kaija-marketing.pro)
