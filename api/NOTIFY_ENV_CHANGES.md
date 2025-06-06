# 📢 NOTIFY\_ENV\_CHANGES.md – Automatische Benachrichtigung bei ENV-Änderungen

> 📁 **Pfad-Empfehlung:** `/api/NOTIFY_ENV_CHANGES.md`

Ziel: Du wirst automatisch informiert, wenn eine kritische `.env`-Variable geändert oder ergänzt wird – entweder per E-Mail (Brevo) oder Slack.

---

## ✅ Option A: Brevo + Make.com Szenario

### 🔁 Trigger:

* Make-Webhook: `ENV_Change_Detected`
* Eingang: JSON mit Key `changedVars`

### 🧠 JSON Beispiel:

```json
{
  "changedVars": [
    "PROJECT_VERSION",
    "ADMIN_SECRET_TOKEN"
  ]
}
```

### 📤 Aktion:

* Sende E-Mail via Brevo:

**Betreff:** `KaiJa: ENV Variablen wurden geändert`

**Inhalt:**

```
Folgende Umgebungsvariablen wurden aktualisiert:
- PROJECT_VERSION
- ADMIN_SECRET_TOKEN

Bitte synchronisiere ggf. dein GitHub Repo und prüfe das Mapping.
```

### 📬 Empfänger:

* [admin@kaija-marketing.pro](mailto:admin@kaija-marketing.pro) (oder anpassbar via Brevo-Tag)

---

## ✅ Option B: Slack Notification via Webhook

### 🔁 Trigger:

* Ausgelöst z. B. durch GitHub Action oder Make

### 🔐 Slack Webhook URL:

* Konfigurieren unter: `https://api.slack.com/messaging/webhooks`

### 🧾 JSON Payload:

```json
{
  "text": "⚠️ ENV Änderung erkannt im KaiJa GPT System:\n• DSGVO_OPTIN_REQUIRED = true\n• PROJECT_VERSION = v1.3.1",
  "channel": "#kaija-admin",
  "username": "KaiJa Monitor",
  "icon_emoji": ":warning:"
}
```

### 🔁 Make.com oder GitHub Action ruft:

```http
POST https://hooks.slack.com/services/XXX/YYY/ZZZ
Content-Type: application/json
```

---

## 📍 Sicherheit & Kontrolle

* Kein Klartext-Token wird geloggt
* Nur Variable-Namen, keine Werte (außer wenn gewünscht)
* Zeitstempel & optional: Trigger-User ergänzbar

---

## 🚀 Empfehlung für produktiven Einsatz

* Trigger automatisieren (GitHub Action oder Make.com Watch-Funktion auf ENV-Datei)
* Review durch 2-Personen-Prinzip: Bei Änderung → Slack & Mail
* Backup `.env.production` wöchentlich im Audit-Archiv sichern

---

🛡️ *KaiJa Marketing – ENV Integrity as a Service. DSGVO-geprüft. Dev-Ready.*
