# ✅ GPT_SMOKE_TEST.md

> 📁 **Pfad-Empfehlung:** `/api/GPT_SMOKE_TEST.md`

Ziel: Validierung aller GPT-Endpunkte über die öffentliche DSGVO-konforme API `/api/chat.js`

---

## 🧪 GETESTETE GPTs (via Azure Switzerland North)

| GPT-ID       | Cluster   | Deployment-ID               | Prompt-Datei                      |
|--------------|-----------|-----------------------------|-----------------------------------|
| honey        | pricing   | honey-gpt                   | prompts/honey-gpt.md              |
| gabriela     | healer    | soulguide-gabriela-gpt      | prompts/soulguide-gabriela-gpt.md |
| kaija        | funnel    | kaija-gpt                   | prompts/kaija-gpt.md              |
| dailyjasmin  | impulse   | dailyjasmin-gpt             | prompts/dailyjasmin-gpt.md        |
| unknown      | fallback  | fallback-gpt                | prompts/fallback.md               |

---

## 🔐 DSGVO-Prüflogik

### ✅ 1. Test mit Opt-in & Logging (`optin=true`, `log=true`)
```bash
curl -X POST https://gpt.kaija-marketing.pro/api/chat.js \
-H "Content-Type: application/json" \
-d '{"gpt":"honey", "user":"testuser", "message":"Was ist ein fairer Preis?", "optin":true, "log":true}'
→ Erwartung:

200 OK

Antwort von Azure (GPT-4 Turbo)

korrekter GPT-Stil (Honey = Pricing)

Logging in Google Sheet (Make.com Webhook)

❌ 2. Test mit fehlendem Opt-in (optin=false)
bash
Kopieren
Bearbeiten
curl -X POST https://gpt.kaija-marketing.pro/api/chat.js \
-H "Content-Type: application/json" \
-d '{"gpt":"honey", "user":"testuser", "message":"Test ohne Einwilligung", "optin":false, "log":true}'
→ Erwartung:

403 Forbidden

JSON: { "error": "DSGVO-Einwilligung fehlt..." }

🛑 3. Test mit Logging = false (optin=true, log=false)
bash
Kopieren
Bearbeiten
curl -X POST https://gpt.kaija-marketing.pro/api/chat.js \
-H "Content-Type: application/json" \
-d '{"gpt":"gabriela", "user":"testuser", "message":"Was ist meine seelische Identität?", "optin":true, "log":false}'
→ Erwartung:

200 OK

keine Speicherung in Make/Sheets

❓ 4. Fallback-Test (gpt=unknown)
bash
Kopieren
Bearbeiten
curl -X POST https://gpt.kaija-marketing.pro/api/chat.js \
-H "Content-Type: application/json" \
-d '{"gpt":"xyz", "user":"testuser", "message":"Bin ich fallback?", "optin":true, "log":true}'
→ Erwartung:

Response aus fallback.md

Cluster = "fallback"

🧾 Prüfparameter & erwartete Felder im Log (nur bei optin + log)
json
Kopieren
Bearbeiten
{
  "timestamp": "2025-06-06T12:34:56Z",
  "gpt": "honey",
  "user": "testuser",
  "tokens": 154,
  "prompt": "Was ist ein fairer Preis?",
  "status": "success",
  "cluster": "pricing",
  "yaml": "store/honey-gpt.yaml",
  "source": "chat.js → webhook log"
}
✅ Testfrequenz (Empfohlen)
täglich: Smoke-Test über Make oder GitHub Action

vor jedem Release: manuell über Postman/Curl

bei Fehlern (500er): Retry innerhalb von 10s

Status: Smoke-Test-Suite aktiv & validiert ✅

🛡️ KaiJa Marketing! – Transparent. Testbar. DSGVO-sicher.
