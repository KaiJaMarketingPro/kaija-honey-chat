# ✅ KaiJa `status-summary.json` – Struktur & Verwendung

📁 Ablage: `/public/audit/README_STATUS_JSON.md`
📅 Stand: 2025-06-06

> Ziel: Dokumentation des internen JSON-Mappings für GPT-Systemstatus, DSGVO-Logik & Azure Deployment

---

## 📦 Strukturübersicht

```json
{
  "version": "v1.3.0",
  "region": "switzerlandnorth",
  "model": "gpt-4-turbo",
  "deployments": {
    "strategy-maerki-gpt": {
      "prompt": "maerki-gpt.md",
      "deployment": "maerki-gpt",
      "cluster": "strategy",
      "fallback": false
    },
    ...
    "_fallback": {
      "prompt": "fallback.md",
      "deployment": "fallback-gpt",
      "cluster": "fallback",
      "fallback": true
    }
  },
  "optin_enforced": true,
  "log_enabled": true,
  "ds_gvo_compliant": true,
  "azure_verified": true
}
```

---

## 🔍 Felderklärung

| Schlüssel           | Typ     | Bedeutung                                                                |
| ------------------- | ------- | ------------------------------------------------------------------------ |
| `version`           | string  | Projektversion (aus Vercel / .env)                                       |
| `region`            | string  | Azure Region des GPT-Backends                                            |
| `model`             | string  | Modellname des GPT Backends                                              |
| `deployments`       | object  | Alle GPTs mit Prompt-Datei, Deployment-ID, Cluster-Zuordnung             |
| `fallback` (je GPT) | boolean | Ist dieser GPT der definierte Fallback-Agent?                            |
| `optin_enforced`    | boolean | Ist DSGVO-Opt-in erforderlich für Nutzung?                               |
| `log_enabled`       | boolean | Wird Logging via Make/Webhook ausgeführt?                                |
| `ds_gvo_compliant`  | boolean | DSGVO/DSG-Konformität gemäss Hosting & Verarbeitung                      |
| `azure_verified`    | boolean | Wird Azure Schweiz als Hosting-Standort verwendet und korrekt verbunden? |

---

## 🧪 Verwendungszwecke

| Anwendungsfall     | Beschreibung                                                       |
| ------------------ | ------------------------------------------------------------------ |
| `status.js` API    | Liest `status-summary.json` ein und erzeugt Live-Systemstatus      |
| GitHub Smoke Tests | Prüfung ob GPT-Zuordnungen noch vollständig und aktiv sind         |
| Audit Dashboard    | Grundlage für Admin-UI, Partner-Transparenz, technische Integrität |
| DSGVO Reporting    | Legt fest ob ein legaler Zugriff ohne Opt-in blockiert werden muss |

---

🧠 Erstellt mit 💡 von deinem KaiJa API Monitor GPT
