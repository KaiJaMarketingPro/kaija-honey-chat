// 📁 /api/memory-store.js – Persistente GPT-Memory pro User (json-Datei)
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const user = req.headers['x-user-id'] || 'default';
  const memoryPath = path.join(process.cwd(), 'memory', `${user}.json`);

  if (req.method === 'GET') {
    try {
      const raw = await fs.readFile(memoryPath, 'utf8');
      const memory = JSON.parse(raw);
      return res.status(200).json({ user, memory });
    } catch {
      return res.status(200).json({ user, memory: [] });
    }
  }

  if (req.method === 'POST') {
    try {
      const { entries } = await req.json();
      if (!Array.isArray(entries)) {
        return res.status(400).json({ error: 'entries[] erwartet.' });
      }
      await fs.mkdir(path.dirname(memoryPath), { recursive: true });
      await fs.writeFile(memoryPath, JSON.stringify(entries.slice(-20), null, 2));
      return res.status(200).json({ message: '✅ Memory gespeichert', user });
    } catch (err) {
      return res.status(500).json({ error: 'Fehler beim Speichern', details: err.message });
    }
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
