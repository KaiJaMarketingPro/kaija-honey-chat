# ✅ HTML\_META\_OPTIMIZE.md – KaiJa SEO & OG Optimierungen

> Ziel: Optimierung der Sichtbarkeit, Vorschauqualität und semantischen Struktur aller DSGVO-konformen GPT-Entry-Seiten wie `test.html`, `gpt-test.html`

---

## 🔍 OG-Meta Setup (für alle GPT-Seiten)

```html
<!-- Head-Bereich → <head> innerhalb jeder HTML-Datei -->
<meta name="description" content="Teste Honey GPT 7 Tage kostenlos – DSGVO-konform, Swiss Hosted und 100 % Klarheit für Coaches & Heiler:innen." />
<meta name="robots" content="index, follow" />
<meta property="og:title" content="Honey GPT – Klarheit für Coaches & Heiler:innen" />
<meta property="og:description" content="Starte jetzt deinen DSGVO-konformen GPT-Test – mit Brevo Opt-in, Swiss Hosting und menschlichem Support." />
<meta property="og:image" content="https://www.kaija-marketing.pro/_files/og-honey.png" />
<meta property="og:url" content="https://gpt.kaija-marketing.pro/test.html" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 🔒 Clientseitige Security für `admin.html`

### ✅ Timeout-Reset nach Token-Eingabe

```js
setTimeout(() => {
  document.getElementById('token').value = '';
  status.textContent = '⚠️ Sitzung abgelaufen. Bitte Token erneut eingeben.';
}, 300000); // nach 5 Min reset
```

---

## 🧾 Footer / Branding Snippet (einheitlich für alle HTML-Seiten)

```html
<div class="footer-note">
  🔐 DSGVO-konform · Swiss Hosted via Microsoft Azure · Version: v1.3.0<br />
  💬 Fragen? <a href="mailto:hello@kaija-marketing.pro">hello@kaija-marketing.pro</a>
</div>
```

---

## 🔁 Optional CI/CD Automation: Smoke-Test YAML

```yaml
# .github/workflows/html-smoke-check.yml
name: HTML Smoke Check

on:
  schedule:
    - cron: '0 5 * * *'  # täglich 5 Uhr UTC
  workflow_dispatch:

jobs:
  check-html:
    runs-on: ubuntu-latest
    steps:
      - name: Check Pages
        run: |
          for page in test gpt-test onboarding 404; do
            curl -s -o /dev/null -w "%{http_code}" https://gpt.kaija-marketing.pro/$page.html | grep -q "200" \
            && echo "✅ $page.html OK" || exit 1
          done
```

---

🧠 Erstellt mit 💡 von deinem CI/CD UX GPT für KaiJa Marketing Unicorn Framework
