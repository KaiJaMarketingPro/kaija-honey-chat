// 📁 /api/send-mail.js – DSGVO-konformer Mailversand via Brevo API (optimiert)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt' });
  }

  const { to, subject, html } = req.body;
  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME || 'KaiJa Marketing!';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@kaija-marketing.pro';

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Fehlende Felder: to, subject oder html' });
  }
  if (!apiKey) {
    return res.status(500).json({ error: 'BREVO_API_KEY fehlt in den Umgebungsvariablen' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Fehler beim Versenden über Brevo');
    }

    return res.status(200).json({ message: '✅ Mail erfolgreich gesendet', result });
  } catch (err) {
    console.error('[send-mail error]', err);
    return res.status(500).json({ error: 'Fehler beim Mailversand', details: err.message });
  }
}
