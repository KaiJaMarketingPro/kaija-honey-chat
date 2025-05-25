✅ 📁 /docs/mapping/honey-gpt-fields-v1.0.md
md
Kopieren
Bearbeiten
# 🧠 KaiJa Honey GPT – Field Mapping (v1.0)

> Version: 1.0  
> Erstellt: 25.05.2025  
> Verzeichnis: /docs/mapping/honey-gpt-fields-v1.0.md  
> Verantwortlich: Daniel Betschart (KaiJa Marketing)

---

## 🧾 Stripe: Nutzerdefinierte Felder (Rechnungsvorlage)

| Feldname     | Wert                          | Verwendung                     |
|--------------|-------------------------------|--------------------------------|
| `GPT`        | Honey GPT                     | Produktzuweisung               |
| `bundle`     | coaching_signature            | Kombiprodukt Info              |
| `Stratdatum` | Automatisch bei Aktivierung   | DSGVO-Protokoll                |
| `Zahlungstyp`| Monatliches Abo (CHF 58 / 249)| Preismodell sichtbar für User |

---

## 🧠 Google Sheet Struktur (automatisiert via Make)

| Spalte               | Datensatz                        | Ziel/Funktion                |
|----------------------|----------------------------------|------------------------------|
| E-Mail               | `data.object.email`              | User Identifikation          |
| Name                 | `data.object.name`               | Personalisierung             |
| Abo                  | `bundle` (aus Stripe oder Sheet) | Produktkategorie             |
| Start                | `subscription.created` (unix)    | DSGVO & KPI                  |
| Preis CHF            | `unit_amount / 100`              | Rechnungslogik               |
| Trial aktiv?         | `trial_end != null`              | Zugriff / Kündigungszeitraum |
| Status               | `subscription.status`            | aktiv / kündigt / gelöscht   |
| Zugriff erlaubt      | `=IF(Status="active","ja","nein")`| Frontendprüfung (iframe)    |

---

## 🔁 Webhook-Ereignisse (Stripe → Make)

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## 💌 Kündigungs-Mail (automatisiert)

**Trigger:** `customer.subscription.deleted`  
**Auslöser:** Webhook über Stripe → Make → Gmail

**Text:**
Hallo {{Vorname}},

dein Honey Abo ({{bundle}}) wurde gekündigt. Der Zugang endet am {{trial_end / current_period_end}}.
Danke, dass du KaiJa vertraut hast – du bist jederzeit willkommen zurück. 🐝

Alles Liebe
Daniel von KaiJa Marketing

yaml
Kopieren
Bearbeiten

---

## ✅ Kompatibilität

- DSGVO & AI Act Ready 🇨🇭  
- Voll automatisierbar über Make  
- Redundanzfrei & Sheet-basiert

---

📁 Speicherort im Repo:
`/docs/mapping/honey-gpt-fields-v1.0.md`
