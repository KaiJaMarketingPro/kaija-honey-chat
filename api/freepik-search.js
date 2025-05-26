// 📁 /api/freepik-search.js – GPT x Freepik Integration (Markdown-ready)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt' });
  }

  const { query } = req.body;
  const apiKey = process.env.FREEPIK_API_KEY;

  if (!query) {
    return res.status(400).json({ error: 'Kein Suchbegriff übergeben' });
  }
  if (!apiKey) {
    return res.status(500).json({ error: 'FREEPIK_API_KEY fehlt in .env' });
  }

  try {
    const url = `https://api.freepik.com/v1/resources/search?query=${encodeURIComponent(query)}&type=photo&limit=3`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();
    if (!response.ok || !data.data?.length) {
      return res.status(404).json({ error: 'Keine Bilder gefunden', details: data });
    }

    const results = data.data.map((img) => ({
      title: img.title || 'Bild',
      thumb: img.assets.preview.url,
      link: img.url,
      markdown: `![${img.title}](${img.assets.preview.url})\n[Freepik-Link öffnen](${img.url})`
    }));

    return res.status(200).json({ images: results });
  } catch (err) {
    console.error('[Freepik API Fehler]', err);
    return res.status(500).json({ error: 'Fehler bei Freepik-Suche', details: err.message });
  }
}
