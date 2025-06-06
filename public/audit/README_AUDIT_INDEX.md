# 🧾 KaiJa Audit Index – Markdown Übersicht

📁 Ablageort: `/public/audit/README_AUDIT_INDEX.md`
📅 Stand: 2025-06-06

> Ziel: Schnellzugriff und Übersicht über alle Audit-, Status- und Dokumentationsdateien im KaiJa Honey Chat Framework

---

## 🔐 DSGVO, ENV & Sicherheit

| Datei                   | Beschreibung                                            |
| ----------------------- | ------------------------------------------------------- |
| `DSGVO_FLOW.md`         | Datenverarbeitung, Webhook-Fluss, Einwilligungsstruktur |
| `README_ENV_VARS.md`    | Beschreibung aller ENV-Variablen & Einsatz              |
| `NOTIFY_ENV_CHANGES.md` | Setup zur Erkennung von ENV-Änderungen (Make / Slack)   |

---

## 🚀 Deploy, CI/CD & Monitoring

| Datei                        | Beschreibung                                            |
| ---------------------------- | ------------------------------------------------------- |
| `KaiJa_Repo_Health_Check.md` | Gesamtstatus von GPTs, API, Deploy, UX, DSGVO           |
| `README_MONITORING.md`       | Live-Checks für status.js, Sheets, Azure Forecast       |
| `post-deploy-check.yml`      | GitHub Action für nachträgliche API- und Routingprüfung |
| `env-diff-monitor.yml`       | ENV-Konsistenzprüfung per GitHub Action                 |

---

## 📄 Funnel & HTML Struktur

| Datei                        | Beschreibung                                                   |
| ---------------------------- | -------------------------------------------------------------- |
| `KaiJa_HTML_Health_Check.md` | DSGVO/UX/SEO-Prüfung aller `public/*.html` Funnelpages         |
| `README_STATIC_PAGES.md`     | Übersicht & Status aller Funnelseiten (test, onboarding, etc.) |
| `HTML_META_OPTIMIZE.md`      | OG-Meta, Footer, Versionierung, YAML Smoke-Test Templates      |

---

## 🧩 GPT & Prompt Infrastruktur

| Datei                     | Beschreibung                                                 |
| ------------------------- | ------------------------------------------------------------ |
| `README_GPT_STATUS.md`    | Prompt-Zuordnung, Deployment-ID, Cluster, Routing & Fallback |
| `README_DEPLOY_STATUS.md` | Technische Übersicht der GPT-Ausspielung & Modelle           |

---

🧠 Erstellt mit 💡 von deinem KaiJa System Audit GPT
