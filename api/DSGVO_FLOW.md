✅ Was wird gespeichert?

Nur mit aktiver Zustimmung (optin=true):

GPT-Name (z. B. honey, gabriela)

Anzahl Tokens (zur Abrechnung / Forecast)

Zeitstempel des Calls

Prompt-Auszug (max. 80 Zeichen, kein Volltext)

YAML-Typ (wenn GPT Store oder Canva aktiv)

Herkunftskennzeichen (z. B. "chat.js → webhook log")

Nie gespeichert:

Inhalte ohne Zustimmung

IP-Adresse, Browserfingerprint, Cookies

sensible Daten, Sessionverläufe oder Memory-Verlauf

✅ Wann wird geloggt?

Nur wenn beide Flags gesetzt sind:

optin = true

log = true

Logging erfolgt über: MAKE_WEBHOOK_URL → Make → Google Sheet

Alle Logs sind revisionsfähig, transparent & jederzeit löschbar

✅ Wie funktioniert Opt-in / Opt-out?

Der GPT-Zugriff ist standardmässig blockiert, solange optin ≠ true

API antwortet mit 403 Forbidden, wenn Opt-in fehlt:

{
  "error": "DSGVO-Einwilligung fehlt. Bitte Opt-in aktivieren, um den GPT-Service zu nutzen."
}

log=true ohne optin=true = kein Logging

✅ Wo liegt der Datenstandort?

Komponente

Standort / Infrastruktur

Azure OpenAI

Switzerland North 🇨🇭

Vercel Hosting

FRA1 (Frankfurt, EU)

Google Sheets

EU-Hosting via Make.com

Webhook Logging

Make.com → EU Server

🔐 DSGVO-Schutzprinzipien erfüllt

✅ Datenminimierung: Nur technische Notwendigkeit

✅ Transparenz: Jeder Aufruf ist sichtbar & nachvollziehbar

✅ Recht auf Löschung: DSGVO-konformes Sheet-Protokoll

✅ Kein Profiling / Session-Memory

✅ Kein US-Transfer

✅ Opt-in statt Opt-out (privacy by design)

Status: DSGVO-Konformität dokumentiert & produktiv aktiv

🛡️ KaiJa Marketing! – Swiss Made. Privacy First. Unicorn Ready.
