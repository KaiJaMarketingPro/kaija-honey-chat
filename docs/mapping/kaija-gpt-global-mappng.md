# 🧠 KaiJa Marketing – Globales GPT-Feldmapping (v1.1)

> Version: 1.1
> Erstellt am: 25.05.2025
> Verantwortlich: Daniel Betschart
> Speicherort: `/docs/mapping/kaija-gpt-global-mapping-v1.1.md`

---

## 📌 Zweck

Dieses Mapping definiert alle strukturierten Felder für KaiJa GPT-Produkte. Es dient als Grundlage für DSGVO-konformes Abomanagement, Make-Automatisierungen und GPT Store-Kompatibilität.

---

## 🧾 GPT Registry – Bundle & Trigger Mapping

| GPT                  | bundle\_primary     | price\_tier         | trigger\_flow      | access\_level | plan\_group | trial\_days | region |
| -------------------- | ------------------- | ------------------- | ------------------ | ------------- | ----------- | ----------- | ------ |
| `honey-gpt`          | honey\_signature    | 249\_combo\_premium | honey\_gpt\_access | premium       | honey       | 7           | CH     |
| `kaija-gpt`          | funnel\_automation  | 0\_free             | kaija\_funnel      | freemium      | kaija       | 0           | CH     |
| `maerki-gpt`         | strategy\_audit     | 0\_free             | maerki\_lifecycle  | freemium      | lifecycle   | 0           | CH     |
| `homie-gpt`          | onboarding\_ai      | 58\_month\_standard | homie\_learning    | premium       | homie       | 7           | CH     |
| `kaivio-gpt`         | career\_coaching    | 58\_month\_standard | kaivio\_cv         | premium       | kaivio      | 7           | CH     |
| `baschtis-gpt`        | linkedin\_sales     | 58\_month\_standard | baschti\_sales      | premium       | baschti      | 7           | CH     |
| `soulguide-gabriela` | ethical\_branding   | 58\_month\_standard | gabriela\_guide    | premium       | gabriela    | 7           | CH     |
| `soulsyncai-gpt`     | human\_design\_sync | 58\_month\_standard | soulsync\_energy   | premium       | soulsync    | 7           | CH     |
| `dailyjasmin-gpt`    | daily\_support      | 0\_free             | jasmin\_daily      | freemium      | jasmin      | 0           | CH     |
| `fallback-gpt`       | error\_handling     | 0\_system           | fallback\_logic    | system        | fallback    | 0           | CH     |

---

## 🧾 Rechnungsvorlage – 4 nutzbare Felder

| Feldname      | Beispiel                    | Zweck                     |
| ------------- | --------------------------- | ------------------------- |
| `GPT`         | Honey GPT                   | Produktkennung (sichtbar) |
| `bundle`      | coaching\_signature         | Kombi-Produktkennung      |
| `Stratdatum`  | Automatisch bei Aktivierung | DSGVO-Protokoll           |
| `Zahlungstyp` | Monatliches Abo (CHF 58)    | Preis / Abo-Art           |

---

## 📊 Sheetstruktur für Zugriff & Abomanagement

| Feldname             | Quelle (Make/Stripe)              | Typ     | Format                             |
| -------------------- | --------------------------------- | ------- | ---------------------------------- |
| `email`              | `customer.email`                  | Text    | lowercase                          |
| `name`               | `customer.name`                   | Text    | optional                           |
| `product_id`         | `metadata.product_id`             | Text    | z. B. `honey_signature`            |
| `bundle_primary`     | `metadata.bundle`                 | Text    |                                    |
| `price_chf`          | `price.unit_amount / 100`         | Währung | CHF                                |
| `trial_days`         | `subscription.trial_days`         | Integer | 0 / 7                              |
| `trial_active`       | `trial_end > today()`             | Boolean | true/false                         |
| `status`             | `subscription.status`             | Enum    | active / cancelled / past\_due     |
| `current_period_end` | `subscription.current_period_end` | Datum   | Unix timestamp                     |
| `access_granted`     | Formel: via `status`              | Formel  | `=IF(status="active","ja","nein")` |
| `region`             | Fixwert                           | CH      |                                    |

---

## 🔁 Empfohlene Stripe Events für Make

* `checkout.session.completed`
* `customer.subscription.created`
* `customer.subscription.updated`
* `customer.subscription.deleted`
* `invoice.payment_succeeded`
* `invoice.payment_failed`

---

## ✅ DSGVO- & AI Act-Check (v1.1)

* ✅ Klar definierte Zweckbindung (pro Feld)
* ✅ Datenminimierung erfüllt (nur geschäftsrelevante Felder)
* ✅ Speichersystem: nur auf eigenen Servern (Make / Sheet / Vercel API)
* ✅ Kündigungsprozesse vollständig automatisierbar

---

📁 Ablage: `/docs/mapping/kaija-gpt-global-mapping-v1.1.md`
📄 Letztes Update: 25.05.2025
