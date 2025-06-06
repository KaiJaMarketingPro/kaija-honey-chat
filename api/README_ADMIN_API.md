# 📘 README\_ADMIN\_API.md

> 📁 **Pfad-Empfehlung:** `/api/README_ADMIN_API.md`

Ziel: Dokumentation aller produktiv relevanten API-Endpunkte im KaiJa Unicorn GPT Framework. Fokus auf DSGVO-Status, Nutzungskanal (öffentlich/intern) und technische Funktion.

---

## ✅ Übersicht: API-Endpunkte

| Datei                             | Beschreibung                                              | Zugriff           | DSGVO-Status                          |
| --------------------------------- | --------------------------------------------------------- | ----------------- | ------------------------------------- |
| `chat.js`                         | Haupt-GPT Proxy (Azure, DSGVO, Mapping, Logging)          | öffentlich        | ✅ DSGVO-konform + Opt-in erforderlich |
| `test-gpt.js`                     | Öffentlicher Test-GPT (mit Opt-in)                        | öffentlich        | ✅ DSGVO-konform + Opt-in erforderlich |
| `status.js`                       | Health Check & Deployment Check                           | öffentlich        | ✅ (kein personenbezogener Inhalt)     |
| `gpt-index.js`                    | Liefert GPT-Verzeichnis (aus `gpt-index.json`)            | öffentlich        | ✅ (nur Struktur)                      |
| `validate-yaml.js`                | Validiert GPT YAML-Dateien                                | intern/dev        | 🔁 keine personenbezogenen Daten      |
| `logToSheet.js`                   | Logging-Funktion für Make / Google Sheets                 | intern/called     | ✅ bei optin + log=true                |
| `send-mail.js`                    | Trigger für DSGVO-konforme Mails (z. B. Opt-in)           | intern            | ✅ DSGVO-konform über Brevo            |
| `api/send-gmail.js`               | GMail-Versand für Spezialfälle (nur aktiviert bei Bedarf) | intern            | 🔁 prüfen (Gmail DSGVO?)              |
| `create-checkout-session.js`      | Stripe Checkout Start                                     | öffentlich        | ✅ (keine GPT-Daten)                   |
| `create-stripe-portal-session.js` | Portal Access für Aboverwaltung                           | öffentlich        | ✅                                     |
| `crm-export.js`                   | (Legacy / deaktiviert)                                    | ❌ ungenutzt       | ❌ löschen oder archivieren            |
| `canva-download.js`               | GPT-Bildgenerierung mit Canva Prompt                      | intern/called     | ✅ (keine Speicherung)                 |
| `freepik-search.js`               | Bildsuche zur Integration in GPT-Antworten                | intern/called     | ✅                                     |
| `voice-gpt.js`                    | GPT-Voice-Unterstützung (z. B. für VAPI)                  | öffentlich/intern | ✅ (nur anonymisiert)                  |
| `admin/logs.js`                   | Admin UI Log-Zugriff (über `/admin`)                      | intern            | 🔁 mit Auth-Absicherung               |

---

## 🔐 DSGVO-Prinzipien in API-Logik umgesetzt

* **Opt-in erzwungen:** ohne optin keine GPT-Nutzung (403 Error)
* **Logging kontrolliert:** nur bei `log=true && optin=true`
* **Keine Cookies / IP-Tracking / Profilbildung**
* **Keine Memory-Komponenten mehr enthalten** (siehe `DEV_CLEANUP_LOG.md`)

---

## 🧭 Deployment Hinweise

* Alle GPT-Endpunkte verarbeiten Daten **ausschliesslich via Azure OpenAI (Switzerland North)**
* GPT-Routing via: `mapping.json` + `gpt-index.json`
* DSGVO-Flow dokumentiert in `DSGVO_FLOW.md`
* Smoke-Test dokumentiert in `GPT_SMOKE_TEST.md`

---

## ✅ Empfehlung für Admins & Developer

* Vor Deployment: `status.js` + `test-gpt.js` ausführen
* Nach Mapping-Änderung: `validate-yaml.js` + Sheet-Verifikation prüfen
* Regelmässig Logs checken: `/admin/logs.js` + Make-Dashboard

---

**Status:** API-Modul 100 % DSGVO-auditierbar & dokumentiert ✅

🛡️ *KaiJa Marketing! – Developer Transparency. GPT Integrity. Unicorn Ready.*
