# 🗂️ KaiJa Audit-Dokumente Übersicht

📁 Speicherort: `/public/audit/`
📅 Stand: 2025-06-06

> Ziel: Überblick aller internen Prüfberichte, DSGVO-Dokumentationen, Deploy-Checks und CI/CD-Validierungen im KaiJa Honey Chat GPT Framework.

---

## 🔐 DSGVO & Datenschutz

| Datei                   | Zweck                                                 |
| ----------------------- | ----------------------------------------------------- |
| `DSGVO_FLOW.md`         | Datenfluss, Webhook, Hosting, Einwilligungspflicht    |
| `README_ENV_VARS.md`    | Auflistung aller ENV-Variablen + DSGVO-relevante Keys |
| `NOTIFY_ENV_CHANGES.md` | Webhook-Setup zur Veränderungserkennung in ENV        |

---

## 🚀 CI/CD & Deployment Integrität

| Datei                        | Zweck                                                       |
| ---------------------------- | ----------------------------------------------------------- |
| `KaiJa_Repo_Health_Check.md` | Gesamtstatus des Repos (API, GPTs, Deploy, DSGVO, Branding) |
| `post-deploy-check.yml`      | GitHub Action für Smoke-Test nach Push auf `main`           |
| `env-diff-monitor.yml`       | GitHub Action zur täglichen ENV-Differenzprüfung            |
| `env-auditlog.js`            | ENV-Hash-Logging zur Integritätsprüfung                     |
| `README_DEPLOY_STATUS.md`    | Übersicht aller GPT Deployments & API-Endpunkte             |

---

## 🌐 Frontend & Funnel-Prüfung

| Datei                        | Zweck                                                     |
| ---------------------------- | --------------------------------------------------------- |
| `KaiJa_HTML_Health_Check.md` | DSGVO/UX/SEO/CI/CD Prüfung aller `public/*.html` Dateien  |
| `README_STATIC_PAGES.md`     | DSGVO-Sichtbarkeit, Funktion und Ziel aller Funnel-Pages  |
| `HTML_META_OPTIMIZE.md`      | OG Tags, Footer-Standards, Token-Masking, YAML-Smoke-Test |

---

📌 Empfehlung: Nach jeder strukturellen oder rechtlichen Änderung → betroffene Audit-Datei aktualisieren und Commit loggen.

🧠 Erstellt mit 💡 von deinem KaiJa Integrity Orchestrator GPT
