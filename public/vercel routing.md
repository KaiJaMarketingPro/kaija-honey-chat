# 📦 Vercel Routing Fix (HTML-Dateien in /public)

## ✅ Ziel
Statische `.html`-Dateien müssen direkt in `public/` liegen, **nicht in Unterordnern wie `public/test/index.html`** – sonst erkennt Vercel sie nicht korrekt.

---

## 🛠 Vorgehen im Terminal

```bash
# 1. Stelle sicher, dass das /public Verzeichnis existiert
mkdir -p public

# 2. Verschiebe alle relevanten .html-Dateien direkt nach /public
mv *.html public/

# 3. Optional: spezifische Dateien gezielt verschieben
mv test.html gpt-test.html gpt-form.html onboarding.html admin-abo.html index.html public/

# 4. Dateien dem Git-Index hinzufügen
git add public/*.html

# 5. Commit mit klarer Nachricht
git commit -m "fix: re-add public html files for Vercel routing"

# 6. Push an das Live-Repo
git push
