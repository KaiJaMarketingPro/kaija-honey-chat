# 🧠 KaiJa GPT – Prompt Mapping & YAML Registry

> Version: 1.0  
> Erstellt am: 25.05.2025  
> Verantwortlich: Daniel Betschart  
> Speicherort: `/docs/prompts/gpt-prompt-mapping.md`

---

## 🧠 Prompt Mapping (GPT ↔ Prompt-Datei)

| GPT Deployment        | Prompt-Datei (.md)                   | Beschreibung                          |
|-----------------------|--------------------------------------|---------------------------------------|
| `honey-gpt`           | `prompts/honey-gpt.md`              | Klarheits-GPT für Pricing & Angebote |
| `maerki-gpt`          | `prompts/maerki-gpt.md`             | Lifecycle-Orchestrator               |
| `kaija-gpt`           | `prompts/kaija-gpt.md`              | Funnel & Content Builder             |
| `homie-gpt`           | `prompts/homie-gpt.md`              | Lernreise- & Onboarding-Coach        |
| `kaivio-gpt`          | `prompts/kaivio-gpt.md`             | Karriere & CV-Coach                  |
| `baschis-gpt`         | `prompts/baschis-gpt.md`            | LinkedIn Sales Co-Pilot              |
| `soulguide-gabriela`  | `prompts/soulguide-gabriela-gpt.md` | Werte & Ethik in Branding            |
| `soulsyncai-gpt`      | `prompts/soulsyncai-gpt.md`         | Human Design für Business            |
| `dailyjasmin-gpt`     | `prompts/dailyjasmin-gpt.md`        | Selfcare & Tagesimpulse              |
| `fallback-gpt`        | `prompts/fallback.md`               | Fehlerbehandlung & Support           |

---

## 📦 YAML Registry (für Store, API & Make)

| GPT Deployment        | YAML-Datei                          | Zweck                            |
|-----------------------|-------------------------------------|----------------------------------|
| `honey-gpt`           | `api/store/honey-gpt.yaml`          | GPT Store & Make Integration     |
| `maerki-gpt`          | `api/store/maerki-gpt.yaml`         | Strategieanalyse & API Flow      |
| `kaija-gpt`           | `api/store/kaija-gpt.yaml`          | Funnel-Automation                |
| `homie-gpt`           | `api/store/homie-gpt.yaml`          | Lernlogik                        |
| `kaivio-gpt`          | `api/store/kaivio-gpt.yaml`         | Karriere & Bewerbung             |
| `baschis-gpt`         | `api/store/baschis-gpt.yaml`        | Sales-Kommunikation              |
| `soulguide-gabriela`  | `api/store/soulguide-gabriela.yaml` | Markenethik & Intuition          |
| `soulsyncai-gpt`      | `api/store/soulsyncai-gpt.yaml`     | Energetische Transformation       |
| `dailyjasmin-gpt`     | `api/store/dailyjasmin-gpt.yaml`    | Tagesfokus & Inspiration         |
| `fallback-gpt`        | `api/store/fallback.yaml`           | Default Response GPT             |

---

## 🔁 Automatisierungs-Kompatibilität

- Alle YAML-Dateien sind mit `metadata`, `description`, `tags`, `icon`, `trigger_flow` erweiterbar
- Prompts enthalten YAML-Frontmatter mit: `name`, `description`, `tags`, `instructions`, `region`, `access_level`
- Kompatibel mit: GPT Store, Make, Vercel API, Sheet-Mapping

---

📁 Ablage: `/docs/prompts/gpt-prompt-mapping.md`  
📄 Letztes Update: 25.05.2025  
🔐 Owner: Daniel Betschart – KaiJa Marketing! – DSGVO & Swiss Hosted
