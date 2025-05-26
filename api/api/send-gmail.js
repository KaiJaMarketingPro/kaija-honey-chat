// 📁 /api/send-gmail.js – DSGVO-konformer Versand via Gmail SMTP (mit App Password)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt' });
  }

  const { to, subject, html, canvaPrompt, freepikMarkdown } = req.body;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (!to || !subject || !html || !gmailUser || !gmailPass) {
    return res.status(400).json({ error: 'Fehlende Felder oder Gmail-Zugangsdaten ungültig' });
  }

  let htmlFinal = html;

  if (canvaPrompt) {
    const prompt = encodeURIComponent(canvaPrompt);
    const link = `https://www.canva.com/presentation/templates/?query=${prompt}`;
    htmlFinal += `<p><a href="${link}" target="_blank">🎨 Öffne deine visuelle Vorlage in Canva</a></p>`;
  }

  if (freepikMarkdown) {
    const htmlFromMarkdown = freepikMarkdown
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px">')
      .replace(/\[Freepik-Link öffnen\]\((.*?)\)/g, '<p><a href="$1" target="_blank">🖼 Freepik-Link öffnen</a></p>');
    htmlFinal += `<div>${htmlFromMarkdown}</div>`;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const mailOptions = {
      from: `KaiJa Marketing! <${gmailUser}>`,
      to,
      subject,
      html: htmlFinal
    };

    const result = await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: '✅ Mail erfolgreich über Gmail versendet', result });
  } catch (err) {
    console.error('[send-gmail error]', err);
    return res.status(500).json({ error: 'Fehler beim Mailversand via Gmail', details: err.message });
  }
}
