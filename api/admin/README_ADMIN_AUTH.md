# 🔐 README\_ADMIN\_AUTH.md – Admin Token Authentication

> 📁 **Pfad-Empfehlung:** `/api/admin/README_ADMIN_AUTH.md`

Dieses Dokument beschreibt die Authentifizierungslogik für alle sensiblen Admin-Endpunkte im KaiJa GPT Framework.

---

## ✅ Ziel

* Schutz sensibler Endpunkte wie `/api/admin/logs.js`
* DSGVO-konforme, einfache Authentifizierung ohne User-Datenbank
* Kontrolle über Admin-Zugriff via `.env` Token

---

## 🔧 Setup

### 1. **Token als Environment Variable setzen** (in Vercel UI):

```env
ADMIN_SECRET_TOKEN=kaija_admin_2025
```

> 🔐 Der Token kann jederzeit geändert werden – z. B. bei Teamwechsel oder Zugriffsentzug.

### 2. **Auth-Middleware nutzen:**

```js
// 📁 /api/admin/middleware.js
export function validateAdminAuth(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Zugriff verweigert: Token fehlt.' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(403).json({ error: 'Zugriff verweigert: Ungültiger Token.' });
  }

  return null; // Auth OK
}
```

### 3. **In Admin-Endpunkten verwenden:**

```js
import { validateAdminAuth } from './middleware.js';

export default function handler(req, res) {
  const authError = validateAdminAuth(req, res);
  if (authError) return authError;

  // ...weiter mit geschützter Logik
}
```

---

## 🧪 Beispiel-Call (z. B. mit Curl)

```bash
curl -X GET https://gpt.kaija-marketing.pro/api/admin/logs.js \
-H "Authorization: Bearer kaija_admin_2025"
```

---

## 🛡 DSGVO-Konformität

| Prinzip                      | Umsetzung ✅ |
| ---------------------------- | ----------- |
| Kein Cookie-Tracking         | ✅           |
| Kein User-Login / Profiling  | ✅           |
| Keine Sessions / Speicherung | ✅           |
| Zugriffskontrolle via ENV    | ✅           |
| Widerruf durch Token-Wechsel | ✅           |

---

**Status:** Token-Auth für Admin-Bereich ist aktiv und DSGVO-ready ✅

🛡️ *KaiJa Marketing! – Einfach. Sicher. Auditierbar.*
