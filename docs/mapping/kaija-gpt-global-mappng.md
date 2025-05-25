# 🧠 KaiJa Marketing – Globales GPT-Feldmapping (v1.0)

> Erstellt am: 25.05.2025
> Version: 1.0
> Verantwortlich: Daniel Betschart
> Speicherort: `/docs/mapping/kaija-gpt-global-mapping.md`

---

## 📌 Zweck

Dieses Mapping beschreibt alle strukturierten Felder für alle GPT-Produkte von KaiJa Marketing (Rechnung, Sheet, Make). Ziel ist eine konsistente, automatisierte & DSGVO-konforme Verarbeitung.

---

## 🧾 Einheitliches GPT Mapping

| GPT                  | bundle               | price\_tier | trigger\_flow      | access\_level | plan\_group | test\_phase   | region |
| -------------------- | -------------------- | ----------- | ------------------ | ------------- | ----------- | ------------- | ------ |
| `honey-gpt`          | coaching\_signature  | 249\_combo  | honey\_gpt\_access | premium       | honey       | 7\_days\_free | CH     |
| `kaiija-gpt`         | funnel\_automation   | 0\_free     | kaija\_funnel      | freemium      | kaiija      | none          | CH     |
| `maerki-gpt`         | strategy\_audit      | 0\_free     | maerki\_lifecycle  | freemium      | lifecycle   | none          | CH     |
| `homie-gpt`          | onboarding\_ai       | 58\_month   | homie\_learning    | premium       | homie       | 7\_days\_free | CH     |
| `kaivio-gpt`         | career\_coaching     | 58\_month   | kaivio\_cv         | premium       | kaivio      | 7\_days\_free | CH     |
| `baschis-gpt`        | linkedin\_sales      | 58\_month   | baschi\_sales      | premium       | baschi      | 7\_days\_free | CH     |
| `soulguide-gabriela` | ethical\_branding    | 58\_month   | gabriela\_guide    | premium       | gabriela    | 7\_days\_free | CH     |
| `soulsyncai-gpt`     | human\_design\_sync  | 58\_month   | soulsync\_energy   | premium       | soulsync    | 7\_days\_free | CH     |
| `dailyjasmin-gpt`    | impulse\_inspiration | 0\_free     | jasmin\_daily      | freemium      | jasmin      | none          | CH     |
| `fallback-gpt`       | error\_handling      | 0\_system   | fallback\_logic    | system        | fallback    | none          | CH     |

---

## 🧠 Standardfelder für Rechnungsvorlage (nur 4 nutzbar)

| Feld          | Beispiel                    | Gilt für        |
| ------------- | --------------------------- | --------------- |
| `GPT`         | Honey GPT                   | GPT-Zuordnung   |
| `bundle`      | coaching\_signature         | Produktbündel   |
| `Stratdatum`  | Automatisch bei Aktivierung | DSGVO-Protokoll |
| `Zahlungstyp` | Monatliches Abo (CHF 58)    | Abomodell       |

---

## 🗂 Make Webhook → Sheet-Felder (empfohlen)

| Feldname         | Quelle (Stripe Webhook)            | Typ       |
| ---------------- | ---------------------------------- | --------- |
| E-Mail           | `customer.email`                   | Text      |
| Name             | `customer.name`                    | Text      |
| Produkt (GPT)    | `metadata.GPT`                     | Text      |
| Bundle           | `metadata.bundle`                  | Text      |
| Startdatum       | `subscription.created`             | Timestamp |
| Preis CHF        | `price.unit_amount / 100`          | Währung   |
| Testphase aktiv? | `trial_end != null`                | Boolean   |
| Status           | `subscription.status`              | Enum      |
| Zugriff erlaubt  | `=IF(Status="active","ja","nein")` | Formel    |
| Region           | CH                                 | fixiert   |

---

## 🔁 Kompatible Stripe Events (empfohlen für Make)

* `checkout.session.completed`
* `customer.subscription.created`
* `customer.subscription.updated`
* `customer.subscription.deleted`
* `invoice.payment_succeeded`

---

## ✅ DSGVO- & AI Act-Konformität

Alle Felder wurden geprüft auf:

* ✅ Datenminimierung
* ✅ Zweckbindung
* ✅ Automatisierungskompatibilität
* ✅ Make & Sheet Tauglichkeit

---

📁 Ablage: `/docs/mapping/kaija-gpt-global-mapping.md`
📄 Letztes Update: 25.05.2025
