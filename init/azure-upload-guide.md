# ☁️ Azure Upload Guide – KaiJa GPT Unicorn Ökosystem

## 📦 Ziel
Dieses Dokument beschreibt Schritt für Schritt, wie du die KaiJa GPTs auf **Azure OpenAI** bereitstellst – DSGVO-konform, Swiss Hosted & CI/CD-ready.

---

## 🗂 Verzeichnisstruktur

```bash
├── prompts/                    # .md, .yaml, .json Prompts (Quelltexte für Azure)
├── api/                        # chat.js, status.js, create-stripe-portal-session.js
├── public/                     # test.html, onboarding.html, admin-abo.html
├── azure-ready/.env.example    # ENV-Template für Azure Keys + GPT Routing
├── init/deployment-config.yaml# Mapping aller GPTs & Routinglogik
├── init/azure-upload-guide.md  # Diese Anleitung
