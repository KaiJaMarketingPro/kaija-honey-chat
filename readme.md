# KaiJa Marketing! – Das erste KI-Unicorn-Ökosystem aus der Schweiz 🇨🇭

Willkommen im offiziellen GitHub-Repo für das KaiJa KI-System – ein modulares, datenschutzkonformes und strategisch durchdachtes AI-Framework für Coaches, Solopreneure und Unternehmen.

---

## 🚀 Projektüberblick

**KaiJa Marketing!** ist ein orchestriertes Ökosystem aus spezialisierten GPTs, die gemeinsam alle Phasen des Business-Lifecycles abdecken – von Positionierung über Funnel und Pricing bis hin zu Coaching, CV, Ethik und Automatisierung.

> "Mit KaiJa bauen wir ein echtes AI-System mit Herz, Hirn und Hightech – 100 % Swiss Made, 100 % DSGVO- & AI Act-konform."

### 💡 Kernmodule (GPTs)
| GPT | Rolle | Status |
|-----|-------|--------|
| Märki GPT | Strategischer Orchestrator | ✅ live (Azure CH) + geplant für GPT Store |
| KaiJa GPT | Funnel- & Content-Automation | ✅ live (Azure CH) |
| Honey GPT | Pricing & Monetarisierung | ✅ live (Azure CH + Vercel: honey-chat-v1) |
| Homie GPT | Onboarding & Training | ✅ bereit (Azure CH) |
| KaiVio GPT | Karriere- & CV-Coaching | ✅ bereit (Azure CH) |
| Baschi GPT | Sales & LinkedIn | ✅ bereit (Azure CH) |
| SoulGuide Gabriela GPT | Werte & Ethik | ✅ bereit (Azure CH) |
| SoulSync AI | Human Design Coaching | ✅ bereit (Azure CH) |
| DailyJasmin | Impulsgeberin | ✅ bereit (Azure CH) |
| _Fallback GPT_ | Sichere Rückmeldung / default | ✅ aktiv in `mapping.json` |

---

## 🔧 Setup & Struktur

```
├── api/                   # GPT-Endpunkte (chat, status, health, etc.)
├── admin/                # Admin-Tools (Login, Prompt-Editor, Logs)
├── logs/                 # Logdaten der Test-GPTs (test-log.json)
├── public/               # Öffentlich: index.html, sitemap.xml, robots.txt
├── prompts/              # Markdown-Systemprompts (*.md pro GPT)
├── api/config/           # mapping.json, gpt-index.json
├── api/store/            # YAML-Prompts für CustomGPT / API Store
├── jsonl/                # JSONL-Dateien für Voicebots & Training
├── middleware.js         # Auth + IP-Restriktion für Admin-Zugriff
└── vercel.json           # Vercel Deployment Config (Region: fra1)
```

---

## 🔐 Zugang Admin-Bereich

**Login:** `/admin/login`

- Session-Cookie: `kaija_admin_session=valid`
- Token: über `ADMIN_SECRET_TOKEN` geschützt (in Vercel UI gesetzt)
- Zugriff beschränkt via `middleware.js`

---

## 📦 Admin Tools

| Tool | Beschreibung |
|------|--------------|
| `gpt-tools.js` | YAML live bearbeiten, GPT testen, speichern |
| `test-log.js` | GPT-Testverlauf anzeigen, CSV/MD exportieren |
| `test-gpt.js` | GPT-Einzeltest (manuell oder via `log=true`) |
| `gpt-preview.js` | Übersicht aller GPTs im System |

---

## ⚙ Deployment

- Hosting: [Vercel](https://vercel.com/) – Region FRA1 (Frankfurt)
- KI: [Azure OpenAI](https://azure.microsoft.com/) – Region Switzerland North
- DSGVO & AI Act Ready
- Domain: `you@kaija-marketing.pro` vollständig verifiziert (Microsoft Partner Center)
- Azure App-ID: `3132180`, Status: ✅ **Wartet auf finale Microsoft-Freigabe**

---

## 📚 Dokumentation

- [`robots.txt`](public/robots.txt)
- [`sitemap.xml`](public/sitemap.xml) – inkl. GPT Domains
- [`mapping.json`](api/config/mapping.json)
- [`gpt-index.json`](api/config/gpt-index.json)
- Markdown-Prompts: [`/prompts/*.md`](prompts/)
- YAML-Dateien: [`/api/store/*.yaml`](api/store/)
- Voicebot-Training: [`/jsonl/*.jsonl`](jsonl/)

---

## ✅ To-Do (Stand 25.05.2025)

- [x] Admin UI mit Editor & Logs
- [x] DSGVO-Konformität & Datenschutzseite
- [x] Logging & Test-API (`log=true` optional)
- [x] Sitemap & robots.txt eingebaut
- [x] GPT Store YAML + JSONL-Ready
- [x] Azure Provisioning für 9 GPTs abgeschlossen
- [ ] Snapshot-Funktion für YAML & Mapping als ZIP
- [ ] Clara als GPT-Blueprint duplizieren (inkl. Promptstruktur)
- [ ] GitHub Tag für Honey GPT v1.0 setzen

---

© 2025 Daniel Betschart / KaiJa Marketing! – Swiss Made Unicorn Intelligence 🦄
