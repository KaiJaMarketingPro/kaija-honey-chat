# 🧠 KaiJa GPT Status – Deployment & Prompt Mapping

📁 Ablage: `/public/audit/README_GPT_STATUS.md`  
📅 Stand: 2025-06-06  
🔍 Ziel: Übersicht aller GPTs, Prompts, YAML-Dateien und Azure Deployments

---

## 🔁 GPT Übersicht (Mapping aus `mapping.json` & `gptDeployments.json`)

| GPT ID                   | Prompt-Datei                   | Deployment ID             | Cluster     | Fallback |
|--------------------------|--------------------------------|----------------------------|-------------|----------|
| `strategy-maerki-gpt`    | `maerki-gpt.md`                | `maerki-gpt`              | `strategy`  | ❌       |
| `funnel-kaija-gpt`       | `kaija-gpt.md`                 | `kaija-gpt`               | `funnel`    | ❌       |
| `pricing-honey-gpt`      | `honey-gpt.md`                 | `honey-gpt`               | `pricing`   | ❌       |
| `onboard-homie-gpt`      | `homie-gpt.md`                 | `homie-gpt`               | `onboarding`| ❌       |
| `career-kaivio-gpt`      | `kaivio-gpt.md`                | `kaivio-gpt`              | `career`    | ❌       |
| `sales-baschti-gpt`      | `baschtis-gpt.md`              | `baschtis-gpt`            | `sales`     | ❌       |
| `healer-gabriela-gpt`    | `soulguide-gabriela-gpt.md`    | `soulguide-gabriela-gpt`  | `healer`    | ❌       |
| `healer-soulsyncai-gpt`  | `soulsyncai-gpt.md`            | `soulsyncai-gpt`          | `healer`    | ❌       |
| `impuls-dailyjasmin-gpt` | `dailyjasmin-gpt.md`           | `dailyjasmin-gpt`         | `impulse`   | ❌       |
| `_fallback`              | `fallback.md`                  | `fallback-gpt`            | `fallback`  | ✅       |

---

## 📦 Prompt- & YAML-Dateien Übersicht

| Typ      | Speicherort             | Status              |
|----------|-------------------------|---------------------|
| Prompts  | `/prompts/*.md`         | ✅ vollständig       |
| YAMLs    | `/store/*.yaml`         | ✅ GPT Store-ready   |

---

## ☁️ Azure OpenAI Deployments (Switzerland North)

- **Modelltyp:** GPT-4 Turbo (`2024-04-09`)
- **Region:** `switzerlandnorth`
- **Synchronisation:**  
  - `.env.production` ✅  
  - `mapping.json` ✅  
  - `gptDeployments.json` ✅  
  - Vercel UI ✅

---

## ✅ Besonderheiten & Hinweise

- Alle GPTs sind DSGVO-konform via Azure OpenAI gehostet
- Kein GPT verweist mehr auf OpenAI Playground
- Fallback ist aktiv & systemisch getestet (`test-gpt.js`)
- `status.js` reflektiert Deployments & Version live

---

🧠 Erstellt mit 💡 von deinem KaiJa GPT Deployment Guard GPT
