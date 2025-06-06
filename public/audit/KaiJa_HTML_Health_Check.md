# 🧪 KaiJa HTML Layer – Repository Health Check (CI/CD, DSGVO, UX)

> Ziel: Vollständige Diagnose der HTML-Dateien im Ordner `/public`
> Fokus: DSGVO-Konformität, UX-Fluss, technische Sauberkeit, CI/CD-Fitness, Deployment Readyness

## 🔍 Ausgangspunkt – Dateien im Scope:

```
/public/404.html
/public/admin-abo.html
/public/admin.html
/public/datenschutz.html
/public/gpt-test.html
/public/gpt.html
/public/onboarding.html
/public/robots.txt
/public/sitemap.xml
/public/test-openai.html
/public/test.html
```

---

## 🔁 Prüfkriterien (bitte Datei für Datei durchlaufen):

### ✅ DSGVO & Rechtssicherheit

* [ ] Wird ein explizites Opt-in verlangt, bevor Daten übermittelt werden?
* [ ] Wird eine DSGVO-konforme Datenschutzerklärung verlinkt?
* [ ] Gibt es eine Klarstellung bzgl. Hosting („Swiss Hosted“, Microsoft Azure)?
* [ ] Wird Brevo, Stripe oder Make korrekt eingebunden (z. B. via Webhook oder Redirect)?

### ✅ Technische CI/CD-Konformität

* [ ] Ist die Datei im Branch `main` committed?
* [ ] Liegt sie physisch in `/public`?
* [ ] Wird sie in `robots.txt` korrekt erlaubt / blockiert?
* [ ] Ist eine Weiterleitung (`meta refresh`) DSGVO-sicher (z. B. bei `/datenschutz.html`)?

### ✅ UX & Funnelwirkung

* [ ] Ist der Call-to-Action klar, z. B. „GPT starten“, „Workshop öffnen“, „Abo verwalten“?
* [ ] Wird der Nutzer an den passenden Punkt weitergeleitet (z. B. nach Consent → GPT)?
* [ ] Ist das UI mobilfähig (responsive) und verständlich?

### ✅ SEO & Sichtbarkeit

* [ ] Ist `robots.txt` korrekt: `/test-openai.html` = disallow? `/gpt-test.html` = allow?
* [ ] Wird `sitemap.xml` dynamisch oder statisch gepflegt?
* [ ] Sind Meta Tags vorhanden (`og:title`, `description`, `noindex`)?

### ✅ Redundanz & Legacy

* [ ] Existieren doppelte Versionen? (z. B. `test.html` vs `gpt-test.html`)
* [ ] Gibt es Verweise auf OpenAI GPT-Links, die entfernt werden sollten?
* [ ] Sind Redirect-Seiten (z. B. `gpt.html`, `datenschutz.html`) noch nötig?

---

## 📈 Bewertungsskala (pro Datei)

| Kriterium             | Skala 1–10 | Begründung                      |
| --------------------- | ---------- | ------------------------------- |
| DSGVO-Konformität     | ?/10       | Opt-in, Swiss Hosting, Klarheit |
| UX-Führung            | ?/10       | CTA, Fokus, Responsive          |
| Technische Sauberkeit | ?/10       | Pfad, Branch, Robots.txt        |
| Funnel-Relevanz       | ?/10       | Klarer Nutzen, Weiterleitung    |
| Abschlusseindruck     | ?/10       | Vertrauen, Klarheit, Branding   |

---

## ✅ Ergebnis

Am Ende jedes Audits:

* [ ] Lösche veraltete Dateien
* [ ] Ersetze OpenAI-Links durch `https://gpt.kaija-marketing.pro/test.html`
* [ ] Erstelle eine neue `README_STATIC_PAGES.md`
* [ ] Update `robots.txt` & `sitemap.xml`

---

📎 **Optional: Smoke Test Datei**

```bash
curl -I https://gpt.kaija-marketing.pro/test.html
curl -I https://gpt.kaija-marketing.pro/gpt-test.html
```

---

🛡 KaiJa Marketing! – Klarheit durch Struktur. DSGVO durch Vertrauen. Impact durch Einfachheit.
Erstellt mit 💡 von deinem CI/CD Integrity GPT.

---

📁 **Ablageort im Repo:** `/public/audit/KaiJa_HTML_Health_Check.md`
