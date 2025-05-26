// 📁 /api/canva-download.js
// Info-Router für Canva Design-Link-Generierung (kein offizielles REST API für Export!)
// Hinweis: Canva API bietet nur "Canva Button" Workflow – kein automatischer PDF-Download

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt' });
  }

  const { type = 'presentation', query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Fehlender Canva-Suchbegriff oder Prompt' });
  }

  const baseUrl = `https://www.canva.com/${type}/templates/?query=`;
  const link = `${baseUrl}${encodeURIComponent(query)}`;

  return res.status(200).json({
    message: '✅ Link zur Canva-Vorlagensuche generiert',
    templateSearchUrl: link
  });
}
