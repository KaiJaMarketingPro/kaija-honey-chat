# 🐝 Honey GPT – Das Pilotprojekt von KaiJa Marketing!

**Version**: v1.0  
**Status**: Live auf [https://honey-chat-v1.vercel.app](https://honey-chat-v1.vercel.app)  
**Stand**: 25.05.2025  
**Pilot**: Honey GPT – Pricing-Klarheit für Coaches

---

## 🎯 Zielsetzung
Honey GPT ist der erste GPT-Agent des KaiJa KI-Ökosystems, speziell entwickelt für Coaches, die:

- Klarheit über ihren Preis gewinnen wollen
- Signature-Angebote & Pakete strukturieren
- DSGVO-konform mit GPT arbeiten möchten
- keine technischen Hürden wollen

---

## 🔧 Technische Architektur

| Komponente | Status |
|------------|--------|
| `public/index.html` | ✅ iFrame-fähiges Frontend für Wix/Website |
| `api/chat.js` | ✅ GPT Proxy zur Azure OpenAI API |
| `prompts/honey-gpt.md` | ✅ System Prompt mit Honey-Charakter |
| `jsonl/honey-voice.jsonl` | ✅ 100 Fragen für Voicebot und Pricing-Coach |
| `vercel.json` | ✅ Clean – kein routes/env Konflikt |
| `robots.txt` + `sitemap.xml` | ✅ vorhanden & SEO-optimiert |
| Azure Deployment `honey-gpt` | ✅ verbunden über Environment |

---

## 🔐 Environment Variables (gesetzt in Vercel UI)

```bash
AZURE_OPENAI_KEY=...
AZURE_OPENAI_ENDPOINT=https://kaija-openai.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=honey-gpt
AZURE_OPENAI_VERSION=2024-04-15
```

---

## 🧠 Kerninhalte

### 📄 Prompt (Markdown)
- `prompts/honey-gpt.md`
- Klar, empathisch, Coach-Sprache
- Kein Verkaufsdruck, sondern Wirkung & Struktur

### 📄 JSONL – Honey Voicebot
- Datei: `jsonl/honey-voice.jsonl`
- 100 Fragen & Antworten für Pricing, Pakete, Signature, Einwandbehandlung u. v. m.
- Getestet mit Make, VAPI, GPT-Store kompatibel

---

## 🧩 Verwendete Technologien
- Vercel (Deploy + Hosting)
- Azure OpenAI (Swiss Hosted)
- GitHub Actions-ready
- DSGVO-konform
- Make/Webhook-fähig

---

## 🖼 Vorschau für Wix/Website

```html
<iframe 
  src="https://honey-chat-v1.vercel.app"
  title="Honey GPT"
  width="100%"
  height="780"
  style="border:none; border-radius:16px"
  allow="microphone; clipboard-write">
</iframe>
```

---

## 🚀 Nächste Schritte (Roadmap v1.1)
- [ ] GPT Store Optimierung
- [ ] Honey Voiceflow auf Wix triggern
- [ ] Monatsimpuls-Automation via Make
- [ ] Signature-Abo Landingpage (A/B Test)
- [ ] Clara, Märki, Gabriela duplizieren

---

## ✨ Maintained by KaiJaMarketingPro
GitHub: [github.com/KaiJaMarketingPro](https://github.com/KaiJaMarketingPro)
