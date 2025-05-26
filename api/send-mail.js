// 📁 /api/send-mail.js – Nur für Marketingzwecke aktiv (Brevo deaktiviert, bitte /send-gmail.js für transaktionale Kommunikation nutzen)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  return res.status(503).json({
    error: 'send-mail.js ist deaktiviert. Bitte verwende /api/send-gmail.js für transaktionale E-Mails via Gmail SMTP.'
  });
}
